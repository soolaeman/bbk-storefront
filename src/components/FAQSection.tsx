import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Apakah saya bisa datang langsung untuk survei dan cek fisik unit?',
      a: 'Tentu saja sangat bisa. Kami sangat menganjurkan calon pembeli untuk survei dan tes fungsi secara langsung ke lokasi unit berada (tersedia di Jakarta Barat, Tangerang, Bekasi, Surabaya, dll sesuai tag lokasi pada tiap produk). Silakan hubungi admin kami via WhatsApp untuk membuat janji temu survei.'
    },
    {
      q: 'Bagaimana garansi fungsi untuk unit bekas atau rekondisi di BBKitchen?',
      a: 'Setiap unit yang berstatus READY telah melalui tahap QC teknisi (kebocoran gas, kestabilan suhu dingin kompresor, dan putaran motor dinamo). Kami memberikan garansi tes fungsi selama 7 hari sejak unit diterima untuk memastikan alat bekerja sesuai kesepakatan.'
    },
    {
      q: 'Bagaimana prosedur pengiriman untuk lokasi di luar kota atau luar Jabodetabek?',
      a: 'Untuk area Jabodetabek, pengiriman dapat menggunakan armada pickup online (Deliveree, Lalamove, atau armada toko). Untuk luar kota/pulau (seperti Bandung, Semarang, Surabaya, Bali, Sumatera), unit akan dipacking kayu aman dan dikirim menggunakan ekspedisi kargo terpercaya (KIB, Indah Cargo, Dakota, dll).'
    },
    {
      q: 'Kenapa ada beberapa produk yang tidak mencantumkan harga (Tanyakan Harga)?',
      a: 'Sebagian unit merupakan barang titip jual ex-proyek, unit langka impor (seperti Rational/Hoshizaki), atau barang yang baru masuk tahap inspeksi di mana harga final menyesuaikan kesepakatan kondisi aksesoris dan opsi garansi. Anda dapat langsung klik tombol "Cek Harga WA" untuk mendapatkan penawaran terbaik.'
    },
    {
      q: 'Apakah saya bisa menjual atau titip lelang peralatan dapur resto saya yang sudah tidak terpakai?',
      a: 'Bisa. Jika Anda memiliki restoran, cafe, atau katering yang melakukan penutupan/upgrade alat dan ingin menjual borongan atau satuan, tim sourcing BBKitchen siap membantu melakukan taksasi dan penawaran langsung.'
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-white py-12 px-4 border-b border-slate-200">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>Tanya Jawab Seputar Layanan</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
        </div>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 bg-slate-50 hover:bg-slate-100/80 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
