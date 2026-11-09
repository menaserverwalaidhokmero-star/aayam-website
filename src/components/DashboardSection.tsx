import { useState } from 'react';
import { Bookmark, CheckCircle2, Circle, Trash2, Plus, Download, Clock, Sparkles, Folder, ArrowRight } from 'lucide-react';
import { DiscoveryItem, ProjectTask, UserProfile } from '../types';
import { soundEngine } from '../utils/soundEngine';
import confetti from 'canvas-confetti';

interface DashboardSectionProps {
  userProfile: UserProfile;
  savedDiscoveries: DiscoveryItem[];
  tasks: ProjectTask[];
  onToggleBookmark: (id: string) => void;
  onToggleTask: (taskId: string) => void;
  onAddTask: (task: Omit<ProjectTask, 'id' | 'createdAt'>) => void;
  onDeleteTask: (taskId: string) => void;
  focusMinutes: number;
}

export function DashboardSection({
  userProfile,
  savedDiscoveries,
  tasks,
  onToggleBookmark,
  onToggleTask,
  onAddTask,
  onDeleteTask,
  focusMinutes
}: DashboardSectionProps) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Design System');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const completedTasksCount = tasks.filter(t => t.completed).length;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    soundEngine.playClick(620, 0.04);
    onAddTask({
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      completed: false,
      priority: newTaskPriority
    });
    setNewTaskTitle('');
    setIsAddingTask(false);
  };

  const handleTaskCheck = (taskId: string, wasCompleted: boolean) => {
    if (!wasCompleted) {
      soundEngine.playCelebration();
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#F59E0B', '#10B981', '#38BDF8']
        });
      } catch {
        // Confetti fallback
      }
    } else {
      soundEngine.playClick(440, 0.03);
    }
    onToggleTask(taskId);
  };

  const exportDeck = () => {
    soundEngine.playCelebration();
    const markdown = `# AAYAM Horizon Deck Export
Curator: ${userProfile.name} (${userProfile.handle})
Generated: ${new Date().toLocaleDateString()}
Focus Log: ${focusMinutes} minutes

## Saved Horizon Discoveries (${savedDiscoveries.length})
${savedDiscoveries.map(d => `- **${d.title}** (${d.category})\n  *${d.subtitle}*\n  URL: ${window.location.origin}/#discoveries`).join('\n\n')}

## Creative Action Items (${tasks.length})
${tasks.map(t => `- [${t.completed ? 'x' : ' '}] (${t.priority.toUpperCase()}) ${t.title} [${t.category}]`).join('\n')}
`;

    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aayam-horizon-deck-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);

    setExportNotice('Deck exported as Markdown file!');
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <section id="deck" className="py-16 sm:py-24 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="text-amber-600 dark:text-amber-400 font-semibold uppercase text-[11px] tracking-wide">
                Personalized Workspace
              </span>
              <span aria-hidden="true">·</span>
              <span>Curator Dashboard</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
              My Horizon Deck
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              Your private command station. Track saved architectural discoveries, manage project tasks, and log deep focus hours.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportDeck}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 rounded-xl transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-500" />
              <span>Export Deck (MD)</span>
            </button>
          </div>
        </div>

        {exportNotice && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-medium text-emerald-900 dark:text-emerald-300">
            {exportNotice}
          </div>
        )}

        {/* Dashboard 4-KPI Strip with Tabular Figures */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-500 text-xs">
              <span>Saved Discoveries</span>
              <Bookmark className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-3xl font-bold font-mono tracking-tight text-neutral-950 dark:text-neutral-50">
              {savedDiscoveries.length}
            </p>
            <p className="text-[11px] text-neutral-500">Bookmarked signals</p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-500 text-xs">
              <span>Action Items</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-bold font-mono tracking-tight text-neutral-950 dark:text-neutral-50">
              {completedTasksCount} / {tasks.length}
            </p>
            <p className="text-[11px] text-neutral-500">Tasks completed</p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-500 text-xs">
              <span>Deep Flow Masking</span>
              <Clock className="w-4 h-4 text-sky-500" />
            </div>
            <p className="text-3xl font-bold font-mono tracking-tight text-neutral-950 dark:text-neutral-50">
              {focusMinutes}m
            </p>
            <p className="text-[11px] text-neutral-500">Synthesizer focus time</p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-500 text-xs">
              <span>Horizon Status</span>
              <Sparkles className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-lg font-bold tracking-tight text-neutral-950 dark:text-neutral-50 pt-1">
              Active Curator
            </p>
            <p className="text-[11px] text-neutral-500">All systems synchronized</p>
          </div>
        </div>

        {/* Dual Panel: Saved Discoveries (Left) + Project Action Items (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Saved Signals (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-500" />
                <span>Saved Horizon Signals</span>
              </h3>
              <span className="text-xs font-mono text-neutral-500">{savedDiscoveries.length} saved</span>
            </div>

            {savedDiscoveries.length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30 space-y-2">
                <Bookmark className="w-6 h-6 text-neutral-400 mx-auto" />
                <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">No saved discoveries yet</p>
                <p className="text-[11px] text-neutral-500">
                  Tap the bookmark icon on any discovery card in the horizon feed to pin it here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedDiscoveries.map(item => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0B0D14] flex items-center justify-between gap-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-lg object-cover shrink-0 bg-neutral-900"
                      />
                      <div className="min-w-0 space-y-0.5">
                        <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-wide">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                          <span>{item.author}</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.readTime}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        soundEngine.playClick(400, 0.03);
                        onToggleBookmark(item.id);
                      }}
                      title="Remove from saved"
                      className="p-2 text-neutral-400 hover:text-rose-500 transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Project Tasks / Milestones (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <Folder className="w-4 h-4 text-emerald-500" />
                <span>Creative Milestones & Queue</span>
              </h3>

              <button
                onClick={() => {
                  soundEngine.playClick(500, 0.03);
                  setIsAddingTask(!isAddingTask);
                }}
                className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAddingTask ? 'Cancel' : 'Add Item'}</span>
              </button>
            </div>

            {/* Add Task Form */}
            {isAddingTask && (
              <form onSubmit={handleCreateTask} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/80 space-y-3">
                <input
                  type="text"
                  placeholder="Task title or research question..."
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  autoFocus
                />
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <select
                    value={newTaskCategory}
                    onChange={e => setNewTaskCategory(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none"
                  >
                    <option value="Design System">Design System</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Acoustics">Acoustics</option>
                    <option value="Generative Art">Generative Art</option>
                    <option value="Curation">Curation</option>
                  </select>

                  <select
                    value={newTaskPriority}
                    onChange={e => setNewTaskPriority(e.target.value as any)}
                    className="px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 text-amber-950 transition-colors cursor-pointer"
                  >
                    Save Milestone
                  </button>
                </div>
              </form>
            )}

            {/* Task list */}
            <div className="space-y-2">
              {tasks.map(task => (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    task.completed
                      ? 'bg-neutral-50 dark:bg-neutral-900/30 border-neutral-200 dark:border-neutral-800/50 opacity-60'
                      : 'bg-white dark:bg-[#0B0D14] border-neutral-200 dark:border-neutral-800'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={() => handleTaskCheck(task.id, task.completed)}
                      className="cursor-pointer shrink-0 text-neutral-400 hover:text-emerald-500 transition-colors"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <p
                        className={`text-xs font-medium text-neutral-900 dark:text-neutral-100 truncate ${
                          task.completed ? 'line-through text-neutral-500' : ''
                        }`}
                      >
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-mono mt-0.5">
                        <span>{task.category}</span>
                        <span>·</span>
                        <span className={`uppercase font-semibold ${task.priority === 'high' ? 'text-amber-500' : ''}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      soundEngine.playClick(400, 0.03);
                      onDeleteTask(task.id);
                    }}
                    title="Delete milestone"
                    className="p-1.5 text-neutral-400 hover:text-rose-500 transition-colors cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
