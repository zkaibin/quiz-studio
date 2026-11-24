// Selectable Singapore routes and the stylised landmark models used along them.
import * as THREE from './vendor/three/three.module.min.js';

import { WORLD_BUILDERS, WORLD_NAMES, WORLD_DEPTH } from './city-landmarks-world.js';
import { mat, box, cyl, dome, ball, unitBox, C, pastel, windowStrips, tieredRoofs } from './city-landmark-kit.js';

const builders = {
  mbs(g) {
    const sky = [];
    for (const [i, z] of [-14, 0, 14].entries()) {
      const tower = new THREE.Group();
      tower.position.set(0, 0, z);
      tower.rotation.x = (i - 1) * -0.045;
      box(tower, C.white, 0, 25, 0, 11, 50, 9);
      windowStrips(tower, 11, 50, 9, 0, 1, 13, C.glassDark);
      g.add(tower);
      sky.push(tower);
    }
    box(g, C.white, 0, 52, 0, 12, 2.2, 56);
    box(g, C.white, 0, 53.5, 22, 7, 1.4, 20);
    box(g, C.water, 2, 53.2, -4, 5, 0.3, 26);
    for (let i = 0; i < 6; i++) ball(g, C.darkGreen, -3.5, 54, -20 + i * 5, 1.1);
    box(g, C.stone, 0, 0.6, 0, 22, 1.2, 50);
  },
  merlion(g) {
    cyl(g, C.stone, 0, 0, 0, 6, 7, 1.6, 24);
    cyl(g, C.white, 0, 1.6, 0, 2, 3.4, 7, 16);
    cyl(g, C.white, -0.6, 8.4, 0, 2.6, 2, 2.2, 16);
    ball(g, C.white, 0.6, 12, 0, 2.7);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      ball(g, C.stone, -0.5 + Math.cos(a) * 0.5, 12.5 + Math.sin(a) * 2.2, Math.sin(a * 2) * 1.6, 0.9);
    }
    ball(g, C.dark, 2.7, 12.5, -1, 0.35);
    ball(g, C.dark, 2.7, 12.5, 1, 0.35);
    for (let i = 0; i < 10; i++) {
      const t = i / 9;
      box(g, C.water, 3 + t * 10, 11.2 - t * t * 8, 0, 1.1, 0.5, 0.5);
    }
    const tail = cyl(g, C.white, -3, 1.6, 0, 0.7, 1.6, 5, 10);
    tail.rotation.z = 0.7;
    box(g, C.water, 6, 0.2, 0, 12, 0.3, 16);
  },
  esplanade(g) {
    const shell = mat(0xc6b78f, { rough: 0.4, metal: 0.45 });
    for (const [z, rx, rz] of [[-10, 15, 11], [11, 12, 9]]) {
      dome(g, shell, 0, 0, z, rx, 9, rz, 18);
      for (let i = 0; i < 38; i++) {
        const a = (((i * 0.6180339) % 1) + z * 0.013) * Math.PI * 2;
        const e = Math.acos((((i * 0.7548777) + 0.31) % 1) * 0.95);
        const spike = new THREE.Mesh(new THREE.ConeGeometry(0.45, 2.4, 5), shell);
        spike.position.set(Math.cos(a) * Math.sin(e) * rx, Math.cos(e) * 9, z + Math.sin(a) * Math.sin(e) * rz);
        spike.lookAt(spike.position.x * 2, spike.position.y * 1.6 + 9, spike.position.z * 2 - z);
        spike.rotateX(Math.PI / 2);
        g.add(spike);
      }
    }
    box(g, C.stone, 0, 0.5, 0, 34, 1, 40);
  },
  artscience(g) {
    cyl(g, C.white, 0, 0, 0, 7, 8, 5, 24);
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const finger = new THREE.Group();
      finger.position.set(Math.cos(a) * 5, 4, Math.sin(a) * 5);
      finger.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5);
      box(finger, C.cream, 0, 8, 0, 2.2, 16, 1);
      g.add(finger);
    }
    box(g, C.water, 0, 0.1, 0, 28, 0.3, 28);
    box(g, C.stone, 0, 0.6, 0, 18, 1.2, 18);
  },
  flyer(g) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(19, 0.55, 8, 48), C.steel);
    ring.position.set(0, 22, 0);
    g.add(ring);
    const inner = new THREE.Mesh(new THREE.TorusGeometry(17.6, 0.25, 6, 48), C.steel);
    inner.position.set(0, 22, 0);
    g.add(inner);
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2;
      box(g, C.glassClear, Math.sin(a) * 19.6, 22 + Math.cos(a) * 19.6, 0, 1.6, 1.6, 1.6);
    }
    for (let i = 0; i < 6; i++) {
      const spoke = box(g, C.steel, 0, 22, 0, 0.18, 36, 0.18);
      spoke.rotation.z = (i / 6) * Math.PI;
    }
    for (const s of [-1, 1]) {
      const leg = box(g, C.steel, 0, 11, s * 5, 1, 24, 1);
      leg.rotation.x = s * 0.22;
    }
    box(g, C.glass, 0, 2, 0, 12, 4, 32);
  },
  supertrees(g) {
    const hues = [[0x8a3e86, 0x3a1038], [0xc0457d, 0x4b1230], [0x4f9b5a, 0x12351a]];
    [[0, -11, 26], [-2, 6, 33], [-5, 19, 21]].forEach(([x, z, h], i) => {
      const [col, glow] = hues[i % hues.length];
      cyl(g, mat(0x5e5148), x, 0, z, 0.9, 1.7, h, 10);
      cyl(g, mat(col, { emissive: glow, glow: 0.8 }), x, h - 1, z, 9, 2, 6, 14);
      cyl(g, mat(col, { emissive: glow, glow: 0.8 }), x, h + 4.8, z, 3, 9, 1.4, 14);
      for (let k = 0; k < 7; k++) {
        const a = (k / 7) * Math.PI * 2;
        box(g, mat(0x6bbd6e), x + Math.cos(a) * 3, h * 0.55, z + Math.sin(a) * 3, 0.3, h * 0.55, 0.3);
      }
    });
    box(g, C.steel, -2, 20, -2, 1.4, 0.5, 34);
  },
  flowerdome(g) {
    dome(g, C.glassClear, 0, 0, 0, 24, 12, 16, 28);
    const ribs = new THREE.Mesh(
      new THREE.SphereGeometry(1, 14, 6, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0xe8f4f4, wireframe: true })
    );
    ribs.scale.set(24.1, 12.1, 16.1);
    g.add(ribs);
    box(g, C.green, 0, 0.8, 0, 40, 1.6, 26);
    for (let i = 0; i < 6; i++) ball(g, pastel[i], -14 + i * 5.6, 2.4, (i % 2 ? 4 : -4), 1.5);
  },
  cloudforest(g) {
    dome(g, C.glassClear, 0, 0, 0, 18, 22, 16, 24);
    const mountain = new THREE.Mesh(new THREE.ConeGeometry(8, 20, 10), mat(0x5c8f64));
    mountain.position.set(0, 10, 0);
    g.add(mountain);
    box(g, C.white, 5, 10, 0, 0.8, 18, 1.6);
    box(g, C.green, 0, 0.8, 0, 38, 1.6, 34);
  },
  raffles(g) {
    box(g, C.white, 0, 8, 0, 20, 16, 34);
    box(g, C.white, 0, 20, 0, 14, 8, 22);
    const roofA = cyl(g, C.red, 0, 24, 0, 6, 15, 5, 4);
    roofA.rotation.y = Math.PI / 4;
    roofA.scale.set(1.2, 1, 1.7);
    for (let z = -15; z <= 15; z += 3) {
      cyl(g, C.white, 10.5, 0, z, 0.4, 0.4, 7, 8);
      box(g, C.dark, 10.2, 11, z, 0.2, 2.6, 1.2);
    }
    box(g, C.red, 10.6, 7.2, 0, 1.4, 0.5, 34);
    box(g, C.red, 10.2, 3.5, 0, 0.3, 2, 6);
  },
  standrews(g) {
    box(g, C.white, 0, 7, 0, 14, 14, 26);
    const roof = cyl(g, C.stone, 0, 14, 0, 0.5, 8, 5, 4);
    roof.rotation.y = Math.PI / 4;
    roof.scale.set(1, 1, 1.7);
    box(g, C.white, 6, 13, 0, 6, 26, 6);
    const spire = new THREE.Mesh(new THREE.ConeGeometry(4, 16, 8), C.white);
    spire.position.set(6, 34, 0);
    g.add(spire);
    for (const z of [-8, -3, 3, 8]) box(g, C.dark, 7.1, 7, z, 0.2, 5, 1.6);
    box(g, C.dark, 9.1, 7, 0, 0.2, 5, 2.6);
  },
  supremecourt(g) {
    box(g, C.white, 0, 9, 0, 22, 18, 40);
    box(g, C.stone, 0, 19, 0, 20, 1.6, 36);
    cyl(g, C.white, -2, 19.6, 0, 7, 7.5, 6, 24);
    dome(g, mat(0x8aa39a, { rough: 0.4, metal: 0.3 }), -2, 25.6, 0, 8, 5, 8, 24);
    for (let z = -18; z <= 18; z += 4.5) cyl(g, C.white, 11.5, 0, z, 0.65, 0.65, 14, 10);
    box(g, C.stone, 11.8, 14.4, 0, 1.6, 1.2, 38);
    box(g, C.stone, 12, 0.3, 0, 3, 0.6, 40);
  },
  fullerton(g) {
    box(g, C.cream, 0, 10, 0, 24, 20, 46);
    box(g, C.stone, 0, 20.5, 0, 25, 1, 47);
    for (let z = -21; z <= 21; z += 3) {
      cyl(g, C.white, 12.8, 0, z, 0.55, 0.55, 15, 8);
      box(g, C.dark, 12.1, 10, z + 1.5, 0.15, 4, 1.4);
    }
    box(g, C.stone, 12.6, 15.3, 0, 1.4, 1, 46);
    box(g, C.stone, 0, 23, 0, 12, 4, 14);
  },
  ion(g) {
    box(g, C.glass, 0, 7, 0, 26, 14, 34);
    box(g, C.red, 13.2, 11, 0, 0.5, 2.4, 18);
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 38, 28), C.glass);
    tower.scale.set(8, 1, 12);
    tower.position.set(-2, 33, 0);
    g.add(tower);
    for (let i = 0; i < 9; i++) {
      const band = new THREE.Mesh(new THREE.CylinderGeometry(1.01, 1.01, 0.8, 28), C.white);
      band.scale.set(8.1, 1, 12.1);
      band.position.set(-2, 18 + i * 4.2, 0);
      g.add(band);
    }
  },
  tangs(g) {
    box(g, C.cream, 0, 8, 0, 24, 16, 34);
    box(g, C.red, 12.2, 8, 0, 0.6, 16, 34);
    const roofs = new THREE.Group();
    roofs.position.y = 16;
    g.add(roofs);
    tieredRoofs(roofs, C.red, C.tealRoof, 2, 18, 26, 4);
    for (let z = -14; z <= 14; z += 7) box(g, C.gold, 12.6, 12, z, 0.2, 2, 3);
  },
  buddhatooth(g) {
    box(g, C.stone, 0, 0.5, 0, 24, 1, 28);
    const t = new THREE.Group();
    t.position.y = 1;
    g.add(t);
    const top = tieredRoofs(t, C.red, C.tealRoof, 3, 20, 22, 6);
    cyl(t, C.gold, 0, top, 0, 0.2, 1.6, 4, 8);
    for (const z of [-7, 0, 7]) box(t, C.gold, 8 * 1.3, 3, z, 0.2, 4, 2.4);
  },
  mariamman(g) {
    box(g, C.cream, 0, 3, 0, 18, 6, 26);
    let y = 6;
    for (let i = 0; i < 6; i++) {
      const w = 15 - i * 2;
      box(g, pastel[i % pastel.length], 0, y + 1.4, 0, w, 2.8, w * 1.3);
      box(g, C.white, 0, y + 2.9, 0, w + 0.6, 0.35, w * 1.3 + 0.6);
      for (let k = -1; k <= 1; k++) ball(g, C.gold, w / 2 + 0.1, y + 1.4, k * (w * 0.35), 0.45);
      y += 3.1;
    }
    const roof = cyl(g, C.red, 0, y, 0, 3.2, 3.2, 6, 12);
    roof.rotation.x = Math.PI / 2;
    roof.position.y = y + 1.5;
    for (const z of [-3, 0, 3]) cyl(g, C.gold, 0, y + 3, z, 0.1, 0.45, 2, 6);
  },
  sultan(g) {
    box(g, C.cream, 0, 6, 0, 24, 12, 30);
    const goldDome = mat(0xe0b64a, { rough: 0.3, metal: 0.6 });
    cyl(g, C.cream, 0, 12, 0, 8, 8, 4, 24);
    dome(g, goldDome, 0, 16, 0, 8.5, 9, 8.5, 28);
    cyl(g, C.gold, 0, 25, 0, 0.1, 0.6, 3, 6);
    for (const z of [-11, 11]) {
      dome(g, goldDome, 4, 12, z, 3.2, 3.4, 3.2, 16);
      cyl(g, C.cream, 11, 0, z * 1.18, 1.6, 1.8, 22, 10);
      dome(g, goldDome, 11, 22, z * 1.18, 2.3, 2.6, 2.3, 12);
    }
    for (let z = -12; z <= 12; z += 4) box(g, C.dark, 12.1, 5, z, 0.15, 5, 1.6);
  },
  shophouses(g) {
    for (let i = 0; i < 5; i++) {
      const z = -16 + i * 8;
      const h = 11 + (i % 3) * 2;
      box(g, pastel[i % pastel.length], 0, h / 2, z, 12, h, 7.6);
      box(g, C.white, 6.1, h - 0.5, z, 0.3, 0.7, 7.8);
      const roof = cyl(g, C.red, 0, h, z, 0.1, 4.6, 2.2, 4);
      roof.rotation.y = Math.PI / 4;
      roof.scale.set(1.5, 1, 1);
      for (const y of [3, 8]) {
        box(g, C.green, 6.1, y, z - 1.5, 0.2, 2.8, 1.5);
        box(g, C.green, 6.1, y, z + 1.5, 0.2, 2.8, 1.5);
      }
      box(g, C.dark, 6.1, 1.2, z, 0.2, 2.4, 2.4);
      box(g, C.gold, 6.35, 5.2, z, 0.5, 0.18, 7);
    }
  },
  pinnacle(g) {
    for (let i = 0; i < 7; i++) {
      box(g, i % 2 ? C.cream : C.white, 0, 22, -21 + i * 7, 9, 44, 5.6);
    }
    for (let i = 0; i < 7; i++) {
      const z = -21 + i * 7;
      for (let y = 4; y < 44; y += 4.4) box(g, C.win, 4.55, y, z, 0.1, 1.5, 4);
    }
    box(g, C.steel, 0, 25, 0, 10, 1.4, 44);
    box(g, C.steel, 0, 44.4, 0, 10, 1.6, 44);
    for (let i = 0; i < 6; i++) ball(g, C.green, 4.5, 45.7, -18 + i * 7, 1.1);
  },
  financial(g) {
    [[-4, -12, 54, 12, 14], [2, 4, 68, 12, 12], [-6, 17, 44, 10, 10]].forEach(([x, z, h, w, d], i) => {
      box(g, i === 1 ? C.glassDark : C.glass, x, h / 2, z, w, h, d);
      for (let y = 3; y < h; y += 3.4) box(g, C.white, x + w / 2 + 0.05, y, z, 0.1, 0.35, d);
      box(g, C.steel, x, h + 1.2, z, w * 0.6, 2.4, d * 0.6);
      if (i === 1) cyl(g, C.steel, x, h + 2.4, z, 0.1, 0.4, 9, 6);
    });
    box(g, C.glassClear, 8, 5, 0, 5, 10, 40);
  },
  jewel(g) {
    dome(g, C.glassClear, 0, 0, 0, 24, 15, 24, 28);
    const ribs = new THREE.Mesh(
      new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0xf2f7f7, wireframe: true })
    );
    ribs.scale.set(24.1, 15.1, 24.1);
    g.add(ribs);
    cyl(g, mat(0xcfe9f5, { opacity: 0.8 }), 0, 0, 0, 4.4, 3.2, 17, 20);
    cyl(g, C.green, 0, 0, 0, 12, 12, 1.4, 24);
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      ball(g, C.darkGreen, Math.cos(a) * 9, 2.4, Math.sin(a) * 9, 1.4);
    }
    box(g, C.glass, 0, 1.5, 0, 52, 3, 50);
  },
  changitower(g) {
    cyl(g, C.concrete, 0, 0, 0, 1.8, 2.8, 34, 14);
    cyl(g, C.white, 0, 34, 0, 5.4, 4, 4, 16);
    cyl(g, C.glassDark, 0, 38, 0, 5.6, 5.6, 3, 16);
    cyl(g, C.red, 0, 41, 0, 3, 5.8, 1.2, 16);
    cyl(g, C.steel, 0, 42.2, 0, 0.1, 0.4, 8, 6);
    box(g, C.glass, 0, 3, 0, 14, 6, 20);
  },
  sentosamerlion(g) {
    g.scale.set(1.5, 1.5, 1.5);
    builders.merlion(g);
  },
  globe(g) {
    cyl(g, C.steel, 0, 0, 0, 5, 7, 2.4, 20);
    ball(g, mat(0x2d6fc2, { rough: 0.3, metal: 0.4 }), 0, 12, 0, 9.5);
    for (const tilt of [0, 0.7, -0.7]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(10, 0.3, 6, 40), C.gold);
      ring.position.y = 12;
      ring.rotation.set(Math.PI / 2 + tilt, 0, 0);
      g.add(ring);
    }
    box(g, C.stone, 0, 0.5, 0, 26, 1, 26);
  },
  cablecar(g) {
    for (const z of [-24, 24]) {
      box(g, C.red, 0, 18, z, 2, 36, 2);
      box(g, C.red, 0, 33, z, 6, 1, 1);
    }
    box(g, C.dark, 0, 33, 0, 0.12, 0.12, 50);
    for (const z of [-10, 12]) {
      box(g, C.red, 0, 29.5, z, 3.4, 2.2, 3.4);
      box(g, C.glassClear, 0, 29.5, z, 3.5, 1.3, 3.5);
      box(g, C.dark, 0, 31.2, z, 0.12, 2.2, 0.12);
    }
  },
  ship(g) {
    box(g, mat(0x25364a), 0, 2, 0, 12, 4, 60);
    box(g, C.red, 0, 4.4, 0, 12.2, 0.8, 60.2);
    const colours = [C.orange, C.blue, C.red, C.green, C.white];
    for (let z = -22; z <= 14; z += 6) {
      for (let y = 0; y < 3; y++) box(g, colours[(Math.abs(z) / 6 + y) % colours.length | 0], 0, 5.6 + y * 2.4, z, 9, 2.3, 5.4);
    }
    box(g, C.white, 0, 9, 24, 10, 10, 8);
    box(g, C.glassDark, 5.1, 12, 24, 0.2, 1.6, 7);
  }
};

