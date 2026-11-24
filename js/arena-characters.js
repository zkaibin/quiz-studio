// Procedural anime fighters for Arena Clash.
// UV-mapped faces on the head sphere, lathed torsos, cel shading, ink outlines.
// Inspired by Dragon Ball silhouettes — not traced from official art.
import * as THREE from './vendor/three/three.module.min.js';

/* ---------- Cel materials ---------- */
// Hard 2-band toon ramp — classic 90s anime cel look (flat light / flat shadow).
let toonGradient = null;
function getToonGradient() {
  if (toonGradient) return toonGradient;
  if (typeof document !== 'undefined') {
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    [['#222222', 0], ['#ffffff', 1]].forEach(([c, i]) => {
      ctx.fillStyle = c;
      ctx.fillRect(i, 0, 1, 1);
    });
    toonGradient = new THREE.CanvasTexture(canvas);
  } else {
    toonGradient = new THREE.DataTexture(new Uint8Array([34, 34, 34, 255, 255, 255, 255, 255]), 2, 1);
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

const outlineMat = new THREE.MeshBasicMaterial({ color: 0x0a0806, side: THREE.BackSide });

const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const sphereGeo = new THREE.SphereGeometry(1, 28, 20);
const cylGeo = new THREE.CylinderGeometry(1, 1, 1, 18);
const coneGeo = new THREE.ConeGeometry(1, 1, 7);
const capsuleGeo = new THREE.CapsuleGeometry(0.5, 1, 6, 14);
const spikeGeo = new THREE.ConeGeometry(1, 1, 5);

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
  // Heroic anime proportions (~1:7 head): compact head, long limbs, athletic V-taper.
  if (build === 'bulky') return { torso: 1.32, limb: 1.26, head: 0.72, width: 1.2 };
  if (build === 'tall') return { torso: 1.22, limb: 1.24, head: 0.7, width: 1.06 };
  if (build === 'compact') return { torso: 0.94, limb: 0.96, head: 0.88, width: 0.96 };
  if (build === 'round') return { torso: 1.32, limb: 1.0, head: 0.95, width: 1.22 };
  return { torso: 1.16, limb: 1.2, head: 0.8, width: 1.1 };
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
function faceExpression(v) {
  if (v.expression) return v.expression;
  if (v.hairStyle === 'goku') return 'grin';
  if (v.hairStyle === 'vegeta' || v.kit === 'saiyanArmor') return 'smirk';
  if (v.kit === 'gi' && v.hairStyle !== 'krillin') return 'grin';
  return 'smile';
}

const headTexCache = new Map();
function makeHeadTexture(v) {
  const expr = faceExpression(v);
  const key = `${v.kit}|${v.skin}|${v.hair}|${v.eyeColor}|${v.hairStyle}|${expr}`;
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
  const brow = v.kit === 'buu' ? '#9f1239' : '#140e0c';
  const proud = expr === 'smirk';

  // Full head skin
  ctx.fillStyle = skin;
  ctx.fillRect(0, 0, W, H);

  // Hard cel shadow band under hairline (not soft gradient)
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, W, H * 0.22);
  ctx.fillStyle = 'rgba(90,45,30,0.16)';
  ctx.beginPath();
  ctx.ellipse(W * 0.25, H * 0.78, 78, 42, 0, 0, Math.PI * 2);
  ctx.fill();

  // Face center on +Z → u=0.25 — oversized features so they read at fight distance
  const cx = W * 0.25;
  const cy = H * 0.48;

  const drawEye = (ex, flip) => {
    // Almond DBZ sclera — wide, hard-edged, small pupil
    const tilt = flip * (proud ? 0.2 : 0.1);
    const ew = 52;
    const eh = 34;
    ctx.fillStyle = 'rgba(20,12,8,0.28)';
    ctx.beginPath();
    ctx.ellipse(ex + flip * 2, cy - 2, ew + 4, eh + 4, tilt, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fffef8';
    ctx.beginPath();
    ctx.ellipse(ex, cy - 10, ew, eh, tilt, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = eye;
    ctx.beginPath();
    ctx.ellipse(ex + flip * 4, cy - 6, 16, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#070707';
    ctx.beginPath();
    ctx.ellipse(ex + flip * 4, cy - 5, 9, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.ellipse(ex - 10, cy - 20, 8, 9, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#100c0a';
    ctx.lineWidth = proud ? 14 : 11;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.ellipse(ex, cy - 10, ew, eh, tilt, Math.PI * 1.05, Math.PI * 1.95);
    ctx.stroke();
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(ex + flip * 44, cy - 18);
    ctx.quadraticCurveTo(ex + flip * 64, cy - 28, ex + flip * 70, cy - 4);
    ctx.stroke();
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(ex, cy - 10, ew, eh, tilt, 0.18, Math.PI - 0.18);
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
    drawEye(cx - 56, -1);
    drawEye(cx + 56, 1);
  }

  // Thick angled brows — proud = sharper / lower at outer edge
  if (v.kit !== 'frieza' && v.kit !== 'cell') {
    ctx.strokeStyle = brow;
    ctx.lineWidth = proud ? 18 : 15;
    ctx.lineCap = 'round';
    const browY = proud ? cy - 48 : cy - 56;
    ctx.beginPath();
    ctx.moveTo(cx - 105, browY + (proud ? 8 : 4));
    ctx.quadraticCurveTo(cx - 58, browY - (proud ? 26 : 32), cx - 8, browY + (proud ? 4 : -6));
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + 105, browY + (proud ? 8 : 4));
    ctx.quadraticCurveTo(cx + 58, browY - (proud ? 26 : 32), cx + 8, browY + (proud ? 4 : -6));
    ctx.stroke();
  }

  if (v.kit === 'buu') {
    ctx.fillStyle = '#111827';
    ctx.fillRect(cx - 36, cy - 95, 72, 22);
    ctx.fillRect(cx - 12, cy - 95, 24, 52);
  }

  if (v.kit === 'krillin' || v.hairStyle === 'krillin') {
    ctx.fillStyle = '#1c1917';
    [[-36, -78], [0, -86], [36, -78], [-22, -62], [22, -62], [0, -50]].forEach(([dx, dy]) => {
      ctx.beginPath();
      ctx.arc(cx + dx, cy + dy, 6, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Pointed anime nose
  if (v.kit !== 'krillin' && v.kit !== 'frieza' && v.hairStyle !== 'krillin') {
    ctx.strokeStyle = 'rgba(60,30,20,0.55)';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx + 2, cy + 6);
    ctx.quadraticCurveTo(cx + 12, cy + 26, cx + 2, cy + 38);
    ctx.stroke();
  }

  // Mouth — grin (open teeth), smirk, or soft smile — drawn large for distance read
  const mouthY = cy + 72;
  if (expr === 'grin') {
    ctx.fillStyle = '#3f0a0a';
    ctx.beginPath();
    ctx.moveTo(cx - 42, mouthY);
    ctx.quadraticCurveTo(cx, mouthY + 34, cx + 42, mouthY);
    ctx.quadraticCurveTo(cx, mouthY + 10, cx - 42, mouthY);
    ctx.fill();
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(cx - 32, mouthY + 2, 64, 11);
    ctx.strokeStyle = '#1c1917';
    ctx.lineWidth = 2.5;
    for (let i = -3; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(cx + i * 9, mouthY + 2);
      ctx.lineTo(cx + i * 9, mouthY + 13);
      ctx.stroke();
    }
    ctx.strokeStyle = '#7f1d1d';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(cx - 42, mouthY);
    ctx.quadraticCurveTo(cx, mouthY + 34, cx + 42, mouthY);
    ctx.stroke();
  } else if (expr === 'smirk') {
    ctx.strokeStyle = '#7f1d1d';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - 22, mouthY + 6);
    ctx.quadraticCurveTo(cx + 8, mouthY + 22, cx + 40, mouthY - 4);
    ctx.stroke();
  } else {
    ctx.strokeStyle = '#7f1d1d';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - 28, mouthY);
    ctx.quadraticCurveTo(cx, mouthY + 18, cx + 28, mouthY);
    ctx.stroke();
  }

  // Ear hints on sides
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
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
  const steps = 12;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // y from hips (0) to shoulders (1)
    const y = t * height;
    // Heroic V-taper: broad chest, pinched waist (DBZ athletic read)
    const chest = 0.48 + 0.58 * Math.sin(t * Math.PI * 0.92);
    const waist = 1 - 0.3 * Math.exp(-Math.pow((t - 0.32) * 4.2, 2));
    const r = width * 0.5 * chest * waist;
    pts.push(new THREE.Vector2(r, y));
  }
  const geo = new THREE.LatheGeometry(pts, 24);
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
    // Thin rigid cones — sharper Toriyama silhouette than fat wedges
    part(head, spikeGeo, highlight ? hi : hairMat, x, y, z, sx, sy, sz, rx, 0, rz, { outline: true, outlinePad: 1.06 });
  };

  if (style === 'goku') {
    // Dense crown + many thin rigid spikes fanning out (reference silhouette)
    part(head, sphereGeo, hairMat, 0, 0.22, -0.1, 0.4, 0.32, 0.4, 0, 0, 0, { outline: true });
    const tips = [
      [0.0, 0.92, 0.06, 0.12, 0.95, 0.12, -0.1, 0.0, true],
      [-0.16, 0.86, 0.14, 0.11, 0.82, 0.11, -0.25, -0.32, true],
      [0.18, 0.88, 0.12, 0.11, 0.86, 0.11, -0.22, 0.34],
      [-0.3, 0.7, 0.04, 0.1, 0.7, 0.1, -0.45, -0.7],
      [0.32, 0.72, 0.02, 0.1, 0.72, 0.1, -0.42, 0.72, true],
      [-0.4, 0.5, -0.06, 0.09, 0.55, 0.09, -0.72, -0.9],
      [0.42, 0.52, -0.08, 0.09, 0.56, 0.09, -0.7, 0.92],
      [-0.48, 0.34, -0.02, 0.08, 0.42, 0.08, -0.85, -1.05],
      [0.5, 0.36, -0.04, 0.08, 0.44, 0.08, -0.82, 1.05],
      [0, 0.7, -0.34, 0.14, 0.82, 0.14, -1.15, 0, true],
      [-0.18, 0.58, -0.3, 0.1, 0.58, 0.1, -1.0, -0.35],
      [0.2, 0.6, -0.32, 0.1, 0.6, 0.1, -1.02, 0.35],
      [-0.1, 0.76, -0.14, 0.09, 0.55, 0.09, -0.8, -0.18],
      [0.12, 0.78, -0.16, 0.09, 0.58, 0.09, -0.82, 0.2, true],
      // Short forehead bangs — keep clear of eyes/mouth so the face card reads
      [-0.1, 0.36, 0.28, 0.07, 0.22, 0.08, 0.55, -0.2],
      [0.12, 0.38, 0.28, 0.07, 0.22, 0.08, 0.5, 0.22, true]
    ];
    for (const t of tips) spike(t[0], t[1], t[2], t[3], t[4], t[5], t[6] || 0, t[7] || 0, !!t[8]);
    return;
  }

  if (style === 'vegeta') {
    // Extreme upright spikes + sharp widow's-peak V (reference silhouette)
    part(head, sphereGeo, hairMat, 0, 0.24, -0.12, 0.38, 0.34, 0.36, 0, 0, 0, { outline: true });
    // Widow's peak — high and sharp, not covering the eyes
    part(head, spikeGeo, hairMat, 0, 0.34, 0.26, 0.11, 0.36, 0.1, 0.85, 0, 0, { outline: true });
    part(head, spikeGeo, hairMat, -0.1, 0.3, 0.22, 0.07, 0.22, 0.07, 0.7, 0, -0.45, { outline: true });
    part(head, spikeGeo, hairMat, 0.1, 0.3, 0.22, 0.07, 0.22, 0.07, 0.7, 0, 0.45, { outline: true });
    [
      [0, 1.08, -0.04, 0.11, 1.05, 0.11, 0.0, 0, true],
      [-0.14, 0.98, 0.02, 0.1, 0.9, 0.1, -0.06, -0.18, true],
      [0.14, 0.98, 0.02, 0.1, 0.9, 0.1, -0.06, 0.18],
      [-0.26, 0.82, -0.04, 0.09, 0.78, 0.09, -0.2, -0.4],
      [0.26, 0.82, -0.04, 0.09, 0.78, 0.09, -0.2, 0.4, true],
      [-0.34, 0.62, -0.1, 0.085, 0.62, 0.085, -0.45, -0.62],
      [0.34, 0.62, -0.1, 0.085, 0.62, 0.085, -0.45, 0.62],
      [-0.18, 0.86, -0.2, 0.085, 0.7, 0.085, -0.65, -0.25],
      [0.18, 0.86, -0.2, 0.085, 0.7, 0.085, -0.65, 0.25, true],
      [0, 0.74, -0.4, 0.14, 0.78, 0.14, -1.12, 0, true],
      [-0.12, 0.72, -0.28, 0.08, 0.52, 0.08, -0.92, -0.18],
      [0.12, 0.72, -0.28, 0.08, 0.52, 0.08, -0.92, 0.18],
      [-0.06, 1.0, -0.12, 0.08, 0.55, 0.08, -0.35, -0.08],
      [0.06, 1.0, -0.12, 0.08, 0.55, 0.08, -0.35, 0.08, true]
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
  const earMat = mat(v.skin, { toon: true });
  // Compact oval anime head — do NOT add front meshes that cover the UV face card
  part(head, sphereGeo, headMat, 0, 0.08, 0.02, 0.34 * s.head, 0.4 * s.head, 0.32 * s.head, 0, 0, 0, {
    outline: true,
    outlinePad: 1.03
  });
  // Ears sit beside the head, clear of the face UV
  part(head, sphereGeo, earMat, -0.34 * s.head, 0.06, -0.02, 0.06, 0.1, 0.045, 0, 0, 0.25, { outline: true });
  part(head, sphereGeo, earMat, 0.34 * s.head, 0.06, -0.02, 0.06, 0.1, 0.045, 0, 0, -0.25, { outline: true });

  if (v.kit === 'piccolo' || v.kit === 'cell') {
    part(head, coneGeo, mat(v.skin), -0.38, 0.1, 0.04, 0.11, 0.24, 0.09, 0, 0, 1.2, { outline: true });
    part(head, coneGeo, mat(v.skin), 0.38, 0.1, 0.04, 0.11, 0.24, 0.09, 0, 0, -1.2, { outline: true });
  }

  buildHair(head, v.hair, v.hairStyle);
}

/* ---------- Outfits ---------- */
/** Approximate lathe radius at normalized height t∈[0,1] for a given half-width. */
function latheRadiusAt(halfWidth, t) {
  const chest = 0.48 + 0.58 * Math.sin(t * Math.PI * 0.92);
  const waist = 1 - 0.3 * Math.exp(-Math.pow((t - 0.32) * 4.2, 2));
  return halfWidth * chest * waist;
}

/** Round chest emblem (悟-style mark) for the classic orange gi. */
function addGiEmblem(torso, x, y, zFront) {
  const disc = mat(0xffffff);
  const ink = mat(0x1a1410, { flat: true });
  part(torso, cylGeo, disc, x, y, zFront, 0.14, 0.036, 0.14, Math.PI / 2, 0, 0, { outline: true, outlinePad: 1.06 });
  // Stylized 悟 mark — horizontal + vertical strokes (not traced art)
  part(torso, boxGeo, ink, x, y + 0.04, zFront + 0.016, 0.1, 0.018, 0.016);
  part(torso, boxGeo, ink, x, y - 0.004, zFront + 0.016, 0.026, 0.07, 0.016);
  part(torso, boxGeo, ink, x, y - 0.04, zFront + 0.016, 0.07, 0.018, 0.016);
  part(torso, boxGeo, ink, x - 0.026, y + 0.008, zFront + 0.016, 0.016, 0.04, 0.014);
}

function buildOutfit(torso, hips, v, s) {
  const kit = v.kit || 'gi';
  const outfit = mat(v.outfit);
  const accent = mat(v.accent);
  const pants = mat(v.pants);
  const undershirt = mat(v.undershirt || v.accent);
  const gold = mat(v.gold || 0xfbbf24);
  const w = 0.46 * s.torso * s.width;
  const h = 0.88 * s.torso;
  // torso.y = 0.3*s.torso → lathe bottom sits above hips origin; skirt bridges the gap
  const torsoLift = 0.3 * s.torso;

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
    // Navy short undershirt under sleeveless orange gi (reference: V-neck + blue at shoulders)
    const sash = mat(v.undershirt || v.accent || 0x1e40af);
    addLatheBody(undershirt, 0.04, h * 0.92, 0.9, 0.78);
    addLatheBody(outfit, 0.0, h, 1.04, 0.9);
    // Deep V-neck window showing blue
    part(torso, boxGeo, undershirt, 0, 0.58 * s.torso, 0.18, 0.28, 0.28, 0.08);
    part(torso, boxGeo, undershirt, 0, 0.72 * s.torso, 0.14, 0.2, 0.12, 0.06);
    // Left-chest emblem — sized for fight-cam read
    const emblemZ = latheRadiusAt(w * 1.04, 0.55) * 0.95;
    addGiEmblem(torso, -0.14 * s.width, 0.48 * s.torso, emblemZ);
    // Navy sash with hanging ends (not a black belt)
    const sashR = addBand(sash, 0.1, 0.12, 1.04, 0.9, 0.15, 1.22);
    part(torso, boxGeo, sash, 0.02, 0.02, sashR * 0.92, 0.14, 0.14, 0.1);
    part(hips, boxGeo, sash, -0.05, torsoLift - 0.22, sashR * 0.55, 0.09, 0.36, 0.06, 0.15, 0, 0.08, { outline: true });
    part(hips, boxGeo, sash, 0.08, torsoLift - 0.28, sashR * 0.5, 0.09, 0.42, 0.06, 0.2, 0, -0.06, { outline: true });
    // Soft gi fold lines
    part(torso, boxGeo, mat(lighten(v.outfit, 0.1)), 0.14, 0.34 * s.torso, emblemZ * 0.85, 0.03, 0.34, 0.02);
    addHipSkirt(pants, 1.04, 0.36);
    return {
      wrist: sash,
      bootAccent: mat(0xc41e3a),
      sleeve: undershirt,
      shortSleeve: true,
      bootStyle: 'gi',
      ankleCord: mat(0xc4a574)
    };
  }

  if (kit === 'saiyanArmor') {
    const white = mat(0xffffff);
    // Royal-blue bodysuit + white segmented chest shell + gold ribbed straps
    addLatheBody(undershirt, 0.0, h, 0.96, 0.84);
    addLatheBody(white, 0.1 * s.torso, h * 0.78, 1.08, 0.86);
    // Abdomen / chest seam lines
    const seamZ = latheRadiusAt(w * 1.08, 0.35) * 0.95;
    part(torso, boxGeo, mat(0xe2e8f0, { flat: true }), 0, 0.28 * s.torso, seamZ, w * 1.5, 0.02, 0.03);
    part(torso, boxGeo, mat(0xe2e8f0, { flat: true }), 0, 0.42 * s.torso, seamZ * 1.02, w * 1.35, 0.018, 0.03);
    part(torso, boxGeo, mat(0x1c1917, { flat: true }), 0, 0.14 * s.torso, latheRadiusAt(w * 0.98, 0.16) * 1.05, w * 0.7, 0.028, 0.03);
    addBand(gold, 0.08 * s.torso, 0.12, 0.98, 0.86, 0.09, 1.1);
    // Gold ribbed shoulder straps (not white spheres) — oversized for fight-cam read
    const shY = 0.68 * s.torso;
    const shX = latheRadiusAt(w * 1.1, 0.85) + 0.04;
    for (const side of [-1, 1]) {
      part(torso, boxGeo, gold, side * shX * 0.5, shY, 0.04, 0.18, 0.12, 0.34, 0.4, 0, side * 0.5, { outline: true });
      part(torso, boxGeo, gold, side * (shX + 0.04), shY - 0.08, 0.02, 0.15, 0.11, 0.26, 0.2, 0, side * 0.95, { outline: true });
      part(torso, boxGeo, mat(lighten(v.gold || 0xeab308, 0.25)), side * shX * 0.5, shY + 0.05, 0.06, 0.12, 0.035, 0.26);
      // Rib lines on straps
      part(torso, boxGeo, mat(0xca8a04), side * shX * 0.5, shY - 0.02, 0.05, 0.16, 0.02, 0.3);
    }
    // High blue collar
    part(torso, cylGeo, undershirt, 0, 0.78 * s.torso, 0, 0.16, 0.12, 0.16, 0, 0, 0, { outline: true });
    addHipSkirt(undershirt, 0.96, 0.28);
    return {
      wrist: white,
      bootAccent: gold,
      sleeve: undershirt,
      flaredGlove: true,
      bootStyle: 'armor'
    };
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
  // Slightly taller stance so heroic proportions read before idle squat
  hips.position.y = 1.08 * heightScale;
  root.add(hips);
  root.scale.setScalar(1.62);

  const torso = new THREE.Group();
  torso.position.y = 0.3 * s.torso;
  hips.add(torso);

  const kitParts = buildOutfit(torso, hips, v, s);

  const head = new THREE.Group();
  head.position.y = 0.98 * s.torso;
  torso.add(head);
  buildFace(head, v, s);

  if (kitParts.turban) {
    part(head, cylGeo, mat(v.accent || 0xf8fafc), 0, 0.36, 0, 0.42, 0.26, 0.42, 0, 0, 0, { outline: true });
    part(head, boxGeo, mat(v.accent || 0xf8fafc), 0, 0.26, 0.34, 0.15, 0.12, 0.24);
  }

  const makeArm = (side) => {
    const shoulder = new THREE.Group();
    // Broader shoulders for heroic anime V-taper
    shoulder.position.set(side * 0.5 * s.torso * s.width, 0.66 * s.torso, 0);
    torso.add(shoulder);
    const upper = new THREE.Group();
    shoulder.add(upper);
    const sleeveMat = kitParts.bareArms ? skin : (kitParts.sleeve || mat(v.outfit));
    const armThick = 0.26 * s.limb;
    // Short undershirt sleeve (gi) or full sleeve; longer muscular arms
    if (kitParts.shortSleeve) {
      part(upper, capsuleGeo, sleeveMat, 0, -0.15 * s.limb, 0, armThick, 0.22 * s.limb, armThick, 0, 0, 0, { outline: true, outlinePad: 1.08 });
      part(upper, capsuleGeo, skin, 0, -0.36 * s.limb, 0, armThick * 0.95, 0.26 * s.limb, armThick * 0.95, 0, 0, 0, { outline: true, outlinePad: 1.08 });
    } else {
      part(upper, capsuleGeo, sleeveMat, 0, -0.28 * s.limb, 0, armThick, 0.4 * s.limb, armThick, 0, 0, 0, { outline: true, outlinePad: 1.08 });
    }
    const elbow = new THREE.Group();
    elbow.position.y = -0.58 * s.limb;
    upper.add(elbow);
    if (kitParts.flaredGlove) {
      // White glove with flared cuff to mid-forearm (Saiyan armor read)
      part(elbow, capsuleGeo, kitParts.wrist || mat(0xffffff), 0, -0.22 * s.limb, 0, 0.24 * s.limb, 0.32 * s.limb, 0.24 * s.limb, 0, 0, 0, { outline: true, outlinePad: 1.1 });
      part(elbow, cylGeo, kitParts.wrist || mat(0xffffff), 0, -0.02 * s.limb, 0, 0.17 * s.limb, 0.14, 0.17 * s.limb, 0, 0, 0, { outline: true });
      part(elbow, sphereGeo, kitParts.wrist || mat(0xffffff), 0, -0.46 * s.limb, 0.04, 0.14, 0.12, 0.16, 0, 0, 0, { outline: true });
    } else {
      part(elbow, capsuleGeo, skin, 0, -0.2 * s.limb, 0, 0.24 * s.limb, 0.3 * s.limb, 0.24 * s.limb, 0, 0, 0, { outline: true, outlinePad: 1.1 });
      // Thick fabric wristband
      part(elbow, cylGeo, kitParts.wrist || mat(v.accent), 0, -0.34 * s.limb, 0, 0.145 * s.limb, 0.14, 0.145 * s.limb, 0, 0, 0, { outline: true });
      if (kitParts.bandage && side < 0) {
        part(elbow, cylGeo, mat(0xf8fafc), 0, -0.14 * s.limb, 0, 0.15, 0.32, 0.15);
      }
      part(elbow, sphereGeo, skin, 0, -0.44 * s.limb, 0.03, 0.14, 0.12, 0.16, 0, 0, 0, { outline: true });
    }
    return { shoulder, upper, elbow };
  };

  const makeLeg = (side) => {
    const hip = new THREE.Group();
    hip.position.set(side * 0.18 * s.torso * s.width, -0.02, 0);
    hips.add(hip);
    const thigh = new THREE.Group();
    hip.add(thigh);
    // Baggy anime pants — longer legs, gather toward the boot
    const pantW = kitParts.bootStyle === 'gi' ? 0.32 * s.limb : 0.28 * s.limb;
    part(thigh, capsuleGeo, mat(v.pants), 0, -0.34 * s.limb, 0, pantW, 0.46 * s.limb, pantW, 0, 0, 0, { outline: true, outlinePad: 1.08 });
    const knee = new THREE.Group();
    knee.position.y = -0.64 * s.limb;
    thigh.add(knee);
    part(knee, capsuleGeo, mat(v.pants), 0, -0.24 * s.limb, 0, pantW * 0.82, 0.34 * s.limb, pantW * 0.82, 0, 0, 0, { outline: true, outlinePad: 1.08 });
    // Boots
    part(knee, boxGeo, boots, 0, -0.44 * s.limb, 0.06, 0.22, 0.28, 0.36, 0, 0, 0, { outline: true });
    if (kitParts.bootStyle === 'gi') {
      // Red rim + vertical stripe + tan ankle cord (gi boots from reference)
      const red = kitParts.bootAccent || mat(0xc41e3a);
      part(knee, boxGeo, red, 0, -0.32 * s.limb, 0.08, 0.23, 0.05, 0.38);
      part(knee, boxGeo, red, 0, -0.48 * s.limb, 0.22, 0.07, 0.2, 0.05);
      if (kitParts.ankleCord) {
        part(knee, cylGeo, kitParts.ankleCord, 0, -0.36 * s.limb, 0.02, 0.13, 0.045, 0.15);
      }
    } else {
      part(knee, boxGeo, kitParts.bootAccent || boots, 0, -0.5 * s.limb, 0.16, 0.22, 0.1, 0.26);
    }
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
    const baseHipsY = 1.08 * heightScale;

    // Kung Fu strike timeline: chamber → whip → hold → recover (longer hold so poses read)
    const attackPhase = (duration) => {
      const p = Math.min(1, t / duration);
      if (p < 0.16) return { stage: 'wind', u: p / 0.16 };
      if (p < 0.38) return { stage: 'snap', u: (p - 0.16) / 0.22 };
      if (p < 0.74) return { stage: 'hold', u: (p - 0.38) / 0.36 };
      return { stage: 'recover', u: (p - 0.74) / 0.26 };
    };

    // Lead side follows facing so the front hand faces the opponent
    const leadRight = facing > 0;

    const pose = {
      lShoulderX: 0, rShoulderX: 0,
      lShoulderZ: 0.2, rShoulderZ: -0.2,
      lElbowX: 0.2, rElbowX: 0.2,
      lThighX: 0, rThighX: 0,
      lKneeX: 0.2, rKneeX: 0.2,
      lHipZ: 0.12, rHipZ: -0.12,
      torsoX: 0.1, torsoY: 0, torsoZ: 0,
      hipsY: baseHipsY, hipsYRot: 0, hipsX: 0.06,
      headX: -0.05, headY: 0,
      torsoPosY: 0.3 * s.torso
    };

    const attackHand = state.attackHand === 'rear' ? 'rear' : 'lead';

    if (hurt) {
      // Recoil twist — open guard, weight shifts back
      pose.torsoX = -0.35;
      pose.torsoY = leadRight ? 0.45 : -0.45;
      pose.hipsX = -0.16;
      pose.hipsYRot = -pose.torsoY * 0.4;
      pose.lShoulderX = -0.55;
      pose.rShoulderX = -0.7;
      pose.lShoulderZ = 0.55;
      pose.rShoulderZ = -0.55;
      pose.lElbowX = -0.2;
      pose.rElbowX = -0.25;
      pose.headX = 0.28;
      pose.headY = pose.torsoY * 0.35;
      pose.hipsY = baseHipsY - 0.1;
      pose.lThighX = leadRight ? 0.55 : 0.2;
      pose.rThighX = leadRight ? 0.2 : 0.55;
      pose.lKneeX = 0.7;
      pose.rKneeX = 0.65;
    } else if (guarding) {
      // Tiger / high-low gate — front forearm high, rear mid, deep seat
      pose.torsoX = 0.05;
      pose.hipsX = 0.05;
      pose.lHipZ = 0.4;
      pose.rHipZ = -0.4;
      pose.lThighX = 0.46;
      pose.rThighX = 0.4;
      pose.lKneeX = 0.88;
      pose.rKneeX = 0.8;
      pose.hipsY = baseHipsY - 0.09;
      pose.hipsYRot = leadRight ? 0.16 : -0.16;
      if (leadRight) {
        pose.rShoulderX = -1.75;
        pose.rShoulderZ = -0.35;
        pose.rElbowX = -1.45;
        pose.lShoulderX = -1.15;
        pose.lShoulderZ = 0.85;
        pose.lElbowX = -1.35;
      } else {
        pose.lShoulderX = -1.75;
        pose.lShoulderZ = 0.35;
        pose.lElbowX = -1.45;
        pose.rShoulderX = -1.15;
        pose.rShoulderZ = -0.85;
        pose.rElbowX = -1.35;
      }
    } else if (attack === 'punch' || attack === 'uppercut') {
      const ap = attackPhase(attack === 'uppercut' ? 0.46 : 0.4);
      const wind = ap.stage === 'wind' ? ap.u : 1;
      const snap = ap.stage === 'snap' ? ap.u : (ap.stage === 'wind' ? 0 : 1);
      const recover = ap.stage === 'recover' ? ap.u : 0;
      const strike = Math.max(0, snap - recover);
      const useRear = attack === 'punch' && attackHand === 'rear';

      // Alternate lead / rear 冲拳 — chamber then whip with hip drive
      const setPunch = (strikingRight) => {
        if (strikingRight) {
          pose.rShoulderX = -0.2 * wind - 2.15 * strike;
          pose.rElbowX = -1.35 * wind + 0.45 * strike;
          pose.rShoulderZ = -0.12 - 0.18 * strike;
          pose.lShoulderX = -0.35 - 0.1 * wind;
          pose.lElbowX = -1.5;
          pose.lShoulderZ = 1.05;
        } else {
          pose.lShoulderX = -0.2 * wind - 2.15 * strike;
          pose.lElbowX = -1.35 * wind + 0.45 * strike;
          pose.lShoulderZ = 0.12 + 0.18 * strike;
          pose.rShoulderX = -0.35 - 0.1 * wind;
          pose.rElbowX = -1.5;
          pose.rShoulderZ = -1.05;
        }
      };
      if (leadRight) setPunch(useRear ? false : true);
      else setPunch(useRear ? true : false);

      const twistDir = leadRight ? (useRear ? 1 : -1) : (useRear ? -1 : 1);
      pose.torsoY = twistDir * (0.55 * wind + 0.95 * strike);
      pose.hipsYRot = -pose.torsoY * 0.7;
      pose.hipsX = 0.06 + 0.1 * strike;
      pose.lHipZ = 0.32;
      pose.rHipZ = -0.32;
      if (attack === 'uppercut') {
        // Rising palm / 撩拳 — drop seat then drive up
        if (leadRight) {
          pose.rShoulderX = -0.15 * wind - 2.65 * strike;
          pose.rElbowX = -1.05 * wind + 0.55 * strike;
          pose.lShoulderX = -0.45;
          pose.lElbowX = -1.4;
          pose.lShoulderZ = 0.9;
        } else {
          pose.lShoulderX = -0.15 * wind - 2.65 * strike;
          pose.lElbowX = -1.05 * wind + 0.55 * strike;
          pose.rShoulderX = -0.45;
          pose.rElbowX = -1.4;
          pose.rShoulderZ = -0.9;
        }
        pose.torsoX = -0.28 * strike;
        pose.hipsY = baseHipsY - 0.06 + 0.28 * strike;
        pose.lThighX = leadRight ? 0.62 : 0.05;
        pose.rThighX = leadRight ? 0.05 : 0.62;
        pose.lKneeX = leadRight ? 1.0 : 0.45;
        pose.rKneeX = leadRight ? 0.45 : 1.0;
      } else {
        // Gong Bu punch — front knee bent, rear leg driving
        pose.lThighX = leadRight ? 0.55 : -0.05;
        pose.rThighX = leadRight ? -0.05 : 0.55;
        pose.lKneeX = leadRight ? 0.92 : 0.3;
        pose.rKneeX = leadRight ? 0.3 : 0.92;
        pose.hipsY = baseHipsY - 0.04 + 0.06 * strike;
        pose.torsoX = 0.04 - 0.06 * strike;
        if (useRear) {
          // Rear hand punch swaps the gong-bu lead
          pose.lThighX = leadRight ? -0.05 : 0.55;
          pose.rThighX = leadRight ? 0.55 : -0.05;
          pose.lKneeX = leadRight ? 0.3 : 0.92;
          pose.rKneeX = leadRight ? 0.92 : 0.3;
        }
      }
    } else if (attack === 'kick' || attack === 'dash') {
      const ap = attackPhase(attack === 'dash' ? 0.48 : 0.44);
      const wind = ap.stage === 'wind' ? ap.u : 1;
      const snap = ap.stage === 'snap' ? ap.u : (ap.stage === 'wind' ? 0 : 1);
      const strike = Math.max(0, snap - (ap.stage === 'recover' ? ap.u : 0));
      // Chamber knee high, then whip into side / front kick with arm counterbalance
      if (leadRight) {
        pose.rThighX = -0.55 * wind - 1.95 * strike;
        pose.rKneeX = 1.55 * wind - 1.35 * strike;
        pose.rHipZ = -0.2 - 0.45 * strike;
        pose.lThighX = 0.62;
        pose.lKneeX = 0.85;
        pose.lHipZ = 0.38;
        pose.lShoulderX = -1.35 - 0.25 * strike;
        pose.lShoulderZ = 0.55;
        pose.lElbowX = -1.15;
        pose.rShoulderX = -0.55 + 0.35 * strike;
        pose.rShoulderZ = -0.75;
        pose.rElbowX = -0.85;
      } else {
        pose.lThighX = -0.55 * wind - 1.95 * strike;
        pose.lKneeX = 1.55 * wind - 1.35 * strike;
        pose.lHipZ = 0.2 + 0.45 * strike;
        pose.rThighX = 0.62;
        pose.rKneeX = 0.85;
        pose.rHipZ = -0.38;
        pose.rShoulderX = -1.35 - 0.25 * strike;
        pose.rShoulderZ = -0.55;
        pose.rElbowX = -1.15;
        pose.lShoulderX = -0.55 + 0.35 * strike;
        pose.lShoulderZ = 0.75;
        pose.lElbowX = -0.85;
      }
      pose.torsoX = 0.08 + (attack === 'dash' ? 0.35 * strike : 0.12 * strike);
      pose.torsoY = (leadRight ? -0.55 : 0.55) * Math.max(wind * 0.4, strike);
      pose.hipsYRot = -pose.torsoY * 0.55;
      pose.hipsY = baseHipsY + 0.12 * strike;
      if (attack === 'dash') {
        // Lunging spear-hand / 弓步冲刺
        pose.lShoulderX = leadRight ? -0.85 : -1.85;
        pose.rShoulderX = leadRight ? -1.85 : -0.85;
        pose.lElbowX = leadRight ? -1.1 : -0.25;
        pose.rElbowX = leadRight ? -0.25 : -1.1;
        pose.torsoX = 0.55 * Math.max(wind, strike);
        pose.hipsX = 0.22 * Math.max(wind, strike);
        pose.lThighX = leadRight ? 0.7 : -0.15;
        pose.rThighX = leadRight ? -0.15 : 0.7;
        pose.lKneeX = leadRight ? 1.05 : 0.28;
        pose.rKneeX = leadRight ? 0.28 : 1.05;
      }
    } else if (charging) {
      // Deep 马步 + palms gathering ki in front of the dantian
      pose.lShoulderX = -1.15;
      pose.rShoulderX = -1.15;
      pose.lShoulderZ = 0.55;
      pose.rShoulderZ = -0.55;
      pose.lElbowX = -1.05;
      pose.rElbowX = -1.05;
      pose.torsoX = 0.18;
      pose.hipsX = 0.1;
      pose.lThighX = 0.68;
      pose.rThighX = 0.68;
      pose.lKneeX = 1.1;
      pose.rKneeX = 1.1;
      pose.lHipZ = 0.48;
      pose.rHipZ = -0.48;
      pose.hipsY = baseHipsY - 0.14;
      pose.torsoZ = Math.sin(t * 18) * 0.05;
      pose.headX = -0.1;
      aura.material.opacity = 0.55 + Math.sin(t * 14) * 0.22;
      aura.scale.setScalar(1.18 + Math.sin(t * 9) * 0.16);
    } else if (airborne) {
      // Aerial ready — tucked trail leg, lead knee up, arms framed
      if (leadRight) {
        pose.rThighX = 0.85;
        pose.rKneeX = 1.15;
        pose.lThighX = -0.35;
        pose.lKneeX = 0.55;
        pose.rShoulderX = -1.35;
        pose.rElbowX = -0.85;
        pose.lShoulderX = -0.75;
        pose.lElbowX = -1.25;
        pose.lShoulderZ = 0.7;
        pose.rShoulderZ = -0.25;
      } else {
        pose.lThighX = 0.85;
        pose.lKneeX = 1.15;
        pose.rThighX = -0.35;
        pose.rKneeX = 0.55;
        pose.lShoulderX = -1.35;
        pose.lElbowX = -0.85;
        pose.rShoulderX = -0.75;
        pose.rElbowX = -1.25;
        pose.rShoulderZ = -0.7;
        pose.lShoulderZ = 0.25;
      }
      pose.torsoX = -0.08;
      pose.hipsX = -0.05;
      pose.hipsYRot = leadRight ? -0.12 : 0.12;
    } else if (moving) {
      // Cat-step / 行步 — upright seat, keep 冲拳 guard while stepping
      const cadence = t * 7.4;
      const swing = Math.sin(cadence);
      const bounce = Math.abs(Math.sin(cadence));
      if (leadRight) {
        pose.rShoulderX = -1.15 + swing * 0.1;
        pose.rShoulderZ = -0.08;
        pose.rElbowX = -0.4;
        pose.lShoulderX = -0.15;
        pose.lShoulderZ = 0.95;
        pose.lElbowX = -1.55;
      } else {
        pose.lShoulderX = -1.15 + swing * 0.1;
        pose.lShoulderZ = 0.08;
        pose.lElbowX = -0.4;
        pose.rShoulderX = -0.15;
        pose.rShoulderZ = -0.95;
        pose.rElbowX = -1.55;
      }
      pose.lThighX = -swing * 0.55 + 0.28;
      pose.rThighX = swing * 0.55 + 0.22;
      pose.lKneeX = 0.5 + Math.max(0, -swing) * 0.45;
      pose.rKneeX = 0.45 + Math.max(0, swing) * 0.45;
      pose.lHipZ = 0.28;
      pose.rHipZ = -0.28;
      pose.hipsY = baseHipsY - 0.04 + bounce * 0.035;
      pose.torsoX = 0.05;
      pose.hipsX = 0.04;
      pose.torsoY = (leadRight ? -0.18 : 0.18) + swing * 0.06;
      pose.hipsYRot = -pose.torsoY * 0.45;
      pose.headY = -swing * 0.04;
    } else {
      // Classic Kung Fu ready: 偏马步 — taller seat so anime proportions stay readable
      const breath = Math.sin(t * 2.35);
      const sway = Math.sin(t * 1.45);
      pose.torsoPosY = 0.3 * s.torso + breath * 0.01;
      pose.hipsY = baseHipsY - 0.02 + Math.abs(breath) * 0.008;
      pose.hipsX = 0.04;
      pose.lHipZ = 0.34;
      pose.rHipZ = -0.34;
      pose.lThighX = (leadRight ? 0.32 : 0.24) + sway * 0.02;
      pose.rThighX = (leadRight ? 0.24 : 0.32) - sway * 0.02;
      pose.lKneeX = leadRight ? 0.7 : 0.58;
      pose.rKneeX = leadRight ? 0.58 : 0.7;
      pose.torsoX = 0.05;
      pose.torsoY = (leadRight ? -0.26 : 0.26) + sway * 0.03;
      pose.hipsYRot = -pose.torsoY * 0.6;
      pose.headY = sway * 0.03;
      pose.headX = -0.05;

      if (leadRight) {
        pose.rShoulderX = -1.35 + breath * 0.04;
        pose.rShoulderZ = 0.08;
        pose.rElbowX = -0.22;
        pose.lShoulderX = 0.05 + breath * 0.02;
        pose.lShoulderZ = 1.15;
        pose.lElbowX = -1.65;
      } else {
        pose.lShoulderX = -1.35 + breath * 0.04;
        pose.lShoulderZ = -0.08;
        pose.lElbowX = -0.22;
        pose.rShoulderX = 0.05 + breath * 0.02;
        pose.rShoulderZ = -1.15;
        pose.rElbowX = -1.65;
      }
    }

    // Snappier damping so Kung Fu chambers and 冲拳 settle before the next beat
    const damp = (obj, prop, target, rate = attack ? 26 : (hurt ? 20 : 16)) => {
      obj[prop] += (target - obj[prop]) * Math.min(1, rate * dt);
    };

    damp(leftArm.shoulder.rotation, 'x', pose.lShoulderX);
    damp(rightArm.shoulder.rotation, 'x', pose.rShoulderX);
    damp(leftArm.shoulder.rotation, 'z', pose.lShoulderZ);
    damp(rightArm.shoulder.rotation, 'z', pose.rShoulderZ);
    damp(leftArm.elbow.rotation, 'x', pose.lElbowX);
    damp(rightArm.elbow.rotation, 'x', pose.rElbowX);
    damp(leftLeg.thigh.rotation, 'x', pose.lThighX);
    damp(rightLeg.thigh.rotation, 'x', pose.rThighX);
    damp(leftLeg.knee.rotation, 'x', pose.lKneeX);
    damp(rightLeg.knee.rotation, 'x', pose.rKneeX);
    damp(leftLeg.hip.rotation, 'z', pose.lHipZ);
    damp(rightLeg.hip.rotation, 'z', pose.rHipZ);
    damp(torso.rotation, 'x', pose.torsoX);
    damp(torso.rotation, 'y', pose.torsoY);
    damp(torso.rotation, 'z', pose.torsoZ);
    damp(hips.rotation, 'y', pose.hipsYRot);
    damp(hips.rotation, 'x', pose.hipsX);
    damp(hips.position, 'y', pose.hipsY);
    damp(torso.position, 'y', pose.torsoPosY);
    damp(head.rotation, 'x', pose.headX);
    damp(head.rotation, 'y', pose.headY);

    const energyGlow = 0.55 + (state.aura || 0) * 2.5 + (charging ? 0.8 : 0);
    rim.intensity += (energyGlow - rim.intensity) * Math.min(1, 6 * dt);

    if (!charging) {
      aura.material.opacity += ((state.aura || 0) - aura.material.opacity) * Math.min(1, 6 * dt);
    }
  }

  function dispose() {
    root.traverse((obj) => {
      if (obj.isMesh && obj.geometry && ![boxGeo, sphereGeo, cylGeo, coneGeo, capsuleGeo, spikeGeo].includes(obj.geometry)) {
        obj.geometry.dispose();
      }
    });
  }

  return { root, bones, setFacing, setAnim, animate, dispose, height: v.height };
}
