// Procedural models for the everyday traffic that shares the road: taxis, sedans, SUVs, vans, buses, lorries and motorbikes.
import * as THREE from './vendor/three/three.module.min.js';
import { mergeVehicle } from './city-gfx.js';

const materials = new Map();
export function stdMat(color, { rough = 0.6, metal = 0, emissive = 0x000000, glow = 0, opacity = 1 } = {}) {
  const key = [color, rough, metal, emissive, glow, opacity].join('|');
  if (!materials.has(key)) {
    materials.set(key, new THREE.MeshStandardMaterial({
      color, roughness: rough, metalness: metal, emissive, emissiveIntensity: glow, transparent: opacity < 1, opacity
    }));
  }
  return materials.get(key);
}
const paintMat = (color) => {
  const key = `paint|${color}`;
  if (!materials.has(key)) materials.set(key, new THREE.MeshStandardMaterial({ color, roughness: 0.32, metalness: 0.5, envMapIntensity: 1.2 }));
  return materials.get(key);
};

const M = {
  glass: stdMat(0x101b22, { rough: 0.08, metal: 0.4 }),
  black: stdMat(0x0d0f11, { rough: 0.75 }),
  plastic: stdMat(0x1a1d20, { rough: 0.55 }),
  chrome: stdMat(0xd9dde0, { rough: 0.2, metal: 0.95 }),
  tyre: stdMat(0x131516, { rough: 0.95 }),
  head: stdMat(0xfff4d0, { rough: 0.2, emissive: 0xffe9a8, glow: 0.7 }),
  tail: stdMat(0xd01818, { rough: 0.3, emissive: 0xff1010, glow: 0.7 }),
  amber: stdMat(0xffa500, { rough: 0.3, emissive: 0xff9000, glow: 0.6 }),
  white: stdMat(0xf1f1ec, { rough: 0.5 }),
  plateRear: stdMat(0xf0c400, { rough: 0.5 }),
  rim: stdMat(0xbfc4c8, { rough: 0.3, metal: 0.85 }),
  skin: stdMat(0xd9a77e, { rough: 0.7 })
};

const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const cylGeo = new THREE.CylinderGeometry(1, 1, 1, 16);
function box(group, material, x, y, z, w, h, d) {
  const mesh = new THREE.Mesh(boxGeo, material);
  mesh.position.set(x, y, z);
  mesh.scale.set(w, h, d);
  group.add(mesh);
  return mesh;
}
function cyl(group, material, x, y, z, r, len, axis = 'x') {
  const mesh = new THREE.Mesh(cylGeo, material);
  mesh.position.set(x, y, z);
  if (axis === 'x') { mesh.rotation.z = Math.PI / 2; mesh.scale.set(r, len, r); } else if (axis === 'z') { mesh.rotation.x = Math.PI / 2; mesh.scale.set(r, len, r); } else mesh.scale.set(r, len, r);
  group.add(mesh);
  return mesh;
}

// Smooths a mesh while keeping hard edges: vertex normals only blend faces within `angle` of each other.
export function creaseNormals(geometry, angle = 0.75) {
  const geo = geometry.index ? geometry.toNonIndexed() : geometry;
  const pos = geo.attributes.position;
  const faces = pos.count / 3;
  const fn = new Float32Array(faces * 3);
  const a = new THREE.Vector3(); const b = new THREE.Vector3(); const c = new THREE.Vector3();
  const buckets = new Map();
  const keyOf = (i) => `${Math.round(pos.getX(i) * 500)},${Math.round(pos.getY(i) * 500)},${Math.round(pos.getZ(i) * 500)}`;
  for (let f = 0; f < faces; f++) {
    a.fromBufferAttribute(pos, f * 3); b.fromBufferAttribute(pos, f * 3 + 1); c.fromBufferAttribute(pos, f * 3 + 2);
    b.sub(a); c.sub(a); b.cross(c).normalize();
    fn[f * 3] = b.x; fn[f * 3 + 1] = b.y; fn[f * 3 + 2] = b.z;
    for (let k = 0; k < 3; k++) {
      const key = keyOf(f * 3 + k);
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(f);
    }
  }
  const normals = new Float32Array(pos.count * 3);
  const cosLimit = Math.cos(angle);
  for (let i = 0; i < pos.count; i++) {
    const f = Math.floor(i / 3);
    let nx = 0; let ny = 0; let nz = 0;
    for (const g of buckets.get(keyOf(i))) {
      const dot = fn[f * 3] * fn[g * 3] + fn[f * 3 + 1] * fn[g * 3 + 1] + fn[f * 3 + 2] * fn[g * 3 + 2];
      if (dot >= cosLimit) { nx += fn[g * 3]; ny += fn[g * 3 + 1]; nz += fn[g * 3 + 2]; }
    }
    const len = Math.hypot(nx, ny, nz) || 1;
    normals[i * 3] = nx / len; normals[i * 3 + 1] = ny / len; normals[i * 3 + 2] = nz / len;
  }
  geo.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  return geo;
}

