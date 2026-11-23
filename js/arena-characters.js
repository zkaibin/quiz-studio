// Procedural anime fighters for Arena Clash.
// UV-mapped faces on the head sphere, lathed torsos, cel shading, ink outlines.
// Inspired by Dragon Ball silhouettes — not traced from official art.
import * as THREE from './vendor/three/three.module.min.js';

/* ---------- Cel materials ---------- */
let toonGradient = null;
function getToonGradient() {
  if (toonGradient) return toonGradient;
  if (typeof document !== 'undefined') {
    const canvas = document.createElement('canvas');
    canvas.width = 3;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    [['#2f2f2f', 0], ['#8e8e8e', 1], ['#ffffff', 2]].forEach(([c, i]) => {
      ctx.fillStyle = c;
      ctx.fillRect(i, 0, 1, 1);
    });
    toonGradient = new THREE.CanvasTexture(canvas);
  } else {
    toonGradient = new THREE.DataTexture(new Uint8Array([47, 47, 47, 255, 142, 142, 142, 255, 255, 255, 255, 255]), 3, 1);
  }
  toonGradient.minFilter = THREE.NearestFilter;
  toonGradient.magFilter = THREE.NearestFilter;
  toonGradient.needsUpdate = true;
  return toonGradient;
}

const matCache = new Map();
function mat(color, { emissive = 0x000000, glow = 0, opacity = 1, toon = true, map = null, flat = false } = {}) {
  const key = `${color}|${emissive}|${glow}|${opacity}|${toon}|${flat}|${map ? map.uuid : ''}`;
  if (!matCache.has(key)) {
    if (flat || (opacity < 1 && !map)) {
      matCache.set(key, new THREE.MeshBasicMaterial({
        color, map, transparent: opacity < 1, opacity, depthWrite: opacity >= 1
      }));
    } else if (toon && glow <= 0) {
      matCache.set(key, new THREE.MeshToonMaterial({
        color: map ? 0xffffff : color,
        map,
        gradientMap: getToonGradient(),
        emissive,
        emissiveIntensity: glow || 0
      }));
    } else {
      matCache.set(key, new THREE.MeshStandardMaterial({
        color: map ? 0xffffff : color,
        map,
        roughness: 0.5,
        metalness: 0.05,
        emissive,
        emissiveIntensity: glow,
        transparent: opacity < 1,
        opacity
      }));
    }
  }
  return matCache.get(key);
}

const outlineMat = new THREE.MeshBasicMaterial({ color: 0x100c0a, side: THREE.BackSide });

const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const sphereGeo = new THREE.SphereGeometry(1, 24, 18);
const cylGeo = new THREE.CylinderGeometry(1, 1, 1, 16);
const coneGeo = new THREE.ConeGeometry(1, 1, 12);
const capsuleGeo = new THREE.CapsuleGeometry(0.5, 1, 5, 12);

function part(parent, geo, material, x, y, z, sx, sy, sz, rx = 0, ry = 0, rz = 0, { outline = false, outlinePad = 1.06 } = {}) {
  const mesh = new THREE.Mesh(geo, material);
  mesh.position.set(x, y, z);
  mesh.scale.set(sx, sy, sz);
  mesh.rotation.set(rx, ry, rz);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  if (outline) {
    const o = new THREE.Mesh(geo, outlineMat);
    o.position.copy(mesh.position);
    o.rotation.copy(mesh.rotation);
    o.scale.set(sx * outlinePad, sy * outlinePad, sz * outlinePad);
    parent.add(o);
  }
  return mesh;
}

function buildScale(build) {
  if (build === 'bulky') return { torso: 1.18, limb: 1.12, head: 0.98, width: 1.16 };
  if (build === 'tall') return { torso: 1.1, limb: 1.12, head: 0.94, width: 1.04 };
  if (build === 'compact') return { torso: 0.9, limb: 0.88, head: 1.12, width: 0.94 };
  if (build === 'round') return { torso: 1.28, limb: 0.94, head: 1.2, width: 1.24 };
  return { torso: 1, limb: 1, head: 1, width: 1 };
}

function cssHex(hex) {
  return `#${(hex >>> 0).toString(16).padStart(6, '0')}`;
}

function hairHighlight(hex) {
  const r = (hex >> 16) & 255;
  const g = (hex >> 8) & 255;
  const b = hex & 255;
  const lum = (r + g + b) / 3;
  if (lum < 50) return 0x2c3340;
  if (lum < 120) return lighten(hex, 0.2);
  return lighten(hex, 0.14);
}

function lighten(hex, amount) {
  const r = Math.min(255, ((hex >> 16) & 255) + Math.round(255 * amount));
  const g = Math.min(255, ((hex >> 8) & 255) + Math.round(255 * amount));
  const b = Math.min(255, (hex & 255) + Math.round(255 * amount));
  return (r << 16) | (g << 8) | b;
}

