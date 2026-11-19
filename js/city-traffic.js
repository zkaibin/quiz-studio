// Traffic flow (every lane, mixed vehicle types) and computer-controlled racers for City Driving.
import * as THREE from './vendor/three/three.module.min.js';
import { buildVehicle, disposeVehicle, VEHICLE_TYPES } from './city-vehicles.js';
import { CARS, buildCarModel } from './city-cars.js';
import { LANES } from './city-world.js';

export const PLAYER_Z = 2.6;
const PLAYER_HALF_LEN = 2.3;
const PLAYER_HALF_WIDTH = 0.95;
const RACER_NAMES = ['Mei Ling', 'Arjun', 'Hafiz', 'Wei Jie', 'Priya', 'Jun Hao', 'Siti', 'Daniel'];
const GRID = [
  { lane: 1, z: PLAYER_Z - 11 }, { lane: 0, z: PLAYER_Z - 11 }, { lane: 1, z: PLAYER_Z - 22 },
  { lane: 0, z: PLAYER_Z - 22 }, { lane: 0, z: PLAYER_Z }
];
export const PLAYER_GRID_LANE = 1;
const SPAWN_MIN = -340;
const SPAWN_MAX = -460;

const pickWeighted = (rand, list) => {
  const total = list.reduce((s, [, w]) => s + w, 0);
  let r = rand() * total;
  for (const [item, w] of list) { r -= w; if (r <= 0) return item; }
  return list[0][0];
};

