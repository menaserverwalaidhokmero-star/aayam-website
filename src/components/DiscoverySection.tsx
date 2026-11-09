import { useState, useMemo } from 'react';
import { Search, Bookmark, Heart, ArrowUpRight, Filter, Sparkles, X, Check, Share2 } from 'lucide-react';
import { DiscoveryItem, Category } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface DiscoverySectionProps {
  discoveries: DiscoveryItem[];
  onToggleBookmark: (id: string) => void;
  onToggleLike: (id: string) => void;
}

const CATEGORIES: Category[] = [
  'All',
  'Spatial Computing',
  'Biomimetic Design',
  'Analog Acoustics',
  'Generative Systems',
  'Sustainable Materials'
];

export function DiscoverySection({ discoveries, onToggleBookmark, onToggleLike }: DiscoverySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'trending' | 'newest' | 'bookmarked'>('trending');
  const [selectedItem, setSelectedItem] = useState<DiscoveryItem | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);

  // Filter & sort logic
  const filteredDiscoveries = useMemo(() => {
    return discoveries
      .filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch =
          searchQuery.trim() === '' ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'trending') return b.likes - a.likes;
        if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (sortBy === 'bookmarked') return (b.bookmarked ? 1 : 0) - (a.bookmarked ? 1 : 0);
        return 0;
      });
  }, [discoveries, selectedCategory, searchQuery, sortBy]);

  const openDetail = (item: DiscoveryItem) => {
    soundEngine.playClick(500, 0.04);
    setSelectedItem(item);
  };

  const closeDetail = () => {
    soundEngine.playClick(440, 0.03);
    setSelectedItem(null);
  };

  const handleShare = () => {
    soundEngine.playClick(650, 0.04);
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <section id="discoveries" className="py-16 sm:py-24 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="text-amber-600 dark:text-amber-400 font-semibold uppercase text-[11px] tracking-wide">
                AAYAM Radar
              </span>
              <span aria-hidden="true">·</span>
              <span>Research, Inventions & Speculative Prototypes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
              Curated Technological & Architectural Discoveries
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              Hand-scouted breakthroughs across tactile physical hardware, responsive living timber, and holographic photonics.
            </p>
          </div>

          {/* Quick stats counter */}
          <div className="flex items-center gap-4 text-xs font-mono text-neutral-500">
            <span>Showing <strong className="text-neutral-900 dark:text-neutral-100">{filteredDiscoveries.length}</strong> signals</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 bg-neutral-50 dark:bg-neutral-900/40 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Interactive Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    soundEngine.playClick(480, 0.03);
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input & Sort Selector */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Filter by concept, author, tag..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-1 text-xs">
                <span className="text-neutral-500 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => {
                    soundEngine.playClick(440, 0.03);
                    setSortBy(e.target.value as any);
                  }}
                  className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                >
                  <option value="trending">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="bookmarked">Saved First</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Discovery Grid */}
        {filteredDiscoveries.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-neutral-50 dark:bg-neutral-900/30 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800">
            <Sparkles className="w-8 h-8 text-neutral-400 mx-auto" />
            <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">No signals found</h4>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              No discoveries match your current filter criteria. Try resetting filters or searching another keyword.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-medium text-amber-950 dark:text-amber-100 bg-amber-400 hover:bg-amber-300 dark:bg-amber-500/20 dark:border dark:border-amber-500/30 rounded-lg cursor-pointer transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiscoveries.map(item => (
              <div
                key={item.id}
                className="group relative flex flex-col rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0B0D14] shadow-sm hover:border-neutral-400 dark:hover:border-neutral-700 transition-all hover:-translate-y-1 cursor-pointer"
                onClick={() => openDetail(item)}
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent pointer-events-none" />

                  {/* Bookmark Button (stopPropagation so it doesn't open modal) */}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      soundEngine.playBookmarkSound();
                      onToggleBookmark(item.id);
                    }}
                    title={item.bookmarked ? 'Remove from saved' : 'Save to Horizon Deck'}
                    className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
                      item.bookmarked
                        ? 'bg-amber-400 text-amber-950 shadow-md'
                        : 'bg-neutral-900/60 text-white hover:bg-neutral-900/90'
                    }`}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  {/* Unboxed inline category metadata on image footer */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                    <span className="font-semibold text-amber-400 text-[11px] uppercase tracking-wide">
                      {item.category}
                    </span>
                    <span className="font-mono text-[11px] text-white/70">{item.readTime}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold tracking-tight text-neutral-950 dark:text-neutral-50 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>

                  {/* Footer metadata: Author, Date, Likes, Arrow */}
                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="font-medium text-neutral-800 dark:text-neutral-200">{item.author}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[11px]">{item.date}</span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {/* Like button */}
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          soundEngine.playClick(600, 0.04);
                          onToggleLike(item.id);
                        }}
                        className="flex items-center gap-1 text-neutral-500 hover:text-rose-500 transition-colors cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 fill-rose-500/20 text-rose-500" />
                        <span className="font-mono text-[11px]">{item.likes}</span>
                      </button>

                      <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0B0D14] rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Modal Close Button */}
            <button
              onClick={closeDetail}
              className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="space-y-2 pr-10">
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <span className="font-semibold text-amber-500 uppercase tracking-wide">
                  {selectedItem.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>{selectedItem.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedItem.date}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50">
                {selectedItem.title}
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                {selectedItem.subtitle}
              </p>
            </div>

            {/* Marquee Image */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Full Story Content */}
            <div className="space-y-4 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {selectedItem.fullStory.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Key Takeaways Box */}
            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                Key Technical & Architectural Takeaways
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                {selectedItem.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags list (clean unboxed text or subtle buttons) */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-neutral-500 font-medium">Keywords:</span>
              {selectedItem.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Footer actions */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <span>Researched by</span>
                <strong className="text-neutral-900 dark:text-neutral-100">{selectedItem.author}</strong>
                <span>({selectedItem.authorRole})</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedShare ? 'Copied Link' : 'Share Signal'}</span>
                </button>

                <button
                  onClick={() => {
                    soundEngine.playBookmarkSound();
                    onToggleBookmark(selectedItem.id);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    selectedItem.bookmarked
                      ? 'bg-amber-400 text-amber-950 hover:bg-amber-300'
                      : 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                  <span>{selectedItem.bookmarked ? 'Saved in Horizon Deck' : 'Save to Deck'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
