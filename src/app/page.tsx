import type { Metadata } from 'next';
import App from '../App';

const DEFAULT_SITE_URL = 'https://bukanbarukitchen.com';
const WORDPRESS_URL = (process.env.NEXT_PUBLIC_WORDPRESS_URL || DEFAULT_SITE_URL)
  .replace(/^https?:\/\/www\./i, 'https://');

interface YoastHeadResponse {
  head?: string;
  status?: number;
}

function getMetaContent(head: string, property: string): string | undefined {
  const escapedProperty = property.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(
    `<meta[^>]+(?:property|name)=["']${escapedProperty}["'][^>]+content=["']([^"']*)["'][^>]*>|<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${escapedProperty}["'][^>]*>`,
    'i',
  );

  const match = head.match(pattern);
  return match?.[1] || match?.[2] || undefined;
}

function getTitle(head: string): string | undefined {
  const match = head.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match?.[1]?.trim() || undefined;
}

async function getYoastHomepageMetadata(): Promise<Metadata> {
  const siteUrl = WORDPRESS_URL.replace(/\/$/, '');
  const targetUrl = `${siteUrl}/`;
  const endpoint = `${siteUrl}/wp-json/yoast/v1/get_head?url=${encodeURIComponent(targetUrl)}`;

  const fallbackMetadata: Metadata = {
    title: 'BBKitchen — Peralatan Dapur Komersial',
    description:
      'Temukan peralatan dapur komersial untuk restoran, cafe, catering, bakery, hotel, dan bisnis kuliner.',
    metadataBase: new URL(DEFAULT_SITE_URL),
    alternates: { canonical: DEFAULT_SITE_URL },
    openGraph: {
      title: 'BBKitchen — Peralatan Dapur Komersial',
      description:
        'Temukan peralatan dapur komersial untuk restoran, cafe, catering, bakery, hotel, dan bisnis kuliner.',
      url: DEFAULT_SITE_URL,
      type: 'website',
    },
  };

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn('Yoast homepage metadata endpoint returned 404; using BBKitchen fallback metadata.');
      } else {
        console.warn(`Yoast homepage metadata returned ${response.status}; using BBKitchen fallback metadata.`);
      }
      return fallbackMetadata;
    }

    const data = (await response.json()) as YoastHeadResponse;
    const head = data.head || '';

    const title = getMetaContent(head, 'og:title') || getTitle(head);
    const description =
      getMetaContent(head, 'description') || getMetaContent(head, 'og:description');
    const ogImage = getMetaContent(head, 'og:image');
    const canonical =
      getMetaContent(head, 'og:url') || getMetaContent(head, 'canonical');

    return {
      metadataBase: new URL(DEFAULT_SITE_URL),
      title: title || fallbackMetadata.title,
      description: description || fallbackMetadata.description,
      alternates: { canonical: canonical || DEFAULT_SITE_URL },
      openGraph: {
        title: title || fallbackMetadata.title,
        description: description || fallbackMetadata.description,
        url: canonical || DEFAULT_SITE_URL,
        images: ogImage ? [{ url: ogImage }] : undefined,
        type: 'website',
      },
    };
  } catch (error) {
    console.warn('Failed to load Yoast homepage metadata; using BBKitchen fallback metadata.', error);
    return fallbackMetadata;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return getYoastHomepageMetadata();
}

export default function HomePage() {
  return <App />;
}
