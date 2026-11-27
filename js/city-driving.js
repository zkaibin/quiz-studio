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
import { createCircuitTrack, createPlanetOrbitTrack, circuitById, circuitsFor } from './city-circuit.js';
import {
  PITCH, GRID, SIZE, DRIVE_LIMIT, setCity, currentCity, cellInfo, infoAt, isDrivable, isFreeDrivable,
  kerbOffset, spawnFor, DISTRICT_COLORS, wrapCoord, wraps, groundHeight, usesOrganicLayout, avenueX, streetZ
} from './city-map.js';
import { softKerbClamp } from './city-terrain.js';
import {
  planetRadius, moveOnSphere, placeObjectOnSphere, cameraOnSphere, poseOnSphere
} from './city-planet.js';

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
  const circuitTrack = createCircuitTrack({ scene, renderer, circuit: circuitById('harbor-gp') });
  const planetOrbitTrack = createPlanetOrbitTrack();
  let raceTrack = circuitTrack;
  trafficSystem.bindCircuit(null);
  let circuitActive = false;
  let circuitT = 0;
  let orbitLastX = 0;
  const tripLength = () => (circuitActive ? Math.round(raceTrack.length) : route.length);
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
  const camUp = new THREE.Vector3(0, 1, 0);
  const _planetCamPos = new THREE.Vector3();
  const _planetCamLook = new THREE.Vector3();
  const _planetCamUp = new THREE.Vector3(0, 1, 0);
  const camShake = new THREE.Vector3();
  let camShakeMag = 0;
  // Logical surface coords for the spherical pocket planet (player.position is world 3D there).
  let mapX = 0;
  let mapZ = 0;
  const isPlanet = () => !!currentCity().planet;
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
  let selectedCircuitId = route.circuit;
  let menuCircuitPreview = false;
  let menuBackdropReady = false;

  function applyRoute(next) {
    route = next;
    rand = lcg(28 + ROUTES.indexOf(route) * 97);
    if (route.circuit && !circuitById(route.circuit).planet) circuitTrack.setCircuit(circuitById(route.circuit));
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
    if (mode === 'race' && route.circuit) selectedCircuitId = route.circuit;
    if (menuBackdropReady) syncMenuBackdrop();
  }

  function applyCircuit(circuitId) {
    const circuit = circuitById(circuitId);
    selectedCircuitId = circuit.id;
    // Keep the district `route` untouched so leaving race mode restores the same district pick.
    if (!circuit.planet) circuitTrack.setCircuit(circuit);
    if (headlights) headlights.intensity = circuit.night ? 1400 : 0;
    areaLabel = circuit.area;
    locationName.textContent = circuit.name;
    updateRouteLabel();
    routeList.querySelectorAll('button').forEach((button) => {
      button.classList.toggle('on', button.dataset.circuit === circuit.id);
    });
    try { localStorage.setItem('cityDrivingCircuit', circuit.id); } catch (error) { /* storage unavailable */ }
    if (menuBackdropReady) syncMenuBackdrop();
  }

  // Open-world free roam on planets / real maps. Earth "free" drives the scenic district
  // corridor shown behind the route picker so Start Drive matches the welcome backdrop.
  const usesOpenCity = () => mode === 'real' || (mode === 'free' && isPlanet());

  function updateRouteLabel() {
    routeLabelOutput.textContent = mode === 'race' ? 'CIRCUIT' : 'START';
    if (mode === 'real') {
      routeNameOutput.textContent = `Real ${currentCity().name} streets (OpenStreetMap)`;
      return;
    }
    if (mode === 'free') {
      routeNameOutput.textContent = isPlanet()
        ? `${route.area} · drive or fly anywhere on the sphere-net`
        : `${route.area} · ${route.from} → ${route.to} · ${(route.length / 1000).toFixed(1)} km`;
      return;
    }
    const circuit = circuitById(selectedCircuitId || route.circuit);
    if (!circuit.planet && mode === 'race') circuitTrack.setCircuit(circuit);
    const lapM = circuit.planet
      ? Math.round(SIZE)
      : Math.round(circuitTrack.length || route.length);
    const tier = circuit.difficulty === 'easy' ? 'Beginner' : (circuit.difficulty === 'challenge' ? 'Challenge' : 'Standard');
    const bonus = ` · race +${RACE_BONUS[0]} pts`;
    const pts = Math.round(lapM / 100);
    routeNameOutput.textContent = `${circuit.name} (${tier}) · ${(lapM / 1000).toFixed(1)} km · ${pts} pts${bonus}`;
  }

  function setMode(next) {
    mode = next === 'race' || next === 'real' ? next : 'free';
    modeList.querySelectorAll('button').forEach((button) => button.classList.toggle('on', button.dataset.mode === mode));
    renderRoutes();
    if (mode !== 'race') {
      routeList.querySelectorAll('button').forEach((button) => {
        button.classList.toggle('on', button.dataset.route === route.id);
      });
    }
    updateRouteLabel();
    try { localStorage.setItem('cityDrivingMode', mode); } catch (error) { /* storage unavailable */ }
    if (menuBackdropReady) syncMenuBackdrop();
  }
  const startButton = document.getElementById('start-drive');
  const realButton = modeList.querySelector('[data-mode="real"]');
  const welcomeNote = document.getElementById('welcome-note');
  function refreshRealMap() {
    realButton.hidden = !realCity.available() || !!currentCity().planet || !!currentCity().wrap;
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
  const CITY_CODES = { singapore: 'SG', newyork: 'NYC', shanghai: 'SH', tokyo: 'TYO', london: 'LDN', dubai: 'DXB', circadia: 'AUR' };
  const trafficLabel = () => (currentCity().drive === 'left' ? 'LEFT-HAND TRAFFIC' : 'RIGHT-HAND TRAFFIC');

  function updateCityText() {
    const city = currentCity();
    cityTag.textContent = city.name.toUpperCase();
    cityCode.textContent = `· ${CITY_CODES[city.id] || ''}`;
    cityNameOutput.textContent = `${city.name}, ${city.country}`;
    document.title = `City Driving · ${city.name}`;
    mount.setAttribute('aria-label', `Three-dimensional ${city.name} city driving game`);
    const lapKm = ((city.grid * PITCH) / 1000).toFixed(1).replace(/\.0$/, '');
    const freeBtn = modeList.querySelector('[data-mode="free"]');
    if (freeBtn) freeBtn.textContent = city.planet ? 'Free roam' : 'District drive';
    cityIntro.textContent = city.planet
      ? `Take the wheel in ${city.name} on alien ${city.country} (~${lapKm} km sphere-net). Twin sun satellites light the crystal city — drive or fly anywhere; districts stream in as you explore.`
      : `Take the wheel in ${city.name}. Pick a district route to cruise the scenic streets behind the menu, or jump onto a racing circuit — beginner ovals through challenge tracks.`;
    roadName.textContent = trafficLabel();
    roadName.dataset.default = roadName.textContent;
  }

  function renderRoutes() {
    if (mode === 'race') {
      const list = circuitsFor({ planet: isPlanet() });
      if (!list.some((c) => c.id === selectedCircuitId)) selectedCircuitId = list[0]?.id || selectedCircuitId;
      routeList.innerHTML = list.map((c) => {
        const tag = c.difficulty === 'easy' ? ' · easy' : (c.difficulty === 'challenge' ? ' · hard' : '');
        const on = c.id === selectedCircuitId ? ' on' : '';
        return `<button type="button" data-circuit="${c.id}" class="${on.trim()}">${c.name}${tag}</button>`;
      }).join('');
      return;
    }
    routeList.innerHTML = routesFor(currentCity().id).map((r) => (
      `<button type="button" data-route="${r.id}">${r.name}</button>`
    )).join('');
  }
  renderRoutes();
  updateCityText();
  routeList.addEventListener('click', (event) => {
    const circuitButton = event.target.closest('[data-circuit]');
    if (circuitButton) {
      applyCircuit(circuitButton.dataset.circuit);
      return;
    }
    const button = event.target.closest('[data-route]');
    if (button) applyRoute(ROUTES.find((r) => r.id === button.dataset.route));
  });
  let savedRoute = null;
  let savedMode = null;
  let savedCircuit = null;
  try {
    savedRoute = localStorage.getItem('cityDrivingRoute');
    savedMode = localStorage.getItem('cityDrivingMode');
    savedCircuit = localStorage.getItem('cityDrivingCircuit');
  } catch (error) { /* storage unavailable */ }
  setMode(savedMode);
  applyRoute(routesFor(currentCity().id).find((r) => r.id === savedRoute) || routesFor(currentCity().id)[0]);
  if (savedCircuit && circuitsFor({ planet: isPlanet() }).some((c) => c.id === savedCircuit)) {
    selectedCircuitId = savedCircuit;
  } else {
    selectedCircuitId = route.circuit;
  }
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
  const gameRoot = document.querySelector('.city-game');
  const exitGameButton = document.getElementById('exit-game');
  const fsRetryButton = document.getElementById('fs-retry');
  let immersiveWanted = false;

  function isDisplayStandalone() {
    return window.matchMedia('(display-mode: fullscreen)').matches
      || window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true;
  }
  function isNativeFullscreen() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
  }
  function syncAppViewport() {
    const vv = window.visualViewport;
    // Prefer visualViewport (excludes browser chrome); fall back to layout viewport.
    const width = Math.round(vv?.width || window.innerWidth || document.documentElement.clientWidth);
    const height = Math.round(vv?.height || window.innerHeight || document.documentElement.clientHeight);
    if (width > 0) document.documentElement.style.setProperty('--app-width', `${width}px`);
    if (height > 0) document.documentElement.style.setProperty('--app-height', `${height}px`);
    // Keep the immersive layer pinned to the visible viewport origin (iOS rubber-band / URL-bar shift).
    if (vv && immersiveWanted) {
      gameRoot.style.top = `${Math.round(vv.offsetTop)}px`;
      gameRoot.style.left = `${Math.round(vv.offsetLeft)}px`;
    } else {
      gameRoot.style.top = '0px';
      gameRoot.style.left = '0px';
    }
  }
  function canRequestFullscreen(el) {
    return !!(el && (el.requestFullscreen || el.webkitRequestFullscreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen));
  }
  async function requestFsOn(el) {
    if (!el || isNativeFullscreen()) return true;
    const attempts = [];
    if (el.requestFullscreen) {
      attempts.push(() => el.requestFullscreen({ navigationUI: 'hide' }));
      attempts.push(() => el.requestFullscreen());
    }
    if (el.webkitRequestFullscreen) attempts.push(() => el.webkitRequestFullscreen());
    if (el.webkitRequestFullScreen) attempts.push(() => el.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT || 0));
    if (el.mozRequestFullScreen) attempts.push(() => el.mozRequestFullScreen());
    if (el.msRequestFullscreen) attempts.push(() => el.msRequestFullscreen());
    for (const attempt of attempts) {
      try {
        await attempt();
        if (isNativeFullscreen()) return true;
      } catch (error) { /* try next strategy */ }
    }
    return isNativeFullscreen();
  }
  async function enterFullscreen() {
    if (isDisplayStandalone() || isNativeFullscreen()) {
      updateFsRetryUi(false);
      return true;
    }
    // Prefer the game shell, then the document — some mobile browsers are picky.
    const ok = await requestFsOn(gameRoot) || await requestFsOn(document.documentElement) || await requestFsOn(document.body);
    updateFsRetryUi(!ok && canRequestFullscreen(document.documentElement));
    return ok;
  }
  async function leaveFullscreen() {
    updateFsRetryUi(false);
    try {
      if (document.exitFullscreen && document.fullscreenElement) await document.exitFullscreen();
      else if (document.webkitExitFullscreen && document.webkitFullscreenElement) document.webkitExitFullscreen();
      else if (document.mozCancelFullScreen && document.mozFullScreenElement) document.mozCancelFullScreen();
      else if (document.msExitFullscreen && document.msFullscreenElement) document.msExitFullscreen();
    } catch (error) { /* ignore */ }
  }
  function updateFsRetryUi(show) {
    if (!fsRetryButton) return;
    // Only offer a retry when Fullscreen API exists but is not active (typical on Android if the first call was blocked).
    fsRetryButton.hidden = !show || isDisplayStandalone() || isNativeFullscreen();
  }
  function tryHideMobileBrowserChrome() {
    // Best-effort: nudge mobile browsers to collapse the URL bar by briefly allowing overflow scroll.
    if (isDisplayStandalone() || isNativeFullscreen()) return;
    const html = document.documentElement;
    const prev = html.style.height;
    html.style.height = `${Math.max(window.innerHeight, screen.height || 0) + 1}px`;
    window.scrollTo(0, 1);
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      html.style.height = prev;
      syncAppViewport();
      resize();
    });
  }
  function setPlayChrome(active) {
    immersiveWanted = active;
    gameRoot.classList.toggle('is-playing', active);
    document.documentElement.classList.toggle('is-immersive', active);
    if (active) {
      syncAppViewport();
      tryHideMobileBrowserChrome();
      // Fire Fullscreen API immediately while still in the user-gesture stack when possible.
      enterFullscreen().then(() => {
        syncAppViewport();
        resize();
      });
    } else {
      leaveFullscreen();
      gameRoot.style.top = '0px';
      gameRoot.style.left = '0px';
    }
    syncAppViewport();
    resize();
  }
  function exitToGames() {
    setPlayChrome(false);
    window.location.href = 'games.html';
  }
  exitGameButton.addEventListener('click', exitToGames);
  fsRetryButton.addEventListener('click', async () => {
    const ok = await enterFullscreen();
    if (ok) {
      syncAppViewport();
      resize();
    } else {
      tryHideMobileBrowserChrome();
    }
  });
  // Keep the layout glued to the visible viewport while playing (address bar show/hide).
  syncAppViewport();
  const fsTip = document.getElementById('fs-tip');
  const touchLikely = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
  if (fsTip && touchLikely && !isDisplayStandalone()) fsTip.hidden = false;

  function syncMuteUi() {
    muteButton.classList.toggle('muted', audio.muted);
    muteButton.setAttribute('aria-label', audio.muted ? 'Unmute sound' : 'Mute sound');
    muteButton.title = audio.muted ? 'Unmute (M)' : 'Mute (M)';
  }
  function syncCameraUi() {
    cameraButton.classList.toggle('hood', camMode === 'hood');
    cameraButton.classList.toggle('aerial', camMode === 'aerial');
    cameraButton.dataset.cam = camMode;
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
  let camSnapT = 0;
  function cycleCamera() {
    camMode = CAM_MODES[(CAM_MODES.indexOf(camMode) + 1) % CAM_MODES.length];
    // Snap briefly so Chase→Driver never lerps through a rear-facing pose.
    camSnapT = 0.22;
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
    // High-sky blend: pull the lens farther so a pocket planet reads as a whole world from ~1 km up.
    const skyBlend = THREE.MathUtils.clamp((carY - 180) / 820, 0, 1);
    const planetSky = free && isPlanet() ? skyBlend : skyBlend * 0.45;
    const roof = currentCar.build?.roofH || 1.4;
    const belt = currentCar.build?.belt || roof * 0.7;
    // Raised windshield perch: high enough to read as a driver's seat, even on low hypercars.
    const eyeHeight = Math.max(1.62, Math.min(roof + 0.28, belt + 0.7));
    // Free roam: tighten follow smoothly with speed (no hard snap at ~200 km/h).
    // Blend from a low-pass of speed so tiny throttle hunting doesn't bob the rig.
    const absSpeed = Math.abs(displaySpeed || speed);
    camSpeedSmooth = THREE.MathUtils.lerp(camSpeedSmooth, absSpeed, Math.min(1, delta * 2.4));
    const hyperBlend = free ? THREE.MathUtils.smoothstep(camSpeedSmooth, 35, 70) : 0;
    let back;
    let height;
    let lookAhead;
    let lookDown = 0;
    let followRate;
    let fovBase;
    let fovSpeed;
    let tremorScale;
    if (hood) {
      // Hood / driver: sit on the windshield (well forward of centre).
      // Old +1.15 put the lens behind the cabin and framed the rear of the car / seats.
      back = THREE.MathUtils.lerp(-1.05, -0.7, flyBlend);
      height = eyeHeight + 0.12 + speedRatio * 0.06 + (isPlanet() ? carY * 0 : carY);
      lookAhead = THREE.MathUtils.lerp(32, 70, planetSky);
      lookDown = planetSky * carY * 0.05;
      followRate = THREE.MathUtils.lerp(14, 26, hyperBlend);
      fovBase = THREE.MathUtils.lerp(66, 74, planetSky);
      fovSpeed = 8;
      tremorScale = THREE.MathUtils.lerp(0.008, 0, hyperBlend);
    } else if (aerial) {
      const skyBack = isPlanet()
        ? THREE.MathUtils.lerp(28, Math.max(120, planetRadius() * 0.55 + carY * 0.35), planetSky)
        : 48 + carY * 0.035;
      back = THREE.MathUtils.lerp(THREE.MathUtils.lerp(16, 30, flyBlend), skyBack, isPlanet() ? planetSky : flyBlend * 0.3);
      height = isPlanet()
        ? THREE.MathUtils.lerp(THREE.MathUtils.lerp(26, 42, flyBlend), 80 + carY * 0.25, planetSky)
        : carY + THREE.MathUtils.lerp(THREE.MathUtils.lerp(26, 42 + carY * 0.1, flyBlend), 90 + carY * 0.15, planetSky);
      // Look well ahead of the car so aerial is a map view, not a stare at the rear bumper.
      lookAhead = THREE.MathUtils.lerp(THREE.MathUtils.lerp(12, 18, flyBlend), 6, planetSky);
      lookDown = isPlanet() ? THREE.MathUtils.lerp(0, Math.min(40 + carY * 0.04, planetRadius() * 0.2), planetSky) : 0;
      followRate = THREE.MathUtils.lerp(THREE.MathUtils.lerp(5.0, 3.6, planetSky), 18, hyperBlend);
      fovBase = THREE.MathUtils.lerp(56, 70, planetSky);
      fovSpeed = 10;
      tremorScale = THREE.MathUtils.lerp(0.005, 0, hyperBlend);
    } else {
      const skyBack = isPlanet()
        ? THREE.MathUtils.lerp(22, Math.max(90, planetRadius() * 0.4 + carY * 0.28), planetSky)
        : 40 + carY * 0.03;
      // Equator orbit race: pull back a touch so the whole car stays framed on the curved deck.
      const chaseBack = (isPlanet() && circuitActive) ? 14.5 : 11.8;
      const chaseHeight = (isPlanet() && circuitActive) ? 6.4 : 5.2;
      // Mild speed ease only — large offsets read as shake when throttle hunts near redline.
      const speedBack = THREE.MathUtils.lerp(0, 1.1, hyperBlend);
      const speedDrop = THREE.MathUtils.lerp(0, 0.25, hyperBlend);
      back = THREE.MathUtils.lerp(THREE.MathUtils.lerp(chaseBack, 22, flyBlend), skyBack, isPlanet() ? planetSky : flyBlend * 0.25) + speedBack;
      height = isPlanet()
        ? THREE.MathUtils.lerp(THREE.MathUtils.lerp(chaseHeight, 16, flyBlend), 50 + carY * 0.18, planetSky)
        : carY + THREE.MathUtils.lerp(THREE.MathUtils.lerp(5.2 - speedRatio * 0.35 - speedDrop, 16 + flyBlend * 10, flyBlend), 60 + carY * 0.1, planetSky);
      lookAhead = THREE.MathUtils.lerp(THREE.MathUtils.lerp(16, 7, flyBlend), 4, planetSky) + THREE.MathUtils.lerp(0, 4, hyperBlend);
      lookDown = isPlanet() ? THREE.MathUtils.lerp(0, Math.min(24 + carY * 0.03, planetRadius() * 0.12), planetSky) : 0;
      followRate = THREE.MathUtils.lerp(THREE.MathUtils.lerp(6.2, 4.0, planetSky), 22, hyperBlend);
      fovBase = THREE.MathUtils.lerp(baseFov, 68, planetSky);
      fovSpeed = 16;
      tremorScale = THREE.MathUtils.lerp(0.01, 0, hyperBlend);
    }

    let targetX;
    let targetY;
    let targetZ;
    let lookX;
    let lookY;
    let lookZ;
    if (free && isPlanet()) {
      // Always aim with camHeading (catch-up rate scales with speed elsewhere) — no hard face snap.
      const faceHeading = camHeading;
      // Hood uses the same absolute eye height as flat; chase/aerial use the blended rig height.
      const rigHeight = hood ? (eyeHeight + 0.12 + speedRatio * 0.06) : height;
      cameraOnSphere({
        x: mapX,
        y: carY,
        z: mapZ,
        heading: faceHeading,
        back,
        height: rigHeight,
        lookAhead,
        lookDown,
        camPos: _planetCamPos,
        camLook: _planetCamLook,
        camUp: _planetCamUp
      });
      // From orbit, bias the look target toward the planet centre so the globe stays framed.
      if (planetSky > 0.2) {
        _planetCamLook.multiplyScalar(1 - planetSky * 0.65);
      }
      targetX = _planetCamPos.x;
      targetY = _planetCamPos.y;
      targetZ = _planetCamPos.z;
      lookX = _planetCamLook.x;
      lookY = _planetCamLook.y;
      lookZ = _planetCamLook.z;
      camUp.lerp(_planetCamUp, Math.min(1, delta * followRate));
    } else {
      camUp.set(0, 1, 0);
      // Free uses lagged camHeading; race highway uses the car's face. Never hard-swap mid-frame.
      const aim = free ? camHeading : face;
      const sx = Math.sin(aim);
      const cz = Math.cos(aim);
      targetX = free ? (px - sx * back) : (px * (hood ? 0.05 : aerial ? 0.18 : 0.34));
      targetY = isPlanet() ? height : (hood ? height : height);
      // Race mode keeps the car pinned at PLAYER_Z; place cabin/aerial/chase relative to that rail.
      targetZ = free
        ? (pz + cz * back)
        : (hood || aerial ? PLAYER_Z + back : 11.8);
      lookX = free
        ? (px + sx * lookAhead)
        : (px * (hood ? 0.04 : aerial ? 0.1 : 0.2) + face * (hood ? 10 : aerial ? 4 : 14));
      lookY = hood
        ? carY + eyeHeight * 0.42
        : (aerial ? carY + 1.2 : carY + THREE.MathUtils.lerp(1.2, 0.35, flyBlend));
      lookZ = free
        ? (pz - cz * lookAhead)
        : (hood ? -lookAhead : aerial ? PLAYER_Z - lookAhead : -16);
      if (!free) {
        if (hood) targetY = carY + eyeHeight + 0.12 + speedRatio * 0.06;
        else if (aerial) targetY = carY + THREE.MathUtils.lerp(26, 42 + carY * 0.1, flyBlend);
        else targetY = carY + THREE.MathUtils.lerp(5.2 - speedRatio * 0.35, 16 + flyBlend * 10, flyBlend);
      } else if (!isPlanet()) {
        if (hood) targetY = carY + eyeHeight + 0.12 + speedRatio * 0.06;
      }
    }
    // Catch up fast on big altitude jumps so flying never leaves the lens near the ground.
    // High-speed free: raise followRate via hyperBlend — never hard-snap follow to 1 (that was the ~200 km/h pop).
    // Mode switches still snap so C never shows a mid-lerp rear view.
    camSnapT = Math.max(0, camSnapT - delta);
    const liftGap = Math.hypot(targetX - camPos.x, targetY - camPos.y, targetZ - camPos.z);
    const liftBoost = hyperBlend > 0.85 ? 1.6 : (liftGap > 12 ? 4.5 : 1);
    const follow = camSnapT > 0 ? 1 : Math.min(1, delta * followRate * liftBoost);
    camPos.x += (targetX - camPos.x) * follow;
    camPos.y += (targetY - camPos.y) * follow;
    camPos.z += (targetZ - camPos.z) * follow;
    camLook.x += (lookX - camLook.x) * follow;
    camLook.y += (lookY - camLook.y) * follow;
    camLook.z += (lookZ - camLook.z) * follow;
    // Suspension-like shake: critically damped spring, not per-frame random noise.
    // Road "bumps" are absorbed — only brief impact impulses move the lens, then settle.
    camShakeMag = Math.max(0, camShakeMag - delta * 5.5);
    if (hyperBlend > 0.25) camShakeMag *= 1 - (hyperBlend - 0.25) * 1.1;
    const tremorMul = absSpeed > 22 ? 0 : (1 - absSpeed / 22);
    const tremor = speedRatio * tremorScale * tremorMul * 0.35;
    if (tremor > 1e-4 && camSnapT <= 0) {
      camShakeVel.x += (Math.random() - 0.5) * tremor;
      camShakeVel.y += (Math.random() - 0.5) * tremor * 0.45;
      camShakeVel.z += (Math.random() - 0.5) * tremor;
    }
    if (camShakeMag > 0.01) {
      camShakeVel.x += (Math.random() - 0.5) * camShakeMag * 0.8;
      camShakeVel.y += (Math.random() - 0.5) * camShakeMag * 0.45;
      camShakeVel.z += (Math.random() - 0.5) * camShakeMag * 0.8;
    }
    // Spring toward 0 with strong damping (reads as soft suspension).
    const springK = 70;
    const dampC = 18;
    camShakeVel.x += (-springK * camShake.x - dampC * camShakeVel.x) * delta;
    camShakeVel.y += (-springK * camShake.y - dampC * camShakeVel.y) * delta;
    camShakeVel.z += (-springK * camShake.z - dampC * camShakeVel.z) * delta;
    camShake.x += camShakeVel.x * delta;
    camShake.y += camShakeVel.y * delta;
    camShake.z += camShakeVel.z * delta;
    if (hyperBlend > 0.55) {
      camShake.multiplyScalar(0.35);
      camShakeVel.multiplyScalar(0.35);
    }
    camera.up.copy(camUp);
    camera.position.set(camPos.x + camShake.x, camPos.y + camShake.y, camPos.z + camShake.z);
    camera.lookAt(camLook.x, camLook.y, camLook.z);
    cameraButton.dataset.camY = camPos.y.toFixed(1);
    cameraButton.dataset.carY = carY.toFixed(1);
    // Stretch clip/fog when high so the city below stays visible from the air.
    const horizon = freeActive ? (freeCity.loadHorizon || 900) : 700;
    const R = isPlanet() ? planetRadius() : 0;
    const far = isPlanet()
      ? Math.max(1500, R * 6 + carY * 4)
      : Math.max(700 + carY * 3.5, wraps() ? SIZE * 1.6 + carY * 2.2 : 700 + carY * 3.5);
    if (Math.abs(camera.far - far) > 8) {
      camera.far = far;
      camera.updateProjectionMatrix();
    }
    if (freeActive) {
      if (isPlanet()) {
        // Thin atmosphere near the surface; clear dark sky once you leave the planet.
        // Soft atmospheric haze near the surface; clear to space black once you leave the limb.
        // Crystal-clear near the surface (long fog), then open to space black in orbit.
        const fogFar = THREE.MathUtils.lerp(R * 3.4, R * 12 + carY * 2.8, planetSky);
        const fogCol = new THREE.Color().setHSL(
          THREE.MathUtils.lerp(0.56, 0.72, planetSky),
          THREE.MathUtils.lerp(0.16, 0.06, planetSky),
          THREE.MathUtils.lerp(0.62, 0.015, planetSky)
        );
        scene.fog.color.copy(fogCol);
        scene.background = fogCol.clone();
        scene.fog.near = THREE.MathUtils.lerp(R * 0.85, R * 2.0, planetSky);
        scene.fog.far = fogFar;
      } else {
        const fogFar = wraps()
          ? Math.max(SIZE * 1.35, 900 + carY * 2.4)
          : Math.min(320 + carY * 2.8, horizon * 0.82);
        scene.fog.near = Math.min(70 + carY * 0.35, fogFar * 0.35);
        scene.fog.far = fogFar;
      }
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
  // Speedometer uses ground-truth motion (m/s), not the uncapped throttle intent.
  let displaySpeed = 0;
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
  // Camera suspension: smoothed speed for blend + spring-damped shake (no high-freq random jitter).
  let camSpeedSmooth = 0;
  const camShakeVel = new THREE.Vector3();
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


  function applyCircuitSky(circuit) {
    world.setRoute({
      ...route,
      sky: circuit.sky,
      ground: circuit.ground,
      hemi: circuit.hemi,
      sun: circuit.sun,
      sunColor: circuit.sunColor,
      night: !!circuit.night,
      water: 0,
      area: circuit.area
    });
  }

  function placeCircuitCamera(spawn) {
    heading = spawn.heading;
    camHeading = spawn.heading;
    const back = 20;
    const height = 8.5;
    const look = 48;
    camPos.set(
      spawn.x - Math.sin(spawn.heading) * back,
      (spawn.y || 0) + height,
      spawn.z + Math.cos(spawn.heading) * back
    );
    camLook.set(
      spawn.x + Math.sin(spawn.heading) * look,
      (spawn.y || 0) + 1.6,
      spawn.z - Math.cos(spawn.heading) * look
    );
    camUp.set(0, 1, 0);
    camera.up.copy(camUp);
    camera.position.copy(camPos);
    camera.lookAt(camLook);
    player.position.set(spawn.x, spawn.y || 0, spawn.z);
    player.rotation.set(0, -spawn.heading, 0);
  }

  function showDistrictMenu() {
    menuCircuitPreview = false;
    circuitTrack.setVisible(false);
    freeCity.setVisible(false);
    realCity.setVisible(false);
    world.setFreeMode(false);
    world.setPlanetSky(false);
    blocks.forEach((block) => { block.visible = true; });
    resetCarPose();
    camPos.set(0, 5.0, 11.8);
    camLook.set(0, 1.1, -16);
    camUp.set(0, 1, 0);
    camera.up.copy(camUp);
    camera.position.copy(camPos);
    camera.lookAt(camLook);
    world.followPlayer(0, -30, true);
    world.setRoute(route);
    scene.fog.near = 110;
    scene.fog.far = 430;
    if (mode !== 'race') trafficSystem.populate(16);
    else trafficSystem.clearTraffic();
    locationName.textContent = areaLabel;
  }

  // Race mode welcome: stage the selected circuit so Start Drive matches the backdrop.
  function showCircuitMenu() {
    menuCircuitPreview = true;
    leaveCircuit();
    freeActive = false;
    realActive = false;
    freeCity.setVisible(false);
    realCity.setVisible(false);
    world.setFreeMode(true);
    blocks.forEach((block) => { block.visible = false; });
    trafficSystem.clearTraffic();
    trafficSystem.clearRacers();
    finishGate.visible = false;
    smashStat.hidden = true;
    minimap.hidden = true;
    const circuit = circuitById(selectedCircuitId || route.circuit);
    selectedCircuitId = circuit.id;
    areaLabel = circuit.area;
    locationName.textContent = circuit.name;
    if (isPlanet() || circuit.planet) {
      circuitTrack.setVisible(false);
      freeCity.setVisible(true);
      raceTrack = planetOrbitTrack;
      const spawn = planetOrbitTrack.spawn(4.5);
      mapX = spawn.x;
      mapZ = spawn.z;
      heading = spawn.heading;
      camHeading = heading;
      freeCity.prefill(mapX, mapZ, Date.now() / 1000);
      placeObjectOnSphere(player, mapX, 0, mapZ, heading);
      const pose = poseOnSphere(mapX, 40, mapZ, heading);
      camPos.copy(pose.position).addScaledVector(pose.up, 8).addScaledVector(pose.north, -18);
      camLook.copy(pose.position);
      camUp.copy(pose.up);
      camera.up.copy(camUp);
      camera.position.copy(camPos);
      camera.lookAt(camLook);
      world.setPlanetSky(true);
      world.followPlanetPlayer(player.position, {
        altitude: 0, cameraPosition: camPos, sunDirs: freeCity.sunDirs()
      });
      applyCircuitSky(circuit);
      scene.fog.near = 70;
      scene.fog.far = Math.max(420, planetRadius() * 1.4);
    } else {
      raceTrack = circuitTrack;
      circuitTrack.setCircuit(circuit);
      circuitTrack.setVisible(true);
      const spawn = circuitTrack.spawn(-4.5);
      mapX = spawn.x;
      mapZ = spawn.z;
      placeCircuitCamera(spawn);
      world.setPlanetSky(false);
      world.followPlayer(spawn.x, spawn.z, true);
      applyCircuitSky(circuit);
      scene.fog.near = 90;
      scene.fog.far = 520;
    }
  }

  function syncMenuBackdrop() {
    if (hasStarted) return;
    if (mode === 'race') showCircuitMenu();
    else showDistrictMenu();
  }

  menuBackdropReady = true;
  syncMenuBackdrop();

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
  // orientationchange also resets tilt in resize handlers below

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
    if (value) {
      setPlayChrome(true);
      lastTime = performance.now();
    }
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
    const city = currentCity();
    c.fillStyle = city.style.minimapSea || '#7fb2c9';
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
    if (usesOrganicLayout(city)) {
      for (let i = 0; i <= GRID; i++) {
        c.moveTo(avenueX(i, 0, city) * k, 0);
        for (let j = 1; j <= GRID; j++) c.lineTo(avenueX(i, j * PITCH, city) * k, j * PITCH * k);
      }
      for (let j = 0; j <= GRID; j++) {
        c.moveTo(0, streetZ(j, 0, city) * k);
        for (let i = 1; i <= GRID; i++) c.lineTo(i * PITCH * k, streetZ(j, i * PITCH, city) * k);
      }
    } else {
      for (let n = 0; n <= GRID; n++) {
        c.moveTo(n * PITCH * k, 0); c.lineTo(n * PITCH * k, SIZE * k);
        c.moveTo(0, n * PITCH * k); c.lineTo(SIZE * k, n * PITCH * k);
      }
    }
    c.stroke();
  }
  buildMapLayer();

  // Switching city: swap the map, style and routes, then pick that city's first route.
  function selectCity(city) {
    setCity(city.id);
    freeCity.clear();
    freeCity.setStyle(city.style);
    try { localStorage.setItem('cityDrivingCity', city.id); } catch (error) { /* storage unavailable */ }
    const firstCircuit = circuitsFor({ planet: !!city.planet })[0];
    selectedCircuitId = firstCircuit?.id || selectedCircuitId;
    renderRoutes();
    updateCityText();
    buildMapLayer();
    applyRoute(routesFor(city.id)[0]);
    if (mode === 'race' && firstCircuit) applyCircuit(firstCircuit.id);
    realCity.unload();
    if (mode === 'real') setMode('free');
    refreshRealMap();
  }
  const globeOverlay = document.getElementById('globe');
  const globe = createGlobe({
    stage: document.getElementById('globe-stage'),
    labels: document.getElementById('globe-labels'),
    card: document.getElementById('globe-card'),
    worlds: document.getElementById('globe-worlds'),
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
    const size = minimap.width;
    // Sphere-net: local visible patch, rotated so the car always faces up.
    if (isPlanet() && !realActive) {
      const style = currentCity().style || {};
      const viewR = Math.min(SIZE * 0.22, Math.max(260, (freeCity.constructionRadius || 600) * 0.42));
      const mx = wrapCoord(mapX);
      const mz = wrapCoord(mapZ);
      const k = size / (viewR * 2);
      minimapCtx.save();
      minimapCtx.clearRect(0, 0, size, size);
      minimapCtx.beginPath();
      minimapCtx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
      minimapCtx.clip();
      minimapCtx.fillStyle = style.minimapSea || '#14283a';
      minimapCtx.fillRect(0, 0, size, size);
      minimapCtx.translate(size / 2, size / 2);
      minimapCtx.rotate(-heading);
      const i0 = Math.floor((mx - viewR) / PITCH) - 1;
      const i1 = Math.ceil((mx + viewR) / PITCH) + 1;
      const j0 = Math.floor((mz - viewR) / PITCH) - 1;
      const j1 = Math.ceil((mz + viewR) / PITCH) + 1;
      for (let i = i0; i <= i1; i++) {
        for (let j = j0; j <= j1; j++) {
          const cell = cellInfo(i, j);
          let cx = i * PITCH + PITCH / 2 - mx;
          let cz = j * PITCH + PITCH / 2 - mz;
          // Shortest wrap delta on both axes (no geographic poles).
          if (cx > SIZE / 2) cx -= SIZE; else if (cx < -SIZE / 2) cx += SIZE;
          if (cz > SIZE / 2) cz -= SIZE; else if (cz < -SIZE / 2) cz += SIZE;
          if (Math.hypot(cx, cz) > viewR + PITCH) continue;
          // Flip Z: planet heading 0 advances +Z, but canvas Y grows downward.
          minimapCtx.fillStyle = DISTRICT_COLORS[cell.kind] || style.minimapLand || '#2a3348';
          minimapCtx.fillRect(cx * k - PITCH * k / 2, -cz * k - PITCH * k / 2, PITCH * k + 0.5, PITCH * k + 0.5);
        }
      }
      minimapCtx.strokeStyle = 'rgba(251,250,243,0.35)';
      minimapCtx.lineWidth = 1;
      minimapCtx.beginPath();
      for (let n = i0; n <= i1 + 1; n++) {
        let gx = n * PITCH - mx;
        if (gx > SIZE / 2) gx -= SIZE; else if (gx < -SIZE / 2) gx += SIZE;
        minimapCtx.moveTo(gx * k, -viewR * k); minimapCtx.lineTo(gx * k, viewR * k);
      }
      for (let n = j0; n <= j1 + 1; n++) {
        let gz = n * PITCH - mz;
        if (gz > SIZE / 2) gz -= SIZE; else if (gz < -SIZE / 2) gz += SIZE;
        minimapCtx.moveTo(-viewR * k, -gz * k); minimapCtx.lineTo(viewR * k, -gz * k);
      }
      minimapCtx.stroke();
      minimapCtx.restore();
      // Car glyph stays upright at centre.
      minimapCtx.save();
      minimapCtx.translate(size / 2, size / 2);
      minimapCtx.fillStyle = '#d9482b';
      minimapCtx.strokeStyle = '#fff';
      minimapCtx.lineWidth = 1.5;
      minimapCtx.beginPath();
      minimapCtx.moveTo(0, -7); minimapCtx.lineTo(5, 6); minimapCtx.lineTo(0, 3); minimapCtx.lineTo(-5, 6);
      minimapCtx.closePath();
      minimapCtx.fill();
      minimapCtx.stroke();
      minimapCtx.restore();
      return;
    }
    const k = size / (realActive ? realCity.half * 2 : SIZE);
    const offset = realActive ? realCity.half : 0;
    minimapCtx.drawImage(realActive ? realCity.mapLayer(size) : mapLayer, 0, 0);
    minimapCtx.save();
    const mapDrawX = realActive
      ? player.position.x
      : (wraps() ? wrapCoord(player.position.x) : player.position.x);
    const mapDrawZ = realActive
      ? player.position.z
      : (wraps() ? wrapCoord(player.position.z) : player.position.z);
    minimapCtx.translate((mapDrawX + offset) * k, (mapDrawZ + offset) * k);
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

  function enterCircuit() {
    circuitActive = true;
    freeActive = true; // reuse free-style steering / heading
    world.setFreeMode(true);
    blocks.forEach((block) => { block.visible = false; });
    realCity.setVisible(false);
    finishGate.visible = false;
    smashStat.hidden = true;
    const circuit = circuitById(selectedCircuitId || route.circuit);
    selectedCircuitId = circuit.id;
    areaLabel = circuit.area;
    locationName.textContent = circuit.name;
    const onPlanet = isPlanet() || !!circuit.planet;
    // Planet races the straight equatorial belt on the live sphere-net city.
    // Earth races a flat oval ribbon (hide free city).
    raceTrack = onPlanet ? planetOrbitTrack : circuitTrack;
    freeCity.setVisible(onPlanet);
    circuitTrack.setVisible(!onPlanet);
    if (!onPlanet) circuitTrack.setCircuit(circuit);
    trafficSystem.bindCircuit(raceTrack);
    const reusePreview = menuCircuitPreview;
    menuCircuitPreview = false;
    circuitT = 0.02;
    altitude = 0;
    climb = 0;
    if (reusePreview) {
      // Welcome screen already staged this circuit — keep the same camera and car pose.
      orbitLastX = mapX;
      if (onPlanet) {
        world.setPlanetSky(true);
        world.followPlanetPlayer(player.position, {
          altitude: 0, cameraPosition: camPos, sunDirs: freeCity.sunDirs()
        });
        scene.fog.near = 70;
        scene.fog.far = Math.max(420, planetRadius() * 1.4);
      } else {
        world.setPlanetSky(false);
        world.followPlayer(mapX, mapZ);
        scene.fog.near = 90;
        scene.fog.far = 520;
      }
      applyCircuitSky(circuit);
    } else {
      const spawn = raceTrack.spawn(onPlanet ? 4.5 : -4.5);
      mapX = spawn.x;
      mapZ = spawn.z;
      heading = spawn.heading;
      camHeading = heading;
      orbitLastX = mapX;
      if (onPlanet) {
        freeCity.prefill(mapX, mapZ, Date.now() / 1000);
        placeObjectOnSphere(player, mapX, 0, mapZ, heading);
        const pose = poseOnSphere(mapX, 40, mapZ, heading);
        camPos.copy(pose.position).addScaledVector(pose.up, 8).addScaledVector(pose.north, -18);
        camLook.copy(pose.position);
        camUp.copy(pose.up);
        camera.up.copy(camUp);
        camera.position.copy(camPos);
        camera.lookAt(camLook);
        world.setPlanetSky(true);
        world.followPlanetPlayer(player.position, {
          altitude: 0, cameraPosition: camPos, sunDirs: freeCity.sunDirs()
        });
        scene.fog.near = 70;
        scene.fog.far = Math.max(420, planetRadius() * 1.4);
      } else {
        player.position.set(spawn.x, spawn.y, spawn.z);
        player.rotation.set(0, -heading, 0);
        world.setPlanetSky(false);
        world.followPlayer(spawn.x, spawn.z, true);
        scene.fog.near = 90;
        scene.fog.far = 520;
      }
      applyCircuitSky(circuit);
    }
    minimap.hidden = false;
    mapTimer = 0;
  }

  function leaveCircuit() {
    if (!circuitActive) return;
    circuitActive = false;
    circuitTrack.setVisible(false);
    trafficSystem.bindCircuit(null);
    raceTrack = circuitTrack;
  }

  function enterFree() {
    leaveCircuit();
    if (!freeActive) roadName.dataset.default = roadName.textContent;
    freeActive = true;
    world.setFreeMode(true);
    blocks.forEach((block) => { block.visible = false; });
    trafficSystem.clearTraffic();
    trafficSystem.clearRacers();
    finishGate.visible = false;
    realActive = mode === 'real' && realCity.ready;
    scene.fog.near = realActive ? 55 : 70;
    scene.fog.far = realActive ? 380 : 320;
    freeCity.setVisible(!realActive);
    realCity.setVisible(realActive);
    smashStat.hidden = realActive;
    impactShake = 0;
    const spawn = realActive ? realCity.spawn() : spawnFor(route.id);
    mapX = spawn.x;
    mapZ = spawn.z;
    heading = spawn.heading;
    camHeading = heading;
    if (isPlanet()) {
      scene.fog.color.set(0x6a98b8);
      scene.background = new THREE.Color(0x6a98b8);
      world.setPlanetSky(true);
      if (!realActive) freeCity.prefill(mapX, mapZ, Date.now() / 1000);
      placeObjectOnSphere(player, mapX, 0, mapZ, heading);
      const pose = poseOnSphere(mapX, 40, mapZ, heading);
      camPos.copy(pose.position).addScaledVector(pose.up, 8).addScaledVector(pose.north, -18);
      camLook.copy(pose.position);
      camUp.copy(pose.up);
      camera.up.copy(camUp);
      camera.position.copy(camPos);
      camera.lookAt(camLook);
      world.followPlanetPlayer(player.position, {
        altitude: 0, cameraPosition: camPos, sunDirs: freeCity.sunDirs()
      });
    } else {
      world.setPlanetSky(false);
      player.position.set(spawn.x, spawn.y || groundHeight(spawn.x, spawn.z), spawn.z);
      player.rotation.set(0, -heading, 0);
      world.followPlayer(spawn.x, spawn.z);
      if (!realActive) freeCity.prefill(spawn.x, spawn.z, Date.now() / 1000);
    }
    minimap.hidden = false;
    mapTimer = 0;
  }

  function leaveFree() {
    if (!freeActive && !circuitActive && !menuCircuitPreview) return;
    leaveCircuit();
    freeActive = false;
    realActive = false;
    smashStat.hidden = true;
    player.position.y = 0;
    altitude = 0;
    climb = 0;
    if (carModel.userData.setThrust) carModel.userData.setThrust(0, 0);
    minimap.hidden = true;
    roadName.textContent = roadName.dataset.default || trafficLabel();
    locationName.textContent = areaLabel;
    camShakeMag = 0;
    fx.clear();
    if (!hasStarted) {
      syncMenuBackdrop();
      return;
    }
    menuCircuitPreview = false;
    freeCity.setVisible(false);
    realCity.setVisible(false);
    circuitTrack.setVisible(false);
    world.setFreeMode(false);
    blocks.forEach((block) => { block.visible = true; });
    scene.fog.near = 110;
    scene.fog.far = 430;
    camPos.set(0, 5.0, 11.8);
    camLook.set(0, 1.1, -16);
    camUp.set(0, 1, 0);
    camera.up.copy(camUp);
    camera.position.copy(camPos);
    camera.lookAt(camLook);
    world.setPlanetSky(false);
    world.setRoute(route);
    trafficSystem.populate(16);
    resetCarPose();
  }

  function updateCircuitDrive(delta) {
    const onPlanet = isPlanet() && raceTrack.planet;
    // Planet: keep logical mapX/mapZ from sphere physics. Earth: project world XZ onto the ribbon.
    const px = onPlanet ? mapX : player.position.x;
    const pz = onPlanet ? mapZ : player.position.z;
    if (onPlanet) {
      // Progress along the equatorial belt from wrapped +X travel.
      let dX = px - orbitLastX;
      dX -= SIZE * Math.round(dX / SIZE);
      if (dX > 0) distance += dX;
      orbitLastX = px;
      circuitT = ((wrapCoord(px) / SIZE) % 1 + 1) % 1;
      freeCity.update(px, pz, Date.now() / 1000, 1, altitude);
      freeCity.animate(delta, { x: px, z: pz, heading, speed });
      world.followPlanetPlayer(player.position, {
        altitude, cameraPosition: camPos, sunDirs: freeCity.sunDirs()
      });
    } else {
      const hit = raceTrack.project(px, pz);
      let dT = hit.t - circuitT;
      if (dT < -0.5) dT += 1;
      if (dT > 0.5) dT -= 1;
      if (dT > 0) distance += dT * raceTrack.length;
      circuitT = hit.t;
      mapX = px;
      mapZ = pz;
      world.followPlayer(px, pz);
    }
    impactShake = Math.max(0, impactShake - delta * 1.2);

    const circuit = circuitById(selectedCircuitId || route.circuit);
    if (locationName.textContent !== circuit.name) locationName.textContent = circuit.name;
    if (roadName.textContent !== 'RACING LINE') roadName.textContent = onPlanet ? 'EQUATOR BELT' : 'RACING LINE';

    const length = tripLength();
    const laneHit = raceTrack.project(px, pz);
    trafficSystem.update(delta, {
      playerForward: speed, playerX: px, playerZ: pz, playerSpeed: speed, distance, time: raceTime,
      go: phase === 'drive', playerTop: stats.top, playerAccel: stats.accel, length,
      playerLaneOffset: laneHit.lateral ?? 0
    });
    collisionCooldown = Math.max(0, collisionCooldown - delta);
    if (collisionCooldown === 0 && phase === 'drive') {
      const crash = trafficSystem.findCollision(px, pz);
      if (crash) {
        collisionCooldown = 0.55;
        crashes++;
        speed *= 0.72;
        heading += Math.sign(px - crash.x || 1) * -0.03;
        trafficSystem.resolveCollision(crash, px, pz);
        pulseImpact(0.28, { force: true });
      }
    }

    const speedRatio = Math.min(1, Math.abs(speed) / 60);
    // Smooth catch-up: faster at high speed, never a hard lock (that snapped the chase rig).
    {
      const hb = THREE.MathUtils.smoothstep(Math.abs(speed), 35, 70);
      const catchUp = THREE.MathUtils.lerp(4.5, 16, hb);
      camHeading += Math.atan2(Math.sin(heading - camHeading), Math.cos(heading - camHeading)) * Math.min(1, delta * catchUp);
    }
    // Planet cameras must use altitude (not world Y) or the lens flies into orbit.
    updateCamera(delta, {
      px, py: onPlanet ? altitude : player.position.y, pz, heading, speedRatio, free: true
    });
    speedOutput.textContent = String(Math.round(Math.abs(displaySpeed) * 3.6));
    distanceOutput.textContent = (distance / 1000).toFixed(1);
    updateTrip();
    boardTimer -= delta;
    if (boardTimer <= 0) {
      boardTimer = 0.2;
      updateRaceBoard();
    }
    mapTimer -= delta;
    if (mapTimer <= 0) {
      mapTimer = 0.12;
      if (onPlanet) drawMinimap();
      else drawCircuitMinimap();
    }
    if (distance >= length && !tripDone) finishTrip();
  }

  function drawCircuitMinimap() {
    const size = minimap.width;
    // Larger Earth circuits need a wider minimap scale.
    const k = size / 900;
    minimapCtx.clearRect(0, 0, size, size);
    minimapCtx.fillStyle = '#1a2430';
    minimapCtx.beginPath();
    minimapCtx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
    minimapCtx.fill();
    minimapCtx.save();
    minimapCtx.beginPath();
    minimapCtx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
    minimapCtx.clip();
    minimapCtx.translate(size / 2 - player.position.x * k, size / 2 - player.position.z * k);
    minimapCtx.strokeStyle = '#d0d4d8';
    minimapCtx.lineWidth = 5;
    minimapCtx.beginPath();
    for (let i = 0; i <= 120; i++) {
      const p = raceTrack.sample(i / 120).point;
      if (i === 0) minimapCtx.moveTo(p.x * k, p.z * k);
      else minimapCtx.lineTo(p.x * k, p.z * k);
    }
    minimapCtx.closePath();
    minimapCtx.stroke();
    minimapCtx.restore();
    minimapCtx.save();
    minimapCtx.translate(size / 2, size / 2);
    minimapCtx.rotate(heading);
    minimapCtx.fillStyle = '#d9482b';
    minimapCtx.beginPath();
    minimapCtx.moveTo(0, -7); minimapCtx.lineTo(5, 6); minimapCtx.lineTo(0, 3); minimapCtx.lineTo(-5, 6);
    minimapCtx.closePath();
    minimapCtx.fill();
    minimapCtx.restore();
  }

  function updateFree(delta, forward) {
    const px = isPlanet() ? mapX : player.position.x;
    const pz = isPlanet() ? mapZ : player.position.z;
    distance += Math.abs(forward) * delta;
    if (!isPlanet()) world.followPlayer(px, pz);
    else world.followPlanetPlayer(player.position, {
      altitude, cameraPosition: camPos, sunDirs: freeCity.sunDirs()
    });
    impactShake = Math.max(0, impactShake - delta * 1.2);
    if (realActive) {
      if (locationName.textContent !== 'REAL MAP') locationName.textContent = 'REAL MAP';
    } else {
      freeCity.update(px, pz, Date.now() / 1000, 1, altitude);
      freeCity.animate(delta, { x: px, z: pz, heading, speed });
      const { props, peds, cars } = freeCity.stats;
      smashOutput.textContent = String(props + peds + cars);
      const info = infoAt(px, pz);
      let nearLandmark = false;
      if (info.landmark) {
        const lx = info.landmark.i * PITCH + PITCH * 0.5;
        const lz = info.landmark.j * PITCH + PITCH * 0.5;
        const wrapDelta = (a, b) => { let d = a - b; d -= SIZE * Math.round(d / SIZE); return d; };
        const dx = wraps() || isPlanet() ? wrapDelta(px, lx) : px - lx;
        const dz = wraps() || isPlanet() ? wrapDelta(pz, lz) : pz - lz;
        nearLandmark = Math.hypot(dx, dz) < 90;
      }
      const place = nearLandmark
        ? `${info.district} · ${landmarkName(info.landmark.id).toUpperCase()}` : info.district.toUpperCase();
      if (locationName.textContent !== place) locationName.textContent = place;
      if (roadName.textContent !== info.street.toUpperCase()) roadName.textContent = info.street.toUpperCase();
    }

    const speedRatio = Math.min(1, Math.abs(speed) / 60);
    // Chase camera trails heading with lag that tightens smoothly as speed rises — no hard lock at ~200 km/h.
    {
      const hb = THREE.MathUtils.smoothstep(Math.abs(speed), 35, 70);
      const catchUp = THREE.MathUtils.lerp(4.5, 16, hb);
      camHeading += Math.atan2(Math.sin(heading - camHeading), Math.cos(heading - camHeading)) * Math.min(1, delta * catchUp);
    }
    // Fade smash micro-shakes as speed climbs so they don't stack into a fake bounce.
    {
      const hb = THREE.MathUtils.smoothstep(Math.abs(speed), 35, 70);
      if (impactShake > 0.1 && hb < 0.85) {
        pulseImpact(impactShake * (1 - hb));
        impactShake *= 0.35;
      } else if (hb >= 0.85) {
        impactShake = 0;
        camShakeMag *= 0.5;
      }
    }
    updateCamera(delta, {
      px,
      py: isPlanet() ? altitude : player.position.y,
      pz,
      heading,
      speedRatio,
      free: true
    });
    // Free-roam meter already synced from ground travel inside the physics step.
    if (!(freeActive && !circuitActive)) displaySpeed = Math.abs(speed);
    speedOutput.textContent = String(Math.round(Math.abs(displaySpeed) * 3.6));
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
    speed = 0;
    displaySpeed = 0;
    speedOutput.textContent = '0';
    distanceOutput.textContent = '0.0';
    leaveFree();
    if (!menuCircuitPreview && mode !== 'race') resetCarPose();
  }

  function startDrive() {
    // Request immersive / Fullscreen API first so the call stays inside the tap gesture.
    immersiveWanted = true;
    document.documentElement.classList.add('is-immersive');
    gameRoot.classList.add('is-playing');
    syncAppViewport();
    tryHideMobileBrowserChrome();
    enterFullscreen();
    if (isTouchDevice && !tilt.asked && 'DeviceOrientationEvent' in window) {
      tilt.asked = true;
      setTilt(true);
    } else {
      tilt.neutral = null;
    }
    if (mode === 'real' && (!realCity.ready || realCity.loadedId !== currentCity().id)) {
      const city = currentCity();
      startButton.disabled = true;
      welcomeNote.textContent = `Loading real ${city.name} streets…`;
      realCity.load(city, (text) => { welcomeNote.textContent = text; }).then((ok) => {
        startButton.disabled = false;
        welcomeNote.textContent = ok ? 'No rush. Just enjoy the ride.' : 'Could not load the real map; using Free roam.';
        if (!ok) setMode('free');
        startDrive();
      });
      return;
    }
    hasStarted = true;
    audio.resume();
    speed = 0;
    displaySpeed = 0;
    camSpeedSmooth = 0;
    camShakeVel.set(0, 0, 0);
    prevSpeed = 0;
    distance = 0;
    crashes = 0;
    tripDone = false;
    raceTime = 0;
    wheelAngle = 0;
    collisionCooldown = 0;
    camShakeMag = 0;
    fx.clear();
    if (usesOpenCity()) {
      resetCarPose();
      enterFree();
    } else if (isRace()) {
      // Keep the welcome circuit staging so Start Drive continues the same view.
      if (!menuCircuitPreview) resetCarPose();
      enterCircuit();
    } else {
      resetCarPose();
      leaveFree(); // Earth free: scenic district corridor from the welcome backdrop
    }
    tripPanel.hidden = usesOpenCity();
    if (isRace()) {
      const circuit = circuitById(selectedCircuitId || route.circuit);
      tripFrom.textContent = `● ${circuit.name}`;
      tripTo.textContent = 'Finish line ⚑';
    } else {
      tripFrom.textContent = `● ${route.from}`;
      tripTo.textContent = `${route.to} ⚑`;
    }
    const racePts = isRace() ? Math.round(tripLength() / 100) : tripReward(route);
    tripRewardOut.textContent = signedIn() ? `Up to ${racePts + CLEAN_BONUS + (isRace() ? RACE_BONUS[0] : 0)} pts` : 'Sign in to earn pts';
    updateTrip();
    if (usesOpenCity()) {
      racePanel.hidden = true;
      countdownOut.hidden = true;
      phase = 'drive';
    } else if (isRace()) {
      // Closed circuit: only AI racers on the racing line.
      trafficSystem.clearTraffic();
      trafficSystem.bindCircuit(raceTrack);
      trafficSystem.setupRace({ playerCar: currentCar, playerColor: colorOf(currentCar), count: 5 });
      racePanel.hidden = false;
      raceTotal.textContent = `/${trafficSystem.racers.length + 1}`;
      phase = 'countdown';
      countdownT = 3;
      showCountdown('3');
    } else {
      // Same streets, landmarks and lighting as the route backdrop behind the welcome card.
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
    // Re-request fullscreen on resume — also a fresh user gesture.
    enterFullscreen();
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
    setPlayChrome(false);
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
    syncAppViewport();
    const width = mount.clientWidth || window.visualViewport?.width || window.innerWidth;
    const height = mount.clientHeight || window.visualViewport?.height || window.innerHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
  }
  function onFullscreenChange() {
    updateFsRetryUi(immersiveWanted && !isNativeFullscreen() && !isDisplayStandalone() && canRequestFullscreen(document.documentElement));
    syncAppViewport();
    resize();
  }
  window.addEventListener('resize', resize);
  window.addEventListener('orientationchange', () => {
    tilt.neutral = null;
    if (immersiveWanted) {
      tryHideMobileBrowserChrome();
      enterFullscreen();
    }
    requestAnimationFrame(() => requestAnimationFrame(resize));
  });
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => { syncAppViewport(); resize(); });
    window.visualViewport.addEventListener('scroll', () => { syncAppViewport(); resize(); });
  }
  document.addEventListener('fullscreenchange', onFullscreenChange);
  document.addEventListener('webkitfullscreenchange', onFullscreenChange);
  document.addEventListener('mozfullscreenchange', onFullscreenChange);
  document.addEventListener('MSFullscreenChange', onFullscreenChange);


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

  // Menu / garage: district corridor spins the car; circuit preview keeps the staged track view.
  function idle(delta) {
    clock += delta;
    if (!hasStarted) {
      if (menuCircuitPreview) {
        const circuit = circuitById(selectedCircuitId || route.circuit);
        if (isPlanet() || circuit.planet) {
          const t = Date.now() / 1000;
          freeCity.update(mapX, mapZ, t, 1, 0);
          freeCity.animate(delta, { x: mapX, z: mapZ, heading, speed: 0 });
          world.followPlanetPlayer(player.position, {
            altitude: 0, cameraPosition: camPos, sunDirs: freeCity.sunDirs()
          });
        }
      } else {
        player.rotation.y += delta * 0.5;
        world.animatePedestrians(blocks, clock, delta);
        trafficSystem.update(delta, { playerForward: 0, playerX: player.position.x, playerSpeed: 0, distance: 0, time: 0, go: false, playerTop: stats.top, playerAccel: stats.accel, length: route.length });
      }
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
        // Brief grace so the grid launch does not register a false bumper scrape.
        collisionCooldown = Math.max(collisionCooldown, 0.9);
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
    const powered = (gas && !braking) || (reverse && freeActive && !braking);
    if (gas && !braking) {
      const ratio = Math.min(1, speed / stats.top);
      // Near redline, keep a little shove so the posted top speed is reachable.
      const pull = ratio > 0.92 ? Math.max(0.12, 1 - ratio * ratio) : (1 - ratio * ratio);
      speed += stats.accel * pull * delta;
    } else if (reverse && freeActive && !braking) {
      const ratio = Math.min(1, -speed / revTop);
      speed -= stats.accel * 0.5 * (1 - ratio * ratio) * delta;
    }
    // Under power, only light aero so cars can actually hit their top speed; coast/brake keep full drag.
    // Match racing aero above ~180 km/h so free roam doesn't hunt top speed harder than the circuit.
    const aero = (isRace() || (freeActive && Math.abs(speed) > 50)) ? 0.00018 : 0.00028;
    const drag = powered
      ? (speed * speed * aero) * delta
      : (0.6 + speed * speed * 0.0016) * delta + (braking ? stats.brake * delta : 0);
    speed = speed > 0 ? Math.max(0, speed - drag) : Math.min(0, speed + drag);
    speed = THREE.MathUtils.clamp(speed, freeActive ? -revTop : 0, stats.top * (altitude > 1 ? 1.08 : 1));

    // Kinematic bicycle model: the front wheels steer, the body only turns while the wheels roll.
    let input = driving ? steerAxis() : 0;
    // Free-roam high speed: ignore stick noise so tiny steer doesn't weave into building pads.
    if (freeActive && Math.abs(speed) > 50 && Math.abs(input) < 0.1) input = 0;
    steerInput = THREE.MathUtils.lerp(steerInput, input, Math.min(1, delta * 10));
    const free = freeActive;
    const freeSteerBoost = free
      ? THREE.MathUtils.lerp(1.35, 0.9, THREE.MathUtils.clamp((Math.abs(speed) - 35) / 45, 0, 1))
      : 1;
    const maxSteer = (0.5 / (1 + (speed / 9) ** 2)) * (0.85 + 0.15 * stats.handling) * freeSteerBoost;
    const headingLimit = 0.3;
    let steerTarget = steerInput * maxSteer;
    // Racing auto-centres the nose with no input. Free roam at hyper speed does the same toward
    // the nearest road axis so the car doesn't drift into pads and soft-kerb bounce.
    if (!free && Math.abs(input) < 0.05) steerTarget = THREE.MathUtils.clamp(-heading * 0.9, -maxSteer * 1.6, maxSteer * 1.6);
    if (free && !circuitActive && Math.abs(speed) > 50 && Math.abs(input) < 0.1) {
      const axes = [0, Math.PI / 2, Math.PI, -Math.PI / 2];
      let best = axes[0];
      let bestDiff = Infinity;
      for (const a of axes) {
        const d = Math.abs(Math.atan2(Math.sin(heading - a), Math.cos(heading - a)));
        if (d < bestDiff) { bestDiff = d; best = a; }
      }
      if (bestDiff < 0.4) {
        const align = Math.atan2(Math.sin(best - heading), Math.cos(best - heading));
        steerTarget = THREE.MathUtils.clamp(align * 0.85, -maxSteer * 1.4, maxSteer * 1.4);
      }
    }
    // Circuits: gently help the nose follow the racing line when the stick is neutral.
    if (circuitActive && Math.abs(input) < 0.08 && Math.abs(speed) > 8) {
      const hx = raceTrack.planet ? mapX : player.position.x;
      const hz = raceTrack.planet ? mapZ : player.position.z;
      const hit = raceTrack.project(hx, hz);
      const align = Math.atan2(Math.sin(hit.heading - heading), Math.cos(hit.heading - heading));
      steerTarget = THREE.MathUtils.clamp(align * 0.7, -maxSteer * 1.5, maxSteer * 1.5);
    }
    steer = THREE.MathUtils.lerp(steer, steerTarget, Math.min(1, delta * (Math.abs(input) > 0.05 ? 9 : 6)));
    if (!free && ((heading >= headingLimit && steer > 0) || (heading <= -headingLimit && steer < 0))) steer *= 0.5;
    const turnRate = (speed / wheelbase) * Math.tan(steer);
    let forward;
    if (free) {
      // Open city: the heading is unbounded and the car moves in world x/z; leaving the road surface scrapes and slides.
      const airborne = altitude > 1.5 && !circuitActive;
      const canDrive = circuitActive
        ? (x, z) => raceTrack.isOnTrack(x, z)
        : (realActive ? realCity.isDrivable : isFreeDrivable);
      const step = speed * delta;
      // Measure ground-truth travel so the speedo matches what the camera sees.
      const originX = isPlanet() ? mapX : player.position.x;
      const originZ = isPlanet() ? mapZ : player.position.z;
      const wrapD = (a, b) => {
        let d = a - b;
        // Always unwrap large jumps (city wrap / soft-kerb snaps) so the meter never spikes.
        if (Math.abs(d) > SIZE * 0.45) d -= SIZE * Math.round(d / SIZE);
        return d;
      };
      // Substep long moves so high speed (~300 km/h) doesn't tunnel into buildings and "bounce".
      const FREE_SUB_STEP = 0.75;
      const subCount = Math.max(1, Math.min(24, Math.ceil(Math.abs(step) / FREE_SUB_STEP)));
      const subStep = step / subCount;
      if (isPlanet() && !realActive) {
        heading += turnRate * delta;
        // Keep heading finite; wrap seams must never accumulate NaN/∞ and fling the car.
        if (!Number.isFinite(heading)) heading = 0;
        heading = ((heading % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
        for (let s = 0; s < subCount; s++) {
          const moved = moveOnSphere(mapX, mapZ, heading, subStep);
          // In the air: free flight over the whole sphere-net — no road / building walls.
          if (airborne || canDrive(moved.x, moved.z)) {
            mapX = moved.x;
            mapZ = moved.z;
          } else if (Math.abs(speed) > 50) {
            // Soft kerb: stay on the road. No speed bleed above hyper — racing kerbs don't pulse drag mid-straight.
            const lineX = Math.round(mapX / PITCH) * PITCH;
            const lineZ = Math.round(mapZ / PITCH) * PITCH;
            const onNS = Math.abs(mapX - lineX) <= Math.abs(mapZ - lineZ);
            let sx = moved.x;
            let sz = moved.z;
            if (onNS) sx = THREE.MathUtils.clamp(moved.x, lineX - DRIVE_LIMIT + 0.4, lineX + DRIVE_LIMIT - 0.4);
            else sz = THREE.MathUtils.clamp(moved.z, lineZ - DRIVE_LIMIT + 0.4, lineZ + DRIVE_LIMIT - 0.4);
            sx = wrapCoord(sx); sz = wrapCoord(sz);
            const hyper = Math.abs(speed) > 55;
            if (canDrive(sx, sz)) {
              mapX = sx; mapZ = sz;
              speed *= 1 - Math.min(hyper ? 0.08 : 0.15, delta * (hyper ? 1.1 : 0.8) / subCount);
            } else {
              const east = moveOnSphere(mapX, mapZ, Math.PI / 2, subStep * Math.sin(heading));
              const north = moveOnSphere(mapX, mapZ, 0, subStep * Math.cos(heading));
              if (canDrive(east.x, mapZ)) { mapX = east.x; speed *= 1 - Math.min(hyper ? 0.12 : 0.2, delta * 1.2 / subCount); }
              else if (canDrive(mapX, north.z)) { mapZ = north.z; speed *= 1 - Math.min(hyper ? 0.12 : 0.2, delta * 1.2 / subCount); }
              else { speed *= 1 - Math.min(hyper ? 0.55 : 0.35, delta * (hyper ? 8 : 2) / subCount); break; }
            }
          } else {
            // Ground only: try axis slides before stopping (flat wrap, heading unchanged).
            const east = moveOnSphere(mapX, mapZ, Math.PI / 2, subStep * Math.sin(heading));
            const north = moveOnSphere(mapX, mapZ, 0, subStep * Math.cos(heading));
            if (canDrive(east.x, mapZ)) { mapX = east.x; speed *= 1 - Math.min(0.9, delta * 3 / subCount); }
            else if (canDrive(mapX, north.z)) { mapZ = north.z; speed *= 1 - Math.min(0.9, delta * 3 / subCount); }
            else { speed *= 1 - Math.min(0.9, delta * 6 / subCount); break; }
          }
        }
        mapX = wrapCoord(mapX);
        mapZ = wrapCoord(mapZ);
        // Orbit race (and hyper flight) skip street-furniture smash — keep the equatorial line clean.
        const crash = (airborne || circuitActive)
          ? { dx: 0, dz: 0, speed, shake: 0 }
          : freeCity.interact({ x: mapX, z: mapZ, heading, speed });
        if (!airborne && (crash.dx || crash.dz) && Math.hypot(crash.dx, crash.dz) > 1e-4) {
          const pushLen = Math.min(Math.hypot(crash.dx, crash.dz), Math.abs(speed) > 40 ? 0.45 : 1.25);
          // Planet forward is +Z for heading 0 — push heading uses atan2(dx, dz).
          const pushed = moveOnSphere(mapX, mapZ, Math.atan2(crash.dx, crash.dz), pushLen);
          if (canDrive(pushed.x, pushed.z)) { mapX = pushed.x; mapZ = pushed.z; }
        }
        if (Number.isFinite(crash.speed) && crash.speed !== speed) {
          if (Math.abs(speed) > 40 && crash.speed * Math.sign(speed || 1) < Math.abs(speed) * 0.55) {
            speed *= 0.85;
          } else {
            speed = crash.speed;
          }
          impactShake = Math.max(impactShake, crash.shake || 0);
        }
      } else {
        heading += turnRate * delta;
        for (let s = 0; s < subCount; s++) {
          const nx = player.position.x + Math.sin(heading) * subStep;
          const nz = player.position.z - Math.cos(heading) * subStep;
          if (airborne || canDrive(nx, nz)) {
            player.position.x = nx;
            player.position.z = nz;
          } else if (Math.abs(speed) > 50) {
            // Soft kerb: clamp onto the nearest road / circuit centre instead of stop-slide bounce.
            const hyper = Math.abs(speed) > 55;
            let sx = nx;
            let sz = nz;
            if (circuitActive) {
              const clamped = raceTrack.clampToTrack(nx, nz);
              sx = clamped.x; sz = clamped.z;
            } else if (usesOrganicLayout(currentCity())) {
              const clamped = softKerbClamp(nx, nz, currentCity());
              sx = clamped.x; sz = clamped.z;
            } else {
              const lineX = Math.round(player.position.x / PITCH) * PITCH;
              const lineZ = Math.round(player.position.z / PITCH) * PITCH;
              const onNS = Math.abs(player.position.x - lineX) <= Math.abs(player.position.z - lineZ);
              if (onNS) sx = THREE.MathUtils.clamp(nx, lineX - DRIVE_LIMIT + 0.4, lineX + DRIVE_LIMIT - 0.4);
              else sz = THREE.MathUtils.clamp(nz, lineZ - DRIVE_LIMIT + 0.4, lineZ + DRIVE_LIMIT - 0.4);
            }
            if (canDrive(sx, sz)) {
              player.position.x = sx;
              player.position.z = sz;
              speed *= 1 - Math.min(hyper ? 0.08 : 0.15, delta * (hyper ? 1.1 : 0.8) / subCount);
            } else if (canDrive(nx, player.position.z)) {
              player.position.x = nx;
              speed *= 1 - Math.min(hyper ? 0.12 : 0.2, delta * 1.2 / subCount);
            } else if (canDrive(player.position.x, nz)) {
              player.position.z = nz;
              speed *= 1 - Math.min(hyper ? 0.12 : 0.2, delta * 1.2 / subCount);
            } else {
              // Fully blocked — bleed even at hyper so the meter matches a dead stop.
              speed *= 1 - Math.min(hyper ? 0.55 : 0.35, delta * (hyper ? 8 : 2) / subCount);
              break;
            }
          } else if (canDrive(nx, player.position.z)) {
            player.position.x = nx;
            speed *= 1 - Math.min(0.9, delta * 3 / subCount);
          } else if (canDrive(player.position.x, nz)) {
            player.position.z = nz;
            speed *= 1 - Math.min(0.9, delta * 3 / subCount);
          } else {
            speed *= 1 - Math.min(0.9, delta * 6 / subCount);
            break;
          }
        }
        const crash = airborne || realActive || circuitActive
          ? { dx: 0, dz: 0, speed, shake: 0 }
          : freeCity.interact({ x: player.position.x, z: player.position.z, heading, speed });
        // Cap separation so a deep overlap can't yeet the car backward at high speed.
        const pushCap = Math.abs(speed) > 40 ? 0.45 : 1.25;
        const pushX = THREE.MathUtils.clamp(crash.dx || 0, -pushCap, pushCap);
        const pushZ = THREE.MathUtils.clamp(crash.dz || 0, -pushCap, pushCap);
        if ((pushX || pushZ) && canDrive(player.position.x + pushX, player.position.z + pushZ)) {
          player.position.x += pushX;
          player.position.z += pushZ;
        }
        if (Number.isFinite(crash.speed) && crash.speed !== speed) {
          // Building / prop hits always adopt the post-collision speed (including hyper).
          if (Math.abs(speed) > 40 && crash.speed * Math.sign(speed || 1) < Math.abs(speed) * 0.55) {
            speed *= 0.85;
          } else {
            speed = crash.speed;
          }
          impactShake = Math.max(impactShake, crash.shake || 0);
        } else if (Math.abs(speed) <= 55) {
          impactShake = Math.max(impactShake, crash.shake || 0);
        }
        mapX = player.position.x;
        mapZ = player.position.z;
      }
      // Sync throttle speed to ground-truth travel — stops the meter floating after a wall hit.
      {
        const endX = isPlanet() ? mapX : player.position.x;
        const endZ = isPlanet() ? mapZ : player.position.z;
        const moved = Math.hypot(wrapD(endX, originX), wrapD(endZ, originZ));
        const intended = Math.abs(speed) * delta;
        const maxSp = stats.top * (altitude > 1 ? 1.08 : 1) * 1.05;
        let ground = (Math.abs(speed) < 1e-6 && moved < 1e-4)
          ? 0
          : Math.sign(speed || 1) * (moved / Math.max(delta, 1e-4));
        // Reject teleport-sized samples (wrap/snap) — keep last throttle speed for that frame.
        if (Math.abs(ground) > maxSp * 1.25) ground = speed;
        if (intended > 0.02 && moved < intended * 0.5 && Math.abs(ground) <= maxSp * 1.25) {
          speed = ground;
          if (moved < 0.015) speed = 0;
        }
        // Meter tracks actual road motion; snap on hard stops, light-smooth otherwise.
        const groundAbs = THREE.MathUtils.clamp(Math.abs(ground), 0, maxSp);
        if (groundAbs < 0.8 || (intended > 0.05 && moved < intended * 0.25)) {
          displaySpeed = groundAbs;
        } else {
          displaySpeed = THREE.MathUtils.lerp(displaySpeed, groundAbs, Math.min(1, delta * 20));
        }
        displaySpeed = Math.min(displaySpeed, maxSp);
      }
      // Pavement and park lawn sit slightly above the asphalt; hills / circuits set the deck height.
      // Use the same pad test as driving so sidewalk edges don't bob Y every frame at speed.
      const groundX = isPlanet() ? mapX : player.position.x;
      const groundZ = isPlanet() ? mapZ : player.position.z;
      const onDrivePad = circuitActive
        ? raceTrack.isOnTrack(groundX, groundZ)
        : realActive
          ? canDrive(groundX, groundZ)
          : (isDrivable(groundX, groundZ) || isFreeDrivable(groundX, groundZ));
      const deck = circuitActive
        ? raceTrack.heightAt(groundX, groundZ)
        : (!isPlanet() && !realActive && usesOrganicLayout(currentCity()) ? groundHeight(groundX, groundZ) : 0);
      const lift = deck + (onDrivePad ? 0 : 0.13);
      if (currentCar.fly) {
        const maxAlt = currentCar.maxAlt || 30;
        const thrusting = driving && isPressed('nitro') && nitro > 0;
        // Hold Shift / E (or NITRO) to burn nitrogen and climb; release to glide down and recharge on landing
        climb += (thrusting ? 34 : -7.2) * delta;
        climb = THREE.MathUtils.clamp(climb, -16, 22);
        if (thrusting) nitro = Math.max(0, nitro - delta * 0.028);
        else nitro = Math.min(1, nitro + delta * (altitude < 0.2 ? 0.3 : 0.045));
        altitude += climb * delta;
        // Hover above buildings only while already airborne. A grounded car (alt≈0) that
        // briefly clips a non-road cell must NOT snap up to 3 m — that was the 300 km/h trampoline.
        const onPad = onDrivePad;
        const floor = onPad ? 0 : (altitude > 0.5 ? 3 : 0);
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
      } else if (!isPlanet()) {
        // Hyper: snap to ground height — Y lerp after soft-kerb pad flicker was a residual bob.
        if (Math.abs(speed) > 55) player.position.y = lift;
        else player.position.y = THREE.MathUtils.lerp(player.position.y, lift, Math.min(1, delta * 14));
      } else {
        if (Math.abs(speed) > 55) altitude = lift;
        else altitude = THREE.MathUtils.lerp(altitude, lift, Math.min(1, delta * 14));
      }
      if (isPlanet()) {
        placeObjectOnSphere(player, mapX, Math.max(altitude, lift), mapZ, heading);
      } else if (currentCar.fly) {
        player.position.y = Math.max(altitude, lift);
      }
      forward = speed;
    } else {
      heading = THREE.MathUtils.clamp(heading + turnRate * delta, -headingLimit - 0.05, headingLimit + 0.05);
      let x = player.position.x + speed * Math.sin(heading) * delta;
      // Kerb: scraping the side bleeds speed and turns the nose back onto the road (wider circuit asphalt)
      const edge = Math.abs(x) - 9.6;
      if (edge > 0) {
        speed *= 1 - Math.min(0.9, delta * (isRace() ? 0.55 : 1.2) * (1 + edge));
        heading -= Math.sign(x) * Math.min(Math.abs(heading) + 0.05, delta * 1.4) * (Math.sign(heading) === Math.sign(x) ? 1 : 0.2);
        x = THREE.MathUtils.clamp(x, -10.4, 10.4);
      }
      player.position.x = x;
      forward = speed * Math.cos(heading);
      // Highway scroll speed matches throttle — meter follows the same value.
      displaySpeed = Math.abs(speed);
    }

    wheelAngle += (speed * delta) / (carModel.userData.wheelRadius || 0.35);
    carModel.userData.wheels.forEach((w) => { w.rotation.x = -wheelAngle; });
    carModel.userData.frontPivots.forEach((p) => { p.rotation.y = -steer; });
    const accel = (speed - prevSpeed) / Math.max(delta, 1e-3);
    prevSpeed = speed;
    // Free-roam near top speed: accel hunts ± as drag/power fight — zero chassis bob (racing hides this).
    const hyperFree = freeActive && Math.abs(speed) > 28;
    const accelCap = hyperFree ? 4 : 25;
    accelSmooth = THREE.MathUtils.lerp(accelSmooth, THREE.MathUtils.clamp(accel, -accelCap, 12), Math.min(1, delta * (hyperFree ? 10 : 5)));
    if (hyperFree) accelSmooth *= 0.85;
    rollSmooth = THREE.MathUtils.lerp(rollSmooth, THREE.MathUtils.clamp(turnRate * speed * 0.0016, -0.05, 0.05), Math.min(1, delta * 6));
    if (freeActive && isPlanet()) {
      // No chassis pitch/roll on the globe — leaning around the origin lifts two wheels off the road.
      if (carModel) { carModel.rotation.z = 0; carModel.rotation.x = 0; }
    } else {
      if (carModel) { carModel.rotation.z = 0; carModel.rotation.x = 0; }
      player.rotation.y = -heading;
      if (hyperFree) {
        // Snap flat like the race chassis — lingering pitch lerp still reads as bounce at 230+.
        player.rotation.set(0, -heading, 0);
        rollSmooth = 0;
        accelSmooth = 0;
      } else {
        player.rotation.z = -rollSmooth;
        player.rotation.x = THREE.MathUtils.clamp(accelSmooth * 0.0016, -0.04, 0.02);
      }
    }
    if (carModel.userData.tail) carModel.userData.tail.emissiveIntensity = (driving ? (isPressed('brake') || (isPressed('reverse') && speed > 0.4)) : true) ? 3.2 : (route.night ? 1.3 : 0.8);
    if (tiltNeedle) tiltNeedle.style.left = `${50 + steerInput * 45}%`;

    if (!circuitActive) distance += forward * delta;
    if (driving) raceTime += delta;
    const speedRatio = Math.min(1, Math.abs(speed) / 60);
    presentDrive(delta, { throttle: gas, braking, free: freeActive, speedRatio });
    if (freeActive) {
      if (circuitActive) updateCircuitDrive(delta);
      else updateFree(delta, forward);
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
        collisionCooldown = isRace() ? 0.85 : 1.3;
        crashes++;
        // Circuit bumps bleed less speed so a clean stretch can still hit the car's top.
        speed *= isRace() ? 0.72 : 0.45;
        heading += Math.sign(player.position.x - hit.x || 1) * -0.03;
        trafficSystem.resolveCollision(hit, player.position.x);
        pulseImpact(isRace() ? 0.28 : 0.45, { force: true });
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
    speedOutput.textContent = String(Math.round(Math.abs(displaySpeed) * 3.6));
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
    const length = tripLength();
    const ratio = Math.min(1, distance / Math.max(1, length));
    tripFill.style.width = `${ratio * 100}%`;
    tripRemaining.textContent = `${Math.max(0, Math.ceil(length - distance))} m to go`;
  }

  function updateRaceBoard() {
    if (!isRace()) return;
    const length = tripLength();
    const rows = trafficSystem.standings(distance, length, raceTime).sort((a, b) => b.progress - a.progress);
    racePos.textContent = String(rows.findIndex((r) => r.you) + 1);
    raceTimeOut.textContent = formatTime(raceTime);
    raceBoard.innerHTML = rows.map((r, i) => `<li class="${r.you ? 'you' : ''}"><span>${i + 1}. ${r.you ? 'You' : r.name}</span><span>${r.finished ? 'FIN' : `${Math.max(0, Math.round(length - r.progress))} m`}</span></li>`).join('');
  }

  async function finishTrip() {
    tripDone = true;
    running = false;
    hasStarted = false;
    const racing = isRace();
    const length = tripLength();
    const place = racing ? trafficSystem.finishedCount() + 1 : 0;
    const rows = racing ? trafficSystem.standings(distance, length, raceTime, raceTime) : [];
    speed = 0;
    hud.classList.remove('active');
    pauseButton.disabled = true;
    stateOutput.textContent = racing ? 'FINISHED' : 'ARRIVED';
    const circuit = racing ? circuitById(selectedCircuitId || route.circuit) : null;
    clearSession();
    const raceBonus = racing ? (RACE_BONUS[place - 1] || 0) : 0;
    const basePts = racing ? Math.round(length / 100) : tripReward(route);
    const earned = Math.max(Math.round(basePts / 2), basePts - crashes * 2) + (crashes === 0 ? CLEAN_BONUS : 0) + raceBonus;
    const crashText = crashes === 0 ? 'no collisions, clean drive bonus!' : `${crashes} collision${crashes === 1 ? '' : 's'}`;
    tripTitle.textContent = racing ? `You finished ${ordinal(place)}!` : 'You have arrived';
    tripSummary.textContent = racing
      ? `${circuit.name} · ${(length / 1000).toFixed(1)} km lap · ${formatTime(raceTime)} · ${crashText}`
      : `${route.from} → ${route.to} · ${(length / 1000).toFixed(1)} km · ${crashText}`;
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
    setPlayChrome(false);
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
  // Prefer the newest flyer when demoing; fall back through the flying catalog.
  const demoFlyer = demoFly
    ? (CARS.find((car) => car.id === 'amalfi') || CARS.find((car) => car.id === 'aether') || CARS.find((car) => car.fly) || null)
    : null;
  const isOwned = (id) => {
    if (demoFly && CARS.some((car) => car.id === id && car.fly)) return true;
    return signedIn() ? store.garage.owned.includes(id) : id === CARS[0].id;
  };
  const upgradesOf = (id) => (signedIn() && store.garage.upgrades[id]) || defaultUpgrades();
  const colorOf = (car) => (signedIn() && store.garage.colors[car.id]) || car.colors[0];

  function applyDriveCar(car) {
    showCar(car, colorOf(car), upgradesOf(car.id));
    currentCarLabel.textContent = car.name;
  }
  window.__cityDriveDebug = {
    getCam: () => ({
      mode: camMode,
      camY: camPos.y,
      lookY: camLook.y,
      lookX: camLook.x,
      lookZ: camLook.z,
      carY: player.position.y,
      alt: altitude,
      phase,
      nitro,
      // Bounce QA: chase lag + chassis pitch at high free-roam speed.
      camX: camPos.x,
      camZ: camPos.z,
      px: isPlanet() ? mapX : player.position.x,
      pz: isPlanet() ? mapZ : player.position.z,
      worldY: player.position.y,
      heading,
      camHeading,
      pitch: player.rotation.x,
      roll: player.rotation.z,
      speed,
      free: freeActive,
      circuit: circuitActive,
      planet: isPlanet(),
      racePlanet: !!(raceTrack && raceTrack.planet),
      shake: camShakeMag,
      hyperBlend: freeActive ? THREE.MathUtils.smoothstep(Math.abs(speed), 35, 70) : 0
    }),
    selectCityById: (id) => {
      const city = CITY_BY_ID[id];
      if (!city) return null;
      selectCity(city);
      return currentCity().id;
    },
    trafficHeights: () => freeCity.trafficHeights?.() || [],
    setCarById: (id) => {
      const car = CARS.find((c) => c.id === id);
      if (!car) return null;
      applyDriveCar(car);
      return car.id;
    },
    setSpeed: (v) => {
      speed = Number(v) || 0;
      displaySpeed = Math.abs(speed);
      camSpeedSmooth = displaySpeed;
      prevSpeed = speed;
      return speed;
    },
    displaySpeed: () => displaySpeed,
    // QA: advance physics + render N fixed steps (swiftshader rAF is too starved for real-time 230 km/h demos).
    // Pass render:false to step physics only (fast metrics / teleport checks).
    pump: (frames = 30, dt = 1 / 60, opts = {}) => {
      const n = Math.max(1, Math.min(600, frames | 0));
      const step = Math.min(0.05, Math.max(1 / 120, dt));
      const doRender = opts.render !== false;
      for (let i = 0; i < n; i++) {
        lastTime = performance.now();
        if (running) update(step);
        if (doRender) renderer.render(scene, camera);
      }
      return { frames: n, speed, x: player.position.x, z: player.position.z };
    },
    planetDecor: () => {
      const d = freeCity.root?.userData?.planetDecor;
      if (!d) return null;
      return {
        hasCore: !!d.core,
        hasAtmo: !!d.atmosphere,
        hasClouds: !!d.clouds,
        cloudOpacity: d.clouds?.material?.opacity,
        atmoIntensity: d.atmosphere?.material?.uniforms?.uIntensity?.value
      };
    },
    surveyGround: () => {
      const root = freeCity.root;
      if (!root) return null;
      let ground = 0; let bent = 0; const samples = [];
      root.traverse((o) => {
        if (!o.isMesh || !o.material) return;
        const mat = o.material;
        const isGround = !!(mat.userData?.planetGround || o.userData?.planetGround);
        if (!isGround) return;
        ground++;
        if (o.userData.sphereBent) bent++;
        if (samples.length < 8) {
          samples.push({
            verts: o.geometry?.attributes?.position?.count || 0,
            color: mat.color?.getHexString?.() || null,
            map: !!mat.map,
            visible: o.visible,
            bent: !!o.userData.sphereBent
          });
        }
      });
      return { ground, bent, samples, children: root.children.length };
    },
    setControls: (partial = {}) => {
      Object.assign(controls, partial);
      // Keep the key set in sync so blur/keydown races do not drop forced QA input.
      if ('gas' in partial) { if (partial.gas) keys.add('w'); else keys.delete('w'); }
      if ('brake' in partial) { if (partial.brake) keys.add(' '); else keys.delete(' '); }
      if ('left' in partial) { if (partial.left) keys.add('a'); else keys.delete('a'); }
      if ('right' in partial) { if (partial.right) keys.add('d'); else keys.delete('d'); }
      if ('reverse' in partial) { if (partial.reverse) keys.add('s'); else keys.delete('s'); }
      if ('nitro' in partial) { if (partial.nitro) keys.add('shift'); else keys.delete('shift'); }
      return { ...controls };
    },
    setAltitude: (value) => {
      altitude = Math.max(0, Number(value) || 0);
      climb = 0;
      if (freeActive && isPlanet()) placeObjectOnSphere(player, mapX, altitude, mapZ, heading);
      else player.position.y = altitude;
      return altitude;
    },
    cycleCamera,
    speed: () => speed,
    top: () => stats.top,
    mode: () => mode,
    trafficCount: () => trafficSystem.traffic.length,
    racerCount: () => trafficSystem.racers.length,
    // Race QA: skip countdown and sample AI bodies for teleport / overlap checks.
    skipCountdown: () => {
      if (phase !== 'countdown') return phase;
      countdownT = 0;
      phase = 'drive';
      stateOutput.textContent = 'RACING';
      countdownOut.hidden = true;
      collisionCooldown = Math.max(collisionCooldown, 0.9);
      return phase;
    },
    racerSnapshot: () => trafficSystem.racers.map((r) => ({
      name: r.name,
      x: +r.x.toFixed(3),
      y: +(r.y || 0).toFixed(3),
      z: +r.z.toFixed(3),
      dist: +r.dist.toFixed(3),
      laneOffset: +(r.laneOffset ?? 0).toFixed(3),
      speed: +r.speed.toFixed(3),
      halfLen: r.halfLen,
      halfWidth: r.halfWidth,
      circuit: !!r.circuit
    })),
    crashes: () => crashes
  };
  if (demoFlyer) applyDriveCar(demoFlyer);

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
    const car = CARS.find((c) => c.id === (signedIn() && isOwned(viewingId) ? viewingId : (signedIn() ? store.garage.selected : (demoFlyer && isOwned(viewingId) ? viewingId : CARS[0].id))));
    if (signedIn() && store.garage.selected !== car.id) {
      store.garage.selected = car.id;
      store.save().catch(() => {});
    }
    applyDriveCar(car);
    garagePanel.classList.add('hidden');
    startPanel.classList.remove('hidden');
  });
  store.ready.then(() => {
    if (demoFlyer) applyDriveCar(demoFlyer);
    else if (signedIn()) applyDriveCar(CARS.find((c) => c.id === store.garage.selected) || CARS[0]);
  });

  requestAnimationFrame(animate);
})();
