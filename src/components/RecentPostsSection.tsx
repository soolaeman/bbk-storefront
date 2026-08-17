'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Loader2, Newspaper } from 'lucide-react';

interface RecentPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export const RecentPostsSection: React.FC = () => {
  const [posts, setPosts] = useState<RecentPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadPosts = async () => {
      try {
        const response = await fetch('/api/posts?limit=3', {
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        });

        if (!response.ok) throw new Error(`Recent posts request failed: ${response.status}`);

        const data = (await response.json()) as RecentPost[];
        if (!cancelled) setPosts(Array.isArray(data) ? data : []);
      } catch (requestError) {
        console.error('Failed to load recent WordPress posts:', requestError);
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void loadPosts();
    return () => { cancelled = true; };
  }, []);

  const goTo = (index: number) => {
    if (posts.length === 0) return;
    setActiveIndex((index + posts.length) % posts.length);
  };

  return (
    <section className="bg-slate-50 py-12 px-4 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700">BBKitchen Journal</p>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold text-slate-900">Recent Posts</h2>
            <p className="mt-1.5 max-w-2xl text-xs sm:text-sm text-slate-600 leading-relaxed">
              Kabar terbaru, insight dapur komersial, dan informasi dari BBKitchen.
            </p>
          </div>

          {!isLoading && posts.length > 1 && (
            <div className="hidden sm:flex items-center gap-2">
              <button type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Artikel sebelumnya" className="w-9 h-9 rounded-full border border-slate-300 bg-white text-slate-700 flex items-center justify-center hover:bg-slate-100 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Artikel berikutnya" className="w-9 h-9 rounded-full border border-slate-300 bg-white text-slate-700 flex items-center justify-center hover:bg-slate-100 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Memuat artikel terbaru...
          </div>
        ) : error || posts.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <Newspaper className="mx-auto w-6 h-6 text-slate-400" />
            <p className="mt-3 text-sm font-bold text-slate-700">Artikel terbaru belum tersedia.</p>
            <p className="mt-1 text-xs text-slate-500">Konten akan tampil otomatis saat koneksi ke WordPress tersedia.</p>
          </div>
        ) : (
          <>
            <div className="mt-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:grid sm:grid-cols-3 sm:gap-5 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {posts.map((post, index) => {
                const title = stripHtml(post.title.rendered);
                const excerpt = stripHtml(post.excerpt.rendered);

                return (
                  <article
                    key={post.id}
                    className={`min-w-[82%] snap-center sm:min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all ${index === activeIndex ? 'ring-1 ring-emerald-100' : ''}`}
                  >
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      <span className="inline-flex items-center gap-1.5 text-emerald-700"><Newspaper className="w-3.5 h-3.5" />Artikel</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1"><CalendarDays className="w-3 h-3" />{formatDate(post.date)}</span>
                    </div>
                    <h3 className="mt-3 text-base sm:text-lg font-extrabold leading-snug text-slate-900 line-clamp-2">{title}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">{excerpt}</p>
                    <a href={post.link} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 hover:text-emerald-800 transition-colors">
                      Baca artikel <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </article>
                );
              })}
            </div>

            {posts.length > 1 && (
              <div className="mt-3 flex items-center justify-center gap-1.5 sm:hidden" aria-label="Navigasi artikel terbaru">
                {posts.map((post, index) => (
                  <button key={post.id} type="button" onClick={() => goTo(index)} aria-label={`Pilih artikel ${index + 1}`} className={`h-1.5 rounded-full transition-all ${index === activeIndex ? 'w-5 bg-emerald-600' : 'w-1.5 bg-slate-300'}`} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
