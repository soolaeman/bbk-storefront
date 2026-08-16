import React from 'react';
import { MessageSquareQuote, Star, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Rio',
    company: 'Titik Terang Coffee',
    text: 'Sangat terbantu buat set up kitchen dari kosongan. Pelayanannya asyik dan informatif, diajak diskusi ukuran meja, kompor, sampai exhaust hood dipasin sama luas ruangan. Pas kebetulan ada stok barang yang bentrok, tim BBKitchen langsung kasih solusi unit pengganti yang lebih oke tanpa nambah biaya. Pengiriman juga transparan via Lalamove pakai live location & video update pas loading. Sukses terus BBKitchen!',
  },
  {
    name: 'Arief Nur Rahman',
    company: 'PT Bahari Mega Prestasi',
    text: 'Sempat niat mau ke lokasi langsung, tapi jadwalnya gak ketemu. Akhirnya coba video call, dan barang ditunjukin satu-satu, jelas banget. Kita pilih 3 meja berbagai ukuran, dan pas barang nyampe ke kantor, sesuai persis kayak yang di video. Lalamove kita yang pesen sendiri, tapi Mas Angga dan tim bantuin kawal prosesnya, jadi tetap lancar.',
  },
  {
    name: 'Hadi',
    company: 'Owner SPPG Jogja',
    text: 'Sangat terbantu cari alat Kwali Range & Deep Fryer untuk dapur MBG di sini. Kondisinya mantap, normal, dan sudah bersih sebelum dikirim, sampai langsung. Sellernya solutif, paham teknis, dan dicarikan truk balikan ke Jogja.',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-white py-12 px-4 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8">
          <div className="text-center lg:text-left max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">
              <MessageSquareQuote className="w-3.5 h-3.5 text-amber-600" />
              <span>Kata Mereka</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Pengalaman Customer BBKitchen</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Cerita langsung dari customer yang sudah bertransaksi dan menggunakan layanan BBKitchen.
            </p>
          </div>

          <div className="md:hidden flex items-center justify-center gap-1.5 text-[10px] font-semibold text-slate-400 -mt-2">
            <span>Geser untuk lihat cerita lainnya</span>
            <ArrowRight className="w-3 h-3" />
          </div>

          <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-2 md:pb-0 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {testimonials.map((testimonial) => (
              <article
                key={`${testimonial.name}-${testimonial.company}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-col min-w-0 w-[88%] max-w-[88%] flex-[0_0_88%] snap-start md:w-auto md:max-w-none md:flex-none md:min-w-0 md:shrink md:snap-none"
              >
                <div className="flex items-center gap-1 text-amber-500 mb-4" aria-label="5 dari 5 bintang">
                  {[0, 1, 2, 3, 4].map((star) => <Star key={star} className="w-4 h-4 fill-current" />)}
                </div>

                <blockquote className="text-sm text-slate-700 leading-relaxed flex-1 break-words">
                  “{testimonial.text}”
                </blockquote>

                <div className="mt-5 pt-4 border-t border-slate-200">
                  <p className="text-sm font-extrabold text-slate-900">{testimonial.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{testimonial.company}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};