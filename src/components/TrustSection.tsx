'use client';

import React from 'react';
import { Award, CheckCircle2, Eye, Truck, Wrench } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const stories = [
    {
      src: '/images/people/bbkitchen-team-thumbs-up.webp',
      alt: 'Tim BBKitchen dengan kaos BBKitchen',
      eyebrow: 'BBKITCHEN SIAP BANTU',
      title: 'Mulai dari kebutuhan dapurnya, bukan sekadar barangnya.',
      desc: 'Ceritakan kebutuhan usaha Anda. Kami bantu mengarahkan pilihan unit berdasarkan fungsi, ukuran ruang, dan kebutuhan operasional.',
    },
    {
      src: '/images/people/bbkitchen-chef-presenting.webp',
      alt: 'Tim BBKitchen dalam pakaian chef',
      eyebrow: 'PAHAM DUNIA DAPUR',
      title: 'Kami bicara alat dengan sudut pandang operasional.',
      desc: 'Meja, kompor, exhaust, fryer, sampai kebutuhan dapur MBG — keputusan alat sebaiknya disesuaikan dengan menu dan alur kerja di lapangan.',
    },
    {
      src: '/images/people/bbkitchen-chef-pointing.webp',
      alt: 'Tim BBKitchen memberikan arahan',
      eyebrow: 'BISA DIAJAK DISKUSI',
      title: 'Belum yakin unit mana yang cocok? Tanyakan dulu.',
      desc: 'Sebelum transaksi, Anda bisa diskusi, minta detail kondisi, cek lokasi, atau video call untuk melihat unit secara langsung.',
    },
    {
      src: '/images/people/bbkitchen-chef-trust.webp',
      alt: 'Tim BBKitchen dengan pakaian chef',
      eyebrow: 'TRANSPARAN & SOLUTIF',
      title: 'Yang penting bukan cuma jual — tapi solusi sampai beres.',
      desc: 'Kami bantu dari pemilihan unit sampai koordinasi pengiriman, supaya proses pembelian peralatan dapur terasa lebih jelas dan aman.',
    },
  ];

  const pillars = [
    {
      icon: <Wrench className="w-5 h-5 text-amber-600" />,
      title: 'Unit & Kondisi Transparan',
      desc: 'Lihat foto, detail kondisi, lokasi, dan informasi unit sebelum membeli.',
    },
    {
      icon: <Eye className="w-5 h-5 text-blue-600" />,
      title: 'Bisa Cek Langsung',
      desc: 'Hubungi kami untuk memastikan lokasi dan ketersediaan unit sebelum datang.',
    },
    {
      icon: <Truck className="w-5 h-5 text-emerald-600" />,
      title: 'Satuan atau Borongan',
      desc: 'Mau ambil satu unit atau beberapa unit sekaligus, keduanya bisa.',
    },
  ];

  return (
    <section className="bg-slate-50 py-12 px-4 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Di Balik BBKitchen</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Bukan cuma jual unit. Kami bantu cari solusi dapurnya.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Kenali cara kami bekerja — lewat diskusi, pengecekan unit, sampai membantu kebutuhan pengiriman.
          </p>
        </div>

        <div className="space-y-8 sm:space-y-12">
          {stories.map((story, index) => (
            <article
              key={story.src}
              className={`grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-12 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm ${index % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''}`}
            >
              <div className="relative h-[360px] sm:h-[430px] lg:h-[500px] bg-slate-100 flex items-end justify-center overflow-hidden">
                <img
                  src={story.src}
                  alt={story.alt}
                  className="h-full w-full object-contain object-bottom"
                />
              </div>
              <div className="p-7 sm:p-9 lg:p-12 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900/5 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{story.eyebrow}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {story.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {story.desc}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto space-y-2 pt-14 pb-7">
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
