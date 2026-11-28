// Progression for City Driving: smash scoring, free-roam missions, daily challenge,
// personal bests / ghosts, streaks and milestones. Local-first; optional cloud merge.

import { CARS } from './city-cars.js';
import { CITIES, CITY_BY_ID } from './city-cities.js';
import { circuitById, circuitsFor } from './city-circuit.js';
import { routesFor, landmarkName } from './city-routes.js';

const STORAGE_KEY = 'cityDrivingProgress';
const COMBO_WINDOW = 2.4;
const SMASH_WEIGHT = { prop: 1, ped: 2, car: 8 };
const SMASH_PAYOUT_DIV = 8;
const SMASH_PAYOUT_CAP = 36;
const GHOST_HZ = 10;
const GHOST_MAX_SAMPLES = 900;

const MILESTONES = [
  { id: 'first_finish', label: 'First finish', blurb: 'Complete any trip, race or mission' },
  { id: 'first_clean_race', label: 'Clean podium', blurb: 'Finish a race with zero collisions' },
  { id: 'combo_10', label: 'Wrecking chain', blurb: 'Hit a 10× smash combo' },
  { id: 'smash_50_session', label: 'Rampage', blurb: 'Smash 50 things in one open-city drive' },
  { id: 'first_open', label: 'City unlocked', blurb: 'Take an open-city drive' },
  { id: 'own_flyer', label: 'Sky ready', blurb: 'Own a flying car' },
  { id: 'daily_done', label: 'Daily driver', blurb: 'Complete a Daily Drive' },
  { id: 'streak_3', label: 'Three-day streak', blurb: 'Drive three days in a row' },
  { id: 'streak_7', label: 'Week on the road', blurb: 'Drive seven days in a row' }
];

const MISSIONS = [
  {
    id: 'smash_rush',
    name: 'Smash rush',
    blurb: 'Wreck 50 props, peds or cars in 2 minutes',
    reward: 22,
    timeLimit: 120,
    target: 50,
    kind: 'smash'
  },
  {
    id: 'landmark_tour',
    name: 'Landmark tour',
    blurb: 'Drive past 3 different landmarks',
    reward: 20,
    timeLimit: 0,
    target: 3,
    kind: 'landmarks'
  },
  {
    id: 'clean_cruise',
    name: 'Clean cruise',
    blurb: 'Cover 1.2 km without smashing anything',
    reward: 18,
    timeLimit: 0,
    target: 1200,
    kind: 'clean'
  },
  {
    id: 'free_explore',
    name: 'Free explore',
    blurb: 'No goal — smash for points, end when you like',
    reward: 0,
    timeLimit: 0,
    target: 0,
    kind: 'none'
  }
];

function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return todayKey(d);
}

function hashSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function emptyProgress() {
  return {
    version: 1,
    streak: 0,
    lastDriveDate: '',
    milestones: {},
    bestLaps: {},
    bestSmash: {},
    daily: { date: '', completed: false, id: '' },
    seenModes: {}
  };
}

function loadLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const data = JSON.parse(raw);
    return { ...emptyProgress(), ...data, milestones: { ...emptyProgress().milestones, ...(data.milestones || {}) } };
  } catch (error) {
    return emptyProgress();
  }
}

function saveLocal(progress) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch (error) { /* quota */ }
}

