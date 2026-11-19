// Shared graphics helpers for the City Driving world: procedural textures, UV-tiled walls and static-geometry merging.
import * as THREE from './vendor/three/three.module.min.js';

export function canvasTexture(w, h, draw, { repeat = true, anisotropy = 8 } = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  draw(canvas.getContext('2d'), w, h);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  if (repeat) tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = anisotropy;
  return tex;
}

// Deterministic generator so every visit gets the same textures.
export function lcg(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function speckle(ctx, w, h, rand, count, colors, size = 1.6) {
  for (let i = 0; i < count; i++) {
    ctx.fillStyle = colors[Math.floor(rand() * colors.length)];
    ctx.fillRect(rand() * w, rand() * h, size * (0.4 + rand()), size * (0.4 + rand()));
  }
}

export function asphaltTexture() {
  const rand = lcg(11);
  return canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#464c4e';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 14; i++) {
      ctx.fillStyle = `rgba(${rand() > 0.5 ? '255,255,255' : '0,0,0'},${0.02 + rand() * 0.035})`;
      ctx.beginPath();
      ctx.ellipse(rand() * w, rand() * h, 20 + rand() * 60, 12 + rand() * 40, rand() * 3, 0, 7);
      ctx.fill();
    }
    speckle(ctx, w, h, rand, 5200, ['rgba(255,255,255,.10)', 'rgba(0,0,0,.18)', 'rgba(150,150,150,.14)', 'rgba(20,20,20,.2)']);
    ctx.strokeStyle = 'rgba(15,15,15,.28)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      let x = rand() * w; let y = rand() * h;
      ctx.moveTo(x, y);
      for (let k = 0; k < 6; k++) { x += (rand() - 0.5) * 40; y += rand() * 24; ctx.lineTo(x, y); }
      ctx.stroke();
    }
  });
}

export function grassTexture() {
  const rand = lcg(23);
  return canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#d8dccd';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(${rand() > 0.5 ? '255,255,255' : '60,70,40'},${0.05 + rand() * 0.07})`;
      ctx.beginPath();
      ctx.ellipse(rand() * w, rand() * h, 14 + rand() * 40, 10 + rand() * 30, rand() * 3, 0, 7);
      ctx.fill();
    }
    ctx.lineWidth = 1;
    for (let i = 0; i < 2600; i++) {
      const x = rand() * w; const y = rand() * h;
      ctx.strokeStyle = rand() > 0.5 ? 'rgba(70,95,50,.28)' : 'rgba(255,255,230,.22)';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + (rand() - 0.5) * 3, y - 2 - rand() * 4);
      ctx.stroke();
    }
  });
}

export function paverTexture() {
  const rand = lcg(31);
  return canvasTexture(256, 256, (ctx, w, h) => {
    const n = 4;
    const s = w / n;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const v = 218 + Math.floor(rand() * 26);
        ctx.fillStyle = `rgb(${v},${v - 3},${v - 10})`;
        ctx.fillRect(c * s, r * s, s, s);
        ctx.fillStyle = `rgba(0,0,0,${rand() * 0.05})`;
        ctx.fillRect(c * s, r * s, s, s);
      }
    }
    ctx.strokeStyle = 'rgba(95,90,80,.55)';
    ctx.lineWidth = 2.5;
    for (let i = 0; i <= n; i++) {
      ctx.beginPath(); ctx.moveTo(i * s, 0); ctx.lineTo(i * s, h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * s); ctx.lineTo(w, i * s); ctx.stroke();
    }
    speckle(ctx, w, h, rand, 900, ['rgba(0,0,0,.08)', 'rgba(255,255,255,.12)']);
  });
}

export function waterTexture() {
  const rand = lcg(41);
  return canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#d8e8f0';
    ctx.fillRect(0, 0, w, h);
    ctx.lineCap = 'round';
    for (let i = 0; i < 260; i++) {
      const x = rand() * w; const y = rand() * h;
      ctx.strokeStyle = rand() > 0.4 ? 'rgba(255,255,255,.35)' : 'rgba(40,90,130,.18)';
      ctx.lineWidth = 1 + rand() * 1.5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + 8, y - 3, x + 18 + rand() * 12, y);
      ctx.stroke();
    }
  });
}

