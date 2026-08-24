import type { Metadata } from 'next';
import App from '../App';

const SITE_URL = 'https://bukanbarukitchen.com';

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

export default function HomePage() {
  return <App />;
}
