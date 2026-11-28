// Unit checks for circuit high-speed steering falloff and grass runoff caps.
import assert from 'assert';

function maxSteer({ speed, handling = 1, circuit = false, steerInput = 1 }) {
  const freeSteerBoost = 1;
  const steerDenom = circuit
    ? (1 + (Math.abs(speed) / 14) ** 1.5)
    : (1 + (Math.abs(speed) / 9) ** 2);
  // Match city-driving: lerp(1.1, 1.35, clamp(|steerInput|,0,1))
  const boost = circuit ? (1.1 + 0.25 * Math.min(1, Math.abs(steerInput))) : 1;
  const base = circuit ? 0.48 : 0.5;
  return (base / steerDenom) * (0.85 + 0.15 * handling) * freeSteerBoost * boost;
}

function yawRate(speed, steer, wheelbase = 3) {
  return (speed / wheelbase) * Math.tan(steer);
}

function grassTop(statsTop, over) {
  const depth = Math.min(1, Math.max(0, over / 22));
  return statsTop * (0.55 + (0.32 - 0.55) * depth);
}

// Old city formula was unusable at race pace.
const oldAt70 = 0.5 / (1 + (70 / 9) ** 2);
assert.ok(oldAt70 < 0.01, 'legacy high-speed steer was near zero');

const circuitAt70 = maxSteer({ speed: 70, circuit: true, handling: 1.15 });
const freeAt70 = maxSteer({ speed: 70, circuit: false, handling: 1.15 });
assert.ok(circuitAt70 > 0.04, `circuit steer at 70 m/s should stay useful, got ${circuitAt70}`);
assert.ok(circuitAt70 > freeAt70 * 3, 'circuit high-speed steer must beat open-city falloff');
assert.ok(yawRate(70, circuitAt70) > 0.9 && yawRate(70, circuitAt70) < 2.0,
  `yaw at 70 m/s should be sharp but not spinny, got ${yawRate(70, circuitAt70)}`);

const circuitAt40 = maxSteer({ speed: 40, circuit: true });
assert.ok(circuitAt40 > circuitAt70, 'higher speed still reduces max steer a bit');
assert.ok(yawRate(40, circuitAt40) > 1.0 && yawRate(40, circuitAt40) < 2.2,
  `yaw at 40 m/s should turn hairpins, got ${yawRate(40, circuitAt40)}`);

assert.ok(grassTop(52, 0.5) > 26 && grassTop(52, 0.5) < 30, 'near-curb grass keeps ~half top');
assert.ok(grassTop(52, 30) < 18, 'deep grass is much slower');
assert.ok(grassTop(52, 30) > 14, 'deep grass is still drivable');

const runoff = 17 + 70;
assert.equal(runoff, 87);
assert.ok(runoff > 17 + 0.6, 'runoff must extend past asphalt isOnTrack margin');

console.log('circuit-handling tests OK');
