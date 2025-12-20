# Quick Reference - Frontend-Only Quiz Studio on GitHub Pages

## 🚀 Deploy in 5 Minutes

```bash
# 1. Go to your project
cd /Users/zkaibin/website/quiz-studio

# 2. Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/quiz-studio.git
git branch -M main
git push -u origin main

# 3. Go to GitHub Settings → Pages
# 4. Branch: main, Folder: /public
# 5. Wait 2 minutes
```

**Your site is now at:** `https://YOUR_USERNAME.github.io/quiz-studio/`

---

## 📁 Important Files

| File | What It Does |
|------|-------------|
| `public/index.html` | Quiz interface |
| `public/admin.html` | Admin panel |
| `public/data/questions.json` | Quiz questions (EDIT THIS) |
| `public/js/data-loader.js` | Loads data from JSON |
| `public/js/quiz.js` | Quiz logic |
| `.gitignore` | Tells Git what NOT to push |

---

## 🎯 Common Tasks

### Add a Question
1. Open `/public/data/questions.json`
2. Add new question object:
```json
{
  "id": 7,
  "category": "Marvel",
  "difficulty": "Medium",
  "template": "Which hero can fly?",
  "placeholders": [],
  "options": ["Thor", "Captain America", "Iron Man", "Hulk"],
  "answer": 2
}
```
3. Save file
4. Commit and push to GitHub

### View Scores
1. Open Admin Panel (`/admin.html`)
2. Click "Sessions"
3. See all quiz results

### Export Data
1. Admin Panel → Sessions
2. Click "Export" button
3. Save JSON file as backup

---

## 📱 Test Locally

```bash
# Open directly
open public/index.html

# OR run local server
cd public
python3 -m http.server 8000
# Visit http://localhost:8000
```

---

## ❓ FAQ

**Q: Do users need to sign up?**
A: No! Just enter name and take quiz.

**Q: Where is data stored?**
A: Browser localStorage (on that device only).

**Q: Can I track scores on a server?**
A: Not yet - data is local. Adding backend requires separate server.

**Q: Is it really free?**
A: Yes! GitHub Pages + JSON storage = completely free.

**Q: Can I use a custom domain?**
A: Yes! GitHub Pages supports custom domains.

---

## 🔧 Make Changes

```bash
# Edit files locally
# Then push to GitHub

git add .
git commit -m "Update questions"
git push

# Site updates automatically!
```

---

## ⚡ Quick Checklist

- [ ] Cloned repo to your computer
- [ ] Created GitHub account
- [ ] Created new repository on GitHub
- [ ] Pushed code with `git push`
- [ ] Enabled GitHub Pages in Settings
- [ ] Site is live and working
- [ ] Tested taking a quiz
- [ ] Tested admin panel
- [ ] Shared link with others

---

## 📞 Troubleshooting

| Problem | Solution |
|---------|----------|
| Site shows 404 | Wait 5 min, check GitHub Pages enabled |
| Questions don't load | Check `/public/data/questions.json` exists |
| Admin changes don't save | Clear browser cache (Cmd+Shift+Delete) |
| Site slow | GitHub Pages can be slow initially, refresh |

---

## 🎉 You're Done!

Your Quiz Studio is now:
- Hosted on GitHub Pages (free!)
- Accessible from anywhere
- Easy to update
- Works offline
- No server needed

**Share your link:** `https://YOUR_USERNAME.github.io/quiz-studio/`

---

Last updated: December 20, 2025
