// Streams the fixed free-roam city around the car: each block is built on demand from its grid coordinates and dropped when far away.
import * as THREE from './vendor/three/three.module.min.js';
import { lcg } from './city-gfx.js';
import { buildLandmark, disposeLandmarks } from './city-routes.js';
import { PITCH as P, GRID, FACE, cellInfo, seedOf } from './city-map.js';

const LOAD = 270;
const UNLOAD = 340;
const SIDEWALK_Y = 0.125;
const TINTS = {
  glass: [0xffffff, 0xd9f0ee, 0xe3e9f7], hdb: [0xf3e6c8, 0xdfeaf2, 0xf2d8d0, 0xe6efd6], concrete: [0xffffff, 0xece6da, 0xdfe6e8]
};
// Where a block's four road frontages sit: frame origin, yaw and the side of the road the block is on.
const EDGES = {
  W: { x: 0, z: 0, yaw: 0, side: 1 },
  E: { x: P, z: 0, yaw: 0, side: -1 },
  N: { x: P, z: 0, yaw: -Math.PI / 2, side: 1 },
  S: { x: P, z: P, yaw: -Math.PI / 2, side: -1 }
};

export function createFreeCity({ scene, kit }) {
  const { M, box, walls, lineMat, curbMat, mergeStatics, freeTexture } = kit;
  const root = new THREE.Group();
  root.visible = false;
  scene.add(root);
  const chunks = new Map();

  const asphaltMat = new THREE.MeshStandardMaterial({ map: freeTexture(kit.asphalt), roughness: 0.88, metalness: 0.02 });
  const walkMat = new THREE.MeshStandardMaterial({ map: freeTexture(kit.pavers), color: 0xd9d3c3, roughness: 0.9 });
  const parkMat = new THREE.MeshStandardMaterial({ map: freeTexture(kit.grass), color: 0x86a97d, roughness: 0.95 });
  const pondMat = new THREE.MeshStandardMaterial({ map: freeTexture(kit.waterTex), color: 0x4c93b5, roughness: 0.18, metalness: 0.25 });
  const seaTex = freeTexture(kit.waterTex);
  const sea = new THREE.Mesh(
    new THREE.PlaneGeometry(1500, 1500),
    new THREE.MeshStandardMaterial({ map: seaTex, color: 0x4c93b5, roughness: 0.18, metalness: 0.25, envMapIntensity: 1.4 })
  );
  sea.geometry.attributes.uv.array.forEach((v, k, arr) => { arr[k] = v * 150; });
  sea.rotation.x = -Math.PI / 2;
  sea.position.y = -0.3;
  root.add(sea);

  function plane(parent, mat, x0, x1, z0, z1, y, tile) {
    const w = x1 - x0; const d = z1 - z0;
    const geo = new THREE.PlaneGeometry(w, d);
    const uv = geo.attributes.uv;
    for (let k = 0; k < uv.count; k++) uv.setXY(k, uv.getX(k) * w / tile, uv.getY(k) * d / tile);
    const m = new THREE.Mesh(geo, mat);
    m.rotation.x = -Math.PI / 2;
    m.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
    m.receiveShadow = true;
    parent.add(m);
    return m;
  }

  function frame(parent, x, z, yaw) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = yaw;
    parent.add(g);
    return g;
  }

  function addPed(chunk, parent, rand, side) {
    const z0 = 24 + rand() * (P - 48);
    const ped = kit.addPedestrian(parent, side * (9 + rand() * 2), z0, rand);
    ped.userData.ped.z0 = z0;
    chunk.peds.push(ped);
  }

  // Lamps, trees, bus stops and pedestrians along a road leaving the intersection; local +z runs down the road.
  function decorateArm(chunk, g, yaw, rand) {
    const f = frame(g, 0, 0, yaw);
    box(f, lineMat, 0, 0.005, P / 2, 0.12, 0.01, P - 40);
    for (const x of [-7.35, 7.35]) box(f, lineMat, x, 0.004, P / 2, 0.14, 0.01, P - 16);
    for (let z = 24; z < P - 20; z += 8) for (const x of [-3.55, 3.55]) box(f, lineMat, x, 0.004, z + 1.6, 0.14, 0.01, 3.2);
    for (let k = 0; k < 5; k++) {
      kit.addLamp(f, -8.7, 22 + k * 16);
      kit.addLamp(f, 8.7, 30 + k * 16);
    }
    for (let k = 0; k < 3; k++) {
      for (const side of [-1, 1]) {
        const z = 36 + k * 32;
        if (rand() > 0.5) kit.addRainTree(f, side * 9.6, z, rand); else kit.addPalm(f, side * 9.4, z, rand);
        kit.addHedge(f, side * 8.35, z - 4.2, 5.5);
      }
    }
    if (rand() < 0.4) kit.addBusStop(f, 1, 54);
    if (rand() < 0.4) kit.addBusStop(f, -1, 46);
    kit.addBin(f, -1, 34);
    kit.addBin(f, 1, 34);
    kit.addHydrant(f, 1, 72);
    kit.addSignPost(f, -1, 78);
    kit.addSignPost(f, 1, 86);
    for (const side of [-1, 1]) {
      const n = 1 + Math.floor(rand() * 3);
      for (let k = 0; k < n; k++) addPed(chunk, f, rand, side);
    }
  }

  function frontage(f, side, zStart, zEnd, rand, build) {
    let cursor = zStart;
    while (cursor < zEnd - 10) {
      const b = build(f, side, rand);
      const d = b.userData.d;
      if (cursor + d > zEnd) { f.remove(b); break; }
      b.position.z = cursor + d / 2;
      cursor += d + 0.8 + rand() * 2.2;
    }
  }

  function towerBuilder(kind, boost, plaza) {
    return (f, side, rand) => kit.addTower(f, side, 0, rand, plaza ? rand() > 0.4 : false, { kind: typeof kind === 'function' ? kind(rand) : kind, boost });
  }
  const shopBuilder = (f, side, rand) => kit.addShophouse(f, side, 0, rand);

  function styleFor(kind, edge, rand) {
    switch (kind) {
      case 'downtown': return towerBuilder((r) => (r() < 0.65 ? 'glass' : 'concrete'), 24, true);
      case 'shophouse': return shopBuilder;
      case 'residential': return towerBuilder('hdb', -4, false);
      case 'mixed': return edge === 'N' || edge === 'S' ? towerBuilder(null, 6, true) : shopBuilder;
      default: return rand() < 0.5 ? shopBuilder : towerBuilder(null, 0, true);
    }
  }

  function centreTowers(g, kind, rand) {
    const profile = {
      downtown: ['glass', 70, 80], civic: ['concrete', 26, 36], mixed: ['concrete', 34, 44], shophouse: ['concrete', 12, 10], residential: ['hdb', 30, 34]
    }[kind];
    if (!profile) return;
    const [wallKind, base, spread] = profile;
    const two = rand() > 0.4;
    for (const dx of two ? [-14, 14] : [0]) {
      const w = two ? 22 : 30 + rand() * 8;
      const d = two ? 24 + rand() * 14 : 30 + rand() * 8;
      const h = base + rand() * spread;
      const tint = TINTS[wallKind][Math.floor(rand() * TINTS[wallKind].length)];
      walls(g, wallKind, tint, P / 2 + dx, h / 2, P / 2, w, h, d);
      box(g, M.roof, P / 2 + dx, h + 0.02, P / 2, w, 0.06, d);
      box(g, M.concrete, P / 2 + dx + (rand() - 0.5) * w * 0.4, h + 1.2, P / 2 + (rand() - 0.5) * d * 0.4, w * 0.3, 2.4, d * 0.25);
    }
  }

  function parkInterior(g, rand) {
    plane(g, parkMat, FACE, P - FACE, FACE, P - FACE, SIDEWALK_Y + 0.01, 6);
    const pw = 26 + rand() * 12; const pd = 20 + rand() * 10;
    const px = P / 2 + (rand() - 0.5) * 20; const pz = P / 2 + (rand() - 0.5) * 20;
    box(g, M.planter, px, 0.2, pz, pw + 1.6, 0.3, pd + 1.6);
    plane(g, pondMat, px - pw / 2, px + pw / 2, pz - pd / 2, pz + pd / 2, SIDEWALK_Y + 0.2, 10);
    for (let n = 0; n < 16; n++) {
      const x = 17 + rand() * (P - 34); const z = 17 + rand() * (P - 34);
      if (Math.abs(x - px) < pw / 2 + 3 && Math.abs(z - pz) < pd / 2 + 3) continue;
      if (rand() > 0.5) kit.addRainTree(g, x, z, rand); else kit.addPalm(g, x, z, rand);
    }
  }

  function hedgeRing(g, rand) {
    for (const e of Object.values(EDGES)) {
      const f = frame(g, e.x, e.z, e.yaw);
      for (let z = 14; z < P - 20; z += 6) kit.addHedge(f, e.side * (FACE - 0.9), z, 5.6);
      if (rand() > 0.3) kit.addRainTree(f, e.side * (FACE + 2.5), 14 + rand() * 6, rand);
      if (rand() > 0.3) kit.addPalm(f, e.side * (FACE + 2.5), P - 20 - rand() * 6, rand);
    }
  }

  function buildBlock(g, cell, rand) {
    const { kind } = cell;
    plane(g, walkMat, 8.03, P - 8.03, 8.03, P - 8.03, SIDEWALK_Y, 2);
    box(g, curbMat, 7.78, 0.02, P / 2, 0.5, 0.2, P - 15.5);
    box(g, curbMat, P - 7.78, 0.02, P / 2, 0.5, 0.2, P - 15.5);
    box(g, curbMat, P / 2, 0.02, 7.78, P - 15.5, 0.2, 0.5);
    box(g, curbMat, P / 2, 0.02, P - 7.78, P - 15.5, 0.2, 0.5);
    if (kind === 'park') {
      parkInterior(g, rand);
      hedgeRing(g, rand);
      return;
    }
    if (kind === 'landmark') {
      const lm = cell.landmark;
      const e = EDGES[lm.face];
      const f = frame(g, e.x, e.z, e.yaw);
      plane(g, walkMat, FACE, P - FACE, FACE, P - FACE, SIDEWALK_Y + 0.01, 2);
      const model = buildLandmark(lm.id);
      model.position.set(e.side * 12, 0, P / 2);
      if (e.side > 0) model.rotation.y = Math.PI;
      f.add(model);
      for (const [a, b] of [[0, 0], [0, 1], [1, 0], [1, 1]]) {
        const x = 18 + a * (P - 36); const z = 18 + b * (P - 36);
        if (rand() > 0.5) kit.addRainTree(g, x, z, rand); else kit.addPalm(g, x, z, rand);
      }
      hedgeRing(g, rand);
      return;
    }
    for (const [name, e] of Object.entries(EDGES)) {
      const f = frame(g, e.x, e.z, e.yaw);
      const alongNS = name === 'N' || name === 'S';
      // East and west fronts keep clear of the corners the north and south fronts occupy
      frontage(f, e.side, alongNS ? FACE : 34, alongNS ? P - FACE : P - 34, rand, styleFor(kind, name, rand));
    }
    centreTowers(g, kind, rand);
  }

  function buildQuay(g, i, j) {
    const seaWall = (x, z, w, d) => box(g, M.concrete, x, 0.15, z, w, 0.9, d);
    const zEnd = j < GRID ? P - 8 : 14;
    if (i === 0) {
      const z0 = j === 0 ? -14 : -8;
      plane(g, walkMat, -14, -8, z0, zEnd, SIDEWALK_Y, 2);
      seaWall(-14.5, (z0 + zEnd) / 2, 1, zEnd - z0 + 1);
    }
    if (i === GRID) {
      const z0 = j === 0 ? -14 : -8;
      plane(g, walkMat, 8, 14, z0, zEnd, SIDEWALK_Y, 2);
      seaWall(14.5, (z0 + zEnd) / 2, 1, zEnd - z0 + 1);
    }
    if (j === 0) {
      const x1 = i < GRID ? P - 8 : 8;
      plane(g, walkMat, -8, x1, -14, -8, SIDEWALK_Y, 2);
      seaWall((x1 - 8) / 2, -14.5, x1 + 8, 1);
    }
    if (j === GRID) {
      const x1 = i < GRID ? P - 8 : 8;
      plane(g, walkMat, -8, x1, 8, 14, SIDEWALK_Y, 2);
      seaWall((x1 - 8) / 2, 14.5, x1 + 8, 1);
    }
  }

  function buildChunk(i, j) {
    const g = new THREE.Group();
    g.position.set(i * P, 0, j * P);
    const rand = lcg(seedOf(i, j));
    const chunk = { g, i, j, peds: [] };
    const east = i < GRID; const south = j < GRID;
    plane(g, asphaltMat, -8, east ? P - 8 : 8, -8, 8, -0.04, 8);
    if (south) plane(g, asphaltMat, -8, 8, 8, P - 8, -0.04, 8);
    const arms = [[south, 0], [j > 0, Math.PI], [east, Math.PI / 2], [i > 0, -Math.PI / 2]];
    for (const [exists, yaw] of arms) {
      if (!exists) continue;
      kit.addTrafficSignals(frame(g, 0, 0, yaw), 14.7);
    }
    if (south) decorateArm(chunk, g, 0, rand);
    if (east) decorateArm(chunk, g, Math.PI / 2, rand);
    if (east && south) buildBlock(g, cellInfo(i, j), rand);
    buildQuay(g, i, j);
    mergeStatics(g);
    g.updateMatrixWorld(true);
    root.add(g);
    return chunk;
  }

  function dropChunk(key) {
    const { g } = chunks.get(key);
    root.remove(g);
    g.traverse((o) => { if (o.userData.merged && o.geometry) o.geometry.dispose(); });
    disposeLandmarks(g);
    chunks.delete(key);
  }

  const distanceTo = (i, j, px, pz) => {
    const x0 = i * P - 8; const z0 = j * P - 8;
    return Math.hypot(Math.max(x0 - px, 0, px - x0 - P), Math.max(z0 - pz, 0, pz - z0 - P));
  };

  function update(px, pz, time, budget = 1) {
    const wanted = [];
    const iMin = Math.max(0, Math.floor((px - LOAD + 8) / P));
    const iMax = Math.min(GRID, Math.floor((px + LOAD + 8) / P));
    const jMin = Math.max(0, Math.floor((pz - LOAD + 8) / P));
    const jMax = Math.min(GRID, Math.floor((pz + LOAD + 8) / P));
    for (let i = iMin; i <= iMax; i++) {
      for (let j = jMin; j <= jMax; j++) {
        const key = `${i},${j}`;
        const dist = distanceTo(i, j, px, pz);
        if (!chunks.has(key) && dist < LOAD) wanted.push({ i, j, key, dist });
      }
    }
    wanted.sort((a, b) => a.dist - b.dist);
    for (let n = 0; n < wanted.length && n < budget; n++) chunks.set(wanted[n].key, buildChunk(wanted[n].i, wanted[n].j));
    for (const [key, chunk] of [...chunks]) if (distanceTo(chunk.i, chunk.j, px, pz) > UNLOAD) dropChunk(key);

    seaTex.offset.set(px / 10 + time * 0.01, -pz / 10);
    sea.position.x = px;
    sea.position.z = pz;
    animatePeds(px, pz, time);
  }

  // Pedestrians walk as a pure function of the shared clock, so everyone sees them in the same place.
  function animatePeds(px, pz, time) {
    for (const chunk of chunks.values()) {
      if (distanceTo(chunk.i, chunk.j, px, pz) > 150) continue;
      for (const ped of chunk.peds) {
        const p = ped.userData.ped;
        const zMin = 24; const span = P - 48;
        ped.position.z = zMin + ((((p.z0 - zMin + p.dir * p.speed * time) % span) + span) % span);
        const swing = Math.sin(time * p.speed * 4.5 + p.phase) * 0.7;
        p.legs[0].rotation.x = swing; p.legs[1].rotation.x = -swing;
        p.arms[0].rotation.x = -swing * 0.8; p.arms[1].rotation.x = swing * 0.8;
      }
    }
  }

  function prefill(px, pz, time) {
    update(px, pz, time, Infinity);
  }

  function clear() {
    for (const key of [...chunks.keys()]) dropChunk(key);
  }

  function setVisible(on) {
    root.visible = on;
    if (!on) clear();
  }

  return { update, prefill, clear, setVisible, get loaded() { return chunks.size; } };
}
