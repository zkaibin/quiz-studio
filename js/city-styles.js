// Low-rise street frontages for the cities beyond Singapore. Each theme is one narrow lot built from the shared kit; the lot depth goes in userData.d.
import * as THREE from './vendor/three/three.module.min.js';

const stdMat = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.8, ...extra });
const glow = (color) => new THREE.MeshStandardMaterial({ color, roughness: 0.4, emissive: color, emissiveIntensity: 1.1 });

const MATS = {
  slate: stdMat(0x4c535b),
  redTile: stdMat(0xa8452f),
  stoop: stdMat(0xb8b2a6),
  trim: stdMat(0xf2eee4),
  dark: stdMat(0x2b2f33),
  sand: stdMat(0xe2d0a6),
  gold: stdMat(0xc9a24b, { metalness: 0.5, roughness: 0.4 }),
  chimney: stdMat(0x8a4a38),
  fireEscape: stdMat(0x23282b, { roughness: 0.5, metalness: 0.4 }),
  neon: [0xff3b6b, 0x2bd4ff, 0xffd23b, 0x8f5bff, 0x38e07b, 0xff8a2b].map(glow),
  // Aurelia: glassier crystal + brighter veins for a clear alien look
  crystal: stdMat(0xd8fbff, { metalness: 0.72, roughness: 0.12, emissive: 0x5ae8ff, emissiveIntensity: 0.55 }),
  vein: stdMat(0x9b7cff, { metalness: 0.55, roughness: 0.22, emissive: 0x8a6dff, emissiveIntensity: 1.15 }),
  shell: stdMat(0x243048, { metalness: 0.45, roughness: 0.4 })
};

const TINTS = {
  brownstone: [0xb5714f, 0x9c5a3d, 0xc08b63, 0xa86a4a, 0xd0b18a],
  terrace: [0xc77b5a, 0xb86a4a, 0xe3d4b2, 0xd8c7a0, 0x9fa6a8],
  tokyo: [0xe9e6df, 0xd8dde3, 0xf0e2cf, 0xcfd6d9, 0xe7ddd3],
  lilong: [0xb9b1a3, 0xa39a8c, 0xc8c0b0, 0x9b948a],
  villa: [0xeadbb8, 0xe0cda0, 0xf0e4c8, 0xd9c391],
  aurelia: [0x6ec8c0, 0x8a6ad4, 0x4aa8d8, 0xb07cff, 0x5ee0c8, 0x9b8cff]
};

