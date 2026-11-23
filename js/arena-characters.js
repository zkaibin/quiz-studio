// Procedural low-poly cartoon fighters for Arena Clash.
// Stylized silhouettes inspired by iconic Dragon Ball looks (gi, Saiyan armor,
// Namekian cape, etc.) — not traced from official art.
import * as THREE from './vendor/three/three.module.min.js';

// Shared toon gradient for anime-like hard lighting
let toonGradient = null;
function getToonGradient() {
  if (toonGradient) return toonGradient;
  if (typeof document !== 'undefined') {
    const canvas = document.createElement('canvas');
    canvas.width = 4;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    const stops = ['#4a4a4a', '#8a8a8a', '#c8c8c8', '#ffffff'];
    stops.forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(i, 0, 1, 1); });
    toonGradient = new THREE.CanvasTexture(canvas);
  } else {
    const data = new Uint8Array([74, 74, 74, 255, 138, 138, 138, 255, 200, 200, 200, 255, 255, 255, 255, 255]);
    toonGradient = new THREE.DataTexture(data, 4, 1);
  }
  toonGradient.minFilter = THREE.NearestFilter;
  toonGradient.magFilter = THREE.NearestFilter;
  toonGradient.needsUpdate = true;
  return toonGradient;
}

const matCache = new Map();
function mat(color, { rough = 0.72, metal = 0.05, emissive = 0x000000, glow = 0, opacity = 1, toon = true } = {}) {
  const key = `${color}|${rough}|${metal}|${emissive}|${glow}|${opacity}|${toon}`;
  if (!matCache.has(key)) {
    if (toon && opacity >= 1 && glow <= 0) {
      matCache.set(key, new THREE.MeshToonMaterial({
        color, gradientMap: getToonGradient(), emissive, emissiveIntensity: glow || 0
      }));
    } else {
      matCache.set(key, new THREE.MeshStandardMaterial({
        color, roughness: rough, metalness: metal, emissive, emissiveIntensity: glow,
        transparent: opacity < 1, opacity
      }));
    }
  }
  return matCache.get(key);
}

const outlineMat = new THREE.MeshBasicMaterial({ color: 0x1a1210, side: THREE.BackSide });
function addOutline(parent, geo, x, y, z, sx, sy, sz, pad = 1.08) {
  const mesh = new THREE.Mesh(geo, outlineMat);
  mesh.position.set(x, y, z);
  mesh.scale.set(sx * pad, sy * pad, sz * pad);
  parent.add(mesh);
  return mesh;
}

const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const sphereGeo = new THREE.SphereGeometry(1, 16, 12);
const cylGeo = new THREE.CylinderGeometry(1, 1, 1, 12);
const coneGeo = new THREE.ConeGeometry(1, 1, 8);

