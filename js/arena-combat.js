// Fighter entities, melee/projectile combat, and simple CPU AI.
import { getFighter, getSkill, resolveLoadout, SPECIALS } from './arena-roster.js';
// 2.5D canvas-painted anime figures (closer to 2D anime references than procedural meshes)
import { buildFighterModel } from './arena-anime-sprite.js';

const MAX_HP = 100;
const MAX_ENERGY = 100;

let sfx = null;
export function setArenaSfx(api) {
  sfx = api || null;
}

export function createFighter({ scene, fighterId, side, unlockedIds, control = 'human' }) {
  const def = getFighter(fighterId);
  const loadout = resolveLoadout(def, unlockedIds);
  const model = buildFighterModel(def);
  scene.add(model.root);

  const fighter = {
    id: side,
    def,
    loadout,
    control,
    model,
    x: side === 'p1' ? -5.1 : 5.1,
    y: 0,
    z: 0,
    vx: 0,
    vy: 0,
    vz: 0,
    facing: side === 'p1' ? 1 : -1,
    hp: MAX_HP,
    energy: MAX_ENERGY,
    maxHp: MAX_HP,
    maxEnergy: MAX_ENERGY,
    guarding: false,
    airborne: false,
    wasAirborne: false,
    attackTimer: 0,
    attackId: null,
    attackHit: false,
    punchAlt: false,
    cooldown: {},
    stun: 0,
    invuln: 0,
    charge: null,
    input: {
      left: false, right: false, forward: false, back: false,
      up: false, down: false, punch: false, kick: false,
      skill1: false, skill2: false, special1: false, special2: false, guard: false,
      axisX: 0, axisZ: 0
    },
    alive: true
  };

  model.setFacing(fighter.facing);
  syncRoot(fighter);
  return fighter;
}

function syncRoot(f) {
  f.model.root.position.set(f.x, f.y, f.z);
  f.model.setFacing(f.facing);
}

export function disposeFighter(f, scene) {
  scene.remove(f.model.root);
  f.model.dispose();
}

function canUse(f, skillId) {
  if (!skillId) return false;
  if ((f.cooldown[skillId] || 0) > 0) return false;
  if (f.attackTimer > 0 || f.stun > 0 || !f.alive) return false;
  const skill = getSkill(skillId);
  if (!skill) return false;
  if (skill.kind === 'beam' || skill.kind === 'orb') {
    if (!f.loadout.specials.includes(skillId)) return false;
    if (f.energy < (skill.energyCost || 0)) return false;
  } else if (skill.kind === 'melee') {
    if (!f.loadout.melee.includes(skillId)) return false;
  }
  return true;
}

function startAttack(f, skillId) {
  const skill = getSkill(skillId);
  if (!skill || !canUse(f, skillId)) return false;
  f.attackId = skillId;
  f.attackTimer = skill.duration || 0.4;
  f.attackHit = false;
  f.cooldown[skillId] = skill.cooldown || 0.4;
  f.guarding = false;
  if (skillId === 'punch') {
    f.punchAlt = !f.punchAlt;
    f.attackHand = f.punchAlt ? 'rear' : 'lead';
  } else {
    f.attackHand = 'lead';
  }
  if (skill.energyCost) f.energy = Math.max(0, f.energy - skill.energyCost);
  if (skill.lunge) f.vx = f.facing * skill.lunge;
  if (skill.kind === 'beam' || skill.kind === 'orb') {
    f.charge = { skillId, t: 0.22 };
    sfx?.charge?.();
  } else {
    sfx?.whoosh?.(skillId);
  }
  f.model.setAnim(skillId);
  return true;
}

function tryMeleeHit(attacker, defender, skill, fx) {
  if (attacker.attackHit) return;
  const dx = defender.x - attacker.x;
  const dy = defender.y - attacker.y;
  const reach = skill.reach || 1.5;
  if (Math.sign(dx || attacker.facing) !== attacker.facing && Math.abs(dx) > 0.4) return;
  if (Math.abs(dx) > reach || Math.abs(dy) > 1.4) return;
  attacker.attackHit = true;
  applyHit(attacker, defender, skill, fx);
}