export function createStyles(kit, FACE) {
  const { box, walls, M } = kit;
  const pick = (rand, list) => list[Math.floor(rand() * list.length)];

  function gabled(g, cx, y, w, d, mat, rise) {
    const shape = new THREE.Shape([new THREE.Vector2(-w / 2 - 0.3, 0), new THREE.Vector2(w / 2 + 0.3, 0), new THREE.Vector2(0, rise)]);
    const geo = new THREE.ExtrudeGeometry(shape, { depth: d + 0.6, bevelEnabled: false });
    geo.translate(0, 0, -(d + 0.6) / 2);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(cx, y, 0);
    g.add(mesh);
  }

  const themes = {
    // New York: tall brick row house with stoop, cornice and a fire escape.
    brownstone(g, side, rand) {
      const w = 6.5 + rand() * 2.5; const d = 3.4 * Math.round((14 + rand() * 4) / 3.4);
      const floors = 4 + Math.floor(rand() * 2); const H = 3.2 + floors * 3.3;
      const cx = side * (FACE + w / 2); const tint = pick(rand, TINTS.brownstone);
      walls(g, 'shophouse', tint, cx, H / 2, 0, w, H, d);
      box(g, MATS.trim, side * (FACE - 0.1), H - 0.2, 0, 0.9, 0.5, d + 0.2);
      box(g, M.roof, cx, H + 0.05, 0, w, 0.1, d);
      for (let k = 0; k < 4; k++) box(g, MATS.stoop, side * (FACE + 0.3 + k * 0.0), 0.2 + k * 0.28, 0, 1.6 - k * 0.3, 0.3, 1.6);
      box(g, MATS.dark, side * (FACE + 0.05), 1.9, 0, 0.1, 2.2, 1.3);
      if (rand() > 0.4) {
        for (let f = 1; f < floors; f++) {
          box(g, MATS.fireEscape, side * (FACE - 0.55), 2.2 + f * 3.3, 0, 1.1, 0.08, 2.6);
          box(g, MATS.fireEscape, side * (FACE - 1.05), 2.7 + f * 3.3, 0, 0.06, 1.0, 2.6);
        }
      }
      box(g, MATS.chimney, cx + side * 1.5, H + 1, d * 0.3, 1.2, 2, 1.2);
      g.userData.d = d;
    },
    // London: terraced brick house with a pitched slate roof and chimney stacks.
    terrace(g, side, rand) {
      const w = 6 + rand() * 2; const d = 3.4 * Math.round((10 + rand() * 4) / 3.4);
      const floors = 3 + (rand() > 0.6 ? 1 : 0); const H = 1.2 + floors * 3.2;
      const cx = side * (FACE + w / 2); const tint = pick(rand, TINTS.terrace);
      walls(g, 'shophouse', tint, cx, H / 2, 0, w, H, d);
      gabled(g, cx, H, w, d, MATS.slate, 2.6);
      for (const dz of [-d * 0.3, d * 0.3]) box(g, MATS.chimney, cx, H + 2.4, dz, 1, 2.2, 0.9);
      box(g, MATS.trim, side * (FACE - 0.06), 1.2, 0, 0.14, 0.3, d);
      box(g, MATS.dark, side * (FACE - 0.04), 1.2, 0, 0.1, 2.4, 1.2);
      for (const dz of [-d * 0.28, d * 0.28]) box(g, MATS.trim, side * (FACE - 0.05), 3.2, dz, 0.1, 1.5, 1.1);
      box(g, MATS.dark, side * (FACE - 0.7), 0.5, 0, 0.1, 1.0, d);
      g.userData.d = d;
    },
    // Tokyo: slim 4-6 storey mixed-use buildings stacked with glowing signs.
    tokyo(g, side, rand) {
      const w = 5 + rand() * 3; const d = 3.5 * Math.round((9 + rand() * 4) / 3.5);
      const floors = 4 + Math.floor(rand() * 3); const H = 3.6 + floors * 3.1;
      const cx = side * (FACE + w / 2); const tint = pick(rand, TINTS.tokyo);
      walls(g, 'hdb', tint, cx, H / 2, 0, w, H, d);
      box(g, M.roof, cx, H + 0.05, 0, w, 0.1, d);
      box(g, M.shopGlow, side * (FACE + 0.04), 1.8, 0, 0.08, 2.9, d * 0.94);
      box(g, MATS.dark, side * (FACE + 0.2), 3.55, 0, 0.5, 0.3, d);
      const n = 2 + Math.floor(rand() * 3);
      for (let k = 0; k < n; k++) {
        const y = 5.5 + k * 3.3 + rand() * 1.2;
        if (y > H - 2) break;
        const sign = box(g, pick(rand, MATS.neon), side * (FACE - 0.55), y, (rand() - 0.5) * d * 0.6, 0.35, 2.4 + rand() * 2.2, 0.9 + rand() * 0.5);
        sign.userData.glowSign = true;
      }
      box(g, MATS.fireEscape, cx, H + 0.9, 0, w * 0.5, 1.6, d * 0.4);
      g.userData.d = d;
    },
    // Shanghai: lilong lane house with grey brick, a stone-framed door and red tiled gable.
    lilong(g, side, rand) {
      const w = 7 + rand() * 3; const d = 3.6 * Math.round((12 + rand() * 4) / 3.6);
      const floors = 3; const H = 1 + floors * 3.1;
      const cx = side * (FACE + w / 2); const tint = pick(rand, TINTS.lilong);
      walls(g, 'shophouse', tint, cx, H / 2, 0, w, H, d);
      gabled(g, cx, H, w, d, MATS.redTile, 2.2);
      box(g, MATS.trim, side * (FACE - 0.08), 2.2, 0, 0.16, 4.2, 2.2);
      box(g, MATS.dark, side * (FACE - 0.1), 1.6, 0, 0.1, 3.0, 1.5);
      for (let f = 1; f < floors; f++) box(g, MATS.dark, side * (FACE - 0.3), 0.6 + f * 3.1, 0, 0.6, 0.08, d * 0.8);
      for (const dz of [-d * 0.34, d * 0.34]) box(g, M.red, side * (FACE - 0.04), 5.5, dz, 0.1, 0.9, 0.5);
      g.userData.d = d;
    },
    // Dubai: flat-roofed sand villas with parapets, gold trim and wind towers.
    villa(g, side, rand) {
      const w = 11 + rand() * 4; const d = 4 * Math.round((14 + rand() * 4) / 4);
      const floors = 2 + (rand() > 0.5 ? 1 : 0); const H = floors * 3.6;
      const cx = side * (FACE + 4 + w / 2); const tint = pick(rand, TINTS.villa);
      walls(g, 'shophouse', tint, cx, H / 2, 0, w, H, d);
      box(g, MATS.sand, cx, H + 0.5, 0, w + 0.4, 1, d + 0.4);
      box(g, MATS.gold, side * (FACE + 4 - 0.02), H - 1.2, 0, 0.12, 0.3, d * 0.9);
      box(g, MATS.dark, side * (FACE + 4 - 0.02), 1.7, 0, 0.1, 3.0, 2.2);
      box(g, MATS.sand, cx + side * 1.2, H + 2.4, d * 0.28, 1.4, 3, 1.4);
      box(g, MATS.sand, side * (FACE + 1.8), 1.2, 0, 3.4, 0.2, d);
      for (const dz of [-d * 0.35, 0, d * 0.35]) box(g, MATS.gold, side * (FACE + 2.2), 1.2, dz, 0.35, 2.4, 0.35);
      g.userData.d = d;
    },
    // Planet Aurelia: stacked crystal pods with glowing vein bands — not Earth architecture.
    aurelia(g, side, rand) {
      const w = 6.5 + rand() * 4; const d = 3.6 * Math.round((10 + rand() * 6) / 3.6);
      const pods = 2 + Math.floor(rand() * 3);
      const cx = side * (FACE + w / 2);
      let y = 0;
      for (let p = 0; p < pods; p++) {
        const ph = 3.4 + rand() * 2.8;
        const pw = w * (0.72 + rand() * 0.28);
        const pd = d * (0.7 + rand() * 0.3);
        const tint = pick(rand, TINTS.aurelia);
        walls(g, 'glass', tint, cx + side * (rand() - 0.5) * 1.2, y + ph / 2, (rand() - 0.5) * 1.4, pw, ph, pd);
        box(g, MATS.vein, cx, y + ph - 0.12, 0, pw * 0.92, 0.22, pd * 0.92);
        y += ph + 0.35;
      }
      // Cantilevered light fin
      box(g, MATS.crystal, side * (FACE - 0.4), y * 0.55, 0, 0.18, y * 0.7, 0.55);
      const crown = box(g, MATS.vein, cx, y + 0.6, 0, w * 0.35, 1.2, d * 0.35);
      crown.userData.glowSign = true;
      g.userData.d = d;
    },
    // Tall Aurelia street spire: twisted glass shaft with floating ring.
    aureliaSpire(g, side, rand) {
      const w = 7 + rand() * 3; const d = 3.8 * Math.round((12 + rand() * 5) / 3.8);
      const H = 28 + rand() * 36;
      const cx = side * (FACE + w / 2);
      const tint = pick(rand, TINTS.aurelia);
      walls(g, 'glass', tint, cx, H / 2, 0, w * 0.85, H, d * 0.85);
      box(g, MATS.dark, cx, H / 2, 0, w * 0.22, H, d * 0.22);
      for (let k = 0; k < 4; k++) {
        const yy = 6 + k * (H / 5);
        box(g, MATS.vein, cx, yy, 0, w * 0.95, 0.18, d * 0.95);
      }
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(Math.min(w, d) * 0.42, 0.28, 8, 20),
        MATS.crystal
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.set(cx, H + 2.4, 0);
      g.add(ring);
      box(g, MATS.crystal, cx, H + 5.2, 0, 1.1, 4.5, 1.1);
      g.userData.d = d;
    }
  };

  return {
    build(theme, parent, side, zc, rand) {
      const g = new THREE.Group();
      g.position.set(0, 0, zc);
      parent.add(g);
      (themes[theme] || themes.terrace)(g, side, rand);
      return g;
    },
    tints: TINTS
  };
}
