import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { unpackSceneBinary, gunzipBytes } from '../js/city-map-pack.js';
import { projector } from '../js/osm-city.js';
import { REAL_STARTS } from '../js/city-real-starts.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CELL = 64;
const ROAD_CELL = 48;
const FOOTPRINT_INSET = 1.15;

function pointInPolygon(x, z, p) {
  let inside = false;
  for (let i = 0, j = p.length - 2; i < p.length; j = i, i += 2) {
    const xi = p[i]; const zi = p[i + 1]; const xj = p[j]; const zj = p[j + 1];
    if ((zi > z) !== (zj > z) && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) inside = !inside;
  }
  return inside;
}

function insetPolygon(p, inset) {
  let cx = 0; let cz = 0; const n = p.length / 2;
  for (let i = 0; i < p.length; i += 2) { cx += p[i]; cz += p[i + 1]; }
  cx /= n; cz /= n;
  const out = new Array(p.length);
  for (let i = 0; i < p.length; i += 2) {
    const dx = p[i] - cx; const dz = p[i + 1] - cz;
    const len = Math.hypot(dx, dz) || 1;
    const s = Math.max(0.15, 1 - inset / len);
    out[i] = cx + dx * s;
    out[i + 1] = cz + dz * s;
  }
  return out;
}

function distToSeg(x, z, seg) {
  const dx = seg.x2 - seg.x1; const dz = seg.z2 - seg.z1;
  const len2 = dx * dx + dz * dz;
  if (len2 < 1e-6) return Math.hypot(x - seg.x1, z - seg.z1);
  let t = ((x - seg.x1) * dx + (z - seg.z1) * dz) / len2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(x - (seg.x1 + dx * t), z - (seg.z1 + dz * t));
}

const gz = await readFile(path.join(ROOT, 'data/city-maps/singapore.bin.gz'));
const pack = unpackSceneBinary(await gunzipBytes(gz));
const { roads, footprints, half, center } = pack.extras;

const roadGrid = new Map();
for (const r of roads) {
  for (let i = 0; i + 3 < r.p.length; i += 2) {
    const x1 = r.p[i]; const z1 = r.p[i + 1]; const x2 = r.p[i + 2]; const z2 = r.p[i + 3];
    const pad = r.w * 0.5 + 2;
    const seg = { x1, z1, x2, z2, w: r.w };
    const x0 = Math.min(x1, x2) - pad; const x1b = Math.max(x1, x2) + pad;
    const z0 = Math.min(z1, z2) - pad; const z1b = Math.max(z1, z2) + pad;
    for (let cx = Math.floor(x0 / ROAD_CELL); cx <= Math.floor(x1b / ROAD_CELL); cx++) {
      for (let cz = Math.floor(z0 / ROAD_CELL); cz <= Math.floor(z1b / ROAD_CELL); cz++) {
        const key = `${cx},${cz}`;
        if (!roadGrid.has(key)) roadGrid.set(key, []);
        roadGrid.get(key).push(seg);
      }
    }
  }
}

const grid = new Map();
for (const f of footprints) {
  f.hit = insetPolygon(f.p, FOOTPRINT_INSET);
  let x0 = Infinity; let x1 = -Infinity; let z0 = Infinity; let z1 = -Infinity;
  for (let i = 0; i < f.hit.length; i += 2) {
    x0 = Math.min(x0, f.hit[i]); x1 = Math.max(x1, f.hit[i]); z0 = Math.min(z0, f.hit[i + 1]); z1 = Math.max(z1, f.hit[i + 1]);
  }
  f.box = [x0, x1, z0, z1];
  for (let cx = Math.floor(x0 / CELL); cx <= Math.floor(x1 / CELL); cx++) {
    for (let cz = Math.floor(z0 / CELL); cz <= Math.floor(z1 / CELL); cz++) {
      const key = `${cx},${cz}`;
      if (!grid.has(key)) grid.set(key, []);
      grid.get(key).push(f);
    }
  }
}

function onRoad(x, z, margin = 1.25) {
  const list = roadGrid.get(`${Math.floor(x / ROAD_CELL)},${Math.floor(z / ROAD_CELL)}`);
  if (!list) return false;
  return list.some((seg) => distToSeg(x, z, seg) <= seg.w * 0.5 + margin);
}

function inBuilding(x, z, useHit = true) {
  const list = grid.get(`${Math.floor(x / CELL)},${Math.floor(z / CELL)}`);
  if (!list) return false;
  for (const f of list) {
    const poly = useHit ? f.hit : f.p;
    const b = f.box;
    const pad = useHit ? 0 : FOOTPRINT_INSET + 0.5;
    if (x >= b[0] - pad && x <= b[1] + pad && z >= b[2] - pad && z <= b[3] + pad && pointInPolygon(x, z, poly)) {
      return true;
    }
  }
  return false;
}

function isDrivable(x, z) {
  const r = Math.hypot(x, z);
  if (r > half * 1.02) return false;
  if (onRoad(x, z)) return r <= half * 1.01;
  if (r > half * 0.96) return false;
  return !inBuilding(x, z);
}

function isOpenRoad(x, z, margin = 0.75) {
  return onRoad(x, z, margin) && !inBuilding(x, z, false);
}

