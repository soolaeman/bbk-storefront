'use client';

import React from 'react';
import Image from 'next/image';

const galleryImages = Array.from({ length: 16 }, (_, index) => ({
  src: `/images/gallery/gallery-${String(index + 1).padStart(2, '0')}.webp`,
  alt: `Galeri BBKitchen ${index + 1}`,
}));

export const GallerySection: React.FC = () => {
  const [featured, ...supporting] = galleryImages;
  const storyImages = [supporting[5], supporting[7], supporting[11], supporting[14]];
  const deliveryImages = supporting.filter((_, index) => ![5, 7, 11, 14].includes(index));

  return (
    <section className="bg-white border-y border-slate-200 py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-700 mb-2">Dokumentasi BBKitchen</p>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">Galeri BBKitchen</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">Melihat lebih dekat aktivitas, peralatan, dan proses BBKitchen.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          <div className="lg:col-span-7 group overflow-hidden rounded-2xl bg-slate-100 border border-slate-200">
            <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden">
              <Image src={featured.src} alt={featured.alt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4 lg:gap-5">
            {[supporting[5], supporting[7], supporting[11], supporting[14]].map((image, index) => (
              <div key={image.src} className="group overflow-hidden rounded-2xl bg-slate-100 border border-slate-200">
                <div className={`relative overflow-hidden ${index === 0 ? 'aspect-[4/3]' : 'aspect-[3/4]'}`}>
                  <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {deliveryImages.map((image) => (
            <div key={image.src} className="group overflow-hidden rounded-xl bg-slate-100 border border-slate-200">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 16vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
