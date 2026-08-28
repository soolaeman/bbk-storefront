import type { Metadata } from 'next';
import App from '../App';

const SITE_URL = 'https://www.bukanbarukitchen.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'BBKitchen — Peralatan Dapur Komersial',
  description:
    'Temukan peralatan dapur komersial untuk restoran, cafe, catering, bakery, hotel, dan bisnis kuliner.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'BBKitchen — Peralatan Dapur Komersial',
    description:
      'Temukan peralatan dapur komersial untuk restoran, cafe, catering, bakery, hotel, dan bisnis kuliner.',
    url: SITE_URL,
    type: 'website',
  },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'BBKitchen - Bukan Baru Kitchen',
  url: SITE_URL,
  telephone: '+6285122001051',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Perumahan Griya Pamulang 2, Jl. Tulip Raya Blok E1 No.12A RT 004/020, Pondok Benda, Pamulang',
    addressLocality: 'Tangerang Selatan',
    addressRegion: 'Banten',
    addressCountry: 'ID',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <App />
    </>
  );
}
