import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { generateWhatsAppSourcingLink } from '../utils/formatters';

interface RequestUnitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestUnitModal: React.FC<RequestUnitModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [category, setCategory] = useState<string>('Kompor & Burner');
  const [nameOrSpec, setNameOrSpec] = useState<string>('');
  const [budgetRange, setBudgetRange] = useState<string>('');
  const [targetCity, setTargetCity] = useState<string>('Jabodetabek');
  const [notes, setNotes] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameOrSpec.trim()) return;

    const url = generateWhatsAppSourcingLink({
      category,
      nameOrSpec,
      budgetRange,
      targetCity,
      notes
    });

    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        id="request-unit-modal"
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto text-slate-800"
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold">Titip Cari Unit Dapur Komersial</h3>
              <p className="text-xs text-slate-400">Tim Sourcing BBKitchen siap bantu cari alat sesuai budget</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Kategori Alat Dapur
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-500 font-medium"
            >
              {CATEGORIES.filter(c => c.name !== 'Semua').map((cat) => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nama Alat / Spesifikasi yang Dicari <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={nameOrSpec}
              onChange={(e) => setNameOrSpec(e.target.value)}
              placeholder="Contoh: Kwali Range 2 Tungku Blower / Mixer 30 Liter Sinmag"
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Estimasi Budget (Rp)
              </label>
              <input
                type="text"
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                placeholder="Contoh: 10 - 15 Juta"
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Kota / Lokasi Dapur Anda
              </label>
              <input
                type="text"
                value={targetCity}
                onChange={(e) => setTargetCity(e.target.value)}
                placeholder="Contoh: Jakarta Barat / Bandung"
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Catatan / Syarat Khusus (Opsional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Misal: Harus listrik 1 phase 220V, butuh garansi uji fungsi, atau siap angkut minggu depan..."
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Bagaimana Proses Sourcing BBKitchen?</span>
            </div>
            <p>
              Formulir ini akan otomatis terhubung ke WhatsApp Sourcing BBKitchen. Jika ada unit masuk dari jaringan resto/supplier yang cocok dengan spesifikasi Anda, tim kami akan segera mengontak Anda dengan foto & penawaran harga.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Batal
            </button>
            <button
              type="submit"
              id="submit-request-sourcing-btn"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Permintaan via WhatsApp</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
