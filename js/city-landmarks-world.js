// Stylised landmark models for the cities beyond Singapore. Local +x faces the road; heights are exaggerated slightly so skylines read from the street.
import * as THREE from './vendor/three/three.module.min.js';
import { mat, box, cyl, dome, ball, C, windowStrips } from './city-landmark-kit.js';

const M = {
  limestone: mat(0xcfc7b4, { rough: 0.8 }),
  brick: mat(0xa4573c),
  glassBlue: mat(0x6fa4c4, { rough: 0.15, metal: 0.45 }),
  glassSilver: mat(0xa9bdc9, { rough: 0.15, metal: 0.6 }),
  glassDeep: mat(0x35607a, { rough: 0.15, metal: 0.5 }),
  steel: mat(0xd0d6da, { rough: 0.3, metal: 0.7 }),
  red: mat(0xd33b2c, { rough: 0.55 }),
  orange: mat(0xf0662a, { rough: 0.55 }),
  white: mat(0xf4f2ec, { rough: 0.6 }),
  slate: mat(0x4a5560, { rough: 0.7 }),
  gold: mat(0xe3b341, { rough: 0.25, metal: 0.8 }),
  patina: mat(0x72b8a0, { rough: 0.7 }),
  stone: mat(0xb9ad98, { rough: 0.85 }),
  sand: mat(0xe3d3ae, { rough: 0.85 }),
  dark: mat(0x1d2328, { rough: 0.5 }),
  water: mat(0x2c5d73, { rough: 0.1, metal: 0.2 }),
  grass: mat(0x5f9a58, { rough: 0.95 }),
  lawn: mat(0x86a97d, { rough: 0.95 }),
  pink: mat(0xc94a7a, { rough: 0.2, metal: 0.45 }),
  lamp: mat(0xfff0c8, { rough: 0.3, emissive: 0xffe0a0, glow: 0.8 }),
  screens: [0xff3b6b, 0x2bd4ff, 0xffd23b, 0x8f5bff, 0x38e07b, 0xff8a2b].map((c) => mat(c, { rough: 0.4, emissive: c, glow: 1.0 }))
};

const ring = (g, m, x, y, z, r, tube, rotX = Math.PI / 2, rotY = 0) => {
  const t = new THREE.Mesh(new THREE.TorusGeometry(r, tube, 8, 40), m);
  t.position.set(x, y, z);
  t.rotation.set(rotX, rotY, 0);
  g.add(t);
  return t;
};
const cone = (g, m, x, y, z, r, h, seg = 12, rotY = 0) => {
  const c = new THREE.Mesh(new THREE.ConeGeometry(r, h, seg), m);
  c.position.set(x, y + h / 2, z);
  c.rotation.y = rotY;
  g.add(c);
  return c;
};
// A thin beam from a to b (3D points).
const beam = (g, m, a, b, t = 0.4) => {
  const len = a.distanceTo(b);
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(t, len, t), m);
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
  g.add(mesh);
  return mesh;
};
const V = (x, y, z) => new THREE.Vector3(x, y, z);

