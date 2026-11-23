// Extensible fighter roster + skill catalog for Arena Clash.
// Add cartoon characters by appending to FIGHTERS with a unique id and visual kit.

export const UNIVERSES = [
  { id: 'dragonball', name: 'Dragon Ball', tag: 'Z WARRIORS' },
  { id: 'nezha', name: 'Nezha', tag: 'MYTHIC' }
];

/** Shared skill definitions. `unlockCost` is in quiz reward points (0 = starter). */
export const SKILLS = {
  punch: {
    id: 'punch', label: 'Punch', kind: 'melee', unlockCost: 0, tier: 0,
    damage: 8, energyGain: 6, cooldown: 0.35, reach: 1.55, duration: 0.32,
    knockback: 3.2, blurb: 'Quick jab. Always ready.'
  },
  kick: {
    id: 'kick', label: 'Kick', kind: 'melee', unlockCost: 0, tier: 0,
    damage: 12, energyGain: 8, cooldown: 0.48, reach: 1.85, duration: 0.42,
    knockback: 4.4, blurb: 'Solid mid kick with more push.'
  },
  uppercut: {
    id: 'uppercut', label: 'Uppercut', kind: 'melee', unlockCost: 12, tier: 1,
    damage: 16, energyGain: 10, cooldown: 0.7, reach: 1.6, duration: 0.45,
    knockback: 3.8, lift: 6.5, blurb: 'Launch foes upward.'
  },
  dash: {
    id: 'dash', label: 'Dash Strike', kind: 'melee', unlockCost: 18, tier: 1,
    damage: 18, energyGain: 12, cooldown: 0.95, reach: 2.4, duration: 0.5,
    knockback: 6.2, lunge: 9, blurb: 'Close the gap in a flash.'
  },
  guard: {
    id: 'guard', label: 'Energy Guard', kind: 'defense', unlockCost: 10, tier: 1,
    damage: 0, energyCost: 0, cooldown: 0, duration: 0,
    damageMul: 0.28, knockMul: 0.4, blurb: 'Hold to cut damage while shielding.'
  },
  flight: {
    id: 'flight', label: 'Flight', kind: 'mobility', unlockCost: 22, tier: 2,
    damage: 0, energyCost: 4, cooldown: 0, duration: 0,
    blurb: 'Hold jump in air to hover and chase aerial fights.'
  },
  powerup: {
    id: 'powerup', label: 'Power Surge', kind: 'passive', unlockCost: 28, tier: 2,
    damage: 0, damageBonus: 0.12, energyRegen: 1.25, blurb: '+12% damage and faster energy.'
  }
};

