// Street-view polish for Real map packs: textured surfaces, windowed facades, sidewalks,
// lane paint and street props laid over the baked OSM meshes / extras. Pure client-side —
// does not change pack format or re-run osm-city conversion.
import * as THREE from './vendor/three/three.module.min.js';
import {
  asphaltTexture, grassTexture, paverTexture, waterTexture, zebraTexture,
  makeFacadeMaps, lcg, mergeStatics
} from './city-gfx.js';

const METERS_PER_UV = 8;
const SIDEWALK_W = 2.4;
const MAX_LAMPS = 420;
const MAX_TREES = 280;
const MAX_ZEBRAS = 48;
const MAX_DASHES = 2200;

function projectFlatUVs(geometry, scale = METERS_PER_UV) {
  const pos = geometry.attributes.position;
  const uvs = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uvs[i * 2] = pos.getX(i) / scale;
    uvs[i * 2 + 1] = pos.getZ(i) / scale;
  }
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
}

function projectBuildingUVs(geometry, tileW, tileH) {
  const pos = geometry.attributes.position;
  const nor = geometry.attributes.normal;
  const uvs = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i); const y = pos.getY(i); const z = pos.getZ(i);
    const nx = Math.abs(nor.getX(i)); const ny = Math.abs(nor.getY(i)); const nz = Math.abs(nor.getZ(i));
    if (ny >= nx && ny >= nz) {
      uvs[i * 2] = x / tileW;
      uvs[i * 2 + 1] = z / tileH;
    } else if (nx >= nz) {
      uvs[i * 2] = z / tileW;
      uvs[i * 2 + 1] = y / tileH;
    } else {
      uvs[i * 2] = x / tileW;
      uvs[i * 2 + 1] = y / tileH;
    }
  }
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
}

function emptyBucket() { return { pos: [], nor: [], col: [], idx: [] }; }

function pushTri(bucket, pos, nor, col, ai, bi, ci) {
  const base = bucket.pos.length / 3;
  for (const vi of [ai, bi, ci]) {
    bucket.pos.push(pos.getX(vi), pos.getY(vi), pos.getZ(vi));
    bucket.nor.push(nor.getX(vi), nor.getY(vi), nor.getZ(vi));
    if (col) bucket.col.push(col.getX(vi), col.getY(vi), col.getZ(vi));
  }
  bucket.idx.push(base, base + 1, base + 2);
}

function toGeo(bucket, hasColor) {
  if (!bucket.idx.length) return null;
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(bucket.pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(bucket.nor, 3));
  if (hasColor) g.setAttribute('color', new THREE.Float32BufferAttribute(bucket.col, 3));
  g.setIndex(bucket.idx);
  return g;
}

/**
 * Split a building mesh into low walls / tower walls / roofs by normals + height.
 * Optional `keepTri(ax,az,bx,bz,cx,cz)` drops triangles whose footprint sits on a road
 * so asphalt is not buried inside OSM multipolygons that swallow streets.
 */
function splitWallsAndRoofs(geometry, towerH = 28, keepTri = null) {
  const pos = geometry.attributes.position;
  const nor = geometry.attributes.normal;
  const col = geometry.attributes.color;
  const index = geometry.index;
  const low = emptyBucket();
  const tower = emptyBucket();
  const roof = emptyBucket();
  const triCount = index ? index.count / 3 : pos.count / 3;
  for (let t = 0; t < triCount; t++) {
    const a = index ? index.getX(t * 3) : t * 3;
    const b = index ? index.getX(t * 3 + 1) : t * 3 + 1;
    const c = index ? index.getX(t * 3 + 2) : t * 3 + 2;
    if (keepTri && !keepTri(pos.getX(a), pos.getZ(a), pos.getX(b), pos.getZ(b), pos.getX(c), pos.getZ(c))) {
      continue;
    }
    const ny = (nor.getY(a) + nor.getY(b) + nor.getY(c)) / 3;
    if (Math.abs(ny) > 0.55) {
      pushTri(roof, pos, nor, col, a, b, c);
      continue;
    }
    const maxY = Math.max(pos.getY(a), pos.getY(b), pos.getY(c));
    pushTri(maxY >= towerH ? tower : low, pos, nor, col, a, b, c);
  }
  return {
    walls: toGeo(low, !!col),
    towers: toGeo(tower, !!col),
    roofs: toGeo(roof, !!col)
  };
}

