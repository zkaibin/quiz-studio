# 🚀 Synology Deployment - Quick Commands (sql.js)

## Copy to Synology (Run from Mac)

```bash
scp /Users/zkaibin/website/quiz-studio/build/quiz-studio-1.0.0-new.tar.gz \
    zkaibin@synology:/volume1/homes/zkaibin/
```

## Deploy to Synology (Run on Synology)

```bash
# SSH to Synology
ssh zkaibin@synology

# Go to home directory
cd /volume1/homes/zkaibin

# Extract
tar -xzf quiz-studio-1.0.0-new.tar.gz

# Go to app directory
cd quiz-studio-1.0.0-new

# Install dependencies (FAST - no compilation!)
npm install

# Start server
npm start
```

## Expected Output

```
Connected to SQLite database
Database tables created/verified
🚀 Quiz Studio server running on http://localhost:3000
```

## Verify It Works

```bash
# In another terminal on Synology:
curl http://localhost:3000/api/health

# Should return:
# {"status":"ok","timestamp":"2025-12-19T..."}
```

## Access Web Interface

Open browser and go to:
```
http://synology-ip:3000
```

## That's It! ✅

No errors. No compilation. Pure JavaScript magic.

---

## Troubleshooting One-Liners

### Check if port 3000 is in use
```bash
lsof -i :3000
```

### Fix permissions
```bash
chmod -R 755 /volume1/homes/zkaibin/quiz-studio-1.0.0-new
```

### Change port if needed
```bash
PORT=3001 npm start
```

### Kill running server
```bash
pkill -f "npm start"
```

### Check logs
```bash
cat /tmp/npm-debug.log
```

### Reinstall if needed
```bash
rm -rf node_modules package-lock.json
npm install
```
