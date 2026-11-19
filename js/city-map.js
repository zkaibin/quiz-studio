// The fixed Singapore map for free roam. Everything here is a pure function of grid coordinates, so every player sees the same city.
export const PITCH = 120;
export const GRID = 20;
export const SIZE = PITCH * GRID;
export const ROAD_HALF = 8;
export const FACE = 11.5;
// Furthest a car centre may stray from a road centre line (road + kerb); anything beyond is building or park.
export const DRIVE_LIMIT = 8.2;

// North (small z) is the bay. Each region claims the nearest blocks and decides what they are built like.
const REGIONS = [
  { name: 'Marina Bay', i: 11, j: 2, kind: 'downtown' },
  { name: 'Raffles Place', i: 9, j: 5, kind: 'downtown' },
  { name: 'Civic District', i: 7, j: 3, kind: 'civic' },
  { name: 'Chinatown', i: 6, j: 7, kind: 'shophouse' },
  { name: 'Little India', i: 11, j: 8, kind: 'shophouse' },
  { name: 'Orchard Road', i: 3, j: 5, kind: 'mixed' },
  { name: 'Gardens by the Bay', i: 14, j: 3, kind: 'park' },
  { name: 'Tiong Bahru', i: 4, j: 12, kind: 'residential' },
  { name: 'Queenstown', i: 1, j: 10, kind: 'residential' },
  { name: 'East Coast', i: 16, j: 8, kind: 'residential' },
  { name: 'Changi', i: 18, j: 12, kind: 'mixed' },
  { name: 'Harbourfront', i: 5, j: 16, kind: 'mixed' },
  { name: 'Sentosa', i: 10, j: 18, kind: 'park' },
  { name: 'Kallang', i: 13, j: 12, kind: 'residential' }
];

// `face` is the road the landmark's front looks onto: W, E, N or S.
const LANDMARKS = [
  { id: 'mbs', i: 12, j: 1, face: 'N' }, { id: 'merlion', i: 9, j: 0, face: 'N' }, { id: 'esplanade', i: 10, j: 1, face: 'N' },
  { id: 'artscience', i: 13, j: 1, face: 'N' }, { id: 'flyer', i: 15, j: 1, face: 'N' },
  { id: 'supertrees', i: 13, j: 3, face: 'W' }, { id: 'flowerdome', i: 14, j: 3, face: 'S' }, { id: 'cloudforest', i: 15, j: 3, face: 'W' },
  { id: 'raffles', i: 8, j: 3, face: 'S' }, { id: 'standrews', i: 7, j: 2, face: 'W' }, { id: 'supremecourt', i: 7, j: 3, face: 'E' },
  { id: 'fullerton', i: 9, j: 2, face: 'W' }, { id: 'financial', i: 9, j: 5, face: 'N' }, { id: 'pinnacle', i: 10, j: 6, face: 'N' },
  { id: 'buddhatooth', i: 6, j: 7, face: 'S' }, { id: 'shophouses', i: 6, j: 8, face: 'N' }, { id: 'mariamman', i: 5, j: 8, face: 'E' },
  { id: 'sultan', i: 11, j: 9, face: 'N' }, { id: 'ion', i: 3, j: 5, face: 'E' }, { id: 'tangs', i: 4, j: 5, face: 'W' },
  { id: 'jewel', i: 18, j: 11, face: 'W' }, { id: 'changitower', i: 18, j: 12, face: 'W' },
  { id: 'sentosamerlion', i: 10, j: 18, face: 'N' }, { id: 'globe', i: 9, j: 18, face: 'W' }, { id: 'cablecar', i: 7, j: 17, face: 'W' },
  { id: 'ship', i: 10, j: 19, face: 'S' }
];
const LANDMARK_AT = new Map(LANDMARKS.map((l) => [`${l.i},${l.j}`, l]));

const AVENUES = ['Marina Way', 'Shenton Way', 'Cantonment Rd', 'Neil Rd', 'Tanjong Pagar Rd', 'Havelock Rd', 'River Valley Rd',
  'Bukit Pasoh Rd', 'Outram Rd', 'Cecil St', 'Robinson Rd', 'Orchard Rd', 'Bras Basah Rd', 'Victoria St', 'Arab St',
  'Jalan Besar', 'Serangoon Rd', 'Geylang Rd', 'Changi Rd', 'Tampines Ave', 'East Coast Rd'];
const STREETS = ['Marina Boulevard', 'Raffles Quay', 'Esplanade Dr', 'North Bridge Rd', 'Beach Rd', 'Nicoll Hwy', 'Rochor Rd',
  'Bencoolen St', 'Selegie Rd', 'Orchard Link', 'Scotts Rd', 'Newton Circus', 'Thomson Rd', 'Balestier Rd', 'Kim Seng Rd',
  'Alexandra Rd', 'Kampong Bahru Rd', 'Telok Blangah Rd', 'Harbour Dr', 'Sentosa Gateway', 'Keppel Rd'];

export function hash(i, j, salt = 0) {
  let h = Math.imul(i + 1013, 73856093) ^ Math.imul(j + 7919, 19349663) ^ Math.imul(salt + 1, 83492791);
  h = Math.imul(h ^ (h >>> 15), 2246822519);
  h = Math.imul(h ^ (h >>> 13), 3266489917);
  return (h ^ (h >>> 16)) >>> 0;
}
export const seedOf = (i, j, salt = 0) => (hash(i, j, salt) % 2147483646) + 1;

const clampCell = (v) => Math.max(0, Math.min(GRID - 1, v));

export function cellInfo(i, j) {
  const ci = clampCell(i); const cj = clampCell(j);
  let region = REGIONS[0]; let best = Infinity;
  for (const r of REGIONS) {
    const d = (r.i - ci) ** 2 + (r.j - cj) ** 2;
    if (d < best) { best = d; region = r; }
  }
  const landmark = LANDMARK_AT.get(`${ci},${cj}`) || null;
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
  const street = offX <= offZ ? AVENUES[lineX] : STREETS[lineZ];
  return { district: cell.district, street, landmark: cell.landmark };
}

export function isDrivable(x, z) {
  if (x < -DRIVE_LIMIT || z < -DRIVE_LIMIT || x > SIZE + DRIVE_LIMIT || z > SIZE + DRIVE_LIMIT) return false;
  const offX = Math.abs(x - Math.round(x / PITCH) * PITCH);
  const offZ = Math.abs(z - Math.round(z / PITCH) * PITCH);
  return offX <= DRIVE_LIMIT || offZ <= DRIVE_LIMIT;
}

// Distance from the nearest road centre line on the axis the car is driving along; used for kerb scraping.
export function kerbOffset(x, z) {
  const offX = Math.abs(x - Math.round(x / PITCH) * PITCH);
  const offZ = Math.abs(z - Math.round(z / PITCH) * PITCH);
  return Math.min(offX, offZ);
}

const SPAWN_CELLS = {
  downtown: [9, 5], marina: [11, 2], gardens: [14, 3], heritage: [6, 7], civic: [7, 3], changi: [18, 11], sentosa: [8, 17]
};
// Left-hand traffic: start in the left lane heading north.
export function spawnFor(routeId) {
  const [i, j] = SPAWN_CELLS[routeId] || SPAWN_CELLS.downtown;
  return { x: i * PITCH - 3.55, z: j * PITCH + 34, heading: 0 };
}

export const DISTRICT_COLORS = {
  downtown: '#8fa6b8', civic: '#c9bfa3', shophouse: '#e2b9a0', mixed: '#b9b7a8', residential: '#cfd6b4', park: '#8dbb8a', landmark: '#d8a64f'
};
