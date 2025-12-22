/**
 * Comprehensive validation of all questions in the library
 */

const fs = require('fs');
const path = require('path');

const questionsEasyPath = path.join(__dirname, '../data/questions-easy.json');
const questionsMediumPath = path.join(__dirname, '../data/questions-medium.json');
const questionsHardPath = path.join(__dirname, '../data/questions-hard.json');

const questionsEasy = JSON.parse(fs.readFileSync(questionsEasyPath, 'utf8'));
const questionsMedium = JSON.parse(fs.readFileSync(questionsMediumPath, 'utf8'));
const questionsHard = JSON.parse(fs.readFileSync(questionsHardPath, 'utf8'));

const allQuestions = [
  ...questionsEasy.map(q => ({ ...q, difficulty: 'Easy' })),
  ...questionsMedium.map(q => ({ ...q, difficulty: 'Medium' })),
  ...questionsHard.map(q => ({ ...q, difficulty: 'Hard' }))
];

console.log(`🔍 Validating ${allQuestions.length} questions...\n`);

const issues = [];

function validateQuestion(q) {
  const questionIssues = [];
  
  // 1. Check required fields
  if (!q.id) questionIssues.push('Missing ID');
  if (!q.category) questionIssues.push('Missing category');
  if (!q.template) questionIssues.push('Missing template');
  if (!q.options || !Array.isArray(q.options)) questionIssues.push('Missing or invalid options');
  if (q.answer === undefined) questionIssues.push('Missing answer field');
  
  // 2. Check options array
  if (q.options) {
    if (q.options.length !== 4) {
      questionIssues.push(`Invalid options count: ${q.options.length} (should be 4)`);
    }
    
    // Check for null/undefined options
    q.options.forEach((opt, idx) => {
      if (opt === null || opt === undefined) {
        questionIssues.push(`Option ${idx} is null/undefined`);
      }
    });
    
    // Check for duplicate options
    const uniqueOptions = new Set(q.options);
    if (uniqueOptions.size < q.options.length) {
      questionIssues.push(`Duplicate options: [${q.options.join(', ')}]`);
    }
  }
  
  // 3. Check answer index validity
  if (q.answer !== undefined && q.options) {
    if (q.answer < 0 || q.answer >= q.options.length) {
      questionIssues.push(`Invalid answer index: ${q.answer} (options length: ${q.options.length})`);
    }
    
    // Check if correct_answer matches options[answer]
    if (q.correct_answer && q.options[q.answer] !== q.correct_answer) {
      questionIssues.push(`Mismatch: correct_answer="${q.correct_answer}" but options[${q.answer}]="${q.options[q.answer]}"`);
    }
  }
  
  // 4. Check for negative numbers in options
  const hasNegative = q.options && q.options.some(opt => {
    const num = parseFloat(opt);
    return !isNaN(num) && num < 0;
  });
  if (hasNegative) {
    questionIssues.push(`Has negative numbers: [${q.options.join(', ')}]`);
  }
  
  // 5. Validate math based on category
  if (q.options && q.answer !== undefined) {
    const categoryIssue = validateByCategory(q);
    if (categoryIssue) questionIssues.push(categoryIssue);
  }
  
  return questionIssues;
}

function validateByCategory(q) {
  const template = q.template || '';
  const correctAnswer = q.options[q.answer];
  
  try {
    switch (q.category) {
      case 'Addition':
        return validateAddition(template, correctAnswer);
      case 'Subtraction':
        return validateSubtraction(template, correctAnswer);
      case 'Multiplication':
        return validateMultiplication(template, correctAnswer);
      case 'Division':
        return validateDivision(template, correctAnswer);
      case 'Fractions':
        return validateFractions(template, correctAnswer);
      case 'Percentage':
        return validatePercentage(template, correctAnswer);
      case 'Money':
        return validateMoney(template, correctAnswer);
      default:
        return null; // Skip validation for other categories
    }
  } catch (e) {
    return `Validation error: ${e.message}`;
  }
}

function extractNumbers(text) {
  // Extract all numbers from text, including decimals and fractions
  const numbers = text.match(/\d+\.?\d*/g);
  return numbers ? numbers.map(n => parseFloat(n)) : [];
}

function validateAddition(template, answer) {
  // Pattern: "X items and Y more" or "X plus Y"
  const match = template.match(/(\d+)\s+(?:items?|coins?|points?|tasks?).+?(\d+)\s+(?:more|items?|coins?|points?|tasks?)/i) ||
                template.match(/(\d+)\s+and\s+(\d+)/i) ||
                template.match(/(\d+)\s+plus\s+(\d+)/i);
  
  if (match) {
    const a = parseInt(match[1]);
    const b = parseInt(match[2]);
    const expected = a + b;
    const actual = parseFloat(answer);
    
    if (Math.abs(expected - actual) > 0.01) {
      return `Addition error: ${a} + ${b} = ${expected}, but answer is ${answer}`;
    }
  }
  return null;
}

function validateSubtraction(template, answer) {
  // Pattern: "had X and gave/lost/used Y"
  const match = template.match(/(\d+)\s+(?:items?|coins?|points?).+?(?:gave|lost|used|subtracted?)\s+(\d+)/i) ||
                template.match(/(\d+)\s+minus\s+(\d+)/i);
  
  if (match) {
    const a = parseInt(match[1]);
    const b = parseInt(match[2]);
    
    // Check if subtraction would be negative
    if (a < b) {
      return `Illogical: ${a} - ${b} = ${a - b} (negative result)`;
    }
    
    const expected = a - b;
    const actual = parseFloat(answer);
    
    if (Math.abs(expected - actual) > 0.01) {
      return `Subtraction error: ${a} - ${b} = ${expected}, but answer is ${answer}`;
    }
  }
  return null;
}

