import React from 'react';
import { ArrowRight, FileText, Factory, MessageCircle, PackageCheck, Store, ExternalLink } from 'lucide-react';
import { generateWhatsAppConsultationLink, generateWhatsAppCustomLink } from '../utils/formatters';

const MBG_CATALOG_URL = 'https://drive.google.com/file/d/1z7AQFK96ZgiyVbYAklXcaeULMK_zhbTS/view?pli=1';

export const KitchenConsultationBanner: React.FC = () => {
  const buyUnitLink = generateWhatsAppConsultationLink(
    'Saya mau beli peralatan dapur resto dari BBKitchen. Saya ingin cek unit yang tersedia.',
  );

  const sellUnitLink = generateWhatsAppConsultationLink(
    'Saya mau jual peralatan resto ke BBKitchen. Saya ingin info proses jual unit.',
  );

  const mbgLink = generateWhatsAppCustomLink(
    'Halo Tim BBKitchen, saya ingin bertanya perihal info kebutuhan peralatan dapur MBG dari BBKitchen.',
  );

  const productionLink = generateWhatsAppCustomLink(
    'Halo BBKitchen, mohon info peralatan dapur/restoran custom atau produksi baru',
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white py-10 px-4 border-y border-amber-500/20">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-5">
          <div className="text-center lg:text-left max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-300">
              <Store className="w-3.5 h-3.5 text-amber-400" />
              <span>BBKitchen • Unit Bekas • MBG • Produksi Baru</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-tight mt-3">
              Cari, Jual, atau Produksi Peralatan Dapur Resto &amp; Dapur MBG
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
              Pilih kebutuhan Anda. BBKitchen melayani pembelian unit bekas satuan maupun borongan,
              jual unit bekas, kebutuhan dapur MBG, dan produksi baru melalui workshop.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <a
              href={buyUnitLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-emerald-500/30 bg-emerald-700/15 hover:border-emerald-400/70 p-5 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <PackageCheck className="w-6 h-6 text-emerald-400 mb-3" />
                  <p className="text-[10px] uppercase tracking-[0.16em] text-emerald-300 font-bold">1 • Beli Unit</p>
                  <h3 className="text-lg font-black text-white mt-1">Cari Peralatan Bekas Resto</h3>
                  <p className="text-xs text-slate-400 mt-2">Tersedia unit satuan maupun borongan. Cek katalog untuk melihat stok terbaru.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-emerald-400 shrink-0 transition-transform group-hover:translate-x-1" />
              </div>
              <span className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3.5 py-2.5 text-xs font-bold text-white group-hover:bg-emerald-500 transition-colors">
                <MessageCircle className="w-4 h-4" />
                Tanya via WhatsApp
              </span>
            </a>

            <a
              href={sellUnitLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-amber-500/30 bg-slate-950/70 hover:border-amber-400/70 p-5 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Store className="w-6 h-6 text-amber-400 mb-3" />
                  <p className="text-[10px] uppercase tracking-[0.16em] text-amber-300 font-bold">2 • Jual Unit</p>
                  <h3 className="text-lg font-black text-white mt-1">Jual Peralatan Bekas ke BBKitchen</h3>
                  <p className="text-xs text-slate-400 mt-2">Bisa satuan atau borongan. Hubungi WhatsApp 0851 2200 1051 untuk mulai.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-amber-400 shrink-0 transition-transform group-hover:translate-x-1" />
              </div>
              <span className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3.5 py-2.5 text-xs font-bold text-white group-hover:bg-emerald-500 transition-colors">
                <MessageCircle className="w-4 h-4" />
                Tanya via WhatsApp
              </span>
            </a>

            <div className="group rounded-2xl border border-sky-500/30 bg-sky-700/10 hover:border-sky-400/70 p-5 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <FileText className="w-6 h-6 text-sky-400 mb-3" />
                  <p className="text-[10px] uppercase tracking-[0.16em] text-sky-300 font-bold">3 • Dapur MBG</p>
                  <h3 className="text-lg font-black text-white mt-1">Paket Peralatan Dapur MBG</h3>
                  <p className="text-xs text-slate-400 mt-2">Lihat katalog atau hubungi BBKitchen via WhatsApp untuk kebutuhan peralatan dapur MBG.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-sky-400 shrink-0" />
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <a
                  href={mbgLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3.5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Tanya via WhatsApp
                </a>
                <a
                  href={MBG_CATALOG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-950/50 px-3.5 py-2.5 text-xs font-bold text-sky-200 hover:bg-sky-900/70 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  PDF Katalog Dapur MBG
                </a>
              </div>
            </div>

            <a
              href={productionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-purple-500/30 bg-purple-700/10 hover:border-purple-400/70 p-5 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Factory className="w-6 h-6 text-purple-400 mb-3" />
                  <p className="text-[10px] uppercase tracking-[0.16em] text-purple-300 font-bold">4 • Produksi Baru</p>
                  <h3 className="text-lg font-black text-white mt-1">Produksi Peralatan Dapur Baru</h3>
                  <p className="text-xs text-slate-400 mt-2">Workshop BBKitchen melayani kebutuhan stainless dan kitchen equipment sesuai kebutuhan usaha.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-purple-400 shrink-0 transition-transform group-hover:translate-x-1" />
              </div>
              <span className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3.5 py-2.5 text-xs font-bold text-white group-hover:bg-emerald-500 transition-colors">
                <MessageCircle className="w-4 h-4" />
                Tanya via WhatsApp
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
