import { NextRequest, NextResponse } from 'next/server';
import {
  getTursoCatalogMetadata,
  queryTursoWooCommerceProducts,
  TursoProductsQuery,
} from '../../../lib/turso';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  try {
    // 1. Metadata Request for live filters
    if (searchParams.get('metadata') === '1') {
      const metadata = await getTursoCatalogMetadata();
      return NextResponse.json(metadata, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          'X-BBK-Engine': 'Turso-Edge',
        },
      });
    }

    // 2. Query Products from Turso Edge Database
    const perPage = Number(searchParams.get('per_page') || '8');
    const page = Number(searchParams.get('page') || '1');
    const search = searchParams.get('search')?.trim() || undefined;
    const slug = searchParams.get('slug')?.trim() || undefined;
    const category = searchParams.get('category')?.trim() || undefined;
    const condition = searchParams.get('condition')?.trim() || undefined;
    const location = searchParams.get('location')?.trim() || undefined;
    const powerType = searchParams.get('power_type')?.trim() || undefined;
    const statusUnit = searchParams.get('status_unit')?.trim() || undefined;
    const stockStatus = searchParams.get('stock_status')?.trim() || undefined;
    const sku = searchParams.get('sku')?.trim() || undefined;

    let sortBy: 'latest' | 'price_low' | 'price_high' = 'latest';
    if (searchParams.get('orderby') === 'price') {
      sortBy = searchParams.get('order') === 'asc' ? 'price_low' : 'price_high';
    }

    let statusFilter: 'ALL' | 'READY_ONLY' | 'INCLUDE_SOLD' = 'INCLUDE_SOLD';
    if (statusUnit === 'READY') statusFilter = 'READY_ONLY';

    const result = await queryTursoWooCommerceProducts({
      perPage,
      page,
      search,
      slug,
      category,
      condition,
      location,
      powerType,
      statusFilter,
      stockStatus,
      sku,
      sortBy,
    });

    return NextResponse.json(result.products, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        'X-WP-Total': String(result.total),
        'X-WP-TotalPages': String(result.totalPages),
        'X-BBK-Engine': 'Turso-Edge',
      },
    });
  } catch (error) {
    console.error('API /api/products error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
