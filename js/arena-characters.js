// Procedural low-poly cartoon fighters for Arena Clash.
import * as THREE from './vendor/three/three.module.min.js';

const matCache = new Map();
function mat(color, { rough = 0.72, metal = 0.05, emissive = 0x000000, glow = 0 } = {}) {
  const key = `${color}|${rough}|${metal}|${emissive}|${glow}`;
  if (!matCache.has(key)) {
    matCache.set(key, new THREE.MeshStandardMaterial({
      color, roughness: rough, metalness: metal, emissive, emissiveIntensity: glow
    }));
  }
  return matCache.get(key);
}

const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const sphereGeo = new THREE.SphereGeometry(1, 14, 10);
const cylGeo = new THREE.CylinderGeometry(1, 1, 1, 10);

function part(parent, geo, material, x, y, z, sx, sy, sz) {
  const mesh = new THREE.Mesh(geo, material);
  mesh.position.set(x, y, z);
  mesh.scale.set(sx, sy, sz);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function hairSpikes(head, color, style) {
  const hairMat = mat(color, { rough: 0.85 });
  const add = (x, y, z, sx, sy, sz, rx = 0, ry = 0) => {
    const m = part(head, boxGeo, hairMat, x, y, z, sx, sy, sz);
    m.rotation.x = rx;
    m.rotation.z = ry;
    return m;
  };
  if (style === 'bald' || style === 'dome' || style === 'shell') {
    if (style === 'dome') part(head, sphereGeo, hairMat, 0, 0.12, 0, 0.42, 0.38, 0.42);
    if (style === 'shell') {
      part(head, sphereGeo, hairMat, 0, 0.18, -0.05, 0.48, 0.42, 0.5);
      part(head, boxGeo, hairMat, 0, 0.35, -0.35, 0.18, 0.35, 0.18);
    }
    return;
  }
  if (style === 'antenna') {
    add(-0.18, 0.42, 0.05, 0.06, 0.35, 0.06, 0.3, -0.2);
    add(0.18, 0.42, 0.05, 0.06, 0.35, 0.06, 0.3, 0.2);
    return;
  }
  if (style === 'bob') {
    part(head, boxGeo, hairMat, 0, 0.12, -0.05, 0.78, 0.35, 0.72);
    add(-0.32, -0.05, 0.05, 0.14, 0.45, 0.2);
    add(0.32, -0.05, 0.05, 0.14, 0.45, 0.2);
    return;
  }
  if (style === 'long') {
    for (let i = 0; i < 5; i++) {
      add((i - 2) * 0.12, 0.35 + (i % 2) * 0.08, -0.1, 0.12, 0.45, 0.12, -0.4, (i - 2) * 0.15);
    }
    add(0, -0.05, -0.28, 0.35, 0.55, 0.18, 0.2);
    return;
  }
  if (style === 'buns') {
    part(head, sphereGeo, hairMat, -0.32, 0.28, 0, 0.18, 0.18, 0.18);
    part(head, sphereGeo, hairMat, 0.32, 0.28, 0, 0.18, 0.18, 0.18);
    part(head, boxGeo, hairMat, 0, 0.2, -0.1, 0.55, 0.22, 0.45);
    return;
  }
  if (style === 'flat') {
    part(head, boxGeo, hairMat, 0, 0.28, 0, 0.7, 0.12, 0.65);
    return;
  }
  const tall = style === 'spikyTall' || style === 'wild';
  const back = style === 'spikyBack';
  const count = tall ? 7 : back ? 6 : 5;
  for (let i = 0; i < count; i++) {
    const t = (i / (count - 1)) - 0.5;
    const h = (tall ? 0.55 : 0.4) + Math.abs(t) * (tall ? 0.35 : 0.2) + (style === 'wild' ? 0.15 : 0);
    add(t * (back ? 0.15 : 0.45), 0.28 + h * 0.35, back ? -0.2 - Math.abs(t) * 0.15 : -0.05 + Math.abs(t) * 0.05,
      0.12 + (tall ? 0.04 : 0), h, 0.12, back ? -0.9 : -0.55, t * 0.5);
  }
}

function buildScale(build) {
  if (build === 'bulky') return { torso: 1.18, limb: 1.12, head: 0.95 };
  if (build === 'tall') return { torso: 1.05, limb: 1.08, head: 0.92 };
  if (build === 'compact') return { torso: 0.92, limb: 0.9, head: 1.08 };
  if (build === 'round') return { torso: 1.25, limb: 0.95, head: 1.15 };
  return { torso: 1, limb: 1, head: 1 };
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
  const outfit = mat(v.outfit);
  const accent = mat(v.accent, { rough: 0.55 });
  const pants = mat(v.pants);
  const boots = mat(v.boots || 0x1a1a1a);
  const eyeWhite = mat(0xf8fafc, { rough: 0.4 });
  const pupil = mat(0x111827, { rough: 0.3 });

  const hips = new THREE.Group();
  hips.position.y = 0.95 * (v.height / 1.72);
  root.add(hips);
  root.scale.setScalar(1.15);

  const torso = new THREE.Group();
  torso.position.y = 0.28 * s.torso;
  hips.add(torso);
  part(torso, boxGeo, outfit, 0, 0.35 * s.torso, 0, 0.55 * s.torso, 0.7 * s.torso, 0.32 * s.torso);
  part(torso, boxGeo, accent, 0, 0.5 * s.torso, 0.17 * s.torso, 0.28, 0.18, 0.05);

  const head = new THREE.Group();
  head.position.y = 0.78 * s.torso;
  torso.add(head);
  part(head, sphereGeo, skin, 0, 0.08, 0, 0.34 * s.head, 0.36 * s.head, 0.34 * s.head);
  part(head, sphereGeo, eyeWhite, -0.12, 0.1, 0.28, 0.08, 0.09, 0.05);
  part(head, sphereGeo, eyeWhite, 0.12, 0.1, 0.28, 0.08, 0.09, 0.05);
  part(head, sphereGeo, pupil, -0.12, 0.1, 0.32, 0.035, 0.04, 0.03);
  part(head, sphereGeo, pupil, 0.12, 0.1, 0.32, 0.035, 0.04, 0.03);
  hairSpikes(head, v.hair, v.hairStyle);

  const makeArm = (side) => {
    const shoulder = new THREE.Group();
    shoulder.position.set(side * 0.38 * s.torso, 0.55 * s.torso, 0);
    torso.add(shoulder);
    const upper = new THREE.Group();
    shoulder.add(upper);
    part(upper, cylGeo, outfit, 0, -0.22 * s.limb, 0, 0.1 * s.limb, 0.42 * s.limb, 0.1 * s.limb);
    const elbow = new THREE.Group();
    elbow.position.y = -0.44 * s.limb;
    upper.add(elbow);
    part(elbow, cylGeo, skin, 0, -0.2 * s.limb, 0, 0.09 * s.limb, 0.38 * s.limb, 0.09 * s.limb);
    part(elbow, sphereGeo, skin, 0, -0.4 * s.limb, 0, 0.1, 0.1, 0.12);
    return { shoulder, upper, elbow };
  };

  const makeLeg = (side) => {
    const hip = new THREE.Group();
    hip.position.set(side * 0.14 * s.torso, -0.05, 0);
    hips.add(hip);
    const thigh = new THREE.Group();
    hip.add(thigh);
    part(thigh, cylGeo, pants, 0, -0.28 * s.limb, 0, 0.13 * s.limb, 0.5 * s.limb, 0.13 * s.limb);
    const knee = new THREE.Group();
    knee.position.y = -0.52 * s.limb;
    thigh.add(knee);
    part(knee, cylGeo, pants, 0, -0.22 * s.limb, 0, 0.11 * s.limb, 0.42 * s.limb, 0.11 * s.limb);
    part(knee, boxGeo, boots, 0, -0.48 * s.limb, 0.06, 0.16, 0.12, 0.28);
    return { hip, thigh, knee };
  };

  const leftArm = makeArm(-1);
  const rightArm = makeArm(1);
  const leftLeg = makeLeg(-1);
  const rightLeg = makeLeg(1);

  const aura = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 16, 12),
    new THREE.MeshBasicMaterial({
      color: v.aura, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending
    })
  );
  aura.scale.set(1.1, 1.6, 1.1);
  aura.position.y = 1.1;
  root.add(aura);

  const bones = { hips, torso, head, leftArm, rightArm, leftLeg, rightLeg, aura };
  let facing = 1;
  let anim = 'idle';
  let animT = 0;

  function setFacing(dir) {
    facing = dir >= 0 ? 1 : -1;
    // Fight plane is X; +facing looks toward +X.
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

    // Reset subtle pose each frame toward defaults
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
    damp(hips.position, 'y', 0.95 * (v.height / 1.72));

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
      hips.position.y = 0.95 * (v.height / 1.72) + Math.abs(Math.sin(t * 10)) * 0.04;
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
        if (obj.geometry && obj.geometry !== boxGeo && obj.geometry !== sphereGeo && obj.geometry !== cylGeo) {
          obj.geometry.dispose();
        }
      }
    });
  }

  return { root, bones, setFacing, setAnim, animate, dispose, height: v.height };
}
