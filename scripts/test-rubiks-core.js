const assert = require('assert');
const {
  CubeModel,
  moveDescriptor,
  inverseMove,
  generateScramble,
  normalizeAlgorithm,
  normalizeMoveToken
} = require('../js/rubiks-cube-core');

function applyAndInverseIdentity(size) {
  const cube = new CubeModel(size);
  const baseline = cube.serialize();
  const sequence = generateScramble(size, { seed: size * 101, length: Math.min(50, 12 + size * 3) });
  cube.applyMoves(sequence);
  const inverted = [...sequence].reverse().map((m) => inverseMove(m, size));
  cube.applyMoves(inverted);
  assert.strictEqual(cube.serialize(), baseline, `inverse identity failed for ${size}x${size}`);
}

function normalizedRoundTrip(size) {
  const cube = new CubeModel(size);
  const input = size >= 4 ? "Rw U Rw' F2 3Uw'" : "R U R' U'";
  const normalized = normalizeAlgorithm(input, size);
  normalized.forEach((m) => assert.ok(moveDescriptor(m, size), `invalid move ${m} for ${size}`));
  cube.applyMoves(normalized);
  assert.ok(cube.serialize().length > 0, 'cube serialization should be non-empty');
}

function notationCoverage(size) {
  const valid = size >= 4
    ? ['R', "R'", 'R2', 'Rw', "2Uw'", 'F2']
    : ['R', "R'", 'R2', 'U', 'F'];
  if (size >= 6) valid.push('3Rw');

  valid.forEach((token) => {
    const normalized = normalizeMoveToken(token, size);
    assert.ok(normalized, `expected valid token ${token} for ${size}`);
  });

  ['M', 'E', 'S'].forEach((token) => {
    const normalized = normalizeMoveToken(token, size);
    if (size >= 3 && size % 2 === 1) assert.ok(normalized, `slice should be valid for ${size}`);
    else assert.strictEqual(normalized, null, `slice should be invalid for ${size}`);
  });

  const invalid = ['Q', 'R3', '0Rw', '99Rw', 'Rw2x', 'M2w', '2M', ''];
  invalid.forEach((token) => {
    assert.strictEqual(normalizeMoveToken(token, size), null, `expected invalid token ${token} for ${size}`);
  });

  if (size >= 4) {
    const maxDepth = Math.floor(size / 2);
    const boundary = `${maxDepth}Rw`;
    assert.ok(normalizeMoveToken(boundary, size), `max depth token should be valid: ${boundary} on ${size}`);
    const overflow = `${maxDepth + 1}Rw`;
    assert.strictEqual(normalizeMoveToken(overflow, size), null, `overflow depth should be invalid: ${overflow} on ${size}`);
  }
}

function deterministicScramble(size) {
  const a = generateScramble(size, { seed: 424242, length: 30 }).join(' ');
  const b = generateScramble(size, { seed: 424242, length: 30 }).join(' ');
  assert.strictEqual(a, b, `scramble determinism failed for ${size}`);
}

function randomConsistency(size) {
  const seed = size * 999;
  const scramble = generateScramble(size, { seed, length: 35 });
  const a = new CubeModel(size);
  const b = new CubeModel(size);
  a.applyMoves(scramble);
  scramble.forEach((move) => b.applyMove(move));
  assert.strictEqual(a.serialize(), b.serialize(), `sequence consistency failed for ${size}`);
}

for (let size = 2; size <= 10; size++) {
  const solved = new CubeModel(size);
  assert.ok(solved.isSolved(), `new cube must be solved for ${size}`);
  deterministicScramble(size);
  normalizedRoundTrip(size);
  notationCoverage(size);
  randomConsistency(size);
  applyAndInverseIdentity(size);
}

console.log('Rubik core validation passed for sizes 2x2 through 10x10.');
