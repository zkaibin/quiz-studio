// Points + skill unlock persistence for Arena Clash.
// Signed-in players sync to Firestore; everyone gets a local fallback.
import {
  FIGHTERS, SKILLS, SPECIALS, starterUnlockedIds, getFighter, getSkill
} from './arena-roster.js';

const FS = 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';
const AUTH = 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
const LOCAL_KEY = 'arenaClashDojo';

function freshDojo() {
  const unlocked = {};
  const owned = [];
  for (const f of FIGHTERS) {
    unlocked[f.id] = starterUnlockedIds(f);
    if (f.starter || f.unlockCost === 0) owned.push(f.id);
  }
  return {
    owned,
    selected: owned[0] || 'goku',
    unlocked,
    wins: 0,
    matches: 0
  };
}

function sanitize(data) {
  const dojo = freshDojo();
  if (!data) return dojo;
  const ids = FIGHTERS.map((f) => f.id);
  dojo.owned = [...new Set([
    ...dojo.owned,
    ...(data.owned || []).filter((id) => ids.includes(id))
  ])];
  dojo.selected = dojo.owned.includes(data.selected) ? data.selected : dojo.owned[0];
  dojo.wins = Math.max(0, data.wins | 0);
  dojo.matches = Math.max(0, data.matches | 0);
  dojo.unlocked = {};
  for (const f of FIGHTERS) {
    const base = starterUnlockedIds(f);
    const saved = (data.unlocked && data.unlocked[f.id]) || [];
    const allowed = new Set([
      ...base,
      ...(f.unlockSkills || []),
      ...(f.specials || [])
    ]);
    dojo.unlocked[f.id] = [...new Set([...base, ...saved.filter((id) => allowed.has(id) && getSkill(id))])];
  }
  return dojo;
}

function readLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return sanitize(raw ? JSON.parse(raw) : null);
  } catch {
    return freshDojo();
  }
}

function writeLocal(dojo) {
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(dojo)); } catch { /* ignore */ }
}

