import { CITY_BY_ID, DEFAULT_CITY_ID } from './city-cities.js';
// The fixed city map for free roam; `setCity` swaps which city the pure functions below describe. Everything here is a pure function of grid coordinates, so every player sees the same city.
export const PITCH = 140;
export let GRID = 20;
export let SIZE = PITCH * GRID;
export const ROAD_HALF = 11;
export const FACE = 15.5;
// Furthest a car centre may stray from a road centre line (road + kerb); anything beyond is building or park.
export const DRIVE_LIMIT = 11.4;

export function hash(i, j, salt = 0) {
  let h = Math.imul(i + 1013, 73856093) ^ Math.imul(j + 7919, 19349663) ^ Math.imul(salt + 1, 83492791);
  h = Math.imul(h ^ (h >>> 15), 2246822519);
  h = Math.imul(h ^ (h >>> 13), 3266489917);
  return (h ^ (h >>> 16)) >>> 0;
}
export const seedOf = (i, j, salt = 0) => (hash(i, j, salt) % 2147483646) + 1;

let city = CITY_BY_ID[DEFAULT_CITY_ID];
let landmarkAt = new Map();
export const currentCity = () => city;
export function setCity(next) {
  city = typeof next === 'string' ? CITY_BY_ID[next] : next;
  GRID = city.grid;
  SIZE = PITCH * GRID;
  landmarkAt = new Map(city.landmarks.map((l) => [`${l.i},${l.j}`, l]));
}
setCity(city);

const clampCell = (v) => Math.max(0, Math.min(GRID - 1, v));

export function cellInfo(i, j) {
  const ci = clampCell(i); const cj = clampCell(j);
  let region = city.regions[0]; let best = Infinity;
  for (const r of city.regions) {
    const d = (r.i - ci) ** 2 + (r.j - cj) ** 2;
    if (d < best) { best = d; region = r; }
  }
  const landmark = landmarkAt.get(`${ci},${cj}`) || null;
  let kind = region.kind;
  if (landmark) kind = 'landmark';
  else if (kind !== 'park' && hash(ci, cj, 3) % 100 < 9) kind = 'park';
  return { i: ci, j: cj, district: region.name, kind, landmark };
}

export function infoAt(x, z) {
  const i = Math.floor(x / PITCH); const j = Math.floor(z / PITCH);
  const cell = cellInfo(i, j);
  const lineX = Math.max(0, Math.min(GRID, Math.round(x / PITCH)));
  const lineZ = Math.max(0, Math.min(GRID, Math.round(z / PITCH)));
  const offX = Math.abs(x - lineX * PITCH);
  const offZ = Math.abs(z - lineZ * PITCH);
  const street = offX <= offZ ? city.avenues(lineX) : city.streets(lineZ);
  return { district: cell.district, street, landmark: cell.landmark };
}

export function isDrivable(x, z) {
  if (x < -DRIVE_LIMIT || z < -DRIVE_LIMIT || x > SIZE + DRIVE_LIMIT || z > SIZE + DRIVE_LIMIT) return false;
  const offX = Math.abs(x - Math.round(x / PITCH) * PITCH);
  const offZ = Math.abs(z - Math.round(z / PITCH) * PITCH);
  return offX <= DRIVE_LIMIT || offZ <= DRIVE_LIMIT;
}

// Free roam: roads, the pavement strip in front of buildings and the open park blocks are drivable; building interiors are not.
export function isFreeDrivable(x, z) {
  const sea = 13;
  if (x < -sea || z < -sea || x > SIZE + sea || z > SIZE + sea) return false;
  if (isDrivable(x, z) || x < 0 || z < 0 || x > SIZE || z > SIZE) return true;
  const i = Math.min(GRID - 1, Math.floor(x / PITCH));
  const j = Math.min(GRID - 1, Math.floor(z / PITCH));
  if (cellInfo(i, j).kind === 'park') return true;
  const lx = x - i * PITCH; const lz = z - j * PITCH;
  return Math.min(lx, PITCH - lx, lz, PITCH - lz) < FACE - 0.6;
}

// Distance from the nearest road centre line on the axis the car is driving along; used for kerb scraping.
export function kerbOffset(x, z) {
  const offX = Math.abs(x - Math.round(x / PITCH) * PITCH);
  const offZ = Math.abs(z - Math.round(z / PITCH) * PITCH);
  return Math.min(offX, offZ);
}

// Start in the driving-side lane heading north.
export function spawnFor(routeId) {
  const spawns = city.spawns;
  const [i, j] = spawns[routeId] || Object.values(spawns)[0];
  const lane = city.drive === 'left' ? -4.9 : 4.9;
  return { x: i * PITCH + lane, z: j * PITCH + 40, heading: 0 };
}

export const DISTRICT_COLORS = {
  downtown: '#8fa6b8', civic: '#c9bfa3', shophouse: '#e2b9a0', mixed: '#b9b7a8', residential: '#cfd6b4', park: '#8dbb8a', landmark: '#d8a64f'
};
