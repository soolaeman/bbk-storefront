import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function getSalesHelperUrl(request: NextRequest) {
  const configured = process.env.BBK_BTC_URL?.trim();
  if (configured) return configured.replace(/\/$/, '');
  return new URL(request.url).origin;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const target = new URL('/api/sales-helper', getSalesHelperUrl(request));
    target.search = searchParams.toString();

    const response = await fetch(target.toString(), {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    const body = await response.text();
    return new NextResponse(body, {
      status: response.status,
      headers: { 'content-type': response.headers.get('content-type') || 'application/json' },
    });
  } catch (error) {
    console.error('Error proxying sales helper request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reach Sales Helper service' },
      { status: 502 }
    );
  }
}