// Extrudes a side silhouette (u forward, y up) across the car width; u maps to world -z.
export function extrudeSide(points, width, bevel = 0.07, taper = null) {
  const shape = new THREE.Shape(points);
  const depth = Math.max(0.02, width - 2 * bevel);
  const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel * 0.9, bevelSegments: 3, curveSegments: 1, steps: 1 });
  geo.translate(0, 0, -depth / 2);
  geo.rotateY(Math.PI / 2);
  if (taper) {
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) pos.setX(i, pos.getX(i) * taper(-pos.getZ(i), pos.getY(i)));
  }
  return creaseNormals(geo);
}

export const smoothOpen = (pts, per = 7) => new THREE.CatmullRomCurve3(pts.map(([u, y]) => new THREE.Vector3(u, y, 0)), false, 'centripetal').getPoints(pts.length * per).map((p) => new THREE.Vector2(p.x, p.y));
export const smoothClosed = (pts, per = 6) => new THREE.CatmullRomCurve3(pts.map(([u, y]) => new THREE.Vector3(u, y, 0)), true, 'centripetal').getPoints(pts.length * per).map((p) => new THREE.Vector2(p.x, p.y));

// Body silhouette: smooth upper outline (front to rear) closed by a floor with round wheel arches.
export function bodyPoints(top, axles, floor = 0.28, gap = 0.07) {
  const pts = smoothOpen(top);
  const last = top[top.length - 1];
  const first = top[0];
  pts.push(new THREE.Vector2(last[0], floor));
  for (const ax of [...axles].sort((p, q) => p.u - q.u)) {
    const a = ax.r + gap;
    for (let k = 0; k <= 12; k++) {
      const t = Math.PI - (k / 12) * Math.PI;
      pts.push(new THREE.Vector2(ax.u + a * Math.cos(t), Math.max(floor, ax.r + a * Math.sin(t))));
    }
  }
  pts.push(new THREE.Vector2(first[0], floor));
  return pts;
}

function wheelAssembly(group, r, width, x, u, steer, store) {
  const pivot = new THREE.Group();
  pivot.position.set(x, r, -u);
  const spin = new THREE.Group();
  const tyre = new THREE.Mesh(new THREE.CylinderGeometry(r, r, width, 20), M.tyre);
  tyre.rotation.z = Math.PI / 2;
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.64, r * 0.64, width + 0.015, 16), M.rim);
  rim.rotation.z = Math.PI / 2;
  spin.add(tyre, rim);
  for (let i = 0; i < 5; i++) {
    const spoke = new THREE.Mesh(boxGeo, M.black);
    spoke.scale.set(width + 0.03, r * 0.1, r * 1.1);
    spoke.rotation.x = (i / 5) * Math.PI;
    spin.add(spoke);
  }
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.16, r * 0.16, width + 0.04, 8), M.chrome);
  hub.rotation.z = Math.PI / 2;
  spin.add(hub);
  pivot.add(spin);
  group.add(pivot);
  store.wheels.push(spin);
  if (steer) store.frontPivots.push(pivot);
}

function addWheels(group, store, { W, r, axles, tw = 0.24, doubleRear = false }) {
  const x = W / 2 - tw / 2 - 0.03;
  axles.forEach((ax, i) => {
    for (const side of [-1, 1]) {
      wheelAssembly(group, ax.r || r, tw, side * x, ax.u, i === 0, store);
      if (doubleRear && i > 0) wheelAssembly(group, ax.r || r, tw, side * (x - tw - 0.03), ax.u, false, store);
    }
  });
}