function part(parent, geo, material, x, y, z, sx, sy, sz, rx = 0, ry = 0, rz = 0) {
  const mesh = new THREE.Mesh(geo, material);
  mesh.position.set(x, y, z);
  mesh.scale.set(sx, sy, sz);
  mesh.rotation.set(rx, ry, rz);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function buildScale(build) {
  if (build === 'bulky') return { torso: 1.22, limb: 1.14, head: 0.98, width: 1.12 };
  if (build === 'tall') return { torso: 1.08, limb: 1.1, head: 0.94, width: 1.02 };
  if (build === 'compact') return { torso: 0.9, limb: 0.88, head: 1.12, width: 0.95 };
  if (build === 'round') return { torso: 1.28, limb: 0.92, head: 1.2, width: 1.2 };
  return { torso: 1, limb: 1, head: 1, width: 1 };
}

/* ---------- Hair kits (silhouette-first) ---------- */
function buildHair(head, color, style) {
  const hairMat = mat(color, { rough: 0.88 });
  const darkMat = mat(0x0a0908, { rough: 0.9 });

  const spike = (x, y, z, sx, sy, sz, rx = 0, rz = 0) =>
    part(head, coneGeo, hairMat, x, y, z, sx, sy, sz, rx, 0, rz);

  if (style === 'goku') {
    // Classic Son Goku: tall forward-leaning spikes + one big back spike
    const tips = [
      [0, 0.55, 0.05, 0.14, 0.55, 0.14, -0.35],
      [-0.18, 0.48, 0.08, 0.12, 0.42, 0.12, -0.45, -0.35],
      [0.2, 0.5, 0.06, 0.12, 0.48, 0.12, -0.4, 0.3],
      [-0.32, 0.38, 0.0, 0.11, 0.36, 0.11, -0.55, -0.55],
      [0.34, 0.4, -0.02, 0.11, 0.38, 0.11, -0.5, 0.55],
      [0, 0.42, -0.22, 0.16, 0.5, 0.16, -1.1],
      [-0.12, 0.35, -0.18, 0.1, 0.32, 0.1, -0.9, -0.25],
      [0.14, 0.36, -0.2, 0.1, 0.34, 0.1, -0.95, 0.25]
    ];
    for (const t of tips) spike(t[0], t[1], t[2], t[3], t[4], t[5], t[6] || 0, t[7] || 0);
    part(head, sphereGeo, hairMat, 0, 0.18, -0.05, 0.38, 0.28, 0.36);
    return;
  }

  if (style === 'vegeta') {
    // Widow's peak swept up/back, denser crown
    part(head, sphereGeo, hairMat, 0, 0.2, -0.08, 0.36, 0.28, 0.34);
    const spikes = [
      [0, 0.58, -0.05, 0.12, 0.48, 0.12, -0.15],
      [-0.12, 0.52, -0.02, 0.1, 0.4, 0.1, -0.2, -0.25],
      [0.12, 0.52, -0.02, 0.1, 0.4, 0.1, -0.2, 0.25],
      [-0.22, 0.42, -0.08, 0.09, 0.32, 0.09, -0.45, -0.4],
      [0.22, 0.42, -0.08, 0.09, 0.32, 0.09, -0.45, 0.4],
      [0, 0.4, -0.28, 0.14, 0.38, 0.14, -1.0]
    ];
    for (const t of spikes) spike(t[0], t[1], t[2], t[3], t[4], t[5], t[6] || 0, t[7] || 0);
    // Widow's peak wedge
    part(head, coneGeo, hairMat, 0, 0.22, 0.22, 0.12, 0.22, 0.1, 0.9);
    return;
  }

  if (style === 'gohan') {
    // Softer teen spikes — shorter than Goku
    part(head, sphereGeo, hairMat, 0, 0.16, -0.04, 0.36, 0.26, 0.34);
    for (let i = 0; i < 6; i++) {
      const t = (i / 5) - 0.5;
      spike(t * 0.4, 0.4 + Math.abs(t) * 0.08, 0.02 - Math.abs(t) * 0.05, 0.1, 0.34, 0.1, -0.45, t * 0.5);
    }
    spike(0, 0.38, -0.22, 0.12, 0.36, 0.12, -0.95);
    return;
  }

  if (style === 'trunks') {
    // Future Trunks: long lilac hair to mid-back + bangs
    part(head, sphereGeo, hairMat, 0, 0.18, -0.02, 0.38, 0.28, 0.38);
    part(head, boxGeo, hairMat, 0, -0.05, -0.3, 0.42, 0.7, 0.2);
    part(head, boxGeo, hairMat, -0.22, -0.15, -0.22, 0.16, 0.55, 0.16, 0.15, 0, 0.2);
    part(head, boxGeo, hairMat, 0.22, -0.15, -0.22, 0.16, 0.55, 0.16, 0.15, 0, -0.2);
    // Bangs
    part(head, boxGeo, hairMat, -0.12, 0.2, 0.28, 0.14, 0.22, 0.08, 0.4);
    part(head, boxGeo, hairMat, 0.1, 0.18, 0.3, 0.16, 0.2, 0.08, 0.35);
    return;
  }

  if (style === 'broly') {
    // Wild legendary green mane
    part(head, sphereGeo, hairMat, 0, 0.22, -0.05, 0.42, 0.36, 0.42);
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const h = 0.45 + (i % 3) * 0.12;
      spike(Math.cos(a) * 0.22, 0.4 + (i % 2) * 0.1, Math.sin(a) * 0.18 - 0.05, 0.12, h, 0.12, -0.5 + (i % 3) * 0.1, Math.cos(a) * 0.4);
    }
    return;
  }

  if (style === 'android18') {
    // Blonde bob with side part
    part(head, sphereGeo, hairMat, 0, 0.14, -0.02, 0.4, 0.32, 0.4);
    part(head, boxGeo, hairMat, -0.34, 0.02, 0.05, 0.12, 0.42, 0.22);
    part(head, boxGeo, hairMat, 0.34, 0.02, 0.05, 0.12, 0.42, 0.22);
    part(head, boxGeo, hairMat, 0, 0.05, -0.28, 0.55, 0.4, 0.18);
    part(head, boxGeo, hairMat, 0.08, 0.2, 0.28, 0.28, 0.14, 0.1, 0.25);
    return;
  }

  if (style === 'android16') {
    // Flat green top
    part(head, boxGeo, hairMat, 0, 0.3, 0, 0.72, 0.14, 0.68);
    part(head, boxGeo, hairMat, 0, 0.18, -0.28, 0.65, 0.28, 0.16);
    part(head, boxGeo, hairMat, -0.3, 0.1, 0, 0.1, 0.35, 0.5);
    part(head, boxGeo, hairMat, 0.3, 0.1, 0, 0.1, 0.35, 0.5);
    return;
  }

  if (style === 'piccolo') {
    // Antennae only — green head is the "hair"
    part(head, cylGeo, hairMat, -0.14, 0.42, 0.05, 0.045, 0.38, 0.045, 0.25, 0, -0.2);
    part(head, cylGeo, hairMat, 0.14, 0.42, 0.05, 0.045, 0.38, 0.045, 0.25, 0, 0.2);
    return;
  }

  if (style === 'frieza') {
    // Smooth white dome + cheek ridges
    part(head, sphereGeo, hairMat, 0, 0.16, 0, 0.4, 0.38, 0.4);
    part(head, boxGeo, mat(0x7c3aed, { rough: 0.55 }), -0.28, 0.05, 0.1, 0.1, 0.22, 0.18);
    part(head, boxGeo, mat(0x7c3aed, { rough: 0.55 }), 0.28, 0.05, 0.1, 0.1, 0.22, 0.18);
    return;
  }

  if (style === 'cell') {
    // Perfect Cell helmet crest
    part(head, sphereGeo, hairMat, 0, 0.2, -0.05, 0.42, 0.36, 0.44);
    part(head, coneGeo, darkMat, 0, 0.48, -0.15, 0.18, 0.4, 0.18, -0.6);
    part(head, boxGeo, darkMat, 0, 0.22, 0.28, 0.35, 0.2, 0.12);
    // Spot accents
    const spot = mat(0x1a2e05, { rough: 0.8 });
    part(head, sphereGeo, spot, -0.22, 0.2, 0.15, 0.08, 0.08, 0.08);
    part(head, sphereGeo, spot, 0.2, 0.28, 0.05, 0.07, 0.07, 0.07);
    return;
  }

  if (style === 'buu') {
    // Antenna + pink scalp
    part(head, sphereGeo, hairMat, 0, 0.16, 0, 0.42, 0.38, 0.42);
    part(head, cylGeo, hairMat, 0, 0.5, -0.05, 0.07, 0.42, 0.07, 0.2);
    part(head, sphereGeo, hairMat, 0, 0.72, -0.08, 0.1, 0.1, 0.1);
    return;
  }

  if (style === 'krillin') {
    // Bald — forehead jieba dots
    const spot = mat(0x1c1917, { rough: 0.7 });
    const positions = [[-0.1, 0.22], [0.1, 0.22], [-0.14, 0.14], [0, 0.16], [0.14, 0.14], [0, 0.08]];
    for (const [x, y] of positions) part(head, sphereGeo, spot, x, y, 0.32, 0.035, 0.035, 0.02);
    return;
  }

  if (style === 'nezha') {
    part(head, sphereGeo, darkMat, 0, 0.16, -0.02, 0.36, 0.26, 0.36);
    part(head, sphereGeo, hairMat, -0.3, 0.28, 0, 0.16, 0.16, 0.16);
    part(head, sphereGeo, hairMat, 0.3, 0.28, 0, 0.16, 0.16, 0.16);
    part(head, cylGeo, mat(0xfbbf24, { rough: 0.4, metal: 0.4 }), -0.3, 0.42, 0, 0.04, 0.12, 0.04);
    part(head, cylGeo, mat(0xfbbf24, { rough: 0.4, metal: 0.4 }), 0.3, 0.42, 0, 0.04, 0.12, 0.04);
    return;
  }

  // Fallback soft spikes
  part(head, sphereGeo, hairMat, 0, 0.16, -0.04, 0.36, 0.26, 0.34);
  for (let i = 0; i < 5; i++) {
    const t = (i / 4) - 0.5;
    spike(t * 0.4, 0.4, 0, 0.1, 0.35, 0.1, -0.5, t * 0.4);
  }
}

