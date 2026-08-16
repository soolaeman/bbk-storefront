import { NextRequest, NextResponse } from 'next/server';
import { getWordPressPosts } from '../../../lib/wordpress';

export async function GET(request: NextRequest) {
  const limit = Math.min(Math.max(Number(request.nextUrl.searchParams.get('limit') || '3'), 1), 6);

  try {
    const posts = await getWordPressPosts({
      perPage: limit,
      status: 'publish',
      orderby: 'date',
      order: 'desc',
    });

    return NextResponse.json(posts, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('WordPress recent posts request failed:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil artikel terbaru BBKitchen.' },
      { status: 502 },
    );
  }
}
