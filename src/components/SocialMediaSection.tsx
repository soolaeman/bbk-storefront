import React from 'react';
import { ExternalLink, Facebook, Instagram, Pin, Play, MessageCircle } from 'lucide-react';

const socialLinks = [
  {
    name: 'Instagram',
    handle: '@bukanbarukitchen',
    href: 'https://www.instagram.com/bukanbarukitchen/',
    icon: Instagram,
    description: 'Aktivitas BBKitchen dan unit terbaru.',
  },
  {
    name: 'TikTok',
    handle: '@bukanbarukitchen.com',
    href: 'https://www.tiktok.com/@bukanbarukitchen.com/photo/7547192180746767623',
    icon: Play,
    description: 'Video dan konten unit. Salah satu konten mencapai 140 ribu views.',
  },
  {
    name: 'YouTube',
    handle: 'BBKitchen',
    href: 'https://www.youtube.com/shorts/_uzgdL_JhXA',
    icon: Play,
    description: 'Shorts dan video aktivitas BBKitchen. Salah satu video mencapai 18 ribu views.',
  },
  {
    name: 'Facebook',
    handle: 'Bukan Baru Kitchen',
    href: 'https://web.facebook.com/bukanbarukitchens',
    icon: Facebook,
    description: 'Update dan aktivitas BBKitchen.',
  },
  {
    name: 'Pinterest',
    handle: 'bukanbarukitchen',
    href: 'https://id.pinterest.com/bukanbarukitchen/',
    icon: Pin,
    description: 'Inspirasi dan referensi peralatan dapur.',
  },
  {
    name: 'Threads',
    handle: '@bukanbarukitchen',
    href: 'https://www.threads.com/@bukanbarukitchen',
    icon: MessageCircle,
    description: 'Update singkat dan aktivitas BBKitchen.',
  },
];

export const SocialMediaSection: React.FC = () => {
  return (
    <section className="bg-white py-12 px-4 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <p className="text-xs font-black uppercase tracking-wider text-emerald-700">BBKitchen Online</p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Ikuti Aktivitas BBKitchen</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Lihat stok, unit yang baru datang, proses pengiriman, dan aktivitas BBKitchen di sosial media.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {socialLinks.map(({ name, handle, href, icon: Icon, description }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:bg-white hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-800">
                  <Icon className="w-5 h-5" />
                </div>
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
