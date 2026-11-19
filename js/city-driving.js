import * as THREE from './vendor/three/three.module.min.js';
import { CARS, UPGRADES, MAX_UPGRADE_LEVEL, defaultUpgrades, upgradeCost, computeStats, buildCarModel } from './city-cars.js';
import { createGarageStore } from './city-garage.js';
import { ROUTES } from './city-routes.js';
import { createWorld, BLOCK_COUNT, BLOCK_LENGTH, LANES } from './city-world.js';
import { createTraffic, PLAYER_Z, PLAYER_GRID_LANE } from './city-traffic.js';
import { lcg } from './city-gfx.js';

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

  const locationName = document.getElementById('location-name');
  const routeNameOutput = document.getElementById('route-name');
  const routeList = document.getElementById('route-list');
  const modeList = document.getElementById('mode-list');
  const tripReward = (r) => Math.round(r.length / 100);
  const RACE_BONUS = [30, 20, 10];
  let route = ROUTES[0];
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
    const bonus = mode === 'race' ? ` · race +${RACE_BONUS[0]} pts` : '';
    routeNameOutput.textContent = `${route.from} → ${route.to} · ${(route.length / 1000).toFixed(1)} km · ${tripReward(route)} pts${bonus}`;
  }

  function setMode(next) {
    mode = next === 'race' ? 'race' : 'free';
    modeList.querySelectorAll('button').forEach((button) => button.classList.toggle('on', button.dataset.mode === mode));
    updateRouteLabel();
    try { localStorage.setItem('cityDrivingMode', mode); } catch (error) { /* storage unavailable */ }
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
  }
  showCar(CARS[0], CARS[0].colors[0], defaultUpgrades());

  routeList.innerHTML = ROUTES.map((r) => `<button type="button" data-route="${r.id}">${r.name}</button>`).join('');
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
  applyRoute(ROUTES.find((r) => r.id === savedRoute) || ROUTES[0]);
  trafficSystem.populate(16);

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

  function clearSession() {
    racePanel.hidden = true;
    countdownOut.hidden = true;
    finishGate.visible = false;
    tripPanel.hidden = true;
    phase = 'idle';
    trafficSystem.clearRacers();
    resetCarPose();
  }

  function startDrive() {
    if (isTouchDevice && !tilt.asked && 'DeviceOrientationEvent' in window) {
      tilt.asked = true;
      setTilt(true);
    } else {
      tilt.neutral = null;
    }
    hasStarted = true;
    speed = 0;
    prevSpeed = 0;
    distance = 0;
    crashes = 0;
    tripDone = false;
    raceTime = 0;
    wheelAngle = 0;
    collisionCooldown = 0;
    resetCarPose();
    tripPanel.hidden = false;
    tripFrom.textContent = `● ${route.from}`;
    tripTo.textContent = `${route.to} ⚑`;
    tripRewardOut.textContent = signedIn() ? `Up to ${tripReward(route) + CLEAN_BONUS + (isRace() ? RACE_BONUS[0] : 0)} pts` : 'Sign in to earn pts';
    updateTrip();
    if (isRace()) {
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
    else idle(delta);
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
    if (phase === 'countdown') {
      countdownT -= delta;
      const shown = Math.ceil(countdownT);
      if (countdownT <= 0) {
        phase = 'drive';
        stateOutput.textContent = 'RACING';
        showCountdown('GO!');
        setTimeout(() => { if (phase === 'drive') countdownOut.hidden = true; }, 900);
      } else if (countdownOut.textContent !== String(shown)) {
        showCountdown(String(shown));
      }
    }
    const gas = driving && isPressed('gas');
    const braking = driving ? isPressed('brake') : true;
    if (gas && !braking) {
      const ratio = Math.min(1, speed / stats.top);
      speed += stats.accel * (1 - ratio * ratio) * delta;
    }
    // Rolling resistance plus aerodynamic drag
    speed -= (0.6 + speed * speed * 0.0016) * delta * (gas ? 0.3 : 1);
    if (braking) speed -= stats.brake * delta;
    speed = THREE.MathUtils.clamp(speed, 0, stats.top);

    // Kinematic bicycle model: the front wheels steer, the body only turns while the wheels roll.
    const input = driving ? steerAxis() : 0;
    steerInput = THREE.MathUtils.lerp(steerInput, input, Math.min(1, delta * 10));
    const maxSteer = (0.5 / (1 + (speed / 9) ** 2)) * (0.85 + 0.15 * stats.handling);
    const headingLimit = 0.3;
    let steerTarget = steerInput * maxSteer;
    if (Math.abs(input) < 0.05) steerTarget = THREE.MathUtils.clamp(-heading * 0.9, -maxSteer * 1.6, maxSteer * 1.6);
    steer = THREE.MathUtils.lerp(steer, steerTarget, Math.min(1, delta * (Math.abs(input) > 0.05 ? 9 : 6)));
    if ((heading >= headingLimit && steer > 0) || (heading <= -headingLimit && steer < 0)) steer *= 0.5;
    const turnRate = (speed / wheelbase) * Math.tan(steer);
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
    const forward = speed * Math.cos(heading);

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
    if (carModel.userData.tail) carModel.userData.tail.emissiveIntensity = (driving ? isPressed('brake') : true) ? 3.2 : (route.night ? 1.3 : 0.8);
    if (tiltNeedle) tiltNeedle.style.left = `${50 + steerInput * 45}%`;

    distance += forward * delta;
    if (driving) raceTime += delta;
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
      }
    }

    finishGate.position.set(0, 0, PLAYER_Z - (route.length - distance));
    finishGate.visible = finishGate.position.z > -420 && finishGate.position.z < 14;

    const speedRatio = Math.min(1, speed / 60);
    const fov = baseFov + speedRatio * 16;
    if (Math.abs(camera.fov - fov) > 0.05) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, fov, 0.08);
      camera.updateProjectionMatrix();
    }
    const shake = speedRatio * 0.012;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, player.position.x * 0.34, 0.06) + (Math.random() - 0.5) * shake;
    camera.position.y = 5.0 - speedRatio * 0.5 + (Math.random() - 0.5) * shake;
    camera.lookAt(player.position.x * 0.2 + heading * 14, 1.1, -16);
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
    if (signedIn()) applyDriveCar(CARS.find((c) => c.id === store.garage.selected) || CARS[0]);
  });

  requestAnimationFrame(animate);
})();
