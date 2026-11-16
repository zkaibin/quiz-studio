import * as THREE from './vendor/three/three.module.min.js';
import { CARS, UPGRADES, MAX_UPGRADE_LEVEL, defaultUpgrades, upgradeCost, computeStats, buildCarModel } from './city-cars.js';
import { createGarageStore } from './city-garage.js';

(() => {
  const mount = document.getElementById('city-scene');
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  mount.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa9d5e5);
  scene.fog = new THREE.Fog(0xa9d5e5, 85, 370);
  const baseFov = 62;
  const camera = new THREE.PerspectiveCamera(baseFov, mount.clientWidth / mount.clientHeight, 0.1, 500);
  camera.position.set(0, 5.0, 11.8);
  camera.lookAt(0, 1.1, -16);
  scene.add(new THREE.HemisphereLight(0xe4f6ff, 0x7d826d, 2.0));
  const sunlight = new THREE.DirectionalLight(0xffefd2, 2.4);
  sunlight.position.set(-35, 55, 20);
  scene.add(sunlight);

  const mat = (color, roughness = 0.82, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const materials = {
    asphalt: mat(0x444b4c), ground: mat(0x91ad89), sidewalk: mat(0xc5c2ad),
    lane: mat(0xf4db9c, 0.7), white: mat(0xf4f2dc, 0.65),
    car: mat(0xd9684c, 0.35, 0.12), dark: mat(0x18272a, 0.6), glass: mat(0x8db6bc, 0.25, 0.08),
    tire: mat(0x202626, 0.95), lamp: mat(0xffe6a3, 0.3), trunk: mat(0x80634c),
    leaf: mat(0x387b5b), shop1: mat(0xe8c5a1), shop2: mat(0x9cc5bd), shop3: mat(0xd9a28b),
    tower1: mat(0xd2d8d1), tower2: mat(0x94b3bc), tower3: mat(0xe6d7bd), window: mat(0x477481, 0.3, 0.15),
    sign: mat(0x276e67), red: mat(0xdc7055), blue: mat(0x43899a), yellow: mat(0xd8ae55)
  };
  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const cylinderGeo = new THREE.CylinderGeometry(1, 1, 1, 8);

  function box(parent, material, x, y, z, sx, sy, sz) {
    const mesh = new THREE.Mesh(boxGeo, material);
    mesh.position.set(x, y, z);
    mesh.scale.set(sx, sy, sz);
    parent.add(mesh);
    return mesh;
  }

  function cylinder(parent, material, x, y, z, radius, height, sides = 8) {
    const geometry = sides === 8 ? cylinderGeo : new THREE.CylinderGeometry(radius, radius, height, sides);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.scale.set(radius, height, radius);
    parent.add(mesh);
    return mesh;
  }

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(230, 510), materials.ground);
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, -0.15, -215);
  scene.add(ground);
  const road = new THREE.Mesh(new THREE.PlaneGeometry(16, 510), materials.asphalt);
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, -0.04, -215);
  scene.add(road);

  for (const x of [-7.65, 7.65]) {
    const curb = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.16, 510), materials.sidewalk);
    curb.position.set(x, 0.02, -215);
    scene.add(curb);
    const verge = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.12, 510), materials.ground);
    verge.position.set(x + Math.sign(x) * 1.5, -0.02, -215);
    scene.add(verge);
  }

  const roadMarks = [];
  const dashSpacing = 13;
  const dashCount = 41;
  function roadMark(x, z, width, length, material, moves = false) {
    const mark = new THREE.Mesh(new THREE.BoxGeometry(width, 0.025, length), material);
    mark.position.set(x, 0.012, z);
    scene.add(mark);
    if (moves) roadMarks.push(mark);
  }
  for (const x of [-7.1, -3.55, 3.55, 7.1]) {
    for (let i = 0; i < dashCount; i++) roadMark(x, -490 + i * dashSpacing, x === -3.55 || x === 3.55 ? 0.1 : 0.16, 6, materials.white, true);
  }
  roadMark(-0.09, -215, 0.12, 510, materials.lane);
  roadMark(0.09, -215, 0.12, 510, materials.lane);

  const urbanBlocks = [];
  let seed = 28;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  function addPalm(group, x, z) {
    const palm = new THREE.Group();
    palm.position.set(x, 0, z);
    group.add(palm);
    const trunkMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.27, 4.7, 7), materials.trunk);
    trunkMesh.position.y = 2.35;
    palm.add(trunkMesh);
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const frond = new THREE.Mesh(new THREE.BoxGeometry(0.33, 0.13, 2.5), materials.leaf);
      frond.position.set(Math.sin(angle) * 0.9, 4.65, Math.cos(angle) * 0.9);
      frond.rotation.y = -angle;
      frond.rotation.x = -0.35;
      palm.add(frond);
    }
  }

  function addLamp(group, x, z) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.1, 5, 7), materials.dark);
    post.position.set(x, 2.5, z);
    group.add(post);
    box(group, materials.dark, x - Math.sign(x) * 0.65, 4.85, z, 1.3, 0.09, 0.09);
    const light = new THREE.Mesh(new THREE.SphereGeometry(0.17, 8, 6), materials.lamp);
    light.position.set(x - Math.sign(x) * 1.25, 4.72, z);
    group.add(light);
  }

  function addBuilding(group, side, z, slot) {
    const shop = slot === 0;
    const width = shop ? 9 + random() * 3 : 11 + random() * 3;
    const depth = shop ? 15 + random() * 4 : 20 + random() * 7;
    const height = shop ? 8 + random() * 5 : 20 + random() * 46;
    const x = side * (11.5 + (slot === 0 ? 0 : 6));
    const facade = shop
      ? [materials.shop1, materials.shop2, materials.shop3][Math.floor(random() * 3)]
      : [materials.tower1, materials.tower2, materials.tower3][Math.floor(random() * 3)];
    box(group, facade, x, height / 2, z, width, height, depth);
    box(group, shop ? materials.red : materials.window, x - side * (width / 2 + 0.04), shop ? 2 : height / 2, z, 0.1, shop ? 2.5 : height * 0.7, depth * 0.78);
    if (shop) {
      box(group, materials.sign, x - side * (width / 2 + 0.11), 4.1, z, 0.16, 0.55, depth * 0.84);
      for (let window = -1; window <= 1; window++) {
        box(group, materials.window, x - side * (width / 2 + 0.12), 1.8, z + window * 4.2, 0.12, 1.65, 2.7);
        box(group, materials.white, x - side * (width / 2 + 0.2), 0.12, z + window * 4.2, 0.35, 0.12, 2.8);
      }
    } else {
      const rows = Math.max(3, Math.floor(height / 5));
      for (let row = 0; row < rows; row++) {
        for (let col = -1; col <= 1; col++) {
          box(group, materials.window, x - side * (width / 2 + 0.06), 3 + row * 4.2, z + col * depth * 0.25, 0.12, 1.5, 1.5);
        }
      }
      box(group, facade, x, height + 0.35, z, width * 0.88, 0.7, depth * 0.88);
    }
  }

  for (let i = 0; i < 8; i++) {
    const block = new THREE.Group();
    block.position.z = -i * 64;
    addBuilding(block, -1, -16, 0);
    addBuilding(block, 1, -16, 0);
    addBuilding(block, -1, -44, 1);
    addBuilding(block, 1, -44, 1);
    for (let k = 0; k < 4; k++) {
      addPalm(block, -9.3, -8 - k * 16);
      addPalm(block, 9.3, -16 - k * 16);
      addLamp(block, -8.7, -2 - k * 16);
      addLamp(block, 8.7, -10 - k * 16);
    }
    for (let k = 0; k < 16; k++) {
      for (const side of [-1, 1]) box(block, k % 2 ? materials.red : materials.white, side * 7.75, 0.28, -k * 4, 0.16, 0.3, 1.4);
    }
    urbanBlocks.push(block);
    scene.add(block);
  }

  const player = new THREE.Group();
  player.position.set(-1.75, 0, 2.6);
  scene.add(player);
  let carModel = null;
  let currentCar = CARS[0];
  let stats = computeStats(currentCar);
  function showCar(car, colorHex, upgrades) {
    currentCar = car;
    stats = computeStats(car, upgrades);
    if (carModel) {
      player.remove(carModel);
      carModel.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
    }
    carModel = buildCarModel(THREE, car, colorHex);
    player.add(carModel);
  }
  showCar(CARS[0], CARS[0].colors[0], defaultUpgrades());

  const trafficMaterials = [materials.blue, materials.yellow, materials.shop2, materials.tower1, materials.red];
  const traffic = [];
  function makeTrafficCar(index) {
    const car = new THREE.Group();
    const color = trafficMaterials[index % trafficMaterials.length];
    box(car, color, 0, 0.72, 0, 1.8, 0.68, 3.7);
    box(car, materials.dark, 0, 1.2, -0.12, 1.42, 0.5, 1.7);
    box(car, materials.glass, 0, 1.25, -0.14, 1.27, 0.37, 1.45);
    for (const x of [-0.65, 0.65]) {
      box(car, materials.lamp, x, 0.76, -1.85, 0.25, 0.13, 0.07);
      box(car, materials.red, x, 0.75, 1.86, 0.25, 0.13, 0.07);
    }
    for (const x of [-0.93, 0.93]) {
      for (const z of [-1.12, 1.12]) {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.2, 10), materials.tire);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(x, 0.37, z);
        car.add(wheel);
      }
    }
    car.userData = { oncoming: index % 4 === 3, lane: index % 2, cooldown: 0 };
    resetTraffic(car, index, true);
    scene.add(car);
    traffic.push(car);
  }

  function resetTraffic(car, index, initial = false) {
    const oncoming = car.userData.oncoming;
    car.position.x = oncoming
      ? (car.userData.lane === 0 ? 1.8 : 5.2)
      : (car.userData.lane === 0 ? -1.75 : -5.25);
    car.position.z = initial ? -38 - index * 30 : -220 - random() * 190;
    car.rotation.y = oncoming ? Math.PI : 0;
    car.userData.cooldown = 0.8;
  }
  for (let i = 0; i < 11; i++) makeTrafficCar(i);

  const keys = new Set();
  const controls = { left: false, right: false, gas: false, brake: false };
  const hud = document.querySelector('.hud');
  const speedOutput = document.getElementById('speed');
  const distanceOutput = document.getElementById('distance');
  const stateOutput = document.getElementById('drive-state');
  const startPanel = document.getElementById('welcome');
  const pausePanel = document.getElementById('paused');
  const pauseButton = document.getElementById('pause-drive');
  const hint = document.getElementById('hint');
  let running = false;
  let speed = 0;
  let distance = 0;
  let playerX = -1.75;
  let lastTime = 0;
  let collisionCooldown = 0;
  let steerInput = 0;
  let wheelAngle = 0;
  const tiltToggle = document.getElementById('tilt-toggle');
  const touchControls = document.querySelector('.touch-controls');
  const tiltNeedle = document.getElementById('tilt-needle');
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
  const tilt = { enabled: false, listening: false, raw: 0, neutral: null, value: 0 };

  function screenAngle() {
    return (screen.orientation && typeof screen.orientation.angle === 'number') ? screen.orientation.angle : (window.orientation || 0);
  }
  // Derive the wheel angle from the gravity direction in screen space; stable even when the phone is held upright.
  function onOrientation(event) {
    if (event.beta == null || event.gamma == null) return;
    const beta = THREE.MathUtils.degToRad(event.beta);
    const gamma = THREE.MathUtils.degToRad(event.gamma);
    const ux = -Math.cos(beta) * Math.sin(gamma);
    const uy = Math.sin(beta);
    const a = THREE.MathUtils.degToRad(screenAngle());
    const sx = ux * Math.cos(a) - uy * Math.sin(a);
    const sy = ux * Math.sin(a) + uy * Math.cos(a);
    if (Math.hypot(sx, sy) < 0.3) return;
    tilt.raw = THREE.MathUtils.radToDeg(Math.atan2(-sx, sy));
    if (tilt.neutral === null) tilt.neutral = tilt.raw;
    let delta = tilt.raw - tilt.neutral;
    delta = ((delta + 540) % 360) - 180;
    const dead = 3;
    const magnitude = Math.max(0, Math.abs(delta) - dead) / (28 - dead);
    tilt.value = THREE.MathUtils.clamp(Math.sign(delta) * magnitude, -1, 1);
  }
  async function setTilt(enabled) {
    if (enabled) {
      try {
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
          if (await DeviceOrientationEvent.requestPermission() !== 'granted') enabled = false;
        }
      } catch (error) {
        enabled = false;
      }
    }
    if (enabled && !tilt.listening) {
      window.addEventListener('deviceorientation', onOrientation);
      tilt.listening = true;
    }
    tilt.enabled = enabled && 'DeviceOrientationEvent' in window;
    tilt.neutral = null;
    tilt.value = 0;
    tiltToggle.textContent = `TILT STEER: ${tilt.enabled ? 'ON' : 'OFF'}`;
    tiltToggle.classList.toggle('on', tilt.enabled);
    touchControls.classList.toggle('tilt-on', tilt.enabled);
  }
  if (isTouchDevice && 'DeviceOrientationEvent' in window) {
    tiltToggle.hidden = false;
    tiltToggle.addEventListener('click', () => setTilt(!tilt.enabled));
  }
  window.addEventListener('orientationchange', () => { tilt.neutral = null; });

  function steerAxis() {
    const buttons = (isPressed('right') ? 1 : 0) - (isPressed('left') ? 1 : 0);
    return buttons || (tilt.enabled ? tilt.value : 0);
  }

  function isPressed(action) {
    if (action === 'left') return controls.left || keys.has('ArrowLeft') || keys.has('a');
    if (action === 'right') return controls.right || keys.has('ArrowRight') || keys.has('d');
    if (action === 'gas') return controls.gas || keys.has('ArrowUp') || keys.has('w');
    return controls.brake || keys.has('ArrowDown') || keys.has('s') || keys.has(' ');
  }

  function setRunning(value) {
    running = value;
    hud.classList.toggle('active', value);
    pauseButton.disabled = !value;
    stateOutput.textContent = value ? 'ON THE ROAD' : 'READY';
    if (value) tilt.neutral = null;
    startPanel.classList.toggle('hidden', value);
    pausePanel.classList.toggle('hidden', value || !hasStarted);
    hint.style.display = value ? '' : 'none';
    if (value) lastTime = performance.now();
  }
  let hasStarted = false;

  function startDrive() {
    if (isTouchDevice && !tilt.asked && 'DeviceOrientationEvent' in window) {
      tilt.asked = true;
      setTilt(true);
    } else {
      tilt.neutral = null;
    }
    hasStarted = true;
    speed = 0;
    distance = 0;
    playerX = -1.75;
    player.position.x = playerX;
    player.rotation.set(0, 0, 0);
    for (let i = 0; i < traffic.length; i++) resetTraffic(traffic[i], i, true);
    distanceOutput.textContent = '0.0';
    setRunning(true);
  }
  function togglePause() {
    if (!hasStarted) return;
    if (running) {
      running = false;
      stateOutput.textContent = 'PAUSED';
      hud.classList.remove('active');
      pausePanel.classList.remove('hidden');
    } else {
      pausePanel.classList.add('hidden');
      setRunning(true);
    }
  }

  document.getElementById('start-drive').addEventListener('click', startDrive);
  document.getElementById('resume-drive').addEventListener('click', () => {
    pausePanel.classList.add('hidden');
    setRunning(true);
  });
  document.getElementById('end-drive').addEventListener('click', () => {
    hasStarted = false;
    running = false;
    pausePanel.classList.add('hidden');
    startPanel.classList.remove('hidden');
    stateOutput.textContent = 'READY';
    hud.classList.remove('active');
    pauseButton.disabled = true;
  });
  pauseButton.addEventListener('click', togglePause);
  window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(key)) event.preventDefault();
    keys.add(key);
    if (key === 'p' && hasStarted) togglePause();
  });
  window.addEventListener('keyup', (event) => keys.delete(event.key.toLowerCase()));
  window.addEventListener('blur', () => {
    keys.clear();
    for (const key of Object.keys(controls)) controls[key] = false;
  });
  document.querySelectorAll('[data-control]').forEach((button) => {
    const control = button.dataset.control;
    const release = () => {
      controls[control] = false;
      button.classList.remove('down');
    };
    button.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      controls[control] = true;
      button.classList.add('down');
      button.setPointerCapture(event.pointerId);
    });
    button.addEventListener('pointerup', release);
    button.addEventListener('pointercancel', release);
    button.addEventListener('lostpointercapture', release);
  });

  function resize() {
    const width = mount.clientWidth;
    const height = mount.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener('resize', resize);

  function animate(now) {
    requestAnimationFrame(animate);
    const delta = THREE.MathUtils.clamp((now - lastTime) / 1000, 0, 0.05);
    lastTime = now;
    if (running) update(delta);
    else if (!hasStarted || !garagePanel.classList.contains('hidden')) player.rotation.y += delta * 0.5;
    renderer.render(scene, camera);
  }

  function update(delta) {
    const gas = isPressed('gas');
    const braking = isPressed('brake');
    if (gas && !braking) {
      const ratio = Math.min(1, speed / stats.top);
      speed += stats.accel * (1 - ratio * ratio) * delta;
    }
    // Rolling resistance plus aerodynamic drag
    speed -= (0.6 + speed * speed * 0.0016) * delta * (gas ? 0.3 : 1);
    if (braking) speed -= stats.brake * delta;
    speed = THREE.MathUtils.clamp(speed, 0, stats.top);
    const steer = steerAxis();
    steerInput = THREE.MathUtils.lerp(steerInput, steer, 0.25);
    const lateral = (3.2 + Math.min(speed, 40) * 0.1) * stats.handling;
    playerX = THREE.MathUtils.clamp(playerX + steerInput * lateral * delta, -6.1, 6.1);
    player.position.x = THREE.MathUtils.lerp(player.position.x, playerX, 0.22);
    player.rotation.z = THREE.MathUtils.lerp(player.rotation.z, -steerInput * 0.05, 0.1);
    player.rotation.y = THREE.MathUtils.lerp(player.rotation.y, -steerInput * 0.07, 0.12);
    wheelAngle += (speed * delta) / (carModel.userData.wheelRadius || 0.35);
    carModel.userData.wheels.forEach((w) => { w.rotation.x = -wheelAngle; });
    if (tiltNeedle) tiltNeedle.style.left = `${50 + steerInput * 45}%`;

    const meters = speed * delta;
    distance += meters;
    const cityStep = meters;
    urbanBlocks.forEach((block) => {
      block.position.z += cityStep;
      if (block.position.z > 65) block.position.z -= urbanBlocks.length * 64;
    });
    roadMarks.forEach((mark) => {
      mark.position.z += cityStep;
      if (mark.position.z > 40) mark.position.z -= dashSpacing * dashCount;
    });

    collisionCooldown = Math.max(0, collisionCooldown - delta);
    traffic.forEach((car, index) => {
      const relativeSpeed = car.userData.oncoming ? speed + 18 : speed - 23;
      car.position.z += relativeSpeed * delta;
      car.userData.cooldown = Math.max(0, car.userData.cooldown - delta);
      if (car.position.z > 9) resetTraffic(car, index);
      if (collisionCooldown === 0 && car.userData.cooldown === 0 &&
          Math.abs(car.position.z - player.position.z) < 3.1 &&
          Math.abs(car.position.x - player.position.x) < 1.55) {
        collisionCooldown = 1.3;
        speed *= 0.45;
        resetTraffic(car, index);
      }
    });

    const speedRatio = Math.min(1, speed / 60);
    const fov = baseFov + speedRatio * 16;
    if (Math.abs(camera.fov - fov) > 0.05) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, fov, 0.08);
      camera.updateProjectionMatrix();
    }
    const shake = speedRatio * 0.012;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, player.position.x * 0.34, 0.035) + (Math.random() - 0.5) * shake;
    camera.position.y = 5.0 - speedRatio * 0.5 + (Math.random() - 0.5) * shake;
    camera.lookAt(player.position.x * 0.2, 1.1, -16);
    speedOutput.textContent = String(Math.round(speed * 3.6));
    distanceOutput.textContent = (distance / 1000).toFixed(1);
  }

  // ----- Garage -----
  const store = createGarageStore();
  const garagePanel = document.getElementById('garage');
  const carList = document.getElementById('car-list');
  const carDetail = document.getElementById('car-detail');
  const garageStatus = document.getElementById('garage-status');
  const garagePoints = document.getElementById('garage-points');
  const currentCarLabel = document.getElementById('current-car');
  let viewingId = CARS[0].id;
  let busy = false;

  const signedIn = () => !!store.user;
  const isOwned = (id) => (signedIn() ? store.garage.owned.includes(id) : id === CARS[0].id);
  const upgradesOf = (id) => (signedIn() && store.garage.upgrades[id]) || defaultUpgrades();
  const colorOf = (car) => (signedIn() && store.garage.colors[car.id]) || car.colors[0];

  function applyDriveCar(car) {
    showCar(car, colorOf(car), upgradesOf(car.id));
    currentCarLabel.textContent = car.name;
  }

  function statLine(label, value, max, extra = '') {
    return `<div class="stat-line"><span>${label}</span><div class="stat-bar"><i style="width:${Math.min(100, (value / max) * 100)}%"></i></div>${extra || `<span>${Math.round(value)}</span>`}</div>`;
  }

  function renderGarage() {
    garagePoints.textContent = signedIn() ? store.points : '–';
    if (!signedIn()) {
      garageStatus.innerHTML = 'Sign in on the <a href="index.html">home page</a> to unlock more cars and upgrades with your quiz points.';
    }
    carList.innerHTML = CARS.map((car) => {
      const owned = isOwned(car.id);
      const badge = owned ? (signedIn() && store.garage.selected === car.id ? 'IN USE' : 'OWNED') : `${car.price} pts`;
      return `<button type="button" class="car-row ${viewingId === car.id ? 'selected' : ''} ${owned ? '' : 'locked'}" data-car="${car.id}"><div><strong>${car.name}</strong><small>${car.tag}</small></div><span class="badge">${badge}</span></button>`;
    }).join('');
    const car = CARS.find((c) => c.id === viewingId);
    const owned = isOwned(car.id);
    const up = upgradesOf(car.id);
    const st = computeStats(car, up);
    const swatches = car.colors.map((c) => `<button type="button" data-color="${c}" class="${colorOf(car) === c ? 'on' : ''}" style="background:#${c.toString(16).padStart(6, '0')}" aria-label="Paint colour"></button>`).join('');
    let html = `<div class="swatches">${swatches}</div>`;
    html += statLine('Top speed', st.top * 3.6, 360, `<span>${Math.round(st.top * 3.6)} km/h</span>`);
    html += statLine('Accel 0-100', st.accel, 14, `<span>${(27.8 / (st.accel * 0.85)).toFixed(1)} s</span>`);
    html += statLine('Handling', st.handling, 1.8, `<span>${Math.round(st.handling * 60)}</span>`);
    html += statLine('Braking', st.brake, 50, `<span>${Math.round(st.brake * 2)}</span>`);
    if (owned && signedIn()) {
      html += '<p class="upgrade-title">UPGRADES</p>';
      for (const u of UPGRADES) {
        const level = up[u.id];
        const max = level >= MAX_UPGRADE_LEVEL;
        const cost = max ? 0 : upgradeCost(u.id, level);
        html += `<div class="stat-line"><span>${u.label} ${level}/${MAX_UPGRADE_LEVEL}</span><div class="stat-bar"><i style="width:${(level / MAX_UPGRADE_LEVEL) * 100}%"></i></div><button type="button" data-upgrade="${u.id}" title="${u.blurb}" ${max || store.points < cost ? 'disabled' : ''}>${max ? 'MAX' : `+ ${cost} pts`}</button></div>`;
      }
    } else if (!owned) {
      html += `<button type="button" class="buy-car" data-buy="${car.id}" ${signedIn() && store.points >= car.price ? '' : 'disabled'}>${signedIn() ? `Buy for ${car.price} points` : 'Sign in to unlock'}</button>`;
    }
    carDetail.innerHTML = html;
  }

  async function guarded(task) {
    if (busy) return;
    busy = true;
    try {
      await task();
      garageStatus.textContent = '';
    } catch (error) {
      garageStatus.textContent = error.message || 'Something went wrong.';
    }
    busy = false;
    renderGarage();
  }

  function previewCar(car) {
    viewingId = car.id;
    showCar(car, colorOf(car), upgradesOf(car.id));
  }

  carList.addEventListener('click', (event) => {
    const row = event.target.closest('[data-car]');
    if (!row) return;
    const car = CARS.find((c) => c.id === row.dataset.car);
    previewCar(car);
    if (signedIn() && isOwned(car.id) && store.garage.selected !== car.id) {
      store.garage.selected = car.id;
      guarded(() => store.save());
    }
    renderGarage();
  });
  carDetail.addEventListener('click', (event) => {
    const car = CARS.find((c) => c.id === viewingId);
    const color = event.target.closest('[data-color]');
    const buy = event.target.closest('[data-buy]');
    const upgrade = event.target.closest('[data-upgrade]');
    if (color) {
      const value = Number(color.dataset.color);
      carModel.userData.paint.color.setHex(value);
      if (signedIn() && isOwned(car.id)) {
        store.garage.colors[car.id] = value;
        guarded(() => store.save());
      }
      renderGarage();
    } else if (buy) {
      guarded(async () => { await store.buyCar(car); previewCar(car); });
    } else if (upgrade) {
      guarded(async () => { await store.buyUpgrade(car.id, upgrade.dataset.upgrade); previewCar(car); });
    }
  });

  document.getElementById('open-garage').addEventListener('click', async () => {
    startPanel.classList.add('hidden');
    garagePanel.classList.remove('hidden');
    garageStatus.textContent = 'Loading garage…';
    await store.ready;
    garageStatus.textContent = '';
    if (signedIn()) await store.refresh().catch(() => {});
    const selected = CARS.find((c) => c.id === (signedIn() ? store.garage.selected : CARS[0].id));
    previewCar(selected);
    renderGarage();
  });
  document.getElementById('close-garage').addEventListener('click', () => {
    const car = CARS.find((c) => c.id === (signedIn() && isOwned(viewingId) ? viewingId : (signedIn() ? store.garage.selected : CARS[0].id)));
    if (signedIn() && store.garage.selected !== car.id) {
      store.garage.selected = car.id;
      store.save().catch(() => {});
    }
    applyDriveCar(car);
    garagePanel.classList.add('hidden');
    startPanel.classList.remove('hidden');
  });
  store.ready.then(() => {
    if (signedIn()) applyDriveCar(CARS.find((c) => c.id === store.garage.selected) || CARS[0]);
  });

  requestAnimationFrame(animate);
})();
