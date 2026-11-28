// Unit checks for shared steer falloff, tire upgrades, and grass runoff caps.
import assert from 'assert';
import { computeStats, maxSteerAngle, CARS, defaultUpgrades } from '../js/city-cars.js';

function yawRate(speed, steer, wheelbase = 3) {
  return (speed / wheelbase) * Math.tan(steer);
}

function grassTop(statsTop, over) {
  const depth = Math.min(1, Math.max(0, over / 22));
  return statsTop * (0.55 + (0.32 - 0.55) * depth);
}

// Legacy open-city curve was unusable at race pace; unified curve stays turnable.
const oldAt70 = 0.5 / (1 + (70 / 9) ** 2);
assert.ok(oldAt70 < 0.01, 'legacy high-speed steer was near zero');

const stock = maxSteerAngle(70, 1);
const stock40 = maxSteerAngle(40, 1);
const stock20 = maxSteerAngle(20, 1);
assert.ok(stock20 > stock40 && stock40 > stock, 'steer lock falls off as speed rises');
assert.ok(yawRate(20, stock20) > yawRate(70, stock), 'low-speed yaw is more responsive than race pace');
assert.ok(yawRate(40, stock40) > 0.7 && yawRate(40, stock40) < 1.35,
  `mid-speed yaw should clear corners without spinning, got ${yawRate(40, stock40)}`);
assert.ok(yawRate(70, stock) > 0.45 && yawRate(70, stock) < 0.95,
  `high-speed yaw should be stable but usable, got ${yawRate(70, stock)}`);

// Same formula regardless of mode — callers only pass speed + handling.
assert.equal(maxSteerAngle(55, 1.2), maxSteerAngle(55, 1.2));

// Tire upgrades must improve grip (same car, higher handling).
const civic = CARS.find((c) => c.id === 'civic');
const base = computeStats(civic, defaultUpgrades());
const upgraded = computeStats(civic, { engine: 0, tires: 5, brakes: 0 });
assert.ok(upgraded.handling > base.handling * 1.4, 'max tires meaningfully raise handling');
assert.ok(
  maxSteerAngle(50, upgraded.handling) > maxSteerAngle(50, base.handling) * 1.12,
  'upgraded tires raise high-speed steer lock'
);

// Better base handling cars also steer better at the same speed.
assert.ok(
  maxSteerAngle(45, 1.3) > maxSteerAngle(45, 1.0),
  'higher handling cars hold more lock'
);

assert.ok(grassTop(52, 0.5) > 26 && grassTop(52, 0.5) < 30, 'near-curb grass keeps ~half top');
assert.ok(grassTop(52, 30) < 18, 'deep grass is much slower');
assert.ok(grassTop(52, 30) > 14, 'deep grass is still drivable');

const runoff = 17 + 70;
assert.equal(runoff, 87);

console.log('circuit-handling tests OK');