function lamps(group, { frontU, rearU, W, y, tailY, headW = 0.5, headH = 0.1, tailW = 0.5, tailH = 0.12, grilleH = 0.2, grilleY }) {
  const x = W / 2 - 0.4;
  for (const s of [-1, 1]) {
    box(group, M.head, s * x, y, -(frontU - 0.01), headW, headH, 0.06);
    box(group, M.tail, s * x, tailY, -(rearU + 0.01), tailW, tailH, 0.06);
    box(group, M.amber, s * (x + headW / 2 + 0.03), y - 0.03, -(frontU - 0.02), 0.08, 0.06, 0.05);
  }
  box(group, M.black, 0, grilleY ?? y - 0.1, -(frontU - 0.015), W * 0.4, grilleH, 0.05);
  box(group, M.white, 0, 0.55, -(frontU - 0.02), 0.45, 0.11, 0.04);
  box(group, M.plateRear, 0, tailY - 0.2, -(rearU + 0.02), 0.45, 0.11, 0.04);
  box(group, M.black, 0, 0.36, -(frontU - 0.03), W * 0.8, 0.08, 0.1);
  box(group, M.black, 0, 0.36, -(rearU + 0.03), W * 0.8, 0.08, 0.1);
}

function car(spec, colorHex) {
  const { W, L, r, top, cabin, pillars = [], mirrorU, roof } = spec;
  const g = new THREE.Group();
  const paint = paintMat(colorHex);
  const store = { wheels: [], frontPivots: [] };
  const axles = [{ u: spec.front, r }, { u: spec.rear, r }];
  g.add(new THREE.Mesh(extrudeSide(bodyPoints(top, axles, spec.floor), W), paint));
  const cab = smoothClosed(cabin);
  g.add(new THREE.Mesh(extrudeSide(cab, W - 0.24, 0.05), M.glass));
  const topEdge = cab.filter((p) => p.y > spec.belt + 0.2);
  if (topEdge.length > 2) {
    const slab = topEdge.map((p) => new THREE.Vector2(p.x, p.y + 0.03));
    for (let i = topEdge.length - 1; i >= 0; i--) slab.push(new THREE.Vector2(topEdge[i].x, topEdge[i].y - 0.06));
    g.add(new THREE.Mesh(extrudeSide(slab, W - 0.3, 0.03), paint));
  }
  for (const u of pillars) {
    const p = cab.reduce((best, c) => (Math.abs(c.x - u) < Math.abs(best.x - u) && c.y > spec.belt + 0.3 ? c : best), cab[0]);
    const h = p.y - spec.belt;
    box(g, paint, 0, spec.belt + h / 2, -u, W - 0.2, h, 0.08);
  }
  for (const s of [-1, 1]) {
    box(g, paint, s * (W / 2 + 0.06), spec.belt + 0.1, -mirrorU, 0.14, 0.1, 0.18);
    box(g, M.black, s * (W / 2 - 0.06), 0.37, -(spec.front - 0.9), 0.1, 0.1, 1.9);
  }
  lamps(g, { frontU: L / 2, rearU: -L / 2, W, y: spec.headY, tailY: spec.tailY });
  addWheels(g, store, { W, r, axles });
  if (roof) roof(g, spec, paint);
  Object.assign(g.userData, store, { halfLen: L / 2, halfWidth: W / 2, wheelRadius: r });
  return g;
}

