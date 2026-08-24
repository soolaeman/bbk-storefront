import type { Metadata } from 'next';
import { DapurMbgLanding } from '../../components/DapurMbgLanding';

const SITE_URL = 'https://www.bukanbarukitchen.com';
const PUBLIC_PATH = '/solusi-peralatan-dapur-mbg/';

export const metadata: Metadata = {
  title: 'Peralatan Dapur MBG & Equipment SPPG | BBKitchen',
  description: 'Solusi peralatan dapur komersial untuk kebutuhan preparation, cooking, washing, storage, packing, dan exhaust pada operasional Dapur MBG/SPPG.',
  keywords: ['peralatan dapur MBG', 'equipment dapur MBG', 'peralatan SPPG', 'equipment SPPG', 'paket dapur MBG', 'dapur MBG'],
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: `${SITE_URL}${PUBLIC_PATH}` },
  openGraph: {
    title: 'Peralatan Dapur MBG & Equipment SPPG | BBKitchen',
    description: 'Solusi peralatan dapur komersial untuk kebutuhan preparation, cooking, washing, storage, packing, dan exhaust pada operasional Dapur MBG/SPPG.',
    url: `${SITE_URL}${PUBLIC_PATH}`,
    type: 'website',
  },
};

export default function SolusiPeralatanDapurMbgPage() {
  return <DapurMbgLanding />;
}
