(() => {
  const refs = {
    shell: document.getElementById('racer-shell'),
    canvas: document.getElementById('race-canvas'),
    wrap: document.getElementById('track-wrap'),
    start: document.getElementById('start-screen'),
    over: document.getElementById('game-over'),
    final: document.getElementById('final-stats'),
    announcement: document.getElementById('announcement'),
    speed: document.getElementById('speed-text'),
    shield: document.getElementById('shield-text'),
    shieldBar: document.getElementById('shield-bar'),
    boost: document.getElementById('boost-text'),
    boostBar: document.getElementById('boost-bar'),
    distance: document.getElementById('distance-text'),
    score: document.getElementById('score-text'),
    best: document.getElementById('best-text'),
    mapOpponents: document.getElementById('map-opponents'),
    mapPlayer: document.getElementById('map-player'),
    mapPosition: document.getElementById('map-position'),
    mapDistance: document.getElementById('map-distance'),
    finishTitle: document.getElementById('finish-title'),
    controlChip: document.getElementById('control-chip'),
    motionStatus: document.getElementById('motion-status'),
    motionButton: document.getElementById('motion-button'),
    fullscreenButton: document.getElementById('fullscreen-button'),
    viewButton: document.getElementById('view-button'),
    touchControls: document.getElementById('touch-controls'),
    touchLeft: document.getElementById('touch-left'),
    touchRight: document.getElementById('touch-right'),
    touchForward: document.getElementById('touch-forward'),
    touchBrake: document.getElementById('touch-brake'),
    touchBoost: document.getElementById('touch-boost'),
    difficultyButtons: [...document.querySelectorAll('[data-difficulty]')],
    startButton: document.getElementById('start-button'),
    restartButton: document.getElementById('restart-button'),
    money: document.getElementById('money-text'),
    progressStatus: document.getElementById('progress-status'),
    carButtons: [...document.querySelectorAll('[data-car]')],
    upgradeButtons: [...document.querySelectorAll('[data-upgrade]')]
  };

  const ctx = refs.canvas.getContext('2d');
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const prefersMotion = coarsePointer && ('DeviceOrientationEvent' in window || 'DeviceMotionEvent' in window);
  const motionPermissionRequired = typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function';
  const state = {
    width: 0,
    height: 0,
    dpr: 1,
    running: false,
    baseRoadWidth: 430,
    roadWidth: 430,
    roadCenter: 0,
    roadScroll: 0,
    sceneryScroll: 0,
    speed: 0,
    distance: 0,
    raceLength: 1800,
    shield: 100,
    boost: 100,
    score: 0,
    boostActive: false,
    difficulty: 'medium',
    collisionFlash: 0,
    bestDistance: 0,
    recordAnnounced: false,
    pickupTimer: 2,
    money: 0,
    garageSavedBest: 0,
    lastTimestamp: 0,
    opponentsPassed: 0,
    player: { x: 0, y: 0, w: 48, h: 90, tilt: 0, glow: 0, vx: 0 },
    curvature: 0,
    cameraBank: 0,
    cameraView: 'chase',
    perspectiveDepth: 210,
    playerBrand: 'falcon',
    upgrades: { engine: 0, handling: 0, armor: 0 },
    opponents: [],
    obstacles: [],
    pickups: [],
    particles: [],
    skyline: [],
    stars: [],
    cityObjects: [],
    trafficLights: [],
    trackProfile: []
  };

  const input = {
    left: false,
    right: false,
    forward: false,
    brake: false,
    boost: false,
    touchSteer: 0,
    motionSteer: 0
  };

  const controlState = {
    mode: coarsePointer ? 'touch' : 'desktop',
    motionSupported: prefersMotion,
    motionActive: false,
    motionListening: false,
    receivedMotion: false
  };

  const trafficProfiles = {
    easy: { label: 'EASY GRID', count: 3, speed: [205, 245] },
    medium: { label: 'MEDIUM GRID', count: 5, speed: [215, 265] },
    hard: { label: 'HARD GRID', count: 7, speed: [230, 290] }
  };
  const laneCenters = [-0.75, -0.25, 0.25, 0.75];
  const WORLD_DISTANCE_RATE = 0.22;
  const PERSPECTIVE_DEPTHS = { chase: 210, cockpit: 120 };
  const MAX_RENDER_LOOKAHEAD = 380;
  const BRAND_PROFILES = {
    falcon: { name: 'Falcon V8', body: '#63f3ff', glow: '#63f3ff', stripe: '#ffffff', topBoost: 1, handling: 1, armor: 1 },
    nova: { name: 'Nova GT', body: '#ff6f61', glow: '#ffc2b0', stripe: '#ffe7c7', topBoost: 1.06, handling: 0.94, armor: 0.95 },
    apex: { name: 'Apex RS', body: '#9c7dff', glow: '#d4c5ff', stripe: '#f4edff', topBoost: 0.96, handling: 1.08, armor: 1.08 }
  };
  const UPGRADE_COSTS = { engine: [300, 520, 760], handling: [240, 420, 640], armor: [260, 460, 690] };
  const UPGRADE_LABELS = { engine: 'Engine', handling: 'Handling', armor: 'Armor' };
  const persistence = { ready: null, auth: null, db: null, firestore: null, profile: null };
  const FIREBASE_CDN_BASE = window.FB_FIREBASE_CDN_BASE || 'https://www.gstatic.com/firebasejs/11.10.0';

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function formatScore(value) {
    return String(Math.max(0, Math.floor(value))).padStart(6, '0');
  }

  function roundedRectPath(x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function resize() {
    const box = refs.wrap.getBoundingClientRect();
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    refs.canvas.width = box.width * state.dpr;
    refs.canvas.height = box.height * state.dpr;
    refs.canvas.style.width = `${box.width}px`;
    refs.canvas.style.height = `${box.height}px`;
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    state.width = box.width;
    state.height = box.height;
    state.roadWidth = Math.min(Math.max(280, box.width * 0.44), 520);
    state.roadCenter = roadCenterAt(state.distance);
    state.player.y = box.height - 110;
    if (!state.running) {
      state.player.x = state.roadCenter;
    } else {
      const edge = state.roadWidth * 0.5 - 36;
      state.player.x = clamp(state.player.x, state.roadCenter - edge, state.roadCenter + edge);
    }
    rebuildBackdrop();
  }

  function rebuildBackdrop() {
    state.stars = Array.from({ length: Math.max(40, Math.floor(state.width / 18)) }, () => ({
      x: rand(0, state.width),
      y: rand(0, state.height * 0.48),
      size: rand(1, 3),
      alpha: rand(0.25, 0.85)
    }));
    state.skyline = [];
    state.cityObjects = [];
    for (let distance = 40; distance < state.raceLength + 300; distance += rand(70, 125)) {
      [-1, 1].forEach((side) => {
        state.cityObjects.push({
          distance,
          side,
          offset: rand(28, 74),
          width: rand(38, 86),
          height: rand(75, 190),
          color: Math.random() > 0.5 ? '#18283d' : '#202d42',
          lights: Math.random() > 0.25
        });
      });
    }
    const startX = -40;
    let x = startX;
    while (x < state.width + 80) {
      const width = rand(24, 64);
      const height = rand(state.height * 0.1, state.height * 0.28);
      const windows = [];
      for (let row = 0; row < height - 12; row += 16) {
        for (let col = 0; col < width - 8; col += 10) {
          if (Math.random() > 0.58) {
            windows.push({ x: 4 + col, y: 6 + row });
          }
        }
      }
      state.skyline.push({
        x,
        width,
        height,
        glow: Math.random() < 0.4,
        windows
      });
      x += width + rand(6, 20);
    }
  }

  function roadCenterAt(distance) {
    if (state.trackProfile.length === 0) {
      return state.width / 2;
    }

    const normalizedDistance = clamp(distance, 0, state.raceLength);
    for (let index = 1; index < state.trackProfile.length; index += 1) {
      const next = state.trackProfile[index];
      if (normalizedDistance <= next.distance) {
        const previous = state.trackProfile[index - 1];
        const progress = (normalizedDistance - previous.distance) / (next.distance - previous.distance);
        const easedProgress = progress * progress * (3 - 2 * progress);
        return previous.center + (next.center - previous.center) * easedProgress;
      }
    }
    return state.trackProfile[state.trackProfile.length - 1].center;
  }

  function curvatureAt(distance) {
    const step = 14;
    return (roadCenterAt(distance + step) - roadCenterAt(distance - step)) / (step * 2);
  }

  function generateTrack() {
    const segmentLength = 180;
    const segmentCount = Math.ceil(state.raceLength / segmentLength);
    const maxOffset = Math.min(state.width * 0.18, 180);
    let turnDirection = Math.random() > 0.5 ? 1 : -1;
    state.trackProfile = [{ distance: 0, center: state.width / 2 }];

    for (let index = 1; index <= segmentCount; index += 1) {
      const offset = turnDirection * rand(maxOffset * 0.45, maxOffset);
      state.trackProfile.push({
        distance: Math.min(index * segmentLength, state.raceLength),
        center: state.width / 2 + offset
      });
      if (Math.random() > 0.28) {
        turnDirection *= -1;
      }
    }
  }

  function yForDistanceAhead(distanceAhead) {
    const horizonY = state.height * 0.15;
    const baseY = state.height;
    const span = baseY - horizonY;
    const d = Math.max(distanceAhead, -(state.perspectiveDepth * 0.98));
    return horizonY + (span * state.perspectiveDepth) / (state.perspectiveDepth + d);
  }

  function screenDistanceAtY(y) {
    const horizonY = state.height * 0.15;
    const baseY = state.height;
    const u = clamp(y - horizonY, 1, baseY - horizonY);
    return state.distance + (state.perspectiveDepth * (baseY - y)) / u;
  }

  function resetGame() {
    state.running = true;
    state.roadScroll = 0;
    state.sceneryScroll = 0;
    state.speed = 220;
    state.distance = 0;
    state.shield = 100;
    state.boost = 100;
    state.score = 0;
    state.boostActive = false;
    state.collisionFlash = 0;
    state.pickupTimer = 2.8;
    state.lastTimestamp = 0;
    state.opponentsPassed = 0;
    state.curvature = 0;
    state.cameraBank = 0;
    generateTrack();
    state.roadCenter = roadCenterAt(0);
    state.bestDistance = state.garageSavedBest;
    state.recordAnnounced = false;
    state.player.x = state.roadCenter;
    state.player.y = state.height - 110;
    state.player.tilt = 0;
    state.player.glow = 0;
    state.player.vx = 0;
    createRaceGrid();
    createObstacles();
    state.pickups = [];
    state.particles = [];
    refs.start.classList.add('hidden');
    refs.over.classList.add('hidden');
    refs.finishTitle.textContent = 'The race is yours.';
    announce('RACE ON');
    updateHud();
  }

  function ordinal(value) {
    const suffix = value % 100 >= 11 && value % 100 <= 13 ? 'TH' : ({ 1: 'ST', 2: 'ND', 3: 'RD' }[value % 10] || 'TH');
    return `${value}${suffix}`;
  }

  function getRacePosition() {
    return 1 + state.opponents.filter((car) => car.progress > state.distance).length;
  }

  function updateMap() {
    const playerPercent = clamp(state.distance / state.raceLength, 0, 1) * 100;
    refs.mapPlayer.style.bottom = `${playerPercent}%`;
    refs.mapPosition.textContent = ordinal(getRacePosition());
    refs.mapDistance.textContent = `${Math.floor(state.distance)} / ${state.raceLength} M`;
    refs.mapOpponents.innerHTML = state.opponents.map((car) => {
      const percent = clamp(car.progress / state.raceLength, 0, 1) * 100;
      return `<span class="map-marker opponent-marker" style="bottom:${percent}%" aria-label="Opponent at ${Math.floor(car.progress)} meters"></span>`;
    }).join('');
  }

  function createObstacles() {
    state.obstacles = [];
    for (let index = 0; index < 10; index += 1) {
      state.obstacles.push({
        progress: 155 + index * 165 + rand(-18, 18),
        lane: index % 2 === 0 ? -0.25 : 0.25,
        type: index % 3 === 0 ? 'barrier' : 'cone',
        hit: false,
        x: 0,
        y: -100,
        w: 30,
        h: 24
      });
    }
  }

  function updateHud() {
    refs.speed.textContent = `${Math.round(state.speed)} KM/H`;
    refs.shield.textContent = `${Math.round(Math.max(0, state.shield))}%`;
    refs.shieldBar.style.width = `${clamp(state.shield, 0, 100)}%`;
    refs.shieldBar.style.background = state.shield > 35 ? 'linear-gradient(90deg, #5f9cff, #79f7ff)' : 'linear-gradient(90deg, #ff617d, #ff96b1)';
    refs.boost.textContent = `${Math.round(clamp(state.boost, 0, 100))}%`;
    refs.boostBar.style.width = `${clamp(state.boost, 0, 100)}%`;
    refs.distance.textContent = `${Math.floor(state.distance)} M`;
    refs.score.textContent = formatScore(state.score);
    refs.best.textContent = `${Math.floor(state.bestDistance)} M`;
    refs.money.textContent = `$${Math.floor(state.money)}`;
    refreshUpgradeButtons();
    updateMap();
  }

  function announce(message) {
    refs.announcement.textContent = message;
    refs.announcement.classList.remove('hidden', 'show');
    void refs.announcement.offsetWidth;
    refs.announcement.classList.add('show');
  }

  function roadBounds(y = state.player.y) {
    return {
      left: roadSlice(y).center - roadSlice(y).half,
      right: roadSlice(y).center + roadSlice(y).half
    };
  }

  function roadSlice(y) {
    const t = clamp((y - state.height * 0.15) / (state.height * 0.85), 0, 1);
    return {
      center: roadCenterAt(screenDistanceAtY(y)),
      half: state.roadWidth * (0.22 + (0.6 - 0.22) * t)
    };
  }

  function spawnOpponent(index) {
    const traffic = trafficProfiles[state.difficulty];
    const palette = [
      { body: '#ff6f61', glow: '#ffc2b0' },
      { body: '#63f3ff', glow: '#ccfbff' },
      { body: '#f72585', glow: '#ffacd3' },
      { body: '#ffd166', glow: '#fff0b8' }
    ];
    const theme = palette[Math.floor(Math.random() * palette.length)];
    const size = rand(0.88, 1.15);
    state.opponents.push({
      x: state.roadCenter,
      y: -130,
      lane: laneCenters[index % laneCenters.length] + rand(-0.025, 0.025),
      progress: -150 - index * 70 + rand(-8, 8),
      w: 40 * size,
      h: 82 * size,
      baseW: 40 * size,
      baseH: 82 * size,
      speed: rand(traffic.speed[0], traffic.speed[1]),
      sway: rand(-0.32, 0.32),
      color: theme.body,
      glow: theme.glow,
      passed: false,
      marker: null,
      type: Math.random() > 0.45 ? 'car' : 'truck'
    });
  }

  function createRaceGrid() {
    state.opponents = [];
    const count = trafficProfiles[state.difficulty].count;
    for (let index = 0; index < count; index += 1) {
      spawnOpponent(index);
    }
    updateMap();
  }

  function updateOpponentScreenPosition(car) {
    car.y = yForDistanceAhead(car.progress - state.distance);
    const perspective = clamp((car.y / state.height) * 1.18, 0.55, 1.12);
    car.x = roadCenterAt(car.progress) + car.lane * roadSlice(car.y).half;
    const scale = clamp(0.56 + perspective * 0.45, 0.62, 1.08);
    car.screenScale = scale;
    car.w = car.baseW * scale;
    car.h = car.baseH * scale;
  }

  function spawnPickup() {
    const type = Math.random() < 0.55 ? 'boost' : 'shield';
    state.pickups.push({
      type,
      lane: laneCenters[Math.floor(Math.random() * laneCenters.length)],
      progress: state.distance + 150,
      x: state.roadCenter,
      y: -70,
      size: type === 'boost' ? 18 : 20
    });
  }

  function emitImpact(x, y, color) {
    for (let i = 0; i < 14; i += 1) {
      state.particles.push({
        x,
        y,
        vx: rand(-180, 180),
        vy: rand(-180, 120),
        size: rand(2, 6),
        life: rand(0.25, 0.6),
        color
      });
    }
  }

  function playerRect() {
    return {
      left: state.player.x - state.player.w / 2,
      right: state.player.x + state.player.w / 2,
      top: state.player.y - state.player.h / 2,
      bottom: state.player.y + state.player.h / 2
    };
  }

  function intersectsPlayer(item) {
    const player = playerRect();
    return (
      player.left < item.x + item.w / 2 &&
      player.right > item.x - item.w / 2 &&
      player.top < item.y + item.h / 2 &&
      player.bottom > item.y - item.h / 2
    );
  }

  function pickupIntersects(item) {
    const player = playerRect();
    return (
      item.x > player.left - item.size &&
      item.x < player.right + item.size &&
      item.y > player.top - item.size &&
      item.y < player.bottom + item.size
    );
  }

  function currentSteer() {
    if (controlState.motionActive) {
      return input.motionSteer;
    }
    if (input.touchSteer !== 0) {
      return input.touchSteer;
    }
    return (input.right ? 1 : 0) - (input.left ? 1 : 0);
  }

  function update(dt) {
    const boostHeld = input.boost && state.boost > 0;
    state.boostActive = boostHeld;
    const brand = BRAND_PROFILES[state.playerBrand] || BRAND_PROFILES.falcon;
    const engineBonus = state.upgrades.engine * 16;
    const targetSpeed = boostHeld
      ? (340 + engineBonus * 1.4) * brand.topBoost
      : (230 + engineBonus + Math.min(85, state.distance * 0.18)) * brand.topBoost;
    state.speed += (targetSpeed - state.speed) * Math.min(1, dt * 2.1);
    state.boost = clamp(state.boost + (boostHeld ? -34 : 9) * dt, 0, 100);
    state.distance += state.speed * dt * WORLD_DISTANCE_RATE;
    if (state.distance > state.bestDistance) {
      state.bestDistance = state.distance;
      if (!state.recordAnnounced && state.bestDistance >= 25) {
        state.recordAnnounced = true;
        announce('NEW BEST RUN');
      }
    }
    state.roadCenter = roadCenterAt(state.distance);
    state.score += state.speed * dt * (boostHeld ? 1.25 : 0.85);
    state.roadScroll = (state.roadScroll + state.speed * dt) % 80;
    state.sceneryScroll = (state.sceneryScroll + state.speed * dt * 0.72) % state.height;
    state.collisionFlash = Math.max(0, state.collisionFlash - dt * 1.8);

    const steer = currentSteer();
    const handlingBoost = 1 + state.upgrades.handling * 0.08;
    const maxLateralSpeed = (controlState.motionActive ? 320 : 380) * handlingBoost * (BRAND_PROFILES[state.playerBrand]?.handling || 1);
    const lateralAccel = 1700 * handlingBoost;
    const targetVX = steer * maxLateralSpeed;
    state.player.vx += clamp(targetVX - state.player.vx, -lateralAccel * dt, lateralAccel * dt);
    state.player.x += state.player.vx * dt;
    const verticalDirection = (input.forward ? -1 : 0) + (input.brake ? 1 : 0);
    const verticalRate = boostHeld ? 250 : 190;
    state.player.y += verticalDirection * verticalRate * dt;
    state.player.y = clamp(state.player.y, state.height * 0.3, state.height - 82);
    const tiltTarget = clamp(state.player.vx / maxLateralSpeed, -1, 1) * 0.5;
    state.player.tilt += (tiltTarget - state.player.tilt) * Math.min(1, dt * 8);
    state.player.glow += ((boostHeld ? 1 : 0) - state.player.glow) * Math.min(1, dt * 5);

    const lookAheadDistance = clamp(state.distance + state.speed * 0.32, 0, state.raceLength);
    const curvatureSample = curvatureAt(lookAheadDistance);
    state.curvature += (curvatureSample - state.curvature) * Math.min(1, dt * 3);
    const steerBank = clamp(-state.player.vx / 1100, -0.05, 0.05);
    const bankTarget = clamp(-state.curvature * 5.5, -0.16, 0.16) + steerBank;
    state.cameraBank += (bankTarget - state.cameraBank) * Math.min(1, dt * 3.2);

    const bounds = roadBounds();
    if (state.player.x < bounds.left + 20 || state.player.x > bounds.right - 20) {
      state.player.x = clamp(state.player.x, bounds.left + 14, bounds.right - 14);
      state.player.vx *= 0.35;
      const armorGuard = (BRAND_PROFILES[state.playerBrand]?.armor || 1) * (1 + state.upgrades.armor * 0.1);
      state.shield -= (22 * dt) / armorGuard;
      state.score = Math.max(0, state.score - 30 * dt);
    }

    state.pickupTimer -= dt;
    if (state.pickupTimer <= 0) {
      spawnPickup();
      state.pickupTimer = rand(3.2, 5.4);
    }

    state.opponents.forEach((car) => {
      car.progress = Math.min(state.raceLength, car.progress + car.speed * dt * WORLD_DISTANCE_RATE);
      car.lane += Math.sin((state.distance * 0.025) + car.progress * 0.01) * car.sway * 0.0015;
      car.lane = clamp(car.lane, -0.82, 0.82);
      updateOpponentScreenPosition(car);

      if (!car.passed && car.progress < state.distance - 6) {
        car.passed = true;
        state.opponentsPassed += 1;
        state.score += 120;
        state.boost = clamp(state.boost + 8, 0, 100);
      }

      if (car.y > -120 && car.y < state.height + 120 && intersectsPlayer(car)) {
        car.progress = Math.max(0, state.distance - 30);
        const armorGuard = (BRAND_PROFILES[state.playerBrand]?.armor || 1) * (1 + state.upgrades.armor * 0.1);
        state.shield -= 24 / armorGuard;
        state.score = Math.max(0, state.score - 180);
        state.collisionFlash = 1;
        emitImpact(state.player.x, state.player.y - 18, '#ff617d');
        if (state.shield > 0) {
          announce('SHIELD HIT');
        }
      }
    });

    state.obstacles.forEach((obstacle) => {
      if (obstacle.hit) {
        return;
      }
      obstacle.y = yForDistanceAhead(obstacle.progress - state.distance);
      const perspective = clamp((obstacle.y / state.height) * 1.18, 0.55, 1.12);
      obstacle.x = roadCenterAt(obstacle.progress) + obstacle.lane * roadSlice(obstacle.y).half;
      obstacle.w = (obstacle.type === 'barrier' ? 42 : 24) * perspective;
      obstacle.h = (obstacle.type === 'barrier' ? 24 : 30) * perspective;
      if (obstacle.y > -100 && obstacle.y < state.height + 100 && intersectsPlayer(obstacle)) {
        obstacle.hit = true;
        const armorGuard = (BRAND_PROFILES[state.playerBrand]?.armor || 1) * (1 + state.upgrades.armor * 0.1);
        state.shield -= (obstacle.type === 'barrier' ? 18 : 10) / armorGuard;
        state.score = Math.max(0, state.score - 90);
        state.collisionFlash = 0.7;
        emitImpact(obstacle.x, obstacle.y, '#ffc857');
        announce(obstacle.type === 'barrier' ? 'BARRIER HIT' : 'ROAD HAZARD');
      }
    });

    state.pickups.forEach((pickup) => {
      pickup.y = yForDistanceAhead(pickup.progress - state.distance);
      pickup.x = roadCenterAt(pickup.progress) + pickup.lane * roadSlice(pickup.y).half;
      if (pickupIntersects(pickup)) {
        pickup.y = state.height + 100;
        if (pickup.type === 'boost') {
          state.boost = clamp(state.boost + 26, 0, 100);
          state.score += 180;
          announce('NITRO CHARGED');
          emitImpact(pickup.x, pickup.y, '#ffd166');
        } else {
          state.shield = clamp(state.shield + 22, 0, 100);
          state.score += 140;
          announce('SHIELD RESTORED');
          emitImpact(pickup.x, pickup.y, '#63f3ff');
        }
      }
    });
    state.pickups = state.pickups.filter((pickup) => pickup.y < state.height + 80);

    state.particles.forEach((particle) => {
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.life -= dt;
      particle.vx *= 0.96;
      particle.vy *= 0.96;
    });
    state.particles = state.particles.filter((particle) => particle.life > 0);

    if (state.shield <= 0) {
      finishRun('crash');
    } else if (state.distance >= state.raceLength) {
      finishRun('finish');
    }

    updateHud();
  }

  function drawSky() {
    const sky = ctx.createLinearGradient(0, 0, 0, state.height);
    sky.addColorStop(0, '#071020');
    sky.addColorStop(0.45, '#12233f');
    sky.addColorStop(1, '#19253a');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, state.width, state.height);

    const horizonGlow = ctx.createRadialGradient(state.width / 2, state.height * 0.42, 20, state.width / 2, state.height * 0.42, state.width * 0.45);
    horizonGlow.addColorStop(0, 'rgba(99,243,255,0.18)');
    horizonGlow.addColorStop(1, 'rgba(99,243,255,0)');
    ctx.fillStyle = horizonGlow;
    ctx.fillRect(0, 0, state.width, state.height);

    state.stars.forEach((star) => {
      ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
      ctx.fillRect(star.x, star.y, star.size, star.size);
    });

    ctx.fillStyle = '#0d1730';
    ctx.beginPath();
    ctx.moveTo(0, state.height * 0.48);
    for (let x = 0; x <= state.width; x += 60) {
      const peak = state.height * 0.42 + Math.sin((x + state.sceneryScroll * 0.2) * 0.02) * 20;
      ctx.lineTo(x, peak);
    }
    ctx.lineTo(state.width, state.height);
    ctx.lineTo(0, state.height);
    ctx.closePath();
    ctx.fill();

    state.skyline.forEach((building) => {
      const x = ((building.x - state.sceneryScroll * 0.14) % (state.width + 120) + (state.width + 120)) % (state.width + 120) - 60;
      const y = state.height * 0.5 - building.height;
      ctx.fillStyle = 'rgba(7, 15, 31, 0.95)';
      ctx.fillRect(x, y, building.width, building.height);
      if (building.glow) {
        ctx.fillStyle = 'rgba(99,243,255,0.28)';
        building.windows.forEach((windowLight) => {
          ctx.fillRect(x + windowLight.x, y + windowLight.y, 4, 8);
        });
      }
    });
  }

  function drawCityObjects() {
    state.cityObjects.forEach((building) => {
      const distanceAhead = building.distance - state.distance;
      if (distanceAhead < -60 || distanceAhead > MAX_RENDER_LOOKAHEAD) {
        return;
      }
      const y = yForDistanceAhead(distanceAhead);
      if (y > state.height + 40) {
        return;
      }
      const slice = roadSlice(y);
      const perspective = clamp((y / state.height) * 1.18, 0.55, 1.12);
      const width = building.width * perspective;
      const height = building.height * perspective;
      const x = slice.center + building.side * (slice.half + building.offset * perspective);
      const left = building.side < 0 ? x - width : x;
      const top = y - height;
      ctx.fillStyle = building.color;
      ctx.fillRect(left, top, width, height);
      ctx.fillStyle = 'rgba(99,243,255,0.2)';
      ctx.fillRect(left, top, width, 3);
      if (building.lights) {
        ctx.fillStyle = 'rgba(255,200,87,0.65)';
        for (let row = top + 14; row < y - 8; row += 18) {
          for (let column = left + 8; column < left + width - 5; column += 14) {
            if ((Math.floor(row + column) + Math.floor(building.distance)) % 3 !== 0) {
              ctx.fillRect(column, row, 4, 6);
            }
          }
        }
      }
    });
  }

  function drawRoad() {
    const topY = Math.max(state.height * 0.15, yForDistanceAhead(MAX_RENDER_LOOKAHEAD));
    const bottomY = state.height;
    const slices = [];
    for (let y = topY; y <= bottomY; y += 16) {
      slices.push({ y, ...roadSlice(y) });
    }

    ctx.fillStyle = '#09111b';
    ctx.beginPath();
    slices.forEach((slice, index) => {
      const edge = slice.half + 80;
      if (index === 0) ctx.moveTo(slice.center - edge, slice.y);
      else ctx.lineTo(slice.center - edge, slice.y);
    });
    slices.slice().reverse().forEach((slice) => ctx.lineTo(slice.center + slice.half + 80, slice.y));
    ctx.closePath();
    ctx.fill();

    const roadGradient = ctx.createLinearGradient(0, topY, 0, bottomY);
    roadGradient.addColorStop(0, '#1b2430');
    roadGradient.addColorStop(0.5, '#313a45');
    roadGradient.addColorStop(1, '#0f141a');
    ctx.fillStyle = roadGradient;
    ctx.beginPath();
    slices.forEach((slice, index) => {
      if (index === 0) ctx.moveTo(slice.center - slice.half, slice.y);
      else ctx.lineTo(slice.center - slice.half, slice.y);
    });
    slices.slice().reverse().forEach((slice) => ctx.lineTo(slice.center + slice.half, slice.y));
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#6bf5ff';
    ctx.lineWidth = 3;
    [-1, 1].forEach((side) => {
      ctx.beginPath();
      slices.forEach((slice, index) => {
        const edge = slice.center + side * (slice.half - 8);
        if (index === 0) ctx.moveTo(edge, slice.y);
        else ctx.lineTo(edge, slice.y);
      });
      ctx.stroke();
    });

    const edgeMarkerOffset = state.roadScroll % 64;
    ctx.fillStyle = 'rgba(107, 245, 255, 0.72)';
    for (let y = topY - 64 + edgeMarkerOffset; y < state.height + 64; y += 64) {
      const perspective = clamp(y / state.height, 0, 1);
      const markerHeight = 8 + perspective * 30;
      const markerSlice = roadSlice(y + markerHeight / 2);
      [-1, 1].forEach((side) => {
        const edge = markerSlice.center + side * (markerSlice.half - 8);
        ctx.fillRect(edge - 3, y, 6, markerHeight);
      });
    }

    ctx.strokeStyle = 'rgba(255,255,255,0.68)';
    ctx.lineWidth = 4;
    for (let lane = -0.5; lane <= 0.5; lane += 0.5) {
      const laneMarkOffset = state.roadScroll % 80;
      for (let y = topY - 80 + laneMarkOffset; y < state.height + 60; y += 80) {
        const perspective = clamp(y / state.height, 0, 1);
        const dashHeight = 14 + perspective * 38;
        ctx.globalAlpha = 0.2 + perspective * 0.7;
        ctx.beginPath();
        for (let step = 0; step <= 4; step += 1) {
          const dashY = y + (dashHeight * step) / 4;
          const slice = roadSlice(dashY);
          const laneX = slice.center + lane * slice.half;
          if (step === 0) ctx.moveTo(laneX, dashY);
          else ctx.lineTo(laneX, dashY);
        }
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }

  function drawCrossroads() {
    state.trafficLights = [];
    [360, 760, 1190, 1580].forEach((crossingDistance) => {
      const distanceAhead = crossingDistance - state.distance;
      if (distanceAhead < -60 || distanceAhead > MAX_RENDER_LOOKAHEAD) {
        return;
      }
      const y = yForDistanceAhead(distanceAhead);
      if (y > state.height + 40) {
        return;
      }

      const perspective = clamp(y / state.height, 0.2, 1);
      const bandHeight = 18 + perspective * 46;
      const slice = roadSlice(y);
      const roadTop = y - bandHeight / 2;
      state.trafficLights.push({ y, left: slice.center - slice.half - 18, right: slice.center + slice.half + 18, ahead: distanceAhead });

      const street = ctx.createLinearGradient(0, roadTop, 0, roadTop + bandHeight);
      street.addColorStop(0, '#303a46');
      street.addColorStop(0.5, '#202a36');
      street.addColorStop(1, '#303a46');
      ctx.fillStyle = street;
      ctx.fillRect(0, roadTop, state.width, bandHeight);

      ctx.strokeStyle = 'rgba(191, 207, 220, 0.55)';
      ctx.lineWidth = 2 + perspective;
      [roadTop + 2, roadTop + bandHeight - 2].forEach((curbY) => {
        ctx.beginPath();
        ctx.moveTo(0, curbY);
        ctx.lineTo(state.width, curbY);
        ctx.stroke();
      });

      ctx.save();
      ctx.fillStyle = 'rgba(245, 248, 250, 0.86)';
      const stripeCount = 3;
      const stripeHeight = Math.max(2, 3.5 * perspective);
      const stripePitch = stripeHeight + Math.max(2, 2.5 * perspective);
      [-1, 1].forEach((side) => {
        for (let stripe = 0; stripe < stripeCount; stripe += 1) {
          const stripeY = y + side * (bandHeight * 0.28 + stripe * stripePitch);
          const stripeSlice = roadSlice(stripeY);
          ctx.fillRect(stripeSlice.center - stripeSlice.half + 8, stripeY, stripeSlice.half * 2 - 16, stripeHeight);
        }
      });

      ctx.strokeStyle = 'rgba(255, 200, 87, 0.62)';
      ctx.lineWidth = Math.max(1, perspective * 2);
      ctx.setLineDash([12 * perspective, 12 * perspective]);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(slice.center - slice.half - 8, y);
      ctx.moveTo(slice.center + slice.half + 8, y);
      ctx.lineTo(state.width, y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    });
  }

  function drawTrafficLights() {
    state.trafficLights.forEach((signal) => {
      const perspective = clamp(signal.y / state.height, 0.18, 1);
      const poleHeight = 34 + perspective * 38;
      const poleWidth = Math.max(2, perspective * 4);
      const headW = 14 + perspective * 14;
      const headH = 24 + perspective * 22;
      const cycle = Math.floor((state.distance + signal.ahead) / 140) % 3;
      const activeColor = cycle === 0 ? '#ff4f5f' : cycle === 1 ? '#ffd166' : '#66ff86';

      [signal.left, signal.right].forEach((x) => {
        ctx.fillStyle = '#6b7280';
        ctx.fillRect(x - poleWidth / 2, signal.y - poleHeight, poleWidth, poleHeight);
        ctx.fillStyle = '#111b2b';
        roundedRectPath(x - headW / 2, signal.y - poleHeight - headH, headW, headH, 5);
        ctx.fill();
        ['#40161b', '#3f3313', '#17361d'].forEach((offColor, index) => {
          ctx.fillStyle = offColor;
          ctx.beginPath();
          ctx.arc(x, signal.y - poleHeight - headH + 6 + index * (headH / 3.2), Math.max(2.2, perspective * 4), 0, Math.PI * 2);
          ctx.fill();
        });
        const activeY = signal.y - poleHeight - headH + 6 + cycle * (headH / 3.2);
        ctx.fillStyle = activeColor;
        ctx.shadowColor = activeColor;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x, activeY, Math.max(2.8, perspective * 4.3), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    });
  }

  function drawRoadGlow() {
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = 'rgba(99,243,255,0.06)';
    for (let i = 0; i < 24; i += 1) {
      const y = ((i * 66 + state.roadScroll * 1.8) % (state.height + 120)) - 60;
      const t = clamp(y / state.height, 0, 1);
      const bounds = roadBounds(y);
      ctx.fillRect(bounds.left - 8, y, 6, 20 + t * 32);
      ctx.fillRect(bounds.right + 2, y, 6, 20 + t * 32);
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  function drawObstacles() {
    state.obstacles.forEach((obstacle) => {
      if (obstacle.hit || obstacle.y < -80 || obstacle.y > state.height + 80) {
        return;
      }
      ctx.save();
      ctx.translate(obstacle.x, obstacle.y);
      if (obstacle.type === 'barrier') {
        ctx.shadowColor = '#ff617d';
        ctx.shadowBlur = 14;
        ctx.fillStyle = '#ff617d';
        ctx.fillRect(-obstacle.w / 2, -obstacle.h / 2, obstacle.w, obstacle.h);
        ctx.fillStyle = '#fff1f4';
        for (let stripe = -obstacle.w / 2; stripe < obstacle.w / 2; stripe += 12) {
          ctx.save();
          ctx.translate(stripe, 0);
          ctx.rotate(-0.45);
          ctx.fillRect(-3, -obstacle.h / 2, 6, obstacle.h);
          ctx.restore();
        }
      } else {
        ctx.shadowColor = '#ffc857';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#ffc857';
        ctx.beginPath();
        ctx.moveTo(0, -obstacle.h / 2);
        ctx.lineTo(obstacle.w / 2, obstacle.h / 2);
        ctx.lineTo(-obstacle.w / 2, obstacle.h / 2);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#fff4c9';
        ctx.fillRect(-obstacle.w * 0.25, 0, obstacle.w * 0.5, 3);
      }
      ctx.restore();
    });
  }

  function drawCheckeredLine(y, label) {
    if (y < -40 || y > state.height + 40) {
      return;
    }
    const bounds = roadBounds(y);
    const width = bounds.right - bounds.left;
    const tileWidth = width / 10;
    ctx.save();
    for (let index = 0; index < 10; index += 1) {
      ctx.fillStyle = index % 2 === 0 ? '#f7fbff' : '#111b2b';
      ctx.fillRect(bounds.left + index * tileWidth, y - 8, tileWidth + 1, 16);
    }
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 10px Space Mono, monospace';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#63f3ff';
    ctx.shadowBlur = 12;
    ctx.fillText(label, roadSlice(y).center, y - 16);
    ctx.restore();
  }

  function drawRaceLines() {
    drawCheckeredLine(yForDistanceAhead(-state.distance), 'START');
    const finishAhead = state.raceLength - state.distance;
    if (finishAhead <= MAX_RENDER_LOOKAHEAD) {
      drawCheckeredLine(yForDistanceAhead(finishAhead), 'FINISH');
    }
  }

  function drawCar(x, y, width, height, color, glow, tilt = 0, player = false, model = 'car') {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(tilt);
    ctx.shadowColor = glow;
    ctx.shadowBlur = player ? 26 : 16;

    const body = ctx.createLinearGradient(-width / 2, 0, width / 2, 0);
    body.addColorStop(0, '#09111c');
    body.addColorStop(0.18, color);
    body.addColorStop(0.5, player ? '#ffffff' : '#e8effa');
    body.addColorStop(0.82, color);
    body.addColorStop(1, '#09111c');
    ctx.fillStyle = body;

    ctx.beginPath();
    ctx.moveTo(0, -height / 2);
    ctx.bezierCurveTo(width / 2.2, -height / 2.1, width / 2, -height / 6, width / 2, height / 3);
    ctx.bezierCurveTo(width / 2, height / 2.2, width / 4, height / 2, 0, height / 2);
    ctx.bezierCurveTo(-width / 4, height / 2, -width / 2, height / 2.2, -width / 2, height / 3);
    ctx.bezierCurveTo(-width / 2, -height / 6, -width / 2.2, -height / 2.1, 0, -height / 2);
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#07111e';
    roundedRectPath(-width * 0.26, -height * 0.18, width * 0.52, height * 0.36, 12);
    ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.16)';
    roundedRectPath(-width * 0.18, -height * 0.08, width * 0.36, height * 0.16, 8);
    ctx.fill();

    const profile = BRAND_PROFILES[state.playerBrand] || BRAND_PROFILES.falcon;
    const accent = player ? profile.stripe : '#ffd166';
    ctx.fillStyle = accent;
    ctx.fillRect(-width * 0.16, -height * 0.42, width * 0.32, 6);
    ctx.fillStyle = '#ff617d';
    ctx.fillRect(-width * 0.16, height * 0.33, width * 0.32, 6);

    const wheelTone = model === 'truck' ? '#121519' : '#0c1118';
    const wheelHeight = model === 'truck' ? height * 0.3 : height * 0.26;
    ctx.fillStyle = wheelTone;
    ctx.fillRect(-width * 0.56, -height * 0.2, width * 0.15, wheelHeight);
    ctx.fillRect(width * 0.41, -height * 0.2, width * 0.15, wheelHeight);
    ctx.fillRect(-width * 0.56, height * 0.08, width * 0.15, wheelHeight);
    ctx.fillRect(width * 0.41, height * 0.08, width * 0.15, wheelHeight);

    if (model === 'truck') {
      ctx.fillStyle = 'rgba(12,17,24,0.75)';
      roundedRectPath(-width * 0.24, -height * 0.36, width * 0.48, height * 0.18, 6);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawPickups() {
    state.pickups.forEach((pickup) => {
      const pulse = 1 + Math.sin((state.distance + pickup.y) * 0.12) * 0.08;
      ctx.save();
      ctx.translate(pickup.x, pickup.y);
      ctx.scale(pulse, pulse);
      ctx.shadowColor = pickup.type === 'boost' ? '#ffd166' : '#63f3ff';
      ctx.shadowBlur = 18;
      ctx.fillStyle = pickup.type === 'boost' ? '#ffd166' : '#63f3ff';
      ctx.beginPath();
      ctx.moveTo(0, -pickup.size);
      for (let i = 1; i < 6; i += 1) {
        const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
        const radius = i % 2 === 0 ? pickup.size : pickup.size * 0.45;
        ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
  }

  function drawParticles() {
    state.particles.forEach((particle) => {
      ctx.globalAlpha = clamp(particle.life * 2, 0, 1);
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function drawPlayerEffects() {
    if (!state.boostActive) {
      return;
    }

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < 6; i += 1) {
      const spread = (i - 2.5) * 5;
      const flame = ctx.createLinearGradient(state.player.x + spread, state.player.y + 16, state.player.x + spread, state.player.y + 68);
      flame.addColorStop(0, 'rgba(255,255,255,0.85)');
      flame.addColorStop(0.45, 'rgba(255,200,87,0.65)');
      flame.addColorStop(1, 'rgba(255,97,125,0)');
      ctx.fillStyle = flame;
      ctx.fillRect(state.player.x - 4 + spread, state.player.y + 18, 8, 48 + Math.sin(state.distance * 0.2 + i) * 8);
    }
    ctx.restore();
  }

  function applyCameraTransform() {
    const pivotX = state.width / 2;
    const pivotY = state.player.y - 60;
    const zoom = 1 + (state.boostActive ? 0.035 : 0) + clamp((state.speed - 260) / 900, 0, 0.05);
    ctx.translate(pivotX, pivotY);
    ctx.rotate(state.cameraBank);
    ctx.scale(zoom, zoom);
    ctx.translate(-pivotX, -pivotY);
  }

  function drawSpeedLines() {
    const intensity = clamp((state.speed - 220) / 160, 0, 1) + (state.boostActive ? 0.35 : 0);
    if (intensity <= 0.03) {
      return;
    }
    const vpX = state.width / 2 - state.cameraBank * state.width * 1.4;
    const vpY = state.height * 0.34;
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const count = 18;
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2;
      const dx = Math.cos(angle);
      const dy = Math.sin(angle) * 0.6;
      const startRadius = state.width * 0.3;
      const length = 36 + intensity * 240;
      const x1 = vpX + dx * startRadius;
      const y1 = vpY + dy * startRadius;
      const x2 = vpX + dx * (startRadius + length);
      const y2 = vpY + dy * (startRadius + length);
      ctx.strokeStyle = `rgba(255,255,255,${0.04 + intensity * 0.12})`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawCockpitOverlay() {
    const w = state.width;
    const h = state.height;
    ctx.save();

    const vignette = ctx.createRadialGradient(w / 2, h * 0.4, h * 0.22, w / 2, h * 0.4, h * 0.82);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(2,6,12,0.58)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = 'rgba(6,12,20,0.94)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w * 0.1, 0);
    ctx.lineTo(w * 0.02, h * 0.34);
    ctx.lineTo(0, h * 0.3);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(w, 0);
    ctx.lineTo(w * 0.9, 0);
    ctx.lineTo(w * 0.98, h * 0.34);
    ctx.lineTo(w, h * 0.3);
    ctx.closePath();
    ctx.fill();

    [-1, 1].forEach((side) => {
      const mx = w / 2 + side * w * 0.37;
      const my = h * 0.09;
      ctx.fillStyle = 'rgba(8,16,26,0.92)';
      roundedRectPath(mx - 26, my, 52, 30, 8);
      ctx.fill();
      ctx.fillStyle = 'rgba(120,190,255,0.22)';
      roundedRectPath(mx - 20, my + 4, 40, 20, 6);
      ctx.fill();
    });

    const hoodTop = h * 0.8;
    ctx.fillStyle = '#0a1119';
    ctx.beginPath();
    ctx.moveTo(-40, h + 40);
    ctx.lineTo(w * 0.16, hoodTop);
    ctx.lineTo(w * 0.5, hoodTop - h * 0.025);
    ctx.lineTo(w * 0.84, hoodTop);
    ctx.lineTo(w + 40, h + 40);
    ctx.closePath();
    ctx.fill();

    const hoodGlow = state.boostActive ? 0.55 : 0.2;
    ctx.strokeStyle = `rgba(99,243,255,${hoodGlow})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w * 0.16, hoodTop);
    ctx.lineTo(w * 0.5, hoodTop - h * 0.025);
    ctx.lineTo(w * 0.84, hoodTop);
    ctx.stroke();

    const wheelRadius = Math.min(130, w * 0.17);
    const wheelAngle = clamp(state.player.vx / 380, -1, 1) * 0.6;
    ctx.save();
    ctx.translate(w / 2, h + 40);
    ctx.rotate(wheelAngle);
    ctx.strokeStyle = 'rgba(15,22,32,0.96)';
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.arc(0, 0, wheelRadius, Math.PI * 1.06, Math.PI * 1.94);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(99,243,255,0.55)';
    ctx.lineWidth = 3;
    [-0.55, 0, 0.55].forEach((spokeAngle) => {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.sin(spokeAngle) * wheelRadius * 0.94, -Math.cos(spokeAngle) * wheelRadius * 0.94);
      ctx.stroke();
    });
    ctx.fillStyle = 'rgba(15,22,32,0.96)';
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, state.width, state.height);
    ctx.save();
    applyCameraTransform();
    drawSky();
    drawCityObjects();
    drawRoad();
    drawCrossroads();
    drawTrafficLights();
    drawRaceLines();
    drawRoadGlow();
    drawObstacles();
    drawPickups();

    state.opponents.forEach((car) => {
      drawCar(car.x, car.y, car.w, car.h, car.color, car.glow, car.sway * 0.15, false, car.type);
    });

    if (state.cameraView !== 'cockpit') {
      drawPlayerEffects();
      const profile = BRAND_PROFILES[state.playerBrand] || BRAND_PROFILES.falcon;
      drawCar(state.player.x, state.player.y, state.player.w, state.player.h, profile.body, profile.glow, state.player.tilt, true, 'car');
    }
    drawParticles();
    ctx.restore();

    drawSpeedLines();
    if (state.cameraView === 'cockpit') {
      drawCockpitOverlay();
    }

    if (state.collisionFlash > 0) {
      ctx.fillStyle = `rgba(255, 97, 125, ${state.collisionFlash * 0.22})`;
      ctx.fillRect(0, 0, state.width, state.height);
    }
  }

  function loop(timestamp) {
    if (!state.running) {
      draw();
      return;
    }
    const dt = Math.min(0.033, (timestamp - state.lastTimestamp) / 1000 || 0.016);
    state.lastTimestamp = timestamp;
    update(dt);
    draw();
    if (state.running) {
      requestAnimationFrame(loop);
    }
  }

  function finishRun(reason) {
    if (!state.running) {
      return;
    }
    state.running = false;
    const position = getRacePosition();
    const best = Math.max(Math.floor(state.distance), Math.floor(state.garageSavedBest));
    state.bestDistance = best;
    state.garageSavedBest = best;
    const payout = calculatePayout(reason, position);
    state.money += payout;
    if (reason === 'finish') {
      refs.finishTitle.textContent = position === 1 ? 'The race is yours.' : `You finished ${ordinal(position)}.`;
      refs.final.textContent = `You crossed the finish line in ${ordinal(position)} place with ${formatScore(state.score)} points, earned $${payout}, and your best run is ${best} m.`;
      announce(`${ordinal(position)} PLACE`);
    } else {
      refs.finishTitle.textContent = 'The grid got away.';
      refs.final.textContent = `You reached ${Math.floor(state.distance)} m in ${ordinal(position)} place, scored ${formatScore(state.score)}, earned $${payout}, and your best run is ${best} m.`;
    }
    refs.over.classList.remove('hidden');
    updateHud();
    saveProfile('finish');
    draw();
  }

  function normalizedProgress(raw = {}) {
    const selectedBrand = BRAND_PROFILES[raw.playerBrand] ? raw.playerBrand : 'falcon';
    const upgrades = {
      engine: clamp(Number(raw.upgrades?.engine || 0), 0, 3),
      handling: clamp(Number(raw.upgrades?.handling || 0), 0, 3),
      armor: clamp(Number(raw.upgrades?.armor || 0), 0, 3)
    };
    return {
      money: Math.max(0, Math.floor(Number(raw.money || 0))),
      bestDistance: Math.max(0, Math.floor(Number(raw.bestDistance || 0))),
      playerBrand: selectedBrand,
      upgrades
    };
  }

  async function waitForFirebaseGlobals(timeoutMs = 3500) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      if (window.FB_AUTH && window.FB_DB) {
        return true;
      }
      await new Promise((resolve) => window.setTimeout(resolve, 80));
    }
    return Boolean(window.FB_AUTH && window.FB_DB);
  }

  async function loadFirestoreModule() {
    return import(`${FIREBASE_CDN_BASE}/firebase-firestore.js`);
  }

  async function loadAuthModule() {
    return import(`${FIREBASE_CDN_BASE}/firebase-auth.js`);
  }

  async function initPersistence() {
    persistence.ready = (async () => {
      try {
        await waitForFirebaseGlobals();
        persistence.auth = window.FB_AUTH;
        persistence.db = window.FB_DB;
        if (!persistence.auth || !persistence.db) {
          refs.progressStatus.textContent = 'Guest mode active. Progress resets each visit.';
          applyProgress(normalizedProgress());
          return;
        }
        persistence.firestore = await loadFirestoreModule();
        const user = persistence.auth.currentUser || await new Promise((resolve) => {
          let unsub;
          const timeout = setTimeout(() => {
            if (unsub) unsub();
            resolve(null);
          }, 3500);
          loadAuthModule().then(({ onAuthStateChanged }) => {
            unsub = onAuthStateChanged(persistence.auth, (value) => {
              clearTimeout(timeout);
              if (unsub) unsub();
              resolve(value);
            });
          }).catch(() => resolve(null));
        });

        if (!user) {
          refs.progressStatus.textContent = 'Guest mode active. Progress resets each visit.';
          applyProgress(normalizedProgress());
          return;
        }

        const snap = await persistence.firestore.getDoc(persistence.firestore.doc(persistence.db, 'velocity_rush_progress', user.uid));
        persistence.profile = snap.exists() ? normalizedProgress(snap.data()) : normalizedProgress();
        applyProgress(persistence.profile);
        refs.progressStatus.textContent = snap.exists()
          ? `Profile loaded: $${persistence.profile.money} · Best ${persistence.profile.bestDistance} m.`
          : 'Signed in. Race earnings and upgrades will be saved.';
      } catch (error) {
        console.warn('Velocity Rush persistence unavailable.', error);
        refs.progressStatus.textContent = 'Offline mode: progress will not be saved.';
      }
    })();
    return persistence.ready;
  }

  function applyProgress(profile) {
    state.money = profile.money;
    state.garageSavedBest = profile.bestDistance;
    state.bestDistance = profile.bestDistance;
    state.playerBrand = profile.playerBrand;
    state.upgrades = { ...profile.upgrades };
    setCarBrand(state.playerBrand, false);
    refreshUpgradeButtons();
    updateHud();
  }

  function currentProfilePayload() {
    return {
      money: Math.floor(state.money),
      bestDistance: Math.floor(state.garageSavedBest),
      playerBrand: state.playerBrand,
      upgrades: { ...state.upgrades },
      updatedAt: persistence.firestore?.serverTimestamp ? persistence.firestore.serverTimestamp() : new Date().toISOString()
    };
  }

  async function saveProfile(reason = 'manual') {
    if (!persistence.ready) return;
    await persistence.ready;
    const user = persistence.auth?.currentUser;
    if (!user || !persistence.firestore) return;
    try {
      await persistence.firestore.setDoc(
        persistence.firestore.doc(persistence.db, 'velocity_rush_progress', user.uid),
        { ...currentProfilePayload(), reason }
      );
      refs.progressStatus.textContent = `Profile saved · $${Math.floor(state.money)} · ${Math.floor(state.garageSavedBest)} m best.`;
    } catch (error) {
      console.warn('Unable to save Velocity Rush profile.', error);
    }
  }

  function calculatePayout(reason, position) {
    const finishBonus = reason === 'finish' ? 140 : 30;
    const placeBonus = Math.max(0, 4 - position) * 45;
    const distanceBonus = Math.floor(state.distance / 20);
    const scoreBonus = Math.floor(state.score / 220);
    return Math.max(20, finishBonus + placeBonus + distanceBonus + scoreBonus);
  }

  function refreshUpgradeButtons() {
    refs.upgradeButtons.forEach((button) => {
      const key = button.dataset.upgrade;
      const level = state.upgrades[key] || 0;
      const costs = UPGRADE_COSTS[key] || [];
      const maxed = level >= costs.length;
      const nextCost = maxed ? null : costs[level];
      button.textContent = maxed
        ? `${UPGRADE_LABELS[key]} L${level} · MAXED`
        : `${UPGRADE_LABELS[key]} L${level} · $${nextCost}`;
      const affordable = !maxed && state.money >= nextCost;
      button.disabled = maxed || !affordable;
      button.title = maxed ? 'Max upgrade reached' : affordable ? '' : `Need $${nextCost}`;
      button.classList.toggle('affordable', affordable);
    });
  }

  function setCarBrand(brand, persist = true) {
    if (!BRAND_PROFILES[brand]) return;
    state.playerBrand = brand;
    refs.carButtons.forEach((button) => {
      const selected = button.dataset.car === brand;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-checked', String(selected));
    });
    if (persist) {
      saveProfile('car-select');
    }
  }

  function purchaseUpgrade(key) {
    const costs = UPGRADE_COSTS[key];
    if (!costs) return;
    const level = state.upgrades[key] || 0;
    if (level >= costs.length) return;
    const cost = costs[level];
    if (state.money < cost) {
      announce('NOT ENOUGH CASH');
      return;
    }
    state.money -= cost;
    state.upgrades[key] = level + 1;
    announce(`${UPGRADE_LABELS[key].toUpperCase()} UPGRADED`);
    updateHud();
    saveProfile('upgrade');
  }

  function updateMotionCopy(message, showButton = false) {
    refs.motionStatus.textContent = message;
    refs.motionButton.classList.toggle('hidden', !showButton);
  }

  function setControlMode(mode) {
    controlState.mode = mode;
    controlState.motionActive = mode === 'motion';
    refs.touchControls.classList.toggle('motion-active', mode === 'motion');
    refs.controlChip.innerHTML = `<span class="live-dot"></span> ${
      mode === 'motion' ? 'MOTION STEERING' : mode === 'touch' ? 'TOUCH STEERING' : 'DESKTOP CONTROL'
    }`;
  }

  function handleOrientation(event) {
    if (typeof event.gamma !== 'number') {
      return;
    }
    controlState.receivedMotion = true;
    input.motionSteer = clamp(event.gamma / 28, -1, 1);
  }

  function handleMotion(event) {
    const accel = event.accelerationIncludingGravity;
    if (!accel || typeof accel.x !== 'number') {
      return;
    }
    controlState.receivedMotion = true;
    input.motionSteer = clamp(accel.x / 7.5, -1, 1);
  }

  function attachMotionListeners() {
    if (controlState.motionListening) {
      return;
    }
    controlState.motionListening = true;
    window.addEventListener('deviceorientation', handleOrientation, true);
    window.addEventListener('devicemotion', handleMotion, true);
  }

  async function enableMotionControls() {
    if (!controlState.motionSupported) {
      setControlMode('touch');
      updateMotionCopy('Motion steering is not available on this device. Touch steering is active.');
      return false;
    }

    controlState.receivedMotion = false;
    attachMotionListeners();

    if (motionPermissionRequired) {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response !== 'granted') {
          throw new Error('permission denied');
        }
      } catch (error) {
        setControlMode('touch');
        updateMotionCopy('Motion steering permission was denied, so touch steering is active.');
        return false;
      }
    }

    return new Promise((resolve) => {
      window.setTimeout(() => {
        if (controlState.receivedMotion) {
          setControlMode('motion');
          updateMotionCopy('Motion steering connected. Tilt your phone to turn.');
          resolve(true);
        } else {
          setControlMode('touch');
          updateMotionCopy('No motion data detected, so touch steering is active.');
          resolve(false);
        }
      }, 800);
    });
  }

  async function prepareControlsForStart() {
    if (!coarsePointer) {
      setControlMode('desktop');
      updateMotionCopy('Desktop controls ready.');
      return;
    }

    if (controlState.motionSupported) {
      const active = await enableMotionControls();
      if (!active) {
        refs.motionButton.classList.remove('hidden');
      }
      return;
    }

    setControlMode('touch');
    updateMotionCopy('Touch steering is active because motion steering is unavailable.');
  }

  async function startRace() {
    await prepareControlsForStart();
    resetGame();
    requestAnimationFrame(loop);
  }

  async function toggleFullscreen() {
    const element = refs.shell;
    const active = document.fullscreenElement || document.webkitFullscreenElement;
    try {
      if (!active) {
        const request = element.requestFullscreen || element.webkitRequestFullscreen;
        if (request) {
          await request.call(element);
          element.classList.add('racer-fullscreen');
        }
      } else {
        const exit = document.exitFullscreen || document.webkitExitFullscreen;
        if (exit) {
          await exit.call(document);
        }
      }
    } catch (error) {
      console.warn('Unable to toggle fullscreen mode.', error);
    }
    updateFullscreenLabel();
  }

  function updateFullscreenLabel() {
    const active = document.fullscreenElement || document.webkitFullscreenElement;
    refs.fullscreenButton.querySelector('span').textContent = active ? 'EXIT FULLSCREEN' : 'FULLSCREEN';
    refs.shell.classList.toggle('racer-fullscreen', Boolean(active));
  }

  function setCameraView(view) {
    state.cameraView = view;
    state.perspectiveDepth = PERSPECTIVE_DEPTHS[view] ?? PERSPECTIVE_DEPTHS.chase;
    refs.viewButton.querySelector('span').textContent = view === 'cockpit' ? 'CHASE VIEW' : 'COCKPIT VIEW';
    refs.viewButton.setAttribute('aria-label', view === 'cockpit' ? 'Switch to chase view' : 'Switch to cockpit view');
  }

  function toggleCameraView() {
    setCameraView(state.cameraView === 'cockpit' ? 'chase' : 'cockpit');
  }

  function setTouchSteer(direction) {
    input.touchSteer = direction;
    refs.touchLeft.classList.toggle('active', direction < 0);
    refs.touchRight.classList.toggle('active', direction > 0);
  }

  function setBoost(active) {
    input.boost = active;
    refs.touchBoost.classList.toggle('active', active);
  }

  function setDifficulty(difficulty) {
    if (!trafficProfiles[difficulty]) {
      return;
    }
    state.difficulty = difficulty;
    refs.difficultyButtons.forEach((button) => {
      const selected = button.dataset.difficulty === difficulty;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    if (state.running) {
      announce(trafficProfiles[difficulty].label);
    }
  }

  function bindHoldButton(element, onStart, onEnd) {
    element.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      if (event.isPrimary && element.setPointerCapture) {
        element.setPointerCapture(event.pointerId);
      }
      onStart();
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach((name) => {
      element.addEventListener(name, (event) => {
        event.preventDefault();
        onEnd();
      });
    });
  }

  window.addEventListener('resize', resize);
  document.addEventListener('fullscreenchange', updateFullscreenLabel);
  document.addEventListener('webkitfullscreenchange', updateFullscreenLabel);
  refs.fullscreenButton.addEventListener('click', toggleFullscreen);
  refs.viewButton.addEventListener('click', toggleCameraView);
  refs.startButton.addEventListener('click', startRace);
  refs.restartButton.addEventListener('click', startRace);
  refs.motionButton.addEventListener('click', async () => {
    const enabled = await enableMotionControls();
    refs.motionButton.classList.toggle('hidden', enabled);
  });

  bindHoldButton(refs.touchLeft, () => setTouchSteer(-1), () => setTouchSteer(input.touchSteer < 0 ? 0 : input.touchSteer));
  bindHoldButton(refs.touchRight, () => setTouchSteer(1), () => setTouchSteer(input.touchSteer > 0 ? 0 : input.touchSteer));
  bindHoldButton(refs.touchForward, () => { input.forward = true; }, () => { input.forward = false; });
  bindHoldButton(refs.touchBrake, () => { input.brake = true; }, () => { input.brake = false; });
  bindHoldButton(refs.touchBoost, () => setBoost(true), () => setBoost(false));

  refs.difficultyButtons.forEach((button) => {
    button.addEventListener('click', () => setDifficulty(button.dataset.difficulty));
  });

  refs.carButtons.forEach((button) => {
    button.addEventListener('click', () => setCarBrand(button.dataset.car));
  });

  refs.upgradeButtons.forEach((button) => {
    button.addEventListener('click', () => purchaseUpgrade(button.dataset.upgrade));
  });

  window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (key === 'arrowleft' || key === 'a') {
      input.left = true;
      event.preventDefault();
    }
    if (key === 'arrowright' || key === 'd') {
      input.right = true;
      event.preventDefault();
    }
    if (key === 'arrowup' || key === 'w') {
      input.forward = true;
      event.preventDefault();
    }
    if (key === 'arrowdown' || key === 's') {
      input.brake = true;
      event.preventDefault();
    }
    if (key === ' ' || key === 'spacebar' || key === 'shift') {
      input.boost = true;
      event.preventDefault();
    }
    if ((key === 'v' || key === 'c') && !event.repeat) {
      toggleCameraView();
    }
  });

  window.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase();
    if (key === 'arrowleft' || key === 'a') {
      input.left = false;
    }
    if (key === 'arrowright' || key === 'd') {
      input.right = false;
    }
    if (key === 'arrowup' || key === 'w') {
      input.forward = false;
    }
    if (key === 'arrowdown' || key === 's') {
      input.brake = false;
    }
    if (key === ' ' || key === 'spacebar' || key === 'shift') {
      input.boost = false;
    }
  });

  if (coarsePointer) {
    if (controlState.motionSupported) {
      updateMotionCopy(
        motionPermissionRequired
          ? 'Tap start to request motion steering permission. Touch steering is ready as fallback.'
          : 'Tap start to activate motion steering automatically if your device provides sensor data.',
        motionPermissionRequired
      );
    } else {
      updateMotionCopy('Motion steering is unavailable here, so touch steering will be used.');
    }
  } else {
    updateMotionCopy('Desktop controls are ready.');
    refs.motionButton.classList.add('hidden');
  }

  resize();
  setDifficulty(state.difficulty);
  setCameraView(state.cameraView);
  initPersistence();
  draw();
})();
