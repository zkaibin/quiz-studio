// Quick unit checks for city-progression helpers (node, no DOM).
import assert from 'assert';
import {
  createSmashScorer, createMissionTracker, dailyChallengeFor,
  sampleGhostAt, formatClock, createProgressStore
} from '../js/city-progression.js';

const scorer = createSmashScorer();
scorer.reset();
let s = scorer.observe({ props: 1, peds: 0, cars: 0 }, 0.1);
assert.ok(s.score >= 1, 'prop scores');
s = scorer.observe({ props: 1, peds: 0, cars: 1 }, 0.1);
assert.ok(s.combo >= 2, 'combo climbs');
assert.ok(scorer.payout() >= 0 && scorer.payout() <= 36, 'payout capped');

const rush = createMissionTracker('smash_rush');
rush.tick(1, { smashHits: 50 });
assert.equal(rush.status().complete, true);

const clean = createMissionTracker('clean_cruise');
clean.tick(1, { smashHits: 0, distance: 1200 });
assert.equal(clean.status().complete, true);
clean.reset();
clean.tick(1, { smashHits: 1, distance: 100 });
assert.equal(clean.status().failed, true);

const daily = dailyChallengeFor(new Date('2026-11-28T04:00:00Z'));
assert.ok(daily.id && daily.cityId && daily.reward > 0, 'daily shape');
assert.equal(dailyChallengeFor(new Date('2026-11-28T20:00:00Z')).id, daily.id, 'daily stable per day');

const ghost = sampleGhostAt([
  { t: 0, x: 0, z: 0, y: 0, h: 0 },
  { t: 1, x: 10, z: 0, y: 0, h: 0 }
], 0.5);
assert.ok(Math.abs(ghost.x - 5) < 1e-6, 'ghost lerp');

assert.equal(formatClock(65.2), '1:05.2');

const store = createProgressStore();
store.recordDriveDay();
assert.ok(store.progress.streak >= 1);
const unlock = store.unlock('first_finish');
assert.ok(!unlock || unlock.id === 'first_finish');

console.log('city-progression tests OK');
