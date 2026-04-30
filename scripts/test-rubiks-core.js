const assert = require('assert');
const {
  CubeModel,
  moveDescriptor,
  inverseMove,
  generateScramble,
  normalizeAlgorithm
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
  randomConsistency(size);
  applyAndInverseIdentity(size);
}

console.log('Rubik core validation passed for sizes 2x2 through 10x10.');