const SPECS = {
  sedan: {
    L: 4.7, W: 1.82, r: 0.33, front: 1.45, rear: -1.35, belt: 0.92, headY: 0.74, tailY: 0.78, mirrorU: 0.7, pillars: [-0.55],
    top: [[2.35, 0.42], [2.37, 0.62], [2.2, 0.78], [1.2, 0.88], [0.8, 0.93], [-0.6, 0.95], [-1.9, 0.94], [-2.3, 0.86], [-2.37, 0.62], [-2.33, 0.42]],
    cabin: [[0.95, 0.9], [0.4, 1.36], [-0.5, 1.42], [-1.3, 1.34], [-1.85, 0.95], [-1.0, 0.9]]
  },
  hatch: {
    L: 4.1, W: 1.76, r: 0.31, front: 1.25, rear: -1.15, belt: 0.9, headY: 0.7, tailY: 0.86, mirrorU: 0.6, pillars: [-0.45],
    top: [[2.05, 0.42], [2.07, 0.6], [1.9, 0.76], [1.0, 0.85], [0.7, 0.9], [-1.0, 0.92], [-1.95, 0.95], [-2.07, 0.7], [-2.04, 0.42]],
    cabin: [[0.8, 0.88], [0.3, 1.34], [-0.8, 1.42], [-1.6, 1.28], [-1.98, 0.98], [-1.0, 0.9]]
  },
  suv: {
    L: 4.75, W: 1.92, r: 0.4, front: 1.5, rear: -1.4, belt: 1.12, headY: 0.92, tailY: 1.0, mirrorU: 0.85, pillars: [-0.6, -1.6], floor: 0.36,
    top: [[2.37, 0.55], [2.4, 0.82], [2.22, 1.0], [1.3, 1.08], [0.9, 1.13], [-1.0, 1.13], [-2.2, 1.12], [-2.4, 1.0], [-2.38, 0.55]],
    cabin: [[1.0, 1.1], [0.5, 1.72], [-1.8, 1.76], [-2.28, 1.2], [-2.2, 1.1]],
    roof: (g, spec) => { for (const s of [-1, 1]) box(g, M.black, s * 0.7, 1.82, 0.4, 0.05, 0.06, 2.0); }
  },
  van: {
    L: 4.9, W: 1.86, r: 0.34, front: 1.55, rear: -1.45, belt: 1.05, headY: 0.82, tailY: 1.0, mirrorU: 1.05, pillars: [0.3, -1.0],
    top: [[2.45, 0.45], [2.48, 0.72], [2.3, 0.95], [1.7, 1.08], [1.3, 1.15], [-1.5, 1.15], [-2.4, 1.1], [-2.48, 0.9], [-2.45, 0.45]],
    cabin: [[1.45, 1.12], [0.75, 1.88], [-2.25, 1.92], [-2.38, 1.2], [-2.2, 1.12]]
  }
};
SPECS.taxi = {
  ...SPECS.sedan,
  roof: (g, spec) => {
    box(g, stdMat(0xffffff, { emissive: 0xfff2c0, glow: 0.8 }), 0, 1.5, -0.1, 0.55, 0.14, 0.22);
    box(g, M.black, 0, 1.52, -0.1, 0.57, 0.04, 0.24);
  }
};

function bus(colorHex) {
  const g = new THREE.Group();
  const store = { wheels: [], frontPivots: [] };
  const W = 2.5; const L = 12; const r = 0.5;
  const white = stdMat(0xe9ecee, { rough: 0.45, metal: 0.2 });
  const stripe = paintMat(colorHex);
  const top = [[6.0, 0.55], [6.05, 1.3], [5.95, 2.7], [5.55, 3.15], [4.0, 3.18], [-4.0, 3.2], [-5.7, 3.15], [-6.05, 2.8], [-6.05, 0.7], [-6.0, 0.55]];
  const axles = [{ u: 4.0, r }, { u: -3.6, r }];
  g.add(new THREE.Mesh(extrudeSide(bodyPoints(top, axles, 0.4), W, 0.14), white));
  for (const s of [-1, 1]) {
    box(g, M.glass, s * (W / 2 + 0.01), 2.12, -0.5, 0.04, 1.0, 10.2);
    box(g, stripe, s * (W / 2 + 0.01), 1.25, 0, 0.05, 0.3, 11.4);
  }
  box(g, stripe, 0, 3.2, -0.6, 1.6, 0.3, 4.0);
  box(g, M.glass, 0, 2.3, -6.0, W - 0.3, 1.25, 0.05);
  box(g, M.amber, 0, 3.0, -6.02, 1.0, 0.22, 0.04);
  box(g, M.glass, -(W / 2 + 0.015), 1.7, -4.7, 0.04, 2.0, 1.2);
  for (const side of [-1, 1]) {
    box(g, M.black, side * (W / 2 + 0.2), 2.2, -5.4, 0.1, 0.5, 0.06);
    box(g, M.tail, side * (W / 2 - 0.3), 0.95, 6.05, 0.4, 0.2, 0.05);
  }
  box(g, M.black, 0, 0.5, -6.05, W * 0.9, 0.2, 0.1);
  box(g, M.black, 0, 0.5, 6.05, W * 0.9, 0.2, 0.1);
  for (const x of [-0.8, 0.8]) box(g, M.head, x, 0.85, -6.06, 0.4, 0.14, 0.04);
  box(g, M.plateRear, 0, 0.9, 6.06, 0.5, 0.14, 0.04);
  addWheels(g, store, { W, r, axles, tw: 0.3 });
  Object.assign(g.userData, store, { halfLen: L / 2, halfWidth: W / 2, wheelRadius: r });
  return g;
}

