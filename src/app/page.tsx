import type { Metadata } from 'next';
import App from '../App';

const WORDPRESS_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://bukanbarukitchen.com';

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

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Yoast API returned ${response.status}`);
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
      title: title || 'BBKitchen — Peralatan Dapur Komersial',
      description:
        description ||
        'Temukan peralatan dapur komersial untuk restoran, cafe, catering, bakery, hotel, dan bisnis kuliner.',
      alternates: canonical ? { canonical } : undefined,
      openGraph: {
        title: title || 'BBKitchen — Peralatan Dapur Komersial',
        description:
          description ||
          'Temukan peralatan dapur komersial untuk restoran, cafe, catering, bakery, hotel, dan bisnis kuliner.',
        url: canonical || targetUrl,
        images: ogImage ? [{ url: ogImage }] : undefined,
        type: 'website',
      },
    };
  } catch (error) {
    console.error('Failed to load Yoast homepage metadata:', error);

    return {
      title: 'BBKitchen — Peralatan Dapur Komersial',
      description:
        'Temukan peralatan dapur komersial untuk restoran, cafe, catering, bakery, hotel, dan bisnis kuliner.',
      openGraph: {
        title: 'BBKitchen — Peralatan Dapur Komersial',
        description:
          'Temukan peralatan dapur komersial untuk restoran, cafe, catering, bakery, hotel, dan bisnis kuliner.',
        url: targetUrl,
        type: 'website',
      },
    };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return getYoastHomepageMetadata();
}

export default function HomePage() {
  return <App />;
}
