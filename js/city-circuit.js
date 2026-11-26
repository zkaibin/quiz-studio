// Closed racing circuits with elevation, hairpins and chicanes — used by Racing circuit mode.
import * as THREE from './vendor/three/three.module.min.js';
import { asphaltTexture, grassTexture, checkerTexture, signTexture } from './city-gfx.js';
import { stdMat } from './city-vehicles.js';

// Wide 4-lane deck so beginners can hold a clear line.
const HALF = 16;
const HALF_EASY = 17;

// Control points are [x, y, z]. Loops are closed Catmull–Rom ribbons.
const CIRCUITS = [
  {
    id: 'boulevard',
    name: 'City Boulevard',
    area: 'BEGINNER',
    blurb: 'Wide 4-lane oval with long straights — easy for new drivers',
    difficulty: 'easy',
    sky: 0xa9d5e5,
    ground: 0x91ad89,
    hemi: 2.0,
    sun: 2.4,
    sunColor: 0xffefd2,
    width: HALF_EASY,
    points: [
      [0, 0, 0], [90, 0.2, -40], [160, 0.4, -20], [180, 0.5, 40],
      [140, 0.4, 100], [60, 0.2, 120], [-40, 0.1, 100], [-100, 0, 40],
      [-90, 0, -20], [-30, 0, -50]
    ]
  },
  {
    id: 'park-loop',
    name: 'Park Loop',
    area: 'BEGINNER',
    blurb: 'Gentle park circuit — soft corners and clear lane marks',
    difficulty: 'easy',
    sky: 0xb7d8ea,
    ground: 0x8fc079,
    hemi: 2.0,
    sun: 2.3,
    sunColor: 0xfff1d6,
    width: HALF_EASY,
    points: [
      [0, 0, 0], [70, 0.3, -50], [120, 0.6, -30], [130, 0.8, 30],
      [90, 1.0, 80], [20, 0.6, 100], [-50, 0.3, 70], [-80, 0.1, 10],
      [-50, 0, -40]
    ]
  },
  {
    id: 'harbor-gp',
    name: 'Harbor Grand Prix',
    area: 'HARBOR RING',
    blurb: 'Sweeping coastal ring with a mild crest — open 4-lane asphalt',
    difficulty: 'medium',
    sky: 0x8ec8e4,
    ground: 0x6f9a62,
    hemi: 2.0,
    sun: 2.4,
    sunColor: 0xffefd2,
    width: HALF,
    points: [
      [0, 0, 0], [50, 0.8, -100], [130, 2.0, -140], [200, 3.5, -100],
      [220, 5.0, -20], [180, 4.0, 70], [100, 2.5, 120], [20, 1.2, 130],
      [-60, 0.6, 90], [-120, 0.2, 20], [-100, 0, -50]
    ]
  },
  {
    id: 'coastal-ring',
    name: 'Coastal Ring',
    area: 'SEASIDE',
    blurb: 'Long straights and one big sweeper — great for learning pace',
    difficulty: 'easy',
    sky: 0xf0b890,
    ground: 0xc4b894,
    hemi: 1.8,
    sun: 2.5,
    sunColor: 0xffb878,
    width: HALF_EASY,
    points: [
      [0, 0, 0], [100, 0.3, -50], [200, 0.8, -40], [260, 1.5, 40],
      [230, 2.5, 130], [140, 2.0, 180], [40, 1.0, 180], [-60, 0.4, 130],
      [-140, 0.1, 50], [-140, 0, -20], [-60, 0, -50]
    ]
  },
  {
    id: 'ridge-switch',
    name: 'Ridge Switchbacks',
    area: 'HILL CLIMB',
    blurb: 'Climbing hairpins that test braking — still a wide 4-lane deck',
    difficulty: 'challenge',
    sky: 0xb7d4e8,
    ground: 0x7a8f6a,
    hemi: 1.9,
    sun: 2.2,
    sunColor: 0xffe8c8,
    width: HALF,
    points: [
      [0, 0, 0], [40, 2.0, -80], [30, 5.0, -140], [-30, 9.0, -160],
      [-90, 12.0, -110], [-80, 13.0, -40], [-20, 11.0, 0], [50, 8.0, 40],
      [90, 5.0, 90], [60, 3.0, 140], [0, 1.5, 150], [-50, 0.5, 90],
      [-30, 0.2, 30]
    ]
  },
  {
    id: 'arena-tech',
    name: 'Arena Technical',
    area: 'STADIUM',
    blurb: 'Chicanes and esses — wider lanes so you can correct mid-corner',
    difficulty: 'challenge',
    sky: 0xc5d0d8,
    ground: 0x8a9278,
    hemi: 1.85,
    sun: 2.1,
    sunColor: 0xfff0d8,
    width: HALF,
    points: [
      [0, 0, 0], [60, 0.2, -70], [110, 0.3, -40], [120, 0.4, 20],
      [80, 0.6, 60], [20, 0.7, 50], [-20, 0.8, 90], [-70, 0.6, 110],
      [-120, 0.4, 60], [-130, 0.2, 0], [-80, 0.1, -50], [-20, 0, -70]
    ]
  },
  {
    id: 'night-helix',
    name: 'Helix Night Run',
    area: 'FLOODLIT',
    blurb: 'Floodlit elevation and a double-apex — for confident drivers',
    difficulty: 'challenge',
    night: true,
    sky: 0x1a2248,
    ground: 0x3a4a52,
    hemi: 1.5,
    sun: 1.2,
    sunColor: 0x9fb4ff,
    width: HALF,
    points: [
      [0, 0, 0], [70, 0.8, -60], [120, 2.0, -20], [110, 3.5, 50],
      [40, 5.0, 90], [-40, 5.5, 70], [-90, 4.0, 20], [-70, 2.5, -50],
      [-10, 1.0, -80], [50, 0.4, -70]
    ]
  },
  {
    id: 'desert-dunes',
    name: 'Desert Dunes',
    area: 'DUNE CIRCUIT',
    blurb: 'Crests and hollows on a wide desert highway',
    difficulty: 'medium',
    sky: 0xe9d7b4,
    ground: 0xc8b787,
    hemi: 2.1,
    sun: 2.7,
    sunColor: 0xfff0cc,
    width: HALF,
    points: [
      [0, 0, 0], [80, 1.5, -60], [150, 3.5, -30], [170, 2.0, 50],
      [110, 0.8, 110], [30, 2.5, 140], [-50, 4.0, 90], [-110, 2.0, 30],
      [-120, 0.8, -40], [-50, 0.3, -70]
    ]
  }
];

