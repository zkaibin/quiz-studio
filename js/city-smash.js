// Free-roam destruction: flying debris, toppled props, knocked-down pedestrians and traffic the player can crash into.
import * as THREE from './vendor/three/three.module.min.js';
import { buildVehicle, disposeVehicle, VEHICLE_TYPES } from './city-vehicles.js';
import { PITCH, GRID, SIZE, isFreeDrivable, wraps, wrapCoord, currentCity } from './city-map.js';
import { placeObjectOnSphere, planetRadius } from './city-planet.js';

const GRAVITY = 18;
const MAX_BITS = 180;
const MAX_PUFFS = 90;
const bitGeo = new THREE.BoxGeometry(1, 1, 1);
const puffGeo = new THREE.SphereGeometry(1, 8, 6);
const puffMat = new THREE.MeshBasicMaterial({ color: 0x4a4a4a, transparent: true, opacity: 0.42, depthWrite: false });
const bitMats = new Map();
const bitMat = (color) => {
  if (!bitMats.has(color)) bitMats.set(color, new THREE.MeshStandardMaterial({ color, roughness: 0.7 }));
  return bitMats.get(color);
};
const disposeTree = (o) => o.traverse((n) => { if (n.geometry && !n.userData.sharedGeometry) n.geometry.dispose(); });

