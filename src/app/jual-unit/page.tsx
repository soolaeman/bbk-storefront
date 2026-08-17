import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Refrigerator, Flame, Utensils, Warehouse, MessageCircle } from 'lucide-react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

const SITE_URL = 'https://bukanbarukitchen.com';
const WHATSAPP_URL = 'https://wa.me/6285122001051?text=Halo%20BBKitchen%2C%20saya%20ingin%20menjual%20peralatan%20dapur%20bekas.%20Saya%20akan%20kirim%20foto%20dan%20detail%20unit.';

export const metadata: Metadata = {
  title: 'Jual Peralatan Dapur Bekas ke BBKitchen | Satuan & Borongan',
  description: 'Jual peralatan dapur bekas, peralatan restoran, cafe, dan commercial kitchen equipment ke BBKitchen. Ajukan unit satuan maupun borongan untuk direview.',
  keywords: ['jual peralatan dapur bekas', 'jual alat dapur bekas', 'jual peralatan restoran bekas', 'jual kitchen equipment bekas', 'jual alat dapur restoran', 'jual alat dapur cafe', 'jual bongkaran restoran'],
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: `${SITE_URL}/jual-unit` },
  openGraph: {
    title: 'Jual Peralatan Dapur Bekas ke BBKitchen',
    description: 'Ajukan peralatan dapur restoran, cafe, catering, dan commercial kitchen equipment bekas ke BBKitchen, satuan maupun borongan.',
    url: `${SITE_URL}/jual-unit`,
    type: 'website',
  },
};

const equipment = [
  { title: 'Cooking Equipment', description: 'Kompor, kwali range, fryer, oven, steamer, dan peralatan memasak.', icon: Flame },
  { title: 'Preparation & Stainless', description: 'Meja stainless, meja preparation, sink, rak, trolley, dan equipment stainless.', icon: Utensils },
  { title: 'Refrigeration', description: 'Chiller, freezer, showcase, dan peralatan pendingin.', icon: Refrigerator },
  { title: 'Equipment Restoran & Cafe', description: 'Kitchen equipment dan perlengkapan pendukung usaha F&B.', icon: Warehouse },
];

const steps = [
  ['01', 'Kirim Foto & Detail', 'Foto unit, jenis, jumlah, kondisi, dan lokasi.'],
  ['02', 'Review', 'BBKitchen meninjau equipment yang Anda ajukan.'],
  ['03', 'Penawaran', 'Jika sesuai kebutuhan, kita lanjutkan pembahasan kondisi dan harga.'],
  ['04', 'Kesepakatan', 'Setelah disepakati, proses selanjutnya dikoordinasikan.'],
];

const faq = [
  ['Apa bisa jual satu unit?', 'Ya, unit dapat diajukan secara satuan maupun borongan.'],
  ['Apa bisa jual bongkaran restoran?', 'Bisa diajukan. Kirim foto kondisi dapur atau equipment yang ingin dilepas.'],
  ['Apa yang harus dikirim?', 'Minimal foto, jenis unit, jumlah, kondisi, dan lokasi.'],
  ['Apakah semua unit pasti dibeli?', 'Setiap unit perlu direview terlebih dahulu berdasarkan kondisi dan kebutuhan pembelian BBKitchen.'],
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Jual Unit ke BBKitchen', item: `${SITE_URL}/jual-unit` },
  ],
};

