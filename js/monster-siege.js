(() => {
  const canvas = document.getElementById('arena');
  const ctx = canvas.getContext('2d');
  const ui = {
    health: document.getElementById('health-text'),
    healthBar: document.getElementById('health-bar'),
    wave: document.getElementById('wave-text'),
    level: document.getElementById('level-text'),
    score: document.getElementById('score-text'),
    essence: document.getElementById('essence-text'),
    start: document.getElementById('start-screen'),
    over: document.getElementById('game-over'),
    shop: document.getElementById('shop-screen'),
    shopEssence: document.getElementById('shop-essence'),
    shopOptions: document.getElementById('shop-options'),
    final: document.getElementById('final-stats'),
    endEyebrow: document.getElementById('end-eyebrow'),
    endTitle: document.getElementById('end-title'),
    banner: document.getElementById('wave-banner'),
    saveStatus: document.getElementById('save-status'),
    continueButton: document.getElementById('continue-button'),
    resumeAfterDeath: document.getElementById('resume-after-death')
  };

  const keys = new Set();
  let state = null;
  let lastTime = 0;
  let animationId = 0;
  let touchAim = false;
  let mouse = { x: 0, y: 0, down: false };
  let touchMove = { active: false, x: 0, y: 0 };
  let audioCtx = null;

  const MAX_LEVEL = 10;
  const WAVES_PER_LEVEL = 3;
  const FINAL_WAVE = MAX_LEVEL * WAVES_PER_LEVEL;
  const BASE_MAX_HEALTH = 100;

  const types = [
    { name: 'crawler', color: '#e85d75', size: 15, speed: 55, hp: 1, damage: 14, points: 10 },
    { name: 'wisp', color: '#a983ff', size: 11, speed: 85, hp: 1, damage: 10, points: 15 },
    { name: 'brute', color: '#ff8c42', size: 24, speed: 32, hp: 3, damage: 28, points: 35 },
    { name: 'spitter', color: '#5ec8ff', size: 14, speed: 42, hp: 2, damage: 12, points: 25, ranged: true }
  ];

  const shopCatalog = [
    { id: 'firerate', name: 'Rapid Cores', desc: 'Faster fire rate', cost: 4, max: 5 },
    { id: 'damage', name: 'Piercing Rounds', desc: '+1 bullet damage', cost: 5, max: 4 },
    { id: 'multishot', name: 'Split Burst', desc: 'Extra side shots', cost: 7, max: 2 },
    { id: 'maxhp', name: 'Vital Lattice', desc: '+25 max vitality', cost: 5, max: 4 },
    { id: 'heal', name: 'Field Med', desc: 'Restore 40 vitality', cost: 3, max: 99 },
    { id: 'dash', name: 'Blink Coil', desc: 'Shorter dash cooldown', cost: 4, max: 3 }
  ];

  const persistence = { ready: null, auth: null, db: null, firestore: null, saved: null };
  const rand = (min, max) => Math.random() * (max - min) + min;
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

  function ensureAudio() {
    if (audioCtx) return audioCtx;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    audioCtx = new Ctx();
    return audioCtx;
  }

  function playTone(freq, duration = 0.08, type = 'square', volume = 0.05) {
    const ctxAudio = ensureAudio();
    if (!ctxAudio) return;
    const osc = ctxAudio.createOscillator();
    const gain = ctxAudio.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.001, ctxAudio.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctxAudio.destination);
    osc.start();
    osc.stop(ctxAudio.currentTime + duration);
  }

  function resize() {
    const box = canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = box.width * dpr;
    canvas.height = box.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (state) {
      state.w = box.width;
      state.h = box.height;
      state.player.x = Math.min(state.player.x, state.w - 30);
      state.player.y = Math.min(state.player.y, state.h - 30);
    }
  }

  function levelForWave(wave) {
    return Math.min(MAX_LEVEL, 1 + Math.floor((wave - 1) / WAVES_PER_LEVEL));
  }

  function difficultyMultiplier() {
    return 1 + (state.level - 1) * 0.12;
  }

  function defaultUpgrades() {
    return { firerate: 0, damage: 0, multishot: 0, maxhp: 0, dash: 0 };
  }

  function maxHealthFor(upgrades) {
    return BASE_MAX_HEALTH + upgrades.maxhp * 25;
  }

  function fireCooldown() {
    return Math.max(0.06, 0.13 - state.upgrades.firerate * 0.015);
  }

  function dashCooldown() {
    return Math.max(0.55, 1.35 - state.upgrades.dash * 0.22);
  }

  function reset(saved = null) {
    const rect = canvas.getBoundingClientRect();
    const wave = saved?.wave || 1;
    const upgrades = { ...defaultUpgrades(), ...(saved?.upgrades || {}) };
    const maxHealth = maxHealthFor(upgrades);
    state = {
      w: rect.width,
      h: rect.height,
      active: true,
      paused: false,
      won: false,
      health: Math.min(saved?.health ?? maxHealth, maxHealth),
      maxHealth,
      wave,
      level: saved?.level || levelForWave(wave),
      score: saved?.score || 0,
      essence: saved?.essence || 0,
      upgrades,
      spawnLeft: 4 + wave * 2,
      spawnTimer: 0.2,
      waveCooldown: 0,
      awaitingShop: false,
      player: {
        x: rect.width / 2,
        y: rect.height / 2,
        r: 13,
        angle: 0,
        fireTimer: 0,
        invulnerable: 0,
        dashTimer: 0,
        dashCd: 0,
        dashVx: 0,
        dashVy: 0
      },
      enemies: [],
      bullets: [],
      enemyShots: [],
      particles: [],
      drops: [],
      shake: 0
    };
    updateUi();
    announceWave();
  }

  function updateUi() {
    if (!state) return;
    ui.health.textContent = `${Math.max(0, Math.ceil(state.health))} / ${state.maxHealth}`;
    ui.healthBar.style.width = `${Math.max(0, (state.health / state.maxHealth) * 100)}%`;
    ui.healthBar.style.background = state.health / state.maxHealth < 0.3 ? '#ff6b5e' : '#d4ff3f';
    ui.wave.textContent = state.wave;
    ui.level.textContent = `${state.level} / ${MAX_LEVEL}`;
    ui.score.textContent = String(state.score).padStart(6, '0');
    ui.essence.textContent = state.essence;
  }

  function announceWave() {
    ui.banner.textContent = `WAVE ${state.wave} · LEVEL ${state.level}`;
    ui.banner.classList.remove('show');
    void ui.banner.offsetWidth;
    ui.banner.classList.add('show');
  }

  function spawnEnemy() {
    const levelBias = (state.level - 1) * 0.03;
    const roll = Math.random();
    let type;
    if (roll < 0.12 + levelBias) type = types[3];
    else if (roll < 0.28 + levelBias) type = types[2];
    else if (roll < 0.58) type = types[1];
    else type = types[0];

    const scale = difficultyMultiplier();
    const side = Math.floor(rand(0, 4));
    const edge = side % 2 ? rand(20, state.h - 20) : rand(20, state.w - 20);
    const x = side === 0 ? -30 : side === 1 ? state.w + 30 : edge;
    const y = side === 2 ? -30 : side === 3 ? state.h + 30 : edge;
    state.enemies.push({
      ...type,
      speed: type.speed * (1 + (state.level - 1) * 0.08),
      hp: Math.ceil(type.hp * scale),
      damage: type.damage * scale,
      x,
      y,
      maxHp: Math.ceil(type.hp * scale),
      hit: 0,
      shootTimer: rand(0.8, 1.6),
      phase: rand(0, 7)
    });
  }

  function fire() {
    if (state.player.fireTimer > 0) return;
    const p = state.player;
    const damage = 1 + state.upgrades.damage;
    const spread = state.upgrades.multishot;
    for (let i = -spread; i <= spread; i++) {
      const angle = p.angle + i * 0.18;
      state.bullets.push({
        x: p.x + Math.cos(angle) * 20,
        y: p.y + Math.sin(angle) * 20,
        vx: Math.cos(angle) * 650,
        vy: Math.sin(angle) * 650,
        life: 0.75,
        damage
      });
    }
    p.fireTimer = fireCooldown();
    playTone(680 + spread * 40, 0.04, 'square', 0.035);
    for (let i = 0; i < 3; i++) {
      state.particles.push({
        x: p.x + Math.cos(p.angle) * 22,
        y: p.y + Math.sin(p.angle) * 22,
        vx: rand(-30, 30) + Math.cos(p.angle) * rand(40, 90),
        vy: rand(-30, 30) + Math.sin(p.angle) * rand(40, 90),
        life: 0.22,
        color: '#d4ff3f',
        size: rand(1, 3)
      });
    }
  }

  function tryDash() {
    if (!state?.active || state.paused || state.player.dashCd > 0 || state.player.dashTimer > 0) return;
    let dx = (keys.has('d') || keys.has('arrowright') ? 1 : 0) - (keys.has('a') || keys.has('arrowleft') ? 1 : 0);
    let dy = (keys.has('s') || keys.has('arrowdown') ? 1 : 0) - (keys.has('w') || keys.has('arrowup') ? 1 : 0);
    if (touchMove.active) {
      dx += touchMove.x;
      dy += touchMove.y;
    }
    if (Math.hypot(dx, dy) < 0.15) {
      dx = Math.cos(state.player.angle);
      dy = Math.sin(state.player.angle);
    }
    const mag = Math.hypot(dx, dy) || 1;
    state.player.dashVx = (dx / mag) * 520;
    state.player.dashVy = (dy / mag) * 520;
    state.player.dashTimer = 0.16;
    state.player.dashCd = dashCooldown();
    state.player.invulnerable = Math.max(state.player.invulnerable, 0.22);
    playTone(220, 0.1, 'sawtooth', 0.04);
    for (let i = 0; i < 8; i++) {
      state.particles.push({
        x: state.player.x,
        y: state.player.y,
        vx: rand(-140, 140),
        vy: rand(-140, 140),
        life: 0.28,
        color: '#9fffd7',
        size: rand(2, 4)
      });
    }
  }

  function damagePlayer(amount) {
    if (state.player.invulnerable > 0 || state.player.dashTimer > 0) return;
    // Soften early waves so new players can learn dash + kiting.
    const earlyScale = state.wave <= 2 ? 0.62 : state.wave <= 4 ? 0.8 : 1;
    state.health -= amount * earlyScale;
    state.player.invulnerable = 0.55;
    state.shake = 10;
    playTone(120, 0.12, 'triangle', 0.06);
    for (let i = 0; i < 8; i++) {
      state.particles.push({
        x: state.player.x,
        y: state.player.y,
        vx: rand(-100, 100),
        vy: rand(-100, 100),
        life: 0.4,
        color: '#ff6b5e',
        size: rand(2, 5)
      });
    }
    if (state.health <= 0) endGame(false);
  }

  function killEnemy(enemy) {
    state.score += enemy.points;
    state.essence++;
    state.drops.push({ x: enemy.x, y: enemy.y, life: 8, spin: rand(0, 6) });
    playTone(420, 0.05, 'triangle', 0.04);
    for (let i = 0; i < 10; i++) {
      state.particles.push({
        x: enemy.x,
        y: enemy.y,
        vx: rand(-120, 120),
        vy: rand(-120, 120),
        life: 0.6,
        color: enemy.color,
        size: rand(2, 5)
      });
    }
  }

  function checkpointData() {
    return {
      wave: state.wave,
      level: state.level,
      health: Math.max(1, Math.ceil(state.health)),
      score: state.score,
      essence: state.essence,
      upgrades: { ...state.upgrades }
    };
  }

  async function initPersistence() {
    persistence.ready = (async () => {
      try {
        await import('./firebase-config.js');
        const firestore = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
        persistence.auth = window.FB_AUTH;
        persistence.db = window.FB_DB;
        persistence.firestore = firestore;
        const user = persistence.auth?.currentUser || await new Promise((resolve) => {
          let unsubscribe;
          const timeout = setTimeout(() => {
            if (unsubscribe) unsubscribe();
            resolve(null);
          }, 4000);
          import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js').then(({ onAuthStateChanged }) => {
            unsubscribe = onAuthStateChanged(persistence.auth, (value) => {
              clearTimeout(timeout);
              unsubscribe();
              resolve(value);
            });
          });
        });
        if (!user) {
          ui.saveStatus.textContent = 'Sign in to save your run across devices.';
          return;
        }
        const snapshot = await firestore.getDoc(firestore.doc(persistence.db, 'monster_siege_progress', user.uid));
        persistence.saved = snapshot.exists() ? snapshot.data() : null;
        ui.saveStatus.textContent = persistence.saved
          ? `Saved run found: Wave ${persistence.saved.wave}, Level ${persistence.saved.level}.`
          : 'Signed in. Your run will save at each completed wave.';
        ui.continueButton.classList.toggle('hidden', !persistence.saved);
      } catch (error) {
        console.warn('Monster Siege persistence unavailable.', error);
        ui.saveStatus.textContent = 'Offline mode: progress will not be saved.';
      }
    })();
    return persistence.ready;
  }

  async function saveProgress(reason) {
    if (!state || !persistence.ready) return;
    await persistence.ready;
    const user = persistence.auth?.currentUser;
    if (!user || !persistence.firestore) return;
    try {
      const data = { ...checkpointData(), reason, updatedAt: persistence.firestore.serverTimestamp() };
      await persistence.firestore.setDoc(
        persistence.firestore.doc(persistence.db, 'monster_siege_progress', user.uid),
        data
      );
      persistence.saved = { ...checkpointData(), reason };
      ui.saveStatus.textContent = `Progress saved at Wave ${state.wave}, Level ${state.level}.`;
    } catch (error) {
      console.warn('Unable to save Monster Siege progress.', error);
    }
  }

  async function clearSavedProgress() {
    await persistence.ready;
    const user = persistence.auth?.currentUser;
    if (!user || !persistence.firestore) return;
    try {
      await persistence.firestore.deleteDoc(
        persistence.firestore.doc(persistence.db, 'monster_siege_progress', user.uid)
      );
      persistence.saved = null;
      ui.continueButton.classList.add('hidden');
      ui.resumeAfterDeath.classList.add('hidden');
    } catch (error) {
      console.warn('Unable to clear Monster Siege progress.', error);
    }
  }

  function endGame(won) {
    state.active = false;
    state.won = won;
    state.paused = false;
    ui.shop.classList.add('hidden');
    if (won) {
      ui.endEyebrow.textContent = 'NIGHTBROKEN';
      ui.endTitle.textContent = 'The siege is over.';
      ui.final.textContent = `Cleared all ${FINAL_WAVE} waves · Level ${MAX_LEVEL} · ${String(state.score).padStart(6, '0')} points · ${state.essence} essence left`;
      ui.resumeAfterDeath.classList.add('hidden');
      playTone(520, 0.15, 'sine', 0.06);
      setTimeout(() => playTone(780, 0.2, 'sine', 0.05), 120);
      clearSavedProgress();
    } else {
      ui.endEyebrow.textContent = 'SIGNAL LOST';
      ui.endTitle.textContent = 'They broke the line.';
      ui.final.textContent = `Wave ${state.wave} · Level ${state.level} · ${String(state.score).padStart(6, '0')} points · ${state.essence} essence harvested`;
      ui.resumeAfterDeath.classList.toggle('hidden', !persistence.saved);
    }
    ui.over.classList.remove('hidden');
  }

  function openShop() {
    state.paused = true;
    state.awaitingShop = true;
    ui.shopEssence.textContent = `Essence: ${state.essence}`;
    ui.shopOptions.innerHTML = '';
    shopCatalog.forEach((item) => {
      const owned = state.upgrades[item.id] || 0;
      const atCap = item.id !== 'heal' && owned >= item.max;
      const canBuy = !atCap && state.essence >= item.cost;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'shop-card';
      button.disabled = !canBuy;
      const levelLabel = item.id === 'heal' ? '' : ` · Lv ${owned}/${item.max}`;
      button.innerHTML = `<div><strong>${item.name}${levelLabel}</strong><span>${item.desc}</span></div><div class="price">${item.cost} ✦</div>`;
      button.addEventListener('click', () => buyUpgrade(item.id));
      ui.shopOptions.appendChild(button);
    });
    ui.shop.classList.remove('hidden');
  }

  function buyUpgrade(id) {
    const item = shopCatalog.find((entry) => entry.id === id);
    if (!item || !state.awaitingShop) return;
    const owned = state.upgrades[id] || 0;
    if (id !== 'heal' && owned >= item.max) return;
    if (state.essence < item.cost) return;
    state.essence -= item.cost;
    if (id === 'heal') {
      state.health = Math.min(state.maxHealth, state.health + 40);
    } else {
      state.upgrades[id] = owned + 1;
      if (id === 'maxhp') {
        state.maxHealth = maxHealthFor(state.upgrades);
        state.health = Math.min(state.maxHealth, state.health + 25);
      }
    }
    playTone(640, 0.07, 'sine', 0.05);
    updateUi();
    openShop();
  }

  function closeShopAndContinue() {
    if (!state?.awaitingShop) return;
    state.awaitingShop = false;
    state.paused = false;
    ui.shop.classList.add('hidden');
    state.wave++;
    const previousLevel = state.level;
    state.level = levelForWave(state.wave);
    state.spawnLeft = 4 + state.wave * 2 + (state.level - 1);
    state.spawnTimer = 0.35;
    state.waveCooldown = 0;
    announceWave();
    saveProgress(state.level > previousLevel ? 'level-up' : 'wave');
  }

  function update(dt) {
    const p = state.player;
    const target = touchAim && state.enemies.length
      ? state.enemies.reduce((nearest, enemy) => (distance(enemy, p) < distance(nearest, p) ? enemy : nearest), state.enemies[0])
      : null;
    p.angle = target ? Math.atan2(target.y - p.y, target.x - p.x) : Math.atan2(mouse.y - p.y, mouse.x - p.x);
    p.fireTimer -= dt;
    p.invulnerable -= dt;
    p.dashCd = Math.max(0, p.dashCd - dt);
    state.shake *= 0.9;

    if (mouse.down) fire();

    if (p.dashTimer > 0) {
      p.dashTimer -= dt;
      p.x = Math.max(24, Math.min(state.w - 24, p.x + p.dashVx * dt));
      p.y = Math.max(24, Math.min(state.h - 24, p.y + p.dashVy * dt));
    } else {
      let dx = (keys.has('d') || keys.has('arrowright') ? 1 : 0) - (keys.has('a') || keys.has('arrowleft') ? 1 : 0);
      let dy = (keys.has('s') || keys.has('arrowdown') ? 1 : 0) - (keys.has('w') || keys.has('arrowup') ? 1 : 0);
      if (touchMove.active) {
        dx += touchMove.x;
        dy += touchMove.y;
      }
      const magnitude = Math.hypot(dx, dy) || 1;
      p.x = Math.max(24, Math.min(state.w - 24, p.x + (dx / magnitude) * 230 * dt));
      p.y = Math.max(24, Math.min(state.h - 24, p.y + (dy / magnitude) * 230 * dt));
    }

    if (state.spawnLeft > 0) {
      state.spawnTimer -= dt;
      if (state.spawnTimer <= 0) {
        spawnEnemy();
        state.spawnLeft--;
        state.spawnTimer = Math.max(0.11, 0.7 - state.wave * 0.025 - (state.level - 1) * 0.025);
      }
    } else if (!state.enemies.length && !state.enemyShots.length) {
      state.waveCooldown += dt;
      if (state.waveCooldown > 1.0 && !state.awaitingShop) {
        if (state.wave >= FINAL_WAVE) {
          endGame(true);
          return;
        }
        openShop();
      }
    }

    state.bullets.forEach((b) => {
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.life -= dt;
    });
    state.bullets = state.bullets.filter((b) => b.life > 0 && b.x > -20 && b.x < state.w + 20 && b.y > -20 && b.y < state.h + 20);

    state.enemyShots.forEach((shot) => {
      shot.x += shot.vx * dt;
      shot.y += shot.vy * dt;
      shot.life -= dt;
      if (distance(shot, p) < p.r + 5) {
        shot.life = 0;
        damagePlayer(shot.damage);
      }
    });
    state.enemyShots = state.enemyShots.filter((shot) => shot.life > 0 && shot.x > -30 && shot.x < state.w + 30 && shot.y > -30 && shot.y < state.h + 30);

    state.enemies.forEach((e) => {
      const angle = Math.atan2(p.y - e.y, p.x - e.x);
      const keepDistance = e.ranged ? distance(e, p) < 180 : false;
      const dir = keepDistance ? -1 : 1;
      e.x += Math.cos(angle) * e.speed * (1 + state.wave * 0.012) * dir * dt;
      e.y += Math.sin(angle) * e.speed * (1 + state.wave * 0.012) * dir * dt;
      e.hit -= dt;
      if (e.ranged) {
        e.shootTimer -= dt;
        if (e.shootTimer <= 0 && distance(e, p) < 320) {
          e.shootTimer = rand(1.2, 2.1);
          const shotAngle = Math.atan2(p.y - e.y, p.x - e.x);
          state.enemyShots.push({
            x: e.x,
            y: e.y,
            vx: Math.cos(shotAngle) * 220,
            vy: Math.sin(shotAngle) * 220,
            life: 2.4,
            damage: e.damage * 0.7
          });
        }
      }
      if (distance(e, p) < e.size + p.r) damagePlayer(e.damage);
    });

    state.bullets.forEach((b) => {
      state.enemies.forEach((e) => {
        if (distance(b, e) < e.size + 4 && b.life > 0) {
          b.life = 0;
          e.hp -= b.damage || 1;
          e.hit = 0.1;
          if (e.hp <= 0) killEnemy(e);
        }
      });
    });
    state.enemies = state.enemies.filter((e) => e.hp > 0);

    state.drops.forEach((d) => {
      d.life -= dt;
      d.spin += dt * 4;
      if (distance(d, p) < 26) {
        d.life = 0;
        state.health = Math.min(state.maxHealth, state.health + 10);
        playTone(880, 0.05, 'sine', 0.035);
      }
    });
    state.drops = state.drops.filter((d) => d.life > 0);
    state.particles.forEach((x) => {
      x.x += x.vx * dt;
      x.y += x.vy * dt;
      x.life -= dt;
    });
    state.particles = state.particles.filter((x) => x.life > 0);
    updateUi();
  }

  function draw() {
    const w = state.w;
    const h = state.h;
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(rand(-state.shake, state.shake), rand(-state.shake, state.shake));
    ctx.fillStyle = '#0c1719';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(153, 208, 183, .07)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 44) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 44) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    state.drops.forEach((d) => {
      ctx.save();
      ctx.translate(d.x, d.y);
      ctx.rotate(d.spin);
      ctx.fillStyle = '#d4ff3f';
      ctx.shadowColor = '#d4ff3f';
      ctx.shadowBlur = 14;
      ctx.fillRect(-6, -6, 12, 12);
      ctx.restore();
    });

    state.particles.forEach((x) => {
      ctx.globalAlpha = Math.max(0, x.life * 2);
      ctx.fillStyle = x.color;
      ctx.beginPath();
      ctx.arc(x.x, x.y, x.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    state.enemyShots.forEach((shot) => {
      ctx.fillStyle = '#5ec8ff';
      ctx.shadowColor = '#5ec8ff';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(shot.x, shot.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    state.bullets.forEach((b) => {
      ctx.strokeStyle = '#f5ffb0';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(b.x - b.vx * 0.025, b.y - b.vy * 0.025);
      ctx.stroke();
    });

    state.enemies.forEach((e) => {
      ctx.save();
      ctx.translate(e.x, e.y);
      ctx.rotate(Math.atan2(state.player.y - e.y, state.player.x - e.x));
      ctx.fillStyle = e.hit > 0 ? '#fff' : e.color;
      ctx.shadowColor = e.color;
      ctx.shadowBlur = e.name === 'brute' ? 18 : 10;
      ctx.beginPath();
      ctx.arc(0, 0, e.size, 0, Math.PI * 2);
      ctx.fill();
      if (e.ranged) {
        ctx.strokeStyle = 'rgba(255,255,255,.35)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, e.size + 4, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = '#101719';
      ctx.fillRect(e.size * 0.1, -e.size * 0.42, 4, 4);
      ctx.fillRect(e.size * 0.1, e.size * 0.18, 4, 4);
      if (e.maxHp > 1) {
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#172124';
        ctx.fillRect(-e.size, -e.size - 9, e.size * 2, 3);
        ctx.fillStyle = '#ff8c42';
        ctx.fillRect(-e.size, -e.size - 9, e.size * 2 * (e.hp / e.maxHp), 3);
      }
      ctx.restore();
    });

    const p = state.player;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.globalAlpha = p.invulnerable > 0 && Math.floor(p.invulnerable * 14) % 2 ? 0.4 : 1;
    ctx.fillStyle = p.dashTimer > 0 ? '#9fffd7' : '#d4ff3f';
    ctx.shadowColor = '#d4ff3f';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(0, 0, p.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#112022';
    ctx.fillRect(5, -4, 20, 8);
    ctx.restore();
    ctx.restore();

    if (p.dashCd > 0) {
      const dashBtn = document.getElementById('touch-dash');
      if (dashBtn) dashBtn.classList.add('cooling');
    } else {
      const dashBtn = document.getElementById('touch-dash');
      if (dashBtn) dashBtn.classList.remove('cooling');
    }
  }

  function loop(time) {
    const dt = Math.min(0.033, (time - lastTime) / 1000 || 0);
    lastTime = time;
    if (state?.active && !state.paused) update(dt);
    if (state) draw();
    animationId = requestAnimationFrame(loop);
  }

  function start(saved = null) {
    ui.start.classList.add('hidden');
    ui.over.classList.add('hidden');
    ui.shop.classList.add('hidden');
    ui.resumeAfterDeath.classList.add('hidden');
    reset(saved);
    cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(loop);
    saveProgress('start');
  }

  async function startNewRun() {
    ensureAudio()?.resume?.();
    await clearSavedProgress();
    start();
  }

  function continueRun() {
    ensureAudio()?.resume?.();
    if (persistence.saved) start(persistence.saved);
  }

  function pointerPosition(event) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
  }

  function setJoystick(event) {
    const stick = document.getElementById('joystick');
    const knob = document.getElementById('joystick-knob');
    const rect = stick.getBoundingClientRect();
    const max = 35;
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    const length = Math.min(max, Math.hypot(x, y));
    const angle = Math.atan2(y, x);
    touchMove.x = (Math.cos(angle) * length) / max;
    touchMove.y = (Math.sin(angle) * length) / max;
    knob.style.transform = `translate(${touchMove.x * max}px, ${touchMove.y * max}px)`;
    touchMove.active = true;
  }

  function releaseJoystick() {
    touchMove.active = false;
    touchMove.x = 0;
    touchMove.y = 0;
    document.getElementById('joystick-knob').style.transform = '';
  }

  async function toggleFullscreen() {
    const root = document.documentElement;
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      const request = root.requestFullscreen || root.webkitRequestFullscreen;
      if (request) await request.call(root);
    } else {
      const exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit) await exit.call(document);
    }
  }

  function updateFullscreenLabel() {
    const fullscreen = document.fullscreenElement || document.webkitFullscreenElement;
    document.querySelector('#fullscreen-button span').textContent = fullscreen ? 'EXIT FULLSCREEN' : 'FULLSCREEN';
  }

  const joystick = document.getElementById('joystick');
  joystick.addEventListener('pointerdown', (event) => {
    if (event.isPrimary) joystick.setPointerCapture(event.pointerId);
    setJoystick(event);
  });
  joystick.addEventListener('pointermove', (event) => {
    if (touchMove.active) setJoystick(event);
  });
  joystick.addEventListener('pointerup', releaseJoystick);
  joystick.addEventListener('pointercancel', releaseJoystick);

  const touchFire = document.getElementById('touch-fire');
  touchFire.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    if (event.isPrimary) touchFire.setPointerCapture(event.pointerId);
    touchAim = true;
    mouse.down = true;
  });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((name) => {
    touchFire.addEventListener(name, () => {
      touchAim = false;
      mouse.down = false;
    });
  });

  const touchDash = document.getElementById('touch-dash');
  touchDash.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    tryDash();
  });

  document.getElementById('fullscreen-button').addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', updateFullscreenLabel);
  document.addEventListener('webkitfullscreenchange', updateFullscreenLabel);
  document.getElementById('start-button').addEventListener('click', startNewRun);
  ui.continueButton.addEventListener('click', continueRun);
  document.getElementById('restart-button').addEventListener('click', startNewRun);
  ui.resumeAfterDeath.addEventListener('click', continueRun);
  document.getElementById('shop-continue').addEventListener('click', closeShopAndContinue);

  window.addEventListener('resize', resize);
  window.addEventListener('keydown', (event) => {
    keys.add(event.key.toLowerCase());
    const key = event.key.toLowerCase();
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' ', 'shift'].includes(key)) {
      event.preventDefault();
    }
    if (key === ' ' || key === 'shift') tryDash();
  });
  window.addEventListener('keyup', (event) => keys.delete(event.key.toLowerCase()));
  canvas.addEventListener('pointermove', pointerPosition);
  canvas.addEventListener('pointerdown', (event) => {
    pointerPosition(event);
    mouse.down = true;
    canvas.setPointerCapture(event.pointerId);
    ensureAudio()?.resume?.();
  });
  canvas.addEventListener('pointerup', () => {
    mouse.down = false;
  });

  resize();
  initPersistence();
})();
