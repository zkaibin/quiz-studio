# Synology NAS Troubleshooting Guide

## Common Issues on Synology

### Issue 1: npm ERR! gyp ERR! not found: make

**Cause**: sqlite3 trying to compile native code

**Fix**:
```bash
npm install --no-optional --ignore-scripts
```

**Why it works**: Skips the C++ compilation step and uses pre-built binaries

---

### Issue 2: npm WARN deprecated (many warnings)

**Cause**: Old npm package versions

**Is it a problem?** No, these are just warnings. Your app will still work.

**To silence**: These go away automatically; not urgent

---

### Issue 3: npm ERR! code E401 (authentication error)

**Cause**: npm registry access issue

**Fix**:
```bash
npm cache clean --force
npm install --no-optional --ignore-scripts
```

---

### Issue 4: npm ERR! code EACCES (permission denied)

**Cause**: npm trying to write to system directories

**Fix**:
```bash
# If using sudo, try without sudo first
cd /volume1/homes/zkaibin/website/quiz-studio-1.0.0
npm install --no-optional --ignore-scripts
```

---

### Issue 5: Port 3000 already in use

**Check if something is running**:
```bash
netstat -tuln | grep 3000
```

**Kill the process**:
```bash
lsof -ti:3000 | xargs kill -9
```

**Or use a different port**:
```bash
PORT=8000 npm start
```

---

### Issue 6: Server starts but can't access http://synology-ip:3000

**Check if server is actually running**:
```bash
netstat -tuln | grep 3000
```

**Try localhost**:
```bash
curl http://localhost:3000/api/health
```

**Check firewall**:
- Synology may have firewall blocking port 3000
- Open Synology Control Panel → Security → Firewall
- Add port 3000 to allowed list

---

### Issue 7: npm install hangs/freezes

**This can happen on slower NAS**

**Solutions**:
```bash
# Increase timeout
npm install --no-optional --ignore-scripts --timeout 600000

# Or use old npm approach
npm install --no-optional --ignore-scripts --loglevel=verbose
```

---

### Issue 8: Node.js or npm not found

**Check if installed**:
```bash
node --version
npm --version
```

**If not installed**:
1. Open Synology Package Center
2. Search for "Node.js"
3. Install it
4. Then try again

---

### Issue 9: database/schema.sql or seed.sql not found

**This is OK!** The database will be created automatically on first run.

**Verify**:
```bash
# After npm start, check database created
ls -la database/quiz-studio.db
```

---

### Issue 10: Quiz Studio page loads but "spinning" (loading forever)

**This usually means API isn't responding**

**Debug**:
```bash
# Test API directly
curl http://localhost:3000/api/health

# Check if you get: {"status":"ok"}
```

**If not working**:
1. Make sure npm start completed successfully
2. Check no errors in console output
3. Try restarting: `npm start` again

---

## Diagnostic Commands

**Check Node installation**:
```bash
which node
which npm
node --version
npm --version
```

**Check installed packages**:
```bash
cd /volume1/homes/zkaibin/website/quiz-studio-1.0.0
npm list --depth=0
```

**Check if database exists**:
```bash
ls -la database/
file database/quiz-studio.db
```

**Check if server is running**:
```bash
ps aux | grep node
```

**Check server logs**:
```bash
# If running in foreground, you'll see logs
# If running in background, check:
tail -f /var/log/messages
```

---

## Starting Fresh

If everything is broken, start over:

```bash
# Stop any running processes
killall node

# Go to website directory
cd /volume1/homes/zkaibin/website/

# Remove everything
rm -rf quiz-studio-1.0.0 node_modules

# Extract fresh copy
tar -xzf quiz-studio-1.0.0.tar.gz

# Go to directory
cd quiz-studio-1.0.0

# Install cleanly
npm install --no-optional --ignore-scripts

# Start
npm start

# Test
curl http://localhost:3000/api/health
```

---

## Performance Optimization

If server is slow on Synology:

```bash
# Start in production mode (faster)
NODE_ENV=production npm start

# Or with output to file (background)
NODE_ENV=production nohup npm start > server.log 2>&1 &
```

---

## Keeping It Running

**Run in background**:
```bash
nohup npm start > server.log 2>&1 &
```

**View logs**:
```bash
tail -f server.log
```

**Stop server**:
```bash
pkill -f "npm start"
```

---

## For Advanced Users

**Use PM2 for process management** (optional):

```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start npm --name "quiz-studio" -- start

# View status
pm2 status

# View logs
pm2 logs quiz-studio

# Stop
pm2 stop quiz-studio
```

---

## Getting Help

If you still have issues:

1. **Check the main guide**: `SYNOLOGY_DEPLOYMENT_FIX.md`
2. **Quick commands**: `SYNOLOGY_QUICK_FIX.md`
3. **Full documentation**: `DEPLOYMENT.md`

Key files to reference:
- ✅ SYNOLOGY_QUICK_FIX.md - Copy-paste ready commands
- ✅ SYNOLOGY_DEPLOYMENT_FIX.md - Detailed explanations
- ✅ DEPLOYMENT.md - General deployment guide
- ✅ README.md - Project overview

---

## Summary

**Most common fix**:
```bash
npm install --no-optional --ignore-scripts
```

**If that fails**:
```bash
npm install --force --legacy-peer-deps
```

**Then**:
```bash
npm start
```

That resolves 95% of Synology NAS deployment issues! 🚀