function lorry(colorHex) {
  const g = new THREE.Group();
  const store = { wheels: [], frontPivots: [] };
  const W = 2.4; const r = 0.5;
  const cab = paintMat(colorHex);
  const axles = [{ u: 2.7, r }, { u: -2.1, r }, { u: -3.2, r }];
  box(g, M.black, 0, 0.75, 0, W - 0.5, 0.3, 8.4);
  const cabShape = [[4.1, 0.6], [4.14, 1.7], [3.7, 2.55], [2.4, 2.75], [1.7, 2.7], [1.6, 0.6]].map(([u, y]) => new THREE.Vector2(u, y));
  g.add(new THREE.Mesh(extrudeSide(cabShape, W, 0.12), cab));
  box(g, M.glass, 0, 2.05, -3.95, W - 0.3, 0.95, 0.5).rotation.x = -0.35;
  for (const s of [-1, 1]) {
    box(g, M.glass, s * (W / 2 + 0.01), 2.0, -3.05, 0.04, 0.8, 1.3);
    box(g, M.head, s * 0.8, 1.0, -4.15, 0.4, 0.16, 0.05);
    box(g, M.tail, s * 0.9, 0.9, 4.2, 0.3, 0.2, 0.05);
    box(g, M.black, s * (W / 2 + 0.22), 2.3, -3.8, 0.1, 0.55, 0.06);
  }
  box(g, M.black, 0, 0.55, -4.15, W, 0.3, 0.12);
  box(g, M.black, 0, 1.45, -4.17, 1.2, 0.5, 0.04);
  const cargoMat = stdMat(0xf2f3f1, { rough: 0.55 });
  const cargo = new THREE.Mesh(extrudeSide([[1.3, 1.0], [1.3, 3.7], [-4.15, 3.7], [-4.15, 1.0]].map(([u, y]) => new THREE.Vector2(u, y)), W + 0.06, 0.08), cargoMat);
  g.add(cargo);
  for (const s of [-1, 1]) box(g, cab, s * (W / 2 + 0.07), 2.4, 0.5, 0.03, 0.5, 4.8);
  box(g, M.plateRear, 0, 0.9, 4.2, 0.55, 0.14, 0.04);
  addWheels(g, store, { W, r, axles, tw: 0.3 });
  Object.assign(g.userData, store, { halfLen: 4.2, halfWidth: W / 2, wheelRadius: r });
  return g;
}

