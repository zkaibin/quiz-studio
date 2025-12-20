# Deploy to GitHub Pages - Step by Step Guide

## Step 1: Create a GitHub Account (if you don't have one)
Go to [github.com](https://github.com) and sign up

## Step 2: Create a New Repository

1. Go to [github.com/new](https://github.com/new)
2. **Repository name**: `quiz-studio` (or any name you prefer)
3. **Description**: "Interactive Quiz Application"
4. **Visibility**: Public (required for free GitHub Pages)
5. Click **Create repository**

## Step 3: Add Remote and Push Code

In your terminal, run these commands:

```bash
cd /Users/zkaibin/website/quiz-studio

# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/quiz-studio.git

# Rename branch to main (optional but recommended)
git branch -M main

# Push code to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/quiz-studio`
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `main` folder `/public`
5. Click **Save**
6. Wait 1-2 minutes for the site to deploy

## Step 5: Visit Your Site! 🎉

Your Quiz Studio is now live at:
```
https://YOUR_USERNAME.github.io/quiz-studio/
```

## Making Updates

After you make changes locally:

```bash
cd /Users/zkaibin/website/quiz-studio

git add .
git commit -m "Update: describe your changes here"
git push
```

Your site updates automatically within 1-2 minutes!

## Troubleshooting

### Pages not showing up?
- Make sure repository is **Public**
- Check Settings → Pages
- Clear your browser cache (Cmd+Shift+Delete)

### Old version still showing?
- Wait 2-5 minutes for GitHub to rebuild
- Try `Cmd+Shift+R` (hard refresh)

### Questions not loading?
- Check browser console (F12) for errors
- Make sure `/public/data/questions.json` exists
- Try `Cmd+Shift+Delete` to clear localStorage

## Tips

- Questions are stored in `/public/data/questions.json`
- Quiz progress is saved to browser localStorage (stays on that device)
- Use Admin Panel (`/admin.html`) to add questions
- Export quiz data regularly as backup

---

**Your site is now hosted for free on GitHub Pages!** 🚀
