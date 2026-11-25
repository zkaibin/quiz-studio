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

  // Avoid VRMUtils mesh/joint stripping — it can break skinning on Seed-san.

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
  const head = rawBone(vrm, VRMHumanBoneName.Head)
    || bone(vrm, VRMHumanBoneName.Head);
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
    // Goku-like fan — several tall spikes, short forehead spikes (not one witch-hat)
    spike(0, 0.22, 0.02, 0.05, 0.36, 0.05, -0.08, 0, true);
    spike(-0.07, 0.2, 0.04, 0.045, 0.32, 0.045, -0.18, -0.32, true);
    spike(0.08, 0.2, 0.03, 0.045, 0.33, 0.045, -0.16, 0.32);
    spike(-0.12, 0.15, 0.01, 0.04, 0.26, 0.04, -0.28, -0.65);
    spike(0.13, 0.16, 0.0, 0.04, 0.28, 0.04, -0.26, 0.65, true);
    spike(-0.05, 0.18, -0.08, 0.042, 0.28, 0.042, -0.7, -0.2, true);
    spike(0.05, 0.18, -0.08, 0.042, 0.28, 0.042, -0.7, 0.2);
    spike(0, 0.14, -0.11, 0.05, 0.24, 0.05, -0.95, 0, true);
    spike(-0.04, 0.02, 0.11, 0.032, 0.1, 0.03, 0.85, -0.1);
    spike(0.045, 0.025, 0.11, 0.032, 0.1, 0.03, 0.8, 0.12, true);
  }

  head.add(group);
  return group;
}

function bone(vrm, name) {
  return vrm.humanoid?.getNormalizedBoneNode(name) || null;
}

function rawBone(vrm, name) {
  return vrm.humanoid?.getRawBoneNode?.(name) || null;
}

