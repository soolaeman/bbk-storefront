'use client';

import React, { useState } from 'react';

interface GalleryImage {
  src: string;
  alt?: string;
}

interface ProductGalleryProps {
  images: GalleryImage[];
  productName: string;
  status: string;
}

export function ProductGallery({ images, productName, status }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const validImages = images.length > 0 ? images : [{ src: '', alt: productName }];
  const currentImage = validImages[selectedIndex] || validImages[0];
  const isFailed = !currentImage.src || failedImages[currentImage.src];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      {/* Main Image Display */}
      <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-900 flex items-center justify-center">
        {!isFailed ? (
          <img
            src={currentImage.src}
            alt={currentImage.alt || productName}
            onError={() => setFailedImages((prev) => ({ ...prev, [currentImage.src]: true }))}
            className="h-full w-full object-contain transition-all duration-200"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center text-slate-400">
            <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-lg font-bold text-amber-400 shadow-inner">
              BBK
            </div>
            <p className="text-sm font-bold text-slate-200">Foto Unit BBKitchen</p>
            <p className="mt-1 text-xs text-slate-400 line-clamp-2 max-w-xs">{productName}</p>
            <span className="mt-2 inline-block rounded-full bg-slate-800 px-3 py-1 text-[10px] font-medium text-emerald-400 border border-slate-700">
              Cek Foto/Video Live via WhatsApp
            </span>
          </div>
        )}

        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1.5 text-[10px] font-black text-white shadow-md sm:text-xs ${
            status === 'READY' ? 'bg-emerald-600' : 'bg-slate-800 border border-slate-700'
          }`}
        >
          ● {status === 'READY' ? 'READY SIAP KIRIM' : status}
        </span>
      </div>

      {/* Thumbnails Row */}
      {validImages.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
          {validImages.map((image, index) => {
            const isThumbFailed = !image.src || failedImages[image.src];
            return (
              <button
                key={`${image.src}-${index}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`Lihat foto ${index + 1}`}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                  selectedIndex === index
                    ? 'border-emerald-500 ring-2 ring-emerald-400/40'
                    : 'border-slate-200 opacity-70 hover:opacity-100'
                }`}
              >
                {!isThumbFailed ? (
                  <img
                    src={image.src}
                    alt={image.alt || `${productName} thumbnail ${index + 1}`}
                    onError={() => setFailedImages((prev) => ({ ...prev, [image.src]: true }))}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-800 text-[10px] font-bold text-slate-400">
                    Foto {index + 1}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
