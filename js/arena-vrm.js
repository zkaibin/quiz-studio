// VRM + MToon anime fighters for Arena Clash.
// Primary base: Seed-san (CDN, VRM Public License Model Use) with local MIT fallback.
// Kits are original recolors + signature hair — not official Dragon Ball assets.
import * as THREE from './vendor/three/three.module.min.js';
import { GLTFLoader } from './vendor/three/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils, VRMHumanBoneName } from './vendor/three-vrm/three-vrm.module.min.js';
import { buildFighterModel as buildSpriteFallback } from './arena-anime-sprite.js';

// Prefer Seed-san (official VRM sample, anime humanoid) via CDN — Model Use under
// VRM Public License 1.0 (VirtualCast). Local MIT sample is the offline fallback.
const SEED_SAN_URL = 'https://cdn.jsdelivr.net/gh/vrm-c/vrm-specification@master/samples/Seed-san/vrm/Seed-san.vrm';
const LOCAL_FALLBACK_URL = 'models/arena/anime-base.vrm';

let loader = null;
const vrmTemplateCache = new Map(); // url -> ArrayBuffer
let preloadPromise = null;
let resolvedBaseUrl = null;

function getLoader() {
  if (loader) return loader;
  loader = new GLTFLoader();
  loader.crossOrigin = 'anonymous';
  loader.register((parser) => new VRMLoaderPlugin(parser));
  return loader;
}

function cssHex(hex) {
  return `#${(hex >>> 0).toString(16).padStart(6, '0')}`;
}

function shadeHex(hex, amount) {
  const r = Math.min(255, Math.max(0, ((hex >> 16) & 255) + Math.round(255 * amount)));
  const g = Math.min(255, Math.max(0, ((hex >> 8) & 255) + Math.round(255 * amount)));
  const b = Math.min(255, Math.max(0, (hex & 255) + Math.round(255 * amount)));
  return (r << 16) | (g << 8) | b;
}

function toColor(hex) {
  return new THREE.Color(hex);
}

async function fetchVrmBuffer(url) {
  if (vrmTemplateCache.has(url)) return vrmTemplateCache.get(url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`VRM fetch failed (${url}): ${res.status}`);
  const buf = await res.arrayBuffer();
  vrmTemplateCache.set(url, buf);
  return buf;
}

async function resolveBaseUrl() {
  if (resolvedBaseUrl) return resolvedBaseUrl;
  try {
    await fetchVrmBuffer(SEED_SAN_URL);
    resolvedBaseUrl = SEED_SAN_URL;
  } catch (err) {
    console.warn('Seed-san CDN unavailable, using local VRM fallback.', err);
    await fetchVrmBuffer(LOCAL_FALLBACK_URL);
    resolvedBaseUrl = LOCAL_FALLBACK_URL;
  }
  return resolvedBaseUrl;
}

