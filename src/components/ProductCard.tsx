import React from 'react';
import { Product } from '../types';
import { formatRupiah, generateWhatsAppProductLink } from '../utils/formatters';
import { 
  Phone, 
  MapPin, 
  Zap, 
  ShieldCheck, 
  Eye, 
  CheckCircle2, 
  Flame, 
  Lock, 
  Wrench,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
  isAdminMode: boolean;
  onToggleStatus?: (productId: string, newStatus: 'READY' | 'SOLD') => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetail,
  isAdminMode,
  onToggleStatus
}) => {
  const isSold = product.status === 'SOLD';
  const hasPrice = product.price !== null && product.price !== undefined;

  const conditionColors: Record<string, string> = {
    'Bekas Original': 'bg-blue-50 text-blue-700 border-blue-200',
    'Rekondisi Siap Pakai': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Like New / Ex-Display': 'bg-amber-50 text-amber-800 border-amber-200',
    'Baru Sisa Proyek / Lelang': 'bg-purple-50 text-purple-700 border-purple-200'
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      className={`group bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg ${
        isSold 
          ? 'border-slate-300 opacity-80 bg-slate-50/70' 
          : 'border-slate-200 hover:border-amber-400/60'
      }`}
    >
      {/* Card Header & Image */}
      <div>
        <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden cursor-pointer" onClick={() => onOpenDetail(product)}>
          <img
            src={product.images[0] || 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'}
            alt={product.name}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              isSold ? 'grayscale contrast-125' : ''
            }`}
            loading="lazy"
          />

          {/* Status Overlay Badge */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
            {isSold ? (
              <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-white font-bold text-xs shadow-md backdrop-blur-xs border border-slate-700">
                TERJUAL / SOLD
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                READY SIAP KIRIM
              </span>
            )}
          </div>

          {/* Condition Rating & SKU Chip */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
            <span className="px-2 py-0.5 rounded-md bg-slate-900/80 text-amber-300 text-[11px] font-mono font-semibold backdrop-blur-xs border border-slate-700">
              {product.sku}
            </span>
          </div>

          {/* Location Badge bottom left of image */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-950/80 text-slate-200 text-[11px] font-medium backdrop-blur-xs border border-slate-800">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>{product.location}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-950/80 text-slate-300 text-[11px] font-medium backdrop-blur-xs border border-slate-800">
              Kondisi: {product.conditionRating}/10
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3">
          
          {/* Condition Tag & Brand */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {product.brand}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
              conditionColors[product.condition] || 'bg-slate-100 text-slate-700 border-slate-200'
            }`}>
              {product.condition}
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onOpenDetail(product)}
            className="text-sm font-bold text-slate-900 line-clamp-2 cursor-pointer hover:text-amber-600 transition-colors leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Specification Highlights Chips */}
          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100">
            <div className="flex items-center gap-1 truncate">
              <Zap className="w-3 h-3 text-amber-500 shrink-0" />
              <span className="truncate">{product.powerType} {product.powerWattage ? `(${product.powerWattage.slice(0, 12)}...)` : ''}</span>
            </div>
            {product.dimensions && (
              <div className="flex items-center gap-1 truncate">
                <Layers className="w-3 h-3 text-blue-500 shrink-0" />
                <span className="truncate">{product.dimensions}</span>
              </div>
            )}
          </div>

          {/* Short summary */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.summary}
          </p>

          {/* Tested function indicator */}
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">
              {product.testedFunctions[0] || 'Telah lolos inspeksi fungsi teknisi'}
            </span>
          </div>

        </div>
      </div>

      {/* Pricing & CTA Section */}
      <div className="p-4 pt-0 space-y-3">
        <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              {hasPrice ? 'Harga Penawaran' : 'Status Harga'}
            </div>
            <div className={`font-extrabold ${
              hasPrice ? 'text-lg text-slate-900' : 'text-sm text-amber-700'
            }`}>
              {formatRupiah(product.price)}
            </div>
          </div>

          {product.originalPriceEstimate && hasPrice && (
            <div className="text-right">
              <div className="text-[10px] text-slate-400">Est. Baru Toko</div>
              <div className="text-xs text-slate-400 line-through">
                {formatRupiah(product.originalPriceEstimate)}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            id={`btn-detail-${product.id}`}
            onClick={() => onOpenDetail(product)}
            className="w-full py-2 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Detail Unit</span>
          </button>

          <a
            href={generateWhatsAppProductLink(product)}
            target="_blank"
            rel="noopener noreferrer"
            id={`btn-wa-${product.id}`}
            className={`w-full py-2 px-2.5 text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5 ${
              isSold 
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed pointer-events-none'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{hasPrice ? 'Tanya WA' : 'Cek Harga WA'}</span>
          </a>
        </div>

        {/* ADMIN INTERNAL CONTROLS (Strictly visible only when Admin Mode is enabled) */}
        {isAdminMode && (
          <div className="mt-2 p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-[11px] font-bold text-amber-900">
              <span className="flex items-center gap-1">
                <Wrench className="w-3 h-3 text-amber-600" />
                <span>Admin Control</span>
              </span>
              <span className="text-[10px] font-mono text-amber-700">
                {product.adminTelegramRef ? `Ref: ${product.adminTelegramRef}` : 'No TG Ref'}
              </span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                id={`admin-toggle-ready-${product.id}`}
                onClick={() => onToggleStatus && onToggleStatus(product.id, 'READY')}
                className={`flex-1 py-1 px-2 text-[11px] font-bold rounded-lg transition-colors ${
                  product.status === 'READY'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Set READY
              </button>
              <button
                type="button"
                id={`admin-toggle-sold-${product.id}`}
                onClick={() => onToggleStatus && onToggleStatus(product.id, 'SOLD')}
                className={`flex-1 py-1 px-2 text-[11px] font-bold rounded-lg transition-colors ${
                  product.status === 'SOLD'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Set SOLD
              </button>
            </div>

            {product.adminInternalNotes && (
              <p className="text-[10px] text-slate-600 italic bg-white/70 p-1 rounded">
                Note: {product.adminInternalNotes}
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
