// 3D virtual arenas for Arena Clash — Tenkaichi Budokai inspired stages.
import * as THREE from './vendor/three/three.module.min.js';

const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const cylGeo = new THREE.CylinderGeometry(1, 1, 1, 24);
const sphereGeo = new THREE.SphereGeometry(1, 16, 12);
const coneGeo = new THREE.ConeGeometry(1, 1, 10);

function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: opts.rough ?? 0.75,
    metalness: opts.metal ?? 0.08,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.glow ?? 0,
    transparent: opts.opacity != null && opts.opacity < 1,
    opacity: opts.opacity ?? 1
  });
}

function mesh(parent, geo, material, x, y, z, sx = 1, sy = 1, sz = 1, rx = 0, ry = 0, rz = 0) {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  m.scale.set(sx, sy, sz);
  m.rotation.set(rx, ry, rz);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

function makeStoneFloorTexture() {
  if (typeof document === 'undefined') return null;
  const W = 512;
  const H = 512;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#8a8070';
  ctx.fillRect(0, 0, W, H);
  // Tile grid
  ctx.strokeStyle = 'rgba(55,45,35,0.35)';
  ctx.lineWidth = 3;
  const step = 64;
  for (let i = 0; i <= W; i += step) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(W, i); ctx.stroke();
  }
  // Radial ring accents
  ctx.strokeStyle = 'rgba(180, 40, 30, 0.55)';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(W / 2, H / 2, W * 0.42, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,0.25)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(W / 2, H / 2, W * 0.18, 0, Math.PI * 2);
  ctx.stroke();
  // Subtle noise mottling
  for (let i = 0; i < 900; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    ctx.fillStyle = `rgba(0,0,0,${0.02 + Math.random() * 0.05})`;
    ctx.fillRect(x, y, 2 + Math.random() * 4, 2 + Math.random() * 4);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

export const STAGES = [
  {
    id: 'budokai',
    name: 'Tenkaichi Budokai',
    blurb: 'The World Martial Arts Tournament ring — stone stage, stands, and island mountains.',
    fog: 0xc8dff0,
    horizon: 0x9ec8e8,
    zenith: 0x3b82c4,
    ground: 0x8a8070,
    accent: 0xc43c2c,
    radius: 14.5
  },
  {
    id: 'skyline',
    name: 'Sunset Skyline',
    blurb: 'Rooftop ring above a glowing city at dusk.',
    fog: 0xffb38a,
    horizon: 0xff9a6b,
    zenith: 0x2a4a78,
    ground: 0x3d4550,
    accent: 0xff8a5c,
    radius: 11.5
  },
  {
    id: 'dojo',
    name: 'Floating Dojo',
    blurb: 'Stone platform drifting over emerald peaks.',
    fog: 0xa8d5c4,
    horizon: 0x8ecfb0,
    zenith: 0x3d6e8c,
    ground: 0x6b7280,
    accent: 0x2dd4bf,
    radius: 11.5
  },
  {
    id: 'crater',
    name: 'Impact Crater',
    blurb: 'Scarred earth under an amber storm sky.',
    fog: 0xc4a574,
    horizon: 0xd4a574,
    zenith: 0x2c3e50,
    ground: 0x5c4033,
    accent: 0xf59e0b,
    radius: 12
  }
];

function buildBudokaiPlatform(platform, stage) {
  const R = stage.radius || 14.5;
  const stoneTex = makeStoneFloorTexture();
  const floorMat = new THREE.MeshStandardMaterial({
    color: stoneTex ? 0xffffff : stage.ground,
    map: stoneTex || null,
    roughness: 0.92,
    metalness: 0.04
  });
  const rimMat = mat(0x5c5348, { rough: 0.7, metal: 0.15 });
  const redMat = mat(stage.accent, { rough: 0.45, emissive: stage.accent, glow: 0.22 });
  const woodMat = mat(0x7a4a28, { rough: 0.85 });
  const creamMat = mat(0xf3e9d5, { rough: 0.8 });
  const flagMat = mat(0xc43c2c, { rough: 0.55, emissive: 0xc43c2c, glow: 0.15 });

  // Main fight floor — large raised disk
  mesh(platform, cylGeo, floorMat, 0, -0.18, 0, R, 0.36, R);
  // Thick rim / curb
  mesh(platform, cylGeo, rimMat, 0, -0.55, 0, R + 0.85, 0.55, R + 0.85);
  // Support plinth
  mesh(platform, cylGeo, mat(0x4a433a, { rough: 0.95 }), 0, -1.35, 0, R * 0.72, 1.1, R * 0.72);

  // Painted tournament rings
  const addRing = (inner, outer, color, opacity = 0.9) => {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(inner, outer, 64),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.03;
    platform.add(ring);
    return ring;
  };
  const outerRing = addRing(R - 1.15, R - 0.75, stage.accent, 0.95);
  addRing(R * 0.42, R * 0.48, 0xffffff, 0.35);
  addRing(1.6, 1.85, stage.accent, 0.55);

  // Cross court lines
  mesh(platform, boxGeo, new THREE.MeshBasicMaterial({
    color: 0xffffff, transparent: true, opacity: 0.22
  }), 0, 0.035, 0, R * 1.7, 0.01, 0.12);
  mesh(platform, boxGeo, new THREE.MeshBasicMaterial({
    color: 0xffffff, transparent: true, opacity: 0.22
  }), 0, 0.035, 0, 0.12, 0.01, R * 1.7);

  // Corner posts + tournament banners (skip near-camera +Z so Wide/Stadium stay clear)
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    const x = Math.cos(a) * (R - 0.35);
    const z = Math.sin(a) * (R - 0.35);
    mesh(platform, cylGeo, woodMat, x, 1.35, z, 0.18, 2.7, 0.18);
    mesh(platform, sphereGeo, redMat, x, 2.8, z, 0.28, 0.28, 0.28);
    if (z > R * 0.35) continue; // no cloth on the camera-facing arc
    const banner = mesh(platform, boxGeo, flagMat, x * 0.92, 1.9, z * 0.92, 0.08, 1.4, 0.55);
    banner.lookAt(0, 1.9, 0);
  }

  // Stairs on four sides
  for (let s = 0; s < 4; s++) {
    const ang = (s / 4) * Math.PI * 2;
    const dirX = Math.cos(ang);
    const dirZ = Math.sin(ang);
    for (let step = 0; step < 4; step++) {
      const d = R + 0.4 + step * 0.75;
      mesh(
        platform, boxGeo, creamMat,
        dirX * d, -0.85 - step * 0.28, dirZ * d,
        3.2, 0.28, 0.7,
        0, -ang, 0
      );
    }
  }

  return { outerRing, redMat };
}

function buildBudokaiStands(root, stage) {
  const R = stage.radius || 14.5;
  const stands = new THREE.Group();
  root.add(stands);
  const seatMat = mat(0x6d6358, { rough: 0.9 });
  const railMat = mat(0x3f3a34, { rough: 0.7 });
  const crowdColors = [0xc45c4a, 0x3b6ea5, 0xd4a017, 0x4a7c59, 0x7a4a8a, 0xe8dcc8];

  for (let tier = 0; tier < 4; tier++) {
    const rad = R + 4.5 + tier * 2.4;
    const h = 0.4 + tier * 0.85;
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(rad, 0.55 + tier * 0.08, 8, 64),
      seatMat
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = h;
    ring.receiveShadow = true;
    stands.add(ring);
    // Crowd blobs (stylized spectators)
    for (let i = 0; i < 36 - tier * 4; i++) {
      const a = (i / (36 - tier * 4)) * Math.PI * 2 + tier * 0.08;
      const c = crowdColors[i % crowdColors.length];
      mesh(
        stands, sphereGeo, mat(c, { rough: 0.85 }),
        Math.cos(a) * rad, h + 0.55, Math.sin(a) * rad,
        0.28 + (i % 3) * 0.05, 0.35, 0.28 + (i % 2) * 0.04
      );
    }
  }
  // Outer railing — thin torus (a solid cylinder here would occlude the whole ring)
  const rail = new THREE.Mesh(
    new THREE.TorusGeometry(R + 13.0, 0.18, 8, 64),
    railMat
  );
  rail.rotation.x = Math.PI / 2;
  rail.position.y = 3.7;
  rail.castShadow = true;
  stands.add(rail);

  // Gate arch at -Z
  const archMat = mat(0xb45309, { rough: 0.65 });
  mesh(stands, boxGeo, archMat, -5.5, 3.2, -(R + 5.5), 0.55, 6.4, 0.55);
  mesh(stands, boxGeo, archMat, 5.5, 3.2, -(R + 5.5), 0.55, 6.4, 0.55);
  mesh(stands, boxGeo, archMat, 0, 6.5, -(R + 5.5), 12.5, 0.7, 0.7);
  mesh(stands, boxGeo, mat(stage.accent, { emissive: stage.accent, glow: 0.3 }), 0, 7.3, -(R + 5.5), 8, 0.9, 0.4);

  return stands;
}

function buildIslandBackdrop(root) {
  const props = new THREE.Group();
  root.add(props);
  const mountainMat = mat(0x4d7a52, { rough: 0.95 });
  const rockMat = mat(0x6b6256, { rough: 0.9 });
  const palmTrunk = mat(0x7a4e2d, { rough: 0.85 });
  const palmLeaf = mat(0x2f8f4e, { rough: 0.75 });
  const waterMat = mat(0x3a8fc4, { rough: 0.35, metal: 0.2, opacity: 0.85 });

  // Water plane around island
  const water = mesh(props, cylGeo, waterMat, 0, -2.8, 0, 70, 0.2, 70);
  water.receiveShadow = true;
  water.castShadow = false;

  // Distant mountains
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2;
    const r = 38 + (i % 3) * 6;
    const h = 8 + (i % 5) * 3.5;
    mesh(props, coneGeo, mountainMat, Math.cos(a) * r, h * 0.35 - 1.5, Math.sin(a) * r, 5 + i % 4, h, 5 + i % 4);
  }

  // Near rocks
  for (let i = 0; i < 10; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 22 + Math.random() * 8;
    const s = 1.2 + Math.random() * 2;
    mesh(props, boxGeo, rockMat, Math.cos(a) * r, s * 0.3 - 1.6, Math.sin(a) * r, s, s * 0.7, s * 1.1, 0, a, 0.2);
  }

  // Palm trees
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + 0.4;
    const r = 26 + (i % 2) * 3;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    mesh(props, cylGeo, palmTrunk, x, 1.2, z, 0.22, 5.2, 0.22, 0.15, 0, 0.1);
    for (let L = 0; L < 5; L++) {
      const la = (L / 5) * Math.PI * 2;
      mesh(props, coneGeo, palmLeaf, x + Math.cos(la) * 0.6, 4.0, z + Math.sin(la) * 0.6, 0.35, 1.8, 0.55, 1.1, la, 0);
    }
  }

  return props;
}

