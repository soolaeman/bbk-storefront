import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Factory, Flame, MessageCircle, Ruler, ShoppingCart, Truck, Utensils, Warehouse } from 'lucide-react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

const SITE_URL = 'https://bukanbarukitchen.com';
const WHATSAPP_URL = 'https://wa.me/6285122001051?text=Halo%20BBKitchen%2C%20saya%20ingin%20konsultasi%20produksi%20peralatan%20dapur%20baru.';

export const metadata: Metadata = {
  title: 'Produksi Peralatan Dapur Restoran | Kitchen Equipment Custom | BBKitchen',
  description: 'Produksi peralatan dapur stainless dan kitchen equipment baru sesuai ukuran, fungsi, dan kebutuhan operasional restoran, cafe, catering, bakery, dan dapur komersial.',
  keywords: ['produksi peralatan dapur', 'produksi kitchen equipment', 'kitchen equipment custom', 'pembuatan kitchen equipment', 'produksi peralatan dapur restoran', 'custom kitchen equipment', 'pembuatan meja stainless restoran', 'pembuatan sink stainless', 'fabrikasi kitchen equipment'],
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: `${SITE_URL}/produksi-baru` },
  openGraph: { title: 'Produksi Peralatan Dapur Restoran | BBKitchen', description: 'Peralatan dapur stainless dan kitchen equipment baru sesuai kebutuhan operasional.', url: `${SITE_URL}/produksi-baru`, type: 'website' },
};

const products = [
  { title: 'Meja Stainless', description: 'Work table, preparation table, dan meja kerja custom.', icon: Ruler },
  { title: 'Sink & Washing Station', description: 'Single sink, double sink, sink jumbo, dan washing station.', icon: Utensils },
  { title: 'Rack & Storage', description: 'Rak stainless, shelving, cabinet, dan storage equipment.', icon: Warehouse },
  { title: 'Cooking Equipment', description: 'Kwali range, kompor, stockpot, dan equipment memasak.', icon: Flame },
  { title: 'Trolley & Distribution', description: 'Food trolley, trolley tray, dan equipment pendukung distribusi.', icon: Truck },
  { title: 'Hood & Exhaust', description: 'Hood, blower, ducting, dan kebutuhan exhaust.', icon: Factory },
];

const process = [
  ['01', 'Konsultasi', 'Sampaikan kebutuhan equipment dan kondisi dapur.'],
  ['02', 'Spesifikasi', 'Bahas ukuran, fungsi, jumlah, material, dan detail yang dibutuhkan.'],
  ['03', 'Penawaran', 'BBKitchen menyusun penawaran berdasarkan spesifikasi yang dibahas.'],
  ['04', 'Produksi', 'Equipment dikerjakan melalui proses produksi/fabrikasi.'],
  ['05', 'Pengiriman / Instalasi', 'Pengiriman atau instalasi dikoordinasikan sesuai kebutuhan.'],
];

const faq = [
  ['Apakah bisa membuat equipment dengan ukuran custom?', 'Bisa dibahas berdasarkan ukuran ruang dan spesifikasi yang dibutuhkan.'],
  ['Apa saja yang bisa diproduksi?', 'Mulai dari meja stainless, sink, rack, trolley, storage, cooking equipment, hingga hood dan exhaust.'],
  ['Apakah bisa membuat equipment berdasarkan desain sendiri?', 'Spesifikasi atau referensi dapat dikirim untuk dibahas bersama tim BBKitchen.'],
  ['Apakah bisa membuat beberapa equipment sekaligus?', 'Bisa diajukan sebagai kebutuhan beberapa unit atau proyek.'],
  ['Bagaimana cara meminta penawaran?', 'Kirim kebutuhan, ukuran jika tersedia, jumlah unit, serta foto atau referensi melalui WhatsApp.'],
];

const breadcrumbJsonLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Produksi Baru', item: `${SITE_URL}/produksi-baru` }] };

