# 🔧 GitHub Pages Configuration - Troubleshooting

## Problem: Can't Find /public Folder Option

If you don't see a folder dropdown or `/public` option, here are the solutions:

---

## Solution 1: Check Your GitHub Pages Settings

### Step-by-Step (Updated GitHub UI)

1. **Go to Settings**
   - Repository: https://github.com/zkaibin/quiz-studio
   - Click **Settings** tab (top right)

2. **Find Pages Section**
   - Left sidebar → Scroll down
   - Click **Pages**

3. **Look for Build and Deployment**
   - You should see a section labeled "Build and deployment"

4. **Select Deployment Source**
   - Option 1: **"Deploy from a branch"** ← This is what you need
   - Once selected, two dropdowns appear:
     - Branch dropdown: Select `main`
     - Folder dropdown: Select `/ (root)` or `/public`

### If You Don't See Folder Dropdown

Try these:
1. **Refresh the page** (Cmd+R)
2. **Clear browser cache** (Cmd+Shift+Delete)
3. **Try a different browser** (Chrome/Firefox)
4. **Wait 30 seconds** for the UI to fully load

---

## Solution 2: Use GitHub CLI (Command Line)

If the web interface isn't working, use this command:

```bash
# This will configure GitHub Pages via command line
gh repo edit zkaibin/quiz-studio --enable-pages
```

But first, you need to manually set which branch/folder. Keep trying the web UI with Solution 1.

---

## Solution 3: Move Files to Repository Root

**If GitHub Pages only accepts root folder**, we can move files:

```bash
cd /Users/zkaibin/website/quiz-studio

# Copy everything from public to root
cp -r public/* .

# Commit and push
git add .
git commit -m "Move files to root for GitHub Pages"
git push
```

Then in GitHub Pages Settings:
- Source: "Deploy from a branch"
- Branch: `main`
- Folder: `/ (root)`

---

## What You Should See

### Correct Configuration Screen:

```
Build and deployment
├─ Source: ○ Deploy from a branch
├─ Branch: [main ▼]
├─ Folder: [/ (root) ▼]  OR  [/public ▼]
└─ [SAVE button]
```

### After Configuration:

You should see a green box:
```
✅ Your site is live at https://zkaibin.github.io/quiz-studio/
```

---

## If Folder Dropdown Shows Only "/" (root)

GitHub Pages defaults to the repository root. That's fine! We can still deploy from `/public`, but we need to tell GitHub where to find our files.

**Options:**

1. **Use root deployment** (simplest)
   - Copy files from `public/` to repository root
   - Deploy from `/` (root folder)

2. **Use GitHub Actions** (more advanced)
   - GitHub Actions can deploy from `/public` folder
   - Requires a build workflow file

---

## Recommended: Deploy from Root

Since GitHub Pages seems to prefer root folder, let's use this approach:

### Step 1: Copy Files to Root

```bash
cd /Users/zkaibin/website/quiz-studio

# Copy public folder contents to root
cp -r public/* .

# Remove public folder (optional, keeps repo clean)
rm -rf public

# Commit
git add .
git commit -m "Move to root for GitHub Pages deployment"
git push
```

### Step 2: Configure GitHub Pages

Settings → Pages:
- Source: "Deploy from a branch"
- Branch: `main`
- Folder: `/ (root)` (should be default)
- Click **SAVE**

### Step 3: Done! ✨

Your site goes live in 2-3 minutes at:
```
https://zkaibin.github.io/quiz-studio/
```

---

## Files That Will Deploy

After moving to root, these files will be deployed:

```
quiz-studio/
├── index.html              ← Quiz interface
├── admin.html              ← Admin panel
├── css/
│   ├── style.css
│   └── admin.css
├── js/
│   ├── data-loader.js
│   ├── quiz.js
│   └── admin.js
├── data/
│   ├── questions.json
│   ├── characters.json
│   └── universes.json
└── [documentation files]
```

---

## Verification Checklist

After configuration:

- [ ] Settings → Pages shows green checkmark
- [ ] Says "Your site is live at https://zkaibin.github.io/quiz-studio/"
- [ ] Can visit the URL in 2-3 minutes
- [ ] Quiz page loads
- [ ] Admin panel works
- [ ] Questions appear

---

## Still Stuck?

Try this quick test:

```bash
# Check what's in your repository root
cd /Users/zkaibin/website/quiz-studio
ls -la | grep -E "(index|admin|css|js|data)"

# If you only see these files, GitHub Pages will find them!
```

If you see `index.html`, `admin.html`, folders `css/`, `js/`, and `data/`, you're ready to deploy from root!

---

## Quick Summary

1. GitHub Pages might default to root folder `/`
2. We can adapt by moving files from `/public` to root
3. Configure GitHub Pages with root folder
4. Deploy and done!

Let me help with the next step! 👇
