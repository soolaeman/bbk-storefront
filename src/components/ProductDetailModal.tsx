import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { generateWhatsAppProductLink } from '../utils/formatters';
import {
  X,
  Phone,
  MapPin,
  ShieldCheck,
  Layers,
  Truck,
  Video,
  Calendar,
  Info,
  Copy,
  Check,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  isAdminMode: boolean;
  onToggleStatus?: (productId: string, newStatus: 'READY' | 'SOLD') => void;
}

const normalizeCondition = (value: string | null | undefined): 'BARU' | 'BEKAS' | null => {
  const normalized = String(value ?? '').trim().toUpperCase();

  if (!normalized) return null;
  if (normalized === 'BEKAS' || normalized.includes('BEKAS')) return 'BEKAS';
  if (normalized === 'BARU' || normalized.includes('BARU')) return 'BARU';

  return null;
};

const getConditionLabel = (value: string | null | undefined): string => {
  const condition = normalizeCondition(value);
  if (condition === 'BARU') return 'Baru';
  if (condition === 'BEKAS') return 'Bekas';
  return 'Kondisi belum tercantum';
};

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isAdminMode,
  onToggleStatus,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSelectedImageIndex(0);
    setCopied(false);
  }, [product?.id]);

  if (!product) return null;

  const images = product.images.length > 0 ? product.images : [];
  const selectedImage = images[selectedImageIndex] || images[0];
  const isSold = product.status === 'SOLD';
  const isReady = product.status === 'READY';
  const hasPrice = product.price !== null && product.price !== undefined;
  const conditionLabel = getConditionLabel(product.condition);

  const statusLabel =
    product.status === 'SOLD'
      ? 'TERJUAL / SOLD'
      : product.status === 'BOOKED'
        ? 'BOOKED / DIBOOKING'
        : product.status === 'CONFIRMING'
          ? 'SEDANG DIKONFIRMASI'
          : 'READY SIAP KIRIM';

  const description = product.description || product.summary || 'Detail unit belum tersedia.';

  const handleCopyInfo = async () => {
    const text = [
      `${product.name} (SKU: ${product.sku})`,
      `Status: ${statusLabel}`,
      `Kondisi: ${conditionLabel}`,
      `Brand: ${product.brand}`,
      `Lokasi: ${product.location}`,
      product.dimensions ? `Dimensi: ${product.dimensions}` : '',
      product.material ? `Material: ${product.material}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
    >
      <div
        id="product-detail-modal"
        className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30 shrink-0">
              {product.sku}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline truncate">
              {product.category}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              id="detail-copy-info-btn"
              onClick={handleCopyInfo}
              className="px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
              title="Salin ringkasan unit"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copied ? 'Tersalin!' : 'Salin Info'}</span>
            </button>

            <button
              type="button"
              id="detail-close-btn"
              onClick={onClose}
              aria-label="Tutup detail produk"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-6 space-y-3">
              <div className="relative aspect-[4/3] bg-slate-900 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt={`${product.name} - foto unit BBKitchen`}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover ${isSold ? 'grayscale contrast-125' : ''}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm font-semibold">
                    Foto unit belum tersedia
                  </div>
                )}

                <div className="absolute top-3 left-3">
                  <span
                    className={`px-3 py-1 rounded-lg text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 ${
                      isSold
                        ? 'bg-slate-950/90 border border-slate-700'
                        : isReady
                          ? 'bg-emerald-600'
                          : 'bg-amber-600'
                    }`}
                  >
                    {!isSold && <span className="w-2 h-2 rounded-full bg-white" />}
                    {statusLabel}
                  </span>
                </div>

                {selectedImage && (
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-slate-950/80 text-amber-300 text-xs font-semibold backdrop-blur-xs">
                    Foto Unit BBKitchen
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      aria-label={`Lihat foto ${index + 1}`}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImageIndex === index
                          ? 'border-amber-500 ring-2 ring-amber-400/40'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - thumbnail ${index + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900 space-y-0.5">
                  <strong className="font-bold">Garansi Uji Fungsi 7 Hari</strong>
                  <p className="text-emerald-800 leading-snug">
                    Setiap unit READY mengikuti proses pengecekan fungsi dasar sebelum ditawarkan.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-6 space-y-4 min-w-0">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 truncate max-w-full">
                    {product.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 shrink-0">
                    {conditionLabel}
                  </span>
                </div>

                <h2
                  id="product-detail-title"
                  className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight"
                >
                  {product.name}
                </h2>

                <div className="space-y-2 text-xs text-slate-600 bg-white border border-slate-200 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="min-w-0 truncate">
                      <strong>Lokasi Unit:</strong> {product.location || 'Belum tercantum'}
                    </span>
                  </div>
                  {product.previousUsage && (
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="min-w-0 line-clamp-2">
                        <strong>Riwayat:</strong> {product.previousUsage}
                      </span>
                    </div>
                  )}
                </div>

                <div className="max-h-32 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-3">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <a
                  href={generateWhatsAppProductLink(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="detail-main-wa-btn"
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm text-center shadow-md flex items-center justify-center gap-2 transition-all ${
                    isSold
                      ? 'bg-slate-200 text-slate-500'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/20'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>
                    {isSold
                      ? 'Titip Cari Unit Serupa via WhatsApp'
                      : hasPrice
                        ? 'Tanya Ketersediaan & Pesan via WhatsApp'
                        : 'Tanyakan Harga & Penawaran via WhatsApp'}
                  </span>
                </a>

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

          <div className="border-t border-slate-200 pt-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Spesifikasi Teknis Alat</span>
              </h3>

              <div className="text-xs divide-y divide-slate-200 bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="p-2.5 flex justify-between gap-4">
                  <span className="text-slate-500 font-medium">Merk / Brand</span>
                  <span className="font-bold text-slate-900 text-right">{product.brand}</span>
                </div>
                <div className="p-2.5 flex justify-between gap-4">
                  <span className="text-slate-500 font-medium">Status</span>
                  <span className={`font-bold text-right ${isReady ? 'text-emerald-700' : 'text-slate-900'}`}>
                    {statusLabel}
                  </span>
                </div>
                <div className="p-2.5 flex justify-between gap-4">
                  <span className="text-slate-500 font-medium">Kondisi</span>
                  <span className="font-bold text-slate-900 text-right">{conditionLabel}</span>
                </div>
                {product.powerWattage && (
                  <div className="p-2.5 flex justify-between gap-4">
                    <span className="text-slate-500 font-medium">Daya / Kapasitas</span>
                    <span className="font-bold text-slate-900 text-right">{product.powerWattage}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="p-2.5 flex justify-between gap-4">
                    <span className="text-slate-500 font-medium">Dimensi (PxLxT)</span>
                    <span className="font-bold text-slate-900 text-right">{product.dimensions}</span>
                  </div>
                )}
                {product.material && (
                  <div className="p-2.5 flex justify-between gap-4">
                    <span className="text-slate-500 font-medium">Material Bodi</span>
                    <span className="font-bold text-slate-900 text-right">{product.material}</span>
                  </div>
                )}
                <div className="p-2.5 flex justify-between gap-4">
                  <span className="text-slate-500 font-medium">Kategori</span>
                  <span className="font-bold text-slate-900 text-right">{product.category}</span>
                </div>
                <div className="p-2.5 flex justify-between gap-4">
                  <span className="text-slate-500 font-medium">Lokasi</span>
                  <span className="font-bold text-slate-900 text-right">{product.location}</span>
                </div>
              </div>
            </div>
          </div>

          {isAdminMode && onToggleStatus && (
            <div className="border-t border-amber-200 pt-4 flex flex-wrap items-center justify-between gap-3 bg-amber-50 rounded-xl p-4">
              <div>
                <p className="text-xs font-bold text-amber-900">Mode Admin</p>
                <p className="text-[11px] text-amber-800">Perubahan di sini hanya mengubah state frontend sementara.</p>
              </div>
              <button
                type="button"
                onClick={() => onToggleStatus(product.id, isSold ? 'READY' : 'SOLD')}
                className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold"
              >
                Tandai {isSold ? 'READY' : 'SOLD'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
