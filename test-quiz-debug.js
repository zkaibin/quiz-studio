const db = require('./server/models/database');

async function test() {
  await db.init();
  
  const category = "addition";
  const difficulty = "easy";
  
  let query = 'SELECT * FROM questions WHERE 1=1';
  const params = [];

  if (category && category !== 'all') {
    query += ' AND category = ?';
    params.push(category);
  }

  if (difficulty && difficulty !== 'all') {
    query += ' AND difficulty = ?';
    params.push(difficulty);
  }

  console.log('Query:', query);
  console.log('Params:', params);
  
  const questions = await db.all(query);
  console.log('Results:', questions);
  console.log('Count:', questions.length);
  
  process.exit(0);
}

test();