/** Signature specials keyed by id; fighters reference these. */
export const SPECIALS = {
  kamehameha: {
    id: 'kamehameha', label: 'Kamehameha', kind: 'beam', unlockCost: 35, tier: 2,
    damage: 22, energyCost: 34, cooldown: 2.4, speed: 18, radius: 0.42,
    knockback: 7, color: 0x4fc3f7, glow: 0xb3e5fc, blurb: 'Blue ki wave.'
  },
  spiritbomb: {
    id: 'spiritbomb', label: 'Spirit Bomb', kind: 'orb', unlockCost: 55, tier: 3,
    damage: 34, energyCost: 55, cooldown: 4.2, speed: 9, radius: 0.75,
    knockback: 9, color: 0x66bb6a, glow: 0xc8e6c9, blurb: 'Massive charged orb.'
  },
  galickgun: {
    id: 'galickgun', label: 'Galick Gun', kind: 'beam', unlockCost: 35, tier: 2,
    damage: 21, energyCost: 34, cooldown: 2.3, speed: 19, radius: 0.4,
    knockback: 6.5, color: 0xab47bc, glow: 0xe1bee7, blurb: 'Royal purple beam.'
  },
  bigbang: {
    id: 'bigbang', label: 'Big Bang Attack', kind: 'orb', unlockCost: 55, tier: 3,
    damage: 30, energyCost: 52, cooldown: 3.9, speed: 11, radius: 0.65,
    knockback: 8.5, color: 0xffca28, glow: 0xffecb3, blurb: 'Explosive ki sphere.'
  },
  masenko: {
    id: 'masenko', label: 'Masenko', kind: 'beam', unlockCost: 32, tier: 2,
    damage: 20, energyCost: 30, cooldown: 2.2, speed: 17, radius: 0.38,
    knockback: 6, color: 0xffee58, glow: 0xfff9c4, blurb: 'Golden forehead blast.'
  },
  superkamehameha: {
    id: 'superkamehameha', label: 'Super Kamehameha', kind: 'orb', unlockCost: 58, tier: 3,
    damage: 36, energyCost: 58, cooldown: 4.4, speed: 10, radius: 0.8,
    knockback: 9.5, color: 0x42a5f5, glow: 0xbbdefb, blurb: 'Charged blue finisher.'
  },
  specialbeamcannon: {
    id: 'specialbeamcannon', label: 'Special Beam Cannon', kind: 'beam', unlockCost: 38, tier: 2,
    damage: 24, energyCost: 36, cooldown: 2.5, speed: 22, radius: 0.28,
    knockback: 5.5, color: 0x9ccc65, glow: 0xdcedc8, blurb: 'Piercing corkscrew beam.'
  },
  hellzonegrenade: {
    id: 'hellzonegrenade', label: 'Hellzone Grenade', kind: 'orb', unlockCost: 52, tier: 3,
    damage: 31, energyCost: 50, cooldown: 4.0, speed: 8, radius: 0.7,
    knockback: 8, color: 0xc0ca33, glow: 0xf0f4c3, blurb: 'Orbiting ki mines converge.'
  },
  burningattack: {
    id: 'burningattack', label: 'Burning Attack', kind: 'beam', unlockCost: 34, tier: 2,
    damage: 21, energyCost: 32, cooldown: 2.3, speed: 18, radius: 0.4,
    knockback: 6.2, color: 0x26a69a, glow: 0xb2dfdb, blurb: 'Teal finger blast.'
  },
  finalflash: {
    id: 'finalflash', label: 'Final Flash', kind: 'orb', unlockCost: 60, tier: 3,
    damage: 38, energyCost: 60, cooldown: 4.5, speed: 12, radius: 0.85,
    knockback: 10, color: 0xffee58, glow: 0xfffde7, blurb: 'Prince’s ultimate flash.'
  },
  deathbeam: {
    id: 'deathbeam', label: 'Death Beam', kind: 'beam', unlockCost: 36, tier: 2,
    damage: 23, energyCost: 28, cooldown: 1.9, speed: 26, radius: 0.22,
    knockback: 4, color: 0xce93d8, glow: 0xf3e5f5, blurb: 'Needle-thin death ray.'
  },
  deathball: {
    id: 'deathball', label: 'Death Ball', kind: 'orb', unlockCost: 58, tier: 3,
    damage: 36, energyCost: 56, cooldown: 4.3, speed: 9, radius: 0.9,
    knockback: 9, color: 0x7b1fa2, glow: 0xe1bee7, blurb: 'Planet-crushing sphere.'
  },
  erasercannon: {
    id: 'erasercannon', label: 'Eraser Cannon', kind: 'beam', unlockCost: 40, tier: 2,
    damage: 26, energyCost: 38, cooldown: 2.6, speed: 16, radius: 0.5,
    knockback: 7.5, color: 0x66bb6a, glow: 0xc8e6c9, blurb: 'Raw green power blast.'
  },
  giganticmeteor: {
    id: 'giganticmeteor', label: 'Gigantic Meteor', kind: 'orb', unlockCost: 65, tier: 3,
    damage: 40, energyCost: 62, cooldown: 4.8, speed: 8, radius: 1.05,
    knockback: 11, color: 0xffc107, glow: 0xffecb3, blurb: 'Colossal ki meteor.'
  },
  destructodisc: {
    id: 'destructodisc', label: 'Destructo Disc', kind: 'orb', unlockCost: 30, tier: 2,
    damage: 19, energyCost: 28, cooldown: 2.1, speed: 14, radius: 0.55,
    knockback: 5, color: 0xff7043, glow: 0xffccbc, blurb: 'Spinning razor disc.'
  },
  solarflare: {
    id: 'solarflare', label: 'Solar Flare', kind: 'beam', unlockCost: 26, tier: 2,
    damage: 8, energyCost: 22, cooldown: 3.2, speed: 20, radius: 0.9,
    knockback: 2, color: 0xfff176, glow: 0xfffde7, blurb: 'Blind and stagger foes.'
  },
  candybeam: {
    id: 'candybeam', label: 'Candy Beam', kind: 'beam', unlockCost: 34, tier: 2,
    damage: 20, energyCost: 30, cooldown: 2.2, speed: 17, radius: 0.35,
    knockback: 5, color: 0xec407a, glow: 0xf8bbd0, blurb: 'Sweet pink beam.'
  },
  planetburst: {
    id: 'planetburst', label: 'Planet Burst', kind: 'orb', unlockCost: 56, tier: 3,
    damage: 33, energyCost: 54, cooldown: 4.1, speed: 9, radius: 0.8,
    knockback: 9, color: 0xf06292, glow: 0xfce4ec, blurb: 'Pink planet killer.'
  },
  hellflash: {
    id: 'hellflash', label: 'Hell Flash', kind: 'beam', unlockCost: 36, tier: 2,
    damage: 23, energyCost: 34, cooldown: 2.4, speed: 18, radius: 0.45,
    knockback: 6.5, color: 0xff7043, glow: 0xffe0b2, blurb: 'Twin arm cannons.'
  },
  rocketburst: {
    id: 'rocketburst', label: 'Rocket Burst', kind: 'orb', unlockCost: 50, tier: 3,
    damage: 29, energyCost: 48, cooldown: 3.8, speed: 13, radius: 0.6,
    knockback: 8, color: 0x66bb6a, glow: 0xdcedc8, blurb: 'Shoulder rocket punch.'
  },
  firewheel: {
    id: 'firewheel', label: 'Fire Wheel', kind: 'orb', unlockCost: 32, tier: 2,
    damage: 21, energyCost: 30, cooldown: 2.3, speed: 12, radius: 0.6,
    knockback: 6, color: 0xff5722, glow: 0xffccbc, blurb: 'Spinning flame ring.'
  },
  universering: {
    id: 'universering', label: 'Universe Ring', kind: 'beam', unlockCost: 48, tier: 3,
    damage: 32, energyCost: 50, cooldown: 3.6, speed: 15, radius: 0.55,
    knockback: 8, color: 0xffab00, glow: 0xffe082, blurb: 'Mythic binding blast.'
  }
};