function validateMultiplication(template, answer) {
  const match = template.match(/(\d+)\s+(?:groups?|times?|each).+?(\d+)/i) ||
                template.match(/(\d+)\s+multiplied by\s+(\d+)/i) ||
                template.match(/(\d+)\s+x\s+(\d+)/i);
  
  if (match) {
    const a = parseInt(match[1]);
    const b = parseInt(match[2]);
    const expected = a * b;
    const actual = parseFloat(answer);
    
    if (Math.abs(expected - actual) > 0.01) {
      return `Multiplication error: ${a} × ${b} = ${expected}, but answer is ${answer}`;
    }
  }
  return null;
}

function validateDivision(template, answer) {
  const match = template.match(/(\d+)\s+(?:items?|coins?|tasks?).+?(?:equally|share|split|distribute).+?(\d+)/i) ||
                template.match(/(\d+)\s+divided by\s+(\d+)/i);
  
  if (match) {
    const a = parseInt(match[1]);
    const b = parseInt(match[2]);
    
    if (b === 0) {
      return `Division by zero: ${a} ÷ 0`;
    }
    
    const expected = Math.floor(a / b);
    const actual = parseFloat(answer);
    
    if (Math.abs(expected - actual) > 0.01) {
      return `Division error: ${a} ÷ ${b} = ${expected}, but answer is ${answer}`;
    }
  }
  return null;
}

function validateFractions(template, answer) {
  // Check if answer is a fraction format
  if (typeof answer === 'string' && answer.includes('/')) {
    const [num, denom] = answer.split('/').map(n => parseInt(n.trim()));
    
    if (isNaN(num) || isNaN(denom)) {
      return `Invalid fraction format: ${answer}`;
    }
    
    if (denom === 0) {
      return `Invalid fraction: denominator is zero (${answer})`;
    }
    
    if (num < 0 || denom < 0) {
      return `Negative fraction: ${answer}`;
    }
  } else if (template.includes('/')) {
    // Template has fractions but answer doesn't
    return `Template has fractions but answer is not a fraction: ${answer}`;
  }
  
  return null;
}

function validatePercentage(template, answer) {
  const match = template.match(/(\d+)%\s+of\s+(\d+)/i);
  
  if (match) {
    const percent = parseInt(match[1]);
    const total = parseInt(match[2]);
    const expected = Math.round((percent / 100) * total);
    const actual = parseFloat(answer);
    
    if (Math.abs(expected - actual) > 1) { // Allow 1 unit tolerance for rounding
      return `Percentage error: ${percent}% of ${total} = ${expected}, but answer is ${answer}`;
    }
  }
  return null;
}

function validateMoney(template, answer) {
  // Pattern: "bought for $X and paid with $Y"
  const match = template.match(/\$(\d+)\s+and\s+paid\s+(?:with\s+)?\$(\d+)/i) ||
                template.match(/paid\s+(?:with\s+)?\$(\d+).+?\$(\d+)/i);
  
  if (match) {
    const cost = parseInt(match[1]);
    const paid = parseInt(match[2]);
    
    if (paid < cost) {
      return `Illogical: paid $${paid} for $${cost} item (underpaid)`;
    }
    
    const expected = paid - cost;
    const actual = parseFloat(answer);
    
    if (Math.abs(expected - actual) > 0.01) {
      return `Money error: $${paid} - $${cost} = $${expected}, but answer is ${answer}`;
    }
  }
  return null;
}

// Validate all questions
allQuestions.forEach(q => {
  const questionIssues = validateQuestion(q);
  if (questionIssues.length > 0) {
    issues.push({
      id: q.id,
      difficulty: q.difficulty,
      category: q.category,
      template: q.template ? q.template.substring(0, 80) + '...' : 'N/A',
      issues: questionIssues
    });
  }
});

// Report results
console.log(`\n${'='.repeat(80)}`);
console.log(`📊 VALIDATION RESULTS`);
console.log(`${'='.repeat(80)}\n`);

if (issues.length === 0) {
  console.log('✅ All questions passed validation!');
  console.log(`\n📈 Summary:`);
  console.log(`  Total questions: ${allQuestions.length}`);
  console.log(`  Easy: ${questionsEasy.length}`);
  console.log(`  Medium: ${questionsMedium.length}`);
  console.log(`  Hard: ${questionsHard.length}`);
  console.log(`  Issues found: 0`);
} else {
  console.log(`❌ Found ${issues.length} questions with issues:\n`);
  
  // Group by category
  const byCategory = {};
  issues.forEach(issue => {
    if (!byCategory[issue.category]) {
      byCategory[issue.category] = [];
    }
    byCategory[issue.category].push(issue);
  });
  
  Object.keys(byCategory).sort().forEach(category => {
    console.log(`\n📁 ${category} (${byCategory[category].length} issues):`);
    console.log(`${'─'.repeat(80)}`);
    
    byCategory[category].forEach(issue => {
      console.log(`\n  Q${issue.id} [${issue.difficulty}]:`);
      console.log(`  Template: ${issue.template}`);
      issue.issues.forEach(i => {
        console.log(`    ❌ ${i}`);
      });
    });
  });
  
  console.log(`\n\n📈 Summary:`);
  console.log(`  Total questions: ${allQuestions.length}`);
  console.log(`  Issues found: ${issues.length}`);
  console.log(`  Pass rate: ${((1 - issues.length / allQuestions.length) * 100).toFixed(1)}%`);
}

console.log(`\n${'='.repeat(80)}\n`);
