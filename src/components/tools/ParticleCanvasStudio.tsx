import { useEffect, useRef, useState, useCallback } from 'react';
import { Download, Play, Pause, RefreshCw, Zap, Wind, Orbit, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseColor: string;
  alpha: number;
}

type ColorTheme = 'solar' | 'nebula' | 'emerald' | 'monochrome';
type InteractionMode = 'attract' | 'repel' | 'vortex';

export function ParticleCanvasStudio() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [particleCount, setParticleCount] = useState<number>(180);
  const [flowSpeed, setFlowSpeed] = useState<number>(1.2);
  const [colorTheme, setColorTheme] = useState<ColorTheme>('solar');
  const [interactionMode, setInteractionMode] = useState<InteractionMode>('attract');
  const [showLinks, setShowLinks] = useState<boolean>(true);
  const [snapshotSuccess, setSnapshotSuccess] = useState<boolean>(false);

  const mouseRef = useRef<{ x: number; y: number; isDown: boolean; isIn: boolean }>({
    x: 0,
    y: 0,
    isDown: false,
    isIn: false
  });

  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const getThemePalette = useCallback((theme: ColorTheme): string[] => {
    switch (theme) {
      case 'solar':
        return ['#F59E0B', '#D97706', '#FB923C', '#FDE047', '#EA580C'];
      case 'nebula':
        return ['#8B5CF6', '#A855F7', '#38BDF8', '#818CF8', '#C084FC'];
      case 'emerald':
        return ['#10B981', '#059669', '#34D399', '#6EE7B7', '#047857'];
      case 'monochrome':
        return ['#FFFFFF', '#E2E8F0', '#94A3B8', '#CBD5E1', '#F8FAFC'];
    }
  }, []);

  const initParticles = useCallback(
    (width: number, height: number) => {
      const colors = getThemePalette(colorTheme);
      const newParticles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * flowSpeed,
          vy: (Math.random() - 0.5) * flowSpeed,
          radius: Math.random() * 2.5 + 1.2,
          baseColor: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.6 + 0.3
        });
      }
      particlesRef.current = newParticles;
    },
    [particleCount, flowSpeed, colorTheme, getThemePalette]
  );

  // Resize canvas according to container
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvasRef.current.width = rect.width * dpr;
      canvasRef.current.height = 420 * dpr;
      canvasRef.current.style.width = `${rect.width}px`;
      canvasRef.current.style.height = `420px`;

      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      initParticles(rect.width, 420);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initParticles]);

  // Main animation loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      if (!isPlaying) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = containerRef.current?.getBoundingClientRect() || { width: 800, height: 420 };
      const width = rect.width;
      const height = 420;

      // Soft trail fade
      ctx.fillStyle = 'rgba(10, 12, 18, 0.22)';
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update and render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Interaction forces with mouse / finger
        if (mouse.isIn) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = mouse.isDown ? 260 : 160;

          if (dist < maxDist && dist > 1) {
            const force = (1 - dist / maxDist) * 0.4;
            if (interactionMode === 'attract') {
              p.vx += (dx / dist) * force * (mouse.isDown ? 2 : 1);
              p.vy += (dy / dist) * force * (mouse.isDown ? 2 : 1);
            } else if (interactionMode === 'repel') {
              p.vx -= (dx / dist) * force * 1.5;
              p.vy -= (dy / dist) * force * 1.5;
            } else if (interactionMode === 'vortex') {
              // Perpendicular tangential force
              p.vx += (-dy / dist) * force * 1.8;
              p.vy += (dx / dist) * force * 1.8;
            }
          }
        }

        // Apply velocities with damping
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Baseline gentle Brownian drift
        p.x += p.vx + (Math.sin(currentTime * 0.001 + i) * 0.2 * flowSpeed);
        p.y += p.vy + (Math.cos(currentTime * 0.001 + i) * 0.2 * flowSpeed);

        // Boundary wrapping
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.baseColor;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // Constellation connecting lines
      if (showLinks) {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 65) {
              const alpha = (1 - dist / 65) * 0.25;
              ctx.strokeStyle = p1.baseColor;
              ctx.globalAlpha = alpha;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
              ctx.globalAlpha = 1.0;
            }
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(loop);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, flowSpeed, interactionMode, showLinks]);

  // Mouse / Touch event bindings
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
    mouseRef.current.isIn = true;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseRef.current.x = e.touches[0].clientX - rect.left;
      mouseRef.current.y = e.touches[0].clientY - rect.top;
      mouseRef.current.isIn = true;
    }
  };

  const downloadSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    soundEngine.playCelebration();
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `aayam-generative-canvas-${Date.now()}.png`;
    a.click();
    setSnapshotSuccess(true);
    setTimeout(() => setSnapshotSuccess(false), 2500);
  };

  return (
    <div className="space-y-5" ref={containerRef}>
      {/* Header & Controls bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <span>Generative Fluid & Particle Studio</span>
            <span className="text-xs font-mono font-normal text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              Interactive 60 FPS
            </span>
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Sculpt physical particle fields in real-time. Drag across the canvas or adjust turbulence and force vectors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundEngine.playClick(440, 0.04);
              setIsPlaying(!isPlaying);
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Freeze' : 'Resume'}</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick(600, 0.04);
              if (containerRef.current) {
                initParticles(containerRef.current.clientWidth, 420);
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={downloadSnapshot}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-amber-950 dark:text-amber-100 bg-amber-400 hover:bg-amber-300 dark:bg-amber-500/20 dark:hover:bg-amber-500/30 dark:border dark:border-amber-500/30 rounded-lg transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{snapshotSuccess ? 'Saved Image!' : 'Snapshot PNG'}</span>
          </button>
        </div>
      </div>

      {/* Control Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-neutral-50 dark:bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800">
        {/* Color Theme Selector */}
        <div className="space-y-1.5">
          <label className="text-neutral-500 dark:text-neutral-400 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Atmosphere</span>
          </label>
          <div className="flex items-center gap-1">
            {(['solar', 'nebula', 'emerald', 'monochrome'] as ColorTheme[]).map(theme => (
              <button
                key={theme}
                onClick={() => {
                  soundEngine.playClick(500, 0.03);
                  setColorTheme(theme);
                }}
                className={`px-2 py-1 rounded text-[11px] font-medium capitalize transition-all cursor-pointer ${
                  colorTheme === theme
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* Force Mode Selector */}
        <div className="space-y-1.5">
          <label className="text-neutral-500 dark:text-neutral-400 font-medium flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500" />
            <span>Force Mode</span>
          </label>
          <div className="flex items-center gap-1">
            {(['attract', 'repel', 'vortex'] as InteractionMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => {
                  soundEngine.playClick(550, 0.03);
                  setInteractionMode(mode);
                }}
                className={`px-2 py-1 rounded text-[11px] font-medium capitalize transition-all cursor-pointer ${
                  interactionMode === mode
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Particle Count Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-neutral-500 dark:text-neutral-400 font-medium">
            <span className="flex items-center gap-1">
              <Orbit className="w-3 h-3 text-amber-500" />
              <span>Density</span>
            </span>
            <span className="font-mono">{particleCount}</span>
          </div>
          <input
            type="range"
            min={60}
            max={320}
            step={20}
            value={particleCount}
            onChange={e => setParticleCount(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Flow Speed & Constellations Toggle */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-neutral-500 dark:text-neutral-400 font-medium">
            <span className="flex items-center gap-1">
              <Wind className="w-3 h-3 text-amber-500" />
              <span>Velocity ({flowSpeed}x)</span>
            </span>
            <button
              onClick={() => {
                soundEngine.playClick(400, 0.03);
                setShowLinks(!showLinks);
              }}
              className={`text-[11px] px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                showLinks ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-neutral-400'
              }`}
            >
              {showLinks ? 'Links ON' : 'Links OFF'}
            </button>
          </div>
          <input
            type="range"
            min={0.4}
            max={2.5}
            step={0.1}
            value={flowSpeed}
            onChange={e => setFlowSpeed(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>
      </div>

      {/* The Interactive Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-[#0A0C12] shadow-xl group">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => {
            mouseRef.current.isIn = true;
          }}
          onMouseLeave={() => {
            mouseRef.current.isIn = false;
            mouseRef.current.isDown = false;
          }}
          onMouseDown={() => {
            mouseRef.current.isDown = true;
            soundEngine.playClick(700, 0.05);
          }}
          onMouseUp={() => {
            mouseRef.current.isDown = false;
          }}
          onTouchStart={handleTouchMove}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => {
            mouseRef.current.isIn = false;
          }}
          className="w-full h-[420px] cursor-crosshair block"
        />

        {/* Canvas HUD hint */}
        <div className="absolute bottom-3 left-3 text-[11px] text-neutral-400/80 bg-neutral-900/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 pointer-events-none flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>Move cursor or touch screen to steer fluid particle vectors</span>
        </div>
      </div>
    </div>
  );
}