export const WORLD_BUILDERS = {
  // ----- New York -----
  empire(g) {
    box(g, M.limestone, 0, 15, 0, 24, 30, 38);
    windowStrips(g, 24, 30, 38, 0, 1, 8, M.glassDeep);
    const tiers = [[18, 30, 26], [12, 22, 24], [8, 13, 14]];
    let y = 30;
    for (const [w, d, h] of tiers) {
      box(g, M.limestone, 0, y + h / 2, 0, w, h, d);
      windowStrips(g, w, h, d, 0, y + 0.5, Math.round(h / 4), M.glassDeep);
      y += h;
    }
    box(g, M.limestone, 0, y + 3, 0, 5, 6, 8);
    box(g, M.lamp, 0, y + 7, 0, 3.2, 3, 5.2);
    cyl(g, M.steel, 0, y + 8.5, 0, 0.25, 1.1, 26, 8);
    box(g, M.stone, 0, 0.5, 0, 26, 1, 42);
  },
  liberty(g) {
    box(g, M.stone, 0, 1, 0, 24, 2, 24);
    box(g, M.limestone, 0, 6, 0, 13, 8, 13);
    box(g, M.limestone, 0, 12.5, 0, 10, 5, 10);
    cyl(g, M.patina, 0, 15, 0, 3.4, 4.6, 14, 16);
    cyl(g, M.patina, 0, 28.5, 0, 1.3, 2.2, 1.6, 12);
    ball(g, M.patina, 0, 31, 0, 2.1);
    for (let i = 0; i < 7; i++) {
      const a = -1.2 + i * 0.4;
      const spike = cone(g, M.patina, Math.sin(a) * 2.4, 32.2, Math.cos(a) * 1.6 - 0.2, 0.28, 2.2, 5);
      spike.rotation.set(Math.cos(a) * 0.9, 0, -Math.sin(a) * 0.9);
    }
    beam(g, M.patina, V(0.8, 27, 2), V(1.8, 38, 3.6), 1.2);
    cyl(g, M.gold, 1.9, 37.4, 3.7, 0.7, 1.3, 2.4, 10);
    ball(g, M.lamp, 1.9, 40.6, 3.7, 0.9);
    box(g, M.patina, -2.5, 20, -2.6, 1.6, 7, 1.0).rotation.z = 0.2;
  },
  flatiron(g) {
    const H = 68;
    const shape = new THREE.Shape([new THREE.Vector2(-26, -11), new THREE.Vector2(-26, 11), new THREE.Vector2(0, 0)]);
    const geo = new THREE.ExtrudeGeometry(shape, { depth: H, bevelEnabled: false });
    geo.rotateX(-Math.PI / 2);
    g.add(new THREE.Mesh(geo, M.limestone));
    for (const s of [1, -1]) {
      const a = new THREE.Vector2(-26, -11 * s); const b = new THREE.Vector2(0, 0);
      const angle = Math.atan2(b.y - a.y, b.x - a.x);
      const len = a.distanceTo(b);
      for (let r = 0; r < 14; r++) {
        const strip = box(g, M.glassDeep, (a.x + b.x) / 2 + Math.sin(angle) * s * 0.08, 6 + r * 4.4, (a.y + b.y) / 2 - Math.cos(angle) * s * 0.08, len * 0.86, 1.8, 0.14);
        strip.rotation.y = -angle;
      }
    }
    box(g, M.stone, -13, H + 0.6, 0, 28, 1.2, 12).scale.set(0.9, 1, 0.9);
    box(g, M.stone, -3, 1, 0, 8, 2, 14);
  },
  wtc(g) {
    box(g, M.glassSilver, 0, 4, 0, 18, 8, 18);
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(6, 10.5, 105, 8), M.glassBlue);
    shaft.position.y = 8 + 52.5;
    shaft.rotation.y = Math.PI / 8;
    g.add(shaft);
    cyl(g, M.steel, 0, 113, 0, 0.15, 0.8, 32, 8);
    ball(g, M.lamp, 0, 145, 0, 0.7);
    for (const z of [-22, 22]) {
      box(g, M.dark, 0, 0.15, z, 15, 0.3, 15);
      box(g, M.water, 0, 0.35, z, 12, 0.1, 12);
    }
  },
  timessq(g) {
    box(g, M.dark, 0, 0.2, 0, 24, 0.4, 44);
    const heights = [48, 66, 38, 58];
    heights.forEach((h, i) => {
      const z = -16.5 + i * 11;
      box(g, M.glassSilver, -4, h / 2, z, 12, h, 9);
      for (let k = 0; k < Math.floor(h / 9); k++) {
        const screen = box(g, M.screens[(i + k) % M.screens.length], 2.15, 6 + k * 8.5, z, 0.3, 6, 7.5);
        screen.rotation.z = 0;
      }
    });
    for (let k = 0; k < 6; k++) box(g, M.red, 9 - k * 0.1, 0.5 + k * 0.7, 0, 3 + (5 - k) * 0.9, 0.7, 14);
  },

  // ----- Shanghai -----
  pearl(g) {
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + Math.PI / 6;
      beam(g, M.white, V(Math.cos(a) * 9, 0, Math.sin(a) * 9), V(Math.cos(a) * 2.5, 36, Math.sin(a) * 2.5), 1.6);
    }
    cyl(g, M.white, 0, 0, 0, 1.4, 1.6, 100, 12);
    ball(g, M.pink, 0, 30, 0, 8.5);
    cyl(g, M.white, 0, 38, 0, 1.2, 1.4, 14, 12);
    ball(g, M.pink, 0, 56, 0, 6.2);
    ball(g, M.pink, 0, 82, 0, 2.6);
    cyl(g, M.steel, 0, 84, 0, 0.1, 0.5, 34, 8);
    ring(g, M.steel, 0, 6, 0, 10, 0.4);
    ball(g, M.pink, 0, 4, 0, 2.6);
  },
  shtower(g) {
    const levels = 16;
    for (let i = 0; i < levels; i++) {
      const t = i / (levels - 1);
      const w = 17 * (1 - t * 0.68);
      const slab = box(g, i % 2 ? M.glassBlue : M.glassSilver, 0, i * 8.4 + 4.2, 0, w, 8.4, w);
      slab.rotation.y = t * 1.9;
    }
    cyl(g, M.steel, 0, 134, 0, 0.2, 1, 24, 8);
    box(g, M.stone, 0, 0.6, 0, 26, 1.2, 26);
  },
  jinmao(g) {
    let y = 0;
    for (let i = 0; i < 14; i++) {
      const w = 16 * (1 - i * 0.052);
      const h = 7.2;
      box(g, M.glassSilver, 0, y + h / 2, 0, w, h, w);
      box(g, M.steel, 0, y + h + 0.2, 0, w + 1.6, 0.5, w + 1.6);
      box(g, M.glassDeep, 0, y + h / 2, 0, w + 0.1, h * 0.3, w + 0.1);
      y += h + 0.4;
    }
    cone(g, M.steel, 0, y, 0, 2.2, 12, 8);
    cyl(g, M.steel, 0, y + 11, 0, 0.1, 0.4, 14, 6);
    box(g, M.stone, 0, 0.5, 0, 24, 1, 24);
  },
  swfc(g) {
    box(g, M.glassSilver, 0, 40, 0, 15, 80, 15);
    windowStrips(g, 15, 80, 15, 0, 1, 20, M.glassDeep);
    for (const s of [-1, 1]) {
      const slab = box(g, M.glassSilver, 0, 92, s * 5.5, 15, 24, 4);
      slab.rotation.x = -s * 0.07;
    }
    box(g, M.glassSilver, 0, 108, 0, 15, 8, 15);
    box(g, M.glassDeep, 0, 99, 0, 15.2, 1.2, 8);
    box(g, M.stone, 0, 0.5, 0, 24, 1, 24);
  },
  bund(g) {
    box(g, M.stone, 0, 9, 0, 16, 18, 62);
    for (let i = 0; i < 19; i++) cyl(g, M.white, 8.6, 0, -27 + i * 3, 0.45, 0.45, 13, 10);
    box(g, M.stone, 8.6, 13.4, 0, 1.4, 1, 60);
    box(g, M.glassDeep, 8.05, 6, 0, 0.1, 5, 57);
    box(g, M.stone, 0, 28, -4, 7, 24, 7);
    box(g, M.white, 3.6, 33, -4, 0.2, 5, 5);
    cone(g, M.slate, 0, 40, -4, 5.4, 9, 4, Math.PI / 4);
    cyl(g, M.stone, 0, 18, 20, 5.5, 5.8, 8, 16);
    dome(g, M.patina, 0, 26, 20, 5.6, 6.2, 5.6, 18);
    cone(g, M.patina, 0, 31, 20, 0.5, 5, 6);
  },

  // ----- Tokyo -----
  tokyotower(g) {
    const half = 9;
    const top = 1.4;
    const bands = 8;
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      for (let k = 0; k < bands; k++) {
        const t0 = k / bands; const t1 = (k + 1) / bands;
        const a = V(sx * (half - (half - top) * t0 ** 0.8), t0 * 78, sz * (half - (half - top) * t0 ** 0.8));
        const b = V(sx * (half - (half - top) * t1 ** 0.8), t1 * 78, sz * (half - (half - top) * t1 ** 0.8));
        beam(g, k % 2 ? M.white : M.orange, a, b, 0.7);
      }
    }
    for (let k = 1; k < bands; k++) {
      const t = k / bands;
      const r = half - (half - top) * t ** 0.8;
      for (const s of [-1, 1]) {
        box(g, M.orange, 0, t * 78, s * r, r * 2, 0.35, 0.35);
        box(g, M.orange, s * r, t * 78, 0, 0.35, 0.35, r * 2);
      }
    }
    box(g, M.red, 0, 32, 0, 17, 5, 17);
    box(g, M.white, 0, 30, 0, 17.2, 0.6, 17.2);
    box(g, M.red, 0, 55, 0, 6, 3.6, 6);
    cyl(g, M.white, 0, 58, 0, 0.3, 1.2, 14, 8);
    cyl(g, M.orange, 0, 70, 0, 0.2, 0.5, 30, 8);
  },
  skytree(g) {
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2;
      beam(g, M.steel, V(Math.cos(a) * 12, 0, Math.sin(a) * 12), V(Math.cos(a) * 3.2, 46, Math.sin(a) * 3.2), 1.1);
    }
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 4.4, 100, 14), M.white);
    shaft.position.y = 56;
    g.add(shaft);
    for (const [y, r] of [[80, 6.5], [100, 4.6]]) {
      cyl(g, M.glassBlue, 0, y, 0, r, r, 3, 18);
      cyl(g, M.steel, 0, y + 3, 0, r * 0.8, r, 0.8, 18);
    }
    cyl(g, M.steel, 0, 106, 0, 0.15, 0.7, 28, 8);
    ring(g, M.lamp, 0, 4, 0, 9, 0.2);
  },
  kaminarimon(g) {
    box(g, M.stone, 0, 0.4, 0, 14, 0.8, 30);
    for (const x of [-4, 4]) for (const z of [-10, 10]) cyl(g, M.red, x, 0.8, z, 0.9, 1.0, 9.5, 14);
    box(g, M.red, 0, 10.2, 0, 10, 1.0, 24);
    box(g, M.dark, 0, 11.2, 0, 10.4, 0.5, 24.4);
    box(g, M.red, 0, 13.6, 0, 8.6, 4, 21);
    box(g, M.white, 4.4, 13.6, 0, 0.1, 1.8, 14);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(1, 1, 4), M.slate);
    roof.scale.set(13, 5.5, 17);
    roof.rotation.y = Math.PI / 4;
    roof.scale.set(7.6, 5.2, 15.5);
    roof.position.set(0, 18.4, 0);
    g.add(roof);
    box(g, M.slate, 0, 16.0, 0, 11.5, 0.7, 25);
    cyl(g, M.red, 0, 4.6, 0, 1.7, 1.7, 3.8, 18);
    cyl(g, M.dark, 0, 4.3, 0, 1.2, 1.2, 0.5, 14);
    cyl(g, M.dark, 0, 8.1, 0, 1.2, 1.2, 0.4, 14);
    for (const z of [-14.5, 14.5]) {
      box(g, M.stone, 0, 3, z, 3, 6, 3);
      box(g, M.red, 0, 3, z, 2, 3, 2.2);
    }
  },
  shibuya(g) {
    cyl(g, M.white, 0, 0, -12, 9, 9, 36, 20);
    for (let i = 0; i < 6; i++) cyl(g, M.red, 0, 8 + i * 5, -12, 9.1, 9.1, 1.4, 20);
    cyl(g, M.red, 0, 36, -12, 5, 5, 4, 16);
    box(g, M.glassBlue, 0, 30, 14, 20, 60, 22);
    for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) {
      box(g, M.screens[(r * 2 + c) % M.screens.length], 10.2, 9 + r * 8.5, 14 + (c - 1.5) * 5, 0.3, 7, 4.4);
    }
    box(g, M.dark, 0, 0.2, 0, 24, 0.4, 56);
  },
  tocho(g) {
    box(g, M.slate, 0, 12, 0, 26, 24, 44);
    windowStrips(g, 26, 24, 44, 0, 1, 6, M.glassDeep);
    for (const z of [-14, 14]) {
      box(g, M.limestone, 0, 40, z, 12, 80, 12);
      windowStrips(g, 12, 76, 12, 0, 3, 19, M.glassDeep);
      for (const s of [-1, 1]) {
        box(g, M.limestone, 0, 98, z + s * 3.2, 11, 36, 5);
        windowStrips(g, 11, 34, 5, 0, 81, 9, M.glassDeep);
      }
      box(g, M.red, 0, 118.5, z - 3.2, 1, 3, 1);
    }
    box(g, M.stone, 0, 0.3, 0, 30, 0.6, 50);
  },

  // ----- London -----
  bigben(g) {
    box(g, M.sand, 0, 9, 0, 22, 18, 62);
    for (let i = 0; i < 14; i++) box(g, M.stone, 11.1, 9, -28 + i * 4.3, 0.3, 11, 1.4);
    for (const z of [-30, 30]) { box(g, M.sand, 0, 24, z, 5, 14, 5); cone(g, M.slate, 0, 31, z, 3.8, 8, 4, Math.PI / 4); }
    box(g, M.sand, 0, 24, -4, 7, 48, 7);
    box(g, M.sand, 0, 52, -4, 8.4, 10, 8.4);
    for (const [dx, dz, ry] of [[4.3, 0, 0], [-4.3, 0, 0], [0, 4.3, Math.PI / 2], [0, -4.3, Math.PI / 2]]) {
      const face = cyl(g, M.white, dx, 40, -4 + dz, 3, 3, 0.3, 24);
      face.position.set(dx, 40 + 1.5, -4 + dz);
      face.rotation.z = ry === 0 ? Math.PI / 2 : 0;
      face.rotation.x = ry === 0 ? 0 : Math.PI / 2;
    }
    box(g, M.gold, 0, 57.3, -4, 9, 0.8, 9);
    cone(g, M.slate, 0, 58, -4, 6.2, 16, 4, Math.PI / 4);
    cyl(g, M.gold, 0, 73, -4, 0.1, 0.4, 5, 6);
  },
  londoneye(g) {
    const R = 34;
    const cy = 40;
    ring(g, M.white, 0, cy, 0, R, 0.7, 0, Math.PI / 2);
    ring(g, M.white, 0, cy, 0, R - 2, 0.3, 0, Math.PI / 2);
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      beam(g, M.steel, V(0, cy, 0), V(0, cy + Math.sin(a) * R, Math.cos(a) * R), 0.18);
    }
    for (let i = 0; i < 32; i++) {
      const a = (i / 32) * Math.PI * 2;
      const pod = new THREE.Mesh(new THREE.SphereGeometry(1.6, 12, 8), M.glassClear || M.glassBlue);
      pod.scale.set(1.2, 1, 1.4);
      pod.position.set(3, cy + Math.sin(a) * (R + 1.8), Math.cos(a) * (R + 1.8));
      g.add(pod);
    }
    cyl(g, M.steel, 0, cy, 0, 1.6, 1.6, 2.4, 10).rotation.z = Math.PI / 2;
    beam(g, M.white, V(-8, 0, -12), V(0, cy, 0), 1.6);
    beam(g, M.white, V(-8, 0, 12), V(0, cy, 0), 1.6);
    beam(g, M.white, V(-8, 0, -12), V(-8, 0, 12), 1.2);
  },
  shard(g) {
    const body = new THREE.Mesh(new THREE.ConeGeometry(13, 125, 4, 1), M.glassSilver);
    body.rotation.y = Math.PI / 4;
    body.position.y = 62.5;
    g.add(body);
    const shard2 = new THREE.Mesh(new THREE.ConeGeometry(10, 105, 4, 1), M.glassBlue);
    shard2.rotation.y = Math.PI / 4 + 0.3;
    shard2.position.set(0.8, 52, 0.8);
    g.add(shard2);
    for (let i = 0; i < 9; i++) {
      const t = 0.08 + i * 0.1;
      ring(g, M.steel, 0, 125 * t, 0, 13 * (1 - t) * 0.72, 0.12, Math.PI / 2, 0).rotation.z = Math.PI / 4;
    }
    box(g, M.stone, 0, 0.4, 0, 26, 0.8, 26);
  },
  towerbridge(g) {
    const blue = mat(0x2f6fb0, { rough: 0.4, metal: 0.3 });
    for (const z of [-18, 18]) {
      box(g, M.stone, 0, 17, z, 8, 34, 8);
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) cone(g, M.slate, sx * 3.4, 34, z + sz * 3.4, 1.3, 7, 4, Math.PI / 4);
      cone(g, M.slate, 0, 34, z, 4.4, 10, 4, Math.PI / 4);
      box(g, M.glassDeep, 4.05, 24, z, 0.15, 3, 3);
    }
    box(g, blue, 0, 28, 0, 3, 1.6, 28);
    box(g, M.stone, 0, 29, 0, 3.6, 0.4, 28);
    box(g, blue, 0, 6, -30, 8, 1.2, 16);
    box(g, blue, 0, 6, 30, 8, 1.2, 16);
    box(g, blue, 0, 6, 0, 8, 1.2, 28);
    for (const z of [-26, 26]) {
      const chain = box(g, blue, 3.8, 18, z, 0.5, 0.5, 22);
      chain.rotation.x = z < 0 ? 0.55 : -0.55;
    }
    box(g, M.water, 0, 0.2, 0, 14, 0.2, 90);
  },
  stpauls(g) {
    box(g, M.stone, 0, 11, 6, 30, 22, 46);
    for (let i = 0; i < 8; i++) cyl(g, M.white, 15.6, 0, -12 + i * 3, 0.7, 0.7, 14, 10);
    box(g, M.stone, 15.6, 14.4, -1.5, 3, 1.2, 25);
    box(g, M.stone, 15.6, 17, -1.5, 1, 4, 14).rotation.z = 0;
    for (const z of [-17, 14]) {
      box(g, M.stone, 6, 22, z, 8, 22, 8);
      dome(g, M.slate, 6, 33, z, 3.6, 4.6, 3.6, 12);
    }
    cyl(g, M.stone, 0, 22, 6, 11, 11.6, 6, 28);
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      cyl(g, M.white, Math.cos(a) * 11.6, 22, 6 + Math.sin(a) * 11.6, 0.35, 0.35, 5.4, 6);
    }
    cyl(g, M.stone, 0, 28, 6, 9.6, 10.2, 5, 28);
    dome(g, mat(0x8e9aa6, { rough: 0.4, metal: 0.3 }), 0, 33, 6, 9.6, 12, 9.6, 28);
    cyl(g, M.stone, 0, 44.5, 6, 1.7, 2.2, 4, 12);
    cone(g, M.gold, 0, 48.5, 6, 1.2, 3, 8);
    ball(g, M.gold, 0, 52, 6, 0.9);
  },

  // ----- Dubai -----
  burj(g) {
    const wings = [0, Math.PI / 3, (2 * Math.PI) / 3];
    const tiers = [[3, 0, 28], [3, 28, 54], [3, 54, 76], [2, 76, 96], [2, 96, 112], [1, 112, 124], [1, 124, 134]];
    for (const [count, y0, y1] of tiers) {
      wings.slice(0, count === 1 ? 1 : 3).forEach((a, k) => {
        const w = count === 3 ? 6 - (y0 / 28) * 0.6 : 5;
        const wing = box(g, k % 2 ? M.glassSilver : M.glassBlue, 0, (y0 + y1) / 2, 0, 24 - y0 * 0.16, y1 - y0, w);
        wing.rotation.y = a;
      });
      cyl(g, M.glassSilver, 0, y0, 0, 4 - y0 * 0.015, 4.4 - y0 * 0.015, y1 - y0, 6);
    }
    cyl(g, M.steel, 0, 134, 0, 0.12, 0.8, 34, 8);
    box(g, M.stone, 0, 0.5, 0, 30, 1, 30);
  },
  burjalarab(g) {
    box(g, M.sand, 0, 0.4, 0, 34, 0.8, 50);
    const sail = new THREE.Mesh(new THREE.CylinderGeometry(15, 15, 92, 32, 1, true, -Math.PI * 0.45, Math.PI * 0.9), mat(0xf6f3ea, { rough: 0.5 }));
    sail.material = sail.material.clone();
    sail.material.side = THREE.DoubleSide;
    sail.position.set(-2, 46, 0);
    sail.rotation.y = Math.PI / 2;
    sail.scale.set(0.5, 1, 1.5);
    g.add(sail);
    box(g, M.steel, 7.4, 46, 0, 0.7, 92, 0.7);
    for (let i = 0; i < 6; i++) beam(g, M.steel, V(7.4, 4 + i * 15, -0.1), V(-8, 8 + i * 15, 0), 0.3);
    cyl(g, M.glassBlue, 3, 62, 0, 2.4, 2.4, 1, 18);
    cyl(g, M.steel, -6, 3, 0, 1.2, 2.4, 80, 8);
    cone(g, M.red, 7.4, 90, 0, 0.6, 8, 4);
  },
  dubaiframe(g) {
    for (const z of [-18, 18]) box(g, M.gold, 0, 22, z, 5, 44, 4);
    box(g, M.gold, 0, 47, 0, 5.4, 6, 44);
    box(g, M.glassDeep, 2.8, 47, 0, 0.2, 2.2, 36);
    box(g, M.gold, 0, 0.4, 0, 10, 0.8, 42);
    for (let i = 0; i < 5; i++) box(g, M.lawn, 6, 0.3, -12 + i * 6, 3, 0.4, 3);
  },
  emirates(g) {
    const tall = new THREE.Mesh(new THREE.CylinderGeometry(7.5, 7.5, 80, 3), M.glassSilver);
    tall.position.set(0, 40, -12);
    tall.rotation.y = Math.PI / 2;
    g.add(tall);
    const cap = new THREE.Mesh(new THREE.ConeGeometry(7.5, 14, 3), M.steel);
    cap.position.set(0, 87, -12);
    cap.rotation.y = Math.PI / 2;
    g.add(cap);
    cyl(g, M.steel, 0, 94, -12, 0.1, 0.5, 14, 8);
    const small = new THREE.Mesh(new THREE.CylinderGeometry(6.5, 6.5, 58, 3), M.glassBlue);
    small.position.set(0, 29, 14);
    small.rotation.y = -Math.PI / 2;
    g.add(small);
    const cap2 = new THREE.Mesh(new THREE.ConeGeometry(6.5, 11, 3), M.steel);
    cap2.position.set(0, 63.5, 14);
    cap2.rotation.y = -Math.PI / 2;
    g.add(cap2);
    box(g, M.glassDeep, 0, 4, 1, 14, 8, 14);
  },
  museum(g) {
    box(g, M.stone, 0, 0.5, 0, 28, 1, 34);
    const body = new THREE.Mesh(new THREE.TorusGeometry(10, 5.5, 18, 40), mat(0xdfe4e6, { rough: 0.25, metal: 0.75 }));
    body.scale.set(0.9, 1, 1.4);
    body.rotation.y = Math.PI / 2;
    body.position.set(0, 18, 0);
    g.add(body);
    const hole = new THREE.Mesh(new THREE.SphereGeometry(8.5, 18, 12), M.dark);
    hole.scale.set(0.4, 1, 1.5);
    hole.position.set(0, 18, 0);
    g.add(hole);
    for (let i = 0; i < 5; i++) {
      const band = new THREE.Mesh(new THREE.TorusGeometry(10.1, 0.35, 6, 40, Math.PI * 1.9), M.dark);
      band.scale.set(0.9, 1, 1.4);
      band.rotation.set(0, Math.PI / 2, 0.3 + i * 1.2);
      band.position.set(0, 18, 0);
      g.add(band);
    }
    cyl(g, M.steel, 0, 1, 0, 6, 8, 5, 24);
  },
  // ----- Planet Aurelia / Circadia -----
  spire(g) {
    box(g, M.stone, 0, 0.5, 0, 28, 1, 28);
    cyl(g, mat(0x7a8fa8, { rough: 0.2, metal: 0.7 }), 0, 0, 0, 5, 8, 70, 16);
    windowStrips(g, 10, 70, 10, 0, 1, 18, M.glassBlue);
    cone(g, M.gold, 0, 70, 0, 6, 18, 12);
    ball(g, M.lamp, 0, 90, 0, 2.4);
    ring(g, mat(0x5fd4ff, { rough: 0.2, metal: 0.6 }), 0, 42, 0, 12, 0.45);
    ring(g, mat(0xffb454, { rough: 0.2, metal: 0.6 }), 0, 56, 0, 9, 0.35);
  },
  ringgate(g) {
    box(g, M.stone, 0, 0.4, 0, 36, 0.8, 24);
    ring(g, M.steel, 0, 18, 0, 16, 1.2, 0, Math.PI / 2);
    ring(g, mat(0xffb454, { rough: 0.25, metal: 0.8 }), 0, 18, 0, 16, 0.35, 0, Math.PI / 2);
    for (const s of [-1, 1]) box(g, M.slate, s * 18, 10, 0, 3, 20, 6);
    box(g, M.glassDeep, 0, 4, 0, 10, 8, 8);
  },
  crystal(g) {
    box(g, M.stone, 0, 0.5, 0, 26, 1, 26);
    for (const [x, z, h, r] of [[0, 0, 48, 5], [-8, 6, 32, 3.2], [7, -5, 28, 2.8], [4, 8, 22, 2.2]]) {
      const shard = new THREE.Mesh(new THREE.OctahedronGeometry(r, 0), mat(0x9ad7ff, { rough: 0.1, metal: 0.55 }));
      shard.position.set(x, h / 2 + 1, z);
      shard.scale.set(1, h / (r * 2.2), 1);
      g.add(shard);
    }
    ball(g, M.lamp, 0, 52, 0, 1.6);
  },
  observatory(g) {
    box(g, M.slate, 0, 4, 0, 30, 8, 30);
    cyl(g, M.white, 0, 8, 0, 10, 12, 10, 24);
    dome(g, M.steel, 0, 18, 0, 11, 8, 11, 20);
    cyl(g, M.dark, 0, 22, 0, 2.2, 2.2, 14, 12).rotation.z = 0.55;
    box(g, M.lawn, 0, 0.2, 0, 34, 0.4, 34);
  },
  unityplaza(g) {
    box(g, M.stone, 0, 0.4, 0, 40, 0.8, 40);
    cyl(g, M.gold, 0, 0.8, 0, 6, 8, 2, 24);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      box(g, M.glassSilver, Math.cos(a) * 14, 10, Math.sin(a) * 14, 4, 20, 4);
    }
    ball(g, M.lamp, 0, 16, 0, 3.2);
  },
  polarbeacon(g) {
    box(g, M.lawn, 0, 0.2, 0, 36, 0.4, 36);
    cyl(g, M.white, 0, 0, 0, 3, 5, 40, 12);
    cone(g, mat(0x5fd4ff, { rough: 0.2, metal: 0.5 }), 0, 40, 0, 5, 12, 10);
    ball(g, M.lamp, 0, 54, 0, 2.8);
    for (let i = 0; i < 3; i++) ring(g, mat(0x7fe6ff, { rough: 0.3, metal: 0.4 }), 0, 18 + i * 8, 0, 8 + i, 0.25);
  },
  antipodolite(g) {
    box(g, M.stone, 0, 0.5, 0, 28, 1, 28);
    cone(g, mat(0xb07cff, { rough: 0.25, metal: 0.55 }), 0, 0, 0, 10, 36, 6);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      cone(g, mat(0x7a5cff, { rough: 0.3, metal: 0.45 }), Math.cos(a) * 8, 0, Math.sin(a) * 8, 3, 16 + (i % 3) * 4, 5);
    }
    ball(g, M.lamp, 0, 38, 0, 2);
  },
  helixcore(g) {
    box(g, M.stone, 0, 0.5, 0, 32, 1, 32);
    for (let i = 0; i < 18; i++) {
      const a = i * 0.55;
      const y = 4 + i * 4.2;
      box(g, i % 2 ? M.glassBlue : M.glassSilver, Math.cos(a) * 8, y, Math.sin(a) * 8, 10, 4, 6);
    }
    cyl(g, M.steel, 0, 0, 0, 2, 3.5, 80, 10);
    ball(g, M.gold, 0, 84, 0, 3);
  }
};

