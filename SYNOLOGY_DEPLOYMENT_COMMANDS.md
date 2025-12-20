# 🚀 Synology Deployment - Quick Commands

## One-Stop Deployment Reference

Copy and paste these commands in order.

---

## Step 1: From Mac Terminal

```bash
# Copy package to Synology
scp /Users/zkaibin/website/quiz-studio/build/quiz-studio-1.0.0-new.tar.gz \
    user@synology:/volume1/homes/zkaibin/
```

**Time**: 1-2 minutes

---

## Step 2: SSH to Synology

```bash
ssh user@synology
```

---

## Step 3: Deploy on Synology

```bash
cd /volume1/homes/zkaibin
tar -xzf quiz-studio-1.0.0-new.tar.gz
cd quiz-studio-1.0.0-new
npm install --no-optional --ignore-scripts
```

**Time**: 2-5 minutes

---

## Step 4: Start Server

```bash
npm start
```

**Expected Output**:
```
Connected to SQLite database
Database tables created/verified
🚀 Quiz Studio server running on http://localhost:3000
```

---

## Step 5: Test (In Another Terminal)

```bash
curl http://localhost:3000/api/health
```

**Expected Response**:
```json
{"status":"ok"}
```

---

## Access from Browser

```
http://synology-ip:3000
```

Or if using `.local`:
```
http://synology.local:3000
```

---

## ✅ Success Indicators

- ✓ npm install completes without errors
- ✓ No "gyp" error messages
- ✓ Server starts on port 3000
- ✓ Health API returns OK
- ✓ Web interface loads
- ✓ Can create quiz
- ✓ Can answer questions
- ✓ Scores appear

---

## 🆘 Quick Fixes

### If npm install fails:
```bash
npm cache clean --force
npm install --no-optional --ignore-scripts
```

### If server won't start:
```bash
# Check Node version
node -v
# Should be v18.x

# Check if port 3000 is in use
netstat -tuln | grep 3000

# Start with debug
NODE_DEBUG=* npm start
```

### If can't access from browser:
```bash
# Test locally first
curl http://localhost:3000

# Check firewall (on Synology)
sudo ufw allow 3000
```

---

## 📦 What's in the Package

- better-sqlite3 (pre-built ARM binaries)
- All quiz features
- Admin interface
- Database files
- Complete backend

---

## ⏱️ Total Time: ~15 minutes

---

## 🎉 You're Done!

Enjoy your Quiz Studio on Synology! 🚀
