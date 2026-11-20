#!/usr/bin/env node
// Converts OpenStreetMap data (Overpass JSON with `out geom`) into a binary glTF (.glb) the City Driving game loads in "Real map" mode.
// Usage:
//   node scripts/osm-to-glb.mjs --city singapore [--radius 1500] [--out assets/cities/singapore.glb]
//   node scripts/osm-to-glb.mjs --city tokyo --input overpass.json      (skip the download)
// Output coordinates are metres around the city centre: +x east, +z south, +y up (matches the game, where north = small z).
// Scene extras carry building footprints and road centre lines, which the game uses for collisions and the minimap.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const EARTH = 6378137;
const ROAD_WIDTH = { motorway: 14, trunk: 12, primary: 11, secondary: 9.5, tertiary: 8, motorway_link: 7, trunk_link: 7, primary_link: 7, secondary_link: 6.5, tertiary_link: 6.5, unclassified: 6.5, residential: 6.5, living_street: 5.5, service: 4, road: 6 };
const GROUND_Y = 0;
const LAYER_Y = { water: 0.03, park: 0.05, road: 0.08 };
const WALL_COLORS = [[0.82, 0.78, 0.7], [0.74, 0.76, 0.8], [0.86, 0.72, 0.62], [0.68, 0.72, 0.68], [0.9, 0.88, 0.82], [0.62, 0.66, 0.72]];

export function projector(lat0, lon0) {
  const cosLat = Math.cos((lat0 * Math.PI) / 180);
  return (lat, lon) => [((lon - lon0) * Math.PI / 180) * EARTH * cosLat, -((lat - lat0) * Math.PI / 180) * EARTH];
}

const signedArea = (r) => {
  let a = 0;
  for (let i = 0; i < r.length; i++) { const [x1, z1] = r[i]; const [x2, z2] = r[(i + 1) % r.length]; a += x1 * z2 - x2 * z1; }
  return a / 2;
};

// Ear clipping for a simple polygon; returns triangle index triples into `ring`.
export function triangulate(ring) {
  const n = ring.length;
  if (n < 3) return [];
  const idx = [...Array(n).keys()];
  if (signedArea(ring) < 0) idx.reverse();
  const cross = (a, b, c) => (ring[b][0] - ring[a][0]) * (ring[c][1] - ring[a][1]) - (ring[b][1] - ring[a][1]) * (ring[c][0] - ring[a][0]);
  const inside = (p, a, b, c) => cross(a, b, p) >= 0 && cross(b, c, p) >= 0 && cross(c, a, p) >= 0;
  const out = [];
  let guard = n * n;
  while (idx.length > 3 && guard-- > 0) {
    let clipped = false;
    for (let k = 0; k < idx.length; k++) {
      const a = idx[(k + idx.length - 1) % idx.length]; const b = idx[k]; const c = idx[(k + 1) % idx.length];
      if (cross(a, b, c) <= 1e-9) continue;
      if (idx.some((p) => p !== a && p !== b && p !== c && inside(p, a, b, c))) continue;
      out.push([a, b, c]);
      idx.splice(k, 1);
      clipped = true;
      break;
    }
    if (!clipped) break;
  }
  if (idx.length === 3) out.push([idx[0], idx[1], idx[2]]);
  else for (let k = 1; k + 1 < idx.length; k++) out.push([idx[0], idx[k], idx[k + 1]]);
  return out;
}

class MeshBuilder {
  constructor(name, color, { vertexColors = false, roughness = 0.9, metallic = 0 } = {}) {
    Object.assign(this, { name, color, vertexColors, roughness, metallic, pos: [], nor: [], col: [], idx: [] });
  }
  // Adds a triangle, flipping its winding so the geometric normal faces `want`.
  tri(a, b, c, want, color) {
    const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]]; const v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    let nx = u[1] * v[2] - u[2] * v[1]; let ny = u[2] * v[0] - u[0] * v[2]; let nz = u[0] * v[1] - u[1] * v[0];
    const len = Math.hypot(nx, ny, nz);
    if (len < 1e-9) return;
    nx /= len; ny /= len; nz /= len;
    const flip = nx * want[0] + ny * want[1] + nz * want[2] < 0;
    const base = this.pos.length / 3;
    const pts = flip ? [a, c, b] : [a, b, c];
    for (const p of pts) {
      this.pos.push(p[0], p[1], p[2]);
      this.nor.push(want[0], want[1], want[2]);
      if (this.vertexColors) this.col.push(...color);
    }
    this.idx.push(base, base + 1, base + 2);
  }
  get empty() { return this.idx.length === 0; }
}

