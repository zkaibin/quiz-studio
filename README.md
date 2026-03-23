# 🎓 Quiz Studio

**Singapore Primary School Practice Platform** - A comprehensive learning platform for Mathematics and Science with interactive quizzes, character-themed questions, and visual concept maps!

[![Questions](https://img.shields.io/badge/Questions-1200+-blue)]()
[![Subjects](https://img.shields.io/badge/Subjects-2-green)]()
[![Themes](https://img.shields.io/badge/Character_Themes-11-purple)]()
[![Levels](https://img.shields.io/badge/Levels-6-orange)]()
[![Games](https://img.shields.io/badge/Fun_Games-14-red)]()

## ✨ Features

### Mathematics
- **📚 830 Math Questions** - Comprehensive coverage from P1-P2 to PSLE level including 190 challenging problems across 18 specialized types
- **🎭 11 Character Themes** - Disney, Pixar, Cartoon Network, K-POP (ENHYPEN, Stray Kids, BABYMONSTER, ITZY), Marvel Avengers, Dragon Ball Z, DARK MOON, and Nezha
- **📊 Multiple Categories** - Addition, Subtraction, Multiplication, Division, Fractions, Decimals, Percentages, Ratios, Speed, Time, Money, Measurement, Mixed Operations, and Averages
- **🎯 6 Difficulty Levels** - P1-P2, P3-P4, P5-P6, PSLE, Challenging

### Science
- **🔬 371 Science Questions** - Covering all major topics for P3-P6 levels
  - **330 Regular Questions** across 15 core topics
  - **41 Experiment Questions** with structured setup, data, and analysis
- **📚 13 Interactive Concept Maps** - Visual learning tool for key science concepts
- **🎨 Character Theme Support** - Same character themes available for science questions
- **🧪 Hands-on Experiments** - Real experiment scenarios with observations and conclusions
- **📖 15 Science Topics** - Living Things, Materials, Cycles, Energy, Forces, Electricity, Matter, Light, Heat, Adaptations, Cells, Reproduction, Human Body, Environment, Sound

### Fun Games
- **🎮 14 Playable Games** - Arcade, word, and quiz-style mini games on one page
- **🀄 Chengyu Quiz** - 600+ idioms in the question library with 20 random questions per game session
- **🧭 Chengyu Category Filters** - Switch between All, Beginner, Intermediate, and Advanced sets
- **🎤 K-POP Quizzes** - Group and idol emoji quiz modes
- **🧩 Variety Pack** - Includes Tic-Tac-Toe, Rock Paper Scissors, Memory Match, Guess the Number, Snake, Simon Says, Whack-a-Mole, 2048, Word Scramble, Math Challenge, and Hangman
- **🔤 Expanded Word Banks** - Word Scramble and Hangman now use larger JSON libraries and 20-question random rounds

### General Features
- **✨ Frontend Only** - No server or database needed, runs entirely in the browser
- **💾 Local Storage** - Quiz progress and results saved locally
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **📝 Print Mode** - Generate printable practice papers
- **🎯 Randomized Replayability** - Games and quizzes reshuffle questions and prompts for each run

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

### Math Quiz

1. Open `index.html` or visit the deployed site
2. Click on "Math Quiz"
3. Enter your name
4. Select:
   - **Category** (e.g., Addition, Fractions, Mixed Operations)
   - **Difficulty** (P1-P2, P3-P4, P5-P6, PSLE, Challenging)
   - **Character Theme** (Disney, K-POP, Marvel, etc.)
5. Click "Start Quiz"
6. Answer questions and get instant feedback
7. Review your results at the end

### Science Quiz

1. Open `index.html` or visit the deployed site
2. Click on "Science Quiz"
3. Enter your name
4. Select:
   - **Topic** (e.g., Living Things, Energy, Forces)
   - **Level** (P3-P4, P5-P6, PSLE)
   - **Character Theme** (Optional - for themed questions)
5. Click "Start Quiz"
6. Answer questions with detailed explanations
7. Review your performance

### Science Concept Maps

1. Click on "Study Concept Maps" from the homepage or science quiz page
2. Select a topic from the dropdown menu
3. Study the visual concept maps with:
   - Key concepts and definitions
   - Examples and explanations
   - Color-coded sections for easy learning
   - Comprehensive coverage of each topic
4. Use as a study guide before taking quizzes

### Fun Games Hub

1. Open `games.html` from the homepage
2. Pick any game card to launch the modal
3. For **成语游戏 Chengyu Quiz**:
   - Questions are randomly selected from a **600+ idiom library**
   - Each round contains **20 questions**
   - Use **Category** filters to focus practice by level
   - Meanings include both English and Chinese
4. For **Word Scramble** and **Hangman**:
   - Questions are drawn from JSON word libraries in `data/`
   - Each run is capped at **20 random questions**
   - Click **New 20** to reshuffle a fresh set
5. Click **Play Again** to get a fresh random set

### Paper Generator

1. Click on "PSLE Practice Paper"
2. Configure your custom practice paper
3. Print or download for offline practice

## 📁 Project Structure

```
quiz-studio/
├── index.html                      # Landing page
├── games.html                      # Fun games hub
├── quiz.html                       # Math quiz interface
├── science-quiz.html               # Science quiz interface
├── science-concepts.html           # Science concept maps
├── paper-generator.html            # Print quiz papers
├── css/
│   ├── style.css                   # Main styles
│   └── print.css                   # Print styles
├── js/
│   ├── quiz.js                     # Math quiz logic & character substitution
│   ├── games.js                    # Mini games and Chengyu quiz logic
│   ├── science-quiz.js             # Science quiz logic
│   ├── science-concepts.js         # Concept map data & interactions
│   ├── data-loader.js              # JSON data loading & management
│   └── paper-generator.js          # Quiz paper generation
├── data/
│   ├── questions-p1-p2.json        # 174 P1-P2 math questions
│   ├── questions-p3-p4.json        # 179 P3-P4 math questions
│   ├── questions-p5-p6.json        # 177 P5-P6 math questions
│   ├── questions-psle.json         # 70 PSLE math questions
│   ├── questions-challenging.json  # 190 challenging math questions
│   ├── questions-science.json      # 80 science questions
│   ├── chengyu-library.json        # 600+ Chengyu idioms for random quiz sets
│   ├── word-scramble-library.json  # Word Scramble library
│   ├── hangman-library.json        # Hangman library
│   ├── characters.json             # 103 characters
│   └── universes.json              # 11 character universes
├── scripts/
│   ├── generate-questions.js       # Question generation tool
│   ├── validate-all-questions.js   # Question validation
│   └── check-distribution.js       # Distribution analysis
├── count-questions.js              # Automated question counter
├── CHALLENGING_PROBLEM_TYPES.md    # Problem type reference (18 types)
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

**1200+ Total Questions** across Math and Science:

### Mathematics (830 Questions)

#### Standard Categories
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

#### Challenging Problem Types (190 Questions)
Advanced PSLE-level problems covering **18 specialized types**:

1. **Chicken-Rabbit Problems** - Assumption method with different attributes
2. **Excess-Shortage Problems** - Different grouping scenarios
3. **Pattern Recognition** - Number sequences and figure patterns
4. **Tree Planting Problems** - Interval and spacing calculations
5. **Age Problems** - Before-after age relationships
6. **Fraction of Remainder** - Multi-step fraction operations
7. **Speed-Distance-Time** - Complex motion problems
8. **Area-Perimeter** - Advanced geometry
9. **Before-After Concept** - Quantity change scenarios
10. **Advanced Ratios** - Multi-level ratio problems
11. **Percentage Change** - Discount, profit, loss calculations
12. **Volume-Capacity** - 3D measurement problems
13. **Work Rate Problems** - Combined work and efficiency
14. **Remainder Problems** - Modular arithmetic (Chinese Remainder Theorem)
15. **Repeated Identity** - Equal quantities and relationships
16. **Purchasing Problems** - Systems of equations
17. **Logic & Reasoning** - Ordering, ranking, Venn diagrams
18. **Unchanging Total** - Transfer problems with constant sum

See **CHALLENGING_PROBLEM_TYPES.md** for detailed descriptions of each problem type.

### Science (371 Questions)

Comprehensive coverage across **16 categories** for P3-P6:

#### Regular Questions (330 Questions)
20+ questions per topic covering:
1. **Living Things** - MRS GREN, life cycles, plant functions
2. **Materials** - Properties, magnetic materials, absorbency
3. **Cycles** - Water cycle, evaporation, condensation
4. **Energy** - Forms of energy, energy conversion
5. **Forces** - Types of forces, friction, motion
6. **Electricity** - Circuits, conductors, insulators
7. **Matter** - States of matter, changes, properties
8. **Light** - Properties, reflection, refraction, shadows
9. **Heat** - Transfer methods, conductors, insulators
10. **Adaptations** - Plant and animal adaptations
11. **Cells** - Cell structure, plant vs animal cells
12. **Reproduction** - Plant reproduction, pollination
13. **Human Body** - Body systems, organs, functions
14. **Environment** - Ecosystems, pollution, conservation
15. **Sound** - Vibrations, pitch, volume

#### Experiment Questions (41 Questions)
Hands-on experiment scenarios with:
- **🧪 Structured Setup** - Clear experimental procedures
- **📊 Data & Observations** - Tables, measurements, results
- **🎯 Analysis Questions** - Conclusions and scientific reasoning
- **Topics covered**: All 15 core topics plus cross-topic investigations
- **Visual formatting**: Blue-tinted setup boxes, gray data tables
- **Character integration**: Dynamic character placeholders in experiments

### Science Concept Maps (13 Topics)

Interactive visual learning materials covering:
- Living Things, Materials, Cycles, Energy, Forces
- Electricity, Matter, Light, Heat, Adaptations
- Cells, Reproduction, Human Body Systems

Each concept map includes:
- Key concepts and definitions
- Visual diagrams and examples
- Color-coded sections for easy understanding
- Comprehensive explanations for exam preparation

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

- ✅ **Added 180 challenging questions** across 18 specialized problem types (Q750-Q929)
- ✅ Created automated question counter (`count-questions.js`)
- ✅ Added problem type reference guide (CHALLENGING_PROBLEM_TYPES.md)
- ✅ Updated total questions: **790 questions** (was 610)
- ✅ Fixed character duplication bug (no more "Gohan giving to Gohan")
- ✅ Added AM/PM to all time questions for clarity
- ✅ Added Nezha universe with 8 characters
- ✅ All questions verified for mathematical correctness
- ✅ Cleaned up temporary scripts and documentation

## 🛠️ Development Guide

### Adding New Questions

1. **Choose the appropriate file** based on difficulty:
   - `data/questions-p1-p2.json` - Primary 1-2
   - `data/questions-p3-p4.json` - Primary 3-4
   - `data/questions-p5-p6.json` - Primary 5-6
   - `data/questions-psle.json` - PSLE level
   - `data/questions-challenging.json` - Advanced challenging problems

2. **Follow the question format**:
   ```json
   {
     "id": "Q791",
     "category": "Age Problems",
     "difficulty": "Challenging",
     "template": "{CHARACTER_0} is 3 times as old as {CHARACTER_1}...",
     "placeholder_roles": ["protagonist", "helper"],
     "options": ["24", "27", "21", "30"],
     "answer": 1,
     "correct_answer": "27"
   }
   ```

3. **Key guidelines**:
   - Use unique IDs (check highest existing ID)
   - Use placeholders: `{CHARACTER_0}`, `{CHARACTER_1}`, `{CHARACTER_2}`
   - Specify roles: `["protagonist", "helper", "antagonist", "hero"]`
   - Provide 4 options with answer index (0-3)
   - Include correct_answer as string for display
   - Verify mathematical correctness

4. **Update question count**:
   ```bash
   node count-questions.js
   ```
   This automatically updates the landing page (index.html) with the new total.

5. **Reference guide**: See `CHALLENGING_PROBLEM_TYPES.md` for problem type examples and templates

### Adding New Characters

1. **Open** `data/characters.json`

2. **Add character entry**:
   ```json
   {
     "id": 104,
     "name": "New Character",
     "universe_id": 1,
     "emoji_icon": "🎯",
     "roles": ["protagonist", "hero"]
   }
   ```

3. **Key fields**:
   - `id` - Unique incrementing number
   - `name` - Character name
   - `universe_id` - Which universe (1-11)
   - `emoji_icon` - Optional emoji representation
   - `roles` - Array of roles: `protagonist`, `helper`, `antagonist`, `hero`, `mentor`, `leader`

4. **Universe IDs**:
   - 1: Disney
   - 2: Pixar
   - 3: Cartoon Network
   - 4: ENHYPEN
   - 5: Stray Kids
   - 6: BABYMONSTER
   - 7: ITZY
   - 8: Avengers
   - 9: DARK MOON
   - 10: Dragon Ball
   - 11: Nezha

### Adding New Universe

1. **Open** `data/universes.json`

2. **Add universe entry**:
   ```json
   {
     "id": 12,
     "name": "New Universe",
     "display_name": "New Universe",
     "emoji_icon": "🌟",
     "description": "Brief description"
   }
   ```

3. **Add characters** to `characters.json` with the new `universe_id`

4. **Update README** with the new universe and character count

### Validating Questions

Run validation scripts to check question integrity:

```bash
# Validate all questions
node scripts/validate-all-questions.js

# Check distribution across categories
node scripts/check-distribution.js

# Count total questions and update landing page
node count-questions.js
```

## 📖 Documentation

- **README.md** - This file (overview, setup, and development guide)
- **GETTING_STARTED.md** - Detailed user guide for taking quizzes
- **PROJECT_SETUP.md** - Development setup instructions
- **SAMPLE_QUESTIONS.md** - Question creation reference and examples
- **CHALLENGING_PROBLEM_TYPES.md** - Reference guide for 18 challenging problem types

## 🤝 Contributing

Questions are carefully curated for Singapore PSLE math curriculum. To contribute:

1. **Add questions** following the format in `data/questions-*.json`
2. **Ensure mathematical correctness** - all answers must be verified
3. **Use appropriate difficulty level** for the target audience
4. **Test character substitution** works properly
5. **Run validation** with `node scripts/validate-all-questions.js`
6. **Update count** with `node count-questions.js`

For major additions (e.g., new problem types), refer to `CHALLENGING_PROBLEM_TYPES.md` for examples and structure.

## 📝 License

MIT License - feel free to use for educational purposes!

## 🎉 Credits

Created for Singapore Primary School mathematics practice with a fun, character-based twist!

---

**Happy Learning! 🎓✨**
