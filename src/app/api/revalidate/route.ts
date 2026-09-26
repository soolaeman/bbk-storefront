import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || 'bbk_revalidate_secret_key_2026';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('x-revalidate-secret');
    const { searchParams } = new URL(request.url);
    const querySecret = searchParams.get('secret');

    let body: any = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const providedSecret = body.secret || authHeader || querySecret;

    if (providedSecret !== REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid revalidation secret token' },
        { status: 401 }
      );
    }

    const revalidatedPaths: string[] = [];
    const revalidatedTags: string[] = [];

    // 1. Bulk / Global Revalidation
    if (body.all === true || searchParams.get('all') === 'true') {
      (revalidateTag as any)('products');
      (revalidateTag as any)('categories');
      revalidatePath('/', 'layout');
      revalidatePath('/shop', 'page');
      revalidatePath('/kategori', 'layout');

      revalidatedTags.push('products', 'categories');
      revalidatedPaths.push('/', '/shop', '/kategori');

      return NextResponse.json({
        revalidated: true,
        type: 'BULK_ALL',
        paths: revalidatedPaths,
        tags: revalidatedTags,
        message: 'Successfully revalidated entire storefront catalog and layout cache.',
        timestamp: new Date().toISOString(),
      });
    }

    // 2. Specific Slugs (Single or Bulk Array)
    const rawSlugs = body.slugs || (body.slug ? [body.slug] : []);
    const querySlug = searchParams.get('slug');
    if (querySlug && !rawSlugs.includes(querySlug)) {
      rawSlugs.push(querySlug);
    }

    for (const slug of rawSlugs) {
      if (slug && typeof slug === 'string') {
        const cleanSlug = slug.trim().toLowerCase();
        const p = `/shop/${cleanSlug}`;
        revalidatePath(p, 'page');
        revalidatedPaths.push(p);
      }
    }

    // 3. Specific SKUs (Single or Bulk Array)
    const rawSkus = body.skus || (body.sku ? [body.sku] : []);
    const querySku = searchParams.get('sku');
    if (querySku && !rawSkus.includes(querySku)) {
      rawSkus.push(querySku);
    }

    for (const sku of rawSkus) {
      if (sku && typeof sku === 'string') {
        const cleanSku = sku.trim().toLowerCase();
        const p = `/shop/${cleanSku}`;
        revalidatePath(p, 'page');
        revalidatedPaths.push(p);
      }
    }

    // 4. Specific Categories
    const rawCats = body.categories || (body.category ? [body.category] : []);
    for (const cat of rawCats) {
      if (cat && typeof cat === 'string') {
        const cleanCat = cat.trim().toLowerCase();
        const p = `/kategori/${cleanCat}`;
        revalidatePath(p, 'page');
        revalidatedPaths.push(p);
      }
    }

    // 5. Always refresh main listings when products change
    if (revalidatedPaths.length > 0) {
      revalidatePath('/shop', 'page');
      revalidatePath('/', 'page');
      (revalidateTag as any)('products');
      revalidatedPaths.push('/shop', '/');
      revalidatedTags.push('products');
    }

    return NextResponse.json({
      revalidated: true,
      type: revalidatedPaths.length > 5 ? 'BULK_BATCH' : 'SINGLE_TARGETED',
      count: revalidatedPaths.length,
      paths: Array.from(new Set(revalidatedPaths)),
      tags: Array.from(new Set(revalidatedTags)),
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Internal Revalidation Error', details: err?.message || String(err) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}
