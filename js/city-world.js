// The detailed Singapore street: sky, lighting, road, shophouses and towers, street furniture and pedestrians.
import * as THREE from './vendor/three/three.module.min.js';
import { stdMat } from './city-vehicles.js';
import { buildLandmark, disposeLandmarks } from './city-routes.js';
import {
  asphaltTexture, grassTexture, paverTexture, waterTexture, zebraTexture, checkerTexture, signTexture, cloudTexture,
  makeFacadeMaps, wallsGeometry, mergeStatics, lcg
} from './city-gfx.js';

export const BLOCK_COUNT = 8;
export const BLOCK_LENGTH = 64;
export const LANES = [-5.3, -1.77, 1.77, 5.3];
export const ROAD_HALF = 8;
const FACE = 11.5;
const LENGTH = 510;
const CENTER_Z = -215;

const shared = {
  box: new THREE.BoxGeometry(1, 1, 1),
  cyl: new THREE.CylinderGeometry(1, 1, 1, 10),
  sphere: new THREE.SphereGeometry(1, 12, 8),
  ico: new THREE.IcosahedronGeometry(1, 1)
};

function mesh(parent, geo, material, x, y, z, sx = 1, sy = 1, sz = 1, flagShared = true) {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  m.scale.set(sx, sy, sz);
  if (flagShared) m.userData.sharedGeometry = geo === shared.box || geo === shared.cyl || geo === shared.sphere || geo === shared.ico;
  parent.add(m);
  return m;
}
const box = (p, mat, x, y, z, w, h, d) => mesh(p, shared.box, mat, x, y, z, w, h, d);
const cyl = (p, mat, x, y, z, r, h) => mesh(p, shared.cyl, mat, x, y + h / 2, z, r, h, r);

const M = {
  dark: stdMat(0x1f2a2e, { rough: 0.5, metal: 0.4 }),
  pole: stdMat(0x39464b, { rough: 0.45, metal: 0.55 }),
  white: stdMat(0xf1efe6, { rough: 0.6 }),
  concrete: stdMat(0xbdbfba, { rough: 0.85 }),
  roof: stdMat(0x8f938f, { rough: 0.9 }),
  tile: stdMat(0xb5532f, { rough: 0.8 }),
  trunk: stdMat(0x6b4f3a, { rough: 0.95 }),
  leaf: stdMat(0x3c8a52, { rough: 0.7 }),
  leafDark: stdMat(0x2a6b3f, { rough: 0.75 }),
  hedge: stdMat(0x2f7a45, { rough: 0.9 }),
  planter: stdMat(0xa59a88, { rough: 0.9 }),
  glassDark: stdMat(0x1f4a58, { rough: 0.08, metal: 0.5 }),
  shopGlow: stdMat(0xffe9c0, { rough: 0.3, emissive: 0xffd9a0, glow: 0.35 }),
  lampOn: stdMat(0xfff0c8, { rough: 0.3, emissive: 0xffe0a0, glow: 1.0 }),
  green: stdMat(0x0e6b45, { rough: 0.5 }),
  red: stdMat(0xc9362a, { rough: 0.5 }),
  signGreen: stdMat(0x00724a, { rough: 0.4 }),
  busBlue: stdMat(0x2f6aa3, { rough: 0.5 }),
  amber: stdMat(0xffb000, { rough: 0.3, emissive: 0xff9a00, glow: 0.9 }),
  tlRed: stdMat(0x330808, { rough: 0.3, emissive: 0xff2200, glow: 0.12 }),
  tlAmber: stdMat(0x332a08, { rough: 0.3, emissive: 0xffaa00, glow: 0.1 }),
  tlGreen: stdMat(0x17ff7a, { rough: 0.3, emissive: 0x17ff7a, glow: 1.4 }),
  skin: [stdMat(0xe0b08c), stdMat(0xc68e66), stdMat(0xf0c7a0), stdMat(0x9c6b4a)],
  hair: stdMat(0x1c1612),
  pants: [stdMat(0x2b3a4a), stdMat(0x3d3d3d), stdMat(0x5a4a3a), stdMat(0x1f2f4f)],
  shirts: [0xd6453d, 0x3d7ec8, 0xf2c14e, 0xffffff, 0x4aa376, 0xe58fb0, 0x6a5acd, 0xff8a3d].map((c) => stdMat(c, { rough: 0.8 })),
  wood: stdMat(0x8a6a48, { rough: 0.8 }),
  metal: stdMat(0x9aa3a6, { rough: 0.4, metal: 0.8 }),
  hydrant: stdMat(0xd23a2a, { rough: 0.5 })
};

const SHOP_TINTS = [0xf4d6a5, 0xefb0a6, 0xa8d8d2, 0xf5e7a0, 0xa9cbe8, 0xe9bad2, 0xf7efe0];
const SHOP_SIGNS = [
  ['KOPITIAM', '#8c2f1c'], ['BAKERY', '#2c5aa0'], ['TOAST BOX', '#d68910'], ['PHARMACY', '#1e8449'],
  ['NOODLES', '#a03a2a'], ['BOOKS', '#35506b'], ['TEA HOUSE', '#2e7d6b'], ['SUPERMART', '#b03a5b']
];