/* ---------- Face ---------- */
function buildFace(head, v, s) {
  const skin = mat(v.skin);
  const eyeWhite = mat(0xfffef8, { rough: 0.35 });
  const iris = mat(v.eyeColor || 0x1e293b, { rough: 0.25 });
  const shine = mat(0xffffff, { rough: 0.1 });
  const brow = mat(v.hair === 0xf9a8d4 ? 0xbe185d : 0x1c1917, { rough: 0.8 });

  // Anime-proportion head (large but not full chibi)
  const headMesh = part(head, sphereGeo, skin, 0, 0.08, 0, 0.34 * s.head, 0.37 * s.head, 0.34 * s.head);

  if (v.kit === 'frieza') {
    // Bio-gem forehead
    part(head, sphereGeo, mat(0x7c3aed, { rough: 0.35, metal: 0.2, emissive: 0x7c3aed, glow: 0.35 }), 0, 0.28, 0.22, 0.1, 0.1, 0.08);
  }

  if (v.kit === 'buu') {
    // Black M mark
    part(head, boxGeo, mat(0x111827), 0, 0.28, 0.3, 0.22, 0.12, 0.04);
    part(head, boxGeo, mat(0x111827), 0, 0.2, 0.3, 0.08, 0.14, 0.04);
  }

  if (v.kit === 'piccolo' || v.kit === 'cell') {
    // Pointed ears
    part(head, coneGeo, skin, -0.38, 0.1, 0, 0.1, 0.22, 0.08, 0, 0, 1.1);
    part(head, coneGeo, skin, 0.38, 0.1, 0, 0.1, 0.22, 0.08, 0, 0, -1.1);
  }

  // Angular anime eyes (flattened + slightly tilted)
  const eyeY = 0.1;
  const eyeZ = 0.32;
  const eyeSpread = v.kit === 'krillin' ? 0.1 : 0.12;
  const eyeW = 0.1;
  const eyeH = 0.085;
  part(head, sphereGeo, eyeWhite, -eyeSpread, eyeY, eyeZ, eyeW, eyeH, 0.045, 0, 0, 0.18);
  part(head, sphereGeo, eyeWhite, eyeSpread, eyeY, eyeZ, eyeW, eyeH, 0.045, 0, 0, -0.18);
  part(head, sphereGeo, iris, -eyeSpread + 0.01, eyeY - 0.01, eyeZ + 0.035, 0.045, 0.055, 0.03);
  part(head, sphereGeo, iris, eyeSpread + 0.01, eyeY - 0.01, eyeZ + 0.035, 0.045, 0.055, 0.03);
  part(head, sphereGeo, shine, -eyeSpread - 0.02, eyeY + 0.025, eyeZ + 0.055, 0.018, 0.018, 0.012);
  part(head, sphereGeo, shine, eyeSpread - 0.02, eyeY + 0.025, eyeZ + 0.055, 0.018, 0.018, 0.012);

  // Thick DBZ-style brows
  if (v.kit !== 'frieza' && v.kit !== 'cell') {
    part(head, boxGeo, brow, -eyeSpread, eyeY + 0.11, eyeZ, 0.14, 0.035, 0.045, 0, 0, 0.35);
    part(head, boxGeo, brow, eyeSpread, eyeY + 0.11, eyeZ, 0.14, 0.035, 0.045, 0, 0, -0.35);
  }

  // Mouth
  if (v.kit !== 'krillin') {
    part(head, boxGeo, mat(0x7f1d1d, { rough: 0.6, toon: false }), 0, -0.04, 0.34, 0.09, 0.025, 0.03);
  } else {
    part(head, boxGeo, mat(0x7f1d1d, { rough: 0.6, toon: false }), 0, -0.05, 0.34, 0.07, 0.02, 0.025);
  }

  // Nose hint (skip Krillin / Frieza)
  if (v.kit !== 'krillin' && v.kit !== 'frieza') {
    part(head, sphereGeo, skin, 0, 0.01, 0.35, 0.035, 0.045, 0.04);
  }

  // Subtle head outline for anime silhouette
  addOutline(head, sphereGeo, 0, 0.08, 0, 0.34 * s.head, 0.37 * s.head, 0.34 * s.head, 1.045);

  buildHair(head, v.hair, v.hairStyle);
  return headMesh;
}

