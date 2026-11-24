import * as THREE from './vendor/three/three.module.min.js';
import { FIGHTERS, UNIVERSES, getFighter, getSkill, allUnlockableFor, SPECIALS } from './arena-roster.js';
import { createArenaWorld, STAGES } from './arena-world.js';
import { createArenaFx } from './arena-fx.js';
import { createArenaAudio } from './arena-audio.js';
import { createDojoStore, UNLOCK_ALL } from './arena-dojo.js';
import {
  createFighter, disposeFighter, updateFighter, resolveCombat, updateCpu, resetFighter, MATCH,
  setArenaSfx
} from './arena-combat.js';
import { preloadArenaVrm } from './arena-vrm.js';

(() => {
  const mount = document.getElementById('arena-scene');
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  mount.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 200);
  // Centered 3/4 camera (both faces readable — avoid sitting behind P2)
  // Establishing shot — elevated and outside the stands so the ring reads clearly
  camera.position.set(0, 7.2, 22);
  camera.lookAt(0, 1.0, 0);

  let stageId = 'budokai';
  try {
    const saved = localStorage.getItem('arenaClashStage');
    if (STAGES.some((s) => s.id === saved)) stageId = saved;
  } catch { /* ignore */ }

  let world = createArenaWorld({ scene, renderer, stageId });
  const fx = createArenaFx({ scene });
  const audio = createArenaAudio();
  setArenaSfx(audio);
  const store = createDojoStore();

  let p1Id = 'goku';
  let p2Id = 'vegeta';
  let mode = 'cpu'; // cpu | pvp
  let difficulty = 'normal';
  let universeFilter = 'all';
  let dojoFighterId = 'goku';
  let p1 = null;
  let p2 = null;
  let running = false;
  let paused = false;
  let timeLeft = MATCH.ROUND_TIME;
  let elapsed = 0;
  let matchOver = false;
  let camTarget = new THREE.Vector3(0, 1.0, 0);
  let camPos = camera.position.clone();

  // Fight camera distances — default Wide because Close felt too tight on Budokai
  const CAMERA_VIEWS = [
    // Distances tuned for taller 2.5D anime sprite fighters
    { id: 'close', label: 'Close', fov: 48, zBase: 8.4, zSpan: 0.36, yBase: 3.1, yMul: 0.2, midLift: 1.7, xBias: 0.06 },
    { id: 'mid', label: 'Mid', fov: 50, zBase: 11.2, zSpan: 0.42, yBase: 3.9, yMul: 0.22, midLift: 1.75, xBias: 0.08 },
    { id: 'wide', label: 'Wide', fov: 52, zBase: 13.4, zSpan: 0.48, yBase: 5.3, yMul: 0.24, midLift: 1.8, xBias: 0.1 },
    { id: 'stadium', label: 'Stadium', fov: 55, zBase: 19.2, zSpan: 0.55, yBase: 7.6, yMul: 0.28, midLift: 1.9, xBias: 0.12 }
  ];
  let cameraViewId = 'wide';
  try {
    const savedCam = localStorage.getItem('arenaClashCamera');
    if (CAMERA_VIEWS.some((v) => v.id === savedCam)) cameraViewId = savedCam;
  } catch { /* ignore */ }
  function getCameraView() {
    return CAMERA_VIEWS.find((v) => v.id === cameraViewId) || CAMERA_VIEWS[2];
  }

  const keys = new Set();
  const touch = {};
  const stick = { active: false, x: 0, y: 0, pointerId: null };
  const attackEdges = { punch: false, kick: false, skill1: false, skill2: false, special1: false, special2: false };
  const p2AttackEdges = { punch: false, kick: false, skill1: false, skill2: false, special1: false, special2: false };
  const gestureHold = { guard: false, up: false };

  function consumeEdge(map, name) {
    if (!map[name]) return false;
    map[name] = false;
    return true;
  }

  const $ = (id) => document.getElementById(id);
  const welcome = $('welcome');
  const roster = $('roster');
  const dojo = $('dojo');
  const stagePick = $('stage-pick');
  const countdown = $('countdown');
  const result = $('result');
  const pausedOverlay = $('paused');
  const matchHud = $('match-hud');
  const skillTray = $('skill-tray');
  const cameraRail = $('camera-rail');
  const hint = $('hint');
  const touchHint = $('touch-hint');
  const isCoarsePointer = () => window.matchMedia('(pointer: coarse), (hover: none)').matches;

  function syncAudioToggle() {
    const btn = $('audio-toggle');
    if (!btn) return;
    btn.setAttribute('aria-pressed', audio.muted ? 'true' : 'false');
    btn.textContent = audio.muted ? 'Muted' : 'Sound';
    btn.title = audio.muted ? 'Unmute fight audio' : 'Mute fight audio';
  }

  function syncCameraRail() {
    if (!cameraRail) return;
    cameraRail.querySelectorAll('[data-cam]').forEach((btn) => {
      btn.classList.toggle('on', btn.dataset.cam === cameraViewId);
    });
    const view = getCameraView();
    camera.fov = view.fov;
    camera.updateProjectionMatrix();
  }

  function setCameraView(id, { persist = true } = {}) {
    if (!CAMERA_VIEWS.some((v) => v.id === id)) return;
    cameraViewId = id;
    syncCameraRail();
    if (persist) {
      try { localStorage.setItem('arenaClashCamera', cameraViewId); } catch { /* ignore */ }
    }
  }

  function cycleCameraView() {
    const idx = CAMERA_VIEWS.findIndex((v) => v.id === cameraViewId);
    const next = CAMERA_VIEWS[(idx + 1) % CAMERA_VIEWS.length];
    setCameraView(next.id);
    audio.ui('cam');
  }

  function show(el) { el.classList.remove('hidden'); }
  function hide(el) { el.classList.add('hidden'); }

  let touchHintTimer = null;

  function setTouchChrome(active) {
    const controls = $('touch-controls');
    if (controls) controls.classList.toggle('live', !!active);
    if (touchHintTimer) {
      clearTimeout(touchHintTimer);
      touchHintTimer = null;
    }
    if (!active) {
      hint.hidden = true;
      if (touchHint) {
        touchHint.hidden = true;
        touchHint.classList.remove('live', 'fade');
      }
      return;
    }
    if (isCoarsePointer()) {
      hint.hidden = true;
      skillTray.hidden = true;
      if (touchHint) {
        touchHint.hidden = false;
        touchHint.classList.add('live');
        touchHint.classList.remove('fade');
        // Brief coach mark, then clear space for the fight
        touchHintTimer = setTimeout(() => {
          if (!touchHint) return;
          touchHint.classList.add('fade');
          touchHintTimer = setTimeout(() => {
            touchHint.hidden = true;
            touchHint.classList.remove('live', 'fade');
            touchHintTimer = null;
          }, 400);
        }, 4200);
      }
    } else {
      hint.hidden = false;
      skillTray.hidden = false;
      if (touchHint) {
        touchHint.hidden = true;
        touchHint.classList.remove('live', 'fade');
      }
    }
  }

  function refreshPoints() {
    const pts = store.displayPoints();
    $('welcome-points').textContent = pts;
    $('dojo-points').textContent = pts;
  }

  function setStatus(id, msg, err = false) {
    const el = $(id);
    if (!el) return;
    el.textContent = msg || '';
    el.classList.toggle('err', !!err);
  }

  function previewNames() {
    $('preview-p1').textContent = getFighter(p1Id).name;
    $('preview-p2').textContent = getFighter(p2Id).name;
  }

  function rebuildWorld(nextStageId) {
    world.dispose();
    stageId = nextStageId;
    world = createArenaWorld({ scene, renderer, stageId });
    try { localStorage.setItem('arenaClashStage', stageId); } catch { /* ignore */ }
  }

  // ----- Roster UI -----
  function renderUniverseFilters() {
    const host = $('universe-filters');
    host.innerHTML = '';
    const allBtn = document.createElement('button');
    allBtn.type = 'button';
    allBtn.textContent = 'All';
    allBtn.className = universeFilter === 'all' ? 'on' : '';
    allBtn.onclick = () => { universeFilter = 'all'; renderUniverseFilters(); renderFighterLists(); };
    host.appendChild(allBtn);
    for (const u of UNIVERSES) {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = u.name;
      b.className = universeFilter === u.id ? 'on' : '';
      b.onclick = () => { universeFilter = u.id; renderUniverseFilters(); renderFighterLists(); };
      host.appendChild(b);
    }
  }

  function fighterButton(fighter, selectedId, onPick) {
    const owned = store.isOwned(fighter.id);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `fighter-card${selectedId === fighter.id ? ' on' : ''}`;
    const uni = UNIVERSES.find((u) => u.id === fighter.universe);
    const costLabel = UNLOCK_ALL
      ? (selectedId === fighter.id ? 'Selected' : 'Ready')
      : owned
        ? (selectedId === fighter.id ? 'Selected' : 'Owned')
        : `${fighter.unlockCost} pts`;
    btn.innerHTML = `
      <div>
        <div class="title">${fighter.name} ${owned || UNLOCK_ALL ? '' : '🔒'}</div>
        <div class="meta"><span class="tag">${uni?.tag || fighter.universe}</span>${fighter.tagline}</div>
      </div>
      <div class="cost">${costLabel}</div>
    `;
    btn.onclick = () => onPick(fighter);
    return btn;
  }

  function renderFighterLists() {
    const list = FIGHTERS.filter((f) => universeFilter === 'all' || f.universe === universeFilter);
    const p1List = $('p1-list');
    const p2List = $('p2-list');
    p1List.innerHTML = '';
    p2List.innerHTML = '';
    for (const f of list) {
      p1List.appendChild(fighterButton(f, p1Id, async (fighter) => {
        if (!store.isOwned(fighter.id)) {
          try {
            await store.unlockFighter(fighter.id);
            refreshPoints();
            setStatus('roster-status', `Unlocked ${fighter.name}!`);
          } catch (e) {
            setStatus('roster-status', e.message || 'Unlock failed', true);
            return;
          }
        }
        p1Id = fighter.id;
        dojoFighterId = fighter.id;
        await store.selectFighter(fighter.id);
        previewNames();
        renderFighterLists();
      }));
      p2List.appendChild(fighterButton(f, p2Id, async (fighter) => {
        // CPU / P2 can use any owned fighter; allow unlock from here too
        if (!store.isOwned(fighter.id)) {
          try {
            await store.unlockFighter(fighter.id);
            refreshPoints();
            setStatus('roster-status', `Unlocked ${fighter.name}!`);
          } catch (e) {
            setStatus('roster-status', e.message || 'Unlock failed', true);
            return;
          }
        }
        p2Id = fighter.id;
        previewNames();
        renderFighterLists();
      }));
    }
  }

  // ----- Dojo UI -----
  function renderDojo() {
    const intro = $('dojo-intro');
    if (intro) {
      intro.textContent = UNLOCK_ALL
        ? 'Browse each fighter’s full kit. Everything is unlocked for playtesting — skill upgrades come later.'
        : 'Spend points to unlock fighters and teach them new moves. Starter skills stay free forever.';
    }
    const pills = $('dojo-fighter-pills');
    pills.innerHTML = '';
    for (const f of FIGHTERS.filter((x) => store.isOwned(x.id))) {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = f.name;
      b.className = dojoFighterId === f.id ? 'on' : '';
      b.onclick = () => { dojoFighterId = f.id; renderDojo(); };
      pills.appendChild(b);
    }
    const fighter = getFighter(dojoFighterId);
    const host = $('dojo-skills');
    host.innerHTML = '';

    // Character unlock section for locked fighters (skipped while UNLOCK_ALL)
    if (!UNLOCK_ALL) {
      for (const f of FIGHTERS.filter((x) => !store.isOwned(x.id))) {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'skill-card';
        card.innerHTML = `
          <div>
            <div class="title">Unlock ${f.name}</div>
            <div class="meta">${f.tagline}</div>
          </div>
          <div class="cost">${f.unlockCost} pts</div>
        `;
        card.onclick = async () => {
          try {
            await store.unlockFighter(f.id);
            dojoFighterId = f.id;
            refreshPoints();
            setStatus('dojo-status', `${f.name} joined your roster!`);
            renderDojo();
            renderFighterLists();
          } catch (e) {
            setStatus('dojo-status', e.message || 'Unlock failed', true);
          }
        };
        host.appendChild(card);
      }
    }

    const unlockables = allUnlockableFor(fighter);
    for (const skill of unlockables) {
      const unlocked = store.isUnlocked(fighter.id, skill.id);
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'skill-card';
      card.disabled = unlocked || UNLOCK_ALL;
      card.innerHTML = `
        <div>
          <div class="title">${skill.label} ${unlocked ? '✓' : ''}</div>
          <div class="meta"><span class="tag">T${skill.tier ?? 1}</span>${skill.blurb || ''}</div>
        </div>
        <div class="cost">${unlocked || UNLOCK_ALL ? 'Unlocked' : `${skill.unlockCost} pts`}</div>
      `;
      if (!unlocked && !UNLOCK_ALL) {
        card.onclick = async () => {
          try {
            await store.unlockSkill(fighter.id, skill.id);
            refreshPoints();
            setStatus('dojo-status', `${fighter.name} learned ${skill.label}!`);
            renderDojo();
          } catch (e) {
            setStatus('dojo-status', e.message || 'Unlock failed', true);
          }
        };
      }
      host.appendChild(card);
    }
    if (UNLOCK_ALL) setStatus('dojo-status', 'Playtest mode: full kit available — upgrades deferred.');
  }

  function renderStages() {
    const host = $('stage-list');
    host.innerHTML = '';
    for (const s of STAGES) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `fighter-card${stageId === s.id ? ' on' : ''}`;
      btn.innerHTML = `
        <div>
          <div class="title">${s.name}</div>
          <div class="meta">${s.blurb}</div>
        </div>
        <div class="cost">${stageId === s.id ? 'Active' : 'Select'}</div>
      `;
      btn.onclick = () => {
        rebuildWorld(s.id);
        renderStages();
      };
      host.appendChild(btn);
    }
  }

  function renderSkillTray() {
    if (!p1) return;
    const loadout = p1.loadout;
    const chips = [
      { id: 'punch', key: 'J' },
      { id: 'kick', key: 'K' },
      { id: 'uppercut', key: 'U' },
      { id: 'dash', key: 'I' },
      { id: loadout.specials[0], key: 'O' },
      { id: loadout.specials[1], key: 'P' }
    ];
    skillTray.innerHTML = chips.map(({ id, key }) => {
      if (!id) return '';
      const skill = getSkill(id);
      if (!skill) return '';
      const owned = store.isUnlocked(p1.def.id, id) || (p1.def.baseSkills || []).includes(id);
      const ready = owned && (p1.cooldown[id] || 0) <= 0;
      return `<div class="skill-chip${owned ? '' : ' locked'}${ready ? ' ready' : ''}">${skill.label}<span>${key}</span></div>`;
    }).join('');
  }

  function syncHud() {
    if (!p1 || !p2) return;
    const setBar = (el, ratio) => { el.style.transform = `scaleX(${Math.max(0, Math.min(1, ratio))})`; };
    setBar($('p1-hp'), p1.hp / p1.maxHp);
    setBar($('p1-en'), p1.energy / p1.maxEnergy);
    setBar($('p2-hp'), p2.hp / p2.maxHp);
    setBar($('p2-en'), p2.energy / p2.maxEnergy);
    $('p1-hp-val').textContent = Math.ceil(p1.hp);
    $('p1-en-val').textContent = Math.ceil(p1.energy);
    $('p2-hp-val').textContent = Math.ceil(p2.hp);
    $('p2-en-val').textContent = Math.ceil(p2.energy);
    $('timer').textContent = String(Math.max(0, Math.ceil(timeLeft)));
    renderSkillTray();
  }

  function applyInputs(dt) {
    if (!p1 || !p2) return;
    const dead = 0.18;
    const axisX = stick.active && Math.abs(stick.x) > dead ? stick.x : 0;
    // Stick up (negative screen Y) = deeper into the arena (−Z)
    const axisZ = stick.active && Math.abs(stick.y) > dead ? stick.y : 0;
    p1.input = {
      left: keys.has('a') || keys.has('arrowleft') || !!touch.left,
      right: keys.has('d') || keys.has('arrowright') || !!touch.right,
      forward: keys.has('q') || !!touch.forward,
      back: keys.has('e') || !!touch.back,
      up: keys.has('w') || keys.has('arrowup') || !!touch.up || !!gestureHold.up,
      down: keys.has('s') || keys.has('arrowdown') || !!touch.guard || !!gestureHold.guard,
      guard: keys.has('s') || keys.has('arrowdown') || !!touch.guard || !!gestureHold.guard,
      punch: consumeEdge(attackEdges, 'punch') || !!touch.punch,
      kick: consumeEdge(attackEdges, 'kick') || !!touch.kick,
      skill1: consumeEdge(attackEdges, 'skill1') || !!touch.skill1,
      skill2: consumeEdge(attackEdges, 'skill2') || !!touch.skill2,
      special1: consumeEdge(attackEdges, 'special1') || !!touch.special1,
      special2: consumeEdge(attackEdges, 'special2') || !!touch.special2,
      axisX,
      axisZ
    };

    if (mode === 'pvp') {
      p2.input = {
        left: keys.has(','),
        right: keys.has('.'),
        forward: false,
        back: false,
        up: keys.has('/'),
        down: keys.has('m'),
        guard: keys.has('m'),
        punch: consumeEdge(p2AttackEdges, 'punch'),
        kick: consumeEdge(p2AttackEdges, 'kick'),
        skill1: consumeEdge(p2AttackEdges, 'skill1'),
        skill2: consumeEdge(p2AttackEdges, 'skill2'),
        special1: consumeEdge(p2AttackEdges, 'special1'),
        special2: consumeEdge(p2AttackEdges, 'special2'),
        axisX: 0,
        axisZ: 0
      };
    } else {
      updateCpu(p2, p1, difficulty);
    }

    // Edge-trigger attacks from held keys: combat reads booleans each frame; throttle via cooldown
    updateFighter(p1, dt, world.bounds, true);
    updateFighter(p2, dt, world.bounds, true);
    // Keep fighters squared up so retreat doesn't flip the Kung Fu lead
    if (p1.alive && p2.alive) {
      p1.facing = p2.x >= p1.x ? 1 : -1;
      p2.facing = p1.x >= p2.x ? 1 : -1;
      p1.model?.setFacing?.(p1.facing);
      p2.model?.setFacing?.(p2.facing);
    }
    resolveCombat(p1, p2, fx, dt);
  }

  async function endMatch(outcome) {
    if (matchOver) return;
    matchOver = true;
    running = false;
    audio.stopCrowd();
    const won = outcome === 'p1';
    const draw = outcome === 'draw';
    let award = draw ? MATCH.DRAW_POINTS : won ? MATCH.WIN_POINTS : MATCH.LOSS_POINTS;
    if (won) audio.victory();
    else if (!draw) audio.defeat();
    await store.recordMatch({ won });
    const total = await store.awardPoints(award);
    refreshPoints();

    $('result-title').textContent = draw ? 'Draw' : won ? 'Victory' : 'Defeat';
    $('result-summary').textContent = draw
      ? 'Time ran out with equal strength.'
      : won
        ? `${p1.def.name} wins the round!`
        : `${p2.def.name} takes the win. Train harder in the Dojo.`;
    $('result-points').textContent = `+${award} points · balance ${total}`;
    matchHud.hidden = true;
    skillTray.hidden = true;
    if (cameraRail) cameraRail.hidden = true;
    setTouchChrome(false);
    hide(pausedOverlay);
    show(result);
  }

  function clearFighters() {
    if (p1) disposeFighter(p1, scene);
    if (p2) disposeFighter(p2, scene);
    p1 = p2 = null;
    fx.clear();
  }

  async function spawnFighters() {
    clearFighters();
    const u1 = store.dojo.unlocked[p1Id] || [];
    const u2 = store.dojo.unlocked[p2Id] || [];
    // Warm VRM base, then build both fighters (VRM + MToon, sprite fallback)
    await preloadArenaVrm();
    p1 = await createFighter({ scene, fighterId: p1Id, side: 'p1', unlockedIds: u1, control: 'human' });
    p2 = await createFighter({
      scene, fighterId: p2Id, side: 'p2', unlockedIds: u2,
      control: mode === 'pvp' ? 'human' : 'cpu'
    });
    p1.model.setCamera?.(camera);
    p2.model.setCamera?.(camera);
    $('p1-name').textContent = p1.def.name;
    $('p2-name').textContent = p2.def.name + (mode === 'cpu' ? ' · CPU' : '');
    const s1 = (p1.loadout.specials || []).map((id) => SPECIALS[id]?.label || getSkill(id)?.label).filter(Boolean);
    const s2 = (p2.loadout.specials || []).map((id) => SPECIALS[id]?.label || getSkill(id)?.label).filter(Boolean);
    $('p1-sub').textContent = s1.length ? s1.join(' · ') : 'Punch · Kick';
    $('p2-sub').textContent = s2.length ? s2.join(' · ') : 'Punch · Kick';
    const sp1 = $('touch-special1');
    const sp2 = $('touch-special2');
    // Compact labels fit phone thumbs; full name stays on title / skill tray (desktop)
    if (sp1) {
      const id = p1.loadout.specials[0];
      const full = (SPECIALS[id] || getSkill(id))?.label || 'Special 1';
      sp1.textContent = 'SP1';
      sp1.setAttribute('aria-label', full);
      sp1.title = full;
    }
    if (sp2) {
      const id = p1.loadout.specials[1];
      const full = (SPECIALS[id] || getSkill(id))?.label || 'Special 2';
      sp2.textContent = 'SP2';
      sp2.setAttribute('aria-label', full);
      sp2.title = full;
    }
  }

  async function beginMatch() {
    audio.resume();
    audio.ui();
    hide(welcome); hide(roster); hide(dojo); hide(stagePick); hide(result); hide(pausedOverlay);
    $('countdown-num').textContent = '…';
    show(countdown);
    await spawnFighters();
    timeLeft = MATCH.ROUND_TIME;
    matchOver = false;
    paused = false;
    running = false;
    elapsed = 0;
    matchHud.hidden = false;
    skillTray.hidden = false;
    if (cameraRail) cameraRail.hidden = false;
    syncCameraRail();
    setTouchChrome(true);
    syncHud();
    audio.startCrowd();

    for (const n of [3, 2, 1, 'FIGHT']) {
      $('countdown-num').textContent = n;
      audio.countdown(n);
      await new Promise((r) => setTimeout(r, n === 'FIGHT' ? 500 : 700));
    }
    hide(countdown);
    running = true;
  }

  // ----- Events -----
  $('start-match').onclick = () => beginMatch();
  $('open-roster').onclick = () => {
    audio.resume(); audio.ui();
    hide(welcome); show(roster); renderUniverseFilters(); renderFighterLists(); setStatus('roster-status', '');
  };
  $('roster-back').onclick = () => { audio.ui(); hide(roster); show(welcome); previewNames(); };
  $('roster-done').onclick = () => { audio.ui(); hide(roster); show(welcome); previewNames(); };
  $('open-dojo').onclick = () => {
    audio.resume(); audio.ui();
    hide(welcome); show(dojo); renderDojo(); setStatus('dojo-status', ''); refreshPoints();
  };
  $('dojo-done').onclick = () => { audio.ui(); hide(dojo); show(welcome); refreshPoints(); };
  $('open-stage').onclick = () => { audio.resume(); audio.ui(); hide(welcome); show(stagePick); renderStages(); };
  $('stage-done').onclick = () => { audio.ui(); hide(stagePick); show(welcome); };
  $('result-again').onclick = () => beginMatch();
  $('result-dojo').onclick = () => { audio.ui(); hide(result); show(dojo); renderDojo(); refreshPoints(); };
  $('result-menu').onclick = () => {
    audio.ui(); audio.stopCrowd();
    hide(result); clearFighters(); matchHud.hidden = true; skillTray.hidden = true;
    if (cameraRail) cameraRail.hidden = true;
    setTouchChrome(false);
    show(welcome); refreshPoints();
  };
  $('resume-match').onclick = () => { audio.ui(); paused = false; hide(pausedOverlay); };
  $('end-match').onclick = () => {
    audio.ui(); audio.stopCrowd();
    paused = false; running = false; matchOver = true;
    hide(pausedOverlay); clearFighters();
    matchHud.hidden = true; skillTray.hidden = true;
    if (cameraRail) cameraRail.hidden = true;
    setTouchChrome(false);
    camera.fov = 50;
    camera.updateProjectionMatrix();
    camera.position.set(0, 7.2, 22);
    camPos.copy(camera.position);
    camTarget.set(0, 1.0, 0);
    show(welcome);
  };

  const audioToggle = $('audio-toggle');
  if (audioToggle) {
    syncAudioToggle();
    audioToggle.onclick = () => {
      audio.resume();
      audio.toggleMute();
      syncAudioToggle();
      if (!audio.muted) audio.ui('cam');
    };
  }

  if (cameraRail) {
    cameraRail.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-cam]');
      if (!btn) return;
      setCameraView(btn.dataset.cam);
      audio.ui('cam');
    });
  }
  syncCameraRail();

  // Unlock AudioContext on first gesture (browser autoplay policy)
  const unlockAudio = () => { audio.resume(); };
  window.addEventListener('pointerdown', unlockAudio, { once: true });
  window.addEventListener('keydown', unlockAudio, { once: true });

  $('difficulty-row').onclick = (e) => {
    const btn = e.target.closest('[data-diff]');
    if (!btn) return;
    difficulty = btn.dataset.diff;
    $('difficulty-row').querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === btn));
  };
  $('mode-row').onclick = (e) => {
    const btn = e.target.closest('[data-mode]');
    if (!btn) return;
    mode = btn.dataset.mode;
    $('mode-row').querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === btn));
  };

  const p1AttackKeys = { j: 'punch', k: 'kick', u: 'skill1', i: 'skill2', o: 'special1', p: 'special2' };
  const p2AttackKeys = { b: 'punch', n: 'kick', h: 'skill1', y: 'skill2', g: 'special1', t: 'special2' };

  window.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    const k = e.key.toLowerCase();
    keys.add(k);
    if (p1AttackKeys[k]) attackEdges[p1AttackKeys[k]] = true;
    if (p2AttackKeys[k]) p2AttackEdges[p2AttackKeys[k]] = true;
    if (k === 'escape' && running && !matchOver) {
      paused = !paused;
      if (paused) show(pausedOverlay); else hide(pausedOverlay);
    }
    if (k === 'c' && running && !matchOver) cycleCameraView();
  });
  window.addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));

  // ----- Virtual stick (360° move) -----
  const stickEl = $('virtual-stick');
  const knobEl = $('stick-knob');
  const STICK_MAX = 38;

  function setStickFromEvent(event) {
    if (!stickEl || !knobEl) return;
    const rect = stickEl.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const len = Math.min(STICK_MAX, Math.hypot(dx, dy));
    const ang = Math.atan2(dy, dx);
    stick.x = len < 1 ? 0 : (Math.cos(ang) * len) / STICK_MAX;
    stick.y = len < 1 ? 0 : (Math.sin(ang) * len) / STICK_MAX;
    stick.active = true;
    knobEl.style.transform = `translate(${stick.x * STICK_MAX}px, ${stick.y * STICK_MAX}px)`;
  }

  function releaseStick() {
    stick.active = false;
    stick.x = 0;
    stick.y = 0;
    stick.pointerId = null;
    if (knobEl) knobEl.style.transform = '';
  }

  if (stickEl) {
    stickEl.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      stick.pointerId = e.pointerId;
      try { stickEl.setPointerCapture(e.pointerId); } catch { /* ignore */ }
      setStickFromEvent(e);
    });
    stickEl.addEventListener('pointermove', (e) => {
      if (!stick.active || (stick.pointerId != null && e.pointerId !== stick.pointerId)) return;
      e.preventDefault();
      setStickFromEvent(e);
    });
    stickEl.addEventListener('pointerup', releaseStick);
    stickEl.addEventListener('pointercancel', releaseStick);
    stickEl.addEventListener('lostpointercapture', releaseStick);
  }

  document.querySelectorAll('.touch-controls [data-control]').forEach((btn) => {
    const id = btn.dataset.control;
    const set = (v) => {
      touch[id] = v;
      btn.classList.toggle('down', v);
      // Attack / special buttons are edge-triggered so a hold does not auto-fire every frame
      // until cooldown — still allow hold-to-repeat via re-setting edge while held:
      if (v && attackEdges[id] !== undefined) attackEdges[id] = true;
    };
    btn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      try { btn.setPointerCapture(e.pointerId); } catch { /* ignore */ }
      set(true);
    });
    const off = () => set(false);
    btn.addEventListener('pointerup', off);
    btn.addEventListener('pointercancel', off);
    btn.addEventListener('lostpointercapture', off);
  });

  // ----- Arena gestures (tap / swipe / hold) on top of virtual keys -----
  const canvas = renderer.domElement;
  let gesture = null;
  let lastTapAt = 0;
  let longPressTimer = null;

  function clearGestureHold() {
    gestureHold.guard = false;
    gestureHold.up = false;
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  }

  function pulseHold(key, ms) {
    gestureHold[key] = true;
    setTimeout(() => { gestureHold[key] = false; }, ms);
  }

  function bindArenaGestures() {
    canvas.addEventListener('pointerdown', (e) => {
      if (!running || paused || matchOver || !p1) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      // Ignore when interacting with HUD overlays / virtual controls
      if (e.target !== canvas) return;
      gesture = {
        id: e.pointerId,
        x: e.clientX,
        y: e.clientY,
        t: performance.now(),
        long: false
      };
      try { canvas.setPointerCapture(e.pointerId); } catch { /* ignore */ }
      longPressTimer = setTimeout(() => {
        if (!gesture || gesture.id !== e.pointerId) return;
        gesture.long = true;
        gestureHold.guard = true;
      }, 340);
    });

    canvas.addEventListener('pointermove', (e) => {
      if (!gesture || gesture.id !== e.pointerId) return;
      const dx = e.clientX - gesture.x;
      const dy = e.clientY - gesture.y;
      if (Math.hypot(dx, dy) > 18 && longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    });

    function endGesture(e) {
      if (!gesture || gesture.id !== e.pointerId) return;
      const dx = e.clientX - gesture.x;
      const dy = e.clientY - gesture.y;
      const held = performance.now() - gesture.t;
      const dist = Math.hypot(dx, dy);
      const wasLong = gesture.long;
      gesture = null;
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
      if (wasLong) {
        gestureHold.guard = false;
        return;
      }
      if (!running || paused || matchOver) return;

      if (dist < 22 && held < 320) {
        const now = performance.now();
        if (now - lastTapAt < 300) {
          attackEdges.kick = true;
          lastTapAt = 0;
        } else {
          attackEdges.punch = true;
          lastTapAt = now;
        }
        return;
      }

      if (dist < 28) return;
      const ax = Math.abs(dx);
      const ay = Math.abs(dy);
      if (ay > ax * 1.1) {
        if (dy < 0) {
          // Swipe up: short = jump, long = uppercut
          if (ay > 90) attackEdges.skill1 = true;
          else pulseHold('up', 140);
        } else {
          // Swipe down: guard burst
          pulseHold('guard', 420);
        }
      } else {
        // Horizontal swipe: dash toward swipe direction
        attackEdges.skill2 = true;
        if (dx > 0) {
          touch.right = true;
          setTimeout(() => { touch.right = false; }, 120);
        } else {
          touch.left = true;
          setTimeout(() => { touch.left = false; }, 120);
        }
      }
    }

    canvas.addEventListener('pointerup', endGesture);
    canvas.addEventListener('pointercancel', (e) => {
      if (gesture && gesture.id === e.pointerId) {
        clearGestureHold();
        gesture = null;
      }
    });
  }
  bindArenaGestures();

  window.addEventListener('resize', () => {
    const w = mount.clientWidth;
    const h = mount.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // ----- Loop -----
  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    elapsed += dt;
    world.update(dt, elapsed);

    if (p1 && p2 && !matchOver && matchHud && !matchHud.hidden) {
      // Keep fight camera + idle Kung Fu poses during countdown / pause
      if (running && !paused) {
        applyInputs(dt);
        timeLeft -= dt;
        syncHud();
      } else if (!paused) {
        // Countdown: settle into ready stance before FIGHT
        p1.model?.animate?.(dt, { moving: false, airborne: false, guarding: false });
        p2.model?.animate?.(dt, { moving: false, airborne: false, guarding: false });
      }

      const view = getCameraView();
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2 + view.midLift;
      const span = Math.min(16, Math.max(5.2, Math.abs(p1.x - p2.x) + 3.8));
      camTarget.lerp(new THREE.Vector3(midX, midY, (p1.z + p2.z) * 0.25), 1 - Math.pow(0.001, dt));
      const desired = new THREE.Vector3(
        midX * view.xBias,
        view.yBase + midY * view.yMul,
        view.zBase + span * view.zSpan
      );
      camPos.lerp(desired, 1 - Math.pow(0.05, dt));
      camera.position.copy(camPos);
      camera.lookAt(camTarget);

      if (running && !paused) {
        if (!p1.alive || !p2.alive || timeLeft <= 0) {
          let outcome = 'draw';
          if (p1.alive && !p2.alive) outcome = 'p1';
          else if (!p1.alive && p2.alive) outcome = 'p2';
          else if (p1.hp !== p2.hp) outcome = p1.hp > p2.hp ? 'p1' : 'p2';
          endMatch(outcome);
        }
      }
    } else if (!running) {
      // Idle camera drift on menu — orbit the full tournament ring
      camera.position.x = Math.sin(elapsed * 0.18) * 1.8;
      camera.position.y = 7.2 + Math.sin(elapsed * 0.28) * 0.3;
      camera.position.z = 22;
      camera.lookAt(0, 1.0, 0);
      fx.update(dt, () => {});
    }

    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  // Boot
  store.ready.then(() => {
    if (store.isOwned(store.dojo.selected)) p1Id = store.dojo.selected;
    dojoFighterId = p1Id;
    previewNames();
    refreshPoints();
    if (store.loadError) {
      setStatus('welcome-status', store.loadError, true);
    } else if (UNLOCK_ALL && store.user) {
      setStatus('welcome-status', 'Signed in — full kit unlocked for playtest. Wins still add quiz points.');
    } else if (UNLOCK_ALL) {
      setStatus('welcome-status', 'Playtest unlock: all fighters and skills are ready. Skill upgrades come later.');
    } else if (store.user) {
      setStatus('welcome-status', 'Signed in — quiz points sync to the Dojo.');
    } else {
      setStatus('welcome-status', 'Playing locally — wins add local points. Sign in to use quiz points.');
    }
  });

  previewNames();
  // Warm the VRM anime base in the background while the welcome screen is up
  preloadArenaVrm();
  requestAnimationFrame(frame);
})();
