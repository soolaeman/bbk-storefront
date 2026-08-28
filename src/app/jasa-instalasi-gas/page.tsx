import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Factory, Flame, MessageCircle, Ruler, ShoppingCart, Truck, Utensils, Warehouse } from 'lucide-react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

const SITE_URL = 'https://bukanbarukitchen.com';
const WHATSAPP_URL = 'https://wa.me/6285122001051?text=Halo%20BBKitchen%2C%20saya%20ingin%20konsultasi%20jasa%20instalasi%20gas%2C%20ducting%2C%20hood%20dan%20exhaust.';

export const metadata: Metadata = {
  title: 'Jasa Instalasi Gas, Ducting, Hood dan Exhaust | BBKitchen',
  description: 'Jasa instalasi gas, ducting, hood dan exhaust untuk restoran, cafe, catering, bakery, dapur komersial, dan kebutuhan kitchen equipment.',
  keywords: ['jasa instalasi gas', 'instalasi gas restoran', 'jasa ducting', 'jasa kitchen hood', 'jasa exhaust dapur', 'instalasi hood exhaust', 'ducting restoran', 'instalasi dapur komersial'],
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: `${SITE_URL}/jasa-instalasi-gas` },
  openGraph: { title: 'Jasa Instalasi Gas, Ducting, Hood dan Exhaust | BBKitchen', description: 'Layanan instalasi gas, ducting, hood dan exhaust sesuai kebutuhan dapur komersial.', url: `${SITE_URL}/jasa-instalasi-gas`, type: 'website' },
};

const services = [
  { title: 'Instalasi Gas', description: 'Penataan jalur gas dan koneksi equipment dapur sesuai kebutuhan operasional.', icon: Flame },
  { title: 'Ducting', description: 'Perencanaan dan pemasangan jalur ducting untuk sistem pembuangan udara.', icon: Ruler },
  { title: 'Kitchen Hood', description: 'Hood untuk membantu menangkap asap, panas, dan uap dari area memasak.', icon: Factory },
  { title: 'Exhaust', description: 'Sistem exhaust dan blower untuk membantu sirkulasi serta pembuangan udara dapur.', icon: Warehouse },
  { title: 'Layout & Jalur', description: 'Penyesuaian jalur instalasi dengan layout dan posisi equipment dapur.', icon: Utensils },
  { title: 'Integrasi Equipment', description: 'Koordinasi instalasi dengan kompor dan equipment dapur yang digunakan.', icon: Truck },
];

const process = [
  ['01', 'Konsultasi', 'Sampaikan kondisi dapur, kebutuhan gas, hood, ducting, atau exhaust.'],
  ['02', 'Survey & Spesifikasi', 'Bahas layout, jalur, posisi equipment, ukuran, dan kebutuhan instalasi.'],
  ['03', 'Penawaran', 'BBKitchen menyusun penawaran berdasarkan kebutuhan yang dibahas.'],
  ['04', 'Pengerjaan', 'Instalasi dikerjakan sesuai spesifikasi dan kondisi lapangan.'],
  ['05', 'Pengecekan', 'Sistem dan hasil pemasangan diperiksa sebelum digunakan.'],
];

const faq = [
  ['Apakah BBKitchen melayani instalasi gas?', 'Ya, kebutuhan instalasi gas dapat dikonsultasikan berdasarkan kondisi dan layout dapur.'],
  ['Apakah bisa sekaligus ducting, hood, dan exhaust?', 'Bisa dibahas sebagai satu kebutuhan instalasi agar jalur dan posisi equipment dapat disesuaikan.'],
  ['Apakah bisa untuk restoran atau dapur komersial?', 'Bisa dikonsultasikan untuk restoran, cafe, catering, bakery, dapur komersial, dan kebutuhan sejenis.'],
  ['Apakah perlu survey terlebih dahulu?', 'Survey atau informasi kondisi lapangan dapat dibahas untuk menentukan spesifikasi dan kebutuhan pengerjaan.'],
  ['Bagaimana cara meminta penawaran?', 'Kirim foto, lokasi, layout jika tersedia, serta kebutuhan gas, hood, ducting, dan exhaust melalui WhatsApp.'],
];

const breadcrumbJsonLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Instalasi Gas', item: `${SITE_URL}/jasa-instalasi-gas` }] };