export function createWorld({ scene, renderer }) {
  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const scrollers = [];
  const own = [];
  const track = (tex, ...rest) => { tex.anisotropy = maxAniso; own.push(tex); return tex; };
  const scrolling = (tex, tile) => { scrollers.push({ tex, tile }); return tex; };

  // ----- Lighting, sky and reflections -----
  const hemi = new THREE.HemisphereLight(0xe4f6ff, 0x7d826d, 1.2);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffefd2, 2.4);
  const SUN_OFFSET = new THREE.Vector3(-38, 58, 28);
  sun.position.copy(SUN_OFFSET).add(new THREE.Vector3(0, 0, -30));
  sun.target.position.set(0, 0, -30);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const sc = sun.shadow.camera;
  sc.left = -48; sc.right = 48; sc.top = 78; sc.bottom = -78; sc.near = 10; sc.far = 190;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.06;
  scene.add(sun, sun.target);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const skyUniforms = {
    uHorizon: { value: new THREE.Color(0xa9d5e5) }, uZenith: { value: new THREE.Color(0x4b86c4) },
    uSunDir: { value: SUN_OFFSET.clone().normalize() }, uSunColor: { value: new THREE.Color(0xffefd2) }, uGlow: { value: 0.35 }
  };
  const skyMaterial = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false, toneMapped: false, uniforms: skyUniforms,
    vertexShader: 'varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `uniform vec3 uHorizon; uniform vec3 uZenith; uniform vec3 uSunDir; uniform vec3 uSunColor; uniform float uGlow; varying vec3 vDir;
      void main(){ vec3 d = normalize(vDir); float h = clamp(d.y, 0.0, 1.0);
        vec3 col = mix(uHorizon, uZenith, pow(h, 0.5));
        float s = max(dot(d, uSunDir), 0.0);
        col += uSunColor * (pow(s, 900.0) * 4.0 + pow(s, 10.0) * uGlow);
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }`
  });
  const skyDome = new THREE.Mesh(new THREE.SphereGeometry(440, 24, 16), skyMaterial);
  skyDome.renderOrder = -10;
  skyDome.frustumCulled = false;
  scene.add(skyDome);

  const cloudMaterials = [];
  const clouds = new THREE.Group();
  const cloudTex = track(cloudTexture());
  const cloudRand = lcg(5);
  for (let i = 0; i < 16; i++) {
    const material = new THREE.SpriteMaterial({ map: cloudTex, transparent: true, opacity: 0.8, fog: false, depthWrite: false });
    cloudMaterials.push(material);
    const sprite = new THREE.Sprite(material);
    sprite.position.set((cloudRand() - 0.5) * 700, 70 + cloudRand() * 80, -150 - cloudRand() * 260);
    const s = 110 + cloudRand() * 130;
    sprite.scale.set(s, s * 0.5, 1);
    clouds.add(sprite);
  }
  scene.add(clouds);

  const starGeo = new THREE.BufferGeometry();
  const starPos = [];
  const starRand = lcg(9);
  for (let i = 0; i < 420; i++) {
    const a = starRand() * Math.PI * 2; const e = 0.12 + starRand() * 1.3;
    starPos.push(Math.cos(a) * Math.cos(e) * 420, Math.sin(e) * 420, Math.sin(a) * Math.cos(e) * 420);
  }
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 1.8, sizeAttenuation: false, fog: false, transparent: true, opacity: 0.9, depthWrite: false }));
  stars.visible = false;
  scene.add(stars);

  const pmrem = new THREE.PMREMGenerator(renderer);
  let envTarget = null;
  function refreshEnvironment(groundColor) {
    const envScene = new THREE.Scene();
    envScene.add(new THREE.Mesh(skyDome.geometry, skyMaterial));
    const floor = new THREE.Mesh(new THREE.CircleGeometry(430, 24), new THREE.MeshBasicMaterial({ color: new THREE.Color(groundColor).multiplyScalar(0.6) }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1;
    envScene.add(floor);
    const sunBall = new THREE.Mesh(new THREE.SphereGeometry(28, 12, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(7, 6.6, 5.6) }));
    sunBall.position.copy(skyUniforms.uSunDir.value).multiplyScalar(380);
    envScene.add(sunBall);
    const next = pmrem.fromScene(envScene, 0.02, 1, 1000);
    scene.environment = next.texture;
    if (envTarget) envTarget.dispose();
    envTarget = next;
    envScene.traverse((o) => { if (o.geometry && o.geometry !== skyDome.geometry) o.geometry.dispose(); if (o.material && o.material !== skyMaterial) o.material.dispose(); });
  }

  // ----- Ground, road and kerbs -----
  const asphalt = track(asphaltTexture());
  asphalt.repeat.set(2, LENGTH / 8);
  scrolling(asphalt, 8);
  const grass = track(grassTexture());
  grass.repeat.set(70, LENGTH / 6);
  scrolling(grass, 6);
  const pavers = track(paverTexture());
  pavers.repeat.set(1.8, LENGTH / 2);
  scrolling(pavers, 2);
  const paversWide = pavers.clone();
  paversWide.needsUpdate = true;
  own.push(paversWide);
  paversWide.repeat.set(3, LENGTH / 2);
  scrolling(paversWide, 2);
  const waterTex = track(waterTexture());
  waterTex.repeat.set(12, LENGTH / 10);
  scrolling(waterTex, 10);

  const groundMat = new THREE.MeshStandardMaterial({ map: grass, color: 0x91ad89, roughness: 0.95 });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(420, LENGTH), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, -0.15, CENTER_Z);
  ground.receiveShadow = true;
  scene.add(ground);
  const road = new THREE.Mesh(new THREE.PlaneGeometry(ROAD_HALF * 2, LENGTH), new THREE.MeshStandardMaterial({ map: asphalt, roughness: 0.88, metalness: 0.02 }));
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, -0.04, CENTER_Z);
  road.receiveShadow = true;
  scene.add(road);

  const curbMat = stdMat(0xcfcbbd, { rough: 0.85 });
  const walkMat = new THREE.MeshStandardMaterial({ map: pavers, color: 0xd9d3c3, roughness: 0.9 });
  for (const s of [-1, 1]) {
    const curb = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, LENGTH), curbMat);
    curb.position.set(s * 7.78, 0.02, CENTER_Z);
    curb.receiveShadow = true;
    scene.add(curb);
    const walk = new THREE.Mesh(new THREE.PlaneGeometry(FACE - 8.03, LENGTH), walkMat);
    walk.rotation.x = -Math.PI / 2;
    walk.position.set(s * ((FACE + 8.03) / 2), 0.125, CENTER_Z);
    walk.receiveShadow = true;
    scene.add(walk);
    const edge = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.01, LENGTH), stdMat(0xf4f2dc, { rough: 0.6 }));
    edge.position.set(s * 7.45, 0.001, CENTER_Z);
    scene.add(edge);
  }
  // Fixed lane lines: double yellow centre and solid white edges
  const lineMat = stdMat(0xf4f2dc, { rough: 0.6 });
  const yellowMat = stdMat(0xf0c64a, { rough: 0.6 });
  const addLine = (x, w, mat) => {
    const line = new THREE.Mesh(new THREE.PlaneGeometry(w, LENGTH), mat);
    line.rotation.x = -Math.PI / 2;
    line.position.set(x, 0.002, CENTER_Z);
    line.receiveShadow = true;
    scene.add(line);
  };
  addLine(-0.11, 0.1, yellowMat);
  addLine(0.11, 0.1, yellowMat);
  for (const x of [-7.35, 7.35]) addLine(x, 0.14, lineMat);

  const dashes = [];
  const DASH_SPACING = 13;
  const DASH_COUNT = 41;
  const dashGeo = new THREE.PlaneGeometry(0.12, 6);
  for (const x of [-3.55, 3.55]) {
    for (let i = 0; i < DASH_COUNT; i++) {
      const d = new THREE.Mesh(dashGeo, lineMat);
      d.rotation.x = -Math.PI / 2;
      d.position.set(x, 0.003, -490 + i * DASH_SPACING);
      d.receiveShadow = true;
      scene.add(d);
      dashes.push(d);
    }
  }

  const water = new THREE.Mesh(new THREE.PlaneGeometry(260, LENGTH), new THREE.MeshStandardMaterial({ map: waterTex, color: 0x4c93b5, roughness: 0.18, metalness: 0.25, envMapIntensity: 1.4 }));
  water.rotation.x = -Math.PI / 2;
  water.receiveShadow = true;
  scene.add(water);

  // ----- Facades and signs -----
  const facadeMats = new Map();
  const facadeMaps = {};
  let nightGlow = 0;
  function facadeMaterial(kind, tint) {
    const key = `${kind}|${tint}`;
    if (!facadeMats.has(key)) {
      if (!facadeMaps[kind]) { facadeMaps[kind] = makeFacadeMaps(kind); own.push(facadeMaps[kind].map, facadeMaps[kind].emissive); }
      const maps = facadeMaps[kind];
      const material = new THREE.MeshStandardMaterial({
        map: maps.map, color: tint, roughness: kind === 'glass' ? 0.25 : 0.85, metalness: kind === 'glass' ? 0.35 : 0,
        emissive: 0xffffff, emissiveMap: maps.emissive, emissiveIntensity: nightGlow, envMapIntensity: kind === 'glass' ? 1.3 : 0.5
      });
      facadeMats.set(key, material);
    }
    return facadeMats.get(key);
  }
  const signMats = SHOP_SIGNS.map(([text, bg]) => {
    const tex = track(signTexture(text, bg));
    return new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.12 });
  });
  const ergMat = new THREE.MeshStandardMaterial({ map: track(signTexture('ERP', '#f4f4ef', '#c62828', 256, 128)), roughness: 0.5 });
  const limitMat = new THREE.MeshStandardMaterial({ map: track(signTexture('50', '#ffffff', '#c62828', 128, 128)), roughness: 0.5 });
  const zebraMat = new THREE.MeshStandardMaterial({ map: track(zebraTexture()), transparent: true, roughness: 0.8, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
  const checkerMat = new THREE.MeshStandardMaterial({ map: track(checkerTexture(40, 2, 16)), roughness: 0.6 });
  const finishFloorMat = new THREE.MeshStandardMaterial({ map: track(checkerTexture(28, 4, 16)), roughness: 0.8, polygonOffset: true, polygonOffsetFactor: -3 });

  function walls(parent, kind, tint, x, y, z, w, h, d) {
    const maps = facadeMaps[kind] || (facadeMaterial(kind, tint), facadeMaps[kind]);
    const m = new THREE.Mesh(wallsGeometry(w, h, d, maps.tileW, maps.tileH), facadeMaterial(kind, tint));
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  }

  // ----- Reusable prefabs -----
  function buildPalmCrown() {
    const parts = [];
    const frond = new THREE.PlaneGeometry(0.7, 3.4, 2, 7);
    const p = frond.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const t = (p.getY(i) + 1.7) / 3.4;
      p.setX(i, p.getX(i) * (1 - t * 0.85) * (0.6 + Math.sin(t * Math.PI) * 0.9));
      p.setZ(i, -t * t * 1.5 + Math.abs(p.getX(i)) * -0.5);
      p.setY(i, t * 3.4);
    }
    frond.computeVertexNormals();
    return { frond };
  }
  const palmCrown = buildPalmCrown();
  const palmFrondMat = new THREE.MeshStandardMaterial({ color: 0x3d8a4e, roughness: 0.75, side: THREE.DoubleSide });
  function addPalm(parent, x, z, rand) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    const lean = (rand() - 0.5) * 0.25;
    const h = 5 + rand() * 1.6;
    const segs = 6;
    for (let i = 0; i < segs; i++) {
      const t = i / segs;
      const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.15 - t * 0.05, 0.19 - t * 0.05, h / segs + 0.05, 7), M.trunk);
      seg.position.set(lean * t * t * h * 0.5, (i + 0.5) * (h / segs), 0);
      seg.rotation.z = -lean * t * 0.9;
      g.add(seg);
    }
    const crown = new THREE.Group();
    crown.position.set(lean * h * 0.5, h, 0);
    for (let i = 0; i < 9; i++) {
      const f = new THREE.Mesh(palmCrown.frond, palmFrondMat);
      const holder = new THREE.Group();
      holder.rotation.y = (i / 9) * Math.PI * 2 + rand() * 0.3;
      f.rotation.x = -1.15 + rand() * 0.25;
      f.position.y = 0.05;
      holder.add(f);
      crown.add(holder);
    }
    mesh(crown, shared.sphere, M.trunk, 0, 0, 0, 0.3, 0.25, 0.3);
    for (let i = 0; i < 3; i++) mesh(crown, shared.sphere, M.trunk, Math.cos(i * 2.1) * 0.25, -0.2, Math.sin(i * 2.1) * 0.25, 0.14, 0.18, 0.14);
    g.add(crown);
    parent.add(g);
  }

  function addRainTree(parent, x, z, rand) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    const h = 3.4 + rand() * 1.2;
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.34, h, 8), M.trunk);
    trunk.position.y = h / 2;
    g.add(trunk);
    for (const a of [0.6, 2.6, 4.4]) {
      const limb = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.14, 1.6, 6), M.trunk);
      limb.position.set(Math.cos(a) * 0.5, h + 0.2, Math.sin(a) * 0.5);
      limb.rotation.set(Math.sin(a) * 0.7, 0, -Math.cos(a) * 0.7);
      g.add(limb);
    }
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + rand();
      const r = 1.4 + rand() * 0.9;
      const mat = i % 2 ? M.leaf : M.leafDark;
      mesh(g, shared.ico, mat, Math.cos(a) * (i ? 1.5 : 0), h + 1.3 + rand() * 0.7, Math.sin(a) * (i ? 1.5 : 0), r, r * 0.62, r);
    }
    parent.add(g);
  }

  function addLamp(parent, x, z) {
    const s = Math.sign(x);
    cyl(parent, M.pole, x, 0, z, 0.2, 0.5);
    cyl(parent, M.pole, x, 0.5, z, 0.09, 6.2);
    const arm = box(parent, M.pole, x - s * 0.9, 6.55, z, 1.8, 0.09, 0.09);
    arm.rotation.z = s * 0.06;
    box(parent, M.dark, x - s * 1.85, 6.45, z, 0.95, 0.12, 0.3);
    box(parent, M.lampOn, x - s * 1.85, 6.37, z, 0.8, 0.04, 0.22);
  }

  function addHedge(parent, x, z, len) {
    box(parent, M.planter, x, 0.28, z, 0.7, 0.4, len);
    mesh(parent, shared.box, M.hedge, x, 0.68, z, 0.6, 0.45, len - 0.15);
  }

  function addPedestrian(parent, x, z, rand) {
    const g = new THREE.Group();
    g.userData.dynamic = true;
    const shirt = M.shirts[Math.floor(rand() * M.shirts.length)];
    const skin = M.skin[Math.floor(rand() * M.skin.length)];
    const pants = M.pants[Math.floor(rand() * M.pants.length)];
    const scale = 0.9 + rand() * 0.2;
    g.scale.setScalar(scale);
    box(g, shirt, 0, 1.2, 0, 0.42, 0.6, 0.24);
    const head = mesh(g, shared.sphere, skin, 0, 1.68, 0, 0.12, 0.14, 0.12);
    head.userData.sharedGeometry = true;
    mesh(g, shared.sphere, M.hair, 0, 1.73, 0.01, 0.125, 0.12, 0.13);
    const legs = [];
    const arms = [];
    for (const s of [-1, 1]) {
      const legPivot = new THREE.Group();
      legPivot.position.set(s * 0.11, 0.9, 0);
      legPivot.userData.dynamic = true;
      box(legPivot, pants, 0, -0.45, 0, 0.16, 0.9, 0.17);
      g.add(legPivot);
      legs.push(legPivot);
      const armPivot = new THREE.Group();
      armPivot.position.set(s * 0.27, 1.45, 0);
      armPivot.userData.dynamic = true;
      box(armPivot, shirt, 0, -0.25, 0, 0.1, 0.5, 0.12);
      g.add(armPivot);
      arms.push(armPivot);
    }
    g.position.set(x, 0.13, z);
    g.userData.ped = { legs, arms, dir: rand() > 0.5 ? 1 : -1, speed: 0.9 + rand() * 0.7, phase: rand() * 6.28 };
    g.rotation.y = g.userData.ped.dir > 0 ? 0 : Math.PI;
    parent.add(g);
    return g;
  }

  function addBusStop(parent, side, z) {
    const x = side * 9.8;
    const g = new THREE.Group();
    g.position.set(x, 0.13, z);
    box(g, M.pole, 0, 2.6, 0, 2.2, 0.1, 4.2);
    box(g, M.busBlue, 0, 2.72, 0, 2.3, 0.05, 4.3);
    for (const dz of [-2, 2]) for (const dx of [-0.95, 0.95]) box(g, M.pole, dx, 1.3, dz, 0.07, 2.6, 0.07);
    box(g, M.glassDark, side * 0.95, 1.4, 0, 0.04, 2.0, 3.8);
    box(g, M.glassDark, 0, 1.4, 1.98, 1.8, 2.0, 0.04);
    box(g, M.wood, side * 0.3, 0.5, 0, 0.5, 0.06, 2.6);
    box(g, M.pole, side * 0.3, 0.25, 0, 0.45, 0.5, 0.06);
    box(g, M.signGreen, -side * 1.4, 1.5, 2.2, 0.06, 0.5, 0.5);
    cyl(g, M.pole, -side * 1.4, 0, 2.2, 0.04, 3.1);
    box(g, M.busBlue, -side * 1.4, 3.15, 2.2, 0.08, 0.5, 0.5);
    parent.add(g);
  }

  function addTrafficSignals(parent, z) {
    for (const side of [-1, 1]) {
      const x = side * 8.4;
      cyl(parent, M.pole, x, 0, z, 0.1, 6.6);
      box(parent, M.pole, x - side * 3.4, 6.5, z, 6.8, 0.14, 0.14);
      for (const lane of side < 0 ? [-5.3, -1.77] : [1.77, 5.3]) {
        const head = new THREE.Group();
        head.position.set(lane, 6.0, z);
        head.rotation.y = side < 0 ? 0 : Math.PI;
        box(head, M.dark, 0, 0, 0, 0.36, 1.05, 0.3);
        box(head, M.dark, 0, 0.62, 0.1, 0.5, 0.06, 0.34);
        mesh(head, shared.cyl, M.tlRed, 0, 0.33, 0.16, 0.12, 0.06, 0.12).rotation.x = Math.PI / 2;
        mesh(head, shared.cyl, M.tlAmber, 0, 0, 0.16, 0.12, 0.06, 0.12).rotation.x = Math.PI / 2;
        mesh(head, shared.cyl, M.tlGreen, 0, -0.33, 0.16, 0.12, 0.06, 0.12).rotation.x = Math.PI / 2;
        parent.add(head);
      }
      box(parent, M.dark, x - side * 0.2, 2.3, z + 0.3, 0.3, 0.45, 0.3);
      box(parent, M.tlGreen, x - side * 0.2, 2.4, z + 0.46, 0.18, 0.18, 0.02);
      box(parent, M.signGreen, x - side * 0.2, 1.4, z - 0.25, 0.14, 0.2, 0.12);
    }
    const stripes = new THREE.Mesh(new THREE.PlaneGeometry(14.7, 3.4), zebraMat);
    stripes.rotation.x = -Math.PI / 2;
    stripes.position.set(0, 0.006, z - 3.2);
    stripes.receiveShadow = true;
    parent.add(stripes);
    for (const lane of [-4, 4]) box(parent, lineMat, lane, 0.005, z + 0.9, 7.5, 0.01, 0.4);
  }

  function addGantry(parent, z) {
    for (const side of [-1, 1]) {
      box(parent, M.pole, side * 8.6, 3.3, z, 0.35, 6.6, 0.35);
      box(parent, M.concrete, side * 8.6, 0.2, z, 0.7, 0.4, 0.7);
    }
    box(parent, M.pole, 0, 6.65, z, 17.4, 0.6, 0.6);
    box(parent, M.pole, 0, 6.2, z, 17.2, 0.12, 0.12);
    for (const x of [-5.3, -1.77, 1.77, 5.3]) {
      const sign = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.75), ergMat);
      sign.position.set(x, 5.7, z + 0.33);
      parent.add(sign);
      box(parent, M.dark, x, 6.1, z, 0.6, 0.3, 0.5);
    }
  }

  function addSignPost(parent, side, z) {
    const x = side * 8.6;
    cyl(parent, M.pole, x, 0, z, 0.05, 3.2);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 0.75), limitMat);
    face.position.set(x, 3.0, z + 0.07);
    parent.add(face);
  }

  function addBin(parent, side, z) {
    box(parent, M.green, side * 8.6, 0.55, z, 0.45, 0.75, 0.45);
    box(parent, M.dark, side * 8.6, 0.97, z, 0.5, 0.08, 0.5);
  }

  function addHydrant(parent, side, z) {
    cyl(parent, M.hydrant, side * 8.4, 0.13, z, 0.13, 0.6);
    mesh(parent, shared.sphere, M.hydrant, side * 8.4, 0.78, z, 0.14, 0.1, 0.14);
  }

  // ----- Buildings -----
  function roofDetails(parent, x, topY, w, d, rand) {
    box(parent, M.roof, x, topY + 0.02, 0, w, 0.06, d);
    const mw = w * 0.35; const md = d * 0.3;
    box(parent, M.concrete, x + (rand() - 0.5) * w * 0.3, topY + 1.4, (rand() - 0.5) * d * 0.4, mw, 2.8, md);
    for (let i = 0; i < 3; i++) box(parent, M.metal, x + (rand() - 0.5) * w * 0.7, topY + 0.45, (rand() - 0.5) * d * 0.7, 1.4, 0.8, 1.2);
    cyl(parent, M.dark, x + w * 0.2, topY + 0.06, d * 0.15, 0.04, 6 + rand() * 6);
    mesh(parent, shared.sphere, M.red, x + w * 0.2, topY + 12.1, d * 0.15, 0.14, 0.14, 0.14);
    const edge = 0.5;
    box(parent, M.concrete, x, topY + 0.3, d / 2 - edge / 2, w, 0.6, edge);
    box(parent, M.concrete, x, topY + 0.3, -d / 2 + edge / 2, w, 0.6, edge);
    box(parent, M.concrete, x + w / 2 - edge / 2, topY + 0.3, 0, edge, 0.6, d);
    box(parent, M.concrete, x - w / 2 + edge / 2, topY + 0.3, 0, edge, 0.6, d);
  }

  function addShophouse(parent, side, zc, rand) {
    const w = 9 + rand() * 3;
    const d = 3.6 * Math.round((15 + rand() * 4) / 3.6);
    const floors = 2 + (rand() > 0.5 ? 1 : 0);
    const groundH = 4;
    const upperH = floors * 3.4;
    const H = groundH + upperH;
    const tint = SHOP_TINTS[Math.floor(rand() * SHOP_TINTS.length)];
    const cx = side * (FACE + w / 2);
    const g = new THREE.Group();
    g.position.set(0, 0, zc);
    parent.add(g);
    walls(g, 'shophouse', tint, cx, groundH + upperH / 2, 0, w, upperH, d);
    box(g, M.roof, cx, H + 0.02, 0, w, 0.06, d);
    const shopX = side * (FACE + 1.7 + (w - 1.7) / 2);
    box(g, stdMat(tint, { rough: 0.8 }), shopX, groundH / 2, 0, w - 1.7, groundH, d);
    box(g, M.shopGlow, side * (FACE + 1.72), 1.85, 0, 0.06, 3.0, d * 0.94);
    const bays = Math.round(d / 3.6);
    for (let k = 0; k <= bays; k++) {
      const dz = -d / 2 + k * (d / bays);
      cyl(g, M.white, side * (FACE + 0.45), 0.13, dz, 0.24, groundH - 0.13);
      box(g, M.white, side * (FACE + 0.45), 0.2, dz, 0.55, 0.14, 0.55);
    }
    box(g, M.white, side * (FACE + 0.1), groundH - 0.15, 0, 0.5, 0.3, d);
    box(g, M.concrete, side * (FACE + 0.8), 0.1, 0, 1.8, 0.04, d);
    for (let k = 0; k < bays; k++) {
      const dz = -d / 2 + (k + 0.5) * (d / bays);
      const sign = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 0.78), signMats[Math.floor(rand() * signMats.length)]);
      sign.position.set(side * (FACE - 0.02), 3.45, dz);
      sign.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
      g.add(sign);
      const awning = box(g, rand() > 0.5 ? M.red : M.busBlue, side * (FACE + 0.55), 2.8, dz, 1.0, 0.06, 2.8);
      awning.rotation.z = side * 0.35;
    }
    const roofShape = new THREE.Shape([new THREE.Vector2(-w / 2 - 0.4, 0), new THREE.Vector2(w / 2 + 0.4, 0), new THREE.Vector2(0, 2.3)]);
    const roofGeo = new THREE.ExtrudeGeometry(roofShape, { depth: d + 0.8, bevelEnabled: false });
    roofGeo.translate(0, 0, -(d + 0.8) / 2);
    const roofMesh = new THREE.Mesh(roofGeo, M.tile);
    roofMesh.position.set(cx, H, 0);
    g.add(roofMesh);
    box(g, M.concrete, cx, H + 2.25, 0, 0.3, 0.2, d + 0.9);
  }

  function addTower(parent, side, zc, rand, plaza) {
    const kinds = ['glass', 'hdb', 'concrete'];
    const kind = kinds[Math.floor(rand() * kinds.length)];
    const w = 11 + rand() * 4;
    const d = 20 + rand() * 7;
    const H = 20 + rand() * 46;
    const offset = plaza ? 6 : 0;
    const cx = side * (FACE + offset + w / 2);
    const tints = { glass: [0xffffff, 0xd9f0ee, 0xe3e9f7], hdb: [0xf3e6c8, 0xdfeaf2, 0xf2d8d0, 0xe6efd6], concrete: [0xffffff, 0xece6da, 0xdfe6e8] };
    const tint = tints[kind][Math.floor(rand() * tints[kind].length)];
    const g = new THREE.Group();
    g.position.set(0, 0, zc);
    parent.add(g);
    const podiumH = 5;
    box(g, M.concrete, cx - side * 0.2, podiumH / 2, 0, w + 0.4, podiumH, d + 0.4);
    box(g, M.glassDark, cx - side * (w / 2 + 0.25), 2.4, 0, 0.1, 4.2, d * 0.84);
    box(g, M.white, cx - side * (w / 2 + 0.9), 3.9, 0, 1.6, 0.18, d * 0.5);
    for (const dz of [-d * 0.22, d * 0.22]) cyl(g, M.white, cx - side * (w / 2 + 1.5), 0, dz, 0.14, 3.9);
    const stepped = H > 34 && rand() > 0.45;
    const lowH = stepped ? H * 0.55 : H;
    walls(g, kind, tint, cx, podiumH + (lowH - podiumH) / 2, 0, w, lowH - podiumH, d);
    box(g, M.roof, cx, lowH + 0.02, 0, w, 0.06, d);
    if (stepped) {
      const w2 = w * 0.78; const d2 = d * 0.78;
      walls(g, kind, tint, cx + side * (w - w2) / 2, lowH + (H - lowH) / 2, 0, w2, H - lowH, d2);
      roofDetails(g, cx + side * (w - w2) / 2, H, w2, d2, rand);
    } else {
      roofDetails(g, cx, H, w, d, rand);
    }
    if (plaza) {
      box(g, new THREE.MeshStandardMaterial({ map: pavers, color: 0xd9d3c3, roughness: 0.9 }), side * (FACE + 3.1), 0.09, 0, 6.2, 0.1, d);
      addRainTree(g, side * (FACE + 3.3), -d * 0.3, rand);
      addRainTree(g, side * (FACE + 3.3), d * 0.3, rand);
      for (const dz of [-4, 0, 4]) box(g, M.planter, side * (FACE + 1.2), 0.35, dz, 0.6, 0.5, 1.4);
      box(g, M.wood, side * (FACE + 4.5), 0.45, 0, 0.5, 0.08, 2.2);
      box(g, M.pole, side * (FACE + 4.5), 0.22, 0, 0.45, 0.4, 2.0);
    }
  }

  function addSkyline(parent, side, rand, far) {
    const kinds = ['glass', 'concrete', 'hdb'];
    for (let i = 0; i < 2; i++) {
      const w = 12 + rand() * 10; const d = 12 + rand() * 12;
      const h = (far ? 25 : 45) + rand() * (far ? 40 : 80);
      const x = side * ((far ? 135 : 44) + rand() * (far ? 40 : 40));
      const z = -6 - rand() * 52;
      const kind = kinds[Math.floor(rand() * kinds.length)];
      walls(parent, kind, kind === 'glass' ? 0xcfe3ea : 0xe9e4d8, x, h / 2, z, w, h, d);
      box(parent, M.roof, x, h + 0.02, z, w, 0.06, d);
    }
  }

  // ----- Blocks -----
  function buildBlock(route, i, rand) {
    const block = new THREE.Group();
    block.position.z = -i * BLOCK_LENGTH;
    block.userData.landmarks = [];
    for (const side of [-1, 1]) {
      const onWater = route.water === side;
      let id = null;
      if (onWater) {
        if (i % 2 === 0 && route.waterLandmarks) id = route.waterLandmarks[(i / 2) % route.waterLandmarks.length | 0];
      } else if (route.water || (i % 2 === 0) === (side === -1)) {
        id = route.landmarks[i % route.landmarks.length];
      }
      if (!onWater) addShophouse(block, side, -16, rand);
      if (id) {
        const landmark = buildLandmark(id);
        landmark.position.set(side * (onWater ? 22 : 12), 0, -44);
        if (side === 1) landmark.rotation.y = Math.PI;
        block.add(landmark);
        block.userData.landmarks.push(landmark.userData.name);
      } else if (!onWater) {
        addTower(block, side, -44, rand, true);
      }
      addSkyline(block, side, rand, onWater);
    }
    for (let k = 0; k < 4; k++) {
      const pairs = [[-1, -8 - k * 16, -2 - k * 16], [1, -16 - k * 16, -10 - k * 16]];
      for (const [side, treeZ, lampZ] of pairs) {
        addLamp(block, side * 8.7, lampZ);
        if (route.water === side) continue;
        if ((i + k) % 3 === 0) addRainTree(block, side * 9.6, treeZ, rand);
        else addPalm(block, side * 9.4, treeZ, rand);
        addHedge(block, side * 8.35, treeZ - 4.2 + (k % 2) * 0.3, 5.5);
      }
    }
    addTrafficSignals(block, -34);
    for (const side of [-1, 1]) {
      if (route.water === side) continue;
      if ((i + (side > 0 ? 1 : 0)) % 2 === 0) addBusStop(block, side, -58);
      addSignPost(block, side, -4);
      addBin(block, side, -22);
      addHydrant(block, side, -46);
      for (let p = 0; p < 2; p++) addPedestrian(block, side * (8.9 + rand() * 2.2), -6 - rand() * 52, rand);
    }
    if (i % 4 === 1) addGantry(block, -24);
    mergeStatics(block);
    for (const child of block.children) child.updateMatrixWorld(true);
    return block;
  }

  function disposeBlock(block) {
    block.traverse((o) => {
      if (o.userData.merged && o.geometry) o.geometry.dispose();
    });
    disposeLandmarks(block);
  }

  function animatePedestrians(blocks, time, dt) {
    for (const block of blocks) {
      for (const child of block.children) {
        const p = child.userData.ped;
        if (!p) continue;
        child.position.z += p.dir * p.speed * dt;
        if (child.position.z > -2) child.position.z = -62;
        if (child.position.z < -62) child.position.z = -2;
        const swing = Math.sin(time * p.speed * 4.5 + p.phase) * 0.7;
        p.legs[0].rotation.x = swing; p.legs[1].rotation.x = -swing;
        p.arms[0].rotation.x = -swing * 0.8; p.arms[1].rotation.x = swing * 0.8;
      }
    }
  }

  function createFinishGate() {
    const gate = new THREE.Group();
    for (const side of [-1, 1]) {
      box(gate, M.pole, side * 8.7, 3.6, 0, 0.5, 7.2, 0.5);
      box(gate, M.concrete, side * 8.7, 0.25, 0, 0.9, 0.5, 0.9);
    }
    box(gate, M.pole, 0, 7.2, 0, 18, 0.9, 0.7);
    const banner = new THREE.Mesh(new THREE.PlaneGeometry(17, 1.0), checkerMat);
    banner.position.set(0, 6.3, 0.0);
    gate.add(banner);
    const front = new THREE.Mesh(new THREE.PlaneGeometry(17, 0.8), new THREE.MeshStandardMaterial({ map: track(signTexture('FINISH', '#111', '#ffffff', 512, 48)), roughness: 0.6 }));
    front.position.set(0, 7.2, 0.37);
    gate.add(front);
    const line = new THREE.Mesh(new THREE.PlaneGeometry(16, 2), finishFloorMat);
    line.rotation.x = -Math.PI / 2;
    line.position.set(0, 0.012, 0);
    gate.add(line);
    gate.traverse((o) => { if (o.isMesh) o.castShadow = true; });
    gate.visible = false;
    scene.add(gate);
    return gate;
  }

  function setRoute(route) {
    const night = !!route.night;
    nightGlow = night ? 0.9 : 0;
    for (const material of facadeMats.values()) material.emissiveIntensity = nightGlow;
    for (const m of signMats) m.emissiveIntensity = night ? 0.7 : 0.12;
    M.lampOn.emissiveIntensity = night ? 3 : 1;
    M.shopGlow.emissiveIntensity = night ? 1.2 : 0.35;
    const horizon = new THREE.Color(route.sky);
    const luminance = horizon.r * 0.3 + horizon.g * 0.59 + horizon.b * 0.11;
    const zenith = horizon.clone().lerp(new THREE.Color(night ? 0x070b24 : 0x2f6fb8), night ? 0.65 : 0.55);
    if (!night && luminance < 0.5) zenith.multiplyScalar(0.7);
    skyUniforms.uHorizon.value.copy(horizon);
    skyUniforms.uZenith.value.copy(zenith);
    skyUniforms.uSunColor.value.set(route.sunColor);
    skyUniforms.uGlow.value = night ? 0.05 : 0.35;
    stars.visible = night;
    const cloudTint = new THREE.Color(0xffffff).lerp(horizon, night ? 0.75 : 0.25);
    cloudMaterials.forEach((m) => { m.color.copy(cloudTint); m.opacity = night ? 0.35 : 0.8; });
    scene.background = horizon.clone();
    scene.fog.color.copy(horizon);
    groundMat.color.set(route.ground);
    hemi.intensity = route.hemi * 0.55;
    sun.intensity = route.sun;
    sun.color.set(route.sunColor);
    scene.environmentIntensity = night ? 0.35 : 0.9;
    water.visible = !!route.water;
    if (route.water) {
      water.material.color.set(route.waterColor);
      water.position.set(route.water * (64 + 130 - 50), -0.08, CENTER_Z);
    }
    refreshEnvironment(route.ground);
  }

  function scroll(meters, dt) {
    for (const s of scrollers) s.tex.offset.y += meters / s.tile;
    waterTex.offset.x += dt * 0.01;
    for (const d of dashes) {
      d.position.z += meters;
      if (d.position.z > 40) d.position.z -= DASH_SPACING * DASH_COUNT;
    }
    clouds.children.forEach((c) => {
      c.position.x += dt * 1.2;
      if (c.position.x > 380) c.position.x = -380;
    });
  }

  return { buildBlock, disposeBlock, setRoute, scroll, animatePedestrians, createFinishGate, sun, hemi };
}
