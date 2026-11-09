import { useState } from 'react';
import { MessageSquare, Heart, Plus, Send, Sparkles, Filter, Check, User } from 'lucide-react';
import { CommunitySpark, UserProfile } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface CommunitySectionProps {
  sparks: CommunitySpark[];
  userProfile: UserProfile;
  onLikeSpark: (sparkId: string) => void;
  onAddSpark: (spark: Omit<CommunitySpark, 'id' | 'timestamp' | 'likes' | 'userLiked' | 'comments'>) => void;
  onAddComment: (sparkId: string, commentText: string) => void;
}

export function CommunitySection({
  sparks,
  userProfile,
  onLikeSpark,
  onAddSpark,
  onAddComment
}: CommunitySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isPostingModalOpen, setIsPostingModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'Insight' | 'Critique' | 'Prototype' | 'Resource'>('Insight');
  const [activeCommentSparkId, setActiveCommentSparkId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');

  const categories = ['All', 'Insight', 'Critique', 'Prototype', 'Resource'];

  const filteredSparks = sparks.filter(
    s => selectedCategory === 'All' || s.category === selectedCategory
  );

  const handleCreateSpark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    soundEngine.playCelebration();
    onAddSpark({
      authorName: userProfile.name,
      authorHandle: userProfile.handle,
      authorAvatar: userProfile.avatarUrl,
      role: userProfile.title,
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory
    });
    setNewTitle('');
    setNewContent('');
    setIsPostingModalOpen(false);
  };

  const handleSendComment = (sparkId: string) => {
    if (!commentInput.trim()) return;
    soundEngine.playClick(600, 0.04);
    onAddComment(sparkId, commentInput.trim());
    setCommentInput('');
  };

  return (
    <section id="community" className="py-16 sm:py-24 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="text-amber-600 dark:text-amber-400 font-semibold uppercase text-[11px] tracking-wide">
                Collective Intelligence
              </span>
              <span aria-hidden="true">·</span>
              <span>Peer Insights & Prototype Critiques</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
              Community Sparks & Inquiries
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              A peer network of architects, acoustics engineers, and creative coders exploring fringe prototypes.
            </p>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick(500, 0.04);
              setIsPostingModalOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 dark:bg-amber-400 dark:hover:bg-amber-300 shadow-md shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Share a Spark</span>
          </button>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                soundEngine.playClick(440, 0.03);
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                  : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 border border-neutral-200 dark:border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sparks Feed */}
        <div className="space-y-6">
          {filteredSparks.map(spark => (
            <div
              key={spark.id}
              className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0B0D14] shadow-sm space-y-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              {/* Spark Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {spark.authorAvatar ? (
                    <img
                      src={spark.authorAvatar}
                      alt={spark.authorName}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500">
                      <User className="w-5 h-5" />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{spark.authorName}</h4>
                      <span className="text-xs text-neutral-500">{spark.authorHandle}</span>
                    </div>
                    <p className="text-xs text-neutral-500">{spark.role} · {spark.timestamp}</p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                  {spark.category}
                </span>
              </div>

              {/* Spark Content */}
              <div className="space-y-2">
                <h3 className="text-base font-bold text-neutral-950 dark:text-neutral-50">
                  {spark.title}
                </h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {spark.content}
                </p>
              </div>

              {/* Spark Actions: Like & Comment toggle */}
              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      soundEngine.playClick(620, 0.04);
                      onLikeSpark(spark.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      spark.userLiked
                        ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${spark.userLiked ? 'fill-current' : ''}`} />
                    <span className="font-mono">{spark.likes}</span>
                  </button>

                  <button
                    onClick={() => {
                      soundEngine.playClick(480, 0.03);
                      setActiveCommentSparkId(activeCommentSparkId === spark.id ? null : spark.id);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{spark.comments.length} Comments</span>
                  </button>
                </div>
              </div>

              {/* Expanded Comments Thread */}
              {activeCommentSparkId === spark.id && (
                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
                  <div className="space-y-2.5">
                    {spark.comments.map(c => (
                      <div key={c.id} className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 text-xs space-y-1">
                        <div className="flex items-center justify-between text-neutral-500">
                          <strong className="text-neutral-900 dark:text-neutral-200">{c.author}</strong>
                          <span className="text-[10px]">{c.timestamp}</span>
                        </div>
                        <p className="text-neutral-700 dark:text-neutral-300">{c.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment input */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add to the conversation..."
                      value={commentInput}
                      onChange={e => setCommentInput(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleSendComment(spark.id);
                      }}
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <button
                      onClick={() => handleSendComment(spark.id)}
                      className="p-2 rounded-xl bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 transition-opacity cursor-pointer shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Share a Spark Modal */}
      {isPostingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0B0D14] rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-8 space-y-5">
            <h3 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
              Broadcast a Creative Spark
            </h3>
            <p className="text-xs text-neutral-500">
              Share a breakthrough insight, prototype critique, or research inquiry with the AAYAM network.
            </p>

            <form onSubmit={handleCreateSpark} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300">Spark Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tactile acoustic damping in timber..."
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300">Category</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none cursor-pointer"
                >
                  <option value="Insight">Insight</option>
                  <option value="Critique">Critique</option>
                  <option value="Prototype">Prototype</option>
                  <option value="Resource">Resource</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300">Observation / Question</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide context, observations, and key questions..."
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPostingModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-semibold bg-amber-400 hover:bg-amber-300 text-amber-950 transition-colors cursor-pointer shadow-sm"
                >
                  Publish Spark
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
