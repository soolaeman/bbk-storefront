import type { Metadata } from 'next';
import App from '../App';

export const metadata: Metadata = {
  title: 'BBKitchen — Peralatan Dapur Komersial',
  description:
    'Temukan peralatan dapur komersial untuk restoran, cafe, catering, bakery, hotel, dan bisnis kuliner.',
};

export default function HomePage() {
  return <App />;
}