export function createSmashScorer() {
  let combo = 0;
  let comboTimer = 0;
  let score = 0;
  let totalHits = 0;
  let maxCombo = 0;
  let last = { props: 0, peds: 0, cars: 0 };

  function softFactor() {
    if (totalHits <= 80) return 1;
    return Math.max(0.15, 1 - (totalHits - 80) / 220);
  }

  function comboMult() {
    return 1 + Math.min(9, Math.max(0, combo - 1)) * 0.25;
  }

  function reset(stats = { props: 0, peds: 0, cars: 0 }) {
    combo = 0;
    comboTimer = 0;
    score = 0;
    totalHits = 0;
    maxCombo = 0;
    last = { props: stats.props | 0, peds: stats.peds | 0, cars: stats.cars | 0 };
  }

  function observe(stats, dt) {
    comboTimer = Math.max(0, comboTimer - dt);
    if (comboTimer === 0) combo = 0;
    const dProp = Math.max(0, (stats.props | 0) - last.props);
    const dPed = Math.max(0, (stats.peds | 0) - last.peds);
    const dCar = Math.max(0, (stats.cars | 0) - last.cars);
    last = { props: stats.props | 0, peds: stats.peds | 0, cars: stats.cars | 0 };
    const hits = dProp + dPed + dCar;
    if (!hits) return { gained: 0, combo, score: Math.floor(score), maxCombo, totalHits };
    let gained = 0;
    const add = (n, kind) => {
      for (let i = 0; i < n; i++) {
        combo = comboTimer > 0 ? combo + 1 : 1;
        comboTimer = COMBO_WINDOW;
        maxCombo = Math.max(maxCombo, combo);
        totalHits++;
        gained += SMASH_WEIGHT[kind] * comboMult() * softFactor();
      }
    };
    add(dProp, 'prop');
    add(dPed, 'ped');
    add(dCar, 'car');
    score += gained;
    return { gained, combo, score: Math.floor(score), maxCombo, totalHits };
  }

  function payout() {
    return Math.min(SMASH_PAYOUT_CAP, Math.floor(score / SMASH_PAYOUT_DIV));
  }

  return {
    reset,
    observe,
    payout,
    snapshot: () => ({
      score: Math.floor(score),
      combo,
      maxCombo,
      totalHits,
      payout: payout()
    })
  };
}

export function missionById(id) {
  return MISSIONS.find((m) => m.id === id) || MISSIONS[MISSIONS.length - 1];
}

export function listMissions() {
  return MISSIONS.slice();
}

export function createMissionTracker(missionId) {
  const mission = missionById(missionId);
  const visited = new Set();
  let progress = 0;
  let elapsed = 0;
  let failed = false;
  let complete = false;

  function tick(dt, ctx) {
    if (complete || failed || mission.kind === 'none') return status();
    elapsed += dt;
    if (mission.kind === 'smash') {
      progress = ctx.smashHits | 0;
      if (progress >= mission.target) complete = true;
    } else if (mission.kind === 'landmarks') {
      if (ctx.landmarkId && !visited.has(ctx.landmarkId)) {
        visited.add(ctx.landmarkId);
        progress = visited.size;
      }
      if (progress >= mission.target) complete = true;
    } else if (mission.kind === 'clean') {
      if ((ctx.smashHits | 0) > 0) {
        failed = true;
      } else {
        progress = Math.min(mission.target, Math.floor(ctx.distance || 0));
        if (progress >= mission.target) complete = true;
      }
    }
    if (!complete && mission.timeLimit > 0 && elapsed >= mission.timeLimit && progress < mission.target) {
      failed = true;
    }
    return status();
  }

  function status() {
    return {
      mission,
      progress,
      elapsed,
      complete,
      failed,
      ratio: mission.target ? Math.min(1, progress / mission.target) : 0,
      label: label()
    };
  }

  function label() {
    if (mission.kind === 'none') return 'Free explore';
    if (failed) return `${mission.name} · failed`;
    if (complete) return `${mission.name} · done!`;
    if (mission.kind === 'smash') {
      const left = Math.max(0, Math.ceil(mission.timeLimit - elapsed));
      return `${mission.name} · ${progress}/${mission.target} · ${left}s`;
    }
    if (mission.kind === 'landmarks') {
      const names = [...visited].map((id) => landmarkName(id)).slice(0, 3);
      return `${mission.name} · ${progress}/${mission.target}${names.length ? ` · ${names.join(', ')}` : ''}`;
    }
    return `${mission.name} · ${(progress / 1000).toFixed(2)} / ${(mission.target / 1000).toFixed(1)} km`;
  }

  return { tick, status, reset: () => { progress = 0; elapsed = 0; failed = false; complete = false; visited.clear(); } };
}