function buildCurve(points) {
  const pts = points.map(([x, y, z]) => new THREE.Vector3(x, y, z));
  return new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.45);
}

// Horizontal sideways unit from the XZ tangent.
function horizontalSide(tangent) {
  const side = new THREE.Vector3(-tangent.z, 0, tangent.x);
  if (side.lengthSq() < 1e-8) side.set(1, 0, 0);
  return side.normalize();
}

function samplePath(curve, samples) {
  const pts = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const p = curve.getPointAt(t);
    pts.push({ x: p.x, y: p.y, z: p.z, t });
  }
  return pts;
}

// Proven flat-deck ribbon (same construction as osm-city road ribbons).
function ribbonFromCurve(curve, halfW, samples = 280, yBias = 0.05) {
  const pts = samplePath(curve, samples);
  const positions = [];
  const uvs = [];
  const indices = [];
  let dist = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    const prev = pts[Math.max(0, i - 1)];
    const next = pts[Math.min(pts.length - 1, i + 1)];
    const tx = next.x - prev.x;
    const tz = next.z - prev.z;
    const len = Math.hypot(tx, tz) || 1;
    const nx = (-tz / len) * halfW;
    const nz = (tx / len) * halfW;
    if (i > 0) dist += Math.hypot(p.x - prev.x, p.z - prev.z);
    const y = p.y + yBias;
    positions.push(p.x + nx, y, p.z + nz, p.x - nx, y, p.z - nz);
    uvs.push(0, dist / 8, 1, dist / 8);
    if (i > 0) {
      const a = (i - 1) * 2;
      // Winding so normals face up with standard right-hand rule after computeVertexNormals.
      indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(positions), 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(uvs), 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function curbRibbon(curve, halfW, sideSign, samples = 200) {
  const pts = samplePath(curve, samples);
  const positions = [];
  const indices = [];
  const curbW = 0.7;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    const prev = pts[Math.max(0, i - 1)];
    const next = pts[Math.min(pts.length - 1, i + 1)];
    const tx = next.x - prev.x;
    const tz = next.z - prev.z;
    const len = Math.hypot(tx, tz) || 1;
    const sx = (-tz / len) * sideSign;
    const sz = (tx / len) * sideSign;
    const inner = halfW - 0.05;
    const outer = halfW + curbW;
    positions.push(
      p.x + sx * inner, p.y + 0.1, p.z + sz * inner,
      p.x + sx * outer, p.y + 0.28, p.z + sz * outer
    );
    if (i > 0) {
      const a = (i - 1) * 2;
      indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(positions), 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function nearestOnCurve(curve, x, y, z, samples = 240) {
  let bestT = 0;
  let bestD = Infinity;
  const p = new THREE.Vector3();
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    curve.getPointAt(t, p);
    const d = (p.x - x) ** 2 + (p.z - z) ** 2;
    if (d < bestD) { bestD = d; bestT = t; }
  }
  // Refine locally.
  let lo = bestT - 2 / samples;
  let hi = bestT + 2 / samples;
  for (let k = 0; k < 8; k++) {
    const t0 = lo + (hi - lo) / 3;
    const t1 = hi - (hi - lo) / 3;
    const u0 = ((t0 % 1) + 1) % 1;
    const u1 = ((t1 % 1) + 1) % 1;
    curve.getPointAt(u0, p);
    const d0 = (p.x - x) ** 2 + (p.z - z) ** 2;
    curve.getPointAt(u1, p);
    const d1 = (p.x - x) ** 2 + (p.z - z) ** 2;
    if (d0 < d1) hi = t1; else lo = t0;
  }
  const t = (((lo + hi) / 2) % 1 + 1) % 1;
  curve.getPointAt(t, p);
  const tangent = curve.getTangentAt(t).normalize();
  const heading = Math.atan2(tangent.x, -tangent.z);
  const side = Math.sign((x - p.x) * (-tangent.z) - (z - p.z) * tangent.x) || 1;
  const lat = side * Math.hypot(x - p.x, z - p.z);
  return { t, point: p.clone(), tangent, heading: Math.atan2(tangent.x, -tangent.z), lateral: lat, dist: Math.hypot(x - p.x, z - p.z) };
}

export function circuitsFor(_cityId) {
  // Shared catalogue for every city — each route picks one by index.
  return CIRCUITS;
}

export function circuitById(id) {
  return CIRCUITS.find((c) => c.id === id) || CIRCUITS[0];
}

export function createCircuitTrack({ scene, renderer, circuit }) {
  const root = new THREE.Group();
  root.visible = false;
  scene.add(root);
  const own = [];
  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const trackTex = (tex) => { tex.anisotropy = maxAniso; own.push(tex); return tex; };

  let active = circuit || CIRCUITS[0];
  let curve = buildCurve(active.points);
  let length = curve.getLength();
  let halfW = active.width || HALF;

  const asphalt = trackTex(asphaltTexture());
  asphalt.wrapS = asphalt.wrapT = THREE.RepeatWrapping;
  const grass = trackTex(grassTexture());
  grass.repeat.set(80, 80);
  const check = trackTex(checkerTexture(28, 4, 16));

  const roadMat = new THREE.MeshStandardMaterial({
    map: asphalt, color: 0x555a60, roughness: 0.92, metalness: 0.02, side: THREE.DoubleSide
  });
  // Slight emissive so software/low-light GL still reads a solid deck.
  roadMat.emissive = new THREE.Color(0x1a1c1e);
  roadMat.emissiveIntensity = 0.15;
  const grassMat = new THREE.MeshStandardMaterial({ map: grass, color: active.ground, roughness: 0.95 });
  const curbA = stdMat(0xe8e4dc, { rough: 0.7 });
  const curbB = stdMat(0xc0392b, { rough: 0.65 });
  const wallMat = stdMat(0xb8bcc0, { rough: 0.55, metal: 0.35 });
  const lineMat = stdMat(0xf4f2dc, { rough: 0.6 });

  let roadMesh = null;
  let decor = new THREE.Group();
  root.add(decor);

  function rebuild(next) {
    active = next || active;
    curve = buildCurve(active.points);
    length = curve.getLength();
    halfW = active.width || HALF;
    grassMat.color.set(active.ground);

    if (roadMesh) {
      root.remove(roadMesh);
      roadMesh.geometry.dispose();
    }
    while (decor.children.length) {
      const c = decor.children.pop();
      c.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
    }

    const ground = new THREE.Mesh(new THREE.CircleGeometry(420, 48), grassMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.2;
    ground.receiveShadow = true;
    decor.add(ground);

    roadMesh = new THREE.Mesh(ribbonFromCurve(curve, halfW, 320), roadMat);
    roadMesh.receiveShadow = true;
    roadMesh.castShadow = false;
    root.add(roadMesh);

    const curbGeoL = curbRibbon(curve, halfW, 1, 220);
    const curbGeoR = curbRibbon(curve, halfW, -1, 220);
    const curbL = new THREE.Mesh(curbGeoL, curbA);
    const curbR = new THREE.Mesh(curbGeoR, curbB);
    decor.add(curbL, curbR);

    // Clear 4-lane markings: centre divider + mid separators + edge lines.
    // Width splits into four equal lanes (boundaries at 0, ±halfW/2, ±halfW).
    const mark = (w, yLift = 0.05) => {
      const m = new THREE.Mesh(ribbonFromCurve(curve, w, 220, yLift), lineMat);
      decor.add(m);
    };
    mark(0.12, 0.06); // centre
    const mid = halfW * 0.5;
    for (const lat of [-mid, mid, -halfW + 0.75, halfW - 0.75]) {
      const pts = samplePath(curve, 200);
      const positions = [];
      const indices = [];
      const hw = 0.09;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const prev = pts[Math.max(0, i - 1)];
        const next = pts[Math.min(pts.length - 1, i + 1)];
        const tx = next.x - prev.x;
        const tz = next.z - prev.z;
        const len = Math.hypot(tx, tz) || 1;
        const sx = (-tz / len);
        const sz = (tx / len);
        const cx = p.x + sx * lat;
        const cz = p.z + sz * lat;
        const y = p.y + 0.055;
        positions.push(cx + sx * hw, y, cz + sz * hw, cx - sx * hw, y, cz - sz * hw);
        if (i > 0) {
          const a = (i - 1) * 2;
          indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(positions), 3));
      geo.setIndex(indices);
      geo.computeVertexNormals();
      decor.add(new THREE.Mesh(geo, lineMat));
    }

    // Continuous barrier walls outside the racing line.
    for (const s of [-1, 1]) {
      const pts = samplePath(curve, 160);
      const positions = [];
      const indices = [];
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const prev = pts[Math.max(0, i - 1)];
        const next = pts[Math.min(pts.length - 1, i + 1)];
        const tx = next.x - prev.x;
        const tz = next.z - prev.z;
        const len = Math.hypot(tx, tz) || 1;
        const sx = (-tz / len) * s;
        const sz = (tx / len) * s;
        const base = halfW + 1.4;
        positions.push(
          p.x + sx * base, p.y + 0.15, p.z + sz * base,
          p.x + sx * (base + 0.35), p.y + 1.1, p.z + sz * (base + 0.35)
        );
        if (i > 0) {
          const k = (i - 1) * 2;
          indices.push(k, k + 2, k + 1, k + 1, k + 2, k + 3);
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(positions), 3));
      geo.setIndex(indices);
      geo.computeVertexNormals();
      const wall = new THREE.Mesh(geo, wallMat);
      wall.castShadow = true;
      decor.add(wall);
    }

    // Start / finish gantry at t=0.
    const start = curve.getPointAt(0);
    const stan = curve.getTangentAt(0).normalize();
    const side = new THREE.Vector3(-stan.z, 0, stan.x).normalize();
    const gate = new THREE.Group();
    for (const s of [-1, 1]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.5, 7.2, 0.5), wallMat);
      post.position.set(start.x + side.x * (halfW + 1.2) * s, start.y + 3.6, start.z + side.z * (halfW + 1.2) * s);
      gate.add(post);
    }
    const beam = new THREE.Mesh(new THREE.BoxGeometry(halfW * 2 + 2.4, 0.7, 0.6), wallMat);
    beam.position.set(start.x, start.y + 7.0, start.z);
    gate.add(beam);
    const banner = new THREE.Mesh(
      new THREE.PlaneGeometry(halfW * 2, 1.0),
      new THREE.MeshStandardMaterial({ map: trackTex(signTexture('START / FINISH', '#111', '#ffffff', 512, 48)), roughness: 0.6 })
    );
    banner.position.set(start.x, start.y + 6.2, start.z);
    banner.lookAt(start.x + stan.x, start.y + 6.2, start.z + stan.z);
    gate.add(banner);
    const finishLine = new THREE.Mesh(new THREE.PlaneGeometry(halfW * 2, 2.2), new THREE.MeshStandardMaterial({ map: check, roughness: 0.8 }));
    finishLine.rotation.x = -Math.PI / 2;
    finishLine.position.set(start.x, start.y + 0.05, start.z);
    finishLine.rotation.z = Math.atan2(stan.x, stan.z);
    gate.add(finishLine);
    decor.add(gate);

    // Tire stacks at hairpin cues (high curvature samples).
    for (let i = 0; i < 36; i++) {
      const t = i / 36;
      const tan0 = curve.getTangentAt(t);
      const tan1 = curve.getTangentAt((t + 0.02) % 1);
      const bend = 1 - Math.max(-1, Math.min(1, tan0.dot(tan1)));
      if (bend < 0.08) continue;
      const p = curve.getPointAt(t);
      let sideN = new THREE.Vector3(-tan0.z, 0, tan0.x).normalize();
      const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.9, 10), stdMat(0x1a1a1a, { rough: 0.9 }));
      stack.position.set(p.x + sideN.x * (halfW + 2.2), p.y + 0.45, p.z + sideN.z * (halfW + 2.2));
      decor.add(stack);
    }
  }

  rebuild(active);

  function sample(t) {
    const u = ((t % 1) + 1) % 1;
    const point = curve.getPointAt(u);
    const tangent = curve.getTangentAt(u).normalize();
    const heading = Math.atan2(tangent.x, -tangent.z);
    return { point, tangent, heading, t: u };
  }

  function project(x, z) {
    return nearestOnCurve(curve, x, 0, z);
  }

  function isOnTrack(x, z, margin = 0.6) {
    const hit = project(x, z);
    return hit.dist <= halfW + margin;
  }

  function heightAt(x, z) {
    return project(x, z).point.y;
  }

  function clampToTrack(x, z) {
    const hit = project(x, z);
    if (hit.dist <= halfW - 0.35) return { x, z, hit };
    const tan = hit.tangent;
    let side = new THREE.Vector3(-tan.z, 0, tan.x).normalize();
    const sign = Math.sign((x - hit.point.x) * side.x + (z - hit.point.z) * side.z) || 1;
    const lim = halfW - 0.35;
    return {
      x: hit.point.x + side.x * lim * sign,
      z: hit.point.z + side.z * lim * sign,
      hit
    };
  }

  function progressOf(x, z) {
    return project(x, z).t * length;
  }

  function spawn(laneOffset = 0) {
    const s = sample(0.018);
    const side = horizontalSide(s.tangent);
    // Keep starting grid well inside the asphalt deck.
    const lat = THREE.MathUtils.clamp(laneOffset, -halfW * 0.55, halfW * 0.55);
    return {
      x: s.point.x + side.x * lat,
      y: s.point.y + 0.05,
      z: s.point.z + side.z * lat,
      heading: s.heading
    };
  }

  function setCircuit(next) {
    rebuild(typeof next === 'string' ? circuitById(next) : next);
  }

  function setVisible(on) {
    root.visible = on;
  }

  function followLights(followPlayer) {
    // Optional hook — circuit uses world lighting from createWorld.
    if (followPlayer) followPlayer(sample(0).point.x, sample(0).point.z);
  }

  function dispose() {
    setVisible(false);
    root.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
    });
    for (const t of own) t.dispose();
    if (root.parent) root.parent.remove(root);
  }

  return {
    root,
    get length() { return length; },
    get halfWidth() { return halfW; },
    get circuit() { return active; },
    sample,
    project,
    isOnTrack,
    heightAt,
    clampToTrack,
    progressOf,
    spawn,
    setCircuit,
    setVisible,
    followLights,
    dispose,
    list: CIRCUITS
  };
}

export { CIRCUITS, HALF as CIRCUIT_HALF };
