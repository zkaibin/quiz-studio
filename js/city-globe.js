// Interactive world picker: Earth cities on a textured globe, plus tiny Planet Aurelia with its single wraparound city.
// Pick a city to read about it, jump to it in Google Earth (Earth only), or drive there.
import * as THREE from './vendor/three/three.module.min.js';
import { CITIES, EARTH_CITIES, PLANET_CITIES } from './city-cities.js';

const DEG = Math.PI / 180;
const latLon = (lat, lon, r = 1) => new THREE.Vector3(Math.cos(lat * DEG) * Math.cos(lon * DEG) * r, Math.sin(lat * DEG) * r, -Math.cos(lat * DEG) * Math.sin(lon * DEG) * r);
const googleEarthUrl = (c) => `https://earth.google.com/web/@${c.lat},${c.lon},40a,2500d,35y,0h,60t,0r`;
const fmt = (v, pos, neg) => `${Math.abs(v).toFixed(3)}° ${v >= 0 ? pos : neg}`;
const lapKm = (city) => ((city.grid * 140) / 1000).toFixed(1).replace(/\.0$/, '');

export function createGlobe({ stage, labels, card, worlds, onDrive, getCurrentId }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  stage.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
  const loader = new THREE.TextureLoader();
  const earthTex = loader.load('js/vendor/earth/earth_atmos_2048.jpg');
  earthTex.colorSpace = THREE.SRGBColorSpace;
  earthTex.anisotropy = 8;
  const cloudTex = loader.load('js/vendor/earth/earth_clouds_1024.png');
  cloudTex.colorSpace = THREE.SRGBColorSpace;

  scene.add(new THREE.AmbientLight(0x8fa4c8, 0.9));
  const sun = new THREE.DirectionalLight(0xfff2dc, 2.6);
  sun.position.set(-3, 2, 4);
  scene.add(sun);

  const pivot = new THREE.Group();
  scene.add(pivot);

  // --- Earth ---
  const earthRoot = new THREE.Group();
  const earthGlobe = new THREE.Group();
  earthRoot.add(earthGlobe);
  pivot.add(earthRoot);
  earthGlobe.add(new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), new THREE.MeshPhongMaterial({ map: earthTex, shininess: 14, specular: 0x223344 })));
  const clouds = new THREE.Mesh(new THREE.SphereGeometry(1.012, 64, 48), new THREE.MeshPhongMaterial({ map: cloudTex, transparent: true, opacity: 0.55, depthWrite: false }));
  earthGlobe.add(clouds);

  const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(1.16, 64, 48), new THREE.ShaderMaterial({
    transparent: true, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
    vertexShader: 'varying vec3 n; void main(){ n = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'varying vec3 n; void main(){ float i = pow(0.72 - dot(n, vec3(0.0,0.0,1.0)), 3.0); gl_FragColor = vec4(0.35,0.62,1.0,1.0) * i * 1.5; }'
  }));
  earthRoot.add(atmosphere);
  const rim = new THREE.Mesh(new THREE.SphereGeometry(1.015, 64, 48), new THREE.ShaderMaterial({
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    vertexShader: 'varying vec3 n; void main(){ n = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'varying vec3 n; void main(){ float i = pow(1.0 - abs(dot(n, vec3(0.0,0.0,1.0))), 2.6); gl_FragColor = vec4(0.4,0.7,1.0,1.0) * i * 0.9; }'
  }));
  earthRoot.add(rim);

  const grid = [];
  for (let lat = -60; lat <= 60; lat += 30) for (let lon = 0; lon < 360; lon += 4) grid.push(latLon(lat, lon, 1.004), latLon(lat, lon + 4, 1.004));
  for (let lon = 0; lon < 360; lon += 30) for (let lat = -84; lat < 84; lat += 4) grid.push(latLon(lat, lon, 1.004), latLon(lat + 4, lon, 1.004));
  earthGlobe.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(grid), new THREE.LineBasicMaterial({ color: 0x5fd4ff, transparent: true, opacity: 0.16, depthWrite: false })));

  // --- Tiny Planet Aurelia ---
  const aureliaRoot = new THREE.Group();
  const aureliaGlobe = new THREE.Group();
  aureliaRoot.add(aureliaGlobe);
  pivot.add(aureliaRoot);
  aureliaRoot.visible = false;
  const aureliaMat = new THREE.MeshPhongMaterial({
    color: 0x3d6b7a, emissive: 0x142028, shininess: 28, specular: 0x88aacc
  });
  // Procedural city-lights texture via canvas so Aurelia looks occupied end-to-end.
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#1a3048');
  grad.addColorStop(0.45, '#2f6b6a');
  grad.addColorStop(0.55, '#c4a46a');
  grad.addColorStop(1, '#1a3048');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 900; i++) {
    ctx.fillStyle = `rgba(255,${180 + (i % 60)},${80 + (i % 40)},${0.25 + (i % 5) * 0.1})`;
    ctx.fillRect((i * 97) % 512, (i * 53) % 512, 1 + (i % 3), 1 + (i % 2));
  }
  for (let y = 40; y < 480; y += 28) {
    ctx.strokeStyle = 'rgba(255,210,120,0.22)';
    ctx.beginPath();
    ctx.moveTo(0, y + Math.sin(y) * 4);
    ctx.lineTo(512, y + Math.cos(y) * 4);
    ctx.stroke();
  }
  const aureliaTex = new THREE.CanvasTexture(canvas);
  aureliaTex.colorSpace = THREE.SRGBColorSpace;
  aureliaMat.map = aureliaTex;
  aureliaGlobe.add(new THREE.Mesh(new THREE.SphereGeometry(0.42, 64, 48), aureliaMat));
  const aureliaAtmo = new THREE.Mesh(new THREE.SphereGeometry(0.52, 48, 32), new THREE.ShaderMaterial({
    transparent: true, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
    vertexShader: 'varying vec3 n; void main(){ n = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'varying vec3 n; void main(){ float i = pow(0.7 - dot(n, vec3(0.0,0.0,1.0)), 2.8); gl_FragColor = vec4(0.55,0.85,1.0,1.0) * i * 1.35 + vec4(0.55,0.35,0.95,0.0) * i * 0.55; }'
  }));
  aureliaRoot.add(aureliaAtmo);
  // Tiny orbit ring to sell the "pocket planet" scale next to Earth memories.
  const ringPts = [];
  for (let k = 0; k <= 96; k++) ringPts.push(new THREE.Vector3(Math.cos((k / 96) * Math.PI * 2) * 0.72, 0, Math.sin((k / 96) * Math.PI * 2) * 0.72));
  const orbitRing = new THREE.Line(new THREE.BufferGeometry().setFromPoints(ringPts), new THREE.LineBasicMaterial({ color: 0xffb454, transparent: true, opacity: 0.45 }));
  orbitRing.rotation.x = 0.4;
  aureliaRoot.add(orbitRing);

  const starPositions = [];
  for (let i = 0; i < 1400; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(18 + Math.random() * 14);
    starPositions.push(v.x, v.y, v.z);
  }
  const stars = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3)), new THREE.PointsMaterial({ color: 0xdfe8ff, size: 0.07, sizeAttenuation: true, transparent: true, opacity: 0.85 }));
  scene.add(stars);

  const orbiters = [];
  [[1.35, 52, 0, 0xffd23b, 0.35], [1.5, 20, 100, 0x6ff0c0, -0.25], [1.28, 75, 210, 0xff8fb0, 0.5]].forEach(([r, inc, node, color, speed]) => {
    const orbit = new THREE.Group();
    orbit.rotation.set(inc * DEG, node * DEG, 0);
    const pts = [];
    for (let k = 0; k <= 128; k++) pts.push(new THREE.Vector3(Math.cos((k / 128) * Math.PI * 2) * r, 0, Math.sin((k / 128) * Math.PI * 2) * r));
    orbit.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.22 })));
    const sat = new THREE.Group();
    sat.add(new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.022, 0.03), new THREE.MeshBasicMaterial({ color: 0xffffff })));
    for (const s of [-1, 1]) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.002, 0.022), new THREE.MeshBasicMaterial({ color }));
      panel.position.x = s * 0.04;
      sat.add(panel);
    }
    orbit.add(sat);
    earthRoot.add(orbit);
    orbiters.push({ sat, r, speed, phase: Math.random() * 6 });
  });

  const beaconMat = (c) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending });
  const labelHost = labels;
  labelHost.innerHTML = '';

  function makePins(list, globe, radius, color = 0xffd23b) {
    const pins = [];
    const hitMeshes = [];
    for (const city of list) {
      const pos = latLon(city.lat, city.lon, radius);
      const holder = new THREE.Group();
      holder.position.copy(pos);
      holder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
      const dot = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.012, 12, 8), new THREE.MeshBasicMaterial({ color }));
      const column = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.0025, radius * 0.0025, radius * 0.12, 6), beaconMat(color));
      column.position.y = radius * 0.06;
      const rings = [0, 1].map(() => {
        const ring = new THREE.Mesh(new THREE.RingGeometry(radius * 0.018, radius * 0.021, 40), beaconMat(0x7fe6ff));
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = radius * 0.003;
        holder.add(ring);
        return ring;
      });
      const hit = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.045, 8, 6), new THREE.MeshBasicMaterial({ visible: false }));
      hit.userData.city = city;
      holder.add(dot, column, hit);
      globe.add(holder);
      hitMeshes.push(hit);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'globe-label';
      button.innerHTML = `<i></i><span>${city.name}</span>`;
      button.addEventListener('click', () => select(city));
      labelHost.appendChild(button);
      pins.push({ city, pos, rings, column, button, globe });
    }
    return { pins, hitMeshes };
  }

  const earthPins = makePins(EARTH_CITIES, earthGlobe, 1, 0xffd23b);
  const aureliaPins = makePins(PLANET_CITIES, aureliaGlobe, 0.42, 0xffb454);
  let pins = earthPins.pins;
  let hitMeshes = earthPins.hitMeshes;

  const arcs = [];
  const arcGroup = new THREE.Group();
  earthGlobe.add(arcGroup);
  function rebuildArcs(from) {
    for (const a of arcs) { arcGroup.remove(a.line); a.line.geometry.dispose(); a.plane.geometry.dispose(); arcGroup.remove(a.plane); }
    arcs.length = 0;
    if (!from || from.planet) return;
    const a = latLon(from.lat, from.lon);
    for (const to of EARTH_CITIES) {
      if (to === from) continue;
      const b = latLon(to.lat, to.lon);
      const angle = a.angleTo(b);
      const mid = a.clone().add(b).normalize().multiplyScalar(1 + angle * 0.32);
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      const pts = curve.getPoints(64);
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0xffd23b, transparent: true, opacity: 0.55, depthWrite: false }));
      const plane = new THREE.Mesh(new THREE.SphereGeometry(0.011, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      arcGroup.add(line, plane);
      arcs.push({ line, plane, curve, offset: Math.random() });
    }
  }

  let worldId = 'earth';
  let target = { lon: 0, lat: 20, dist: 3.6 };
  const view = { ...target };
  let selected = null;
  let open = false;
  let dragging = null;
  let idle = 0;
  let frameId = 0;
  const clock = new THREE.Clock();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const hud = document.querySelector('.globe-hud');

  function applyWorld(id) {
    worldId = id === 'aurelia' ? 'aurelia' : 'earth';
    const isAurelia = worldId === 'aurelia';
    earthRoot.visible = !isAurelia;
    aureliaRoot.visible = isAurelia;
    pins = isAurelia ? aureliaPins.pins : earthPins.pins;
    hitMeshes = isAurelia ? aureliaPins.hitMeshes : earthPins.hitMeshes;
    earthPins.pins.forEach((p) => { p.button.style.display = isAurelia ? 'none' : ''; });
    aureliaPins.pins.forEach((p) => { p.button.style.display = isAurelia ? '' : 'none'; });
    if (worlds) {
      worlds.querySelectorAll('[data-world]').forEach((btn) => btn.classList.toggle('on', btn.dataset.world === worldId));
    }
    if (hud) {
      hud.querySelector('.eyebrow').textContent = isAurelia ? 'PLANET AURELIA · SPHERE-NET' : 'EARTH · LIVE VIEW';
      hud.querySelector('h2').textContent = isAurelia ? 'Alien city, no poles' : 'Pick your city';
      hud.querySelector('p:last-of-type').textContent = isAurelia
        ? 'Circadia spans a sphere-net world lit by twin sun satellites. Fly anywhere — districts stream in as you explore.'
        : 'Drag to spin, scroll to zoom, tap a beacon. Yellow arcs show flights from the selected city.';
    }
  }

  function setWorld(id, { city = null, pickFirst = false } = {}) {
    applyWorld(id);
    const list = worldId === 'aurelia' ? PLANET_CITIES : EARTH_CITIES;
    const pick = city || (pickFirst ? list[0] : (list.find((c) => c.id === selected?.id) || list[0]));
    if (pick) select(pick);
  }

  function select(city) {
    const want = city.planet ? 'aurelia' : 'earth';
    if (want !== worldId) {
      setWorld(want, { city });
      return;
    }
    selected = city;
    const delta = ((((city.lon - view.lon) % 360) + 540) % 360) - 180;
    target = { lon: view.lon + delta, lat: city.lat, dist: city.planet ? 1.85 : 2.7 };
    idle = -1;
    rebuildArcs(city);
    pins.forEach((p) => p.button.classList.toggle('on', p.city === city));
    card.hidden = false;
    const blocks = city.grid * city.grid;
    const meta = city.planet
      ? `<span>${city.drive === 'left' ? 'LEFT-HAND' : 'RIGHT-HAND'} TRAFFIC</span><span>WRAPAROUND · ${lapKm(city)} km LAP</span><span>NO EDGE</span>`
      : `<span>${city.drive === 'left' ? 'LEFT-HAND' : 'RIGHT-HAND'} TRAFFIC</span><span>${blocks} CITY BLOCKS</span>`;
    const earthLink = city.planet
      ? ''
      : `<a class="secondary-button globe-earth" href="${googleEarthUrl(city)}" target="_blank" rel="noopener noreferrer">Open in Google Earth ↗</a>`;
    const coords = city.planet
      ? `<p class="globe-coords">Pocket world · ~${lapKm(city)} km around</p>`
      : `<p class="globe-coords">${fmt(city.lat, 'N', 'S')} · ${fmt(city.lon, 'E', 'W')}</p>`;
    card.innerHTML = `
      <p class="eyebrow">${city.country.toUpperCase()}</p>
      <h2>${city.name}</h2>
      ${coords}
      <p class="intro">${city.blurb}.</p>
      <p class="globe-meta">${meta}</p>
      <button type="button" class="primary-button" data-drive>Drive in ${city.name} <span>↗</span></button>
      ${earthLink}`;
    card.querySelector('[data-drive]').addEventListener('click', () => onDrive(city));
  }

  function resize() {
    const w = stage.clientWidth || 800; const h = stage.clientHeight || 600;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    if (w > 760) camera.setViewOffset(w, h, w * 0.14, 0, w, h); else camera.clearViewOffset();
    camera.updateProjectionMatrix();
  }

  const tmp = new THREE.Vector3();
  const camPos = new THREE.Vector3();
  function frame() {
    frameId = requestAnimationFrame(frame);
    const dt = Math.min(0.05, clock.getDelta());
    const t = clock.elapsedTime;
    if (!dragging) {
      idle += dt;
      if (!selected && idle > 1.5) target.lon += dt * 5;
    }
    const k = 1 - Math.exp(-dt * 5);
    view.lon += (target.lon - view.lon) * k;
    view.lat += (target.lat - view.lat) * k;
    view.dist += (target.dist - view.dist) * k;
    pivot.rotation.x = view.lat * DEG;
    earthGlobe.rotation.y = -view.lon * DEG - Math.PI / 2;
    aureliaGlobe.rotation.y = -view.lon * DEG - Math.PI / 2;
    clouds.rotation.y = t * 0.004;
    orbitRing.rotation.z = t * 0.15;
    camera.position.set(0, 0, view.dist);
    stars.rotation.y = t * 0.002;
    camPos.copy(camera.position);
    const current = getCurrentId?.();
    for (const o of orbiters) {
      const a = o.phase + t * o.speed;
      o.sat.position.set(Math.cos(a) * o.r, 0, Math.sin(a) * o.r);
      o.sat.rotation.y = -a;
    }
    const w = renderer.domElement.clientWidth; const h = renderer.domElement.clientHeight;
    for (const pin of pins) {
      pin.rings.forEach((ring, n) => {
        const p = (t * 0.7 + n * 0.5) % 1;
        ring.scale.setScalar(1 + p * 3.2);
        ring.material.opacity = (1 - p) * 0.8;
      });
      pin.column.material.opacity = 0.55 + Math.sin(t * 3 + pin.pos.x * 9) * 0.3;
      tmp.copy(pin.pos).applyMatrix4(pin.globe.matrixWorld);
      const facing = tmp.dot(camPos) > (worldId === 'aurelia' ? 0.35 : 1.02);
      tmp.project(camera);
      pin.button.style.display = facing ? '' : 'none';
      pin.button.style.transform = `translate(${(tmp.x * 0.5 + 0.5) * w}px, ${(-tmp.y * 0.5 + 0.5) * h}px)`;
      pin.button.classList.toggle('here', pin.city.id === current);
    }
    for (const arc of arcs) {
      const p = (t * 0.12 + arc.offset) % 1;
      arc.curve.getPoint(p, arc.plane.position);
    }
    renderer.render(scene, camera);
  }

  const canvasEl = renderer.domElement;
  canvasEl.addEventListener('pointerdown', (event) => {
    canvasEl.setPointerCapture(event.pointerId);
    dragging = { x: event.clientX, y: event.clientY, moved: 0 };
  });
  canvasEl.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const dx = event.clientX - dragging.x; const dy = event.clientY - dragging.y;
    dragging.x = event.clientX; dragging.y = event.clientY;
    dragging.moved += Math.abs(dx) + Math.abs(dy);
    const speed = 0.32 * (view.dist / 3.6);
    target.lon -= dx * speed; view.lon = target.lon;
    target.lat = Math.max(-80, Math.min(80, target.lat + dy * speed)); view.lat = target.lat;
    idle = 0;
  });
  canvasEl.addEventListener('pointerup', (event) => {
    const moved = dragging?.moved || 0;
    dragging = null;
    if (moved > 5) return;
    const rect = canvasEl.getBoundingClientRect();
    pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(hitMeshes)[0];
    if (hit) select(hit.object.userData.city);
  });
  canvasEl.addEventListener('wheel', (event) => {
    event.preventDefault();
    const min = worldId === 'aurelia' ? 1.05 : 1.35;
    const max = worldId === 'aurelia' ? 3.6 : 5.2;
    target.dist = Math.max(min, Math.min(max, target.dist * (1 + Math.sign(event.deltaY) * 0.1)));
  }, { passive: false });
  window.addEventListener('resize', () => { if (open) resize(); });

  if (worlds) {
    worlds.addEventListener('click', (event) => {
      const button = event.target.closest('[data-world]');
      if (button) setWorld(button.dataset.world, { pickFirst: true });
    });
  }

  return {
    open(cityId) {
      open = true;
      resize();
      const city = CITIES.find((c) => c.id === cityId) || EARTH_CITIES[0];
      view.lon = city.lon + (city.planet ? 20 : 70);
      view.lat = city.lat;
      view.dist = city.planet ? 2.8 : 4.6;
      setWorld(city.planet ? 'aurelia' : 'earth', { city });
      cancelAnimationFrame(frameId);
      clock.start();
      frame();
    },
    close() {
      open = false;
      cancelAnimationFrame(frameId);
    }
  };
}
