# Quiz Studio - Frontend Only Edition

A fun, interactive quiz application hosted entirely on GitHub Pages with no backend required! 🎓

## Features

✨ **Frontend Only** - No server or database needed
📱 **Responsive Design** - Works on desktop, tablet, and mobile
🎨 **Beautiful UI** - Clean and modern interface
💾 **Data Persistence** - Quiz progress saved to browser localStorage
📊 **Quiz Analytics** - View quiz history and statistics
🔧 **Admin Panel** - Manage questions and track results

## Quick Start

1. **Clone**: `git clone https://github.com/yourusername/quiz-studio.git`
2. **Open**: Open `public/index.html` in your browser
3. **Deploy**: Push to GitHub, enable GitHub Pages with `/public` folder as source

👥 **Character-Based Questions**
- Use cartoon characters, movie characters, KPOP stars in quiz questions
- Randomly selected characters make each quiz unique and fun
- Support for custom character universes (Disney, Marvel, Studio Ghibli, etc.)

📊 **Admin Panel**
- Easily add new characters and universes
- Create customizable question templates
- View quiz statistics and student performance
- No coding required!

🏠 **Home Network Friendly**
- Single Node.js server
- SQLite database (no external DB needed)
- Can run on Raspberry Pi or old laptop
- Easy local IP access for family

## Quick Start

### Prerequisites
- Node.js 14+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)

### Installation

1. **Clone or download the project**
   ```bash
   cd quiz-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Access the application**
   - Quiz: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

### For Home Network Access

1. Find your computer's IP address:
   - **Mac/Linux**: Run `ifconfig` in terminal, look for `inet` address (usually 192.168.x.x)
   - **Windows**: Run `ipconfig` in terminal, look for IPv4 Address

2. Access from other devices on your network:
   - Quiz: http://YOUR_IP_ADDRESS:3000
   - Admin: http://YOUR_IP_ADDRESS:3000/admin

## Usage

### Create Your Character Library

1. Go to **Admin Panel** → **Universes**
2. Add universes (e.g., "Disney", "Marvel", "KPOP Stars")
3. Go to **Characters**
4. Add characters to each universe
5. Add emoji icons for visual appeal!

### Create Math Questions

1. Go to **Admin Panel** → **Questions**
2. Create question templates using placeholders:
   ```
   {character1} has {num1} apples. 
   {character2} gives them {num2} more. 
   How many apples does {character1} have now?
   ```
3. List placeholders: `character1,character2,num1,num2`
4. Enter the correct answer
5. Save!

### Take a Quiz

1. Go to the main page
2. Enter your name
3. Choose category and difficulty
4. Start the quiz!
5. Questions will automatically use random characters from your library

## Architecture

```
quiz-studio/
├── server/
│   ├── server.js              # Main Express server
│   ├── routes/
│   │   ├── characters.js      # Character & universe API
│   │   ├── questions.js       # Questions API
│   │   └── quiz.js            # Quiz generation & scoring
│   └── models/
│       └── database.js        # SQLite database setup
├── public/
│   ├── index.html             # Main quiz interface
│   ├── admin.html             # Admin panel
│   ├── css/
│   │   ├── style.css          # Main styles
│   │   └── admin.css          # Admin panel styles
│   └── js/
│       ├── quiz.js            # Quiz logic
│       └── admin.js           # Admin logic
├── database/
│   └── quiz.db                # SQLite database (auto-created)
└── package.json
```

## Database Schema

**character_universes**
- Universe names and descriptions

**characters**
- Character names, emojis, images, and universe association

**questions**
- Question templates with placeholders, category, difficulty, answers

**quiz_sessions**
- Student names, scores, and quiz timestamps

## API Endpoints

### Characters
- `GET /api/characters` - Get all characters
- `GET /api/characters/:universeId` - Get characters by universe
- `POST /api/characters` - Add new character
- `GET /api/characters/universes` - Get all universes
- `POST /api/characters/universes` - Add new universe

### Questions
- `GET /api/questions` - Get all questions
- `GET /api/questions/:category` - Get by category
- `POST /api/questions` - Add new question

### Quiz
- `POST /api/quiz/generate` - Generate quiz with random characters
- `POST /api/quiz/session` - Save quiz results
- `GET /api/quiz/history` - Get quiz history

## Example: Adding Disney Characters

### Step 1: Add Universe
- Admin Panel → Universes
- Name: `Disney`
- Description: `Disney animated characters`

### Step 2: Add Characters
- Admin Panel → Characters
- Add Elsa: 👸, Emoji: ❄️
- Add Olaf: ☃️
- Add Mickey: 🐭

### Step 3: Create Question Template
- Admin Panel → Questions
- Category: Addition
- Difficulty: Easy
- Template: `{character1} has {num1} apples. {character2} has {num2} apples. How many apples do they have together?`
- Placeholders: `character1,character2,num1,num2`
- Answer: (will be calculated by student)

### Step 4: Take Quiz
- Main page → Select "Addition" category
- Quiz generates: `Elsa has 3 apples. Olaf has 2 apples. How many apples do they have together?`
- Student answers and gets feedback!

## Deployment

### Running in Background (Mac/Linux)
```bash
nohup npm start > quiz.log 2>&1 &
```

### Running on Startup
Add to crontab or create a systemd service.

### Run on Raspberry Pi
```bash
# SSH into Pi
ssh pi@raspberrypi.local

# Clone project and follow installation steps
cd quiz-studio
npm install
npm start
```

Then access from any device: `http://raspberrypi.local:3000`

## Tips for Teachers/Parents

1. **Theme-Based Quizzes**: Create universes around topics your students love
2. **Difficulty Progression**: Start easy, increase difficulty as students improve
3. **Celebrate Success**: Fun characters + instant feedback builds confidence
4. **Customization**: Add local characters, pets, or family names for extra fun!
5. **Multiple Sessions**: Track progress over time in the Statistics section

## Troubleshooting

**Port 3000 already in use?**
```bash
npm start -- --port 3001
# Or set PORT environment variable
PORT=3001 npm start
```

**Can't access from other devices?**
- Check firewall settings
- Verify IP address: `ifconfig` (Mac/Linux) or `ipconfig` (Windows)
- Make sure on same network

**Database errors?**
- Delete `database/quiz.db` file
- Server will recreate it on startup

## License

MIT

## Support

For issues or suggestions, check the README or restart the server!

Happy quizzing! 🎉
