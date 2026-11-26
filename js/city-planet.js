// Sphere-net planet: stream city tiles onto a globe, move/fly in the local
// tangent frame. No geographic poles — the world does not spin on an axis.
import * as THREE from './vendor/three/three.module.min.js';
import { SIZE, wrapCoord } from './city-map.js';

// Sphere-net: city wraps both map axes. Tiny epsilon avoids singular verts at the
// mathematical poles — there is no geographic polar cap (planet does not spin).
const LAT_EPS = 0.018;
const _v = new THREE.Vector3();
const _n = new THREE.Vector3();
const _east = new THREE.Vector3();
const _up = new THREE.Vector3();
const _north = new THREE.Vector3();
const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _basisQ = new THREE.Quaternion();
const _headingQ = new THREE.Quaternion();
const _look = new THREE.Matrix4();

export function planetRadius() {
  // Equatorial circumference matches one map lap (SIZE metres).
  return SIZE / (Math.PI * 2);
}

// Flat-space Y of the asphalt deck — keep in sync with free-city road planes.
export const PLANET_ROAD_Y = -0.04;

export function flatToLonLat(x, z) {
  const fx = wrapCoord(x);
  const fz = wrapCoord(z);
  const lon = (fx / SIZE) * Math.PI * 2;
  const t = LAT_EPS + (fz / SIZE) * (1 - 2 * LAT_EPS);
  const lat = t * Math.PI - Math.PI / 2;
  return { lon, lat, fx, fz };
}

