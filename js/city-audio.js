// Procedural City Driving audio: engine, wind, tires, nitro, impacts and UI beeps.
// All synthesis — no sample downloads — so it stays in sync with live telemetry.

export function createCityAudio() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) {
    return {
      enabled: false,
      muted: true,
      ready: Promise.resolve(),
      resume() {},
      setMuted() {},
      update() {},
      impact() {},
      beep() {},
      go() {},
      dispose() {}
    };
  }

  let ctx = null;
  let master = null;
  let engineGain = null;
  let engineFilter = null;
  let oscA = null;
  let oscB = null;
  let windGain = null;
  let windFilter = null;
  let tireGain = null;
  let tireFilter = null;
  let nitroGain = null;
  let nitroFilter = null;
  let muted = false;
  let started = false;
  let lastRpm = 900;

  try {
    muted = localStorage.getItem('cityDrivingMuted') === '1';
  } catch (error) { /* storage unavailable */ }

  function noiseBuffer(seconds = 2) {
    const length = Math.floor(ctx.sampleRate * seconds);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  function loopNoise(dest, filterType = 'bandpass', freq = 900, q = 0.8) {
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer(2.5);
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = freq;
    filter.Q.value = q;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(dest);
    src.start();
    return { src, filter, gain };
  }

  function ensure() {
    if (started) return;
    ctx = new AudioCtx();
    master = ctx.createGain();
    master.gain.value = muted ? 0 : 0.85;
    master.connect(ctx.destination);

    engineGain = ctx.createGain();
    engineGain.gain.value = 0;
    engineFilter = ctx.createBiquadFilter();
    engineFilter.type = 'lowpass';
    engineFilter.frequency.value = 700;
    engineFilter.Q.value = 0.7;
    oscA = ctx.createOscillator();
    oscB = ctx.createOscillator();
    oscA.type = 'sawtooth';
    oscB.type = 'square';
    oscA.frequency.value = 55;
    oscB.frequency.value = 82;
    const detune = ctx.createGain();
    detune.gain.value = 0.45;
    oscA.connect(engineFilter);
    oscB.connect(detune);
    detune.connect(engineFilter);
    engineFilter.connect(engineGain);
    engineGain.connect(master);
    oscA.start();
    oscB.start();

    const wind = loopNoise(master, 'lowpass', 420, 0.5);
    windGain = wind.gain;
    windFilter = wind.filter;

    const tire = loopNoise(master, 'bandpass', 1400, 1.2);
    tireGain = tire.gain;
    tireFilter = tire.filter;

    const nitro = loopNoise(master, 'highpass', 900, 0.6);
    nitroGain = nitro.gain;
    nitroFilter = nitro.filter;

    started = true;
  }

  function resume() {
    ensure();
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  }

  function setMuted(next) {
    muted = !!next;
    try { localStorage.setItem('cityDrivingMuted', muted ? '1' : '0'); } catch (error) { /* storage unavailable */ }
    if (!started) return;
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setTargetAtTime(muted ? 0 : 0.85, now, 0.05);
  }

  function tone(freq, duration, type = 'sine', volume = 0.12, slide = 0) {
    if (!started || muted) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), now + duration);
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  function beep(kind = 'tick') {
    resume();
    if (kind === 'go') {
      tone(660, 0.22, 'triangle', 0.14, 220);
      return;
    }
    tone(kind === 'final' ? 520 : 380, 0.12, 'square', 0.1);
  }

  function go() {
    beep('go');
  }

  function impact(strength = 0.5) {
    resume();
    if (!started || muted) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90 + strength * 40, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.28);
    filter.type = 'lowpass';
    filter.frequency.value = 280;
    gain.gain.setValueAtTime(Math.min(0.35, 0.08 + strength * 0.28), now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + 0.35);

    const burst = ctx.createBufferSource();
    burst.buffer = noiseBuffer(0.2);
    const bg = ctx.createGain();
    const bf = ctx.createBiquadFilter();
    bf.type = 'bandpass';
    bf.frequency.value = 500;
    bg.gain.setValueAtTime(Math.min(0.22, 0.05 + strength * 0.2), now);
    bg.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    burst.connect(bf);
    bf.connect(bg);
    bg.connect(master);
    burst.start(now);
    burst.stop(now + 0.2);
  }

  function update({
    active = false,
    speed = 0,
    top = 45,
    throttle = false,
    braking = false,
    steer = 0,
    nitro = 0,
    flying = false,
    idle = false
  } = {}) {
    if (!started) return;
    const now = ctx.currentTime;
    if (!active || muted) {
      engineGain.gain.setTargetAtTime(0, now, 0.08);
      windGain.gain.setTargetAtTime(0, now, 0.1);
      tireGain.gain.setTargetAtTime(0, now, 0.08);
      nitroGain.gain.setTargetAtTime(0, now, 0.08);
      return;
    }

    const absSpeed = Math.abs(speed);
    const ratio = Math.min(1, absSpeed / Math.max(8, top));
    const gear = Math.max(1, Math.min(6, Math.floor(absSpeed / 9) + 1));
    const gearSpan = absSpeed - (gear - 1) * 9;
    const rpm = idle && absSpeed < 0.4
      ? 900 + Math.sin(now * 6) * 40
      : 900 + gear * 420 + gearSpan * 55 + (throttle ? 280 : 0);
    lastRpm = lastRpm * 0.85 + rpm * 0.15;
    const freq = 42 + lastRpm * 0.028;
    oscA.frequency.setTargetAtTime(freq, now, 0.05);
    oscB.frequency.setTargetAtTime(freq * 1.48, now, 0.05);
    engineFilter.frequency.setTargetAtTime(480 + ratio * 2200 + (throttle ? 500 : 0), now, 0.08);
    const engineVol = idle && absSpeed < 0.35
      ? 0.035
      : 0.04 + ratio * 0.09 + (throttle ? 0.04 : 0);
    engineGain.gain.setTargetAtTime(engineVol * (flying ? 0.75 : 1), now, 0.06);

    windFilter.frequency.setTargetAtTime(280 + ratio * 900, now, 0.1);
    windGain.gain.setTargetAtTime(ratio * ratio * 0.07 + (flying ? 0.04 : 0), now, 0.1);

    const slip = Math.min(1, Math.abs(steer) * (absSpeed / 18) + (braking && absSpeed > 8 ? 0.55 : 0));
    tireFilter.frequency.setTargetAtTime(900 + slip * 1600, now, 0.05);
    tireGain.gain.setTargetAtTime(slip > 0.12 ? slip * 0.09 : 0, now, 0.05);

    nitroFilter.frequency.setTargetAtTime(700 + nitro * 2400, now, 0.05);
    nitroGain.gain.setTargetAtTime(nitro * 0.12, now, 0.05);
  }

  function dispose() {
    if (!started) return;
    try { ctx.close(); } catch (error) { /* already closed */ }
    started = false;
  }

  return {
    enabled: true,
    get muted() { return muted; },
    ready: Promise.resolve(),
    resume,
    setMuted,
    update,
    impact,
    beep,
    go,
    dispose
  };
}
