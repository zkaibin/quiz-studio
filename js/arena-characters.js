// Procedural anime-styled fighters for Arena Clash.
// Cel shading, ink outlines, painted face cards, and Dragon Ball silhouettes.
// Inspired by iconic looks — not traced from official art.
import * as THREE from './vendor/three/three.module.min.js';

/* ---------- Cel materials & outlines ---------- */
let toonGradient = null;
function getToonGradient() {
  if (toonGradient) return toonGradient;
  if (typeof document !== 'undefined') {
    const canvas = document.createElement('canvas');
    canvas.width = 3;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    // Hard 3-band cel: shadow / mid / highlight
    [['#3d3d3d', 0], ['#9a9a9a', 1], ['#ffffff', 2]].forEach(([c, i]) => {
      ctx.fillStyle = c;
      ctx.fillRect(i, 0, 1, 1);
    });
    toonGradient = new THREE.CanvasTexture(canvas);
  } else {
    const data = new Uint8Array([61, 61, 61, 255, 154, 154, 154, 255, 255, 255, 255, 255]);
    toonGradient = new THREE.DataTexture(data, 3, 1);
  }
  toonGradient.minFilter = THREE.NearestFilter;
  toonGradient.magFilter = THREE.NearestFilter;
  toonGradient.needsUpdate = true;
  return toonGradient;
}

const matCache = new Map();
function mat(color, { emissive = 0x000000, glow = 0, opacity = 1, toon = true, flat = false } = {}) {
  const key = `${color}|${emissive}|${glow}|${opacity}|${toon}|${flat}`;
  if (!matCache.has(key)) {
    if (flat || opacity < 1) {
      matCache.set(key, new THREE.MeshBasicMaterial({
        color, transparent: opacity < 1, opacity, depthWrite: opacity >= 1
      }));
    } else if (toon && glow <= 0) {
      matCache.set(key, new THREE.MeshToonMaterial({
        color, gradientMap: getToonGradient(), emissive, emissiveIntensity: glow || 0
      }));
    } else {
      matCache.set(key, new THREE.MeshStandardMaterial({
        color, roughness: 0.55, metalness: 0.08, emissive, emissiveIntensity: glow,
        transparent: opacity < 1, opacity
      }));
    }
  }
  return matCache.get(key);
}

const outlineMat = new THREE.MeshBasicMaterial({
  color: 0x140e0c, side: THREE.BackSide, depthWrite: true
});

const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const sphereGeo = new THREE.SphereGeometry(1, 20, 14);
const cylGeo = new THREE.CylinderGeometry(1, 1, 1, 14);
const coneGeo = new THREE.ConeGeometry(1, 1, 10);
const capsuleGeo = new THREE.CapsuleGeometry(0.5, 1, 4, 10);

function part(parent, geo, material, x, y, z, sx, sy, sz, rx = 0, ry = 0, rz = 0, { outline = false, outlinePad = 1.055 } = {}) {
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
  if (build === 'bulky') return { torso: 1.2, limb: 1.12, head: 0.96, width: 1.14 };
  if (build === 'tall') return { torso: 1.08, limb: 1.1, head: 0.92, width: 1.02 };
  if (build === 'compact') return { torso: 0.9, limb: 0.88, head: 1.1, width: 0.94 };
  if (build === 'round') return { torso: 1.26, limb: 0.92, head: 1.18, width: 1.22 };
  return { torso: 1, limb: 1, head: 1, width: 1 };
}

function cssHex(hex) {
  return `#${hex.toString(16).padStart(6, '0')}`;
}