export function createTraffic({ scene, rand }) {
  const traffic = [];
  const racers = [];

  const laneGroupOf = (lane) => (lane < 2 ? 1 : -1);

  function typeFor(lane) {
    const outer = lane === 0 || lane === 3;
    const options = Object.entries(VEHICLE_TYPES)
      .filter(([, t]) => outer || t.lanes.includes(1))
      .map(([id, t]) => [id, t.weight]);
    return pickWeighted(rand, options);
  }

  function makeTraffic(lane) {
    const type = typeFor(lane);
    const info = VEHICLE_TYPES[type];
    const color = info.colors[Math.floor(rand() * info.colors.length)];
    const model = buildVehicle(type, color);
    model.rotation.y = laneGroupOf(lane) > 0 ? 0 : Math.PI;
    scene.add(model);
    const speed = info.speed[0] + rand() * (info.speed[1] - info.speed[0]);
    const v = {
      model, type, lane, dir: laneGroupOf(lane), x: LANES[lane], z: 0, cruise: speed, speed, wheelAngle: 0, cooldown: 0,
      halfLen: model.userData.halfLen, halfWidth: model.userData.halfWidth, kind: 'traffic'
    };
    traffic.push(v);
    return v;
  }

  function placeAhead(v, initialSlot = null) {
    for (let attempt = 0; attempt < 8; attempt++) {
      const z = initialSlot !== null ? initialSlot - attempt * 9 : SPAWN_MIN - rand() * (SPAWN_MIN - SPAWN_MAX);
      const clear = [...traffic, ...racers].every((o) => o === v || o.lane !== v.lane || Math.abs(o.z - z) > 42);
      if (clear || attempt === 7) { v.z = z; break; }
    }
    v.speed = v.cruise;
    v.cooldown = 0.6;
    v.model.visible = true;
    v.x = LANES[v.lane];
    v.model.position.set(v.x, 0, v.z);
  }

  function populate(count) {
    clearTraffic();
    const lanes = [1, 2, 0, 3];
    const slots = [0, 0, 0, 0];
    for (let i = 0; i < count; i++) {
      const lane = lanes[i % 4];
      const v = makeTraffic(lane);
      const spacing = 38 + rand() * 24;
      slots[lane] += 1;
      placeAhead(v, -26 - (lane === 1 ? 18 : 0) - slots[lane] * spacing + (lane > 1 ? -10 : 0));
    }
  }

  function clearTraffic() {
    for (const v of traffic) { scene.remove(v.model); disposeVehicle(v.model); }
    traffic.length = 0;
  }

  // ----- Racers -----
  function setupRace({ playerCar, playerColor, difficulty = 0, count = GRID.length }) {
    clearRacers();
    const pool = CARS.filter((c) => c.id !== playerCar.id);
    const names = [...RACER_NAMES].sort(() => rand() - 0.5);
    for (let i = 0; i < Math.min(count, GRID.length); i++) {
      const car = pool[Math.floor(rand() * pool.length)] || CARS[0];
      let color = car.colors[Math.floor(rand() * car.colors.length)];
      if (color === playerColor && car.colors.length > 1) color = car.colors.find((c) => c !== playerColor);
      const model = buildCarModel(THREE, car, color);
      scene.add(model);
      const slot = GRID[i];
      racers.push({
        model, car, name: names[i], color, lane: slot.lane, x: LANES[slot.lane], z: slot.z, dist: PLAYER_Z - slot.z,
        speed: 0, wheelAngle: 0, yaw: 0, steer: 0, phase: rand() * 6.28, laneTimer: 0, thinkTimer: rand() * 0.3,
        pace: 0.8 + rand() * 0.14 + difficulty * 0.012, accel: 0.85 + rand() * 0.2, finished: false, finishTime: 0,
        halfLen: model.userData.halfLen, halfWidth: model.userData.halfWidth, kind: 'racer', cooldown: 0, targetSpeed: 0, boxed: false
      });
    }
    layoutRacers(0);
  }

  function clearRacers() {
    for (const r of racers) { scene.remove(r.model); disposeVehicle(r.model); }
    racers.length = 0;
  }

  function layoutRacers(distance) {
    for (const r of racers) {
      r.z = PLAYER_Z - (r.dist - distance);
      r.model.position.set(r.x, 0, r.z);
      r.model.rotation.y = -r.yaw;
    }
  }

  const sameDir = () => [...traffic.filter((v) => v.dir > 0), ...racers];

  function leaderOf(self, x) {
    let best = null;
    let gap = Infinity;
    for (const o of sameDir()) {
      if (o === self || Math.abs(o.x - x) > 1.7) continue;
      const g = self.z - o.z - self.halfLen - o.halfLen;
      if (g > -1 && g < gap) { gap = g; best = o; }
    }
    return best ? { vehicle: best, gap } : null;
  }

  function laneIsFree(self, laneX, ctx) {
    for (const o of sameDir()) {
      if (o === self || Math.abs(o.x - laneX) > 2.0) continue;
      const ahead = self.z - o.z;
      const closing = Math.max(0, o.speed - self.speed) * 1.2;
      if (ahead > -(16 + closing) && ahead < 24) return false;
    }
    if (Math.abs(ctx.playerX - laneX) < 2.2) {
      const ahead = self.z - PLAYER_Z;
      if (ahead > -(18 + Math.max(0, ctx.playerSpeed - self.speed)) && ahead < 20) return false;
    }
    return true;
  }

  function updateRacer(r, dt, ctx) {
    r.cooldown = Math.max(0, r.cooldown - dt);
    r.laneTimer = Math.max(0, r.laneTimer - dt);
    r.thinkTimer -= dt;
    const gapToPlayer = r.dist - ctx.distance;
    let rubber = 1;
    if (gapToPlayer > 160) rubber = 0.9;
    else if (gapToPlayer < -110) rubber = 1.06;
    r.targetSpeed = ctx.playerTop * r.pace * rubber * (1 + 0.035 * Math.sin(ctx.time * 0.45 + r.phase));
    if (!ctx.go) r.targetSpeed = 0;

    if (r.thinkTimer <= 0) {
      r.thinkTimer = 0.25;
      const lead = leaderOf(r, r.x);
      r.boxed = false;
      if (lead) {
        const closing = r.speed - lead.vehicle.speed;
        if (lead.gap < 26 + Math.max(0, closing) * 1.6 && closing > -1) {
          const options = r.lane === 0 ? [1] : [0];
          const next = options.find((l) => r.laneTimer === 0 && laneIsFree(r, LANES[l], ctx));
          if (next !== undefined) { r.lane = next; r.laneTimer = 2.8; } else r.boxed = true;
        }
      }
    }
    const lead = leaderOf(r, r.x);
    if (lead && r.boxed && lead.gap < 18) r.targetSpeed = Math.min(r.targetSpeed, lead.vehicle.speed * (lead.gap < 7 ? 0.9 : 1.0));
    if (lead && lead.gap < 3.5) r.speed = Math.min(r.speed, lead.vehicle.speed);

    if (r.speed < r.targetSpeed) {
      const ratio = Math.min(1, r.speed / Math.max(1, r.targetSpeed));
      r.speed += ctx.playerAccel * r.accel * (1 - ratio * ratio * 0.9) * dt;
    } else {
      r.speed = Math.max(r.targetSpeed, r.speed - 9 * dt);
    }
    const maxLateral = Math.min(3.4, r.speed * 0.16);
    const vx = THREE.MathUtils.clamp((LANES[r.lane] - r.x) * 2.0, -maxLateral, maxLateral);
    r.x += vx * dt;
    r.yaw = r.speed > 0.5 ? Math.atan2(vx, r.speed) : 0;
    r.dist += r.speed * dt;
    if (!r.finished && r.dist >= ctx.length) {
      r.finished = true;
      r.finishTime = ctx.time - (r.dist - ctx.length) / Math.max(1, r.speed);
    }
    r.steer = THREE.MathUtils.lerp(r.steer, THREE.MathUtils.clamp(r.yaw * 2.2, -0.4, 0.4), Math.min(1, dt * 8));
    r.z = PLAYER_Z - (r.dist - ctx.distance);
  }

  function update(dt, ctx) {
    const forward = ctx.playerForward;
    for (const v of traffic) {
      v.cooldown = Math.max(0, v.cooldown - dt);
      if (v.dir > 0) {
        const lead = leaderOf(v, v.x);
        let target = v.cruise;
        if (lead && lead.gap < 16) target = Math.min(target, lead.vehicle.speed * (lead.gap < 8 ? 0.85 : 1));
        v.speed += THREE.MathUtils.clamp(target - v.speed, -6 * dt, 3 * dt);
        v.z += (forward - v.speed) * dt;
      } else {
        v.z += (forward + v.speed) * dt;
      }
      if (v.z > 24) placeAhead(v);
      else if (v.z < SPAWN_MAX - 60) placeAhead(v);
      v.wheelAngle += (v.speed * dt) / (v.model.userData.wheelRadius || 0.35);
      for (const w of v.model.userData.wheels) w.rotation.x = -v.wheelAngle;
      v.model.position.set(v.x, 0, v.z);
    }
    for (const r of racers) {
      updateRacer(r, dt, ctx);
      r.wheelAngle += (r.speed * dt) / (r.model.userData.wheelRadius || 0.35);
      for (const w of r.model.userData.wheels) w.rotation.x = -r.wheelAngle;
      for (const p of r.model.userData.frontPivots || []) p.rotation.y = -r.steer;
      r.model.position.set(r.x, 0, r.z);
      r.model.rotation.y = -r.yaw;
      const tailGlow = r.speed < r.targetSpeed - 0.5 || r.targetSpeed < r.speed - 1 ? 1.8 : 0.5;
      if (r.model.userData.tail) r.model.userData.tail.emissiveIntensity = tailGlow;
    }
  }

  // Returns the first vehicle overlapping the player's box (heading is small enough to ignore).
  function findCollision(playerX) {
    for (const v of [...traffic, ...racers]) {
      if (v.cooldown > 0 || !v.model.visible) continue;
      if (Math.abs(v.z - PLAYER_Z) < PLAYER_HALF_LEN + v.halfLen - 0.35 && Math.abs(v.x - playerX) < PLAYER_HALF_WIDTH + v.halfWidth - 0.1) return v;
    }
    return null;
  }

  function resolveCollision(v, playerX) {
    if (v.kind === 'racer') {
      v.speed *= 0.7;
      v.cooldown = 1.0;
      v.x += Math.sign(v.x - playerX || 1) * 0.3;
    } else {
      placeAhead(v);
    }
  }

  function standings(distance, length, time, playerTime = null) {
    const rows = racers.map((r) => ({
      name: r.name, car: r.car.name, finished: r.finished, progress: r.dist,
      time: r.finished ? r.finishTime : time + (length - r.dist) / Math.max(8, r.speed || 8)
    }));
    rows.push({ name: 'You', car: null, you: true, finished: playerTime !== null, progress: distance, time: playerTime ?? time + Math.max(0, length - distance) / 30 });
    return rows;
  }

  // Live ordering by distance covered.
  function rankPlayer(distance) {
    return 1 + racers.filter((r) => r.dist > distance).length;
  }

  return {
    traffic, racers, populate, clearTraffic, setupRace, clearRacers, layoutRacers, update, findCollision, resolveCollision,
    standings, rankPlayer, finishedCount: () => racers.filter((r) => r.finished).length
  };
}
