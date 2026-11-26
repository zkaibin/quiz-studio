// Organic Earth-city roads and gentle hills. Planet / wrap cities stay on a regular grid.
// Kept free of imports from city-map.js to avoid a circular dependency.
// Most roads stay straight (~70%); only selected lines take a gentle bend for variety.

export const TERRAIN_PITCH = 140;
// Wider carriageway so bent stretches stay easy to follow (4 clear lanes).
export const TERRAIN_ROAD_HALF = 14;
export const TERRAIN_DRIVE_LIMIT = 14.5;

const BEND_AMP = 10;
const HILL_PEAK = 5;
// Roughly 30% of avenues/streets bend; the rest stay arrow-straight.
const BEND_CHANCE = 3; // out of 10

function hash(i, j, salt = 0) {
  let h = Math.imul(i + 1013, 73856093) ^ Math.imul(j + 7919, 19349663) ^ Math.imul(salt + 1, 83492791);
  h = Math.imul(h ^ (h >>> 15), 2246822519);
  h = Math.imul(h ^ (h >>> 13), 3266489917);
  return (h ^ (h >>> 16)) >>> 0;
}

export function usesOrganicLayout(city) {
  return !!(city && !city.planet && !city.wrap);
}

function fadeEdge(line, grid) {
  if (grid <= 2) return 0;
  const t = Math.min(line, grid - line) / Math.min(4, grid * 0.2);
  return Math.max(0, Math.min(1, t));
}

function wave(seed, t) {
  // Slow, gentle S-curve — one soft bend per few blocks, not a wriggle.
  return Math.sin(t * 0.008 + seed) * 0.7 + Math.sin(t * 0.018 + seed * 1.4) * 0.3;
}

function citySalt(city) {
  if (!city?.id) return 1;
  let s = 0;
  for (let i = 0; i < city.id.length; i++) s = (s + city.id.charCodeAt(i) * (i + 1)) | 0;
  return (s % 97) + 1;
}

/** Only some lines bend so most of the city stays straight for beginners. */
export function lineBends(kind, line, city) {
  if (!usesOrganicLayout(city)) return false;
  const salt = kind === 'avenue' ? 11 : 29;
  return (hash(line, salt, citySalt(city)) % 10) < BEND_CHANCE;
}

// Lateral offset of N–S avenue `line` at world z.
export function avenueOffset(line, z, city) {
  if (!usesOrganicLayout(city) || !lineBends('avenue', line, city)) return 0;
  const seed = (hash(line, 17, citySalt(city)) % 1000) / 159.0;
  return BEND_AMP * wave(seed, z) * fadeEdge(line, city.grid);
}

// Lateral offset of E–W street `line` at world x.
export function streetOffset(line, x, city) {
  if (!usesOrganicLayout(city) || !lineBends('street', line, city)) return 0;
  const seed = (hash(41, line, citySalt(city) + 3) % 1000) / 173.0;
  return BEND_AMP * wave(seed + 2.1, x) * fadeEdge(line, city.grid);
}

export function avenueX(line, z, city) {
  return line * TERRAIN_PITCH + avenueOffset(line, z, city);
}

export function streetZ(line, x, city) {
  return line * TERRAIN_PITCH + streetOffset(line, x, city);
}

export function groundHeight(x, z, city) {
  if (!usesOrganicLayout(city)) return 0;
  const s = (hash(7, 9, citySalt(city)) % 500) / 80;
  const h1 = Math.sin(x * 0.0036 + s) * Math.cos(z * 0.0030 - s * 0.5);
  const h2 = Math.sin((x + z) * 0.0020 + s * 1.3) * 0.45;
  const raw = (h1 * 0.6 + h2) * HILL_PEAK;
  return Math.max(0, raw + HILL_PEAK * 0.25);
}

// Nearest road centre: which axis, centre-line coord, lateral offset, and road heading.
export function nearestRoad(x, z, city) {
  const grid = city.grid;
  const pitch = TERRAIN_PITCH;
  const i0 = Math.round(x / pitch);
  const j0 = Math.round(z / pitch);
  let best = { dist: Infinity, axis: 'ns', line: 0, centerX: x, centerZ: z, heading: 0 };

  for (let i = i0 - 1; i <= i0 + 1; i++) {
    if (!city.wrap && (i < 0 || i > grid)) continue;
    const cx = avenueX(i, z, city);
    const dist = Math.abs(x - cx);
    if (dist < best.dist) {
      const dx = avenueX(i, z + 1.5, city) - avenueX(i, z - 1.5, city);
      best = { dist, axis: 'ns', line: i, centerX: cx, centerZ: z, heading: Math.atan2(-dx / 3, 1) };
    }
  }
  for (let j = j0 - 1; j <= j0 + 1; j++) {
    if (!city.wrap && (j < 0 || j > grid)) continue;
    const cz = streetZ(j, x, city);
    const dist = Math.abs(z - cz);
    if (dist < best.dist) {
      const dz = streetZ(j, x + 1.5, city) - streetZ(j, x - 1.5, city);
      best = {
        dist, axis: 'ew', line: j, centerX: x, centerZ: cz,
        heading: Math.atan2(1, dz / 3)
      };
    }
  }
  return best;
}

export function softKerbClamp(x, z, city) {
  const road = nearestRoad(x, z, city);
  const lim = TERRAIN_DRIVE_LIMIT - 0.4;
  if (road.dist <= lim) return { x, z, road };
  if (road.axis === 'ns') {
    return { x: Math.max(road.centerX - lim, Math.min(road.centerX + lim, x)), z, road };
  }
  return { x, z: Math.max(road.centerZ - lim, Math.min(road.centerZ + lim, z)), road };
}

export function sampleAvenueRibbon(line, z0, z1, steps = 12, city) {
  const pts = [];
  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    const z = z0 + (z1 - z0) * t;
    const x = avenueX(line, z, city);
    const y = groundHeight(x, z, city);
    pts.push({ x, y, z });
  }
  return pts;
}

export function sampleStreetRibbon(line, x0, x1, steps = 12, city) {
  const pts = [];
  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    const x = x0 + (x1 - x0) * t;
    const z = streetZ(line, x, city);
    const y = groundHeight(x, z, city);
    pts.push({ x, y, z });
  }
  return pts;
}

export function ribbonGeometry(pts, halfWidth, yBias = 0) {
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];
  let dist = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    const prev = pts[Math.max(0, i - 1)];
    const next = pts[Math.min(pts.length - 1, i + 1)];
    const tx = next.x - prev.x;
    const tz = next.z - prev.z;
    const len = Math.hypot(tx, tz) || 1;
    const nx = (-tz / len) * halfWidth;
    const nz = (tx / len) * halfWidth;
    if (i > 0) dist += Math.hypot(p.x - prev.x, p.z - prev.z);
    const y = (p.y ?? 0) + yBias;
    positions.push(p.x + nx, y, p.z + nz, p.x - nx, y, p.z - nz);
    normals.push(0, 1, 0, 0, 1, 0);
    uvs.push(0, dist / 8, 1, dist / 8);
    if (i > 0) {
      const a = (i - 1) * 2;
      indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
  }
  return { positions, normals, uvs, indices };
}

/** Lane offsets from centre for a 4-lane carriageway (clear dashed separators). */
export const LANE_OFFSETS = [-9.2, -3.4, 3.4, 9.2];

export { BEND_AMP, HILL_PEAK, BEND_CHANCE };
