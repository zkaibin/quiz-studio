# 🎬 Getting Started Visual Guide

## Step-by-Step Setup (5 Minutes)

### Step 1️⃣: Start the Server

**Open Terminal and run:**
```bash
cd /Users/zkaibin/website/quiz-studio
npm start
```

**You'll see:**
```
🚀 Quiz Studio server running on http://localhost:3000
📚 Quiz interface: http://localhost:3000
⚙️  Admin panel: http://localhost:3000/admin
```

✅ Server is running!

---

### Step 2️⃣: Open Admin Panel

**In your browser:**
- Click: http://localhost:3000/admin
- Or type in address bar: `localhost:3000/admin`

**You'll see:**
- Tab menu at top: Universes | Characters | Questions | Statistics
- Currently on "Universes" tab

✅ Admin panel loaded!

---

### Step 3️⃣: Add a Universe

**In "Universes" tab:**

1. Find the form at top: "Add New Universe"
2. **Universe Name**: Type `Disney`
3. **Description**: Type `Disney animated characters`
4. Click **Add Universe** button

**Result:**
- Message appears: "Universe added successfully!"
- "Disney" appears in the list below

✅ Universe created!

---

### Step 4️⃣: Add Characters

**Click "Characters" tab**

1. **Character Name**: Type `Elsa`
2. **Universe**: Select `Disney` from dropdown
3. **Emoji Icon**: Type `❄️` (copy-paste or find emoji)
4. Click **Add Character** button

**Repeat for:**
- Olaf (emoji: ☃️)
- Mickey (emoji: 🐭)

**Result:**
- Characters appear grouped by universe

✅ Characters added!

---

### Step 5️⃣: Create a Question

**Click "Questions" tab**

**Fill in the form:**

| Field | Example |
|-------|---------|
| Category | `Addition` |
| Difficulty | `Easy` |
| Question Template | `{character1} has {num1} toys. {character2} has {num2} toys. How many toys do they have together?` |
| Placeholders | `character1,character2,num1,num2` |
| Correct Answer | `7` |

**Click "Add Question"**

**Result:**
- Question appears in list below

✅ Question template created!

---

### Step 6️⃣: Take a Quiz

**Open Main Page:**
- Click: http://localhost:3000
- Or type: `localhost:3000`

**You'll see:**
- "Quiz Studio" title
- Form with: Name, Category, Difficulty, Count

**Fill in:**
- **Your Name**: Type your name
- **Category**: Select `Addition`
- **Difficulty**: Select `Easy`
- **Questions**: Select `5 Questions`
- Click **Start Quiz**

**Quiz starts:**
- See question: "Elsa has 3 toys. Olaf has 4 toys. How many toys do they have together?"
- Four multiple choice options
- Click correct answer: `7`
- Click **Next →**
- Continue through all questions

**Final Screen:**
- See your score: "4/5"
- Percentage: "80%"
- Message: "Great job! You did excellent!"
- Options to retake quiz or visit admin panel

✅ Complete quiz finished!

---

## 🌟 What's Happening Behind the Scenes

### When You Create a Question Template:
```
Template: "{character1} has {num1} toys. {character2} has {num2}..."
Stored in database as template
```

### When Quiz Generates:
```
1. Finds all matching questions
2. Picks random characters: Elsa, Olaf
3. Replaces {character1} → Elsa
4. Replaces {character2} → Olaf
5. Shows: "Elsa has 3 toys. Olaf has 4 toys..."
6. Next quiz might use: Mickey, Mickey (different characters!)
```

### When Student Answers:
```
1. Compares answer to correct answer
2. Shows immediate feedback (correct ✓ or try again ✗)
3. Calculates final score
4. Saves to database
```

---

## 🎨 How to Customize

### Change Colors
**Edit**: `/public/css/style.css`

Find line: `--primary-color: #6366f1;`

Change to any color: `#FF5733`, `#00AA00`, etc.

