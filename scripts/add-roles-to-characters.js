/**
 * Script to add roles to all characters in characters.json
 * Roles help dynamically assign characters to questions
 */

const fs = require('fs');
const path = require('path');

const charactersPath = path.join(__dirname, '../data/characters.json');
const characters = JSON.parse(fs.readFileSync(charactersPath, 'utf8'));

// Add roles to each character
// Most characters can be protagonist or helper
// Some specific characters get special roles
const updatedCharacters = characters.map(char => {
  const roles = ['protagonist', 'helper']; // Default roles for everyone
  
  // Add leader role to certain characters
  const leaders = ['Mickey Mouse', 'Jungwon', 'Bang Chan', 'Rami', 'Iron Man', 'Captain America', 'Heli'];
  if (leaders.includes(char.name)) {
    roles.push('leader');
  }
  
  // Add villain role
  const villains = ['Loki', 'Thanos'];
  if (villains.includes(char.name)) {
    roles.push('villain');
  }
  
  // Add hero role to Avengers
  const heroes = ['Iron Man', 'Captain America', 'Thor', 'Hulk', 'Black Widow', 'Hawkeye', 
                  'Spider-Man', 'Black Panther', 'Doctor Strange', 'Scarlet Witch', 
                  'Vision', 'Falcon', 'War Machine', 'Ant-Man', 'Wasp', 'Winter Soldier'];
  if (heroes.includes(char.name)) {
    roles.push('hero');
  }
  
  // Add team_member role to K-pop groups
  const kpopUniverses = [4, 5, 6, 7]; // ENHYPEN, Stray Kids, BABYMONSTER, KATSEYE
  if (kpopUniverses.includes(char.universe_id)) {
    roles.push('team_member');
  }
  
  // Add vampire role to DARK MOON characters
  if (char.universe_id === 9) {
    roles.push('vampire');
  }
  
  return {
    ...char,
    roles
  };
});

// Write updated characters back to file
fs.writeFileSync(charactersPath, JSON.stringify(updatedCharacters, null, 2), 'utf8');

console.log('✅ Successfully added roles to all', updatedCharacters.length, 'characters');
console.log('📋 Sample roles:');
updatedCharacters.slice(0, 5).forEach(char => {
  console.log(`  ${char.name}: [${char.roles.join(', ')}]`);
});
