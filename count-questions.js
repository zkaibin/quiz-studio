#!/usr/bin/env node
/**
 * Count Questions Script
 * 
 * This script counts the total number of questions across all question files
 * in the data directory. Use this whenever questions are added to update
 * the landing page statistics.
 * 
 * Usage: node count-questions.js
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const INDEX_HTML = path.join(__dirname, 'index.html');

// Question files to count
const questionFiles = [
  'questions-psle.json',
  'questions-p1-p2.json',
  'questions-p3-p4.json',
  'questions-p5-p6.json',
  'questions-challenging.json'
];

function countQuestionsInFile(filepath) {
  try {
    const content = fs.readFileSync(filepath, 'utf8');
    const questions = JSON.parse(content);
    return Array.isArray(questions) ? questions.length : 0;
  } catch (error) {
    console.warn(`Warning: Could not read ${filepath}: ${error.message}`);
    return 0;
  }
}

function updateIndexHtml(totalCount) {
  try {
    let html = fs.readFileSync(INDEX_HTML, 'utf8');
    
    // Update the question count in the stats section
    // Look for pattern: <span class="stat-number">NUMBER</span>
    //                   <span class="stat-label">Questions</span>
    const pattern = /(<span class="stat-number">)\d+(<\/span>\s*<span class="stat-label">Questions<\/span>)/;
    
    if (pattern.test(html)) {
      html = html.replace(pattern, `$1${totalCount}$2`);
      fs.writeFileSync(INDEX_HTML, html, 'utf8');
      console.log(`✓ Updated index.html with ${totalCount} questions`);
      return true;
    } else {
      console.warn('Warning: Could not find question count pattern in index.html');
      return false;
    }
  } catch (error) {
    console.error(`Error updating index.html: ${error.message}`);
    return false;
  }
}

// Main execution
console.log('Counting questions across all files...\n');

let totalQuestions = 0;
const breakdown = {};

questionFiles.forEach(filename => {
  const filepath = path.join(DATA_DIR, filename);
  const count = countQuestionsInFile(filepath);
  breakdown[filename] = count;
  totalQuestions += count;
  console.log(`  ${filename.padEnd(30)} ${count.toString().padStart(4)} questions`);
});

console.log(`  ${'-'.repeat(35)}`);
console.log(`  ${'TOTAL'.padEnd(30)} ${totalQuestions.toString().padStart(4)} questions\n`);

// Update index.html
const updated = updateIndexHtml(totalQuestions);

if (updated) {
  console.log(`\n✅ Question count successfully updated to ${totalQuestions}`);
} else {
  console.log(`\n⚠️  Please manually update index.html with count: ${totalQuestions}`);
}

// Export for programmatic use
module.exports = { totalQuestions, breakdown };
