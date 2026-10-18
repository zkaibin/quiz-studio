(function () {
  'use strict';

  // ---------- Constants ----------
  var SEG = 5;                 // segment length (m)
  var TRACK_SEGS = 2400;       // 12 km loop
  var TRACK_LEN = SEG * TRACK_SEGS;
  var DRAW = 170;              // draw distance in segments
  var HALF_ROAD = 6;           // metres, 3 lanes of 4 m
  var LANES = [-4, 0, 4];
  var CAM_DEPTH = 1.0;
  var ZONE_LEN = 1500;
  var LIMITS = [80, 60, 100, 120, 50, 90];
  var G = 9.81;
  var CAR = { mass: 1300, tmax: 260, radius: 0.32, final: 3.4, eff: 0.9, idle: 900, redline: 7000,
              ratios: [3.6, 2.2, 1.5, 1.1, 0.9, 0.75], reverse: 3.2, wheelbase: 2.7, cdA: 0.7 };
  var GARAGE_CARS = {
    sedan: { name: 'City Sedan', cost: 0, color: '#1e88e5', mass: 1300, power: 1, handling: 1, armor: 1, topSpeed: 85 },
    sport: { name: 'Sport Coupe', cost: 900, color: '#e53935', mass: 1180, power: 1.2, handling: 1.12, armor: 0.9, topSpeed: 93 },
    utility: { name: 'Utility SUV', cost: 1400, color: '#43a047', mass: 1650, power: 1.08, handling: 0.9, armor: 1.3, topSpeed: 82 }
  };
  var UPGRADE_COSTS = { engine: [250, 450, 700], handling: [200, 350, 550], armor: [225, 400, 625] };
  var UPGRADE_LABELS = { engine: 'Engine', handling: 'Handling', armor: 'Armor' };
  var GARAGE_KEY = 'realDriveGarage';
  var TRAFFIC_COUNT = { low: 10, medium: 20, high: 32 };
  var TRAFFIC_COLORS = ['#c62828', '#1565c0', '#2e7d32', '#f9a825', '#6a1b9a', '#eceff1', '#37474f', '#ef6c00'];

  // ---------- DOM ----------
  var canvas = document.getElementById('ds-canvas');
  var ctx = canvas.getContext('2d');
  var stage = document.getElementById('ds-stage');
  var menu = document.getElementById('ds-menu');
  var overScreen = document.getElementById('ds-over');
  var pauseScreen = document.getElementById('ds-pause');
  var garagePoints = document.getElementById('ds-points');
  var garageStatus = document.getElementById('ds-garage-status');
  var garageCarButtons = document.querySelectorAll('[data-car]');
  var garageUpgradeButtons = document.querySelectorAll('[data-upgrade]');
  var W = 0, H = 0;

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = stage.clientWidth; H = stage.clientHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  // ---------- Seeded RNG & track ----------
  var seed = 1337;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

  var segs = [];
  (function buildTrack() {
    for (var i = 0; i < TRACK_SEGS; i++) segs.push({ curve: 0, deco: null });
    var pos = 0;
    function ease(a, b, t) { return a + (b - a) * (-Math.cos(t * Math.PI) / 2 + 0.5); }
    function add(enter, hold, leave, curve) {
      var total = enter + hold + leave;
      for (var n = 0; n < total && pos < TRACK_SEGS; n++, pos++) {
        var c;
        if (n < enter) c = ease(0, curve, n / enter);
        else if (n < enter + hold) c = curve;
        else c = ease(curve, 0, (n - enter - hold) / leave);
        segs[pos].curve = c;
      }
    }
    while (pos < TRACK_SEGS - 120) {
      var dir = rnd() < 0.5 ? -1 : 1;
      add(20 + (rnd() * 30 | 0), 15 + (rnd() * 70 | 0), 20 + (rnd() * 30 | 0), dir * (0.008 + rnd() * 0.03));
      add(10, 60 + (rnd() * 120 | 0), 10, 0);
    }
    for (var i = 0; i < TRACK_SEGS; i++) {
      if (i % 4 === 0 && rnd() < 0.8) {
        segs[i].deco = { side: rnd() < 0.5 ? -1 : 1, off: 9 + rnd() * 22, type: rnd() < 0.75 ? 'tree' : 'post', s: 0.8 + rnd() * 0.8 };
      }
      if (i % (ZONE_LEN / SEG) === 0) segs[i].deco = { side: 1, off: 7.5, type: 'limit', zone: i / (ZONE_LEN / SEG) };
    }
  })();

  function wrap(v, len) { return ((v % len) + len) % len; }
  function relDist(z, ref) { var d = wrap(z - ref, TRACK_LEN); return d > TRACK_LEN / 2 ? d - TRACK_LEN : d; }
  function zoneIndex(z) { return Math.floor(wrap(z, TRACK_LEN) / ZONE_LEN); }
  function limitAt(z) { return LIMITS[zoneIndex(z) % LIMITS.length]; }
  function segAt(z) { return segs[Math.floor(wrap(z, TRACK_LEN) / SEG) % TRACK_SEGS]; }

  // ---------- State ----------
  var settings = { gearbox: 'auto', traffic: 'medium' };
  var state = 'menu';
  function loadGarage() {
    try {
      var saved = JSON.parse(localStorage.getItem(GARAGE_KEY) || '{}');
      var ownedCars = ['sedan'];
      if (Array.isArray(saved.ownedCars)) {
        saved.ownedCars.forEach(function (car) {
          if (GARAGE_CARS[car] && ownedCars.indexOf(car) === -1) ownedCars.push(car);
        });
      }
      var upgrades = {};
      Object.keys(UPGRADE_COSTS).forEach(function (key) {
        var level = Number(saved.upgrades && saved.upgrades[key]);
        upgrades[key] = Number.isFinite(level) ? Math.max(0, Math.min(UPGRADE_COSTS[key].length, Math.floor(level))) : 0;
      });
      return {
        points: Number.isFinite(Number(saved.points)) ? Math.max(0, Math.floor(Number(saved.points))) : 0,
        ownedCars: ownedCars,
        selectedCar: ownedCars.indexOf(saved.selectedCar) !== -1 ? saved.selectedCar : 'sedan',
        upgrades: upgrades
      };
    } catch (e) {
      return { points: 0, ownedCars: ['sedan'], selectedCar: 'sedan', upgrades: { engine: 0, handling: 0, armor: 0 } };
    }
  }
  var garage = loadGarage();
  var best = 0;
  try { best = parseInt(localStorage.getItem('realDriveBest') || '0', 10) || 0; } catch (e) { /* storage unavailable */ }
  var player, traffic, keys = {}, touch = {}, msgs = [], shake = 0, flash = 0;
  var camMode = 0, lightsOn = false, soundOn = true, hornOn = false, bgOffset = 0;

  function reset() {
    player = { z: 0, x: 0, h: 0, v: 0, gear: 1, rpm: CAR.idle, shiftT: 0, steer: 0, damage: 0, dist: 0,
               score: 0, fines: 0, nearMiss: 0, brake: false, hitCd: 0, reversing: false, offroad: false, time: 0 };
    traffic = [];
    var n = TRAFFIC_COUNT[settings.traffic];
    for (var i = 0; i < n; i++) traffic.push(spawnCar({}, 80 + (i / n) * 900));
    msgs = [];
  }

  function spawnCar(c, ahead) {
    for (var tries = 0; tries < 6; tries++) {
      var lane = LANES[Math.random() * 3 | 0];
      var z = player.z + ahead + tries * 40;
      var clear = true;
      for (var j = 0; j < traffic.length; j++) {
        var o = traffic[j];
        if (o !== c && o.x === lane && Math.abs(relDist(o.z, z)) < 35) { clear = false; break; }
      }
      if (clear) {
        c.z = wrap(z, TRACK_LEN); c.x = lane; c.base = 14 + Math.random() * 14; c.v = c.base;
        c.color = TRAFFIC_COLORS[Math.random() * TRAFFIC_COLORS.length | 0];
        c.truck = Math.random() < 0.15; c.passed = false;
        return c;
      }
    }
    c.z = wrap(player.z + ahead + 300, TRACK_LEN); c.x = LANES[1]; c.base = 20; c.v = 20;
    c.color = '#eceff1'; c.truck = false; c.passed = false;
    return c;
  }

  function say(text, color) { msgs.push({ text: text, color: color || '#fff', t: 2.2 }); if (msgs.length > 3) msgs.shift(); }

  // ---------- Audio ----------
  var audio = null;
  function initAudio() {
    if (audio || !(window.AudioContext || window.webkitAudioContext)) return;
    try {
      var ac = new (window.AudioContext || window.webkitAudioContext)();
      var o1 = ac.createOscillator(), o2 = ac.createOscillator(), g = ac.createGain(), f = ac.createBiquadFilter();
      o1.type = 'sawtooth'; o2.type = 'square'; f.type = 'lowpass'; f.frequency.value = 700; g.gain.value = 0;
      o1.connect(f); o2.connect(f); f.connect(g); g.connect(ac.destination);
      o1.start(); o2.start();
      var horn = ac.createOscillator(), hg = ac.createGain();
      horn.type = 'square'; horn.frequency.value = 420; hg.gain.value = 0; horn.connect(hg); hg.connect(ac.destination); horn.start();
      audio = { ac: ac, o1: o1, o2: o2, g: g, f: f, hg: hg };
    } catch (e) { audio = null; }
  }
  function updateAudio(throttle) {
    if (!audio) return;
    var on = soundOn && state === 'playing';
    var fq = 30 + player.rpm / 60 * 1.0;
    audio.o1.frequency.value = fq; audio.o2.frequency.value = fq * 0.5;
    audio.f.frequency.value = 500 + player.rpm * 0.25;
    audio.g.gain.value = on ? 0.05 + 0.05 * throttle : 0;
    audio.hg.gain.value = on && hornOn ? 0.08 : 0;
  }
  function beep() {
    if (!audio || !soundOn) return;
    var o = audio.ac.createOscillator(), g = audio.ac.createGain();
    o.frequency.value = 160; o.type = 'sawtooth'; g.gain.value = 0.15;
    g.gain.exponentialRampToValueAtTime(0.001, audio.ac.currentTime + 0.3);
    o.connect(g); g.connect(audio.ac.destination); o.start(); o.stop(audio.ac.currentTime + 0.3);
  }

  // ---------- Input ----------
  var KEYMAP = { ArrowUp: 'up', w: 'up', ArrowDown: 'down', s: 'down', ArrowLeft: 'left', a: 'left',
                 ArrowRight: 'right', d: 'right', ' ': 'hand' };
  window.addEventListener('keydown', function (e) {
    var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (KEYMAP[k]) { keys[KEYMAP[k]] = true; if (state === 'playing') e.preventDefault(); }
    if (e.repeat) return;
    if (k === 'p' || k === 'Escape') togglePause();
    if (state !== 'playing') return;
    if (k === 'c') camMode = (camMode + 1) % 2;
    if (k === 'l') lightsOn = !lightsOn;
    if (k === 'm') soundOn = !soundOn;
    if (k === 'h') hornOn = true;
    if (settings.gearbox === 'manual' && player.shiftT <= 0) {
      if (k === 'e' && player.gear < 6) { player.gear++; player.shiftT = 0.25; }
      if (k === 'q' && player.gear > 1) { player.gear--; player.shiftT = 0.2; }
    }
  });
  window.addEventListener('keyup', function (e) {
    var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (KEYMAP[k]) keys[KEYMAP[k]] = false;
    if (k === 'h') hornOn = false;
  });
  window.addEventListener('blur', function () { keys = {}; touch = {}; if (state === 'playing') togglePause(); });

  function bindTouch(id, name) {
    var el = document.getElementById(id);
    function on(e) { e.preventDefault(); touch[name] = true; el.classList.add('down'); }
    function off(e) { e.preventDefault(); touch[name] = false; el.classList.remove('down'); }
    el.addEventListener('pointerdown', on);
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (ev) { el.addEventListener(ev, off); });
  }
  bindTouch('t-left', 'left'); bindTouch('t-right', 'right'); bindTouch('t-gas', 'up'); bindTouch('t-brake', 'down');

  // Touch devices (iOS Safari/Chrome may not match pointer: coarse in every mode)
  var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) ||
    (window.matchMedia && window.matchMedia('(pointer: coarse), (hover: none)').matches);
  if (isTouchDevice) document.body.classList.add('ds-touch-enabled');

  var tiltOn = false, tiltAxis = 0, tiltBtn = document.getElementById('t-tilt');
  function onTilt(e) {
    var ang = (screen.orientation && typeof screen.orientation.angle === 'number') ? screen.orientation.angle : (window.orientation || 0);
    var v;
    if (typeof e.gamma === 'number' && typeof e.beta === 'number') {
      // tilt the phone like a steering wheel (landscape: beta carries the roll)
      if (ang === 90) v = e.beta; else if (ang === 270 || ang === -90) v = -e.beta; else v = e.gamma;
    } else return;
    tiltAxis = Math.max(-1, Math.min(1, v / 25));
    if (Math.abs(tiltAxis) < 0.08) tiltAxis = 0;
  }
  function setTilt(on) {
    tiltOn = on; tiltAxis = 0;
    tiltBtn.textContent = '📱 TILT: ' + (on ? 'ON' : 'OFF');
    tiltBtn.classList.toggle('on', on); tiltBtn.setAttribute('aria-pressed', on);
    if (on) window.addEventListener('deviceorientation', onTilt);
    else window.removeEventListener('deviceorientation', onTilt);
  }
  tiltBtn.addEventListener('click', function () {
    if (tiltOn) { setTilt(false); return; }
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      // iOS 13+: must be requested from a user gesture
      DeviceOrientationEvent.requestPermission().then(function (r) {
        if (r === 'granted') setTilt(true); else tiltBtn.textContent = '📱 TILT: DENIED';
      }).catch(function () { tiltBtn.textContent = '📱 TILT: N/A'; });
    } else if ('DeviceOrientationEvent' in window) setTilt(true);
    else tiltBtn.textContent = '📱 TILT: N/A';
  });
  ['click'].forEach(function (ev) {
    document.getElementById('t-camera').addEventListener(ev, function () { camMode = (camMode + 1) % 2; });
  });

  function bindChips(attr, key) {
    var chips = document.querySelectorAll('[data-' + attr + ']');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        settings[key] = chip.getAttribute('data-' + attr);
        chips.forEach(function (c) { var a = c === chip; c.classList.toggle('active', a); c.setAttribute('aria-pressed', a); });
      });
    });
  }
  bindChips('gearbox', 'gearbox'); bindChips('traffic', 'traffic');

  function saveGarage() {
    try { localStorage.setItem(GARAGE_KEY, JSON.stringify(garage)); } catch (e) { /* storage unavailable */ }
  }
  function updateGarageUI() {
    garagePoints.textContent = String(garage.points);
    garageCarButtons.forEach(function (button) {
      var key = button.getAttribute('data-car'), car = GARAGE_CARS[key];
      var owned = garage.ownedCars.indexOf(key) !== -1;
      var selected = garage.selectedCar === key;
      button.textContent = car.name + (selected ? ' · Selected' : owned ? ' · Select' : ' · ' + car.cost + ' pts');
      button.classList.toggle('active', selected);
      button.disabled = selected;
      button.setAttribute('aria-pressed', String(selected));
    });
    garageUpgradeButtons.forEach(function (button) {
      var key = button.getAttribute('data-upgrade'), level = garage.upgrades[key];
      var costs = UPGRADE_COSTS[key], maxed = level >= costs.length, cost = maxed ? 0 : costs[level];
      button.textContent = maxed ? UPGRADE_LABELS[key] + ' L' + level + ' · MAX' :
        UPGRADE_LABELS[key] + ' L' + level + ' · ' + cost + ' pts';
      button.disabled = maxed || garage.points < cost;
      button.classList.toggle('affordable', !maxed && garage.points >= cost);
      button.title = maxed ? 'Maximum upgrade reached' : garage.points >= cost ? '' : 'Need ' + cost + ' points';
    });
  }
  garageCarButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var key = button.getAttribute('data-car'), car = GARAGE_CARS[key];
      if (!car || garage.selectedCar === key) return;
      if (garage.ownedCars.indexOf(key) === -1) {
        if (garage.points < car.cost) {
          garageStatus.textContent = 'You need ' + car.cost + ' points to unlock the ' + car.name + '.';
          return;
        }
        garage.points -= car.cost;
        garage.ownedCars.push(key);
      }
      garage.selectedCar = key;
      garageStatus.textContent = car.name + ' selected. Your upgrades apply to every car.';
      saveGarage();
      updateGarageUI();
    });
  });
  garageUpgradeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var key = button.getAttribute('data-upgrade'), level = garage.upgrades[key], costs = UPGRADE_COSTS[key];
      if (!costs || level >= costs.length || garage.points < costs[level]) return;
      garage.points -= costs[level];
      garage.upgrades[key] = level + 1;
      garageStatus.textContent = UPGRADE_LABELS[key] + ' upgraded to level ' + garage.upgrades[key] + '.';
      saveGarage();
      updateGarageUI();
    });
  });
  updateGarageUI();

  function startGame() {
    initAudio();
    if (audio && audio.ac.state === 'suspended') audio.ac.resume();
    reset();
    menu.classList.add('ds-hidden'); overScreen.classList.add('ds-hidden'); pauseScreen.classList.add('ds-hidden');
    state = 'playing';
  }
  function togglePause() {
    if (state === 'playing') { state = 'paused'; pauseScreen.classList.remove('ds-hidden'); }
    else if (state === 'paused') { state = 'playing'; pauseScreen.classList.add('ds-hidden'); }
  }
  document.getElementById('ds-start').addEventListener('click', startGame);
  document.getElementById('ds-restart').addEventListener('click', startGame);
  document.getElementById('ds-resume').addEventListener('click', togglePause);
  document.getElementById('ds-garage-return').addEventListener('click', function () {
    overScreen.classList.add('ds-hidden');
    menu.classList.remove('ds-hidden');
    state = 'menu';
    updateGarageUI();
  });

  function endGame() {
    state = 'over';
    var total = Math.max(0, Math.round(player.score));
    garage.points += total;
    saveGarage();
    updateGarageUI();
    if (total > best) { best = total; try { localStorage.setItem('realDriveBest', String(best)); } catch (e) { /* ignore */ } }
    document.getElementById('ds-summary').textContent =
      'Distance ' + (player.dist / 1000).toFixed(2) + ' km · Score ' + total + ' · Near misses ' + player.nearMiss +
      ' · Fines $' + player.fines + ' · +' + total + ' points · Garage ' + garage.points + ' · Best ' + best;
    overScreen.classList.remove('ds-hidden');
    if (audio) audio.g.gain.value = 0;
  }

  // ---------- Simulation ----------
  function update(dt) {
    var p = player;
    var vehicle = GARAGE_CARS[garage.selectedCar];
    var engineLevel = garage.upgrades.engine, handlingLevel = garage.upgrades.handling;
    p.time += dt;
    var up = keys.up || touch.up, down = keys.down || touch.down;
    var left = keys.left || touch.left, right = keys.right || touch.right;
    var hand = keys.hand;
    var steerIn = (right ? 1 : 0) - (left ? 1 : 0);
    if (tiltOn && !steerIn) steerIn = tiltAxis;
    p.steer += (steerIn - p.steer) * Math.min(1, dt * (steerIn ? 5 : 8));

    var sign = p.v >= 0 ? 1 : -1;
    var reverse = down && !up && p.v < 0.5;
    var throttle = up ? 1 : 0;
    var brake = (down && !reverse) ? 1 : 0;
    p.brake = brake > 0 || hand;
    p.reversing = reverse && p.v <= 0.5;

    // gearbox
    var ratio = p.reversing ? CAR.reverse : CAR.ratios[p.gear - 1];
    var total = ratio * CAR.final;
    var wheelRpm = Math.abs(p.v) / CAR.radius * 60 / (2 * Math.PI) * total;
    var targetRpm = Math.max(CAR.idle, wheelRpm);
    if (throttle && wheelRpm < CAR.idle) targetRpm = CAR.idle + 1500 * throttle * (1 - wheelRpm / CAR.idle);
    p.rpm += (targetRpm - p.rpm) * Math.min(1, dt * 12);
    if (p.shiftT > 0) p.shiftT -= dt;
    if (settings.gearbox === 'auto' && p.shiftT <= 0 && !p.reversing) {
      if (wheelRpm > 6200 && p.gear < 6) { p.gear++; p.shiftT = 0.2; }
      else if (wheelRpm < 2300 && p.gear > 1) { p.gear--; p.shiftT = 0.15; }
    }

    // forces
    var force = 0;
    if ((throttle || reverse) && p.shiftT <= 0 && p.rpm < CAR.redline + 200) {
      var r = Math.max(p.rpm, CAR.idle);
      var torque = CAR.tmax * vehicle.power * (1 + engineLevel * 0.12) * Math.max(0.25, 1 - Math.pow((r - 4800) / 4500, 2));
      force = torque * total * CAR.eff / CAR.radius * (reverse ? 0.5 : throttle);
      force = Math.min(force, 0.95 * vehicle.mass * G);
      if (reverse) force = -force;
    }
    var v = p.v, av = Math.abs(v);
    var resist = 0.5 * 1.2 * CAR.cdA * av * av + 0.015 * vehicle.mass * G * (av > 0.05 ? 1 : 0);
    var accel = (force - sign * resist) / vehicle.mass;
    var decel = brake * 11 + (hand ? 6 : 0);
    p.offroad = Math.abs(p.x) > HALF_ROAD + 0.9;
    if (p.offroad) decel += 5 + av * 0.12;
    if (Math.abs(p.h) > 0.2 && av > 5) decel += (Math.abs(p.h) - 0.2) * 25;
    var nv = v + accel * dt;
    if (decel > 0) {
      var d = decel * dt;
      if (Math.abs(nv) <= d) nv = 0; else nv -= Math.sign(nv) * d;
    }
    p.v = Math.max(-8, Math.min(nv, vehicle.topSpeed + engineLevel * 2.5));
    av = Math.abs(p.v);

    // yaw / steering (kinematic bicycle with grip assist)
    var delta = p.steer * 0.45 * vehicle.handling * (1 + handlingLevel * 0.1) / (1 + av * 0.35);
    var yawRate = av * Math.tan(delta) / CAR.wheelbase * (p.v < 0 ? -1 : 1);
    if (hand && av > 8) yawRate *= 2.6;
    var kappa = segAt(p.z).curve / (SEG * SEG);
    p.h += (yawRate - p.v * kappa) * dt;
    p.h -= p.h * (hand ? 0.5 : 1.4) * dt;
    p.h = Math.max(-0.6, Math.min(0.6, p.h));
    p.x += p.v * Math.sin(p.h) * dt;
    var adv = p.v * Math.cos(p.h) * dt;
    p.z = wrap(p.z + adv, TRACK_LEN);
    if (adv > 0) p.dist += adv;
    p.score += adv > 0 ? adv * 0.1 : 0;
    bgOffset += kappa * p.v * dt * 900;

    // barrier
    if (Math.abs(p.x) > 14) {
      damage(Math.abs(p.v) * 1.1, 'BARRIER HIT');
      p.x = Math.sign(p.x) * 13; p.v *= 0.4; p.h = 0;
    }
    if (p.offroad && av > 5) shake = Math.max(shake, 0.25);

    // traffic
    p.hitCd -= dt;
    var c, i, j;
    for (i = 0; i < traffic.length; i++) {
      c = traffic[i];
      var ahead = null, nearest = 40;
      for (j = 0; j < traffic.length; j++) {
        if (j === i || traffic[j].x !== c.x) continue;
        var gap = relDist(traffic[j].z, c.z);
        if (gap > 0 && gap < nearest) { nearest = gap; ahead = traffic[j]; }
      }
      var target = c.base;
      if (ahead && nearest < 30) target = Math.min(target, ahead.v - (30 - nearest) * 0.2);
      c.v += (target - c.v) * Math.min(1, dt * 1.5);
      c.z = wrap(c.z + c.v * dt, TRACK_LEN);

      var rel = relDist(c.z, p.z);
      if (rel < -90 || rel > 950) { spawnCar(c, 500 + Math.random() * 400); continue; }
      var dx = Math.abs(c.x - p.x);
      var len = c.truck ? 5.5 : 4.4;
      if (Math.abs(rel) < len && dx < 1.9 && p.hitCd <= 0) {
        var rv = Math.abs(p.v - c.v);
        damage(rv * 1.3, 'COLLISION');
        p.hitCd = 0.7;
        if (rel > 0) { p.v = Math.min(p.v, c.v * 0.7); p.z = wrap(p.z - 1.5, TRACK_LEN); }
        else { p.v = Math.max(p.v, c.v * 1.1); }
        var dir = p.x >= c.x ? 1 : -1;
        p.x += dir * 0.6; p.h += dir * 0.15;
        c.v = Math.max(c.v * 0.6, 6);
      }
      if (!c.passed && rel < 0 && rel > -30 && p.v > 18) {
        c.passed = true;
        if (dx < 3.6 && dx > 1.9 && p.hitCd <= 0) {
          p.nearMiss++; p.score += 40; say('NEAR MISS +40', '#ffd54f');
        }
      } else if (rel > 30) c.passed = false;
    }

    // speed cameras at the start of every zone
    var zoneBefore = Math.floor(wrap(p.z - adv, TRACK_LEN) / ZONE_LEN);
    var zoneNow = Math.floor(p.z / ZONE_LEN);
    if (adv > 0 && p.hitCd <= 0 && zoneBefore !== zoneNow) {
      var kmh = p.v * 3.6, lim = LIMITS[zoneNow % LIMITS.length];
      var limPrev = LIMITS[zoneBefore % LIMITS.length];
      var allowed = Math.min(lim, limPrev);
      if (kmh > allowed + 5) {
        p.fines += 100; p.score -= 100; flash = 0.35;
        say('SPEED CAMERA −$100 (' + Math.round(kmh) + ' in ' + allowed + ')', '#ff5252');
      } else say('Zone limit: ' + lim + ' km/h', '#4fc3f7');
    }

    if (shake > 0) shake -= dt;
    if (flash > 0) flash -= dt;
    for (i = msgs.length - 1; i >= 0; i--) { msgs[i].t -= dt; if (msgs[i].t <= 0) msgs.splice(i, 1); }
    updateAudio(throttle);
    if (p.damage >= 100) endGame();
  }

  function damage(amount, label) {
    if (amount < 2) return;
    var vehicle = GARAGE_CARS[garage.selectedCar];
    var armorLevel = garage.upgrades.armor;
    player.damage = Math.min(100, player.damage + amount / (vehicle.armor * (1 + armorLevel * 0.15)));
    shake = 0.5; beep();
    say(label + ' −' + Math.round(amount) + '% integrity', '#ff8a65');
  }

  // ---------- Rendering ----------
  function lerp(a, b, t) { return a + (b - a) * t; }
  function mix(c1, c2, t) {
    return 'rgb(' + Math.round(lerp(c1[0], c2[0], t)) + ',' + Math.round(lerp(c1[1], c2[1], t)) + ',' + Math.round(lerp(c1[2], c2[2], t)) + ')';
  }
  function poly(x1, y1, w1, x2, y2, w2, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1 - w1, y1); ctx.lineTo(x2 - w2, y2); ctx.lineTo(x2 + w2, y2); ctx.lineTo(x1 + w1, y1);
    ctx.closePath(); ctx.fill();
  }
  function rrect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

  function darkness() {
    var t = (player ? player.dist : 0) / 9000;
    return Math.max(0, Math.min(1, 0.5 + 0.7 * Math.sin(t * Math.PI * 2 - 0.4)));
  }

  function drawCarRear(cx, by, w, color, brakeOn, lights) {
    var h = w * 0.72;
    ctx.fillStyle = 'rgba(0,0,0,.35)';
    ctx.beginPath(); ctx.ellipse(cx, by, w * 0.6, w * 0.08, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#111';
    ctx.fillRect(cx - w * 0.48, by - h * 0.3, w * 0.16, h * 0.3);
    ctx.fillRect(cx + w * 0.32, by - h * 0.3, w * 0.16, h * 0.3);
    ctx.fillStyle = color; rrect(cx - w / 2, by - h * 0.78, w, h * 0.55, w * 0.07); ctx.fill();
    ctx.fillStyle = color; rrect(cx - w * 0.38, by - h, w * 0.76, h * 0.36, w * 0.1); ctx.fill();
    ctx.fillStyle = 'rgba(15,25,40,.92)'; rrect(cx - w * 0.32, by - h * 0.95, w * 0.64, h * 0.26, w * 0.06); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(cx - w / 2, by - h * 0.36, w, h * 0.08);
    var tl = brakeOn ? '#ff1744' : (lights ? '#d50000' : '#8e1c1c');
    ctx.fillStyle = tl;
    ctx.fillRect(cx - w * 0.47, by - h * 0.62, w * 0.2, h * 0.1);
    ctx.fillRect(cx + w * 0.27, by - h * 0.62, w * 0.2, h * 0.1);
    if (brakeOn) {
      ctx.fillStyle = 'rgba(255,23,68,.35)';
      ctx.beginPath(); ctx.arc(cx - w * 0.37, by - h * 0.57, w * 0.14, 0, 7); ctx.arc(cx + w * 0.37, by - h * 0.57, w * 0.14, 0, 7); ctx.fill();
    }
    ctx.fillStyle = '#f5f5f5'; ctx.fillRect(cx - w * 0.12, by - h * 0.5, w * 0.24, h * 0.1);
  }

  function drawTruckRear(cx, by, w, color) {
    var h = w * 1.25;
    ctx.fillStyle = 'rgba(0,0,0,.35)';
    ctx.beginPath(); ctx.ellipse(cx, by, w * 0.6, w * 0.07, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#111'; ctx.fillRect(cx - w * 0.45, by - h * 0.18, w * 0.18, h * 0.18); ctx.fillRect(cx + w * 0.27, by - h * 0.18, w * 0.18, h * 0.18);
    ctx.fillStyle = color; ctx.fillRect(cx - w / 2, by - h, w, h * 0.82);
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(cx - w / 2, by - h * 0.55, w, h * 0.03);
    ctx.fillStyle = '#b71c1c'; ctx.fillRect(cx - w * 0.46, by - h * 0.3, w * 0.12, h * 0.07); ctx.fillRect(cx + w * 0.34, by - h * 0.3, w * 0.12, h * 0.07);
  }

  function project(wx, wy, wz, camX, camH, camZ) {
    var s = CAM_DEPTH / wz;
    return { s: s, x: Math.round(W / 2 + s * (wx - camX) * W / 2), y: Math.round(H / 2 + s * camH * H / 2) , w: s * W / 2 };
  }

  function render() {
    var p = player;
    var dark = darkness();
    var hood = camMode === 1;
    var camH = hood ? 1.15 : 2.0;
    var camZ = p.z - (hood ? -0.6 : 6.5);
    var camX = p.x;
    var horizon = H / 2;

    ctx.save();
    if (shake > 0) ctx.translate((Math.random() - 0.5) * 8 * shake, (Math.random() - 0.5) * 8 * shake);

    // sky
    var sky = ctx.createLinearGradient(0, 0, 0, horizon);
    sky.addColorStop(0, mix([40, 110, 200], [4, 8, 24], dark));
    sky.addColorStop(1, mix([180, 220, 250], [30, 40, 80], dark));
    ctx.fillStyle = sky; ctx.fillRect(-10, -10, W + 20, horizon + 12);
    if (dark > 0.4) {
      ctx.fillStyle = 'rgba(255,255,255,' + (dark - 0.4) + ')';
      for (var si = 0; si < 40; si++) ctx.fillRect((si * 977) % W, (si * 331) % (horizon * 0.8), 2, 2);
    }
    // hills (parallax)
    [[0.25, 0.012, 60, [90, 120, 150]], [0.45, 0.02, 40, [60, 100, 90]]].forEach(function (L, idx) {
      ctx.fillStyle = mix(L[3], [8, 14, 24], dark);
      ctx.beginPath(); ctx.moveTo(0, horizon + 2);
      for (var x = 0; x <= W; x += 20) {
        var o = (x + bgOffset * L[0] * (idx + 1)) * L[1];
        ctx.lineTo(x, horizon - L[2] * (0.6 + 0.4 * Math.sin(o) * Math.cos(o * 0.53 + idx)) - 6);
      }
      ctx.lineTo(W, horizon + 2); ctx.closePath(); ctx.fill();
    });

    // road
    var base = Math.floor(wrap(camZ, TRACK_LEN) / SEG);
    var percent = (wrap(camZ, TRACK_LEN) % SEG) / SEG;
    var dx = -(segs[base % TRACK_SEGS].curve * percent);
    var accX = 0, n, list = [];
    var near = 0.5;
    for (n = 0; n < DRAW; n++) {
      var idx = (base + n) % TRACK_SEGS, seg = segs[idx];
      var z1 = n * SEG - percent * SEG, z2 = z1 + SEG;
      var cx1 = accX - camX, cx2 = accX + dx - camX;
      accX += dx; dx += seg.curve;
      if (z1 < near) { list.push(null); continue; }
      var a = project(0, 0, z1, -cx1, camH), b = project(0, 0, z2, -cx2, camH);
      list.push({ a: a, b: b, seg: seg, idx: idx, n: n, z1: z1 });
    }
    for (n = 0; n < DRAW && !list[n]; n++);
    if (list[n]) {
      var f = list[n].a;
      ctx.fillStyle = mix([34, 139, 60], [6, 24, 14], dark); ctx.fillRect(0, f.y, W, H - f.y);
      poly(f.x, f.y, f.w * HALF_ROAD * 1.12, f.x, H, f.w * HALF_ROAD * 1.12, '#f5f5f5');
      poly(f.x, f.y, f.w * HALF_ROAD, f.x, H, f.w * HALF_ROAD, mix([82, 86, 94], [24, 26, 32], dark));
    }
    for (n = DRAW - 1; n >= 0; n--) {
      var it = list[n]; if (!it) continue;
      var alt = Math.floor(it.idx / 3) % 2 === 0;
      var a1 = it.a, b1 = it.b;
      if (b1.y >= a1.y) continue;
      ctx.fillStyle = alt ? mix([34, 139, 60], [6, 24, 14], dark) : mix([28, 124, 52], [5, 20, 12], dark);
      ctx.fillRect(0, b1.y, W, a1.y - b1.y + 1);
      var rw1 = a1.w * HALF_ROAD, rw2 = b1.w * HALF_ROAD;
      poly(a1.x, a1.y, rw1 * 1.12, b1.x, b1.y, rw2 * 1.12, alt ? '#d32f2f' : '#f5f5f5');
      poly(a1.x, a1.y, rw1, b1.x, b1.y, rw2, alt ? mix([88, 92, 100], [26, 28, 34], dark) : mix([82, 86, 94], [24, 26, 32], dark));
      poly(a1.x - rw1 * 0.93, a1.y, rw1 * 0.015, b1.x - rw2 * 0.93, b1.y, rw2 * 0.015, '#fff');
      poly(a1.x + rw1 * 0.93, a1.y, rw1 * 0.015, b1.x + rw2 * 0.93, b1.y, rw2 * 0.015, '#fff');
      if (Math.floor(it.idx / 4) % 2 === 0) {
        [-1 / 3, 1 / 3].forEach(function (f) {
          poly(a1.x + rw1 * f, a1.y, rw1 * 0.012, b1.x + rw2 * f, b1.y, rw2 * 0.012, '#ffeb3b');
        });
      }
      // sprites (far to near order preserved)
      var d = it.seg.deco;
      if (d) {
        var sx = a1.x + a1.w * d.side * d.off, sc = a1.w;
        ctx.globalAlpha = Math.min(1, (DRAW - n) / 30);
        if (d.type === 'tree') {
          var th = 7 * d.s * sc, tw = 0.5 * sc;
          ctx.fillStyle = mix([80, 50, 30], [10, 8, 6], dark); ctx.fillRect(sx - tw / 2, a1.y - th * 0.4, tw, th * 0.4);
          ctx.fillStyle = mix([20, 100, 40], [4, 20, 10], dark);
          ctx.beginPath(); ctx.moveTo(sx, a1.y - th); ctx.lineTo(sx + th * 0.28, a1.y - th * 0.3); ctx.lineTo(sx - th * 0.28, a1.y - th * 0.3); ctx.closePath(); ctx.fill();
        } else if (d.type === 'post') {
          ctx.fillStyle = '#9e9e9e'; ctx.fillRect(sx - 0.08 * sc, a1.y - 4 * sc, 0.16 * sc, 4 * sc);
          ctx.fillStyle = dark > 0.4 ? '#fff59d' : '#cfd8dc'; ctx.fillRect(sx - 0.6 * sc, a1.y - 4.1 * sc, 0.7 * sc, 0.2 * sc);
        } else if (d.type === 'limit') {
          var lim = LIMITS[d.zone % LIMITS.length], r = 0.9 * sc;
          ctx.fillStyle = '#9e9e9e'; ctx.fillRect(sx - 0.07 * sc, a1.y - 3 * sc, 0.14 * sc, 3 * sc);
          ctx.fillStyle = '#d32f2f'; ctx.beginPath(); ctx.arc(sx, a1.y - 3.4 * sc, r, 0, 7); ctx.fill();
          ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(sx, a1.y - 3.4 * sc, r * 0.78, 0, 7); ctx.fill();
          if (r > 6) { ctx.fillStyle = '#111'; ctx.font = 'bold ' + Math.round(r * 0.9) + 'px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(lim, sx, a1.y - 3.4 * sc); }
        }
        ctx.globalAlpha = 1;
      }
      // traffic in this segment
      for (var t = 0; t < traffic.length; t++) {
        var c = traffic[t];
        if (Math.floor(wrap(c.z, TRACK_LEN) / SEG) % TRACK_SEGS !== it.idx) continue;
        var pc = (wrap(c.z, TRACK_LEN) % SEG) / SEG;
        var cxp = lerp(a1.x, b1.x, pc) + lerp(a1.w, b1.w, pc) * c.x, cyp = lerp(a1.y, b1.y, pc), cs = lerp(a1.w, b1.w, pc);
        ctx.globalAlpha = Math.min(1, (DRAW - n) / 30);
        if (c.truck) drawTruckRear(cxp, cyp, 2.5 * cs, c.color);
        else drawCarRear(cxp, cyp, 1.85 * cs, c.color, false, dark > 0.4);
        ctx.globalAlpha = 1;
      }
    }

    // fog / haze at horizon
    var haze = ctx.createLinearGradient(0, horizon - 40, 0, horizon + 60);
    var hz = mix([190, 215, 235], [20, 28, 50], dark);
    haze.addColorStop(0, 'rgba(0,0,0,0)'); haze.addColorStop(0.5, hz.replace('rgb', 'rgba').replace(')', ',0.55)')); haze.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = haze; ctx.fillRect(0, horizon - 40, W, 100);

    // player car / cockpit
    var pw = project(0, 0, hood ? 99 : 6.5, 0, camH).w; // scale at car distance
    if (!hood) {
      var cy = project(0, 0, 6.5, 0, camH).y + 6;
      ctx.save();
      ctx.translate(W / 2 + p.h * 120, 0);
      ctx.rotate(-p.h * 0.5);
      var bounce = p.offroad ? Math.sin(p.time * 60) * 2 : 0;
      drawCarRear(0, cy + bounce, 1.9 * pw, vehicle.color, p.brake, lightsOn || dark > 0.4);
      ctx.restore();
    } else {
      drawCockpit();
    }

    // night headlights / darkness
    if (dark > 0.05) {
      ctx.fillStyle = 'rgba(0,4,16,' + (dark * 0.5) + ')'; ctx.fillRect(0, 0, W, H);
    }
    if (lightsOn || dark > 0.4) {
      var lg = ctx.createRadialGradient(W / 2, H * 0.7, 10, W / 2, H * 0.55, H * 0.6);
      lg.addColorStop(0, 'rgba(255,245,200,.22)'); lg.addColorStop(1, 'rgba(255,245,200,0)');
      ctx.fillStyle = lg; ctx.fillRect(0, 0, W, H);
    }
    if (flash > 0) { ctx.fillStyle = 'rgba(255,255,255,' + Math.min(0.8, flash * 2.5) + ')'; ctx.fillRect(0, 0, W, H); }
    ctx.restore();
    drawHUD();
  }

  function drawCockpit() {
    var dashY = H * 0.78;
    var g = ctx.createLinearGradient(0, dashY, 0, H);
    g.addColorStop(0, '#1a1d24'); g.addColorStop(1, '#07080b');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(0, dashY + 20); ctx.quadraticCurveTo(W / 2, dashY - 30, W, dashY + 20); ctx.lineTo(W, H); ctx.fill();
    ctx.fillStyle = '#0a0b0e'; ctx.fillRect(0, 0, W, 6);
    var wr = Math.min(W, H) * 0.34;
    ctx.save(); ctx.translate(W / 2, H + wr * 0.35); ctx.rotate(player.steer * 0.9);
    ctx.strokeStyle = '#222833'; ctx.lineWidth = wr * 0.12;
    ctx.beginPath(); ctx.arc(0, 0, wr, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-wr, 0); ctx.lineTo(wr, 0); ctx.moveTo(0, 0); ctx.lineTo(0, -wr); ctx.stroke();
    ctx.restore();
  }

  function dial(cx, cy, r, value, max, label, major, redFrom, unit) {
    ctx.save();
    ctx.fillStyle = 'rgba(6,10,20,.78)'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 2; ctx.stroke();
    var a0 = Math.PI * 0.8, a1 = Math.PI * 2.2;
    ctx.fillStyle = '#cfd8dc'; ctx.font = Math.round(r * 0.16) + 'px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (var v = 0; v <= max; v += major / 2) {
      var an = a0 + (a1 - a0) * v / max, big = Math.abs(v % major) < 1e-6;
      ctx.strokeStyle = redFrom && v >= redFrom ? '#ff5252' : '#cfd8dc'; ctx.lineWidth = big ? 2.5 : 1;
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(an) * r * (big ? 0.78 : 0.85), cy + Math.sin(an) * r * (big ? 0.78 : 0.85));
      ctx.lineTo(cx + Math.cos(an) * r * 0.93, cy + Math.sin(an) * r * 0.93); ctx.stroke();
      if (big) ctx.fillText(label(v), cx + Math.cos(an) * r * 0.62, cy + Math.sin(an) * r * 0.62);
    }
    var na = a0 + (a1 - a0) * Math.max(0, Math.min(1, value / max));
    ctx.strokeStyle = '#ff7043'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(na) * r * 0.82, cy + Math.sin(na) * r * 0.82); ctx.stroke();
    ctx.fillStyle = '#ff7043'; ctx.beginPath(); ctx.arc(cx, cy, r * 0.07, 0, 7); ctx.fill();
    ctx.fillStyle = '#90a4ae'; ctx.font = Math.round(r * 0.14) + 'px sans-serif'; ctx.fillText(unit, cx, cy + r * 0.42);
    ctx.restore();
  }

  function drawHUD() {
    var p = player, kmh = Math.abs(p.v) * 3.6;
    var r = Math.max(52, Math.min(W, H) * 0.14);
    var bot = H - r - 14;
    if (W > 520 || H > 520) {
      dial(W - r - 16, bot - (W < 600 ? r * 1.8 : 0), r, kmh, 240, function (v) { return v; }, 40, 200, 'km/h');
      dial(W - r * 3 - 30, bot - (W < 600 ? r * 1.8 : 0), r * 0.8, p.rpm / 1000, 8, function (v) { return v; }, 1, 7, 'x1000 rpm');
    }
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    // digital speed + gear
    var gx = W - r - 16, gy = bot - (W < 600 ? r * 1.8 : 0);
    ctx.fillStyle = '#fff'; ctx.font = 'bold ' + Math.round(r * 0.42) + 'px sans-serif'; ctx.fillText(Math.round(kmh), gx, gy + r * 0.12);
    var gl = p.reversing || p.v < -0.2 ? 'R' : (p.v < 0.3 && !(keys.up || touch.up) ? 'N' : p.gear);
    ctx.fillStyle = '#4fc3f7'; ctx.font = 'bold ' + Math.round(r * 0.26) + 'px sans-serif';
    ctx.fillText((settings.gearbox === 'auto' ? 'D' : 'M') + ' ' + gl, gx, gy - r * 0.38);

    // speed limit
    var lim = limAtPlayer(), lx = 70, ly = H - 70;
    ctx.fillStyle = '#d32f2f'; ctx.beginPath(); ctx.arc(lx, ly, 36, 0, 7); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(lx, ly, 28, 0, 7); ctx.fill();
    ctx.fillStyle = kmh > lim + 5 ? '#d32f2f' : '#111'; ctx.font = 'bold 26px sans-serif'; ctx.fillText(lim, lx, ly + 1);

    // top-right stats
    ctx.textAlign = 'right'; ctx.fillStyle = '#fff'; ctx.font = 'bold 22px sans-serif';
    ctx.fillText('SCORE ' + Math.max(0, Math.round(p.score)), W - 16, 28);
    ctx.fillStyle = '#b0bec5'; ctx.font = '14px sans-serif';
    ctx.fillText((p.dist / 1000).toFixed(2) + ' km · Best ' + best + ' · Fines $' + p.fines, W - 16, 52);
    // integrity bar
    ctx.textAlign = 'left';
    var bx = 16, by = 60, bw = Math.min(200, W * 0.35);
    ctx.fillStyle = '#b0bec5'; ctx.font = '12px sans-serif'; ctx.fillText('VEHICLE INTEGRITY', bx + 90, by - 10);
    ctx.fillStyle = 'rgba(255,255,255,.15)'; ctx.fillRect(bx + 90, by, bw, 10);
    var integ = 1 - p.damage / 100;
    ctx.fillStyle = integ > 0.5 ? '#66bb6a' : integ > 0.25 ? '#ffca28' : '#ef5350'; ctx.fillRect(bx + 90, by, bw * integ, 10);
    ctx.fillStyle = '#90a4ae'; ctx.fillText((camMode ? 'HOOD' : 'CHASE') + ' · C camera · L lights', bx + 90, by + 26);
    // messages
    ctx.textAlign = 'center'; ctx.font = 'bold 20px sans-serif';
    for (var i = 0; i < msgs.length; i++) {
      ctx.globalAlpha = Math.min(1, msgs[i].t);
      ctx.fillStyle = 'rgba(0,0,0,.55)'; var tw = ctx.measureText(msgs[i].text).width + 24;
      ctx.fillRect(W / 2 - tw / 2, H * 0.2 + i * 34 - 15, tw, 28);
      ctx.fillStyle = msgs[i].color; ctx.fillText(msgs[i].text, W / 2, H * 0.2 + i * 34);
    }
    ctx.globalAlpha = 1;
  }
  function limAtPlayer() { return limitAt(player.z); }

  // ---------- Main loop ----------
  var last = 0;
  function frame(ts) {
    var dt = Math.min(0.05, (ts - last) / 1000 || 0); last = ts;
    if (!player) reset();
    if (state === 'playing') update(dt);
    else if (state === 'menu') { player.z = wrap(player.z + 20 * dt, TRACK_LEN); bgOffset += 20 * dt; }
    render();
    requestAnimationFrame(frame);
  }
  reset();
  requestAnimationFrame(frame);
})();
