import { mergeVehicle } from './city-gfx.js';
import { createSuvKit } from './city-suvs.js';

// Car catalog, upgrade maths and 3D model builders for City Driving.

export const UPGRADES = [
  { id: 'engine', label: 'Engine', blurb: '+top speed, +acceleration', baseCost: 10 },
  { id: 'tires', label: 'Tires', blurb: '+steering grip', baseCost: 8 },
  { id: 'brakes', label: 'Brakes', blurb: '+stopping power', baseCost: 8 }
];
export const MAX_UPGRADE_LEVEL = 5;

// Speeds are in m/s (x3.6 for km/h). Prices are in quiz reward points.
export const CARS = [
  {
    id: 'civic', name: 'Honda Civic Type R', tag: 'Hot hatch', price: 0, colors: [0xf2f2f2, 0xc8102e, 0x1b1d22, 0x1d4e9c],
    top: 52, accel: 6.2, brake: 24, handling: 1.0, build: { L: 4.56, W: 1.88, nose: 0.6, hood: 0.92, belt: 1.0, cowlU: 0.85, deckH: 1.1, tailH: 1.0, rf: 0.25, rr: -1.75, rearBase: -2.15, roofH: 1.44, wing: 'high', grille: 'wide' }
  },
  {
    id: 'audi', name: 'Audi RS 5', tag: 'Quattro coupe', price: 40, colors: [0x9aa0a6, 0x1b1d22, 0xc8102e, 0x2f5fa7],
    top: 66, accel: 8.0, brake: 27, handling: 1.05, build: { L: 4.78, W: 1.9, nose: 0.6, hood: 0.98, belt: 1.02, cowlU: 0.75, deckH: 1.08, tailH: 0.92, rf: -0.05, rr: -1.4, rearBase: -1.95, roofH: 1.4, wing: 'lip', grille: 'audi' }
  },
  {
    id: 'bmw', name: 'BMW M4', tag: 'Track coupe', price: 60, colors: [0x2b6fd0, 0xf2f2f2, 0x1b1d22, 0xe4a11b],
    top: 68, accel: 8.4, brake: 27, handling: 1.1, build: { L: 4.79, W: 1.9, nose: 0.58, hood: 0.96, belt: 1.0, cowlU: 0.8, deckH: 1.08, tailH: 0.92, rf: -0.05, rr: -1.35, rearBase: -1.95, roofH: 1.38, wing: 'lip', grille: 'bmw' }
  },
  {
    id: 'porsche', name: 'Porsche 911', tag: 'Rear-engine icon', price: 100, colors: [0xffc20e, 0xc8102e, 0x1b1d22, 0xd9dde0],
    top: 74, accel: 9.2, brake: 30, handling: 1.2, build: { L: 4.52, W: 1.85, nose: 0.55, hood: 0.92, belt: 0.98, cowlU: 1.0, deckH: 1.12, tailH: 1.0, rf: 0.3, rr: -1.4, rearBase: -2.0, roofH: 1.3, wing: 'duck', grille: 'porsche' }
  },
  {
    id: 'q7', name: 'Audi Q7', tag: 'Quattro family SUV', price: 120, colors: [0xf2f2f2, 0x1b1d22, 0x6f7479, 0x1d3f7a],
    top: 62, accel: 7.2, brake: 25, handling: 0.92, build: { L: 5.06, W: 1.97, nose: 1.08, hood: 1.16, belt: 1.22, cowlU: 0.95, deckH: 1.22, tailH: 1.14, rf: 0.3, rr: -1.8, rearBase: -2.3, roofH: 1.76, suv: true, taper: 0.03, radius: 0.41, bottom: 0.42, wf: 1.0, wr: 1.02, grille: 'q7' }
  },
  {
    id: 'x5', name: 'BMW X5', tag: 'Sports activity vehicle', price: 130, colors: [0xf2f2f2, 0x1b1d22, 0x2b6fd0, 0x8a1c24],
    top: 64, accel: 7.6, brake: 26, handling: 0.96, build: { L: 4.94, W: 2.0, nose: 1.08, hood: 1.16, belt: 1.22, cowlU: 0.9, deckH: 1.24, tailH: 1.16, rf: 0.25, rr: -1.75, rearBase: -2.2, roofH: 1.76, suv: true, taper: 0.03, radius: 0.41, bottom: 0.42, wf: 1.0, wr: 1.02, grille: 'x5' }
  },
  {
    id: 'gls', name: 'Mercedes-Benz GLS', tag: 'Luxury full-size SUV', price: 150, colors: [0x1b1d22, 0xf2f2f2, 0x9aa0a6, 0x1f3d2e],
    top: 60, accel: 6.8, brake: 25, handling: 0.88, build: { L: 5.21, W: 2.03, nose: 1.1, hood: 1.19, belt: 1.26, cowlU: 1.0, deckH: 1.28, tailH: 1.2, rf: 0.35, rr: -1.95, rearBase: -2.45, roofH: 1.84, suv: true, taper: 0.03, radius: 0.41, bottom: 0.42, wf: 1.0, wr: 1.02, rounding: 3.1, grille: 'gls' }
  },
  {
    id: 'rrs', name: 'Range Rover Sport', tag: 'Luxury off-roader', price: 170, colors: [0x1f3d2e, 0xf2f2f2, 0x1b1d22, 0xb9a37a],
    top: 63, accel: 7.4, brake: 25, handling: 0.94, build: { L: 4.95, W: 2.0, nose: 1.08, hood: 1.16, belt: 1.22, cowlU: 0.8, deckH: 1.22, tailH: 1.14, rf: 0.2, rr: -1.7, rearBase: -2.2, roofH: 1.78, suv: true, taper: 0.03, radius: 0.41, bottom: 0.42, wf: 1.0, wr: 1.02, rounding: 4.2, tumble: 0.03, blackRoof: true, grille: 'rrs' }
  },
  {
    id: 'lambo', name: 'Lamborghini Huracán', tag: 'Supercar', price: 200, colors: [0x7bc01a, 0xff7a00, 0x1b1d22, 0xd9a400],
    top: 82, accel: 10.2, brake: 32, handling: 1.15, build: { L: 4.52, W: 2.0, nose: 0.42, hood: 0.7, belt: 0.8, cowlU: 1.25, deckH: 0.95, tailH: 0.82, rf: 0.5, rr: -0.5, rearBase: -1.4, roofH: 1.16, wing: 'high', grille: 'lambo' }
  },
  {
    id: 'g63', name: 'Mercedes-AMG G 63', tag: 'Boxy icon · AMG', price: 230, colors: [0x1b1d22, 0xf2f2f2, 0x5a6b3a, 0xc8102e],
    top: 66, accel: 8.2, brake: 27, handling: 0.9, build: { L: 4.72, W: 1.99, nose: 1.06, hood: 1.16, belt: 1.26, cowlU: 0.72, deckH: 1.34, tailH: 1.24, rf: 0.6, rr: -1.85, rearBase: -2.22, roofH: 1.94, suv: true, taper: 0.03, radius: 0.41, bottom: 0.42, wf: 1.0, wr: 1.02, rounding: 6.5, tumble: 0.02, grille: 'g63' }
  },
  {
    id: 'urus', name: 'Lamborghini Urus', tag: 'Super SUV', price: 280, colors: [0xf2c200, 0xff7a00, 0x1b1d22, 0x7bc01a],
    top: 84, accel: 10, brake: 32, handling: 1.1, build: { L: 5.12, W: 2.02, nose: 0.98, hood: 1.06, belt: 1.1, cowlU: 0.9, deckH: 1.14, tailH: 1.04, rf: 0.2, rr: -1.35, rearBase: -2.35, roofH: 1.62, suv: true, taper: 0.03, radius: 0.42, bottom: 0.38, wf: 1.0, wr: 1.0, wing: 'lip', grille: 'urus' }
  },
  {
    id: 'volt', name: 'Volt Roadster X', tag: 'Flying hypercar · 200 m', price: 320, fly: true, maxAlt: 200, colors: [0xd7dde3, 0x1d4e9c, 0xc8102e, 0x1b1d22],
    top: 92, accel: 11.5, brake: 34, handling: 1.2, build: { L: 4.26, W: 1.92, nose: 0.46, hood: 0.78, belt: 0.84, cowlU: 0.7, deckH: 0.96, tailH: 0.88, rf: 0.15, rr: -0.95, rearBase: -1.7, roofH: 1.2, wing: 'lip', grille: 'ev' }
  },
  {
    id: 'aether', name: 'Aether Nova GT', tag: 'Flying hypercar · 200 m', price: 500, fly: true, maxAlt: 200, colors: [0x1b1d22, 0x7a5cff, 0xd7dde3, 0x00b3a4],
    top: 100, accel: 13, brake: 36, handling: 1.25, build: { L: 4.5, W: 1.98, nose: 0.4, hood: 0.7, belt: 0.78, cowlU: 0.9, deckH: 0.9, tailH: 0.8, rf: 0.3, rr: -0.75, rearBase: -1.6, roofH: 1.12, wing: 'high', grille: 'ev' }
  }
];

