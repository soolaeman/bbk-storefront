import React from 'react';
import { Phone, MapPin, Mail, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { generateWhatsAppConsultationLink } from '../utils/formatters';
import { EquipmentCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: EquipmentCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Value summary */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-base">
                BB
              </div>
              <span className="text-lg font-extrabold text-white">
                BB<span className="text-amber-400">Kitchen</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              <strong>Bukan Baru Kitchen (BBKitchen)</strong> adalah platform kurasi dan katalog peralatan dapur komersial bekas berkualitas dan rekondisi teruji untuk restoran, cafe, bakery, catering, dan UMKM kuliner di Indonesia.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Semua Unit Diuji Fungsi Teknisi</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Kategori Terpopuler
            </h4>
            <ul className="space-y-2">
              {[
                'Kompor & Burner',
                'Deep Fryer',
                'Chiller & Freezer',
                'Oven & Bakery',
                'Stainless Fabrication',
                'Mesin Pemroses Makanan'
              ].map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat as EquipmentCategory);
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    • {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Consultation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Kontrol Hotline & Layanan
            </h4>
            <div className="space-y-2.5">
              <a
                href={generateWhatsAppConsultationLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">WhatsApp Hotline</div>
                  <div className="text-xs">+62 812-8888-9999</div>
                </div>
              </a>

              <div className="flex items-start gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-slate-300">Jam Operasional Survei:</div>
                  <div>Senin - Sabtu: 08.30 - 17.30 WIB</div>
                </div>
              </div>

              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-slate-300">Cakupan Lokasi Unit:</div>
                  <div>Jakarta, Tangerang, Bekasi, Surabaya & Kirim Nasional</div>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Guarantees */}
          <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Standar Transaksi Aman
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              BBKitchen memprioritaskan transparansi penuh. Kami menyarankan verifikasi fisik langsung di lokasi sebelum serah terima. Semua konfirmasi ketersediaan diotorisasi langsung oleh tim BBKitchen.
            </p>
            <div className="text-[11px] text-slate-400 pt-1">
              ✓ Garansi Uji Fungsi 7 Hari<br />
              ✓ Transaksi Resmi & Terverifikasi
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} BBKitchen (Bukan Baru Kitchen Indonesia). All rights reserved.
          </div>
          <div className="text-slate-400">
            Katalog Peralatan Dapur Komersial Restoran, Cafe, Bakery & Catering
          </div>
        </div>

      </div>
    </footer>
  );
};