function motorbike(colorHex) {
  const g = new THREE.Group();
  const store = { wheels: [], frontPivots: [] };
  const r = 0.32;
  const paint = paintMat(colorHex);
  const fork = new THREE.Group();
  fork.position.set(0, 0, -0.75);
  g.add(fork);
  const frontWheel = new THREE.Group();
  frontWheel.position.set(0, r, 0);
  const rearWheel = new THREE.Group();
  rearWheel.position.set(0, r, 0.78);
  g.add(rearWheel);
  for (const [holder, steer] of [[frontWheel, true], [rearWheel, false]]) {
    const spin = new THREE.Group();
    const tyre = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.14, 18), M.tyre);
    tyre.rotation.z = Math.PI / 2;
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.62, r * 0.62, 0.16, 12), M.rim);
    rim.rotation.z = Math.PI / 2;
    const spoke = new THREE.Mesh(boxGeo, M.black);
    spoke.scale.set(0.17, r * 0.12, r * 1.2);
    spin.add(tyre, rim, spoke);
    holder.add(spin);
    store.wheels.push(spin);
    if (steer) { fork.add(holder); store.frontPivots.push(fork); }
  }
  box(fork, M.chrome, 0, 0.55, 0.02, 0.05, 0.8, 0.05).rotation.x = -0.25;
  box(fork, M.black, 0, 1.0, 0.08, 0.7, 0.04, 0.05);
  box(fork, M.head, 0, 0.88, -0.14, 0.2, 0.2, 0.12);
  box(g, M.plastic, 0, 0.55, 0.1, 0.34, 0.3, 0.9);
  box(g, paint, 0, 0.85, -0.2, 0.34, 0.22, 0.5);
  box(g, M.black, 0, 0.78, 0.5, 0.3, 0.1, 0.7);
  box(g, M.tail, 0, 0.78, 0.92, 0.2, 0.1, 0.05);
  box(g, paint, 0, 0.55, 0.88, 0.16, 0.1, 0.4);
  box(g, M.chrome, 0.18, 0.38, 0.62, 0.08, 0.08, 0.8);
  const riderColor = [0x2c3e50, 0xb03a2e, 0x1e8449, 0xd68910][colorHex % 4];
  const rider = stdMat(riderColor, { rough: 0.8 });
  const torso = box(g, rider, 0, 1.28, 0.35, 0.42, 0.62, 0.3);
  torso.rotation.x = 0.22;
  for (const s of [-1, 1]) {
    const arm = box(g, rider, s * 0.27, 1.12, 0.05, 0.1, 0.1, 0.62);
    arm.rotation.x = -0.15;
    const leg = box(g, stdMat(0x2b3138, { rough: 0.8 }), s * 0.2, 0.78, 0.35, 0.14, 0.14, 0.62);
    leg.rotation.x = 0.1;
  }
  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.17, 12, 10), paint);
  helmet.position.set(0, 1.74, 0.22);
  g.add(helmet);
  box(g, M.glass, 0, 1.74, 0.07, 0.2, 0.1, 0.05);
  Object.assign(g.userData, store, { halfLen: 1.1, halfWidth: 0.4, wheelRadius: r });
  return g;
}

export const VEHICLE_TYPES = {
  taxi: { label: 'Taxi', speed: [18, 23], lanes: [0, 1], colors: [0xf2c200, 0x1d4e9c, 0xf2f2f2, 0xd62828], weight: 3 },
  sedan: { label: 'Sedan', speed: [17, 24], lanes: [0, 1], colors: [0xf2f2f2, 0x15171a, 0x9aa0a6, 0x7a1f2b, 0x24508f], weight: 3 },
  hatch: { label: 'Hatchback', speed: [16, 22], lanes: [0, 1], colors: [0xe4572e, 0x3b8ea5, 0xf2f2f2, 0x6a994e, 0xf2c14e], weight: 2 },
  suv: { label: 'SUV', speed: [16, 22], lanes: [0, 1], colors: [0x15171a, 0xf2f2f2, 0x4b5563, 0x8b2e2e], weight: 2 },
  van: { label: 'Minivan', speed: [15, 21], lanes: [0, 1], colors: [0xe8e8e8, 0x1b1d22, 0x6b7a8f], weight: 1 },
  bus: { label: 'Bus', speed: [12, 15], lanes: [0], colors: [0xd62828, 0x1d4e9c], weight: 1 },
  lorry: { label: 'Lorry', speed: [12, 16], lanes: [0], colors: [0x1d4e9c, 0xd62828, 0x2e7d32, 0xf2c200], weight: 1 },
  moto: { label: 'Motorbike', speed: [20, 26], lanes: [0, 1], colors: [0xd62828, 0x1d4e9c, 0x15171a, 0xf2c200], weight: 1 }
};

export function buildVehicle(type, colorHex) {
  let model;
  if (type === 'bus') model = bus(colorHex);
  else if (type === 'lorry') model = lorry(colorHex);
  else if (type === 'moto') model = motorbike(colorHex);
  else model = car(SPECS[type], colorHex);
  model.userData.type = type;
  mergeVehicle(model);
  model.traverse((o) => { if (o.isMesh) { o.castShadow = true; } });
  return model;
}

export function disposeVehicle(model) {
  model.traverse((o) => { if (o.geometry && o.geometry !== boxGeo && o.geometry !== cylGeo) o.geometry.dispose(); });
}