/* ---------- Outfit kits ---------- */
function buildOutfit(torso, hips, v, s) {
  const kit = v.kit || 'gi';
  const outfit = mat(v.outfit);
  const accent = mat(v.accent, { rough: 0.5 });
  const pants = mat(v.pants);
  const boots = mat(v.boots || 0x1a1a1a);
  const undershirt = mat(v.undershirt || v.accent, { rough: 0.7 });
  const metal = mat(v.armorMetal || 0xf5f5f4, { rough: 0.35, metal: 0.55 });
  const gold = mat(v.gold || 0xfbbf24, { rough: 0.4, metal: 0.45 });
  const w = 0.55 * s.torso * s.width;
  const h = 0.72 * s.torso;

  if (kit === 'gi') {
    // Blue undershirt peek
    part(torso, boxGeo, undershirt, 0, 0.38 * s.torso, 0, w * 0.92, h * 0.95, 0.28 * s.torso);
    // Orange gi top
    part(torso, boxGeo, outfit, 0, 0.36 * s.torso, 0, w, h, 0.34 * s.torso);
    // Open collar V
    part(torso, boxGeo, undershirt, 0, 0.58 * s.torso, 0.16 * s.torso, 0.22, 0.2, 0.06);
    // Black sash
    part(torso, boxGeo, mat(0x1c1917), 0, 0.05 * s.torso, 0, w * 1.05, 0.12, 0.38 * s.torso);
    // Pants
    part(hips, boxGeo, pants, 0, -0.08, 0, w * 0.95, 0.28, 0.32 * s.torso);
    return { wrist: undershirt, bootAccent: gold, sleeve: outfit };
  }

  if (kit === 'saiyanArmor') {
    const whiteArmor = mat(0xffffff, { rough: 0.35, metal: 0.25, toon: true });
    // Blue bodysuit
    part(torso, boxGeo, undershirt, 0, 0.35 * s.torso, 0, w * 0.9, h, 0.3 * s.torso);
    // Bright white chest armor
    part(torso, boxGeo, whiteArmor, 0, 0.44 * s.torso, 0.04, w * 1.12, 0.42 * s.torso, 0.38 * s.torso);
    // Gold belly plate with black seam lines
    part(torso, boxGeo, gold, 0, 0.2 * s.torso, 0.12, w * 0.75, 0.2, 0.22);
    part(torso, boxGeo, mat(0x1c1917, { toon: false }), 0, 0.2 * s.torso, 0.23, w * 0.55, 0.02, 0.02);
    // Shoulder pads
    part(torso, sphereGeo, whiteArmor, -0.4 * s.width, 0.6 * s.torso, 0, 0.17, 0.13, 0.15);
    part(torso, sphereGeo, whiteArmor, 0.4 * s.width, 0.6 * s.torso, 0, 0.17, 0.13, 0.15);
    part(hips, boxGeo, undershirt, 0, -0.06, 0, w * 0.85, 0.25, 0.28);
    return { wrist: mat(0xffffff), bootAccent: gold, sleeve: undershirt };
  }

  if (kit === 'namekian' || kit === 'trainee') {
    // Purple gi (Piccolo cape+turban; Gohan trainee omits turban)
    part(torso, boxGeo, outfit, 0, 0.34 * s.torso, 0, w, h, 0.32 * s.torso);
    part(torso, boxGeo, accent, 0, 0.62 * s.torso, 0.05, w * 1.05, 0.12, 0.36);
    part(torso, boxGeo, accent, 0, 0.02, 0, w * 1.05, 0.1, 0.36);
    if (kit === 'namekian') {
      part(torso, boxGeo, accent, 0, 0.25 * s.torso, -0.28, w * 1.3, 0.85 * s.torso, 0.08);
    }
    part(hips, boxGeo, outfit, 0, -0.08, 0, w * 0.9, 0.26, 0.3);
    return { wrist: outfit, bootAccent: accent, sleeve: outfit, turban: kit === 'namekian' };
  }

  if (kit === 'capsule') {
    // Black tank
    part(torso, boxGeo, mat(0x1c1917), 0, 0.38 * s.torso, 0, w * 0.85, h * 0.85, 0.28);
    // Blue denim vest/jacket
    part(torso, boxGeo, outfit, 0, 0.4 * s.torso, 0, w * 1.05, h * 0.7, 0.36);
    part(torso, boxGeo, outfit, -0.32 * s.width, 0.35, 0, 0.18, 0.55, 0.28);
    part(torso, boxGeo, outfit, 0.32 * s.width, 0.35, 0, 0.18, 0.55, 0.28);
    // Capsule Corp badge
    part(torso, sphereGeo, mat(0x38bdf8, { emissive: 0x38bdf8, glow: 0.4 }), 0.22, 0.5 * s.torso, 0.2, 0.06, 0.06, 0.04);
    // Yellow belt
    part(torso, boxGeo, gold, 0, 0.02, 0, w * 1.0, 0.1, 0.34);
    part(hips, boxGeo, pants, 0, -0.08, 0, w * 0.9, 0.26, 0.3);
    // Sword on back
    part(torso, boxGeo, mat(0x94a3b8, { metal: 0.8, rough: 0.25 }), 0.15, 0.35, -0.32, 0.06, 1.1, 0.06, 0.2);
    part(torso, boxGeo, mat(0x334155), 0.15, 0.85, -0.32, 0.1, 0.18, 0.1);
    return { wrist: mat(0x1c1917), bootAccent: gold, sleeve: mat(0x1c1917) };
  }

  if (kit === 'frieza') {
    part(torso, boxGeo, outfit, 0, 0.35 * s.torso, 0, w * 0.95, h * 0.95, 0.32);
    // Purple bio panels
    part(torso, boxGeo, accent, 0, 0.45 * s.torso, 0.16, w * 0.55, 0.35, 0.08);
    part(torso, sphereGeo, mat(0x7c3aed, { emissive: 0x7c3aed, glow: 0.45 }), 0, 0.5 * s.torso, 0.2, 0.1, 0.1, 0.08);
    part(hips, boxGeo, outfit, 0, -0.05, 0, w * 0.85, 0.22, 0.28);
    // Tail
    const tail = part(hips, cylGeo, outfit, 0, -0.1, -0.35, 0.07, 0.7, 0.07, 1.1);
    part(hips, sphereGeo, accent, 0, -0.35, -0.7, 0.1, 0.1, 0.1);
    return { wrist: outfit, bootAccent: accent, sleeve: outfit, tail };
  }

  if (kit === 'broly') {
    // Bare muscular chest
    part(torso, boxGeo, mat(v.skin), 0, 0.4 * s.torso, 0, w * 1.05, h * 0.9, 0.34);
    // Necklace beads
    for (let i = 0; i < 7; i++) {
      const a = (i / 6) * Math.PI - Math.PI / 2;
      part(torso, sphereGeo, gold, Math.cos(a) * 0.22, 0.62 * s.torso + Math.sin(a) * 0.08, 0.18, 0.05, 0.05, 0.05);
    }
    // Torn green pants
    part(hips, boxGeo, pants, 0, -0.1, 0, w * 1.0, 0.35, 0.34);
    part(torso, boxGeo, mat(0x1c1917), 0, 0.05, 0, w * 1.05, 0.1, 0.36);
    // Wrist bands later
    return { wrist: mat(0x1c1917), bootAccent: gold, sleeve: mat(v.skin), bareArms: true };
  }

  if (kit === 'android18') {
    // Black top
    part(torso, boxGeo, mat(0x1c1917), 0, 0.4 * s.torso, 0, w * 0.85, h * 0.7, 0.28);
    // Blue denim jacket
    part(torso, boxGeo, outfit, 0, 0.42 * s.torso, 0, w * 1.08, h * 0.65, 0.36);
    part(torso, boxGeo, outfit, -0.34 * s.width, 0.38, 0, 0.2, 0.5, 0.3);
    part(torso, boxGeo, outfit, 0.34 * s.width, 0.38, 0, 0.2, 0.5, 0.3);
    // Orange belt
    part(torso, boxGeo, accent, 0, 0.08, 0, w * 1.0, 0.1, 0.34);
    part(torso, boxGeo, gold, 0, 0.08, 0.18, 0.1, 0.08, 0.04);
    part(hips, boxGeo, pants, 0, -0.08, 0, w * 0.9, 0.26, 0.3);
    return { wrist: mat(0xf8fafc), bootAccent: accent, sleeve: outfit, bandage: true };
  }

  if (kit === 'cell') {
    part(torso, boxGeo, outfit, 0, 0.36 * s.torso, 0, w, h, 0.34);
    // Black segments / spots
    const spot = mat(0x14532d);
    part(torso, boxGeo, spot, 0, 0.5 * s.torso, 0.16, w * 0.7, 0.2, 0.06);
    part(torso, sphereGeo, spot, -0.2, 0.3, 0.18, 0.08, 0.08, 0.05);
    part(torso, sphereGeo, spot, 0.18, 0.35, 0.18, 0.07, 0.07, 0.05);
    // Wings (decorative)
    part(torso, boxGeo, mat(0x1a2e05, { opacity: 0.85 }), -0.55, 0.4, -0.2, 0.45, 0.55, 0.04, 0.2, 0, 0.4);
    part(torso, boxGeo, mat(0x1a2e05, { opacity: 0.85 }), 0.55, 0.4, -0.2, 0.45, 0.55, 0.04, 0.2, 0, -0.4);
    part(hips, boxGeo, outfit, 0, -0.08, 0, w * 0.9, 0.26, 0.3);
    return { wrist: outfit, bootAccent: accent, sleeve: outfit };
  }

  if (kit === 'buu') {
    part(torso, boxGeo, mat(v.skin), 0, 0.35 * s.torso, 0, w * 1.15, h * 0.95, 0.4);
    // White vest
    part(torso, boxGeo, outfit, 0, 0.32 * s.torso, 0.05, w * 1.05, h * 0.7, 0.28);
    // Yellow cape
    part(torso, boxGeo, accent, 0, 0.3, -0.3, w * 1.25, 0.8, 0.08);
    part(hips, boxGeo, outfit, 0, -0.1, 0, w * 1.05, 0.3, 0.36);
    return { wrist: mat(v.skin), bootAccent: accent, sleeve: mat(v.skin), bareArms: true };
  }

  if (kit === 'android16') {
    // Green vest / armor
    part(torso, boxGeo, outfit, 0, 0.36 * s.torso, 0, w * 1.1, h, 0.36);
    part(torso, boxGeo, accent, 0, 0.45 * s.torso, 0.18, 0.2, 0.25, 0.06);
    // Red chest gem
    part(torso, sphereGeo, mat(0xef4444, { emissive: 0xef4444, glow: 0.5 }), 0, 0.48 * s.torso, 0.22, 0.08, 0.08, 0.06);
    part(hips, boxGeo, pants, 0, -0.08, 0, w * 0.95, 0.28, 0.32);
    return { wrist: mat(0x1c1917), bootAccent: accent, sleeve: outfit };
  }

  if (kit === 'nezha') {
    part(torso, boxGeo, outfit, 0, 0.36 * s.torso, 0, w, h * 0.85, 0.32);
    part(torso, boxGeo, gold, 0, 0.55 * s.torso, 0.1, w * 0.9, 0.12, 0.3);
    part(torso, boxGeo, gold, 0, 0.05, 0, w * 1.0, 0.1, 0.34);
    // Fire wheels (decorative)
    part(torso, cylGeo, mat(0xff7043, { emissive: 0xff5722, glow: 0.6 }), -0.55, 0.2, 0, 0.28, 0.06, 0.28, 0, 0, Math.PI / 2);
    part(torso, cylGeo, mat(0xff7043, { emissive: 0xff5722, glow: 0.6 }), 0.55, 0.2, 0, 0.28, 0.06, 0.28, 0, 0, Math.PI / 2);
    part(hips, boxGeo, pants, 0, -0.08, 0, w * 0.9, 0.24, 0.3);
    return { wrist: gold, bootAccent: gold, sleeve: outfit };
  }

  // Default athletic
  part(torso, boxGeo, outfit, 0, 0.35 * s.torso, 0, w, h, 0.32);
  part(torso, boxGeo, accent, 0, 0.5 * s.torso, 0.16, 0.25, 0.16, 0.05);
  part(hips, boxGeo, pants, 0, -0.08, 0, w * 0.9, 0.26, 0.3);
  return { wrist: accent, bootAccent: boots, sleeve: outfit };
}