function flatPolygon(mesh, ring, y, color) {
  for (const [a, b, c] of triangulate(ring)) mesh.tri([ring[a][0], y, ring[a][1]], [ring[b][0], y, ring[b][1]], [ring[c][0], y, ring[c][1]], [0, 1, 0], color);
}

function roadRibbon(mesh, pts, width, y) {
  const h = width / 2;
  for (let i = 0; i + 1 < pts.length; i++) {
    const [x1, z1] = pts[i]; const [x2, z2] = pts[i + 1];
    const len = Math.hypot(x2 - x1, z2 - z1);
    if (len < 0.01) continue;
    const nx = (-(z2 - z1) / len) * h; const nz = ((x2 - x1) / len) * h;
    const a = [x1 + nx, y, z1 + nz]; const b = [x1 - nx, y, z1 - nz]; const c = [x2 - nx, y, z2 - nz]; const d = [x2 + nx, y, z2 + nz];
    mesh.tri(a, b, c, [0, 1, 0]); mesh.tri(a, c, d, [0, 1, 0]);
    // Round joint so bends do not leave a notch
    const seg = 6;
    for (let k = 0; k < seg; k++) {
      const t0 = (k / seg) * Math.PI * 2; const t1 = ((k + 1) / seg) * Math.PI * 2;
      mesh.tri([x2, y, z2], [x2 + Math.cos(t0) * h, y, z2 + Math.sin(t0) * h], [x2 + Math.cos(t1) * h, y, z2 + Math.sin(t1) * h], [0, 1, 0]);
    }
  }
}

function extrude(mesh, ring, height, color, roofColor) {
  const area = signedArea(ring);
  for (let i = 0; i < ring.length; i++) {
    const [x1, z1] = ring[i]; const [x2, z2] = ring[(i + 1) % ring.length];
    const dx = x2 - x1; const dz = z2 - z1;
    const len = Math.hypot(dx, dz);
    if (len < 0.01) continue;
    const s = area >= 0 ? 1 : -1;
    const want = [(dz / len) * s, 0, (-dx / len) * s];
    const a = [x1, 0, z1]; const b = [x2, 0, z2]; const c = [x2, height, z2]; const d = [x1, height, z1];
    mesh.tri(a, b, c, want, color); mesh.tri(a, c, d, want, color);
  }
  for (const [a, b, c] of triangulate(ring)) mesh.tri([ring[a][0], height, ring[a][1]], [ring[b][0], height, ring[b][1]], [ring[c][0], height, ring[c][1]], [0, 1, 0], roofColor);
}

const hashId = (id) => Math.abs(Math.imul(Number(id) | 0, 2654435761) >>> 0);
function buildingHeight(tags, id) {
  const h = parseFloat(String(tags.height || '').replace(',', '.'));
  if (h > 0) return Math.min(h, 500);
  const levels = parseFloat(tags['building:levels']);
  if (levels > 0) return Math.min(levels * 3.2 + 1.5, 500);
  return 8 + (hashId(id) % 6) * 2.5;
}

// Overpass geometry -> list of closed rings / open lines in local metres.
function ringsOf(element, project) {
  const toLine = (geometry) => (geometry || []).map((p) => project(p.lat, p.lon));
  if (element.type === 'way') return [toLine(element.geometry)];
  if (element.type === 'relation') return (element.members || []).filter((m) => m.type === 'way' && m.role === 'outer' && m.geometry).map((m) => toLine(m.geometry));
  return [];
}
const isClosed = (line) => line.length > 3 && Math.hypot(line[0][0] - line[line.length - 1][0], line[0][1] - line[line.length - 1][1]) < 0.01;

