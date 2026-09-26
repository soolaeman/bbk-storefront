import type { Metadata } from 'next';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../index.css';

const SITE_URL = 'https://bukanbarukitchen.com';
const GA4_ID = 'G-7NKG2N67L2';
const META_PIXEL_ID = '1692161474757353';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'BBKitchen — Peralatan Dapur Komersial Bekas Bergaransi',
    template: '%s | BBKitchen',
  },
  description:
    'BBKitchen menyediakan peralatan dapur komersial bekas ex-resto bergaransi untuk restoran, cafe, catering, bakery, dan program MBG.',
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
    title: 'BBKitchen — Peralatan Dapur Komersial Bekas Bergaransi',
    description:
      'Peralatan dapur komersial bekas ex-resto bergaransi untuk restoran, cafe, catering, bakery, dan program MBG.',
    url: SITE_URL,
  },
  verification: {
    google: 'R32jn5X4W_pvu787AxVtWsqLGAS2mhoBesvJumGZeyk',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* Google Analytics 4 */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
