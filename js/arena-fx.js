// Combat VFX: beams, orbs, sparks, hit flashes.
import * as THREE from './vendor/three/three.module.min.js';

export function createArenaFx({ scene }) {
  const projectiles = [];
  const sparks = [];
  const flashes = [];

  const orbGeo = new THREE.SphereGeometry(1, 12, 10);
  const beamGeo = new THREE.CylinderGeometry(0.15, 0.22, 1, 8);
  beamGeo.rotateZ(Math.PI / 2);
  const sparkGeo = new THREE.SphereGeometry(0.08, 4, 4);

  function spawnProjectile({
    kind = 'beam', x, y, z, dir, speed, radius, color, glow, damage, knockback, owner, life = 2.2
  }) {
    const mat = new THREE.MeshStandardMaterial({
      color, emissive: glow || color, emissiveIntensity: 1.4, roughness: 0.25, metalness: 0.1,
      transparent: true, opacity: 0.95
    });
    const mesh = new THREE.Mesh(kind === 'orb' ? orbGeo : beamGeo, mat);
    mesh.position.set(x, y, z);
    if (kind === 'orb') mesh.scale.setScalar(radius);
    else mesh.scale.set(radius * 4.5, radius * 1.4, radius * 1.4);
    mesh.lookAt(x + dir, y, z);
    scene.add(mesh);

    const trail = new THREE.Mesh(
      orbGeo,
      new THREE.MeshBasicMaterial({ color: glow || color, transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending })
    );
    trail.position.copy(mesh.position);
    trail.scale.setScalar(radius * (kind === 'orb' ? 1.4 : 0.9));
    scene.add(trail);

    const proj = {
      mesh, trail, kind, dir, speed, radius, damage, knockback, owner, life, maxLife: life, hit: false
    };
    projectiles.push(proj);
    return proj;
  }

  function emitSparks(x, y, z, color = 0xffcc66, count = 10) {
    for (let i = 0; i < count; i++) {
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95, depthWrite: false });
      const mesh = new THREE.Mesh(sparkGeo, mat);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      sparks.push({
        mesh,
        life: 0.35 + Math.random() * 0.25,
        vx: (Math.random() - 0.5) * 6,
        vy: 2 + Math.random() * 5,
        vz: (Math.random() - 0.5) * 6
      });
    }
  }

  function emitFlash(x, y, z, color = 0xffffff, scale = 1.2) {
    const mat = new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending
    });
    const mesh = new THREE.Mesh(orbGeo, mat);
    mesh.position.set(x, y, z);
    mesh.scale.setScalar(scale);
    scene.add(mesh);
    flashes.push({ mesh, life: 0.18 });
  }

  function update(dt, onHit) {
    for (let i = projectiles.length - 1; i >= 0; i--) {
      const p = projectiles[i];
      if (p.hit) {
        scene.remove(p.mesh, p.trail);
        p.mesh.geometry && null;
        p.mesh.material.dispose();
        p.trail.material.dispose();
        projectiles.splice(i, 1);
        continue;
      }
      p.life -= dt;
      p.mesh.position.x += p.dir * p.speed * dt;
      p.trail.position.copy(p.mesh.position);
      p.trail.scale.setScalar(p.radius * (0.9 + (1 - p.life / p.maxLife) * 0.5));
      p.trail.material.opacity = 0.2 + (p.life / p.maxLife) * 0.3;
      if (p.kind === 'beam') {
        p.mesh.rotation.x += dt * 10;
      } else {
        p.mesh.rotation.y += dt * 4;
      }
      if (onHit) onHit(p);
      if (p.life <= 0 || Math.abs(p.mesh.position.x) > 14) {
        p.hit = true;
      }
    }

    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.life -= dt;
      s.vy -= 12 * dt;
      s.mesh.position.x += s.vx * dt;
      s.mesh.position.y += s.vy * dt;
      s.mesh.position.z += s.vz * dt;
      s.mesh.material.opacity = Math.max(0, s.life * 2);
      if (s.life <= 0) {
        scene.remove(s.mesh);
        s.mesh.material.dispose();
        sparks.splice(i, 1);
      }
    }

    for (let i = flashes.length - 1; i >= 0; i--) {
      const f = flashes[i];
      f.life -= dt;
      f.mesh.scale.multiplyScalar(1 + dt * 8);
      f.mesh.material.opacity = Math.max(0, f.life * 4);
      if (f.life <= 0) {
        scene.remove(f.mesh);
        f.mesh.material.dispose();
        flashes.splice(i, 1);
      }
    }
  }

  function clear() {
    while (projectiles.length) {
      const p = projectiles.pop();
      scene.remove(p.mesh, p.trail);
      p.mesh.material.dispose();
      p.trail.material.dispose();
    }
    while (sparks.length) {
      const s = sparks.pop();
      scene.remove(s.mesh);
      s.mesh.material.dispose();
    }
    while (flashes.length) {
      const f = flashes.pop();
      scene.remove(f.mesh);
      f.mesh.material.dispose();
    }
  }

  return { spawnProjectile, emitSparks, emitFlash, update, clear, projectiles };
}
