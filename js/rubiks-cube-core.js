(function (globalFactory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = globalFactory();
  } else {
    window.RubiksCubeCore = globalFactory();
  }
})(function () {
  const FACE = { U: 0, D: 1, F: 2, B: 3, L: 4, R: 5 };
  const FACE_LETTERS = ['U', 'D', 'F', 'B', 'L', 'R'];
  const FACE_COLORS = ['#ffffff', '#ffd54f', '#22c55e', '#2563eb', '#fb923c', '#ef4444'];
  const FACE_MOVE_INFO = {
    U: { axis: [0, 1, 0], rotation: -1 },
    D: { axis: [0, -1, 0], rotation: -1 },
    F: { axis: [0, 0, 1], rotation: -1 },
    B: { axis: [0, 0, -1], rotation: -1 },
    L: { axis: [-1, 0, 0], rotation: -1 },
    R: { axis: [1, 0, 0], rotation: -1 },
    M: { axis: [1, 0, 0], rotation: -1, slice: true },
    E: { axis: [0, 1, 0], rotation: -1, slice: true },
    S: { axis: [0, 0, 1], rotation: -1, slice: true }
  };
  const AXIS_TO_SLICE_FACE = { '1,0,0': 'M', '0,1,0': 'E', '0,0,1': 'S' };
  const SCRAMBLE_BASE = ['U', 'D', 'R', 'L', 'F', 'B'];
  const SCRAMBLE_AXIS_GROUP = { U: 'UD', D: 'UD', R: 'RL', L: 'RL', F: 'FB', B: 'FB' };

  function ensureSize(size) {
    const n = Number(size);
    if (!Number.isInteger(n) || n < 2) throw new Error('Cube size must be an integer >= 2');
    return n;
  }

  function coordinateValues(size) {
    const max = size - 1;
    return Array.from({ length: size }, (_, index) => -max + index * 2);
  }

  function nearestCoordinate(value, size) {
    const coords = coordinateValues(size);
    let best = coords[0];
    let bestDist = Infinity;
    for (const coord of coords) {
      const dist = Math.abs(coord - value);
      if (dist < bestDist) {
        best = coord;
        bestDist = dist;
      }
    }
    return best;
  }

  function indexFromCoordinate(value, size) {
    return Math.round((value + (size - 1)) / 2);
  }

  function stickerDiscretePosition(face, row, col, size) {
    const coords = coordinateValues(size);
    const x = coords[col];
    const y = -coords[row];
    const z = coords[row];
    const max = size - 1;
    switch (face) {
      case FACE.U: return { x, y: max, z, nx: 0, ny: 1, nz: 0 };
      case FACE.D: return { x, y: -max, z: -z, nx: 0, ny: -1, nz: 0 };
      case FACE.F: return { x, y, z: max, nx: 0, ny: 0, nz: 1 };
      case FACE.B: return { x: -x, y, z: -max, nx: 0, ny: 0, nz: -1 };
      case FACE.L: return { x: -max, y, z: x, nx: -1, ny: 0, nz: 0 };
      case FACE.R: return { x: max, y, z: -x, nx: 1, ny: 0, nz: 0 };
      default: return { x: 0, y: 0, z: 0, nx: 0, ny: 0, nz: 0 };
    }
  }

  function faceIndexFromNormal(sticker) {
    if (sticker.ny === 1) return FACE.U;
    if (sticker.ny === -1) return FACE.D;
    if (sticker.nz === 1) return FACE.F;
    if (sticker.nz === -1) return FACE.B;
    if (sticker.nx === -1) return FACE.L;
    if (sticker.nx === 1) return FACE.R;
    return null;
  }

  function rotateDiscreteVector(vector, axis, direction) {
    const sign = axis[0] || axis[1] || axis[2];
    if (!sign) return [vector[0], vector[1], vector[2]];
    if (axis[0]) {
      const effective = direction * sign;
      return effective > 0 ? [vector[0], -vector[2], vector[1]] : [vector[0], vector[2], -vector[1]];
    }
    if (axis[1]) {
      const effective = direction * sign;
      return effective > 0 ? [vector[2], vector[1], -vector[0]] : [-vector[2], vector[1], vector[0]];
    }
    const effective = direction * sign;
    return effective > 0 ? [-vector[1], vector[0], vector[2]] : [vector[1], -vector[0], vector[2]];
  }

  function rotateSticker(sticker, axis, quarterTurns) {
    const turns = ((quarterTurns % 4) + 4) % 4;
    for (let i = 0; i < turns; i++) {
      [sticker.x, sticker.y, sticker.z] = rotateDiscreteVector([sticker.x, sticker.y, sticker.z], axis, 1);
      [sticker.nx, sticker.ny, sticker.nz] = rotateDiscreteVector([sticker.nx, sticker.ny, sticker.nz], axis, 1);
    }
  }

  function axisKey(axis) {
    return `${Math.abs(axis[0])},${Math.abs(axis[1])},${Math.abs(axis[2])}`;
  }

  function moveFaceFromAxis(axis) {
    if (axis[0] === 1) return 'R';
    if (axis[0] === -1) return 'L';
    if (axis[1] === 1) return 'U';
    if (axis[1] === -1) return 'D';
    if (axis[2] === 1) return 'F';
    if (axis[2] === -1) return 'B';
    return null;
  }

  function moveSuffixFromQuarterTurns(quarterTurns) {
    const turns = ((quarterTurns % 4) + 4) % 4;
    if (turns === 2) return '2';
    return turns === 3 ? "'" : '';
  }

  function layerValuesFromDepth(axis, depth, size) {
    const max = size - 1;
    const count = Math.max(1, Math.min(Math.floor(size / 2), depth));
    const values = [];
    for (let i = 0; i < count; i++) values.push(max - i * 2);
    return values;
  }

  function normalizeMoveToken(token, size) {
    // Normalize common smart single quotes from pasted text so notation like R’ U’ parses.
    // Double quotes are intentionally not transformed because move notation uses apostrophes.
    const raw = String(token || '').trim().replace(/[\u2018\u2019]/g, "'");
    if (!raw) return null;
    const match = raw.match(/^(\d+)?([URFDLBMESurfdlb])(w|W)?(2'?|'|)?$/);
    if (!match) return null;
    const [, depthPrefix, faceChar, explicitWide, suffixRaw] = match;
    const sizeInt = ensureSize(size);
    const face = faceChar.toUpperCase();
    const isSlice = ['M', 'E', 'S'].includes(face);
    const lowercaseWide = faceChar !== face;
    const wide = lowercaseWide || !!explicitWide || (!!depthPrefix && Number(depthPrefix) > 1 && !isSlice);
    let suffix = suffixRaw || '';
    if (suffix === "2'") suffix = '2';

    if (isSlice) {
      if (sizeInt < 3 || sizeInt % 2 === 0 || wide || depthPrefix) return null;
      if (!['', "'", '2'].includes(suffix)) return null;
      return `${face}${suffix}`;
    }

    const requestedDepth = depthPrefix ? Number(depthPrefix) : (wide ? 2 : 1);
    const maxDepth = Math.floor(sizeInt / 2);
    if (!Number.isInteger(requestedDepth) || requestedDepth < 1 || requestedDepth > maxDepth) return null;
    if (!['', "'", '2'].includes(suffix)) return null;

    if (requestedDepth === 1 && !wide) return `${face}${suffix}`;
    if (requestedDepth === 2 && wide) return `${face}w${suffix}`;
    return `${requestedDepth}${face}w${suffix}`;
  }

  function moveDescriptor(move, size) {
    const sizeInt = ensureSize(size);
    if (move && typeof move === 'object' && Array.isArray(move.axis)) {
      const axis = [move.axis[0], move.axis[1], move.axis[2]];
      const layerValues = (Array.isArray(move.layerValues) ? move.layerValues : [sizeInt - 1])
        .map((value) => nearestCoordinate(value, sizeInt));
      return {
        axis,
        layerValues: [...new Set(layerValues)].sort((a, b) => b - a),
        quarterTurns: Number(move.quarterTurns) || 1,
        normalized: move.normalized || null,
        face: move.face || moveFaceFromAxis(axis)
      };
    }

    const normalized = normalizeMoveToken(move, sizeInt);
    if (!normalized) return null;
    const rawFace = normalized.match(/^\d?([URFDLBMES])/)[1];
    const info = FACE_MOVE_INFO[rawFace];
    if (!info) return null;

    const depthMatch = normalized.match(/^(\d+)?([URFDLBMES])(w)?/);
    const depth = depthMatch[1] ? Number(depthMatch[1]) : (depthMatch[3] ? 2 : 1);
    const suffix = normalized.replace(/^(\d+)?[URFDLBMES]w?/, '');
    const direction = suffix.includes("'") ? -1 : 1;
    const amount = suffix.includes('2') ? 2 : 1;

    let layerValues;
    if (info.slice) {
      layerValues = [0];
    } else {
      layerValues = layerValuesFromDepth(info.axis, depth, sizeInt);
    }

    return {
      axis: [...info.axis],
      layerValues,
      quarterTurns: info.rotation * direction * amount,
      normalized,
      face: rawFace
    };
  }

  function inverseMove(move, size) {
    const descriptor = moveDescriptor(move, size);
    if (!descriptor) return null;
    if (descriptor.normalized) {
      if (descriptor.normalized.endsWith('2')) return descriptor.normalized;
      return descriptor.normalized.endsWith("'")
        ? descriptor.normalized.slice(0, -1)
        : `${descriptor.normalized}'`;
    }
    return {
      ...descriptor,
      quarterTurns: -descriptor.quarterTurns,
      normalized: null
    };
  }

  function normalizeAlgorithm(input, size) {
    return String(input || '')
      .trim()
      .replace(/,/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
      .map((token) => normalizeMoveToken(token, size))
      .filter(Boolean);
  }

  function mulberry32(seed) {
    let t = seed >>> 0;
    return function rand() {
      t += 0x6D2B79F5;
      let x = Math.imul(t ^ (t >>> 15), 1 | t);
      x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  }

  function scrambleLengthForSize(size) {
    const n = ensureSize(size);
    if (n === 2) return 11;
    if (n === 3) return 25;
    if (n === 4) return 40;
    if (n === 5) return 60;
    return Math.min(140, 20 + n * 12);
  }

  function generateScramble(size, options) {
    const n = ensureSize(size);
    const opts = options || {};
    const length = Number.isInteger(opts.length) ? opts.length : scrambleLengthForSize(n);
    const seed = Number.isInteger(opts.seed) ? opts.seed : 1;
    const rand = mulberry32(seed);
    const suffixes = ['', "'", '2'];
    const faces = n >= 4
      ? SCRAMBLE_BASE.flatMap((face) => [face, `${face}w`])
      : [...SCRAMBLE_BASE];

    const moves = [];
    let last = '';
    let lastAxis = '';
    while (moves.length < length) {
      const candidate = faces[Math.floor(rand() * faces.length)];
      const face = candidate[0];
      const axis = SCRAMBLE_AXIS_GROUP[face];
      if (candidate === last || axis === lastAxis) continue;
      const suffix = suffixes[Math.floor(rand() * suffixes.length)];
      moves.push(`${candidate}${suffix}`);
      last = candidate;
      lastAxis = axis;
    }
    return moves;
  }

  class CubeModel {
    constructor(size) {
      this.size = ensureSize(size);
      this.reset();
    }

    reset() {
      this.stickers = [];
      for (let face = 0; face < 6; face++) {
        for (let row = 0; row < this.size; row++) {
          for (let col = 0; col < this.size; col++) {
            this.stickers.push({
              color: face,
              ...stickerDiscretePosition(face, row, col, this.size)
            });
          }
        }
      }
      this.refresh();
      return this;
    }

    clone() {
      const copy = new CubeModel(this.size);
      copy.stickers = this.stickers.map((s) => ({ ...s }));
      copy.faces = this.faces.map((face) => face.map((row) => [...row]));
      copy.solved = this.solved;
      return copy;
    }

    refresh() {
      const size = this.size;
      const faces = Array.from({ length: 6 }, () => Array.from({ length: size }, () => Array(size).fill(0)));
      for (const sticker of this.stickers) {
        const face = faceIndexFromNormal(sticker);
        if (face === null) continue;
        let row = 0;
        let col = 0;
        switch (face) {
          case FACE.U:
            row = indexFromCoordinate(sticker.z, size);
            col = indexFromCoordinate(sticker.x, size);
            break;
          case FACE.D:
            row = indexFromCoordinate(-sticker.z, size);
            col = indexFromCoordinate(sticker.x, size);
            break;
          case FACE.F:
            row = indexFromCoordinate(-sticker.y, size);
            col = indexFromCoordinate(sticker.x, size);
            break;
          case FACE.B:
            row = indexFromCoordinate(-sticker.y, size);
            col = indexFromCoordinate(-sticker.x, size);
            break;
          case FACE.L:
            row = indexFromCoordinate(-sticker.y, size);
            col = indexFromCoordinate(sticker.z, size);
            break;
          case FACE.R:
            row = indexFromCoordinate(-sticker.y, size);
            col = indexFromCoordinate(-sticker.z, size);
            break;
        }
        if (faces[face] && faces[face][row] && faces[face][row][col] !== undefined) {
          faces[face][row][col] = sticker.color;
        }
      }
      this.faces = faces;
      this.solved = faces.every((face) => face.every((row) => row.every((color) => color === face[0][0])));
      return this;
    }

    isSolved() {
      return !!this.solved;
    }

    serialize() {
      return JSON.stringify(this.faces);
    }

    applyDescriptor(descriptor) {
      if (!descriptor) return false;
      const parsed = moveDescriptor(descriptor, this.size);
      if (!parsed) return false;
      for (const sticker of this.stickers) {
        const value = nearestCoordinate(
          sticker.x * parsed.axis[0] + sticker.y * parsed.axis[1] + sticker.z * parsed.axis[2],
          this.size
        );
        if (parsed.layerValues.includes(value)) rotateSticker(sticker, parsed.axis, parsed.quarterTurns);
      }
      this.refresh();
      return true;
    }

    applyMove(move) {
      return this.applyDescriptor(moveDescriptor(move, this.size));
    }

    applyMoves(moves) {
      const sequence = Array.isArray(moves) ? moves : normalizeAlgorithm(moves, this.size);
      for (const move of sequence) this.applyMove(move);
      return this;
    }

    moveLabel(move) {
      const descriptor = moveDescriptor(move, this.size);
      if (!descriptor) return '—';
      if (descriptor.normalized) return descriptor.normalized;
      const face = descriptor.face || moveFaceFromAxis(descriptor.axis) || AXIS_TO_SLICE_FACE[axisKey(descriptor.axis)] || '?';
      return `${face}${moveSuffixFromQuarterTurns(descriptor.quarterTurns)}`;
    }

    stickerMapByCubie() {
      const result = new Map();
      for (const sticker of this.stickers) {
        const key = `${sticker.x},${sticker.y},${sticker.z}`;
        if (!result.has(key)) result.set(key, {});
        result.get(key)[`${sticker.nx},${sticker.ny},${sticker.nz}`] = sticker.color;
      }
      return result;
    }
  }

  return {
    FACE,
    FACE_COLORS,
    FACE_LETTERS,
    FACE_MOVE_INFO,
    AXIS_TO_SLICE_FACE,
    coordinateValues,
    nearestCoordinate,
    normalizeMoveToken,
    normalizeAlgorithm,
    moveDescriptor,
    inverseMove,
    generateScramble,
    scrambleLengthForSize,
    CubeModel
  };
});