export const defaultUpgrades = () => ({ engine: 0, tires: 0, brakes: 0 });
export const upgradeCost = (id, level) => Math.round(UPGRADES.find((u) => u.id === id).baseCost * Math.pow(1.7, level));

export function computeStats(car, up = defaultUpgrades()) {
  return {
    top: car.top * (1 + 0.04 * up.engine),
    accel: car.accel * (1 + 0.06 * up.engine),
    handling: car.handling * (1 + 0.08 * up.tires),
    brake: car.brake * (1 + 0.08 * up.brakes)
  };
}

export function buildCarModel(THREE, car, colorHex) {
  const b = car.build;
  const group = new THREE.Group();
  const paint = new THREE.MeshPhysicalMaterial({ color: colorHex, roughness: 0.28, metalness: 0.55, clearcoat: 1, clearcoatRoughness: 0.08 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x0f1c24, roughness: 0.05, metalness: 0.3, clearcoat: 1 });
  const black = new THREE.MeshStandardMaterial({ color: 0x0c0e10, roughness: 0.7 });
  const chrome = new THREE.MeshStandardMaterial({ color: 0xdadde0, roughness: 0.2, metalness: 0.95 });
  const head = new THREE.MeshStandardMaterial({ color: 0xfff6d8, emissive: 0xffe9a8, emissiveIntensity: 0.8 });
  const tail = new THREE.MeshStandardMaterial({ color: 0xff2a2a, emissive: 0xff1010, emissiveIntensity: 0.9 });
  const tire = new THREE.MeshStandardMaterial({ color: 0x151717, roughness: 0.95 });

  const curve = (pts, count) => new THREE.CatmullRomCurve3(pts.map(([u, v]) => new THREE.Vector3(u, v, 0)), false, 'centripetal').getPoints(count);

  // Lofts smooth rounded-rectangle cross sections along the car length (u: front +, converted to world -z).
  const loft = (stations, material, { rounding = 3.2, tumble = 0.1, capShrink = 0.9 } = {}) => {
    const M = 28;
    const positions = [];
    const indices = [];
    stations.forEach((st) => {
      const yc = (st.top + st.bot) / 2;
      const hh = (st.top - st.bot) / 2;
      for (let k = 0; k < M; k++) {
        const t = (k / M) * Math.PI * 2;
        const c = Math.cos(t);
        const sn = Math.sin(t);
        const e = 2 / rounding;
        const x = st.w * Math.sign(c) * Math.pow(Math.abs(c), e) * (1 - tumble * Math.max(0, sn));
        const y = yc + hh * Math.sign(sn) * Math.pow(Math.abs(sn), e);
        positions.push(x, y, -st.u);
      }
    });
    for (let i = 0; i < stations.length - 1; i++) {
      for (let k = 0; k < M; k++) {
        const A = i * M + k;
        const B = i * M + ((k + 1) % M);
        const C = (i + 1) * M + k;
        const D = (i + 1) * M + ((k + 1) % M);
        indices.push(A, B, C, B, D, C);
      }
    }
    const cap = (index, flip) => {
      const st = stations[index];
      const center = positions.length / 3;
      positions.push(0, (st.top + st.bot) / 2, -st.u);
      for (let k = 0; k < M; k++) {
        const p = index * M + k;
        const q = index * M + ((k + 1) % M);
        indices.push(center, flip ? q : p, flip ? p : q);
      }
    };
    cap(0, true);
    cap(stations.length - 1, false);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, material);
    group.add(mesh);
    return mesh;
  };
  const add = (geo, material, x, y, z) => {
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(x, y, z);
    group.add(mesh);
    return mesh;
  };
  const box = (w, h, d, material, x, y, z) => add(new THREE.BoxGeometry(w, h, d), material, x, y, z);

  const front = b.L / 2;
  const rear = -b.L / 2;
  const smooth = (x) => x * x * (3 - 2 * x);
  const bodyTop = curve([
    [front, b.nose - 0.04], [front - 0.22, b.nose + 0.1], [front - 0.9, b.hood - 0.02], [b.cowlU + 0.5, b.hood],
    [b.cowlU, b.belt], [(b.cowlU + rear) / 2, (b.belt + b.deckH) / 2 + 0.02], [rear + 0.9, b.deckH], [rear + 0.2, b.deckH - 0.01], [rear, b.tailH]
  ], 90);
  const bodyBottom = b.bottom ?? 0.3;
  loft(bodyTop.map((p) => {
    const toFront = front - p.x;
    const toRear = p.x - rear;
    const tp = b.taper ?? 0.14;
    const taper = 1 - tp * (1 - smooth(Math.min(1, toFront / 1.1))) - (tp / 2) * (1 - smooth(Math.min(1, toRear / 0.9)));
    const endLift = Math.max(0, 0.22 - Math.min(toFront, toRear)) * 1.1;
    return { u: p.x, top: p.y, bot: bodyBottom + endLift, w: (b.W / 2) * taper };
  }), paint, { rounding: b.rounding ?? 3.4, tumble: b.tumble ?? 0.08 });

  const roofMid = (b.rf + b.rr) / 2;
  const cabinTop = curve([
    [b.cowlU, b.belt - 0.02], [(b.cowlU + b.rf) / 2, (b.belt + b.roofH) / 2 + 0.02], [b.rf, b.roofH - 0.04], [roofMid, b.roofH + 0.02],
    [b.rr, b.roofH - 0.04], [(b.rr + b.rearBase) / 2, (b.roofH + b.deckH) / 2 + 0.02], [b.rearBase, b.deckH - 0.01]
  ], 60);
  const cabinStations = cabinTop.map((p) => ({ u: p.x, top: p.y, bot: b.belt - 0.2, w: (b.W / 2) * 0.88 }));
  loft(cabinStations, glass, b.suv ? { rounding: 4, tumble: 0.12 } : { rounding: 3, tumble: 0.3 });
  loft(cabinTop.filter((p) => p.x < b.rf - 0.04 && p.x > b.rr + 0.04).map((p) => ({ u: p.x, top: p.y + 0.025, bot: p.y - 0.05, w: (b.W / 2) * (b.suv ? 0.78 : 0.7) })), b.blackRoof ? black : paint, { rounding: 3, tumble: b.suv ? 0.1 : 0.2 });

  // Mirrors
  for (const s of [-1, 1]) box(0.16, 0.1, 0.12, paint, s * (b.W / 2 + 0.01), b.belt + 0.04, -(b.cowlU - 0.2));
  // Underbody and splitter
  box(b.W * 0.72, 0.08, b.L - 0.7, black, 0, bodyBottom, 0);
  if (!b.suv) box(b.W * 0.8, 0.05, 0.2, black, 0, 0.3, -(front - 0.08));

  const suv = b.suv ? createSuvKit({ THREE, car, b, add, box, mats: { paint, black, chrome, head, tail, tire } }) : null;

  // Lights
  const lightY = b.nose + 0.08;
  const nz = -(front - 0.1);
  if (b.suv) {
    suv.front();
  } else if (b.grille === 'porsche') {
    for (const s of [-1, 1]) {
      const lamp = add(new THREE.SphereGeometry(0.17, 14, 10), head, s * (b.W / 2 - 0.4), b.hood - 0.08, -(front - 0.6));
      lamp.scale.set(1, 1, 0.8);
      box(0.12, 0.12, 0.05, chrome, s * 0.45, 0.45, nz - 0.02);
    }
    box(0.9, 0.12, 0.05, black, 0, 0.42, nz - 0.02);
  } else if (b.grille === 'lambo') {
    for (const s of [-1, 1]) {
      box(0.5, 0.06, 0.05, head, s * (b.W / 2 - 0.5), lightY + 0.1, nz + 0.03);
      box(0.35, 0.12, 0.05, black, s * 0.55, 0.45, nz - 0.01);
    }
    box(0.7, 0.14, 0.05, black, 0, 0.45, nz - 0.01);
  } else {
    for (const s of [-1, 1]) box(0.5, 0.09, 0.05, head, s * (b.W / 2 - 0.5), lightY + 0.06, nz + 0.03);
    if (b.grille === 'audi') {
      box(0.95, 0.34, 0.05, black, 0, lightY - 0.06, nz - 0.01);
      for (let i = 0; i < 4; i++) {
        const ring = add(new THREE.TorusGeometry(0.045, 0.012, 6, 16), chrome, -0.13 + i * 0.088, lightY + 0.14, nz - 0.04);
        ring.scale.set(1, 1, 1);
      }
    } else if (b.grille === 'bmw') {
      for (const s of [-1, 1]) box(0.34, 0.3, 0.05, black, s * 0.2, lightY - 0.06, nz - 0.01);
      box(0.04, 0.3, 0.06, chrome, 0, lightY - 0.06, nz - 0.02);
    } else {
      box(1.0, 0.2, 0.05, black, 0, lightY - 0.1, nz - 0.01);
    }
    box(b.W * 0.62, 0.14, 0.05, black, 0, 0.45, nz - 0.01);
  }
  const rz = -(rear - 0.02);
  if (b.suv) {
    suv.rear();
  } else if (b.grille === 'porsche') {
    box(b.W - 0.55, 0.08, 0.05, tail, 0, b.tailH - 0.12, rz - 0.04);
  } else {
    for (const s of [-1, 1]) box(0.6, 0.12, 0.05, tail, s * (b.W / 2 - 0.4), b.tailH - 0.06, rz + 0.01);
  }
  if (!b.suv) {
    box(b.W * 0.6, 0.18, 0.06, black, 0, 0.5, rz + 0.01);
    for (const s of [-0.5, -0.32, 0.32, 0.5]) add(new THREE.CylinderGeometry(0.05, 0.05, 0.1, 10), chrome, s, 0.42, rz + 0.06).rotation.x = Math.PI / 2;
  }

  // Wings and spoilers
  if (b.wing === 'high') {
    for (const s of [-1, 1]) box(0.06, 0.28, 0.2, black, s * (b.W / 2 - 0.3), b.tailH + 0.12, rz - 0.12);
    box(b.W - 0.1, 0.05, 0.38, black, 0, b.tailH + 0.28, rz - 0.12);
  } else if (b.wing === 'lip') {
    box(b.W - 0.4, 0.05, 0.16, black, 0, b.deckH + 0.03, rz - 0.15);
  } else if (b.wing === 'duck') {
    box(b.W - 0.5, 0.06, 0.2, paint, 0, b.tailH + 0.02, rz - 0.25);
  }

  // Wheels
  const wheels = [];
  const frontPivots = [];
  const WHEEL_STYLES = {
    civic: { spokes: 5, thick: 0.09, rim: 0x23262a, caliper: 0xc8102e, lugs: true },
    audi: { spokes: 10, thick: 0.035, rim: 0xb9bec4, caliper: 0xc8102e, lugs: true },
    bmw: { spokes: 5, thick: 0.07, rim: 0x2b2e33, caliper: 0x2b6fd0, lugs: false },
    porsche: { spokes: 5, thick: 0.05, rim: 0xcfd2d6, caliper: 0xffc20e, lugs: true },
    lambo: { spokes: 6, thick: 0.11, rim: 0x111214, caliper: 0xff7a00, lugs: false },
    volt: { spokes: 8, thick: 0.03, rim: 0xc9ced3, caliper: 0x1d4e9c, lugs: false },
    aether: { spokes: 12, thick: 0.025, rim: 0x2a2d33, caliper: 0x7a5cff, lugs: false },
    q7: { spokes: 10, thick: 0.035, rim: 0xc3c7cb, caliper: 0x8a1c24, lugs: true },
    x5: { spokes: 10, thick: 0.05, rim: 0x2b2e33, caliper: 0x2b6fd0, lugs: false },
    gls: { spokes: 5, thick: 0.08, rim: 0xd4d7da, caliper: 0xd4d7da, lugs: true },
    rrs: { spokes: 5, thick: 0.1, rim: 0x16181a, caliper: 0xc8102e, lugs: false },
    g63: { spokes: 6, thick: 0.1, rim: 0x2a2d30, caliper: 0xc8102e, lugs: true },
    urus: { spokes: 5, thick: 0.09, rim: 0x202226, caliper: 0xf2c200, lugs: false }
  };
  const wheelStyle = WHEEL_STYLES[car.id] || WHEEL_STYLES.civic;
  const rimMat = new THREE.MeshStandardMaterial({ color: wheelStyle.rim, roughness: 0.25, metalness: 0.9 });
  const spokeMat = rimMat;
  const discMat = new THREE.MeshStandardMaterial({ color: 0x8a8d90, roughness: 0.4, metalness: 0.9 });
  const caliperMat = new THREE.MeshStandardMaterial({ color: wheelStyle.caliper, roughness: 0.4 });
  const radius = b.radius ?? (b.W > 1.95 ? 0.37 : 0.35);
  const wheelX = b.W / 2 - 0.12;
  for (const x of [-wheelX, wheelX]) {
    for (const z of [-(front - (b.wf ?? 0.95)), (-rear) - (b.wr ?? 0.9)]) {
      const arch = new THREE.Mesh(new THREE.CylinderGeometry(radius + 0.07, radius + 0.07, 0.04, 24), black);
      arch.rotation.z = Math.PI / 2;
      arch.position.set(Math.sign(x) * (b.W / 2 - 0.01), radius, z);
      group.add(arch);
      const pivot = new THREE.Group();
      pivot.position.set(x, radius, z);
      const spin = new THREE.Group();
      const sd = Math.sign(x);
      const tyre = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, 0.28, 28), tire);
      tyre.rotation.z = Math.PI / 2;
      const rim = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.7, radius * 0.7, 0.3, 24), rimMat);
      rim.rotation.z = Math.PI / 2;
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.55, radius * 0.55, 0.24, 24), discMat);
      disc.rotation.z = Math.PI / 2;
      spin.add(tyre, disc, rim);
      const n = wheelStyle.spokes;
      for (let i = 0; i < n; i++) {
        const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.02, wheelStyle.thick, radius * 1.3), spokeMat);
        spoke.position.x = sd * 0.15;
        spoke.rotation.x = (i / n) * Math.PI * (n % 2 ? 1 : 2) * (n % 2 ? 1 : 0.5);
        spin.add(spoke);
      }
      if (wheelStyle.lugs) {
        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.02, 12), chrome);
        hub.rotation.z = Math.PI / 2;
        hub.position.x = sd * 0.15;
        spin.add(hub);
      }
      const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.08, radius * 0.55, 0.16), caliperMat);
      caliper.position.set(sd * 0.09, radius * 0.3, -0.12);
      pivot.add(caliper);
      pivot.add(spin);
      group.add(pivot);
      wheels.push(spin);
      if (z < 0) frontPivots.push(pivot);
    }
  }
  // Per-model distinguishing details
  if (suv) suv.sides();
  if (car.id === 'civic') {
    for (const sd of [-1, 1]) box(0.05, 0.06, 0.5, black, sd * (b.W / 2 - 0.02), 0.38, 0);
    box(0.5, 0.04, 0.5, black, 0, b.hood + 0.01, -(front - 1.1));
  } else if (car.id === 'audi') {
    box(b.W * 0.7, 0.03, 0.04, chrome, 0, b.belt - 0.02, rz + 0.04);
    for (const sd of [-1, 1]) box(0.3, 0.07, 0.03, black, sd * 0.55, 0.52, rz + 0.04);
  } else if (car.id === 'bmw') {
    box(0.4, 0.03, 0.9, black, 0, b.hood + 0.01, -(front - 1.3));
    for (const sd of [-1, 1]) box(0.04, 0.12, 0.3, black, sd * (b.W / 2 + 0.005), 0.55, -(front - 1.75));
  } else if (car.id === 'porsche') {
    box(b.W - 0.4, 0.05, 0.05, chrome, 0, b.tailH - 0.2, rz + 0.04);
    for (const sd of [-1, 1]) box(0.06, 0.1, 0.4, black, sd * (b.W / 2 + 0.005), 0.6, (-rear) - 1.5);
  } else if (car.id === 'lambo') {
    for (const sd of [-1, 1]) {
      box(0.05, 0.18, 0.7, black, sd * (b.W / 2 + 0.005), 0.6, (-rear) - 1.3);
      box(0.3, 0.02, 0.6, black, sd * 0.3, b.hood + 0.01, -(front - 1.0));
    }
    box(b.W * 0.85, 0.1, 0.35, black, 0, 0.36, rz);
  }
  if (car.fly) {
    // Nitrogen thrusters: dark nozzles under each corner and at the tail, with flames driven by userData.setThrust(0..1)
    const flameMat = new THREE.MeshBasicMaterial({ color: 0x7fd8ff, transparent: true, opacity: 0.85, depthWrite: false });
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, depthWrite: false });
    const flames = [];
    const nozzle = (x, y, z, r, flameLen, down) => {
      const n = add(new THREE.CylinderGeometry(r, r * 0.8, 0.12, 14), black, x, y, z);
      if (!down) n.rotation.x = Math.PI / 2;
      for (const [mat, k] of [[flameMat, 1], [coreMat, 0.55]]) {
        const f = new THREE.Mesh(new THREE.ConeGeometry(r * 0.9 * k, flameLen * k, 12, 1, true), mat);
        f.userData.dynamic = true;
        f.userData.len = flameLen * k;
        f.userData.down = down;
        f.userData.base = down ? new THREE.Vector3(x, y - 0.06, z) : new THREE.Vector3(x, y, z + 0.06);
        f.visible = false;
        group.add(f);
        flames.push(f);
      }
    };
    for (const sx of [-1, 1]) {
      for (const z of [-(front - 0.95), (-rear) - 0.9]) nozzle(sx * (b.W / 2 - 0.5), 0.28, z, 0.13, 1.1, true);
      nozzle(sx * 0.4, b.tailH - 0.3, rz + 0.04, 0.1, 1.4, false);
    }
    box(b.W * 0.5, 0.025, 0.04, new THREE.MeshStandardMaterial({ color: 0x7fd8ff, emissive: 0x4fc3ff, emissiveIntensity: 1.5 }), 0, lightY + 0.12, nz - 0.03);
    group.userData.setThrust = (t, time) => {
      for (const f of flames) {
        f.visible = t > 0.02;
        if (!f.visible) continue;
        const flick = 0.85 + 0.15 * Math.sin(time * 70 + f.userData.base.x * 9);
        const len = f.userData.len * t * flick;
        f.scale.set(1, Math.max(0.01, t * flick), 1);
        if (f.userData.down) {
          f.rotation.set(Math.PI, 0, 0);
          f.position.set(f.userData.base.x, f.userData.base.y - len / 2, f.userData.base.z);
        } else {
          f.rotation.set(-Math.PI / 2, 0, 0);
          f.position.set(f.userData.base.x, f.userData.base.y, f.userData.base.z + len / 2);
        }
      }
    };
  }
  group.userData.frontPivots = frontPivots;
  group.userData.tail = tail;
  group.userData.halfLen = b.L / 2;
  group.userData.halfWidth = b.W / 2;
  group.userData.wheels = wheels;
  mergeVehicle(group);
  group.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  group.userData.wheelRadius = radius;
  group.userData.paint = paint;
  return group;
}
