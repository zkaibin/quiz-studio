// Streams the fixed free-roam city around the car: each block is built on demand from its grid coordinates and dropped when far away.
import * as THREE from './vendor/three/three.module.min.js';
import { lcg } from './city-gfx.js';
import { buildLandmark, disposeLandmarks } from './city-routes.js';
import {
  PITCH as P, GRID, FACE, FACE_ORGANIC, ROAD_HALF, cellInfo, seedOf, currentCity, wrapIndex,
  usesOrganicLayout, groundHeight, avenueX, streetZ
} from './city-map.js';
import {
  sampleAvenueRibbon, sampleStreetRibbon, ribbonGeometry
} from './city-terrain.js';
const WALK_OUTER = FACE + 2.5;
import { createEffects, createCars } from './city-smash.js';
import { createStyles } from './city-styles.js';
import {
  planetRadius, ensurePlanetDecor, projectChunkToSphere, placeObjectOnSphere,
  updatePlanetVisuals, disposePlanet, planetSunDirs
} from './city-planet.js';

// Stream well beyond fog so blocks never pop in at the horizon. Altitude scales the radius further.
const BASE_LOAD = 850;
const LOAD_CAP = 1250;
const UNLOAD_PAD = 200;
const loadRadius = (alt = 0) => Math.min(LOAD_CAP, Math.max(BASE_LOAD, 520 + Math.max(0, alt) * 2.8));
const unloadRadius = (alt = 0) => loadRadius(alt) + UNLOAD_PAD;
// Planet: near the surface stream a wide city ring. Climbing used to grow LOAD forever
// (600+alt*3.2 → ~16k bent meshes) and crash the tab around 300–500 m. Above ~80 m the
// globe shell owns the horizon — shrink the city stream so orbit stays light.
const PLANET_ORBIT_LOAD = 400;
const PLANET_CHUNK_CAP = 64;
const planetLoadRadius = (alt = 0) => {
  const a = Math.max(0, alt);
  const near = Math.min(LOAD_CAP, Math.max(BASE_LOAD, 600 + Math.min(a, 80) * 2.5));
  if (a <= 80) return near;
  const t = Math.min(1, (a - 80) / 240); // fully tapered by ~320 m
  return Math.round(THREE.MathUtils.lerp(near, PLANET_ORBIT_LOAD, t));
};
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

// Collision footprint (half sizes along the frame's x / z), the speed needed to smash it and how it falls.
const PROPS = {
  lamp: { hx: 0.3, hz: 0.3, min: 6, mode: 'topple', drag: 0.85, colors: [0x39464b, 0xf2e9b0] },
  tree: { hx: 0.45, hz: 0.45, min: 9, mode: 'topple', drag: 0.7, colors: [0x6b4a2f, 0x3d6b3a, 0x2f5a30] },
  palm: { hx: 0.35, hz: 0.35, min: 7, mode: 'topple', drag: 0.75, colors: [0x7a5b3a, 0x3d8a4e] },
  sign: { hx: 0.25, hz: 0.25, min: 3, mode: 'topple', drag: 0.94, colors: [0x39464b, 0xf2f2f2] },
  bin: { hx: 0.35, hz: 0.35, min: 1.5, mode: 'launch', drag: 0.96, colors: [0x2f7d4f, 0x1f2a2e] },
  hydrant: { hx: 0.25, hz: 0.25, min: 2, mode: 'launch', drag: 0.95, colors: [0xc0392b, 0xe8e0d0] },
  hedge: { hx: 0.45, hz: 2.7, min: 4, mode: 'launch', drag: 0.9, colors: [0x3f7d3a, 0x5b8f45, 0x7a6a55] },
  busstop: { hx: 1.15, hz: 2.2, min: 9, mode: 'topple', drag: 0.7, colors: [0x9ecbd8, 0x2b5aa0, 0x39464b] }
};
const PED_COLORS = [0xd94f4f, 0x3b82c4, 0xf2f2f2, 0x2b2b2b];

