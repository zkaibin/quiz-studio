import * as THREE from './vendor/three/three.module.min.js';
import { CARS, UPGRADES, MAX_UPGRADE_LEVEL, defaultUpgrades, upgradeCost, computeStats, buildCarModel } from './city-cars.js';
import { createGarageStore } from './city-garage.js';
import { ROUTES, routesFor, landmarkName } from './city-routes.js';
import { CITY_BY_ID, DEFAULT_CITY_ID } from './city-cities.js';
import { createGlobe } from './city-globe.js';
import { createWorld, BLOCK_COUNT, BLOCK_LENGTH, LANES } from './city-world.js';
import { createTraffic, PLAYER_Z, PLAYER_GRID_LANE } from './city-traffic.js';
import { lcg } from './city-gfx.js';
import { createFreeCity } from './city-free.js';
import { createRealCity } from './city-real.js';
import { createCityAudio } from './city-audio.js';
import { createCityFx, createSpeedOverlay } from './city-fx.js';
import { PITCH, GRID, SIZE, setCity, currentCity, cellInfo, infoAt, isDrivable, isFreeDrivable, kerbOffset, spawnFor, DISTRICT_COLORS } from './city-map.js';

(() => {
  const mount = document.getElementById('city-scene');
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  mount.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa9d5e5);
  scene.fog = new THREE.Fog(0xa9d5e5, 110, 430);
  const baseFov = 62;
  const camera = new THREE.PerspectiveCamera(baseFov, mount.clientWidth / mount.clientHeight, 0.1, 700);
  camera.position.set(0, 5.0, 11.8);
  camera.lookAt(0, 1.1, -16);

  const world = createWorld({ scene, renderer });
  let rand = lcg(1);
  const trafficSystem = createTraffic({ scene, rand: () => rand() });
  const finishGate = world.createFinishGate();
  const freeCity = createFreeCity({ scene, kit: world.kit });
  const realCity = createRealCity({ scene });
  const audio = createCityAudio();
  const fx = createCityFx({ scene });
  const overlay = createSpeedOverlay(document.querySelector('.city-game'));
  let realActive = false;
  const CAM_MODES = ['chase', 'hood', 'aerial'];
  const CAM_LABELS = { chase: 'Chase', hood: 'Driver', aerial: 'Aerial' };
  let camMode = 'chase';
  try {
    const savedCam = localStorage.getItem('cityDrivingCam');
    if (CAM_MODES.includes(savedCam)) camMode = savedCam;
  } catch (error) { /* storage unavailable */ }
  const camPos = new THREE.Vector3().copy(camera.position);
  const camLook = new THREE.Vector3(0, 1.1, -16);
  const camShake = new THREE.Vector3();
  let camShakeMag = 0;
  let savedCity = null;
  try { savedCity = localStorage.getItem('cityDrivingCity'); } catch (error) { /* storage unavailable */ }
  setCity(CITY_BY_ID[savedCity] ? savedCity : DEFAULT_CITY_ID);
  freeCity.setStyle(currentCity().style);

  const locationName = document.getElementById('location-name');
  const routeNameOutput = document.getElementById('route-name');
  const routeList = document.getElementById('route-list');
  const modeList = document.getElementById('mode-list');
  const routeLabelOutput = document.getElementById('route-label');
  const roadName = document.querySelector('.road-name');
  const minimap = document.getElementById('minimap');
  const minimapCtx = minimap.getContext('2d');
  const tripReward = (r) => Math.round(r.length / 100);
  const RACE_BONUS = [30, 20, 10];
  let route = routesFor(currentCity().id)[0];
  let areaLabel = route.area;
  let mode = 'free';
  const blocks = [];

  function applyRoute(next) {
    route = next;
    rand = lcg(28 + ROUTES.indexOf(route) * 97);
    while (blocks.length) {
      const old = blocks.pop();
      scene.remove(old);
      world.disposeBlock(old);
    }
    world.setRoute(route);
    for (let i = 0; i < BLOCK_COUNT; i++) {
      const block = world.buildBlock(route, i, rand);
      blocks.push(block);
      scene.add(block);
    }
    if (headlights) {
      headlights.intensity = route.night ? 1400 : 0;
    }
    areaLabel = route.area;
    locationName.textContent = areaLabel;
    updateRouteLabel();
    routeList.querySelectorAll('button').forEach((button) => {
      button.classList.toggle('on', button.dataset.route === route.id);
    });
    try { localStorage.setItem('cityDrivingRoute', route.id); } catch (error) { /* storage unavailable */ }
  }

  function updateRouteLabel() {
    routeLabelOutput.textContent = mode === 'race' ? 'ROUTE' : 'START';
    if (mode === 'real') {
      routeNameOutput.textContent = `Real ${currentCity().name} streets from OpenStreetMap`;
      return;
    }
    if (mode === 'free') {
      routeNameOutput.textContent = `${route.area} · drive anywhere in the city`;
      return;
    }
    const bonus = mode === 'race' ? ` · race +${RACE_BONUS[0]} pts` : '';
    routeNameOutput.textContent = `${route.from} → ${route.to} · ${(route.length / 1000).toFixed(1)} km · ${tripReward(route)} pts${bonus}`;
  }

  function setMode(next) {
    mode = next === 'race' || next === 'real' ? next : 'free';
    modeList.querySelectorAll('button').forEach((button) => button.classList.toggle('on', button.dataset.mode === mode));
    updateRouteLabel();
    try { localStorage.setItem('cityDrivingMode', mode); } catch (error) { /* storage unavailable */ }
  }
  const startButton = document.getElementById('start-drive');
  const realButton = modeList.querySelector('[data-mode="real"]');
  const welcomeNote = document.getElementById('welcome-note');
  function refreshRealMap() {
    realButton.hidden = !realCity.available();
    if (realButton.hidden && mode === 'real') setMode('free');
  }
  modeList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-mode]');
    if (button) setMode(button.dataset.mode);
  });

  // ----- Player car -----
  const player = new THREE.Group();
  player.rotation.order = 'YXZ';
  player.position.set(LANES[PLAYER_GRID_LANE], 0, PLAYER_Z);
  scene.add(player);
  const headlights = new THREE.SpotLight(0xfff1cf, 0, 80, 0.5, 0.65, 2);
  headlights.position.set(0, 0.85, -1.8);
  headlights.target.position.set(0, 0, -30);
  player.add(headlights, headlights.target);
  // Flying cars: nitrogen tank (0..1), altitude and vertical speed in metres
  let nitro = 1;
  let altitude = 0;
  let climb = 0;
  let nitroFx = 0;
  const flyStat = document.getElementById('fly-stat');
  const altOutput = document.getElementById('altitude');
  const nitroBar = document.getElementById('nitro-fill');
  const nitroButton = document.querySelector('[data-control="nitro"]');
  let carModel = null;
  let currentCar = CARS[0];
  let stats = computeStats(currentCar);
  let wheelbase = 2.7;
  function showCar(car, colorHex, upgrades) {
    currentCar = car;
    stats = computeStats(car, upgrades);
    if (carModel) {
      player.remove(carModel);
      carModel.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
    }
    carModel = buildCarModel(THREE, car, colorHex);
    wheelbase = carModel.userData.halfLen * 2 - 1.85;
    player.add(carModel);
    altitude = 0;
    climb = 0;
    nitro = 1;
    flyStat.hidden = !car.fly;
    nitroButton.hidden = !car.fly;
  }
  showCar(CARS[0], CARS[0].colors[0], defaultUpgrades());

  const cityTag = document.getElementById('city-tag');
  const cityCode = document.getElementById('city-code');
  const cityIntro = document.getElementById('city-intro');
  const cityNameOutput = document.getElementById('city-name');
  const CITY_CODES = { singapore: 'SG', newyork: 'NYC', shanghai: 'SH', tokyo: 'TYO', london: 'LDN', dubai: 'DXB' };
  const trafficLabel = () => (currentCity().drive === 'left' ? 'LEFT-HAND TRAFFIC' : 'RIGHT-HAND TRAFFIC');

  function updateCityText() {
    const city = currentCity();
    cityTag.textContent = city.name.toUpperCase();
    cityCode.textContent = `· ${CITY_CODES[city.id] || ''}`;
    cityNameOutput.textContent = `${city.name}, ${city.country}`;
    document.title = `City Driving · ${city.name}`;
    mount.setAttribute('aria-label', `Three-dimensional ${city.name} city driving game`);
    cityIntro.textContent = `Take the wheel in ${city.name}. Keep ${city.drive} and roam the whole city, turning into any street you like, or line up on the grid and race computer-controlled cars along a route to the finish gate. Live engine audio, tire smoke and chase, driver or aerial cameras sell every kilometre.`;
    roadName.textContent = trafficLabel();
    roadName.dataset.default = roadName.textContent;
  }

  function renderRoutes() {
    routeList.innerHTML = routesFor(currentCity().id).map((r) => `<button type="button" data-route="${r.id}">${r.name}</button>`).join('');
  }
  renderRoutes();
  updateCityText();
  routeList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-route]');
    if (button) applyRoute(ROUTES.find((r) => r.id === button.dataset.route));
  });
  let savedRoute = null;
  let savedMode = null;
  try {
    savedRoute = localStorage.getItem('cityDrivingRoute');
    savedMode = localStorage.getItem('cityDrivingMode');
  } catch (error) { /* storage unavailable */ }
  setMode(savedMode);
  applyRoute(routesFor(currentCity().id).find((r) => r.id === savedRoute) || routesFor(currentCity().id)[0]);
  trafficSystem.populate(16);
  refreshRealMap();

  const keys = new Set();
  const controls = { left: false, right: false, gas: false, brake: false, reverse: false, nitro: false };
  const hud = document.querySelector('.hud');
  const speedOutput = document.getElementById('speed');
  const distanceOutput = document.getElementById('distance');
  const stateOutput = document.getElementById('drive-state');
  const gearOutput = document.getElementById('gear');
  const rpmFill = document.getElementById('rpm-fill');
  const muteButton = document.getElementById('toggle-mute');
  const cameraButton = document.getElementById('cycle-camera');
  const startPanel = document.getElementById('welcome');
  const pausePanel = document.getElementById('paused');
  const pauseButton = document.getElementById('pause-drive');
  const hint = document.getElementById('hint');

  function syncMuteUi() {
    muteButton.classList.toggle('muted', audio.muted);
    muteButton.setAttribute('aria-label', audio.muted ? 'Unmute sound' : 'Mute sound');
    muteButton.title = audio.muted ? 'Unmute (M)' : 'Mute (M)';
  }
  function syncCameraUi() {
    cameraButton.classList.toggle('hood', camMode === 'hood');
    cameraButton.classList.toggle('aerial', camMode === 'aerial');
    const next = CAM_MODES[(CAM_MODES.indexOf(camMode) + 1) % CAM_MODES.length];
    cameraButton.setAttribute('aria-label', `Camera: ${CAM_LABELS[camMode]}. Switch to ${CAM_LABELS[next]}`);
    cameraButton.title = `${CAM_LABELS[camMode]} cam (C)`;
  }
  syncMuteUi();
  syncCameraUi();
  muteButton.addEventListener('click', () => {
    audio.resume();
    audio.setMuted(!audio.muted);
    syncMuteUi();
  });
  function cycleCamera() {
    camMode = CAM_MODES[(CAM_MODES.indexOf(camMode) + 1) % CAM_MODES.length];
    try { localStorage.setItem('cityDrivingCam', camMode); } catch (error) { /* storage unavailable */ }
    syncCameraUi();
  }
  cameraButton.addEventListener('click', cycleCamera);

  function setGear(label) {
    if (gearOutput.textContent !== label) gearOutput.textContent = label;
    gearOutput.classList.toggle('rev', label === 'R');
    gearOutput.classList.toggle('drive', label === 'D');
  }

  function pulseImpact(strength, { force = false } = {}) {
    if (strength < 0.08) return;
    camShakeMag = Math.max(camShakeMag, Math.min(0.55, strength));
    overlay.impact(strength);
    if (force || impactCool <= 0) {
      audio.impact(strength);
      impactCool = 0.22;
      if (strength > 0.18) {
        fx.burst(player.position.x, player.position.y + 0.4, freeActive ? player.position.z : PLAYER_Z, strength);
      }
    }
  }

  function updateCamera(delta, {
    px, py, pz, heading: face, speedRatio, free
  }) {
    const hood = camMode === 'hood';
    const aerial = camMode === 'aerial';
    // Keep every rig locked to the car's actual height so flying never leaves the lens on the ground.
    const carY = Number.isFinite(py) ? py : altitude;
    const flyBlend = THREE.MathUtils.clamp((carY - 6) / 50, 0, 1);
    const roof = currentCar.build?.roofH || 1.4;
    // Driver/hood: raised windshield perch with near-level gaze so the road, not the bonnet, fills the frame.
    const eyeHeight = Math.max(1.85, roof * 0.95);
    let back;
    let height;
    let lookAhead;
    let lookY;
    let followRate;
    let fovBase;
    let fovSpeed;
    let tremorScale;
    if (hood) {
      back = THREE.MathUtils.lerp(0.35, 0.9, flyBlend);
      height = carY + eyeHeight + speedRatio * 0.08;
      lookAhead = 42;
      lookY = carY + eyeHeight * 0.88;
      followRate = 12;
      fovBase = 68;
      fovSpeed = 8;
      tremorScale = 0.01;
    } else if (aerial) {
      // High orbit that climbs with the car so you can watch it from above while flying.
      back = THREE.MathUtils.lerp(14, 26, flyBlend);
      height = carY + THREE.MathUtils.lerp(22, 36 + carY * 0.08, flyBlend);
      lookAhead = THREE.MathUtils.lerp(4, 10, flyBlend);
      lookY = carY + 0.6;
      followRate = 4.2;
      fovBase = 58;
      fovSpeed = 10;
      tremorScale = 0.006;
    } else {
      // Chase stays above the car; extra lift + pull-back kicks in once airborne.
      back = THREE.MathUtils.lerp(11.8, 20, flyBlend);
      height = carY + THREE.MathUtils.lerp(5.0 - speedRatio * 0.55, 14 + flyBlend * 8, flyBlend);
      lookAhead = THREE.MathUtils.lerp(16, 8, flyBlend);
      lookY = carY + THREE.MathUtils.lerp(1.1, 0.4, flyBlend);
      followRate = 5.5;
      fovBase = baseFov;
      fovSpeed = 16;
      tremorScale = 0.01;
    }
    const sx = Math.sin(free ? camHeading : face);
    const cz = Math.cos(free ? camHeading : face);
    const targetX = free ? (px - sx * back) : (px * (hood ? 0.06 : aerial ? 0.2 : 0.34));
    const targetY = height;
    const targetZ = free
      ? (pz + cz * back)
      : (hood ? PLAYER_Z + 0.7 : aerial ? PLAYER_Z + 16 : 11.8);
    const lookX = free
      ? (px + sx * lookAhead)
      : (px * (hood ? 0.04 : aerial ? 0.12 : 0.2) + face * (hood ? 12 : aerial ? 6 : 14));
    const lookZ = free ? (pz - cz * lookAhead) : (aerial ? PLAYER_Z - 4 : -16);
    const follow = Math.min(1, delta * followRate);
    camPos.x += (targetX - camPos.x) * follow;
    camPos.y += (targetY - camPos.y) * follow;
    camPos.z += (targetZ - camPos.z) * follow;
    camLook.x += (lookX - camLook.x) * follow;
    camLook.y += (lookY - camLook.y) * follow;
    camLook.z += (lookZ - camLook.z) * follow;
    camShakeMag = Math.max(0, camShakeMag - delta * 2.8);
    const tremor = speedRatio * tremorScale;
    camShake.set(
      (Math.random() - 0.5) * (camShakeMag + tremor),
      (Math.random() - 0.5) * (camShakeMag * 0.7 + tremor * 0.5),
      (Math.random() - 0.5) * (camShakeMag + tremor)
    );
    camera.position.set(camPos.x + camShake.x, camPos.y + camShake.y, camPos.z + camShake.z);
    camera.lookAt(camLook.x, camLook.y, camLook.z);
    // Stretch clip/fog when high so the city below stays visible from the air.
    const far = 700 + carY * 3.5;
    if (Math.abs(camera.far - far) > 8) {
      camera.far = far;
      camera.updateProjectionMatrix();
    }
    if (freeActive) {
      scene.fog.near = 70 + carY * 0.35;
      scene.fog.far = 320 + carY * 2.8;
    }
    const fov = fovBase + speedRatio * fovSpeed + nitroFx * 4;
    if (Math.abs(camera.fov - fov) > 0.05) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, fov, 0.1);
      camera.updateProjectionMatrix();
    }
  }

  function presentDrive(delta, {
    throttle, braking, free, speedRatio
  }) {
    const absSpeed = Math.abs(speed);
    const rpmRatio = Math.min(1, (absSpeed / Math.max(8, stats.top)) * 0.85 + (throttle ? 0.12 : 0) + nitroFx * 0.08);
    rpmFill.style.width = `${Math.round(rpmRatio * 100)}%`;
    if (!hasStarted || !running) setGear('P');
    else if (absSpeed < 0.35 && !throttle) setGear('N');
    else if (speed < -0.35) setGear('R');
    else setGear('D');
    overlay.tick(delta);
    overlay.update({ speedRatio, nitro: nitroFx, flying: altitude > 1.5 });
    audio.update({
      active: running && phase !== 'countdown',
      speed,
      top: stats.top,
      throttle,
      braking,
      steer,
      nitro: nitroFx,
      flying: altitude > 1.5,
      idle: hasStarted && !running
    });
    fx.update(delta, {
      active: running && phase === 'drive',
      x: free ? player.position.x : player.position.x,
      y: player.position.y,
      z: free ? player.position.z : PLAYER_Z,
      heading: free ? heading : heading,
      speed,
      steer,
      braking,
      airborne: altitude > 1.2
    });
  }
  let running = false;
  let phase = 'idle';
  let countdownT = 0;
  let speed = 0;
  let distance = 0;
  let heading = 0;
  let steer = 0;
  let steerInput = 0;
  let wheelAngle = 0;
  let lastTime = 0;
  let collisionCooldown = 0;
  let crashes = 0;
  let tripDone = false;
  let raceTime = 0;
  let clock = 0;
  let boardTimer = 0;
  let hasStarted = false;
  let prevSpeed = 0;
  let accelSmooth = 0;
  let rollSmooth = 0;
  let impactShake = 0;
  let impactCool = 0;
  const smashOutput = document.getElementById('smashed');
  const smashStat = document.getElementById('smash-stat');
  const tiltToggle = document.getElementById('tilt-toggle');
  const touchControls = document.querySelector('.touch-controls');
  const tiltNeedle = document.getElementById('tilt-needle');
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
  const tilt = { enabled: false, listening: false, raw: 0, neutral: null, value: 0 };
  const racePanel = document.getElementById('race-panel');
  const racePos = document.getElementById('race-pos');
  const raceTotal = document.getElementById('race-total');
  const raceTimeOut = document.getElementById('race-time');
  const raceBoard = document.getElementById('race-board');
  const countdownOut = document.getElementById('countdown');
  const resultsBoard = document.getElementById('results-board');
  const isRace = () => mode === 'race';
  const isFree = () => mode === 'free' || mode === 'real';
  let freeActive = false;
  let camHeading = 0;
  let mapTimer = 0;

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
    if (action === 'left') return controls.left || keys.has('arrowleft') || keys.has('a');
    if (action === 'right') return controls.right || keys.has('arrowright') || keys.has('d');
    if (action === 'gas') return controls.gas || keys.has('arrowup') || keys.has('w');
    if (action === 'nitro') return controls.nitro || keys.has('shift') || keys.has('e');
    if (action === 'reverse') return controls.reverse || keys.has('arrowdown') || keys.has('s');
    return controls.brake || keys.has(' ');
  }

  function setRunning(value) {
    running = value;
    hud.classList.toggle('active', value);
    pauseButton.disabled = !value;
    stateOutput.textContent = value ? (phase === 'countdown' ? 'GET READY' : (isRace() ? 'RACING' : 'ON THE ROAD')) : 'READY';
    if (value) tilt.neutral = null;
    startPanel.classList.toggle('hidden', value);
    pausePanel.classList.toggle('hidden', value || !hasStarted);
    hint.style.display = value ? '' : 'none';
    if (value) lastTime = performance.now();
  }

  const formatTime = (t) => `${Math.floor(t / 60)}:${(t % 60).toFixed(1).padStart(4, '0')}`;
  const ordinal = (n) => n + (n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th');

  function showCountdown(text) {
    countdownOut.hidden = false;
    countdownOut.textContent = text;
    countdownOut.classList.remove('pop');
    void countdownOut.offsetWidth;
    countdownOut.classList.add('pop');
  }

  function resetCarPose() {
    heading = 0;
    steer = 0;
    steerInput = 0;
    player.position.set(LANES[PLAYER_GRID_LANE], 0, PLAYER_Z);
    player.rotation.set(0, 0, 0);
    carModel.userData.frontPivots.forEach((p) => { p.rotation.y = 0; });
  }

  // Static map layer for the minimap: district colours per block and the road grid.
  const mapLayer = document.createElement('canvas');
  mapLayer.width = mapLayer.height = minimap.width;
  function buildMapLayer() {
    const c = mapLayer.getContext('2d');
    const k = mapLayer.width / SIZE;
    c.fillStyle = currentCity().style.minimapSea || '#7fb2c9';
    c.fillRect(0, 0, mapLayer.width, mapLayer.height);
    for (let i = 0; i < GRID; i++) {
      for (let j = 0; j < GRID; j++) {
        c.fillStyle = DISTRICT_COLORS[cellInfo(i, j).kind];
        c.fillRect(i * PITCH * k, j * PITCH * k, PITCH * k + 0.5, PITCH * k + 0.5);
      }
    }
    c.strokeStyle = '#fbfaf3';
    c.lineWidth = 1.2;
    c.beginPath();
    for (let n = 0; n <= GRID; n++) {
      c.moveTo(n * PITCH * k, 0); c.lineTo(n * PITCH * k, SIZE * k);
      c.moveTo(0, n * PITCH * k); c.lineTo(SIZE * k, n * PITCH * k);
    }
    c.stroke();
  }
  buildMapLayer();

  // Switching city: swap the map, style and routes, then pick that city's first route.
  function selectCity(city) {
    setCity(city.id);
    freeCity.setStyle(city.style);
    try { localStorage.setItem('cityDrivingCity', city.id); } catch (error) { /* storage unavailable */ }
    renderRoutes();
    updateCityText();
    buildMapLayer();
    applyRoute(routesFor(city.id)[0]);
    realCity.unload();
    if (mode === 'real') setMode('free');
    refreshRealMap();
  }
  const globeOverlay = document.getElementById('globe');
  const globe = createGlobe({
    stage: document.getElementById('globe-stage'),
    labels: document.getElementById('globe-labels'),
    card: document.getElementById('globe-card'),
    getCurrentId: () => currentCity().id,
    onDrive: (city) => {
      if (city.id !== currentCity().id) selectCity(city);
      closeGlobe();
    }
  });
  function closeGlobe() {
    globeOverlay.classList.add('hidden');
    globe.close();
  }
  document.getElementById('open-globe').addEventListener('click', () => {
    globeOverlay.classList.remove('hidden');
    globe.open(currentCity().id);
  });
  document.getElementById('close-globe').addEventListener('click', closeGlobe);

  function drawMinimap() {
    const k = minimap.width / (realActive ? realCity.half * 2 : SIZE);
    const offset = realActive ? realCity.half : 0;
    minimapCtx.drawImage(realActive ? realCity.mapLayer(minimap.width) : mapLayer, 0, 0);
    minimapCtx.save();
    minimapCtx.translate((player.position.x + offset) * k, (player.position.z + offset) * k);
    minimapCtx.rotate(heading);
    minimapCtx.fillStyle = '#d9482b';
    minimapCtx.strokeStyle = '#fff';
    minimapCtx.lineWidth = 1.5;
    minimapCtx.beginPath();
    minimapCtx.moveTo(0, -7); minimapCtx.lineTo(5, 6); minimapCtx.lineTo(0, 3); minimapCtx.lineTo(-5, 6);
    minimapCtx.closePath();
    minimapCtx.fill();
    minimapCtx.stroke();
    minimapCtx.restore();
  }

  function enterFree() {
    if (!freeActive) roadName.dataset.default = roadName.textContent;
    freeActive = true;
    world.setFreeMode(true);
    blocks.forEach((block) => { block.visible = false; });
    trafficSystem.clearTraffic();
    trafficSystem.clearRacers();
    finishGate.visible = false;
    scene.fog.near = 70;
    scene.fog.far = 320;
    realActive = mode === 'real' && realCity.ready;
    freeCity.setVisible(!realActive);
    realCity.setVisible(realActive);
    smashStat.hidden = realActive;
    impactShake = 0;
    const spawn = realActive ? realCity.spawn() : spawnFor(route.id);
    player.position.set(spawn.x, 0, spawn.z);
    heading = spawn.heading;
    camHeading = heading;
    world.followPlayer(spawn.x, spawn.z);
    if (!realActive) freeCity.prefill(spawn.x, spawn.z, Date.now() / 1000);
    minimap.hidden = false;
    mapTimer = 0;
  }

  function leaveFree() {
    if (!freeActive) return;
    freeActive = false;
    realActive = false;
    freeCity.setVisible(false);
    realCity.setVisible(false);
    smashStat.hidden = true;
    player.position.y = 0;
    altitude = 0;
    climb = 0;
    if (carModel.userData.setThrust) carModel.userData.setThrust(0, 0);
    world.setFreeMode(false);
    blocks.forEach((block) => { block.visible = true; });
    scene.fog.near = 110;
    scene.fog.far = 430;
    minimap.hidden = true;
    roadName.textContent = roadName.dataset.default || trafficLabel();
    locationName.textContent = areaLabel;
    camPos.set(0, 5.0, 11.8);
    camLook.set(0, 1.1, -16);
    camera.position.copy(camPos);
    camera.lookAt(camLook);
    camShakeMag = 0;
    fx.clear();
    trafficSystem.populate(16);
    resetCarPose();
  }

  function updateFree(delta, forward) {
    const px = player.position.x;
    const pz = player.position.z;
    distance += Math.abs(forward) * delta;
    world.followPlayer(px, pz);
    impactShake = Math.max(0, impactShake - delta * 1.2);
    if (realActive) {
      if (locationName.textContent !== 'REAL MAP') locationName.textContent = 'REAL MAP';
    } else {
      freeCity.update(px, pz, Date.now() / 1000);
      freeCity.animate(delta, { x: px, z: pz, heading, speed });
      const { props, peds, cars } = freeCity.stats;
      smashOutput.textContent = String(props + peds + cars);
      const info = infoAt(px, pz);
      const place = info.landmark && Math.hypot(px - (info.landmark.i + 0.5) * PITCH, pz - (info.landmark.j + 0.5) * PITCH) < 90
        ? `${info.district} · ${landmarkName(info.landmark.id).toUpperCase()}` : info.district.toUpperCase();
      if (locationName.textContent !== place) locationName.textContent = place;
      if (roadName.textContent !== info.street.toUpperCase()) roadName.textContent = info.street.toUpperCase();
    }

    const speedRatio = Math.min(1, Math.abs(speed) / 60);
    // Chase camera trails the car's heading with a little lag so turns feel natural
    camHeading += Math.atan2(Math.sin(heading - camHeading), Math.cos(heading - camHeading)) * Math.min(1, delta * 4);
    if (impactShake > 0.1) {
      pulseImpact(impactShake);
      impactShake *= 0.35;
    }
    updateCamera(delta, { px, py: player.position.y, pz, heading, speedRatio, free: true });
    speedOutput.textContent = String(Math.round(Math.abs(speed) * 3.6));
    distanceOutput.textContent = (distance / 1000).toFixed(1);
    mapTimer -= delta;
    if (mapTimer <= 0) {
      mapTimer = 0.1;
      drawMinimap();
    }
  }

  function clearSession() {
    racePanel.hidden = true;
    countdownOut.hidden = true;
    finishGate.visible = false;
    tripPanel.hidden = true;
    phase = 'idle';
    trafficSystem.clearRacers();
    leaveFree();
    resetCarPose();
  }

  function startDrive() {
    if (isTouchDevice && !tilt.asked && 'DeviceOrientationEvent' in window) {
      tilt.asked = true;
      setTilt(true);
    } else {
      tilt.neutral = null;
    }
    if (mode === 'real' && (!realCity.ready || realCity.loadedId !== currentCity().id)) {
      const city = currentCity();
      realCity.isCached(city.id).then((cached) => {
        if (!cached && !window.confirm(`Download the real ${city.name} map from OpenStreetMap (about 10-30 MB)? It will be converted in your browser and saved for next time.`)) {
          setMode('free');
          startDrive();
          return;
        }
        startButton.disabled = true;
        realCity.load(city, (text) => { welcomeNote.textContent = text; }).then((ok) => {
          startButton.disabled = false;
          welcomeNote.textContent = ok ? 'No rush. Just enjoy the ride.' : 'Could not load the real map. Check your connection; using Free roam.';
          if (!ok) setMode('free');
          startDrive();
        });
      });
      return;
    }
    hasStarted = true;
    audio.resume();
    speed = 0;
    prevSpeed = 0;
    distance = 0;
    crashes = 0;
    tripDone = false;
    raceTime = 0;
    wheelAngle = 0;
    collisionCooldown = 0;
    camShakeMag = 0;
    fx.clear();
    resetCarPose();
    if (isFree()) enterFree(); else leaveFree();
    tripPanel.hidden = isFree();
    tripFrom.textContent = `● ${route.from}`;
    tripTo.textContent = `${route.to} ⚑`;
    tripRewardOut.textContent = signedIn() ? `Up to ${tripReward(route) + CLEAN_BONUS + (isRace() ? RACE_BONUS[0] : 0)} pts` : 'Sign in to earn pts';
    updateTrip();
    if (isFree()) {
      racePanel.hidden = true;
      countdownOut.hidden = true;
      phase = 'drive';
    } else if (isRace()) {
      trafficSystem.populate(9);
      trafficSystem.setupRace({ playerCar: currentCar, playerColor: colorOf(currentCar), count: 5 });
      racePanel.hidden = false;
      raceTotal.textContent = `/${trafficSystem.racers.length + 1}`;
      phase = 'countdown';
      countdownT = 3;
      showCountdown('3');
    } else {
      trafficSystem.populate(16);
      trafficSystem.clearRacers();
      racePanel.hidden = true;
      countdownOut.hidden = true;
      phase = 'drive';
    }
    distanceOutput.textContent = '0.0';
    updateRaceBoard();
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
    clearSession();
    trafficSystem.populate(16);
  });

  pauseButton.addEventListener('click', togglePause);
  window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(key)) event.preventDefault();
    keys.add(key);
    if (key === 'p' && hasStarted) togglePause();
    if (key === 'c') cycleCamera();
    if (key === 'm') {
      audio.resume();
      audio.setMuted(!audio.muted);
      syncMuteUi();
    }
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
    if (!globeOverlay.classList.contains('hidden')) return;
    if (running) update(delta);
    else {
      idle(delta);
      audio.update({ active: false });
      overlay.update({ speedRatio: 0, nitro: 0, flying: false });
      if (!hasStarted) setGear('P');
    }
    renderer.render(scene, camera);
  }

  // Menu / garage: the car turns on the spot while the street keeps moving around it.
  function idle(delta) {
    clock += delta;
    if (!hasStarted) {
      player.rotation.y += delta * 0.5;
      world.animatePedestrians(blocks, clock, delta);
      trafficSystem.update(delta, { playerForward: 0, playerX: player.position.x, playerSpeed: 0, distance: 0, time: 0, go: false, playerTop: stats.top, playerAccel: stats.accel, length: route.length });
    }
  }

  const wrapBlocks = (meters) => {
    blocks.forEach((block) => {
      block.position.z += meters;
      if (block.position.z > 65) block.position.z -= BLOCK_COUNT * BLOCK_LENGTH;
    });
  };

  function update(delta) {
    clock += delta;
    const driving = phase === 'drive';
    impactCool = Math.max(0, impactCool - delta);
    if (phase === 'countdown') {
      countdownT -= delta;
      const shown = Math.ceil(countdownT);
      if (countdownT <= 0) {
        phase = 'drive';
        stateOutput.textContent = 'RACING';
        showCountdown('GO!');
        audio.go();
        setTimeout(() => { if (phase === 'drive') countdownOut.hidden = true; }, 900);
      } else if (countdownOut.textContent !== String(shown)) {
        showCountdown(String(shown));
        audio.beep(shown === 1 ? 'final' : 'tick');
      }
    }
    const gas = driving && isPressed('gas');
    const reverse = driving && isPressed('reverse');
    const revTop = Math.min(14, stats.top * 0.25);
    // Down / S brakes while rolling forwards, then engages reverse gear once the car has stopped (free roam only)
    let braking = driving ? isPressed('brake') || (reverse && (!freeActive || speed > 0.4)) || (gas && speed < -0.1) : true;
    if (gas && !braking) {
      const ratio = Math.min(1, speed / stats.top);
      speed += stats.accel * (1 - ratio * ratio) * delta;
    } else if (reverse && freeActive && !braking) {
      const ratio = Math.min(1, -speed / revTop);
      speed -= stats.accel * 0.5 * (1 - ratio * ratio) * delta;
    }
    // Rolling resistance plus aerodynamic drag, always opposing the direction of travel
    const drag = (0.6 + speed * speed * 0.0016) * delta * (gas || reverse ? 0.3 : 1) + (braking ? stats.brake * delta : 0);
    speed = speed > 0 ? Math.max(0, speed - drag) : Math.min(0, speed + drag);
    speed = THREE.MathUtils.clamp(speed, freeActive ? -revTop : 0, stats.top * (altitude > 1 ? 1.08 : 1));

    // Kinematic bicycle model: the front wheels steer, the body only turns while the wheels roll.
    const input = driving ? steerAxis() : 0;
    steerInput = THREE.MathUtils.lerp(steerInput, input, Math.min(1, delta * 10));
    const free = freeActive;
    const maxSteer = (0.5 / (1 + (speed / 9) ** 2)) * (0.85 + 0.15 * stats.handling) * (free ? 1.35 : 1);
    const headingLimit = 0.3;
    let steerTarget = steerInput * maxSteer;
    if (!free && Math.abs(input) < 0.05) steerTarget = THREE.MathUtils.clamp(-heading * 0.9, -maxSteer * 1.6, maxSteer * 1.6);
    steer = THREE.MathUtils.lerp(steer, steerTarget, Math.min(1, delta * (Math.abs(input) > 0.05 ? 9 : 6)));
    if (!free && ((heading >= headingLimit && steer > 0) || (heading <= -headingLimit && steer < 0))) steer *= 0.5;
    const turnRate = (speed / wheelbase) * Math.tan(steer);
    let forward;
    if (free) {
      // Open city: the heading is unbounded and the car moves in world x/z; leaving the road surface scrapes and slides.
      heading += turnRate * delta;
      const step = speed * delta;
      const nx = player.position.x + Math.sin(heading) * step;
      const nz = player.position.z - Math.cos(heading) * step;
      const airborne = altitude > 1.5;
      const canDrive = realActive ? realCity.isDrivable : isFreeDrivable;
      if (airborne || canDrive(nx, nz)) {
        player.position.x = nx;
        player.position.z = nz;
      } else if (canDrive(nx, player.position.z)) {
        player.position.x = nx;
        speed *= 1 - Math.min(0.9, delta * 3);
      } else if (canDrive(player.position.x, nz)) {
        player.position.z = nz;
        speed *= 1 - Math.min(0.9, delta * 3);
      } else {
        speed *= 1 - Math.min(0.9, delta * 6);
      }
      // Crash into fixtures, pedestrians and traffic; the push-out is only applied when it keeps the car on drivable ground
      const crash = airborne || realActive ? { dx: 0, dz: 0, speed, shake: 0 } : freeCity.interact({ x: player.position.x, z: player.position.z, heading, speed });
      if (canDrive(player.position.x + crash.dx, player.position.z + crash.dz)) {
        player.position.x += crash.dx;
        player.position.z += crash.dz;
      }
      speed = crash.speed;
      impactShake = Math.max(impactShake, crash.shake);
      // Pavement and park lawn sit slightly above the asphalt
      const lift = realActive || isDrivable(player.position.x, player.position.z) ? 0 : 0.13;
      if (currentCar.fly) {
        const maxAlt = currentCar.maxAlt || 30;
        const thrusting = driving && isPressed('nitro') && nitro > 0;
        // Hold Shift / E (or NITRO) to burn nitrogen and climb; release to glide down and recharge on landing
        climb += (thrusting ? 28 : -8.8) * delta;
        climb = THREE.MathUtils.clamp(climb, -14, 14);
        if (thrusting) nitro = Math.max(0, nitro - delta * 0.035);
        else nitro = Math.min(1, nitro + delta * (altitude < 0.2 ? 0.3 : 0.02));
        altitude += climb * delta;
        // Never touch down on buildings or water: hover just above them until over a road again
        const floor = (realActive ? canDrive(player.position.x, player.position.z) : isDrivable(player.position.x, player.position.z) || isFreeDrivable(player.position.x, player.position.z)) ? 0 : (altitude > 0.5 ? 3 : 0);
        if (altitude >= maxAlt) { altitude = maxAlt; climb = Math.min(climb, 0); }
        if (altitude <= floor) {
          if (floor === 0 && altitude < -climb * delta - 0.01 && climb < -9) {
            impactShake = Math.max(impactShake, 0.18);
            pulseImpact(0.22);
          }
          altitude = floor;
          climb = Math.max(climb, 0);
          if (floor === 0 && !thrusting) climb = 0;
        }
        nitroFx = THREE.MathUtils.lerp(nitroFx, thrusting ? 1 : (altitude > 0.3 ? 0.18 : 0), Math.min(1, delta * 10));
        carModel.userData.setThrust(nitroFx, clock);
        nitroBar.style.width = `${Math.round(nitro * 100)}%`;
        altOutput.textContent = String(Math.round(altitude));
        player.position.y = Math.max(altitude, lift);
      } else {
        player.position.y = THREE.MathUtils.lerp(player.position.y, lift, Math.min(1, delta * 14));
      }
      forward = speed;
    } else {
      heading = THREE.MathUtils.clamp(heading + turnRate * delta, -headingLimit - 0.05, headingLimit + 0.05);
      let x = player.position.x + speed * Math.sin(heading) * delta;
      // Kerb: scraping the side bleeds speed and turns the nose back onto the road
      const edge = Math.abs(x) - 6.6;
      if (edge > 0) {
        speed *= 1 - Math.min(0.9, delta * 1.2 * (1 + edge));
        heading -= Math.sign(x) * Math.min(Math.abs(heading) + 0.05, delta * 1.4) * (Math.sign(heading) === Math.sign(x) ? 1 : 0.2);
        x = THREE.MathUtils.clamp(x, -7.25, 7.25);
      }
      player.position.x = x;
      forward = speed * Math.cos(heading);
    }

    wheelAngle += (speed * delta) / (carModel.userData.wheelRadius || 0.35);
    carModel.userData.wheels.forEach((w) => { w.rotation.x = -wheelAngle; });
    carModel.userData.frontPivots.forEach((p) => { p.rotation.y = -steer; });
    const accel = (speed - prevSpeed) / Math.max(delta, 1e-3);
    prevSpeed = speed;
    accelSmooth = THREE.MathUtils.lerp(accelSmooth, THREE.MathUtils.clamp(accel, -25, 12), Math.min(1, delta * 5));
    rollSmooth = THREE.MathUtils.lerp(rollSmooth, THREE.MathUtils.clamp(turnRate * speed * 0.0016, -0.05, 0.05), Math.min(1, delta * 6));
    player.rotation.y = -heading;
    player.rotation.z = -rollSmooth;
    player.rotation.x = THREE.MathUtils.clamp(accelSmooth * 0.0016, -0.04, 0.02);
    if (carModel.userData.tail) carModel.userData.tail.emissiveIntensity = (driving ? (isPressed('brake') || (isPressed('reverse') && speed > 0.4)) : true) ? 3.2 : (route.night ? 1.3 : 0.8);
    if (tiltNeedle) tiltNeedle.style.left = `${50 + steerInput * 45}%`;

    distance += forward * delta;
    if (driving) raceTime += delta;
    const speedRatio = Math.min(1, Math.abs(speed) / 60);
    presentDrive(delta, { throttle: gas, braking, free: freeActive, speedRatio });
    if (freeActive) {
      updateFree(delta, forward);
      return;
    }
    wrapBlocks(forward * delta);
    world.scroll(forward * delta, delta);
    world.animatePedestrians(blocks, clock, delta);
    let nearby = areaLabel;
    blocks.forEach((block) => {
      const near = Math.abs(block.position.z - 44 - player.position.z) < 34;
      if (near && block.userData.landmarks.length) nearby = block.userData.landmarks[0];
    });
    if (locationName.textContent !== nearby) locationName.textContent = nearby;

    trafficSystem.update(delta, {
      playerForward: forward, playerX: player.position.x, playerSpeed: speed, distance, time: raceTime,
      go: driving, playerTop: stats.top, playerAccel: stats.accel, length: route.length
    });
    collisionCooldown = Math.max(0, collisionCooldown - delta);
    if (collisionCooldown === 0 && driving) {
      const hit = trafficSystem.findCollision(player.position.x);
      if (hit) {
        collisionCooldown = 1.3;
        crashes++;
        speed *= 0.45;
        heading += Math.sign(player.position.x - hit.x || 1) * -0.03;
        trafficSystem.resolveCollision(hit, player.position.x);
        pulseImpact(0.45, { force: true });
      }
    }

    finishGate.position.set(0, 0, PLAYER_Z - (route.length - distance));
    finishGate.visible = finishGate.position.z > -420 && finishGate.position.z < 14;

    updateCamera(delta, {
      px: player.position.x,
      py: player.position.y,
      pz: player.position.z,
      heading,
      speedRatio,
      free: false
    });
    speedOutput.textContent = String(Math.round(speed * 3.6));
    distanceOutput.textContent = (distance / 1000).toFixed(1);
    updateTrip();
    boardTimer -= delta;
    if (isRace() && boardTimer <= 0) {
      boardTimer = 0.2;
      updateRaceBoard();
    }
    if (distance >= route.length && !tripDone) finishTrip();
  }

  const CLEAN_BONUS = 15;
  const tripPanel = document.getElementById('trip');
  const tripFrom = document.getElementById('trip-from');
  const tripTo = document.getElementById('trip-to');
  const tripFill = document.getElementById('trip-fill');
  const tripRemaining = document.getElementById('trip-remaining');
  const tripRewardOut = document.getElementById('trip-reward');
  const tripPanelDone = document.getElementById('trip-complete');
  const tripSummary = document.getElementById('trip-summary');
  const tripPointsOut = document.getElementById('trip-points');
  const tripTitle = document.getElementById('trip-title');

  function updateTrip() {
    const ratio = Math.min(1, distance / route.length);
    tripFill.style.width = `${ratio * 100}%`;
    tripRemaining.textContent = `${Math.max(0, Math.ceil(route.length - distance))} m to go`;
  }

  function updateRaceBoard() {
    if (!isRace()) return;
    const rows = trafficSystem.standings(distance, route.length, raceTime).sort((a, b) => b.progress - a.progress);
    racePos.textContent = String(rows.findIndex((r) => r.you) + 1);
    raceTimeOut.textContent = formatTime(raceTime);
    raceBoard.innerHTML = rows.map((r, i) => `<li class="${r.you ? 'you' : ''}"><span>${i + 1}. ${r.you ? 'You' : r.name}</span><span>${r.finished ? 'FIN' : `${Math.max(0, Math.round(route.length - r.progress))} m`}</span></li>`).join('');
  }

  async function finishTrip() {
    tripDone = true;
    running = false;
    hasStarted = false;
    const racing = isRace();
    const place = racing ? trafficSystem.finishedCount() + 1 : 0;
    const rows = racing ? trafficSystem.standings(distance, route.length, raceTime, raceTime) : [];
    speed = 0;
    hud.classList.remove('active');
    pauseButton.disabled = true;
    stateOutput.textContent = racing ? 'FINISHED' : 'ARRIVED';
    clearSession();
    const raceBonus = racing ? (RACE_BONUS[place - 1] || 0) : 0;
    const earned = Math.max(Math.round(tripReward(route) / 2), tripReward(route) - crashes * 2) + (crashes === 0 ? CLEAN_BONUS : 0) + raceBonus;
    const crashText = crashes === 0 ? 'no collisions, clean drive bonus!' : `${crashes} collision${crashes === 1 ? '' : 's'}`;
    tripTitle.textContent = racing ? `You finished ${ordinal(place)}!` : 'You have arrived';
    tripSummary.textContent = `${route.from} → ${route.to} · ${(route.length / 1000).toFixed(1)} km · ${racing ? `${formatTime(raceTime)} · ` : ''}${crashText}`;
    resultsBoard.hidden = !racing;
    if (racing) {
      const ranked = rows;
      // The player has just crossed the line, so unfinished cars are classified by their remaining distance.
      ranked.sort((a, b) => (b.finished ? 1 : 0) - (a.finished ? 1 : 0) || (a.finished ? a.time - b.time : b.progress - a.progress));
      resultsBoard.innerHTML = ranked.map((r, i) => `<li class="${r.you ? 'you' : ''}"><span>${i + 1}. ${r.you ? 'You' : `${r.name} · ${r.car}`}</span><span>${r.finished ? formatTime(r.time) : 'DNF'}</span></li>`).join('');
    }
    tripPointsOut.textContent = signedIn() ? 'Saving points…' : 'Sign in on the home page to earn points.';
    tripPanelDone.classList.remove('hidden');
    hint.style.display = 'none';
    trafficSystem.populate(16);
    if (!signedIn()) return;
    try {
      await store.awardPoints(earned);
      tripPointsOut.textContent = `+${earned} points${raceBonus ? ` (incl. ${raceBonus} race bonus)` : ''} · total ${store.points}`;
    } catch (error) {
      console.warn('Could not save trip points.', error);
      tripPointsOut.textContent = `+${earned} points could not be saved. Please try again later.`;
    }
  }
  document.getElementById('trip-again').addEventListener('click', () => {
    tripPanelDone.classList.add('hidden');
    startDrive();
  });
  document.getElementById('trip-menu').addEventListener('click', () => {
    tripPanelDone.classList.add('hidden');
    startPanel.classList.remove('hidden');
    stateOutput.textContent = 'READY';
  });

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
  const demoFly = (() => {
    try { return new URLSearchParams(location.search).get('demo') === 'fly'; } catch (error) { return false; }
  })();
  const isOwned = (id) => {
    if (demoFly && CARS.find((car) => car.id === id)?.fly) return true;
    return signedIn() ? store.garage.owned.includes(id) : id === CARS[0].id;
  };
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
    if (!signedIn()) await store.init();
    else await store.refresh().catch((error) => { store.loadError = 'Could not refresh your garage. Please try again.'; console.warn(error); });
    garageStatus.textContent = store.loadError;
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
    if (demoFly) {
      const flyer = CARS.find((car) => car.id === 'aether') || CARS.find((car) => car.fly);
      if (flyer) applyDriveCar(flyer);
    } else if (signedIn()) {
      applyDriveCar(CARS.find((c) => c.id === store.garage.selected) || CARS[0]);
    }
  });

  requestAnimationFrame(animate);
})();