export default function ProduksiBaruPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main>
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_15%_80%,rgba(245,158,11,0.12),transparent_30%)]" />
          <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20 lg:py-24"><div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-400">BBKitchen • Produksi Baru</p><h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02]">Produksi Peralatan Dapur Restoran Sesuai Kebutuhan</h1><p className="mt-6 max-w-2xl text-sm sm:text-base leading-7 text-slate-300">Peralatan dapur stainless dan kitchen equipment baru yang dibuat sesuai ukuran, fungsi, dan kebutuhan operasional dapur Anda.</p><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-white hover:bg-emerald-400 transition-colors"><MessageCircle className="w-4 h-4" />Konsultasi Produksi <ArrowRight className="w-4 h-4" /></a></div></div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16"><div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Equipment</p><h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Apa yang Bisa Diproduksi?</h2></div><div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">{products.map(({ title, description, icon: Icon }) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><Icon className="w-5 h-5" /></div><h3 className="mt-4 text-sm sm:text-base font-black">{title}</h3><p className="mt-1.5 text-xs sm:text-sm leading-5 text-slate-500">{description}</p></article>)}</div></section>

        <section className="bg-white border-y border-slate-200"><div className="max-w-7xl mx-auto px-4 py-12 sm:py-16"><div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Custom</p><h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Dibuat Sesuai Kebutuhan Dapur Anda</h2><p className="mt-3 text-sm leading-6 text-slate-600">Setiap dapur memiliki ukuran ruang, alur kerja, dan kebutuhan equipment yang berbeda. Spesifikasi peralatan dapat dibahas berdasarkan ukuran ruang, fungsi, kapasitas, dan kebutuhan operasional.</p></div><div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">{[['Ukuran','Menyesuaikan ruang dan layout.'],['Fungsi','Disesuaikan dengan cara equipment digunakan.'],['Material','Spesifikasi material dibahas sesuai kebutuhan equipment.'],['Finishing','Detail konstruksi dan finishing disesuaikan dengan penggunaan.']].map(([title,description])=><article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5"><h3 className="text-sm font-black">{title}</h3><p className="mt-1.5 text-xs sm:text-sm leading-5 text-slate-500">{description}</p></article>)}</div></div></section>

        <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16"><div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Proses</p><h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Dari Konsultasi sampai Produksi</h2></div><div className="mt-8 grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">{process.map(([number,title,description])=><article key={number} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"><span className="text-xs font-black text-emerald-700">{number}</span><h3 className="mt-3 text-sm font-black">{title}</h3><p className="mt-1.5 text-xs leading-5 text-slate-500">{description}</p></article>)}</div></section>

        <section className="bg-slate-950 text-white"><div className="max-w-7xl mx-auto px-4 py-12 sm:py-16"><div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[0.18em] text-amber-400">Kebutuhan</p><h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Untuk Berbagai Kebutuhan Dapur</h2><p className="mt-3 text-sm leading-6 text-slate-300">Restoran, cafe, catering, bakery, dapur komersial, hingga kebutuhan Dapur MBG/SPPG.</p><div className="mt-6 flex flex-wrap gap-2">{['Restoran','Cafe','Catering','Bakery','Dapur Komersial','Dapur MBG / SPPG'].map(item=><span key={item} className="rounded-full border border-slate-700 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-200">{item}</span>)}</div></div></div></section>

        <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16"><div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Konsultasi</p><h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Tidak Menemukan Equipment yang Anda Cari?</h2><p className="mt-3 text-sm leading-6 text-slate-600">Tidak semua kebutuhan dapur tersedia sebagai unit siap pakai. Jika ukuran, bentuk, atau fungsi yang Anda butuhkan berbeda, konsultasikan kebutuhan tersebut dengan BBKitchen.</p><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white hover:bg-emerald-500 transition-colors"><MessageCircle className="w-4 h-4" />Konsultasi Produksi <ArrowRight className="w-4 h-4" /></a></div></section>

        <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16"><div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">FAQ</p><h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Pertanyaan yang Sering Ditanyakan</h2></div><div className="mt-7 max-w-4xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white overflow-hidden">{faq.map(([question,answer])=><details key={question} className="group p-5"><summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-sm font-black text-slate-900">{question}<span className="text-slate-400 transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">{answer}</p></details>)}</div></section>

        <section className="max-w-7xl mx-auto px-4 py-14 sm:py-20 text-center"><CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" /><h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">Butuh Equipment Dapur Baru?</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">Kirim kebutuhan, ukuran, atau foto referensi Anda. BBKitchen akan membantu membahas spesifikasi equipment yang sesuai.</p><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-black text-white hover:bg-emerald-500 transition-colors"><ShoppingCart className="w-4 h-4" />Konsultasi Produksi via WhatsApp</a></section>
      </main>
      <Footer onSelectCategory={() => undefined} />
    </div>
  );
}