export function createFreeCity({ scene, kit }) {
  const { M, box, walls, lineMat, curbMat, mergeStatics, freeTexture } = kit;
  const root = new THREE.Group();
  root.visible = false;
  scene.add(root);
  const chunks = new Map();
  const stats = { props: 0, peds: 0, cars: 0 };
  const broken = new Set();
  const styles = createStyles(kit, FACE);
  let style = { lowrise: 'shophouse', residential: 'tower', downtownBoost: 24 };
  let planetReady = false;
  let planetMode = false;
  let lastLoad = BASE_LOAD;
  const effects = createEffects(root);
  const cars = createCars({ root, effects, stats });
  const planetPeds = [];

  // Warm charcoal tint — sky fog is blue; an untinted map washes out to cyan on the globe.
  const asphaltMat = new THREE.MeshStandardMaterial({
    map: freeTexture(kit.asphalt), color: 0x5a5e60, roughness: 0.92, metalness: 0
  });
  const walkMat = new THREE.MeshStandardMaterial({ map: freeTexture(kit.pavers), color: 0xd9d3c3, roughness: 0.9 });
  const parkMat = new THREE.MeshStandardMaterial({ map: freeTexture(kit.grass), color: 0x86a97d, roughness: 0.95 });
  const pondMat = new THREE.MeshStandardMaterial({ map: freeTexture(kit.waterTex), color: 0x4c93b5, roughness: 0.18, metalness: 0.25 });
  // Survives mergeStatics so the sphere bend can densify roads/parks only.
  asphaltMat.userData.planetGround = true;
  walkMat.userData.planetGround = true;
  parkMat.userData.planetGround = true;
  pondMat.userData.planetGround = true;
  // Sphere bend can flip winding vs radial normals — keep ground visible from the street camera.
  asphaltMat.side = THREE.DoubleSide;
  walkMat.side = THREE.DoubleSide;
  parkMat.side = THREE.DoubleSide;
  pondMat.side = THREE.DoubleSide;
  const seaTex = freeTexture(kit.waterTex);
  const seaMat = new THREE.MeshStandardMaterial({ map: seaTex, color: 0x4c93b5, roughness: 0.18, metalness: 0.25, envMapIntensity: 1.4 });
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(1500, 1500), seaMat);
  sea.geometry.attributes.uv.array.forEach((v, k, arr) => { arr[k] = v * 150; });
  sea.rotation.x = -Math.PI / 2;
  sea.position.y = -0.3;
  // Never bend this flat ocean disc onto the globe — it would become two huge blue chords.
  sea.userData.planetSkipBend = true;
  root.add(sea);

  function blockFace() {
    return usesOrganicLayout(currentCity()) ? FACE_ORGANIC : FACE;
  }

  function plane(parent, mat, x0, x1, z0, z1, y, tile) {
    const w = x1 - x0; const d = z1 - z0;
    // Pocket planet: dense grids so bent roads follow the globe instead of flat chords.
    // Earth hills: tessellate so we can lift vertices to the height field.
    const city = currentCity();
    const planet = !!city.planet;
    const hills = usesOrganicLayout(city);
    const segW = planet || hills ? Math.max(1, Math.ceil(Math.abs(w) / (hills ? 8 : 3.5))) : 1;
    const segD = planet || hills ? Math.max(1, Math.ceil(Math.abs(d) / (hills ? 8 : 3.5))) : 1;
    const geo = new THREE.PlaneGeometry(w, d, segW, segD);
    const uv = geo.attributes.uv;
    for (let k = 0; k < uv.count; k++) uv.setXY(k, uv.getX(k) * w / tile, uv.getY(k) * d / tile);
    const m = new THREE.Mesh(geo, mat);
    m.rotation.x = -Math.PI / 2;
    m.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
    m.receiveShadow = true;
    if (planet) m.userData.planetGround = true;
    // Already height-mapped — never also lift this mesh as a whole.
    if (hills) m.userData.hillLifted = true;
    if (hills) {
      // PlaneGeometry lies in XY before rotation; after rotX(-π/2), local Y → world -Z, local Z → world Y.
      const pos = geo.attributes.position;
      const ox = (x0 + x1) / 2;
      const oz = (z0 + z1) / 2;
      // Parent chunk origin is applied later; bake world XZ using the parent's eventual world offset via userData.
      const chunkOrigin = parent.userData.chunkOrigin || { x: 0, z: 0 };
      for (let k = 0; k < pos.count; k++) {
        const lx = pos.getX(k);
        const ly = pos.getY(k);
        const wx = chunkOrigin.x + ox + lx;
        const wz = chunkOrigin.z + oz - ly;
        pos.setZ(k, groundHeight(wx, wz) - y);
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
    }
    parent.add(m);
    return m;
  }

  function addRibbon(parent, mat, pts, halfW, yBias = 0) {
    const { positions, normals, uvs, indices } = ribbonGeometry(pts, halfW, yBias);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    const m = new THREE.Mesh(geo, mat);
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

  // Fixtures register a collision box and are tracked in the merged mesh so they can be knocked out of it later.
  function addProp(chunk, f, kind, lx, lz, rand, build) {
    const seed = Math.floor(rand() * 1e9) + 1;
    const id = `${chunk.i},${chunk.j}:${chunk.n++}`;
    if (broken.has(id)) return;
    const holder = new THREE.Group();
    holder.userData.breakId = id;
    f.add(holder);
    build(holder, lcg(seed));
    f.updateWorldMatrix(true, false);
    const w = new THREE.Vector3(lx, 0, lz).applyMatrix4(f.matrixWorld);
    const spec = PROPS[kind];
    chunk.props.push({ id, kind, spec, x: w.x, z: w.z, yaw: f.rotation.y, f, lx, lz, build: (parent) => build(parent, lcg(seed)), chunk });
  }

  function treeOrPalm(chunk, f, x, z, rand) {
    if (rand() > 0.5) addProp(chunk, f, 'tree', x, z, rand, (parent, r) => kit.addRainTree(parent, x, z, r));
    else addProp(chunk, f, 'palm', x, z, rand, (parent, r) => kit.addPalm(parent, x, z, r));
  }

  function hedge(chunk, f, x, z, len, rand) {
    addProp(chunk, f, 'hedge', x, z, rand, (parent) => kit.addHedge(parent, x, z, len));
  }

  function addPed(chunk, parent, rand, side) {
    const z0 = 24 + rand() * (P - 48);
    const ped = kit.addPedestrian(parent, side * (12.2 + rand() * 2), z0, rand);
    ped.userData.ped.z0 = z0;
    ped.userData.id = `${chunk.i},${chunk.j}:p${chunk.n++}`;
    if (broken.has(ped.userData.id)) { parent.remove(ped); return; }
    chunk.peds.push(ped);
  }

  function addParkedCars(chunk, f, rand) {
    const count = rand() < 0.5 ? 1 + Math.floor(rand() * 2) : 0;
    for (let k = 0; k < count; k++) {
      const side = rand() < 0.5 ? -1 : 1;
      const z = 30 + rand() * (P - 60);
      const facing = rand() < 0.5 ? 0 : Math.PI;
      const id = `${chunk.i},${chunk.j}:c${chunk.n++}`;
      const w = new THREE.Vector3(side * (ROAD_HALF - 1.5), 0, z);
      f.updateWorldMatrix(true, false);
      w.applyMatrix4(f.matrixWorld);
      cars.addParked(chunk.key, id, w.x, w.z, -f.rotation.y + facing);
    }
  }

  // Long road markings: short segments on the pocket planet so they follow the globe.
  function stripe(parent, mat, x, y, z0, z1, w, h) {
    const planet = planetMode || !!currentCity().planet;
    if (!planet || Math.abs(z1 - z0) < 12) {
      box(parent, mat, x, y, (z0 + z1) / 2, w, h, Math.abs(z1 - z0));
      return;
    }
    const step = 6;
    for (let z = Math.min(z0, z1); z < Math.max(z0, z1) - 0.01; z += step) {
      const zEnd = Math.min(z + step, Math.max(z0, z1));
      box(parent, mat, x, y, (z + zEnd) / 2, w, h, zEnd - z);
    }
  }

  // Lamps, trees, bus stops and pedestrians along a road leaving the intersection; local +z runs down the road.
  function decorateArm(chunk, g, yaw, rand) {
    const f = frame(g, 0, 0, yaw);
    addParkedCars(chunk, f, rand);
    // Clear 4-lane marks: double centre + edge lines + dashed lane separators.
    stripe(f, lineMat, -0.14, 0.006, 16, P - 16, 0.1, 0.01);
    stripe(f, lineMat, 0.14, 0.006, 16, P - 16, 0.1, 0.01);
    for (const x of [-(ROAD_HALF - 0.7), ROAD_HALF - 0.7]) stripe(f, lineMat, x, 0.005, 6, P - 6, 0.16, 0.01);
    // Dashes between inner/outer lanes (centre is solid double line above).
    for (let z = 20; z < P - 16; z += 9) {
      for (const x of [-6.3, 6.3]) box(f, lineMat, x, 0.005, z + 1.8, 0.14, 0.01, 3.6);
    }
    for (let k = 0; k < 5; k++) {
      const za = 22 + k * 16; const zb = 30 + k * 16;
      addProp(chunk, f, 'lamp', -11.9, za, rand, (parent) => kit.addLamp(parent, -11.9, za));
      addProp(chunk, f, 'lamp', 11.9, zb, rand, (parent) => kit.addLamp(parent, 11.9, zb));
    }
    for (let k = 0; k < 3; k++) {
      for (const side of [-1, 1]) {
        const z = 36 + k * 32;
        treeOrPalm(chunk, f, side * 13.0, z, rand);
        hedge(chunk, f, side * 11.4, z - 4.2, 5.5, rand);
      }
    }
    if (rand() < 0.4) addProp(chunk, f, 'busstop', 12.8, 54, rand, (parent) => kit.addBusStop(parent, 1, 54));
    if (rand() < 0.4) addProp(chunk, f, 'busstop', -12.8, 46, rand, (parent) => kit.addBusStop(parent, -1, 46));
    addProp(chunk, f, 'bin', -11.7, 34, rand, (parent) => kit.addBin(parent, -1, 34));
    addProp(chunk, f, 'bin', 11.7, 34, rand, (parent) => kit.addBin(parent, 1, 34));
    addProp(chunk, f, 'hydrant', 11.5, 72, rand, (parent) => kit.addHydrant(parent, 1, 72));
    addProp(chunk, f, 'sign', -11.7, 78, rand, (parent) => kit.addSignPost(parent, -1, 78));
    addProp(chunk, f, 'sign', 11.7, 86, rand, (parent) => kit.addSignPost(parent, 1, 86));
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
  const shopBuilder = (f, side, rand) => (style.lowrise === 'shophouse' ? kit.addShophouse(f, side, 0, rand) : styles.build(style.lowrise, f, side, 0, rand));
  const residentialBuilder = (f, side, rand) => {
    if (style.residential === 'aurelia' || style.lowrise === 'aurelia') return shopBuilder(f, side, rand);
    if (style.residential === 'tower') return towerBuilder('hdb', -4, false)(f, side, rand);
    return shopBuilder(f, side, rand);
  };

  function styleFor(kind, edge, rand) {
    if (style.lowrise === 'aurelia') {
      if (kind === 'downtown' || kind === 'civic') return (f, side, r) => styles.build('aureliaSpire', f, side, 0, r);
      return shopBuilder;
    }
    switch (kind) {
      case 'downtown': return towerBuilder((r) => (r() < 0.65 ? 'glass' : 'concrete'), style.downtownBoost, true);
      case 'shophouse': return shopBuilder;
      case 'residential': return residentialBuilder;
      case 'mixed': return edge === 'N' || edge === 'S' ? towerBuilder(null, 6, true) : shopBuilder;
      default: return rand() < 0.5 ? shopBuilder : towerBuilder(null, 0, true);
    }
  }

  function centreTowers(g, kind, rand) {
    if (style.lowrise === 'aurelia') {
      const crystal = [0x6ec8c0, 0x8a6ad4, 0x4aa8d8, 0xb07cff];
      const two = rand() > 0.35;
      for (const dx of two ? [-16, 16] : [0]) {
        const w = two ? 18 + rand() * 8 : 28 + rand() * 10;
        const d = 20 + rand() * 16;
        const h = 55 + style.downtownBoost + rand() * 70;
        const tint = crystal[Math.floor(rand() * crystal.length)];
        walls(g, 'glass', tint, P / 2 + dx, h / 2, P / 2, w, h, d);
        box(g, M.metal, P / 2 + dx, h + 0.4, P / 2, w * 0.55, 0.8, d * 0.55);
        // Floating ring crown
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(Math.min(w, d) * 0.28, 0.45, 8, 24),
          new THREE.MeshStandardMaterial({ color: 0xc9f6ff, emissive: 0x4fe0ff, emissiveIntensity: 0.7, roughness: 0.35, metalness: 0.6 })
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.set(P / 2 + dx, h + 3.2, P / 2);
        g.add(ring);
      }
      return;
    }
    const profile = {
      downtown: ['glass', 50 + style.downtownBoost, 80], civic: ['concrete', 26, 36], mixed: ['concrete', 34, 44], shophouse: ['concrete', 12, 10], residential: style.residential === 'tower' ? ['hdb', 30, 34] : ['concrete', 12, 10]
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

  function parkInterior(chunk, g, rand) {
    plane(g, parkMat, FACE, P - FACE, FACE, P - FACE, SIDEWALK_Y + 0.01, 6);
    const pw = 26 + rand() * 12; const pd = 20 + rand() * 10;
    const px = P / 2 + (rand() - 0.5) * 20; const pz = P / 2 + (rand() - 0.5) * 20;
    box(g, M.planter, px, 0.2, pz, pw + 1.6, 0.3, pd + 1.6);
    plane(g, pondMat, px - pw / 2, px + pw / 2, pz - pd / 2, pz + pd / 2, SIDEWALK_Y + 0.2, 10);
    for (let n = 0; n < 16; n++) {
      const x = 17 + rand() * (P - 34); const z = 17 + rand() * (P - 34);
      if (Math.abs(x - px) < pw / 2 + 3 && Math.abs(z - pz) < pd / 2 + 3) continue;
      treeOrPalm(chunk, g, x, z, rand);
    }
  }

  function hedgeRing(chunk, g, rand) {
    for (const e of Object.values(EDGES)) {
      const f = frame(g, e.x, e.z, e.yaw);
      for (let z = 14; z < P - 20; z += 6) hedge(chunk, f, e.side * (FACE - 0.9), z, 5.6, rand);
      if (rand() > 0.3) { const z = 14 + rand() * 6; addProp(chunk, f, 'tree', e.side * (FACE + 2.5), z, rand, (parent, r) => kit.addRainTree(parent, e.side * (FACE + 2.5), z, r)); }
      if (rand() > 0.3) { const z = P - 20 - rand() * 6; addProp(chunk, f, 'palm', e.side * (FACE + 2.5), z, rand, (parent, r) => kit.addPalm(parent, e.side * (FACE + 2.5), z, r)); }
    }
  }

  function buildBlock(chunk, g, cell, rand) {
    const { kind } = cell;
    const face = blockFace();
    plane(g, walkMat, face * 0.75, P - face * 0.75, face * 0.75, P - face * 0.75, SIDEWALK_Y, 2);
    // Keep kerbs near the road; on organic layouts the asphalt ribbon already reads the bend.
    if (!usesOrganicLayout(currentCity())) {
      box(g, curbMat, 7.78, 0.02, P / 2, 0.5, 0.2, P - 15.5);
      box(g, curbMat, P - 7.78, 0.02, P / 2, 0.5, 0.2, P - 15.5);
      box(g, curbMat, P / 2, 0.02, 7.78, P - 15.5, 0.2, 0.5);
      box(g, curbMat, P / 2, 0.02, P - 7.78, P - 15.5, 0.2, 0.5);
    }
    if (kind === 'park') {
      parkInterior(chunk, g, rand);
      hedgeRing(chunk, g, rand);
      return;
    }
    if (kind === 'landmark') {
      const lm = cell.landmark;
      const e = EDGES[lm.face];
      const f = frame(g, e.x, e.z, e.yaw);
      plane(g, walkMat, face, P - face, face, P - face, SIDEWALK_Y + 0.01, 2);
      const model = buildLandmark(lm.id);
      model.position.set(e.side * (face - 3.5), 0, P / 2);
      if (e.side > 0) model.rotation.y = Math.PI;
      f.add(model);
      for (const [a, b] of [[0, 0], [0, 1], [1, 0], [1, 1]]) {
        const x = face + 4 + a * (P - face * 2 - 8); const z = face + 4 + b * (P - face * 2 - 8);
        treeOrPalm(chunk, g, x, z, rand);
      }
      hedgeRing(chunk, g, rand);
      return;
    }
    for (const [name, e] of Object.entries(EDGES)) {
      const f = frame(g, e.x, e.z, e.yaw);
      const alongNS = name === 'N' || name === 'S';
      // East and west fronts keep clear of the corners the north and south fronts occupy
      const pad = Math.max(face, 34);
      frontage(f, e.side, alongNS ? face : pad, alongNS ? P - face : P - pad, rand, styleFor(kind, name, rand));
    }
    centreTowers(g, kind, rand);
  }

  function buildQuay(g, i, j) {
    const seaWall = (x, z, w, d) => box(g, M.concrete, x, 0.15, z, w, 0.9, d);
    const zEnd = j < GRID ? P - ROAD_HALF : WALK_OUTER;
    if (i === 0) {
      const z0 = j === 0 ? -WALK_OUTER : -ROAD_HALF;
      plane(g, walkMat, -WALK_OUTER, -ROAD_HALF, z0, zEnd, SIDEWALK_Y, 2);
      seaWall(-(WALK_OUTER + 0.5), (z0 + zEnd) / 2, 1, zEnd - z0 + 1);
    }
    if (i === GRID) {
      const z0 = j === 0 ? -WALK_OUTER : -ROAD_HALF;
      plane(g, walkMat, ROAD_HALF, WALK_OUTER, z0, zEnd, SIDEWALK_Y, 2);
      seaWall(WALK_OUTER + 0.5, (z0 + zEnd) / 2, 1, zEnd - z0 + 1);
    }
    if (j === 0) {
      const x1 = i < GRID ? P - ROAD_HALF : ROAD_HALF;
      plane(g, walkMat, -ROAD_HALF, x1, -WALK_OUTER, -ROAD_HALF, SIDEWALK_Y, 2);
      seaWall((x1 - ROAD_HALF) / 2, -(WALK_OUTER + 0.5), x1 + ROAD_HALF, 1);
    }
    if (j === GRID) {
      const x1 = i < GRID ? P - ROAD_HALF : ROAD_HALF;
      plane(g, walkMat, -ROAD_HALF, x1, ROAD_HALF, WALK_OUTER, SIDEWALK_Y, 2);
      seaWall((x1 - ROAD_HALF) / 2, WALK_OUTER + 0.5, x1 + ROAD_HALF, 1);
    }
  }

  function buildChunk(i, j) {
    const city = currentCity();
    const wrap = !!city.wrap;
    const organic = usesOrganicLayout(city);
    const ci = wrap ? wrapIndex(i) : i;
    const cj = wrap ? wrapIndex(j) : j;
    const g = new THREE.Group();
    g.position.set(i * P, 0, j * P);
    g.userData.chunkOrigin = { x: i * P, z: j * P };
    const rand = lcg(seedOf(ci, cj));
    const chunk = { g, i, j, peds: [], props: [], ranges: new Map(), n: 0, key: `${i},${j}` };
    const east = wrap || i < GRID;
    const south = wrap || j < GRID;
    const north = wrap || j > 0;
    const west = wrap || i > 0;
    const crossY = organic ? groundHeight(avenueX(i, j * P, city), j * P) : 0;
    const face = blockFace();

    if (organic) {
      // Underlay extends past max road bend so the sea never shows through.
      const pad = ROAD_HALF + 16;
      plane(g, parkMat, -pad, east ? P + pad : pad, -pad, south ? P + pad : pad, -0.18, 12);
      const toLocal = (pts) => pts.map((p) => ({ x: p.x - i * P, y: p.y, z: p.z - j * P }));
      const cross = new THREE.Mesh(new THREE.CircleGeometry(ROAD_HALF + 1.4, 24), asphaltMat);
      cross.rotation.x = -Math.PI / 2;
      cross.position.set(avenueX(i, j * P, city) - i * P, crossY + 0.02, streetZ(j, i * P, city) - j * P);
      cross.receiveShadow = true;
      cross.userData.organicRoad = true;
      g.add(cross);
      const paintLaneMarks = (pts) => {
        // Centre + mid separators + edges so bent stretches stay easy to follow.
        const mids = ROAD_HALF * 0.5;
        for (const lat of [0, -mids, mids, -(ROAD_HALF - 0.75), ROAD_HALF - 0.75]) {
          const offset = pts.map((p, idx) => {
            const prev = pts[Math.max(0, idx - 1)];
            const next = pts[Math.min(pts.length - 1, idx + 1)];
            const tx = next.x - prev.x; const tz = next.z - prev.z;
            const len = Math.hypot(tx, tz) || 1;
            const sx = -tz / len; const sz = tx / len;
            return { x: p.x + sx * lat, y: p.y, z: p.z + sz * lat };
          });
          const mark = addRibbon(g, lineMat, offset, lat === 0 ? 0.1 : 0.11, 0.04);
          mark.userData.organicRoad = true;
        }
      };
      if (south) {
        const pts = toLocal(sampleAvenueRibbon(i, j * P, (j + 1) * P, 16, city));
        const ribbon = addRibbon(g, asphaltMat, pts, ROAD_HALF, 0.02);
        ribbon.userData.organicRoad = true;
        paintLaneMarks(pts);
      }
      if (east) {
        const pts = toLocal(sampleStreetRibbon(j, i * P, (i + 1) * P, 16, city));
        const ribbon = addRibbon(g, asphaltMat, pts, ROAD_HALF, 0.02);
        ribbon.userData.organicRoad = true;
        paintLaneMarks(pts);
      }
    } else {
      plane(g, asphaltMat, -ROAD_HALF, east ? P - ROAD_HALF : ROAD_HALF, -ROAD_HALF, ROAD_HALF, -0.04, 8);
      if (south) plane(g, asphaltMat, -ROAD_HALF, ROAD_HALF, ROAD_HALF, P - ROAD_HALF, -0.04, 8);
    }

    const arms = [[south, 0], [north, Math.PI], [east, Math.PI / 2], [west, -Math.PI / 2]];
    for (const [exists, yaw] of arms) {
      if (!exists) continue;
      if (organic) {
        const f = frame(g, avenueX(i, j * P, city) - i * P, 0, yaw);
        f.position.y = crossY;
        kit.addTrafficSignals(f, face - 0.8);
      } else {
        kit.addTrafficSignals(frame(g, 0, 0, yaw), FACE - 0.8);
      }
    }
    if (south) decorateArm(chunk, g, 0, rand);
    if (east) decorateArm(chunk, g, Math.PI / 2, rand);
    if (east && south) {
      buildBlock(chunk, g, cellInfo(ci, cj), rand);
      if (organic) {
        // Seat buildings / props on the hill. Ground planes and road ribbons already bake height.
        for (const child of [...g.children]) {
          if (child.userData?.organicRoad || child.userData?.hillLifted) continue;
          const wx = i * P + child.position.x;
          const wz = j * P + child.position.z;
          child.position.y += groundHeight(wx, wz);
          child.userData.hillLifted = true;
        }
      }
    }
    if (!wrap) buildQuay(g, i, j);
    mergeStatics(g, chunk.ranges);
    g.updateMatrixWorld(true);
    root.add(g);
    return chunk;
  }

  function dropChunk(key) {
    const chunk = chunks.get(key);
    cars.removeChunk(key);
    if (chunk.bentMeshes) {
      for (const mesh of chunk.bentMeshes) {
        if (mesh.parent) mesh.parent.remove(mesh);
        mesh.geometry?.dispose?.();
      }
    }
    if (chunk.g?.parent) root.remove(chunk.g);
    chunk.g?.traverse((o) => { if (o.userData.merged && o.geometry) o.geometry.dispose(); });
    disposeLandmarks(chunk.g);
    for (let k = planetPeds.length - 1; k >= 0; k--) {
      if (planetPeds[k].chunkKey !== key) continue;
      const ped = planetPeds[k].ped;
      if (ped.parent) ped.parent.remove(ped);
      planetPeds.splice(k, 1);
    }
    chunks.delete(key);
  }

  const worldSize = () => GRID * P;
  const wrapDelta = (a, b) => {
    let d = a - b;
    if (currentCity().wrap) {
      const size = worldSize();
      d -= size * Math.round(d / size);
    }
    return d;
  };
  const distanceTo = (i, j, px, pz) => {
    const x0 = i * P - 8; const z0 = j * P - 8;
    if (!currentCity().wrap) {
      return Math.hypot(Math.max(x0 - px, 0, px - x0 - P), Math.max(z0 - pz, 0, pz - z0 - P));
    }
    // Treat the pocket planet as a torus so edge blocks stay near when the car wraps.
    const size = worldSize();
    let best = Infinity;
    for (const ox of [-size, 0, size]) {
      for (const oz of [-size, 0, size]) {
        const d = Math.hypot(
          Math.max(x0 + ox - px, 0, px - x0 - ox - P),
          Math.max(z0 + oz - pz, 0, pz - z0 - oz - P)
        );
        if (d < best) best = d;
      }
    }
    return best;
  };

  // Sphere-net: keep the globe shell resident; stream + bend city tiles as you drive/fly.
  function ensurePlanetShell() {
    if (planetReady) return;
    planetMode = true;
    cars.markPlanetSkip?.(true);
    sea.visible = false;
    if (sea.parent) sea.parent.remove(sea);
    const styleSea = style.sea ?? currentCity().style?.sea ?? 0x14283a;
    ensurePlanetDecor(root, { radius: planetRadius(), coreColor: styleSea });
    updatePlanetVisuals(root, { time: Date.now() / 1000, altitude: 0 });
    planetReady = true;
  }

  function bendChunk(chunk) {
    if (chunk.bent) return;
    const tmp = new THREE.Vector3();
    for (const ped of chunk.peds) {
      ped.updateWorldMatrix(true, false);
      ped.getWorldPosition(tmp);
      const data = ped.userData.ped;
      planetPeds.push({
        ped,
        x: tmp.x,
        z0: data.z0,
        dir: data.dir,
        speed: data.speed,
        phase: data.phase,
        legs: data.legs,
        arms: data.arms,
        chunkKey: chunk.key
      });
      ped.userData.planetSkipBend = true;
      if (ped.parent) ped.parent.remove(ped);
      root.add(ped);
    }
    chunk.peds.length = 0;
    chunk.bentMeshes = projectChunkToSphere(root, chunk.g, planetRadius());
    chunk.bent = true;
    // Empty transform group can go; meshes live on root.
    if (chunk.g.parent) chunk.g.parent.remove(chunk.g);
  }

  function update(px, pz, time, budget = 1, alt = 0) {
    const city = currentCity();
    const wrap = !!(city.planet || city.wrap);
    if (city.planet) ensurePlanetShell();

    const LOAD = city.planet ? planetLoadRadius(alt) : loadRadius(alt);
    // Climbing shrinks LOAD — unload sooner so bent meshes are freed before orbit.
    const UNLOAD = LOAD + (city.planet && alt > 120 ? UNLOAD_PAD * 0.45 : UNLOAD_PAD);
    lastLoad = LOAD;
    const wanted = [];
    const i0 = Math.floor(px / P);
    const j0 = Math.floor(pz / P);
    const span = Math.ceil(LOAD / P) + 1;
    for (let di = -span; di <= span; di++) {
      for (let dj = -span; dj <= span; dj++) {
        let i = i0 + di;
        let j = j0 + dj;
        if (wrap) {
          i = wrapIndex(i);
          j = wrapIndex(j);
        } else if (i < 0 || j < 0 || i > GRID || j > GRID) continue;
        const key = `${i},${j}`;
        const dist = distanceTo(i, j, px, pz);
        if (!chunks.has(key) && dist < LOAD) wanted.push({ i, j, key, dist });
      }
    }
    wanted.sort((a, b) => a.dist - b.dist);
    // High flight: build slowly — the shell already fills the view; flooding bend kills WebGL.
    const buildN = budget === Infinity
      ? Infinity
      : Math.max(
        budget,
        city.planet
          ? (alt > 180 ? 1 : alt > 80 ? 2 : 4)
          : (alt > 40 ? 8 : 2)
      );
    for (let n = 0; n < wanted.length && n < buildN; n++) {
      if (city.planet && chunks.size >= PLANET_CHUNK_CAP) break;
      const chunk = buildChunk(wanted[n].i, wanted[n].j);
      chunks.set(wanted[n].key, chunk);
      if (city.planet) bendChunk(chunk);
    }
    for (const [key, chunk] of [...chunks]) {
      if (distanceTo(chunk.i, chunk.j, px, pz) > UNLOAD) dropChunk(key);
    }
    // Safety: if climb left us over budget, drop the farthest bent tiles first.
    if (city.planet && chunks.size > PLANET_CHUNK_CAP) {
      const ranked = [...chunks.entries()]
        .map(([key, chunk]) => ({ key, dist: distanceTo(chunk.i, chunk.j, px, pz) }))
        .sort((a, b) => b.dist - a.dist);
      for (const entry of ranked) {
        if (chunks.size <= PLANET_CHUNK_CAP) break;
        dropChunk(entry.key);
      }
    }

    if (city.planet) {
      sea.visible = false;
      updatePlanetVisuals(root, { time, altitude: alt });
    } else {
      sea.visible = true;
      seaTex.offset.set(px / 10 + time * 0.01, -pz / 10);
      sea.position.x = px;
      sea.position.z = pz;
    }
    animatePeds(px, pz, time);
  }

  // Pedestrians walk as a pure function of the shared clock, so everyone sees them in the same place.
  function animatePeds(px, pz, time) {
    if (planetMode) {
      const zMin = 24; const span = P - 48;
      for (const entry of planetPeds) {
        const z = zMin + ((((entry.z0 - zMin + entry.dir * entry.speed * time) % span) + span) % span);
        // Keep a simple local heading along the road (+z in the original frame ≈ north).
        placeObjectOnSphere(entry.ped, entry.x, 0, z, entry.dir > 0 ? 0 : Math.PI);
        const swing = Math.sin(time * entry.speed * 4.5 + entry.phase) * 0.7;
        entry.legs[0].rotation.x = swing; entry.legs[1].rotation.x = -swing;
        entry.arms[0].rotation.x = -swing * 0.8; entry.arms[1].rotation.x = swing * 0.8;
      }
      return;
    }
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
    update(px, pz, time, Infinity, 0);
    animatePeds(px, pz, time);
  }

  function clear() {
    for (const key of [...chunks.keys()]) dropChunk(key);
    for (const entry of planetPeds) {
      if (entry.ped.parent) entry.ped.parent.remove(entry.ped);
    }
    planetPeds.length = 0;
    disposePlanet(root);
    // Bent meshes were reparented to root — dispose leftovers.
    for (const child of [...root.children]) {
      if (child === sea || child.userData?.planetCore) continue;
      root.remove(child);
      child.traverse((o) => {
        if (o.userData?.merged && o.geometry) o.geometry.dispose();
        else if (o.geometry && o.userData?.sphereBent) o.geometry.dispose();
      });
    }
    effects.clear();
    cars.clear();
    broken.clear();
    planetReady = false;
    planetMode = false;
    lastLoad = BASE_LOAD;
    stats.props = 0; stats.peds = 0; stats.cars = 0;
  }

  function setStyle(next) {
    style = { lowrise: 'shophouse', residential: 'tower', downtownBoost: 24, ...next };
    seaMat.color.setHex(style.sea ?? 0x4c93b5);
    pondMat.color.setHex(style.pond ?? 0x4c93b5);
    parkMat.color.setHex(style.park ?? 0x86a97d);
    if (style.asphalt != null) asphaltMat.color.setHex(style.asphalt);
    if (style.walk != null) walkMat.color.setHex(style.walk);
    sea.visible = !currentCity().wrap;
  }

  function setVisible(on) {
    root.visible = on;
    if (!on) clear();
  }

  function breakProp(prop, dirx, dirz, speed) {
    const { spec } = prop;
    broken.add(prop.id);
    stats.props++;
    for (const { mesh, start, count } of prop.chunk.ranges.get(prop.id) || []) {
      mesh.geometry.index.array.fill(0, start, start + count);
      mesh.geometry.index.needsUpdate = true;
    }
    prop.broken = true;
    effects.wreck({ frame: prop.f, build: prop.build, x: prop.lx, z: prop.lz, dirx, dirz, speed, mode: spec.mode });
    effects.burst(prop.x, 0.8, prop.z, spec.colors, 12, 5 + Math.min(speed, 20) * 0.3, dirx, dirz);
  }

  const pedPos = new THREE.Vector3();

  // Checks the player's car (three circles along its length) against fixtures, pedestrians and traffic; returns a push-out, new speed and shake.
  function interact(p) {
    const onPlanet = !!currentCity().planet;
    const dirx = Math.sin(p.heading);
    const dirz = onPlanet ? Math.cos(p.heading) : -Math.cos(p.heading);
    const sign = p.speed >= 0 ? 1 : -1;
    const radius = 0.95;
    const centres = [-1.5, 0, 1.5].map((o) => ({ x: p.x + dirx * o, z: p.z + dirz * o }));
    let dx = 0; let dz = 0; let speed = p.speed; let shake = 0;
    for (const chunk of chunks.values()) {
      if (distanceTo(chunk.i, chunk.j, p.x, p.z) > 8) continue;
      for (const prop of chunk.props) {
        if (prop.broken || Math.abs(wrapDelta(prop.x, p.x)) > 7 || Math.abs(wrapDelta(prop.z, p.z)) > 7) continue;
        const { spec } = prop;
        const cos = Math.cos(prop.yaw); const sin = Math.sin(prop.yaw);
        for (const c of centres) {
          const rx = wrapDelta(c.x, prop.x); const rz = wrapDelta(c.z, prop.z);
          const a = rx * cos - rz * sin; const b = rx * sin + rz * cos;
          const ex = a - Math.max(-spec.hx, Math.min(spec.hx, a));
          const ez = b - Math.max(-spec.hz, Math.min(spec.hz, b));
          const d = Math.hypot(ex, ez);
          if (d >= radius) continue;
          if (Math.abs(speed) >= spec.min) {
            breakProp(prop, dirx * sign, dirz * sign, Math.abs(speed));
            // Hypercar speeds smash a prop every few metres. Stacked drag + shake reads as a
            // mid-road "bounce" (racing has no street furniture, so it stays smooth).
            if (Math.abs(speed) > 55) {
              // Purely cosmetic — break the prop, keep speed/camera steady.
            } else if (Math.abs(speed) > 40) {
              speed *= Math.max(spec.drag, 0.985);
              shake = Math.max(shake, Math.min(0.12, Math.abs(speed) * 0.004));
            } else {
              speed *= spec.drag;
              shake = Math.max(shake, Math.min(0.45, Math.abs(speed) * 0.02));
            }
          } else {
            // Too slow to knock it over: it acts as a solid obstacle and the car is pushed back out
            const nx = d > 1e-4 ? (ex * cos + ez * sin) / d : -dirx * sign;
            const nz = d > 1e-4 ? (-ex * sin + ez * cos) / d : -dirz * sign;
            dx += nx * (radius - d); dz += nz * (radius - d);
            if (speed * (nx * dirx + nz * dirz) < 0) speed *= 0.3;
          }
          break;
        }
      }
      if (Math.abs(speed) > 1.5) {
        for (let k = chunk.peds.length - 1; k >= 0; k--) {
          const ped = chunk.peds[k];
          ped.getWorldPosition(pedPos);
          if (!centres.some((c) => Math.hypot(wrapDelta(c.x, pedPos.x), wrapDelta(c.z, pedPos.z)) < radius + 0.4)) continue;
          chunk.peds.splice(k, 1);
          broken.add(ped.userData.id);
          stats.peds++;
          const power = Math.abs(speed);
          effects.knockPed(ped, dirx * sign * power * 0.8 + (Math.random() - 0.5) * 3, dirz * sign * power * 0.8 + (Math.random() - 0.5) * 3, 3 + power * 0.18);
          effects.burst(pedPos.x, 1, pedPos.z, PED_COLORS, 6, 4, dirx * sign, dirz * sign);
          if (Math.abs(speed) <= 55) {
            speed *= 0.97;
            shake = Math.max(shake, 0.15);
          }
        }
      }
    }
    const hit = cars.collidePlayer({ x: p.x, z: p.z, heading: p.heading, speed });
    return { dx: dx + hit.dx, dz: dz + hit.dz, speed: hit.speed, shake: Math.max(shake, hit.shake) };
  }

  function animate(delta, player) {
    effects.update(delta);
    cars.update(delta, player);
  }

  return {
    update,
    prefill,
    clear,
    setVisible,
    setStyle,
    interact,
    animate,
    stats,
    root,
    get loaded() { return chunks.size; },
    get loadHorizon() { return lastLoad; },
    get isPlanet() { return planetMode; },
    get radius() { return planetMode ? planetRadius() : 0; },
    get constructionRadius() { return lastLoad; },
    sunDirs: () => planetSunDirs(root)
  };
}
