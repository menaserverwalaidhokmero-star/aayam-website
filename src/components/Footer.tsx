import { useState } from 'react';
import { Sparkles, ArrowRight, Check, Heart } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import confetti from 'canvas-confetti';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    soundEngine.playCelebration();
    setSubscribed(true);
    setEmail('');
    try {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.9 },
        colors: ['#F59E0B', '#FBBF24', '#FFFFFF']
      });
    } catch {
      // Confetti catch
    }
  };

  const triggerEasterEgg = () => {
    soundEngine.playCelebration();
    try {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.8 },
        colors: ['#F59E0B', '#10B981', '#38BDF8', '#8B5CF6']
      });
    } catch {
      // Confetti catch
    }
  };

  return (
    <footer className="bg-white dark:bg-[#06080D] border-t border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Top Tier: Wordmark & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
              <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                AAYAM
              </span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-sm">
              The horizon platform for creative intelligence. Bridging breakthrough materials, tactile analog acoustics, and real-time generative creation.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs uppercase tracking-wider">
              The Weekly Horizon Dispatch
            </h4>
            <p className="text-xs text-neutral-500">
              Receive 4 curated technological breakthroughs every Sunday morning. No promotional spam.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-semibold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You are subscribed to the Weekly Horizon Dispatch!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold rounded-xl bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer shrink-0"
                >
                  Join Dispatch
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Tier: Navigation Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-neutral-100 dark:border-neutral-800/80">
          <div className="space-y-2">
            <h5 className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs">AAYAM Radar</h5>
            <ul className="space-y-1.5 text-xs">
              <li><button onClick={() => onNavigate('discoveries')} className="hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer">Spatial Computing</button></li>
              <li><button onClick={() => onNavigate('discoveries')} className="hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer">Biomimetic Design</button></li>
              <li><button onClick={() => onNavigate('discoveries')} className="hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer">Analog Acoustics</button></li>
              <li><button onClick={() => onNavigate('discoveries')} className="hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer">Living Timber</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs">Creative Studio</h5>
            <ul className="space-y-1.5 text-xs">
              <li><button onClick={() => onNavigate('tools')} className="hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer">Chromatic Sculptor</button></li>
              <li><button onClick={() => onNavigate('tools')} className="hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer">Particle Canvas</button></li>
              <li><button onClick={() => onNavigate('tools')} className="hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer">Deep Flow Synthesizer</button></li>
              <li><button onClick={() => onNavigate('deck')} className="hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer">Focus Session Timer</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs">Curator Space</h5>
            <ul className="space-y-1.5 text-xs">
              <li><button onClick={() => onNavigate('deck')} className="hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer">Horizon Deck</button></li>
              <li><button onClick={() => onNavigate('community')} className="hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer">Community Sparks</button></li>
              <li><button onClick={() => onNavigate('essays')} className="hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer">Editorial Philosophy</button></li>
              <li><button onClick={() => onNavigate('deck')} className="hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer">Markdown Exporter</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs">Platform</h5>
            <ul className="space-y-1.5 text-xs">
              <li><span className="text-neutral-500">Edition: 2026.11</span></li>
              <li><span className="text-neutral-500">WCAG AA Compliant</span></li>
              <li><span className="text-neutral-500">Client-Side Persistence</span></li>
              <li>
                <button
                  onClick={triggerEasterEgg}
                  className="flex items-center gap-1 text-amber-500 hover:text-amber-400 cursor-pointer font-medium"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Ignite Starlight</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier: Quiet Copyright */}
        <div className="pt-8 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © 2026 AAYAM Creative Intelligence. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Crafted with mathematical typographic discipline</span>
            <span>·</span>
            <span>Zero Slop</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
