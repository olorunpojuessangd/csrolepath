// Film-style light switch synthesizer — Web Audio API, zero external assets
// Modelled after mechanical wall switch physics: two-phase snap (contact + release)
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playImpulse(ctx: AudioContext, startTime: number, freq: number, gain: number, duration: number) {
  // White noise burst shaped into a sharp transient
  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.12));
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  // Band-pass filter for mechanical click character
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = freq;
  filter.Q.value = 0.8;

  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(gain, startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  noise.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);
  noise.start(startTime);
  noise.stop(startTime + duration + 0.005);
}

export function playSwitchClickSound(toDark: boolean) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Phase 1: The snap/click — sharp transient when switch actuates
    // Going dark = lower "thunk"; going light = higher "snap"
    const clickFreq  = toDark ? 900 : 1400;
    const clickGain  = toDark ? 0.45 : 0.55;
    playImpulse(ctx, now, clickFreq, clickGain, 0.018);

    // Phase 2: Body resonance — the plastic housing vibrates slightly after snap
    const thunkFreq = toDark ? 320 : 480;
    playImpulse(ctx, now + 0.016, thunkFreq, clickGain * 0.4, 0.035);

    // Phase 3: Tiny high-frequency contact ring (film effect detail)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(toDark ? 2800 : 3800, now + 0.01);
    osc.frequency.exponentialRampToValueAtTime(toDark ? 1200 : 1600, now + 0.04);
    oscGain.gain.setValueAtTime(0.06, now + 0.01);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now + 0.01);
    osc.stop(now + 0.065);

  } catch (e) {
    // Graceful fallback if audio is blocked
  }
}
