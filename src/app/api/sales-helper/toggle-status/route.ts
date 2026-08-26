import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * POST /api/sales-helper/toggle-status
 * Expected body: { sku?: string, productId?: string, status?: 'SOLD' | 'READY' }
 *
 * This endpoint validates the payload, forwards the request to the Google Apps Script
 * webhook that updates the Google Sheet, and returns the Apps Script JSON response
 * (or an error). Optional WooCommerce sync can be added after a successful Apps Script
 * update.
 */
export async function POST(request: NextRequest) {
  try {
    const { sku, productId, status } = await request.json();

    if (!sku && !productId) {
      return NextResponse.json(
        { success: false, error: 'SKU or Product ID is required' },
        { status: 400 }
      );
    }

    const targetStatus = (status || 'SOLD').toUpperCase(); // 'SOLD' | 'READY'

    // Build payload for Apps Script webhook
    const payload = {
      sku,
      product_id: productId,
      status: targetStatus,
    };

    // Apps Script Web App URL – should be defined in .env.local as APPS_SCRIPT_URL
    const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;
    if (!APPS_SCRIPT_URL) {
      console.error('Missing APPS_SCRIPT_URL environment variable');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Forward request to Apps Script
    const scriptResponse = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const scriptJson = await scriptResponse.json();

    // If you want to sync WooCommerce status, uncomment and implement the helper below
    // if (scriptJson.success) {
    //   await updateWooCommerceProductStatus(productId, targetStatus.toLowerCase());
    // }

    return NextResponse.json(scriptJson, { status: scriptResponse.status });
  } catch (error) {
    console.error('Error toggling status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update unit status' },
      { status: 500 }
    );
  }
}
