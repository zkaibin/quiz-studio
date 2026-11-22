#!/usr/bin/env node
/**
 * Backfill short pedagogical explanations onto question banks that lack them.
 * Safe to re-run: only fills missing `explanation` and `correct_answer` fields.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const CATEGORY_TIPS = {
  Addition: 'Add the parts carefully, watching place value.',
  Subtraction: 'Subtract from the total and check with addition.',
  Multiplication: 'Use groups or times-tables to find the product.',
  Division: 'Share equally or use multiplication to check your quotient.',
  Fractions: 'Keep the whole in mind and compare equal parts.',
  Decimals: 'Align the decimal points before computing.',
  Percentage: 'Percent means out of 100 — convert then calculate.',
  Percentages: 'Percent means out of 100 — convert then calculate.',
  Ratios: 'Keep the ratio parts in the same order.',
  Averages: 'Average = sum of values ÷ number of values.',
  Money: 'Work in cents if needed, then convert back to dollars.',
  Time: 'Convert hours and minutes carefully before calculating.',
  Measurement: 'Check units first, then compute.',
  'Mixed Operations': 'Follow order of operations: brackets, then ×÷, then +−.',
  Speed: 'Use Distance = Speed × Time (rearrange as needed).',
  Geometry: 'Sketch the figure and mark known lengths or angles.',
  Algebra: 'Let the unknown be a letter, then form and solve an equation.',
  'Grammar - Tenses': 'Match the verb tense to the time signal in the sentence.',
  Vocabulary: 'Use context clues to pick the best-fitting word.',
  Idioms: 'Idioms are figurative — choose the meaning, not the literal words.'
};

const SUBJECT_DEFAULT = {
  math: 'Work step by step and check whether your answer is reasonable.',
  science: 'Recall the key concept, then eliminate options that contradict it.',
  english: 'Read the whole sentence, then choose the form that fits grammar and meaning.',
  chinese: '结合上下文理解词语或句子的意思，再选出最合适的答案。'
};

function tipFor(category, subject) {
  return CATEGORY_TIPS[category] || SUBJECT_DEFAULT[subject] || SUBJECT_DEFAULT.math;
}

function buildExplanation(q, subject) {
  const correct = q.options && q.options[q.answer] != null
    ? String(q.options[q.answer])
    : (q.correct_answer || 'the correct option');
  const tip = tipFor(q.category, subject);
  return `The correct answer is ${correct}. ${tip}`;
}

function processFile(relPath, subject) {
  const full = path.join(ROOT, relPath);
  if (!fs.existsSync(full)) return { file: relPath, skipped: true };
  const data = JSON.parse(fs.readFileSync(full, 'utf8'));
  let added = 0;
  let corrected = 0;
  data.forEach((q) => {
    if (q.options && q.answer != null && (q.correct_answer == null || q.correct_answer === '')) {
      q.correct_answer = q.options[q.answer];
      corrected += 1;
    }
    if (!q.explanation || !String(q.explanation).trim()) {
      q.explanation = buildExplanation(q, subject);
      added += 1;
    }
  });
  fs.writeFileSync(full, JSON.stringify(data, null, 2) + '\n');
  return { file: relPath, total: data.length, added, corrected };
}

const targets = [
  ['data/questions-p1-p2.json', 'math'],
  ['data/questions-p3-p4.json', 'math'],
  ['data/questions-p5-p6.json', 'math'],
  ['data/questions-psle.json', 'math'],
  ['data/questions-challenging.json', 'math'],
  ['data/questions-science.json', 'science'],
  ['data/questions-english.json', 'english'],
  ['data/questions-chinese.json', 'chinese']
];

const results = targets.map(([file, subject]) => processFile(file, subject));
console.log(JSON.stringify(results, null, 2));
