import { useState, useCallback } from 'react';
import { Copy, Check, Lock, Unlock, RefreshCw, Sliders, Eye } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

interface ColorSwatch {
  id: string;
  hex: string;
  name: string;
  isLocked: boolean;
  contrastWhite: number;
  contrastBlack: number;
}

const PRESET_HARMONIES: { name: string; colors: string[] }[] = [
  {
    name: 'Cosmic Amber & Slate',
    colors: ['#0A0D14', '#1F2937', '#D97706', '#F59E0B', '#FDF8F0']
  },
  {
    name: 'Electric Cyan & Deep Void',
    colors: ['#030712', '#111827', '#0891B2', '#06B6D4', '#E0F2FE']
  },
  {
    name: 'Biomimetic Emerald & Moss',
    colors: ['#061A14', '#132E27', '#059669', '#10B981', '#ECFDF5']
  },
  {
    name: 'Celestial Violet & Starlight',
    colors: ['#0B071A', '#231842', '#7C3AED', '#A78BFA', '#F5F3FF']
  },
  {
    name: 'Solar Terracotta & Travertine',
    colors: ['#1C1917', '#292524', '#B45309', '#F97316', '#FFF7ED']
  }
];

// Helper to calculate relative luminance & contrast ratio
function getLuminance(hex: string): number {
  const rgb = hex.replace('#', '').match(/.{1,2}/g)?.map(x => parseInt(x, 16) / 255) || [0, 0, 0];
  const [r, g, b] = rgb.map(val => (val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrast(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return Number(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
}

function generateRandomHex(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function PaletteSculptor() {
  const [swatches, setSwatches] = useState<ColorSwatch[]>([
    { id: '1', hex: '#090B10', name: 'Obsidian Void', isLocked: false, contrastWhite: 19.5, contrastBlack: 1.1 },
    { id: '2', hex: '#1C2333', name: 'Deep Basalt', isLocked: false, contrastWhite: 14.2, contrastBlack: 1.5 },
    { id: '3', hex: '#B45309', name: 'Raw Amber', isLocked: false, contrastWhite: 4.8, contrastBlack: 4.4 },
    { id: '4', hex: '#F59E0B', name: 'Solar Gold', isLocked: false, contrastWhite: 2.1, contrastBlack: 9.8 },
    { id: '5', hex: '#FAF5EE', name: 'Warm Travertine', isLocked: false, contrastWhite: 1.1, contrastBlack: 18.9 }
  ]);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const toggleLock = (id: string) => {
    soundEngine.playClick(480, 0.03);
    setSwatches(prev =>
      prev.map(s => (s.id === id ? { ...s, isLocked: !s.isLocked } : s))
    );
  };

  const updateSwatchColor = (id: string, newHex: string) => {
    setSwatches(prev =>
      prev.map(s => {
        if (s.id !== id) return s;
        return {
          ...s,
          hex: newHex,
          contrastWhite: getContrast(newHex, '#FFFFFF'),
          contrastBlack: getContrast(newHex, '#000000')
        };
      })
    );
  };

  const applyPreset = (presetColors: string[]) => {
    soundEngine.playClick(650, 0.05);
    setSwatches(prev =>
      prev.map((s, idx) => {
        if (s.isLocked) return s;
        const color = presetColors[idx] || generateRandomHex();
        return {
          ...s,
          hex: color,
          contrastWhite: getContrast(color, '#FFFFFF'),
          contrastBlack: getContrast(color, '#000000')
        };
      })
    );
  };

  const randomizeUnlocked = useCallback(() => {
    soundEngine.playClick(580, 0.04);
    setSwatches(prev =>
      prev.map(s => {
        if (s.isLocked) return s;
        const newColor = generateRandomHex();
        return {
          ...s,
          hex: newColor,
          contrastWhite: getContrast(newColor, '#FFFFFF'),
          contrastBlack: getContrast(newColor, '#000000')
        };
      })
    );
  }, []);

  const copyHex = (hex: string, id: string) => {
    soundEngine.playClick(720, 0.03);
    navigator.clipboard.writeText(hex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const copyCSSExport = () => {
    soundEngine.playCelebration();
    const css = `:root {\n${swatches.map((s, i) => `  --aayam-color-${i + 1}: ${s.hex};`).join('\n')}\n}`;
    navigator.clipboard.writeText(css);
    setExportNotice('CSS Variables copied to clipboard!');
    setTimeout(() => setExportNotice(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Chromatic Harmony Sculptor
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Generate and fine-tune accessible harmonic color ramps with verified WCAG contrast metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={randomizeUnlocked}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generate New</span>
          </button>
          <button
            onClick={copyCSSExport}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-amber-950 dark:text-amber-100 bg-amber-400 hover:bg-amber-300 dark:bg-amber-500/20 dark:hover:bg-amber-500/30 dark:border dark:border-amber-500/30 rounded-lg transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Export CSS</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-lg text-xs font-medium text-amber-900 dark:text-amber-300 flex items-center justify-between transition-all">
          <span>{exportNotice}</span>
          <Check className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        </div>
      )}

      {/* Preset Pills / Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-neutral-500 dark:text-neutral-400 font-medium shrink-0">Harmonies:</span>
        {PRESET_HARMONIES.map(preset => (
          <button
            key={preset.name}
            onClick={() => applyPreset(preset.colors)}
            className="px-3 py-1.5 rounded-md bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-medium border border-neutral-200 dark:border-neutral-800 whitespace-nowrap transition-colors cursor-pointer"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Interactive Swatch Strips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        {swatches.map((swatch, idx) => (
          <div
            key={swatch.id}
            className="group relative flex flex-col rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm transition-all hover:border-neutral-400 dark:hover:border-neutral-700"
          >
            {/* Color block */}
            <div
              className="h-32 sm:h-40 w-full relative flex flex-col justify-between p-3 transition-colors"
              style={{ backgroundColor: swatch.hex }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-mono font-medium px-1.5 py-0.5 rounded backdrop-blur-md"
                  style={{
                    color: swatch.contrastWhite > 4.5 ? '#FFFFFF' : '#000000',
                    backgroundColor: swatch.contrastWhite > 4.5 ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.4)'
                  }}
                >
                  Step {idx + 1}
                </span>

                <button
                  onClick={() => toggleLock(swatch.id)}
                  title={swatch.isLocked ? 'Locked' : 'Unlocked (randomizes)'}
                  className="p-1.5 rounded-md backdrop-blur-md transition-transform hover:scale-110 cursor-pointer"
                  style={{
                    color: swatch.contrastWhite > 4.5 ? '#FFFFFF' : '#000000',
                    backgroundColor: swatch.contrastWhite > 4.5 ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.4)'
                  }}
                >
                  {swatch.isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Direct Hex Copy */}
              <button
                onClick={() => copyHex(swatch.hex, swatch.id)}
                className="self-center flex items-center gap-1.5 px-2.5 py-1 rounded-md backdrop-blur-md opacity-90 group-hover:opacity-100 transition-all hover:scale-105 cursor-pointer"
                style={{
                  color: swatch.contrastWhite > 4.5 ? '#FFFFFF' : '#000000',
                  backgroundColor: swatch.contrastWhite > 4.5 ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.6)'
                }}
              >
                {copiedId === swatch.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span className="text-xs font-mono font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-xs font-mono font-semibold">{swatch.hex}</span>
                  </>
                )}
              </button>
            </div>

            {/* Swatch Controls & Contrast Card */}
            <div className="p-3 space-y-2 bg-neutral-50 dark:bg-neutral-900/90 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate">{swatch.name}</span>
                <input
                  type="color"
                  value={swatch.hex}
                  onChange={e => updateSwatchColor(swatch.id, e.target.value)}
                  className="w-5 h-5 rounded cursor-pointer border-0 p-0 bg-transparent"
                  title="Pick exact hex color"
                />
              </div>

              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                <span>Contrast:</span>
                <div className="flex items-center gap-2 font-mono">
                  <span title="Contrast with white text" className={swatch.contrastWhite >= 4.5 ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''}>
                    W {swatch.contrastWhite}:1
                  </span>
                  <span>·</span>
                  <span title="Contrast with black text" className={swatch.contrastBlack >= 4.5 ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''}>
                    B {swatch.contrastBlack}:1
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Interface Preview with currently sculpted palette */}
      <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          <Eye className="w-3.5 h-3.5" />
          <span>Live Interface Application Preview</span>
        </div>

        <div
          className="p-6 rounded-xl border transition-colors shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            backgroundColor: swatches[0].hex,
            borderColor: swatches[1].hex,
            color: swatches[4].hex
          }}
        >
          <div className="space-y-2 max-w-lg text-center md:text-left">
            <span
              className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded"
              style={{
                backgroundColor: swatches[1].hex,
                color: swatches[3].hex
              }}
            >
              AAYAM System Spec
            </span>
            <h4 className="text-xl font-bold tracking-tight">
              Real-time Harmonic Surface
            </h4>
            <p className="text-sm opacity-80 leading-relaxed">
              Every element in this card dynamically pulls token values from your customized 5-step palette.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => soundEngine.playClick(600, 0.05)}
              className="px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              style={{
                backgroundColor: swatches[3].hex,
                color: swatches[0].hex
              }}
            >
              Primary Action
            </button>
            <button
              onClick={() => soundEngine.playClick(500, 0.04)}
              className="px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide border transition-colors hover:opacity-90 cursor-pointer"
              style={{
                borderColor: swatches[2].hex,
                color: swatches[4].hex,
                backgroundColor: 'transparent'
              }}
            >
              Secondary Contour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
