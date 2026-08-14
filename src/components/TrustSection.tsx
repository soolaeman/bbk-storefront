import React from 'react';
import { ShieldCheck, Eye, BadgePercent, Truck, Award, Wrench } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const pillars = [
    {
      icon: <Wrench className="w-6 h-6 text-amber-500" />,
      title: 'Uji Fungsi & QC Menyeluruh',
      desc: 'Setiap burner gas, kompresor pendingin, motor dinamo mixer, dan panel digital diuji teknisi sebelum diiklankan.'
    },
    {
      icon: <Eye className="w-6 h-6 text-blue-500" />,
      title: '100% Foto & Kondisi Transparan',
      desc: 'Kami menampilkan foto asli unit dengan detail fisik apa adanya, riwayat pemakaian sebelumnya, dan rating kondisi riil.'
    },
    {
      icon: <BadgePercent className="w-6 h-6 text-emerald-500" />,
      title: 'Hemat Modal Dapur 50% - 70%',
      desc: 'Membeli unit komersial berkualitas menghemat modal awal secara signifikan, menjaga arus kas usaha kuliner Anda tetap aman.'
    },
    {
      icon: <Truck className="w-6 h-6 text-purple-500" />,
      title: 'Bisa Cek Langsung & Kirim Se-Indonesia',
      desc: 'Calon pembeli bebas datang memeriksa langsung fisik unit, atau dikirim via armada pickup lokal dan ekspedisi kargo aman.'
    }
  ];

  return (
    <section className="bg-slate-50 py-12 px-4 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Standar Kualitas BBKitchen</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Mengapa Pelaku Usaha Kuliner Memilih BBKitchen?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Kami memahami risiko membeli peralatan dapur bekas. Oleh karena itu, BBKitchen menerapkan kurasi dan pengujian fungsional yang ketat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-3"
            >
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 inline-block">
                {pillar.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
