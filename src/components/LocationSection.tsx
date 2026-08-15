import React from 'react';
import { ExternalLink, MapPin } from 'lucide-react';

const BBKITCHEN_NAME = 'BBKitchen - Sentra Peralatan Dapur Restoran Bekas Jakarta | Bukan Baru Kitchen';
const BBKITCHEN_ADDRESS = 'Perumahan Griya Pamulang 2, Jl. Tulip Raya Blok E1 No.12A, Belakang Masjid Al - Kahfi No.020, RT.004, Pd. Benda, Kec. Pamulang, Kota Tangerang Selatan, Banten 15434';
const GOOGLE_MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=BBKitchen%20-%20Sentra%20Peralatan%20Dapur%20Restoran%20Bekas%20Jakarta%20%7C%20Bukan%20Baru%20Kitchen';
const GOOGLE_MAPS_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.491414547599!2d106.70220356838789!3d-6.330316447898614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ef825d687123%3A0x8b754a5fb317e49e!2sBBKitchen%20-%20Sentra%20Peralatan%20Dapur%20Restoran%20Bekas%20Jakarta%20%7C%20Bukan%20Baru%20Kitchen!5e0!3m2!1sen!2sid!4v1786814666642!5m2!1sen!2sid';

export const LocationSection: React.FC = () => {
  return (
    <section className="bg-slate-100 py-12 px-4 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden grid grid-cols-1 lg:grid-cols-[0.8fr_1fr_0.35fr] gap-6 items-stretch">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 w-fit px-3 py-1 bg-blue-500/10 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Lokasi BBKitchen</span>
            </div>

            <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900">
              Mau Lihat Unit Langsung?
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Unit cepat berputar. Hubungi kami sebelum datang agar kami bisa cek ketersediaan dan lokasi unit untuk Anda.
            </p>

            <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-xs font-bold text-slate-900">Lokasi BBKitchen</p>
              <p className="mt-1 text-xs font-bold text-slate-700 leading-relaxed">{BBKITCHEN_NAME}</p>
            </div>

            <div className="mt-4 rounded-xl bg-white border border-slate-200 p-4">
              <p className="text-xs font-bold text-slate-900">Alamat</p>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">{BBKITCHEN_ADDRESS}</p>
            </div>

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-2 w-full sm:w-fit px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Buka di Google Maps
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="min-h-[320px] lg:min-h-[390px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <iframe
              title="Lokasi BBKitchen di Google Maps"
              src={GOOGLE_MAPS_EMBED_URL}
              className="w-full h-full min-h-[320px] lg:min-h-[390px] border-0"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          <div className="relative min-h-[260px] lg:min-h-[390px] overflow-hidden flex items-end justify-end">
            <img
              src="/images/people/bbkitchen-chef-pointing.webp"
              alt="Chef BBKitchen menunjuk ke lokasi"
              className="absolute bottom-0 right-0 max-h-[85%] w-auto object-contain object-bottom z-10 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};