export default function JasaInstalasiGasPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main>
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_15%_80%,rgba(245,158,11,0.12),transparent_30%)]" />
          <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20 lg:py-24"><div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-400">BBKitchen • Instalasi Gas</p><h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02]">Lebih Lengkap Jasa Instalasi Gas, Ducting, Hood dan Exhaust</h1><p className="mt-6 max-w-2xl text-sm sm:text-base leading-7 text-slate-300">Layanan instalasi gas, ducting, hood dan exhaust yang disesuaikan dengan layout, kebutuhan equipment, dan kondisi dapur komersial Anda.</p><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-white hover:bg-emerald-400 transition-colors"><MessageCircle className="w-4 h-4" />Konsultasi Instalasi <ArrowRight className="w-4 h-4" /></a></div></div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16"><div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Layanan</p><h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Layanan Instalasi yang Tersedia</h2></div><div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">{services.map(({ title, description, icon: Icon }) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><Icon className="w-5 h-5" /></div><h3 className="mt-4 text-sm sm:text-base font-black">{title}</h3><p className="mt-1.5 text-xs sm:text-sm leading-5 text-slate-500">{description}</p></article>)}</div></section>

        <section className="bg-white border-y border-slate-200"><div className="max-w-7xl mx-auto px-4 py-12 sm:py-16"><div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Penyesuaian</p><h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Instalasi Disesuaikan dengan Kondisi Dapur Anda</h2><p className="mt-3 text-sm leading-6 text-slate-600">Setiap dapur memiliki layout, jalur utilitas, dan posisi equipment yang berbeda. Kebutuhan instalasi dapat dibahas berdasarkan kondisi ruang, fungsi, kapasitas, dan kebutuhan operasional.</p></div><div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">{[['Layout','Menyesuaikan ruang dan posisi equipment.'],['Jalur','Disesuaikan dengan kebutuhan instalasi dan alur kerja.'],['Spesifikasi','Dibahas berdasarkan kebutuhan sistem dan kondisi lapangan.'],['Pengerjaan','Detail pemasangan disesuaikan dengan kebutuhan proyek.']].map(([title,description])=><article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5"><h3 className="text-sm font-black">{title}</h3><p className="mt-1.5 text-xs sm:text-sm leading-5 text-slate-500">{description}</p></article>)}</div></div></section>

        <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16"><div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Proses</p><h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Dari Konsultasi sampai Pengerjaan</h2></div><div className="mt-8 grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">{process.map(([number,title,description])=><article key={number} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"><span className="text-xs font-black text-emerald-700">{number}</span><h3 className="mt-3 text-sm font-black">{title}</h3><p className="mt-1.5 text-xs leading-5 text-slate-500">{description}</p></article>)}</div></section>

        <section className="bg-slate-950 text-white"><div className="max-w-7xl mx-auto px-4 py-12 sm:py-16"><div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[0.18em] text-amber-400">Kebutuhan</p><h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Untuk Berbagai Kebutuhan Dapur Komersial</h2><p className="mt-3 text-sm leading-6 text-slate-300">Restoran, cafe, catering, bakery, dapur komersial, hingga kebutuhan dapur MBG/SPPG.</p><div className="mt-6 flex flex-wrap gap-2">{['Restoran','Cafe','Catering','Bakery','Dapur Komersial','Dapur MBG / SPPG'].map(item=><span key={item} className="rounded-full border border-slate-700 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-200">{item}</span>)}</div></div></div></section>

        <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16"><div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Konsultasi</p><h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Butuh Instalasi Gas, Ducting, Hood atau Exhaust?</h2><p className="mt-3 text-sm leading-6 text-slate-600">Kebutuhan instalasi dapur sering bergantung pada layout dan kondisi lapangan. Konsultasikan kebutuhan gas, ducting, hood, dan exhaust dengan BBKitchen.</p><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white hover:bg-emerald-500 transition-colors"><MessageCircle className="w-4 h-4" />Konsultasi Instalasi <ArrowRight className="w-4 h-4" /></a></div></section>

        <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16"><div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">FAQ</p><h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Pertanyaan yang Sering Ditanyakan</h2></div><div className="mt-7 max-w-4xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white overflow-hidden">{faq.map(([question,answer])=><details key={question} className="group p-5"><summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-sm font-black text-slate-900">{question}<span className="text-slate-400 transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">{answer}</p></details>)}</div></section>

        <section className="max-w-7xl mx-auto px-4 py-14 sm:py-20 text-center"><CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" /><h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">Butuh Jasa Instalasi Dapur?</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">Kirim foto, lokasi, layout, atau kebutuhan instalasi Anda. BBKitchen akan membantu membahas pekerjaan yang sesuai.</p><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-black text-white hover:bg-emerald-500 transition-colors"><ShoppingCart className="w-4 h-4" />Konsultasi Instalasi via WhatsApp</a></section>
      </main>
      <Footer onSelectCategory={() => undefined} />
    </div>
  );
}
