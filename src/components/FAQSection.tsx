import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'BBKitchen menjual unit bekas atau baru?',
    a: 'Fokus utama BBKitchen adalah peralatan dapur restoran bekas komersial. Namun, beberapa unit baru juga tersedia, termasuk unit hasil produksi baru dari workshop BBKitchen.',
  },
  {
    q: 'Bisa beli satuan atau harus borongan?',
    a: 'Bisa keduanya. Anda dapat membeli unit satuan maupun beberapa unit sekaligus untuk kebutuhan dapur restoran, cafe, katering, dan usaha F&B.',
  },
  {
    q: 'Bisa datang langsung untuk melihat unit?',
    a: 'Bisa. Karena stok dan lokasi unit dapat berubah dengan cepat, sebaiknya hubungi BBKitchen terlebih dahulu untuk memastikan unit yang ingin dilihat masih tersedia dan menentukan waktu kunjungan.',
  },
  {
    q: 'Bagaimana cara mengetahui unit masih READY atau sudah SOLD?',
    a: 'Status pada katalog menjadi acuan awal. Namun, karena unit bekas dapat terjual dengan cepat, sebaiknya konfirmasi kembali melalui WhatsApp sebelum melakukan perjalanan atau pembayaran.',
  },
  {
    q: 'Kalau unit yang saya cari sudah SOLD, apakah ada unit serupa?',
    a: 'Bisa. Kirimkan kode unit, nama alat, atau spesifikasi yang Anda cari. Tim BBKitchen dapat membantu mengecek unit lain yang tersedia atau yang baru masuk.',
  },
  {
    q: 'Apakah BBKitchen melayani pengiriman luar kota?',
    a: 'Ya. Pengiriman dapat disesuaikan dengan ukuran, berat, lokasi tujuan, dan jenis unit. Untuk unit tertentu, pengemasan dan metode pengiriman perlu disepakati terlebih dahulu agar aman sampai tujuan.',
  },
  {
    q: 'Saya punya peralatan resto bekas. Bisa saya jual ke BBKitchen?',
    a: 'Bisa. BBKitchen menerima penawaran peralatan dapur restoran bekas dari pemilik usaha yang ingin menjual unit satuan maupun borongan, terutama saat restoran melakukan upgrade, pindah, atau tutup operasional.',
  },
  {
    q: 'Apakah BBKitchen juga bisa produksi unit baru?',
    a: 'Ya. Selain menjual unit bekas restoran, BBKitchen memiliki workshop untuk produksi baru sesuai kebutuhan tertentu. Konsultasikan kebutuhan ukuran, fungsi, material, dan jumlah unit yang dibutuhkan.',
  },
  {
    q: 'Apakah BBKitchen menyediakan paket Dapur MBG?',
    a: 'Ya. BBKitchen juga menyediakan pilihan dan informasi paket kebutuhan Dapur MBG. Hubungi kami untuk mendapatkan katalog dan pembahasan kebutuhan dapur sesuai skala operasional.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="bg-white py-12 px-4 border-b border-slate-200">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>Pertanyaan Umum</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Sebelum Membeli atau Menjual Unit
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Jawaban singkat untuk pertanyaan yang paling sering muncul seputar unit bekas restoran, unit baru, penjualan unit, dan kebutuhan dapur komersial.
          </p>
        </div>

        <div className="mt-7 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.q} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900">{faq.q}</span>
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