export default function JualUnitPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header simple />
      <main>
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_15%_80%,rgba(245,158,11,0.12),transparent_30%)]" />
          <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-400">BBKitchen • Jual Unit</p>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02]">Jual Peralatan Dapur Bekas ke BBKitchen</h1>
              <p className="mt-6 max-w-2xl text-sm sm:text-base leading-7 text-slate-300">Punya peralatan dapur restoran, cafe, catering, atau commercial kitchen equipment yang sudah tidak digunakan? Kirim foto dan detail unit. BBKitchen menerima penawaran unit satuan maupun borongan.</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-white hover:bg-emerald-400 transition-colors"><MessageCircle className="w-4 h-4" />Jual Unit ke BBKitchen <ArrowRight className="w-4 h-4" /></a>
              <p className="mt-3 text-[11px] text-slate-500">Review berdasarkan jenis, kondisi, jumlah, dan lokasi unit.</p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Equipment</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Peralatan yang Bisa Anda Ajukan</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Ajukan peralatan dapur komersial bekas yang sudah tidak digunakan. Tidak yakin equipment Anda termasuk? Kirim fotonya untuk kami review.</p>
          </div>
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {equipment.map(({ title, description, icon: Icon }) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><Icon className="w-5 h-5" /></div><h3 className="mt-4 text-sm sm:text-base font-black">{title}</h3><p className="mt-1.5 text-xs sm:text-sm leading-5 text-slate-500">{description}</p></article>)}
          </div>
        </section>

        <section className="bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <article className="rounded-2xl border border-slate-200 p-6"><p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Satuan</p><h2 className="mt-2 text-xl sm:text-2xl font-black">Jual Satuan ke BBKitchen</h2><p className="mt-3 text-sm leading-6 text-slate-600">Punya satu atau beberapa equipment yang ingin dilepas? Kirim foto, jenis unit, kondisi, jumlah, dan lokasi.</p></article>
              <article className="rounded-2xl border border-slate-200 p-6"><p className="text-xs font-black uppercase tracking-[0.18em] text-amber-600">Borongan</p><h2 className="mt-2 text-xl sm:text-2xl font-black">Jual Borongan ke BBKitchen</h2><p className="mt-3 text-sm leading-6 text-slate-600">Sedang renovasi, pindah, tutup usaha, atau bongkar dapur restoran/cafe? Kirim foto keseluruhan atau daftar equipment yang ingin dilepas.</p></article>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Proses</p><h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Cara Jual Unit ke BBKitchen</h2></div>
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {steps.map(([number, title, description]) => <article key={number} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"><span className="text-xs font-black text-emerald-700">{number}</span><h3 className="mt-3 text-sm sm:text-base font-black">{title}</h3><p className="mt-1.5 text-xs sm:text-sm leading-5 text-slate-500">{description}</p></article>)}
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white hover:bg-emerald-500 transition-colors"><MessageCircle className="w-4 h-4" />Kirim Unit untuk Direview <ArrowRight className="w-4 h-4" /></a>
        </section>

        <section className="bg-slate-950 text-white">
          <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div><p className="text-xs font-black uppercase tracking-[0.18em] text-amber-400">Bongkaran</p><h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Sedang Bongkar Dapur Restoran?</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Jika sedang bongkar restoran, cafe, catering, atau dapur komersial, kirim foto kondisi dan equipment yang ingin dilepas. Foto keseluruhan dapur dan beberapa foto equipment sudah cukup untuk memulai pembahasan.</p></div>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-slate-900 hover:bg-slate-100 transition-colors"><MessageCircle className="w-4 h-4" />Konsultasikan Bongkaran</a>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">FAQ</p><h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">Pertanyaan yang Sering Ditanyakan</h2></div>
          <div className="mt-7 max-w-4xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white overflow-hidden">
            {faq.map(([question, answer]) => <details key={question} className="group p-5"><summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-sm font-black text-slate-900">{question}<span className="text-slate-400 transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">{answer}</p></details>)}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-14 sm:py-20 text-center">
          <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" />
          <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">Punya Equipment yang Mau Dijual?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">Kirim foto dan detail peralatan dapur Anda ke BBKitchen, baik satu unit, beberapa equipment, maupun bongkaran dapur.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-black text-white hover:bg-emerald-500 transition-colors"><MessageCircle className="w-4 h-4" />Jual Unit ke BBKitchen</a>
        </section>
      </main>
      <Footer onSelectCategory={() => undefined} />
    </div>
  );
}