export function createEffects(root) {
  const bits = [];
  const puffs = [];
  const wrecks = [];
  const downed = [];

  function burst(x, y, z, colors, count, power, dirx = 0, dirz = 0) {
    for (let k = 0; k < count; k++) {
      const s = 0.07 + Math.random() * 0.16;
      const mesh = new THREE.Mesh(bitGeo, bitMat(colors[k % colors.length]));
      mesh.scale.set(s, s * (0.5 + Math.random()), s);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      root.add(mesh);
      bits.push({
        mesh,
        v: new THREE.Vector3((Math.random() - 0.5) * power + dirx * power * 0.6, 2 + Math.random() * power * 0.6, (Math.random() - 0.5) * power + dirz * power * 0.6),
        spin: new THREE.Vector3(Math.random() * 12, Math.random() * 12, Math.random() * 12),
        life: 1.2 + Math.random() * 0.9
      });
    }
    while (bits.length > MAX_BITS) root.remove(bits.shift().mesh);
  }

  function puff(x, y, z, size = 0.5) {
    const mesh = new THREE.Mesh(puffGeo, puffMat);
    mesh.position.set(x + (Math.random() - 0.5) * 0.5, y, z + (Math.random() - 0.5) * 0.5);
    root.add(mesh);
    puffs.push({ mesh, size, life: 1.8, age: 0 });
    while (puffs.length > MAX_PUFFS) root.remove(puffs.shift().mesh);
  }

  // A fixture breaks free of the merged city mesh and is rebuilt as a loose model that topples or flies away.
  function wreck({ frame, build, x, z, dirx, dirz, speed, mode }) {
    const pivot = new THREE.Group();
    const inner = new THREE.Group();
    inner.position.set(-x, 0, -z);
    pivot.add(inner);
    build(inner);
    inner.traverse((n) => { if (n.isMesh) n.castShadow = true; });
    pivot.position.set(x, 0, z).applyMatrix4(frame.matrixWorld);
    const base = frame.getWorldQuaternion(new THREE.Quaternion());
    pivot.quaternion.copy(base);
    root.add(pivot);
    const len = Math.hypot(dirx, dirz) || 1;
    const nx = dirx / len; const nz = dirz / len;
    wrecks.push({
      pivot, inner, base, mode, angle: 0, omega: 0.4 + Math.min(speed, 25) * 0.05, rest: false, timer: 11,
      axis: new THREE.Vector3(nz, 0, -nx), ground: pivot.position.y,
      vel: new THREE.Vector3(nx * Math.min(speed, 30) * 0.7, 4 + Math.min(speed, 30) * 0.28, nz * Math.min(speed, 30) * 0.7),
      rate: 4 + Math.random() * 6
    });
  }

  function knockPed(ped, vx, vz, vy) {
    ped.rotation.order = 'YXZ';
    root.attach(ped);
    const p = ped.userData.ped;
    for (const limb of [...p.legs, ...p.arms]) limb.rotation.x = (Math.random() - 0.5) * 2.2;
    downed.push({ ped, vel: new THREE.Vector3(vx, vy, vz), tilt: 0, life: 10, bounced: false });
  }

  function update(dt) {
    for (let k = bits.length - 1; k >= 0; k--) {
      const b = bits[k];
      b.life -= dt;
      b.v.y -= GRAVITY * dt;
      b.mesh.position.addScaledVector(b.v, dt);
      b.mesh.rotation.x += b.spin.x * dt; b.mesh.rotation.y += b.spin.y * dt;
      if (b.mesh.position.y < 0.05) { b.mesh.position.y = 0.05; b.v.set(b.v.x * 0.5, Math.abs(b.v.y) * 0.3, b.v.z * 0.5); b.spin.multiplyScalar(0.5); }
      if (b.life <= 0) { root.remove(b.mesh); bits.splice(k, 1); }
    }
    for (let k = puffs.length - 1; k >= 0; k--) {
      const s = puffs[k];
      s.age += dt;
      s.mesh.position.y += dt * 1.6;
      const t = s.age / s.life;
      s.mesh.scale.setScalar(s.size * (0.6 + t * 1.8) * (t > 0.7 ? (1 - t) / 0.3 : 1));
      if (s.age >= s.life) { root.remove(s.mesh); puffs.splice(k, 1); }
    }
    const q = new THREE.Quaternion();
    for (let k = wrecks.length - 1; k >= 0; k--) {
      const w = wrecks[k];
      if (w.rest) {
        w.timer -= dt;
        if (w.timer <= 0) { root.remove(w.pivot); disposeTree(w.pivot); wrecks.splice(k, 1); }
        continue;
      }
      if (w.mode === 'topple') {
        w.omega += 6 * dt;
        w.angle += w.omega * dt;
        if (w.angle >= 1.48) { w.angle = 1.48; w.rest = true; }
      } else {
        w.vel.y -= GRAVITY * dt;
        w.pivot.position.addScaledVector(w.vel, dt);
        w.angle += w.rate * dt;
        if (w.pivot.position.y <= w.ground) {
          w.pivot.position.y = w.ground;
          if (w.vel.y < -3) { w.vel.set(w.vel.x * 0.55, -w.vel.y * 0.3, w.vel.z * 0.55); } else { w.rest = true; w.angle = Math.round(w.angle / (Math.PI / 2)) * (Math.PI / 2); }
        }
      }
      w.pivot.quaternion.copy(q.setFromAxisAngle(w.axis, w.angle)).multiply(w.base);
    }
    for (let k = downed.length - 1; k >= 0; k--) {
      const d = downed[k];
      d.life -= dt;
      d.tilt = Math.min(Math.PI / 2, d.tilt + 6 * dt);
      d.ped.rotation.x = -d.tilt;
      if (d.vel.lengthSq() > 0.01 || d.ped.position.y > 0.25) {
        d.vel.y -= GRAVITY * dt;
        d.ped.position.addScaledVector(d.vel, dt);
        if (d.ped.position.y <= 0.2) {
          d.ped.position.y = 0.2;
          d.vel.y = d.bounced ? 0 : Math.abs(d.vel.y) * 0.25;
          d.bounced = true;
          d.vel.x *= 1 - Math.min(1, 5 * dt); d.vel.z *= 1 - Math.min(1, 5 * dt);
          if (d.vel.lengthSq() < 0.05) d.vel.set(0, 0, 0);
        }
      }
      if (d.life <= 0) { root.remove(d.ped); downed.splice(k, 1); }
    }
  }

  function clear() {
    for (const b of bits) root.remove(b.mesh);
    for (const s of puffs) root.remove(s.mesh);
    for (const w of wrecks) { root.remove(w.pivot); disposeTree(w.pivot); }
    for (const d of downed) root.remove(d.ped);
    bits.length = 0; puffs.length = 0; wrecks.length = 0; downed.length = 0;
  }

  return { burst, puff, wreck, knockPed, update, clear };
}

const MASS = { moto: 0.3, hatch: 0.9, sedan: 1, taxi: 1, suv: 1.3, van: 1.5, bus: 3.5, lorry: 3 };
const WRECK_IMPACT = 9;
const WRECK_DAMAGE = 15;
const SPARK = [0xffd34d, 0xff8a3d, 0xcfd6d9];
const TARGET_TRAFFIC = 12;

const pickType = (rand, parked) => {
  const entries = Object.entries(VEHICLE_TYPES).filter(([name]) => !parked || !['bus', 'lorry', 'moto'].includes(name));
  let roll = rand() * entries.reduce((sum, [, t]) => sum + t.weight, 0);
  for (const [name, t] of entries) { roll -= t.weight; if (roll <= 0) return name; }
  return entries[0][0];
};