export function dailyChallengeFor(date = new Date()) {
  const dateStr = todayKey(date);
  const rand = mulberry(hashSeed(`city-daily-${dateStr}`));
  const earthCities = CITIES.filter((c) => !c.planet);
  const city = earthCities[Math.floor(rand() * earthCities.length)];
  const roll = rand();
  let challenge;
  if (roll < 0.42) {
    const circuits = circuitsFor({ planet: false });
    const circuit = circuits[Math.floor(rand() * circuits.length)];
    const base = circuit.difficulty === 'challenge' ? 95 : (circuit.difficulty === 'easy' ? 70 : 82);
    const targetSec = Math.round(base + rand() * 25);
    challenge = {
      kind: 'race',
      mode: 'race',
      cityId: city.id,
      circuitId: circuit.id,
      carClass: rand() < 0.5 ? 'civic' : 'any',
      targetSec,
      reward: 28,
      title: `${circuit.name} time attack`,
      blurb: `In ${city.name}, finish ${circuit.name} under ${formatClock(targetSec)}${rand() < 0.5 ? ' in a Civic' : ''}.`
    };
  } else if (roll < 0.72) {
    const target = 40 + Math.floor(rand() * 35);
    challenge = {
      kind: 'smash',
      mode: 'open',
      cityId: city.id,
      missionId: 'smash_rush',
      smashTarget: target,
      reward: 24,
      title: `Smash ${target} in ${city.name}`,
      blurb: `Open city · wreck ${target} things in one session (combo scoring counts).`
    };
  } else {
    const routes = routesFor(city.id);
    const route = routes[Math.floor(rand() * routes.length)];
    challenge = {
      kind: 'district',
      mode: 'district',
      cityId: city.id,
      routeId: route.id,
      clean: rand() < 0.55,
      reward: 20,
      title: `${route.name} run`,
      blurb: `District drive ${route.from} → ${route.to}${rand() < 0.55 ? ' with zero collisions' : ''}.`
    };
  }
  challenge.date = dateStr;
  challenge.id = `${dateStr}:${challenge.kind}:${challenge.cityId}`;
  return challenge;
}

export function formatClock(sec) {
  const s = Math.max(0, sec);
  const m = Math.floor(s / 60);
  const r = s - m * 60;
  return `${m}:${r.toFixed(1).padStart(4, '0')}`;
}

export function createGhostRecorder() {
  const samples = [];
  let acc = 0;

  function reset() {
    samples.length = 0;
    acc = 0;
  }

  function push(dt, sample) {
    acc += dt;
    if (acc < 1 / GHOST_HZ && samples.length) return;
    acc = 0;
    if (samples.length >= GHOST_MAX_SAMPLES) return;
    samples.push({
      t: sample.t,
      x: +sample.x.toFixed(2),
      z: +sample.z.toFixed(2),
      y: +(sample.y || 0).toFixed(2),
      h: +sample.heading.toFixed(3)
    });
  }

  function snapshot() {
    return samples.map((s) => ({ ...s }));
  }

  return { reset, push, snapshot, get samples() { return samples; } };
}