const LANDMARK_NAMES = {
  ...WORLD_NAMES,
  mbs: 'Marina Bay Sands', merlion: 'Merlion Park', esplanade: 'Esplanade – Theatres on the Bay',
  artscience: 'ArtScience Museum', flyer: 'Singapore Flyer', supertrees: 'Supertree Grove',
  flowerdome: 'Flower Dome', cloudforest: 'Cloud Forest', raffles: 'Raffles Hotel',
  standrews: "St Andrew's Cathedral", supremecourt: 'Supreme Court', fullerton: 'Fullerton Hotel',
  ion: 'ION Orchard', tangs: 'Tangs Orchard', buddhatooth: 'Buddha Tooth Relic Temple',
  mariamman: 'Sri Mariamman Temple', sultan: 'Sultan Mosque', shophouses: 'Little India Shophouses',
  pinnacle: 'Pinnacle@Duxton', financial: 'Marina Bay Financial Centre', jewel: 'Jewel Changi Airport',
  changitower: 'Changi Control Tower', sentosamerlion: 'Sentosa Merlion', globe: 'Universal Studios Globe',
  cablecar: 'Singapore Cable Car', ship: 'Container Ship · Singapore Strait'
};

// Footprint depth (x extent behind the road-facing front) used to set each model back from the road.
const DEPTH = {
  ...WORLD_DEPTH,
  mbs: 22, merlion: 14, esplanade: 34, artscience: 22, flyer: 14, supertrees: 24, flowerdome: 46, cloudforest: 38,
  raffles: 22, standrews: 14, supremecourt: 24, fullerton: 24, ion: 28, tangs: 24, buddhatooth: 24,
  mariamman: 18, sultan: 26, shophouses: 12, pinnacle: 10, financial: 22, jewel: 52, changitower: 14,
  sentosamerlion: 20, globe: 26, cablecar: 6, ship: 14
};