/**
 * Builds a rigged cartoon fighter. Returns { root, bones, setFacing, animate, dispose }.
 */
export function buildFighterModel(fighterDef) {
  const v = fighterDef.visual;
  const s = buildScale(v.build);
  const root = new THREE.Group();
  root.name = fighterDef.id;

  const skin = mat(v.skin);
  const boots = mat(v.boots || 0x1a1a1a);
  const heightScale = v.height / 1.72;

  const hips = new THREE.Group();
  hips.position.y = 0.95 * heightScale;
  root.add(hips);
  root.scale.setScalar(1.28);

  const torso = new THREE.Group();
  torso.position.y = 0.28 * s.torso;
  hips.add(torso);

  const kitParts = buildOutfit(torso, hips, v, s);

  const head = new THREE.Group();
  head.position.y = 0.82 * s.torso;
  torso.add(head);
  buildFace(head, v, s);

  if (kitParts.turban) {
    part(head, cylGeo, mat(v.accent || 0xf8fafc, { rough: 0.65 }), 0, 0.32, 0, 0.38, 0.22, 0.38);
    part(head, boxGeo, mat(v.accent || 0xf8fafc), 0, 0.22, 0.3, 0.12, 0.08, 0.2);
  }

  const makeArm = (side) => {
    const shoulder = new THREE.Group();
    shoulder.position.set(side * 0.4 * s.torso * s.width, 0.55 * s.torso, 0);
    torso.add(shoulder);
    const upper = new THREE.Group();
    shoulder.add(upper);
    const sleeveMat = kitParts.bareArms ? skin : (kitParts.sleeve || mat(v.outfit));
    part(upper, cylGeo, sleeveMat, 0, -0.22 * s.limb, 0, 0.11 * s.limb, 0.44 * s.limb, 0.11 * s.limb);
    const elbow = new THREE.Group();
    elbow.position.y = -0.46 * s.limb;
    upper.add(elbow);
    part(elbow, cylGeo, skin, 0, -0.18 * s.limb, 0, 0.095 * s.limb, 0.36 * s.limb, 0.095 * s.limb);
    // Wristband / glove
    part(elbow, cylGeo, kitParts.wrist || mat(v.accent), 0, -0.32 * s.limb, 0, 0.11 * s.limb, 0.1, 0.11 * s.limb);
    if (kitParts.bandage && side < 0) {
      part(elbow, cylGeo, mat(0xf8fafc), 0, -0.1 * s.limb, 0, 0.12, 0.28, 0.12);
    }
    part(elbow, sphereGeo, skin, 0, -0.4 * s.limb, 0, 0.11, 0.11, 0.13);
    return { shoulder, upper, elbow };
  };

  const makeLeg = (side) => {
    const hip = new THREE.Group();
    hip.position.set(side * 0.15 * s.torso * s.width, -0.05, 0);
    hips.add(hip);
    const thigh = new THREE.Group();
    hip.add(thigh);
    part(thigh, cylGeo, mat(v.pants), 0, -0.28 * s.limb, 0, 0.14 * s.limb, 0.5 * s.limb, 0.14 * s.limb);
    const knee = new THREE.Group();
    knee.position.y = -0.52 * s.limb;
    thigh.add(knee);
    part(knee, cylGeo, mat(v.pants), 0, -0.18 * s.limb, 0, 0.12 * s.limb, 0.36 * s.limb, 0.12 * s.limb);
    // Boots with accent stripe
    part(knee, boxGeo, boots, 0, -0.42 * s.limb, 0.04, 0.17, 0.22, 0.28);
    part(knee, boxGeo, kitParts.bootAccent || boots, 0, -0.48 * s.limb, 0.12, 0.18, 0.08, 0.2);
    return { hip, thigh, knee };
  };

  const leftArm = makeArm(-1);
  const rightArm = makeArm(1);
  const leftLeg = makeLeg(-1);
  const rightLeg = makeLeg(1);

  const aura = new THREE.Mesh(
    new THREE.SphereGeometry(0.75, 16, 12),
    new THREE.MeshBasicMaterial({
      color: v.aura, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending
    })
  );
  aura.scale.set(1.15, 1.7, 1.15);
  aura.position.y = 1.15;
  root.add(aura);

  const bones = { hips, torso, head, leftArm, rightArm, leftLeg, rightLeg, aura };
  let facing = 1;
  let anim = 'idle';
  let animT = 0;

  function setFacing(dir) {
    facing = dir >= 0 ? 1 : -1;
    root.rotation.y = facing >= 0 ? Math.PI / 2 : -Math.PI / 2;
  }

  function setAnim(name) {
    if (anim !== name) {
      anim = name;
      animT = 0;
    }
  }

  function animate(dt, state = {}) {
    animT += dt;
    const t = animT;
    const moving = !!state.moving;
    const airborne = !!state.airborne;
    const guarding = !!state.guarding;
    const attack = state.attack || null;
    const hurt = !!state.hurt;
    const charging = !!state.charging;

    const damp = (obj, prop, target, rate = 12) => {
      obj[prop] += (target - obj[prop]) * Math.min(1, rate * dt);
    };

    damp(leftArm.upper.rotation, 'x', 0);
    damp(rightArm.upper.rotation, 'x', 0);
    damp(leftArm.elbow.rotation, 'x', 0.15);
    damp(rightArm.elbow.rotation, 'x', 0.15);
    damp(leftLeg.thigh.rotation, 'x', 0);
    damp(rightLeg.thigh.rotation, 'x', 0);
    damp(torso.rotation, 'x', 0);
    damp(torso.rotation, 'z', 0);
    damp(hips.position, 'y', 0.95 * heightScale);

    if (hurt) {
      torso.rotation.x = -0.35;
      leftArm.upper.rotation.x = -0.8;
      rightArm.upper.rotation.x = -0.8;
    } else if (guarding) {
      leftArm.upper.rotation.x = -1.4;
      rightArm.upper.rotation.x = -1.4;
      leftArm.elbow.rotation.x = -1.1;
      rightArm.elbow.rotation.x = -1.1;
      torso.rotation.x = 0.15;
    } else if (attack === 'punch' || attack === 'uppercut') {
      const lead = facing > 0 ? rightArm : leftArm;
      const other = facing > 0 ? leftArm : rightArm;
      const phase = Math.min(1, t / 0.18);
      lead.upper.rotation.x = -1.6 * phase;
      lead.elbow.rotation.x = -0.2;
      other.upper.rotation.x = -0.4;
      if (attack === 'uppercut') {
        lead.upper.rotation.x = -2.2 * phase;
        torso.rotation.x = -0.25 * phase;
        hips.position.y += 0.08 * phase;
      }
    } else if (attack === 'kick' || attack === 'dash') {
      const lead = facing > 0 ? rightLeg : leftLeg;
      const phase = Math.min(1, t / 0.2);
      lead.thigh.rotation.x = -1.4 * phase;
      torso.rotation.x = 0.2;
      if (attack === 'dash') torso.rotation.x = 0.45;
    } else if (charging) {
      leftArm.upper.rotation.x = -1.1;
      rightArm.upper.rotation.x = -1.1;
      leftArm.elbow.rotation.x = -0.8;
      rightArm.elbow.rotation.x = -0.8;
      torso.rotation.z = Math.sin(t * 18) * 0.04;
      aura.material.opacity = 0.35 + Math.sin(t * 12) * 0.15;
      aura.scale.setScalar(1.05 + Math.sin(t * 8) * 0.08);
    } else if (airborne) {
      leftArm.upper.rotation.x = -0.6;
      rightArm.upper.rotation.x = -0.6;
      leftLeg.thigh.rotation.x = 0.4;
      rightLeg.thigh.rotation.x = -0.3;
    } else if (moving) {
      const swing = Math.sin(t * 10) * 0.55;
      leftArm.upper.rotation.x = swing;
      rightArm.upper.rotation.x = -swing;
      leftLeg.thigh.rotation.x = -swing;
      rightLeg.thigh.rotation.x = swing;
      hips.position.y = 0.95 * heightScale + Math.abs(Math.sin(t * 10)) * 0.04;
    } else {
      const breath = Math.sin(t * 2.2) * 0.02;
      torso.position.y = 0.28 * s.torso + breath;
      leftArm.upper.rotation.x = 0.08 + breath;
      rightArm.upper.rotation.x = 0.08 - breath;
    }

    if (!charging) {
      aura.material.opacity += ((state.aura || 0) - aura.material.opacity) * Math.min(1, 6 * dt);
    }
  }

  function dispose() {
    root.traverse((obj) => {
      if (obj.isMesh) {
        if (obj.geometry && ![boxGeo, sphereGeo, cylGeo, coneGeo].includes(obj.geometry)) {
          obj.geometry.dispose();
        }
      }
    });
  }

  return { root, bones, setFacing, setAnim, animate, dispose, height: v.height };
}