export function sampleGhostAt(samples, time) {
  if (!samples || !samples.length) return null;
  if (time <= samples[0].t) return samples[0];
  if (time >= samples[samples.length - 1].t) return samples[samples.length - 1];
  let lo = 0;
  let hi = samples.length - 1;
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1;
    if (samples[mid].t <= time) lo = mid;
    else hi = mid;
  }
  const a = samples[lo];
  const b = samples[hi];
  const u = (time - a.t) / Math.max(1e-4, b.t - a.t);
  const lerp = (x, y) => x + (y - x) * u;
  let dh = b.h - a.h;
  dh = ((dh + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
  return { t: time, x: lerp(a.x, b.x), z: lerp(a.z, b.z), y: lerp(a.y, b.y), h: a.h + dh * u };
}

export function createProgressStore() {
  const state = { progress: loadLocal() };

  function persist() {
    saveLocal(state.progress);
  }

  function mergeCloud(meta) {
    if (!meta || typeof meta !== 'object') return;
    const local = state.progress;
    local.streak = Math.max(local.streak | 0, meta.streak | 0);
    if ((meta.lastDriveDate || '') > (local.lastDriveDate || '')) local.lastDriveDate = meta.lastDriveDate;
    local.milestones = { ...local.milestones, ...(meta.milestones || {}) };
    local.bestLaps = { ...local.bestLaps, ...(meta.bestLaps || {}) };
    local.bestSmash = { ...local.bestSmash, ...(meta.bestSmash || {}) };
    if (meta.daily && meta.daily.date === todayKey()) {
      local.daily = { ...local.daily, ...meta.daily };
    }
    persist();
  }

  function exportMeta() {
    const p = state.progress;
    // Strip heavy ghost samples from cloud payload — keep times; ghosts stay local.
    const bestLaps = {};
    for (const [k, v] of Object.entries(p.bestLaps || {})) {
      bestLaps[k] = { time: v.time, carId: v.carId, place: v.place, at: v.at };
    }
    return {
      streak: p.streak,
      lastDriveDate: p.lastDriveDate,
      milestones: p.milestones,
      bestLaps,
      bestSmash: p.bestSmash,
      daily: p.daily
    };
  }

  function recordDriveDay() {
    const today = todayKey();
    const p = state.progress;
    if (p.lastDriveDate === today) return p.streak;
    if (p.lastDriveDate === yesterdayKey()) p.streak = (p.streak | 0) + 1;
    else p.streak = 1;
    p.lastDriveDate = today;
    unlock('first_finish');
    if (p.streak >= 3) unlock('streak_3');
    if (p.streak >= 7) unlock('streak_7');
    persist();
    return p.streak;
  }

  function unlock(id) {
    const p = state.progress;
    if (p.milestones[id]) return null;
    const def = MILESTONES.find((m) => m.id === id);
    if (!def) return null;
    p.milestones[id] = { at: Date.now() };
    persist();
    return def;
  }

  function noteMode(mode) {
    state.progress.seenModes[mode] = true;
    if (mode === 'open') return unlock('first_open');
    return null;
  }

  function noteOwnedFlyer(ownedIds) {
    if ((ownedIds || []).some((id) => CARS.find((c) => c.id === id && c.fly))) return unlock('own_flyer');
    return null;
  }

  function lapKey(circuitId, carId) {
    return `${circuitId}|${carId}`;
  }

  function bestLap(circuitId, carId) {
    return state.progress.bestLaps[lapKey(circuitId, carId)] || null;
  }

  function recordLap({ circuitId, carId, time, place, ghost }) {
    const key = lapKey(circuitId, carId);
    const prev = state.progress.bestLaps[key];
    const better = !prev || time < prev.time;
    if (better) {
      state.progress.bestLaps[key] = {
        time,
        carId,
        place,
        at: Date.now(),
        ghost: (ghost || []).slice(0, GHOST_MAX_SAMPLES)
      };
      persist();
    }
    return { better, best: state.progress.bestLaps[key], previous: prev || null };
  }

  function recordSmashBest(cityId, score) {
    const prev = state.progress.bestSmash[cityId];
    if (!prev || score > prev.score) {
      state.progress.bestSmash[cityId] = { score, at: Date.now() };
      persist();
      return true;
    }
    return false;
  }

  function markDaily(challengeId) {
    const today = todayKey();
    state.progress.daily = { date: today, completed: true, id: challengeId };
    unlock('daily_done');
    persist();
  }

  function dailyDone(challenge) {
    const d = state.progress.daily;
    return !!(d && d.date === challenge.date && d.completed && d.id === challenge.id);
  }

  return {
    get progress() { return state.progress; },
    persist,
    mergeCloud,
    exportMeta,
    recordDriveDay,
    unlock,
    noteMode,
    noteOwnedFlyer,
    bestLap,
    recordLap,
    recordSmashBest,
    markDaily,
    dailyDone,
    milestones: MILESTONES,
    todayKey
  };
}

export function cityName(id) {
  return CITY_BY_ID[id]?.name || id;
}

export function circuitName(id) {
  return circuitById(id)?.name || id;
}

export { MISSIONS, MILESTONES, COMBO_WINDOW, SMASH_PAYOUT_CAP };
