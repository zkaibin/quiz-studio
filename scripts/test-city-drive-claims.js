// Unit checks for City Drive claim caps / sanitization (no Firebase).
import assert from 'assert';
import { MAX_DRIVE_CLAIM, MAX_DRIVE_POINTS_PER_DAY } from '../js/city-garage.js';

assert.equal(MAX_DRIVE_CLAIM, 100);
assert.equal(MAX_DRIVE_POINTS_PER_DAY, 400);

function clampClaimAmount(amount) {
  const n = Math.floor(Number(amount) || 0);
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.min(MAX_DRIVE_CLAIM, n);
}

assert.equal(clampClaimAmount(0), 0);
assert.equal(clampClaimAmount(-5), 0);
assert.equal(clampClaimAmount(40.9), 40);
assert.equal(clampClaimAmount(9999), MAX_DRIVE_CLAIM);
assert.equal(clampClaimAmount('12'), 12);

function safeClaim(id) {
  return String(id || '').replace(/[^a-zA-Z0-9:_-]/g, '').slice(0, 120);
}
assert.equal(safeClaim('run_abc'), 'run_abc');
assert.equal(safeClaim('../hack;drop'), 'hackdrop');
assert.ok(safeClaim('x'.repeat(200)).length === 120);

// Simulate duplicate settlement guard.
let rewardsSettled = false;
let awards = 0;
function settleOnce(n) {
  if (rewardsSettled) return 0;
  rewardsSettled = true;
  awards += n;
  return n;
}
assert.equal(settleOnce(20), 20);
assert.equal(settleOnce(20), 0);
assert.equal(awards, 20);

console.log('city-drive-claims tests OK');
