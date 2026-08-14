import React, { useState } from 'react';
import { Product, EquipmentCategory } from '../types';
import { CATEGORIES } from '../data/products';
import { formatRupiah } from '../utils/formatters';
import { 
  X, 
  Wrench, 
  ShieldCheck, 
  Lock, 
  Plus, 
  Check, 
  AlertTriangle,
  RefreshCw,
  Search,
  Layers
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onToggleStatus: (productId: string, newStatus: 'READY' | 'SOLD') => void;
  onAddProduct: (product: Product) => void;
  onResetToDefault: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  products,
  onToggleStatus,
  onAddProduct,
  onResetToDefault
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
  const [searchTerm, setSearchTerm] = useState('');

  // New product form state
  const [newName, setNewName] = useState('');
  const [newSku, setNewSku] = useState(`BBK-${Date.now().toString().slice(-4)}`);
  const [newCategory, setNewCategory] = useState<EquipmentCategory>('Kompor & Burner');
  const [newBrand, setNewBrand] = useState('GETRA');
  const [newPrice, setNewPrice] = useState<string>('12500000');
  const [newLocation, setNewLocation] = useState('Jakarta Barat');
  const [newCondition, setNewCondition] = useState<any>('Bekas Original');
  const [newConditionRating, setNewConditionRating] = useState('8.8');
  const [newPowerType, setNewPowerType] = useState<any>('Gas');
  const [newWattage, setNewWattage] = useState('LPG Medium Pressure');
  const [newDimensions, setNewDimensions] = useState('80 x 75 x 85 cm');
  const [newMaterial, setNewMaterial] = useState('Stainless Steel 304');
  const [newSummary, setNewSummary] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newInternalNote, setNewInternalNote] = useState('');
  const [newTelegramRef, setNewTelegramRef] = useState(`TG-SOURCE-${Date.now().toString().slice(-3)}`);
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80');

  const readyCount = products.filter(p => p.status === 'READY').length;
  const soldCount = products.filter(p => p.status === 'SOLD').length;

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.adminTelegramRef && p.adminTelegramRef.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const parsedPrice = newPrice.trim() ? Number(newPrice.replace(/[^0-9]/g, '')) : null;

    const product: Product = {
      id: `bbk-${Date.now()}`,
      sku: newSku.trim() || `BBK-ITM-${Math.floor(Math.random() * 900 + 100)}`,
      name: newName,
      category: newCategory,
      brand: newBrand,
      price: isNaN(parsedPrice as number) ? null : parsedPrice,
      status: 'READY',
      condition: newCondition,
      conditionRating: parseFloat(newConditionRating) || 8.5,
      location: newLocation,
      powerType: newPowerType,
      powerWattage: newWattage,
      dimensions: newDimensions,
      material: newMaterial,
      summary: newSummary || `${newCondition} siap pakai untuk dapur komersial.`,
      description: newDescription || 'Unit terawat telah lolos uji fungsi teknisi BBKitchen.',
      testedFunctions: [
        'Uji fungsional kelistrikan/gas normal',
        'Bodi fisik kokoh bebas karat mayor',
        'Komponen pendukung lengkap'
      ],
      images: [newImageUrl],
      dateAdded: new Date().toISOString().split('T')[0],
      adminInternalNotes: newInternalNote,
      adminTelegramRef: newTelegramRef,
      featured: false
    };

    onAddProduct(product);
    setActiveTab('list');
    setNewName('');
    setNewSummary('');
    setNewDescription('');
    setNewInternalNote('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        id="admin-panel-modal"
        className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-800"
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/40">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold flex items-center gap-2">
                <span>Panel Pengelolaan Inventori BBKitchen</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 text-[10px] uppercase tracking-wider font-mono">
                  Admin / Staff Internal
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Kontrol status READY, SOLD, dan catatan referensi Telegram internal.
              </p>
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

        {/* Tab & Stats Bar */}
        <div className="bg-slate-100 px-5 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'list'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              Daftar Unit ({products.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('add')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeTab === 'add'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Input Unit Baru</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Ready: {readyCount} unit
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-md">
              Sold: {soldCount} unit
            </span>
            <button
              type="button"
              onClick={onResetToDefault}
              className="text-[11px] text-slate-500 hover:text-slate-900 underline flex items-center gap-1"
              title="Reset data katalog ke default"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Product List Management */}
        {activeTab === 'list' && (
          <div className="p-5 overflow-y-auto flex-1 space-y-4">
            
            {/* Search filter in admin */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari SKU, nama unit, atau ref Telegram..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Product Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs divide-y divide-slate-200">
                  <thead className="bg-slate-50 font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="px-3 py-2.5">SKU & Gambar</th>
                      <th className="px-3 py-2.5">Nama & Kategori</th>
                      <th className="px-3 py-2.5">Harga</th>
                      <th className="px-3 py-2.5">Lokasi</th>
                      <th className="px-3 py-2.5">Ref Telegram (Internal)</th>
                      <th className="px-3 py-2.5 text-right">Status Kontrol</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {filteredProducts.map((p) => {
                      const isSold = p.status === 'SOLD';
                      return (
                        <tr key={p.id} className={`hover:bg-slate-50/80 transition-colors ${isSold ? 'bg-slate-50/50 opacity-75' : ''}`}>
                          <td className="px-3 py-2.5 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <img
                                src={p.images[0]}
                                alt={p.name}
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0"
                              />
                              <div>
                                <div className="font-mono font-bold text-slate-900">{p.sku}</div>
                                <div className="text-[10px] text-slate-400">{p.conditionRating}/10 • {p.condition}</div>
                              </div>
                            </div>
                          </td>

                          <td className="px-3 py-2.5 max-w-xs">
                            <div className="font-semibold text-slate-900 truncate" title={p.name}>
                              {p.name}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {p.brand} • {p.category}
                            </div>
                          </td>

                          <td className="px-3 py-2.5 whitespace-nowrap font-bold text-slate-900">
                            {formatRupiah(p.price)}
                          </td>

                          <td className="px-3 py-2.5 whitespace-nowrap text-slate-600">
                            {p.location}
                          </td>

                          <td className="px-3 py-2.5 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              <Lock className="w-2.5 h-2.5 text-amber-600" />
                              <span>{p.adminTelegramRef || 'Manual Input'}</span>
                            </span>
                            {p.adminInternalNotes && (
                              <div className="text-[10px] text-slate-500 italic max-w-xs truncate">
                                {p.adminInternalNotes}
                              </div>
                            )}
                          </td>

                          <td className="px-3 py-2.5 whitespace-nowrap text-right">
                            <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-slate-100">
                              <button
                                type="button"
                                onClick={() => onToggleStatus(p.id, 'READY')}
                                className={`px-2 py-1 text-[10px] font-bold rounded-md transition-colors ${
                                  p.status === 'READY'
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                              >
                                READY
                              </button>
                              <button
                                type="button"
                                onClick={() => onToggleStatus(p.id, 'SOLD')}
                                className={`px-2 py-1 text-[10px] font-bold rounded-md transition-colors ${
                                  p.status === 'SOLD'
                                    ? 'bg-slate-900 text-white shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                              >
                                SOLD
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Add New Product */}
        {activeTab === 'add' && (
          <form onSubmit={handleCreateProduct} className="p-5 overflow-y-auto flex-1 space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nama Peralatan Dapur *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contoh: Rational Combi Oven 6 Tray Electric"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  SKU / ID Inventori *
                </label>
                <input
                  type="text"
                  required
                  value={newSku}
                  onChange={(e) => setNewSku(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Kategori
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-500 font-medium"
                >
                  {CATEGORIES.filter(c => c.name !== 'Semua').map((cat) => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Merk / Brand
                </label>
                <input
                  type="text"
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  placeholder="Contoh: GETRA / Nayati / Hoshizaki"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Harga Jual (Kosongkan jika Tanya WA)
                </label>
                <input
                  type="text"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="Contoh: 14500000"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Kondisi
                </label>
                <select
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-500"
                >
                  <option value="Bekas Original">Bekas Original</option>
                  <option value="Rekondisi Siap Pakai">Rekondisi Siap Pakai</option>
                  <option value="Like New / Ex-Display">Like New / Ex-Display</option>
                  <option value="Baru Sisa Proyek / Lelang">Baru Sisa Proyek / Lelang</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Rating Kondisi (1 - 10)
                </label>
                <input
                  type="text"
                  value={newConditionRating}
                  onChange={(e) => setNewConditionRating(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Lokasi Fisik Unit
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="Contoh: Jakarta Barat (Daan Mogot)"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Sumber Daya
                </label>
                <select
                  value={newPowerType}
                  onChange={(e) => setNewPowerType(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-500"
                >
                  <option value="Gas">Gas</option>
                  <option value="Listrik">Listrik</option>
                  <option value="Gas & Listrik">Gas & Listrik</option>
                  <option value="Manual / Tanpa Daya">Manual / Tanpa Daya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Watt / Tekanan Gas
                </label>
                <input
                  type="text"
                  value={newWattage}
                  onChange={(e) => setNewWattage(e.target.value)}
                  placeholder="Contoh: 1.500 Watt / LPG Low Pressure"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Dimensi (PxLxT)
                </label>
                <input
                  type="text"
                  value={newDimensions}
                  onChange={(e) => setNewDimensions(e.target.value)}
                  placeholder="Contoh: 120 x 70 x 85 cm"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                URL Gambar Utama
              </label>
              <input
                type="text"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-amber-50/60 p-3.5 rounded-xl border border-amber-200">
              <div>
                <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-700" />
                  <span>ID Referensi Telegram Sumber (Internal Only)</span>
                </label>
                <input
                  type="text"
                  value={newTelegramRef}
                  onChange={(e) => setNewTelegramRef(e.target.value)}
                  placeholder="TG-SUPPLIER-JKT-102"
                  className="w-full text-xs bg-white border border-amber-300 rounded-lg px-3 py-2 text-slate-900 font-mono focus:outline-none focus:border-amber-500"
                />
                <span className="text-[10px] text-amber-700 mt-0.5 block">
                  *Tersimpan aman di data internal, tidak pernah ditampilkan ke publik.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                  Catatan Internal Staff
                </label>
                <input
                  type="text"
                  value={newInternalNote}
                  onChange={(e) => setNewInternalNote(e.target.value)}
                  placeholder="Misal: Margin khusus resto rekanan, nego tipis..."
                  className="w-full text-xs bg-white border border-amber-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('list')}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg shadow-md transition-all flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Unit ke Katalog</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
