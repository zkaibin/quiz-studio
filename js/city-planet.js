// True spherical pocket planet: bend a fully-built wrap city onto a globe and
// move/fly in the local tangent frame so there is never a city "edge".
import * as THREE from './vendor/three/three.module.min.js';
import { SIZE, wrapCoord } from './city-map.js';

// Keep a small polar cap of bare globe so equirectangular rows are not crushed to a point.
const LAT_PAD = 0.07;
const _v = new THREE.Vector3();
const _n = new THREE.Vector3();
const _east = new THREE.Vector3();
const _up = new THREE.Vector3();
const _north = new THREE.Vector3();
const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _look = new THREE.Matrix4();

export function planetRadius() {
  // Equatorial circumference matches one map lap (SIZE metres).
  return SIZE / (Math.PI * 2);
}

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
  const frame = tangentFrame(lon, lat, { up: out.up, east: out.east, north: out.north, quat: out.basisQuat });
  const quat = out.quaternion || new THREE.Quaternion();
  // Heading: 0 = north, positive turns right (toward east), matching flat sin/cos heading.
  _q.setFromAxisAngle(frame.up, -heading);
  quat.copy(frame.quat).premultiply(_q);
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

function bakeMeshToSphere(mesh, radius, invRoot) {
  if (!mesh.geometry || mesh.userData.sphereBent) return;
  const geo = mesh.geometry.clone();
  mesh.geometry = geo;
  mesh.userData.sphereBent = true;
  if (mesh.geometry.userData) mesh.geometry.userData.sphereBent = true;

  mesh.updateWorldMatrix(true, false);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    _v.fromBufferAttribute(pos, i);
    _v.applyMatrix4(mesh.matrixWorld);
    const bent = flatToSphere(_v.x, _v.y, _v.z, radius);
    bent.applyMatrix4(invRoot);
    pos.setXYZ(i, bent.x, bent.y, bent.z);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
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

  let core = root.userData.planetCoreMesh;
  if (!core) {
    core = new THREE.Mesh(
      new THREE.SphereGeometry(Math.max(8, radius - 1.2), 64, 48),
      new THREE.MeshStandardMaterial({
        color: coreColor,
        roughness: 0.92,
        metalness: 0.04,
        flatShading: false
      })
    );
    core.userData.planetCore = true;
    core.receiveShadow = true;
    root.add(core);
    root.userData.planetCoreMesh = core;
  } else {
    core.geometry.dispose();
    core.geometry = new THREE.SphereGeometry(Math.max(8, radius - 1.2), 64, 48);
    core.material.color.setHex(coreColor);
  }
  return { radius, core };
}

export function placeObjectOnSphere(object, x, y, z, heading = 0, radius = planetRadius()) {
  const pose = poseOnSphere(x, y, z, heading, radius, {
    position: object.position,
    quaternion: object.quaternion,
    up: object.userData._planetUp || (object.userData._planetUp = new THREE.Vector3()),
    east: _east,
    north: _north,
    basisQuat: _q
  });
  object.position.copy(pose.position);
  object.quaternion.copy(pose.quaternion);
  return pose;
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
