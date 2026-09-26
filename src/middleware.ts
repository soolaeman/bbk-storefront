import { NextResponse, type NextRequest } from 'next/server';

// Explicit Legacy GSC 301 Redirect Mapping Table
const EXPLICIT_REDIRECTS: Record<string, string> = {
  '/kategori-produk': '/shop',
  '/kategori-produk/': '/shop',
  '/product-category': '/shop',
  '/product-category/': '/shop',
  '/katalog': '/shop',
  '/katalog/': '/shop',
  '/catalog': '/shop',
  '/catalog/': '/shop',
  '/shop/': '/shop',
  '/jual-barang-bekas-restoran/': '/shop',
};

// Known Category Redirect Patterns
const CATEGORY_SLUG_MAP: Record<string, string> = {
  'chiller': 'upright-chiller',
  'freezer': 'upright-freezer',
  'undercounter': 'undercounter-chiller',
  'showcase': 'showcase-chiller',
  'meja-stainless': 'meja-stainless',
  'sink-stainless': 'single-sink-stainless',
  'kompor-resto': 'kompor-burner',
  'kwali-range': 'kompor-wok-kwali-range',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Bypass static assets, API, and Next.js internal files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // file with extension (ico, png, jpg, webp, txt, xml)
  ) {
    return NextResponse.next();
  }

  // 2. Tier 1: Explicit Exact Match 301 Redirect
  if (EXPLICIT_REDIRECTS[pathname]) {
    const target = EXPLICIT_REDIRECTS[pathname];
    return NextResponse.redirect(new URL(target, request.url), 301);
  }

  // 3. Tier 2: Category Silo 301 Redirects (/product-category/[slug], /kategori-produk/[slug])
  if (pathname.startsWith('/product-category/') || pathname.startsWith('/kategori-produk/')) {
    const rawCategory = pathname.replace('/product-category/', '').replace('/kategori-produk/', '').replace(/\/$/, '');
    const mappedCategory = CATEGORY_SLUG_MAP[rawCategory] || rawCategory;
    
    // Redirect to /shop with category query param to preserve SEO link equity
    return NextResponse.redirect(
      new URL(`/shop?category=${encodeURIComponent(mappedCategory)}`, request.url),
      301
    );
  }

  // 4. Tier 3: Old WooCommerce single product query formats (e.g., /?product=... or /?p=...)
  const productParam = request.nextUrl.searchParams.get('product') || request.nextUrl.searchParams.get('p');
  if (productParam) {
    return NextResponse.redirect(
      new URL(`/shop?search=${encodeURIComponent(productParam)}`, request.url),
      301
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
