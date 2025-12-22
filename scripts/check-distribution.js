/**
 * Check question distribution by category and difficulty
 */

const fs = require('fs');
const path = require('path');

const questionsEasyPath = path.join(__dirname, '../data/questions-easy.json');
const questionsMediumPath = path.join(__dirname, '../data/questions-medium.json');
const questionsHardPath = path.join(__dirname, '../data/questions-hard.json');

const questionsEasy = JSON.parse(fs.readFileSync(questionsEasyPath, 'utf8'));
const questionsMedium = JSON.parse(fs.readFileSync(questionsMediumPath, 'utf8'));
const questionsHard = JSON.parse(fs.readFileSync(questionsHardPath, 'utf8'));

const categories = [
  'Addition', 'Subtraction', 'Multiplication', 'Division', 
  'Mixed Operations', 'Fractions', 'Decimals', 'Percentage',
  'Averages', 'Ratios', 'Time', 'Money'
];

function countByCategory(questions) {
  const counts = {};
  categories.forEach(cat => counts[cat] = 0);
  
  questions.forEach(q => {
    if (counts.hasOwnProperty(q.category)) {
      counts[q.category]++;
    }
  });
  
  return counts;
}

const easyCounts = countByCategory(questionsEasy);
const mediumCounts = countByCategory(questionsMedium);
const hardCounts = countByCategory(questionsHard);

console.log('📊 Question Distribution:\n');
console.log('Category               Easy   Medium   Hard   Total');
console.log('─────────────────────  ─────  ───────  ─────  ─────');

categories.forEach(cat => {
  const easy = easyCounts[cat];
  const medium = mediumCounts[cat];
  const hard = hardCounts[cat];
  const total = easy + medium + hard;
  
  const easyStr = String(easy).padStart(5);
  const mediumStr = String(medium).padStart(7);
  const hardStr = String(hard).padStart(5);
  const totalStr = String(total).padStart(5);
  const catStr = cat.padEnd(21);
  
  // Flag if below 15 per difficulty
  const flag = (easy < 15 || medium < 15 || hard < 15) ? ' ⚠️' : '';
  
  console.log(`${catStr}${easyStr}${mediumStr}${hardStr}${totalStr}${flag}`);
});

console.log('─────────────────────  ─────  ───────  ─────  ─────');
console.log(`Total                   ${String(questionsEasy.length).padStart(5)}  ${String(questionsMedium.length).padStart(7)}  ${String(questionsHard.length).padStart(5)}  ${String(questionsEasy.length + questionsMedium.length + questionsHard.length).padStart(5)}`);

console.log('\n⚠️  = Categories below 15 questions per difficulty');
