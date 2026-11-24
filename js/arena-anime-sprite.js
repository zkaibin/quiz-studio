// 2.5D anime fighters for Arena Clash.
// Canvas-painted cel figures on Y-facing planes — much closer to 2D anime
// references than procedural 3D primitives. Inspired by Dragon Ball silhouettes,
// not traced from official art.
import * as THREE from './vendor/three/three.module.min.js';

const POSES = ['idle', 'punch', 'kick', 'guard', 'hurt', 'charge'];
const CELL_W = 512;
const CELL_H = 896;
const ATLAS_COLS = 3;
const ATLAS_ROWS = 2;

const texCache = new Map();

function cssHex(hex) {
  return `#${(hex >>> 0).toString(16).padStart(6, '0')}`;
}

function shade(hex, amount) {
  const r = Math.min(255, Math.max(0, ((hex >> 16) & 255) + Math.round(255 * amount)));
  const g = Math.min(255, Math.max(0, ((hex >> 8) & 255) + Math.round(255 * amount)));
  const b = Math.min(255, Math.max(0, (hex & 255) + Math.round(255 * amount)));
  return (r << 16) | (g << 8) | b;
}

function ink(ctx, width = 5) {
  ctx.strokeStyle = '#100c0a';
  ctx.lineWidth = width;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
}

function fillStroke(ctx, fill, line = 5) {
  ctx.fillStyle = fill;
  ctx.fill();
  ink(ctx, line);
  ctx.stroke();
}

function ellipse(ctx, x, y, rx, ry) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
}

