import { useState, useEffect, useMemo, useRef } from 'react';
import { Search, Compass, Sparkles, Palette, Volume2, BookOpen, MessageSquare, ArrowRight, X, Command } from 'lucide-react';
import { DiscoveryItem, Article, CommunitySpark } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  discoveries: DiscoveryItem[];
  articles: Article[];
  sparks: CommunitySpark[];
  onSelectDiscovery: (discovery: DiscoveryItem) => void;
  onNavigateSection: (sectionId: string) => void;
  onToggleTheme: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  discoveries,
  articles,
  sparks,
  onSelectDiscovery,
  onNavigateSection,
  onToggleTheme
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Command Palette Items
  const quickActions = [
    { id: 'act-palette', title: 'Open Chromatic Harmony Sculptor', category: 'Tool', icon: Palette, action: () => onNavigateSection('tools') },
    { id: 'act-canvas', title: 'Open Generative Fluid & Particle Studio', category: 'Tool', icon: Sparkles, action: () => onNavigateSection('tools') },
    { id: 'act-soundscape', title: 'Open Deep Flow Ambient Synthesizer', category: 'Tool', icon: Volume2, action: () => onNavigateSection('tools') },
    { id: 'act-deck', title: 'Go to My Horizon Deck (Dashboard)', category: 'Navigation', icon: Compass, action: () => onNavigateSection('deck') },
    { id: 'act-community', title: 'Explore Community Sparks', category: 'Navigation', icon: MessageSquare, action: () => onNavigateSection('community') },
    { id: 'act-theme', title: 'Toggle Light / Dark Cosmic Theme', category: 'Preferences', icon: Sparkles, action: () => onToggleTheme() }
  ];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return quickActions.map(a => ({ ...a, type: 'action' as const }));
    }

    const matchedActions = quickActions
      .filter(a => a.title.toLowerCase().includes(q))
      .map(a => ({ ...a, type: 'action' as const }));

    const matchedDiscoveries = discoveries
      .filter(d => d.title.toLowerCase().includes(q) || d.tags.some(t => t.toLowerCase().includes(q)))
      .slice(0, 4)
      .map(d => ({
        id: d.id,
        title: d.title,
        category: d.category,
        icon: Compass,
        type: 'discovery' as const,
        action: () => {
          onSelectDiscovery(d);
          onNavigateSection('discoveries');
        }
      }));

    const matchedEssays = articles
      .filter(art => art.title.toLowerCase().includes(q) || art.summary.toLowerCase().includes(q))
      .slice(0, 2)
      .map(art => ({
        id: art.id,
        title: art.title,
        category: 'Essay',
        icon: BookOpen,
        type: 'essay' as const,
        action: () => onNavigateSection('essays')
      }));

    return [...matchedActions, ...matchedDiscoveries, ...matchedEssays];
  }, [query, discoveries, articles]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          soundEngine.playClick(550, 0.03);
          onClose(); // triggers toggle in parent
        }
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (results.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % (results.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          soundEngine.playClick(640, 0.04);
          results[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4 bg-neutral-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#0B0D14] rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden animate-in zoom-in-95">
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-neutral-200 dark:border-neutral-800">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, tool, or technological horizon..."
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full px-3 text-sm bg-transparent text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <div className="py-10 text-center text-xs text-neutral-500">
              No matching commands or discoveries found.
            </div>
          ) : (
            results.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundEngine.playClick(600, 0.04);
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-neutral-50'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-700/80 text-neutral-700 dark:text-neutral-200 shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <p className="font-semibold truncate">{item.title}</p>
                      <p className="text-[10px] text-neutral-500">{item.category}</p>
                    </div>
                  </div>

                  <ArrowRight className={`w-3.5 h-3.5 text-neutral-400 shrink-0 ${isSelected ? 'translate-x-1 text-amber-500' : ''} transition-transform`} />
                </button>
              );
            })
          )}
        </div>

        {/* Keyboard footer tip */}
        <div className="px-4 py-2 bg-neutral-50 dark:bg-neutral-900/60 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
          <span>Navigate with <kbd className="px-1 py-0.5 rounded bg-white dark:bg-neutral-800 border">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-white dark:bg-neutral-800 border">↓</kbd></span>
          <span>Press <kbd className="px-1 py-0.5 rounded bg-white dark:bg-neutral-800 border">Enter</kbd> to select · <kbd className="px-1 py-0.5 rounded bg-white dark:bg-neutral-800 border">Esc</kbd> to dismiss</span>
        </div>
      </div>
    </div>
  );
}