function applyHit(attacker, defender, skill, fx) {
  if (defender.invuln > 0 || !defender.alive) return;
  let dmg = (skill.damage || 0) * (attacker.loadout.damageMul || 1);
  let kb = skill.knockback || 3;
  let lift = skill.lift || 1.5;
  const wasGuarding = !!(defender.guarding && defender.loadout.hasGuard);
  if (wasGuarding) {
    const g = getSkill('guard');
    dmg *= g.damageMul ?? 0.28;
    kb *= g.knockMul ?? 0.4;
    lift *= 0.4;
    sfx?.block?.();
  } else {
    const heavy = (skill.damage || 0) >= 14 || !!skill.lunge;
    const special = skill.kind === 'beam' || skill.kind === 'orb' || !!skill.color;
    sfx?.hit?.({ heavy, special });
  }
  defender.hp = Math.max(0, defender.hp - dmg);
  defender.vx = Math.sign(defender.x - attacker.x || attacker.facing) * kb;
  defender.vy = Math.max(defender.vy, lift);
  defender.stun = 0.28;
  defender.invuln = 0.12;
  defender.guarding = false;
  if (skill.energyGain) attacker.energy = Math.min(MAX_ENERGY, attacker.energy + skill.energyGain);
  const hx = (attacker.x + defender.x) / 2;
  const hy = attacker.y + 1.1;
  fx.emitSparks(hx, hy, 0, attacker.def.visual.aura, 12);
  fx.emitFlash(hx, hy, 0, attacker.def.visual.aura, 0.9);
  if (defender.hp <= 0) {
    defender.alive = false;
    defender.hp = 0;
    sfx?.ko?.();
  }
}

export function updateFighter(f, dt, bounds, keysActive) {
  if (!f.alive) {
    f.model.animate(dt, { hurt: true });
    syncRoot(f);
    return;
  }

  // Cooldowns
  for (const k of Object.keys(f.cooldown)) {
    f.cooldown[k] = Math.max(0, f.cooldown[k] - dt);
  }
  f.stun = Math.max(0, f.stun - dt);
  f.invuln = Math.max(0, f.invuln - dt);

  const regen = 7 * (f.loadout.energyRegenMul || 1);
  f.energy = Math.min(MAX_ENERGY, f.energy + regen * dt);

  if (f.charge) {
    f.charge.t -= dt;
    if (f.charge.t <= 0) {
      const done = f.charge.skillId;
      f.charge = null;
      f._pendingProjectile = done;
    }
  }

  if (f.attackTimer > 0) {
    f.attackTimer -= dt;
    if (f.attackTimer <= 0) {
      f.attackTimer = 0;
      f.attackId = null;
    }
  }

  const input = f.input;
  f.guarding = !!(input.guard || input.down) && f.loadout.hasGuard && f.attackTimer <= 0 && f.stun <= 0;

  if (f.stun <= 0 && f.attackTimer <= 0 && !f.charge) {
    if (keysActive) {
      if (input.punch) startAttack(f, 'punch');
      else if (input.kick) startAttack(f, 'kick');
      else if (input.skill1 && f.loadout.melee.includes('uppercut')) startAttack(f, 'uppercut');
      else if (input.skill2 && f.loadout.melee.includes('dash')) startAttack(f, 'dash');
      // Special keys remapped below via dedicated flags
      if (input.special1 && f.loadout.specials[0]) startAttack(f, f.loadout.specials[0]);
      if (input.special2 && f.loadout.specials[1]) startAttack(f, f.loadout.specials[1]);
    }
  }

  // Movement — discrete keys + analog stick (360° on the arena floor)
  const moveSpeed = f.guarding ? 2.2 : 5.6;
  let wishX = 0;
  let wishZ = 0;
  if (f.stun <= 0 && !f.guarding && !(f.attackTimer > 0 && !getSkill(f.attackId)?.lunge)) {
    if (input.left) wishX -= 1;
    if (input.right) wishX += 1;
    if (input.forward) wishZ -= 1;
    if (input.back) wishZ += 1;
    if (typeof input.axisX === 'number') wishX += input.axisX;
    if (typeof input.axisZ === 'number') wishZ += input.axisZ;
    const mag = Math.hypot(wishX, wishZ);
    if (mag > 1) {
      wishX /= mag;
      wishZ /= mag;
    }
  }
  if (wishX !== 0 || wishZ !== 0) {
    f.vx += (wishX * moveSpeed - f.vx) * Math.min(1, 14 * dt);
    f.vz += (wishZ * moveSpeed - f.vz) * Math.min(1, 14 * dt);
    if (Math.abs(wishX) > 0.12) f.facing = wishX > 0 ? 1 : -1;
  } else if (f.attackTimer <= 0) {
    f.vx *= Math.pow(0.02, dt);
    f.vz *= Math.pow(0.02, dt);
  } else {
    f.vx *= Math.pow(0.15, dt);
    f.vz *= Math.pow(0.15, dt);
  }

  // Jump / flight
  if (f.y <= 0.001) {
    f.airborne = false;
    f.y = 0;
    if (f.vy < 0) f.vy = 0;
    if (input.up && f.stun <= 0) {
      f.vy = 8.5;
      f.airborne = true;
      sfx?.jump?.();
    }
  } else {
    f.airborne = true;
    if (input.up && f.loadout.hasFlight && f.energy > 1) {
      f.vy = Math.max(f.vy, 3.2);
      f.energy = Math.max(0, f.energy - (getSkill('flight').energyCost || 4) * dt);
    } else {
      f.vy -= 22 * dt;
    }
  }

  f.x += f.vx * dt;
  f.y += f.vy * dt;
  f.z += f.vz * dt;
  if (f.y < 0) {
    f.y = 0;
    f.vy = 0;
    f.airborne = false;
  }
  if (f.y > 6.5) { f.y = 6.5; f.vy = Math.min(0, f.vy); }
  if (f.wasAirborne && !f.airborne) sfx?.land?.();
  f.wasAirborne = f.airborne;

  const r = bounds.radius - 0.6;
  const dist = Math.hypot(f.x, f.z);
  if (dist > r) {
    const s = r / dist;
    f.x *= s;
    f.z *= s;
    f.vx *= 0.4;
    f.vz *= 0.4;
  }

  syncRoot(f);
  f.model.animate(dt, {
    moving: Math.hypot(wishX, wishZ) > 0.08 && !f.airborne,
    airborne: f.airborne,
    guarding: f.guarding,
    attack: f.attackId,
    attackHand: f.attackHand || 'lead',
    hurt: f.stun > 0.1,
    charging: !!f.charge,
    aura: f.charge ? 0.4 : 0
  });
}