const baseVisual = (overrides) => ({
  skin: 0xe8b896,
  hair: 0x1a1410,
  outfit: 0x2563eb,
  accent: 0xf59e0b,
  pants: 0x1e3a5f,
  boots: 0x1a1a1a,
  aura: 0x60a5fa,
  height: 1.72,
  build: 'athletic',
  hairStyle: 'spiky',
  ...overrides
});

export const FIGHTERS = [
  {
    id: 'goku', name: 'Goku', universe: 'dragonball', chinese: '孙悟空',
    tagline: 'Always training for the next fight.',
    starter: true, unlockCost: 0,
    baseSkills: ['punch', 'kick'],
    unlockSkills: ['uppercut', 'dash', 'guard', 'flight', 'powerup'],
    specials: ['kamehameha', 'spiritbomb'],
    visual: baseVisual({ outfit: 0xf97316, accent: 0x2563eb, pants: 0x1d4ed8, hair: 0x1c1917, hairStyle: 'spikyTall', aura: 0x38bdf8 })
  },
  {
    id: 'vegeta', name: 'Vegeta', universe: 'dragonball', chinese: '贝吉塔',
    tagline: 'Pride of the Saiyan race.',
    starter: true, unlockCost: 0,
    baseSkills: ['punch', 'kick'],
    unlockSkills: ['uppercut', 'dash', 'guard', 'flight', 'powerup'],
    specials: ['galickgun', 'bigbang'],
    visual: baseVisual({ outfit: 0x1e293b, accent: 0xffffff, pants: 0x0f172a, hair: 0x0f172a, hairStyle: 'spikyBack', aura: 0xc084fc, skin: 0xe0a878 })
  },
  {
    id: 'gohan', name: 'Gohan', universe: 'dragonball', chinese: '孙悟饭',
    tagline: 'Scholar by day, warrior when needed.',
    starter: false, unlockCost: 25,
    baseSkills: ['punch', 'kick'],
    unlockSkills: ['uppercut', 'dash', 'guard', 'flight', 'powerup'],
    specials: ['masenko', 'superkamehameha'],
    visual: baseVisual({ outfit: 0x15803d, accent: 0xf8fafc, pants: 0x14532d, hair: 0x1c1917, hairStyle: 'spikySoft', aura: 0x4ade80 })
  },
  {
    id: 'piccolo', name: 'Piccolo', universe: 'dragonball', chinese: '比克',
    tagline: 'Namekian mentor with deadly focus.',
    starter: false, unlockCost: 30,
    baseSkills: ['punch', 'kick'],
    unlockSkills: ['uppercut', 'dash', 'guard', 'flight', 'powerup'],
    specials: ['specialbeamcannon', 'hellzonegrenade'],
    visual: baseVisual({ skin: 0x4d7c0f, outfit: 0x422006, accent: 0xfacc15, pants: 0x1c1917, hair: 0x365314, hairStyle: 'antenna', aura: 0xa3e635, height: 1.9, build: 'tall' })
  },
  {
    id: 'trunks', name: 'Trunks', universe: 'dragonball', chinese: '特兰克斯',
    tagline: 'Future swordsman of hope.',
    starter: false, unlockCost: 28,
    baseSkills: ['punch', 'kick'],
    unlockSkills: ['uppercut', 'dash', 'guard', 'flight', 'powerup'],
    specials: ['burningattack', 'finalflash'],
    visual: baseVisual({ outfit: 0x0f766e, accent: 0xc4b5fd, pants: 0x134e4a, hair: 0xa5b4fc, hairStyle: 'long', aura: 0x2dd4bf, skin: 0xe8c4a0 })
  },
  {
    id: 'frieza', name: 'Frieza', universe: 'dragonball', chinese: '弗利萨',
    tagline: 'Emperor of cold calculation.',
    starter: false, unlockCost: 40,
    baseSkills: ['punch', 'kick'],
    unlockSkills: ['uppercut', 'dash', 'guard', 'flight', 'powerup'],
    specials: ['deathbeam', 'deathball'],
    visual: baseVisual({ skin: 0xf5d0fe, outfit: 0xffffff, accent: 0x7c3aed, pants: 0xf3e8ff, hair: 0xffffff, hairStyle: 'dome', aura: 0xe879f9, height: 1.55, build: 'compact' })
  },
  {
    id: 'broly', name: 'Broly', universe: 'dragonball', chinese: '布罗利',
    tagline: 'Legendary power barely contained.',
    starter: false, unlockCost: 45,
    baseSkills: ['punch', 'kick'],
    unlockSkills: ['uppercut', 'dash', 'guard', 'flight', 'powerup'],
    specials: ['erasercannon', 'giganticmeteor'],
    visual: baseVisual({ outfit: 0x166534, accent: 0xfde047, pants: 0x14532d, hair: 0x365314, hairStyle: 'wild', aura: 0x22c55e, height: 2.05, build: 'bulky' })
  },
  {
    id: 'android18', name: 'Android 18', universe: 'dragonball', chinese: '人造人18号',
    tagline: 'Cool, precise, unstoppable.',
    starter: false, unlockCost: 32,
    baseSkills: ['punch', 'kick'],
    unlockSkills: ['uppercut', 'dash', 'guard', 'flight', 'powerup'],
    specials: ['destructodisc', 'kamehameha'],
    visual: baseVisual({ outfit: 0x1e3a8a, accent: 0xf8fafc, pants: 0x1e293b, hair: 0xfde68a, hairStyle: 'bob', aura: 0xf472b6, skin: 0xf0c7a0, height: 1.65, build: 'athletic' })
  },
  {
    id: 'krillin', name: 'Krillin', universe: 'dragonball', chinese: '克林',
    tagline: 'Small frame, big courage.',
    starter: false, unlockCost: 18,
    baseSkills: ['punch', 'kick'],
    unlockSkills: ['uppercut', 'dash', 'guard', 'flight', 'powerup'],
    specials: ['destructodisc', 'solarflare'],
    visual: baseVisual({ outfit: 0xf97316, accent: 0xfef3c7, pants: 0x1e40af, hair: 0x1c1917, hairStyle: 'bald', aura: 0xfbbf24, height: 1.5, build: 'compact', skin: 0xe8b896 })
  },
  {
    id: 'cell', name: 'Cell', universe: 'dragonball', chinese: '沙鲁',
    tagline: 'Perfect form, perfect threat.',
    starter: false, unlockCost: 42,
    baseSkills: ['punch', 'kick'],
    unlockSkills: ['uppercut', 'dash', 'guard', 'flight', 'powerup'],
    specials: ['specialbeamcannon', 'superkamehameha'],
    visual: baseVisual({ skin: 0x65a30d, outfit: 0x365314, accent: 0x84cc16, pants: 0x1a2e05, hair: 0x14532d, hairStyle: 'shell', aura: 0xa3e635, height: 1.95, build: 'tall' })
  },
  {
    id: 'majinbuu', name: 'Majin Buu', universe: 'dragonball', chinese: '魔人布欧',
    tagline: 'Sweet tooth, scary strength.',
    starter: false, unlockCost: 38,
    baseSkills: ['punch', 'kick'],
    unlockSkills: ['uppercut', 'dash', 'guard', 'flight', 'powerup'],
    specials: ['candybeam', 'planetburst'],
    visual: baseVisual({ skin: 0xf9a8d4, outfit: 0xffffff, accent: 0xbe185d, pants: 0xfce7f3, hair: 0xf9a8d4, hairStyle: 'antenna', aura: 0xfb7185, height: 1.6, build: 'round' })
  },
  {
    id: 'android16', name: 'Android 16', universe: 'dragonball', chinese: '人造人16号',
    tagline: 'Gentle giant with rocket fists.',
    starter: false, unlockCost: 35,
    baseSkills: ['punch', 'kick'],
    unlockSkills: ['uppercut', 'dash', 'guard', 'flight', 'powerup'],
    specials: ['hellflash', 'rocketburst'],
    visual: baseVisual({ skin: 0xe8b896, outfit: 0x166534, accent: 0xfb923c, pants: 0x1c1917, hair: 0x365314, hairStyle: 'flat', aura: 0x4ade80, height: 2.0, build: 'bulky' })
  },
  {
    id: 'nezha', name: 'Nezha', universe: 'nezha', chinese: '哪吒',
    tagline: 'Lotus-born rebel of flame.',
    starter: false, unlockCost: 30,
    baseSkills: ['punch', 'kick'],
    unlockSkills: ['uppercut', 'dash', 'guard', 'flight', 'powerup'],
    specials: ['firewheel', 'universering'],
    visual: baseVisual({ outfit: 0xdc2626, accent: 0xfbbf24, pants: 0x7f1d1d, hair: 0x1c1917, hairStyle: 'buns', aura: 0xff7043, skin: 0xf0c7a0, height: 1.45, build: 'compact' })
  }
];

export function getFighter(id) {
  return FIGHTERS.find((f) => f.id === id) || FIGHTERS[0];
}

export function getSkill(id) {
  return SKILLS[id] || SPECIALS[id] || null;
}

export function allUnlockableFor(fighter) {
  const ids = [...(fighter.unlockSkills || []), ...(fighter.specials || [])];
  return ids.map(getSkill).filter(Boolean);
}

export function starterUnlockedIds(fighter) {
  return [...(fighter.baseSkills || [])];
}

export function resolveLoadout(fighter, unlockedIds) {
  const set = new Set(unlockedIds || starterUnlockedIds(fighter));
  const melee = ['punch', 'kick', 'uppercut', 'dash'].filter((id) => set.has(id) && SKILLS[id]);
  const specials = (fighter.specials || []).filter((id) => set.has(id) && SPECIALS[id]);
  return {
    melee,
    specials,
    hasGuard: set.has('guard'),
    hasFlight: set.has('flight'),
    hasPowerup: set.has('powerup'),
    damageMul: set.has('powerup') ? 1 + (SKILLS.powerup.damageBonus || 0) : 1,
    energyRegenMul: set.has('powerup') ? (SKILLS.powerup.energyRegen || 1) : 1
  };
}
