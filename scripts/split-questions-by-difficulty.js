/**
 * Script to split questions.json into 3 files by difficulty level
 * Creates: questions-easy.json, questions-medium.json, questions-hard.json
 */

const fs = require('fs');
const path = require('path');

const questionsPath = path.join(__dirname, '../data/questions.json');
const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

// Group questions by difficulty
const easyQuestions = questions.filter(q => q.difficulty === 'Easy');
const mediumQuestions = questions.filter(q => q.difficulty === 'Medium');
const hardQuestions = questions.filter(q => q.difficulty === 'Hard');

// Write to separate files
const dataDir = path.join(__dirname, '../data');

fs.writeFileSync(
  path.join(dataDir, 'questions-easy.json'),
  JSON.stringify(easyQuestions, null, 2),
  'utf8'
);

fs.writeFileSync(
  path.join(dataDir, 'questions-medium.json'),
  JSON.stringify(mediumQuestions, null, 2),
  'utf8'
);

fs.writeFileSync(
  path.join(dataDir, 'questions-hard.json'),
  JSON.stringify(hardQuestions, null, 2),
  'utf8'
);

console.log('✅ Successfully split questions by difficulty:');
console.log(`  📘 Easy: ${easyQuestions.length} questions`);
console.log(`  📗 Medium: ${mediumQuestions.length} questions`);
console.log(`  📕 Hard: ${hardQuestions.length} questions`);
console.log(`  📊 Total: ${questions.length} questions`);

// Keep original questions.json for backup/reference
console.log('\n💡 Original questions.json kept as backup');
