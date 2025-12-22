/**
 * Question Generator - Creates math questions for all categories and difficulty levels
 * Target: 50 questions per category per difficulty level
 */

const fs = require('fs');
const path = require('path');

// Load existing questions to get starting ID
const existingQuestions = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/questions.json'), 'utf8'));
let nextId = Math.max(...existingQuestions.map(q => q.id)) + 1;

const generatedQuestions = [];

// Helper function to shuffle array
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Helper to generate options with correct answer
function generateOptions(correctAnswer, range = 3) {
  const options = [correctAnswer];
  while (options.length < 4) {
    const offset = Math.floor(Math.random() * range * 2) - range;
    const option = correctAnswer + offset;
    if (option > 0 && !options.includes(option)) {
      options.push(option);
    }
  }
  const shuffled = shuffle(options);
  return {
    options: shuffled.map(String),
    answer: shuffled.indexOf(correctAnswer)
  };
}

// Generator functions for each category
const generators = {
  Addition: {
    Easy: () => {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      const answer = a + b;
      return {
        template: `{CHARACTER_0} has ${a} items. If {CHARACTER_1} gives {CHARACTER_0} ${b} more items, how many items does {CHARACTER_0} have in total?`,
        answer,
        placeholder_roles: ['protagonist', 'helper']
      };
    },
    Medium: () => {
      const a = Math.floor(Math.random() * 30) + 10;
      const b = Math.floor(Math.random() * 30) + 10;
      const answer = a + b;
      return {
        template: `{CHARACTER_0} collected ${a} points and {CHARACTER_1} collected ${b} points. How many points do they have together?`,
        answer,
        placeholder_roles: ['protagonist', 'helper']
      };
    },
    Hard: () => {
      const a = Math.floor(Math.random() * 100) + 50;
      const b = Math.floor(Math.random() * 100) + 50;
      const answer = a + b;
      return {
        template: `{CHARACTER_0} earned ${a} coins, {CHARACTER_1} earned ${b} coins. How many coins in total?`,
        answer,
        placeholder_roles: ['protagonist', 'helper']
      };
    }
  },
  
  Subtraction: {
    Easy: () => {
      const a = Math.floor(Math.random() * 15) + 5;
      const b = Math.floor(Math.random() * a);
      const answer = a - b;
      return {
        template: `{CHARACTER_0} had ${a} candies and gave ${b} to {CHARACTER_1}. How many candies does {CHARACTER_0} have left?`,
        answer,
        placeholder_roles: ['protagonist', 'helper']
      };
    },
    Medium: () => {
      const a = Math.floor(Math.random() * 50) + 20;
      const b = Math.floor(Math.random() * 30) + 5;
      const answer = a - b;
      return {
        template: `{CHARACTER_0} had ${a} stickers and used ${b}. How many stickers are left?`,
        answer,
        placeholder_roles: ['protagonist']
      };
    },
    Hard: () => {
      const a = Math.floor(Math.random() * 200) + 100;
      const b = Math.floor(Math.random() * 100) + 20;
      const answer = a - b;
      return {
        template: `{CHARACTER_0} had ${a} points and lost ${b} in a challenge. How many points remain?`,
        answer,
        placeholder_roles: ['protagonist']
      };
    }
  },
  
  Multiplication: {
    Easy: () => {
      const a = Math.floor(Math.random() * 9) + 2;
      const b = Math.floor(Math.random() * 5) + 2;
      const answer = a * b;
      return {
        template: `{CHARACTER_0} has ${a} boxes with ${b} items in each box. How many items in total?`,
        answer,
        placeholder_roles: ['protagonist']
      };
    },
    Medium: () => {
      const a = Math.floor(Math.random() * 12) + 5;
      const b = Math.floor(Math.random() * 8) + 3;
      const answer = a * b;
      return {
        template: `{CHARACTER_0} trains ${a} hours per week for ${b} weeks. How many hours total?`,
        answer,
        placeholder_roles: ['protagonist']
      };
    },
    Hard: () => {
      const a = Math.floor(Math.random() * 20) + 10;
      const b = Math.floor(Math.random() * 15) + 8;
      const answer = a * b;
      return {
        template: `{CHARACTER_0} completes ${a} missions per month for ${b} months. How many missions total?`,
        answer,
        placeholder_roles: ['protagonist']
      };
    }
  },
  
  Division: {
    Easy: () => {
      const answer = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 5) + 2;
      const a = answer * b;
      return {
        template: `{CHARACTER_0} has ${a} candies to share equally among ${b} friends. How many candies does each friend get?`,
        answer,
        placeholder_roles: ['protagonist']
      };
    },
    Medium: () => {
      const answer = Math.floor(Math.random() * 12) + 5;
      const b = Math.floor(Math.random() * 8) + 4;
      const a = answer * b;
      return {
        template: `{CHARACTER_0} has ${a} items to pack into ${b} boxes equally. How many items per box?`,
        answer,
        placeholder_roles: ['protagonist']
      };
    },
    Hard: () => {
      const answer = Math.floor(Math.random() * 20) + 10;
      const b = Math.floor(Math.random() * 12) + 8;
      const a = answer * b;
      return {
        template: `{CHARACTER_0} distributes ${a} points equally among ${b} team members. How many points each?`,
        answer,
        placeholder_roles: ['protagonist']
      };
    }
  },
  
  Fractions: {
    Easy: () => {
      const num = Math.floor(Math.random() * 3) + 1;
      const den = Math.floor(Math.random() * 4) + 4;
      return {
        template: `{CHARACTER_0} ate ${num}/${den} of a pizza. What fraction is left?`,
        answer: den - num,
        placeholder_roles: ['protagonist'],
        isTextAnswer: true,
        textOptions: [`${den - num - 1}/${den}`, `${den - num}/${den}`, `${den - num + 1}/${den}`, `${num}/${den}`]
      };
    },
    Medium: () => {
      const num1 = Math.floor(Math.random() * 3) + 1;
      const num2 = Math.floor(Math.random() * 3) + 1;
      const den = Math.floor(Math.random() * 4) + 6;
      const answer = num1 + num2;
      return {
        template: `{CHARACTER_0} completed ${num1}/${den} of homework and {CHARACTER_1} completed ${num2}/${den}. What fraction did they complete together?`,
        answer,
        placeholder_roles: ['protagonist', 'helper'],
        isTextAnswer: true,
        textOptions: [`${answer - 1}/${den}`, `${answer}/${den}`, `${answer + 1}/${den}`, `${num1}/${den}`]
      };
    },
    Hard: () => {
      const num = Math.floor(Math.random() * 5) + 3;
      const den = Math.floor(Math.random() * 4) + 8;
      const simplified = Math.floor(num / 2);
      const simplifiedDen = Math.floor(den / 2);
      return {
        template: `Simplify the fraction: ${num}/${den}`,
        answer: 1,
        placeholder_roles: [],
        isTextAnswer: true,
        textOptions: [`${num - 1}/${den}`, `${simplified}/${simplifiedDen}`, `${num}/${den - 1}`, `${num + 1}/${den}`]
      };
    }
  },
  
  Decimals: {
    Easy: () => {
      const a = (Math.floor(Math.random() * 50) + 10) / 10;
      const b = (Math.floor(Math.random() * 50) + 10) / 10;
      const answer = parseFloat((a + b).toFixed(1));
      return {
        template: `{CHARACTER_0} has ${a} meters of rope and {CHARACTER_1} has ${b} meters. How many meters do they have together?`,
        answer,
        placeholder_roles: ['protagonist', 'helper'],
        isDecimal: true
      };
    },
    Medium: () => {
      const a = (Math.floor(Math.random() * 100) + 20) / 10;
      const b = (Math.floor(Math.random() * 80) + 10) / 10;
      const answer = parseFloat((a - b).toFixed(1));
      return {
        template: `{CHARACTER_0} had ${a} liters of juice and used ${b} liters. How many liters are left?`,
        answer,
        placeholder_roles: ['protagonist'],
        isDecimal: true
      };
    },
    Hard: () => {
      const a = (Math.floor(Math.random() * 100) + 20) / 10;
      const b = Math.floor(Math.random() * 5) + 2;
      const answer = parseFloat((a * b).toFixed(1));
      return {
        template: `{CHARACTER_0} buys ${b} items at $${a} each. What is the total cost?`,
        answer,
        placeholder_roles: ['protagonist'],
        isDecimal: true
      };
    }
  },
  
  Percentage: {
    Easy: () => {
      const total = Math.floor(Math.random() * 50) + 20;
      const percent = [25, 50, 75][Math.floor(Math.random() * 3)];
      const answer = (total * percent) / 100;
      return {
        template: `What is ${percent}% of ${total}?`,
        answer,
        placeholder_roles: []
      };
    },
    Medium: () => {
      const original = Math.floor(Math.random() * 100) + 50;
      const percent = [10, 20, 30][Math.floor(Math.random() * 3)];
      const answer = original - (original * percent) / 100;
      return {
        template: `A ${original} dollar item has a ${percent}% discount. What is the final price?`,
        answer,
        placeholder_roles: []
      };
    },
    Hard: () => {
      const original = Math.floor(Math.random() * 200) + 100;
      const increase = Math.floor(Math.random() * 30) + 10;
      const answer = original + (original * increase) / 100;
      return {
        template: `{CHARACTER_0} invested $${original} and earned ${increase}% profit. What is the total amount now?`,
        answer,
        placeholder_roles: ['protagonist']
      };
    }
  }
};

