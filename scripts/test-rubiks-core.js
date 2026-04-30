const assert = require('assert');
const {
  CubeModel,
  moveDescriptor,
  inverseMove,
  generateScramble,
  normalizeAlgorithm,
  normalizeMoveToken,
  canonicalNetFaceMapping,
  resolveNetFaceMapping,
  viewOrientationLabel
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

function targetedLayerIdentity(size) {
  const cube = new CubeModel(size);
  const baseline = cube.serialize();
  const maxDepth = Math.floor(size / 2);
  const sequence = ['R', 'U\'', 'F2'];

  if (size >= 4) {
    sequence.push('Rw', '2Uw\'');
    if (maxDepth >= 3) sequence.push(`${maxDepth}Rw`);
  }
  if (size >= 3 && size % 2 === 1) {
    sequence.push('M', 'E\'', 'S2');
  }

  const normalized = sequence
    .map((move) => normalizeMoveToken(move, size))
    .filter(Boolean);
  cube.applyMoves(normalized);
  const inverted = [...normalized].reverse().map((m) => inverseMove(m, size));
  cube.applyMoves(inverted);
  assert.strictEqual(cube.serialize(), baseline, `targeted layer identity failed for ${size}x${size}`);
}

function descriptorLabelCoverage() {
  const cube3 = new CubeModel(3);
  assert.strictEqual(
    cube3.moveLabel({ axis: [1, 0, 0], layerValues: [0], quarterTurns: -1, normalized: null }),
    'M',
    '3x3 center x-slice should label as M'
  );
  assert.strictEqual(
    cube3.moveLabel({ axis: [0, 1, 0], layerValues: [0], quarterTurns: -1, normalized: null }),
    'E',
    '3x3 center y-slice should label as E'
  );
  assert.strictEqual(
    cube3.moveLabel({ axis: [0, 0, 1], layerValues: [0], quarterTurns: -1, normalized: null }),
    'S',
    '3x3 center z-slice should label as S'
  );

  const cube5 = new CubeModel(5);
  assert.strictEqual(
    cube5.moveLabel({ axis: [1, 0, 0], layerValues: [2], quarterTurns: -1, normalized: null }),
    'R (layer 2)',
    '5x5 inner non-center layer should include layer depth label'
  );
  assert.strictEqual(
    cube5.moveLabel({ axis: [1, 0, 0], layerValues: [4], quarterTurns: -1, normalized: null }),
    'R',
    '5x5 outer positive-face layer should keep regular face notation'
  );
  assert.strictEqual(
    cube5.moveLabel({ axis: [1, 0, 0], layerValues: [-2], quarterTurns: -1, normalized: null }),
    'R (layer 4)',
    '5x5 opposite-side inner layer should map to correct depth label'
  );
}

function netOrientationMappingCoverage() {
  const canonical = canonicalNetFaceMapping();
  assert.deepStrictEqual(
    resolveNetFaceMapping('fixed'),
    canonical,
    'fixed net mode should always use canonical face mapping'
  );
  assert.deepStrictEqual(
    resolveNetFaceMapping('fixed', { front: [1, 0, 0], up: [0, 1, 0], right: [0, 0, -1] }),
    canonical,
    'fixed net mode should ignore view basis'
  );
  assert.deepStrictEqual(
    resolveNetFaceMapping('view', { front: [0, 0, 1], up: [0, 1, 0], right: [1, 0, 0] }),
    canonical,
    'view mode should match canonical mapping in the default orientation'
  );

  const rightFrontBasis = { front: [1, 0, 0], up: [0, 1, 0], right: [0, 0, -1] };
  const rightFront = resolveNetFaceMapping('view', rightFrontBasis);
  assert.strictEqual(rightFront.F, canonical.R, 'view mode front slot should follow camera orientation');
  assert.strictEqual(rightFront.B, canonical.L, 'view mode back slot should follow camera orientation');
  assert.strictEqual(rightFront.R, canonical.B, 'view mode right slot should follow camera orientation');
  assert.strictEqual(rightFront.L, canonical.F, 'view mode left slot should follow camera orientation');
  assert.strictEqual(rightFront.U, canonical.U, 'view mode up slot should follow camera orientation');
  assert.strictEqual(rightFront.D, canonical.D, 'view mode down slot should follow camera orientation');

  assert.deepStrictEqual(
    viewOrientationLabel({ front: [0, 0, 1], up: [0, 1, 0], right: [1, 0, 0] }),
    { front: 'F', up: 'U' },
    'orientation label should report canonical front/up for default basis'
  );
  assert.deepStrictEqual(
    viewOrientationLabel(rightFrontBasis),
    { front: 'R', up: 'U' },
    'orientation label should report current view front/up faces'
  );
}

for (let size = 2; size <= 10; size++) {
  const solved = new CubeModel(size);
  assert.ok(solved.isSolved(), `new cube must be solved for ${size}`);
  deterministicScramble(size);
  normalizedRoundTrip(size);
  notationCoverage(size);
  randomConsistency(size);
  applyAndInverseIdentity(size);
  targetedLayerIdentity(size);
}
descriptorLabelCoverage();
netOrientationMappingCoverage();

console.log('Rubik core validation passed for sizes 2x2 through 10x10.');