/** Spatial index of road segments so building triangles on asphalt can be punched out. */
function buildRoadIndex(roads, cell = 48) {
  const map = new Map();
  for (const r of roads || []) {
    for (let i = 0; i + 3 < r.p.length; i += 2) {
      const x1 = r.p[i]; const z1 = r.p[i + 1]; const x2 = r.p[i + 2]; const z2 = r.p[i + 3];
      const half = r.w * 0.5 + 0.35;
      const x0 = Math.min(x1, x2) - half; const x1b = Math.max(x1, x2) + half;
      const z0 = Math.min(z1, z2) - half; const z1b = Math.max(z1, z2) + half;
      const seg = { x1, z1, x2, z2, half };
      for (let cx = Math.floor(x0 / cell); cx <= Math.floor(x1b / cell); cx++) {
        for (let cz = Math.floor(z0 / cell); cz <= Math.floor(z1b / cell); cz++) {
          const key = `${cx},${cz}`;
          if (!map.has(key)) map.set(key, []);
          map.get(key).push(seg);
        }
      }
    }
  }
  const distToSeg = (x, z, seg) => {
    const dx = seg.x2 - seg.x1; const dz = seg.z2 - seg.z1;
    const len2 = dx * dx + dz * dz;
    if (len2 < 1e-6) return Math.hypot(x - seg.x1, z - seg.z1);
    let t = ((x - seg.x1) * dx + (z - seg.z1) * dz) / len2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(x - (seg.x1 + dx * t), z - (seg.z1 + dz * t));
  };
  const onRoad = (x, z) => {
    const list = map.get(`${Math.floor(x / cell)},${Math.floor(z / cell)}`);
    if (!list) return false;
    for (const seg of list) {
      if (distToSeg(x, z, seg) <= seg.half) return true;
    }
    return false;
  };
  return onRoad;
}

const FACADES_SAFE = { shophouse: 'shophouse', glass: 'glass', hdb: 'hdb', concrete: 'concrete' };

function facadeKindForCity(city) {
  // Prefer urban window tiles for real-map CBDs; shophouse reads too cottagey at city scale.
  const id = city?.id;
  if (id === 'singapore' || id === 'shanghai' || id === 'dubai') return 'hdb';
  if (id === 'newyork' || id === 'london' || id === 'tokyo') return 'concrete';
  const low = city?.style?.lowrise || 'hdb';
  if (low === 'tokyo' || low === 'brownstone' || low === 'terrace') return 'concrete';
  if (low === 'villa' || low === 'lilong' || low === 'shophouse') return 'hdb';
  return FACADES_SAFE[low] || 'hdb';
}

function roadSamples(roads, spacing, maxCount, preferNear = true) {
  const samples = [];
  for (const r of roads) {
    let carry = spacing * 0.35;
    for (let i = 0; i + 3 < r.p.length; i += 2) {
      const x1 = r.p[i]; const z1 = r.p[i + 1]; const x2 = r.p[i + 2]; const z2 = r.p[i + 3];
      const len = Math.hypot(x2 - x1, z2 - z1);
      if (len < 1) continue;
      const dx = (x2 - x1) / len; const dz = (z2 - z1) / len;
      let d = carry;
      while (d < len) {
        const t = d / len;
        const x = x1 + (x2 - x1) * t; const z = z1 + (z2 - z1) * t;
        samples.push({ x, z, dx, dz, w: r.w, dist: Math.hypot(x, z) });
        d += spacing;
      }
      carry = d - len;
    }
  }
  if (preferNear) samples.sort((a, b) => a.dist - b.dist);
  return samples.slice(0, maxCount);
}

function appendRibbon(pos, nor, idx, x1, z1, x2, z2, halfW, y) {
  const len = Math.hypot(x2 - x1, z2 - z1);
  if (len < 0.4) return;
  const nx = (-(z2 - z1) / len) * halfW; const nz = ((x2 - x1) / len) * halfW;
  const base = pos.length / 3;
  // CCW when viewed from +Y so FrontSide faces up with normal (0,1,0).
  const corners = [
    [x1 - nx, y, z1 - nz], [x1 + nx, y, z1 + nz],
    [x2 + nx, y, z2 + nz], [x2 - nx, y, z2 - nz]
  ];
  for (const p of corners) {
    pos.push(p[0], p[1], p[2]);
    nor.push(0, 1, 0);
  }
  idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
}

