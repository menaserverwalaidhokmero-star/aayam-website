import { useState } from 'react';
import { Search, Menu, X, Sliders, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export function Header({
  activeSection,
  onNavigate,
  onOpenSearch,
  onOpenSettings,
  theme,
  onToggleTheme,
  soundEnabled,
  onToggleSound
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'discoveries', label: 'Discoveries' },
    { id: 'tools', label: 'Studio Tools' },
    { id: 'deck', label: 'Horizon Deck' },
    { id: 'community', label: 'Community' },
    { id: 'essays', label: 'Essays' }
  ];

  const handleNavClick = (id: string) => {
    soundEngine.playClick(520, 0.03);
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-[#07090E]/80 border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('hero')}
          className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 hover:opacity-85 transition-opacity whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
          <span>AAYAM</span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-neutral-950 dark:text-neutral-50 font-semibold'
                    : 'hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action & utility toggles */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Quick Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              soundEngine.playClick(600, 0.03);
            }}
            title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 rounded-lg transition-colors cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Quick Theme Toggle */}
          <button
            onClick={() => {
              soundEngine.playClick(480, 0.03);
              onToggleTheme();
            }}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 rounded-lg transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Settings / Profile Button */}
          <button
            onClick={() => {
              soundEngine.playClick(500, 0.03);
              onOpenSettings();
            }}
            title="Profile & Settings"
            className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 rounded-lg transition-colors cursor-pointer"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Primary Action Button: Command Palette */}
          <button
            onClick={() => {
              soundEngine.playClick(620, 0.03);
              onOpenSearch();
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800/90 hover:bg-neutral-200 dark:hover:bg-neutral-700/80 rounded-lg border border-neutral-200 dark:border-neutral-700/80 transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
          >
            <Search className="w-3.5 h-3.5 text-neutral-500" />
            <span className="hidden sm:inline">Search Horizon</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-neutral-900 text-neutral-500 rounded border border-neutral-200 dark:border-neutral-700">
              ⌘K
            </kbd>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => {
              soundEngine.playClick(440, 0.03);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-1 bg-white dark:bg-[#07090E] border-b border-neutral-200 dark:border-neutral-800 animate-in slide-in-from-top-2">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === link.id
                  ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-neutral-100 font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 px-3">
            <span>AAYAM Horizon Platform</span>
            <span>v2026.11</span>
          </div>
        </div>
      )}
    </header>
  );
}
