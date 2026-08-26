import { NextRequest, NextResponse } from 'next/server';
import { getWooCommerceProducts } from '../../../lib/woocommerce';

export const dynamic = 'force-dynamic';

function calculateDynamicPricing(modal: number) {
  if (!modal || modal <= 0) return null;
  
  let buka = 0;
  let deal = 0;
  let floor = 0;

  if (modal < 1000000) {
    buka = modal + Math.max(150000, Math.round((modal * 0.35) / 1000) * 1000);
    deal = modal + Math.max(100000, Math.round((modal * 0.25) / 1000) * 1000);
    floor = modal + Math.max(75000, Math.round((modal * 0.15) / 1000) * 1000);
  } else if (modal <= 4000000) {
    buka = modal + 750000;
    deal = modal + 500000;
    floor = modal + 300000;
  } else if (modal <= 10000000) {
    buka = modal + Math.max(1200000, Math.round((modal * 0.25) / 10000) * 10000);
    deal = modal + Math.max(800000, Math.round((modal * 0.18) / 10000) * 10000);
    floor = modal + Math.max(500000, Math.round((modal * 0.10) / 10000) * 10000);
  } else {
    buka = modal + Math.max(2500000, Math.round((modal * 0.15) / 10000) * 10000);
    deal = modal + Math.max(1800000, Math.round((modal * 0.10) / 10000) * 10000);
    floor = modal + Math.max(1000000, Math.round((modal * 0.06) / 10000) * 10000);
  }

  return {
    modal,
    buka: Math.round(buka),
    deal: Math.round(deal),
    floor: Math.round(floor),
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('q')?.trim() || '';
    const sku = searchParams.get('sku')?.trim() || '';
    const normalizeUnitCode = (val: string) => val.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const isUnitCodeQuery = (val: string) => {
      const normalized = normalizeUnitCode(val);
      return normalized.length >= 4 && /^BBK\d+$/.test(normalized);
    };

    const isSkuQuery = isUnitCodeQuery(search);

    const products = await getWooCommerceProducts({
      search: isSkuQuery ? undefined : (search || undefined),
      sku: isSkuQuery ? normalizeUnitCode(search) : (sku || undefined),
      perPage: 30,
    });

    const enriched = products.map((p) => {
      const modalPrice = p.price || 0;
      const pricing = calculateDynamicPricing(modalPrice);

      return {
        id: p.id,
        sku: p.sku,
        name: p.name,
        slug: p.slug,
        category: p.category,
        status: p.status,
        condition: p.condition,
        location: p.location,
        summary: p.summary,
        images: p.images,
        telegramUrl: p.adminTelegramRef || null,
        pricing,
      };
    });

    return NextResponse.json({
      success: true,
      total: enriched.length,
      products: enriched,
    });
  } catch (error) {
    console.error('Error fetching sales helper products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
