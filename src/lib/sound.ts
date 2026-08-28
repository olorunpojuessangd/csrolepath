// Real light-switch sound — plays /public/light-switch.mp3 (Pixabay, royalty-free)
// Falls back to a synthesized click if audio is blocked or the file fails to load.

let audioCtx: AudioContext | null = null;
let switchBuffer: AudioBuffer | null = null;
let bufferLoadFailed = false;

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

async function loadSwitchBuffer(): Promise<AudioBuffer | null> {
  if (switchBuffer) return switchBuffer;
  if (bufferLoadFailed) return null;

  try {
    const ctx = getAudioContext();
    if (!ctx) return null;

    const response = await fetch('/light-switch.mp3');
    if (!response.ok) throw new Error('fetch failed');

    const arrayBuffer = await response.arrayBuffer();
    switchBuffer = await ctx.decodeAudioData(arrayBuffer);
    return switchBuffer;
  } catch (e) {
    bufferLoadFailed = true;
    return null;
  }
}

// Pre-load on first import so the sound is instant on first click
loadSwitchBuffer();

function playSynthFallback(ctx: AudioContext, toDark: boolean) {
  // Simple transient click fallback
  const bufferSize = Math.floor(ctx.sampleRate * 0.04);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.1));
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = toDark ? 900 : 1400;
  filter.Q.value = 0.8;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.4, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noise.start();
  noise.stop(ctx.currentTime + 0.045);
}

export async function playSwitchClickSound(toDark: boolean) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Try to play the real MP3
    const buffer = await loadSwitchBuffer();
    if (buffer) {
      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Slight gain to normalize volume
      const gain = ctx.createGain();
      gain.gain.value = 0.85;

      source.connect(gain);
      gain.connect(ctx.destination);
      source.start(0);
    } else {
      // Fallback: synthesized click
      playSynthFallback(ctx, toDark);
    }
  } catch (e) {
    // Silently ignore — audio is non-critical
  }
}

export function playClickSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    playSynthFallback(ctx, false);
  } catch (e) {
    // Silently ignore
  }
}

