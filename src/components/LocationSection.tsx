import React from 'react';
import { ExternalLink, MapPin } from 'lucide-react';

const BBKITCHEN_ADDRESS = 'Perumahan Griya Pamulang 2, Jl. Tulip Raya Blok E1 No.12A RT 004/020, Pondok Benda, Pamulang, Kota Tangerang Selatan, Banten 1534';
const MAP_QUERY = encodeURIComponent(BBKITCHEN_ADDRESS);
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;
const GOOGLE_MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;

export const LocationSection: React.FC = () => {
  return (
    <section className="bg-slate-100 py-12 px-4 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6 items-stretch">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 w-fit px-3 py-1 bg-blue-500/10 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Lokasi BBKitchen</span>
            </div>

            <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900">
              Mau Lihat Unit Langsung?
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Beberapa unit dapat dicek langsung. Hubungi admin terlebih dahulu untuk memastikan stok dan lokasi unit sebelum datang.
            </p>

            <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-xs font-bold text-slate-900">Alamat BBKitchen</p>
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
              title="Lokasi BBKitchen di Tangerang Selatan"
              src={GOOGLE_MAPS_EMBED_URL}
              className="w-full h-full min-h-[320px] lg:min-h-[390px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
