import * as THREE_NAMESPACE from './vendor/three/three.module.min.js';
import { OrbitControls } from './vendor/three/OrbitControls.js';

window.THREE = { ...THREE_NAMESPACE, OrbitControls };

(function () {
  const Core = window.RubiksCubeCore;
  const THREE = window.THREE;
  const missingDeps = [];
  if (!Core) missingDeps.push('RubiksCubeCore');
  if (!THREE) missingDeps.push('THREE');

  const FACE = Core ? Core.FACE : {};
  const FACE_COLORS = Core ? Core.FACE_COLORS : [];
  const MOVE_INFO = Core ? Core.FACE_MOVE_INFO : {};
  const CUBIE_SIZE_RATIO = 0.985;
  const STICKER_SIZE_RATIO = 0.84;
  const STICKER_LIFT = 0.004;
  const MIN_MOVE_DURATION_MS = 55;
  const PERPENDICULAR_EPSILON = 1e-6;
  const PROJECTION_EPSILON = 1e-4;
  const DRAG_DIRECTION_MIN_COMPONENT_PX = 6;
  const DRAG_DIRECTION_SIGN_BY_FACE = { U: -1, D: -1, R: -1, L: -1, F: -1, B: -1 };
  const FACE_LOCAL_AXES = {};
  const FACE_CAMERA_UP = {};
  if (Core) {
    FACE_LOCAL_AXES[FACE.U] = { u: [1, 0, 0], v: [0, 0, 1], n: [0, 1, 0] };
    FACE_LOCAL_AXES[FACE.D] = { u: [1, 0, 0], v: [0, 0, -1], n: [0, -1, 0] };
    FACE_LOCAL_AXES[FACE.F] = { u: [1, 0, 0], v: [0, -1, 0], n: [0, 0, 1] };
    FACE_LOCAL_AXES[FACE.B] = { u: [-1, 0, 0], v: [0, -1, 0], n: [0, 0, -1] };
    FACE_LOCAL_AXES[FACE.L] = { u: [0, 0, 1], v: [0, -1, 0], n: [-1, 0, 0] };
    FACE_LOCAL_AXES[FACE.R] = { u: [0, 0, -1], v: [0, -1, 0], n: [1, 0, 0] };
    Object.entries(FACE_LOCAL_AXES).forEach(([faceKey, axes]) => {
      const faceUp = [-axes.v[0], -axes.v[1], -axes.v[2]];
      FACE_CAMERA_UP[faceKey] = faceUp;
    });
  }

  let size = 3;
  let model = null;
  let moveCount = 0;
  let lastMove = '—';
  let scrambleText = '—';
  let statusTone = 'ready';
  let statusText = 'Ready. Scramble to begin.';
  let history = [];
  let redoStack = [];
  let moveQueue = [];
  let processingQueue = false;
  let animation = null;
  let scrambleSeed = 1;
  let animationSpeed = 1;
  let stateMoveStack = [];

  let renderer, scene, camera, controls;
  let coarsePointerQuery = null;
  let cubeGroup;
  let raycaster;
  let pointer = null;
  const dragState = { active: false, turned: false, sticker: null, start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, pointerId: null };

  const refs = {
    mount: document.getElementById('rk3d-mount'),
    sizeSelect: document.getElementById('rk-size'),
    scrambleBtn: document.getElementById('rk-scramble-btn'),
    resetBtn: document.getElementById('rk-reset-btn'),
    undoBtn: document.getElementById('rk-undo-btn'),
    redoBtn: document.getElementById('rk-redo-btn'),
    solveBtn: document.getElementById('rk-solve-btn'),
    applyBtn: document.getElementById('rk-apply-btn'),
    speedSelect: document.getElementById('rk-speed'),
    algInput: document.getElementById('rk-alg-input'),
    statusBadge: document.getElementById('rk-status-badge'),
    statusText: document.getElementById('rk-status-text'),
    moves: document.getElementById('rk-moves'),
    last: document.getElementById('rk-last'),
    scramble: document.getElementById('rk-scramble'),
    net: document.getElementById('rk-net')
  };

  function populateSizeOptions() {
    refs.sizeSelect.innerHTML = Array.from({ length: 9 }, (_, i) => i + 2)
      .map((n) => `<option value="${n}" ${n === size ? 'selected' : ''}>${n}×${n}</option>`)
      .join('');
  }

  function vecDot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function vecCross(a, b) {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  }
  function vecScale(a, f) { return [a[0] * f, a[1] * f, a[2] * f]; }
  function vecNorm(a) {
    const len = Math.hypot(a[0], a[1], a[2]);
    return len ? [a[0] / len, a[1] / len, a[2] / len] : [0, 0, 0];
  }
  function vecNeg(a) { return [-a[0], -a[1], -a[2]]; }
  function axisIndexOfVector(v) {
    const components = [Math.abs(v[0] ?? 0), Math.abs(v[1] ?? 0), Math.abs(v[2] ?? 0)];
    let bestAxis = null;
    let best = -1;
    for (let axis = 0; axis < 3; axis++) {
      if (components[axis] > best) {
        bestAxis = axis;
        best = components[axis];
      }
    }
    return best > 0 ? bestAxis : null;
  }
  function dominantAxisVector(v, excludedAxis) {
    const excluded = new Set(Array.isArray(excludedAxis) ? excludedAxis : (excludedAxis === undefined ? [] : [excludedAxis]));
    const components = [v.x ?? v[0] ?? 0, v.y ?? v[1] ?? 0, v.z ?? v[2] ?? 0];
    let bestAxis = -1;
    let bestValue = -1;
    for (let axis = 0; axis < 3; axis++) {
      if (excluded.has(axis)) continue;
      const abs = Math.abs(components[axis]);
      if (abs > bestValue) {
        bestAxis = axis;
        bestValue = abs;
      }
    }
    if (bestAxis === -1 || bestValue <= 0) return null;
    const out = [0, 0, 0];
    out[bestAxis] = components[bestAxis] >= 0 ? 1 : -1;
    return out;
  }
  function faceIndexFromVector(v) {
    if (!v) return null;
    if (v[1] === 1) return FACE.U;
    if (v[1] === -1) return FACE.D;
    if (v[2] === 1) return FACE.F;
    if (v[2] === -1) return FACE.B;
    if (v[0] === -1) return FACE.L;
    if (v[0] === 1) return FACE.R;
    return null;
  }
  function coordinateForIndex(index, size) {
    return index * 2 - (size - 1);
  }
  function indexFromCoordinate(value, size) {
    return Math.round((value + (size - 1)) / 2);
  }

  function currentViewBasis() {
    const fallback = { front: [0, 0, 1], up: [0, 1, 0], right: [1, 0, 0] };
    if (!camera || !controls) return fallback;
    const viewDirection = camera.position.clone().sub(controls.target).normalize();
    const front = dominantAxisVector(viewDirection) || fallback.front;
    const frontAxis = axisIndexOfVector(front);
    const excludedFrontAxis = frontAxis === null ? [] : [frontAxis];

    let up = dominantAxisVector(camera.up, excludedFrontAxis);
    if (!up || Math.abs(vecDot(up, front)) > PERPENDICULAR_EPSILON) {
      up = dominantAxisVector([0, 1, 0], excludedFrontAxis) || dominantAxisVector([0, 0, 1], excludedFrontAxis) || fallback.up;
    }
    let right = vecCross(up, front);
    if (!right[0] && !right[1] && !right[2]) right = fallback.right;
    right = dominantAxisVector(right) || fallback.right;
    up = dominantAxisVector(vecCross(front, right), [frontAxis]) || up;

    return { front, up, right };
  }

  function slotBasis(slot, basis) {
    const { front, up, right } = basis;
    if (slot === 'F') return { normal: front, up: up };
    if (slot === 'B') return { normal: vecNeg(front), up: up };
    if (slot === 'R') return { normal: right, up: up };
    if (slot === 'L') return { normal: vecNeg(right), up: up };
    if (slot === 'U') return { normal: up, up: vecNeg(front) };
    if (slot === 'D') return { normal: vecNeg(up), up: front };
    return null;
  }

  function orientedFaceGrid(faceIndex, slot, basis, sizeNow) {
    const source = model.faces[faceIndex];
    const faceAxes = FACE_LOCAL_AXES[faceIndex];
    const slotAxes = slotBasis(slot, basis);
    if (!source || !faceAxes || !slotAxes) return source;

    const targetRight = vecCross(slotAxes.up, slotAxes.normal);
    const targetDown = vecNeg(slotAxes.up);
    const out = Array.from({ length: sizeNow }, () => Array(sizeNow).fill(0));
    for (let row = 0; row < sizeNow; row++) {
      for (let col = 0; col < sizeNow; col++) {
        const colCoord = coordinateForIndex(col, sizeNow);
        const rowCoord = coordinateForIndex(row, sizeNow);
        const worldVec = [
          faceAxes.u[0] * colCoord + faceAxes.v[0] * rowCoord,
          faceAxes.u[1] * colCoord + faceAxes.v[1] * rowCoord,
          faceAxes.u[2] * colCoord + faceAxes.v[2] * rowCoord
        ];
        const nextCol = indexFromCoordinate(vecDot(worldVec, targetRight), sizeNow);
        const nextRow = indexFromCoordinate(vecDot(worldVec, targetDown), sizeNow);
        out[nextRow][nextCol] = source[row][col];
      }
    }
    return out;
  }

  function updateRendererPixelRatio() {
    if (!renderer) return;
    const isTouchDevice = !!(coarsePointerQuery && coarsePointerQuery.matches);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isTouchDevice ? 1.5 : 2));
  }

  function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(4.4, 4.2, 5.8);

    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    coarsePointerQuery = window.matchMedia('(pointer: coarse)');
    updateRendererPixelRatio();
    if (typeof coarsePointerQuery.addEventListener === 'function') {
      coarsePointerQuery.addEventListener('change', updateRendererPixelRatio);
    }
    renderer.domElement.style.touchAction = 'none';
    refs.mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    const key = new THREE.DirectionalLight(0xffffff, 0.7);
    key.position.set(4, 8, 6);
    const rim = new THREE.DirectionalLight(0x93c5fd, 0.35);
    rim.position.set(-6, 2, -4);
    scene.add(ambient, key, rim);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 4;
    controls.maxDistance = 12;
    controls.addEventListener('change', renderNet);

    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();
    cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('pointercancel', onPointerUp);
    window.addEventListener('resize', resize);
    resize();
    renderLoop();
  }

  function alignCameraToFace(face) {
    const faceIndex = typeof face === 'string' ? FACE[face] : face;
    const axes = FACE_LOCAL_AXES[faceIndex];
    if (!axes || !camera || !controls) return;
    const target = controls.target.clone();
    const distance = camera.position.distanceTo(target) || 6;
    const normal = new THREE.Vector3(axes.n[0], axes.n[1], axes.n[2]).normalize();
    const faceUp = FACE_CAMERA_UP[faceIndex];
    camera.up.set(faceUp[0], faceUp[1], faceUp[2]);
    camera.position.copy(target).add(normal.multiplyScalar(distance));
    camera.lookAt(target);
    controls.update();
  }

  function resize() {
    const rect = refs.mount.getBoundingClientRect();
    const width = Math.max(320, Math.floor(rect.width));
    const height = Math.max(300, Math.floor(rect.height));
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  function clearGroup(group) {
    while (group.children.length) {
      const child = group.children.pop();
      child.traverse((node) => {
        if (node.geometry) node.geometry.dispose();
        if (node.material) {
          if (Array.isArray(node.material)) node.material.forEach((m) => m.dispose());
          else node.material.dispose();
        }
      });
    }
  }

  function positionToFaceIndex(sticker) {
    if (sticker.ny === 1) return FACE.U;
    if (sticker.ny === -1) return FACE.D;
    if (sticker.nz === 1) return FACE.F;
    if (sticker.nz === -1) return FACE.B;
    if (sticker.nx === -1) return FACE.L;
    if (sticker.nx === 1) return FACE.R;
    return null;
  }

  function rowColFromSticker(sticker, sizeNow) {
    const idx = (v) => Math.round((v + (sizeNow - 1)) / 2);
    const face = positionToFaceIndex(sticker);
    switch (face) {
      case FACE.U: return { face, row: idx(sticker.z), col: idx(sticker.x) };
      case FACE.D: return { face, row: idx(-sticker.z), col: idx(sticker.x) };
      case FACE.F: return { face, row: idx(-sticker.y), col: idx(sticker.x) };
      case FACE.B: return { face, row: idx(-sticker.y), col: idx(-sticker.x) };
      case FACE.L: return { face, row: idx(-sticker.y), col: idx(sticker.z) };
      case FACE.R: return { face, row: idx(-sticker.y), col: idx(-sticker.z) };
      default: return null;
    }
  }

  function buildCubeMeshes() {
    clearGroup(cubeGroup);

    const spacing = 1 / Math.max(2, size);
    const cubieSize = spacing * CUBIE_SIZE_RATIO;
    const stickerSize = spacing * STICKER_SIZE_RATIO;
    const offset = cubieSize / 2 + STICKER_LIFT;

    const coreGeo = new THREE.BoxGeometry(cubieSize, cubieSize, cubieSize);
    const coreMat = new THREE.MeshPhongMaterial({ color: 0x0b1020, shininess: 18 });
    const stickerGeo = new THREE.PlaneGeometry(stickerSize, stickerSize);

    const stickersByCubie = model.stickerMapByCubie();
    const coords = Core.coordinateValues(size);

    for (const x of coords) {
      for (const y of coords) {
        for (const z of coords) {
          const max = size - 1;
          if (Math.abs(x) !== max && Math.abs(y) !== max && Math.abs(z) !== max) continue;

          const cubie = new THREE.Group();
          cubie.userData.coord = { x, y, z };

          const core = new THREE.Mesh(coreGeo, coreMat.clone());
          cubie.add(core);

          const key = `${x},${y},${z}`;
          const map = stickersByCubie.get(key) || {};
          Object.entries(map).forEach(([normalKey, colorIndex]) => {
            const [nx, ny, nz] = normalKey.split(',').map(Number);
            const mat = new THREE.MeshPhongMaterial({ color: FACE_COLORS[colorIndex], shininess: 70 });
            const plane = new THREE.Mesh(stickerGeo, mat);
            plane.position.set(nx * offset, ny * offset, nz * offset);
            plane.lookAt(nx * 2, ny * 2, nz * 2);

            const stickerMeta = rowColFromSticker({ x, y, z, nx, ny, nz }, size);
            plane.userData.sticker = {
              ...stickerMeta,
              center: [x, y, z],
              normal: [nx, ny, nz],
              coord: { x, y, z }
            };
            cubie.add(plane);
          });

          cubie.position.set(x * spacing, y * spacing, z * spacing);
          cubeGroup.add(cubie);
        }
      }
    }
  }

  function setStatus(text, tone) {
    statusText = text;
    statusTone = tone || statusTone;
    refs.statusText.textContent = statusText;
    refs.statusBadge.className = `badge ${statusTone}`;
    refs.statusBadge.textContent = ({ ready: 'Ready', active: 'Active', warning: 'Check', success: 'Solved' }[statusTone] || 'Ready');
  }

  function refreshUI() {
    refs.moves.textContent = String(moveCount);
    refs.last.textContent = lastMove;
    refs.scramble.textContent = scrambleText;
    refs.undoBtn.disabled = !history.length || processingQueue || !!animation;
    refs.redoBtn.disabled = !redoStack.length || processingQueue || !!animation;
    refs.solveBtn.disabled = !stateMoveStack.length || processingQueue || !!animation;
    refs.sizeSelect.disabled = processingQueue || !!animation;
    refs.speedSelect.disabled = processingQueue || !!animation;
    refs.applyBtn.disabled = processingQueue || !!animation;
    refs.scrambleBtn.disabled = processingQueue || !!animation;
    refs.resetBtn.disabled = processingQueue || !!animation;
    renderNet();
  }

  function renderNet() {
    if (!model || !refs.net) return;
    const basis = currentViewBasis();
    const fallbackBySlot = { U: FACE.U, L: FACE.L, F: FACE.F, R: FACE.R, B: FACE.B, D: FACE.D };
    const mapping = {
      U: faceIndexFromVector(slotBasis('U', basis).normal) ?? fallbackBySlot.U,
      L: faceIndexFromVector(slotBasis('L', basis).normal) ?? fallbackBySlot.L,
      F: faceIndexFromVector(slotBasis('F', basis).normal) ?? fallbackBySlot.F,
      R: faceIndexFromVector(slotBasis('R', basis).normal) ?? fallbackBySlot.R,
      B: faceIndexFromVector(slotBasis('B', basis).normal) ?? fallbackBySlot.B,
      D: faceIndexFromVector(slotBasis('D', basis).normal) ?? fallbackBySlot.D
    };
    const templates = [
      { slot: 'U', cls: 'u', label: 'U' },
      { slot: 'L', cls: 'l', label: 'L' },
      { slot: 'F', cls: 'f', label: 'F' },
      { slot: 'R', cls: 'r', label: 'R' },
      { slot: 'B', cls: 'b', label: 'B' },
      { slot: 'D', cls: 'd', label: 'D' }
    ];
    refs.net.innerHTML = templates.map((entry) => `
      <div class="net-face ${entry.cls}">
        <div class="net-label">${entry.label}</div>
        <div class="net-grid" style="grid-template-columns:repeat(${size},1fr)">
          ${orientedFaceGrid(mapping[entry.slot], entry.slot, basis, size).flat().map((color) => `<span class="net-sticker" style="background:${FACE_COLORS[color]}"></span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  function seedForScramble() {
    scrambleSeed = (scrambleSeed * 1664525 + 1013904223) >>> 0;
    return scrambleSeed || 1;
  }

  function parseAlgorithm(input) {
    return Core.normalizeAlgorithm(input, size);
  }

  function trackAppliedMove(move) {
    const descriptor = Core.moveDescriptor(move, size);
    if (!descriptor) return;
    const moveLabel = descriptor.normalized ? descriptor.normalized : model.moveLabel(descriptor);
    if (!moveLabel) return;
    const inverse = Core.inverseMove(moveLabel, size);
    const lastTrackedMove = stateMoveStack[stateMoveStack.length - 1];
    if (lastTrackedMove && inverse && lastTrackedMove === inverse) {
      stateMoveStack.pop();
      return;
    }
    stateMoveStack.push(moveLabel);
  }

  function queueMove(move, options) {
    moveQueue.push({ move, options: options || {} });
    processQueue();
  }

  function queueMoves(moves, options) {
    for (const move of moves) queueMove(move, options);
  }

  function clearUndoRedoHistory() {
    history = [];
    redoStack = [];
  }

  function replaceStateMovesWithSequence(moves) {
    stateMoveStack = [];
    moves.forEach((move) => trackAppliedMove(move));
  }

  function getCubiesForDescriptor(descriptor) {
    const axis = descriptor.axis;
    return cubeGroup.children.filter((child) => {
      const c = child.userData.coord;
      const value = Core.nearestCoordinate(c.x * axis[0] + c.y * axis[1] + c.z * axis[2], size);
      return descriptor.layerValues.includes(value);
    });
  }

  function animateMove(entry, done) {
    const descriptor = Core.moveDescriptor(entry.move, size);
    if (!descriptor) {
      done(false);
      return;
    }
    const pivot = new THREE.Group();
    const affected = getCubiesForDescriptor(descriptor);
    cubeGroup.add(pivot);
    affected.forEach((cubie) => pivot.attach(cubie));

    const axis = new THREE.Vector3(descriptor.axis[0], descriptor.axis[1], descriptor.axis[2]).normalize();
    const turns = Math.abs(descriptor.quarterTurns);
    const baseDuration = turns === 2 ? 230 : 170;
    const duration = Math.max(MIN_MOVE_DURATION_MS, Math.round(baseDuration / animationSpeed));

    animation = {
      startedAt: performance.now(),
      duration,
      step: (now) => {
        const t = Math.min(1, (now - animation.startedAt) / animation.duration);
        pivot.setRotationFromAxisAngle(axis, (Math.PI / 2) * descriptor.quarterTurns * t);
        if (t < 1) return;

        affected.forEach((cubie) => cubeGroup.attach(cubie));
        cubeGroup.remove(pivot);

        model.applyDescriptor(descriptor);
        if (entry.options.trackState !== false) trackAppliedMove(descriptor);
        buildCubeMeshes();
        animation = null;

        if (entry.options.countMove) {
          moveCount += 1;
          history.push(descriptor.normalized || descriptor);
          redoStack = [];
        }
        lastMove = model.moveLabel(descriptor);

        if (model.isSolved()) setStatus('Cube solved.', 'success');
        else if (entry.options.message) setStatus(entry.options.message, entry.options.tone || 'active');
        else setStatus(`Applied ${lastMove}`, 'active');

        refreshUI();
        done(true);
      }
    };
  }

  function processQueue() {
    if (processingQueue || animation || !moveQueue.length) return;
    processingQueue = true;
    const current = moveQueue.shift();
    animateMove(current, () => {
      processingQueue = false;
      if (moveQueue.length) processQueue();
      else refreshUI();
    });
    refreshUI();
  }

  function applyMove(move, options) {
    queueMove(move, { countMove: true, tone: 'active', ...(options || {}) });
  }

  function applyAlgorithm() {
    const raw = refs.algInput.value.trim();
    const moves = parseAlgorithm(raw);
    if (!moves.length) {
      setStatus("Invalid algorithm. Try: R U R' U' or 3Rw U", 'warning');
      refreshUI();
      return;
    }
    refs.algInput.value = '';
    queueMoves(moves, { countMove: true, message: `Applied ${moves.length} moves`, tone: 'active' });
  }

  function resetCube() {
    if (processingQueue || animation) return;
    model = new Core.CubeModel(size);
    moveCount = 0;
    lastMove = '—';
    clearUndoRedoHistory();
    stateMoveStack = [];
    scrambleText = '—';
    setStatus(`${size}×${size} cube ready.`, 'ready');
    buildCubeMeshes();
    refreshUI();
  }

  function scrambleCube() {
    if (processingQueue || animation) return;
    resetCube();
    const seed = seedForScramble();
    const sequence = Core.generateScramble(size, { seed });
    model.applyMoves(sequence);
    replaceStateMovesWithSequence(sequence);
    scrambleText = `${sequence.join(' ')} (seed:${seed})`;
    setStatus('Scrambled. Start solving.', 'active');
    buildCubeMeshes();
    refreshUI();
  }

  function autoSolve() {
    if (processingQueue || animation) return;
    if (!stateMoveStack.length) {
      setStatus('Cube is already solved.', 'success');
      refreshUI();
      return;
    }
    const steps = stateMoveStack
      .slice()
      .reverse()
      .map((move) => Core.inverseMove(move, size))
      .filter(Boolean);
    if (!steps.length) {
      setStatus('No solvable move history available.', 'warning');
      refreshUI();
      return;
    }
    clearUndoRedoHistory();
    queueMoves(steps, {
      countMove: false,
      message: `Auto-solving (${steps.length} steps)...`,
      tone: 'active',
      trackState: true
    });
  }

  function undo() {
    if (processingQueue || animation || !history.length) return;
    const previous = history.pop();
    const inv = Core.inverseMove(previous, size);
    redoStack.push(previous);
    queueMove(inv, { countMove: false, message: `Undo ${model.moveLabel(previous)}`, tone: 'active' });
    moveCount = Math.max(0, moveCount - 1);
    refreshUI();
  }

  function redo() {
    if (processingQueue || animation || !redoStack.length) return;
    const next = redoStack.pop();
    queueMove(next, { countMove: false, message: `Redo ${model.moveLabel(next)}`, tone: 'active' });
    history.push(next);
    moveCount += 1;
    refreshUI();
  }

  function axisFaceFromAxis(axis) {
    if (axis[0] === 1) return 'R';
    if (axis[0] === -1) return 'L';
    if (axis[1] === 1) return 'U';
    if (axis[1] === -1) return 'D';
    if (axis[2] === 1) return 'F';
    if (axis[2] === -1) return 'B';
    return null;
  }

  function normalizedFaceMove(face, quarterTurns) {
    const info = MOVE_INFO[face];
    if (!info) return null;
    const turns = ((quarterTurns * info.rotation) % 4 + 4) % 4;
    if (turns === 1) return face;
    if (turns === 2) return `${face}2`;
    if (turns === 3) return `${face}'`;
    return null;
  }

  function dragMoveForLayer(axis, layerValue, direction) {
    const face = axisFaceFromAxis(axis);
    if (!face) return null;
    const dragDirectionSign = DRAG_DIRECTION_SIGN_BY_FACE[face] || 1;
    const quarterTurns = MOVE_INFO[face].rotation * (direction < 0 ? -1 : 1) * dragDirectionSign;
    return {
      face,
      axis: [...axis],
      layerValues: [layerValue],
      quarterTurns,
      normalized: normalizedFaceMove(face, quarterTurns)
    };
  }

  function projectToScreen(point) {
    const p = point instanceof THREE.Vector3 ? point.clone() : new THREE.Vector3(point[0], point[1], point[2]);
    p.project(camera);
    const canvas = renderer.domElement;
    return {
      x: (p.x * 0.5 + 0.5) * canvas.clientWidth,
      y: (-p.y * 0.5 + 0.5) * canvas.clientHeight
    };
  }

  function projectedVector(origin, vector) {
    const p1 = projectToScreen(origin);
    const o = origin instanceof THREE.Vector3 ? origin : new THREE.Vector3(origin[0], origin[1], origin[2]);
    const p2 = projectToScreen(new THREE.Vector3(o.x + vector[0], o.y + vector[1], o.z + vector[2]));
    return [p2.x - p1.x, p2.y - p1.y];
  }

  function vectorLength2D(v) {
    return Math.hypot(v[0], v[1]);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function worldSpacingForSize(cubeSize) {
    return 1 / Math.max(2, cubeSize);
  }

  function discreteToWorldPoint(point) {
    const spacing = worldSpacingForSize(size);
    return new THREE.Vector3(point[0] * spacing, point[1] * spacing, point[2] * spacing);
  }

  function stickerDragThreshold(sticker) {
    if (!sticker) return 24;
    const axes = FACE_LOCAL_AXES[sticker.face];
    if (!axes) return 24;
    const worldCenter = discreteToWorldPoint(sticker.center);
    const spacing = worldSpacingForSize(size);
    const halfSticker = spacing * STICKER_SIZE_RATIO * 0.5;
    const projectedU = projectedVector(worldCenter, vecScale(axes.u, halfSticker));
    const projectedV = projectedVector(worldCenter, vecScale(axes.v, halfSticker));
    const averageProjected = (vectorLength2D(projectedU) + vectorLength2D(projectedV)) * 0.5;
    return clamp(averageProjected * 0.45, 8, 24);
  }

  function moveFromStickerDrag(sticker, drag) {
    if (!sticker) return null;
    const axes = FACE_LOCAL_AXES[sticker.face];
    if (!axes) return null;
    const worldCenter = discreteToWorldPoint(sticker.center);
    const spacing = worldSpacingForSize(size);
    const projectionSample = Math.max(spacing * 0.45, 0.03);

    const projectedU = projectedVector(worldCenter, vecScale(axes.u, projectionSample));
    const projectedV = projectedVector(worldCenter, vecScale(axes.v, projectionSample));
    const uLen = vectorLength2D(projectedU);
    const vLen = vectorLength2D(projectedV);
    if (uLen < PROJECTION_EPSILON && vLen < PROJECTION_EPSILON) return null;
    const uDot = uLen > PROJECTION_EPSILON ? (drag[0] * projectedU[0] + drag[1] * projectedU[1]) / uLen : 0;
    const vDot = vLen > PROJECTION_EPSILON ? (drag[0] * projectedV[0] + drag[1] * projectedV[1]) / vLen : 0;
    const localAxis = Math.abs(uDot) >= Math.abs(vDot) ? axes.u : axes.v;

    const turnAxis = vecCross(sticker.normal, localAxis);
    const rawLayerValue = vecDot(sticker.center, turnAxis);
    const oriented = rawLayerValue < 0 ? vecScale(turnAxis, -1) : turnAxis;
    const layerValue = Core.nearestCoordinate(vecDot(sticker.center, oriented), size);

    const tangent = vecCross(oriented, sticker.center);
    const projectedTangent = projectedVector(worldCenter, vecScale(vecNorm(tangent), projectionSample));
    const tangentLen = vectorLength2D(projectedTangent);
    if (tangentLen < PROJECTION_EPSILON) return null;
    const direction = (drag[0] * projectedTangent[0] + drag[1] * projectedTangent[1]) / tangentLen;
    if (Math.abs(direction) < DRAG_DIRECTION_MIN_COMPONENT_PX) return null;

    return dragMoveForLayer(oriented, layerValue, direction);
  }

  function eventPoint(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function pickSticker(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    const meshes = [];
    cubeGroup.traverse((node) => {
      if (node.isMesh && node.userData && node.userData.sticker) meshes.push(node);
    });
    const hits = raycaster.intersectObjects(meshes, false);
    return hits.length ? hits[0].object.userData.sticker : null;
  }

  function onPointerDown(event) {
    if (processingQueue || animation) return;
    event.preventDefault();
    renderer.domElement.setPointerCapture(event.pointerId);
    const sticker = pickSticker(event);
    dragState.active = true;
    dragState.turned = false;
    dragState.pointerId = event.pointerId;
    dragState.sticker = sticker;
    dragState.start = eventPoint(event);
    dragState.end = dragState.start;
    controls.enabled = !sticker;
  }

  function onPointerMove(event) {
    if (!dragState.active || event.pointerId !== dragState.pointerId) return;
    dragState.end = eventPoint(event);
    event.preventDefault();
  }

  function onPointerUp(event) {
    if (!dragState.active || event.pointerId !== dragState.pointerId) return;
    event.preventDefault();
    if (renderer.domElement.hasPointerCapture(event.pointerId)) {
      renderer.domElement.releasePointerCapture(event.pointerId);
    }
    dragState.end = eventPoint(event);
    const drag = [dragState.end.x - dragState.start.x, dragState.end.y - dragState.start.y];
    if (dragState.sticker && Math.hypot(drag[0], drag[1]) > stickerDragThreshold(dragState.sticker)) {
      const move = moveFromStickerDrag(dragState.sticker, drag);
      if (move) applyMove(move);
    }

    dragState.active = false;
    dragState.pointerId = null;
    dragState.sticker = null;
    controls.enabled = true;
  }

  function onKey(event) {
    const target = event.target;
    if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
      if (target === refs.algInput && event.key === 'Enter') {
        event.preventDefault();
        applyAlgorithm();
      }
      return;
    }
    const key = event.key.toLowerCase();
    if ('urfdlb'.includes(key)) {
      const cameraAndControlsExist = !!(camera && controls);
      const savedCameraPosition = cameraAndControlsExist ? camera.position.clone() : null;
      const savedCameraUp = cameraAndControlsExist ? camera.up.clone() : null;
      const savedControlsTarget = cameraAndControlsExist ? controls.target.clone() : null;
      applyMove(event.shiftKey ? `${key.toUpperCase()}'` : key.toUpperCase());
      if (cameraAndControlsExist) {
        camera.position.copy(savedCameraPosition);
        camera.up.copy(savedCameraUp);
        controls.target.copy(savedControlsTarget);
        controls.update();
      }
      event.preventDefault();
      return;
    }
    if (key === ' ') { scrambleCube(); event.preventDefault(); return; }
    if (key === 'z') { undo(); event.preventDefault(); return; }
    if (key === 'y') { redo(); event.preventDefault(); }
  }

  function renderLoop() {
    requestAnimationFrame(renderLoop);
    if (animation) animation.step(performance.now());
    controls.update();
    renderer.render(scene, camera);
  }

  function bindEvents() {
    refs.sizeSelect.addEventListener('change', () => {
      const next = Number(refs.sizeSelect.value);
      if (!Number.isInteger(next) || next < 2 || next > 10) return;
      size = next;
      resetCube();
    });
    refs.scrambleBtn.addEventListener('click', scrambleCube);
    refs.resetBtn.addEventListener('click', resetCube);
    refs.solveBtn.addEventListener('click', autoSolve);
    refs.undoBtn.addEventListener('click', undo);
    refs.redoBtn.addEventListener('click', redo);
    refs.speedSelect.addEventListener('change', () => {
      const value = Number(refs.speedSelect.value);
      animationSpeed = Number.isFinite(value) && value > 0 ? value : 1;
    });
    refs.applyBtn.addEventListener('click', applyAlgorithm);
    document.addEventListener('keydown', onKey);
  }

  function bootstrap() {
    populateSizeOptions();

    if (missingDeps.length) {
      setStatus(`Failed to load: ${missingDeps.join(', ')}`, 'warning');
      refs.scrambleBtn.disabled = true;
      refs.resetBtn.disabled = true;
      refs.undoBtn.disabled = true;
      refs.redoBtn.disabled = true;
      refs.solveBtn.disabled = true;
      refs.applyBtn.disabled = true;
      refs.algInput.disabled = true;
      refs.speedSelect.disabled = true;
      return;
    }

    initScene();
    bindEvents();
    resetCube();
  }

  bootstrap();
})();
