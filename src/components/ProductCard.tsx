import React from 'react';
import { Product } from '../types';
import { generateWhatsAppProductLink } from '../utils/formatters';
import {
  Phone,
  MapPin,
  Eye,
  Layers,
  Wrench,
  Send,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
  isAdminMode: boolean;
  onToggleStatus?: (productId: string, newStatus: 'READY' | 'SOLD') => void;
}

function getConditionLabel(condition: string | undefined): 'Baru' | 'Bekas' | null {
  const normalized = condition?.trim().toUpperCase();

  if (!normalized) return null;
  if (normalized === 'BARU' || normalized.includes('BARU')) return 'Baru';
  if (normalized === 'BEKAS' || normalized.includes('BEKAS') || normalized.includes('REKONDISI')) {
    return 'Bekas';
  }

  return null;
}

function formatAdminPrice(price: number | null | undefined): string {
  if (price === null || price === undefined || !Number.isFinite(price)) return 'Harga belum diisi';

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price);
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetail,
  isAdminMode,
  onToggleStatus
}) => {
  const isSold = product.status === 'SOLD';
  const conditionLabel = getConditionLabel(product.condition);

  return (
    <div
      id={`product-card-${product.id}`}
      className={`group bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg ${
        isSold
          ? 'border-slate-300 bg-slate-50/70'
          : 'border-slate-200 hover:border-amber-400/60'
      }`}
    >
      <div>
        <div
          className="relative aspect-[4/3] bg-slate-900 overflow-hidden cursor-pointer"
          onClick={() => onOpenDetail(product)}
        >
          <img
            src={product.images[0] || 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'}
            alt={product.name}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              isSold ? 'grayscale contrast-125' : ''
            }`}
            loading="lazy"
          />

          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
            {isSold ? (
              <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-white font-bold text-xs shadow-md backdrop-blur-xs border border-slate-700">
                TERJUAL / SOLD
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                READY SIAP KIRIM
              </span>
            )}
          </div>

          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="px-2 py-0.5 rounded-md bg-slate-900/80 text-amber-300 text-[11px] font-mono font-semibold backdrop-blur-xs border border-slate-700">
              {product.sku}
            </span>
          </div>

          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-start pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-950/80 text-slate-200 text-[11px] font-medium backdrop-blur-xs border border-slate-800">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>{product.location}</span>
            </span>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 truncate">
              {product.category || 'Kategori belum tercantum'}
            </span>
            {conditionLabel && (
              <span
                className={`shrink-0 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                  conditionLabel === 'Baru'
                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}
              >
                {conditionLabel}
              </span>
            )}
          </div>

          <h3
            onClick={() => onOpenDetail(product)}
            className="text-sm font-bold text-slate-900 line-clamp-2 cursor-pointer hover:text-amber-600 transition-colors leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {product.dimensions && (
            <div className="flex items-center gap-1.5 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100">
              <Layers className="w-3 h-3 text-blue-500 shrink-0" />
              <span className="truncate">{product.dimensions}</span>
            </div>
          )}

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.summary}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0 space-y-3">
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
                ? 'bg-slate-700 hover:bg-slate-600 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{isSold ? 'Tanya Lainnya' : 'Tanya WA'}</span>
          </a>
        </div>

        {isAdminMode && (
          <div className="mt-2 p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2 text-xs">
            <div className="flex items-center justify-between text-[11px] font-bold text-amber-900">
              <span className="flex items-center gap-1">
                <Wrench className="w-3 h-3 text-amber-600" />
                <span>Admin Control</span>
              </span>
              <span className="text-[10px] font-mono text-amber-700">
                {product.adminTelegramRef ? 'Telegram siap' : 'No TG Ref'}
              </span>
            </div>

            <div className="rounded-lg border border-amber-200 bg-white/80 px-2.5 py-2">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Harga Admin</div>
              <div className="mt-0.5 text-sm font-black text-slate-950">{formatAdminPrice(product.price)}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                id={`admin-toggle-ready-${product.id}`}
                onClick={() => onToggleStatus && onToggleStatus(product.id, 'READY')}
                className={`py-1.5 px-2 text-[11px] font-bold rounded-lg transition-colors ${
                  product.status === 'READY'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                READY
              </button>
              <button
                type="button"
                id={`admin-toggle-sold-${product.id}`}
                onClick={() => onToggleStatus && onToggleStatus(product.id, 'SOLD')}
                className={`py-1.5 px-2 text-[11px] font-bold rounded-lg transition-colors ${
                  product.status === 'SOLD'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                SOLD
              </button>
            </div>

            {product.adminTelegramRef && (
              <a
                href={product.adminTelegramRef}
                target="_blank"
                rel="noopener noreferrer"
                id={`admin-telegram-${product.id}`}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-sky-600 px-2.5 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-sky-500"
              >
                <Send className="h-3.5 w-3.5" />
                Buka Telegram
              </a>
            )}

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