/* ---------- Shared anatomy helpers ---------- */
function drawCelShadow(ctx, pathFn, color) {
  ctx.save();
  pathFn();
  ctx.clip();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(0, 40, 120, 160, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawFace(ctx, v, expr) {
  const skin = cssHex(v.skin);
  const eye = cssHex(v.eyeColor || 0x111827);
  // Compact anime head (heroic ~1:7 proportions vs body)
  const hy = -248;
  ellipse(ctx, 0, hy, 42, 48);
  fillStroke(ctx, skin, 4.5);

  ellipse(ctx, -42, hy + 4, 9, 14);
  fillStroke(ctx, skin, 2.5);
  ellipse(ctx, 42, hy + 4, 9, 14);
  fillStroke(ctx, skin, 2.5);

  ctx.fillStyle = 'rgba(90,45,30,0.18)';
  ellipse(ctx, 0, hy + 28, 34, 20);
  ctx.fill();

  const drawEye = (ex, flip) => {
    const ey = hy - 6;
    // Soft white sclera without a full “spectacle” outline
    ctx.fillStyle = '#fffef8';
    ctx.beginPath();
    ctx.ellipse(ex, ey, 17, 12, flip * 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = eye;
    ellipse(ctx, ex + flip * 2, ey + 1, 6, 7.5);
    ctx.fill();
    ctx.fillStyle = '#070707';
    ellipse(ctx, ex + flip * 2, ey + 2, 3.2, 4.5);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ellipse(ctx, ex - 5, ey - 5, 3, 3.2);
    ctx.fill();
    // Thick upper lid + outer flick only (classic anime ink)
    ink(ctx, 4);
    ctx.beginPath();
    ctx.ellipse(ex, ey, 17, 12, flip * 0.1, Math.PI * 1.08, Math.PI * 1.92);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(ex + flip * 14, ey - 7);
    ctx.quadraticCurveTo(ex + flip * 22, ey - 11, ex + flip * 24, ey - 1);
    ctx.stroke();
    ink(ctx, 2);
    ctx.beginPath();
    ctx.ellipse(ex, ey, 17, 12, flip * 0.1, 0.2, Math.PI - 0.2);
    ctx.stroke();
  };
  drawEye(-18, -1);
  drawEye(18, 1);

  ink(ctx, expr === 'smirk' ? 6 : 5);
  ctx.beginPath();
  if (expr === 'smirk') {
    ctx.moveTo(-34, hy - 22);
    ctx.quadraticCurveTo(-16, hy - 34, -2, hy - 24);
    ctx.moveTo(34, hy - 22);
    ctx.quadraticCurveTo(16, hy - 34, 2, hy - 24);
  } else {
    ctx.moveTo(-32, hy - 26);
    ctx.quadraticCurveTo(-16, hy - 34, -2, hy - 28);
    ctx.moveTo(32, hy - 26);
    ctx.quadraticCurveTo(16, hy - 34, 2, hy - 28);
  }
  ctx.stroke();

  ink(ctx, 2.2);
  ctx.beginPath();
  ctx.moveTo(2, hy + 6);
  ctx.quadraticCurveTo(7, hy + 14, 2, hy + 20);
  ctx.stroke();

  const my = hy + 36;
  if (expr === 'grin') {
    ctx.fillStyle = '#3f0a0a';
    ctx.beginPath();
    ctx.moveTo(-18, my);
    ctx.quadraticCurveTo(0, my + 18, 18, my);
    ctx.quadraticCurveTo(0, my + 6, -18, my);
    ctx.fill();
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-13, my + 1, 26, 5);
    ink(ctx, 2.8);
    ctx.beginPath();
    ctx.moveTo(-18, my);
    ctx.quadraticCurveTo(0, my + 18, 18, my);
    ctx.stroke();
  } else if (expr === 'smirk') {
    ink(ctx, 3.5);
    ctx.beginPath();
    ctx.moveTo(-8, my + 2);
    ctx.quadraticCurveTo(6, my + 12, 18, my - 2);
    ctx.stroke();
  } else {
    ink(ctx, 3);
    ctx.beginPath();
    ctx.moveTo(-12, my);
    ctx.quadraticCurveTo(0, my + 10, 12, my);
    ctx.stroke();
  }
}

function drawGokuHair(ctx) {
  const hair = '#14110f';
  const hi = '#2a3340';
  ctx.save();
  ellipse(ctx, 0, -268, 48, 36);
  fillStroke(ctx, hair, 3.5);

  const spikes = [
    [[0, -380], [-14, -275], [14, -275], true],
    [[-42, -360], [-34, -275], [-4, -280], true],
    [[44, -365], [4, -280], [36, -272], false],
    [[-78, -325], [-58, -265], [-28, -275], false],
    [[80, -330], [28, -275], [60, -262], true],
    [[-100, -280], [-72, -240], [-42, -255], false],
    [[102, -285], [42, -255], [74, -235], false],
    [[-28, -345], [-40, -275], [-8, -282], false],
    [[30, -348], [8, -282], [40, -275], true],
    // High bang tips — stay above the eyes
    [[-14, -230], [-24, -265], [-2, -262], false],
    [[16, -228], [2, -262], [26, -264], true]
  ];
  for (const [tip, a, b, useHi] of spikes) {
    ctx.beginPath();
    ctx.moveTo(tip[0], tip[1]);
    ctx.lineTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.closePath();
    fillStroke(ctx, useHi ? hi : hair, 3);
  }
  ctx.restore();
}

function drawVegetaHair(ctx) {
  const hair = '#0c0a09';
  const hi = '#252a35';
  ctx.save();
  ellipse(ctx, 0, -270, 46, 38);
  fillStroke(ctx, hair, 3.5);

  // Sharp widow's peak into the brow — keeps eyes clear
  ctx.beginPath();
  ctx.moveTo(0, -220);
  ctx.lineTo(-16, -262);
  ctx.lineTo(0, -280);
  ctx.lineTo(16, -262);
  ctx.closePath();
  fillStroke(ctx, hair, 3);

  const spikes = [
    [[0, -410], [-12, -280], [12, -280], true],
    [[-28, -395], [-32, -280], [-4, -285], true],
    [[28, -395], [4, -285], [32, -280], false],
    [[-52, -365], [-50, -270], [-18, -280], false],
    [[52, -365], [18, -280], [50, -270], true],
    [[-72, -325], [-62, -255], [-30, -270], false],
    [[72, -325], [30, -270], [62, -255], false],
    [[-38, -375], [-42, -285], [-12, -295], false],
    [[38, -375], [12, -295], [42, -285], true],
    [[-14, -385], [-22, -295], [0, -300], false],
    [[14, -385], [0, -300], [22, -295], false]
  ];
  for (const [tip, a, b, useHi] of spikes) {
    ctx.beginPath();
    ctx.moveTo(tip[0], tip[1]);
    ctx.lineTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.closePath();
    fillStroke(ctx, useHi ? hi : hair, 3);
  }
  ctx.restore();
}

function poseOffsets(pose) {
  // Limb angles / shifts for a readable anime fight silhouette
  switch (pose) {
    case 'punch':
      return {
        lArm: { ang: -0.2, len: 1 }, rArm: { ang: -1.35, len: 1.15 },
        lLeg: { ang: 0.15, bend: 0.35 }, rLeg: { ang: -0.05, bend: 0.15 },
        torsoRot: -0.12, lean: 8
      };
    case 'kick':
      return {
        lArm: { ang: -0.8, len: 1 }, rArm: { ang: 0.35, len: 1 },
        lLeg: { ang: 0.25, bend: 0.5 }, rLeg: { ang: -1.45, bend: 0.1 },
        torsoRot: 0.08, lean: -4
      };
    case 'guard':
      return {
        lArm: { ang: -1.1, len: 0.95 }, rArm: { ang: -1.2, len: 0.95 },
        lLeg: { ang: 0.35, bend: 0.55 }, rLeg: { ang: 0.25, bend: 0.5 },
        torsoRot: 0, lean: 0
      };
    case 'hurt':
      return {
        lArm: { ang: 0.5, len: 1 }, rArm: { ang: -0.4, len: 1 },
        lLeg: { ang: 0.2, bend: 0.4 }, rLeg: { ang: 0.1, bend: 0.3 },
        torsoRot: 0.2, lean: -12
      };
    case 'charge':
      return {
        lArm: { ang: -0.95, len: 1 }, rArm: { ang: -0.95, len: 1 },
        lLeg: { ang: 0.45, bend: 0.65 }, rLeg: { ang: 0.45, bend: 0.65 },
        torsoRot: 0.05, lean: 0
      };
    default: // idle — hands near hips (canvas +Y is down; ~40° out from vertical)
      return {
        lArm: { ang: 0.7, len: 0.78 }, rArm: { ang: -0.7, len: 0.78 },
        lLeg: { ang: 0.08, bend: 0.1 }, rLeg: { ang: -0.06, bend: 0.08 },
        torsoRot: 0, lean: 0
      };
  }
}

function drawLimb(ctx, { x, y, ang, length, width, fill, cuff, hand, boot, sleeve }) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(ang);
  // Continuous capsule from shoulder/hip so limbs never float Rayman-style
  const mid = length * 0.48;
  ctx.beginPath();
  ctx.moveTo(-width, 0);
  ctx.quadraticCurveTo(-width * 1.05, mid, -width * 0.9, length);
  ctx.quadraticCurveTo(0, length + width, width * 0.9, length);
  ctx.quadraticCurveTo(width * 1.05, mid, width, 0);
  ctx.quadraticCurveTo(0, -width * 0.55, -width, 0);
  ctx.closePath();
  fillStroke(ctx, fill, 4);
  if (sleeve) {
    // Short sleeve cuff near shoulder
    ctx.fillStyle = sleeve;
    ctx.beginPath();
    ctx.moveTo(-width * 1.15, -4);
    ctx.lineTo(-width * 1.05, length * 0.28);
    ctx.lineTo(width * 1.05, length * 0.28);
    ctx.lineTo(width * 1.15, -4);
    ctx.closePath();
    fillStroke(ctx, sleeve, 3);
  }
  if (cuff) {
    ctx.fillStyle = cuff;
    ctx.fillRect(-width * 1.1, length * 0.58, width * 2.2, length * 0.18);
    ink(ctx, 3);
    ctx.strokeRect(-width * 1.1, length * 0.58, width * 2.2, length * 0.18);
  }
  if (hand) {
    ellipse(ctx, 0, length + 8, width * 1.05, width * 0.9);
    fillStroke(ctx, hand, 3.5);
  }
  if (boot) {
    ctx.beginPath();
    ctx.moveTo(-width * 1.05, length * 0.68);
    ctx.lineTo(-width * 1.2, length + 20);
    ctx.lineTo(width * 1.45, length + 20);
    ctx.lineTo(width * 1.1, length * 0.68);
    ctx.closePath();
    fillStroke(ctx, boot.color, 3.5);
    if (boot.trim) {
      ctx.fillStyle = boot.trim;
      ctx.fillRect(-width * 1.15, length * 0.68, width * 2.4, 8);
      ctx.fillRect(width * 0.1, length * 0.75, 8, length * 0.3);
    }
    if (boot.cord) {
      ctx.strokeStyle = boot.cord;
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.arc(0, length * 0.86, width * 1.0, 0.15, Math.PI - 0.15);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawGiBody(ctx, v, pose) {
  const outfit = cssHex(v.outfit);
  const outfitShade = cssHex(shade(v.outfit, -0.18));
  const under = cssHex(v.undershirt || 0x1e3a8a);
  const pants = cssHex(v.pants || v.outfit);
  const skin = cssHex(v.skin);
  const boots = cssHex(v.boots || 0x1e3a8a);
  const off = poseOffsets(pose);

  ctx.save();
  ctx.translate(off.lean, 0);
  ctx.rotate(off.torsoRot);

  // Longer athletic limbs for heroic anime read
  drawLimb(ctx, {
    x: -52, y: -118, ang: off.lArm.ang, length: 118 * off.lArm.len, width: 18,
    fill: skin, sleeve: under, cuff: under, hand: skin
  });
  drawLimb(ctx, {
    x: -26, y: 58, ang: off.lLeg.ang, length: 148, width: 22,
    fill: pants, boot: { color: boots, trim: '#c41e3a', cord: '#c4a574' }
  });

  // Pants
  ctx.beginPath();
  ctx.moveTo(-50, 48);
  ctx.quadraticCurveTo(0, 62, 50, 48);
  ctx.lineTo(44, 140);
  ctx.quadraticCurveTo(0, 155, -44, 140);
  ctx.closePath();
  fillStroke(ctx, pants, 5);
  ctx.fillStyle = outfitShade;
  ctx.globalAlpha = 0.32;
  ctx.fillRect(-50, 80, 42, 60);
  ctx.globalAlpha = 1;

  // Torso — sleeveless gi over undershirt (V-taper)
  ctx.beginPath();
  ctx.moveTo(-58, -130);
  ctx.quadraticCurveTo(-66, -20, -50, 55);
  ctx.lineTo(50, 55);
  ctx.quadraticCurveTo(66, -20, 58, -130);
  ctx.quadraticCurveTo(18, -148, 0, -118);
  ctx.quadraticCurveTo(-18, -148, -58, -130);
  ctx.closePath();
  fillStroke(ctx, outfit, 5);

  // V-neck undershirt
  ctx.beginPath();
  ctx.moveTo(-30, -132);
  ctx.lineTo(0, -70);
  ctx.lineTo(30, -132);
  ctx.quadraticCurveTo(0, -112, -30, -132);
  ctx.closePath();
  fillStroke(ctx, under, 3);

  ctx.strokeStyle = outfitShade;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(20, -95);
  ctx.quadraticCurveTo(30, -10, 24, 45);
  ctx.stroke();

  // Emblem
  ellipse(ctx, -30, -45, 18, 18);
  fillStroke(ctx, '#ffffff', 3);
  ctx.fillStyle = '#1a1410';
  ctx.fillRect(-39, -54, 18, 3.5);
  ctx.fillRect(-32, -54, 4.5, 16);
  ctx.fillRect(-38, -40, 14, 3.5);
  ctx.fillRect(-37, -50, 3.5, 9);

  // Navy sash + hanging ends
  ctx.beginPath();
  ctx.moveTo(-54, 42);
  ctx.lineTo(54, 42);
  ctx.lineTo(52, 68);
  ctx.lineTo(-52, 68);
  ctx.closePath();
  fillStroke(ctx, under, 4);
  ctx.beginPath();
  ctx.moveTo(-8, 65);
  ctx.lineTo(-20, 150);
  ctx.lineTo(-4, 150);
  ctx.lineTo(10, 65);
  ctx.closePath();
  fillStroke(ctx, under, 3);
  ctx.beginPath();
  ctx.moveTo(12, 65);
  ctx.lineTo(6, 165);
  ctx.lineTo(20, 165);
  ctx.lineTo(24, 65);
  ctx.closePath();
  fillStroke(ctx, under, 3);

  drawLimb(ctx, {
    x: 52, y: -118, ang: off.rArm.ang, length: 118 * off.rArm.len, width: 18,
    fill: skin, sleeve: under, cuff: under, hand: skin
  });

  drawLimb(ctx, {
    x: 26, y: 58, ang: off.rLeg.ang, length: 148, width: 22,
    fill: pants, boot: { color: boots, trim: '#c41e3a', cord: '#c4a574' }
  });

  ctx.restore();
}

function drawSaiyanBody(ctx, v, pose) {
  const suit = cssHex(v.undershirt || 0x1d4ed8);
  const suitShade = cssHex(shade(v.undershirt || 0x1d4ed8, -0.2));
  const white = '#f8fafc';
  const gold = cssHex(v.gold || 0xeab308);
  const skin = cssHex(v.skin);
  const off = poseOffsets(pose);

  ctx.save();
  ctx.translate(off.lean, 0);
  ctx.rotate(off.torsoRot);

  drawLimb(ctx, {
    x: -48, y: -120, ang: off.lArm.ang, length: 120 * off.lArm.len, width: 16,
    fill: suit, cuff: white, hand: white
  });
  drawLimb(ctx, {
    x: -22, y: 55, ang: off.lLeg.ang, length: 145, width: 19,
    fill: suit, boot: { color: white, trim: gold }
  });

  ctx.beginPath();
  ctx.moveTo(-48, 42);
  ctx.lineTo(48, 42);
  ctx.lineTo(42, 135);
  ctx.quadraticCurveTo(0, 148, -42, 135);
  ctx.closePath();
  fillStroke(ctx, suit, 5);

  ctx.beginPath();
  ctx.moveTo(-52, -135);
  ctx.lineTo(-50, 52);
  ctx.lineTo(50, 52);
  ctx.lineTo(52, -135);
  ctx.quadraticCurveTo(0, -152, -52, -135);
  ctx.closePath();
  fillStroke(ctx, suit, 4);

  // White chest armor
  ctx.beginPath();
  ctx.moveTo(-50, -122);
  ctx.quadraticCurveTo(-58, -25, -44, 35);
  ctx.lineTo(44, 35);
  ctx.quadraticCurveTo(58, -25, 50, -122);
  ctx.quadraticCurveTo(0, -138, -50, -122);
  ctx.closePath();
  fillStroke(ctx, white, 5);
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-42, -25);
  ctx.lineTo(42, -25);
  ctx.moveTo(-38, 5);
  ctx.lineTo(38, 5);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-48, 32);
  ctx.lineTo(48, 32);
  ctx.lineTo(46, 48);
  ctx.lineTo(-46, 48);
  ctx.closePath();
  fillStroke(ctx, gold, 3);

  // Gold ribbed shoulder straps — large enough to read at fight distance
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(side * 16, -125);
    ctx.lineTo(side * 58, -108);
    ctx.lineTo(side * 54, -86);
    ctx.lineTo(side * 14, -105);
    ctx.closePath();
    fillStroke(ctx, gold, 3);
    ctx.fillStyle = cssHex(shade(v.gold || 0xeab308, 0.22));
    ctx.fillRect(side * 30 - 5, -115, 10, 18);
    ctx.strokeStyle = '#a16207';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(side * 22, -118);
    ctx.lineTo(side * 48, -102);
    ctx.moveTo(side * 20, -108);
    ctx.lineTo(side * 46, -94);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.moveTo(-20, -138);
  ctx.lineTo(-16, -162);
  ctx.lineTo(16, -162);
  ctx.lineTo(20, -138);
  ctx.closePath();
  fillStroke(ctx, suit, 3);

  drawLimb(ctx, {
    x: 48, y: -120, ang: off.rArm.ang, length: 120 * off.rArm.len, width: 16,
    fill: suit, cuff: white, hand: white
  });
  ctx.save();
  ctx.translate(48, -120);
  ctx.rotate(off.rArm.ang);
  ctx.beginPath();
  ctx.moveTo(-22, 62);
  ctx.lineTo(-28, 82);
  ctx.lineTo(28, 82);
  ctx.lineTo(22, 62);
  ctx.closePath();
  fillStroke(ctx, white, 3);
  ctx.restore();

  drawLimb(ctx, {
    x: 22, y: 55, ang: off.rLeg.ang, length: 145, width: 19,
    fill: suit, boot: { color: white, trim: gold }
  });

  ctx.fillStyle = suitShade;
  ctx.globalAlpha = 0.22;
  ctx.fillRect(6, -110, 42, 190);
  ctx.globalAlpha = 1;

  ctx.restore();
}

function drawGenericBody(ctx, v, pose) {
  const outfit = cssHex(v.outfit);
  const pants = cssHex(v.pants || v.outfit);
  const accent = cssHex(v.accent || 0xf59e0b);
  const skin = cssHex(v.skin);
  const boots = cssHex(v.boots || 0x1a1a1a);
  const under = cssHex(v.undershirt || v.accent || v.outfit);
  const off = poseOffsets(pose);

  ctx.save();
  ctx.translate(off.lean, 0);
  ctx.rotate(off.torsoRot);

  drawLimb(ctx, {
    x: -40, y: -95, ang: off.lArm.ang, length: 95, width: 15,
    fill: under, cuff: accent, hand: skin
  });
  drawLimb(ctx, {
    x: -20, y: 50, ang: off.lLeg.ang, length: 118, width: 18,
    fill: pants, boot: { color: boots, trim: accent }
  });

  ctx.beginPath();
  ctx.moveTo(-50, -110);
  ctx.lineTo(-46, 45);
  ctx.lineTo(46, 45);
  ctx.lineTo(50, -110);
  ctx.quadraticCurveTo(0, -125, -50, -110);
  ctx.closePath();
  fillStroke(ctx, outfit, 5);

  ctx.beginPath();
  ctx.moveTo(-44, 40);
  ctx.lineTo(44, 40);
  ctx.lineTo(40, 120);
  ctx.quadraticCurveTo(0, 130, -40, 120);
  ctx.closePath();
  fillStroke(ctx, pants, 5);

  ctx.beginPath();
  ctx.moveTo(-48, 32);
  ctx.lineTo(48, 32);
  ctx.lineTo(46, 48);
  ctx.lineTo(-46, 48);
  ctx.closePath();
  fillStroke(ctx, accent, 3);

  drawLimb(ctx, {
    x: 40, y: -95, ang: off.rArm.ang, length: 95, width: 15,
    fill: under, cuff: accent, hand: skin
  });
  drawLimb(ctx, {
    x: 20, y: 50, ang: off.rLeg.ang, length: 118, width: 18,
    fill: pants, boot: { color: boots, trim: accent }
  });
  ctx.restore();
}

function drawHair(ctx, v) {
  if (v.hairStyle === 'goku') return drawGokuHair(ctx);
  if (v.hairStyle === 'vegeta') return drawVegetaHair(ctx);
  // Generic spikes from hair color
  const hair = cssHex(v.hair || 0x1a1410);
  ellipse(ctx, 0, -235, 58, 45);
  fillStroke(ctx, hair, 4);
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 28, -340 - Math.abs(i) * 8);
    ctx.lineTo(i * 22 - 16, -245);
    ctx.lineTo(i * 22 + 16, -245);
    ctx.closePath();
    fillStroke(ctx, hair, 3);
  }
}

