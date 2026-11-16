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

  store.ready = (async () => {
    try {
      await import('./firebase-config.js');
      store.fs = await import(FS);
      store.db = window.FB_DB;
      const auth = window.FB_AUTH;
      store.user = auth.currentUser || await new Promise((resolve) => {
        const timeout = setTimeout(() => resolve(null), 4000);
        import(AUTH).then(({ onAuthStateChanged }) => {
          const off = onAuthStateChanged(auth, (u) => { clearTimeout(timeout); off(); resolve(u); });
        });
      });
      if (store.user) await store.refresh();
    } catch (error) {
      console.warn('City Driving garage unavailable.', error);
      store.user = null;
    }
  })();

  store.refresh = async () => {
    const { doc, getDoc } = store.fs;
    const [userSnap, garageSnap] = await Promise.all([
      getDoc(doc(store.db, 'users', store.user.uid)),
      getDoc(doc(store.db, 'city_driving_garage', store.user.uid))
    ]);
    store.points = userSnap.exists() ? (userSnap.data().total_points || 0) : 0;
    store.garage = sanitize(garageSnap.exists() ? garageSnap.data() : null);
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
