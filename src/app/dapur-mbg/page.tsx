import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, FileText, Flame, Package, Ruler, Sparkles, Truck, Utensils, Warehouse, WashingMachine } from 'lucide-react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

const SITE_URL = 'https://bukanbarukitchen.com';
const CATALOG_PDF_URL = 'https://drive.google.com/file/d/1z7AQFK96ZgiyVbYAklXcaeULMK_zhbTS/view?usp=drivesdk';
const WHATSAPP_URL = 'https://wa.me/6285122001051?text=Halo%20Tim%20BBKitchen%2C%20saya%20ingin%20konsultasi%20kebutuhan%20peralatan%20Dapur%20MBG.';

export const metadata: Metadata = {
  title: 'Dapur MBG — Solusi Peralatan Dapur Komersial | BBKitchen',
  description:
    'Solusi equipment dapur MBG untuk preparation, cooking, washing, storage, packing, dan exhaust. Konsultasikan kebutuhan dapur Anda dengan BBKitchen.',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: `${SITE_URL}/dapur-mbg` },
  openGraph: {
    title: 'Dapur MBG — Solusi Peralatan Dapur Komersial | BBKitchen',
    description:
      'Solusi equipment dapur MBG untuk preparation, cooking, washing, storage, packing, dan exhaust.',
    url: `${SITE_URL}/dapur-mbg`,
    type: 'website',
  },
};

const equipmentGroups = [
  { title: 'Preparation', description: 'Meja prepare, working table, sink dan rak untuk kebutuhan persiapan.', icon: Ruler },
  { title: 'Cooking', description: 'Range, stockpot burner, rice steamer dan equipment memasak.', icon: Flame },
  { title: 'Washing', description: 'Single sink, double sink dan sink jumbo untuk area pencucian.', icon: WashingMachine },
  { title: 'Storage', description: 'Rak, showcase dan freezer untuk kebutuhan penyimpanan.', icon: Warehouse },
  { title: 'Packing & Distribution', description: 'Food trolley dan kebutuhan pendukung proses packing.', icon: Truck },
  { title: 'Exhaust', description: 'Cooker hood, blower dan kebutuhan ducting sesuai kebutuhan dapur.', icon: Sparkles },
];

const benefits = [
  'Equipment dapur komersial untuk berbagai area kerja',
  'Pilihan equipment dapat disesuaikan dengan kebutuhan dapur',
  'Tersedia opsi paket pengadaan Dapur MBG',
  'Konsultasi kebutuhan sebelum menentukan equipment',
];

export default function DapurMbgPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      <Header simple />

      <main>
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_15%_80%,rgba(245,158,11,0.12),transparent_30%)]" />
          <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-400">BBKitchen • Dapur MBG</p>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02]">Solusi Peralatan Dapur MBG</h1>
              <p className="mt-6 max-w-2xl text-sm sm:text-base leading-7 text-slate-300">Siapkan dapur produksi dengan equipment yang tepat untuk mendukung proses persiapan, memasak, pencucian, packing, hingga penyimpanan.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-white hover:bg-emerald-400 transition-colors">Konsultasi Kebutuhan Dapur <ArrowRight className="w-4 h-4" /></a>
                <Link href="#equipment" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-white/5 px-5 py-3 text-sm font-bold text-slate-200 hover:bg-white/10 transition-colors">Lihat Equipment</Link>
              </div>
            </div>
          </div>
        </section>

        <section id="equipment" className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Equipment</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Bukan Sekadar Peralatan, Tapi Kebutuhan Dapur</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">BBKitchen menyediakan berbagai equipment untuk membantu melengkapi kebutuhan dapur MBG sesuai area kerja dan kebutuhan operasional.</p>
          </div>
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {equipmentGroups.map(({ title, description, icon: Icon }) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><Icon className="w-5 h-5" /></div>
                <h3 className="mt-4 text-sm sm:text-base font-black">{title}</h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-5 text-slate-500">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Layout</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Dapur yang Terorganisir Dimulai dari Layout</h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">Konsep layout dapur MBG dapat mencakup area penerimaan barang, persiapan, pencucian, dapur, packing, gudang, serta area pendukung lainnya.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Penerimaan', 'Persiapan', 'Pencucian', 'Dapur', 'Packing', 'Gudang'].map((item) => <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600">{item}</span>)}
              </div>
            </div>
            <div className="rounded-3xl bg-slate-950 p-6 sm:p-8 text-white">
              <Utensils className="w-8 h-8 text-emerald-400" />
              <h3 className="mt-5 text-xl font-black">Mulai dari kebutuhan dapurnya.</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">Diskusikan kapasitas, kondisi ruang, alur kerja, dan equipment yang dibutuhkan sebelum menentukan komposisi dapur.</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-emerald-400 hover:text-emerald-300">Konsultasikan Layout <ArrowRight className="w-4 h-4" /></a>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
          <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 lg:p-10 text-white grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-400">Paket Dapur MBG</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Paket Peralatan Dapur MBG</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Untuk kebutuhan pengadaan yang lebih praktis, BBKitchen juga memiliki paket peralatan Dapur MBG. Detail equipment, jumlah, ukuran, dan kebutuhan instalasi tersedia dalam katalog.</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-black"><Package className="w-4 h-4 text-amber-400" />Paket contoh: Rp250 juta*</div>
              <p className="mt-2 text-[11px] text-slate-500">*Harga pada katalog merupakan harga per 1 September 2025 dan dapat berubah sebelum kontrak.</p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[230px]">
              <a href={CATALOG_PDF_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-slate-900 hover:bg-slate-100 transition-colors"><FileText className="w-4 h-4" />Lihat Katalog Paket</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-sm font-black text-white hover:bg-slate-800 transition-colors">Konsultasi Paket <ArrowRight className="w-4 h-4" /></a>
            </div>
          </div>
        </section>

        <section className="bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Kenapa BBKitchen</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Dari Equipment sampai Kebutuhan Dapur</h2>
            </div>
            <div className="mt-7 grid sm:grid-cols-2 gap-3 max-w-3xl">
              {benefits.map((benefit) => <div key={benefit} className="flex items-start gap-3 rounded-xl bg-slate-50 p-4"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Check className="w-3 h-3" /></span><span className="text-sm font-semibold text-slate-700">{benefit}</span></div>)}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-14 sm:py-20 text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Dapur MBG</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight">Sedang Menyiapkan Dapur MBG?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">Ceritakan kebutuhan dapur Anda kepada tim BBKitchen dan diskusikan equipment yang sesuai.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-black text-white hover:bg-emerald-500 transition-colors">Konsultasi via WhatsApp <ArrowRight className="w-4 h-4" /></a>
        </section>
      </main>

      <Footer onSelectCategory={() => undefined} />
    </div>
  );
}
