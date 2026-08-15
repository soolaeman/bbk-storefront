import React from 'react';
import { Camera, MessageSquareQuote, Star } from 'lucide-react';
import { LocationSection } from './LocationSection';

export const TestimonialsSection: React.FC = () => {
  const testimonialSlots = [
    { label: 'Testimoni Customer 1', note: 'Ganti dengan screenshot WhatsApp, review, atau foto customer asli.' },
    { label: 'Testimoni Customer 2', note: 'Ganti dengan bukti transaksi atau feedback customer asli.' },
    { label: 'Testimoni Customer 3', note: 'Ganti dengan testimonial atau foto unit setelah sampai.' },
  ];

  return (
    <>
      <section className="bg-white py-12 px-4 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">
              <MessageSquareQuote className="w-3.5 h-3.5 text-amber-600" />
              <span>Kata Mereka</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Pengalaman Customer BBKitchen</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Kami hanya menampilkan pengalaman customer yang benar-benar ada. Bukti chat, review, dan foto asli bisa ditambahkan di sini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonialSlots.map((slot) => (
              <article key={slot.label} className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 min-h-[220px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4" aria-label="Slot rating customer">
                    {[0, 1, 2, 3, 4].map((star) => <Star key={star} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-sm font-bold text-slate-800">{slot.label}</p>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">{slot.note}</p>
                </div>
                <div className="mt-5 rounded-xl border border-slate-200 bg-white px-4 py-3 flex items-center gap-2 text-[11px] text-slate-500">
                  <Camera className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Slot bukti testimonial — tinggal replace dengan asset asli.</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LocationSection />
    </>
  );
};
