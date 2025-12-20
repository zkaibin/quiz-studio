const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'server/models/quiz.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error:', err);
    process.exit(1);
  }
  
  console.log('Connected');
  
  // Test 1: Get all questions
  db.all('SELECT * FROM questions', (err, rows) => {
    console.log('All questions:', rows.length);
    rows.forEach(r => console.log(`  ${r.id} | ${r.category} | ${r.difficulty}`));
    
    // Test 2: Get with category filter
    db.all('SELECT * FROM questions WHERE category = ?', ['addition'], (err, rows) => {
      console.log('\nAddition questions:', rows.length);
      rows.forEach(r => console.log(`  ${r.id} | ${r.category} | ${r.difficulty}`));
      
      // Test 3: Get with both filters
      db.all('SELECT * FROM questions WHERE category = ? AND difficulty = ?', ['addition', 'easy'], (err, rows) => {
        console.log('\nAddition easy questions:', rows.length);
        rows.forEach(r => console.log(`  ${r.id} | ${r.category} | ${r.difficulty}`));
        
        db.close();
      });
    });
  });
});