/** Fetch + parse a VRM once; subsequent calls re-parse cached bytes. */
async function loadVrmInstance(url) {
  const gltfLoader = getLoader();
  const useUrl = url || await resolveBaseUrl();
  const buf = (await fetchVrmBuffer(useUrl)).slice(0);
  const basePath = useUrl.includes('://') ? useUrl.replace(/[^/]+$/, '') : useUrl.replace(/[^/]+$/, '');
  const gltf = await gltfLoader.parseAsync(buf, basePath);
  const vrm = gltf.userData.vrm;
  if (!vrm) throw new Error('VRM plugin did not produce userData.vrm');

  VRMUtils.removeUnnecessaryVertices(gltf.scene);
  try { VRMUtils.removeUnnecessaryJoints(gltf.scene); } catch { /* ok */ }

  vrm.scene.traverse((obj) => {
    obj.frustumCulled = false;
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  return { gltf, vrm, url: useUrl };
}

function nameHit(str, words) {
  const s = (str || '').toLowerCase();
  return words.some((w) => s.includes(w));
}

function setMatColor(mat, color, shadeAmt = -0.35) {
  if ('color' in mat) mat.color.copy(color);
  if ('shadeColorFactor' in mat) mat.shadeColorFactor = toColor(shadeHex(color.getHex(), shadeAmt));
  else if ('shadeColor' in mat) mat.shadeColor.copy(toColor(shadeHex(color.getHex(), shadeAmt)));
  if ('emissive' in mat && mat.emissive) mat.emissive.setHex(0x000000);
  mat.needsUpdate = true;
}

/** Drop baked albedo so kit colors read as solid cel blocks (Seed-san huku_bake, etc.). */
function flattenToSolid(mat, color, shadeAmt = -0.32) {
  if (mat.map) { mat.map = null; }
  if (mat.emissiveMap) { mat.emissiveMap = null; }
  if (mat.normalMap) { mat.normalMap = null; }
  if (mat.shadeMultiplyTexture) { mat.shadeMultiplyTexture = null; }
  if (mat.matcapTexture) { mat.matcapTexture = null; }
  if (mat.rimMultiplyTexture) { mat.rimMultiplyTexture = null; }
  if (mat.uvAnimationMaskTexture) { mat.uvAnimationMaskTexture = null; }
  if ('emissiveIntensity' in mat) mat.emissiveIntensity = 0;
  setMatColor(mat, color, shadeAmt);
  mat.transparent = false;
  mat.opacity = 1;
  mat.visible = true;
  mat.needsUpdate = true;
}

function hideMat(mat) {
  mat.visible = false;
  mat.transparent = true;
  mat.opacity = 0;
  mat.depthWrite = false;
  mat.needsUpdate = true;
}

/**
 * Recolor MToon / standard materials toward the fighter kit.
 * Seed-san: mesh names hair / hair_tail / head / robo_arm / wear + baked mats.
 * Local MIT sample: generic VRoid-like name heuristics.
 */
function applyKitMaterials(vrm, visual) {
  const skin = toColor(visual.skin || 0xe8b896);
  const hair = toColor(visual.hair || 0x1a1410);
  const outfit = toColor(visual.outfit || 0xf97316);
  const undershirt = toColor(visual.undershirt || visual.accent || 0x1e3a8a);
  const pants = toColor(visual.pants || visual.outfit || 0xea580c);
  const boots = toColor(visual.boots || 0x1e3a8a);
  const gold = toColor(visual.gold || 0xeab308);
  const white = toColor(0xf8fafc);
  const kit = visual.kit || 'gi';
  // Primary clothing block when the base only has one outfit bake
  const primaryCloth = kit === 'saiyanArmor' ? undershirt : outfit;
  const secondaryCloth = kit === 'saiyanArmor' ? white : pants;

  vrm.scene.traverse((obj) => {
    if (!obj.isMesh || !obj.material) return;
    // Seed-san mech arm + any named prop meshes
    if (nameHit(obj.name, ['robo', 'robot', 'mech', 'machine', 'backpack', 'weapon', 'cannon', 'claw', 'prop'])) {
      obj.visible = false;
      return;
    }
    const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
    const meshName = (obj.name || '').toLowerCase();

    mats.forEach((mat) => {
      const matName = (mat.name || '').toLowerCase();
      const n = `${meshName} ${matName}`;

      // Explicit Seed-san / VRoid material names first
      if (nameHit(matName, ['backpack', 'robo', 'arm_mat', 'arm_plastic', 'green_emit', 'anim_logo', 'glass'])) {
        hideMat(mat);
        return;
      }
      // Fingerless gear / gloves → kit accent (was teal leftover when hidden incompletely)
      if (nameHit(matName, ['armgear'])) {
        flattenToSolid(mat, kit === 'saiyanArmor' ? white : undershirt, -0.25);
        return;
      }
      // Hair meshes first — Seed-san's hair also carries a huku_bake slot
      if (meshName === 'hair' || meshName === 'hair_tail' || nameHit(meshName, ['hair', 'bangs', 'ahoge'])) {
        flattenToSolid(mat, hair, -0.08);
        return;
      }
      if (nameHit(matName, ['wear_metal', 'metal']) && !nameHit(matName, ['body'])) {
        flattenToSolid(mat, kit === 'saiyanArmor' ? white : gold, -0.18);
        return;
      }
      if (matName === 'huku_bake' || nameHit(matName, ['huku', 'cloth', 'shirt', 'outfit', 'uniform'])) {
        flattenToSolid(mat, primaryCloth, -0.28);
        return;
      }
      if (matName === 'body_nm') {
        flattenToSolid(mat, secondaryCloth, -0.3);
        return;
      }
      if (matName === 'body_bake' || nameHit(matName, ['skin', 'body_bake', 'flesh'])) {
        setMatColor(mat, skin, -0.22);
        return;
      }
      if (matName === 'hair' || nameHit(matName, ['hair', 'bangs', 'ahoge', 'kami', 'fringe'])) {
        flattenToSolid(mat, hair, -0.08);
        return;
      }
      if (nameHit(matName, ['eye']) && !nameHit(matName, ['white', 'sclera'])) {
        if ('color' in mat) mat.color.copy(toColor(visual.eyeColor || 0x111827));
        mat.needsUpdate = true;
        return;
      }

      // Mesh-level fallbacks
      if (nameHit(n, ['hair', 'bangs', 'ahoge', 'kami', 'fringe'])) {
        setMatColor(mat, hair, -0.12);
        return;
      }
      if (nameHit(n, ['eye', 'iris', 'pupil'])) {
        if ('color' in mat) mat.color.copy(toColor(visual.eyeColor || 0x111827));
        mat.needsUpdate = true;
        return;
      }
      if (nameHit(n, ['face', 'head', 'skin', 'body', 'bare', 'flesh', 'neck'])) {
        if (!nameHit(n, ['cloth', 'shirt', 'pants', 'shoe', 'boot', 'sock', 'jacket', 'armor', 'uni', 'glove', 'huku'])) {
          setMatColor(mat, skin, -0.28);
          return;
        }
      }
      if (nameHit(n, ['shoe', 'boot', 'footwear', 'sole'])) {
        flattenToSolid(mat, boots, -0.3);
        return;
      }
      if (nameHit(n, ['pants', 'bottom', 'skirt', 'trouser', 'short'])) {
        flattenToSolid(mat, pants, -0.32);
        return;
      }
      if (nameHit(n, ['glove', 'wrist', 'sleeve', 'bracelet'])) {
        flattenToSolid(mat, kit === 'saiyanArmor' ? white : undershirt, -0.25);
        return;
      }
      if (nameHit(n, ['belt', 'sash', 'buckle', 'ribbon'])) {
        flattenToSolid(mat, kit === 'gi' ? undershirt : gold, -0.25);
        return;
      }
      if (nameHit(n, ['armor', 'plate', 'chest', 'shoulder'])) {
        flattenToSolid(mat, kit === 'saiyanArmor' ? white : outfit, -0.2);
        return;
      }
      if (nameHit(n, ['shirt', 'top', 'cloth', 'wear', 'jacket', 'dress', 'onepiece', 'uniform', 'outfit', 'tunic', 'inner', 'outer'])) {
        flattenToSolid(mat, primaryCloth, -0.28);
        return;
      }
    });
  });

  // Harder MToon cel bands + outline
  vrm.scene.traverse((obj) => {
    if (!obj.isMesh || !obj.material) return;
    const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
    mats.forEach((mat) => {
      if (!mat.visible) return;
      if ('shadingToonyFactor' in mat) mat.shadingToonyFactor = 0.98;
      if ('shadingShiftFactor' in mat) mat.shadingShiftFactor = -0.18;
      if ('outlineWidthFactor' in mat) mat.outlineWidthFactor = Math.max(mat.outlineWidthFactor || 0, 0.0014);
      if ('outlineColorFactor' in mat) mat.outlineColorFactor = toColor(0x100c0a);
    });
  });
}

/** Cone-spike hair on the head bone. Keep scalp hair; spikes add silhouette. */
function attachSignatureHair(vrm, visual) {
  const head = vrm.humanoid?.getNormalizedBoneNode(VRMHumanBoneName.Head)
    || vrm.humanoid?.getNormalizedBoneNode('head');
  if (!head) return null;

  const style = visual.hairStyle || 'goku';
  if (style === 'krillin' || style === 'piccolo' || style === 'frieza' || style === 'buu') return null;

  // Keep main hair for scalp; drop only tail / bang extras
  vrm.scene.traverse((obj) => {
    if (!obj.isMesh) return;
    if (obj.name === 'hair_tail' || nameHit(obj.name, ['bangs', 'ahoge'])) obj.visible = false;
  });

  const group = new THREE.Group();
  group.name = 'signatureHair';
  // Head bone is at skull base on Seed-san — lift spikes onto the crown
  group.position.set(0, 0.14, 0.02);
  const hairMat = new THREE.MeshToonMaterial({ color: visual.hair || 0x1a1410 });
  const hiMat = new THREE.MeshToonMaterial({ color: shadeHex(visual.hair || 0x1a1410, 0.14) });
  const outlineMat = new THREE.MeshBasicMaterial({ color: 0x0a0806, side: THREE.BackSide });
  const cone = new THREE.ConeGeometry(1, 1, 5);

  const spike = (x, y, z, sx, sy, sz, rx, rz, hi = false) => {
    const m = new THREE.Mesh(cone, hi ? hiMat : hairMat);
    m.position.set(x, y, z);
    m.scale.set(sx, sy, sz);
    m.rotation.set(rx, 0, rz);
    group.add(m);
    const o = new THREE.Mesh(cone, outlineMat);
    o.position.copy(m.position);
    o.rotation.copy(m.rotation);
    o.scale.set(sx * 1.1, sy * 1.08, sz * 1.1);
    group.add(o);
  };

  if (style === 'vegeta') {
    spike(0, 0.22, 0.01, 0.055, 0.38, 0.055, 0.05, 0, true);
    spike(-0.07, 0.2, 0.02, 0.045, 0.32, 0.045, 0.12, -0.25, true);
    spike(0.07, 0.2, 0.02, 0.045, 0.32, 0.045, 0.12, 0.25);
    spike(-0.11, 0.16, -0.02, 0.04, 0.26, 0.04, 0.28, -0.45);
    spike(0.11, 0.16, -0.02, 0.04, 0.26, 0.04, 0.28, 0.45, true);
    spike(0, 0.04, 0.12, 0.05, 0.16, 0.04, 1.05, 0);
  } else if (style === 'broly') {
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      spike(Math.cos(a) * 0.09, 0.14 + (i % 3) * 0.04, Math.sin(a) * 0.07, 0.05, 0.28, 0.05, -0.25, Math.cos(a) * 0.3, i % 2 === 0);
    }
  } else {
    spike(0, 0.24, 0.03, 0.06, 0.4, 0.06, -0.12, 0, true);
    spike(-0.08, 0.2, 0.05, 0.05, 0.34, 0.05, -0.22, -0.4, true);
    spike(0.09, 0.21, 0.04, 0.05, 0.36, 0.05, -0.2, 0.4);
    spike(-0.14, 0.14, 0.0, 0.045, 0.28, 0.045, -0.35, -0.75);
    spike(0.15, 0.15, -0.01, 0.045, 0.3, 0.045, -0.32, 0.75, true);
    spike(0, 0.16, -0.1, 0.06, 0.32, 0.06, -0.85, 0, true);
    spike(-0.05, 0.02, 0.12, 0.04, 0.14, 0.04, 0.95, -0.12);
    spike(0.06, 0.03, 0.12, 0.04, 0.14, 0.04, 0.9, 0.15, true);
  }

  head.add(group);
  return group;
}

function bone(vrm, name) {
  return vrm.humanoid?.getNormalizedBoneNode(name) || null;
}

function poseOffsets(pose, facing) {
  // VRM normalized T-pose: arms along ±X.
  // Empirically on Seed-san: −Z left / +Z right lowers arms ( +Z left raises them overhead ).
  const lead = facing >= 0 ? 1 : -1;
  const base = {
    hips: { x: 0.02, y: 0, z: 0 },
    spine: { x: 0.02, y: 0, z: 0 },
    chest: { x: 0, y: 0, z: 0 },
    neck: { x: -0.02, y: 0, z: 0 },
    head: { x: -0.02, y: 0, z: 0 },
    leftUpperArm: { x: 0.25, y: 0.2, z: -1.25 },
    rightUpperArm: { x: 0.25, y: -0.2, z: 1.25 },
    leftLowerArm: { x: 0.4, y: 0, z: 0.15 },
    rightLowerArm: { x: 0.4, y: 0, z: -0.15 },
    leftUpperLeg: { x: 0.08, y: 0, z: 0.05 },
    rightUpperLeg: { x: 0.08, y: 0, z: -0.05 },
    leftLowerLeg: { x: 0.14, y: 0, z: 0 },
    rightLowerLeg: { x: 0.14, y: 0, z: 0 }
  };

  if (pose === 'idle') {
    // Fighting ready: arms nearly at sides (π/2 from T-pose), fists slightly forward
    base.leftUpperArm = { x: 0.45, y: 0.4, z: -1.45 };
    base.rightUpperArm = { x: 0.45, y: -0.4, z: 1.45 };
    base.leftLowerArm = { x: 1.05, y: 0.12, z: 0.25 };
    base.rightLowerArm = { x: 1.05, y: -0.12, z: -0.25 };
    base.leftUpperLeg = { x: 0.22, y: 0, z: 0.08 };
    base.rightUpperLeg = { x: 0.16, y: 0, z: -0.08 };
    base.leftLowerLeg = { x: 0.4, y: 0, z: 0 };
    base.rightLowerLeg = { x: 0.32, y: 0, z: 0 };
    base.hips.y = lead * -0.08;
    base.spine.y = lead * -0.1;
  } else if (pose === 'punch') {
    const strikeRight = lead > 0;
    if (strikeRight) {
      base.rightUpperArm = { x: -1.15, y: -0.5, z: 0.35 };
      base.rightLowerArm = { x: 0.15, y: 0, z: 0 };
      base.leftUpperArm = { x: 0.5, y: 0.35, z: -1.2 };
      base.leftLowerArm = { x: 1.15, y: 0, z: 0.15 };
    } else {
      base.leftUpperArm = { x: -1.15, y: 0.5, z: -0.35 };
      base.leftLowerArm = { x: 0.15, y: 0, z: 0 };
      base.rightUpperArm = { x: 0.5, y: -0.35, z: 1.2 };
      base.rightLowerArm = { x: 1.15, y: 0, z: -0.15 };
    }
    base.spine.y = lead * -0.35;
    base.hips.y = lead * 0.18;
  } else if (pose === 'kick') {
    if (lead > 0) {
      base.rightUpperLeg = { x: -1.4, y: 0, z: -0.12 };
      base.rightLowerLeg = { x: 0.2, y: 0, z: 0 };
      base.leftUpperLeg = { x: 0.4, y: 0, z: 0.1 };
      base.leftLowerLeg = { x: 0.7, y: 0, z: 0 };
    } else {
      base.leftUpperLeg = { x: -1.4, y: 0, z: 0.12 };
      base.leftLowerLeg = { x: 0.2, y: 0, z: 0 };
      base.rightUpperLeg = { x: 0.4, y: 0, z: -0.1 };
      base.rightLowerLeg = { x: 0.7, y: 0, z: 0 };
    }
    base.leftUpperArm = { x: 0.35, y: 0.25, z: -1.1 };
    base.rightUpperArm = { x: 0.35, y: -0.25, z: 1.1 };
    base.spine.x = 0.1;
  } else if (pose === 'guard') {
    base.leftUpperArm = { x: -0.9, y: 0.5, z: -0.55 };
    base.rightUpperArm = { x: -0.9, y: -0.5, z: 0.55 };
    base.leftLowerArm = { x: 1.45, y: 0.15, z: 0 };
    base.rightLowerArm = { x: 1.45, y: -0.15, z: 0 };
    base.leftUpperLeg.x = 0.35;
    base.rightUpperLeg.x = 0.3;
    base.leftLowerLeg.x = 0.7;
    base.rightLowerLeg.x = 0.65;
    base.hips.x = 0.08;
  } else if (pose === 'hurt') {
    base.spine.x = -0.28;
    base.spine.y = lead * 0.3;
    base.head.x = 0.2;
    base.leftUpperArm = { x: -0.35, y: 0.15, z: -0.85 };
    base.rightUpperArm = { x: -0.4, y: -0.15, z: 0.85 };
  } else if (pose === 'charge') {
    base.leftUpperArm = { x: -0.7, y: 0.45, z: -0.65 };
    base.rightUpperArm = { x: -0.7, y: -0.45, z: 0.65 };
    base.leftLowerArm = { x: 1.05, y: 0, z: 0 };
    base.rightLowerArm = { x: 1.05, y: 0, z: 0 };
    base.hips.x = 0.1;
    base.leftUpperLeg.x = 0.4;
    base.rightUpperLeg.x = 0.4;
    base.leftLowerLeg.x = 0.85;
    base.rightLowerLeg.x = 0.85;
  }
  return base;
}

function applyPose(vrm, poseMap, t = 1) {
  const map = {
    hips: VRMHumanBoneName.Hips,
    spine: VRMHumanBoneName.Spine,
    chest: VRMHumanBoneName.Chest,
    neck: VRMHumanBoneName.Neck,
    head: VRMHumanBoneName.Head,
    leftUpperArm: VRMHumanBoneName.LeftUpperArm,
    rightUpperArm: VRMHumanBoneName.RightUpperArm,
    leftLowerArm: VRMHumanBoneName.LeftLowerArm,
    rightLowerArm: VRMHumanBoneName.RightLowerArm,
    leftUpperLeg: VRMHumanBoneName.LeftUpperLeg,
    rightUpperLeg: VRMHumanBoneName.RightUpperLeg,
    leftLowerLeg: VRMHumanBoneName.LeftLowerLeg,
    rightLowerLeg: VRMHumanBoneName.RightLowerLeg
  };
  Object.entries(poseMap).forEach(([key, rot]) => {
    const node = bone(vrm, map[key] || key);
    if (!node || !rot) return;
    // Absolute targets from T-pose rest (normalized humanoid)
    node.rotation.x += (rot.x - node.rotation.x) * t;
    node.rotation.y += (rot.y - node.rotation.y) * t;
    node.rotation.z += (rot.z - node.rotation.z) * t;
  });
}

function resolvePose(anim, state = {}) {
  if (state.hurt) return 'hurt';
  if (state.guarding) return 'guard';
  if (state.charging) return 'charge';
  // Drive melee from live attackId so the pose ends with attackTimer
  if (state.attack === 'punch' || state.attack === 'uppercut' || state.attack === 'dash') return 'punch';
  if (state.attack === 'kick') return 'kick';
  if (anim === 'guard') return 'guard';
  if (anim === 'hurt') return 'hurt';
  return 'idle';
}

/**
 * Preload the shared VRM base (call from welcome / match start).
 */
export function preloadArenaVrm() {
  if (!preloadPromise) {
    preloadPromise = loadVrmInstance()
      .then(({ vrm }) => {
        vrm.scene.traverse((o) => {
          if (o.isMesh) o.geometry?.dispose?.();
        });
        return true;
      })
      .catch((err) => {
        console.warn('Arena VRM preload failed; sprites will be used.', err);
        preloadPromise = null;
        return false;
      });
  }
  return preloadPromise;
}

/**
 * Build a VRM fighter with the same control surface as sprite/mesh builders.
 * Falls back to canvas sprites if VRM cannot load.
 */
export async function buildVrmFighterModel(fighterDef) {
  const v = fighterDef.visual;
  try {
    const { vrm } = await loadVrmInstance();
    applyKitMaterials(vrm, v);
    attachSignatureHair(vrm, v);

    const root = new THREE.Group();
    root.name = fighterDef.id;
    root.add(vrm.scene);

    const heightScale = (v.height || 1.72) / 1.72;
    // Seed-san / samples are ~1.4–1.6m; scale up for fight-cam read
    root.scale.setScalar(1.7 * heightScale);

    // Simple boots on foot bones (Seed-san is barefoot)
    const bootMat = new THREE.MeshToonMaterial({ color: v.boots || v.accent || 0x1e3a8a });
    const bootGeo = new THREE.CapsuleGeometry(0.055, 0.08, 3, 6);
    ['LeftFoot', 'RightFoot'].forEach((boneName) => {
      const foot = bone(vrm, VRMHumanBoneName[boneName] || boneName);
      if (!foot) return;
      const boot = new THREE.Mesh(bootGeo, bootMat);
      boot.position.set(0, -0.02, 0.04);
      boot.rotation.x = 0.35;
      boot.scale.set(1.1, 0.9, 1.6);
      foot.add(boot);
    });

    const aura = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 16, 12),
      new THREE.MeshBasicMaterial({
        color: v.aura || 0x60a5fa, transparent: true, opacity: 0, depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    aura.scale.set(1.15, 1.8, 1.15);
    aura.position.y = 1.0;
    root.add(aura);

    const rim = new THREE.PointLight(v.aura || 0x60a5fa, 0.75, 4.5, 2);
    rim.position.set(0, 1.5, 1.2);
    root.add(rim);
    const fillRim = new THREE.PointLight(0xffe6c8, 0.3, 3.5, 2);
    fillRim.position.set(0, 1.7, -1.0);
    root.add(fillRim);

    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(0.45, 24),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.28, depthWrite: false })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.02;
    root.add(shadow);

    // Stub bones for API compatibility
    const stub = () => new THREE.Group();
    const bones = {
      hips: stub(), torso: stub(), head: stub(),
      leftArm: { shoulder: stub(), upper: stub(), elbow: stub() },
      rightArm: { shoulder: stub(), upper: stub(), elbow: stub() },
      leftLeg: { hip: stub(), thigh: stub(), knee: stub() },
      rightLeg: { hip: stub(), thigh: stub(), knee: stub() },
      aura, rim, fillRim, vrm
    };

    let facing = 1;
    let anim = 'idle';
    let animT = 0;
    let pose = 'idle';
    const CAM_BIAS = 0.4;

    function setFacing(dir) {
      facing = dir >= 0 ? 1 : -1;
      // Same camera-biased facing as procedural mesh fighters (arena-characters.js)
      root.rotation.y = facing >= 0 ? Math.PI / 2 - CAM_BIAS : -Math.PI / 2 + CAM_BIAS;
    }

    function setAnim(name) {
      if (anim !== name) {
        anim = name;
        animT = 0;
      }
    }

    function setCamera() { /* VRM uses world facing, not billboards */ }

    function animate(dt, state = {}) {
      animT += dt;
      const next = resolvePose(anim, state);
      const poseChanged = next !== pose;
      pose = next;
      const targets = poseOffsets(pose, facing);
      // Snap into attack poses so short melee windows read at fight-cam distance
      const rate = state.hurt ? 16
        : (pose === 'punch' || pose === 'kick' ? 28 : 14);
      const blend = poseChanged && (pose === 'punch' || pose === 'kick')
        ? 1
        : Math.min(1, rate * Math.max(dt, 1 / 30));
      applyPose(vrm, targets, blend);

      // Idle breath
      if (pose === 'idle') {
        const breath = Math.sin(animT * 2.2) * 0.015;
        const chest = bone(vrm, VRMHumanBoneName.Chest);
        if (chest) chest.position.y = breath;
      }

      vrm.update(dt);

      const energyGlow = 0.5 + (state.aura || 0) * 2.2 + (state.charging ? 0.7 : 0);
      rim.intensity += (energyGlow - rim.intensity) * Math.min(1, 6 * dt);
      if (state.charging) {
        aura.material.opacity = 0.45 + Math.sin(animT * 12) * 0.15;
        aura.scale.setScalar(1.1 + Math.sin(animT * 8) * 0.12);
      } else {
        aura.material.opacity += ((state.aura || 0) * 0.65 - aura.material.opacity) * Math.min(1, 6 * dt);
      }
      shadow.material.opacity = state.airborne ? 0.12 : 0.28;
      shadow.scale.setScalar(state.airborne ? 0.55 : 1);
    }

    function dispose() {
      root.remove(vrm.scene);
      vrm.scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry?.dispose?.();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m?.dispose?.());
        }
      });
      aura.geometry.dispose();
      aura.material.dispose();
      shadow.geometry.dispose();
      shadow.material.dispose();
    }

    // Seed idle pose
    applyPose(vrm, poseOffsets('idle', 1), 1);
    vrm.update(0);

    return {
      root, bones, setFacing, setCamera, setAnim, animate, dispose,
      height: v.height || 1.72,
      kind: 'vrm'
    };
  } catch (err) {
    console.warn('VRM fighter build failed; using sprite fallback.', err);
    const sprite = buildSpriteFallback(fighterDef);
    sprite.kind = 'sprite';
    return sprite;
  }
}

/** Sync helper used by combat when VRM path is preferred. */
export async function buildFighterModel(fighterDef) {
  return buildVrmFighterModel(fighterDef);
}