export function lonLatToFlat(lon, lat) {
  const wrappedLon = ((lon % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const clampedLat = THREE.MathUtils.clamp(lat, -Math.PI / 2 + LAT_EPS * Math.PI, Math.PI / 2 - LAT_EPS * Math.PI);
  const x = (wrappedLon / (Math.PI * 2)) * SIZE;
  const t = (clampedLat + Math.PI / 2) / Math.PI;
  const z = ((t - LAT_EPS) / (1 - 2 * LAT_EPS)) * SIZE;
  return { x, z: wrapCoord(z), lon: wrappedLon, lat: clampedLat };
}

export function spherePoint(lon, lat, radius) {
  const cl = Math.cos(lat);
  return new THREE.Vector3(
    radius * cl * Math.sin(lon),
    radius * Math.sin(lat),
    radius * cl * Math.cos(lon)
  );
}

export function flatToSphere(x, y, z, radius = planetRadius()) {
  const { lon, lat } = flatToLonLat(x, z);
  return spherePoint(lon, lat, radius + y);
}

export function sphereToFlat(position, radius = planetRadius()) {
  const r = Math.max(1e-6, position.length());
  const lat = Math.asin(THREE.MathUtils.clamp(position.y / r, -1, 1));
  const lon = Math.atan2(position.x, position.z);
  const { x, z } = lonLatToFlat(lon, lat);
  return { x, z, alt: r - radius, lon, lat, r };
}

export function tangentFrame(lon, lat, target = {}) {
  const up = target.up || new THREE.Vector3();
  const east = target.east || new THREE.Vector3();
  const north = target.north || new THREE.Vector3();
  const cl = Math.cos(lat);
  const sl = Math.sin(lat);
  const co = Math.cos(lon);
  const so = Math.sin(lon);
  up.set(cl * so, sl, cl * co).normalize();
  // East = ∂/∂lon, north = ∂/∂lat
  east.set(co, 0, -so).normalize();
  north.crossVectors(up, east).normalize();
  east.crossVectors(north, up).normalize();
  const quat = target.quat || new THREE.Quaternion();
  // Local +X = east, +Y = up, -Z = north (car forward)
  _look.makeBasis(east, up, north.clone().negate());
  quat.setFromRotationMatrix(_look);
  return { up, east, north, quat };
}

export function poseOnSphere(x, y, z, heading = 0, radius = planetRadius(), out = {}) {
  const { lon, lat } = flatToLonLat(x, z);
  const pos = out.position || new THREE.Vector3();
  pos.copy(spherePoint(lon, lat, radius + y));
  // Never alias basisQuat with the heading scratch quat — that wiped the tangent frame.
  const frame = tangentFrame(lon, lat, {
    up: out.up, east: out.east, north: out.north,
    quat: out.basisQuat || _basisQ
  });
  const quat = out.quaternion || new THREE.Quaternion();
  // Heading: 0 = north, positive turns right (toward east), matching flat sin/cos heading.
  _headingQ.setFromAxisAngle(frame.up, -heading);
  quat.copy(frame.quat).premultiply(_headingQ);
  return {
    position: pos,
    quaternion: quat,
    up: frame.up,
    east: frame.east,
    north: frame.north,
    lon,
    lat,
    radius: radius + y
  };
}

// Sphere-net motion: advance in the wrapped flat map (both axes), then pose onto the globe.
// Do NOT integrate in 3D lon/lat — near the equirectangular poles longitude blows up and
// heading flips every frame, which felt like the flying car "bouncing" with force in the sky.
export function moveOnSphere(x, z, heading, step, radius = planetRadius()) {
  if (Math.abs(step) < 1e-8) {
    const { lon, lat } = flatToLonLat(x, z);
    return { x: wrapCoord(x), z: wrapCoord(z), heading, lon, lat };
  }
  // Match flat free-roam: +heading turns right, forward is −Z / north on the map.
  const nx = wrapCoord(x + Math.sin(heading) * step);
  const nz = wrapCoord(z - Math.cos(heading) * step);
  const { lon, lat } = flatToLonLat(nx, nz);
  return { x: nx, z: nz, heading, lon, lat };
}

// Split long flat triangles before bending so roads/parks don't become sharp sphere chords.
function refineLongTriangles(geometry, matrixWorld, maxEdge = 10) {
  const src = geometry.index ? geometry.toNonIndexed() : geometry.clone();
  const pos = src.attributes.position;
  const uv = src.attributes.uv;
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  const ab = new THREE.Vector3();
  const bc = new THREE.Vector3();
  const ca = new THREE.Vector3();
  let positions = [];
  let uvs = [];
  const maxEdgeSq = maxEdge * maxEdge;

  const pushTri = (pa, pb, pc, uva, uvb, uvc) => {
    positions.push(pa.x, pa.y, pa.z, pb.x, pb.y, pb.z, pc.x, pc.y, pc.z);
    if (uva) uvs.push(uva.x, uva.y, uvb.x, uvb.y, uvc.x, uvc.y);
  };

  const getUV = (i) => (uv ? new THREE.Vector2(uv.getX(i), uv.getY(i)) : null);

  for (let i = 0; i < pos.count; i += 3) {
    a.fromBufferAttribute(pos, i).applyMatrix4(matrixWorld);
    b.fromBufferAttribute(pos, i + 1).applyMatrix4(matrixWorld);
    c.fromBufferAttribute(pos, i + 2).applyMatrix4(matrixWorld);
    const uva = getUV(i); const uvb = getUV(i + 1); const uvc = getUV(i + 2);
    // Work in a small recursive stack so large asphalt quads densify.
    const stack = [{ a: a.clone(), b: b.clone(), c: c.clone(), uva, uvb, uvc, depth: 0 }];
    while (stack.length) {
      const tri = stack.pop();
      ab.subVectors(tri.b, tri.a);
      bc.subVectors(tri.c, tri.b);
      ca.subVectors(tri.a, tri.c);
      const abL = ab.lengthSq(); const bcL = bc.lengthSq(); const caL = ca.lengthSq();
      if (tri.depth > 5 || (abL <= maxEdgeSq && bcL <= maxEdgeSq && caL <= maxEdgeSq)) {
        pushTri(tri.a, tri.b, tri.c, tri.uva, tri.uvb, tri.uvc);
        continue;
      }
      // Split the longest edge.
      let mid; let uvm;
      if (abL >= bcL && abL >= caL) {
        mid = new THREE.Vector3().addVectors(tri.a, tri.b).multiplyScalar(0.5);
        uvm = tri.uva && tri.uvb ? new THREE.Vector2().addVectors(tri.uva, tri.uvb).multiplyScalar(0.5) : null;
        stack.push({ a: tri.a, b: mid, c: tri.c, uva: tri.uva, uvb: uvm, uvc: tri.uvc, depth: tri.depth + 1 });
        stack.push({ a: mid, b: tri.b, c: tri.c, uva: uvm, uvb: tri.uvb, uvc: tri.uvc, depth: tri.depth + 1 });
      } else if (bcL >= caL) {
        mid = new THREE.Vector3().addVectors(tri.b, tri.c).multiplyScalar(0.5);
        uvm = tri.uvb && tri.uvc ? new THREE.Vector2().addVectors(tri.uvb, tri.uvc).multiplyScalar(0.5) : null;
        stack.push({ a: tri.a, b: tri.b, c: mid, uva: tri.uva, uvb: tri.uvb, uvc: uvm, depth: tri.depth + 1 });
        stack.push({ a: tri.a, b: mid, c: tri.c, uva: tri.uva, uvb: uvm, uvc: tri.uvc, depth: tri.depth + 1 });
      } else {
        mid = new THREE.Vector3().addVectors(tri.c, tri.a).multiplyScalar(0.5);
        uvm = tri.uvc && tri.uva ? new THREE.Vector2().addVectors(tri.uvc, tri.uva).multiplyScalar(0.5) : null;
        stack.push({ a: tri.a, b: tri.b, c: mid, uva: tri.uva, uvb: tri.uvb, uvc: uvm, depth: tri.depth + 1 });
        stack.push({ a: mid, b: tri.b, c: tri.c, uva: uvm, uvb: tri.uvb, uvc: tri.uvc, depth: tri.depth + 1 });
      }
    }
  }

  // Positions currently world-flat; convert back to mesh-local via inverse world matrix.
  const inv = new THREE.Matrix4().copy(matrixWorld).invert();
  const outPos = new Float32Array(positions.length);
  const tmp = new THREE.Vector3();
  for (let i = 0; i < positions.length; i += 3) {
    tmp.set(positions[i], positions[i + 1], positions[i + 2]).applyMatrix4(inv);
    outPos[i] = tmp.x; outPos[i + 1] = tmp.y; outPos[i + 2] = tmp.z;
  }
  const refined = new THREE.BufferGeometry();
  refined.setAttribute('position', new THREE.BufferAttribute(outPos, 3));
  if (uvs.length) refined.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
  refined.computeVertexNormals();
  return refined;
}

function bakeMeshToSphere(mesh, radius, invRoot) {
  if (!mesh.geometry || mesh.userData.sphereBent) return;
  mesh.updateWorldMatrix(true, false);

  // Densify long flat faces (roads, parks, lane stripes, curbs) before the spherical warp.
  let geo = mesh.geometry;
  const posAttr = geo.attributes.position;
  const groundMat = !!mesh.material?.userData?.planetGround;
  let groundLike = !!(mesh.userData.planetGround || groundMat);
  if (posAttr && posAttr.count >= 3) {
    let minX = Infinity; let maxX = -Infinity;
    let minY = Infinity; let maxY = -Infinity;
    let minZ = Infinity; let maxZ = -Infinity;
    for (let i = 0; i < posAttr.count; i++) {
      _v.fromBufferAttribute(posAttr, i).applyMatrix4(mesh.matrixWorld);
      if (_v.x < minX) minX = _v.x; if (_v.x > maxX) maxX = _v.x;
      if (_v.y < minY) minY = _v.y; if (_v.y > maxY) maxY = _v.y;
      if (_v.z < minZ) minZ = _v.z; if (_v.z > maxZ) maxZ = _v.z;
    }
    const span = Math.max(maxX - minX, maxZ - minZ);
    const tall = maxY - minY;
    // Lane paint / curbs are long thin boxes — without densify they crease like jagged roads.
    if (!groundLike && tall < 1.8 && span > 14) groundLike = true;
    const approxEdge = span / Math.max(1, Math.sqrt(Math.max(4, posAttr.count)) - 1);
    if (groundLike && approxEdge > 5.5) {
      geo = refineLongTriangles(geo, mesh.matrixWorld, 5);
    } else {
      geo = geo.clone();
    }
  } else {
    geo = geo.clone();
  }

  mesh.geometry = geo;
  mesh.userData.sphereBent = true;
  geo.userData.sphereBent = true;

  const pos = geo.attributes.position;
  let nor = geo.attributes.normal;
  if (!nor) {
    geo.computeVertexNormals();
    nor = geo.attributes.normal;
  }
  for (let i = 0; i < pos.count; i++) {
    _v.fromBufferAttribute(pos, i);
    _v.applyMatrix4(mesh.matrixWorld);
    const bent = flatToSphere(_v.x, _v.y, _v.z, radius);
    if (groundLike) {
      // Radial normals keep bent roads smoothly lit like a globe surface.
      _n.copy(bent).normalize().transformDirection(invRoot);
      nor.setXYZ(i, _n.x, _n.y, _n.z);
    }
    bent.applyMatrix4(invRoot);
    pos.setXYZ(i, bent.x, bent.y, bent.z);
  }
  pos.needsUpdate = true;
  nor.needsUpdate = true;
  if (!groundLike) geo.computeVertexNormals();
  geo.computeBoundingSphere();
  geo.computeBoundingBox();
}

function collectAndBake(scope, root, radius, invRoot) {
  const bent = [];
  scope.traverse((obj) => {
    if (!obj.isMesh || !obj.geometry) return;
    let cur = obj;
    while (cur && cur !== scope.parent) {
      if (cur.userData?.planetCore || cur.userData?.planetSkipBend) return;
      cur = cur.parent;
    }
    bakeMeshToSphere(obj, radius, invRoot);
    bent.push(obj);
  });
  for (const mesh of bent) {
    if (mesh.parent && mesh.parent !== root) mesh.parent.remove(mesh);
    if (mesh.parent !== root) root.add(mesh);
    mesh.position.set(0, 0, 0);
    mesh.rotation.set(0, 0, 0);
    mesh.scale.set(1, 1, 1);
    mesh.updateMatrix();
  }
  return bent;
}

// Resident globe shell + artificial sun satellites (no one-shot city bake).
export function ensurePlanetDecor(root, {
  radius = planetRadius(),
  coreColor = 0x1a3a55
} = {}) {
  if (root.userData.planetDecor) return root.userData.planetDecor;
  const decor = buildNaturalPlanet(radius, coreColor);
  root.add(decor.group);
  root.userData.planetDecor = decor;
  return decor;
}

// Bend one streamed city chunk onto the sphere and reparent meshes under root.
export function projectChunkToSphere(root, chunkGroup, radius = planetRadius()) {
  root.updateMatrixWorld(true);
  chunkGroup.updateMatrixWorld(true);
  const invRoot = new THREE.Matrix4().copy(root.matrixWorld).invert();
  return collectAndBake(chunkGroup, root, radius, invRoot);
}

// Legacy full bake (tests / fallback): decor + every mesh under root.
export function projectCityToSphere(root, {
  radius = planetRadius(),
  coreColor = 0x1a3a55
} = {}) {
  ensurePlanetDecor(root, { radius, coreColor });
  root.updateMatrixWorld(true);
  const invRoot = new THREE.Matrix4().copy(root.matrixWorld).invert();
  const bent = collectAndBake(root, root, radius, invRoot);
  return { radius, bent, core: root.userData.planetDecor?.core };
}

function disposePlanetDecor(root) {
  const prev = root.userData.planetDecor;
  if (!prev) {
    if (root.userData.planetCoreMesh) {
      root.remove(root.userData.planetCoreMesh);
      root.userData.planetCoreMesh.geometry?.dispose();
      root.userData.planetCoreMesh.material?.dispose?.();
      root.userData.planetCoreMesh = null;
    }
    return;
  }
  root.remove(prev.group);
  prev.group.traverse((o) => {
    if (o.geometry) o.geometry.dispose();
    if (o.material) {
      if (o.material.map) o.material.map.dispose();
      if (o.material.roughnessMap) o.material.roughnessMap.dispose();
      o.material.dispose();
    }
  });
  root.userData.planetDecor = null;
  root.userData.planetCoreMesh = null;
}

function hash2(ix, iy) {
  const n = Math.sin(ix * 127.1 + iy * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function valueNoise2(x, y) {
  const x0 = Math.floor(x); const y0 = Math.floor(y);
  const fx = x - x0; const fy = y - y0;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash2(x0, y0);
  const b = hash2(x0 + 1, y0);
  const c = hash2(x0, y0 + 1);
  const d = hash2(x0 + 1, y0 + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function fbm2(x, y, octaves = 5) {
  let amp = 0.5; let freq = 1; let sum = 0; let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += valueNoise2(x * freq, y * freq) * amp;
    norm += amp;
    amp *= 0.5;
    freq *= 2.05;
  }
  return sum / norm;
}

function makePlanetTerrainMaps(oceanHex = 0x1a5080) {
  const size = 768;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const color = ctx.createImageData(size, size);
  const rough = ctx.createImageData(size, size);
  const or_ = (oceanHex >> 16) & 255;
  const og = (oceanHex >> 8) & 255;
  const ob = oceanHex & 255;

  for (let y = 0; y < size; y++) {
    const v = y / (size - 1);
    for (let x = 0; x < size; x++) {
      const u = x / size;
      // Wrap-friendly noise on both axes (sphere-net has no ice caps).
      const n1 = fbm2(u * 4.2, v * 4.2 + 1.7, 5);
      const n2 = fbm2(u * 8.5 + 20, v * 8.5 + 3.1, 4);
      const ridge = 1 - Math.abs(n2 * 2 - 1);
      let h = n1 * 0.72 + ridge * 0.22 + fbm2(u * 14, v * 14, 3) * 0.08;
      h += Math.sin((u + 0.13) * Math.PI * 2) * 0.03;
      const shore = THREE.MathUtils.smoothstep(0.42, 0.48, h);
      const land = THREE.MathUtils.smoothstep(0.45, 0.54, h);
      const mountain = THREE.MathUtils.smoothstep(0.62, 0.78, h + ridge * 0.08);

      // Alien seas → teal shallows → violet flats → crystal highlands.
      let r; let g; let b; let roughV;
      if (land < 0.01) {
        const depth = THREE.MathUtils.clamp((0.5 - h) * 1.6, 0, 1);
        r = or_ * (0.45 + (1 - depth) * 0.4);
        g = og * (0.55 + (1 - depth) * 0.5);
        b = Math.min(255, ob * (0.9 + (1 - depth) * 0.35) + depth * 28);
        roughV = 0.16 + depth * 0.35;
      } else {
        const flatR = 72; const flatG = 48; const flatB = 118;
        const midR = 42; const midG = 128; const midB = 110;
        const highR = 168; const highG = 92; const highB = 196;
        const crystalR = 210; const crystalG = 230; const crystalB = 255;
        const tFlat = 1 - shore;
        const tMid = shore * (1 - mountain);
        const tHigh = land * mountain * (1 - mountain * 0.35);
        const tCry = mountain;
        const wSum = tFlat + tMid + tHigh + tCry + 1e-6;
        r = (flatR * tFlat + midR * tMid + highR * tHigh + crystalR * tCry) / wSum;
        g = (flatG * tFlat + midG * tMid + highG * tHigh + crystalG * tCry) / wSum;
        b = (flatB * tFlat + midB * tMid + highB * tHigh + crystalB * tCry) / wSum;
        const landMix = land;
        r = or_ * (1 - landMix) + r * landMix;
        g = og * (1 - landMix) + g * landMix;
        b = ob * (1 - landMix) + b * landMix;
        roughV = 0.55 + mountain * 0.35;
      }

      const grain = (hash2(x * 0.37, y * 0.71) - 0.5) * 10;
      const i = (y * size + x) * 4;
      color.data[i] = Math.max(0, Math.min(255, r + grain));
      color.data[i + 1] = Math.max(0, Math.min(255, g + grain));
      color.data[i + 2] = Math.max(0, Math.min(255, b + grain * 0.7));
      color.data[i + 3] = 255;
      const rv = Math.max(0, Math.min(255, roughV * 255 + grain * 0.4));
      rough.data[i] = rv;
      rough.data[i + 1] = rv;
      rough.data[i + 2] = rv;
      rough.data[i + 3] = 255;
    }
  }
  ctx.putImageData(color, 0, 0);
  const colorTex = new THREE.CanvasTexture(canvas);
  colorTex.colorSpace = THREE.SRGBColorSpace;
  colorTex.wrapS = THREE.RepeatWrapping;
  colorTex.wrapT = THREE.RepeatWrapping;
  colorTex.anisotropy = 8;

  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = size;
  roughCanvas.height = size;
  roughCanvas.getContext('2d').putImageData(rough, 0, 0);
  const roughTex = new THREE.CanvasTexture(roughCanvas);
  roughTex.wrapS = THREE.RepeatWrapping;
  roughTex.wrapT = THREE.RepeatWrapping;
  return { color: colorTex, roughness: roughTex };
}

function makeCloudTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, size, size);
  // Soft equatorial bands + scattered storms.
  for (let i = 0; i < 110; i++) {
    const x = Math.random() * size;
    const band = 0.18 + Math.random() * 0.64;
    const y = (band + (Math.random() - 0.5) * 0.08) * size;
    const rx = (0.05 + Math.random() * 0.18) * size;
    const ry = rx * (0.28 + Math.random() * 0.45);
    const g = ctx.createRadialGradient(x, y, 0, x, y, rx);
    const a = 0.22 + Math.random() * 0.5;
    g.addColorStop(0, `rgba(255,255,255,${a})`);
    g.addColorStop(0.55, `rgba(245,250,255,${a * 0.45})`);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, (Math.random() - 0.5) * 0.8, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function makeAtmosphereMaterial(colorHex, intensity) {
  return new THREE.ShaderMaterial({
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uColor: { value: new THREE.Color(colorHex) },
      uIntensity: { value: intensity },
      uPower: { value: 2.6 }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorldPos = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uIntensity;
      uniform float uPower;
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      void main() {
        vec3 viewDir = normalize(cameraPosition - vWorldPos);
        float fresnel = pow(1.0 - max(dot(viewDir, normalize(vNormal)), 0.0), uPower);
        float alpha = fresnel * uIntensity;
        gl_FragColor = vec4(uColor, alpha);
        #include <colorspace_fragment>
      }
    `
  });
}

function buildNaturalPlanet(radius, oceanHex) {
  const group = new THREE.Group();
  group.userData.planetCore = true;

  const maps = makePlanetTerrainMaps(oceanHex);
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(Math.max(8, radius - 0.55), 160, 112),
    new THREE.MeshStandardMaterial({
      map: maps.color,
      roughnessMap: maps.roughness,
      roughness: 0.72,
      metalness: 0.18,
      emissive: new THREE.Color(0x14203a),
      emissiveIntensity: 0.32,
      envMapIntensity: 1.15,
      flatShading: false
    })
  );
  core.userData.planetCore = true;
  core.receiveShadow = true;
  group.add(core);

  // Crystal-clear teal–violet atmosphere rim (sharp Fresnel, not milky haze).
  const atmosphereInner = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 1.035, 72, 56),
    makeAtmosphereMaterial(0xa8f6ff, 0.55)
  );
  atmosphereInner.material.uniforms.uPower.value = 2.4;
  atmosphereInner.userData.planetCore = true;
  atmosphereInner.renderOrder = 2;
  group.add(atmosphereInner);

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 1.1, 72, 56),
    makeAtmosphereMaterial(0xc4a6ff, 1.25)
  );
  atmosphere.material.uniforms.uPower.value = 3.1;
  atmosphere.userData.planetCore = true;
  atmosphere.renderOrder = 3;
  group.add(atmosphere);

  const cloudMap = makeCloudTexture();
  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 1.028, 96, 64),
    new THREE.MeshBasicMaterial({
      map: cloudMap,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  );
  clouds.userData.planetCore = true;
  clouds.renderOrder = 1;
  group.add(clouds);

  // Man-made sun satellites — Aurelia does not spin; these provide daylight.
  const sunSats = [];
  const satSpecs = [
    { color: 0xfff0c4, orbit: radius * 1.85, speed: 0.09, phase: 0.15, size: 16, elev: 0.72 },
    { color: 0xffd29a, orbit: radius * 2.15, speed: 0.06, phase: Math.PI * 1.05, size: 12, elev: 0.48 }
  ];
  for (const spec of satSpecs) {
    const sat = new THREE.Group();
    sat.userData.planetCore = true;
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(spec.size, 24, 18),
      new THREE.MeshBasicMaterial({ color: spec.color })
    );
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(spec.size * 2.1, 20, 14),
      new THREE.MeshBasicMaterial({ color: spec.color, transparent: true, opacity: 0.38, depthWrite: false })
    );
    const bloom = new THREE.Mesh(
      new THREE.SphereGeometry(spec.size * 3.2, 16, 12),
      new THREE.MeshBasicMaterial({ color: 0xfff6e0, transparent: true, opacity: 0.12, depthWrite: false })
    );
    // Local glow only — surface daylight comes from DirectionalLights aimed at these sats.
    const light = new THREE.PointLight(spec.color, 10, radius * 0.9, 1.35);
    sat.add(glow, halo, bloom, light);
    group.add(sat);
    sunSats.push({ sat, light, ...spec });
  }

  return { group, core, atmosphere, atmosphereInner, clouds, sunSats, spin: 0 };
}

export function placeObjectOnSphere(object, x, y, z, heading = 0, radius = planetRadius()) {
  // `y` is height above the asphalt deck. Car models put tyre contact at local y=0.
  // Sink a hair into the bent road so all four wheels read as planted (not hovering).
  const plant = y < 0.08 ? -0.03 : 0;
  const pose = poseOnSphere(x, PLANET_ROAD_Y + y + plant, z, heading, radius, {
    position: object.position,
    quaternion: object.quaternion,
    up: object.userData._planetUp || (object.userData._planetUp = new THREE.Vector3()),
    east: _east,
    north: _north,
    basisQuat: _basisQ
  });
  object.position.copy(pose.position);
  object.quaternion.copy(pose.quaternion);
  return pose;
}

export function updatePlanetVisuals(root, { time = 0, altitude = 0 } = {}) {
  const decor = root?.userData?.planetDecor;
  if (!decor) return;
  decor.clouds.rotation.y = time * 0.012;
  const space = THREE.MathUtils.clamp((altitude - 180) / 1100, 0, 1);
  const atmo = THREE.MathUtils.smoothstep(space, 0.12, 0.55);
  decor.atmosphere.material.uniforms.uIntensity.value = THREE.MathUtils.lerp(0.08, 1.55, atmo);
  if (decor.atmosphereInner) {
    decor.atmosphereInner.material.uniforms.uIntensity.value = THREE.MathUtils.lerp(0.05, 0.7, atmo);
    decor.atmosphereInner.visible = true;
  }
  decor.atmosphere.visible = true;
  decor.clouds.material.opacity = THREE.MathUtils.lerp(0.12, 0.42, Math.min(1, space + 0.15));
  decor.clouds.visible = true;

  // Orbit the artificial suns; planet itself does not spin.
  const dirs = [];
  for (const s of decor.sunSats || []) {
    const ang = s.phase + time * s.speed;
    const baseElev = s.elev ?? 0.55;
    const elev = baseElev + 0.12 * Math.sin(ang * 0.65 + s.phase);
    const cl = Math.cos(elev);
    s.sat.position.set(
      s.orbit * cl * Math.sin(ang),
      s.orbit * Math.sin(elev),
      s.orbit * cl * Math.cos(ang)
    );
    s.light.intensity = THREE.MathUtils.lerp(10, 4, space);
    dirs.push(s.sat.position.clone().normalize());
  }
  decor.sunDirs = dirs;
}

export function planetSunDirs(root) {
  return root?.userData?.planetDecor?.sunDirs || [];
}

export function disposePlanet(root) {
  disposePlanetDecor(root);
}

export function cameraOnSphere({
  x, y, z, heading, back, height, lookAhead, lookDown = 0, radius = planetRadius(),
  camPos, camLook, camUp
}) {
  const pose = poseOnSphere(x, y, z, heading, radius);
  const forward = _n.copy(pose.north).multiplyScalar(Math.cos(heading))
    .addScaledVector(pose.east, Math.sin(heading)).normalize();
  camPos.copy(pose.position)
    .addScaledVector(forward, -back)
    .addScaledVector(pose.up, height);
  camLook.copy(pose.position)
    .addScaledVector(forward, lookAhead)
    .addScaledVector(pose.up, -lookDown);
  if (camUp) camUp.copy(pose.up);
  return { pose, forward };
}
