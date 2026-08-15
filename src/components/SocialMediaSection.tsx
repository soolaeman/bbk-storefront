'use client';

import React, { useState } from 'react';
import { ExternalLink, Facebook, Instagram, Pin, Play, MessageCircle } from 'lucide-react';

const youtubeUrl = 'https://www.youtube.com/shorts/_uzgdL_JhXA';
const youtubeEmbedUrl = 'https://www.youtube.com/embed/_uzgdL_JhXA?autoplay=1';
const tiktokUrl = 'https://www.tiktok.com/@bukanbarukitchen.com/photo/7547192180746767623';
const tiktokEmbedUrl = 'https://www.tiktok.com/player/v1/7547192180746767623?description=1&music_info=1';

const socialLinks = [
  { name: 'Instagram', handle: '@bukanbarukitchen', href: 'https://www.instagram.com/bukanbarukitchen/', icon: Instagram, description: 'Aktivitas BBKitchen dan unit terbaru.' },
  { name: 'Facebook', handle: 'Bukan Baru Kitchen', href: 'https://web.facebook.com/bukanbarukitchens', icon: Facebook, description: 'Update dan aktivitas BBKitchen.' },
  { name: 'Pinterest', handle: 'bukanbarukitchen', href: 'https://id.pinterest.com/bukanbarukitchen/', icon: Pin, description: 'Inspirasi dan referensi peralatan dapur.' },
  { name: 'Threads', handle: '@bukanbarukitchen', href: 'https://www.threads.com/@bukanbarukitchen', icon: MessageCircle, description: 'Update singkat dan aktivitas BBKitchen.' },
];

const VideoCard: React.FC<{
  name: string;
  handle: string;
  href: string;
  embedUrl: string;
  description: string;
  views: string;
}> = ({ name, handle, href, embedUrl, description, views }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
      <div className="aspect-video bg-slate-900 relative">
        {playing ? (
          <iframe
            title={`${name} BBKitchen`}
            src={embedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-white bg-slate-900 hover:bg-slate-800 transition-colors"
          >
            <span className="w-14 h-14 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-xl">
              <Play className="w-6 h-6 ml-0.5 fill-current" />
            </span>
            <span className="mt-3 text-xs font-black">Putar {name}</span>
          </button>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">{name}</h3>
            <p className="text-xs font-semibold text-emerald-700">{handle}</p>
          </div>
          <span className="text-[11px] font-black text-slate-500">{views}</span>
        </div>
        <p className="mt-2 text-xs text-slate-600 leading-relaxed">{description}</p>
        <a href={href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-emerald-700">
          Buka di {name} <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
};

export const SocialMediaSection: React.FC = () => {
  return (
    <section className="bg-white py-12 px-4 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <p className="text-xs font-black uppercase tracking-wider text-emerald-700">BBKitchen Online</p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Ikuti Aktivitas BBKitchen</h2>
          <p className="text-xs sm:text-sm text-slate-600">Lihat stok, unit yang baru datang, proses pengiriman, dan aktivitas BBKitchen di sosial media.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <VideoCard name="YouTube" handle="BBKitchen" href={youtubeUrl} embedUrl={youtubeEmbedUrl} views="18 ribu views" description="Shorts dan video aktivitas BBKitchen." />
          <VideoCard name="TikTok" handle="@bukanbarukitchen.com" href={tiktokUrl} embedUrl={tiktokEmbedUrl} views="140 ribu views" description="Konten dan aktivitas BBKitchen di TikTok." />
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {socialLinks.map(({ name, handle, href, icon: Icon, description }) => (
            <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:bg-white hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-800"><Icon className="w-5 h-5" /></div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </div>
              <h3 className="mt-4 text-sm font-extrabold text-slate-900">{name}</h3>
              <p className="mt-0.5 text-xs font-semibold text-emerald-700">{handle}</p>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">{description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
