# 🚀 Quiz Studio - Quick Start Guide

Your math quiz generator is ready! Here's how to get started in 5 minutes.

## Step 1: Start the Server

```bash
cd /Users/zkaibin/website/quiz-studio
npm start
```

You should see:
```
🚀 Quiz Studio server running on http://localhost:3000
📚 Quiz interface: http://localhost:3000
⚙️  Admin panel: http://localhost:3000/admin
```

## Step 2: Add Characters & Universes

1. Open **http://localhost:3000/admin**
2. Go to **Universes** tab
3. Add a universe (e.g., "Disney")
4. Go to **Characters** tab
5. Add some characters:
   - Elsa (emoji: ❄️)
   - Olaf (emoji: ☃️)
   - Mickey (emoji: 🐭)

## Step 3: Create Questions

1. Go to **Questions** tab
2. Click **Add New Question**
3. Fill in:
   - Category: Addition
   - Difficulty: Easy
   - Template: `{character1} has {num1} toys. {character2} gives them {num2} more toys. How many toys does {character1} have?`
   - Placeholders: `character1,character2,num1,num2`
   - Answer: 5

## Step 4: Take Your First Quiz

1. Go to **http://localhost:3000**
2. Enter your name
3. Click "Start Quiz"
4. See Elsa or another character in a personalized question!

## On Your Home Network

Find your IP address (Mac terminal):
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

Then from any device on your network:
```
http://YOUR_IP:3000
```

## What You've Built

✅ Full-stack math quiz app
✅ Character database system
✅ Admin panel for content management
✅ SQLite database
✅ Responsive web design
✅ Quiz scoring system
✅ Home network ready

## Next Steps

1. **Add More Content**
   - Add more universes (Marvel, Studio Ghibli, KPOP)
   - Add different types of questions

2. **Customize**
   - Modify colors in `public/css/style.css`
   - Adjust difficulty levels
   - Add more question templates

3. **Deploy**
   - Run on Raspberry Pi for always-on access
   - Share IP with family members
   - Track progress in Admin Statistics

## File Structure Reference

```
server/
  server.js          ← Main server
  routes/
    characters.js    ← Character API
    questions.js     ← Questions API
    quiz.js          ← Quiz generation

public/
  index.html         ← Main quiz page
  admin.html         ← Admin panel
  js/
    quiz.js          ← Quiz logic
    admin.js         ← Admin logic
```

## Troubleshooting

**Issue: Port 3000 in use**
```bash
PORT=3001 npm start
```

**Issue: Database errors**
```bash
rm database/quiz.db
npm start  # Will recreate database
```

**Issue: Can't access from other devices**
- Check IP address is correct
- Check devices are on same WiFi
- Check firewall settings

---

Happy teaching! 🎉 Your students are going to love this!
