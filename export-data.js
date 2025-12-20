#!/usr/bin/env node

/**
 * Export all quiz data from sql.js database to JSON files
 * Run: node export-data.js
 */

const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'database', 'quiz.db');
const DATA_DIR = path.join(__dirname, 'public', 'data');

async function exportData() {
  try {
    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // Initialize sql.js
    const SQL = await initSqlJs();
    
    // Load database
    if (!fs.existsSync(DB_PATH)) {
      console.log('Database file not found. Creating empty data files...');
      createEmptyDataFiles();
      return;
    }

    const filebuffer = fs.readFileSync(DB_PATH);
    const db = new SQL.Database(filebuffer);

    // Export character_universes
    const universes = db.exec('SELECT * FROM character_universes');
    const universesData = universes.length > 0 ? formatQueryResult(universes[0]) : [];
    fs.writeFileSync(
      path.join(DATA_DIR, 'universes.json'),
      JSON.stringify(universesData, null, 2)
    );
    console.log(`✓ Exported ${universesData.length} character universes`);

    // Export characters
    const characters = db.exec('SELECT * FROM characters');
    const charactersData = characters.length > 0 ? formatQueryResult(characters[0]) : [];
    fs.writeFileSync(
      path.join(DATA_DIR, 'characters.json'),
      JSON.stringify(charactersData, null, 2)
    );
    console.log(`✓ Exported ${charactersData.length} characters`);

    // Export questions
    const questions = db.exec('SELECT * FROM questions');
    let questionsData = questions.length > 0 ? formatQueryResult(questions[0]) : [];
    
    // Parse placeholders JSON
    questionsData = questionsData.map(q => ({
      ...q,
      placeholders: q.placeholders ? JSON.parse(q.placeholders) : []
    }));
    
    fs.writeFileSync(
      path.join(DATA_DIR, 'questions.json'),
      JSON.stringify(questionsData, null, 2)
    );
    console.log(`✓ Exported ${questionsData.length} questions`);

    // Export quiz sessions (for reference)
    const sessions = db.exec('SELECT * FROM quiz_sessions');
    const sessionsData = sessions.length > 0 ? formatQueryResult(sessions[0]) : [];
    fs.writeFileSync(
      path.join(DATA_DIR, 'sessions.json'),
      JSON.stringify(sessionsData, null, 2)
    );
    console.log(`✓ Exported ${sessionsData.length} quiz sessions`);

    db.close();
    console.log('\n✅ All data exported successfully!');
    console.log(`📁 Data files location: ${DATA_DIR}`);

  } catch (err) {
    console.error('❌ Export failed:', err.message);
    process.exit(1);
  }
}

function formatQueryResult(result) {
  const { columns, values } = result;
  return values.map(row => {
    const obj = {};
    columns.forEach((col, idx) => {
      obj[col] = row[idx];
    });
    return obj;
  });
}

function createEmptyDataFiles() {
  fs.writeFileSync(path.join(DATA_DIR, 'universes.json'), JSON.stringify([], null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'characters.json'), JSON.stringify([], null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'questions.json'), JSON.stringify([], null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'sessions.json'), JSON.stringify([], null, 2));
  console.log('✓ Created empty data files');
}

exportData();
