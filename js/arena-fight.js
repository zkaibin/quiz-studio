import * as THREE from './vendor/three/three.module.min.js';
import { FIGHTERS, UNIVERSES, getFighter, getSkill, allUnlockableFor, SPECIALS } from './arena-roster.js';
import { createArenaWorld, STAGES } from './arena-world.js';
import { createArenaFx } from './arena-fx.js';
import { createDojoStore } from './arena-dojo.js';
import {
  createFighter, disposeFighter, updateFighter, resolveCombat, updateCpu, resetFighter, MATCH
} from './arena-combat.js';

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
  camera.position.set(0, 3.15, 10.0);
  camera.lookAt(0, 1.35, 0);

  let stageId = 'skyline';
  try {
    const saved = localStorage.getItem('arenaClashStage');
    if (STAGES.some((s) => s.id === saved)) stageId = saved;
  } catch { /* ignore */ }

  let world = createArenaWorld({ scene, renderer, stageId });
  const fx = createArenaFx({ scene });
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
  let camTarget = new THREE.Vector3(0, 1.4, 0);
  let camPos = camera.position.clone();

  const keys = new Set();
  const touch = {};
  const attackEdges = { punch: false, kick: false, skill1: false, skill2: false, special1: false, special2: false };
  const p2AttackEdges = { punch: false, kick: false, skill1: false, skill2: false, special1: false, special2: false };

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
  const hint = $('hint');

  function show(el) { el.classList.remove('hidden'); }
  function hide(el) { el.classList.add('hidden'); }

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
    btn.innerHTML = `
      <div>
        <div class="title">${fighter.name} ${owned ? '' : '🔒'}</div>
        <div class="meta"><span class="tag">${uni?.tag || fighter.universe}</span>${fighter.tagline}</div>
      </div>
      <div class="cost">${owned ? (selectedId === fighter.id ? 'Selected' : 'Owned') : `${fighter.unlockCost} pts`}</div>
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

    // Character unlock section for locked fighters
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

    const unlockables = allUnlockableFor(fighter);
    for (const skill of unlockables) {
      const unlocked = store.isUnlocked(fighter.id, skill.id);
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'skill-card';
      card.disabled = unlocked;
      card.innerHTML = `
        <div>
          <div class="title">${skill.label} ${unlocked ? '✓' : ''}</div>
          <div class="meta"><span class="tag">T${skill.tier ?? 1}</span>${skill.blurb || ''}</div>
        </div>
        <div class="cost">${unlocked ? 'Unlocked' : `${skill.unlockCost} pts`}</div>
      `;
      if (!unlocked) {
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
    p1.input = {
      left: keys.has('a') || keys.has('arrowleft') || touch.left,
      right: keys.has('d') || keys.has('arrowright') || touch.right,
      up: keys.has('w') || keys.has('arrowup') || touch.up,
      down: keys.has('s') || keys.has('arrowdown') || touch.guard,
      guard: keys.has('s') || keys.has('arrowdown') || touch.guard,
      punch: consumeEdge(attackEdges, 'punch') || !!touch.punch,
      kick: consumeEdge(attackEdges, 'kick') || !!touch.kick,
      skill1: consumeEdge(attackEdges, 'skill1') || !!touch.skill1,
      skill2: consumeEdge(attackEdges, 'skill2') || !!touch.skill2,
      special1: consumeEdge(attackEdges, 'special1') || !!touch.special1,
      special2: consumeEdge(attackEdges, 'special2') || !!touch.special2
    };

    if (mode === 'pvp') {
      p2.input = {
        left: keys.has(','),
        right: keys.has('.'),
        up: keys.has('/'),
        down: keys.has('m'),
        guard: keys.has('m'),
        punch: consumeEdge(p2AttackEdges, 'punch'),
        kick: consumeEdge(p2AttackEdges, 'kick'),
        skill1: consumeEdge(p2AttackEdges, 'skill1'),
        skill2: consumeEdge(p2AttackEdges, 'skill2'),
        special1: consumeEdge(p2AttackEdges, 'special1'),
        special2: consumeEdge(p2AttackEdges, 'special2')
      };
    } else {
      updateCpu(p2, p1, difficulty);
    }

    // Edge-trigger attacks from held keys: combat reads booleans each frame; throttle via cooldown
    updateFighter(p1, dt, world.bounds, true);
    updateFighter(p2, dt, world.bounds, true);
    resolveCombat(p1, p2, fx, dt);
  }

  async function endMatch(outcome) {
    if (matchOver) return;
    matchOver = true;
    running = false;
    const won = outcome === 'p1';
    const draw = outcome === 'draw';
    let award = draw ? MATCH.DRAW_POINTS : won ? MATCH.WIN_POINTS : MATCH.LOSS_POINTS;
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
    hint.hidden = true;
    hide(pausedOverlay);
    show(result);
  }

  function clearFighters() {
    if (p1) disposeFighter(p1, scene);
    if (p2) disposeFighter(p2, scene);
    p1 = p2 = null;
    fx.clear();
  }

  function spawnFighters() {
    clearFighters();
    const u1 = store.dojo.unlocked[p1Id] || [];
    const u2 = store.dojo.unlocked[p2Id] || [];
    p1 = createFighter({ scene, fighterId: p1Id, side: 'p1', unlockedIds: u1, control: 'human' });
    p2 = createFighter({
      scene, fighterId: p2Id, side: 'p2', unlockedIds: u2,
      control: mode === 'pvp' ? 'human' : 'cpu'
    });
    $('p1-name').textContent = p1.def.name;
    $('p2-name').textContent = p2.def.name + (mode === 'cpu' ? ' · CPU' : '');
    const s1 = (p1.loadout.specials || []).map((id) => SPECIALS[id]?.label || getSkill(id)?.label).filter(Boolean);
    const s2 = (p2.loadout.specials || []).map((id) => SPECIALS[id]?.label || getSkill(id)?.label).filter(Boolean);
    $('p1-sub').textContent = s1.length ? s1.join(' · ') : 'Punch · Kick';
    $('p2-sub').textContent = s2.length ? s2.join(' · ') : 'Punch · Kick';
  }

  async function beginMatch() {
    hide(welcome); hide(roster); hide(dojo); hide(stagePick); hide(result); hide(pausedOverlay);
    spawnFighters();
    timeLeft = MATCH.ROUND_TIME;
    matchOver = false;
    paused = false;
    running = false;
    elapsed = 0;
    matchHud.hidden = false;
    skillTray.hidden = false;
    hint.hidden = false;
    syncHud();

    show(countdown);
    for (const n of [3, 2, 1, 'FIGHT']) {
      $('countdown-num').textContent = n;
      await new Promise((r) => setTimeout(r, n === 'FIGHT' ? 500 : 700));
    }
    hide(countdown);
    running = true;
  }

  // ----- Events -----
  $('start-match').onclick = () => beginMatch();
  $('open-roster').onclick = () => {
    hide(welcome); show(roster); renderUniverseFilters(); renderFighterLists(); setStatus('roster-status', '');
  };
  $('roster-back').onclick = () => { hide(roster); show(welcome); previewNames(); };
  $('roster-done').onclick = () => { hide(roster); show(welcome); previewNames(); };
  $('open-dojo').onclick = () => {
    hide(welcome); show(dojo); renderDojo(); setStatus('dojo-status', ''); refreshPoints();
  };
  $('dojo-done').onclick = () => { hide(dojo); show(welcome); refreshPoints(); };
  $('open-stage').onclick = () => { hide(welcome); show(stagePick); renderStages(); };
  $('stage-done').onclick = () => { hide(stagePick); show(welcome); };
  $('result-again').onclick = () => beginMatch();
  $('result-dojo').onclick = () => { hide(result); show(dojo); renderDojo(); refreshPoints(); };
  $('result-menu').onclick = () => {
    hide(result); clearFighters(); matchHud.hidden = true; skillTray.hidden = true; hint.hidden = true;
    show(welcome); refreshPoints();
  };
  $('resume-match').onclick = () => { paused = false; hide(pausedOverlay); };
  $('end-match').onclick = () => {
    paused = false; running = false; matchOver = true;
    hide(pausedOverlay); clearFighters();
    matchHud.hidden = true; skillTray.hidden = true; hint.hidden = true;
    camera.position.set(0, 3.15, 10.0);
    camPos.copy(camera.position);
    camTarget.set(0, 1.35, 0);
    show(welcome);
  };

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
  });
  window.addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));

  document.querySelectorAll('.touch-controls [data-control]').forEach((btn) => {
    const id = btn.dataset.control;
    const set = (v) => { touch[id] = v; btn.classList.toggle('down', v); };
    btn.addEventListener('pointerdown', (e) => { e.preventDefault(); set(true); });
    btn.addEventListener('pointerup', () => set(false));
    btn.addEventListener('pointerleave', () => set(false));
    btn.addEventListener('pointercancel', () => set(false));
  });

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

    if (running && !paused && !matchOver && p1 && p2) {
      applyInputs(dt);
      timeLeft -= dt;
      syncHud();

      // Camera framing
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2 + 1.35;
      const span = Math.min(10, Math.max(4.5, Math.abs(p1.x - p2.x) + 3.2));
      camTarget.lerp(new THREE.Vector3(midX, midY, 0), 1 - Math.pow(0.001, dt));
      const desired = new THREE.Vector3(midX * 0.08, 2.55 + midY * 0.22, 6.4 + span * 0.42);
      camPos.lerp(desired, 1 - Math.pow(0.05, dt));
      camera.position.copy(camPos);
      camera.lookAt(camTarget);

      if (!p1.alive || !p2.alive || timeLeft <= 0) {
        let outcome = 'draw';
        if (p1.alive && !p2.alive) outcome = 'p1';
        else if (!p1.alive && p2.alive) outcome = 'p2';
        else if (p1.hp !== p2.hp) outcome = p1.hp > p2.hp ? 'p1' : 'p2';
        endMatch(outcome);
      }
    } else if (!running) {
      // Idle camera drift on menu
      camera.position.x = Math.sin(elapsed * 0.25) * 0.5;
      camera.position.y = 3.15 + Math.sin(elapsed * 0.4) * 0.12;
      camera.position.z = 10.0;
      camera.lookAt(0, 1.35, 0);
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
    if (store.user) setStatus('welcome-status', 'Signed in — quiz points sync to the Dojo.');
    else setStatus('welcome-status', 'Playing locally — wins add local points. Sign in to use quiz points.');
    if (store.loadError) setStatus('welcome-status', store.loadError, true);
  });

  previewNames();
  requestAnimationFrame(frame);
})();
