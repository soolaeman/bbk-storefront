'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, 
  Send, 
  ExternalLink, 
  Copy, 
  Check, 
  Lock, 
  DollarSign, 
  MapPin, 
  Package, 
  AlertCircle,
  RefreshCw
} from 'lucide-react';

interface PricingInfo {
  modal: number;
  buka: number;
  deal: number;
  floor: number;
}

interface ProductItem {
  id: string;
  sku: string;
  name: string;
  slug?: string;
  category: string;
  status: string;
  condition: string;
  location: string;
  summary: string;
  images: string[];
  telegramUrl: string | null;
  pricing: PricingInfo | null;
}

const PIN_CODE = '1051'; // PIN Akses Sales Internal

export default function SalesHelperPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Check auth persistence
  useEffect(() => {
    const auth = localStorage.getItem('bbk_sales_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === PIN_CODE) {
      setIsAuthenticated(true);
      localStorage.setItem('bbk_sales_auth', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('bbk_sales_auth');
    setPinInput('');
  };

  const fetchProducts = useCallback(async (query: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/sales-helper?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Failed to fetch sales helper data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load & search debounce
  useEffect(() => {
    if (!isAuthenticated) return;
    const timer = setTimeout(() => {
      fetchProducts(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, isAuthenticated, fetchProducts]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const generateWhatsappDraft = (item: ProductItem) => {
    const priceText = item.pricing 
      ? `Rp ${item.pricing.buka.toLocaleString('id-ID')}` 
      : 'Rp (Konfirmasi)';

    return `Halo Kak! Untuk unit ${item.name} (${item.sku}):

✅ Kondisi: ${item.condition || 'Bekas Original'}
📍 Lokasi Gudang: ${item.location || 'Pamulang/Tangsel'}
💰 Harga Penawaran: ${priceText} (Nego Tipis)

Foto & detail unit sudah kami siapkan. Mau dikirim via kurir Lalamove/Deliveree atau diambil langsung ke gudang Kak? 😊`;
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-slate-100">
        <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-center text-white">BBKitchen Sales Helper</h1>
          <p className="text-xs text-slate-400 text-center mt-1 mb-6">
            Portal Khusus CS & Tim Internal untuk Cek Modal, Nego, dan Link Telegram.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Masukkan PIN Akses (Default: 1051)
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Masukkan 4 digit PIN"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-center text-lg tracking-widest text-white focus:outline-none focus:border-emerald-500"
                autoFocus
              />
            </div>
            {pinError && (
              <p className="text-xs text-rose-400 text-center flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> PIN salah, silakan coba lagi.
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-bold text-slate-950 transition-colors"
            >
              Buka Portal Sales
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      {/* Top Mobile Sticky Header */}
      <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800/80 shadow-lg shadow-slate-950/20 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <h1 className="text-base font-extrabold tracking-tight text-white">BBKitchen Sales Helper</h1>
            </div>
            <p className="text-[11px] text-slate-400">Cari SKU ➔ Modal ➔ Nego ➔ Link Telegram</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-700/80 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-600 transition-all font-semibold"
          >
            Kunci
          </button>
        </div>

        {/* Search Input */}
        <div className="max-w-3xl mx-auto mt-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ketik SKU (misal: BBK0004) atau nama barang..."
              className="w-full pl-10 pr-12 py-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-emerald-400 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Product List */}
      <div className="max-w-3xl mx-auto px-4 mt-4 space-y-4">
        {isLoading ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            <div className="inline-block h-6 w-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-2" />
            <p>Mencari database unit...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800/80 p-6">
            <Package className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-semibold text-slate-300">Tidak ada unit ditemukan</p>
            <p className="text-xs text-slate-500 mt-1">Coba cari dengan kode SKU lain atau kata kunci berbeda.</p>
          </div>
        ) : (
          products.map((item) => {
            const isSold = item.status.toUpperCase() === 'SOLD';
            return (
              <div 
                key={item.id}
                className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950/75 border border-slate-800/80 p-4 shadow-lg shadow-slate-950/30 hover:border-slate-700/80 hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {/* Header: SKU, Status, Gudang */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-0.5 rounded-lg shadow-sm">
                      {item.sku}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm ${
                      isSold 
                        ? 'bg-rose-950/80 text-rose-400 border border-rose-800/80' 
                        : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{item.location || 'Gudang Tangsel'}</span>
                  </div>
                </div>

                {/* Body: Thumbnail & Info */}
                <div className="flex gap-3 mt-3">
                  {item.images && item.images[0] ? (
                    <div className="relative h-20 w-20 flex-shrink-0 rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-inner">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="h-20 w-20 flex-shrink-0 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-center text-slate-600 shadow-inner">
                      <Package className="w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                      {item.name}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 truncate">
                      Kategori: <span className="text-slate-300 font-medium">{item.category}</span>
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      Kondisi: <span className="text-amber-300 font-medium">{item.condition}</span>
                    </p>
                  </div>
                </div>

                {/* 1-Tap Open Telegram Button */}
                {item.telegramUrl && (
                  <a
                    href={item.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3.5 w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md shadow-sky-950/20 active:scale-98 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    🚀 Buka Pesan Asli di Telegram Supplier
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                {/* Dynamic Pricing Box (Tangga Nego) */}
                {item.pricing && (
                  <div className={`mt-3.5 rounded-xl bg-slate-950/60 border-l-4 ${isSold ? 'border-l-rose-500' : 'border-l-emerald-500'} border border-slate-800/50 p-3.5 shadow-inner`}>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-emerald-400 animate-pulse" />
                        Tangga Nego (Dynamic Pricing)
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Modal: <strong className="text-slate-200">Rp {item.pricing.modal.toLocaleString('id-ID')}</strong>
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      {/* Harga Buka */}
                      <div className="rounded-xl bg-gradient-to-b from-emerald-950/40 to-emerald-950/10 border border-emerald-800/40 p-2.5 shadow-xs">
                        <p className="text-[10px] font-bold text-emerald-400">1. BUKA WA</p>
                        <p className="text-xs font-black text-emerald-300 mt-0.5">
                          Rp {item.pricing.buka.toLocaleString('id-ID')}
                        </p>
                      </div>

                      {/* Harga Deal */}
                      <div className="rounded-xl bg-gradient-to-b from-amber-950/40 to-amber-950/10 border border-amber-800/40 p-2.5 shadow-xs">
                        <p className="text-[10px] font-bold text-amber-400">2. DEAL CEPAT</p>
                        <p className="text-xs font-black text-amber-300 mt-0.5">
                          Rp {item.pricing.deal.toLocaleString('id-ID')}
                        </p>
                      </div>

                      {/* Harga Floor */}
                      <div className="rounded-xl bg-gradient-to-b from-rose-950/40 to-rose-950/10 border border-rose-800/40 p-2.5 shadow-xs">
                        <p className="text-[10px] font-bold text-rose-400">3. BATAS NETT</p>
                        <p className="text-xs font-black text-rose-300 mt-0.5">
                          Rp {item.pricing.floor.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Action Footer */}
                <div className="mt-3.5 flex flex-col gap-2 pt-2 border-t border-slate-800/60">
                   <div className="flex items-center gap-2">
                     <button
                       onClick={() => copyToClipboard(generateWhatsappDraft(item), item.id)}
                       className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700/50 hover:border-emerald-500/30 text-xs font-bold text-emerald-400 shadow-sm transition-all"
                     >
                       {copiedId === item.id ? (
                         <>
                           <Check className="w-3.5 h-3.5 text-emerald-400" />
                           Tercopy ke Clipboard!
                         </>
                       ) : (
                         <>
                           <Copy className="w-3.5 h-3.5" />
                           Salin Draft Chat WA
                         </>
                       )}
                     </button>

                     {item.slug && (
                       <Link
                         href={`/shop/${item.slug}`}
                         target="_blank"
                         className="flex items-center justify-center p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700/50 hover:border-slate-600 text-slate-300 shadow-sm transition-all"
                         title="Lihat Tampilan Web Publik"
                       >
                         <ExternalLink className="w-4 h-4" />
                       </Link>
                     )}
                   </div>

                   {/* Toggle Status Button */}
                   <button
                     onClick={async () => {
                       if (updatingId) return;
                       setUpdatingId(item.id);
                       try {
                         const nextStatus = isSold ? 'READY' : 'SOLD';
                         const res = await fetch('/api/sales-helper/toggle-status', {
                           method: 'POST',
                           headers: { 'Content-Type': 'application/json' },
                           body: JSON.stringify({ sku: item.sku, productId: item.id, status: nextStatus }),
                         });
                         const data = await res.json();
                         if (data.success) {
                           setProducts((prev) =>
                             prev.map((p) => (p.id === item.id ? { ...p, status: nextStatus } : p))
                           );
                         } else {
                           alert(data.message || data.error || 'Gagal mengubah status');
                         }
                       } catch (err) {
                         console.error(err);
                         alert('Terjadi kesalahan jaringan.');
                       } finally {
                         setUpdatingId(null);
                       }
                     }}
                     disabled={updatingId !== null}
                     className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-98 shadow-md ${
                       updatingId === item.id 
                         ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                         : isSold 
                           ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-950/25' 
                           : 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-rose-950/25'
                     }`}
                   >
                     {updatingId === item.id ? (
                       <>
                         <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                         Memproses...
                       </>
                     ) : isSold ? (
                       <>
                         <RefreshCw className="w-3.5 h-3.5" />
                         Tandai READY Kembali
                       </>
                     ) : (
                       <>
                         <RefreshCw className="w-3.5 h-3.5" />
                         Tandai sebagai SOLD (Terjual)
                       </>
                     )}
                   </button>
                 </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
