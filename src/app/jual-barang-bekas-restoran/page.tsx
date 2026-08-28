import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { getWordPressPages } from '../../lib/wordpress';

interface LocationPage {
  id: number;
  title: { rendered: string };
  slug: string;
  parent: number;
}

const SITE_URL = 'https://www.bukanbarukitchen.com';

function labelFromSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function cleanTitle(title: string, fallback: string) {
  const text = title.replace(/<[^>]+>/g, '').trim();
  return text || fallback;
}

export const metadata: Metadata = {
  title: 'Jual Barang Bekas Restoran',
  description:
    'Temukan wilayah layanan BBKitchen untuk jual barang bekas restoran dan peralatan dapur komersial.',
  alternates: {
    canonical: `${SITE_URL}/jual-barang-bekas-restoran/`,
  },
};

async function getLocationMap() {
  const roots = await getWordPressPages({
    slug: 'jual-barang-bekas-restoran',
    parent: 0,
  });

  const root = roots[0];
  if (!root) return [];

  // Ambil seluruh halaman turunan sekali per batch, lalu bangun path
  // berdasarkan parent WordPress. Tidak perlu daftar wilayah manual.
  const [firstBatch, secondBatch] = await Promise.all([
    getWordPressPages({
      parent: root.id,
      perPage: 100,
      page: 1,
      orderby: 'menu_order',
      order: 'asc',
    }),
    getWordPressPages({
      parent: root.id,
      perPage: 100,
      page: 2,
      orderby: 'menu_order',
      order: 'asc',
    }),
  ]);

  const directChildren = [...firstBatch, ...secondBatch] as LocationPage[];

  // Halaman daerah saat ini bertingkat (provinsi/kota/kecamatan).
  // Telusuri semua turunannya supaya mapping tidak bergantung pada level daerah.
  const allPages = [...directChildren];
  const byParent = new Map<number, LocationPage[]>();

  for (const page of directChildren) {
    const children = byParent.get(page.parent) ?? [];
    children.push(page);
    byParent.set(page.parent, children);
  }

  // Ambil descendants sampai seluruh tree selesai.
  const queue = [...directChildren];
  while (queue.length > 0) {
    const parent = queue.shift();
    if (!parent) continue;

    const [batch1, batch2] = await Promise.all([
      getWordPressPages({
        parent: parent.id,
        perPage: 100,
        page: 1,
        orderby: 'menu_order',
        order: 'asc',
      }),
      getWordPressPages({
        parent: parent.id,
        perPage: 100,
        page: 2,
        orderby: 'menu_order',
        order: 'asc',
      }),
    ]);

    const children = [...batch1, ...batch2] as LocationPage[];
    if (children.length === 0) continue;

    byParent.set(parent.id, children);
    allPages.push(...children);
    queue.push(...children);
  }

  const pathById = new Map<number, string>();

  function buildPath(page: LocationPage): string {
    const cached = pathById.get(page.id);
    if (cached) return cached;

    const parent = allPages.find((item) => item.id === page.parent);
    const path = parent
      ? `${buildPath(parent)}/${page.slug}`
      : page.slug;

    pathById.set(page.id, path);
    return path;
  }

  function firstH2(contentHtml: string) {
    const match = contentHtml.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/i);
    if (!match) return '';

    return match[1]
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/\\s+/g, ' ')
      .trim();
  }

  const seen = new Set<string>();
  const items: { id: number; title: string; href: string }[] = [];

  // Urutan mengikuti struktur WordPress/menu_order, tetapi judul kartu
  // sepenuhnya berasal dari H2 pertama masing-masing halaman.
  for (const page of allPages) {
    const title = firstH2(page.content?.rendered ?? '') ||
      cleanTitle(page.title?.rendered ?? '', labelFromSlug(page.slug));

    const key = title.toLocaleLowerCase('id-ID');
    if (!title || seen.has(key)) continue;

    seen.add(key);
    items.push({
      id: page.id,
      title,
      href: `/jual-barang-bekas-restoran/${buildPath(page)}/`,
    });
  }

  return items;
}

export default async function JualBarangBekasRestoranPage() {
  const locations = await getLocationMap();

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <Header />

      <main>
        <article className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 overflow-x-auto text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="inline-flex min-w-max items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-600">
              <Link href="/" className="font-medium hover:text-slate-950">
                Home
              </Link>
              <span aria-hidden="true" className="text-slate-300">
                /
              </span>
              <span aria-current="page" className="font-semibold text-slate-900">
                Jual Barang Bekas Restoran
              </span>
            </div>
          </nav>

          <header className="mb-10 border-b border-slate-200 pb-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-amber-600">
              Halaman Wilayah
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Jual Barang Bekas Restoran
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
              Pilih wilayah untuk melihat halaman jual barang bekas restoran dan
              peralatan dapur komersial di area tersebut.
            </p>
          </header>

          <section aria-labelledby="location-map-title">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2
                  id="location-map-title"
                  className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl"
                >
                  Pilih Wilayah
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Daftar solusi diambil dari H2 pertama pada halaman turunan WordPress.
                </p>
              </div>
              <span className="hidden shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 sm:inline-flex">
                {locations.length} solusi
              </span>
            </div>

            {locations.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {locations.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-black leading-snug text-slate-950 group-hover:text-emerald-700">
                        {item.title}
                      </h3>
                      <span className="shrink-0 text-sm font-bold text-emerald-700">
                        Lihat →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-8 text-center text-sm text-slate-600">
                Belum ada halaman wilayah yang tersedia.
              </div>
            )}
          </section>
        </article>
      </main>

      <Footer onSelectCategory={() => undefined} />
    </div>
  );
}
