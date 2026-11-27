import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { unpackSceneBinary, gunzipBytes } from '../js/city-map-pack.js';

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
const { roads, footprints, half } = pack.extras;

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

function isDrivable(x, z) {
  const r = Math.hypot(x, z);
  if (r > half * 1.02) return false;
  if (onRoad(x, z)) return r <= half * 1.01;
  if (r > half * 0.96) return false;
  const list = grid.get(`${Math.floor(x / CELL)},${Math.floor(z / CELL)}`);
  if (!list) return true;
  for (const f of list) {
    const b = f.box;
    if (x >= b[0] && x <= b[1] && z >= b[2] && z <= b[3] && pointInPolygon(x, z, f.hit)) return false;
  }
  return true;
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

console.log(`real-driveable tests passed (roads ${checked}, buildings blocked ${buildingBlocked}/${buildingSamples})`);
