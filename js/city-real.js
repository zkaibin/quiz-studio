// "Real map" layer: loads prebuilt OpenStreetMap city packs from data/city-maps/,
// dresses them with street-view detail, and exposes collision / minimap / start helpers.
import * as THREE from './vendor/three/three.module.min.js';
import { unpackSceneBinary, gunzipBytes } from './city-map-pack.js';
import { dressRealCity, disposeRealLook } from './city-real-look.js';
import { projector } from './osm-city.js';
import { realStartsFor } from './city-real-starts.js';

const CELL = 64;
const ROAD_CELL = 48;
const MAP_ATLAS = 1024;
const PACK_URL = (id) => `data/city-maps/${id}.bin.gz`;
// Shrink building pads slightly so sidewalks / road edges aren't blocked by footprint bleed.
const FOOTPRINT_INSET = 1.15;

export function createRealCity({ scene }) {
  const root = new THREE.Group();
  root.visible = false;
  scene.add(root);
  let loadedId = null;
  let data = null;
  let grid = new Map();
  let roadGrid = new Map();
  let mapCache = null;
  let detail = null;
  let packGroup = null;
  let starts = [];

  function pointInPolygon(x, z, p) {
    let inside = false;
    for (let i = 0, j = p.length - 2; i < p.length; j = i, i += 2) {
      const xi = p[i]; const zi = p[i + 1]; const xj = p[j]; const zj = p[j + 1];
      if ((zi > z) !== (zj > z) && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) inside = !inside;
    }
    return inside;
  }

  /** Inset a closed flat polygon toward its centroid so wall pads don't eat the curb. */
  function insetPolygon(p, inset) {
    if (p.length < 6) return p;
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

  function index(footprints) {
    grid = new Map();
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
  }

  function indexRoads(roads) {
    roadGrid = new Map();
    for (const r of roads) {
      for (let i = 0; i + 3 < r.p.length; i += 2) {
        const x1 = r.p[i]; const z1 = r.p[i + 1]; const x2 = r.p[i + 2]; const z2 = r.p[i + 3];
        const pad = r.w * 0.5 + 2;
        const x0 = Math.min(x1, x2) - pad; const x1b = Math.max(x1, x2) + pad;
        const z0 = Math.min(z1, z2) - pad; const z1b = Math.max(z1, z2) + pad;
        const seg = { x1, z1, x2, z2, w: r.w };
        for (let cx = Math.floor(x0 / ROAD_CELL); cx <= Math.floor(x1b / ROAD_CELL); cx++) {
          for (let cz = Math.floor(z0 / ROAD_CELL); cz <= Math.floor(z1b / ROAD_CELL); cz++) {
            const key = `${cx},${cz}`;
            if (!roadGrid.has(key)) roadGrid.set(key, []);
            roadGrid.get(key).push(seg);
          }
        }
      }
    }
  }

  function distToSeg(x, z, seg) {
    const dx = seg.x2 - seg.x1; const dz = seg.z2 - seg.z1;
    const len2 = dx * dx + dz * dz;
    if (len2 < 1e-6) return Math.hypot(x - seg.x1, z - seg.z1);
    let t = ((x - seg.x1) * dx + (z - seg.z1) * dz) / len2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(x - (seg.x1 + dx * t), z - (seg.z1 + dz * t));
  }

  /** True when standing on asphalt (road ribbon + small margin). */
  function onRoad(x, z, margin = 1.25) {
    if (!data) return false;
    const list = roadGrid.get(`${Math.floor(x / ROAD_CELL)},${Math.floor(z / ROAD_CELL)}`);
    if (!list) return false;
    for (const seg of list) {
      if (distToSeg(x, z, seg) <= seg.w * 0.5 + margin) return true;
    }
    return false;
  }

  const supported = typeof fetch === 'function';

  async function fetchPack(id, onStatus) {
    onStatus(`Loading ${id} streets…`);
    const res = await fetch(PACK_URL(id));
    if (!res.ok) throw new Error(`Map pack missing (${res.status})`);
    onStatus('Unpacking the city…');
    const gz = new Uint8Array(await res.arrayBuffer());
    const raw = await gunzipBytes(gz);
    return unpackSceneBinary(raw);
  }

  function meshesFromPack(built) {
    const group = new THREE.Group();
    group.name = 'real-pack';
    for (const m of built.meshes) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(m.pos, 3));
      geometry.setAttribute('normal', new THREE.BufferAttribute(m.nor, 3));
      if (m.vertexColors && m.col) geometry.setAttribute('color', new THREE.BufferAttribute(m.col, 3));
      geometry.setIndex(new THREE.BufferAttribute(m.idx, 1));
      geometry.computeBoundingSphere();
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(...m.color),
        vertexColors: !!m.vertexColors,
        roughness: m.roughness,
        metalness: m.metallic
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = m.name;
      mesh.receiveShadow = true;
      mesh.castShadow = m.name === 'buildings';
      group.add(mesh);
    }
    return group;
  }

  /** Nearest road sample to (x,z); prefers longer segments. */
  function nearestRoad(x, z, maxDist = 220) {
    let best = null; let bestScore = Infinity;
    for (const r of data.roads) {
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
        const score = dist - r.w * 0.35;
        if (score < bestScore) {
          bestScore = score;
          best = { x: px, z: pz, heading: Math.atan2(dx, -dz), w: r.w, dist };
        }
      }
    }
    return best;
  }

  function resolveStarts(city) {
    const project = projector(city.lat, city.lon);
    const limit = data.half * 0.92;
    const list = [];
    for (const poi of realStartsFor(city.id)) {
      const [x, z] = project(poi.lat, poi.lon);
      if (Math.hypot(x, z) > limit) continue;
      const road = nearestRoad(x, z, 160) || nearestRoad(x, z, 320);
      if (!road) continue;
      list.push({
        id: poi.id,
        name: poi.name,
        blurb: poi.blurb,
        x: road.x,
        z: road.z,
        heading: road.heading
      });
    }
    if (!list.length) {
      const fallback = spawn();
      list.push({ id: `${city.id}-center`, name: `${city.name} Centre`, blurb: 'City centre streets', ...fallback });
    }
    return list;
  }

  const available = () => supported;
  async function isCached() { return true; }

  async function load(city, onStatus = () => {}) {
    const id = city.id;
    if (loadedId === id && data) {
      if (!starts.length) starts = resolveStarts(city);
      return true;
    }
    unload();
    try {
      const built = await fetchPack(id, onStatus);
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (!built.extras.footprints.length && !built.extras.roads.length) throw new Error('No map data in pack');
      onStatus('Dressing the streets…');
      await new Promise((resolve) => setTimeout(resolve, 0));
      packGroup = meshesFromPack(built);
      data = built.extras;
      index(data.footprints);
      indexRoads(data.roads);
      detail = dressRealCity(packGroup, data, { city });
      root.add(packGroup);
      root.add(detail);
      loadedId = id;
      mapCache = null;
      starts = resolveStarts(city);
      return true;
    } catch (error) {
      console.warn('Real map unavailable', error);
      return false;
    }
  }

  function unload() {
    if (packGroup) {
      root.remove(packGroup);
      packGroup.traverse((o) => { if (o.isMesh) o.geometry?.dispose(); });
      packGroup = null;
    }
    if (detail) {
      root.remove(detail);
      disposeRealLook(detail);
      detail = null;
    }
    for (const child of [...root.children]) root.remove(child);
    data = null;
    loadedId = null;
    grid = new Map();
    roadGrid = new Map();
    mapCache = null;
    starts = [];
  }

  /**
   * Driveable rules for Real map:
   * - Asphalt always wins over building footprints (fixes OSM pads that bleed onto roads).
   * - Soft circular pack edge: on-road can reach the rim; off-road cuts earlier.
   * - Footprints use an inset polygon so curbs aren't fake walls.
   */
  function isDrivable(x, z) {
    if (!data) return false;
    const r = Math.hypot(x, z);
    const half = data.half;
    if (r > half * 1.02) return false;
    if (onRoad(x, z)) return r <= half * 1.01;
    if (r > half * 0.96) return false;
    const list = grid.get(`${Math.floor(x / CELL)},${Math.floor(z / CELL)}`);
    if (!list) return true;
    for (const f of list) {
      const b = f.box;
      const poly = f.hit || f.p;
      if (x >= b[0] && x <= b[1] && z >= b[2] && z <= b[3] && pointInPolygon(x, z, poly)) return false;
    }
    return true;
  }

  /** Soft-kerb helper: snap a blocked step back onto the nearest road. */
  function clampToRoad(x, z) {
    const hit = nearestRoad(x, z, 80) || nearestRoad(x, z, 180);
    if (!hit) return { x, z, hit: false };
    return { x: hit.x, z: hit.z, heading: hit.heading, hit: true };
  }

  function spawn() {
    let best = null; let bestScore = Infinity;
    for (const r of data.roads) {
      for (let i = 0; i + 3 < r.p.length; i += 2) {
        const dx = r.p[i + 2] - r.p[i]; const dz = r.p[i + 3] - r.p[i + 1];
        if (Math.hypot(dx, dz) < 20) continue;
        const mx = (r.p[i] + r.p[i + 2]) / 2; const mz = (r.p[i + 1] + r.p[i + 3]) / 2;
        const score = Math.hypot(mx, mz) - r.w * 6;
        if (score < bestScore) { bestScore = score; best = { x: mx, z: mz, heading: Math.atan2(dx, -dz) }; }
      }
    }
    return best || { x: 0, z: 0, heading: 0 };
  }

  function spawnAt(startId) {
    const hit = starts.find((s) => s.id === startId);
    if (hit) return { x: hit.x, z: hit.z, heading: hit.heading, name: hit.name };
    return spawn();
  }

  /** Snap a world tap to the nearest drivable road sample. */
  function teleportTarget(x, z) {
    const road = nearestRoad(x, z, 180) || nearestRoad(x, z, 400);
    if (!road) return null;
    if (!isDrivable(road.x, road.z)) {
      // Nudge along the heading to clear a building footprint.
      for (const step of [8, -8, 16, -16, 28, -28]) {
        const sx = Math.sin(road.heading); const cz = Math.cos(road.heading);
        const nx = road.x + sx * step; const nz = road.z - cz * step;
        if (isDrivable(nx, nz)) return { x: nx, z: nz, heading: road.heading };
      }
    }
    return { x: road.x, z: road.z, heading: road.heading };
  }

  function mapLayer(size = MAP_ATLAS) {
    if (mapCache && mapCache.width === size) return mapCache;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const c = canvas.getContext('2d');
    const k = size / (data.half * 2);
    const at = (v) => (v + data.half) * k;
    c.fillStyle = '#c5d3b8';
    c.fillRect(0, 0, size, size);
    // Soft circular mask so the atlas doesn't read as a hard square city.
    c.save();
    c.beginPath();
    c.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
    c.clip();
    c.fillStyle = '#b4b2a6';
    for (const f of data.footprints) {
      c.beginPath();
      for (let i = 0; i < f.p.length; i += 2) c[i ? 'lineTo' : 'moveTo'](at(f.p[i]), at(f.p[i + 1]));
      c.closePath();
      c.fill();
    }
    c.strokeStyle = '#fbfaf3';
    c.lineCap = 'round';
    for (const r of data.roads) {
      c.lineWidth = Math.max(1.2, r.w * k * 0.9);
      c.beginPath();
      for (let i = 0; i < r.p.length; i += 2) c[i ? 'lineTo' : 'moveTo'](at(r.p[i]), at(r.p[i + 1]));
      c.stroke();
    }
    c.restore();
    mapCache = canvas;
    return canvas;
  }

  return {
    available, isCached, load, unload, isDrivable, onRoad, clampToRoad,
    spawn, spawnAt, teleportTarget, mapLayer,
    getStarts: () => starts.slice(),
    setVisible(on) { root.visible = on; },
    get ready() { return !!data; },
    get loadedId() { return loadedId; },
    get half() { return data ? data.half : 0; }
  };
}
