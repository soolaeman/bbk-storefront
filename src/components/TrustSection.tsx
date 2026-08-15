import React from 'react';
import { Award, Camera, Eye, Truck, Wrench } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const gallerySlots = [
    { label: 'Pengiriman Unit', note: 'Ganti dengan foto loading / pickup BBKitchen' },
    { label: 'Unit Siap Dikirim', note: 'Ganti dengan foto unit sebelum berangkat' },
    { label: 'Proses Loading', note: 'Ganti dengan foto proses pengiriman' },
    { label: 'Unit Sampai Lokasi', note: 'Ganti dengan foto barang setelah diterima' },
    { label: 'Aktivitas Workshop', note: 'Ganti dengan foto produksi / pengecekan' },
    { label: 'Aktivitas BBKitchen', note: 'Ganti dengan foto aktivitas terbaru' },
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
            Galeri ini menjadi tempat foto pengiriman, unit, workshop, dan aktivitas BBKitchen. Foto asli tinggal menggantikan slot yang tersedia.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {gallerySlots.map((slot) => (
            <div
              key={slot.label}
              className="aspect-[4/3] rounded-2xl border border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-center p-4"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mb-2">
                <Camera className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-800">{slot.label}</p>
              <p className="mt-1 text-[10px] sm:text-xs text-slate-500 max-w-[180px]">{slot.note}</p>
            </div>
          ))}
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
