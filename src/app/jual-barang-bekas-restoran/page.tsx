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

  const provinces = (await getWordPressPages({
    parent: root.id,
    perPage: 100,
    orderby: 'menu_order',
    order: 'asc',
  })) as LocationPage[];

  const locations = await Promise.all(
    provinces.map(async (province) => {
      const cities = (await getWordPressPages({
        parent: province.id,
        perPage: 100,
        orderby: 'menu_order',
        order: 'asc',
      })) as LocationPage[];

      return { province, cities };
    }),
  );

  return locations;
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
                  Daftar wilayah diambil langsung dari struktur halaman WordPress.
                </p>
              </div>
              <span className="hidden shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 sm:inline-flex">
                {locations.length} wilayah
              </span>
            </div>

            {locations.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2">
                {locations.map(({ province, cities }) => {
                  const provinceLabel = cleanTitle(
                    province.title?.rendered ?? '',
                    labelFromSlug(province.slug),
                  );
                  const provinceHref = `/jual-barang-bekas-restoran/${province.slug}/`;

                  return (
                    <section
                      key={province.id}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <Link
                        href={provinceHref}
                        className="group flex items-center justify-between gap-4"
                      >
                        <h3 className="text-xl font-black text-slate-950 group-hover:text-emerald-700">
                          {provinceLabel}
                        </h3>
                        <span className="text-sm font-bold text-emerald-700">
                          Lihat →
                        </span>
                      </Link>

                      {cities.length > 0 ? (
                        <div className="mt-4 grid grid-cols-1 gap-2 border-t border-slate-100 pt-4 sm:grid-cols-2">
                          {cities.map((city) => {
                            const cityLabel = cleanTitle(
                              city.title?.rendered ?? '',
                              labelFromSlug(city.slug),
                            );
                            const cityHref = `/jual-barang-bekas-restoran/${province.slug}/${city.slug}/`;

                            return (
                              <Link
                                key={city.id}
                                href={cityHref}
                                className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
                              >
                                {cityLabel}
                              </Link>
                            );
                          })}
                        </div>
                      ) : null}
                    </section>
                  );
                })}
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