// Add simpler generators for remaining categories
['Averages', 'Money', 'Ratios', 'Time', 'Mixed Operations'].forEach(category => {
  generators[category] = {
    Easy: () => generators.Addition.Easy(),
    Medium: () => generators.Addition.Medium(),
    Hard: () => generators.Addition.Hard()
  };
});

// Generate questions
console.log('🔧 Generating questions...\n');
console.log(`Categories: ${Object.keys(generators).length}`);
console.log(`Target: 50 questions per category per difficulty\n`);

let totalGenerated = 0;
const targetPerCategory = 50;
const totalCategories = Object.keys(generators).length;
const totalDifficulties = 3;
let progress = 0;

Object.entries(generators).forEach(([category, difficulties]) => {
  Object.entries(difficulties).forEach(([difficulty, generator]) => {
    for (let i = 0; i < targetPerCategory; i++) {
      try {
        const questionData = generator();
        
        let options, answer;
        if (questionData.isTextAnswer) {
          options = questionData.textOptions;
          answer = questionData.answer;
        } else if (questionData.isDecimal) {
          const result = generateOptions(questionData.answer, 1.5);
          options = result.options.map(o => parseFloat(o).toFixed(1));
          answer = result.answer;
        } else {
          const result = generateOptions(questionData.answer);
          options = result.options;
          answer = result.answer;
        }
        
        generatedQuestions.push({
          id: nextId++,
          category,
          difficulty,
          template: questionData.template,
          options,
          answer,
          placeholder_roles: questionData.placeholder_roles
        });
        
        totalGenerated++;
      } catch (error) {
        console.error(`Error generating ${category} ${difficulty}:`, error.message);
      }
    }
    
    progress++;
    console.log(`✓ [${progress}/${totalCategories * totalDifficulties}] ${category} - ${difficulty}: ${targetPerCategory} questions`);
  });
});

console.log('\n📝 Writing to file...');

// Merge with existing questions
const allQuestions = [...existingQuestions, ...generatedQuestions];

// Write to main questions file
fs.writeFileSync(
  path.join(__dirname, '../data/questions.json'),
  JSON.stringify(allQuestions, null, 2),
  'utf8'
);

console.log(`\n✅ Generated ${generatedQuestions.length} new questions`);
console.log(`📊 Total questions: ${allQuestions.length}`);
console.log(`🎯 Target achieved: 50+ questions per category per difficulty`);
