// Driving presentation layer: tire smoke, skid marks, speed vignette and impact flash.
import * as THREE from './vendor/three/three.module.min.js';

export function createCityFx({ scene }) {
  const smokeGeo = new THREE.SphereGeometry(0.35, 6, 5);
  const smokeMat = new THREE.MeshBasicMaterial({
    color: 0xd8dde0,
    transparent: true,
    opacity: 0.35,
    depthWrite: false
  });
  const smokes = [];
  const SMOKE_POOL = 48;
  for (let i = 0; i < SMOKE_POOL; i++) {
    const mesh = new THREE.Mesh(smokeGeo, smokeMat.clone());
    mesh.visible = false;
    mesh.renderOrder = 2;
    scene.add(mesh);
    smokes.push({ mesh, life: 0, max: 0.8, vx: 0, vz: 0, grow: 1.6 });
  }
  let smokeIndex = 0;

  const skidGeo = new THREE.PlaneGeometry(0.28, 1.1);
  const skidMat = new THREE.MeshBasicMaterial({
    color: 0x1a1d1f,
    transparent: true,
    opacity: 0.42,
    depthWrite: false
  });
  const skids = [];
  const SKID_POOL = 40;
  for (let i = 0; i < SKID_POOL; i++) {
    const mesh = new THREE.Mesh(skidGeo, skidMat.clone());
    mesh.rotation.x = -Math.PI / 2;
    mesh.visible = false;
    mesh.renderOrder = 1;
    scene.add(mesh);
    skids.push({ mesh, life: 0 });
  }
  let skidIndex = 0;
  let skidTimer = 0;

  const sparkGeo = new THREE.SphereGeometry(0.08, 4, 4);
  const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffc56e, transparent: true, opacity: 0.9, depthWrite: false });
  const sparks = [];
  const SPARK_POOL = 24;
  for (let i = 0; i < SPARK_POOL; i++) {
    const mesh = new THREE.Mesh(sparkGeo, sparkMat.clone());
    mesh.visible = false;
    scene.add(mesh);
    sparks.push({ mesh, life: 0, vx: 0, vy: 0, vz: 0 });
  }
  let sparkIndex = 0;

  function emitSmoke(x, y, z, heading, strength) {
    if (strength < 0.12) return;
    const slot = smokes[smokeIndex % SMOKE_POOL];
    smokeIndex++;
    const mesh = slot.mesh;
    const side = (smokeIndex % 2 ? 1 : -1) * 0.85;
    const sx = Math.sin(heading);
    const cz = Math.cos(heading);
    mesh.visible = true;
    mesh.position.set(x - cz * side - sx * 1.4, y + 0.2, z - sx * side + cz * 1.4);
    mesh.scale.setScalar(0.4 + strength * 0.5);
    mesh.material.opacity = 0.22 + strength * 0.28;
    slot.life = slot.max = 0.45 + strength * 0.45;
    slot.vx = -sx * 0.6 + (Math.random() - 0.5) * 0.8;
    slot.vz = cz * 0.6 + (Math.random() - 0.5) * 0.8;
    slot.grow = 1.8 + strength;
  }

  function emitSkid(x, z, heading, strength) {
    if (strength < 0.2) return;
    const slot = skids[skidIndex % SKID_POOL];
    skidIndex++;
    const mesh = slot.mesh;
    const side = skidIndex % 2 ? 0.9 : -0.9;
    const sx = Math.sin(heading);
    const cz = Math.cos(heading);
    mesh.visible = true;
    mesh.position.set(x - cz * side, 0.03, z - sx * side);
    mesh.rotation.z = -heading;
    mesh.scale.set(1, 0.7 + strength * 0.8, 1);
    mesh.material.opacity = 0.25 + strength * 0.3;
    slot.life = 2.8;
  }

  function burst(x, y, z, strength = 0.5) {
    const count = Math.min(SPARK_POOL, 6 + Math.floor(strength * 10));
    for (let i = 0; i < count; i++) {
      const slot = sparks[sparkIndex % SPARK_POOL];
      sparkIndex++;
      const mesh = slot.mesh;
      mesh.visible = true;
      mesh.position.set(x, y + 0.3, z);
      mesh.material.opacity = 0.9;
      slot.life = 0.25 + Math.random() * 0.25;
      slot.vx = (Math.random() - 0.5) * 8 * strength;
      slot.vy = 2 + Math.random() * 5 * strength;
      slot.vz = (Math.random() - 0.5) * 8 * strength;
    }
  }

  function update(delta, state = {}) {
    const {
      active = false,
      x = 0,
      y = 0,
      z = 0,
      heading = 0,
      speed = 0,
      steer = 0,
      braking = false,
      airborne = false
    } = state;

    if (active && !airborne) {
      const absSpeed = Math.abs(speed);
      const slip = Math.min(1, Math.abs(steer) * (absSpeed / 16) + (braking && absSpeed > 10 ? 0.7 : 0));
      if (slip > 0.18 && absSpeed > 6) {
        emitSmoke(x, y, z, heading, slip);
        skidTimer -= delta;
        if (skidTimer <= 0) {
          skidTimer = 0.07;
          emitSkid(x, z, heading, slip);
        }
      } else {
        skidTimer = 0;
      }
    }

    for (const slot of smokes) {
      if (!slot.mesh.visible) continue;
      slot.life -= delta;
      if (slot.life <= 0) {
        slot.mesh.visible = false;
        continue;
      }
      const t = 1 - slot.life / slot.max;
      slot.mesh.position.x += slot.vx * delta;
      slot.mesh.position.y += 0.9 * delta;
      slot.mesh.position.z += slot.vz * delta;
      slot.mesh.scale.setScalar(0.5 + t * slot.grow);
      slot.mesh.material.opacity = (1 - t) * 0.35;
    }

    for (const slot of skids) {
      if (!slot.mesh.visible) continue;
      slot.life -= delta;
      if (slot.life <= 0) {
        slot.mesh.visible = false;
        continue;
      }
      slot.mesh.material.opacity = Math.min(0.45, slot.life * 0.18);
    }

    for (const slot of sparks) {
      if (!slot.mesh.visible) continue;
      slot.life -= delta;
      if (slot.life <= 0) {
        slot.mesh.visible = false;
        continue;
      }
      slot.vy -= 18 * delta;
      slot.mesh.position.x += slot.vx * delta;
      slot.mesh.position.y += slot.vy * delta;
      slot.mesh.position.z += slot.vz * delta;
      slot.mesh.material.opacity = Math.max(0, slot.life * 3);
    }
  }

  function clear() {
    for (const slot of smokes) slot.mesh.visible = false;
    for (const slot of skids) slot.mesh.visible = false;
    for (const slot of sparks) slot.mesh.visible = false;
  }

  function dispose() {
    clear();
    for (const slot of smokes) {
      scene.remove(slot.mesh);
      slot.mesh.material.dispose();
    }
    for (const slot of skids) {
      scene.remove(slot.mesh);
      slot.mesh.material.dispose();
    }
    for (const slot of sparks) {
      scene.remove(slot.mesh);
      slot.mesh.material.dispose();
    }
    smokeGeo.dispose();
    skidGeo.dispose();
    sparkGeo.dispose();
    smokeMat.dispose();
    skidMat.dispose();
    sparkMat.dispose();
  }

  return { update, burst, clear, dispose };
}

