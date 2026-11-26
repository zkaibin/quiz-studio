// True spherical pocket planet: bend a fully-built wrap city onto a globe and
// move/fly in the local tangent frame so there is never a city "edge".
import * as THREE from './vendor/three/three.module.min.js';
import { SIZE, wrapCoord } from './city-map.js';

// Keep a small polar cap of bare globe so equirectangular rows are not crushed to a point.
// Larger polar band of bare globe so ice caps / oceans read from orbit.
const LAT_PAD = 0.12;
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
  const fz = THREE.MathUtils.clamp(z, 0, SIZE);
  const lon = (fx / SIZE) * Math.PI * 2;
  const t = LAT_PAD + (fz / SIZE) * (1 - 2 * LAT_PAD);
  const lat = t * Math.PI - Math.PI / 2;
  return { lon, lat, fx, fz };
}

export function lonLatToFlat(lon, lat) {
  const wrappedLon = ((lon % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const clampedLat = THREE.MathUtils.clamp(lat, -Math.PI / 2 + 1e-4, Math.PI / 2 - 1e-4);
  const x = (wrappedLon / (Math.PI * 2)) * SIZE;
  const t = (clampedLat + Math.PI / 2) / Math.PI;
  const z = ((t - LAT_PAD) / (1 - 2 * LAT_PAD)) * SIZE;
  return { x, z: THREE.MathUtils.clamp(z, 0, SIZE), lon: wrappedLon, lat: clampedLat };
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

// Move along the sphere surface by a flat-metre step; returns updated flat x/z/heading.
export function moveOnSphere(x, z, heading, step, radius = planetRadius()) {
  if (Math.abs(step) < 1e-8) return { x: wrapCoord(x), z: THREE.MathUtils.clamp(z, 0, SIZE), heading };
  const { lon, lat } = flatToLonLat(x, z);
  const frame = tangentFrame(lon, lat);
  const forward = new THREE.Vector3()
    .copy(frame.north).multiplyScalar(Math.cos(heading))
    .addScaledVector(frame.east, Math.sin(heading));
  const pos = spherePoint(lon, lat, radius);
  pos.addScaledVector(forward, step);
  // Keep on the surface; pole crossing is handled by asin/atan2 on the new point.
  pos.setLength(radius);
  const next = sphereToFlat(pos, radius);
  let nextHeading = heading;
  const nextFrame = tangentFrame(next.lon, next.lat);
  const radial = forward.dot(nextFrame.up);
  const tang = forward.addScaledVector(nextFrame.up, -radial);
  if (tang.lengthSq() > 1e-10) {
    tang.normalize();
    nextHeading = Math.atan2(tang.dot(nextFrame.east), tang.dot(nextFrame.north));
  }
  return { x: next.x, z: next.z, heading: nextHeading, lon: next.lon, lat: next.lat };
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

// Bend every static mesh under `root` onto the globe and leave a solid core underneath.
export function projectCityToSphere(root, {
  radius = planetRadius(),
  coreColor = 0x1a2740
} = {}) {
  root.updateMatrixWorld(true);
  const invRoot = new THREE.Matrix4().copy(root.matrixWorld).invert();
  const bent = [];
  root.traverse((obj) => {
    if (!obj.isMesh || !obj.geometry) return;
    let cur = obj;
    while (cur) {
      if (cur.userData?.planetCore || cur.userData?.planetSkipBend) return;
      cur = cur.parent;
    }
    bakeMeshToSphere(obj, radius, invRoot);
    bent.push(obj);
  });

  // Reparent baked meshes to root with identity transforms — verts are already root-local.
  for (const mesh of bent) {
    if (mesh.parent && mesh.parent !== root) mesh.parent.remove(mesh);
    if (mesh.parent !== root) root.add(mesh);
    mesh.position.set(0, 0, 0);
    mesh.rotation.set(0, 0, 0);
    mesh.scale.set(1, 1, 1);
    mesh.updateMatrix();
  }

  disposePlanetDecor(root);
  const decor = buildNaturalPlanet(radius, coreColor);
  root.add(decor.group);
  root.userData.planetDecor = decor;
  return { radius, core: decor.core, atmosphere: decor.atmosphere, clouds: decor.clouds };
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
    const lat = (0.5 - v) * Math.PI;
    const ice = Math.pow(Math.max(0, Math.abs(Math.sin(lat)) - 0.78) / 0.22, 1.4);
    for (let x = 0; x < size; x++) {
      const u = x / size;
      // Wrap-friendly noise so the seam at lon 0 stays continuous.
      const n1 = fbm2(u * 4.2, v * 2.4 + 1.7, 5);
      const n2 = fbm2(u * 8.5 + 20, v * 4.8 + 3.1, 4);
      const ridge = 1 - Math.abs(n2 * 2 - 1);
      // Continental shelf + island freckles.
      let h = n1 * 0.72 + ridge * 0.22 + fbm2(u * 14, v * 8, 3) * 0.08;
      h += Math.sin((u + 0.13) * Math.PI * 2) * 0.03;
      const shore = THREE.MathUtils.smoothstep(0.42, 0.48, h);
      const land = THREE.MathUtils.smoothstep(0.45, 0.54, h);
      const mountain = THREE.MathUtils.smoothstep(0.62, 0.78, h + ridge * 0.08);

      // Deep → shallow ocean, then beach → forest → highland → rock.
      let r; let g; let b; let roughV;
      if (land < 0.01) {
        const depth = THREE.MathUtils.clamp((0.5 - h) * 1.6, 0, 1);
        r = or_ * (0.55 + (1 - depth) * 0.35);
        g = og * (0.6 + (1 - depth) * 0.45);
        b = Math.min(255, ob * (0.85 + (1 - depth) * 0.35) + depth * 18);
        roughV = 0.18 + depth * 0.35;
      } else {
        const beachR = 194; const beachG = 178; const beachB = 128;
        const grassR = 62; const grassG = 118; const grassB = 58;
        const highR = 92; const highG = 118; const highB = 72;
        const rockR = 118; const rockG = 112; const rockB = 98;
        const tBeach = 1 - shore;
        const tGrass = shore * (1 - mountain);
        const tHigh = land * mountain * (1 - mountain * 0.4);
        const tRock = mountain;
        const wSum = tBeach + tGrass + tHigh + tRock + 1e-6;
        r = (beachR * tBeach + grassR * tGrass + highR * tHigh + rockR * tRock) / wSum;
        g = (beachG * tBeach + grassG * tGrass + highG * tHigh + rockG * tRock) / wSum;
        b = (beachB * tBeach + grassB * tGrass + highB * tHigh + rockB * tRock) / wSum;
        // Blend from ocean into land at the coastline.
        const landMix = land;
        r = or_ * (1 - landMix) + r * landMix;
        g = og * (1 - landMix) + g * landMix;
        b = ob * (1 - landMix) + b * landMix;
        roughV = 0.72 + mountain * 0.22;
      }

      // Polar ice over both ocean and land.
      if (ice > 0.01) {
        r = r * (1 - ice) + 236 * ice;
        g = g * (1 - ice) + 244 * ice;
        b = b * (1 - ice) + 255 * ice;
        roughV = roughV * (1 - ice) + 0.55 * ice;
      }

      // Fine grain so the surface reads as natural terrain, not plastic.
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
  colorTex.wrapT = THREE.ClampToEdgeWrapping;
  colorTex.anisotropy = 8;

  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = size;
  roughCanvas.height = size;
  roughCanvas.getContext('2d').putImageData(rough, 0, 0);
  const roughTex = new THREE.CanvasTexture(roughCanvas);
  roughTex.wrapS = THREE.RepeatWrapping;
  roughTex.wrapT = THREE.ClampToEdgeWrapping;
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
    new THREE.SphereGeometry(Math.max(8, radius - 0.55), 128, 96),
    new THREE.MeshStandardMaterial({
      map: maps.color,
      roughnessMap: maps.roughness,
      roughness: 1,
      metalness: 0.05,
      emissive: new THREE.Color(0x0a1520),
      emissiveIntensity: 0.25,
      flatShading: false
    })
  );
  core.userData.planetCore = true;
  core.receiveShadow = true;
  group.add(core);

  // Soft inner haze + brighter outer rim — reads as a real atmosphere from orbit.
  const atmosphereInner = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 1.04, 64, 48),
    makeAtmosphereMaterial(0xa8d8ff, 0.35)
  );
  atmosphereInner.material.uniforms.uPower.value = 1.8;
  atmosphereInner.userData.planetCore = true;
  atmosphereInner.renderOrder = 2;
  group.add(atmosphereInner);

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 1.12, 64, 48),
    makeAtmosphereMaterial(0x6eb8ff, 0.95)
  );
  atmosphere.userData.planetCore = true;
  atmosphere.renderOrder = 3;
  group.add(atmosphere);

  const cloudMap = makeCloudTexture();
  // Unlit so orbital clouds stay visible even when the sun glances the limb.
  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 1.032, 80, 56),
    new THREE.MeshBasicMaterial({
      map: cloudMap,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  );
  clouds.userData.planetCore = true;
  clouds.renderOrder = 1;
  group.add(clouds);

  return { group, core, atmosphere, atmosphereInner, clouds, spin: 0 };
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
  // Keep the painted continents locked under the city; only clouds drift.
  const space = THREE.MathUtils.clamp((altitude - 180) / 1100, 0, 1);
  // Atmosphere shells are larger than the city: from street level the camera sits
  // inside them and BackSide Fresnel washes the whole frame blue. Only light them in the sky.
  const atmo = THREE.MathUtils.smoothstep(space, 0.12, 0.55);
  decor.atmosphere.material.uniforms.uIntensity.value = THREE.MathUtils.lerp(0, 1.85, atmo);
  if (decor.atmosphereInner) {
    decor.atmosphereInner.material.uniforms.uIntensity.value = THREE.MathUtils.lerp(0, 0.75, atmo);
    decor.atmosphereInner.visible = atmo > 0.02;
  }
  decor.atmosphere.visible = atmo > 0.02;
  decor.clouds.material.opacity = THREE.MathUtils.lerp(0.15, 0.72, Math.min(1, space + 0.2));
  decor.clouds.visible = true;
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
