import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildScene } from '../js/osm-city.js';
import { packSceneBinary, unpackSceneBinary, gunzipBytes } from '../js/city-map-pack.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const lat = 1.283; const lon = 103.86;
const closed = (g) => [...g, g[0]];
const L = [[0, 0], [0, 0.0004], [0.0002, 0.0004], [0.0002, 0.0002], [0.0004, 0.0002], [0.0004, 0]].map(([a, b]) => ({ lat: lat + a, lon: lon + b }));
const osm = {
  elements: [
    { type: 'way', id: 1, tags: { building: 'yes', 'building:levels': '10' }, geometry: closed(L) },
    { type: 'way', id: 4, tags: { highway: 'residential' }, geometry: [{ lat, lon: lon - 0.001 }, { lat, lon: lon + 0.001 }] }
  ]
};

const city = { id: 'test', name: 'Test', lat, lon };
const built = buildScene(osm, { lat, lon, radius: 500, name: 'test' });
const packed = packSceneBinary(built, city, 500);
const unpacked = unpackSceneBinary(packed);

assert.equal(unpacked.city, 'test');
assert.equal(unpacked.half, built.extras.half);
assert.equal(unpacked.meshes.length, built.meshes.length);
assert.equal(unpacked.extras.footprints.length, 1);
assert.equal(unpacked.extras.roads.length, 1);

const src = built.meshes.find((m) => m.name === 'buildings');
const dst = unpacked.meshes.find((m) => m.name === 'buildings');
assert.ok(dst);
assert.equal(dst.pos.length, src.pos.length);
assert.equal(dst.idx.length, src.idx.length);
assert.ok(Math.abs(dst.pos[0] - src.pos[0]) < 1e-5);
assert.equal(dst.idx[0], src.idx[0]);

// Singapore pack must exist and unpack
const sgGz = await readFile(path.join(ROOT, 'data/city-maps/singapore.bin.gz'));
const sg = unpackSceneBinary(await gunzipBytes(sgGz));
assert.equal(sg.city, 'singapore');
assert.ok(sg.extras.footprints.length > 100);
assert.ok(sg.extras.roads.length > 100);
assert.ok(sg.meshes.some((m) => m.name === 'roads'));
assert.ok(sg.meshes.some((m) => m.name === 'buildings'));

const manifest = JSON.parse(await readFile(path.join(ROOT, 'data/city-maps/manifest.json'), 'utf8'));
assert.equal(manifest.format, 'city-driving-osm-bin-v1');
assert.ok(manifest.cities.some((c) => c.id === 'singapore'));

console.log('city-map-pack tests passed');