export function resolveCombat(a, b, fx, dt) {
  // Melee active windows ~ middle of attack
  for (const pair of [[a, b], [b, a]]) {
    const [atk, def] = pair;
    if (!atk.attackId || atk.attackTimer <= 0) continue;
    const skill = getSkill(atk.attackId);
    if (!skill || skill.kind !== 'melee') continue;
    const total = skill.duration || 0.4;
    const progress = 1 - atk.attackTimer / total;
    if (progress > 0.25 && progress < 0.75) tryMeleeHit(atk, def, skill, fx);
  }

  // Spawn charged projectiles
  for (const f of [a, b]) {
    if (!f._pendingProjectile) continue;
    const skillId = f._pendingProjectile;
    f._pendingProjectile = null;
    const skill = SPECIALS[skillId] || getSkill(skillId);
    if (!skill) continue;
    fx.spawnProjectile({
      kind: skill.kind === 'orb' ? 'orb' : 'beam',
      x: f.x + f.facing * 0.9,
      y: f.y + 1.15,
      z: f.z,
      dir: f.facing,
      speed: skill.speed || 16,
      radius: skill.radius || 0.4,
      color: skill.color || 0x60a5fa,
      glow: skill.glow || skill.color,
      damage: (skill.damage || 10) * (f.loadout.damageMul || 1),
      knockback: skill.knockback || 5,
      owner: f.id
    });
    sfx?.blast?.();
  }

  // Projectile hits
  fx.update(dt, (proj) => {
    if (proj.hit) return;
    for (const target of [a, b]) {
      if (target.id === proj.owner || !target.alive) continue;
      const dx = target.x - proj.mesh.position.x;
      const dy = (target.y + 1.0) - proj.mesh.position.y;
      const hitR = proj.radius + 0.55;
      if (dx * dx + dy * dy < hitR * hitR) {
        proj.hit = true;
        const pseudo = {
          damage: proj.damage,
          knockback: proj.knockback,
          lift: 3.5,
          energyGain: 0
        };
        const attacker = proj.owner === a.id ? a : b;
        applyHit(attacker, target, pseudo, fx);
        fx.emitFlash(proj.mesh.position.x, proj.mesh.position.y, 0, proj.mesh.material.color.getHex(), 1.3);
      }
    }
  });

  // Face each other lightly when idle
  if (a.alive && b.alive && Math.abs(a.vx) < 0.4 && a.attackTimer <= 0) {
    // keep last facing from movement
  }
}

