const https = require('https');

console.log('🌐 Testing GitHub Pages deployment...\n');

// Test if universes.json has DARK MOON
const url = 'https://zkaibin.github.io/quiz-studio/data/universes.json';

https.get(url + '?v=' + Date.now(), (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const universes = JSON.parse(data);
      console.log('✅ Universes loaded from GitHub Pages:', universes.length);
      
      const darkMoon = universes.find(u => u.id === 9);
      if (darkMoon) {
        console.log('✅ DARK MOON FOUND in GitHub Pages!');
        console.log('   Name:', darkMoon.universe_name);
        console.log('   ID:', darkMoon.id);
      } else {
        console.log('❌ DARK MOON NOT FOUND in GitHub Pages');
        console.log('   Available universes:');
        universes.forEach(u => {
          console.log(`   [${u.id}] ${u.universe_name}`);
        });
      }
    } catch (err) {
      console.error('❌ Error parsing JSON:', err.message);
    }
  });
}).on('error', (err) => {
  console.error('❌ Error fetching from GitHub Pages:', err.message);
});
