import { ArrowRight, Sparkles, Compass, Play, Volume2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface HeroSectionProps {
  onExploreDiscoveries: () => void;
  onOpenStudioTools: () => void;
}

export function HeroSection({ onExploreDiscoveries, onOpenStudioTools }: HeroSectionProps) {
  const handlePrimaryClick = () => {
    soundEngine.playClick(640, 0.05);
    onExploreDiscoveries();
  };

  const handleSecondaryClick = () => {
    soundEngine.playClick(520, 0.04);
    onOpenStudioTools();
  };

  const playAmbientSample = () => {
    soundEngine.playBookmarkSound();
    soundEngine.startAmbient(0.3, 0.2, 0.4);
    setTimeout(() => {
      soundEngine.stopAmbient();
    }, 4500);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-neutral-200 dark:border-neutral-800">
      {/* Subtle ambient light gradient background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 dark:bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Proposition and Call to Action */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-7">
            {/* Editorial kicker (clean unboxed text, no pill) */}
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              <span className="text-amber-600 dark:text-amber-400 font-semibold tracking-wide uppercase text-[11px]">
                AAYAM Curation & Studio
              </span>
              <span aria-hidden="true">·</span>
              <span>Volume 04</span>
              <span aria-hidden="true">·</span>
              <span>Updated Daily</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50 leading-[1.08] max-w-2xl">
              AAYAM — Where creative minds scout the technological horizon.
            </h1>

            {/* Value Proposition Body */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
              AAYAM brings together breakthrough spatial research, biomimetic architecture, and tactile acoustic instruments with real-time generative creation tools for visionary thinkers.
            </p>

            {/* CTAs & Interactive Quick Trigger */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={handlePrimaryClick}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 dark:bg-amber-400 dark:hover:bg-amber-300 shadow-md shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Curated Discoveries</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleSecondaryClick}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium text-neutral-800 dark:text-neutral-200 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Launch Studio Tools</span>
              </button>
            </div>

            {/* Micro proof line */}
            <div className="flex items-center gap-6 pt-3 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-900 dark:text-neutral-200">100% Real Handlers</span>
                <span aria-hidden="true">·</span>
                <span>Zero Mock Stubs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-900 dark:text-neutral-200">Local Persistence</span>
                <span aria-hidden="true">·</span>
                <span>Web Audio Synthesis</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Marquee Hero Visual */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 shadow-2xl group">
              <img
                src="/src/assets/images/hero_horizon_creative_1794213485146.jpg"
                alt="The Horizon Pavilion architecture at twilight"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 lg:h-full min-h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent pointer-events-none" />

              {/* In-Frame Context Floating Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl backdrop-blur-md bg-neutral-950/75 border border-white/10 text-white space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-amber-400">Featured Horizon Work</span>
                  <span className="text-neutral-400 font-mono text-[11px]">Arch 2026.11</span>
                </div>
                <h4 className="text-sm font-semibold tracking-tight text-white line-clamp-1">
                  The Horizon Pavilion: Monolithic Continuous Curves
                </h4>
                <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                  Structural laminated glass ribbons replacing steel columns with continuous coastal views.
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>AAYAM Architectural Research</span>
                  <button
                    onClick={playAmbientSample}
                    className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Sample Soundscape</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-column KPI & Horizon Signals Strip below the hero split */}
        <div className="mt-14 pt-8 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-neutral-950 dark:text-neutral-50">
              1,420+
            </p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Curated Design Signals</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-neutral-950 dark:text-neutral-50">
              60 FPS
            </p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Fluid Physics Canvas</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-neutral-950 dark:text-neutral-50">
              WCAG AAA
            </p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Harmonic Contrast Engine</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-neutral-950 dark:text-neutral-50">
              4.8 kHz
            </p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Acoustic Masking Synthesizer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
