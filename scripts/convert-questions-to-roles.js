/**
 * Script to convert questions from hardcoded placeholders to role-based placeholders
 * Example: "placeholders": ["Mickey Mouse", "Minnie Mouse"] 
 *       -> "placeholder_roles": ["protagonist", "helper"]
 */

const fs = require('fs');
const path = require('path');

const questionsPath = path.join(__dirname, '../data/questions.json');
const charactersPath = path.join(__dirname, '../data/characters.json');

const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
const characters = JSON.parse(fs.readFileSync(charactersPath, 'utf8'));

// Create character name to roles mapping
const characterRolesMap = {};
characters.forEach(char => {
  characterRolesMap[char.name] = char.roles;
});

// Convert questions
const updatedQuestions = questions.map(q => {
  if (!q.placeholders || q.placeholders.length === 0) {
    // No placeholders, keep as is
    return q;
  }
  
  // Determine roles based on placeholder characters
  const placeholder_roles = q.placeholders.map((charName, index) => {
    const charRoles = characterRolesMap[charName];
    
    if (!charRoles) {
      console.warn(`Warning: Character "${charName}" not found in characters.json for question ${q.id}`);
      return 'protagonist'; // fallback
    }
    
    // Assign roles based on position and available roles
    if (index === 0) {
      // First character is usually the protagonist
      return charRoles.includes('protagonist') ? 'protagonist' : charRoles[0];
    } else {
      // Second+ characters are usually helpers
      return charRoles.includes('helper') ? 'helper' : charRoles[0];
    }
  });
  
  // Return question with placeholder_roles instead of placeholders
  const { placeholders, ...rest } = q;
  return {
    ...rest,
    placeholder_roles
  };
});

// Write back
fs.writeFileSync(questionsPath, JSON.stringify(updatedQuestions, null, 2), 'utf8');

console.log('✅ Successfully converted', updatedQuestions.length, 'questions to role-based placeholders');
console.log('📋 Sample conversions:');
questions.slice(0, 3).forEach((oldQ, i) => {
  const newQ = updatedQuestions[i];
  if (oldQ.placeholders) {
    console.log(`  Q${oldQ.id}: [${oldQ.placeholders.join(', ')}] → [${newQ.placeholder_roles.join(', ')}]`);
  }
});