function buildGenericPlatform(platform, stage) {
  const R = stage.radius || 11.5;
  const floorMat = mat(stage.ground, { rough: 0.9 });
  const rimMat = mat(0x1f2933, { rough: 0.55, metal: 0.35 });
  const accentMat = mat(stage.accent, { rough: 0.4, emissive: stage.accent, glow: 0.35 });
  mesh(platform, cylGeo, floorMat, 0, -0.15, 0, R, 0.3, R);
  mesh(platform, cylGeo, rimMat, 0, -0.42, 0, R + 0.7, 0.45, R + 0.7);
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(R - 2.2, R - 1.85, 48),
    new THREE.MeshBasicMaterial({ color: stage.accent, transparent: true, opacity: 0.85, side: THREE.DoubleSide })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.02;
  platform.add(ring);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const x = Math.cos(a) * (R - 0.8);
    const z = Math.sin(a) * (R - 0.8);
    mesh(platform, cylGeo, rimMat, x, 1.1, z, 0.28, 2.2, 0.28);
    mesh(platform, sphereGeo, accentMat, x, 2.35, z, 0.32, 0.32, 0.32);
  }
  return { outerRing: ring, redMat: accentMat };
}

export function createArenaWorld({ scene, renderer, stageId = 'budokai' }) {
  const stage = STAGES.find((s) => s.id === stageId) || STAGES[0];
  const root = new THREE.Group();
  scene.add(root);

  const isBudokai = stage.id === 'budokai';
  scene.background = new THREE.Color(stage.fog);
  scene.fog = new THREE.Fog(stage.fog, isBudokai ? 55 : 28, isBudokai ? 160 : 95);

  const hemi = new THREE.HemisphereLight(0xfff4e8, 0x5a6570, isBudokai ? 1.15 : 1.05);
  scene.add(hemi);
  const fill = new THREE.AmbientLight(0xffebd8, isBudokai ? 0.55 : 0.48);
  scene.add(fill);
  // Slightly softer key so MeshToonMaterial’s hard shadow band can read
  const sun = new THREE.DirectionalLight(0xfff6ea, isBudokai ? 2.6 : 2.4);
  sun.position.set(isBudokai ? 8 : 4, 26, 30);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const sc = sun.shadow.camera;
  const shadowSpan = isBudokai ? 32 : 22;
  sc.left = -shadowSpan; sc.right = shadowSpan; sc.top = shadowSpan; sc.bottom = -shadowSpan;
  sc.near = 4; sc.far = 90;
  sun.shadow.bias = -0.00035;
  scene.add(sun);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const rim = new THREE.DirectionalLight(stage.accent, 0.55);
  rim.position.set(18, 8, -12);
  scene.add(rim);

  const skyUniforms = {
    uHorizon: { value: new THREE.Color(stage.horizon) },
    uZenith: { value: new THREE.Color(stage.zenith) },
    uSunDir: { value: new THREE.Vector3(-0.35, 0.65, 0.35).normalize() },
    uSunColor: { value: new THREE.Color(isBudokai ? 0xfff2c8 : 0xffe0b8) },
    uGlow: { value: isBudokai ? 0.55 : 0.45 }
  };
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false, toneMapped: false, uniforms: skyUniforms,
    vertexShader: 'varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: `uniform vec3 uHorizon; uniform vec3 uZenith; uniform vec3 uSunDir; uniform vec3 uSunColor; uniform float uGlow; varying vec3 vDir;
      void main(){ vec3 d = normalize(vDir); float h = clamp(d.y*0.5+0.5,0.0,1.0);
        vec3 col = mix(uHorizon, uZenith, pow(h,0.85));
        float s = max(dot(d,uSunDir),0.0);
        col += uSunColor * (pow(s,500.0)*3.5 + pow(s,8.0)*uGlow);
        gl_FragColor = vec4(col,1.0);
        #include <colorspace_fragment>
      }`
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(140, 28, 18), skyMat);
  sky.renderOrder = -10;
  scene.add(sky);

  const platform = new THREE.Group();
  root.add(platform);
  const { outerRing, redMat } = isBudokai
    ? buildBudokaiPlatform(platform, stage)
    : buildGenericPlatform(platform, stage);

  if (isBudokai) {
    buildBudokaiStands(root, stage);
    buildIslandBackdrop(root);
  } else {
    const under = mesh(root, cylGeo, mat(0x2a3340, { rough: 1, opacity: 0.5 }), 0, -2.2, 0, stage.radius + 4, 0.2, stage.radius + 4);
    under.receiveShadow = true;
    const props = new THREE.Group();
    root.add(props);
    if (stage.id === 'skyline') {
      const palette = [0x3b4a5a, 0x2f3d4c, 0x455566, 0x24303c, 0x516273];
      for (let i = 0; i < 28; i++) {
        const side = i < 14 ? -1 : 1;
        const idx = i % 14;
        const x = side * (14 + (idx % 3) * 3.5) + (Math.random() - 0.5) * 2;
        const z = -18 + idx * 3.2 + (Math.random() - 0.5);
        const h = 6 + Math.random() * 16;
        const w = 2.2 + Math.random() * 2.5;
        mesh(props, boxGeo, mat(palette[idx % palette.length]), x, h / 2 - 1.5, z, w, h, w * 0.85);
      }
    } else if (stage.id === 'dojo') {
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2;
        const r = 22 + (i % 3) * 4;
        const h = 4 + (i % 4) * 2.5;
        mesh(props, sphereGeo, mat(0x3f7d5c, { rough: 0.9 }), Math.cos(a) * r, h * 0.3 - 2, Math.sin(a) * r, 3 + i % 3, h, 3 + i % 3);
      }
      mesh(props, boxGeo, mat(0xb45309), -4, 2.2, -12, 0.35, 4.4, 0.35);
      mesh(props, boxGeo, mat(0xb45309), 4, 2.2, -12, 0.35, 4.4, 0.35);
      mesh(props, boxGeo, mat(0xc2410c), 0, 4.4, -12, 10, 0.4, 0.5);
    } else {
      for (let i = 0; i < 18; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = 12 + Math.random() * 16;
        const s = 0.8 + Math.random() * 2.2;
        mesh(props, boxGeo, mat(0x6b4f3a), Math.cos(a) * r, s * 0.4 - 0.8, Math.sin(a) * r, s, s * 0.8, s * 1.1);
      }
    }
  }

  const cloudGroup = new THREE.Group();
  root.add(cloudGroup);
  const cloudMat = new THREE.MeshBasicMaterial({
    color: isBudokai ? 0xf8fbff : 0xffe8d4,
    transparent: true,
    opacity: isBudokai ? 0.45 : 0.35,
    depthWrite: false
  });
  for (let i = 0; i < (isBudokai ? 12 : 8); i++) {
    const c = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 6), cloudMat);
    c.position.set((Math.random() - 0.5) * 80, 14 + Math.random() * 12, -25 - Math.random() * 40);
    c.scale.set(5 + Math.random() * 6, 1.6 + Math.random(), 2.4);
    cloudGroup.add(c);
  }

  const radius = (stage.radius || 11.5) - 1.1;
  const bounds = { radius, floorY: 0 };

  function update(dt, elapsed) {
    cloudGroup.rotation.y += dt * 0.015;
    if (outerRing?.material) {
      outerRing.material.opacity = 0.75 + Math.sin(elapsed * 2.0) * 0.15;
    }
    if (redMat) {
      redMat.emissiveIntensity = 0.22 + Math.sin(elapsed * 2.6) * 0.1;
    }
  }

  function dispose() {
    scene.remove(root, sky, hemi, sun, rim, fill);
    root.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
    });
    sky.geometry.dispose();
    skyMat.dispose();
  }

  return { root, platform, bounds, stage, update, dispose, sun };
}