export function buildScene(osm, { lat, lon, radius, name = 'city' }) {
  const project = projector(lat, lon);
  const ground = new MeshBuilder('ground', [0.62, 0.66, 0.56], { roughness: 1 });
  const water = new MeshBuilder('water', [0.3, 0.58, 0.72], { roughness: 0.2, metallic: 0.2 });
  const parks = new MeshBuilder('parks', [0.46, 0.64, 0.4], { roughness: 1 });
  const roads = new MeshBuilder('roads', [0.24, 0.25, 0.27], { roughness: 0.85 });
  const buildings = new MeshBuilder('buildings', [1, 1, 1], { vertexColors: true, roughness: 0.75 });
  const footprints = []; const roadLines = [];
  const half = radius * 1.15;
  const near = (ring) => ring.some(([x, z]) => Math.abs(x) <= half && Math.abs(z) <= half);
  const g = half + 40;
  const gq = [[-g, -g], [g, -g], [g, g], [-g, g]];
  flatPolygon(ground, gq, GROUND_Y, null);

  for (const el of osm.elements || []) {
    const tags = el.tags || {};
    const lines = ringsOf(el, project).filter(near);
    if (!lines.length) continue;
    if (tags.building) {
      for (const ring of lines) {
        if (!isClosed(ring)) continue;
        const pts = ring.slice(0, -1);
        const height = buildingHeight(tags, el.id);
        const wall = WALL_COLORS[hashId(el.id) % WALL_COLORS.length];
        extrude(buildings, pts, height, wall, wall.map((v) => v * 0.78));
        footprints.push({ h: Math.round(height), p: pts.flatMap(([x, z]) => [Math.round(x * 10) / 10, Math.round(z * 10) / 10]) });
      }
    } else if (tags.natural === 'water' || tags.waterway === 'riverbank') {
      for (const ring of lines) if (isClosed(ring)) flatPolygon(water, ring.slice(0, -1), LAYER_Y.water, null);
    } else if (/^(park|garden|pitch|recreation_ground|nature_reserve)$/.test(tags.leisure || '') || /^(grass|forest|meadow|village_green)$/.test(tags.landuse || '') || tags.natural === 'wood') {
      for (const ring of lines) if (isClosed(ring)) flatPolygon(parks, ring.slice(0, -1), LAYER_Y.park, null);
    } else if (tags.highway && ROAD_WIDTH[tags.highway] && el.type === 'way') {
      const width = ROAD_WIDTH[tags.highway];
      roadRibbon(roads, lines[0], width, LAYER_Y.road);
      roadLines.push({ w: width, p: lines[0].flatMap(([x, z]) => [Math.round(x), Math.round(z)]) });
    }
  }
  const meshes = [ground, water, parks, roads, buildings].filter((m) => !m.empty);
  return { meshes, extras: { city: name, center: { lat, lon }, radius, half, footprints, roads: roadLines } };
}

