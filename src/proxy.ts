import { NextRequest, NextResponse } from 'next/server';

const PSEO_PREFIX = '/jual-barang-bekas-restoran';
const PSEO_ROOTS = new Set(['bekasi', 'bogor', 'depok', 'hemat', 'jakarta', 'tangerang']);

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === PSEO_PREFIX + '/') {
    const url = request.nextUrl.clone();
    url.pathname = PSEO_PREFIX;
    return NextResponse.redirect(url, 301);
  }

  if (!pathname.startsWith(`${PSEO_PREFIX}/`)) {
    return NextResponse.next();
  }

  const segments = pathname
    .slice(PSEO_PREFIX.length)
    .split('/')
    .filter(Boolean);

  if (segments.length === 0 || !PSEO_ROOTS.has(segments[0])) {
    return NextResponse.next();
  }

  const destinationSlug = segments[segments.length - 1];
  const url = request.nextUrl.clone();
  url.pathname = `/${destinationSlug}`;

  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: ['/jual-barang-bekas-restoran/:path*'],
};