export function createCars({ root, effects, stats, rand = Math.random }) {
  const cars = [];
  const pool = new Map();
  const gone = new Set();
  const sizeBox = new THREE.Box3();

  function acquire(type, color) {
    const key = `${type}:${color}`;
    const model = pool.get(key)?.pop() || buildVehicle(type, color);
    model.userData.poolKey = key;
    model.rotation.order = 'YXZ';
    return model;
  }

  function release(car) {
    root.remove(car.model);
    car.model.scale.set(1, 1, 1);
    car.model.rotation.set(0, 0, 0);
    const key = car.model.userData.poolKey;
    if (!pool.has(key)) pool.set(key, []);
    pool.get(key).push(car.model);
  }

  function make(type, parked) {
    const spec = VEHICLE_TYPES[type];
    const color = spec.colors[Math.floor(rand() * spec.colors.length)];
    const model = acquire(type, color);
    sizeBox.setFromObject(model);
    const car = {
      model, type, hl: (sizeBox.max.z - sizeBox.min.z) / 2, hw: (sizeBox.max.x - sizeBox.min.x) / 2, mass: MASS[type] || 1,
      x: 0, z: 0, heading: 0, speed: 0, cruise: 0, state: 'parked', vx: 0, vz: 0, omega: 0, damage: 0, cd: 0, life: 0, wrecked: false, smokeT: 0,
      chunkKey: null, id: null, lane: null, parked, wheelAngle: 0
    };
    root.add(model);
    return car;
  }

  function place(car) {
    if (currentCity().planet) {
      car.model.userData.planetSkipBend = true;
      placeObjectOnSphere(car.model, car.x, 0, car.z, car.heading, planetRadius());
      return;
    }
    car.model.position.set(car.x, 0, car.z);
    car.model.rotation.y = -car.heading;
  }

  function markPlanetSkip(on = true) {
    for (const car of cars) car.model.userData.planetSkipBend = !!on;
  }

  function projectToPlanet(radius = planetRadius()) {
    markPlanetSkip(true);
    for (const car of cars) placeObjectOnSphere(car.model, car.x, 0, car.z, car.heading, radius);
  }

  function resetVisual(car) {
    car.model.scale.set(1, 1, 1);
    car.model.rotation.set(0, 0, 0);
    car.wrecked = false; car.damage = 0; car.vx = 0; car.vz = 0; car.omega = 0; car.cd = 0;
  }

  function addParked(chunkKey, id, x, z, heading) {
    if (gone.has(id)) return;
    const car = make(pickType(rand, true), true);
    Object.assign(car, { x, z, heading, state: 'parked', chunkKey, id, life: Infinity });
    place(car);
    cars.push(car);
  }

  function removeChunk(chunkKey) {
    for (let k = cars.length - 1; k >= 0; k--) {
      if (cars[k].chunkKey !== chunkKey) continue;
      release(cars[k]);
      cars.splice(k, 1);
    }
  }

  function crowded(x, z, except) {
    return cars.some((c) => {
      if (c === except) return false;
      let ddx = c.x - x; let ddz = c.z - z;
      if (wraps()) {
        ddx -= SIZE * Math.round(ddx / SIZE);
        ddz -= SIZE * Math.round(ddz / SIZE);
      }
      return Math.hypot(ddx, ddz) < 18;
    });
  }

  // Traffic runs along the four lanes of the road grid; left-hand drive puts northbound cars on the west side.
  function respawn(car, px, pz) {
    for (let attempt = 0; attempt < 6; attempt++) {
      const alongZ = rand() < 0.5;
      const forward = rand() < 0.5;
      const sign = rand() < 0.5 ? -1 : 1;
      const span = wraps() ? 220 : 360;
      const rawIndex = Math.round(((alongZ ? px : pz) + (rand() - 0.5) * span) / PITCH);
      const index = wraps() ? ((rawIndex % GRID) + GRID) % GRID : Math.max(0, Math.min(GRID, rawIndex));
      const line = index * PITCH + (forward ? -3.55 : 3.55);
      const alongRaw = (alongZ ? pz : px) + sign * (90 + rand() * 170);
      const along = wraps() ? wrapCoord(alongRaw) : Math.max(10, Math.min(SIZE - 10, alongRaw));
      const x = alongZ ? line : along; const z = alongZ ? along : line;
      if (Math.hypot(x - px, z - pz) < 70 || crowded(x, z, car)) continue;
      resetVisual(car);
      car.lane = { alongZ, line };
      car.heading = alongZ ? (forward ? 0 : Math.PI) : (forward ? Math.PI / 2 : -Math.PI / 2);
      car.x = x; car.z = z;
      const spec = VEHICLE_TYPES[car.type];
      car.cruise = spec.speed[0] + rand() * (spec.speed[1] - spec.speed[0]);
      car.speed = car.cruise;
      car.state = 'drive';
      car.life = Infinity;
      car.model.visible = true;
      place(car);
      return true;
    }
    car.model.visible = false;
    car.state = 'idle';
    return false;
  }

  function wreckCar(car, nx, nz) {
    if (car.wrecked) return;
    car.wrecked = true;
    car.life = 18;
    car.model.scale.set(1, 0.8, 1);
    car.model.rotation.x = (rand() - 0.5) * 0.12;
    car.model.rotation.z = (rand() - 0.5) * 0.2;
    effects.burst(car.x, 0.8, car.z, [...SPARK, 0x2a2d31], 22, 9, nx, nz);
    if (car.id) gone.add(car.id);
    stats.cars++;
  }

  function update(dt, player) {
    const live = cars.filter((c) => c.parked !== true && c.chunkKey === null).length;
    if (live < TARGET_TRAFFIC) {
      const car = make(pickType(rand, false), false);
      car.model.visible = false;
      car.state = 'idle';
      cars.push(car);
    }
    const toroidal = (ax, az, bx, bz) => {
      let ddx = ax - bx; let ddz = az - bz;
      if (wraps()) {
        ddx -= SIZE * Math.round(ddx / SIZE);
        ddz -= SIZE * Math.round(ddz / SIZE);
      }
      return Math.hypot(ddx, ddz);
    };
    for (let k = cars.length - 1; k >= 0; k--) {
      const car = cars[k];
      car.cd = Math.max(0, car.cd - dt);
      if (car.state === 'idle') { respawn(car, player.x, player.z); continue; }
      if (car.wrecked) {
        car.smokeT -= dt;
        if (car.smokeT <= 0 && car.life > 3) { car.smokeT = 0.14; effects.puff(car.x, 1.0, car.z, 0.55); }
      }
      if (car.state === 'drive') {
        // Planet pose faces +Z for heading 0; Earth free-roam faces −Z.
        const dx = Math.sin(car.heading);
        const dz = currentCity().planet ? Math.cos(car.heading) : -Math.cos(car.heading);
        let target = car.cruise;
        const probe = (ox, oz, ohl, ohw) => {
          let rx = ox - car.x; let rz = oz - car.z;
          if (wraps()) {
            rx -= SIZE * Math.round(rx / SIZE);
            rz -= SIZE * Math.round(rz / SIZE);
          }
          const along = rx * dx + rz * dz; const lat = rx * -dz + rz * dx;
          if (along > 0 && along < car.hl + 22 && Math.abs(lat) < car.hw + ohw + 0.6) target = Math.min(target, Math.max(0, (along - car.hl - ohl - 3.5) * 1.1));
        };
        probe(player.x, player.z, 2.3, 0.95);
        for (const o of cars) if (o !== car && o.state !== 'idle') probe(o.x, o.z, o.hl, o.hw);
        car.speed += THREE.MathUtils.clamp(target - car.speed, -14 * dt, 4 * dt);
        car.x += dx * car.speed * dt;
        car.z += dz * car.speed * dt;
        if (wraps()) {
          car.x = wrapCoord(car.x);
          car.z = wrapCoord(car.z);
        }
        car.wheelAngle += car.speed * dt / 0.35;
        for (const w of car.model.userData.wheels || []) w.rotation.x = -car.wheelAngle;
        const outside = !wraps() && (car.x < -10 || car.z < -10 || car.x > SIZE + 10 || car.z > SIZE + 10);
        if (toroidal(car.x, car.z, player.x, player.z) > 340 || outside) respawn(car, player.x, player.z);
        else place(car);
      } else if (car.state === 'knocked') {
        let nx = car.x + car.vx * dt; let nz = car.z + car.vz * dt;
        if (wraps()) { nx = wrapCoord(nx); nz = wrapCoord(nz); }
        if (isFreeDrivable(nx, nz)) { car.x = nx; car.z = nz; } else { car.vx = 0; car.vz = 0; }
        car.heading += car.omega * dt;
        const slow = 1 - Math.min(1, 1.8 * dt);
        car.vx *= slow; car.vz *= slow; car.omega *= 1 - Math.min(1, 2 * dt);
        if (Math.hypot(car.vx, car.vz) < 0.4 && Math.abs(car.omega) < 0.2) {
          car.state = 'parked';
          if (!car.wrecked) car.life = car.chunkKey === null ? 14 : Infinity;
        }
        place(car);
      } else if (car.life !== Infinity) {
        car.life -= dt;
        if (car.life <= 0 && car.chunkKey === null) respawn(car, player.x, player.z);
        else if (car.life <= 0) { car.life = Infinity; }
      }
    }
  }

  // Player body is three circles along its length; each car is a short row of circles.
  function collidePlayer(p) {
    const onPlanet = !!currentCity().planet;
    const dirx = Math.sin(p.heading);
    const dirz = onPlanet ? Math.cos(p.heading) : -Math.cos(p.heading);
    const centres = [-1.5, 0, 1.5].map((o) => ({ x: p.x + dirx * o, z: p.z + dirz * o }));
    const delta = (ax, az, bx, bz) => {
      let ddx = ax - bx; let ddz = az - bz;
      if (wraps()) {
        ddx -= SIZE * Math.round(ddx / SIZE);
        ddz -= SIZE * Math.round(ddz / SIZE);
      }
      return { ddx, ddz, dist: Math.hypot(ddx, ddz) };
    };
    let dx = 0; let dz = 0; let speed = p.speed; let shake = 0;
    for (const car of cars) {
      if (car.state === 'idle' || delta(car.x, car.z, p.x, p.z).dist > car.hl + 4.5) continue;
      const cdx = Math.sin(car.heading);
      const cdz = onPlanet ? Math.cos(car.heading) : -Math.cos(car.heading);
      const n = Math.max(2, Math.ceil((car.hl * 2) / 1.8));
      let best = null;
      for (let k = 0; k < n; k++) {
        const off = (k / (n - 1) - 0.5) * (car.hl * 2 - car.hw * 2);
        const cx = car.x + cdx * off; const cz = car.z + cdz * off;
        for (const c of centres) {
          const { ddx, ddz, dist: d } = delta(c.x, c.z, cx, cz);
          const den = d || 1e-3;
          const pen = car.hw * 0.95 + 0.95 - den;
          if (pen > 0 && (!best || pen > best.pen)) best = { pen, nx: ddx / den, nz: ddz / den, cx, cz };
        }
      }
      if (!best) continue;
      // At hypercar speeds, keep separation tiny so parked/traffic cars don't shove the player into a bounce.
      const fast = Math.abs(speed) > 40;
      const sep = fast ? 0.15 : 0.6;
      dx += best.nx * best.pen * sep; dz += best.nz * best.pen * sep;
      if (isFreeDrivable(car.x - best.nx * best.pen * 0.4, car.z - best.nz * best.pen * 0.4)) { car.x -= best.nx * best.pen * 0.4; car.z -= best.nz * best.pen * 0.4; }
      const carSpeed = car.state === 'drive' ? car.speed : 0;
      const cvx = car.state === 'drive' ? cdx * carSpeed : car.vx; const cvz = car.state === 'drive' ? cdz * carSpeed : car.vz;
      const closing = (speed * dirx - cvx) * -best.nx + (speed * dirz - cvz) * -best.nz;
      if (closing > 0.8 && car.cd <= 0) {
        const mp = 1.2;
        const j = (closing * 1.35) / (1 / mp + 1 / car.mass);
        car.vx = cvx - best.nx * (j / car.mass); car.vz = cvz - best.nz * (j / car.mass);
        car.omega = THREE.MathUtils.clamp(car.omega + ((best.cx - car.x) * -best.nz - (best.cz - car.z) * -best.nx) * (j / car.mass) * 0.06, -3, 3);
        car.state = 'knocked';
        car.cd = 0.35;
        car.damage += closing;
        // Never reverse the player at high speed — knock the NPC away instead.
        const along = (best.nx * dirx + best.nz * dirz) * (j / mp);
        if (fast) speed *= 0.92;
        else speed += along;
        shake = Math.max(shake, Math.min(0.5, closing * (fast ? 0.012 : 0.03)));
        effects.burst(best.cx, 0.7, best.cz, SPARK, 8, 6, -best.nx, -best.nz);
        if (closing > WRECK_IMPACT || car.damage > WRECK_DAMAGE || fast) wreckCar(car, -best.nx, -best.nz);
      }
    }
    return { dx, dz, speed, shake };
  }

  function clear() {
    for (const car of cars) release(car);
    cars.length = 0;
    gone.clear();
    for (const models of pool.values()) models.forEach(disposeVehicle);
    pool.clear();
  }

  return { addParked, removeChunk, update, collidePlayer, clear, projectToPlanet, markPlanetSkip };
}
