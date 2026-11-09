import { useState } from 'react';
import { Palette, Sparkles, Volume2 } from 'lucide-react';
import { PaletteSculptor } from './tools/PaletteSculptor';
import { ParticleCanvasStudio } from './tools/ParticleCanvasStudio';
import { SoundscapeStudio } from './tools/SoundscapeStudio';
import { soundEngine } from '../utils/soundEngine';

type ActiveTool = 'palette' | 'canvas' | 'soundscape';

interface ToolsSectionProps {
  onFocusCompleted?: (minutes: number) => void;
}

export function ToolsSection({ onFocusCompleted }: ToolsSectionProps) {
  const [activeTool, setActiveTool] = useState<ActiveTool>('palette');

  const tools = [
    {
      id: 'palette' as ActiveTool,
      name: 'Chromatic Sculptor',
      description: 'Contrast-verified accessible color harmony ramps',
      icon: Palette
    },
    {
      id: 'canvas' as ActiveTool,
      name: 'Generative Particle Canvas',
      description: '60 FPS interactive fluid dynamics & PNG exporter',
      icon: Sparkles
    },
    {
      id: 'soundscape' as ActiveTool,
      name: 'Deep Flow Synthesizer',
      description: 'Native Web Audio acoustic masking & focus timer',
      icon: Volume2
    }
  ];

  const handleSelectTool = (toolId: ActiveTool) => {
    soundEngine.playClick(540, 0.04);
    setActiveTool(toolId);
  };

  return (
    <section id="tools" className="py-16 sm:py-24 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="text-amber-600 dark:text-amber-400 font-semibold uppercase text-[11px] tracking-wide">
                Interactive Instruments
              </span>
              <span aria-hidden="true">·</span>
              <span>Fully Functional Client-Side Engines</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
              AAYAM Creative Studio Tools
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              Production-grade creative instruments for your daily practice. Sculpt harmonic palettes, orchestrate generative fluid particles, and generate custom focus soundscapes.
            </p>
          </div>
        </div>

        {/* Tool Switcher Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {tools.map(tool => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => handleSelectTool(tool.id)}
                className={`flex items-start gap-3.5 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 border-transparent shadow-md'
                    : 'bg-white dark:bg-neutral-900/60 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl ${
                    isActive
                      ? 'bg-amber-400 text-neutral-950 dark:bg-amber-500 dark:text-neutral-950'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold tracking-tight">{tool.name}</h4>
                  <p
                    className={`text-xs leading-relaxed ${
                      isActive ? 'text-neutral-300 dark:text-neutral-700' : 'text-neutral-500 dark:text-neutral-400'
                    }`}
                  >
                    {tool.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Tool Viewport */}
        <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#090B11] shadow-xl">
          {activeTool === 'palette' && <PaletteSculptor />}
          {activeTool === 'canvas' && <ParticleCanvasStudio />}
          {activeTool === 'soundscape' && <SoundscapeStudio onFocusCompleted={onFocusCompleted} />}
        </div>
      </div>
    </section>
  );
}
