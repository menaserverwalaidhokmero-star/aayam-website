import { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Clock, Sparkles, Waves, RotateCcw } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

interface Preset {
  name: string;
  drone: number;
  noise: number;
  chimes: number;
}

const PRESETS: Preset[] = [
  { name: 'Deep Cosmic Void', drone: 0.6, noise: 0.2, chimes: 0.2 },
  { name: 'Acoustic Rainfall', drone: 0.2, noise: 0.7, chimes: 0.1 },
  { name: 'Celestial Temple', drone: 0.4, noise: 0.15, chimes: 0.65 },
  { name: 'Minimal Flow', drone: 0.35, noise: 0.3, chimes: 0.2 }
];

export function SoundscapeStudio({ onFocusCompleted }: { onFocusCompleted?: (minutes: number) => void }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [droneVolume, setDroneVolume] = useState<number>(0.4);
  const [noiseVolume, setNoiseVolume] = useState<number>(0.3);
  const [chimesVolume, setChimesVolume] = useState<number>(0.35);

  // Focus Timer state
  const [timerDuration, setTimerDuration] = useState<number>(25 * 60); // 25 mins in seconds
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);

  // Sync volumes to Web Audio engine
  useEffect(() => {
    if (isPlaying) {
      soundEngine.updateVolumes(droneVolume, noiseVolume, chimesVolume);
    }
  }, [droneVolume, noiseVolume, chimesVolume, isPlaying]);

  // Handle master toggle
  const toggleMaster = () => {
    soundEngine.playClick(500, 0.04);
    if (isPlaying) {
      soundEngine.stopAmbient();
      setIsPlaying(false);
    } else {
      soundEngine.startAmbient(droneVolume, noiseVolume, chimesVolume);
      setIsPlaying(true);
    }
  };

  // Preset selector
  const applyPreset = (preset: Preset) => {
    soundEngine.playClick(600, 0.04);
    setDroneVolume(preset.drone);
    setNoiseVolume(preset.noise);
    setChimesVolume(preset.chimes);
    if (!isPlaying) {
      soundEngine.startAmbient(preset.drone, preset.noise, preset.chimes);
      setIsPlaying(true);
    } else {
      soundEngine.updateVolumes(preset.drone, preset.noise, preset.chimes);
    }
  };

  // Timer interval countdown
  useEffect(() => {
    let interval: number | null = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      soundEngine.playCelebration();
      setSessionCompleted(true);
      const minutesSpent = Math.round(timerDuration / 60);
      if (onFocusCompleted) {
        onFocusCompleted(minutesSpent);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft, timerDuration, onFocusCompleted]);

  const selectTimerPreset = (minutes: number) => {
    soundEngine.playClick(440, 0.03);
    const secs = minutes * 60;
    setTimerDuration(secs);
    setTimeLeft(secs);
    setIsTimerRunning(false);
    setSessionCompleted(false);
  };

  const toggleTimer = () => {
    soundEngine.playClick(520, 0.04);
    if (!isTimerRunning && !isPlaying) {
      // Auto start ambient audio when timer starts
      soundEngine.startAmbient(droneVolume, noiseVolume, chimesVolume);
      setIsPlaying(true);
    }
    setIsTimerRunning(!isTimerRunning);
    setSessionCompleted(false);
  };

  const resetTimer = () => {
    soundEngine.playClick(400, 0.03);
    setIsTimerRunning(false);
    setTimeLeft(timerDuration);
    setSessionCompleted(false);
  };

  // Format time MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <span>Deep Flow Ambient Synthesizer</span>
            <span className="text-xs font-mono font-normal text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              Web Audio Synthesis
            </span>
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Real-time generative soundscapes engineered for prolonged cognitive clarity and acoustic masking.
          </p>
        </div>

        <button
          onClick={toggleMaster}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-sm ${
            isPlaying
              ? 'bg-amber-400 text-amber-950 dark:bg-amber-500 dark:text-neutral-950 hover:bg-amber-300'
              : 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800'
          }`}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isPlaying ? 'Pause Soundscape' : 'Start Soundscape'}</span>
        </button>
      </div>

      {/* Preset tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-neutral-500 dark:text-neutral-400 font-medium shrink-0">Soundscapes:</span>
        {PRESETS.map(preset => (
          <button
            key={preset.name}
            onClick={() => applyPreset(preset)}
            className="px-3 py-1.5 rounded-md bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-medium border border-neutral-200 dark:border-neutral-800 whitespace-nowrap transition-colors cursor-pointer"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Dual Column Layout: Sound Mixers + Focus Timer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: 3 Channel Mixer */}
        <div className="lg:col-span-2 space-y-4 bg-neutral-50 dark:bg-neutral-900/60 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
              <Waves className="w-3.5 h-3.5 text-amber-500" />
              <span>Multi-Layer Acoustic Console</span>
            </span>
            <div className="flex items-center gap-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isPlaying ? 'bg-amber-500' : 'bg-neutral-300 dark:bg-neutral-700'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.sin(i * 1.2 + Date.now() * 0.003) * 10 + 14}px` : '4px'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Layer 1: Sub-Drone */}
          <div className="space-y-2 p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">01. Cosmic Sub-Drone (65 Hz)</p>
                <p className="text-[11px] text-neutral-500">Low-frequency grounded sine wave with 140Hz harmonic damping</p>
              </div>
              <span className="font-mono text-neutral-700 dark:text-neutral-300 font-semibold">{Math.round(droneVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={droneVolume}
              onChange={e => setDroneVolume(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Layer 2: Brown Rain */}
          <div className="space-y-2 p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">02. Warm Brown Rain Noise</p>
                <p className="text-[11px] text-neutral-500">Continuous filtered Brownian noise masking external speech frequencies</p>
              </div>
              <span className="font-mono text-neutral-700 dark:text-neutral-300 font-semibold">{Math.round(noiseVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={noiseVolume}
              onChange={e => setNoiseVolume(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Layer 3: Celestial Chimes */}
          <div className="space-y-2 p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">03. Celestial Pentatonic Chimes</p>
                <p className="text-[11px] text-neutral-500">Harmonic bell intervals striking periodically with 3-second reverberation</p>
              </div>
              <span className="font-mono text-neutral-700 dark:text-neutral-300 font-semibold">{Math.round(chimesVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={chimesVolume}
              onChange={e => setChimesVolume(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Right Col: Deep Focus Session Timer */}
        <div className="bg-neutral-50 dark:bg-neutral-900/60 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Focus Session</span>
              </span>
              {isTimerRunning && (
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold animate-pulse">
                  Session Active
                </span>
              )}
            </div>

            {/* Timer Presets */}
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {[15, 25, 45].map(mins => (
                <button
                  key={mins}
                  onClick={() => selectTimerPreset(mins)}
                  className={`py-1.5 rounded-lg font-medium transition-colors cursor-pointer border ${
                    timerDuration === mins * 60
                      ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 border-transparent'
                      : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                  }`}
                >
                  {mins} min
                </button>
              ))}
            </div>

            {/* Time Display */}
            <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center space-y-1">
              <span className="text-4xl sm:text-5xl font-mono font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                {formatTime(timeLeft)}
              </span>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {sessionCompleted ? 'Session Complete! Great focus.' : 'Dedicated Uninterrupted Window'}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTimer}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isTimerRunning ? 'Pause Session' : 'Start Focus Window'}</span>
            </button>
            <button
              onClick={resetTimer}
              title="Reset Timer"
              className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
