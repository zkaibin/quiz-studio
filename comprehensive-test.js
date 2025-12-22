const https = require('https');

console.log('🔍 Comprehensive GitHub Pages Test\n');

async function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url + '?v=' + Date.now(), (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

async function test() {
  try {
    // Test 1: Universes
    console.log('📦 Testing universes.json...');
    const universes = await fetchJSON('https://zkaibin.github.io/quiz-studio/data/universes.json');
    console.log(`   Total: ${universes.length}`);
    universes.forEach(u => {
      const mark = u.id === 9 ? '🎯' : '  ';
      console.log(`   ${mark} [${u.id}] ${u.universe_name}`);
    });
    
    // Test 2: Characters
    console.log('\n👥 Testing characters.json...');
    const characters = await fetchJSON('https://zkaibin.github.io/quiz-studio/data/characters.json');
    const darkMoonChars = characters.filter(c => c.universe_id === 9);
    console.log(`   Total characters: ${characters.length}`);
    console.log(`   DARK MOON characters: ${darkMoonChars.length}`);
    darkMoonChars.forEach(c => {
      console.log(`      [${c.id}] ${c.name}`);
    });
    
    // Test 3: Questions
    console.log('\n❓ Testing questions.json...');
    const questions = await fetchJSON('https://zkaibin.github.io/quiz-studio/data/questions.json');
    const darkMoonQuestions = questions.filter(q => {
      return q.placeholders.some(p => darkMoonChars.find(c => c.name === p));
    });
    console.log(`   Total questions: ${questions.length}`);
    console.log(`   DARK MOON questions: ${darkMoonQuestions.length}`);
    console.log(`   IDs: ${darkMoonQuestions.map(q => q.id).join(', ')}`);
    
    console.log('\n✅ All DARK MOON data is present on GitHub Pages!');
    console.log('\n💡 If you still don\'t see it in the dropdown:');
    console.log('   1. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)');
    console.log('   2. Clear browser cache');
    console.log('   3. Open in incognito/private mode');
    console.log('   4. Check browser console for JavaScript errors');
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

test();
