// Traffic flow (every lane, mixed vehicle types) and computer-controlled racers for City Driving.
import * as THREE from './vendor/three/three.module.min.js';
import { buildVehicle, disposeVehicle, VEHICLE_TYPES } from './city-vehicles.js';
import { CARS, buildCarModel } from './city-cars.js';
import { LANES } from './city-world.js';
import { placeObjectOnSphere } from './city-planet.js';

export const PLAYER_Z = 2.6;
const PLAYER_HALF_LEN = 2.3;
const PLAYER_HALF_WIDTH = 0.95;
const RACER_NAMES = ['Mei Ling', 'Arjun', 'Hafiz', 'Wei Jie', 'Priya', 'Jun Hao', 'Siti', 'Daniel'];
// Starting grid: player sits alone in lane 1; rivals stage ahead so the circuit opens up for a top-speed run.
const GRID = [
  { lane: 0, z: PLAYER_Z - 14 }, { lane: 0, z: PLAYER_Z - 28 },
  { lane: 1, z: PLAYER_Z - 36 }, { lane: 0, z: PLAYER_Z - 48 },
  { lane: 1, z: PLAYER_Z - 60 }
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
  const CIRCUIT_LANE = [-4.5, 4.5];

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
      const lane = slot.lane;
      const laneOffset = CIRCUIT_LANE[lane] ?? CIRCUIT_LANE[0];
      racers.push({
        model, car, name: names[i], color, lane, x: LANES[lane], z: slot.z, dist: PLAYER_Z - slot.z,
        speed: 0, wheelAngle: 0, yaw: 0, steer: 0, phase: rand() * 6.28, laneTimer: 0, thinkTimer: rand() * 0.3,
        pace: 0.8 + rand() * 0.14 + difficulty * 0.012, accel: 0.85 + rand() * 0.2, finished: false, finishTime: 0,
        halfLen: model.userData.halfLen || 2.2, halfWidth: model.userData.halfWidth || 0.95,
        kind: 'racer', cooldown: 0, hitCooldown: 0, targetSpeed: 0, boxed: false,
        circuit: !!circuitApi, y: 0,
        // Smooth lateral offset — never snap between lanes (that looked like teleporting).
        laneOffset, targetLaneOffset: laneOffset
      });
    }
    if (circuitApi) {
      // Player spawn sits near t≈0.018; stage rivals clearly ahead of that (~40m+).
      const spawnAhead = Math.max(48, (circuitApi.length || 800) * 0.035);
      for (let i = 0; i < racers.length; i++) {
        racers[i].dist = spawnAhead + i * 22;
        placeOnCircuit(racers[i]);
      }
    } else {
      layoutRacers(0);
    }
  }

  function clearRacers() {
    for (const r of racers) { scene.remove(r.model); disposeVehicle(r.model); }
    racers.length = 0;
  }

  function layoutRacers(distance) {
    for (const r of racers) {
      if (r.circuit) {
        placeOnCircuit(r);
        continue;
      }
      r.z = PLAYER_Z - (r.dist - distance);
      r.model.position.set(r.x, 0, r.z);
      r.model.rotation.y = -r.yaw;
    }
  }

  let circuitApi = null;
  function bindCircuit(api) {
    circuitApi = api;
  }

  function placeOnCircuit(r) {
    if (!circuitApi) return;
    const len = Math.max(1, circuitApi.length);
    // Keep dist continuous for multi-lap placement without a visual jump at the seam.
    const t = ((r.dist / len) % 1 + 1) % 1;
    const s = circuitApi.sample(t);
    const side = new THREE.Vector3(-s.tangent.z, 0, s.tangent.x);
    if (side.lengthSq() < 1e-8) side.set(1, 0, 0);
    else side.normalize();
    const lat = r.laneOffset ?? CIRCUIT_LANE[r.lane] ?? CIRCUIT_LANE[0];
    r.x = s.point.x + side.x * lat;
    r.z = s.point.z + side.z * lat;
    r.y = (s.point.y || 0) + 0.05;
    r.yaw = s.heading;
    r.tangent = s.tangent;
    if (circuitApi.planet) {
      placeObjectOnSphere(r.model, r.x, 0, r.z, r.yaw);
    } else {
      r.model.position.set(r.x, r.y, r.z);
      r.model.rotation.y = -r.yaw;
    }
  }

  const sameDir = () => [...traffic.filter((v) => v.dir > 0), ...racers];

  function leaderOf(self, x) {
    let best = null;
    let gap = Infinity;
    for (const o of sameDir()) {
      if (o === self || Math.abs(o.x - x) > 2.2) continue;
      const g = self.z - o.z - self.halfLen - o.halfLen;
      if (g > -1 && g < gap) { gap = g; best = o; }
    }
    return best ? { vehicle: best, gap } : null;
  }

  /** Car ahead on the circuit in roughly the same lane (by track distance). */
  function circuitLeader(self, playerDist, playerLaneOffset) {
    let best = null;
    let gap = Infinity;
    for (const o of racers) {
      if (o === self) continue;
      if (Math.abs((o.laneOffset ?? 0) - (self.laneOffset ?? 0)) > 3.2) continue;
      const g = o.dist - self.dist - self.halfLen - o.halfLen;
      if (g > -0.5 && g < gap) { gap = g; best = o; }
    }
    // Player counts as a lead car when ahead in the same corridor.
    if (Number.isFinite(playerDist) && Math.abs((playerLaneOffset ?? 0) - (self.laneOffset ?? 0)) <= 3.2) {
      const g = playerDist - self.dist - self.halfLen - PLAYER_HALF_LEN;
      if (g > -0.5 && g < gap) {
        gap = g;
        best = { speed: 0, isPlayer: true };
      }
    }
    return best ? { vehicle: best, gap } : null;
  }

  function circuitLaneFree(self, targetOffset, playerDist, playerLaneApprox) {
    for (const o of racers) {
      if (o === self) continue;
      if (Math.abs((o.laneOffset ?? 0) - targetOffset) > 3.0) continue;
      const ahead = o.dist - self.dist;
      if (ahead > -14 && ahead < 22) return false;
    }
    if (Math.abs((playerLaneApprox ?? 0) - targetOffset) < 3.2) {
      const ahead = playerDist - self.dist;
      if (ahead > -14 && ahead < 20) return false;
    }
    return true;
  }

  function laneIsFree(self, laneX, ctx) {
    for (const o of sameDir()) {
      if (o === self || Math.abs(o.x - laneX) > 2.6) continue;
      const ahead = self.z - o.z;
      const closing = Math.max(0, o.speed - self.speed) * 1.2;
      if (ahead > -(16 + closing) && ahead < 24) return false;
    }
    if (Math.abs(ctx.playerX - laneX) < 2.8) {
      const ahead = self.z - PLAYER_Z;
      if (ahead > -(18 + Math.max(0, ctx.playerSpeed - self.speed)) && ahead < 20) return false;
    }
    return true;
  }

  function updateRacer(r, dt, ctx) {
    r.cooldown = Math.max(0, r.cooldown - dt);
    r.hitCooldown = Math.max(0, (r.hitCooldown || 0) - dt);
    r.laneTimer = Math.max(0, r.laneTimer - dt);
    r.thinkTimer -= dt;
    const onCircuit = !!(r.circuit && circuitApi);
    // Hold the grid still until the countdown releases the field.
    if (!ctx.go) {
      r.targetSpeed = 0;
      r.speed = 0;
      r.steer = 0;
      if (onCircuit) {
        placeOnCircuit(r);
      } else {
        r.yaw = 0;
        r.z = PLAYER_Z - (r.dist - ctx.distance);
        r.model.position.set(r.x, 0, r.z);
        r.model.rotation.y = 0;
      }
      return;
    }
    const gapToPlayer = r.dist - ctx.distance;
    let rubber = 1;
    if (gapToPlayer > 160) rubber = 0.9;
    else if (gapToPlayer < -110) rubber = 1.06;
    // Circuits: slow for corners using upcoming curvature.
    let cornerFactor = 1;
    if (onCircuit) {
      const t = (r.dist / Math.max(1, circuitApi.length)) % 1;
      const a = circuitApi.sample(t).tangent;
      const b = circuitApi.sample((t + 0.04) % 1).tangent;
      const bend = 1 - Math.max(-1, Math.min(1, a.dot(b)));
      cornerFactor = THREE.MathUtils.clamp(1.05 - bend * 2.8, 0.42, 1);
    }
    r.targetSpeed = ctx.playerTop * r.pace * rubber * cornerFactor * (1 + 0.035 * Math.sin(ctx.time * 0.45 + r.phase));

    if (r.thinkTimer <= 0) {
      r.thinkTimer = onCircuit ? 0.45 : 0.25;
      if (!onCircuit) {
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
      } else if (r.laneTimer === 0) {
        // Occasional, deliberate lane change — never an instant snap.
        const lead = circuitLeader(r, ctx.distance, ctx.playerLaneOffset);
        const other = r.lane === 0 ? 1 : 0;
        const wantPass = lead && lead.gap < 16 && (lead.vehicle.speed ?? ctx.playerSpeed) < r.speed - 1;
        if ((wantPass || rand() < 0.08) && circuitLaneFree(r, CIRCUIT_LANE[other], ctx.distance, ctx.playerLaneOffset)) {
          r.lane = other;
          r.targetLaneOffset = CIRCUIT_LANE[other];
          r.laneTimer = 3.2;
        }
      }
    }
    if (!onCircuit) {
      const lead = leaderOf(r, r.x);
      if (lead && r.boxed && lead.gap < 18) r.targetSpeed = Math.min(r.targetSpeed, lead.vehicle.speed * (lead.gap < 7 ? 0.9 : 1.0));
      if (lead && lead.gap < 3.5) r.speed = Math.min(r.speed, lead.vehicle.speed);
    } else {
      // Brake for the car ahead so AI never drives through each other.
      const lead = circuitLeader(r, ctx.distance, ctx.playerLaneOffset);
      if (lead) {
        const closing = r.speed - (lead.vehicle.isPlayer ? ctx.playerSpeed : lead.vehicle.speed);
        if (lead.gap < 14 + Math.max(0, closing) * 0.9) {
          const cap = lead.vehicle.isPlayer ? ctx.playerSpeed : lead.vehicle.speed;
          r.targetSpeed = Math.min(r.targetSpeed, Math.max(4, cap * (lead.gap < 6 ? 0.75 : 0.95)));
        }
        if (lead.gap < 4.5) r.speed = Math.min(r.speed, (lead.vehicle.isPlayer ? ctx.playerSpeed : lead.vehicle.speed) + lead.gap * 0.5);
      }
    }

    if (r.speed < r.targetSpeed) {
      const ratio = Math.min(1, r.speed / Math.max(1, r.targetSpeed));
      r.speed += ctx.playerAccel * r.accel * (1 - ratio * ratio * 0.9) * dt;
    } else {
      r.speed = Math.max(r.targetSpeed, r.speed - 9 * dt);
    }
    if (onCircuit) {
      // Smooth lateral lerp toward the chosen lane (kills teleport pops).
      if (r.targetLaneOffset == null) r.targetLaneOffset = r.laneOffset ?? CIRCUIT_LANE[r.lane];
      r.laneOffset = THREE.MathUtils.lerp(r.laneOffset ?? r.targetLaneOffset, r.targetLaneOffset, Math.min(1, dt * 2.4));
      r.dist += r.speed * dt;
      if (!r.finished && r.dist >= ctx.length) {
        r.finished = true;
        r.finishTime = ctx.time - (r.dist - ctx.length) / Math.max(1, r.speed);
      }
      placeOnCircuit(r);
      r.steer = THREE.MathUtils.lerp(r.steer, 0, Math.min(1, dt * 6));
      return;
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

  /** Push overlapping circuit cars apart along the track and sideways. */
  function resolveCircuitOverlaps(ctx) {
    if (!circuitApi) return;
    const bodies = racers.filter((r) => r.circuit);
    for (let i = 0; i < bodies.length; i++) {
      for (let j = i + 1; j < bodies.length; j++) {
        const a = bodies[i];
        const b = bodies[j];
        const dx = a.x - b.x;
        const dz = a.z - b.z;
        const dist = Math.hypot(dx, dz);
        const minDist = a.halfLen + b.halfLen - 0.35;
        if (dist >= minDist || dist < 1e-4) continue;
        const push = (minDist - dist) * 0.4;
        // Prefer separating along track distance so they don't stick side-by-side forever.
        if (a.dist >= b.dist) {
          a.dist += push * 0.55;
          b.dist -= push * 0.45;
        } else {
          b.dist += push * 0.55;
          a.dist -= push * 0.45;
        }
        // Nudge laterally if almost nested.
        if (Math.abs((a.laneOffset ?? 0) - (b.laneOffset ?? 0)) < 2.2) {
          const side = Math.sign((a.laneOffset ?? 0) - (b.laneOffset ?? 0) || 1);
          a.laneOffset = (a.laneOffset ?? 0) + side * 0.22;
          b.laneOffset = (b.laneOffset ?? 0) - side * 0.22;
          a.targetLaneOffset = THREE.MathUtils.lerp(a.targetLaneOffset ?? a.laneOffset, a.laneOffset, 0.5);
          b.targetLaneOffset = THREE.MathUtils.lerp(b.targetLaneOffset ?? b.laneOffset, b.laneOffset, 0.5);
        }
        a.speed *= 0.92;
        b.speed *= 0.92;
        placeOnCircuit(a);
        placeOnCircuit(b);
      }
    }
    // Player vs AI — soft separation even during hit cooldown (prevents ghosting without big pops).
    if (!ctx || !Number.isFinite(ctx.playerX)) return;
    for (const r of bodies) {
      const dx = r.x - ctx.playerX;
      const dz = r.z - (ctx.playerZ ?? 0);
      const dist = Math.hypot(dx, dz);
      const minDist = PLAYER_HALF_LEN + r.halfLen - 0.25;
      if (dist >= minDist || dist < 1e-4) continue;
      const push = Math.min(1.4, minDist - dist);
      r.dist += push * 0.45;
      r.laneOffset = THREE.MathUtils.clamp(
        (r.laneOffset ?? 0) + Math.sign(dx || 1) * Math.min(0.55, push * 0.25),
        -7.5, 7.5
      );
      r.targetLaneOffset = r.laneOffset;
      r.speed *= 0.85;
      placeOnCircuit(r);
    }
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
      // Circuit racers already posed in placeOnCircuit (flat or sphere).
      if (!(r.circuit && circuitApi)) {
        r.model.position.set(r.x, 0, r.z);
        r.model.rotation.y = -r.yaw;
      } else if (!circuitApi.planet) {
        r.model.position.set(r.x, r.y || 0, r.z);
        r.model.rotation.y = -r.yaw;
      }
      const tailGlow = r.speed < r.targetSpeed - 0.5 || r.targetSpeed < r.speed - 1 ? 1.8 : 0.5;
      if (r.model.userData.tail) r.model.userData.tail.emissiveIntensity = tailGlow;
    }
    // Continuous solid-body separation on circuits (survives player hit cooldown).
    if (circuitApi) resolveCircuitOverlaps(ctx);
  }

  // Returns the first vehicle overlapping the player's box (heading is small enough to ignore).
  function findCollision(playerX, playerZ = PLAYER_Z) {
    const wrapAware = !!(circuitApi && circuitApi.planet);
    const wrapD = (a, b) => {
      if (!wrapAware) return a - b;
      let d = a - b;
      const span = circuitApi.length || 1;
      d -= span * Math.round(d / span);
      return d;
    };
    for (const v of [...traffic, ...racers]) {
      if (!v.model.visible) continue;
      // Circuit: ignore short post-hit cooldown so cars can't ghost through each other.
      // Free-road traffic still skips while cooldown > 0 (respawn grace).
      if (!v.circuit && v.cooldown > 0) continue;
      if (v.circuit && (v.hitCooldown || 0) > 0) continue;
      if (v.circuit) {
        if (Math.hypot(wrapD(v.x, playerX), wrapD(v.z, playerZ)) < PLAYER_HALF_LEN + v.halfLen - 0.2) return v;
        continue;
      }
      if (Math.abs(v.z - playerZ) < PLAYER_HALF_LEN + v.halfLen - 0.35 && Math.abs(v.x - playerX) < PLAYER_HALF_WIDTH + v.halfWidth - 0.1) return v;
    }
    return null;
  }

  function resolveCollision(v, playerX, playerZ) {
    if (v.kind === 'racer') {
      v.speed *= 0.7;
      v.cooldown = 0.35;
      v.hitCooldown = 0.7;
      if (v.circuit && circuitApi) {
        // Small track-space nudge only — large jumps read as teleports on impact.
        const side = Math.sign((v.x - playerX) || 1);
        v.dist += 1.1;
        v.laneOffset = THREE.MathUtils.clamp((v.laneOffset ?? 0) + side * 0.7, -7.5, 7.5);
        v.targetLaneOffset = v.laneOffset;
        placeOnCircuit(v);
      } else {
        v.x += Math.sign(v.x - playerX || 1) * 0.3;
      }
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
    standings, rankPlayer, bindCircuit, finishedCount: () => racers.filter((r) => r.finished).length
  };
}