export const landmarkName = (id) => LANDMARK_NAMES[id] || id;

export function buildLandmark(id) {
  const root = new THREE.Group();
  const inner = new THREE.Group();
  inner.position.x = -DEPTH[id] / 2;
  root.add(inner);
  (builders[id] || WORLD_BUILDERS[id])(inner);
  root.userData = { id, name: LANDMARK_NAMES[id] };
  return root;
}

export function disposeLandmarks(group) {
  group.traverse((o) => {
    if (o.geometry && o.geometry !== unitBox) o.geometry.dispose();
    if (o.material && o.material.isMeshBasicMaterial) o.material.dispose();
  });
}

const SG_ROUTES = [
  {
    id: 'downtown', name: 'Downtown Classic', area: 'CITY CENTRE', blurb: 'Downtown · Marina Bay · Chinatown',
    sky: 0xa9d5e5, ground: 0x91ad89, hemi: 2.0, sun: 2.4, sunColor: 0xffefd2,
    landmarks: ['financial', 'buddhatooth', 'mbs', 'pinnacle', 'fullerton']
  },
  {
    id: 'marina', name: 'Marina Bay Waterfront', area: 'MARINA BAY', blurb: 'Bayfront promenade at golden hour',
    sky: 0xf3b98d, ground: 0xc4bda4, water: -1, waterColor: 0x4c93b5, hemi: 1.7, sun: 2.2, sunColor: 0xffb878,
    landmarks: ['mbs', 'flyer', 'artscience', 'financial'], waterLandmarks: ['merlion', 'esplanade', 'ship']
  },
  {
    id: 'gardens', name: 'Gardens by the Bay', area: 'BAYFRONT SOUTH', blurb: 'Supertrees and conservatories after dusk',
    night: true, sky: 0x27345f, ground: 0x4e8a5a, hemi: 1.6, sun: 1.3, sunColor: 0x9fb4ff,
    landmarks: ['supertrees', 'flowerdome', 'supertrees', 'cloudforest', 'mbs']
  },
  {
    id: 'heritage', name: 'Heritage Trail', area: 'CHINATOWN · LITTLE INDIA', blurb: 'Temples, mosque and shophouses',
    sky: 0xf0dcb8, ground: 0xa89f84, hemi: 1.9, sun: 2.2, sunColor: 0xffe2b0,
    landmarks: ['buddhatooth', 'mariamman', 'sultan', 'shophouses', 'pinnacle']
  },
  {
    id: 'civic', name: 'Civic District & Orchard', area: 'CIVIC DISTRICT', blurb: 'Colonial icons and Orchard Road malls',
    sky: 0xb7d8ea, ground: 0x9fb48f, hemi: 2.0, sun: 2.4, sunColor: 0xfff1d6,
    landmarks: ['supremecourt', 'standrews', 'raffles', 'fullerton', 'ion', 'tangs']
  },
  {
    id: 'changi', name: 'East Coast to Changi', area: 'EAST COAST', blurb: 'Seaside run to the airport',
    sky: 0x9fd4ea, ground: 0xc9c29c, water: 1, waterColor: 0x3f9ac0, hemi: 2.1, sun: 2.5, sunColor: 0xfff4dc,
    landmarks: ['jewel', 'changitower', 'flyer'], waterLandmarks: ['ship']
  },
  {
    id: 'sentosa', name: 'Sentosa Gateway', area: 'SENTOSA', blurb: 'Island resort and cable car views',
    sky: 0x8fd7ee, ground: 0x8fc079, water: 1, waterColor: 0x3aa6c9, hemi: 2.2, sun: 2.5, sunColor: 0xfff6e0,
    landmarks: ['sentosamerlion', 'globe', 'cablecar'], waterLandmarks: ['ship', 'cablecar']
  }
];

