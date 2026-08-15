'use client';

import React, { useState } from 'react';
import { Award, Camera, ChevronLeft, ChevronRight, Eye, Truck, Wrench } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const [galleryIndex, setGalleryIndex] = useState(0);

  const gallerySlots = [
    { label: 'Pengiriman Unit', note: 'Ganti dengan foto loading / pickup BBKitchen' },
    { label: 'Unit Siap Dikirim', note: 'Ganti dengan foto unit sebelum berangkat' },
    { label: 'Proses Loading', note: 'Ganti dengan foto proses pengiriman' },
    { label: 'Unit Sampai Lokasi', note: 'Ganti dengan foto barang setelah diterima' },
    { label: 'Aktivitas Workshop', note: 'Ganti dengan foto produksi / pengecekan' },
    { label: 'Aktivitas BBKitchen', note: 'Ganti dengan foto aktivitas terbaru' },
  ];

  const peopleGallery = [
    { src: '/images/people/bbkitchen-team-thumbs-up.webp', alt: 'Tim BBKitchen', title: 'BBKitchen siap bantu kebutuhan dapur Anda.' },
    { src: '/images/people/bbkitchen-chef-presenting.webp', alt: 'Tim BBKitchen dalam pakaian chef', title: 'Paham kebutuhan operasional dapur komersial.' },
    { src: '/images/people/bbkitchen-chef-pointing.webp', alt: 'Tim BBKitchen memberikan arahan', title: 'Bisa diajak diskusi sebelum menentukan unit.' },
    { src: '/images/people/bbkitchen-chef-trust.webp', alt: 'Tim BBKitchen', title: 'Fokus pada solusi, kondisi unit, dan kebutuhan Anda.' },
  ];

  const pillars = [
    {
      icon: <Wrench className="w-5 h-5 text-amber-600" />,
      title: 'Unit & Kondisi Transparan',
      desc: 'Lihat foto, detail kondisi, lokasi, dan informasi unit sebelum membeli.'
    },
    {
      icon: <Eye className="w-5 h-5 text-blue-600" />,
      title: 'Bisa Cek Langsung',
      desc: 'Hubungi kami untuk memastikan lokasi dan ketersediaan unit sebelum datang.'
    },
    {
      icon: <Truck className="w-5 h-5 text-emerald-600" />,
      title: 'Satuan atau Borongan',
      desc: 'Mau ambil satu unit atau beberapa unit sekaligus, keduanya bisa.'
    },
  ];

  const previousGallery = () => {
    setGalleryIndex((current) => (current - 1 + gallerySlots.length) % gallerySlots.length);
  };

  const nextGallery = () => {
    setGalleryIndex((current) => (current + 1) % gallerySlots.length);
  };

  const previousPerson = () => {
    setGalleryIndex((current) => (current - 1 + peopleGallery.length) % peopleGallery.length);
  };

  const nextPerson = () => {
    setGalleryIndex((current) => (current + 1) % peopleGallery.length);
  };

  const activePerson = peopleGallery[galleryIndex % peopleGallery.length];

  return (
    <section className="bg-slate-50 py-12 px-4 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-amber-600" />
            <span>Aktivitas BBKitchen</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Barang Nyata. Siap Dikirim.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Galeri pengiriman, unit, workshop, dan aktivitas BBKitchen. Foto asli tinggal menggantikan slot yang tersedia.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden">
            {[0, 1, 2].map((offset) => {
              const slot = gallerySlots[(galleryIndex + offset) % gallerySlots.length];
              return (
                <div
                  key={`${slot.label}-${galleryIndex}-${offset}`}
                  className="aspect-[4/3] rounded-2xl border border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-center p-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mb-2">
                    <Camera className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-bold text-slate-800">{slot.label}</p>
                  <p className="mt-1 text-xs text-slate-500 max-w-[220px]">{slot.note}</p>
                </div>
              );
            })}
          </div>

          <button type="button" onClick={previousGallery} aria-label="Foto sebelumnya" className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 border border-slate-200 shadow-lg flex items-center justify-center text-slate-800 hover:bg-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button type="button" onClick={nextGallery} aria-label="Foto berikutnya" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 border border-slate-200 shadow-lg flex items-center justify-center text-slate-800 hover:bg-white transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex justify-center gap-1.5 mt-4" aria-label="Navigasi galeri">
            {gallerySlots.map((slot, index) => (
              <button key={slot.label} type="button" onClick={() => setGalleryIndex(index)} aria-label={`Tampilkan ${slot.label}`} className={`h-2 rounded-full transition-all ${index === galleryIndex ? 'w-6 bg-slate-900' : 'w-2 bg-slate-300 hover:bg-slate-400'}`} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 items-center bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="relative min-h-[420px] bg-slate-100 flex items-end justify-center overflow-hidden">
            <img src={activePerson.src} alt={activePerson.alt} className="max-h-[520px] w-auto max-w-full object-contain drop-shadow-xl" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-white/95 border border-slate-200 shadow-lg px-2 py-1.5">
              <button type="button" onClick={previousPerson} aria-label="Foto tim sebelumnya" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-bold text-slate-700 min-w-[54px] text-center">{(galleryIndex % peopleGallery.length) + 1} / {peopleGallery.length}</span>
              <button type="button" onClick={nextPerson} aria-label="Foto tim berikutnya" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-7 sm:p-9 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900/5 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Di Balik BBKitchen</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">Bukan cuma jual unit. Kami bantu cari solusi dapurnya.</h2>
            <p className="text-sm text-slate-600 leading-relaxed">Mulai dari cek kondisi, ukuran, kebutuhan menu, sampai pengiriman, tim BBKitchen siap diajak diskusi supaya pilihan alat lebih masuk akal untuk usaha Anda.</p>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">{activePerson.title}</p>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto space-y-2 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900/5 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Kenapa BBKitchen</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Belanja Peralatan Resto dengan Informasi yang Jelas
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 inline-block">{pillar.icon}</div>
              <h3 className="text-sm font-bold text-slate-900">{pillar.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
