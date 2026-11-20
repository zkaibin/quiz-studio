import assert from 'node:assert/strict';
import { buildScene, triangulate } from '../js/osm-city.js';

const lat = 1.283; const lon = 103.86;
const sq = (dLat, dLon, s = 0.0002) => [[dLat, dLon], [dLat, dLon + s], [dLat + s, dLon + s], [dLat + s, dLon]].map(([a, b]) => ({ lat: lat + a, lon: lon + b }));
const closed = (g) => [...g, g[0]];
// Concave L-shaped building, a water body, a park and a road
const L = [[0, 0], [0, 0.0004], [0.0002, 0.0004], [0.0002, 0.0002], [0.0004, 0.0002], [0.0004, 0]].map(([a, b]) => ({ lat: lat + a, lon: lon + b }));
const osm = {
  elements: [
    { type: 'way', id: 1, tags: { building: 'yes', 'building:levels': '10' }, geometry: closed(L) },
    { type: 'way', id: 2, tags: { natural: 'water' }, geometry: closed(sq(0.001, 0)) },
    { type: 'way', id: 3, tags: { leisure: 'park' }, geometry: closed(sq(-0.001, 0)) },
    { type: 'way', id: 4, tags: { highway: 'residential' }, geometry: [{ lat, lon: lon - 0.001 }, { lat, lon: lon + 0.001 }] },
    { type: 'way', id: 5, tags: { highway: 'footway' }, geometry: [{ lat, lon }, { lat: lat + 0.001, lon }] }
  ]
};

// Ear clipping keeps a concave polygon's area
const lShape = [[0, 0], [0, 4], [2, 4], [2, 2], [4, 2], [4, 0]];
const area = triangulate(lShape).reduce((s, [a, b, c]) => s + Math.abs((lShape[b][0] - lShape[a][0]) * (lShape[c][1] - lShape[a][1]) - (lShape[b][1] - lShape[a][1]) * (lShape[c][0] - lShape[a][0])) / 2, 0);
assert.equal(area, 12);

const scene = buildScene(osm, { lat, lon, radius: 500, name: 'test' });
assert.deepEqual(scene.meshes.map((m) => m.name), ['ground', 'water', 'parks', 'roads', 'buildings']);
assert.equal(scene.extras.footprints.length, 1);
assert.equal(scene.extras.roads.length, 1);
assert.equal(scene.extras.footprints[0].h, 34);

// Wall and roof normals must face outwards / up
const b = scene.meshes.find((m) => m.name === 'buildings');
for (let i = 0; i < b.idx.length; i += 3) {
  const p = [0, 1, 2].map((k) => b.pos.slice(b.idx[i + k] * 3, b.idx[i + k] * 3 + 3));
  const u = p[1].map((v, k) => v - p[0][k]); const w = p[2].map((v, k) => v - p[0][k]);
  const n = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]];
  const want = b.nor.slice(b.idx[i] * 3, b.idx[i] * 3 + 3);
  assert.ok(n[0] * want[0] + n[1] * want[1] + n[2] * want[2] > 0, 'triangle winding matches its normal');
}

console.log('osm-city tests passed');
