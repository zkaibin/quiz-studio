// Shared materials and primitive helpers for the stylised landmark models.
import * as THREE from './vendor/three/three.module.min.js';

const materialCache = new Map();
export function mat(color, { rough = 0.8, metal = 0, emissive = 0, glow = 0, opacity = 1 } = {}) {
  const key = [color, rough, metal, emissive, glow, opacity].join('|');
  if (!materialCache.has(key)) {
    materialCache.set(key, new THREE.MeshStandardMaterial({
      color, roughness: rough, metalness: metal,
      emissive, emissiveIntensity: glow,
      transparent: opacity < 1, opacity
    }));
  }
  return materialCache.get(key);
}

export const unitBox = new THREE.BoxGeometry(1, 1, 1);
export const box = (g, m, x, y, z, sx, sy, sz) => {
  const mesh = new THREE.Mesh(unitBox, m);
  mesh.position.set(x, y, z);
  mesh.scale.set(sx, sy, sz);
  g.add(mesh);
  return mesh;
};
export const cyl = (g, m, x, y, z, rTop, rBot, h, seg = 16) => {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, seg), m);
  mesh.position.set(x, y + h / 2, z);
  g.add(mesh);
  return mesh;
};
export const dome = (g, m, x, y, z, rx, ry, rz, seg = 20) => {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, seg, 10, 0, Math.PI * 2, 0, Math.PI / 2), m);
  mesh.position.set(x, y, z);
  mesh.scale.set(rx, ry, rz);
  g.add(mesh);
  return mesh;
};
export const ball = (g, m, x, y, z, r) => {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 10), m);
  mesh.position.set(x, y, z);
  g.add(mesh);
  return mesh;
};

export const C = {
  white: mat(0xf1efe6, { rough: 0.7 }),
  cream: mat(0xe9dcc0),
  stone: mat(0xc9c3b2),
  glass: mat(0x5d98ab, { rough: 0.2, metal: 0.3 }),
  glassDark: mat(0x2f5f73, { rough: 0.2, metal: 0.35 }),
  glassClear: mat(0xbfe6ee, { rough: 0.1, metal: 0.1, opacity: 0.5 }),
  win: mat(0x3a6573, { rough: 0.3, metal: 0.2 }),
  dark: mat(0x23353a),
  red: mat(0xb8432f),
  gold: mat(0xe1b24a, { rough: 0.35, metal: 0.55 }),
  tealRoof: mat(0x2f7d72),
  green: mat(0x3f8a55),
  darkGreen: mat(0x276b45),
  water: mat(0x4aa3c6, { rough: 0.2 }),
  concrete: mat(0xb5b8b4),
  steel: mat(0xc3ccd1, { rough: 0.35, metal: 0.5 }),
  sand: mat(0xdcc9a1),
  blue: mat(0x2f6fb0),
  orange: mat(0xe08a3c)
};
export const pastel = [0xf1a7b5, 0x7ec8b8, 0xf3d27a, 0x8fb3e0, 0xf0a86b, 0xb7a0d8].map((c) => mat(c));

// Stacks of window strips on a tower face (local +x is the road side).
export function windowStrips(g, w, h, d, x, y0, rows, material = C.win) {
  for (let i = 0; i < rows; i++) box(g, material, x + w / 2 + 0.05, y0 + (i + 0.5) * (h / rows), 0, 0.1, h / rows * 0.45, d * 0.86);
}

export function tieredRoofs(g, bodyMat, roofMat, tiers, w, d, tierH) {
  let y = 0;
  for (let i = 0; i < tiers; i++) {
    const s = 1 - i * 0.2;
    box(g, bodyMat, 0, y + tierH / 2, 0, w * s, tierH, d * s);
    y += tierH;
    box(g, roofMat, 0, y + 0.35, 0, w * s + 4, 0.7, d * s + 4);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const tip = box(g, roofMat, sx * (w * s / 2 + 2), y + 1, sz * (d * s / 2 + 2), 1.4, 1.2, 1.4);
      tip.rotation.z = sx * 0.4;
    }
    y += 0.7;
  }
  return y;
}