function expressionFor(v) {
  if (v.expression) return v.expression;
  if (v.hairStyle === 'goku') return 'grin';
  if (v.hairStyle === 'vegeta' || v.kit === 'saiyanArmor') return 'smirk';
  return 'smile';
}

function drawFigure(ctx, v, pose, originX, originY) {
  ctx.save();
  ctx.translate(originX, originY);
  // Body → hair crown → face on top so eyes/mouth stay readable over bangs
  if (v.kit === 'gi') drawGiBody(ctx, v, pose);
  else if (v.kit === 'saiyanArmor') drawSaiyanBody(ctx, v, pose);
  else drawGenericBody(ctx, v, pose);

  drawHair(ctx, v);
  drawFace(ctx, v, expressionFor(v));

  // Aura hint when charging
  if (pose === 'charge') {
    ctx.globalAlpha = 0.35;
    ctx.strokeStyle = cssHex(v.aura || 0x60a5fa);
    ctx.lineWidth = 10;
    ellipse(ctx, 0, -40, 110, 220);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
  ctx.restore();
}

function buildAtlas(v) {
  const key = `v4|${v.kit}|${v.hairStyle}|${v.outfit}|${v.undershirt}|${v.skin}|${v.hair}|${v.expression || ''}`;
  if (texCache.has(key)) return texCache.get(key);
  if (typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = CELL_W * ATLAS_COLS;
  canvas.height = CELL_H * ATLAS_ROWS;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  POSES.forEach((pose, i) => {
    const col = i % ATLAS_COLS;
    const row = Math.floor(i / ATLAS_COLS);
    const ox = col * CELL_W + CELL_W * 0.5;
    const oy = row * CELL_H + CELL_H * 0.58;
    // Soft ground ellipse under feet
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.beginPath();
    ctx.ellipse(ox, oy + 175, 70, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    drawFigure(ctx, v, pose, ox, oy);
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.repeat.set(1 / ATLAS_COLS, 1 / ATLAS_ROWS);
  tex.needsUpdate = true;
  texCache.set(key, tex);
  return tex;
}

function setPoseFrame(tex, pose) {
  const idx = Math.max(0, POSES.indexOf(pose));
  const col = idx % ATLAS_COLS;
  const row = Math.floor(idx / ATLAS_COLS);
  tex.offset.x = col / ATLAS_COLS;
  tex.offset.y = 1 - (row + 1) / ATLAS_ROWS;
}

/**
 * Builds a 2.5D anime fighter (canvas figure on a plane) with the same
 * control surface as the old procedural mesh: setFacing / setAnim / animate.
 */
export function buildFighterModel(fighterDef) {
  const v = fighterDef.visual;
  const root = new THREE.Group();
  root.name = fighterDef.id;

  const heightScale = (v.height || 1.72) / 1.72;
  // Large enough to read faces/outfits under the fight camera
  const displayH = 4.4 * heightScale;
  const displayW = displayH * (CELL_W / CELL_H) * 1.08;

  const atlas = buildAtlas(v);
  // Clone so per-fighter UV pose offsets never fight when kits share a cached atlas
  const tex = atlas ? atlas.clone() : null;
  if (tex) {
    tex.needsUpdate = true;
    tex.repeat.set(1 / ATLAS_COLS, 1 / ATLAS_ROWS);
  }
  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    alphaTest: 0.15,
    depthWrite: true,
    side: THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
  mesh.scale.set(displayW, displayH, 1);
  mesh.position.y = displayH * 0.5;
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  root.add(mesh);

  // Soft contact shadow disc
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.55, 24),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.28, depthWrite: false })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.02;
  root.add(shadow);

  // Aura shell (matches combat charging FX expectations)
  const aura = new THREE.Mesh(
    new THREE.SphereGeometry(0.85, 16, 12),
    new THREE.MeshBasicMaterial({
      color: v.aura || 0x60a5fa, transparent: true, opacity: 0, depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  aura.scale.set(1.1, 1.7, 1.1);
  aura.position.y = displayH * 0.45;
  root.add(aura);

  const rim = new THREE.PointLight(v.aura || 0x60a5fa, 0.7, 4.5, 2);
  rim.position.set(0, displayH * 0.55, 1.1);
  root.add(rim);
  const fillRim = new THREE.PointLight(0xffe6c8, 0.25, 3.2, 2);
  fillRim.position.set(0, displayH * 0.6, -0.9);
  root.add(fillRim);

  // Stub bones so combat code that only calls animate still works
  const hips = new THREE.Group();
  const torso = new THREE.Group();
  const head = new THREE.Group();
  const stubArm = () => ({ shoulder: new THREE.Group(), upper: new THREE.Group(), elbow: new THREE.Group() });
  const stubLeg = () => ({ hip: new THREE.Group(), thigh: new THREE.Group(), knee: new THREE.Group() });
  const bones = {
    hips, torso, head,
    leftArm: stubArm(), rightArm: stubArm(),
    leftLeg: stubLeg(), rightLeg: stubLeg(),
    aura, rim, fillRim, mesh, shadow
  };

  let facing = 1;
  let anim = 'idle';
  let animT = 0;
  let pose = 'idle';
  let cameraRef = null;

  if (tex) setPoseFrame(tex, 'idle');

  function setCamera(cam) {
    cameraRef = cam || null;
  }

  function setFacing(dir) {
    facing = dir >= 0 ? 1 : -1;
    // Art faces the camera (billboard); facing only mirrors the drawing
    mesh.scale.x = facing >= 0 ? Math.abs(displayW) : -Math.abs(displayW);
  }

  function billboardToCamera() {
    if (!cameraRef) {
      // Default: face +Z toward typical fight cam (camera sits at +Z looking at origin)
      root.rotation.y = 0;
      return;
    }
    const dx = cameraRef.position.x - root.position.x;
    const dz = cameraRef.position.z - root.position.z;
    root.rotation.y = Math.atan2(dx, dz);
  }

  function resolvePose(name, state = {}) {
    if (state.hurt) return 'hurt';
    if (state.guarding) return 'guard';
    if (state.charging) return 'charge';
    if (name === 'punch' || name === 'uppercut' || name === 'dash') return 'punch';
    if (name === 'kick') return 'kick';
    if (name === 'guard') return 'guard';
    if (name === 'hurt') return 'hurt';
    return 'idle';
  }

  function setAnim(name) {
    if (anim !== name) {
      anim = name;
      animT = 0;
    }
  }

  function animate(dt, state = {}) {
    animT += dt;
    billboardToCamera();
    const next = resolvePose(anim, state);
    if (next !== pose && tex) {
      pose = next;
      setPoseFrame(tex, pose);
    }

    // Light life: bob + attack punch squash
    const breath = Math.sin(animT * 2.4) * 0.02;
    let squash = 1;
    let stretch = 1;
    if (pose === 'punch' && animT < 0.2) {
      stretch = 1.06;
      squash = 0.96;
    } else if (pose === 'kick' && animT < 0.25) {
      stretch = 1.04;
    } else if (pose === 'hurt') {
      stretch = 0.96;
      squash = 1.04;
    }
    const w = Math.abs(displayW) * squash;
    mesh.scale.y = displayH * stretch;
    mesh.scale.x = facing >= 0 ? w : -w;
    mesh.position.y = displayH * 0.5 * stretch + (state.airborne ? 0.05 : breath);

    const energyGlow = 0.45 + (state.aura || 0) * 2.2 + (state.charging ? 0.7 : 0);
    rim.intensity += (energyGlow - rim.intensity) * Math.min(1, 6 * dt);
    if (state.charging) {
      aura.material.opacity = 0.4 + Math.sin(animT * 12) * 0.15;
      aura.scale.setScalar(1.05 + Math.sin(animT * 8) * 0.12);
    } else {
      aura.material.opacity += ((state.aura || 0) * 0.7 - aura.material.opacity) * Math.min(1, 6 * dt);
    }
    shadow.scale.setScalar(state.airborne ? 0.55 : 1);
    shadow.material.opacity = state.airborne ? 0.12 : 0.28;
  }

  function dispose() {
    mat.dispose();
    tex?.dispose();
    mesh.geometry.dispose();
    shadow.geometry.dispose();
    aura.geometry.dispose();
    // Base atlas bitmaps stay cached; only the per-instance UV clone is disposed
  }

  return {
    root,
    bones,
    setFacing,
    setCamera,
    setAnim,
    animate,
    dispose,
    height: v.height || 1.72
  };
}
