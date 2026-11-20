// Face, tail and side details that make each SUV in the catalog recognisable. The shared body loft lives in city-cars.js.
// Car-local axes: +x right, +y up, -z is the front of the car.

export function createSuvKit(ctx) {
  const { THREE, car, b, add, box, mats } = ctx;
  const { paint, black, chrome, head, tail } = mats;
  const front = b.L / 2;
  const rear = -b.L / 2;
  const W2 = b.W / 2;
  const fz = -front + 0.01;
  const rz = -rear + 0.04;
  const silver = new THREE.MeshStandardMaterial({ color: 0xb5b9bd, roughness: 0.35, metalness: 0.85 });
  const amber = new THREE.MeshStandardMaterial({ color: 0xffa800, emissive: 0xff8a00, emissiveIntensity: 0.8 });
  const white = new THREE.MeshStandardMaterial({ color: 0xf2f2ee, roughness: 0.5 });
  const gloss = new THREE.MeshStandardMaterial({ color: 0x08090b, roughness: 0.15, metalness: 0.6 });

  const tiltBox = (w, h, d, material, x, y, z, rx = 0, ry = 0, rzz = 0) => {
    const m = box(w, h, d, material, x, y, z);
    m.rotation.set(rx, ry, rzz);
    return m;
  };
  const rim = (w, h, cx, y, z, th = 0.04, material = chrome) => {
    box(w + th, th, 0.06, material, cx, y + h / 2, z);
    box(w + th, th, 0.06, material, cx, y - h / 2, z);
    for (const s of [-1, 1]) box(th, h, 0.06, material, cx + s * (w / 2), y, z);
  };
  const star = (x, y, z, r) => {
    const ring = add(new THREE.TorusGeometry(r, r * 0.12, 6, 20), chrome, x, y, z);
    ring.scale.set(1, 1, 1);
    for (let k = 0; k < 3; k++) {
      const spoke = box(r * 0.14, r * 1.0, r * 0.1, chrome, x, y, z);
      spoke.geometry.translate(0, r * 0.5, 0);
      spoke.rotation.z = (k * Math.PI * 2) / 3;
    }
  };
  const pipe = (x, y, z, r, material = chrome, len = 0.14, sides = 12) => {
    const m = add(new THREE.CylinderGeometry(r, r * 0.92, len, sides), material, x, y, z);
    m.rotation.x = Math.PI / 2;
    return m;
  };
  const lowerFascia = (width, y, h = 0.2) => {
    box(width, h, 0.06, black, 0, y, fz + 0.02);
    box(width * 0.82, 0.06, 0.07, silver, 0, y - h / 2 - 0.02, fz + 0.01);
  };

  const fronts = {
    q7() {
      // Octagonal single-frame grille with vertical chrome slats and the four rings above
      box(1.0, 0.46, 0.06, black, 0, 0.82, fz);
      rim(1.0, 0.46, 0, 0.82, fz - 0.03, 0.05);
      for (let k = -3; k <= 3; k++) box(0.025, 0.4, 0.04, chrome, k * 0.13, 0.82, fz - 0.04);
      for (const sx of [-1, 1]) for (const sy of [-1, 1]) tiltBox(0.13, 0.13, 0.09, paint, sx * 0.5, 0.82 + sy * 0.22, fz - 0.05, 0, 0, Math.PI / 4);
      for (let k = 0; k < 4; k++) add(new THREE.TorusGeometry(0.04, 0.011, 6, 16), chrome, -0.13 + k * 0.087, 1.1, fz - 0.07);
      for (const s of [-1, 1]) {
        box(0.66, 0.15, 0.05, black, s * 0.7, 0.98, fz + 0.01);
        tiltBox(0.6, 0.045, 0.05, head, s * 0.7, 0.99, fz - 0.03, 0, 0, -s * 0.1);
        tiltBox(0.62, 0.02, 0.05, chrome, s * 0.7, 0.92, fz - 0.03, 0, 0, -s * 0.1);
        box(0.26, 0.24, 0.06, black, s * 0.82, 0.6, fz + 0.01);
      }
      lowerFascia(1.45, 0.56);
    },
    x5() {
      // Tall twin kidney grilles, narrow hex lamps and big corner intakes
      for (const s of [-1, 1]) {
        tiltBox(0.44, 0.56, 0.06, black, s * 0.26, 0.84, fz, 0, 0, s * 0.06);
        tiltBox(0.5, 0.04, 0.07, chrome, s * 0.26, 1.12, fz - 0.03, 0, 0, s * 0.06);
        tiltBox(0.5, 0.04, 0.07, chrome, s * 0.26, 0.56, fz - 0.03, 0, 0, s * 0.06);
        tiltBox(0.04, 0.58, 0.07, chrome, s * 0.04, 0.84, fz - 0.03, 0, 0, 0);
        tiltBox(0.04, 0.58, 0.07, chrome, s * 0.49, 0.84, fz - 0.03, 0, 0, s * 0.06);
        for (let k = 0; k < 4; k++) box(0.4, 0.025, 0.04, chrome, s * 0.26, 0.64 + k * 0.1, fz - 0.04);
        box(0.62, 0.16, 0.05, black, s * 0.72, 0.99, fz + 0.01);
        tiltBox(0.55, 0.05, 0.05, head, s * 0.72, 0.99, fz - 0.03, 0, 0, s * 0.18);
        tiltBox(0.2, 0.04, 0.05, head, s * 0.92, 0.93, fz - 0.03, 0, 0, -s * 0.5);
        box(0.36, 0.3, 0.06, black, s * 0.74, 0.6, fz + 0.01);
      }
      tiltBox(0.07, 0.02, 0.8, black, -0.32, b.hood + 0.015, -(front - 1.5));
      tiltBox(0.07, 0.02, 0.8, black, 0.32, b.hood + 0.015, -(front - 1.5));
      lowerFascia(0.9, 0.56, 0.14);
    },
    gls() {
      // Wide chrome louvred grille with a large central star and swept LED lamps
      box(1.3, 0.44, 0.06, black, 0, 0.84, fz);
      rim(1.3, 0.44, 0, 0.84, fz - 0.03, 0.06);
      for (let k = -6; k <= 6; k++) box(0.03, 0.4, 0.04, chrome, k * 0.1, 0.84, fz - 0.04);
      star(0, 0.86, fz - 0.07, 0.12);
      for (const s of [-1, 1]) {
        box(0.5, 0.17, 0.05, black, s * 0.79, 1.0, fz + 0.01);
        tiltBox(0.44, 0.045, 0.05, head, s * 0.79, 1.02, fz - 0.03, 0, 0, -s * 0.16);
        tiltBox(0.4, 0.03, 0.05, head, s * 0.79, 0.95, fz - 0.03, 0, 0, -s * 0.16);
        add(new THREE.SphereGeometry(0.06, 10, 8), head, s * 0.82, 0.62, fz - 0.01);
      }
      box(1.5, 0.2, 0.06, black, 0, 0.58, fz + 0.02);
      for (let k = 0; k < 3; k++) box(1.2, 0.025, 0.07, chrome, 0, 0.51 + k * 0.07, fz - 0.01);
    },
    rrs() {
      // Slim horizontal lamps, flat mesh grille and tall corner air curtains
      box(1.5, 0.22, 0.06, black, 0, 0.88, fz);
      rim(1.5, 0.22, 0, 0.88, fz - 0.03, 0.025, silver);
      for (let k = -7; k <= 7; k++) box(0.018, 0.2, 0.04, silver, k * 0.1, 0.88, fz - 0.04);
      for (const s of [-1, 1]) {
        box(0.52, 0.12, 0.05, gloss, s * 0.74, 1.0, fz + 0.01);
        box(0.46, 0.035, 0.05, head, s * 0.74, 1.0, fz - 0.03);
        box(0.14, 0.34, 0.06, black, s * 0.84, 0.64, fz + 0.01);
        box(0.02, 0.1, 0.5, silver, s * (W2 + 0.005), 1.0, -(front - 1.85));
      }
      box(1.3, 0.22, 0.06, black, 0, 0.6, fz + 0.02);
      box(1.2, 0.07, 0.07, silver, 0, 0.47, fz + 0.01);
      // Clamshell bonnet shut line
      for (const s of [-1, 1]) box(0.015, 0.012, 1.3, black, s * (W2 - 0.2), b.hood + 0.01, -(front - 1.0));
    },
    g63() {
      // Round LED lamps, fender-top indicators, upright slatted grille and a flat, bluff nose
      box(0.78, 0.5, 0.06, black, 0, 0.84, fz);
      rim(0.78, 0.5, 0, 0.84, fz - 0.03, 0.05);
      for (let k = -3; k <= 3; k++) box(0.03, 0.46, 0.04, chrome, k * 0.1, 0.84, fz - 0.04);
      star(0, 1.1, fz - 0.06, 0.1);
      for (const s of [-1, 1]) {
        pipe(s * 0.76, 1.03, fz - 0.01, 0.14, black, 0.1, 20);
        pipe(s * 0.76, 1.03, fz - 0.07, 0.115, head, 0.04, 20);
        add(new THREE.TorusGeometry(0.15, 0.025, 8, 24), chrome, s * 0.76, 1.03, fz - 0.07);
        box(0.12, 0.08, 0.12, amber, s * 0.84, b.hood + 0.08, -(front - 0.5));
        box(0.2, 0.16, 0.06, black, s * 0.84, 0.74, fz + 0.01);
        box(0.12, 0.07, 0.08, new THREE.MeshStandardMaterial({ color: 0xc8102e, roughness: 0.5 }), s * 0.45, 0.46, fz + 0.01);
      }
      box(b.W * 0.95, 0.22, 0.08, black, 0, 0.58, fz + 0.04);
    },
    urus() {
      // Y-shaped lamp graphics, a large hexagonal intake and angular bonnet vents
      box(0.84, 0.2, 0.06, black, 0, 0.86, fz);
      for (let k = -4; k <= 4; k++) box(0.02, 0.18, 0.04, silver, k * 0.095, 0.86, fz - 0.03);
      for (const s of [-1, 1]) {
        box(0.6, 0.15, 0.05, black, s * 0.7, 0.95, fz + 0.01);
        tiltBox(0.52, 0.04, 0.05, head, s * 0.7, 0.95, fz - 0.03, 0, 0, -s * 0.16);
        tiltBox(0.32, 0.04, 0.05, head, s * 0.82, 1.0, fz - 0.03, 0, 0, s * 0.62);
        tiltBox(0.3, 0.04, 0.05, head, s * 0.58, 1.0, fz - 0.03, 0, 0, -s * 0.5);
        box(0.38, 0.26, 0.06, black, s * 0.74, 0.57, fz + 0.01);
        tiltBox(0.4, 0.02, 0.7, black, s * 0.36, b.hood + 0.012, -(front - 1.7), 0, s * 0.2, 0);
      }
      box(1.0, 0.3, 0.06, black, 0, 0.6, fz + 0.02);
      box(1.3, 0.06, 0.08, black, 0, 0.45, fz + 0.01);
    }
  };

  const rears = {
    q7() {
      box(1.5, 0.045, 0.05, tail, 0, 1.08, rz);
      for (const s of [-1, 1]) box(0.45, 0.2, 0.05, tail, s * 0.68, 1.04, rz);
      box(1.4, 0.025, 0.05, chrome, 0, 0.92, rz);
      box(0.5, 0.12, 0.05, white, 0, 0.8, rz);
      box(1.75, 0.2, 0.06, black, 0, 0.58, rz);
      for (const s of [-1, 1]) box(0.32, 0.07, 0.06, chrome, s * 0.65, 0.54, rz + 0.01);
    },
    x5() {
      for (const s of [-1, 1]) {
        box(0.1, 0.38, 0.05, tail, s * 0.88, 1.02, rz);
        box(0.4, 0.09, 0.05, tail, s * 0.7, 1.12, rz);
        pipe(s * 0.6, 0.54, rz + 0.02, 0.06, chrome, 0.1, 14);
      }
      box(1.8, 0.02, 0.05, black, 0, 0.9, rz);
      box(0.5, 0.12, 0.05, white, 0, 0.78, rz);
      box(1.75, 0.2, 0.06, black, 0, 0.6, rz);
    },
    gls() {
      for (const s of [-1, 1]) {
        box(0.56, 0.07, 0.05, tail, s * 0.7, 1.13, rz);
        box(0.56, 0.07, 0.05, tail, s * 0.7, 1.01, rz);
        box(0.3, 0.1, 0.06, chrome, s * 0.62, 0.55, rz + 0.01);
      }
      box(1.0, 0.06, 0.05, chrome, 0, 1.07, rz + 0.01);
      star(0, 0.9, rz + 0.03, 0.07);
      box(0.5, 0.12, 0.05, white, 0, 0.78, rz);
      box(1.85, 0.2, 0.06, black, 0, 0.6, rz);
    },
    rrs() {
      box(1.5, 0.24, 0.05, gloss, 0, 1.0, rz);
      for (const s of [-1, 1]) {
        box(0.1, 0.44, 0.05, tail, s * 0.88, 1.0, rz + 0.01);
        box(0.18, 0.03, 0.05, tail, s * 0.78, 1.18, rz + 0.01);
        pipe(s * 0.68, 0.54, rz + 0.02, 0.05, chrome, 0.1, 14);
      }
      box(0.4, 0.035, 0.05, silver, 0, 1.0, rz + 0.02);
      box(0.5, 0.12, 0.05, white, 0, 0.8, rz);
      box(1.85, 0.2, 0.06, black, 0, 0.6, rz);
      box(1.4, 0.06, 0.07, silver, 0, 0.5, rz + 0.01);
    },
    g63() {
      // Spare wheel on the swing-out tailgate
      const spare = add(new THREE.CylinderGeometry(0.4, 0.4, 0.22, 28), mats.tire, 0, 1.1, rz + 0.14);
      spare.rotation.x = Math.PI / 2;
      const cover = add(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 24), paint, 0, 1.1, rz + 0.27);
      cover.rotation.x = Math.PI / 2;
      for (const s of [-1, 1]) {
        box(0.12, 0.3, 0.05, tail, s * 0.88, 1.1, rz);
        box(0.12, 0.08, 0.05, amber, s * 0.88, 0.9, rz);
      }
      box(1.85, 0.2, 0.06, black, 0, 0.6, rz);
      for (const s of [-1, 1]) pipe(s * 0.7, 0.52, rz + 0.02, 0.06, chrome, 0.1, 14);
    },
    urus() {
      box(1.55, 0.05, 0.05, tail, 0, 1.06, rz);
      for (const s of [-1, 1]) {
        tiltBox(0.3, 0.05, 0.05, tail, s * 0.72, 1.02, rz, 0, 0, -s * 0.45);
        tiltBox(0.3, 0.05, 0.05, tail, s * 0.88, 1.12, rz, 0, 0, s * 0.5);
      }
      box(0.5, 0.1, 0.05, white, 0, 0.9, rz);
      box(1.4, 0.26, 0.07, black, 0, 0.6, rz + 0.01);
      for (const s of [-1, 1]) for (const dx of [0.25, 0.5]) pipe(s * dx, 0.52, rz + 0.04, 0.06, chrome, 0.1, 6);
    }
  };

  // Details along the flanks and roof shared by the family, with per-model touches.
  const sides = () => {
    const z0 = -((b.rf + b.rr) / 2);
    const sill = car.id === 'gls' ? silver : black;
    for (const s of [-1, 1]) {
      box(0.06, 0.14, 2.1, black, s * (W2 - 0.02), b.bottom + 0.2, 0);
      if (car.id === 'gls') box(0.12, 0.04, 2.5, sill, s * (W2 + 0.02), b.bottom + 0.06, 0);
      const roofRail = car.id === 'g63' || car.id === 'urus' ? black : silver;
      if (car.id !== 'urus') box(0.04, 0.04, (b.rf - b.rr) * 0.9, roofRail, s * W2 * 0.5, b.roofH + 0.035, z0);
      const pillar = b.blackRoof || car.id === 'urus' ? black : paint;
      const p = box(0.05, b.roofH - 0.14 - b.belt, 0.09, pillar, s * W2 * 0.82, (b.roofH - 0.14 + b.belt) / 2, z0 - 0.1);
      p.rotation.z = -s * 0.16;
      if (car.id === 'q7' || car.id === 'gls') box(0.02, 0.025, (b.cowlU - b.rr) * 0.9, chrome, s * W2 * 0.88, b.belt - 0.19, -(b.cowlU + b.rr) / 2);
      if (car.id === 'g63') {
        // Wide fender flares and the side-exit exhaust
        for (const zw of [-(front - b.wf), -rear - b.wr]) box(0.12, 0.09, 1.15, black, s * (W2 + 0.02), b.radius + 0.5, zw);
        box(0.06, 0.2, 0.05, black, s * W2, b.belt - 0.35, -(b.cowlU - 0.1));
        if (s > 0) pipe(W2 + 0.03, 0.52, 0.5, 0.05, silver, 0.9, 12);
      }
      if (car.id === 'x5') {
        const kink = box(0.02, 0.18, 0.14, black, s * (W2 * 0.88), b.belt + 0.2, -(b.rr + 0.12));
        kink.rotation.x = 0.5;
      }
      if (car.id === 'urus') {
        box(0.04, 0.05, 0.9, black, s * (W2 + 0.005), 0.8, -(front - 2.0));
        box(0.07, 0.2, 0.7, black, s * (W2 - 0.05), 0.62, rear + 1.1);
      }
    }
    if (car.id === 'urus') box(b.W * 0.8, 0.04, 0.3, black, 0, b.roofH - 0.02, -(b.rr + 0.15));
  };

  return { front: fronts[car.id], rear: rears[car.id], sides };
}
