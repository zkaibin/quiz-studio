// Organic Earth-city roads and gentle hills. Planet / wrap cities stay on a regular grid.
// Kept free of imports from city-map.js to avoid a circular dependency.

export const TERRAIN_PITCH = 140;
export const TERRAIN_ROAD_HALF = 11;
export const TERRAIN_DRIVE_LIMIT = 11.4;

const BEND_AMP = 24;
const HILL_PEAK = 9;

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
  const a = Math.sin(t * 0.011 + seed) * 0.55;
  const b = Math.sin(t * 0.023 + seed * 1.7) * 0.3;
  const c = Math.sin(t * 0.041 + seed * 0.4) * 0.15;
  return a + b + c;
}

function citySalt(city) {
  if (!city?.id) return 1;
  let s = 0;
  for (let i = 0; i < city.id.length; i++) s = (s + city.id.charCodeAt(i) * (i + 1)) | 0;
  return (s % 97) + 1;
}

// Lateral offset of N–S avenue `line` at world z.
export function avenueOffset(line, z, city) {
  if (!usesOrganicLayout(city)) return 0;
  const seed = (hash(line, 17, citySalt(city)) % 1000) / 159.0;
  return BEND_AMP * wave(seed, z) * fadeEdge(line, city.grid);
}

// Lateral offset of E–W street `line` at world x.
export function streetOffset(line, x, city) {
  if (!usesOrganicLayout(city)) return 0;
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
  const h1 = Math.sin(x * 0.0042 + s) * Math.cos(z * 0.0036 - s * 0.5);
  const h2 = Math.sin((x + z) * 0.0024 + s * 1.3) * 0.55;
  const h3 = Math.sin(x * 0.0091 - z * 0.0073 + s) * 0.28;
  const ridge = Math.sin(x * 0.0018 + 0.7) * Math.sin(z * 0.0021 - 0.4) * 0.4;
  const raw = (h1 * 0.55 + h2 + h3 + ridge) * HILL_PEAK;
  return Math.max(0, raw + HILL_PEAK * 0.35);
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
      // Face −Z (north) along the avenue: velocity (sin h, −cos h) ≈ (−dx, −1).
      best = { dist, axis: 'ns', line: i, centerX: cx, centerZ: z, heading: Math.atan2(-dx / 3, 1) };
    }
  }
  for (let j = j0 - 1; j <= j0 + 1; j++) {
    if (!city.wrap && (j < 0 || j > grid)) continue;
    const cz = streetZ(j, x, city);
    const dist = Math.abs(z - cz);
    if (dist < best.dist) {
      const dz = streetZ(j, x + 1.5, city) - streetZ(j, x - 1.5, city);
      // Street runs along +X; forward +X ⇒ heading ≈ π/2, adjusted for bend.
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
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
  return { positions, normals, uvs, indices };
}

export { BEND_AMP, HILL_PEAK };
