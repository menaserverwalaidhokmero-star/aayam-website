/**
 * Real Web Audio API synthesizer for AAYAM.
 * Completely self-contained - zero external asset dependencies.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  // Ambient sound nodes
  private isAmbientPlaying: boolean = false;
  private masterAmbientGain: GainNode | null = null;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private chimeTimer: number | null = null;
  private chimeGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isAmbientPlaying) {
      this.stopAmbient();
    }
  }

  // Micro-interaction UI sounds
  public playClick(freq = 600, duration = 0.04) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy catch
    }
  }

  public playBookmarkSound() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0.03, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.3);
      });
    } catch {
      // Audio catch
    }
  }

  public playCelebration() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880];
      const now = this.ctx.currentTime;
      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.05, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.5);
      });
    } catch {
      // Audio catch
    }
  }

  // Ambient sound generator for focus/flow
  public startAmbient(
    droneVol: number = 0.3,
    noiseVol: number = 0.25,
    chimesVol: number = 0.35
  ) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      if (this.isAmbientPlaying) {
        this.stopAmbient();
      }

      this.masterAmbientGain = this.ctx.createGain();
      this.masterAmbientGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.masterAmbientGain.connect(this.ctx.destination);

      // 1. Warm Cosmic Drone (low sine + sub-octave)
      this.droneOsc = this.ctx.createOscillator();
      this.droneGain = this.ctx.createGain();
      this.droneOsc.type = 'sine';
      this.droneOsc.frequency.setValueAtTime(65.41, this.ctx.currentTime); // C2

      // Filter to soften harmonics
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);

      this.droneGain.gain.setValueAtTime(droneVol * 0.4, this.ctx.currentTime);
      this.droneOsc.connect(filter);
      filter.connect(this.droneGain);
      this.droneGain.connect(this.masterAmbientGain);
      this.droneOsc.start();

      // 2. Brown/Pink Noise Buffer (Deep rain / tape warmth)
      const bufferSize = this.ctx.sampleRate * 3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brown noise filter approximation
        lastOut = (lastOut + 0.02 * white) / 1.02;
        data[i] = lastOut * 3.5;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(450, this.ctx.currentTime);

      this.noiseGain = this.ctx.createGain();
      this.noiseGain.gain.setValueAtTime(noiseVol * 0.15, this.ctx.currentTime);

      this.noiseNode.connect(noiseFilter);
      noiseFilter.connect(this.noiseGain);
      this.noiseGain.connect(this.masterAmbientGain);
      this.noiseNode.start();

      // 3. Periodic Celestial Chimes (Random harmonic bells)
      this.chimeGain = this.ctx.createGain();
      this.chimeGain.gain.setValueAtTime(chimesVol * 0.3, this.ctx.currentTime);
      this.chimeGain.connect(this.masterAmbientGain);

      const chimeFrequencies = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25];
      const triggerChime = () => {
        if (!this.ctx || !this.isAmbientPlaying || !this.chimeGain) return;
        const freq = chimeFrequencies[Math.floor(Math.random() * chimeFrequencies.length)];
        const chimeOsc = this.ctx.createOscillator();
        const singleChimeGain = this.ctx.createGain();

        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        singleChimeGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        singleChimeGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.0);

        chimeOsc.connect(singleChimeGain);
        singleChimeGain.connect(this.chimeGain);

        chimeOsc.start();
        chimeOsc.stop(this.ctx.currentTime + 3.0);

        // Schedule next chime randomly between 2.5 and 6 seconds
        const nextTime = Math.random() * 3500 + 2500;
        this.chimeTimer = window.setTimeout(triggerChime, nextTime);
      };

      this.chimeTimer = window.setTimeout(triggerChime, 1500);
      this.isAmbientPlaying = true;
    } catch {
      // Audio catch
    }
  }

  public updateVolumes(droneVol: number, noiseVol: number, chimesVol: number) {
    if (!this.ctx || !this.isAmbientPlaying) return;
    if (this.droneGain) this.droneGain.gain.setTargetAtTime(droneVol * 0.4, this.ctx.currentTime, 0.1);
    if (this.noiseGain) this.noiseGain.gain.setTargetAtTime(noiseVol * 0.15, this.ctx.currentTime, 0.1);
    if (this.chimeGain) this.chimeGain.gain.setTargetAtTime(chimesVol * 0.3, this.ctx.currentTime, 0.1);
  }

  public stopAmbient() {
    try {
      if (this.droneOsc) {
        this.droneOsc.stop();
        this.droneOsc.disconnect();
        this.droneOsc = null;
      }
      if (this.noiseNode) {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
        this.noiseNode = null;
      }
      if (this.chimeTimer) {
        clearTimeout(this.chimeTimer);
        this.chimeTimer = null;
      }
      if (this.masterAmbientGain) {
        this.masterAmbientGain.disconnect();
        this.masterAmbientGain = null;
      }
      this.isAmbientPlaying = false;
    } catch {
      // Audio catch
    }
  }

  public getAmbientPlaying(): boolean {
    return this.isAmbientPlaying;
  }
}

export const soundEngine = new SoundEngine();
