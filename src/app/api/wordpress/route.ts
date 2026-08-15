import { NextResponse } from 'next/server';
import {
  getWordPressMedia,
  getWordPressPages,
  getWordPressPosts,
  type WordPressQueryOptions,
} from '../../../lib/wordpress';

export const runtime = 'nodejs';

function getQueryOptions(searchParams: URLSearchParams): WordPressQueryOptions {
  const options: WordPressQueryOptions = {};
  const numericKeys = ['page', 'perPage', 'parent'] as const;

  for (const key of numericKeys) {
    const value = searchParams.get(key);
    if (!value) continue;
    const parsed = Number(value);
    if (Number.isInteger(parsed) && parsed > 0) options[key] = parsed;
  }

  const stringKeys = [
    'search',
    'slug',
    'status',
    'categories',
    'tags',
    'orderby',
  ] as const;

  for (const key of stringKeys) {
    const value = searchParams.get(key);
    if (value) options[key] = value;
  }

  const order = searchParams.get('order');
  if (order === 'asc' || order === 'desc') options.order = order;

  return options;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const resource = url.searchParams.get('resource') || 'posts';
  const options = getQueryOptions(url.searchParams);

  try {
    if (resource === 'pages') {
      return NextResponse.json(await getWordPressPages(options));
    }

    if (resource === 'media') {
      return NextResponse.json(await getWordPressMedia(options));
    }

    if (resource === 'posts') {
      return NextResponse.json(await getWordPressPosts(options));
    }

    return NextResponse.json(
      { error: 'Resource WordPress tidak didukung.', supported: ['pages', 'posts', 'media'] },
      { status: 400 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'WordPress REST API gagal.';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
