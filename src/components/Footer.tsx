import React from 'react';
import { Phone, MapPin, Clock, Instagram, Facebook, Youtube, ArrowUpRight } from 'lucide-react';
import { generateWhatsAppConsultationLink } from '../utils/formatters';
import { EquipmentCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: EquipmentCategory) => void;
}

const ADDRESS = 'Perumahan Griya Pamulang 2, Jl. Tulip Raya Blok E1 No.12A, Belakang Masjid Al - Kahfi No.020, RT.004, Pd. Benda, Kec. Pamulang, Kota Tangerang Selatan, Banten 15434';
const WHATSAPP = '0851 2200 1051';
const WHATSAPP_CONSULTATION_URL = 'https://wa.me/6285122001051?text=Halo%20Tim%20BBKitchen%2C%20saya%20ingin%20konsultasi%20kebutuhan%20peralatan%20dapur%20komersial%20untuk%20usaha%20saya%20%28Restoran%2FCafe%2FKatering%2FBakery%2FMBG%20Kitchen%29.%0A%0ABisa%20dibantu%20rekomendasi%20alat%20yang%20sesuai%20menu%20dan%20estimasi%20budget%20modal%20kami%3F%20Terima%20kasih.';
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=BBKitchen%20-%20Sentra%20Peralatan%20Dapur%20Restoran%20Bekas%20Jakarta%20%7C%20Bukan%20Baru%20Kitchen';
const MBG_CATALOG_URL = 'https://drive.google.com/file/d/1z7AQFK96ZgiyVbYAklXcaeULMK_zhbTS/view?pli=1';
const MBG_WHATSAPP_URL = 'https://wa.me/6285122001051?text=Halo%20BBKitchen%2C%20saya%20ingin%20minta%20info%20paket%20Dapur%20MBG.';

const socialLinks = [
  { label: 'YouTube Shorts', href: 'https://www.youtube.com/shorts/_uzgdL_JhXA', icon: <Youtube className="w-4 h-4" /> },
  { label: 'TikTok', href: 'https://www.tiktok.com/@bukanbarukitchen.com/photo/7547192180746767623', icon: <span className="text-sm font-black leading-none">♪</span> },
  { label: 'Instagram', href: 'https://www.instagram.com/bukanbarukitchen/', icon: <Instagram className="w-4 h-4" /> },
  { label: 'Threads', href: 'https://www.threads.com/@bukanbarukitchen', icon: <span className="text-sm font-black leading-none">@</span> },
  { label: 'Facebook', href: 'https://www.facebook.com/bukanbarukitchens', icon: <Facebook className="w-4 h-4" /> },
  { label: 'Pinterest', href: 'https://id.pinterest.com/bukanbarukitchen/', icon: <span className="text-sm font-black leading-none">P</span> },
];

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center">
              <a href="/" aria-label="BBKitchen — Home" className="inline-flex items-center rounded-lg bg-white px-3 py-2">
                <img src="/bbkitchen-logo.webp" alt="BBKitchen — Bukan Baru Kitchen — Sentra Barang Bekas Restoran" className="h-8 w-auto max-w-[190px] object-contain sm:h-9 sm:max-w-[220px]" />
              </a>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              <strong>BBKitchen</strong> fokus menjual peralatan dapur restoran bekas komersial, satuan maupun borongan. Beberapa unit baru dan produksi baru juga tersedia dari workshop BBKitchen.
            </p>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Untuk restoran, cafe, bakery, catering, usaha F&amp;B, maupun kebutuhan dapur komersial lainnya.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Layanan BBKitchen</h4>
            <ul className="space-y-2.5">
              <li><a href="/catalog" className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors">Beli Unit <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href={generateWhatsAppConsultationLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors">Jual Unit <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href={MBG_CATALOG_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors">Dapur MBG <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href={MBG_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors">Tanya Paket MBG <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href={generateWhatsAppConsultationLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors">Produksi Baru <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors">Lokasi <ArrowUpRight className="w-3 h-3" /></a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Hubungi BBKitchen</h4>
            <div className="space-y-3">
              <a href={generateWhatsAppConsultationLink()} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-slate-300 hover:text-emerald-400 transition-colors">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">WhatsApp</div>
                  <div className="text-xs">{WHATSAPP}</div>
                </div>
              </a>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-slate-400 hover:text-blue-300 transition-colors">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-slate-300">Lokasi BBKitchen</div>
                  <div className="leading-relaxed">{ADDRESS}</div>
                </div>
              </a>
              <div className="flex items-start gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-slate-300">Jam operasional</div>
                  <div>Senin - Sabtu: 08.30 - 17.30 WIB</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Konfirmasi sebelum datang.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div>
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Butuh Unit?</h4>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">Cek katalog, tanyakan kode unit, atau hubungi BBKitchen untuk memastikan stok terbaru.</p>
            </div>
            <a href={WHATSAPP_CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors">
              <Phone className="w-4 h-4" />
              Tanya via WhatsApp
            </a>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Ikuti BBKitchen</p>
              <div className="grid grid-cols-6 gap-2">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} title={social.label} className="aspect-square rounded-lg border border-slate-700 bg-slate-900 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-800 transition-colors">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>© {new Date().getFullYear()} BBKitchen. All rights reserved.</div>
          <div>Peralatan Dapur Bekas Resto Komersial • Unit Baru • Produksi Baru</div>
        </div>
      </div>
    </footer>
  );
};