# 🎓 Quiz Studio

**Singapore PSLE Math Practice Platform** - A fun, interactive quiz application for Primary 1-6 and PSLE-level mathematics with character-themed questions!

[![Questions](https://img.shields.io/badge/Questions-812-blue)]()
[![Themes](https://img.shields.io/badge/Character_Themes-11-purple)]()
[![Levels](https://img.shields.io/badge/PSLE_Levels-6-green)]()

## ✨ Features

- **📚 812 Math Questions** - Comprehensive coverage from P1-P2 to PSLE level
- **🎭 11 Character Themes** - Disney, Pixar, Cartoon Network, K-POP (ENHYPEN, Stray Kids, BABYMONSTER, ITZY), Marvel Avengers, Dragon Ball Z, DARK MOON, and Nezha
- **📊 Multiple Categories** - Addition, Subtraction, Multiplication, Division, Fractions, Decimals, Percentages, Ratios, Speed, Time, Money, Measurement, Mixed Operations, and Averages
- **🎯 6 Difficulty Levels** - P1-P2, P3-P4, P5-P6, PSLE, Challenging
- **✨ Frontend Only** - No server or database needed, runs entirely in the browser
- **💾 Local Storage** - Quiz progress and results saved locally
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)
Visit the live site: `https://yourusername.github.io/quiz-studio`

### Option 2: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/quiz-studio.git
   cd quiz-studio
   ```

2. **Open directly in browser**
   ```bash
   # Mac/Linux
   open index.html
   
   # Windows
   start index.html
   ```

3. **Or use a local server**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Then visit http://localhost:8000
   ```

## 🎮 How to Use

### Taking a Quiz

1. Open `index.html` or visit the deployed site
2. Enter your name
3. Select:
   - **Category** (e.g., Addition, Fractions, Mixed Operations)
   - **Difficulty** (P1-P2, P3-P4, P5-P6, PSLE, Challenging)
   - **Character Theme** (Disney, K-POP, Marvel, etc.)
4. Click "Start Quiz"
5. Answer questions and get instant feedback
6. Review your results at the end

### Question Library

The quiz uses pre-built question libraries stored in JSON files. All questions are carefully curated for the Singapore PSLE math curriculum with verified correct answers.

## 📁 Project Structure

```
quiz-studio/
├── index.html              # Landing page
├── quiz.html               # Quiz interface
├── paper-generator.html    # Print quiz papers
├── css/
│   ├── style.css           # Main styles
│   └── print.css           # Print styles
├── js/
│   ├── quiz.js             # Quiz logic & character substitution
│   ├── data-loader.js      # JSON data loading & management
│   └── paper-generator.js  # Quiz paper generation
├── data/
│   ├── questions-p1-p2.json       # 174 P1-P2 questions
│   ├── questions-p3-p4.json       # 179 P3-P4 questions
│   ├── questions-p5-p6.json       # 177 P5-P6 questions
│   ├── questions-psle.json        # 70 PSLE questions
│   ├── questions-challenging.json # 10 challenging questions
│   ├── characters.json             # 103 characters
│   └── universes.json              # 11 character universes
├── scripts/
│   └── generate-questions.js      # Question generation tool
└── README.md

```

## 🎭 Character Themes

The quiz features **11 character universes** with **103 unique characters**:

1. **Disney** - Mickey Mouse, Minnie Mouse, Donald Duck
2. **Pixar** - Woody, Buzz Lightyear, Nemo
3. **Cartoon Network** - Finn, Jake, Ben 10
4. **ENHYPEN** (K-POP) - Heeseung, Jay, Jake, Sunghoon, Sunoo, Jungwon, Ni-ki
5. **Stray Kids** (K-POP) - Bang Chan, Lee Know, Changbin, Hyunjin, Han, Felix, Seungmin, I.N
6. **BABYMONSTER** (K-POP) - Ruka, Pharita, Asa, Ahyeon, Rami, Rora, Chiquita
7. **ITZY** (K-POP) - Yeji, Lia, Ryujin, Chaeryeong, Yuna
8. **Avengers** - Iron Man, Captain America, Thor, Black Widow, Hulk, Hawkeye
9. **DARK MOON** - Heli, Jaan, Solon, Shion, Jakah, Jino, Noa
10. **Dragon Ball** - Goku, Vegeta, Gohan, Piccolo, Trunks, Krillin, Bulma
11. **Nezha** - Nezha, Ao Bing, Taiyi, Li Jing, Lady Yin, Shen Gongbao, Dragon King

Characters are randomly assigned to questions, making each quiz unique and engaging!

## 📚 Question Categories & Coverage

**812 Total Questions** across all difficulty levels:

- **Addition** - Basic sums to complex multi-step problems
- **Subtraction** - Simple differences to multi-level subtraction
- **Multiplication** - Times tables to multi-digit multiplication
- **Division** - Equal sharing to complex division with remainders
- **Fractions** - Basic fractions to complex fraction operations
- **Decimals** - Decimal operations and conversions
- **Percentages** - Percentage calculations and real-world applications
- **Ratios** - Simple ratios to complex ratio problems
- **Speed** - Distance, time, and speed calculations
- **Time** - Time duration and elapsed time (all with clear AM/PM)
- **Money** - Currency calculations and word problems
- **Measurement** - Area, perimeter, volume calculations
- **Mixed Operations** - Multi-step problems combining operations
- **Averages** - Mean, median, and average calculations

## 🔧 Technical Details

### How Character Substitution Works

Questions use placeholders like `{CHARACTER_0}`, `{CHARACTER_1}` which are dynamically replaced with characters from your selected theme. The system ensures:

- **No duplicate characters** in the same question
- **Role-appropriate selection** (protagonist, helper, antagonist, etc.)
- **Theme filtering** - only shows characters from selected universe

Example:
```
Template: "{CHARACTER_0} has {num1} apples. {CHARACTER_1} gives them {num2} more."

With Disney theme becomes:
"Mickey Mouse has 5 apples. Minnie Mouse gives him 3 more."

With Dragon Ball theme becomes:
"Goku has 5 apples. Vegeta gives him 3 more."
```

### Data Format

All data is stored in JSON files:

**Questions** (`data/questions-*.json`):
```json
{
  "id": "Q760",
  "category": "Fractions",
  "difficulty": "PSLE",
  "template": "{CHARACTER_0} has a bag of 120 marbles...",
  "placeholder_roles": ["protagonist", "helper", "hero"],
  "options": ["54", "48", "36", "60"],
  "answer": 0,
  "correct_answer": "54"
}
```

**Characters** (`data/characters.json`):
```json
{
  "id": 96,
  "name": "Nezha",
  "universe_id": 11,
  "emoji_icon": "🔥",
  "roles": ["protagonist", "hero", "leader"]
}
```

## 🚀 Deployment

### GitHub Pages

1. Push code to GitHub
2. Go to Settings → Pages
3. Set source to `main` branch and `/` (root) folder
4. Your quiz will be live at `https://yourusername.github.io/quiz-studio`

### Local Network Access

1. Start a local server:
   ```bash
   python -m http.server 8000
   ```

2. Find your IP address:
   ```bash
   # Mac/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

3. Access from other devices on the same network:
   ```
   http://YOUR_IP_ADDRESS:8000
   ```

## 🎯 Recent Updates

- ✅ Fixed character duplication bug (no more "Gohan giving to Gohan")
- ✅ Added AM/PM to all time questions for clarity
- ✅ Added 20 new PSLE questions (70 total PSLE questions)
- ✅ Added Nezha universe with 8 characters
- ✅ Cleaned up documentation (36 redundant files removed)
- ✅ All questions verified for mathematical correctness

## 📖 Documentation

- **README.md** - This file (overview and setup)
- **GETTING_STARTED.md** - Detailed user guide
- **PROJECT_SETUP.md** - Development setup instructions
- **SAMPLE_QUESTIONS.md** - Question creation reference

## 🤝 Contributing

Questions are carefully curated for Singapore PSLE math curriculum. To add questions:

1. Follow the format in existing `data/questions-*.json` files
2. Ensure mathematical correctness
3. Use appropriate difficulty level
4. Test with character substitution

## 📝 License

MIT License - feel free to use for educational purposes!

## 🎉 Credits

Created for Singapore Primary School mathematics practice with a fun, character-based twist!

---

**Happy Learning! 🎓✨**