export function createSpeedOverlay(root) {
  const vignette = document.createElement('div');
  vignette.className = 'speed-vignette';
  vignette.setAttribute('aria-hidden', 'true');
  const lines = document.createElement('div');
  lines.className = 'speed-lines';
  lines.setAttribute('aria-hidden', 'true');
  const flash = document.createElement('div');
  flash.className = 'impact-flash';
  flash.setAttribute('aria-hidden', 'true');
  root.appendChild(vignette);
  root.appendChild(lines);
  root.appendChild(flash);

  let flashT = 0;

  function update({ speedRatio = 0, nitro = 0, flying = false } = {}) {
    const intensity = Math.max(0, Math.min(1, speedRatio * 0.85 + nitro * 0.35));
    vignette.style.opacity = String(intensity * 0.72);
    lines.style.opacity = String(intensity > 0.35 ? (intensity - 0.35) * 1.1 : 0);
    lines.classList.toggle('nitro', nitro > 0.4);
    lines.classList.toggle('air', flying);
    if (flashT > 0) {
      flash.style.opacity = String(Math.min(0.55, flashT));
    } else {
      flash.style.opacity = '0';
    }
  }

  function tick(delta) {
    if (flashT > 0) flashT = Math.max(0, flashT - delta * 2.4);
  }

  function impact(strength = 0.4) {
    flashT = Math.max(flashT, Math.min(0.7, 0.2 + strength));
  }

  return { update, tick, impact };
}
