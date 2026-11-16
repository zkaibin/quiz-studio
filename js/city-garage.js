// Garage persistence for City Driving: owned cars, paint and upgrades, paid for with quiz reward points.
import { CARS, UPGRADES, MAX_UPGRADE_LEVEL, defaultUpgrades, upgradeCost } from './city-cars.js';

const FS = 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';
const AUTH = 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';

const freshGarage = () => ({ owned: ['civic'], selected: 'civic', colors: {}, upgrades: {} });

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
  return garage;
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

  // Adds trip rewards to the shared quiz points total.
  store.awardPoints = async (amount) => {
    if (!store.user || amount <= 0) return false;
    const { doc, runTransaction } = store.fs;
    const userRef = doc(store.db, 'users', store.user.uid);
    store.points = await runTransaction(store.db, async (tx) => {
      const snap = await tx.get(userRef);
      const total = (snap.exists() ? (snap.data().total_points || 0) : 0) + amount;
      tx.set(userRef, { total_points: total }, { merge: true });
      return total;
    });
    return true;
  };

  store.save = async () => {
    if (!store.user) return;
    const { doc, setDoc } = store.fs;
    await setDoc(doc(store.db, 'city_driving_garage', store.user.uid), store.garage);
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
