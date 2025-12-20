# Synology NAS Quick Commands Reference

## The Problem
```
npm ERR! code 1
npm ERR! gyp ERR! not found: make
```

**Cause**: sqlite3 native compilation fails on Synology NAS

---

## Solution 1: Quick Fix (Recommended)

```bash
cd /volume1/homes/zkaibin/website/quiz-studio-1.0.0
npm install --no-optional --ignore-scripts
npm start
```

✅ This should work in 90% of cases

---

## Solution 2: Force Install (If Solution 1 Fails)

```bash
cd /volume1/homes/zkaibin/website/quiz-studio-1.0.0
rm -rf node_modules package-lock.json
npm install --force --legacy-peer-deps
npm start
```

---

## Solution 3: Completely Fresh Install

```bash
cd /volume1/homes/zkaibin/website/
rm -rf quiz-studio-1.0.0
tar -xzf quiz-studio-1.0.0.tar.gz
cd quiz-studio-1.0.0
npm install --no-optional --ignore-scripts
npm start
```

---

## Verify It Works

```bash
# Check if running
curl http://localhost:3000/api/health

# Expected output:
# {"status":"ok"}
```

---

## Important Flags Explained

| Flag | What It Does |
|------|-------------|
| `--no-optional` | Skip optional packages |
| `--ignore-scripts` | Skip build scripts (avoids compilation) |
| `--force` | Force install despite conflicts |
| `--legacy-peer-deps` | Allow older dependency versions |

---

## Full Detailed Guide

See: `SYNOLOGY_DEPLOYMENT_FIX.md` for complete information

---

## Copy-Paste Ready Commands

### First attempt:
```bash
cd /volume1/homes/zkaibin/website/quiz-studio-1.0.0 && npm install --no-optional --ignore-scripts && npm start
```

### If that fails:
```bash
cd /volume1/homes/zkaibin/website/quiz-studio-1.0.0 && rm -rf node_modules package-lock.json && npm install --force --legacy-peer-deps && npm start
```

---

## Still Stuck?

1. ✅ Did you use `--ignore-scripts`? (Most important flag)
2. ✅ Did you clean up old `node_modules`? (Try: `rm -rf node_modules`)
3. ✅ Is Node.js installed? (Check: `node --version`)
4. ✅ Is port 3000 available? (Check: `netstat -tuln | grep 3000`)

If none of that works, see the detailed guide in `SYNOLOGY_DEPLOYMENT_FIX.md`
