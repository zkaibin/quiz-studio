# 🚀 Quiz Studio - Deployment Guide

Complete guide for deploying Quiz Studio to servers (cloud, on-premises, home lab).

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Preparation](#preparation)
3. [Deployment Methods](#deployment-methods)
4. [Post-Deployment Setup](#post-deployment-setup)
5. [Configuration](#configuration)
6. [Monitoring & Maintenance](#monitoring--maintenance)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Hardware Requirements

- **Minimum**: 512MB RAM, 1GB storage, single core CPU
- **Recommended**: 2GB RAM, 5GB storage, 2 core CPU
- **Network**: Stable internet connection, open port 3000+ (or reverse proxy)

### Software Requirements

- **Node.js**: 14.0+ ([Download](https://nodejs.org/))
- **npm**: 6.0+ (included with Node.js)
- **OS**: Linux (Ubuntu/Debian preferred), macOS, or Windows Server
- **Optional**: nginx/Apache for reverse proxy, Docker for containerization

### Network Requirements

- Port 3000+ available (or reverse proxy on 80/443)
- Firewall rules configured
- (Optional) SSL certificate for HTTPS

### User Account

- Dedicated user account (non-root recommended)
- Sudo privileges for service management

---

## Preparation

### Step 1: Create Deployment Package

On your development machine:

```bash
# Navigate to project directory
cd /path/to/quiz-studio

# Make script executable
chmod +x create-package.sh

# Create deployment package
./create-package.sh

# Output:
# ✓ quiz-studio-1.0.0.tar.gz
# ✓ quiz-studio-1.0.0.tar.gz.sha256
# ✓ DEPLOYMENT_MANIFEST.txt
```

### Step 2: Verify Package

```bash
# Verify checksum
shasum -a 256 -c quiz-studio-1.0.0.tar.gz.sha256

# Expected output: OK
```

### Step 3: Test Package Locally (Optional but Recommended)

```bash
# Extract package
tar -xzf quiz-studio-1.0.0.tar.gz
cd quiz-studio-1.0.0

# Install dependencies
npm install

# Start
npm start

# Test endpoints
curl http://localhost:3000/api/health
# Expected: {"status":"ok","timestamp":"..."}

# Stop with Ctrl+C
```

---

## Deployment Methods

### Method 1: Direct Server Deployment (Easiest)

Best for: Single server, home network, small teams

#### Step 1: Transfer Package

```bash
# From your development machine
scp quiz-studio-1.0.0.tar.gz user@server:/home/user/

# Verify transfer
scp quiz-studio-1.0.0.tar.gz.sha256 user@server:/home/user/
```

#### Step 2: Deploy on Server

```bash
# SSH into server
ssh user@server

# Navigate to deployment directory
cd /home/user

# Verify package
shasum -a 256 -c quiz-studio-1.0.0.tar.gz.sha256

# Extract package
tar -xzf quiz-studio-1.0.0.tar.gz
cd quiz-studio-1.0.0

# Install dependencies
npm install

# (Recommended) Copy deployment script
chmod +x deploy-server.sh

# Run deployment script
sudo ./deploy-server.sh --app-dir /opt/quiz-studio --port 3000 --service

# Or manual deployment (see Step 3 below)
```

#### Step 3: Manual Setup (Alternative)

```bash
# Create app directory
sudo mkdir -p /opt/quiz-studio

# Copy files
sudo cp -r . /opt/quiz-studio/

# Set permissions
sudo chown -R $USER:$USER /opt/quiz-studio
cd /opt/quiz-studio

# Install dependencies
npm install --production

# Start server
npm start

# Or start in background
nohup npm start > app.log 2>&1 &
```

---

### Method 2: Systemd Service (Production Recommended)

For automatic startup and monitoring on Linux servers.

#### Step 1: Create Service File

```bash
# Create service file
sudo nano /etc/systemd/system/quiz-studio.service
```

Paste:

```ini
[Unit]
Description=Quiz Studio - Math Quiz Generator
After=network.target

[Service]
Type=simple
User=quiz
WorkingDirectory=/opt/quiz-studio
Environment="NODE_ENV=production"
Environment="PORT=3000"
ExecStart=/usr/bin/npm start
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

#### Step 2: Enable and Start Service

```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable on startup
sudo systemctl enable quiz-studio

# Start service
sudo systemctl start quiz-studio

# Check status
sudo systemctl status quiz-studio

# View logs
sudo journalctl -u quiz-studio -f

# Stop service
sudo systemctl stop quiz-studio
```

---

### Method 3: Docker Deployment

For containerized environments.

#### Step 1: Create Dockerfile

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

#### Step 2: Build and Run

```bash
# Build image
docker build -t quiz-studio:1.0.0 .

# Run container
docker run -d \
  --name quiz-studio \
  -p 3000:3000 \
  -v quiz-studio-data:/app/database \
  quiz-studio:1.0.0

# Check logs
docker logs -f quiz-studio

# Stop container
docker stop quiz-studio
```

#### Step 3: Docker Compose (Optional)

```yaml
version: '3.8'

services:
  quiz-studio:
    image: quiz-studio:1.0.0
    ports:
      - "3000:3000"
    volumes:
      - quiz-data:/app/database
    environment:
      - NODE_ENV=production
      - PORT=3000
    restart: unless-stopped

volumes:
  quiz-data:
```

Run with: `docker-compose up -d`

---

### Method 4: Reverse Proxy (nginx)

For production deployments with HTTPS and domain name.

#### Step 1: Configure nginx

```bash
sudo nano /etc/nginx/sites-available/quiz-studio
```

Paste:

```nginx
server {
    listen 80;
    server_name quiz.example.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name quiz.example.com;

    # SSL configuration (use Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/quiz.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/quiz.example.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/javascript application/json;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

#### Step 2: Enable and Restart

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/quiz-studio /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

---

## Post-Deployment Setup

### Step 1: Verify Installation

```bash
# Check if server is running
curl http://localhost:3000/api/health

# Expected: {"status":"ok","timestamp":"..."}

# Check from remote (if accessible)
curl http://YOUR_IP:3000/api/health
```

### Step 2: Firewall Configuration

```bash
# Allow port 3000 (or your configured port)

# Ubuntu/Debian (UFW)
sudo ufw allow 3000/tcp

# CentOS/RHEL (firewalld)
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload

# AWS Security Group / Cloud Provider
# Add inbound rule: Protocol TCP, Port 3000, Source 0.0.0.0/0 (or specific IPs)
```

### Step 3: Access Application

- **Quiz Interface**: `http://YOUR_IP:3000`
- **Admin Panel**: `http://YOUR_IP:3000/admin`

### Step 4: Add Initial Data

1. Go to Admin Panel: `http://YOUR_IP:3000/admin`
2. Add a Universe (e.g., "Disney")
3. Add Characters with emojis
4. Create Question Templates
5. Generate first quiz

---

## Configuration

### Environment Variables

Create `.env` file in application directory:

```bash
NODE_ENV=production
PORT=3000
DATABASE_PATH=./database/quiz.db
```

### Performance Tuning

```bash
# Increase Node.js memory (if needed)
NODE_OPTIONS="--max_old_space_size=512" npm start

# Database optimization (SQLite)
# For large datasets (10k+ questions), consider:
# - Adding indexes on frequently queried columns
# - Regular database maintenance

# Nginx gzip compression helps reduce bandwidth
```

---

## Monitoring & Maintenance

### Daily Checks

```bash
# Check if service is running
sudo systemctl status quiz-studio

# View recent logs
sudo journalctl -u quiz-studio -n 50

# Check disk usage
df -h

# Check database size
ls -lh /opt/quiz-studio/database/quiz.db
```

### Regular Maintenance

```bash
# Weekly: Backup database
cp /opt/quiz-studio/database/quiz.db /backup/quiz-$(date +%Y%m%d).db

# Monthly: Update dependencies
npm outdated
npm update

# Monitor disk space
# Alert if database grows > 100MB
```

### Log Rotation

```bash
# Create logrotate config
sudo nano /etc/logrotate.d/quiz-studio
```

Paste:

```
/opt/quiz-studio/*.log {
    daily
    rotate 7
    compress
    delaycompress
    notifempty
    create 0640 quiz quiz
}
```

---

## Troubleshooting

### Application Won't Start

```bash
# Check logs
sudo journalctl -u quiz-studio -n 100

# Check Node.js installation
node -v
npm -v

# Verify port is available
sudo lsof -i :3000

# If port in use, kill process or use different port
kill <PID>
# OR
PORT=3001 npm start
```

### Port Already in Use

```bash
# Find what's using port 3000
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>

# Or use different port
sudo PORT=3001 npm start
```

### Database Connection Error

```bash
# Check database directory exists
ls -la /opt/quiz-studio/database/

# Check permissions
ls -la /opt/quiz-studio/database/quiz.db

# Reset database (loses data)
rm /opt/quiz-studio/database/quiz.db
# Restart application - database will recreate
```

### High CPU/Memory Usage

```bash
# Monitor resource usage
top
ps aux | grep node

# Check for zombie processes
ps aux | grep Z

# Restart application
sudo systemctl restart quiz-studio
```

### Cannot Access from Remote

```bash
# Check if listening on all interfaces
netstat -tlnp | grep 3000
# Should show: 0.0.0.0:3000 (not just 127.0.0.1)

# Test connectivity
ping YOUR_IP
telnet YOUR_IP 3000
curl http://YOUR_IP:3000/api/health

# Check firewall
sudo ufw status
sudo firewall-cmd --list-all
```

---

## Production Best Practices

### Security

- [ ] Use firewall to restrict access
- [ ] Use HTTPS with valid SSL certificate
- [ ] Run as non-root user
- [ ] Regularly backup database
- [ ] Keep Node.js and dependencies updated
- [ ] Use reverse proxy (nginx/Apache)
- [ ] Implement rate limiting

### Performance

- [ ] Enable gzip compression
- [ ] Use reverse proxy with caching
- [ ] Monitor CPU/memory/disk
- [ ] Set up log rotation
- [ ] Use CDN for static files (if applicable)

### Reliability

- [ ] Set up automated backups
- [ ] Monitor service with alerting
- [ ] Plan disaster recovery
- [ ] Document setup and procedures
- [ ] Test recovery procedures

### Scaling

For multiple servers/high load:

1. Use load balancer (HAProxy, nginx)
2. Shared database or replication
3. Redis for caching/sessions
4. Container orchestration (Kubernetes)

---

## Backup & Recovery

### Backup Database

```bash
#!/bin/bash
# backup-database.sh

BACKUP_DIR="/backups/quiz-studio"
mkdir -p $BACKUP_DIR

DB_FILE="/opt/quiz-studio/database/quiz.db"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/quiz_$TIMESTAMP.db"

# Copy database
cp $DB_FILE $BACKUP_FILE

# Compress
gzip $BACKUP_FILE

# Keep only last 30 days
find $BACKUP_DIR -name "*.gz" -mtime +30 -delete

echo "Backup complete: $BACKUP_FILE.gz"
```

### Restore Database

```bash
# Stop application
sudo systemctl stop quiz-studio

# Restore backup
gunzip -c /backups/quiz-studio/quiz_20240101_000000.db.gz > /opt/quiz-studio/database/quiz.db

# Restore permissions
sudo chown quiz:quiz /opt/quiz-studio/database/quiz.db
sudo chmod 644 /opt/quiz-studio/database/quiz.db

# Start application
sudo systemctl start quiz-studio
```

---

## Support & Resources

- **Documentation**: See README.md in package
- **Troubleshooting**: See above
- **Source Code**: Check GitHub repository
- **API Reference**: See /public/index.html and /public/admin.html

---

## Summary

| Method | Complexity | Best For |
|--------|-----------|----------|
| Direct | Low | Development, home lab |
| Systemd | Medium | Single Linux server |
| Docker | Medium | Containerized deployments |
| Reverse Proxy | High | Production with HTTPS |

---

**Your Quiz Studio is ready to go!** 🚀

Choose the deployment method that best fits your infrastructure and start teaching! 📚