// Minimal glTF 2.0 binary writer: one node + mesh per layer, shared binary buffer.
export function writeGlb({ meshes, extras }) {
  const chunks = []; const bufferViews = []; const accessors = []; let offset = 0;
  const addView = (typed, target) => {
    const bytes = Buffer.from(typed.buffer, typed.byteOffset, typed.byteLength);
    const pad = (4 - (bytes.length % 4)) % 4;
    chunks.push(bytes, Buffer.alloc(pad));
    bufferViews.push({ buffer: 0, byteOffset: offset, byteLength: bytes.length, target });
    offset += bytes.length + pad;
    return bufferViews.length - 1;
  };
  const addAccessor = (typed, componentType, type, count, target, bounds) => {
    accessors.push({ bufferView: addView(typed, target), componentType, count, type, ...(bounds || {}) });
    return accessors.length - 1;
  };
  const materials = []; const gltfMeshes = []; const nodes = [];
  for (const m of meshes) {
    const pos = new Float32Array(m.pos);
    const min = [Infinity, Infinity, Infinity]; const max = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < pos.length; i += 3) for (let k = 0; k < 3; k++) { min[k] = Math.min(min[k], pos[i + k]); max[k] = Math.max(max[k], pos[i + k]); }
    const attributes = {
      POSITION: addAccessor(pos, 5126, 'VEC3', pos.length / 3, 34962, { min, max }),
      NORMAL: addAccessor(new Float32Array(m.nor), 5126, 'VEC3', m.nor.length / 3, 34962)
    };
    if (m.vertexColors) attributes.COLOR_0 = addAccessor(new Float32Array(m.col), 5126, 'VEC3', m.col.length / 3, 34962);
    const indices = addAccessor(new Uint32Array(m.idx), 5125, 'SCALAR', m.idx.length, 34963);
    materials.push({ name: m.name, doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [...m.color, 1], metallicFactor: m.metallic, roughnessFactor: m.roughness } });
    gltfMeshes.push({ name: m.name, primitives: [{ attributes, indices, material: materials.length - 1, mode: 4 }] });
    nodes.push({ name: m.name, mesh: gltfMeshes.length - 1 });
  }
  const json = {
    asset: { version: '2.0', generator: 'quiz-studio osm-to-glb', copyright: 'Map data © OpenStreetMap contributors (ODbL)' },
    scene: 0,
    scenes: [{ name: 'city', nodes: nodes.map((_, i) => i), extras }],
    nodes, meshes: gltfMeshes, materials, accessors, bufferViews, buffers: [{ byteLength: offset }]
  };
  let jsonBytes = Buffer.from(JSON.stringify(json));
  jsonBytes = Buffer.concat([jsonBytes, Buffer.alloc((4 - (jsonBytes.length % 4)) % 4, 0x20)]);
  const bin = Buffer.concat(chunks);
  const header = Buffer.alloc(12);
  header.write('glTF', 0, 'ascii'); header.writeUInt32LE(2, 4); header.writeUInt32LE(12 + 8 + jsonBytes.length + 8 + bin.length, 8);
  const jh = Buffer.alloc(8); jh.writeUInt32LE(jsonBytes.length, 0); jh.write('JSON', 4, 'ascii');
  const bh = Buffer.alloc(8); bh.writeUInt32LE(bin.length, 0); bh.write('BIN\0', 4, 'ascii');
  return Buffer.concat([header, jh, jsonBytes, bh, bin]);
}

export function overpassQuery(lat, lon, radius) {
  const dLat = (radius / EARTH) * 180 / Math.PI; const dLon = dLat / Math.cos((lat * Math.PI) / 180);
  const b = `${lat - dLat},${lon - dLon},${lat + dLat},${lon + dLon}`;
  const sets = ['way["building"]', 'relation["building"]', 'way["highway"]', 'way["natural"="water"]', 'relation["natural"="water"]', 'way["waterway"="riverbank"]', 'way["leisure"~"^(park|garden|pitch|recreation_ground|nature_reserve)$"]', 'way["landuse"~"^(grass|forest|meadow|village_green)$"]', 'way["natural"="wood"]'];
  return `[out:json][timeout:180];(${sets.map((s) => `${s}(${b});`).join('')});out geom;`;
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) if (argv[i].startsWith('--')) args[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
  return args;
}

async function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const args = parseArgs(process.argv.slice(2));
  const { CITY_BY_ID } = await import(path.join(root, 'js/city-cities.js'));
  const city = CITY_BY_ID[args.city];
  if (!city) throw new Error(`Pass --city <${Object.keys(CITY_BY_ID).join('|')}>`);
  const radius = Number(args.radius) || 1500;
  const out = path.resolve(args.out || path.join(root, 'assets/cities', `${city.id}.glb`));
  let osm;
  if (args.input) {
    osm = JSON.parse(await readFile(args.input, 'utf8'));
  } else {
    const endpoint = args.overpass || 'https://overpass-api.de/api/interpreter';
    console.log(`Downloading ${city.name} (${radius} m radius) from ${endpoint} ...`);
    const res = await fetch(endpoint, { method: 'POST', body: new URLSearchParams({ data: overpassQuery(city.lat, city.lon, radius) }), headers: { 'User-Agent': 'quiz-studio-osm-to-glb/1.0' } });
    if (!res.ok) throw new Error(`Overpass responded ${res.status}`);
    osm = await res.json();
  }
  const scene = buildScene(osm, { lat: city.lat, lon: city.lon, radius, name: city.id });
  const glb = writeGlb(scene);
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, glb);
  console.log(`Wrote ${out}: ${scene.extras.footprints.length} buildings, ${scene.extras.roads.length} roads, ${(glb.length / 1048576).toFixed(2)} MB`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(error.message); process.exit(1); });
}
