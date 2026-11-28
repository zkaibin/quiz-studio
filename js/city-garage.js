// Garage persistence for City Driving: owned cars, paint and upgrades, paid for with quiz reward points.
import { CARS, UPGRADES, MAX_UPGRADE_LEVEL, defaultUpgrades, upgradeCost } from './city-cars.js';

const FS = 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';
const AUTH = 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';

/** Hard ceiling for a single City Drive payout (smash + mission + daily). */
export const MAX_DRIVE_CLAIM = 100;
/** Soft daily ceiling for all City Drive payouts combined. */
export const MAX_DRIVE_POINTS_PER_DAY = 400;

const freshGarage = () => ({ owned: ['civic'], selected: 'civic', colors: {}, upgrades: {}, meta: null });

function sanitize(data) {
  const garage = freshGarage();
  if (!data) return garage;
  const ids = CARS.map((c) => c.id);
  garage.owned = ['civic', ...(data.owned || []).filter((id) => ids.includes(id) && id !== 'civic')];
  garage.selected = garage.owned.includes(data.selected) ? data.selected : 'civic';
  garage.colors = data.colors || {};
  for (const id of garage.owned) {
    const saved = (data.upgrades && data.upgrades[id]) || {};
    garage.upgrades[id] = defaultUpgrades();
    for (const u of UPGRADES) garage.upgrades[id][u.id] = Math.max(0, Math.min(MAX_UPGRADE_LEVEL, saved[u.id] | 0));
  }
  garage.meta = data.meta && typeof data.meta === 'object' ? data.meta : null;
  return garage;
}

function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function clampClaimAmount(amount) {
  const n = Math.floor(Number(amount) || 0);
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.min(MAX_DRIVE_CLAIM, n);
}

