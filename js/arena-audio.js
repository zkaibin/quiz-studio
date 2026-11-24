// Procedural Arena Clash audio — punches, kicks, ki blasts, crowd bed, UI cues.
// Synthesis only (no sample downloads) so SFX stay locked to combat events.

export function createArenaAudio() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) {
    return {
      enabled: false,
      muted: true,
      resume() {},
      setMuted() {},
      toggleMute() { return true; },
      ui() {},
      countdown() {},
      fight() {},
      whoosh() {},
      hit() {},
      block() {},
      jump() {},
      land() {},
      charge() {},
      blast() {},
      ko() {},
      victory() {},
      defeat() {},
      startCrowd() {},
      stopCrowd() {},
      dispose() {}
    };
  }

  let ctx = null;
  let master = null;
  let sfxBus = null;
  let musicBus = null;
  let crowdSrc = null;
  let crowdGain = null;
  let crowdFilter = null;
  let started = false;
  let muted = false;
  let crowdOn = false;

  try {
    muted = localStorage.getItem('arenaClashMuted') === '1';
  } catch { /* ignore */ }

  function noiseBuffer(seconds = 0.35) {
    const length = Math.max(1, Math.floor(ctx.sampleRate * seconds));
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  function ensure() {
    if (started) return;
    ctx = new AudioCtx();
    master = ctx.createGain();
    master.gain.value = muted ? 0 : 0.9;
    master.connect(ctx.destination);

    sfxBus = ctx.createGain();
    sfxBus.gain.value = 0.72;
    sfxBus.connect(master);

    musicBus = ctx.createGain();
    musicBus.gain.value = 0.28;
    musicBus.connect(master);

    started = true;
  }

  function resume() {
    ensure();
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  }

  function setMuted(next) {
    muted = !!next;
    try { localStorage.setItem('arenaClashMuted', muted ? '1' : '0'); } catch { /* ignore */ }
    if (!started) return;
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setTargetAtTime(muted ? 0 : 0.9, now, 0.04);
  }

  function toggleMute() {
    setMuted(!muted);
    return muted;
  }

  function tone({
    freq = 220,
    endFreq = freq,
    dur = 0.12,
    type = 'sine',
    vol = 0.12,
    delay = 0,
    bus = null
  } = {}) {
    if (!started || muted) return;
    const dest = bus || sfxBus;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(Math.max(20, freq), t0);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), t0 + Math.max(0.02, dur));
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0001, vol), t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(dest);
    osc.start(t0);
    osc.stop(t0 + dur + 0.03);
  }

  function noise({
    dur = 0.08,
    vol = 0.1,
    freq = 1200,
    q = 1.1,
    type = 'bandpass',
    delay = 0
  } = {}) {
    if (!started || muted) return;
    const t0 = ctx.currentTime + delay;
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer(Math.max(dur, 0.05));
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = freq;
    filter.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(Math.max(0.0001, vol), t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(filter);
    filter.connect(g);
    g.connect(sfxBus);
    src.start(t0);
    src.stop(t0 + dur + 0.02);
  }

  function ui(kind = 'click') {
    resume();
    if (kind === 'cam') {
      tone({ freq: 520, endFreq: 780, dur: 0.08, type: 'triangle', vol: 0.06 });
      return;
    }
    tone({ freq: 440, endFreq: 620, dur: 0.07, type: 'triangle', vol: 0.05 });
  }

  function countdown(n) {
    resume();
    if (n === 'FIGHT' || n === 'fight') {
      fight();
      return;
    }
    const base = typeof n === 'number' ? 420 + (3 - Math.min(3, n)) * 90 : 520;
    tone({ freq: base, endFreq: base * 1.35, dur: 0.16, type: 'square', vol: 0.09 });
    noise({ dur: 0.05, vol: 0.04, freq: 2200, q: 0.8 });
  }

  function fight() {
    resume();
    tone({ freq: 180, endFreq: 360, dur: 0.22, type: 'sawtooth', vol: 0.1 });
    tone({ freq: 360, endFreq: 720, dur: 0.28, type: 'triangle', vol: 0.08, delay: 0.04 });
    noise({ dur: 0.18, vol: 0.08, freq: 900, q: 0.7 });
  }

  function whoosh(skillId = 'punch') {
    resume();
    if (skillId === 'kick') {
      noise({ dur: 0.14, vol: 0.11, freq: 620, q: 0.9, type: 'bandpass' });
      tone({ freq: 140, endFreq: 70, dur: 0.16, type: 'sine', vol: 0.1 });
      return;
    }
    if (skillId === 'uppercut') {
      noise({ dur: 0.12, vol: 0.09, freq: 1400, q: 1.0 });
      tone({ freq: 160, endFreq: 520, dur: 0.2, type: 'sawtooth', vol: 0.09 });
      return;
    }
    if (skillId === 'dash') {
      noise({ dur: 0.22, vol: 0.12, freq: 480, q: 0.7, type: 'highpass' });
      tone({ freq: 90, endFreq: 210, dur: 0.2, type: 'sine', vol: 0.1 });
      return;
    }
    // Default punch / special start whoosh
    noise({ dur: 0.09, vol: 0.09, freq: 1600, q: 1.15 });
    tone({ freq: 210, endFreq: 90, dur: 0.11, type: 'sine', vol: 0.1 });
  }

  function hit({ heavy = false, special = false } = {}) {
    resume();
    if (special) {
      tone({ freq: 140, endFreq: 48, dur: 0.34, type: 'sine', vol: 0.16 });
      tone({ freq: 420, endFreq: 110, dur: 0.2, type: 'triangle', vol: 0.08, delay: 0.03 });
      noise({ dur: 0.22, vol: 0.14, freq: 900, q: 0.85 });
      return;
    }
    if (heavy) {
      tone({ freq: 150, endFreq: 55, dur: 0.2, type: 'sine', vol: 0.15 });
      noise({ dur: 0.12, vol: 0.13, freq: 700, q: 1.0 });
      return;
    }
    tone({ freq: 240, endFreq: 70, dur: 0.12, type: 'sine', vol: 0.13 });
    noise({ dur: 0.07, vol: 0.11, freq: 1300, q: 1.2 });
  }

  function block() {
    resume();
    tone({ freq: 520, endFreq: 760, dur: 0.1, type: 'triangle', vol: 0.1 });
    noise({ dur: 0.06, vol: 0.07, freq: 2800, q: 1.4 });
  }

  function jump() {
    resume();
    tone({ freq: 180, endFreq: 420, dur: 0.12, type: 'triangle', vol: 0.07 });
    noise({ dur: 0.08, vol: 0.05, freq: 900, q: 0.8 });
  }

  function land() {
    resume();
    noise({ dur: 0.08, vol: 0.07, freq: 320, q: 0.7, type: 'lowpass' });
    tone({ freq: 90, endFreq: 50, dur: 0.09, type: 'sine', vol: 0.06 });
  }

  function charge() {
    resume();
    tone({ freq: 90, endFreq: 240, dur: 0.28, type: 'sawtooth', vol: 0.08 });
    tone({ freq: 180, endFreq: 480, dur: 0.3, type: 'triangle', vol: 0.06, delay: 0.04 });
    noise({ dur: 0.26, vol: 0.05, freq: 1800, q: 0.6, type: 'highpass' });
  }

  function blast() {
    resume();
    tone({ freq: 120, endFreq: 40, dur: 0.36, type: 'sawtooth', vol: 0.12 });
    tone({ freq: 360, endFreq: 90, dur: 0.28, type: 'triangle', vol: 0.08, delay: 0.05 });
    noise({ dur: 0.28, vol: 0.12, freq: 1100, q: 0.75 });
  }

  function ko() {
    resume();
    tone({ freq: 260, endFreq: 70, dur: 0.28, type: 'sawtooth', vol: 0.12 });
    tone({ freq: 140, endFreq: 36, dur: 0.55, type: 'sine', vol: 0.16, delay: 0.1 });
    noise({ dur: 0.32, vol: 0.14, freq: 550, q: 0.7 });
  }

  function victory() {
    resume();
    tone({ freq: 392, endFreq: 523, dur: 0.18, type: 'triangle', vol: 0.09, bus: musicBus });
    tone({ freq: 523, endFreq: 659, dur: 0.2, type: 'triangle', vol: 0.08, delay: 0.14, bus: musicBus });
    tone({ freq: 659, endFreq: 784, dur: 0.28, type: 'triangle', vol: 0.1, delay: 0.3, bus: musicBus });
  }

  function defeat() {
    resume();
    tone({ freq: 330, endFreq: 196, dur: 0.35, type: 'sine', vol: 0.1, bus: musicBus });
    tone({ freq: 196, endFreq: 110, dur: 0.45, type: 'triangle', vol: 0.08, delay: 0.18, bus: musicBus });
  }

  function startCrowd() {
    resume();
    if (crowdOn) return;
    crowdOn = true;
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer(2.4);
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 780;
    filter.Q.value = 0.55;
    const g = ctx.createGain();
    g.gain.value = 0.0001;
    src.connect(filter);
    filter.connect(g);
    g.connect(musicBus);
    src.start();
    const now = ctx.currentTime;
    g.gain.exponentialRampToValueAtTime(0.045, now + 0.8);
    crowdSrc = src;
    crowdGain = g;
    crowdFilter = filter;
  }

  function stopCrowd() {
    if (!crowdOn || !crowdGain || !ctx) {
      crowdOn = false;
      return;
    }
    const now = ctx.currentTime;
    try {
      crowdGain.gain.cancelScheduledValues(now);
      crowdGain.gain.setTargetAtTime(0.0001, now, 0.12);
    } catch { /* ignore */ }
    const src = crowdSrc;
    crowdOn = false;
    crowdSrc = null;
    crowdGain = null;
    crowdFilter = null;
    setTimeout(() => {
      try { src?.stop(); } catch { /* ignore */ }
    }, 500);
  }

  function dispose() {
    stopCrowd();
    try { ctx?.close(); } catch { /* ignore */ }
    ctx = null;
    started = false;
  }

  return {
    enabled: true,
    get muted() { return muted; },
    resume,
    setMuted,
    toggleMute,
    ui,
    countdown,
    fight,
    whoosh,
    hit,
    block,
    jump,
    land,
    charge,
    blast,
    ko,
    victory,
    defeat,
    startCrowd,
    stopCrowd,
    dispose
  };
}
