// "Real map" layer: loads a GLB exported from OpenStreetMap (scripts/osm-to-glb.mjs) and exposes collision / minimap helpers built from the scene extras.
import * as THREE from './vendor/three/three.module.min.js';
import { GLTFLoader } from './vendor/three/GLTFLoader.js';

const CELL = 64;
const url = (id) => `assets/cities/${id}.glb`;

export function createRealCity({ scene }) {
  const root = new THREE.Group();
  root.visible = false;
  scene.add(root);
  let loadedId = null;
  let data = null;
  let grid = new Map();
  let mapCache = null;
  const availability = new Map();

  function pointInPolygon(x, z, p) {
    let inside = false;
    for (let i = 0, j = p.length - 2; i < p.length; j = i, i += 2) {
      const xi = p[i]; const zi = p[i + 1]; const xj = p[j]; const zj = p[j + 1];
      if ((zi > z) !== (zj > z) && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) inside = !inside;
    }
    return inside;
  }

  function index(footprints) {
    grid = new Map();
    for (const f of footprints) {
      let x0 = Infinity; let x1 = -Infinity; let z0 = Infinity; let z1 = -Infinity;
      for (let i = 0; i < f.p.length; i += 2) {
        x0 = Math.min(x0, f.p[i]); x1 = Math.max(x1, f.p[i]); z0 = Math.min(z0, f.p[i + 1]); z1 = Math.max(z1, f.p[i + 1]);
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

  // Cheap HEAD probe so the menu only offers "Real map" for cities that have an exported GLB.
  async function available(id) {
    if (availability.has(id)) return availability.get(id);
    let ok = false;
    try { ok = (await fetch(url(id), { method: 'HEAD' })).ok; } catch (error) { /* offline or file:// */ }
    availability.set(id, ok);
    return ok;
  }

  async function load(id) {
    if (loadedId === id && data) return true;
    unload();
    try {
      const gltf = await new GLTFLoader().loadAsync(url(id));
      const extras = gltf.scene.userData;
      if (!extras || !extras.footprints) throw new Error('GLB is missing city extras');
      gltf.scene.traverse((o) => {
        if (!o.isMesh) return;
        o.receiveShadow = true;
        o.castShadow = o.name === 'buildings';
        o.material.side = THREE.FrontSide;
      });
      data = extras;
      index(data.footprints);
      root.add(gltf.scene);
      loadedId = id;
      mapCache = null;
      return true;
    } catch (error) {
      console.warn('Real map unavailable', error);
      availability.set(id, false);
      return false;
    }
  }

  function unload() {
    for (const child of [...root.children]) {
      root.remove(child);
      child.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
    }
    data = null;
    loadedId = null;
    grid = new Map();
    mapCache = null;
  }

  function isDrivable(x, z) {
    if (!data || Math.abs(x) > data.half || Math.abs(z) > data.half) return false;
    const list = grid.get(`${Math.floor(x / CELL)},${Math.floor(z / CELL)}`);
    if (!list) return true;
    for (const f of list) {
      const b = f.box;
      if (x >= b[0] && x <= b[1] && z >= b[2] && z <= b[3] && pointInPolygon(x, z, f.p)) return false;
    }
    return true;
  }

  // Start on the widest road near the centre, pointing along it.
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

  // Draws the city into a square canvas; world range [-half, half] maps to the full canvas.
  function mapLayer(size) {
    if (mapCache && mapCache.width === size) return mapCache;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const c = canvas.getContext('2d');
    const k = size / (data.half * 2);
    const at = (v) => (v + data.half) * k;
    c.fillStyle = '#c5d3b8';
    c.fillRect(0, 0, size, size);
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
      c.lineWidth = Math.max(1, r.w * k * 0.9);
      c.beginPath();
      for (let i = 0; i < r.p.length; i += 2) c[i ? 'lineTo' : 'moveTo'](at(r.p[i]), at(r.p[i + 1]));
      c.stroke();
    }
    mapCache = canvas;
    return canvas;
  }

  return {
    available, load, unload, isDrivable, spawn, mapLayer,
    setVisible(on) { root.visible = on; },
    get ready() { return !!data; },
    get half() { return data ? data.half : 0; }
  };
}