/* ---------- Painted anime face card ---------- */
const faceTexCache = new Map();
function makeFaceTexture(v) {
  const key = `${v.kit}|${v.skin}|${v.hair}|${v.eyeColor}|${v.hairStyle}`;
  if (faceTexCache.has(key)) return faceTexCache.get(key);
  if (typeof document === 'undefined') return null;

  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const skin = cssHex(v.skin);
  const eye = cssHex(v.eyeColor || 0x1e293b);
  const brow = v.kit === 'buu' ? '#9f1239' : '#1a1410';

  // Transparent canvas + opaque oval face (alphaTest clips the square)
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.ellipse(128, 132, 92, 102, 0, 0, Math.PI * 2);
  ctx.fill();
  // Soft cheek shadow inside oval
  const grad = ctx.createRadialGradient(128, 140, 40, 128, 140, 100);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(1, 'rgba(0,0,0,0.08)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(128, 132, 92, 102, 0, 0, Math.PI * 2);
  ctx.fill();

  // Soft cheek blush
  ctx.fillStyle = 'rgba(255,120,120,0.18)';
  ctx.beginPath(); ctx.ellipse(70, 160, 22, 12, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(186, 160, 22, 12, 0, 0, Math.PI * 2); ctx.fill();

  const drawEye = (cx, flip) => {
    // White
    ctx.fillStyle = '#fffef8';
    ctx.beginPath();
    ctx.ellipse(cx, 118, 28, 32, flip * 0.12, 0, Math.PI * 2);
    ctx.fill();
    // Iris
    ctx.fillStyle = eye;
    ctx.beginPath();
    ctx.ellipse(cx + flip * 2, 122, 16, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    // Pupil
    ctx.fillStyle = '#0a0a0a';
    ctx.beginPath();
    ctx.ellipse(cx + flip * 2, 124, 7, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    // Shine
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(cx - 6, 110, 6, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + 8, 128, 3, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Upper lid ink
    ctx.strokeStyle = '#1a1410';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.ellipse(cx, 118, 28, 32, flip * 0.12, Math.PI * 1.05, Math.PI * 1.95);
    ctx.stroke();
  };

  if (v.kit === 'frieza') {
    // Alien eyes — narrower
    ctx.fillStyle = '#fffef8';
    ctx.beginPath(); ctx.ellipse(88, 120, 22, 14, 0.1, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(168, 120, 22, 14, -0.1, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#4c1d95';
    ctx.beginPath(); ctx.ellipse(88, 120, 10, 10, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(168, 120, 10, 10, 0, 0, Math.PI * 2); ctx.fill();
    // Forehead gem
    ctx.fillStyle = '#7c3aed';
    ctx.beginPath(); ctx.ellipse(128, 70, 16, 14, 0, 0, Math.PI * 2); ctx.fill();
  } else if (v.kit === 'cell') {
    ctx.fillStyle = '#fffef8';
    ctx.beginPath(); ctx.ellipse(90, 118, 24, 18, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(166, 118, 24, 18, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath(); ctx.ellipse(90, 118, 10, 12, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(166, 118, 10, 12, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0a0a0a';
    ctx.beginPath(); ctx.ellipse(90, 118, 5, 6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(166, 118, 5, 6, 0, 0, Math.PI * 2); ctx.fill();
  } else {
    drawEye(88, -1);
    drawEye(168, 1);
  }

  // Brows — thick DBZ ink
  if (v.kit !== 'frieza' && v.kit !== 'cell') {
    ctx.strokeStyle = brow;
    ctx.lineWidth = 9;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(58, 82);
    ctx.quadraticCurveTo(88, 70, 112, 78);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(198, 82);
    ctx.quadraticCurveTo(168, 70, 144, 78);
    ctx.stroke();
  }

  // Buu M mark
  if (v.kit === 'buu') {
    ctx.fillStyle = '#111827';
    ctx.fillRect(100, 48, 56, 18);
    ctx.fillRect(118, 48, 20, 42);
  }

  // Krillin forehead dots
  if (v.kit === 'krillin') {
    ctx.fillStyle = '#1c1917';
    [[100, 62], [128, 56], [156, 62], [110, 78], [146, 78], [128, 88]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill();
    });
  }

  // Nose
  if (v.kit !== 'krillin' && v.kit !== 'frieza') {
    ctx.strokeStyle = 'rgba(80,40,30,0.45)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(128, 132);
    ctx.quadraticCurveTo(136, 148, 128, 158);
    ctx.stroke();
  }

  // Mouth — slight confident curve
  ctx.strokeStyle = '#7f1d1d';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(112, 178);
  ctx.quadraticCurveTo(128, 188, 144, 178);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  faceTexCache.set(key, tex);
  return tex;
}

/* ---------- Hair ---------- */
function buildHair(head, color, style) {
  const hairMat = mat(color);
  // Soft anime sheen — keep dark hair dark (not muddy brown)
  const hi = mat(hairHighlight(color));
  const darkMat = mat(0x0a0908);

  const spike = (x, y, z, sx, sy, sz, rx = 0, rz = 0, highlight = false) => {
    part(head, coneGeo, highlight ? hi : hairMat, x, y, z, sx, sy, sz, rx, 0, rz, { outline: true, outlinePad: 1.07 });
  };

  if (style === 'goku') {
    part(head, sphereGeo, hairMat, 0, 0.2, -0.06, 0.4, 0.3, 0.38, 0, 0, 0, { outline: true });
    const tips = [
      [0, 0.58, 0.06, 0.15, 0.58, 0.15, -0.32, 0, true],
      [-0.2, 0.5, 0.1, 0.13, 0.46, 0.13, -0.42, -0.38],
      [0.22, 0.52, 0.08, 0.13, 0.5, 0.13, -0.38, 0.32, true],
      [-0.34, 0.4, 0.02, 0.12, 0.4, 0.12, -0.55, -0.55],
      [0.36, 0.42, 0, 0.12, 0.42, 0.12, -0.5, 0.55],
      [0, 0.45, -0.24, 0.17, 0.55, 0.17, -1.05, 0, true],
      [-0.14, 0.38, -0.2, 0.11, 0.36, 0.11, -0.92, -0.28],
      [0.16, 0.4, -0.22, 0.11, 0.38, 0.11, -0.98, 0.28]
    ];
    for (const t of tips) spike(t[0], t[1], t[2], t[3], t[4], t[5], t[6] || 0, t[7] || 0, !!t[8]);
    return;
  }

  if (style === 'vegeta') {
    part(head, sphereGeo, hairMat, 0, 0.22, -0.08, 0.38, 0.3, 0.36, 0, 0, 0, { outline: true });
    // Widow's peak
    part(head, coneGeo, hairMat, 0, 0.24, 0.24, 0.14, 0.26, 0.12, 0.95, 0, 0, { outline: true });
    const spikes = [
      [0, 0.62, -0.04, 0.13, 0.52, 0.13, -0.12, 0, true],
      [-0.13, 0.55, 0, 0.11, 0.44, 0.11, -0.18, -0.22],
      [0.13, 0.55, 0, 0.11, 0.44, 0.11, -0.18, 0.22],
      [-0.24, 0.44, -0.1, 0.1, 0.36, 0.1, -0.48, -0.42],
      [0.24, 0.44, -0.1, 0.1, 0.36, 0.1, -0.48, 0.42],
      [0, 0.42, -0.3, 0.15, 0.42, 0.15, -1.05, 0, true]
    ];
    for (const t of spikes) spike(t[0], t[1], t[2], t[3], t[4], t[5], t[6] || 0, t[7] || 0, !!t[8]);
    return;
  }

  if (style === 'gohan') {
    part(head, sphereGeo, hairMat, 0, 0.18, -0.04, 0.38, 0.28, 0.36, 0, 0, 0, { outline: true });
    for (let i = 0; i < 6; i++) {
      const t = (i / 5) - 0.5;
      spike(t * 0.42, 0.42 + Math.abs(t) * 0.06, 0.04 - Math.abs(t) * 0.04, 0.11, 0.36, 0.11, -0.42, t * 0.5, i === 2);
    }
    spike(0, 0.4, -0.24, 0.13, 0.38, 0.13, -0.95);
    return;
  }

  if (style === 'trunks') {
    part(head, sphereGeo, hairMat, 0, 0.2, -0.02, 0.4, 0.3, 0.4, 0, 0, 0, { outline: true });
    part(head, boxGeo, hairMat, 0, -0.02, -0.32, 0.44, 0.75, 0.22, 0.1, 0, 0, { outline: true });
    part(head, boxGeo, hairMat, -0.24, -0.12, -0.24, 0.18, 0.6, 0.18, 0.15, 0, 0.15, { outline: true });
    part(head, boxGeo, hairMat, 0.24, -0.12, -0.24, 0.18, 0.6, 0.18, 0.15, 0, -0.15, { outline: true });
    part(head, boxGeo, hi, -0.12, 0.22, 0.3, 0.16, 0.24, 0.08, 0.35);
    part(head, boxGeo, hi, 0.12, 0.2, 0.32, 0.18, 0.22, 0.08, 0.3);
    return;
  }

  if (style === 'broly') {
    part(head, sphereGeo, hairMat, 0, 0.24, -0.05, 0.44, 0.38, 0.44, 0, 0, 0, { outline: true });
    for (let i = 0; i < 11; i++) {
      const a = (i / 11) * Math.PI * 2;
      spike(Math.cos(a) * 0.24, 0.42 + (i % 2) * 0.12, Math.sin(a) * 0.2 - 0.04, 0.13, 0.5 + (i % 3) * 0.1, 0.13, -0.45, Math.cos(a) * 0.35, i % 3 === 0);
    }
    return;
  }

  if (style === 'android18') {
    part(head, sphereGeo, hairMat, 0, 0.16, -0.02, 0.42, 0.34, 0.42, 0, 0, 0, { outline: true });
    part(head, boxGeo, hairMat, -0.36, 0.04, 0.05, 0.14, 0.46, 0.24, 0, 0, 0, { outline: true });
    part(head, boxGeo, hairMat, 0.36, 0.04, 0.05, 0.14, 0.46, 0.24, 0, 0, 0, { outline: true });
    part(head, boxGeo, hairMat, 0, 0.06, -0.3, 0.58, 0.42, 0.2, 0, 0, 0, { outline: true });
    part(head, boxGeo, hi, 0.1, 0.22, 0.3, 0.3, 0.14, 0.1, 0.2);
    return;
  }

  if (style === 'android16') {
    part(head, boxGeo, hairMat, 0, 0.32, 0, 0.74, 0.16, 0.7, 0, 0, 0, { outline: true });
    part(head, boxGeo, hairMat, 0, 0.2, -0.3, 0.68, 0.3, 0.18, 0, 0, 0, { outline: true });
    part(head, boxGeo, hairMat, -0.32, 0.12, 0, 0.12, 0.38, 0.52, 0, 0, 0, { outline: true });
    part(head, boxGeo, hairMat, 0.32, 0.12, 0, 0.12, 0.38, 0.52, 0, 0, 0, { outline: true });
    return;
  }

  if (style === 'piccolo') {
    part(head, cylGeo, hairMat, -0.15, 0.44, 0.06, 0.05, 0.42, 0.05, 0.28, 0, -0.22, { outline: true });
    part(head, cylGeo, hairMat, 0.15, 0.44, 0.06, 0.05, 0.42, 0.05, 0.28, 0, 0.22, { outline: true });
    return;
  }

  if (style === 'frieza') {
    part(head, sphereGeo, hairMat, 0, 0.18, 0, 0.42, 0.4, 0.42, 0, 0, 0, { outline: true });
    part(head, boxGeo, mat(0x7c3aed), -0.3, 0.06, 0.12, 0.12, 0.24, 0.2, 0, 0, 0, { outline: true });
    part(head, boxGeo, mat(0x7c3aed), 0.3, 0.06, 0.12, 0.12, 0.24, 0.2, 0, 0, 0, { outline: true });
    return;
  }

  if (style === 'cell') {
    part(head, sphereGeo, hairMat, 0, 0.22, -0.04, 0.44, 0.38, 0.46, 0, 0, 0, { outline: true });
    part(head, coneGeo, darkMat, 0, 0.52, -0.16, 0.2, 0.45, 0.2, -0.55, 0, 0, { outline: true });
    part(head, boxGeo, darkMat, 0, 0.24, 0.3, 0.38, 0.22, 0.14, 0, 0, 0, { outline: true });
    const spot = mat(0x1a2e05);
    part(head, sphereGeo, spot, -0.24, 0.22, 0.16, 0.09, 0.09, 0.09);
    part(head, sphereGeo, spot, 0.22, 0.3, 0.06, 0.08, 0.08, 0.08);
    return;
  }

  if (style === 'buu') {
    part(head, sphereGeo, hairMat, 0, 0.18, 0, 0.44, 0.4, 0.44, 0, 0, 0, { outline: true });
    part(head, cylGeo, hairMat, 0, 0.52, -0.05, 0.08, 0.46, 0.08, 0.22, 0, 0, { outline: true });
    part(head, sphereGeo, hairMat, 0, 0.76, -0.08, 0.11, 0.11, 0.11, 0, 0, 0, { outline: true });
    return;
  }

  if (style === 'krillin') return;

  if (style === 'nezha') {
    part(head, sphereGeo, darkMat, 0, 0.18, -0.02, 0.38, 0.28, 0.38, 0, 0, 0, { outline: true });
    part(head, sphereGeo, hairMat, -0.32, 0.3, 0, 0.17, 0.17, 0.17, 0, 0, 0, { outline: true });
    part(head, sphereGeo, hairMat, 0.32, 0.3, 0, 0.17, 0.17, 0.17, 0, 0, 0, { outline: true });
    part(head, cylGeo, mat(0xfbbf24), -0.32, 0.44, 0, 0.045, 0.14, 0.045);
    part(head, cylGeo, mat(0xfbbf24), 0.32, 0.44, 0, 0.045, 0.14, 0.045);
    return;
  }

  part(head, sphereGeo, hairMat, 0, 0.18, -0.04, 0.38, 0.28, 0.36, 0, 0, 0, { outline: true });
  for (let i = 0; i < 5; i++) {
    const t = (i / 4) - 0.5;
    spike(t * 0.4, 0.42, 0, 0.11, 0.36, 0.11, -0.5, t * 0.4);
  }
}

function hairHighlight(hex) {
  const r = (hex >> 16) & 255;
  const g = (hex >> 8) & 255;
  const b = hex & 255;
  const lum = (r + g + b) / 3;
  if (lum < 50) return 0x2a3038; // cool sheen on black hair
  if (lum < 120) return lighten(hex, 0.18);
  return lighten(hex, 0.12);
}

function lighten(hex, amount) {
  const r = Math.min(255, ((hex >> 16) & 255) + Math.round(255 * amount));
  const g = Math.min(255, ((hex >> 8) & 255) + Math.round(255 * amount));
  const b = Math.min(255, (hex & 255) + Math.round(255 * amount));
  return (r << 16) | (g << 8) | b;
}

/* ---------- Face ---------- */
function buildFace(head, v, s) {
  const skin = mat(v.skin);
  part(head, sphereGeo, skin, 0, 0.1, 0, 0.36 * s.head, 0.4 * s.head, 0.36 * s.head, 0, 0, 0, { outline: true, outlinePad: 1.05 });

  // Painted anime face — oval-clipped plane nestled on the head surface
  const faceTex = makeFaceTexture(v);
  if (faceTex) {
    const faceMat = new THREE.MeshBasicMaterial({
      map: faceTex,
      transparent: true,
      alphaTest: 0.35,
      depthWrite: true,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2
    });
    const card = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * s.head, 0.56 * s.head), faceMat);
    // Sit just outside the head sphere (radius ~0.36) so features stay visible
    card.position.set(0, 0.1, 0.355 * s.head);
    head.add(card);
  }

  if (v.kit === 'piccolo' || v.kit === 'cell') {
    part(head, coneGeo, skin, -0.4, 0.1, 0.02, 0.11, 0.24, 0.09, 0, 0, 1.15, { outline: true });
    part(head, coneGeo, skin, 0.4, 0.1, 0.02, 0.11, 0.24, 0.09, 0, 0, -1.15, { outline: true });
  }

  if (v.kit === 'frieza') {
    part(head, sphereGeo, mat(0x7c3aed, { emissive: 0x7c3aed, glow: 0.4 }), 0, 0.3, 0.24, 0.1, 0.1, 0.08);
  }

  buildHair(head, v.hair, v.hairStyle);
}

/* ---------- Outfits ---------- */
function buildOutfit(torso, hips, v, s) {
  const kit = v.kit || 'gi';
  const outfit = mat(v.outfit);
  const accent = mat(v.accent);
  const pants = mat(v.pants);
  const undershirt = mat(v.undershirt || v.accent);
  const gold = mat(v.gold || 0xfbbf24);
  const w = 0.52 * s.torso * s.width;
  const h = 0.7 * s.torso;
  const depth = 0.3 * s.torso;

  // Soft torso volume (capsule-ish box with outline)
  const body = (material, y, sy, extraW = 1, extraD = 1) =>
    part(torso, boxGeo, material, 0, y, 0, w * extraW, sy, depth * extraD, 0, 0, 0, { outline: true, outlinePad: 1.04 });

  if (kit === 'gi') {
    body(undershirt, 0.38 * s.torso, h * 0.95, 0.92, 0.9);
    body(outfit, 0.36 * s.torso, h, 1, 1.05);
    // V collar
    part(torso, boxGeo, undershirt, 0, 0.58 * s.torso, depth * 0.55, 0.24, 0.22, 0.06);
    // Sash
    part(torso, boxGeo, mat(0x1c1917), 0, 0.04 * s.torso, 0, w * 1.08, 0.13, depth * 1.2, 0, 0, 0, { outline: true });
    // Sleeve cuffs hint on torso sides
    part(hips, boxGeo, pants, 0, -0.06, 0, w * 0.98, 0.3, depth * 1.05, 0, 0, 0, { outline: true });
    return { wrist: undershirt, bootAccent: gold, sleeve: outfit };
  }

  if (kit === 'saiyanArmor') {
    const white = mat(0xffffff);
    body(undershirt, 0.35 * s.torso, h, 0.92, 0.95);
    body(white, 0.44 * s.torso, 0.42 * s.torso, 1.14, 1.2);
    part(torso, boxGeo, gold, 0, 0.2 * s.torso, depth * 0.4, w * 0.78, 0.2, depth * 0.7, 0, 0, 0, { outline: true });
    part(torso, boxGeo, mat(0x1c1917, { flat: true }), 0, 0.2 * s.torso, depth * 0.75, w * 0.55, 0.025, 0.03);
    part(torso, sphereGeo, white, -0.42 * s.width, 0.6 * s.torso, 0, 0.18, 0.14, 0.16, 0, 0, 0, { outline: true });
    part(torso, sphereGeo, white, 0.42 * s.width, 0.6 * s.torso, 0, 0.18, 0.14, 0.16, 0, 0, 0, { outline: true });
    part(hips, boxGeo, undershirt, 0, -0.05, 0, w * 0.88, 0.26, depth, 0, 0, 0, { outline: true });
    return { wrist: white, bootAccent: gold, sleeve: undershirt };
  }

  if (kit === 'namekian' || kit === 'trainee') {
    body(outfit, 0.34 * s.torso, h);
    part(torso, boxGeo, accent, 0, 0.62 * s.torso, 0.04, w * 1.08, 0.12, depth * 1.15, 0, 0, 0, { outline: true });
    part(torso, boxGeo, accent, 0, 0.02, 0, w * 1.08, 0.11, depth * 1.15, 0, 0, 0, { outline: true });
    if (kit === 'namekian') {
      part(torso, boxGeo, accent, 0, 0.22 * s.torso, -depth * 1.05, w * 1.35, 0.9 * s.torso, 0.08, 0.15, 0, 0, { outline: true });
    }
    part(hips, boxGeo, outfit, 0, -0.06, 0, w * 0.92, 0.28, depth, 0, 0, 0, { outline: true });
    return { wrist: outfit, bootAccent: accent, sleeve: outfit, turban: kit === 'namekian' };
  }

  if (kit === 'capsule') {
    body(mat(0x1c1917), 0.38 * s.torso, h * 0.85, 0.88, 0.9);
    body(outfit, 0.4 * s.torso, h * 0.72, 1.08, 1.15);
    part(torso, boxGeo, outfit, -0.34 * s.width, 0.36, 0, 0.2, 0.58, depth, 0, 0, 0, { outline: true });
    part(torso, boxGeo, outfit, 0.34 * s.width, 0.36, 0, 0.2, 0.58, depth, 0, 0, 0, { outline: true });
    part(torso, sphereGeo, mat(0x38bdf8, { emissive: 0x38bdf8, glow: 0.45 }), 0.24, 0.5 * s.torso, depth * 0.7, 0.07, 0.07, 0.05);
    part(torso, boxGeo, gold, 0, 0.02, 0, w * 1.05, 0.11, depth * 1.15, 0, 0, 0, { outline: true });
    part(hips, boxGeo, pants, 0, -0.06, 0, w * 0.92, 0.28, depth, 0, 0, 0, { outline: true });
    part(torso, boxGeo, mat(0xcbd5e1), 0.16, 0.35, -depth * 1.15, 0.07, 1.15, 0.07, 0.2, 0, 0, { outline: true });
    part(torso, boxGeo, mat(0x334155), 0.16, 0.88, -depth * 1.15, 0.12, 0.2, 0.12);
    return { wrist: mat(0x1c1917), bootAccent: gold, sleeve: mat(0x1c1917) };
  }

  if (kit === 'frieza') {
    body(outfit, 0.35 * s.torso, h * 0.95, 0.96, 1);
    part(torso, boxGeo, accent, 0, 0.46 * s.torso, depth * 0.55, w * 0.58, 0.36, 0.1, 0, 0, 0, { outline: true });
    part(torso, sphereGeo, mat(0x7c3aed, { emissive: 0x7c3aed, glow: 0.5 }), 0, 0.52 * s.torso, depth * 0.7, 0.11, 0.11, 0.09);
    part(hips, boxGeo, outfit, 0, -0.04, 0, w * 0.88, 0.24, depth, 0, 0, 0, { outline: true });
    part(hips, cylGeo, outfit, 0, -0.08, -0.38, 0.08, 0.75, 0.08, 1.05, 0, 0, { outline: true });
    part(hips, sphereGeo, accent, 0, -0.36, -0.74, 0.11, 0.11, 0.11);
    return { wrist: outfit, bootAccent: accent, sleeve: outfit };
  }

  if (kit === 'broly') {
    body(mat(v.skin), 0.4 * s.torso, h * 0.92, 1.08, 1.1);
    for (let i = 0; i < 7; i++) {
      const a = (i / 6) * Math.PI - Math.PI / 2;
      part(torso, sphereGeo, gold, Math.cos(a) * 0.24, 0.64 * s.torso + Math.sin(a) * 0.08, depth * 0.55, 0.055, 0.055, 0.055);
    }
    part(hips, boxGeo, pants, 0, -0.08, 0, w * 1.05, 0.36, depth * 1.1, 0, 0, 0, { outline: true });
    part(torso, boxGeo, mat(0x1c1917), 0, 0.04, 0, w * 1.1, 0.11, depth * 1.2, 0, 0, 0, { outline: true });
    return { wrist: mat(0x1c1917), bootAccent: gold, sleeve: mat(v.skin), bareArms: true };
  }

  if (kit === 'android18') {
    body(mat(0x1c1917), 0.4 * s.torso, h * 0.7, 0.88, 0.9);
    body(outfit, 0.42 * s.torso, h * 0.68, 1.1, 1.15);
    part(torso, boxGeo, outfit, -0.36 * s.width, 0.38, 0, 0.22, 0.55, depth, 0, 0, 0, { outline: true });
    part(torso, boxGeo, outfit, 0.36 * s.width, 0.38, 0, 0.22, 0.55, depth, 0, 0, 0, { outline: true });
    part(torso, boxGeo, accent, 0, 0.08, 0, w * 1.05, 0.11, depth * 1.15, 0, 0, 0, { outline: true });
    part(torso, boxGeo, gold, 0, 0.08, depth * 0.6, 0.12, 0.09, 0.05);
    part(hips, boxGeo, pants, 0, -0.06, 0, w * 0.92, 0.28, depth, 0, 0, 0, { outline: true });
    return { wrist: mat(0xf8fafc), bootAccent: accent, sleeve: outfit, bandage: true };
  }

  if (kit === 'cell') {
    body(outfit, 0.36 * s.torso, h);
    const spot = mat(0x14532d);
    part(torso, boxGeo, spot, 0, 0.5 * s.torso, depth * 0.55, w * 0.72, 0.22, 0.08);
    part(torso, sphereGeo, spot, -0.2, 0.3, depth * 0.6, 0.09, 0.09, 0.06);
    part(torso, sphereGeo, spot, 0.2, 0.36, depth * 0.6, 0.08, 0.08, 0.06);
    part(torso, boxGeo, mat(0x1a2e05, { opacity: 0.9 }), -0.58, 0.4, -depth * 0.7, 0.48, 0.58, 0.05, 0.25, 0, 0.45, { outline: true });
    part(torso, boxGeo, mat(0x1a2e05, { opacity: 0.9 }), 0.58, 0.4, -depth * 0.7, 0.48, 0.58, 0.05, 0.25, 0, -0.45, { outline: true });
    part(hips, boxGeo, outfit, 0, -0.06, 0, w * 0.92, 0.28, depth, 0, 0, 0, { outline: true });
    return { wrist: outfit, bootAccent: accent, sleeve: outfit };
  }

  if (kit === 'buu') {
    body(mat(v.skin), 0.35 * s.torso, h * 0.95, 1.18, 1.25);
    body(outfit, 0.32 * s.torso, h * 0.72, 1.05, 0.9);
    part(torso, boxGeo, accent, 0, 0.28, -depth * 1.1, w * 1.3, 0.85, 0.09, 0.12, 0, 0, { outline: true });
    part(hips, boxGeo, outfit, 0, -0.08, 0, w * 1.1, 0.32, depth * 1.1, 0, 0, 0, { outline: true });
    return { wrist: mat(v.skin), bootAccent: accent, sleeve: mat(v.skin), bareArms: true };
  }

  if (kit === 'android16') {
    body(outfit, 0.36 * s.torso, h, 1.12, 1.15);
    part(torso, boxGeo, accent, 0, 0.46 * s.torso, depth * 0.55, 0.22, 0.28, 0.08);
    part(torso, sphereGeo, mat(0xef4444, { emissive: 0xef4444, glow: 0.55 }), 0, 0.5 * s.torso, depth * 0.75, 0.09, 0.09, 0.07);
    part(hips, boxGeo, pants, 0, -0.06, 0, w * 0.98, 0.3, depth, 0, 0, 0, { outline: true });
    return { wrist: mat(0x1c1917), bootAccent: accent, sleeve: outfit };
  }

  if (kit === 'nezha') {
    body(outfit, 0.36 * s.torso, h * 0.88);
    part(torso, boxGeo, gold, 0, 0.56 * s.torso, 0.08, w * 0.95, 0.12, depth, 0, 0, 0, { outline: true });
    part(torso, boxGeo, gold, 0, 0.04, 0, w * 1.05, 0.11, depth * 1.1, 0, 0, 0, { outline: true });
    part(torso, cylGeo, mat(0xff5722, { emissive: 0xff5722, glow: 0.55 }), -0.58, 0.2, 0, 0.3, 0.07, 0.3, 0, 0, Math.PI / 2);
    part(torso, cylGeo, mat(0xff5722, { emissive: 0xff5722, glow: 0.55 }), 0.58, 0.2, 0, 0.3, 0.07, 0.3, 0, 0, Math.PI / 2);
    part(hips, boxGeo, pants, 0, -0.06, 0, w * 0.92, 0.26, depth, 0, 0, 0, { outline: true });
    return { wrist: gold, bootAccent: gold, sleeve: outfit };
  }

  body(outfit, 0.35 * s.torso, h);
  part(torso, boxGeo, accent, 0, 0.5 * s.torso, depth * 0.55, 0.26, 0.18, 0.06);
  part(hips, boxGeo, pants, 0, -0.06, 0, w * 0.92, 0.28, depth, 0, 0, 0, { outline: true });
  return { wrist: accent, bootAccent: mat(v.boots || 0x1a1a1a), sleeve: outfit };
}

/**
 * Builds a rigged anime fighter.
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
  root.scale.setScalar(1.32);

  const torso = new THREE.Group();
  torso.position.y = 0.28 * s.torso;
  hips.add(torso);

  const kitParts = buildOutfit(torso, hips, v, s);

  const head = new THREE.Group();
  head.position.y = 0.84 * s.torso;
  torso.add(head);
  buildFace(head, v, s);

  if (kitParts.turban) {
    part(head, cylGeo, mat(v.accent || 0xf8fafc), 0, 0.34, 0, 0.4, 0.24, 0.4, 0, 0, 0, { outline: true });
    part(head, boxGeo, mat(v.accent || 0xf8fafc), 0, 0.24, 0.32, 0.14, 0.1, 0.22);
  }

  const makeArm = (side) => {
    const shoulder = new THREE.Group();
    shoulder.position.set(side * 0.42 * s.torso * s.width, 0.56 * s.torso, 0);
    torso.add(shoulder);
    const upper = new THREE.Group();
    shoulder.add(upper);
    const sleeveMat = kitParts.bareArms ? skin : (kitParts.sleeve || mat(v.outfit));
    part(upper, capsuleGeo, sleeveMat, 0, -0.22 * s.limb, 0, 0.22 * s.limb, 0.32 * s.limb, 0.22 * s.limb, 0, 0, 0, { outline: true, outlinePad: 1.08 });
    const elbow = new THREE.Group();
    elbow.position.y = -0.48 * s.limb;
    upper.add(elbow);
    part(elbow, capsuleGeo, skin, 0, -0.18 * s.limb, 0, 0.2 * s.limb, 0.28 * s.limb, 0.2 * s.limb, 0, 0, 0, { outline: true, outlinePad: 1.08 });
    part(elbow, cylGeo, kitParts.wrist || mat(v.accent), 0, -0.34 * s.limb, 0, 0.12 * s.limb, 0.1, 0.12 * s.limb);
    if (kitParts.bandage && side < 0) {
      part(elbow, cylGeo, mat(0xf8fafc), 0, -0.12 * s.limb, 0, 0.13, 0.3, 0.13);
    }
    part(elbow, sphereGeo, skin, 0, -0.42 * s.limb, 0.02, 0.12, 0.11, 0.14, 0, 0, 0, { outline: true });
    return { shoulder, upper, elbow };
  };

  const makeLeg = (side) => {
    const hip = new THREE.Group();
    hip.position.set(side * 0.15 * s.torso * s.width, -0.04, 0);
    hips.add(hip);
    const thigh = new THREE.Group();
    hip.add(thigh);
    part(thigh, capsuleGeo, mat(v.pants), 0, -0.28 * s.limb, 0, 0.28 * s.limb, 0.36 * s.limb, 0.28 * s.limb, 0, 0, 0, { outline: true, outlinePad: 1.08 });
    const knee = new THREE.Group();
    knee.position.y = -0.54 * s.limb;
    thigh.add(knee);
    part(knee, capsuleGeo, mat(v.pants), 0, -0.18 * s.limb, 0, 0.24 * s.limb, 0.28 * s.limb, 0.24 * s.limb, 0, 0, 0, { outline: true, outlinePad: 1.08 });
    part(knee, boxGeo, boots, 0, -0.42 * s.limb, 0.05, 0.18, 0.24, 0.3, 0, 0, 0, { outline: true });
    part(knee, boxGeo, kitParts.bootAccent || boots, 0, -0.48 * s.limb, 0.14, 0.19, 0.09, 0.22);
    return { hip, thigh, knee };
  };

  const leftArm = makeArm(-1);
  const rightArm = makeArm(1);
  const leftLeg = makeLeg(-1);
  const rightLeg = makeLeg(1);

  const aura = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 18, 14),
    new THREE.MeshBasicMaterial({
      color: v.aura, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending
    })
  );
  aura.scale.set(1.2, 1.75, 1.2);
  aura.position.y = 1.15;
  root.add(aura);

  const bones = { hips, torso, head, leftArm, rightArm, leftLeg, rightLeg, aura };
  let facing = 1;
  let anim = 'idle';
  let animT = 0;
  // Slight turn toward camera so face cards read (FighterZ-style)
  // Turn toward +Z camera so both fighters show a 3/4 anime face
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

    if (hurt) {
      torso.rotation.x = -0.35;
      leftArm.upper.rotation.x = -0.8;
      rightArm.upper.rotation.x = -0.8;
    } else if (guarding) {
      leftArm.upper.rotation.x = -1.45;
      rightArm.upper.rotation.x = -1.45;
      leftArm.elbow.rotation.x = -1.05;
      rightArm.elbow.rotation.x = -1.05;
      torso.rotation.x = 0.12;
    } else if (attack === 'punch' || attack === 'uppercut') {
      const lead = facing > 0 ? rightArm : leftArm;
      const other = facing > 0 ? leftArm : rightArm;
      const phase = Math.min(1, t / 0.18);
      lead.upper.rotation.x = -1.7 * phase;
      lead.elbow.rotation.x = -0.15;
      other.upper.rotation.x = -0.45;
      if (attack === 'uppercut') {
        lead.upper.rotation.x = -2.3 * phase;
        torso.rotation.x = -0.28 * phase;
        hips.position.y += 0.08 * phase;
      }
    } else if (attack === 'kick' || attack === 'dash') {
      const lead = facing > 0 ? rightLeg : leftLeg;
      const phase = Math.min(1, t / 0.2);
      lead.thigh.rotation.x = -1.45 * phase;
      torso.rotation.x = 0.22;
      if (attack === 'dash') torso.rotation.x = 0.48;
    } else if (charging) {
      leftArm.upper.rotation.x = -1.15;
      rightArm.upper.rotation.x = -1.15;
      leftArm.elbow.rotation.x = -0.85;
      rightArm.elbow.rotation.x = -0.85;
      torso.rotation.z = Math.sin(t * 18) * 0.04;
      aura.material.opacity = 0.4 + Math.sin(t * 12) * 0.15;
      aura.scale.setScalar(1.08 + Math.sin(t * 8) * 0.1);
    } else if (airborne) {
      leftArm.upper.rotation.x = -0.65;
      rightArm.upper.rotation.x = -0.65;
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
      // Idle: fighting stance + subtle breath
      const breath = Math.sin(t * 2.4) * 0.02;
      torso.position.y = 0.28 * s.torso + breath;
      leftArm.upper.rotation.x = -0.35 + breath;
      rightArm.upper.rotation.x = -0.35 - breath;
      leftArm.elbow.rotation.x = -0.55;
      rightArm.elbow.rotation.x = -0.55;
      leftLeg.thigh.rotation.x = 0.18;
      rightLeg.thigh.rotation.x = -0.12;
      torso.rotation.x = 0.08;
    }

    if (!charging) {
      aura.material.opacity += ((state.aura || 0) - aura.material.opacity) * Math.min(1, 6 * dt);
    }
  }

  function dispose() {
    root.traverse((obj) => {
      if (obj.isMesh) {
        if (obj.geometry && ![boxGeo, sphereGeo, cylGeo, coneGeo, capsuleGeo].includes(obj.geometry)) {
          obj.geometry.dispose();
        }
        if (obj.material && obj.material.map && obj.material.map.image) {
          // face textures shared via cache — don't dispose maps
        }
      }
    });
  }

  return { root, bones, setFacing, setAnim, animate, dispose, height: v.height };
}