const NEW_ROUTES = [
  {
    id: 'ny-midtown', city: 'newyork', name: 'Midtown Manhattan', area: 'MIDTOWN', blurb: 'Empire State, Flatiron and Times Square',
    sky: 0xa8cce3, ground: 0x8aa282, hemi: 2.0, sun: 2.4, sunColor: 0xffefd2,
    landmarks: ['empire', 'flatiron', 'timessq', 'wtc'],
    trip: ['Penn Station', 'Times Square', 2600]
  },
  {
    id: 'ny-harbor', city: 'newyork', name: 'Lower Manhattan Harbor', area: 'BATTERY PARK', blurb: 'One WTC and Lady Liberty at sunset',
    sky: 0xf2a98a, ground: 0xb8b39c, water: -1, waterColor: 0x3d6f8f, hemi: 1.7, sun: 2.2, sunColor: 0xffa86c,
    landmarks: ['wtc', 'empire', 'flatiron'], waterLandmarks: ['liberty', 'ship'],
    trip: ['Wall Street', 'Battery Park', 2200]
  },
  {
    id: 'sh-pudong', city: 'shanghai', name: 'Pudong Skyline', area: 'LUJIAZUI', blurb: 'The super-tall trio and Pearl Tower',
    sky: 0xb4c5d0, ground: 0x93a58c, hemi: 1.9, sun: 2.1, sunColor: 0xfff0dc,
    landmarks: ['shtower', 'jinmao', 'swfc', 'pearl'],
    trip: ['Century Avenue', 'Lujiazui', 2600]
  },
  {
    id: 'sh-bund', city: 'shanghai', name: 'The Bund at Night', area: 'THE BUND', blurb: 'Colonial waterfront facing the neon skyline',
    night: true, sky: 0x1d2646, ground: 0x4b5f55, water: 1, waterColor: 0x23405c, hemi: 1.5, sun: 1.2, sunColor: 0x9fb4ff,
    landmarks: ['bund', 'bund', 'pearl'], waterLandmarks: ['pearl', 'ship'],
    trip: ['Nanjing Road', 'The Bund', 2400]
  },
  {
    id: 'tk-shibuya', city: 'tokyo', name: 'Shibuya & Shinjuku', area: 'SHIBUYA', blurb: 'Scramble crossing and the Tokyo Met Government towers',
    night: true, sky: 0x20224a, ground: 0x4a5a58, hemi: 1.6, sun: 1.2, sunColor: 0xb4a4ff,
    landmarks: ['shibuya', 'tocho', 'shibuya', 'tokyotower'],
    trip: ['Shibuya Station', 'Shinjuku', 3000]
  },
  {
    id: 'tk-skytree', city: 'tokyo', name: 'Asakusa & Skytree', area: 'ASAKUSA', blurb: 'Kaminarimon gate under the Skytree',
    sky: 0xf0d6b8, ground: 0xa0a687, hemi: 1.9, sun: 2.2, sunColor: 0xffe0b4,
    landmarks: ['kaminarimon', 'skytree', 'tokyotower'],
    trip: ['Asakusa', 'Oshiage', 2200]
  },
  {
    id: 'ld-westminster', city: 'london', name: 'Westminster & the Eye', area: 'WESTMINSTER', blurb: 'Big Ben, the London Eye and St Paul’s',
    sky: 0xb9c4cc, ground: 0x7f9a70, hemi: 1.8, sun: 1.9, sunColor: 0xfff0d8,
    landmarks: ['bigben', 'londoneye', 'stpauls', 'shard'],
    trip: ['Westminster', 'St Paul’s', 2800]
  },
  {
    id: 'ld-thames', city: 'london', name: 'Thames Tower Bridge', area: 'SOUTH BANK', blurb: 'The Shard and Tower Bridge at golden hour',
    sky: 0xf0b890, ground: 0x9aa383, water: -1, waterColor: 0x4a6b7a, hemi: 1.7, sun: 2.1, sunColor: 0xffb878,
    landmarks: ['shard', 'stpauls', 'bigben'], waterLandmarks: ['towerbridge'],
    trip: ['London Bridge', 'Tower Bridge', 2000]
  },
  {
    id: 'db-downtown', city: 'dubai', name: 'Downtown Dubai', area: 'DOWNTOWN', blurb: 'Burj Khalifa, Emirates Towers and the Museum of the Future',
    sky: 0xe9d7b4, ground: 0xc8b787, hemi: 2.1, sun: 2.7, sunColor: 0xfff0cc,
    landmarks: ['burj', 'emirates', 'museum', 'dubaiframe'],
    trip: ['Dubai Mall', 'Sheikh Zayed Road', 3000]
  },
  {
    id: 'db-coast', city: 'dubai', name: 'Jumeirah Coast', area: 'JUMEIRAH', blurb: 'Burj Al Arab on the Gulf',
    sky: 0xf0b88a, ground: 0xd6c394, water: 1, waterColor: 0x2f9db8, hemi: 1.8, sun: 2.4, sunColor: 0xffb070,
    landmarks: ['burj', 'dubaiframe'], waterLandmarks: ['burjalarab', 'ship'],
    trip: ['Jumeirah Beach', 'Burj Al Arab', 3200]
  },
  {
    id: 'au-helix', city: 'circadia', name: 'Helix Core Loop', area: 'HELIX CORE', blurb: 'Downtown Circadia under the Orbital Spire',
    sky: 0x6a8fb8, ground: 0x5f7a68, hemi: 1.9, sun: 2.3, sunColor: 0xffe6c8,
    landmarks: ['helixcore', 'spire', 'crystal', 'unityplaza'],
    trip: ['Helix Core', 'Orbital Spire', 3600]
  },
  {
    id: 'au-ring', city: 'circadia', name: 'Ring Gate Run', area: 'RING GATE', blurb: 'Through the Ring Gate toward Crystal Forum',
    night: true, sky: 0x1a2048, ground: 0x3d4a58, hemi: 1.5, sun: 1.2, sunColor: 0xa8b4ff,
    landmarks: ['ringgate', 'crystal', 'helixcore', 'spire'],
    trip: ['Ring Gate', 'Crystal Forum', 3200]
  },
  {
    id: 'au-polar', city: 'circadia', name: 'Polar Beacon Trail', area: 'POLAR GARDENS', blurb: 'Gardens at the pole with the beacon in sight',
    sky: 0x8ec4e0, ground: 0x6f9a62, hemi: 2.0, sun: 2.4, sunColor: 0xfff2dc,
    landmarks: ['polarbeacon', 'observatory', 'antipodolite', 'unityplaza'],
    trip: ['Polar Gardens', 'Horizon Observatory', 4000]
  }
];

export const ROUTES = [...SG_ROUTES.map((r) => ({ ...r, city: 'singapore' })), ...NEW_ROUTES];

// Each route is a trip with a start, a destination and a length in metres; longer trips pay more.
const TRIPS = {
  downtown: ['Raffles Place', 'Chinatown Point', 2200],
  marina: ['Marina Bay Sands', 'Merlion Park', 2000],
  gardens: ['Marina Barrage', 'Gardens by the Bay', 2400],
  heritage: ['Chinatown', 'Little India', 2600],
  civic: ['City Hall', 'Orchard Road', 3000],
  changi: ['East Coast Park', 'Changi Airport', 4200],
  sentosa: ['VivoCity', 'Sentosa Merlion', 3400]
};
for (const r of ROUTES) [r.from, r.to, r.length] = r.trip || TRIPS[r.id];

export const DEFAULT_ROUTE_ID = ROUTES[0].id;
export const routesFor = (cityId) => ROUTES.filter((r) => r.city === cityId);
