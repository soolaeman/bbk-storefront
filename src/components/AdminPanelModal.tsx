import React, { useState } from 'react';
import { Product, EquipmentCategory, ProductCondition } from '../types';
import { formatRupiah } from '../utils/formatters';
import { Check, Plus, RefreshCw, Search, Wrench, X } from 'lucide-react';

type ProductPowerType = Product['powerType'];

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onToggleStatus: (productId: string, newStatus: 'READY' | 'SOLD') => void;
  onAddProduct: (product: Product) => void;
  onResetToDefault: () => void;
  categoryOptions?: Array<{ id: number; name: string; slug?: string }>;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  products,
  onToggleStatus,
  onAddProduct,
  onResetToDefault,
  categoryOptions = [],
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [newName, setNewName] = useState('');
  const [newSku, setNewSku] = useState('');
  const [newCategory, setNewCategory] = useState<EquipmentCategory>('' as EquipmentCategory);
  const [newBrand, setNewBrand] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newCondition, setNewCondition] = useState<ProductCondition>('Bekas Original');
  const [newConditionRating, setNewConditionRating] = useState('');
  const [newPowerType, setNewPowerType] = useState<ProductPowerType>('Gas');
  const [newWattage, setNewWattage] = useState('');
  const [newDimensions, setNewDimensions] = useState('');
  const [newMaterial, setNewMaterial] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newInternalNote, setNewInternalNote] = useState('');
  const [newTelegramRef, setNewTelegramRef] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  if (!isOpen) return null;

  const readyCount = products.filter((product) => product.status === 'READY').length;
  const soldCount = products.filter((product) => product.status === 'SOLD').length;
  const filteredProducts = products.filter((product) => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return true;
    return (
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query) ||
      Boolean(product.adminTelegramRef?.toLowerCase().includes(query))
    );
  });

  const handleCreateProduct = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newName.trim() || !newCategory.trim()) return;

    const parsedPrice = newPrice.trim() ? Number(newPrice.replace(/[^0-9]/g, '')) : null;

    const product: Product = {
      id: `bbk-${Date.now()}`,
      sku: newSku.trim() || `BBK-${Date.now().toString().slice(-6)}`,
      name: newName.trim(),
      category: newCategory,
      brand: newBrand.trim(),
      price: Number.isFinite(parsedPrice as number) ? parsedPrice : null,
      status: 'READY',
      condition: newCondition,
      conditionRating: Number(newConditionRating) || 0,
      location: newLocation.trim(),
      powerType: newPowerType,
      powerWattage: newWattage.trim(),
      dimensions: newDimensions.trim(),
      material: newMaterial.trim(),
      summary: newSummary.trim(),
      description: newDescription.trim(),
      testedFunctions: [],
      images: newImageUrl.trim() ? [newImageUrl.trim()] : [],
      dateAdded: new Date().toISOString(),
      adminInternalNotes: newInternalNote.trim(),
      adminTelegramRef: newTelegramRef.trim(),
      featured: false,
    };

    onAddProduct(product);
    setActiveTab('list');
    setNewName('');
    setNewSku('');
    setNewBrand('');
    setNewPrice('');
    setNewLocation('');
    setNewCondition('Bekas Original');
    setNewConditionRating('');
    setNewPowerType('Gas');
    setNewWattage('');
    setNewDimensions('');
    setNewMaterial('');
    setNewSummary('');
    setNewDescription('');
    setNewInternalNote('');
    setNewTelegramRef('');
    setNewImageUrl('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col text-slate-800">
        <header className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Wrench className="w-4 h-4 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold">Panel Pengelolaan Inventori BBKitchen</h3>
              <p className="text-[11px] text-slate-400">Data katalog berasal dari source of truth yang dipasok oleh parent.</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="bg-slate-100 px-5 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setActiveTab('list')} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-300">
              Daftar Unit ({products.length})
            </button>
            <button type="button" onClick={() => setActiveTab('add')} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-300 flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Input Unit
            </button>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="font-semibold text-emerald-700">Ready: {readyCount}</span>
            <span className="font-semibold text-slate-700">Sold: {soldCount}</span>
            <button type="button" onClick={onResetToDefault} className="text-slate-500 hover:text-slate-900 flex items-center gap-1">
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>

        {activeTab === 'list' && (
          <div className="p-5 overflow-y-auto flex-1 space-y-4">
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Cari SKU, nama unit, atau ref Telegram..." className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg" />
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs divide-y divide-slate-200">
                  <thead className="bg-slate-50 font-bold text-slate-700 text-[10px] uppercase">
                    <tr>
                      <th className="px-3 py-2.5">SKU</th>
                      <th className="px-3 py-2.5">Nama & Kategori</th>
                      <th className="px-3 py-2.5">Harga</th>
                      <th className="px-3 py-2.5">Lokasi</th>
                      <th className="px-3 py-2.5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td className="px-3 py-2.5 font-mono font-bold">{product.sku}</td>
                        <td className="px-3 py-2.5">
                          <div className="font-semibold">{product.name}</div>
                          <div className="text-[11px] text-slate-500">{product.brand} • {product.category}</div>
                        </td>
                        <td className="px-3 py-2.5 font-bold">{formatRupiah(product.price)}</td>
                        <td className="px-3 py-2.5">{product.location}</td>
                        <td className="px-3 py-2.5 text-right">
                          <button type="button" onClick={() => onToggleStatus(product.id, product.status === 'READY' ? 'SOLD' : 'READY')} className="px-2 py-1 rounded-md bg-slate-900 text-white text-[10px] font-bold">
                            {product.status}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'add' && (
          <form onSubmit={handleCreateProduct} className="p-5 overflow-y-auto flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="Nama Peralatan Dapur" className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2" />
              <input required value={newSku} onChange={(event) => setNewSku(event.target.value)} placeholder="SKU / ID Inventori" className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 font-mono" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1">Kategori Live</label>
                <select required value={newCategory} onChange={(event) => setNewCategory(event.target.value as EquipmentCategory)} className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2">
                  <option value="">Pilih kategori</option>
                  {categoryOptions.map((category) => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))}
                </select>
                {categoryOptions.length === 0 && <p className="text-[10px] text-slate-500 mt-1">Kategori WooCommerce belum dipasok oleh parent.</p>}
              </div>
              <input value={newBrand} onChange={(event) => setNewBrand(event.target.value)} placeholder="Brand" className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2" />
              <input value={newPrice} onChange={(event) => setNewPrice(event.target.value)} placeholder="Harga" className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select value={newCondition} onChange={(event) => setNewCondition(event.target.value as ProductCondition)} className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2">
                <option value="Bekas Original">Bekas Original</option>
                <option value="Rekondisi Siap Pakai">Rekondisi Siap Pakai</option>
                <option value="Like New / Ex-Display">Like New / Ex-Display</option>
                <option value="Baru Sisa Proyek / Lelang">Baru Sisa Proyek / Lelang</option>
              </select>
              <input value={newConditionRating} onChange={(event) => setNewConditionRating(event.target.value)} placeholder="Rating kondisi" className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2" />
              <input value={newLocation} onChange={(event) => setNewLocation(event.target.value)} placeholder="Lokasi" className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select value={newPowerType} onChange={(event) => setNewPowerType(event.target.value as ProductPowerType)} className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2">
                <option value="Gas">Gas</option>
                <option value="Listrik">Listrik</option>
                <option value="Manual / Tanpa Daya">Manual / Tanpa Daya</option>
                <option value="Gas & Listrik">Gas & Listrik</option>
              </select>
              <input value={newWattage} onChange={(event) => setNewWattage(event.target.value)} placeholder="Watt / tekanan gas" className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2" />
              <input value={newDimensions} onChange={(event) => setNewDimensions(event.target.value)} placeholder="Dimensi" className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2" />
            </div>

            <input value={newMaterial} onChange={(event) => setNewMaterial(event.target.value)} placeholder="Material" className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2" />
            <input value={newImageUrl} onChange={(event) => setNewImageUrl(event.target.value)} placeholder="URL gambar" className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 font-mono" />
            <textarea value={newSummary} onChange={(event) => setNewSummary(event.target.value)} placeholder="Ringkasan" className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2" />
            <textarea value={newDescription} onChange={(event) => setNewDescription(event.target.value)} placeholder="Deskripsi" className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2" />

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input value={newTelegramRef} onChange={(event) => setNewTelegramRef(event.target.value)} placeholder="ID Telegram internal" className="text-xs bg-white border border-amber-300 rounded-lg px-3 py-2 font-mono" />
              <input value={newInternalNote} onChange={(event) => setNewInternalNote(event.target.value)} placeholder="Catatan internal" className="text-xs bg-white border border-amber-300 rounded-lg px-3 py-2" />
            </div>

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setActiveTab('list')} className="px-4 py-2 text-xs font-semibold">Batal</button>
              <button type="submit" className="px-5 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Simpan Unit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