export function createDojoStore() {
  const store = {
    user: null,
    db: null,
    fs: null,
    points: 0,
    localPoints: 0,
    dojo: readLocal(),
    ready: null,
    loadError: ''
  };

  try {
    store.localPoints = Math.max(0, parseInt(localStorage.getItem('arenaClashLocalPoints') || '0', 10) || 0);
  } catch { store.localPoints = 0; }

  async function resolveUser() {
    await import('./firebase-config.js');
    store.fs = store.fs || await import(FS);
    store.db = window.FB_DB;
    const auth = window.FB_AUTH;
    if (typeof auth.authStateReady === 'function') await auth.authStateReady();
    store.user = auth.currentUser || await new Promise((resolve) => {
      const timeout = setTimeout(() => resolve(null), 5000);
      import(AUTH).then(({ onAuthStateChanged }) => {
        const off = onAuthStateChanged(auth, (u) => { clearTimeout(timeout); off(); resolve(u); });
      });
    });
  }

  store.init = async () => {
    store.loadError = '';
    try {
      if (!store.user) await resolveUser();
    } catch (error) {
      console.warn('Arena Clash auth unavailable.', error);
      store.user = null;
      return;
    }
    if (store.user) {
      try { await store.refresh(); } catch (error) {
        console.warn('Arena Clash data failed to load.', error);
        store.loadError = 'Signed in, but dojo progress could not load. Using local saves.';
      }
    }
  };

  store.ready = store.init();

  store.displayPoints = () => (store.user ? store.points : store.localPoints);

  store.refresh = async () => {
    const { doc, getDoc } = store.fs;
    store.loadError = '';
    const [userRes, dojoRes] = await Promise.allSettled([
      getDoc(doc(store.db, 'users', store.user.uid)),
      getDoc(doc(store.db, 'arena_clash_dojo', store.user.uid))
    ]);
    if (userRes.status === 'fulfilled') {
      store.points = userRes.value.exists() ? (userRes.value.data().total_points || 0) : 0;
    }
    if (dojoRes.status === 'fulfilled') {
      const remote = dojoRes.value.exists() ? dojoRes.value.data() : null;
      // Merge local unlocks so offline progress is not lost.
      const local = readLocal();
      const merged = sanitize(remote);
      for (const f of FIGHTERS) {
        merged.unlocked[f.id] = [...new Set([
          ...(merged.unlocked[f.id] || []),
          ...(local.unlocked[f.id] || [])
        ])];
        if (local.owned.includes(f.id) && !merged.owned.includes(f.id)) merged.owned.push(f.id);
      }
      store.dojo = merged;
      writeLocal(merged);
    } else {
      store.dojo = readLocal();
      store.loadError = 'Could not sync dojo. Showing local progress.';
    }
  };

  store.persist = async () => {
    writeLocal(store.dojo);
    if (!store.user) return;
    const { doc, setDoc } = store.fs;
    await setDoc(doc(store.db, 'arena_clash_dojo', store.user.uid), store.dojo);
  };

  store.awardPoints = async (amount) => {
    if (amount <= 0) return store.displayPoints();
    if (!store.user) {
      store.localPoints += amount;
      try { localStorage.setItem('arenaClashLocalPoints', String(store.localPoints)); } catch { /* ignore */ }
      return store.localPoints;
    }
    const { doc, runTransaction } = store.fs;
    const userRef = doc(store.db, 'users', store.user.uid);
    store.points = await runTransaction(store.db, async (tx) => {
      const snap = await tx.get(userRef);
      const total = (snap.exists() ? (snap.data().total_points || 0) : 0) + amount;
      tx.set(userRef, { total_points: total }, { merge: true });
      return total;
    });
    return store.points;
  };

  async function spend(cost, apply) {
    if (cost <= 0) {
      apply(store.dojo);
      await store.persist();
      return;
    }
    if (!store.user) {
      if (store.localPoints < cost) throw new Error('Not enough points. Win matches or sign in to use quiz points.');
      apply(store.dojo);
      store.localPoints -= cost;
      try { localStorage.setItem('arenaClashLocalPoints', String(store.localPoints)); } catch { /* ignore */ }
      await store.persist();
      return;
    }
    const { doc, runTransaction } = store.fs;
    const userRef = doc(store.db, 'users', store.user.uid);
    const dojoRef = doc(store.db, 'arena_clash_dojo', store.user.uid);
    const result = await runTransaction(store.db, async (tx) => {
      const [userSnap, dojoSnap] = await Promise.all([tx.get(userRef), tx.get(dojoRef)]);
      const points = userSnap.exists() ? (userSnap.data().total_points || 0) : 0;
      if (points < cost) throw new Error('Not enough points.');
      const dojo = sanitize(dojoSnap.exists() ? dojoSnap.data() : store.dojo);
      apply(dojo);
      tx.set(userRef, { total_points: points - cost }, { merge: true });
      tx.set(dojoRef, dojo);
      return { points: points - cost, dojo };
    });
    store.points = result.points;
    store.dojo = result.dojo;
    writeLocal(result.dojo);
  }

  store.isOwned = (fighterId) => store.dojo.owned.includes(fighterId);

  store.isUnlocked = (fighterId, skillId) => {
    const list = store.dojo.unlocked[fighterId] || starterUnlockedIds(getFighter(fighterId));
    return list.includes(skillId);
  };

  store.unlockFighter = async (fighterId) => {
    const fighter = getFighter(fighterId);
    if (store.isOwned(fighterId)) throw new Error('Already unlocked.');
    await spend(fighter.unlockCost || 0, (d) => {
      if (!d.owned.includes(fighterId)) d.owned.push(fighterId);
      if (!d.unlocked[fighterId]) d.unlocked[fighterId] = starterUnlockedIds(fighter);
      d.selected = fighterId;
    });
  };

  store.unlockSkill = async (fighterId, skillId) => {
    if (!store.isOwned(fighterId)) throw new Error('Unlock this fighter first.');
    if (store.isUnlocked(fighterId, skillId)) throw new Error('Already unlocked.');
    const skill = getSkill(skillId);
    if (!skill) throw new Error('Unknown skill.');
    const fighter = getFighter(fighterId);
    const allowed = new Set([...(fighter.unlockSkills || []), ...(fighter.specials || [])]);
    if (!allowed.has(skillId)) throw new Error('Skill not available for this fighter.');
    await spend(skill.unlockCost || 0, (d) => {
      if (!d.unlocked[fighterId]) d.unlocked[fighterId] = starterUnlockedIds(fighter);
      if (!d.unlocked[fighterId].includes(skillId)) d.unlocked[fighterId].push(skillId);
    });
  };

  store.selectFighter = async (fighterId) => {
    if (!store.isOwned(fighterId)) throw new Error('Fighter locked.');
    store.dojo.selected = fighterId;
    await store.persist();
  };

  store.recordMatch = async ({ won }) => {
    store.dojo.matches += 1;
    if (won) store.dojo.wins += 1;
    await store.persist();
  };

  store.skillCatalog = () => ({ skills: SKILLS, specials: SPECIALS });

  return store;
}
