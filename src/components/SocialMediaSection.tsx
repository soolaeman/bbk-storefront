'use client';

import React, { useState } from 'react';
import { ExternalLink, Facebook, Instagram, Pin, Play, MessageCircle, Youtube } from 'lucide-react';

const youtubeEmbedUrl = 'https://www.youtube.com/embed/_uzgdL_JhXA?autoplay=1';
const tiktokEmbedUrl = 'https://www.tiktok.com/player/v1/7547192180746767623?description=1&music_info=1';

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/bukanbarukitchen/', icon: Instagram, copy: 'Update unit & aktivitas BBKitchen' },
  { name: 'Facebook', href: 'https://web.facebook.com/bukanbarukitchens', icon: Facebook, copy: 'Info & kabar BBKitchen' },
  { name: 'Pinterest', href: 'https://id.pinterest.com/bukanbarukitchen/', icon: Pin, copy: 'Inspirasi dapur komersial' },
  { name: 'Threads', href: 'https://www.threads.com/@bukanbarukitchen', icon: MessageCircle, copy: 'Update singkat BBKitchen' },
];

export const SocialMediaSection: React.FC = () => {
  const [playing, setPlaying] = useState<'youtube' | 'tiktok' | null>(null);

  const videoPanel = (type: 'youtube' | 'tiktok') => {
    const isYoutube = type === 'youtube';
    return (
      <div className="w-full aspect-video rounded-2xl border border-slate-200 bg-slate-950 overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => setPlaying(current => current === type ? null : type)}
          className="w-full h-full relative group"
          aria-label={`Putar ${isYoutube ? 'YouTube Shorts' : 'TikTok'}`}
        >
          {playing === type ? (
            <iframe
              title={`BBKitchen ${type}`}
              src={isYoutube ? youtubeEmbedUrl : tiktokEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <span className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 group-hover:bg-slate-900 transition-colors text-white px-5">
              <span className="w-14 h-14 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg">
                {isYoutube ? <Youtube className="w-6 h-6 text-red-600" /> : <span className="font-black text-xl">♪</span>}
                <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
              </span>
              <span className="mt-3 text-sm font-extrabold text-white">{isYoutube ? 'YouTube Shorts' : 'TikTok'}</span>
              <span className="mt-1 text-[11px] leading-relaxed text-center text-slate-300">
                {isYoutube ? 'Aktivitas, unit terbaru, dan proses BBKitchen.' : 'Lihat konten dan aktivitas BBKitchen.'}
              </span>
            </span>
          )}
        </button>
      </div>
    );
  };

  return (
    <section className="bg-white py-10 px-4 border-b border-slate-200">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-2">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700">BBKitchen Online</p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Ikuti BBKitchen</h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-600 leading-relaxed">
            Lihat aktivitas, unit terbaru, proses kerja, dan inspirasi dapur komersial dari channel BBKitchen.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {videoPanel('youtube')}
          {videoPanel('tiktok')}
        </div>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {socialLinks.map(({ name, href, icon: Icon, copy }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3.5 flex items-center gap-3 hover:bg-white hover:shadow-sm transition-all"
            >
              <span className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-900 shrink-0">
                <Icon className="w-4 h-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-extrabold text-slate-900">{name}</span>
                <span className="block mt-0.5 text-[10px] text-slate-500 truncate">{copy}</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-auto" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
