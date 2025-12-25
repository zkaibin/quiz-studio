/**
 * Check question distribution by category and difficulty
 */

const fs = require('fs');
const path = require('path');

const questionsP1P2Path = path.join(__dirname, '../data/questions-p1-p2.json');
const questionsP3P4Path = path.join(__dirname, '../data/questions-p3-p4.json');
const questionsP5P6Path = path.join(__dirname, '../data/questions-p5-p6.json');
const questionsPSLEPath = path.join(__dirname, '../data/questions-psle.json');
const questionsChallengingPath = path.join(__dirname, '../data/questions-challenging.json');

const questionsP1P2 = JSON.parse(fs.readFileSync(questionsP1P2Path, 'utf8'));
const questionsP3P4 = JSON.parse(fs.readFileSync(questionsP3P4Path, 'utf8'));
const questionsP5P6 = JSON.parse(fs.readFileSync(questionsP5P6Path, 'utf8'));
const questionsPSLE = JSON.parse(fs.readFileSync(questionsPSLEPath, 'utf8'));
const questionsChallenging = JSON.parse(fs.readFileSync(questionsChallengingPath, 'utf8'));

const allQuestions = [
  ...questionsP1P2,
  ...questionsP3P4,
  ...questionsP5P6,
  ...questionsPSLE,
  ...questionsChallenging
];

// Extract all unique categories
const allCategories = [...new Set(allQuestions.map(q => q.category))].sort();

function countByCategory(questions) {
  const counts = {};
  allCategories.forEach(cat => counts[cat] = 0);
  
  questions.forEach(q => {
    if (counts.hasOwnProperty(q.category)) {
      counts[q.category]++;
    } else {
      counts[q.category] = 1;
    }
  });
  
  return counts;
}

const p1p2Counts = countByCategory(questionsP1P2);
const p3p4Counts = countByCategory(questionsP3P4);
const p5p6Counts = countByCategory(questionsP5P6);
const psleCounts = countByCategory(questionsPSLE);
const challengingCounts = countByCategory(questionsChallenging);

console.log('📊 Question Distribution by Category and Difficulty:\n');
console.log('Category                 P1-P2  P3-P4  P5-P6  PSLE   Chall  Total');
console.log('───────────────────────  ─────  ─────  ─────  ─────  ─────  ─────');

allCategories.forEach(cat => {
  const p1p2 = p1p2Counts[cat] || 0;
  const p3p4 = p3p4Counts[cat] || 0;
  const p5p6 = p5p6Counts[cat] || 0;
  const psle = psleCounts[cat] || 0;
  const challenging = challengingCounts[cat] || 0;
  const total = p1p2 + p3p4 + p5p6 + psle + challenging;
  
  const p1p2Str = String(p1p2).padStart(5);
  const p3p4Str = String(p3p4).padStart(5);
  const p5p6Str = String(p5p6).padStart(5);
  const psleStr = String(psle).padStart(5);
  const challStr = String(challenging).padStart(5);
  const totalStr = String(total).padStart(5);
  
  console.log(`${cat.padEnd(24)} ${p1p2Str}  ${p3p4Str}  ${p5p6Str}  ${psleStr}  ${challStr}  ${totalStr}`);
});

console.log('───────────────────────  ─────  ─────  ─────  ─────  ─────  ─────');
const totalP1P2 = questionsP1P2.length;
const totalP3P4 = questionsP3P4.length;
const totalP5P6 = questionsP5P6.length;
const totalPSLE = questionsPSLE.length;
const totalChallenging = questionsChallenging.length;
const grandTotal = totalP1P2 + totalP3P4 + totalP5P6 + totalPSLE + totalChallenging;

console.log(`${'TOTAL'.padEnd(24)} ${String(totalP1P2).padStart(5)}  ${String(totalP3P4).padStart(5)}  ${String(totalP5P6).padStart(5)}  ${String(totalPSLE).padStart(5)}  ${String(totalChallenging).padStart(5)}  ${String(grandTotal).padStart(5)}`);

console.log(`\n📈 Summary:`);
console.log(`  Total Questions: ${grandTotal}`);
console.log(`  Total Categories: ${allCategories.length}`);
