import { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X, Type, Check } from 'lucide-react';
import { Article } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface ArticlesSectionProps {
  articles: Article[];
}

export function ArticlesSection({ articles }: ArticlesSectionProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [fontSizeModifier, setFontSizeModifier] = useState<'normal' | 'large' | 'xlarge'>('normal');

  const openArticle = (article: Article) => {
    soundEngine.playClick(520, 0.04);
    setSelectedArticle(article);
  };

  const closeArticle = () => {
    soundEngine.playClick(440, 0.03);
    setSelectedArticle(null);
  };

  return (
    <section id="essays" className="py-16 sm:py-24 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="text-amber-600 dark:text-amber-400 font-semibold uppercase text-[11px] tracking-wide">
                Horizon Essays
              </span>
              <span aria-hidden="true">·</span>
              <span>Long-Form Editorial Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
              Philosophy, Calm Computing & Design Horizons
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              In-depth essays examining why restraint, physical proprioception, and quiet software represent the next frontier of modern tools.
            </p>
          </div>
        </div>

        {/* Articles List / Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {articles.map(article => (
            <div
              key={article.id}
              onClick={() => openArticle(article)}
              className="group rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0B0D14] shadow-sm hover:border-neutral-400 dark:hover:border-neutral-700 transition-all cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="font-medium text-amber-400">Editorial Essay</span>
                  <span className="font-mono text-white/80">{article.readTime}</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500">
                  <div className="flex items-center gap-2">
                    <img
                      src={article.authorAvatar}
                      alt={article.author}
                      referrerPolicy="no-referrer"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="font-medium text-neutral-900 dark:text-neutral-200">{article.author}</span>
                    <span>·</span>
                    <span>{article.date}</span>
                  </div>

                  <span className="flex items-center gap-1 font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-amber-500 transition-colors">
                    <span>Read Essay</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Essay Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0A0C13] rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-10 space-y-8">
            {/* Top Toolbar: Close button & Font Size Adjustment */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2 text-xs">
                <Type className="w-4 h-4 text-neutral-400" />
                <span className="text-neutral-500">Type Scale:</span>
                <button
                  onClick={() => setFontSizeModifier('normal')}
                  className={`px-2 py-1 rounded text-xs ${fontSizeModifier === 'normal' ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold' : 'text-neutral-500'}`}
                >
                  Standard
                </button>
                <button
                  onClick={() => setFontSizeModifier('large')}
                  className={`px-2 py-1 rounded text-xs ${fontSizeModifier === 'large' ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold' : 'text-neutral-500'}`}
                >
                  Medium
                </button>
                <button
                  onClick={() => setFontSizeModifier('xlarge')}
                  className={`px-2 py-1 rounded text-xs ${fontSizeModifier === 'xlarge' ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold' : 'text-neutral-500'}`}
                >
                  Large
                </button>
              </div>

              <button
                onClick={closeArticle}
                className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Headline & Byline */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <span className="font-semibold text-amber-500 uppercase tracking-wide">AAYAM Editorial</span>
                <span>·</span>
                <span>{selectedArticle.readTime}</span>
                <span>·</span>
                <span>{selectedArticle.date}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50 leading-tight">
                {selectedArticle.title}
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {selectedArticle.subtitle}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <img
                  src={selectedArticle.authorAvatar}
                  alt={selectedArticle.author}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{selectedArticle.author}</p>
                  <p className="text-xs text-neutral-500">Fellow, AAYAM Creative Intelligence</p>
                </div>
              </div>
            </div>

            {/* Cover photo */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900">
              <img
                src={selectedArticle.coverImage}
                alt={selectedArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Essay Paragraphs */}
            <div
              className={`space-y-6 text-neutral-800 dark:text-neutral-200 leading-relaxed ${
                fontSizeModifier === 'normal'
                  ? 'text-base sm:text-lg'
                  : fontSizeModifier === 'large'
                  ? 'text-lg sm:text-xl'
                  : 'text-xl sm:text-2xl'
              }`}
            >
              {selectedArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Footer of modal */}
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center text-xs text-neutral-500">
              <span>Published by AAYAM Press · All rights reserved</span>
              <button
                onClick={closeArticle}
                className="px-4 py-2 rounded-xl bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold cursor-pointer"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
