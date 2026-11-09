import { useState } from 'react';
import { X, Check, Sliders, Moon, Sun, Volume2, VolumeX, RefreshCcw, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onResetData: () => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  onResetData
}: SettingsModalProps) {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playCelebration();
    onUpdateProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const handleThemeChange = (newTheme: 'dark' | 'light') => {
    soundEngine.playClick(500, 0.03);
    setFormData(prev => ({ ...prev, theme: newTheme }));
  };

  const handleAccentChange = (accent: 'amber' | 'cyan' | 'emerald' | 'violet') => {
    soundEngine.playClick(600, 0.03);
    setFormData(prev => ({ ...prev, accentColor: accent }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0B0D14] rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-500" />
            <h3 className="text-xl font-bold text-neutral-950 dark:text-neutral-50">
              Curator Profile & Studio Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {saveSuccess && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-semibold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Profile and preferences updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6 text-xs">
          {/* Identity & Bio */}
          <div className="space-y-4">
            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider text-[11px]">
              01. Identity & Credentials
            </h4>

            <div className="flex items-center gap-4">
              <img
                src={formData.avatarUrl}
                alt={formData.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-2xl object-cover border border-neutral-200 dark:border-neutral-700 shrink-0"
              />
              <div className="flex-1 space-y-2">
                <div>
                  <label className="font-medium text-neutral-600 dark:text-neutral-400">Curator Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full mt-1 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                <div>
                  <label className="font-medium text-neutral-600 dark:text-neutral-400">Handle</label>
                  <input
                    type="text"
                    required
                    value={formData.handle}
                    onChange={e => setFormData({ ...formData, handle: e.target.value })}
                    className="w-full mt-1 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-mono"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="font-medium text-neutral-600 dark:text-neutral-400">Professional Title & Discipline</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full mt-1 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
              />
            </div>

            <div>
              <label className="font-medium text-neutral-600 dark:text-neutral-400">Bio Statement</label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
              />
            </div>
          </div>

          {/* Theme & Aesthetics */}
          <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider text-[11px]">
              02. Aesthetic Environment
            </h4>

            {/* Dark / Light Mode Switch */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">Display Theme</p>
                <p className="text-[11px] text-neutral-500">Toggle between Deep Obsidian Noir and Architectural White</p>
              </div>

              <div className="flex items-center gap-1 bg-neutral-200 dark:bg-neutral-800 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => handleThemeChange('dark')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium cursor-pointer ${
                    formData.theme === 'dark' ? 'bg-neutral-900 text-white shadow-xs' : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleThemeChange('light')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium cursor-pointer ${
                    formData.theme === 'light' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light</span>
                </button>
              </div>
            </div>

            {/* Audio Synthesis Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">Tactile Audio Feedback</p>
                <p className="text-[11px] text-neutral-500">Subtle Web Audio micro-interaction chirps and chimes</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick(600, 0.04);
                  const nextVal = !formData.soundEnabled;
                  setFormData({ ...formData, soundEnabled: nextVal });
                  soundEngine.setMuted(!nextVal);
                }}
                className={`p-2 rounded-lg cursor-pointer ${
                  formData.soundEnabled ? 'bg-amber-400 text-amber-950' : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'
                }`}
              >
                {formData.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Danger Zone / Reset */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all saved bookmarks and tasks to pristine defaults?')) {
                  soundEngine.playClick(400, 0.04);
                  onResetData();
                  onClose();
                }
              }}
              className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 cursor-pointer"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl font-semibold bg-amber-400 hover:bg-amber-300 text-amber-950 cursor-pointer shadow-sm"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
