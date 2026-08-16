'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const galleryImages = Array.from({ length: 16 }, (_, index) => ({
  src: `/images/gallery/gallery-${String(index + 1).padStart(2, '0')}.webp`,
  alt: `Galeri BBKitchen ${index + 1}`,
}));

const DESKTOP_VISIBLE = 4;
const maxDesktopIndex = galleryImages.length - DESKTOP_VISIBLE;

export const GallerySection: React.FC = () => {
  const [index, setIndex] = useState(0);

  const goPrevious = () => setIndex((current) => Math.max(current - 1, 0));
  const goNext = () => setIndex((current) => Math.min(current + 1, maxDesktopIndex));

  return (
    <section className="bg-white border-y border-slate-200 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-700 mb-2">
              Dokumentasi BBKitchen
            </p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
              Galeri BBKitchen
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Melihat lebih dekat aktivitas, peralatan, dan proses BBKitchen.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={goPrevious}
              disabled={index === 0}
              aria-label="Foto sebelumnya"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-35"
            >
              ←
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={index >= maxDesktopIndex}
              aria-label="Foto berikutnya"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-35"
            >
              →
            </button>
          </div>
        </div>

        {/* Desktop: compact 4-card carousel */}
        <div className="hidden sm:block overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 25}%)` }}
          >
            {galleryImages.map((image) => (
              <div
                key={image.src}
                className="shrink-0 basis-[calc((100%-2.25rem)/4)] mr-3"
              >
                <div className="group overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: native swipe carousel */}
        <div className="sm:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory flex gap-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {galleryImages.map((image) => (
            <div key={image.src} className="shrink-0 basis-[88%] snap-center">
              <div className="group overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="88vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            <span className="hidden sm:inline">Gunakan tombol untuk melihat dokumentasi lainnya →</span>
            <span className="sm:hidden">Geser untuk melihat foto lainnya →</span>
          </p>

          <div className="hidden sm:flex items-center gap-1.5" aria-label="Navigasi galeri">
            {Array.from({ length: Math.ceil(galleryImages.length / DESKTOP_VISIBLE) }).map((_, dot) => {
              const dotIndex = Math.min(dot * DESKTOP_VISIBLE, maxDesktopIndex);
              const active = Math.abs(index - dotIndex) < DESKTOP_VISIBLE;

              return (
                <button
                  key={dotIndex}
                  type="button"
                  onClick={() => setIndex(dotIndex)}
                  aria-label={`Buka galeri ${dot + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    active ? 'w-5 bg-slate-900' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
