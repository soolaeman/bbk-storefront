'use client';

import React, { useState } from 'react';
import { ExternalLink, Facebook, Instagram, Pin, Play, MessageCircle, Youtube } from 'lucide-react';

const youtubeUrl = 'https://www.youtube.com/shorts/_uzgdL_JhXA';
const youtubeEmbedUrl = 'https://www.youtube.com/embed/_uzgdL_JhXA?autoplay=1';
const tiktokUrl = 'https://www.tiktok.com/@bukanbarukitchen.com/photo/7547192180746767623';
const tiktokEmbedUrl = 'https://www.tiktok.com/player/v1/7547192180746767623?description=1&music_info=1';

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/bukanbarukitchen/', icon: Instagram },
  { name: 'Facebook', href: 'https://web.facebook.com/bukanbarukitchens', icon: Facebook },
  { name: 'Threads', href: 'https://www.threads.com/@bukanbarukitchen', icon: MessageCircle },
  { name: 'Pinterest', href: 'https://id.pinterest.com/bukanbarukitchen/', icon: Pin },
];

export const SocialMediaSection: React.FC = () => {
  const [playing, setPlaying] = useState<'youtube' | 'tiktok' | null>(null);

  const videoPanel = (type: 'youtube' | 'tiktok') => {
    const isYoutube = type === 'youtube';
    return (
      <button
        type="button"
        onClick={() => setPlaying(current => current === type ? null : type)}
        className="w-full aspect-video rounded-xl border border-slate-200 bg-slate-950 overflow-hidden relative group"
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
            onClick={(event) => event.stopPropagation()}
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center bg-slate-950 group-hover:bg-slate-900 transition-colors">
            <span className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg">
              {isYoutube ? <Youtube className="w-5 h-5 text-red-600" /> : <span className="font-black text-lg">♪</span>}
              <Play className="w-3 h-3 ml-0.5 fill-current" />
            </span>
          </span>
        )}
      </button>
    );
  };

  return (
    <section className="bg-white py-8 px-4 border-b border-slate-200">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-1.5">
          <p className="text-[10px] font-black uppercase tracking-wider text-emerald-700">BBKitchen Online</p>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">Ikuti Aktivitas BBKitchen</h2>
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1fr_1fr_0.85fr] gap-3 items-stretch">
          <div className="grid grid-rows-4 gap-3">
            {[0, 1, 2, 3].map((row) => <React.Fragment key={`youtube-${row}`}>{videoPanel('youtube')}</React.Fragment>)}
          </div>

          <div className="grid grid-rows-4 gap-3">
            {[0, 1, 2, 3].map((row) => <React.Fragment key={`tiktok-${row}`}>{videoPanel('tiktok')}</React.Fragment>)}
          </div>

          <div className="grid grid-rows-4 gap-3">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 flex items-center justify-between gap-3 hover:bg-white hover:shadow-sm transition-all">
                <span className="flex items-center gap-3 min-w-0">
                  <span className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-900 shrink-0"><Icon className="w-4 h-4" /></span>
                  <span className="text-xs font-extrabold text-slate-900">{name}</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