export function createGarageStore() {
  const store = { user: null, db: null, fs: null, points: 0, garage: sanitize(null), ready: null };

  store.loadError = '';

  // Auth and garage loading are separate so a Firestore failure never looks like being signed out.
  async function resolveUser() {
    await import('./firebase-config.js');
    store.fs = store.fs || await import(FS);
    store.db = window.FB_DB;
    const auth = window.FB_AUTH;
    if (typeof auth.authStateReady === 'function') await auth.authStateReady();
    store.user = auth.currentUser || await new Promise((resolve) => {
      const timeout = setTimeout(() => resolve(null), 6000);
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
      console.warn('City Driving auth unavailable.', error);
      store.user = null;
      return;
    }
    if (store.user) {
      try { await store.refresh(); } catch (error) {
        console.warn('City Driving data failed to load.', error);
        store.loadError = 'Signed in, but your garage could not be loaded. Please try again.';
      }
    }
  };

  store.ready = store.init();

  // Points and garage load independently so a garage failure never zeroes the points balance.
  store.refresh = async () => {
    const { doc, getDoc } = store.fs;
    store.loadError = '';
    const [userRes, garageRes] = await Promise.allSettled([
      getDoc(doc(store.db, 'users', store.user.uid)),
      getDoc(doc(store.db, 'city_driving_garage', store.user.uid))
    ]);
    if (userRes.status === 'fulfilled') {
      store.points = userRes.value.exists() ? (userRes.value.data().total_points || 0) : 0;
    } else {
      console.warn('City Driving points failed to load.', userRes.reason);
    }
    if (garageRes.status === 'fulfilled') {
      store.garage = sanitize(garageRes.value.exists() ? garageRes.value.data() : null);
    } else {
      console.warn('City Driving garage failed to load.', garageRes.reason);
      store.garage = sanitize(null);
      store.loadError = 'Signed in, but your garage could not be loaded. Showing the starter car; please try again.';
    }
  };

  /**
   * Idempotent City Drive payout.
   * - Same claimId never credits twice (create-once claim doc).
   * - Optional dailyId/dailyAmount is create-once (Daily Drive bonus).
   * - Per-claim and per-day caps clamp the credit.
   */
  store.claimDriveReward = async ({
    claimId,
    amount = 0,
    dailyAmount = 0,
    dailyId = null,
    kind = 'drive'
  } = {}) => {
    if (!store.user) return { ok: false, awarded: 0, reason: 'signed-out', points: store.points };
    const safeClaim = String(claimId || '').replace(/[^a-zA-Z0-9:_-]/g, '').slice(0, 120);
    if (!safeClaim) return { ok: false, awarded: 0, reason: 'bad-claim', points: store.points };

    const base = clampClaimAmount(amount);
    const dailyWanted = dailyId ? clampClaimAmount(dailyAmount) : 0;
    if (base <= 0 && dailyWanted <= 0) {
      return { ok: true, awarded: 0, reason: 'zero', points: store.points };
    }

    const { doc, runTransaction, serverTimestamp } = store.fs;
    const uid = store.user.uid;
    const claimRef = doc(store.db, 'city_driving_claims', `${uid}_${safeClaim}`);
    const dailyRef = dailyId
      ? doc(store.db, 'city_driving_claims', `${uid}_daily_${String(dailyId).replace(/[^a-zA-Z0-9:_-]/g, '').slice(0, 100)}`)
      : null;
    const economyRef = doc(store.db, 'city_driving_economy', uid);
    const userRef = doc(store.db, 'users', uid);
    const day = todayKey();

    const result = await runTransaction(store.db, async (tx) => {
      const claimSnap = await tx.get(claimRef);
      if (claimSnap.exists()) {
        const userSnap = await tx.get(userRef);
        const points = userSnap.exists() ? (userSnap.data().total_points || 0) : 0;
        return { awarded: 0, reason: 'duplicate', points, dayCapHit: false };
      }

      let dailyAlready = false;
      if (dailyRef) {
        const dailySnap = await tx.get(dailyRef);
        dailyAlready = dailySnap.exists();
      }
      const dailyCredit = dailyAlready ? 0 : dailyWanted;
      const requested = clampClaimAmount(base + dailyCredit);

      const economySnap = await tx.get(economyRef);
      const economy = economySnap.exists() ? economySnap.data() : { day, awarded: 0 };
      const awardedToday = economy.day === day ? (economy.awarded | 0) : 0;
      const room = Math.max(0, MAX_DRIVE_POINTS_PER_DAY - awardedToday);

      const userSnap = await tx.get(userRef);
      const currentPoints = userSnap.exists() ? (userSnap.data().total_points || 0) : 0;

      if (room <= 0 || requested <= 0) {
        // Consume the run claim so this session cannot be retried for points.
        tx.set(claimRef, {
          user_id: uid,
          claim_id: safeClaim,
          kind,
          amount_requested: requested,
          amount_awarded: 0,
          reason: requested <= 0 ? (dailyAlready ? 'daily-duplicate' : 'zero') : 'day-cap',
          day,
          created_at: serverTimestamp()
        });
        return {
          awarded: 0,
          reason: requested <= 0 ? (dailyAlready ? 'daily-duplicate' : 'zero') : 'day-cap',
          points: currentPoints,
          dayCapHit: room <= 0
        };
      }

      const awarded = Math.min(requested, room);
      const points = currentPoints + awarded;

      tx.set(claimRef, {
        user_id: uid,
        claim_id: safeClaim,
        kind,
        amount_requested: requested,
        amount_awarded: awarded,
        daily_id: dailyId || null,
        day,
        created_at: serverTimestamp()
      });
      // Only burn the daily claim when some points actually land.
      if (dailyRef && dailyId && !dailyAlready && dailyCredit > 0 && awarded > 0) {
        tx.set(dailyRef, {
          user_id: uid,
          claim_id: `daily_${dailyId}`,
          kind: 'daily',
          amount_awarded: Math.min(dailyCredit, awarded),
          day,
          created_at: serverTimestamp()
        });
      }
      tx.set(economyRef, { day, awarded: awardedToday + awarded, updated_at: serverTimestamp() }, { merge: true });
      if (awarded > 0) tx.set(userRef, { total_points: points }, { merge: true });

      return {
        awarded,
        reason: awarded < requested ? 'partial' : 'ok',
        points,
        dayCapHit: awarded < requested && room < requested
      };
    });

    store.points = result.points;
    return { ok: true, ...result };
  };

  // Deprecated: always mint a unique claim id (not safe against farming). Prefer claimDriveReward.
  store.awardPoints = async (amount) => {
    console.warn('City Driving awardPoints is deprecated; use claimDriveReward.');
    return false;
  };

  store.save = async () => {
    if (!store.user) return;
    const { doc, setDoc } = store.fs;
    await setDoc(doc(store.db, 'city_driving_garage', store.user.uid), store.garage);
  };

  // Lightweight progression blob (streaks, best times without ghosts) merged into the garage doc.
  store.saveMeta = async (meta) => {
    if (!store.user || !meta) return;
    store.garage.meta = meta;
    const { doc, setDoc } = store.fs;
    await setDoc(doc(store.db, 'city_driving_garage', store.user.uid), { meta }, { merge: true });
  };

  // Atomically deducts points and applies the garage change.
  async function spend(cost, apply) {
    if (!store.user) throw new Error('Sign in to use points.');
    const { doc, runTransaction } = store.fs;
    const userRef = doc(store.db, 'users', store.user.uid);
    const garageRef = doc(store.db, 'city_driving_garage', store.user.uid);
    const result = await runTransaction(store.db, async (tx) => {
      const [userSnap, garageSnap] = await Promise.all([tx.get(userRef), tx.get(garageRef)]);
      const points = userSnap.exists() ? (userSnap.data().total_points || 0) : 0;
      if (points < cost) throw new Error('Not enough points.');
      const garage = sanitize(garageSnap.exists() ? garageSnap.data() : null);
      apply(garage);
      tx.set(userRef, { total_points: points - cost }, { merge: true });
      tx.set(garageRef, garage);
      return { points: points - cost, garage };
    });
    store.points = result.points;
    store.garage = result.garage;
  }

  store.buyCar = (car) => spend(car.price, (g) => {
    if (g.owned.includes(car.id)) throw new Error('Already owned.');
    g.owned.push(car.id);
    g.upgrades[car.id] = defaultUpgrades();
    g.selected = car.id;
  });

  store.buyUpgrade = (carId, upgradeId) => {
    const level = store.garage.upgrades[carId]?.[upgradeId] ?? 0;
    if (level >= MAX_UPGRADE_LEVEL) return Promise.reject(new Error('Max level.'));
    return spend(upgradeCost(upgradeId, level), (g) => {
      if (!g.owned.includes(carId)) throw new Error('Car not owned.');
      if (g.upgrades[carId][upgradeId] !== level) throw new Error('Garage changed, try again.');
      g.upgrades[carId][upgradeId] = level + 1;
    });
  };

  return store;
}
