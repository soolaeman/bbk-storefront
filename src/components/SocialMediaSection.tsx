'use client';

import React, { useState } from 'react';
import { ExternalLink, Facebook, Instagram, Pin, Play, MessageCircle, Youtube } from 'lucide-react';

const youtubeUrl = 'https://www.youtube.com/shorts/_uzgdL_JhXA';
const youtubeEmbedUrl = 'https://www.youtube.com/embed/_uzgdL_JhXA?autoplay=1';
const tiktokUrl = 'https://www.tiktok.com/@bukanbarukitchen.com/photo/7547192180746767623';
const tiktokEmbedUrl = 'https://www.tiktok.com/player/v1/7547192180746767623?description=1&music_info=1';

const socialLinks = [
  { name: 'Instagram', handle: '@bukanbarukitchen', href: 'https://www.instagram.com/bukanbarukitchen/', icon: Instagram },
  { name: 'Threads', handle: '@bukanbarukitchen', href: 'https://www.threads.com/@bukanbarukitchen', icon: MessageCircle },
  { name: 'Facebook', handle: 'Bukan Baru Kitchen', href: 'https://web.facebook.com/bukanbarukitchens', icon: Facebook },
  { name: 'Pinterest', handle: 'bukanbarukitchen', href: 'https://id.pinterest.com/bukanbarukitchen/', icon: Pin },
];

export const SocialMediaSection: React.FC = () => {
  const [playing, setPlaying] = useState<'youtube' | 'tiktok' | null>(null);

  return (
    <section className="bg-white py-8 px-4 border-b border-slate-200">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-1.5">
          <p className="text-[10px] font-black uppercase tracking-wider text-emerald-700">BBKitchen Online</p>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">Ikuti Aktivitas BBKitchen</h2>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
          <button type="button" onClick={() => setPlaying(current => current === 'youtube' ? null : 'youtube')} className={`min-h-14 rounded-xl border px-3 py-2.5 flex items-center justify-center gap-2 transition-all ${playing === 'youtube' ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 hover:bg-white hover:shadow-sm'}`}>
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-red-600 shrink-0"><Youtube className="w-4 h-4" /></span>
            <span className="text-left min-w-0"><span className="block text-xs font-extrabold text-slate-900">YouTube Shorts</span><span className="block text-[10px] text-slate-500">18 ribu views</span></span>
            <Play className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          <button type="button" onClick={() => setPlaying(current => current === 'tiktok' ? null : 'tiktok')} className={`min-h-14 rounded-xl border px-3 py-2.5 flex items-center justify-center gap-2 transition-all ${playing === 'tiktok' ? 'border-slate-400 bg-slate-100' : 'border-slate-200 bg-slate-50 hover:bg-white hover:shadow-sm'}`}>
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-900 shrink-0 font-black text-xs">♪</span>
            <span className="text-left min-w-0"><span className="block text-xs font-extrabold text-slate-900">TikTok</span><span className="block text-[10px] text-slate-500">140 ribu views</span></span>
            <Play className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          <a href="https://www.instagram.com/bukanbarukitchen/" target="_blank" rel="noopener noreferrer" className="min-h-14 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 flex items-center justify-center gap-2 hover:bg-white hover:shadow-sm transition-all">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-900 shrink-0"><Instagram className="w-4 h-4" /></span>
            <span className="text-left min-w-0"><span className="block text-xs font-extrabold text-slate-900">Instagram</span><span className="block text-[10px] text-slate-500 truncate">@bukanbarukitchen</span></span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </a>

          <a href="https://www.threads.com/@bukanbarukitchen" target="_blank" rel="noopener noreferrer" className="min-h-14 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 flex items-center justify-center gap-2 hover:bg-white hover:shadow-sm transition-all">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-900 shrink-0"><MessageCircle className="w-4 h-4" /></span>
            <span className="text-left min-w-0"><span className="block text-xs font-extrabold text-slate-900">Threads</span><span className="block text-[10px] text-slate-500 truncate">@bukanbarukitchen</span></span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </a>

          <a href="https://web.facebook.com/bukanbarukitchens" target="_blank" rel="noopener noreferrer" className="min-h-14 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 flex items-center justify-center gap-2 hover:bg-white hover:shadow-sm transition-all">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-900 shrink-0"><Facebook className="w-4 h-4" /></span>
            <span className="text-left min-w-0"><span className="block text-xs font-extrabold text-slate-900">Facebook</span><span className="block text-[10px] text-slate-500 truncate">Bukan Baru Kitchen</span></span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </a>

          <a href="https://id.pinterest.com/bukanbarukitchen/" target="_blank" rel="noopener noreferrer" className="min-h-14 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 flex items-center justify-center gap-2 hover:bg-white hover:shadow-sm transition-all">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-900 shrink-0"><Pin className="w-4 h-4" /></span>
            <span className="text-left min-w-0"><span className="block text-xs font-extrabold text-slate-900">Pinterest</span><span className="block text-[10px] text-slate-500 truncate">bukanbarukitchen</span></span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </a>
        </div>

        {playing && (
          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-950 overflow-hidden max-w-2xl mx-auto">
            <div className="flex items-center justify-between px-3 py-2 bg-slate-900 text-white">
              <span className="text-xs font-bold">Putar {playing === 'youtube' ? 'YouTube Shorts' : 'TikTok'}</span>
              <button type="button" onClick={() => setPlaying(null)} className="text-[11px] font-bold text-slate-300 hover:text-white">Tutup</button>
            </div>
            <div className="aspect-video">
              <iframe title={`BBKitchen ${playing}`} src={playing === 'youtube' ? youtubeEmbedUrl : tiktokEmbedUrl} className="w-full h-full border-0" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
            </div>
            <div className="px-3 py-2 text-right bg-slate-900">
              <a href={playing === 'youtube' ? youtubeUrl : tiktokUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white hover:text-emerald-300">Buka di platform <ExternalLink className="w-3 h-3" /></a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
