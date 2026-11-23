// 3D virtual arenas for Arena Clash — stylized stages with skyline depth.
import * as THREE from './vendor/three/three.module.min.js';

const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const cylGeo = new THREE.CylinderGeometry(1, 1, 1, 12);
const sphereGeo = new THREE.SphereGeometry(1, 16, 12);

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

function mesh(parent, geo, material, x, y, z, sx = 1, sy = 1, sz = 1) {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  m.scale.set(sx, sy, sz);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

export const STAGES = [
  {
    id: 'skyline',
    name: 'Sunset Skyline',
    blurb: 'Rooftop ring above a glowing city at dusk.',
    fog: 0xffb38a,
    horizon: 0xff9a6b,
    zenith: 0x2a4a78,
    ground: 0x3d4550,
    accent: 0xff8a5c
  },
  {
    id: 'dojo',
    name: 'Floating Dojo',
    blurb: 'Stone platform drifting over emerald peaks.',
    fog: 0xa8d5c4,
    horizon: 0x8ecfb0,
    zenith: 0x3d6e8c,
    ground: 0x6b7280,
    accent: 0x2dd4bf
  },
  {
    id: 'crater',
    name: 'Impact Crater',
    blurb: 'Scarred earth under an amber storm sky.',
    fog: 0xc4a574,
    horizon: 0xd4a574,
    zenith: 0x2c3e50,
    ground: 0x5c4033,
    accent: 0xf59e0b
  }
];

export function createArenaWorld({ scene, renderer, stageId = 'skyline' }) {
  const stage = STAGES.find((s) => s.id === stageId) || STAGES[0];
  const root = new THREE.Group();
  scene.add(root);

  scene.background = new THREE.Color(stage.fog);
  scene.fog = new THREE.Fog(stage.fog, 28, 95);

  const hemi = new THREE.HemisphereLight(0xffe8d6, 0x6a7580, 1.35);
  scene.add(hemi);
  const fill = new THREE.AmbientLight(0xffe0c8, 0.45);
  scene.add(fill);
  const sun = new THREE.DirectionalLight(0xffe4c8, 2.6);
  sun.position.set(-22, 28, 16);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const sc = sun.shadow.camera;
  sc.left = -22; sc.right = 22; sc.top = 18; sc.bottom = -18;
  sc.near = 4; sc.far = 70;
  sun.shadow.bias = -0.00035;
  scene.add(sun);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const rim = new THREE.DirectionalLight(stage.accent, 0.55);
  rim.position.set(18, 8, -12);
  scene.add(rim);

  // Sky dome
  const skyUniforms = {
    uHorizon: { value: new THREE.Color(stage.horizon) },
    uZenith: { value: new THREE.Color(stage.zenith) },
    uSunDir: { value: new THREE.Vector3(-0.4, 0.55, 0.3).normalize() },
    uSunColor: { value: new THREE.Color(0xffe0b8) },
    uGlow: { value: 0.45 }
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
  const sky = new THREE.Mesh(new THREE.SphereGeometry(120, 24, 16), skyMat);
  sky.renderOrder = -10;
  scene.add(sky);

  // Fight platform
  const platform = new THREE.Group();
  root.add(platform);
  const floorMat = mat(stage.ground, { rough: 0.9 });
  const rimMat = mat(0x1f2933, { rough: 0.55, metal: 0.35 });
  const accentMat = mat(stage.accent, { rough: 0.4, emissive: stage.accent, glow: 0.35 });

  mesh(platform, cylGeo, floorMat, 0, -0.15, 0, 10.5, 0.3, 10.5);
  mesh(platform, cylGeo, rimMat, 0, -0.42, 0, 11.2, 0.45, 11.2);
  // Ring markings
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(7.2, 7.55, 48),
    new THREE.MeshBasicMaterial({ color: stage.accent, transparent: true, opacity: 0.85, side: THREE.DoubleSide })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.02;
  platform.add(ring);
  const inner = new THREE.Mesh(
    new THREE.RingGeometry(2.2, 2.4, 32),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25, side: THREE.DoubleSide })
  );
  inner.rotation.x = -Math.PI / 2;
  inner.position.y = 0.025;
  platform.add(inner);

  // Corner pillars
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const x = Math.cos(a) * 9.2;
    const z = Math.sin(a) * 9.2;
    mesh(platform, cylGeo, rimMat, x, 1.1, z, 0.28, 2.2, 0.28);
    mesh(platform, sphereGeo, accentMat, x, 2.35, z, 0.32, 0.32, 0.32);
  }

  // Soft ground disk below for floating feel
  const under = mesh(root, cylGeo, mat(0x2a3340, { rough: 1, opacity: 0.5 }), 0, -2.2, 0, 14, 0.2, 14);
  under.receiveShadow = true;

  // Skyline / environment props
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
      const b = mesh(props, boxGeo, mat(palette[idx % palette.length]), x, h / 2 - 1.5, z, w, h, w * 0.85);
      b.castShadow = false;
      // Window glow strips
      if (Math.random() > 0.4) {
        mesh(props, boxGeo, mat(0xffc98a, { emissive: 0xffb060, glow: 0.55, rough: 0.4 }),
          x + side * 0.02, h * 0.35 - 1.5, z, w * 0.7, h * 0.55, 0.08);
      }
    }
  } else if (stage.id === 'dojo') {
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const r = 22 + (i % 3) * 4;
      const h = 4 + (i % 4) * 2.5;
      mesh(props, sphereGeo, mat(0x3f7d5c, { rough: 0.9 }), Math.cos(a) * r, h * 0.3 - 2, Math.sin(a) * r, 3 + i % 3, h, 3 + i % 3);
    }
    // Torii-ish gate
    mesh(props, boxGeo, mat(0xb45309), -4, 2.2, -12, 0.35, 4.4, 0.35);
    mesh(props, boxGeo, mat(0xb45309), 4, 2.2, -12, 0.35, 4.4, 0.35);
    mesh(props, boxGeo, mat(0xc2410c), 0, 4.4, -12, 10, 0.4, 0.5);
  } else {
    // Crater rocks
    for (let i = 0; i < 18; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 12 + Math.random() * 16;
      const s = 0.8 + Math.random() * 2.2;
      mesh(props, boxGeo, mat(0x6b4f3a), Math.cos(a) * r, s * 0.4 - 0.8, Math.sin(a) * r, s, s * 0.8, s * 1.1);
    }
  }

  // Cloud sprites
  const cloudGroup = new THREE.Group();
  root.add(cloudGroup);
  const cloudMat = new THREE.MeshBasicMaterial({ color: 0xffe8d4, transparent: true, opacity: 0.35, depthWrite: false });
  for (let i = 0; i < 8; i++) {
    const c = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 6), cloudMat);
    c.position.set((Math.random() - 0.5) * 60, 12 + Math.random() * 10, -20 - Math.random() * 30);
    c.scale.set(4 + Math.random() * 5, 1.5 + Math.random(), 2);
    cloudGroup.add(c);
  }

  const bounds = { radius: 9.4, floorY: 0 };

  function update(dt, elapsed) {
    cloudGroup.rotation.y += dt * 0.02;
    ring.material.opacity = 0.7 + Math.sin(elapsed * 2.2) * 0.15;
    for (const child of platform.children) {
      if (child.material && child.material.emissiveIntensity != null && child !== ring) {
        // pulse corner lights gently
      }
    }
    const pulse = 0.3 + Math.sin(elapsed * 3) * 0.12;
    accentMat.emissiveIntensity = pulse;
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