/* ---------- Sphere UV face map ---------- */
// Three.js SphereGeometry: u=0 → -X, u=0.25 → +Z (face), u=0.5 → +X, u=0.75 → -Z
const headTexCache = new Map();
function makeHeadTexture(v) {
  const key = `${v.kit}|${v.skin}|${v.hair}|${v.eyeColor}|${v.hairStyle}`;
  if (headTexCache.has(key)) return headTexCache.get(key);
  if (typeof document === 'undefined') return null;

  const W = 1024;
  const H = 512;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  const skin = cssHex(v.skin);
  const eye = cssHex(v.eyeColor || 0x1e293b);
  const brow = v.kit === 'buu' ? '#9f1239' : '#1a1410';

  // Full head skin
  ctx.fillStyle = skin;
  ctx.fillRect(0, 0, W, H);

  // Soft top-of-head shadow (hair line area)
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  ctx.fillRect(0, 0, W, H * 0.28);

  // Face center on +Z → u=0.25
  const cx = W * 0.25;
  const cy = H * 0.52;

  // Cheek blush
  ctx.fillStyle = 'rgba(255,110,110,0.22)';
  ctx.beginPath(); ctx.ellipse(cx - 58, cy + 28, 28, 16, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx + 58, cy + 28, 28, 16, 0, 0, Math.PI * 2); ctx.fill();

  const drawEye = (ex, flip) => {
    // White sclera — large anime eyes
    ctx.fillStyle = '#fffef8';
    ctx.beginPath();
    ctx.ellipse(ex, cy - 8, 34, 40, flip * 0.1, 0, Math.PI * 2);
    ctx.fill();
    // Iris
    ctx.fillStyle = eye;
    ctx.beginPath();
    ctx.ellipse(ex + flip * 3, cy - 4, 20, 26, 0, 0, Math.PI * 2);
    ctx.fill();
    // Pupil
    ctx.fillStyle = '#070707';
    ctx.beginPath();
    ctx.ellipse(ex + flip * 3, cy - 2, 9, 13, 0, 0, Math.PI * 2);
    ctx.fill();
    // Speculars
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.ellipse(ex - 8, cy - 18, 8, 9, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(ex + 10, cy + 4, 4, 5, 0, 0, Math.PI * 2); ctx.fill();
    // Upper lid ink
    ctx.strokeStyle = '#140e0c';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.ellipse(ex, cy - 8, 34, 40, flip * 0.1, Math.PI * 1.05, Math.PI * 1.95);
    ctx.stroke();
    // Lower lash hint
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(ex, cy - 8, 34, 40, flip * 0.1, 0.15, Math.PI - 0.15);
    ctx.stroke();
  };

  if (v.kit === 'frieza') {
    ctx.fillStyle = '#fffef8';
    ctx.beginPath(); ctx.ellipse(cx - 40, cy - 6, 26, 16, 0.1, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx + 40, cy - 6, 26, 16, -0.1, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#4c1d95';
    ctx.beginPath(); ctx.ellipse(cx - 40, cy - 6, 11, 11, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx + 40, cy - 6, 11, 11, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#7c3aed';
    ctx.beginPath(); ctx.ellipse(cx, cy - 70, 18, 16, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#e9d5ff';
    ctx.beginPath(); ctx.ellipse(cx - 4, cy - 74, 5, 5, 0, 0, Math.PI * 2); ctx.fill();
  } else if (v.kit === 'cell') {
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath(); ctx.ellipse(cx - 38, cy - 6, 28, 20, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx + 38, cy - 6, 28, 20, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0a0a0a';
    ctx.beginPath(); ctx.ellipse(cx - 38, cy - 6, 8, 10, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx + 38, cy - 6, 8, 10, 0, 0, Math.PI * 2); ctx.fill();
  } else {
    drawEye(cx - 42, -1);
    drawEye(cx + 42, 1);
  }

  // Thick DBZ brows
  if (v.kit !== 'frieza' && v.kit !== 'cell') {
    ctx.strokeStyle = brow;
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - 78, cy - 52);
    ctx.quadraticCurveTo(cx - 42, cy - 68, cx - 12, cy - 54);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + 78, cy - 52);
    ctx.quadraticCurveTo(cx + 42, cy - 68, cx + 12, cy - 54);
    ctx.stroke();
  }

  if (v.kit === 'buu') {
    ctx.fillStyle = '#111827';
    ctx.fillRect(cx - 36, cy - 95, 72, 22);
    ctx.fillRect(cx - 12, cy - 95, 24, 52);
  }

  if (v.kit === 'krillin') {
    ctx.fillStyle = '#1c1917';
    [[-36, -78], [0, -86], [36, -78], [-22, -62], [22, -62], [0, -50]].forEach(([dx, dy]) => {
      ctx.beginPath();
      ctx.arc(cx + dx, cy + dy, 6, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Nose
  if (v.kit !== 'krillin' && v.kit !== 'frieza') {
    ctx.strokeStyle = 'rgba(70,35,25,0.5)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cx, cy + 8);
    ctx.quadraticCurveTo(cx + 10, cy + 28, cx, cy + 40);
    ctx.stroke();
  }

  // Mouth — confident anime curve
  ctx.strokeStyle = '#7f1d1d';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx - 22, cy + 62);
  ctx.quadraticCurveTo(cx, cy + 76, cx + 22, cy + 62);
  ctx.stroke();

  // Ear hints on sides (u≈0 and u≈0.5) — subtle
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.beginPath(); ctx.ellipse(W * 0.02, cy, 18, 28, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(W * 0.48, cy, 18, 28, 0, 0, Math.PI * 2); ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  headTexCache.set(key, tex);
  return tex;
}

/* ---------- Lathed anime torso ---------- */
function makeTorsoGeo(width, height, depthScale = 1) {
  const pts = [];
  const steps = 10;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // y from hips (0) to shoulders (1)
    const y = t * height;
    // hourglass: wide chest, narrow waist, wider hips
    const chest = 0.55 + 0.45 * Math.sin(t * Math.PI * 0.85);
    const waist = 1 - 0.22 * Math.exp(-Math.pow((t - 0.35) * 4, 2));
    const r = width * 0.5 * chest * waist;
    pts.push(new THREE.Vector2(r, y));
  }
  const geo = new THREE.LatheGeometry(pts, 20);
  geo.scale(1, 1, depthScale);
  geo.computeVertexNormals();
  return geo;
}

/* ---------- Hair ---------- */
function buildHair(head, color, style) {
  const hairMat = mat(color);
  const hi = mat(hairHighlight(color));
  const darkMat = mat(0x0a0908);

  const spike = (x, y, z, sx, sy, sz, rx = 0, rz = 0, highlight = false) => {
    part(head, coneGeo, highlight ? hi : hairMat, x, y, z, sx, sy, sz, rx, 0, rz, { outline: true, outlinePad: 1.08 });
  };

  if (style === 'goku') {
    part(head, sphereGeo, hairMat, 0, 0.22, -0.08, 0.42, 0.32, 0.4, 0, 0, 0, { outline: true });
    const tips = [
      [0, 0.62, 0.08, 0.16, 0.62, 0.16, -0.28, 0, true],
      [-0.22, 0.54, 0.12, 0.14, 0.5, 0.14, -0.4, -0.4],
      [0.24, 0.56, 0.1, 0.14, 0.54, 0.14, -0.36, 0.35, true],
      [-0.36, 0.42, 0.02, 0.13, 0.44, 0.13, -0.55, -0.6],
      [0.38, 0.44, 0, 0.13, 0.46, 0.13, -0.5, 0.58],
      [-0.1, 0.5, -0.1, 0.12, 0.4, 0.12, -0.7, -0.15],
      [0.12, 0.52, -0.12, 0.12, 0.42, 0.12, -0.75, 0.15],
      [0, 0.48, -0.28, 0.18, 0.58, 0.18, -1.08, 0, true],
      [-0.16, 0.4, -0.24, 0.12, 0.4, 0.12, -0.95, -0.3],
      [0.18, 0.42, -0.26, 0.12, 0.42, 0.12, -1.0, 0.3]
    ];
    for (const t of tips) spike(t[0], t[1], t[2], t[3], t[4], t[5], t[6] || 0, t[7] || 0, !!t[8]);
    return;
  }

  if (style === 'vegeta') {
    part(head, sphereGeo, hairMat, 0, 0.24, -0.1, 0.4, 0.32, 0.38, 0, 0, 0, { outline: true });
    part(head, coneGeo, hairMat, 0, 0.26, 0.26, 0.15, 0.28, 0.13, 0.95, 0, 0, { outline: true });
    [
      [0, 0.66, -0.02, 0.14, 0.56, 0.14, -0.1, 0, true],
      [-0.14, 0.58, 0.02, 0.12, 0.48, 0.12, -0.16, -0.25],
      [0.14, 0.58, 0.02, 0.12, 0.48, 0.12, -0.16, 0.25],
      [-0.26, 0.46, -0.1, 0.11, 0.4, 0.11, -0.5, -0.45],
      [0.26, 0.46, -0.1, 0.11, 0.4, 0.11, -0.5, 0.45],
      [0, 0.44, -0.32, 0.16, 0.46, 0.16, -1.08, 0, true],
      [-0.1, 0.5, -0.2, 0.1, 0.34, 0.1, -0.85, -0.2],
      [0.1, 0.5, -0.2, 0.1, 0.34, 0.1, -0.85, 0.2]
    ].forEach((t) => spike(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], !!t[8]));
    return;
  }

  if (style === 'gohan') {
    part(head, sphereGeo, hairMat, 0, 0.2, -0.05, 0.4, 0.3, 0.38, 0, 0, 0, { outline: true });
    for (let i = 0; i < 7; i++) {
      const t = (i / 6) - 0.5;
      spike(t * 0.44, 0.44 + Math.abs(t) * 0.08, 0.05 - Math.abs(t) * 0.05, 0.12, 0.38, 0.12, -0.4, t * 0.55, i === 3);
    }
    spike(0, 0.42, -0.26, 0.14, 0.42, 0.14, -0.98);
    return;
  }

  if (style === 'trunks') {
    part(head, sphereGeo, hairMat, 0, 0.22, -0.02, 0.42, 0.32, 0.42, 0, 0, 0, { outline: true });
    part(head, boxGeo, hairMat, 0, 0, -0.34, 0.46, 0.82, 0.24, 0.12, 0, 0, { outline: true });
    part(head, boxGeo, hairMat, -0.26, -0.1, -0.26, 0.2, 0.68, 0.2, 0.18, 0, 0.18, { outline: true });
    part(head, boxGeo, hairMat, 0.26, -0.1, -0.26, 0.2, 0.68, 0.2, 0.18, 0, -0.18, { outline: true });
    part(head, boxGeo, hi, -0.14, 0.24, 0.32, 0.18, 0.26, 0.09, 0.4);
    part(head, boxGeo, hi, 0.14, 0.22, 0.34, 0.2, 0.24, 0.09, 0.32);
    return;
  }

  if (style === 'broly') {
    part(head, sphereGeo, hairMat, 0, 0.26, -0.06, 0.46, 0.4, 0.46, 0, 0, 0, { outline: true });
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      spike(Math.cos(a) * 0.26, 0.46 + (i % 2) * 0.14, Math.sin(a) * 0.22 - 0.04, 0.14, 0.55 + (i % 3) * 0.12, 0.14, -0.42, Math.cos(a) * 0.4, i % 3 === 0);
    }
    return;
  }

  if (style === 'android18') {
    part(head, sphereGeo, hairMat, 0, 0.18, -0.02, 0.44, 0.36, 0.44, 0, 0, 0, { outline: true });
    part(head, boxGeo, hairMat, -0.38, 0.05, 0.05, 0.15, 0.5, 0.26, 0, 0, 0, { outline: true });
    part(head, boxGeo, hairMat, 0.38, 0.05, 0.05, 0.15, 0.5, 0.26, 0, 0, 0, { outline: true });
    part(head, boxGeo, hairMat, 0, 0.08, -0.32, 0.62, 0.46, 0.22, 0, 0, 0, { outline: true });
    part(head, boxGeo, hi, 0.1, 0.24, 0.32, 0.32, 0.15, 0.1, 0.22);
    return;
  }

  if (style === 'android16') {
    part(head, boxGeo, hairMat, 0, 0.34, 0, 0.76, 0.18, 0.72, 0, 0, 0, { outline: true });
    part(head, boxGeo, hairMat, 0, 0.22, -0.32, 0.7, 0.34, 0.2, 0, 0, 0, { outline: true });
    part(head, boxGeo, hairMat, -0.34, 0.14, 0, 0.14, 0.42, 0.56, 0, 0, 0, { outline: true });
    part(head, boxGeo, hairMat, 0.34, 0.14, 0, 0.14, 0.42, 0.56, 0, 0, 0, { outline: true });
    return;
  }

  if (style === 'piccolo') {
    part(head, cylGeo, hairMat, -0.16, 0.46, 0.08, 0.055, 0.46, 0.055, 0.3, 0, -0.25, { outline: true });
    part(head, cylGeo, hairMat, 0.16, 0.46, 0.08, 0.055, 0.46, 0.055, 0.3, 0, 0.25, { outline: true });
    return;
  }

  if (style === 'frieza') {
    part(head, sphereGeo, hairMat, 0, 0.2, 0, 0.44, 0.42, 0.44, 0, 0, 0, { outline: true });
    part(head, boxGeo, mat(0x7c3aed), -0.32, 0.08, 0.14, 0.14, 0.28, 0.22, 0, 0, 0, { outline: true });
    part(head, boxGeo, mat(0x7c3aed), 0.32, 0.08, 0.14, 0.14, 0.28, 0.22, 0, 0, 0, { outline: true });
    return;
  }

  if (style === 'cell') {
    part(head, sphereGeo, hairMat, 0, 0.24, -0.05, 0.46, 0.4, 0.48, 0, 0, 0, { outline: true });
    part(head, coneGeo, darkMat, 0, 0.56, -0.18, 0.22, 0.5, 0.22, -0.55, 0, 0, { outline: true });
    part(head, boxGeo, darkMat, 0, 0.26, 0.32, 0.4, 0.24, 0.16, 0, 0, 0, { outline: true });
    const spot = mat(0x1a2e05);
    part(head, sphereGeo, spot, -0.26, 0.24, 0.18, 0.1, 0.1, 0.1);
    part(head, sphereGeo, spot, 0.24, 0.32, 0.08, 0.09, 0.09, 0.09);
    return;
  }

  if (style === 'buu') {
    part(head, sphereGeo, hairMat, 0, 0.2, 0, 0.46, 0.42, 0.46, 0, 0, 0, { outline: true });
    part(head, cylGeo, hairMat, 0, 0.56, -0.06, 0.09, 0.5, 0.09, 0.24, 0, 0, { outline: true });
    part(head, sphereGeo, hairMat, 0, 0.82, -0.1, 0.12, 0.12, 0.12, 0, 0, 0, { outline: true });
    return;
  }

  if (style === 'krillin') return;

  if (style === 'nezha') {
    part(head, sphereGeo, darkMat, 0, 0.2, -0.02, 0.4, 0.3, 0.4, 0, 0, 0, { outline: true });
    part(head, sphereGeo, hairMat, -0.34, 0.32, 0, 0.18, 0.18, 0.18, 0, 0, 0, { outline: true });
    part(head, sphereGeo, hairMat, 0.34, 0.32, 0, 0.18, 0.18, 0.18, 0, 0, 0, { outline: true });
    part(head, cylGeo, mat(0xfbbf24), -0.34, 0.48, 0, 0.05, 0.16, 0.05);
    part(head, cylGeo, mat(0xfbbf24), 0.34, 0.48, 0, 0.05, 0.16, 0.05);
    return;
  }

  part(head, sphereGeo, hairMat, 0, 0.2, -0.05, 0.4, 0.3, 0.38, 0, 0, 0, { outline: true });
  for (let i = 0; i < 5; i++) {
    const t = (i / 4) - 0.5;
    spike(t * 0.42, 0.44, 0, 0.12, 0.38, 0.12, -0.5, t * 0.45);
  }
}

/* ---------- Face / head ---------- */
function buildFace(head, v, s) {
  const headTex = makeHeadTexture(v);
  const headMat = mat(v.skin, { map: headTex, toon: true });
  part(head, sphereGeo, headMat, 0, 0.1, 0, 0.38 * s.head, 0.42 * s.head, 0.38 * s.head, 0, 0, 0, {
    outline: true,
    outlinePad: 1.055
  });

  if (v.kit === 'piccolo' || v.kit === 'cell') {
    part(head, coneGeo, mat(v.skin), -0.42, 0.1, 0.04, 0.12, 0.26, 0.1, 0, 0, 1.2, { outline: true });
    part(head, coneGeo, mat(v.skin), 0.42, 0.1, 0.04, 0.12, 0.26, 0.1, 0, 0, -1.2, { outline: true });
  }

  buildHair(head, v.hair, v.hairStyle);
}

/* ---------- Outfits ---------- */
/** Approximate lathe radius at normalized height t∈[0,1] for a given half-width. */
function latheRadiusAt(halfWidth, t) {
  const chest = 0.55 + 0.45 * Math.sin(t * Math.PI * 0.85);
  const waist = 1 - 0.22 * Math.exp(-Math.pow((t - 0.35) * 4, 2));
  return halfWidth * chest * waist;
}

function buildOutfit(torso, hips, v, s) {
  const kit = v.kit || 'gi';
  const outfit = mat(v.outfit);
  const accent = mat(v.accent);
  const pants = mat(v.pants);
  const undershirt = mat(v.undershirt || v.accent);
  const gold = mat(v.gold || 0xfbbf24);
  const w = 0.5 * s.torso * s.width;
  const h = 0.72 * s.torso;
  // torso.y = 0.22*s.torso → lathe bottom sits above hips origin; skirt bridges the gap
  const torsoLift = 0.22 * s.torso;

  const addLatheBody = (material, yBase, height, widthMul = 1, depthMul = 0.85, parent = torso) => {
    const geo = makeTorsoGeo(w * 2 * widthMul, height, depthMul);
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(0, yBase, 0);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    const o = new THREE.Mesh(geo, outlineMat);
    o.position.copy(mesh.position);
    o.scale.set(1.05, 1.02, 1.05);
    parent.add(o);
    return mesh;
  };

  /** Oval belt/collar band sized to the lathe at height fraction t. */
  const addBand = (material, y, t, widthMul = 1, depthMul = 0.88, bandH = 0.1, pad = 1.06) => {
    const r = latheRadiusAt(w * widthMul, t) * pad;
    part(torso, cylGeo, material, 0, y, 0, r, bandH, r * depthMul, 0, 0, 0, { outline: true, outlinePad: 1.08 });
    return r;
  };

  /** Mild tapered hip cylinder — meets torso bottom, no box slab / pot flare. */
  const addHipSkirt = (material, widthMul = 1.0, skirtH = 0.3) => {
    const topR = latheRadiusAt(w * widthMul, 0.04) * 1.02;
    const botR = topR * 1.06;
    const geo = new THREE.CylinderGeometry(topR, botR, skirtH, 20);
    geo.scale(1, 1, 0.9);
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, material);
    // Sit just under the sash / torso junction
    mesh.position.set(0, torsoLift - skirtH * 0.55, 0);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    hips.add(mesh);
    const o = new THREE.Mesh(geo, outlineMat);
    o.position.copy(mesh.position);
    o.scale.set(1.05, 1.02, 1.05);
    hips.add(o);
    return mesh;
  };

  /** Thin front plate (not a through-body box) for armor / badges. */
  const addFrontPlate = (material, y, t, widthMul, plateH, depthMul = 0.88) => {
    const r = latheRadiusAt(w * widthMul, t);
    const sx = r * 1.55;
    const sz = Math.max(0.06, r * 0.22);
    part(torso, boxGeo, material, 0, y, r * depthMul * 0.55, sx, plateH, sz, 0, 0, 0, { outline: true });
  };

  if (kit === 'gi') {
    addLatheBody(undershirt, 0.02, h * 0.95, 0.92, 0.8);
    addLatheBody(outfit, 0.0, h, 1.02, 0.88);
    part(torso, boxGeo, undershirt, 0, 0.58 * s.torso, 0.16, 0.24, 0.22, 0.07);
    // Black sash proud of the gi + sitting above the hip skirt
    const sashR = addBand(mat(0x1c1917), 0.1, 0.12, 1.02, 0.88, 0.12, 1.16);
    part(torso, boxGeo, mat(0x1c1917), 0.1, 0.04, sashR * 0.85, 0.1, 0.14, 0.08);
    part(torso, boxGeo, mat(lighten(v.outfit, 0.08)), 0.11, 0.35 * s.torso, 0.16, 0.03, 0.36, 0.02);
    addHipSkirt(pants, 1.0, 0.3);
    return { wrist: undershirt, bootAccent: gold, sleeve: outfit };
  }

  if (kit === 'saiyanArmor') {
    const white = mat(0xffffff);
    addLatheBody(undershirt, 0.0, h, 0.95, 0.82);
    // Taller molded white chest shell covering mid-chest → shoulders
    addLatheBody(white, 0.14 * s.torso, h * 0.72, 1.08, 0.9);
    addBand(gold, 0.12 * s.torso, 0.16, 0.98, 0.88, 0.1, 1.12);
    part(torso, boxGeo, mat(0x1c1917, { flat: true }), 0, 0.12 * s.torso, latheRadiusAt(w * 0.98, 0.16) * 1.05, w * 0.65, 0.025, 0.03);
    const shY = 0.58 * s.torso;
    const shX = latheRadiusAt(w * 1.08, 0.78) + 0.05;
    part(torso, sphereGeo, white, -shX, shY, 0, 0.14, 0.12, 0.13, 0, 0, 0, { outline: true });
    part(torso, sphereGeo, white, shX, shY, 0, 0.14, 0.12, 0.13, 0, 0, 0, { outline: true });
    addHipSkirt(undershirt, 0.95, 0.28);
    return { wrist: white, bootAccent: gold, sleeve: undershirt };
  }

  if (kit === 'namekian' || kit === 'trainee') {
    addLatheBody(outfit, 0.0, h, 1.0, 0.85);
    addBand(accent, 0.62 * s.torso, 0.85, 1.0, 0.85, 0.1, 1.08);
    addBand(accent, 0.04, 0.06, 1.0, 0.85, 0.09, 1.08);
    if (kit === 'namekian') {
      part(torso, boxGeo, accent, 0, 0.2 * s.torso, -latheRadiusAt(w, 0.3) * 1.05, w * 1.6, 0.85 * s.torso, 0.07, 0.12, 0, 0, { outline: true });
    }
    addHipSkirt(outfit, 1.0, 0.34);
    return { wrist: outfit, bootAccent: accent, sleeve: outfit, turban: kit === 'namekian' };
  }

  if (kit === 'capsule') {
    addLatheBody(mat(0x1c1917), 0.05, h * 0.85, 0.9, 0.8);
    addLatheBody(outfit, 0.08, h * 0.7, 1.08, 0.92);
    const capR = latheRadiusAt(w * 1.08, 0.5);
    part(torso, boxGeo, outfit, -capR * 0.85, 0.36, 0, 0.18, 0.5, capR * 1.1, 0, 0, 0, { outline: true });
    part(torso, boxGeo, outfit, capR * 0.85, 0.36, 0, 0.18, 0.5, capR * 1.1, 0, 0, 0, { outline: true });
    part(torso, sphereGeo, mat(0x38bdf8, { emissive: 0x38bdf8, glow: 0.5 }), 0.22, 0.5 * s.torso, capR * 0.7, 0.07, 0.07, 0.05);
    addBand(gold, 0.04, 0.08, 1.05, 0.9, 0.09, 1.08);
    addHipSkirt(pants, 1.0, 0.34);
    part(torso, boxGeo, mat(0xcbd5e1), 0.14, 0.35, -capR * 0.95, 0.06, 1.1, 0.06, 0.2, 0, 0, { outline: true });
    part(torso, boxGeo, mat(0x334155), 0.14, 0.85, -capR * 0.95, 0.11, 0.18, 0.11);
    return { wrist: mat(0x1c1917), bootAccent: gold, sleeve: mat(0x1c1917) };
  }

  if (kit === 'frieza') {
    addLatheBody(outfit, 0.0, h * 0.95, 0.98, 0.88);
    addFrontPlate(accent, 0.46 * s.torso, 0.6, 0.98, 0.32);
    part(torso, sphereGeo, mat(0x7c3aed, { emissive: 0x7c3aed, glow: 0.55 }), 0, 0.52 * s.torso, latheRadiusAt(w * 0.98, 0.6) * 0.9, 0.1, 0.1, 0.08);
    addHipSkirt(outfit, 0.95, 0.3);
    part(hips, cylGeo, outfit, 0, -0.02, -0.36, 0.07, 0.7, 0.07, 1.05, 0, 0, { outline: true });
    part(hips, sphereGeo, accent, 0, -0.32, -0.7, 0.1, 0.1, 0.1);
    return { wrist: outfit, bootAccent: accent, sleeve: outfit };
  }

  if (kit === 'broly') {
    addLatheBody(mat(v.skin), 0.02, h * 0.95, 1.1, 0.95);
    const neckR = latheRadiusAt(w * 1.1, 0.9);
    for (let i = 0; i < 8; i++) {
      const a = (i / 7) * Math.PI - Math.PI / 2;
      part(torso, sphereGeo, gold, Math.cos(a) * neckR * 0.85, 0.64 * s.torso + Math.sin(a) * 0.07, neckR * 0.55, 0.05, 0.05, 0.05);
    }
    addBand(mat(0x1c1917), 0.05, 0.08, 1.1, 0.95, 0.1, 1.08);
    addHipSkirt(pants, 1.1, 0.38);
    return { wrist: mat(0x1c1917), bootAccent: gold, sleeve: mat(v.skin), bareArms: true };
  }

  if (kit === 'android18') {
    addLatheBody(mat(0x1c1917), 0.08, h * 0.7, 0.9, 0.8);
    addLatheBody(outfit, 0.1, h * 0.68, 1.1, 0.95);
    const a18R = latheRadiusAt(w * 1.1, 0.5);
    part(torso, boxGeo, outfit, -a18R * 0.85, 0.36, 0, 0.18, 0.48, a18R * 1.05, 0, 0, 0, { outline: true });
    part(torso, boxGeo, outfit, a18R * 0.85, 0.36, 0, 0.18, 0.48, a18R * 1.05, 0, 0, 0, { outline: true });
    addBand(accent, 0.08, 0.12, 1.05, 0.9, 0.09, 1.08);
    part(torso, boxGeo, gold, 0, 0.08, a18R * 0.7, 0.1, 0.08, 0.04);
    addHipSkirt(pants, 1.0, 0.34);
    return { wrist: mat(0xf8fafc), bootAccent: accent, sleeve: outfit, bandage: true };
  }

  if (kit === 'cell') {
    addLatheBody(outfit, 0.0, h, 1.02, 0.9);
    const spot = mat(0x14532d);
    addFrontPlate(spot, 0.5 * s.torso, 0.65, 1.02, 0.18);
    const cellR = latheRadiusAt(w * 1.02, 0.45);
    part(torso, sphereGeo, spot, -0.18, 0.3, cellR * 0.7, 0.08, 0.08, 0.06);
    part(torso, sphereGeo, spot, 0.18, 0.36, cellR * 0.7, 0.07, 0.07, 0.06);
    part(torso, boxGeo, mat(0x1a2e05, { opacity: 0.92 }), -0.5, 0.4, -cellR * 0.6, 0.4, 0.5, 0.05, 0.25, 0, 0.35, { outline: true });
    part(torso, boxGeo, mat(0x1a2e05, { opacity: 0.92 }), 0.5, 0.4, -cellR * 0.6, 0.4, 0.5, 0.05, 0.25, 0, -0.35, { outline: true });
    addHipSkirt(outfit, 1.0, 0.34);
    return { wrist: outfit, bootAccent: accent, sleeve: outfit };
  }

  if (kit === 'buu') {
    addLatheBody(mat(v.skin), 0.0, h * 0.95, 1.2, 1.05);
    addLatheBody(outfit, 0.02, h * 0.72, 1.05, 0.85);
    const buuR = latheRadiusAt(w * 1.2, 0.35);
    part(torso, boxGeo, accent, 0, 0.26, -buuR * 0.95, w * 1.7, 0.8, 0.08, 0.1, 0, 0, { outline: true });
    addHipSkirt(outfit, 1.1, 0.36);
    return { wrist: mat(v.skin), bootAccent: accent, sleeve: mat(v.skin), bareArms: true };
  }

  if (kit === 'android16') {
    addLatheBody(outfit, 0.0, h, 1.14, 0.95);
    addFrontPlate(accent, 0.46 * s.torso, 0.6, 1.14, 0.26);
    part(torso, sphereGeo, mat(0xef4444, { emissive: 0xef4444, glow: 0.6 }), 0, 0.5 * s.torso, latheRadiusAt(w * 1.14, 0.6) * 0.85, 0.08, 0.08, 0.06);
    addHipSkirt(pants, 1.1, 0.34);
    return { wrist: mat(0x1c1917), bootAccent: accent, sleeve: outfit };
  }

  if (kit === 'nezha') {
    addLatheBody(outfit, 0.0, h * 0.9, 1.0, 0.85);
    addBand(gold, 0.56 * s.torso, 0.75, 1.0, 0.85, 0.1, 1.08);
    addBand(gold, 0.05, 0.08, 1.0, 0.85, 0.09, 1.08);
    const nzR = latheRadiusAt(w, 0.35);
    part(torso, cylGeo, mat(0xff5722, { emissive: 0xff5722, glow: 0.6 }), -(nzR + 0.12), 0.22, 0, 0.28, 0.06, 0.28, 0, 0, Math.PI / 2);
    part(torso, cylGeo, mat(0xff5722, { emissive: 0xff5722, glow: 0.6 }), nzR + 0.12, 0.22, 0, 0.28, 0.06, 0.28, 0, 0, Math.PI / 2);
    addHipSkirt(pants, 1.0, 0.32);
    return { wrist: gold, bootAccent: gold, sleeve: outfit };
  }

  addLatheBody(outfit, 0.0, h, 1.0, 0.85);
  addFrontPlate(accent, 0.5 * s.torso, 0.65, 1.0, 0.16);
  addHipSkirt(pants, 1.0, 0.34);
  return { wrist: accent, bootAccent: mat(v.boots || 0x1a1a1a), sleeve: outfit };
}

/**
 * Builds a rigged anime fighter with UV face + lathed body.
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
  root.scale.setScalar(1.35);

  const torso = new THREE.Group();
  torso.position.y = 0.22 * s.torso;
  hips.add(torso);

  const kitParts = buildOutfit(torso, hips, v, s);

  const head = new THREE.Group();
  head.position.y = 0.86 * s.torso;
  torso.add(head);
  buildFace(head, v, s);

  if (kitParts.turban) {
    part(head, cylGeo, mat(v.accent || 0xf8fafc), 0, 0.36, 0, 0.42, 0.26, 0.42, 0, 0, 0, { outline: true });
    part(head, boxGeo, mat(v.accent || 0xf8fafc), 0, 0.26, 0.34, 0.15, 0.12, 0.24);
  }

  const makeArm = (side) => {
    const shoulder = new THREE.Group();
    shoulder.position.set(side * 0.44 * s.torso * s.width, 0.58 * s.torso, 0);
    torso.add(shoulder);
    const upper = new THREE.Group();
    shoulder.add(upper);
    const sleeveMat = kitParts.bareArms ? skin : (kitParts.sleeve || mat(v.outfit));
    part(upper, capsuleGeo, sleeveMat, 0, -0.24 * s.limb, 0, 0.24 * s.limb, 0.34 * s.limb, 0.24 * s.limb, 0, 0, 0, { outline: true, outlinePad: 1.09 });
    const elbow = new THREE.Group();
    elbow.position.y = -0.5 * s.limb;
    upper.add(elbow);
    part(elbow, capsuleGeo, skin, 0, -0.2 * s.limb, 0, 0.22 * s.limb, 0.3 * s.limb, 0.22 * s.limb, 0, 0, 0, { outline: true, outlinePad: 1.09 });
    part(elbow, cylGeo, kitParts.wrist || mat(v.accent), 0, -0.36 * s.limb, 0, 0.13 * s.limb, 0.11, 0.13 * s.limb);
    if (kitParts.bandage && side < 0) {
      part(elbow, cylGeo, mat(0xf8fafc), 0, -0.14 * s.limb, 0, 0.14, 0.32, 0.14);
    }
    part(elbow, sphereGeo, skin, 0, -0.44 * s.limb, 0.03, 0.13, 0.12, 0.15, 0, 0, 0, { outline: true });
    return { shoulder, upper, elbow };
  };

  const makeLeg = (side) => {
    const hip = new THREE.Group();
    hip.position.set(side * 0.16 * s.torso * s.width, -0.02, 0);
    hips.add(hip);
    const thigh = new THREE.Group();
    hip.add(thigh);
    part(thigh, capsuleGeo, mat(v.pants), 0, -0.3 * s.limb, 0, 0.3 * s.limb, 0.38 * s.limb, 0.3 * s.limb, 0, 0, 0, { outline: true, outlinePad: 1.09 });
    const knee = new THREE.Group();
    knee.position.y = -0.56 * s.limb;
    thigh.add(knee);
    part(knee, capsuleGeo, mat(v.pants), 0, -0.2 * s.limb, 0, 0.26 * s.limb, 0.3 * s.limb, 0.26 * s.limb, 0, 0, 0, { outline: true, outlinePad: 1.09 });
    part(knee, boxGeo, boots, 0, -0.44 * s.limb, 0.06, 0.2, 0.26, 0.34, 0, 0, 0, { outline: true });
    part(knee, boxGeo, kitParts.bootAccent || boots, 0, -0.5 * s.limb, 0.16, 0.21, 0.1, 0.24);
    return { hip, thigh, knee };
  };

  const leftArm = makeArm(-1);
  const rightArm = makeArm(1);
  const leftLeg = makeLeg(-1);
  const rightLeg = makeLeg(1);

  // Soft ki aura shell
  const aura = new THREE.Mesh(
    new THREE.SphereGeometry(0.85, 20, 14),
    new THREE.MeshBasicMaterial({
      color: v.aura, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending
    })
  );
  aura.scale.set(1.25, 1.85, 1.25);
  aura.position.y = 1.2;
  root.add(aura);

  // Per-fighter rim light (anime edge pop) — parented so it follows
  const rim = new THREE.PointLight(v.aura, 0.85, 4.5, 2);
  rim.position.set(0, 1.4, 1.2);
  root.add(rim);
  const fillRim = new THREE.PointLight(0xffe6c8, 0.35, 3.5, 2);
  fillRim.position.set(0, 1.6, -1.0);
  root.add(fillRim);

  const bones = { hips, torso, head, leftArm, rightArm, leftLeg, rightLeg, aura, rim, fillRim };
  let facing = 1;
  let anim = 'idle';
  let animT = 0;
  const CAM_BIAS = 0.55;

  function setFacing(dir) {
    facing = dir >= 0 ? 1 : -1;
    root.rotation.y = facing >= 0 ? Math.PI / 2 - CAM_BIAS : -Math.PI / 2 + CAM_BIAS;
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
    damp(leftArm.elbow.rotation, 'x', 0.2);
    damp(rightArm.elbow.rotation, 'x', 0.2);
    damp(leftLeg.thigh.rotation, 'x', 0);
    damp(rightLeg.thigh.rotation, 'x', 0);
    damp(torso.rotation, 'x', 0);
    damp(torso.rotation, 'z', 0);
    damp(hips.position, 'y', 0.95 * heightScale);
    damp(head.rotation, 'y', 0);

    // Pulse rim with energy
    const energyGlow = 0.55 + (state.aura || 0) * 2.5 + (charging ? 0.8 : 0);
    rim.intensity += (energyGlow - rim.intensity) * Math.min(1, 6 * dt);

    if (hurt) {
      torso.rotation.x = -0.35;
      leftArm.upper.rotation.x = -0.8;
      rightArm.upper.rotation.x = -0.8;
    } else if (guarding) {
      leftArm.upper.rotation.x = -1.5;
      rightArm.upper.rotation.x = -1.5;
      leftArm.elbow.rotation.x = -1.1;
      rightArm.elbow.rotation.x = -1.1;
      torso.rotation.x = 0.14;
    } else if (attack === 'punch' || attack === 'uppercut') {
      const lead = facing > 0 ? rightArm : leftArm;
      const other = facing > 0 ? leftArm : rightArm;
      const phase = Math.min(1, t / 0.18);
      lead.upper.rotation.x = -1.75 * phase;
      lead.elbow.rotation.x = -0.12;
      other.upper.rotation.x = -0.5;
      if (attack === 'uppercut') {
        lead.upper.rotation.x = -2.35 * phase;
        torso.rotation.x = -0.3 * phase;
        hips.position.y += 0.1 * phase;
      }
    } else if (attack === 'kick' || attack === 'dash') {
      const lead = facing > 0 ? rightLeg : leftLeg;
      const phase = Math.min(1, t / 0.2);
      lead.thigh.rotation.x = -1.5 * phase;
      torso.rotation.x = 0.24;
      if (attack === 'dash') torso.rotation.x = 0.5;
    } else if (charging) {
      leftArm.upper.rotation.x = -1.2;
      rightArm.upper.rotation.x = -1.2;
      leftArm.elbow.rotation.x = -0.9;
      rightArm.elbow.rotation.x = -0.9;
      torso.rotation.z = Math.sin(t * 18) * 0.05;
      aura.material.opacity = 0.45 + Math.sin(t * 12) * 0.18;
      aura.scale.setScalar(1.1 + Math.sin(t * 8) * 0.12);
    } else if (airborne) {
      leftArm.upper.rotation.x = -0.7;
      rightArm.upper.rotation.x = -0.7;
      leftLeg.thigh.rotation.x = 0.42;
      rightLeg.thigh.rotation.x = -0.32;
    } else if (moving) {
      const swing = Math.sin(t * 10) * 0.58;
      leftArm.upper.rotation.x = swing;
      rightArm.upper.rotation.x = -swing;
      leftLeg.thigh.rotation.x = -swing;
      rightLeg.thigh.rotation.x = swing;
      hips.position.y = 0.95 * heightScale + Math.abs(Math.sin(t * 10)) * 0.045;
    } else {
      const breath = Math.sin(t * 2.4) * 0.025;
      torso.position.y = 0.22 * s.torso + breath;
      leftArm.upper.rotation.x = -0.42 + breath;
      rightArm.upper.rotation.x = -0.42 - breath;
      leftArm.elbow.rotation.x = -0.62;
      rightArm.elbow.rotation.x = -0.62;
      leftLeg.thigh.rotation.x = 0.22;
      rightLeg.thigh.rotation.x = -0.14;
      torso.rotation.x = 0.1;
    }

    if (!charging) {
      aura.material.opacity += ((state.aura || 0) - aura.material.opacity) * Math.min(1, 6 * dt);
    }
  }

  function dispose() {
    root.traverse((obj) => {
      if (obj.isMesh && obj.geometry && ![boxGeo, sphereGeo, cylGeo, coneGeo, capsuleGeo].includes(obj.geometry)) {
        obj.geometry.dispose();
      }
    });
  }

  return { root, bones, setFacing, setAnim, animate, dispose, height: v.height };
}
