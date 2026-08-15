import { NextResponse } from 'next/server';
import {
  getWordPressCategories,
  getWordPressMedia,
  getWordPressPages,
  getWordPressPosts,
  getWordPressTags,
  getWordPressUsers,
  searchWordPress,
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
    'include',
    'exclude',
    'after',
    'before',
    'orderby',
    'author',
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

    if (resource === 'posts') {
      return NextResponse.json(await getWordPressPosts(options));
    }

    if (resource === 'media') {
      return NextResponse.json(await getWordPressMedia(options));
    }

    if (resource === 'categories') {
      return NextResponse.json(await getWordPressCategories(options));
    }

    if (resource === 'tags') {
      return NextResponse.json(await getWordPressTags(options));
    }

    if (resource === 'users') {
      return NextResponse.json(await getWordPressUsers(options));
    }

    if (resource === 'search') {
      if (!options.search) {
        return NextResponse.json(
          { error: 'Parameter search wajib untuk resource search.' },
          { status: 400 },
        );
      }

      return NextResponse.json(await searchWordPress(options));
    }

    return NextResponse.json(
      {
        error: 'Resource WordPress tidak didukung.',
        supported: ['pages', 'posts', 'media', 'categories', 'tags', 'users', 'search'],
      },
      { status: 400 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'WordPress REST API gagal.';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