const BONE_MAP = {
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

function rot(x = 0, y = 0, z = 0) {
  return { x, y, z };
}

function lerpPose(a, b, t) {
  const out = {};
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  keys.forEach((k) => {
    const A = a[k] || rot();
    const B = b[k] || rot();
    out[k] = rot(
      A.x + (B.x - A.x) * t,
      A.y + (B.y - A.y) * t,
      A.z + (B.z - A.z) * t
    );
  });
  return out;
}

/** Idle / ready stance shared as the blend base for attacks. */
function idlePose(facing) {
  const lead = facing >= 0 ? 1 : -1;
  return {
    hips: rot(0.04, lead * -0.1, 0),
    spine: rot(0.06, lead * -0.12, 0),
    chest: rot(0.04, lead * -0.08, 0),
    neck: rot(-0.05, 0, 0),
    head: rot(-0.04, lead * 0.06, 0),
    // Arms down at sides — keep Y twist small so the far arm doesn't contort
    leftUpperArm: rot(0.35, 0.12, -1.35),
    rightUpperArm: rot(0.35, -0.12, 1.35),
    leftLowerArm: rot(0.55, 0.05, 0.1),
    rightLowerArm: rot(0.55, -0.05, -0.1),
    leftUpperLeg: rot(0.22, 0, 0.1),
    rightUpperLeg: rot(0.16, 0, -0.1),
    leftLowerLeg: rot(0.42, 0, 0),
    rightLowerLeg: rot(0.34, 0, 0)
  };
}

/**
 * Exaggerated combat poses that read at fight-cam distance.
 * phase: 0 = windup, 1 = full strike / held pose.
 */
function poseOffsets(pose, facing, phase = 1, hand = 'lead') {
  const lead = facing >= 0 ? 1 : -1;
  // Fight cam sits on +Z with a yaw bias — the camera-side arm is opposite the
  // world facing axis. Prefer that arm so punches aren't hidden behind the torso.
  // facing+ (look +X) → left arm toward camera; facing− → right arm toward camera.
  const useRight = hand === 'rear' ? lead > 0 : lead < 0;
  const idle = idlePose(facing);

  if (pose === 'idle') return idle;

  if (pose === 'punch') {
    // Side-view readable: striking arm HIGH then out (screen up + toward foe).
    // Matches the silhouette that reads on arena-vrm-debug with the fight builder.
    const windup = { ...idle };
    const strike = { ...idle };
    if (useRight) {
      windup.rightUpperArm = rot(-0.2, -0.6, 1.35);
      windup.rightLowerArm = rot(1.8, 0, 0);
      windup.leftUpperArm = rot(-1.0, 0.5, -0.9);
      windup.leftLowerArm = rot(1.4, 0, 0);
      strike.rightUpperArm = rot(-1.4, -0.35, 0.55);
      strike.rightLowerArm = rot(0.1, 0, 0);
      strike.leftUpperArm = rot(-0.6, 0.7, -1.1);
      strike.leftLowerArm = rot(1.5, 0.2, 0);
    } else {
      windup.leftUpperArm = rot(-0.2, 0.6, -1.35);
      windup.leftLowerArm = rot(1.8, 0, 0);
      windup.rightUpperArm = rot(-1.0, -0.5, 0.9);
      windup.rightLowerArm = rot(1.4, 0, 0);
      strike.leftUpperArm = rot(-1.4, 0.35, -0.55);
      strike.leftLowerArm = rot(0.1, 0, 0);
      strike.rightUpperArm = rot(-0.6, -0.7, 1.1);
      strike.rightLowerArm = rot(1.5, -0.2, 0);
    }
    windup.spine = rot(0.2, lead * 0.35, 0);
    windup.chest = rot(0.1, lead * 0.25, 0);
    strike.spine = rot(0.05, lead * -0.45, 0);
    strike.chest = rot(0.05, lead * -0.35, 0);
    strike.hips = rot(0.05, lead * 0.2, 0);
    strike.head = rot(-0.1, lead * -0.15, 0);
    return lerpPose(windup, strike, phase);
  }

  if (pose === 'uppercut') {
    const windup = { ...idle };
    const strike = { ...idle };
    if (useRight) {
      windup.rightUpperArm = rot(0.6, -0.4, 1.2);
      windup.rightLowerArm = rot(1.7, 0, 0);
      strike.rightUpperArm = rot(-2.2, -0.35, 0.4); // fist skyward
      strike.rightLowerArm = rot(0.2, 0, 0);
      strike.leftUpperArm = rot(0.5, 0.4, -1.3);
    } else {
      windup.leftUpperArm = rot(0.6, 0.4, -1.2);
      windup.leftLowerArm = rot(1.7, 0, 0);
      strike.leftUpperArm = rot(-2.2, 0.35, -0.4);
      strike.leftLowerArm = rot(0.2, 0, 0);
      strike.rightUpperArm = rot(0.5, -0.4, 1.3);
    }
    windup.spine = rot(0.35, lead * 0.1, 0);
    windup.hips = rot(0.25, 0, 0);
    strike.spine = rot(-0.35, lead * -0.2, 0);
    strike.chest = rot(-0.25, 0, 0);
    strike.hips = rot(-0.15, lead * 0.1, 0);
    strike.head = rot(-0.3, 0, 0);
    return lerpPose(windup, strike, phase);
  }

  if (pose === 'dash') {
    const windup = { ...idle };
    const strike = { ...idle };
    // Shoulder-first lunge — both arms drive forward
    windup.leftUpperArm = rot(0.2, 0.6, -0.9);
    windup.rightUpperArm = rot(0.2, -0.6, 0.9);
    windup.spine = rot(0.25, lead * 0.15, 0);
    strike.leftUpperArm = rot(-1.1, 0.5, -0.35);
    strike.rightUpperArm = rot(-1.1, -0.5, 0.35);
    strike.leftLowerArm = rot(0.4, 0, 0);
    strike.rightLowerArm = rot(0.4, 0, 0);
    strike.spine = rot(0.35, lead * -0.35, 0);
    strike.chest = rot(0.2, lead * -0.25, 0);
    strike.hips = rot(0.15, lead * 0.2, 0);
    strike.head = rot(0.15, lead * -0.1, 0);
    strike.leftUpperLeg = rot(-0.3, 0, 0.1);
    strike.rightUpperLeg = rot(0.5, 0, -0.1);
    strike.leftLowerLeg = rot(0.5, 0, 0);
    strike.rightLowerLeg = rot(0.2, 0, 0);
    return lerpPose(windup, strike, phase);
  }

  if (pose === 'kick') {
    const windup = { ...idle };
    const strike = { ...idle };
    // Camera-side leg (same rule as punch arms)
    const kickRight = lead < 0;
    if (kickRight) {
      windup.rightUpperLeg = rot(-0.6, 0, -0.2);
      windup.rightLowerLeg = rot(1.2, 0, 0);
      strike.rightUpperLeg = rot(-1.75, -0.2, -0.25);
      strike.rightLowerLeg = rot(0.1, 0, 0);
      strike.leftUpperLeg = rot(0.6, 0, 0.15);
      strike.leftLowerLeg = rot(0.9, 0, 0);
    } else {
      windup.leftUpperLeg = rot(-0.6, 0, 0.2);
      windup.leftLowerLeg = rot(1.2, 0, 0);
      strike.leftUpperLeg = rot(-1.75, 0.2, 0.25);
      strike.leftLowerLeg = rot(0.1, 0, 0);
      strike.rightUpperLeg = rot(0.6, 0, -0.15);
      strike.rightLowerLeg = rot(0.9, 0, 0);
    }
    windup.spine = rot(0.2, lead * 0.1, 0);
    strike.spine = rot(0.15, lead * -0.25, 0);
    strike.chest = rot(0.1, lead * -0.15, 0);
    strike.leftUpperArm = rot(0.3, 0.35, -1.15);
    strike.rightUpperArm = rot(0.3, -0.35, 1.15);
    return lerpPose(windup, strike, phase);
  }

  if (pose === 'guard') {
    return {
      ...idle,
      hips: rot(0.18, 0, 0),
      spine: rot(0.15, lead * -0.08, 0),
      chest: rot(0.12, 0, 0),
      head: rot(-0.2, 0, 0),
      // Elbows high, fists by temples (classic boxing guard)
      leftUpperArm: rot(-1.55, 1.0, 0.15),
      rightUpperArm: rot(-1.55, -1.0, -0.15),
      leftLowerArm: rot(2.0, 0.5, 0.2),
      rightLowerArm: rot(2.0, -0.5, -0.2),
      leftUpperLeg: rot(0.5, 0, 0.14),
      rightUpperLeg: rot(0.45, 0, -0.14),
      leftLowerLeg: rot(0.85, 0, 0),
      rightLowerLeg: rot(0.8, 0, 0)
    };
  }

  if (pose === 'hurt') {
    return {
      ...idle,
      hips: rot(-0.1, lead * 0.35, 0),
      spine: rot(-0.4, lead * 0.4, 0),
      chest: rot(-0.2, lead * 0.2, 0),
      head: rot(0.35, lead * 0.25, 0),
      leftUpperArm: rot(-0.5, 0.2, -0.7),
      rightUpperArm: rot(-0.55, -0.2, 0.7),
      leftLowerArm: rot(0.8, 0, 0),
      rightLowerArm: rot(0.8, 0, 0),
      leftUpperLeg: rot(0.35, 0, 0.15),
      rightUpperLeg: rot(0.2, 0, -0.15)
    };
  }

  if (pose === 'charge') {
    return {
      ...idle,
      hips: rot(0.2, 0, 0),
      spine: rot(0.25, 0, 0),
      chest: rot(0.15, 0, 0),
      head: rot(0.2, 0, 0),
      // Hands cupped at side for ki blast
      leftUpperArm: rot(-0.85, 0.75, -0.5),
      rightUpperArm: rot(-0.85, -0.75, 0.5),
      leftLowerArm: rot(1.35, 0.3, 0.15),
      rightLowerArm: rot(1.35, -0.3, -0.15),
      leftUpperLeg: rot(0.45, 0, 0.12),
      rightUpperLeg: rot(0.45, 0, -0.12),
      leftLowerLeg: rot(0.9, 0, 0),
      rightLowerLeg: rot(0.9, 0, 0)
    };
  }

  return idle;
}

function rememberRawRest(vrm) {
  // Touch raw bones once at bind pose so later humanoid updates stay stable
  Object.values(BONE_MAP).forEach((boneName) => { rawBone(vrm, boneName); });
}

/**
 * Write pose using normalized humanoid bones (same space as the working debug page),
 * then push to the skinned raw skeleton via humanoid.update().
 */
function applyPose(vrm, poseMap, t = 1) {
  Object.entries(poseMap).forEach(([key, target]) => {
    if (!target) return;
    const node = bone(vrm, BONE_MAP[key] || key);
    if (!node) return;
    if (t >= 0.999) {
      node.rotation.set(target.x, target.y, target.z);
    } else {
      node.rotation.x += (target.x - node.rotation.x) * t;
      node.rotation.y += (target.y - node.rotation.y) * t;
      node.rotation.z += (target.z - node.rotation.z) * t;
    }
  });
  try { vrm.humanoid?.update?.(); } catch { /* ok */ }
}

function resolvePose(anim, state = {}) {
  if (state.hurt) return 'hurt';
  if (state.guarding) return 'guard';
  if (state.charging) return 'charge';
  if (state.attack === 'punch') return 'punch';
  if (state.attack === 'uppercut') return 'uppercut';
  if (state.attack === 'dash') return 'dash';
  if (state.attack === 'kick') return 'kick';
  // Beam/orb specials share the charge silhouette while firing
  if (state.attack) return 'charge';
  if (anim === 'guard') return 'guard';
  if (anim === 'hurt') return 'hurt';
  return 'idle';
}

/**
 * Map attack progress → pose blend.
 * Reach full strike almost immediately and HOLD it until the attack ends —
 * no early recover (laggy frames were skipping the readable silhouette).
 */
function strikePhase(progress, animT = 0) {
  // Time-based ramp wins over progress so the first frames always read
  const byTime = Math.min(1, animT / 0.05);
  if (progress <= 0) return byTime;
  return Math.max(byTime, Math.min(1, progress / 0.12));
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
    rememberRawRest(vrm);
    applyKitMaterials(vrm, v);
    attachSignatureHair(vrm, v);

    const root = new THREE.Group();
    root.name = fighterDef.id;
    root.add(vrm.scene);

    const heightScale = (v.height || 1.72) / 1.72;
    // Seed-san / samples are ~1.4–1.6m; scale up for fight-cam read
    root.scale.setScalar(1.7 * heightScale);

    // Kit props parented to raw bones (normalized nodes can sit at origin → floating props)
    const bootMat = new THREE.MeshToonMaterial({ color: v.boots || v.accent || 0x1e3a8a });
    const bandMat = new THREE.MeshToonMaterial({
      color: v.kit === 'saiyanArmor' ? (v.accent || 0xf8fafc) : (v.undershirt || v.accent || 0x1e3a8a)
    });
    const sashMat = new THREE.MeshToonMaterial({
      color: v.kit === 'saiyanArmor' ? (v.gold || 0xeab308) : (v.undershirt || 0x1e3a8a)
    });
    const armorMat = new THREE.MeshToonMaterial({ color: 0xf8fafc });
    const raw = (name) => vrm.humanoid?.getRawBoneNode?.(name) || bone(vrm, name);
    const bootGeo = new THREE.CapsuleGeometry(0.05, 0.07, 3, 6);
    [['LeftFoot', VRMHumanBoneName.LeftFoot], ['RightFoot', VRMHumanBoneName.RightFoot]].forEach(([, name]) => {
      const foot = raw(name);
      if (!foot) return;
      const boot = new THREE.Mesh(bootGeo, bootMat);
      boot.position.set(0, -0.04, 0.05);
      boot.rotation.x = 0.4;
      boot.scale.set(1.2, 1, 1.7);
      foot.add(boot);
    });
    [['LeftHand', VRMHumanBoneName.LeftHand], ['RightHand', VRMHumanBoneName.RightHand]].forEach(([, name]) => {
      const hand = raw(name);
      if (!hand) return;
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.042, 0.055, 10), bandMat);
      band.position.set(0, 0.06, 0);
      hand.add(band);
    });
    const spine = raw(VRMHumanBoneName.Spine) || raw(VRMHumanBoneName.Hips);
    if (spine) {
      const sash = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.16, 0.05, 14), sashMat);
      sash.position.set(0, 0.02, 0);
      spine.add(sash);
    }
    if (v.kit === 'saiyanArmor') {
      const chest = raw(VRMHumanBoneName.UpperChest) || raw(VRMHumanBoneName.Chest);
      if (chest) {
        const plate = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.2, 0.07), armorMat);
        plate.position.set(0, 0.04, 0.09);
        chest.add(plate);
        const strapL = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.18, 0.025), sashMat);
        strapL.position.set(-0.09, 0.1, 0.07);
        strapL.rotation.z = 0.4;
        chest.add(strapL);
        const strapR = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.18, 0.025), sashMat);
        strapR.position.set(0.09, 0.1, 0.07);
        strapR.rotation.z = -0.4;
        chest.add(strapR);
      }
    }

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
    const STRIKE_BIAS = 0.85; // pull more toward camera during melee so arms read

    function setFacing(dir) {
      facing = dir >= 0 ? 1 : -1;
      const bias = (pose === 'punch' || pose === 'kick' || pose === 'uppercut' || pose === 'dash' || pose === 'guard')
        ? STRIKE_BIAS
        : CAM_BIAS;
      root.rotation.y = facing >= 0 ? Math.PI / 2 - bias : -Math.PI / 2 + bias;
    }

    function setAnim(name) {
      if (anim !== name) {
        anim = name;
        animT = 0;
      }
    }

    function setCamera() { /* VRM uses world facing, not billboards */ }

    let strikeLunge = 0;

    function animate(dt, state = {}) {
      animT += dt;
      const next = resolvePose(anim, state);
      pose = next;
      const isStrike = pose === 'punch' || pose === 'kick' || pose === 'uppercut' || pose === 'dash';
      const progress = typeof state.attackProgress === 'number' ? state.attackProgress : 0;
      const phase = isStrike ? Math.max(0.9, strikePhase(progress, animT)) : 1;
      const targets = poseOffsets(pose, facing, phase, state.attackHand || 'lead');

      // Forward lunge in model space toward opponent
      const wantLunge = isStrike && (pose === 'punch' || pose === 'dash') ? 0.32 : 0;
      strikeLunge += (wantLunge - strikeLunge) * Math.min(1, 20 * dt);
      vrm.scene.position.z = strikeLunge;

      const blend = (pose === 'idle') ? Math.min(1, 12 * Math.max(dt, 1 / 30)) : 1;
      if (vrm.lookAt) vrm.lookAt.autoUpdate = false;
      vrm.update(dt);
      applyPose(vrm, targets, blend);
      // Keep facing bias in sync when entering/leaving strikes
      setFacing(facing);

      if (pose === 'idle') {
        const breath = Math.sin(animT * 2.2) * 0.012;
        const chest = bone(vrm, VRMHumanBoneName.Chest);
        if (chest) chest.position.y = breath;
      }

      if (pose === 'punch' || pose === 'uppercut' || pose === 'dash') {
        aura.material.color.setHex(0xff8a4c);
        aura.material.opacity = 0.28;
        aura.scale.setScalar(1.15);
      } else if (pose === 'kick') {
        aura.material.color.setHex(0x38bdf8);
        aura.material.opacity = 0.28;
        aura.scale.setScalar(1.12);
      } else if (pose === 'guard') {
        aura.material.color.setHex(0xeab308);
        aura.material.opacity = 0.22;
      } else if (state.charging || pose === 'charge') {
        aura.material.color.setHex(v.aura || 0x60a5fa);
        aura.material.opacity = 0.4 + Math.sin(animT * 12) * 0.12;
        aura.scale.setScalar(1.1 + Math.sin(animT * 8) * 0.1);
      } else {
        aura.material.color.setHex(v.aura || 0x60a5fa);
        aura.material.opacity += ((state.aura || 0) * 0.65 - aura.material.opacity) * Math.min(1, 6 * dt);
      }
      const energyGlow = 0.5 + (state.aura || 0) * 2.2 + (state.charging ? 0.7 : 0);
      rim.intensity += (energyGlow - rim.intensity) * Math.min(1, 6 * dt);
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