export function updateCpu(cpu, foe, difficulty = 'normal') {
  if (!cpu.alive || cpu.stun > 0) return;
  const dx = foe.x - cpu.x;
  const dist = Math.abs(dx);
  cpu.facing = dx >= 0 ? 1 : -1;
  cpu.input = {
    left: false, right: false, forward: false, back: false,
    up: false, down: false,
    punch: false, kick: false, skill1: false, skill2: false,
    special1: false, special2: false, guard: false,
    axisX: 0, axisZ: 0
  };

  const aggro = difficulty === 'easy' ? 0.55 : difficulty === 'hard' ? 0.92 : 0.75;
  const preferSpecial = difficulty === 'hard' ? 0.45 : 0.28;

  if (foe.attackId && dist < 2.2 && cpu.loadout.hasGuard && Math.random() < 0.35 * aggro) {
    cpu.input.guard = true;
    return;
  }

  // Prefer mid martial range so 偏马步 / 冲拳 stay readable (avoid clinch)
  if (dist < 2.0) {
    // Hard retreat when inside preferred space
    if (dx > 0) cpu.input.left = true;
    else cpu.input.right = true;
    return;
  }

  if (dist > 3.5) {
    if (dx > 0) cpu.input.right = true;
    else cpu.input.left = true;
    if (cpu.loadout.melee.includes('dash') && dist > 5.5 && Math.random() < 0.012 * aggro) {
      cpu.input.skill2 = true;
    }
  } else if (dist < 2.55) {
    // Soft drift out while still in kick/punch reach
    if (dx > 0) cpu.input.left = Math.random() < 0.55;
    else cpu.input.right = Math.random() < 0.55;
  } else if (Math.random() < 0.05) {
    if (Math.random() < 0.5) cpu.input.left = true;
    else cpu.input.right = true;
  }

  if (foe.y > 1.5 && cpu.loadout.hasFlight) cpu.input.up = true;
  else if (Math.random() < 0.008 * aggro) cpu.input.up = true;

  // Reach extended to ~2.1–2.45 so mid-range strikes land without clinching
  if (dist >= 2.05 && dist < 2.9 && Math.random() < 0.032 * aggro) {
    if (Math.random() < 0.45) cpu.input.punch = true;
    else if (Math.random() < 0.7) cpu.input.kick = true;
    else cpu.input.skill1 = true;
  }

  if (dist > 3.0 && dist < 8 && Math.random() < 0.012 * aggro + preferSpecial * 0.01) {
    if (cpu.energy > 40 && cpu.loadout.specials[1] && Math.random() < preferSpecial) cpu.input.special2 = true;
    else if (cpu.energy > 30 && cpu.loadout.specials[0]) cpu.input.special1 = true;
  }
}

export function resetFighter(f, side) {
  f.x = side === 'p1' ? -5.1 : 5.1;
  f.y = 0;
  f.z = 0;
  f.vx = 0;
  f.vy = 0;
  f.vz = 0;
  f.facing = side === 'p1' ? 1 : -1;
  f.hp = f.maxHp;
  f.energy = f.maxEnergy;
  f.guarding = false;
  f.airborne = false;
  f.attackTimer = 0;
  f.attackId = null;
  f.attackHit = false;
  f.cooldown = {};
  f.stun = 0;
  f.invuln = 0;
  f.charge = null;
  f._pendingProjectile = null;
  f.alive = true;
  f.input = {
    left: false, right: false, forward: false, back: false,
    up: false, down: false, punch: false, kick: false,
    skill1: false, skill2: false, special1: false, special2: false, guard: false,
    axisX: 0, axisZ: 0
  };
  syncRoot(f);
}

export const MATCH = {
  ROUND_TIME: 99,
  WIN_POINTS: 12,
  DRAW_POINTS: 4,
  LOSS_POINTS: 3
};