export function zebraTexture() {
  return canvasTexture(512, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(245,244,230,.95)';
    const n = 17;
    const stripe = w / n;
    for (let i = 0; i < n; i += 2) ctx.fillRect(i * stripe, 0, stripe, h);
    ctx.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 700; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.25})`;
      ctx.fillRect(Math.random() * w, Math.random() * h, 3, 3);
    }
  }, { repeat: false });
}

export function checkerTexture(cols = 16, rows = 2, size = 32) {
  return canvasTexture(cols * size, rows * size, (ctx) => {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        ctx.fillStyle = (r + c) % 2 ? '#111' : '#f4f4f0';
        ctx.fillRect(c * size, r * size, size, size);
      }
    }
  }, { repeat: false });
}

export function signTexture(text, bg, fg = '#fff', w = 256, h = 80) {
  return canvasTexture(w, h, (ctx) => {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = fg;
    ctx.globalAlpha = 0.7;
    ctx.lineWidth = 3;
    ctx.strokeRect(5, 5, w - 10, h - 10);
    ctx.globalAlpha = 1;
    ctx.fillStyle = fg;
    ctx.font = 'bold 34px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, w / 2, h / 2 + 2, w - 24);
  }, { repeat: false });
}

export function cloudTexture() {
  return canvasTexture(256, 128, (ctx, w, h) => {
    const rand = lcg(7);
    for (let i = 0; i < 26; i++) {
      const x = w * (0.2 + rand() * 0.6);
      const y = h * (0.45 + rand() * 0.25);
      const r = 18 + rand() * 30;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, 'rgba(255,255,255,.55)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
  }, { repeat: false });
}

// Facade tiles. Each returns a colour map (tinted per building by material colour) and a window-light map for night.
export const FACADES = {
  glass: { tileW: 12.8, tileH: 14.4, draw(ctx, lit, rand) {
    const n = 4; const s = 64;
    ctx.fillStyle = '#9aa6a6'; ctx.fillRect(0, 0, 256, 256);
    lit.fillStyle = '#000'; lit.fillRect(0, 0, 256, 256);
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const x = c * s; const y = r * s;
        const g = ctx.createLinearGradient(x, y, x + s, y + s);
        const k = rand();
        g.addColorStop(0, k > 0.7 ? '#a8d4e0' : '#6aa3b6');
        g.addColorStop(1, k > 0.4 ? '#2d6074' : '#3f7d90');
        ctx.fillStyle = g;
        ctx.fillRect(x + 2, y + 2, s - 4, s - 16);
        ctx.fillStyle = 'rgba(255,255,255,.16)';
        ctx.beginPath(); ctx.moveTo(x + 2, y + s - 16); ctx.lineTo(x + 26, y + 2); ctx.lineTo(x + 40, y + 2); ctx.lineTo(x + 16, y + s - 16); ctx.fill();
        if (rand() > 0.82) {
          ctx.fillStyle = 'rgba(230,230,220,.55)';
          ctx.fillRect(x + 2, y + 2, s - 4, (s - 16) * (0.3 + rand() * 0.5));
        }
        ctx.fillStyle = '#b9c0be'; ctx.fillRect(x, y + s - 14, s, 14);
        ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(x, y + s - 14, s, 2);
        if (rand() > 0.62) { lit.fillStyle = '#ffd98a'; lit.fillRect(x + 2, y + 2, s - 4, s - 16); }
      }
    }
    ctx.strokeStyle = '#222d31'; ctx.lineWidth = 3;
    for (let i = 0; i <= n; i++) { ctx.beginPath(); ctx.moveTo(i * s, 0); ctx.lineTo(i * s, 256); ctx.stroke(); }
  } },
  hdb: { tileW: 12, tileH: 12, draw(ctx, lit, rand) {
    const n = 4; const s = 64;
    ctx.fillStyle = '#efe7d6'; ctx.fillRect(0, 0, 256, 256);
    lit.fillStyle = '#000'; lit.fillRect(0, 0, 256, 256);
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const x = c * s; const y = r * s;
        ctx.fillStyle = 'rgba(0,0,0,.05)'; ctx.fillRect(x, y + s - 8, s, 8);
        ctx.fillStyle = '#7d8e98'; ctx.fillRect(x + 12, y + 12, 40, 30);
        ctx.fillStyle = '#4a5c68'; ctx.fillRect(x + 14, y + 14, 36, 26);
        ctx.fillStyle = '#e8ecec'; ctx.fillRect(x + 31, y + 14, 2, 26);
        ctx.fillStyle = '#fff'; ctx.fillRect(x + 8, y + 42, 48, 4);
        ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(x + 8, y + 46, 48, 2);
        if (rand() > 0.6) { ctx.fillStyle = '#d6d0c2'; ctx.fillRect(x + 20, y + 49, 24, 7); }
        if (rand() > 0.6) { lit.fillStyle = '#ffd98a'; lit.fillRect(x + 14, y + 14, 36, 26); }
      }
    }
    ctx.fillStyle = 'rgba(0,0,0,.08)';
    for (let c = 0; c < n; c++) ctx.fillRect(c * s, 0, 2, 256);
  } },
  concrete: { tileW: 8, tileH: 7.2, draw(ctx, lit, rand) {
    ctx.fillStyle = '#cfd2ce'; ctx.fillRect(0, 0, 256, 256);
    lit.fillStyle = '#000'; lit.fillRect(0, 0, 256, 256);
    for (let r = 0; r < 2; r++) {
      const y = r * 128;
      ctx.fillStyle = '#e1e3df'; ctx.fillRect(0, y, 256, 18);
      ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.fillRect(0, y + 18, 256, 3);
      ctx.fillStyle = '#4d6a74'; ctx.fillRect(0, y + 28, 256, 76);
      ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.fillRect(0, y + 28, 256, 22);
      ctx.fillStyle = '#bfc3bf';
      for (let i = 0; i <= 8; i++) ctx.fillRect(i * 32 - 2, y + 24, 4, 84);
      for (let i = 0; i < 8; i++) if (rand() > 0.55) { lit.fillStyle = '#ffd98a'; lit.fillRect(i * 32 + 2, y + 28, 28, 76); }
    }
  } },
  shophouse: { tileW: 3.6, tileH: 3.4, draw(ctx, lit) {
    ctx.fillStyle = '#fdf6ea'; ctx.fillRect(0, 0, 128, 128);
    lit.fillStyle = '#000'; lit.fillRect(0, 0, 128, 128);
    ctx.fillStyle = 'rgba(0,0,0,.08)'; ctx.fillRect(0, 112, 128, 16);
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 108, 128, 5);
    ctx.fillStyle = '#fff'; ctx.fillRect(30, 20, 68, 88);
    ctx.fillStyle = '#6b8f6a';
    ctx.beginPath(); ctx.moveTo(36, 106); ctx.lineTo(36, 44); ctx.arc(64, 44, 28, Math.PI, 0); ctx.lineTo(92, 106); ctx.fill();
    ctx.strokeStyle = 'rgba(30,50,30,.55)'; ctx.lineWidth = 1.2;
    for (let y = 36; y < 106; y += 5) { ctx.beginPath(); ctx.moveTo(36, y); ctx.lineTo(92, y); ctx.stroke(); }
    ctx.fillStyle = '#fff'; ctx.fillRect(63, 16, 2, 92);
    ctx.fillStyle = '#d9d2c3'; ctx.fillRect(26, 106, 76, 6);
    lit.fillStyle = '#ffd98a'; lit.fillRect(40, 50, 48, 52);
  } }
};

export function makeFacadeMaps(kind) {
  const spec = FACADES[kind];
  const rand = lcg(kind.length * 97 + 5);
  const size = kind === 'shophouse' ? 128 : 256;
  const lit = document.createElement('canvas');
  lit.width = lit.height = size;
  const litCtx = lit.getContext('2d');
  const map = canvasTexture(size, size, (ctx) => spec.draw(ctx, litCtx, rand), { anisotropy: 8 });
  const emissive = new THREE.CanvasTexture(lit);
  emissive.colorSpace = THREE.SRGBColorSpace;
  emissive.wrapS = emissive.wrapT = THREE.RepeatWrapping;
  emissive.anisotropy = 4;
  return { map, emissive, tileW: spec.tileW, tileH: spec.tileH };
}

// Four-sided wall box (no top or bottom) with UVs scaled so one texture tile equals tileW x tileH metres.
export function wallsGeometry(w, h, d, tileW, tileH) {
  const src = new THREE.BoxGeometry(w, h, d);
  const index = src.index.array;
  const uv = src.attributes.uv;
  const faceW = [d, d, w, w, w, w];
  for (let f = 0; f < 6; f++) {
    if (f === 2 || f === 3) continue;
    for (let i = 0; i < 4; i++) uv.setXY(f * 4 + i, uv.getX(f * 4 + i) * faceW[f] / tileW, uv.getY(f * 4 + i) * h / tileH);
  }
  const keep = [];
  for (let f = 0; f < 6; f++) {
    if (f === 2 || f === 3) continue;
    for (let t = 0; t < 6; t++) keep.push(index[f * 6 + t]);
  }
  src.setIndex(keep);
  return src;
}

// Flattens static children of `root` into one mesh per material. Meshes flagged userData.dynamic keep their own transforms.
// Marks wheel groups (and their parents inside the model) so mergeStatics keeps them animatable.
export function mergeVehicle(model) {
  (model.userData.wheels || []).forEach((spin) => mergeStatics(spin));
  const keep = (node) => { for (let p = node; p && p !== model; p = p.parent) p.userData.dynamic = true; };
  (model.userData.wheels || []).forEach(keep);
  (model.userData.frontPivots || []).forEach(keep);
  mergeStatics(model);
}

// Optional `track` (Map) receives, per userData.breakId ancestor, the merged index ranges so a part can be hidden later.
export function mergeStatics(root, track = null) {
  root.updateMatrixWorld(true);
  const inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
  const groups = new Map();
  const doomed = [];
  const owners = new Map();
  root.traverse((o) => {
    if (!o.isMesh || Array.isArray(o.material) || o.userData.dynamic) return;
    let p = o.parent;
    while (p && p !== root) { if (p.userData.dynamic) return; p = p.parent; }
    const g = o.geometry;
    if (!g.attributes.position || !g.attributes.normal || !g.attributes.uv) return;
    const key = o.material.uuid;
    if (!groups.has(key)) groups.set(key, { material: o.material, parts: [] });
    groups.get(key).parts.push(o);
    if (track) {
      for (let q = o; q && q !== root; q = q.parent) if (q.userData.breakId) { owners.set(o, q.userData.breakId); break; }
    }
    doomed.push(o);
  });
  const m = new THREE.Matrix4();
  const n = new THREE.Matrix3();
  const v = new THREE.Vector3();
  for (const { material, parts } of groups.values()) {
    let verts = 0; let idx = 0;
    const prepared = parts.map((mesh) => {
      const geo = mesh.geometry;
      const count = geo.attributes.position.count;
      const triCount = geo.index ? geo.index.count : count;
      verts += count; idx += triCount;
      return { mesh, count, triCount };
    });
    const pos = new Float32Array(verts * 3);
    const nor = new Float32Array(verts * 3);
    const uvs = new Float32Array(verts * 2);
    const ind = new Uint32Array(idx);
    let vo = 0; let io = 0;
    const spans = [];
    for (const { mesh, count, triCount } of prepared) {
      if (owners.has(mesh)) spans.push({ id: owners.get(mesh), start: io, count: triCount });
      const geo = mesh.geometry;
      m.multiplyMatrices(inv, mesh.matrixWorld);
      n.getNormalMatrix(m);
      for (let i = 0; i < count; i++) {
        v.fromBufferAttribute(geo.attributes.position, i).applyMatrix4(m);
        pos.set([v.x, v.y, v.z], (vo + i) * 3);
        v.fromBufferAttribute(geo.attributes.normal, i).applyMatrix3(n).normalize();
        nor.set([v.x, v.y, v.z], (vo + i) * 3);
        uvs[(vo + i) * 2] = geo.attributes.uv.getX(i);
        uvs[(vo + i) * 2 + 1] = geo.attributes.uv.getY(i);
      }
      if (geo.index) for (let i = 0; i < triCount; i++) ind[io + i] = geo.index.getX(i) + vo;
      else for (let i = 0; i < triCount; i++) ind[io + i] = vo + i;
      vo += count; io += triCount;
    }
    const merged = new THREE.BufferGeometry();
    merged.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    merged.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    merged.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    merged.setIndex(new THREE.BufferAttribute(ind, 1));
    const mesh = new THREE.Mesh(merged, material);
    mesh.castShadow = !material.transparent;
    mesh.receiveShadow = true;
    mesh.userData.merged = true;
    root.add(mesh);
    for (const span of spans) {
      if (!track.has(span.id)) track.set(span.id, []);
      track.get(span.id).push({ mesh, start: span.start, count: span.count });
    }
  }
  for (const mesh of doomed) {
    mesh.removeFromParent();
    if (!mesh.userData.sharedGeometry) mesh.geometry.dispose();
  }
  // Drop now-empty groups left behind by merged children
  const prune = (node) => {
    for (const child of [...node.children]) {
      prune(child);
      if (child.isGroup && child.children.length === 0) node.remove(child);
    }
  };
  prune(root);
}
