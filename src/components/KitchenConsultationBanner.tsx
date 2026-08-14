import React from 'react';
import { Phone, UtensilsCrossed, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { generateWhatsAppConsultationLink } from '../utils/formatters';

export const KitchenConsultationBanner: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white py-10 px-4 border-y border-amber-500/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-xs font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Layanan Konsultasi Pemilihan Alat Dapur Usaha</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
            Bingung Menghitung Kapasitas Alat & Daya Listrik Dapur?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Tim BBKitchen siap membantu Anda mencocokkan peralatan dapur komersial sesuai target menu, kapasitas porsi harian, dan ketersediaan daya listrik/gas di lokasi usaha Anda (Restoran, Cafe, Bakery, Catering, hingga Dapur Program Makan Bergizi Gratis/MBG).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Estimasi Sizing Alat Sesuai Menu</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Optimasi Anggaran Modal Dapur</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Rekomendasi Unit Ready Siap Pakai</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
          <div className="bg-slate-950/70 border border-slate-700 p-5 rounded-2xl space-y-3 w-full backdrop-blur-xs">
            <div className="text-xs text-slate-300 font-medium">
              Konsultasi langsung dengan tim teknis & sourcing:
            </div>
            <a
              href={generateWhatsAppConsultationLink('Konsultasi Kebutuhan & Sizing Alat Dapur Usaha')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950 flex items-center justify-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Diskusi Kebutuhan via WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </a>
            <div className="text-[11px] text-slate-400 text-center">
              Gratis konsultasi • Respon cepat di jam kerja
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
