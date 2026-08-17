import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../index.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bukanbarukitchen.com'),
  title: {
    default: 'BBKitchen — Peralatan Dapur Komersial',
    template: '%s | BBKitchen',
  },
  description:
    'BBKitchen menyediakan peralatan dapur komersial untuk restoran, cafe, catering, bakery, hotel, dan bisnis kuliner.',
  applicationName: 'BBKitchen',
  authors: [{ name: 'BBKitchen' }],
  creator: 'BBKitchen',
  publisher: 'BBKitchen',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'BBKitchen',
    title: 'BBKitchen — Peralatan Dapur Komersial',
    description:
      'Peralatan dapur komersial untuk restoran, cafe, catering, bakery, hotel, dan bisnis kuliner.',
    url: 'https://www.bukanbarukitchen.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
