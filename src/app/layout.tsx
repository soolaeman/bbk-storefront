import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'BBKitchen — Peralatan Dapur Komersial',
  description:
    'Peralatan dapur komersial untuk restoran, cafe, catering, bakery, hotel, dan bisnis kuliner.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
