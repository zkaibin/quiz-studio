# Migration Guide: SQLite3 → better-sqlite3

## Why Migrate?

- **sqlite3**: Async callbacks, needs compilation, no pre-built ARM binaries
- **better-sqlite3**: Synchronous, pre-built ARM binaries, works on Synology immediately

## Step 1: Install better-sqlite3 (On Mac)

```bash
cd /Users/zkaibin/website/quiz-studio
npm install --save better-sqlite3
```

## Step 2: Update database.js

Replace the entire file with this version:

```javascript
const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'quiz.db');

class DatabaseManager {
  constructor() {
    this.db = null;
  }

  init() {
    return new Promise((resolve, reject) => {
      try {
        this.db = new Database(DB_PATH);
        console.log('Connected to SQLite database');
        this.createTables();
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  createTables() {
    // CharacterUniverse table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS character_universes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        universe_name TEXT NOT NULL UNIQUE,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Characters table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS characters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        universe_id INTEGER NOT NULL,
        emoji_icon TEXT,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (universe_id) REFERENCES character_universes(id)
      )
    `);

    // Questions table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        template TEXT NOT NULL,
        placeholders TEXT,
        answer INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // QuizSessions table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS quiz_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_name TEXT,
        score INTEGER,
        total_questions INTEGER,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database tables created/verified');
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      try {
        const stmt = this.db.prepare(sql);
        stmt.run(...params);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      try {
        const stmt = this.db.prepare(sql);
        const row = stmt.get(...params);
        resolve(row);
      } catch (err) {
        reject(err);
      }
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      try {
        const stmt = this.db.prepare(sql);
        const rows = stmt.all(...params);
        resolve(rows);
      } catch (err) {
        reject(err);
      }
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      try {
        if (this.db) {
          this.db.close();
          console.log('Database connection closed');
        }
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = new DatabaseManager();
```

## Key Changes Explained

### Old (sqlite3):
```javascript
const sqlite3 = require('sqlite3').verbose();
this.db = new sqlite3.Database(DB_PATH, (err) => {
  // Async callback
});
this.db.run(sql, params, (err) => {
  // Callback with error
});
```

### New (better-sqlite3):
```javascript
const Database = require('better-sqlite3');
this.db = new Database(DB_PATH);
// Synchronous - instant!

const stmt = this.db.prepare(sql);
stmt.run(...params);
// Synchronous - returns immediately
```

### What Changed:

| Feature | sqlite3 | better-sqlite3 |
|---------|---------|-----------------|
| Require | `require('sqlite3').verbose()` | `require('better-sqlite3')` |
| Connect | `new sqlite3.Database(path, cb)` | `new Database(path)` |
| Execution | Async with callbacks | Synchronous |
| Run Query | `db.run(sql, params, cb)` | `db.prepare(sql).run(...params)` |
| Get Single | `db.get(sql, params, cb)` | `db.prepare(sql).get(...params)` |
| Get Multiple | `db.all(sql, params, cb)` | `db.prepare(sql).all(...params)` |
| Error Handling | Callback error | try/catch |
| Params | Array: `[param1, param2]` | Spread: `...params` |

## Step 3: Test Locally (On Mac)

```bash
cd /Users/zkaibin/website/quiz-studio

# Install dependencies
npm install

# Start server
npm start

# Test in another terminal
curl http://localhost:3000/api/health
```

Should return: `{"status":"ok"}`

## Step 4: Test Locally with Quiz

1. Open browser: `http://localhost:3000`
2. Click "Start a Quiz"
3. Select options (Addition, Easy, 5 questions)
4. Answer questions
5. Submit
6. Check if score appears ✅

## Step 5: Copy to Synology

```bash
# From Mac, copy everything
scp -r /Users/zkaibin/website/quiz-studio user@synology:/volume1/homes/zkaibin/website/quiz-studio-new

# SSH into Synology
ssh user@synology

# Go to new directory
cd /volume1/homes/zkaibin/website/quiz-studio-new

# Install (with --ignore-scripts flag)
npm install --no-optional --ignore-scripts

# Start
npm start
```

## Step 6: Verify on Synology

```bash
# Test 1: Check better-sqlite3 installed
ls node_modules/ | grep sqlite

# Test 2: Check bindings exist
ls node_modules/better-sqlite3/build/Release/

# Test 3: Start server
npm start

# Test 4: In another terminal, test API
curl http://localhost:3000/api/health
```

## Backwards Compatibility

✅ **All existing features work the same**:
- Quiz creation
- Question storage
- Answer calculation
- Score saving
- All APIs return same JSON

❌ **No changes needed** in:
- HTML files
- CSS files
- quiz.js
- API routes
- Server setup

## Common Issues After Migration

### Issue 1: "Cannot find module 'sqlite3'"
**Fix**: The error goes away once you update the require statement

### Issue 2: "SQLITE_CANTOPEN"
**Fix**: Make sure database directory exists:
```bash
mkdir -p server/models
```

### Issue 3: "TypeError: stmt is not defined"
**Fix**: Make sure you're using `db.prepare(sql)` first

## Rollback (If Needed)

If you need to go back to sqlite3:

```bash
npm remove better-sqlite3
npm install sqlite3

# Then revert database.js from git or backup
git checkout server/models/database.js
```

## Performance Improvement

better-sqlite3 is **faster** than sqlite3:
- No callback overhead
- Synchronous execution
- Better caching
- Lower memory usage

Expected: 2-5x faster for queries

## Summary

✅ Install: `npm install --save better-sqlite3`
✅ Update: Replace database.js (or see diff below)
✅ Test: `npm start` then test quiz functionality
✅ Deploy: Copy to Synology and run with `--ignore-scripts`
✅ Verify: Check API returns `{"status":"ok"}`

---

## Side-by-Side Code Comparison

### Callbacks (sqlite3 - OLD)
```javascript
this.db.all(sql, params, (err, rows) => {
  if (err) reject(err);
  else resolve(rows);
});
```

### Promises (better-sqlite3 - NEW)
```javascript
try {
  const stmt = this.db.prepare(sql);
  const rows = stmt.all(...params);
  resolve(rows);
} catch (err) {
  reject(err);
}
```

---

## Questions?

**Q: Will this break anything?**
A: No, it's a drop-in replacement with promise-based API

**Q: Is it production-ready?**
A: Yes, used in production by many apps

**Q: Can I go back to sqlite3?**
A: Yes, just revert the file

**Q: What about the database file?**
A: It's 100% compatible, just copy it over

