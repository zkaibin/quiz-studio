const fs = require('fs');
const characters = JSON.parse(fs.readFileSync('data/characters.json', 'utf8'));
const questions = JSON.parse(fs.readFileSync('data/questions.json', 'utf8'));

console.log('🔍 DARK MOON Characters (universe_id: 9):');
const darkMoonChars = characters.filter(c => c.universe_id === 9);
console.log('Total:', darkMoonChars.length);
darkMoonChars.forEach(c => {
  console.log(`  [${c.id}] ${c.name} ${c.emoji_icon}`);
});

console.log('\n📝 Questions with DARK MOON characters:');
const darkMoonCharNames = darkMoonChars.map(c => c.name);
const darkMoonQuestions = questions.filter(q => {
  if (!q.placeholders) return false;
  return q.placeholders.some(p => darkMoonCharNames.includes(p));
});
console.log('Total questions:', darkMoonQuestions.length);
darkMoonQuestions.slice(0, 5).forEach(q => {
  console.log(`  Q${q.id}: ${q.placeholders.join(', ')} - ${q.category} (${q.difficulty})`);
});
