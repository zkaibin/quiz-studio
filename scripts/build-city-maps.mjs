#!/usr/bin/env node
/**
 * Pre-download OpenStreetMap data via Overpass and convert it with osm-city.js
 * into packed binary scene files checked into data/city-maps/.
 *
 * Usage:
 *   node scripts/build-city-maps.mjs                 # all earth cities
 *   node scripts/build-city-maps.mjs singapore tokyo  # selected cities
 *   node scripts/build-city-maps.mjs --dry-run
 *   node scripts/build-city-maps.mjs --keep-raw       # keep Overpass JSON under scripts/tmp/
 */
import { createWriteStream } from 'node:fs';
import { mkdir, writeFile, readFile, rename, unlink, stat } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';
import { Readable } from 'node:stream';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildScene, overpassQuery } from '../js/osm-city.js';
import { packSceneBinary } from '../js/city-map-pack.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'data', 'city-maps');
const RAW_DIR = path.join(ROOT, 'scripts', 'tmp', 'osm-raw');
const RADIUS = 1500;
const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter'
];

// Keep in sync with EARTH_CITIES in js/city-cities.js (planet cities have no OSM).
const CITIES = [
  { id: 'singapore', name: 'Singapore', lat: 1.283, lon: 103.86 },
  { id: 'newyork', name: 'New York', lat: 40.758, lon: -73.9855 },
  { id: 'shanghai', name: 'Shanghai', lat: 31.2397, lon: 121.4998 },
  { id: 'tokyo', name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { id: 'london', name: 'London', lat: 51.5007, lon: -0.1246 },
  { id: 'dubai', name: 'Dubai', lat: 25.1972, lon: 55.2744 }
];

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const keepRaw = args.includes('--keep-raw');
const selected = args.filter((a) => !a.startsWith('--'));
const targets = selected.length
  ? CITIES.filter((c) => selected.includes(c.id))
  : CITIES;

if (!targets.length) {
  console.error('No matching cities. Known ids:', CITIES.map((c) => c.id).join(', '));
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function downloadOverpass(city) {
  const query = overpassQuery(city.lat, city.lon, RADIUS);
  let lastError = new Error('Overpass unavailable');
  for (let attempt = 0; attempt < 4; attempt++) {
    for (const endpoint of ENDPOINTS) {
      try {
        console.log(`  GET ${endpoint} (attempt ${attempt + 1})`);
        const res = await fetch(endpoint, {
          method: 'POST',
          body: new URLSearchParams({ data: query }),
          headers: { 'User-Agent': 'quiz-studio-city-maps-build/1.0' }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        JSON.parse(text); // validate
        return text;
      } catch (error) {
        lastError = error;
        console.warn(`  failed: ${error.message}`);
      }
    }
    const wait = 8000 * (attempt + 1);
    console.log(`  retrying in ${wait / 1000}s…`);
    await sleep(wait);
  }
  throw lastError;
}

async function writeGzip(filePath, bytes) {
  const tmp = `${filePath}.tmp`;
  await pipeline(Readable.from([bytes]), createGzip({ level: 9 }), createWriteStream(tmp));
  await rename(tmp, filePath);
}

async function buildOne(city) {
  console.log(`\n=== ${city.name} (${city.id}) ===`);
  const rawPath = path.join(RAW_DIR, `${city.id}-${RADIUS}.json`);
  const outPath = path.join(OUT_DIR, `${city.id}.bin.gz`);

  let text;
  try {
    text = await readFile(rawPath, 'utf8');
    console.log(`  using cached raw ${rawPath} (${(Buffer.byteLength(text) / 1e6).toFixed(2)} MB)`);
  } catch {
    if (dryRun) {
      console.log('  dry-run: would download Overpass data');
      return null;
    }
    console.log('  downloading Overpass…');
    text = await downloadOverpass(city);
    await mkdir(RAW_DIR, { recursive: true });
    await writeFile(rawPath, text);
    console.log(`  raw saved ${(Buffer.byteLength(text) / 1e6).toFixed(2)} MB`);
  }

  console.log('  converting…');
  const t0 = Date.now();
  const osm = JSON.parse(text);
  const built = buildScene(osm, { lat: city.lat, lon: city.lon, radius: RADIUS, name: city.id });
  const ms = Date.now() - t0;
  if (!built.extras.footprints.length && !built.extras.roads.length) {
    throw new Error('No map data returned');
  }
  const packed = packSceneBinary(built, city, RADIUS);
  await writeGzip(outPath, packed);
  const { size: gzSize } = await stat(outPath);
  console.log(`  meshes: ${built.meshes.map((m) => m.name).join(', ')}`);
  console.log(`  footprints=${built.extras.footprints.length} roads=${built.extras.roads.length}`);
  console.log(`  convert ${ms} ms → ${(packed.byteLength / 1e6).toFixed(2)} MB bin / ${(gzSize / 1e6).toFixed(2)} MB gz`);

  if (!keepRaw) {
    try { await unlink(rawPath); } catch { /* ignore */ }
  }
  return {
    id: city.id,
    name: city.name,
    footprints: built.extras.footprints.length,
    roads: built.extras.roads.length,
    gzSize,
    binBytes: packed.byteLength,
    ms
  };
}

await mkdir(OUT_DIR, { recursive: true });

// Remove legacy JSON packs if present from earlier experiments.
for (const city of CITIES) {
  for (const legacy of [`${city.id}.json.gz`, `${city.id}.json`]) {
    try { await unlink(path.join(OUT_DIR, legacy)); } catch { /* ignore */ }
  }
}

const results = [];
for (const city of targets) {
  results.push(await buildOne(city));
}

const existing = [];
for (const city of CITIES) {
  const file = `${city.id}.bin.gz`;
  try {
    const s = await stat(path.join(OUT_DIR, file));
    const hit = results.find((r) => r && r.id === city.id);
    existing.push({
      id: city.id,
      name: city.name,
      file,
      footprints: hit?.footprints ?? null,
      roads: hit?.roads ?? null,
      bytes: s.size
    });
  } catch { /* not built yet */ }
}

const manifest = {
  version: 1,
  format: 'city-driving-osm-bin-v1',
  radius: RADIUS,
  generatedAt: new Date().toISOString(),
  attribution: '© OpenStreetMap contributors (ODbL)',
  cities: existing
};
if (!dryRun && existing.length) {
  await writeFile(path.join(OUT_DIR, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log('\nWrote data/city-maps/manifest.json');
}
console.log('\nDone.');
