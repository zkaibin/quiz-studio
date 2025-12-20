# Synology NAS Deployment Guide - Fix sqlite3 Build Error

## Problem
When running `npm install` on Synology NAS (Linux ARM), sqlite3 fails to compile because:
- Build tools (`make`, `gcc`, etc.) are not installed
- Synology restricts system-level package installation
- sqlite3 needs to be compiled for ARM architecture

## Solution Options

### ✅ Option 1: Skip Optional Dependencies (FASTEST - RECOMMENDED)

When you run npm install, tell it to skip optional dependencies:

```bash
npm install --no-optional --ignore-scripts
```

Or if that doesn't work, use:

```bash
npm install --force
```

This downloads pre-built binaries and skips the native compilation step.

**Steps on your Synology NAS:**

1. SSH into your server:
```bash
ssh user@synology-ip
```

2. Navigate to your app directory:
```bash
cd /volume1/homes/zkaibin/website/quiz-studio-1.0.0
```

3. Install with workaround:
```bash
npm install --no-optional --ignore-scripts
```

4. If that fails, try:
```bash
npm install --force --legacy-peer-deps
```

5. Start the server:
```bash
npm start
```

---

### ✅ Option 2: Pre-Build Locally Then Deploy

Build sqlite3 on your Mac, then transfer to server:

**On your Mac:**

```bash
cd /Users/zkaibin/website/quiz-studio

# Install dependencies (includes pre-built sqlite3)
npm install

# Create deployment package
tar -czf quiz-studio-prebuild.tar.gz node_modules/ server/ public/ database/ package.json package-lock.json

# Transfer to server
scp quiz-studio-prebuild.tar.gz user@synology-ip:/volume1/homes/zkaibin/website/
```

**On your Synology server:**

```bash
cd /volume1/homes/zkaibin/website/
tar -xzf quiz-studio-prebuild.tar.gz
npm start
```

---

### ✅ Option 3: Switch to Better-SQLite3

Use `better-sqlite3` which is easier to compile:

**On your Mac** (if you want to update):

```bash
npm uninstall sqlite3
npm install better-sqlite3
```

Then update code usage (requires code changes - not recommended for quick fix)

---

## Quick Fix - What to Do RIGHT NOW

Try this on your **Synology NAS** server:

```bash
# SSH into your server
ssh user@synology-ip

# Go to your app directory
cd /volume1/homes/zkaibin/website/quiz-studio-1.0.0

# Clean up old node_modules if exists
rm -rf node_modules package-lock.json

# Install with workarounds
npm install --no-optional --ignore-scripts --verbose

# If still fails, force install
npm install --force --legacy-peer-deps --verbose

# Try starting
npm start
```

---

## If Still Getting Errors

Try this approach (safest for Synology):

```bash
# On Synology server
cd /volume1/homes/zkaibin/website

# Extract fresh package
tar -xzf quiz-studio-1.0.0.tar.gz

# Go to directory
cd quiz-studio-1.0.0

# Try installing with maximum compatibility
npm ci --only=production --no-optional

# Or completely skip build phase
npm install --ignore-scripts
```

---

## Verification

After successful install, verify it works:

```bash
# Check if node_modules installed
ls -la node_modules/ | head -20

# Start the server
npm start

# In another terminal, test the API
curl http://localhost:3000/api/health
```

---

## Alternative: Use Docker

If npm install keeps failing, use Docker (if available on your Synology):

```dockerfile
FROM node:18

WORKDIR /app
COPY . .

RUN npm install --only=production --no-optional

EXPOSE 3000

CMD ["npm", "start"]
```

---

## Why This Happens

- **sqlite3**: Requires native compilation for the specific architecture (ARM on Synology)
- **Synology**: Doesn't have build tools installed by default
- **Solution**: Use pre-built binaries or skip the build phase

---

## Still Not Working?

If none of the above works, try this nuclear option:

```bash
# SSH to server
ssh user@synology-ip

# Navigate to app
cd /volume1/homes/zkaibin/website/quiz-studio-1.0.0

# Remove everything
rm -rf node_modules package-lock.json

# Install one package at a time
npm install express --no-save
npm install sqlite3@5.1.5 --ignore-scripts --no-save
npm install cors --no-save
npm install body-parser --no-save

# This should work without compilation
npm start
```

---

## Success Indicators

When it's working, you should see:
- ✅ No `npm ERR!` messages
- ✅ `npm start` returns no errors
- ✅ Server starts listening on port 3000
- ✅ `curl http://localhost:3000/api/health` returns `{"status":"ok"}`

---

## Need Help?

If you're still stuck:

1. Show the output of: `npm install -g node-pre-gyp`
2. Then try: `npm install sqlite3`
3. If still fails, use **Option 1** (--no-optional --ignore-scripts)

---

## Summary

**Fastest fix on Synology NAS:**

```bash
cd /volume1/homes/zkaibin/website/quiz-studio-1.0.0
npm install --no-optional --ignore-scripts
npm start
```

If that fails:
```bash
npm install --force --legacy-peer-deps
npm start
```

That should resolve the issue! Let me know if you need more help. 🚀