### Add More Characters
1. Admin → Characters
2. Add character to existing universe
3. Character automatically appears in next quiz

### Add More Questions
1. Admin → Questions
2. Create new template
3. Questions appear in quiz randomization

### Add New Universe
1. Admin → Universes
2. Add universe (e.g., "Marvel", "KPOP")
3. Then add characters to that universe

---

## 📱 Access from Phone/Tablet

### On Your Network:

1. **Find IP Address** (in Terminal):
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
# Look for: 192.168.1.100 or similar
```

2. **On Phone/Tablet Browser**:
   - Type: `192.168.1.100:3000`
   - See Quiz Studio!

3. **Students can take quizzes**:
   - All devices access same database
   - Scores saved for all
   - See history in Admin → Statistics

---

## 🔄 Complete Example: Disney to Marvel

### Add Marvel Universe
- Admin → Universes
- Name: `Marvel`
- Add Iron Man (🦾), Captain America (🛡️)

### Add New Question
- Category: `Subtraction`
- Template: `{character1} has {num1} shields. {character2} takes {num2} shields. How many shields left?`
- Placeholders: `character1,character2,num1,num2`
- Answer: `5`

### Take Marvel Quiz
- Main page → Select `Subtraction`, `Medium`
- See: "Iron Man has 8 shields. Captain America takes 3 shields..."
- Next quiz: "Captain America has 9 shields..."
- Different characters every time!

---

## ✨ Tips & Tricks

### Emoji Finder
- Google: "unicode emoji" or use emoji picker (Cmd+; on Mac)
- Copy-paste into emoji fields

### More Placeholder Ideas
```
{character1}, {character2}, {character3}  # Multiple characters
{num1}, {num2}, {num3}                    # Multiple numbers
{item}                                     # For different items
```

### Template Examples
```
Addition:
"{character1} made {num1} cupcakes. {character2} made {num2} cupcakes. Total?"

Subtraction:
"{character1} had {num1} dollars. Spent {num2} dollars. Left with?"

Multiplication:
"{character1} has {num1} boxes with {num2} items each. Total items?"

Division:
"{character1} shared {num1} candies among {num2} friends. Each gets?"
```

### Difficulty Tips
- **Easy**: Single digit numbers, simple operations
- **Medium**: Larger numbers, compound sentences
- **Hard**: Multi-step problems, complex scenarios

---

## 🆘 Troubleshooting

### Server won't start
```bash
# Check if port is in use
lsof -i :3000

# Use different port
PORT=3001 npm start
```

### Can't see characters in quiz
- Admin panel → check character added ✓
- Check universe selected ✓
- Questions use {character1}, {character2} ✓

### Forgot to add placeholders
- Admin → Questions
- Make sure: "{character1} has {num1}..." 
- Make sure list: "character1,num1,..."

### Want to start over
```bash
# Delete database
rm database/quiz.db

# Restart (recreates empty database)
npm start
```

---

## 📊 Tracking Progress

**Admin Panel → Statistics shows:**
- Total questions in library
- Total characters available
- Total universes
- Total quiz sessions taken
- Recent quiz history with scores

**View Quiz History:**
- Student names
- Scores and percentages
- Exact date and time taken

---

## 🚀 Next Level: Always-On Deployment

Once comfortable, deploy to:

### Raspberry Pi
```bash
# On Pi
ssh pi@raspberrypi.local
cd /path/to/quiz-studio
npm install
npm start

# Access from anywhere
http://raspberrypi.local:3000
```

### Old Laptop
- Leave running 24/7
- Family accesses anytime
- Always tracks progress

---

## 🎉 You're Done!

You now have a complete, customizable, fun math quiz application!

- ✅ Install dependencies: `npm install`
- ✅ Start server: `npm start`
- ✅ Add universes and characters
- ✅ Create question templates
- ✅ Take quizzes
- ✅ Track progress
- ✅ Share with family

**Happy teaching!** 📚✨

For full documentation, see: `README.md` or `PROJECT_SETUP.md`
