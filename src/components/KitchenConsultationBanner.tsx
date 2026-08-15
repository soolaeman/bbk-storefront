import React from 'react';
import { ArrowRight, Factory, PackageCheck, Phone, Store, UtensilsCrossed } from 'lucide-react';
import { generateWhatsAppConsultationLink } from '../utils/formatters';

export const KitchenConsultationBanner: React.FC = () => {
  const sellUnitLink = generateWhatsAppConsultationLink(
    'Saya mau jual peralatan resto ke BBKitchen. Saya ingin info proses jual unit.',
  );

  const productionLink = generateWhatsAppConsultationLink(
    'Saya ingin produksi peralatan dapur baru melalui workshop BBKitchen.',
  );

  return (
    <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white py-10 px-4 border-y border-amber-500/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-300">
              <Store className="w-3.5 h-3.5 text-amber-400" />
              <span>Jual Unit • Borongan • Produksi Baru</span>
            </div>

            <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
              Peralatan Resto Bekas untuk Hemat Modal, Produksi Baru untuk Kebutuhan Khusus.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              BBKitchen menjual peralatan dapur bekas untuk restoran, cafe, catering, bakery, hotel,
              dan usaha kuliner. Bisa beli satuan maupun borongan. Tidak menemukan unit yang cocok?
              Workshop BBKitchen juga melayani produksi baru.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-3">
                <PackageCheck className="w-5 h-5 text-emerald-400 mb-2" />
                <p className="text-xs font-bold text-slate-100">Unit Bekas</p>
                <p className="text-[11px] text-slate-400 mt-1">Cek stok yang tersedia di katalog.</p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-3">
                <UtensilsCrossed className="w-5 h-5 text-amber-400 mb-2" />
                <p className="text-xs font-bold text-slate-100">Satuan / Borongan</p>
                <p className="text-[11px] text-slate-400 mt-1">Sesuaikan kebutuhan dapur usaha.</p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-3">
                <Factory className="w-5 h-5 text-purple-400 mb-2" />
                <p className="text-xs font-bold text-slate-100">Produksi Baru</p>
                <p className="text-[11px] text-slate-400 mt-1">Pesan kebutuhan stainless melalui workshop.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            <a
              href={sellUnitLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-950/70 border border-slate-700 hover:border-amber-400/60 p-4 rounded-2xl transition-all"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-amber-300 font-bold">Punya Barang Bekas?</p>
                  <h3 className="text-base font-black text-white mt-1">Jual Unit ke BBKitchen</h3>
                  <p className="text-[11px] text-slate-400 mt-1">Satuan atau borongan • WA 0851 2200 1051</p>
                </div>
                <ArrowRight className="w-5 h-5 text-amber-400 shrink-0 transition-transform group-hover:translate-x-1" />
              </div>
            </a>

            <a
              href={productionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-emerald-700/20 border border-emerald-500/30 hover:border-emerald-400/70 p-4 rounded-2xl transition-all"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-emerald-300 font-bold">Punya Kebutuhan Baru?</p>
                  <h3 className="text-base font-black text-white mt-1">Mau Produksi Baru?</h3>
                  <p className="text-[11px] text-slate-400 mt-1">Kebutuhan stainless & kitchen equipment via workshop.</p>
                </div>
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
              </div>
            </a>
          </div>
        </div>

        <div className="mt-7 pt-5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-slate-200">Kebutuhan Dapur Program MBG?</p>
            <p className="text-[11px] text-slate-400 mt-1 max-w-2xl">
              Tersedia opsi unit bekas untuk efisiensi anggaran dan produksi baru melalui workshop untuk kebutuhan dapur produksi.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-amber-300">Tanya kebutuhan & ketersediaan unit →</span>
        </div>
      </div>
    </section>
  );
};