function corridorOpen(x, z, heading, reach = 28, step = 4) {
  const sx = Math.sin(heading); const cz = Math.cos(heading);
  for (const dir of [1, -1]) {
    let clear = 0;
    for (let d = step; d <= reach; d += step) {
      const px = x + sx * d * dir; const pz = z - cz * d * dir;
      if (!isOpenRoad(px, pz, 1.5)) break;
      clear += step;
    }
    if (clear >= Math.min(16, reach * 0.5)) return true;
  }
  return false;
}

function nearestRoad(x, z, maxDist = 220, { requireOpen = true } = {}) {
  let best = null; let bestScore = Infinity;
  let fallback = null; let fallbackScore = Infinity;
  for (const r of roads) {
    for (let i = 0; i + 3 < r.p.length; i += 2) {
      const x1 = r.p[i]; const z1 = r.p[i + 1]; const x2 = r.p[i + 2]; const z2 = r.p[i + 3];
      const dx = x2 - x1; const dz = z2 - z1;
      const len2 = dx * dx + dz * dz;
      if (len2 < 40) continue;
      const len = Math.sqrt(len2);
      let t = ((x - x1) * dx + (z - z1) * dz) / len2;
      t = Math.max(0, Math.min(1, t));
      const px = x1 + dx * t; const pz = z1 + dz * t;
      const dist = Math.hypot(x - px, z - pz);
      if (dist > maxDist) continue;
      const heading = Math.atan2(dx, -dz);
      const open = isOpenRoad(px, pz, 0.5);
      const corridor = open && corridorOpen(px, pz, heading);
      const score = dist
        - r.w * 2.4
        - (len > 40 ? 8 : 0)
        + (open ? 0 : 420)
        + (corridor ? 0 : 160)
        + (r.w < 5.5 ? 55 : 0);
      const hit = { x: px, z: pz, heading, w: r.w, dist, open, corridor };
      if (score < bestScore && (!requireOpen || (open && corridor))) {
        bestScore = score;
        best = hit;
      }
      if (score < fallbackScore) {
        fallbackScore = score;
        fallback = hit;
      }
    }
  }
  if (best) return best;
  return requireOpen ? null : fallback;
}

// Sample midpoints of long road segments near the centre — all must be drivable.
let checked = 0;
let blocked = 0;
for (const r of roads) {
  for (let i = 0; i + 3 < r.p.length; i += 2) {
    const x1 = r.p[i]; const z1 = r.p[i + 1]; const x2 = r.p[i + 2]; const z2 = r.p[i + 3];
    if (Math.hypot(x2 - x1, z2 - z1) < 25) continue;
    const mx = (x1 + x2) / 2; const mz = (z1 + z2) / 2;
    if (Math.hypot(mx, mz) > half * 0.9) continue;
    checked++;
    if (!isDrivable(mx, mz)) blocked++;
    if (checked >= 400) break;
  }
  if (checked >= 400) break;
}
assert.ok(checked > 50, 'sampled enough road points');
assert.equal(blocked, 0, `road midpoints must be driveable (blocked ${blocked}/${checked})`);

// Building centroids (inset) should still block when clearly off-road.
let buildingBlocked = 0;
let buildingSamples = 0;
for (const f of footprints.slice(0, 200)) {
  let cx = 0; let cz = 0; const n = f.p.length / 2;
  for (let i = 0; i < f.p.length; i += 2) { cx += f.p[i]; cz += f.p[i + 1]; }
  cx /= n; cz /= n;
  if (onRoad(cx, cz, 0.2)) continue;
  buildingSamples++;
  if (!isDrivable(cx, cz)) buildingBlocked++;
}
assert.ok(buildingSamples > 20);
assert.ok(buildingBlocked / buildingSamples > 0.7, 'most building centres stay blocked');

// Curated POI starts must snap onto open asphalt (not building cut-throughs).
const project = projector(center.lat, center.lon);
const startReport = [];
for (const poi of REAL_STARTS.singapore) {
  const [x, z] = project(poi.lat, poi.lon);
  const road = nearestRoad(x, z, 180, { requireOpen: true })
    || nearestRoad(x, z, 360, { requireOpen: true });
  assert.ok(road, `${poi.id} must resolve to an open road`);
  assert.ok(isOpenRoad(road.x, road.z), `${poi.id} spawn must not sit inside a building`);
  assert.ok(road.corridor, `${poi.id} spawn needs a clear driving corridor`);
  assert.ok(isDrivable(road.x, road.z), `${poi.id} spawn must be drivable`);
  startReport.push(`${poi.id}@${road.w}m`);
}

// Old Esplanade pin used to land inside the theatre multipolygon — keep that regression locked.
const oldEsp = project(1.2895, 103.8558);
const oldSnap = nearestRoad(oldEsp[0], oldEsp[1], 100, { requireOpen: false });
assert.ok(oldSnap, 'legacy esplanade pin still has a nearby road');
const fixedEsp = REAL_STARTS.singapore.find((p) => p.id === 'sg-esplanade');
const [fx, fz] = project(fixedEsp.lat, fixedEsp.lon);
const fixedSnap = nearestRoad(fx, fz, 180, { requireOpen: true });
assert.ok(fixedSnap && fixedSnap.open && fixedSnap.corridor, 'updated Esplanade pin stays on open asphalt');
assert.ok(!inBuilding(fixedSnap.x, fixedSnap.z, false), 'Esplanade spawn is outside building pads');

console.log(`real-driveable tests passed (roads ${checked}, buildings blocked ${buildingBlocked}/${buildingSamples}, starts ${startReport.join(', ')})`);