function ribbonMesh(pos, nor, idx, material, name) {
  if (!idx.length) return null;
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setIndex(idx);
  projectFlatUVs(g, 4);
  g.computeBoundingSphere();
  const mesh = new THREE.Mesh(g, material);
  mesh.name = name;
  mesh.receiveShadow = true;
  return mesh;
}

/**
 * Dress a loaded real-map group with street-view detail.
 * Mutates pack meshes' materials/UVs and returns a disposable detail Group (props + overlays).
 */
export function dressRealCity(packGroup, extras, { city } = {}) {
  const detail = new THREE.Group();
  detail.name = 'real-detail';
  const own = [];
  const track = (tex) => { own.push(tex); return tex; };
  const style = city?.style || {};
  const parkColor = style.park ?? 0x86a97d;
  const seaColor = style.sea ?? 0x4c93b5;
  const asphaltColor = style.asphalt ?? 0x4a5054;

  const asphaltMap = track(asphaltTexture());
  asphaltMap.repeat.set(1, 1);
  const grassMap = track(grassTexture());
  const paverMap = track(paverTexture());
  const waterMap = track(waterTexture());
  const kind = facadeKindForCity(city);
  const facade = makeFacadeMaps(kind);
  const glassFacade = makeFacadeMaps('glass');
  own.push(facade.map, facade.emissive, glassFacade.map, glassFacade.emissive);

  const ownMat = (material) => {
    material.userData.realLookOwned = true;
    own.push(material);
    return material;
  };
  const mats = {
    ground: ownMat(new THREE.MeshStandardMaterial({ map: grassMap, color: 0x9bb089, roughness: 0.96 })),
    parks: ownMat(new THREE.MeshStandardMaterial({ map: grassMap, color: new THREE.Color(parkColor), roughness: 0.95 })),
    water: ownMat(new THREE.MeshStandardMaterial({
      map: waterMap, color: new THREE.Color(seaColor), roughness: 0.18, metalness: 0.22, envMapIntensity: 1.3
    })),
    roads: ownMat(new THREE.MeshStandardMaterial({
      map: asphaltMap, color: new THREE.Color(asphaltColor), roughness: 0.9, metalness: 0.04
    })),
    walls: ownMat(new THREE.MeshStandardMaterial({
      map: facade.map, color: 0xffffff, vertexColors: true, roughness: 0.82,
      metalness: 0.02, envMapIntensity: 0.45,
      emissive: 0xffffff, emissiveMap: facade.emissive, emissiveIntensity: 0
    })),
    towers: ownMat(new THREE.MeshStandardMaterial({
      map: glassFacade.map, color: 0xffffff, vertexColors: true, roughness: 0.28,
      metalness: 0.32, envMapIntensity: 1.25,
      emissive: 0xffffff, emissiveMap: glassFacade.emissive, emissiveIntensity: 0
    })),
    roofs: ownMat(new THREE.MeshStandardMaterial({
      color: 0x6a6e72, vertexColors: true, roughness: 0.92, metalness: 0.05
    })),
    walk: ownMat(new THREE.MeshStandardMaterial({
      map: paverMap, color: 0xe8e2d4, roughness: 0.92, side: THREE.DoubleSide
    })),
    curb: ownMat(new THREE.MeshStandardMaterial({ color: 0xb9b3a4, roughness: 0.88, side: THREE.DoubleSide })),
    line: ownMat(new THREE.MeshStandardMaterial({
      color: 0xf7f4e4, roughness: 0.55, side: THREE.DoubleSide,
      polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2
    })),
    yellow: ownMat(new THREE.MeshStandardMaterial({
      color: 0xf0c64a, roughness: 0.55, side: THREE.DoubleSide,
      polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2
    })),
    zebra: ownMat(new THREE.MeshStandardMaterial({
      map: track(zebraTexture()), transparent: true, roughness: 0.8, depthWrite: false,
      polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3
    }))
  };

  // Punch building triangles that sit on asphalt so roads never visually cross solid pads.
  const onAsphalt = buildRoadIndex(extras.roads);
  const keepBuildingTri = (ax, az, bx, bz, cx, cz) => {
    const mx = (ax + bx + cx) / 3; const mz = (az + bz + cz) / 3;
    // Drop if the centroid or a majority of corners sit on a road ribbon.
    let hits = 0;
    if (onAsphalt(ax, az)) hits++;
    if (onAsphalt(bx, bz)) hits++;
    if (onAsphalt(cx, cz)) hits++;
    if (onAsphalt(mx, mz)) hits++;
    return hits < 2;
  };

  // Retexture / rebuild pack layers
  const replace = [];
  for (const child of [...packGroup.children]) {
    if (!child.isMesh) continue;
    const name = child.name;
    if (name === 'buildings') {
      const split = splitWallsAndRoofs(child.geometry, 28, keepBuildingTri);
      const addBuilding = (geo, material, meshName, tileW, tileH, roof) => {
        if (!geo) return;
        if (roof) projectFlatUVs(geo, tileW);
        else projectBuildingUVs(geo, tileW, tileH);
        geo.computeBoundingSphere();
        const mesh = new THREE.Mesh(geo, material);
        mesh.name = meshName;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        replace.push(mesh);
      };
      addBuilding(split.walls, mats.walls, 'buildings-walls', facade.tileW, facade.tileH, false);
      addBuilding(split.towers, mats.towers, 'buildings-towers', glassFacade.tileW, glassFacade.tileH, false);
      addBuilding(split.roofs, mats.roofs, 'buildings-roofs', facade.tileW, facade.tileH, true);
      packGroup.remove(child);
      child.geometry.dispose();
      child.material.dispose();
    } else if (mats[name]) {
      projectFlatUVs(child.geometry, name === 'roads' ? 6 : METERS_PER_UV);
      child.material.dispose();
      child.material = mats[name];
      child.receiveShadow = true;
      child.castShadow = false;
    }
  }
  for (const m of replace) packGroup.add(m);

  // Sidewalks + kerbs along roads (skip tiny service lanes so the overlay stays readable)
  const walkPos = []; const walkNor = []; const walkIdx = [];
  const curbPos = []; const curbNor = []; const curbIdx = [];
  for (const r of extras.roads || []) {
    if (r.w < 5.5) continue;
    const half = r.w / 2;
    for (let i = 0; i + 3 < r.p.length; i += 2) {
      const x1 = r.p[i]; const z1 = r.p[i + 1]; const x2 = r.p[i + 2]; const z2 = r.p[i + 3];
      const len = Math.hypot(x2 - x1, z2 - z1);
      if (len < 2) continue;
      const nx = -(z2 - z1) / len; const nz = (x2 - x1) / len;
      for (const s of [-1, 1]) {
        const ox = nx * (half + SIDEWALK_W * 0.55) * s;
        const oz = nz * (half + SIDEWALK_W * 0.55) * s;
        appendRibbon(walkPos, walkNor, walkIdx, x1 + ox, z1 + oz, x2 + ox, z2 + oz, SIDEWALK_W / 2, 0.125);
        const cx = nx * (half + 0.18) * s; const cz = nz * (half + 0.18) * s;
        appendRibbon(curbPos, curbNor, curbIdx, x1 + cx, z1 + cz, x2 + cx, z2 + cz, 0.28, 0.06);
      }
    }
  }
  const walkMesh = ribbonMesh(walkPos, walkNor, walkIdx, mats.walk, 'sidewalks');
  const curbMesh = ribbonMesh(curbPos, curbNor, curbIdx, mats.curb, 'kerbs');
  if (walkMesh) detail.add(walkMesh);
  if (curbMesh) detail.add(curbMesh);

  // Centre / edge lane paint (sit just above asphalt ribbons at y≈0.08)
  const linePos = []; const lineNor = []; const lineIdx = [];
  const yelPos = []; const yelNor = []; const yelIdx = [];
  let dashCount = 0;
  const paintY = 0.12;
  for (const r of extras.roads || []) {
    if (r.w < 6.5) continue;
    for (let i = 0; i + 3 < r.p.length; i += 2) {
      const x1 = r.p[i]; const z1 = r.p[i + 1]; const x2 = r.p[i + 2]; const z2 = r.p[i + 3];
      const len = Math.hypot(x2 - x1, z2 - z1);
      if (len < 4) continue;
      const dx = (x2 - x1) / len; const dz = (z2 - z1) / len;
      const nx = -dz; const nz = dx;
      if (r.w >= 9) {
        appendRibbon(yelPos, yelNor, yelIdx, x1 + nx * 0.14, z1 + nz * 0.14, x2 + nx * 0.14, z2 + nz * 0.14, 0.08, paintY);
        appendRibbon(yelPos, yelNor, yelIdx, x1 - nx * 0.14, z1 - nz * 0.14, x2 - nx * 0.14, z2 - nz * 0.14, 0.08, paintY);
      }
      let d = 2;
      while (d + 3 < len && dashCount < MAX_DASHES) {
        const t0 = d / len; const t1 = Math.min(1, (d + 3.4) / len);
        const ax = x1 + dx * len * t0; const az = z1 + dz * len * t0;
        const bx = x1 + dx * len * t1; const bz = z1 + dz * len * t1;
        if (r.w >= 9) {
          for (const lane of [-r.w * 0.22, r.w * 0.22]) {
            appendRibbon(linePos, lineNor, lineIdx, ax + nx * lane, az + nz * lane, bx + nx * lane, bz + nz * lane, 0.1, paintY);
            dashCount++;
          }
        } else {
          appendRibbon(linePos, lineNor, lineIdx, ax, az, bx, bz, 0.1, paintY);
          dashCount++;
        }
        d += 8;
      }
    }
  }
  const lineMesh = ribbonMesh(linePos, lineNor, lineIdx, mats.line, 'lane-dashes');
  const yelMesh = ribbonMesh(yelPos, yelNor, yelIdx, mats.yellow, 'centre-lines');
  if (lineMesh) detail.add(lineMesh);
  if (yelMesh) detail.add(yelMesh);

  // Occasional zebra crossings on wider roads
  const zebraSamples = roadSamples(extras.roads.filter((r) => r.w >= 9), 90, MAX_ZEBRAS);
  for (const s of zebraSamples) {
    const stripe = new THREE.Mesh(new THREE.PlaneGeometry(s.w * 0.92, 3.2), mats.zebra);
    stripe.rotation.x = -Math.PI / 2;
    stripe.rotation.z = Math.atan2(s.dx, s.dz);
    stripe.position.set(s.x, 0.098, s.z);
    stripe.receiveShadow = true;
    detail.add(stripe);
  }

  // Owned street props (no kit shared geos — safe to dispose with the real-map layer)
  const rand = lcg((city?.id || 'city').length * 911 + 17);
  const lampSamples = roadSamples(extras.roads, 22, MAX_LAMPS);
  const treeSamples = roadSamples(extras.roads.filter((r) => r.w >= 6), 34, MAX_TREES);
  const propRoot = new THREE.Group();
  propRoot.name = 'street-props';

  const poleMat = ownMat(new THREE.MeshStandardMaterial({ color: 0x39464b, roughness: 0.45, metalness: 0.55 }));
  const lampMat = ownMat(new THREE.MeshStandardMaterial({ color: 0xf2e9b0, roughness: 0.4, emissive: 0xf2e9b0, emissiveIntensity: 0.35 }));
  const trunkMat = ownMat(new THREE.MeshStandardMaterial({ color: 0x6b4f3a, roughness: 0.95 }));
  const leafMat = ownMat(new THREE.MeshStandardMaterial({ color: 0x3c8a52, roughness: 0.75 }));
  const leafDark = ownMat(new THREE.MeshStandardMaterial({ color: 0x2f5a30, roughness: 0.8 }));
  const poleGeo = new THREE.CylinderGeometry(1, 1, 1, 6);
  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const sphereGeo = new THREE.SphereGeometry(1, 8, 6);
  own.push({ dispose() { poleGeo.dispose(); boxGeo.dispose(); sphereGeo.dispose(); } });

  const share = (mesh) => { mesh.userData.sharedGeometry = true; return mesh; };

  const addOwnedLamp = (parent, side) => {
    const g = new THREE.Group();
    const base = share(new THREE.Mesh(poleGeo, poleMat));
    base.position.y = 0.25; base.scale.set(0.2, 0.5, 0.2); g.add(base);
    const post = share(new THREE.Mesh(poleGeo, poleMat));
    post.position.y = 3.6; post.scale.set(0.09, 6.2, 0.09); g.add(post);
    const arm = share(new THREE.Mesh(boxGeo, poleMat));
    arm.position.set(-side * 0.9, 6.55, 0); arm.scale.set(1.8, 0.09, 0.09); g.add(arm);
    const head = share(new THREE.Mesh(boxGeo, poleMat));
    head.position.set(-side * 1.85, 6.45, 0); head.scale.set(0.95, 0.12, 0.3); g.add(head);
    const glow = share(new THREE.Mesh(boxGeo, lampMat));
    glow.position.set(-side * 1.85, 6.37, 0); glow.scale.set(0.8, 0.04, 0.22); g.add(glow);
    parent.add(g);
  };

  const addOwnedTree = (parent, usePalm) => {
    const g = new THREE.Group();
    if (usePalm) {
      const h = 5 + rand() * 1.4;
      const trunk = share(new THREE.Mesh(poleGeo, trunkMat));
      trunk.position.y = h / 2; trunk.scale.set(0.16, h, 0.16); g.add(trunk);
      for (let i = 0; i < 7; i++) {
        const frond = share(new THREE.Mesh(boxGeo, leafMat));
        const a = (i / 7) * Math.PI * 2;
        frond.position.set(Math.cos(a) * 0.9, h + 0.2, Math.sin(a) * 0.9);
        frond.scale.set(0.15, 0.05, 2.4);
        frond.lookAt(0, h - 1.2, 0);
        g.add(frond);
      }
    } else {
      const h = 3.2 + rand() * 1.2;
      const trunk = share(new THREE.Mesh(poleGeo, trunkMat));
      trunk.position.y = h / 2; trunk.scale.set(0.28, h, 0.28); g.add(trunk);
      for (let i = 0; i < 5; i++) {
        const canopy = share(new THREE.Mesh(sphereGeo, i % 2 ? leafMat : leafDark));
        const a = (i / 5) * Math.PI * 2;
        const r = i ? 1.3 + rand() * 0.5 : 0;
        canopy.position.set(Math.cos(a) * r, h + 1.1 + rand() * 0.4, Math.sin(a) * r);
        const s = 1.3 + rand() * 0.7;
        canopy.scale.set(s, s * 0.62, s);
        g.add(canopy);
      }
    }
    parent.add(g);
  };

  for (const s of lampSamples) {
    const side = rand() > 0.5 ? 1 : -1;
    const nx = -s.dz; const nz = s.dx;
    const holder = new THREE.Group();
    holder.position.set(s.x + nx * (s.w / 2 + 1.1) * side, 0, s.z + nz * (s.w / 2 + 1.1) * side);
    holder.rotation.y = Math.atan2(s.dx, s.dz);
    addOwnedLamp(holder, side);
    propRoot.add(holder);
  }
  for (const s of treeSamples) {
    if (rand() < 0.35) continue;
    const side = rand() > 0.5 ? 1 : -1;
    const nx = -s.dz; const nz = s.dx;
    const holder = new THREE.Group();
    holder.position.set(s.x + nx * (s.w / 2 + 2.4) * side, 0, s.z + nz * (s.w / 2 + 2.4) * side);
    addOwnedTree(holder, rand() > 0.55);
    propRoot.add(holder);
  }

  try { mergeStatics(propRoot); } catch (error) { /* keep unmerged */ }
  detail.add(propRoot);

  detail.userData.realLookOwn = own;
  return detail;
}

/** Dispose overlay geometry + look-owned textures/materials. Never touches kit shared assets. */
export function disposeRealLook(detail) {
  if (!detail) return;
  detail.traverse((o) => {
    if (!o.isMesh) return;
    if (o.userData.sharedGeometry) return;
    // Ribbon / zebra / merged-prop geos we created; skip kit shared box/cyl/sphere/ico.
    if (o.geometry && !o.geometry.userData?.shared) o.geometry.dispose();
  });
  for (const asset of detail.userData.realLookOwn || []) asset?.dispose?.();
  detail.userData.realLookOwn = null;
}