export const WORLD_NAMES = {
  empire: 'Empire State Building', liberty: 'Statue of Liberty', flatiron: 'Flatiron Building', wtc: 'One World Trade Center', timessq: 'Times Square',
  pearl: 'Oriental Pearl Tower', shtower: 'Shanghai Tower', jinmao: 'Jin Mao Tower', swfc: 'Shanghai World Financial Center', bund: 'The Bund',
  tokyotower: 'Tokyo Tower', skytree: 'Tokyo Skytree', kaminarimon: 'Kaminarimon Gate · Senso-ji', shibuya: 'Shibuya Scramble', tocho: 'Tokyo Metropolitan Government Building',
  bigben: 'Big Ben · Westminster', londoneye: 'London Eye', shard: 'The Shard', towerbridge: 'Tower Bridge', stpauls: "St Paul's Cathedral",
  burj: 'Burj Khalifa', burjalarab: 'Burj Al Arab', dubaiframe: 'Dubai Frame', emirates: 'Emirates Towers', museum: 'Museum of the Future',
  spire: 'Orbital Spire', ringgate: 'Ring Gate', crystal: 'Crystal Forum', observatory: 'Horizon Observatory',
  unityplaza: 'Unity Plaza', polarbeacon: 'Polar Beacon', antipodolite: 'Antipode Lite', helixcore: 'Helix Core'
};

// Footprint depth (x extent behind the road-facing front).
export const WORLD_DEPTH = {
  empire: 26, liberty: 24, flatiron: 26, wtc: 18, timessq: 24, pearl: 22, shtower: 26, jinmao: 24, swfc: 24, bund: 22,
  tokyotower: 20, skytree: 26, kaminarimon: 14, shibuya: 24, tocho: 30, bigben: 24, londoneye: 20, shard: 26, towerbridge: 14, stpauls: 34,
  burj: 30, burjalarab: 36, dubaiframe: 10, emirates: 20, museum: 28,
  spire: 24, ringgate: 22, crystal: 22, observatory: 28, unityplaza: 28, polarbeacon: 24, antipodolite: 24, helixcore: 26
};
