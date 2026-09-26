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
    controlChip: document.getElementById('control-chip'),
    motionStatus: document.getElementById('motion-status'),
    motionButton: document.getElementById('motion-button'),
    fullscreenButton: document.getElementById('fullscreen-button'),
    touchControls: document.getElementById('touch-controls'),
    touchLeft: document.getElementById('touch-left'),
    touchRight: document.getElementById('touch-right'),
    touchBoost: document.getElementById('touch-boost'),
    startButton: document.getElementById('start-button'),
    restartButton: document.getElementById('restart-button')
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
    shield: 100,
    boost: 100,
    score: 0,
    boostActive: false,
    collisionFlash: 0,
    spawnTimer: 0,
    pickupTimer: 2,
    lastTimestamp: 0,
    opponentsPassed: 0,
    player: { x: 0, y: 0, w: 48, h: 90, tilt: 0, glow: 0 },
    opponents: [],
    pickups: [],
    particles: [],
    skyline: [],
    stars: []
  };

  const input = {
    left: false,
    right: false,
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

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function formatScore(value) {
    return String(Math.max(0, Math.floor(value))).padStart(6, '0');
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
    state.roadCenter = box.width / 2;
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
    const startX = -40;
    let x = startX;
    while (x < state.width + 80) {
      const width = rand(24, 64);
      state.skyline.push({
        x,
        width,
        height: rand(state.height * 0.1, state.height * 0.28),
        glow: Math.random() < 0.4
      });
      x += width + rand(6, 20);
    }
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
    state.spawnTimer = 0.35;
    state.pickupTimer = 2.8;
    state.lastTimestamp = 0;
    state.opponentsPassed = 0;
    state.player.x = state.roadCenter;
    state.player.y = state.height - 110;
    state.player.tilt = 0;
    state.player.glow = 0;
    state.opponents = [];
    state.pickups = [];
    state.particles = [];
    refs.start.classList.add('hidden');
    refs.over.classList.add('hidden');
    announce('RACE ON');
    updateHud();
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
  }

  function announce(message) {
    refs.announcement.textContent = message;
    refs.announcement.classList.remove('hidden', 'show');
    void refs.announcement.offsetWidth;
    refs.announcement.classList.add('show');
  }

  function roadBounds(y = state.player.y) {
    const perspective = clamp((y / state.height) * 1.18, 0.55, 1.12);
    const half = state.roadWidth * perspective * 0.5;
    return {
      left: state.roadCenter - half,
      right: state.roadCenter + half
    };
  }

  function spawnOpponent() {
    const laneOffset = rand(-0.36, 0.36) * state.roadWidth;
    const palette = [
      { body: '#ff6f61', glow: '#ffc2b0' },
      { body: '#63f3ff', glow: '#ccfbff' },
      { body: '#f72585', glow: '#ffacd3' },
      { body: '#ffd166', glow: '#fff0b8' }
    ];
    const theme = palette[Math.floor(Math.random() * palette.length)];
    const size = rand(0.88, 1.15);
    state.opponents.push({
      x: state.roadCenter + laneOffset,
      y: -130,
      w: 40 * size,
      h: 82 * size,
      speed: rand(150, 260),
      sway: rand(-0.32, 0.32),
      color: theme.body,
      glow: theme.glow,
      passed: false
    });
  }

  function spawnPickup() {
    const type = Math.random() < 0.55 ? 'boost' : 'shield';
    state.pickups.push({
      type,
      x: state.roadCenter + rand(-0.32, 0.32) * state.roadWidth,
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
    const targetSpeed = boostHeld ? 340 : 230 + Math.min(85, state.distance * 0.18);
    state.speed += (targetSpeed - state.speed) * Math.min(1, dt * 2.1);
    state.boost = clamp(state.boost + (boostHeld ? -34 : 9) * dt, 0, 100);
    state.distance += state.speed * dt * 0.11;
    state.score += state.speed * dt * (boostHeld ? 1.25 : 0.85);
    state.roadScroll = (state.roadScroll + state.speed * dt) % 80;
    state.sceneryScroll = (state.sceneryScroll + state.speed * dt * 0.36) % state.height;
    state.collisionFlash = Math.max(0, state.collisionFlash - dt * 1.8);

    const steer = currentSteer();
    const turnRate = controlState.motionActive ? 270 : 320;
    state.player.x += steer * turnRate * dt;
    state.player.tilt += (steer * 0.42 - state.player.tilt) * Math.min(1, dt * 10);
    state.player.glow += ((boostHeld ? 1 : 0) - state.player.glow) * Math.min(1, dt * 5);

    const bounds = roadBounds();
    if (state.player.x < bounds.left + 20 || state.player.x > bounds.right - 20) {
      state.player.x = clamp(state.player.x, bounds.left + 14, bounds.right - 14);
      state.shield -= 22 * dt;
      state.score = Math.max(0, state.score - 30 * dt);
    }

    state.spawnTimer -= dt;
    if (state.spawnTimer <= 0) {
      spawnOpponent();
      state.spawnTimer = clamp(rand(0.52, 1.08) - state.distance * 0.0025, 0.34, 1.08);
    }

    state.pickupTimer -= dt;
    if (state.pickupTimer <= 0) {
      spawnPickup();
      state.pickupTimer = rand(3.2, 5.4);
    }

    state.opponents.forEach((car) => {
      car.y += (state.speed - car.speed) * dt + 90 * dt;
      car.x += Math.sin((state.distance * 0.025) + car.y * 0.01) * car.sway * 22 * dt;

      if (!car.passed && car.y > state.player.y + 70) {
        car.passed = true;
        state.opponentsPassed += 1;
        state.score += 120;
        if (state.opponentsPassed % 8 === 0) {
          state.boost = clamp(state.boost + 12, 0, 100);
          announce('FLOW STATE');
        }
      }

      if (intersectsPlayer(car)) {
        car.y = state.height + 200;
        state.shield -= 24;
        state.score = Math.max(0, state.score - 180);
        state.collisionFlash = 1;
        emitImpact(state.player.x, state.player.y - 18, '#ff617d');
        if (state.shield > 0) {
          announce('SHIELD HIT');
        }
      }
    });
    state.opponents = state.opponents.filter((car) => car.y < state.height + 140);

    state.pickups.forEach((pickup) => {
      pickup.y += state.speed * dt + 110 * dt;
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
      finishRun();
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
        for (let row = 0; row < building.height - 12; row += 16) {
          for (let col = 0; col < building.width - 8; col += 10) {
            if (Math.random() > 0.58) {
              ctx.fillRect(x + 4 + col, y + 6 + row, 4, 8);
            }
          }
        }
      }
    });
  }

  function drawRoad() {
    const topY = state.height * 0.15;
    const bottomY = state.height;
    const topHalf = state.roadWidth * 0.22;
    const bottomHalf = state.roadWidth * 0.6;

    ctx.fillStyle = '#09111b';
    ctx.beginPath();
    ctx.moveTo(state.roadCenter - bottomHalf - 80, bottomY);
    ctx.lineTo(state.roadCenter - topHalf - 40, topY);
    ctx.lineTo(state.roadCenter + topHalf + 40, topY);
    ctx.lineTo(state.roadCenter + bottomHalf + 80, bottomY);
    ctx.closePath();
    ctx.fill();

    const roadGradient = ctx.createLinearGradient(0, topY, 0, bottomY);
    roadGradient.addColorStop(0, '#1b2430');
    roadGradient.addColorStop(0.5, '#313a45');
    roadGradient.addColorStop(1, '#0f141a');
    ctx.fillStyle = roadGradient;
    ctx.beginPath();
    ctx.moveTo(state.roadCenter - bottomHalf, bottomY);
    ctx.lineTo(state.roadCenter - topHalf, topY);
    ctx.lineTo(state.roadCenter + topHalf, topY);
    ctx.lineTo(state.roadCenter + bottomHalf, bottomY);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#6bf5ff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(state.roadCenter - bottomHalf + 10, bottomY);
    ctx.lineTo(state.roadCenter - topHalf + 3, topY);
    ctx.moveTo(state.roadCenter + bottomHalf - 10, bottomY);
    ctx.lineTo(state.roadCenter + topHalf - 3, topY);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255,255,255,0.68)';
    ctx.lineWidth = 4;
    for (let lane = -0.5; lane <= 0.5; lane += 0.5) {
      for (let y = -100; y < state.height + 100; y += 80) {
        const worldY = y + state.roadScroll;
        const t = clamp(worldY / state.height, 0, 1);
        const laneX = state.roadCenter + lane * (topHalf + (bottomHalf - topHalf) * t);
        const laneY = worldY;
        const dashHeight = 12 + t * 30;
        ctx.globalAlpha = 0.2 + t * 0.7;
        ctx.beginPath();
        ctx.moveTo(laneX, laneY);
        ctx.lineTo(laneX, laneY + dashHeight);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
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

  function drawCar(x, y, width, height, color, glow, tilt = 0, player = false) {
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
    ctx.beginPath();
    ctx.roundRect(-width * 0.26, -height * 0.18, width * 0.52, height * 0.36, 12);
    ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.16)';
    ctx.beginPath();
    ctx.roundRect(-width * 0.18, -height * 0.08, width * 0.36, height * 0.16, 8);
    ctx.fill();

    ctx.fillStyle = player ? '#63f3ff' : '#ffd166';
    ctx.fillRect(-width * 0.16, -height * 0.42, width * 0.32, 6);
    ctx.fillStyle = '#ff617d';
    ctx.fillRect(-width * 0.16, height * 0.33, width * 0.32, 6);

    ctx.fillStyle = '#0c1118';
    ctx.fillRect(-width * 0.56, -height * 0.2, width * 0.15, height * 0.26);
    ctx.fillRect(width * 0.41, -height * 0.2, width * 0.15, height * 0.26);
    ctx.fillRect(-width * 0.56, height * 0.08, width * 0.15, height * 0.26);
    ctx.fillRect(width * 0.41, height * 0.08, width * 0.15, height * 0.26);
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

  function draw() {
    ctx.clearRect(0, 0, state.width, state.height);
    drawSky();
    drawRoad();
    drawRoadGlow();
    drawPickups();

    state.opponents.forEach((car) => {
      drawCar(car.x, car.y, car.w, car.h, car.color, car.glow, car.sway * 0.15);
    });

    drawPlayerEffects();
    drawCar(state.player.x, state.player.y, state.player.w, state.player.h, '#63f3ff', '#63f3ff', state.player.tilt, true);
    drawParticles();

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

  function finishRun() {
    if (!state.running) {
      return;
    }
    state.running = false;
    const best = Math.max(Math.floor(state.distance), Number(localStorage.getItem('velocity-rush-best') || 0));
    localStorage.setItem('velocity-rush-best', String(best));
    refs.final.textContent = `You blasted through ${Math.floor(state.distance)} m, scored ${formatScore(state.score)}, and your best run is ${best} m.`;
    refs.over.classList.remove('hidden');
    draw();
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

  function setTouchSteer(direction) {
    input.touchSteer = direction;
    refs.touchLeft.classList.toggle('active', direction < 0);
    refs.touchRight.classList.toggle('active', direction > 0);
  }

  function setBoost(active) {
    input.boost = active;
    refs.touchBoost.classList.toggle('active', active);
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
  refs.startButton.addEventListener('click', startRace);
  refs.restartButton.addEventListener('click', startRace);
  refs.motionButton.addEventListener('click', async () => {
    const enabled = await enableMotionControls();
    refs.motionButton.classList.toggle('hidden', enabled);
  });

  bindHoldButton(refs.touchLeft, () => setTouchSteer(-1), () => setTouchSteer(input.touchSteer < 0 ? 0 : input.touchSteer));
  bindHoldButton(refs.touchRight, () => setTouchSteer(1), () => setTouchSteer(input.touchSteer > 0 ? 0 : input.touchSteer));
  bindHoldButton(refs.touchBoost, () => setBoost(true), () => setBoost(false));

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
    if (key === ' ' || key === 'spacebar' || key === 'shift') {
      input.boost = true;
      event.preventDefault();
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
  draw();
})();
