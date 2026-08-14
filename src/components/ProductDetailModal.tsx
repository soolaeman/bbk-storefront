import React, { useState } from 'react';
import { Product } from '../types';
import { formatRupiah, generateWhatsAppProductLink, WHATSAPP_NUMBER } from '../utils/formatters';
import { 
  X, 
  Phone, 
  MapPin, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Truck, 
  Video, 
  Calendar, 
  Info,
  Copy,
  Share2,
  Check,
  Wrench,
  AlertCircle
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  isAdminMode: boolean;
  onToggleStatus?: (productId: string, newStatus: 'READY' | 'SOLD') => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isAdminMode,
  onToggleStatus
}) => {
  if (!product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const isSold = product.status === 'SOLD';
  const hasPrice = product.price !== null && product.price !== undefined;

  const handleCopyInfo = () => {
    const text = `${product.name} (SKU: ${product.sku})\nKondisi: ${product.condition} (${product.conditionRating}/10)\nHarga: ${formatRupiah(product.price)}\nLokasi: ${product.location}\nInfo lengkap di BBKitchen`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        id="product-detail-modal"
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
              {product.sku}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              {product.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="detail-copy-info-btn"
              onClick={handleCopyInfo}
              className="px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
              title="Salin ringkasan unit"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin Info'}</span>
            </button>

            <button
              type="button"
              id="detail-close-btn"
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {/* Main Hero Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Gallery Column */}
            <div className="md:col-span-6 space-y-3">
              <div className="relative aspect-[4/3] bg-slate-900 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover ${isSold ? 'grayscale contrast-125' : ''}`}
                />
                
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  {isSold ? (
                    <span className="px-3 py-1 rounded-lg bg-slate-950/90 text-white text-xs font-extrabold border border-slate-700 shadow-md">
                      TERJUAL / SOLD
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-extrabold shadow-md flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                      READY SIAP KIRIM
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-slate-950/80 text-amber-300 text-xs font-semibold backdrop-blur-xs">
                  Foto Asli Unit Terkurasi
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImageIndex === idx
                          ? 'border-amber-500 ring-2 ring-amber-400/40'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Inspection Trust Banner */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900 space-y-0.5">
                  <strong className="font-bold">Garansi Uji Fungsi 7 Hari</strong>
                  <p className="text-emerald-800 leading-snug">
                    Setiap unit melalui checklist pengujian teknisi. Bisa tes langsung sebelum pelunasan atau video call demonstrasi unit.
                  </p>
                </div>
              </div>
            </div>

            {/* Info & Pricing Column */}
            <div className="md:col-span-6 space-y-4 flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {product.brand} • {product.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
                    Kondisi: {product.condition} ({product.conditionRating}/10)
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {product.name}
                </h2>

                {/* Price box */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-baseline justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {hasPrice ? 'Harga Penawaran BBKitchen' : 'Status Harga'}
                    </div>
                    <div className="text-2xl font-black text-slate-950">
                      {formatRupiah(product.price)}
                    </div>
                  </div>

                  {product.originalPriceEstimate && hasPrice && (
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Estimasi Baru</div>
                      <div className="text-sm font-semibold text-slate-400 line-through">
                        {formatRupiah(product.originalPriceEstimate)}
                      </div>
                      <div className="text-xs font-bold text-emerald-600">
                        Hemat ±{Math.round((1 - (product.price! / product.originalPriceEstimate)) * 100)}%
                      </div>
                    </div>
                  )}
                </div>

                {/* Location & usage history */}
                <div className="space-y-2 text-xs text-slate-600 bg-white border border-slate-200 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                    <span><strong>Lokasi Fisik Unit:</strong> {product.location}</span>
                  </div>
                  {product.previousUsage && (
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-600 shrink-0" />
                      <span><strong>Riwayat Pemakaian:</strong> {product.previousUsage}</span>
                    </div>
                  )}
                </div>

                {/* Summary description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Primary WhatsApp Conversion CTA */}
              <div className="space-y-2 pt-2">
                <a
                  href={generateWhatsAppProductLink(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="detail-main-wa-btn"
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm text-center shadow-md flex items-center justify-center gap-2 transition-all ${
                    isSold 
                      ? 'bg-slate-200 text-slate-500 pointer-events-none cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/20'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>
                    {isSold 
                      ? 'Unit Telah Terjual (Titip Cari Unit Serupa)' 
                      : (hasPrice ? 'Tanya Ketersediaan & Pesan via WhatsApp' : 'Tanyakan Harga & Penawaran via WhatsApp')}
                  </span>
                </a>

                {/* Secondary Fast Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={generateWhatsAppProductLink(product, 'video')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-1.5 text-center text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors"
                  >
                    <Video className="w-3.5 h-3.5 text-blue-600" />
                    <span>Minta Video Tes</span>
                  </a>

                  <a
                    href={generateWhatsAppProductLink(product, 'visit')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-1.5 text-center text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Jadwal Cek Fisik</span>
                  </a>

                  <a
                    href={generateWhatsAppProductLink(product, 'shipping')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-1.5 text-center text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors"
                  >
                    <Truck className="w-3.5 h-3.5 text-slate-700" />
                    <span>Cek Ongkir</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Section 2: Technical Specifications & Tested Functions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
            
            {/* Tested Functions Checklist */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Hasil Inspeksi & Uji Fungsi Teknisi</span>
              </h3>

              <ul className="space-y-2">
                {product.testedFunctions.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200 italic">
                Semua unit yang berstatus READY telah melalui tahap QC fungsional dasar sebelum diiklankan.
              </div>
            </div>

            {/* Technical Specification Table */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Spesifikasi Teknis Alat</span>
              </h3>

              <div className="text-xs divide-y divide-slate-200 bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="p-2.5 flex justify-between">
                  <span className="text-slate-500 font-medium">Merk / Brand</span>
                  <span className="font-bold text-slate-900">{product.brand}</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-slate-500 font-medium">Sumber Daya</span>
                  <span className="font-bold text-slate-900">{product.powerType}</span>
                </div>
                {product.powerWattage && (
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-500 font-medium">Konsumsi / Kapasitas</span>
                    <span className="font-bold text-slate-900 text-right">{product.powerWattage}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-500 font-medium">Dimensi (PxLxT)</span>
                    <span className="font-bold text-slate-900">{product.dimensions}</span>
                  </div>
                )}
                {product.material && (
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-500 font-medium">Material Bodi</span>
                    <span className="font-bold text-slate-900">{product.material}</span>
                  </div>
                )}
                <div className="p-2.5 flex justify-between">
                  <span className="text-slate-500 font-medium">Kategori Dapur</span>
                  <span className="font-bold text-slate-900">{product.category}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Logistics & Safety Guidance */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-2">
            <h4 className="font-bold flex items-center gap-1.5 text-amber-950">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Panduan Pengiriman & Pengecekan Unit BBKitchen</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-700 pt-1">
              <div>
                <strong>1. Cek Fisik / Video Call:</strong>
                <p className="text-slate-600">Calon pembeli dipersilakan datang langsung ke lokasi unit atau meminta video call tes nyala.</p>
              </div>
              <div>
                <strong>2. Pengiriman Fleksibel:</strong>
                <p className="text-slate-600">Bisa dijemput sendiri, via Lalamove / Deliveree (Jabodetabek), atau Kargo Kayu (Luar Kota).</p>
              </div>
              <div>
                <strong>3. Pembayaran Aman:</strong>
                <p className="text-slate-600">Transaksi langsung resmi setelah konfirmasi ketersediaan dan kesepakatan kondisi unit.</p>
              </div>
            </div>
          </div>

          {/* ADMIN INTERNAL BAR (Strictly shown only if Admin Mode is active) */}
          {isAdminMode && (
            <div className="bg-slate-900 text-slate-200 border border-amber-500/50 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4" />
                  <span>KONTROL ADMIN & STAFF (INTERNAL ONLY)</span>
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {product.adminTelegramRef ? `Ref Source: ${product.adminTelegramRef}` : 'No Source ID'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  id="admin-modal-set-ready"
                  onClick={() => onToggleStatus && onToggleStatus(product.id, 'READY')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                    product.status === 'READY'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Ubah Status: READY
                </button>
                <button
                  type="button"
                  id="admin-modal-set-sold"
                  onClick={() => onToggleStatus && onToggleStatus(product.id, 'SOLD')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                    product.status === 'SOLD'
                      ? 'bg-slate-950 text-white border border-slate-700'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Ubah Status: SOLD
                </button>
              </div>

              {product.adminInternalNotes && (
                <div className="text-xs text-amber-200/90 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <strong>Catatan Internal:</strong> {product.adminInternalNotes}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-5 py-3 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            BBKitchen • Bukan Baru Kitchen Indonesia
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
