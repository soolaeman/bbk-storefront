import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { buildWooCommerceUrl, getWooCommerceHeaders } from '../../../../lib/woocommerce-client';

export const dynamic = 'force-dynamic';

async function updateWooCommerceProductStatus(productId: string | number, status: 'READY' | 'SOLD') {
  const targetStockStatus = status === 'SOLD' ? 'outofstock' : 'instock';
  
  // Di BBKitchen, data status_unit disimpan di custom field (meta_data)
  // dan stock_status bawaan WooCommerce juga di-update.
  const payload = {
    stock_status: targetStockStatus,
    meta_data: [
      {
        key: 'status_unit',
        value: status
      }
    ]
  };

  const url = buildWooCommerceUrl(`products/${productId}`);
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      ...getWooCommerceHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to update WooCommerce: ${res.status} - ${errorText}`);
  }
}

/**
 * POST /api/sales-helper/toggle-status
 * Expected body: { sku?: string, productId?: string, status?: 'SOLD' | 'READY' }
 *
 * This endpoint validates the payload, forwards the request to the Google Apps Script
 * webhook that updates the Google Sheet, and returns the Apps Script JSON response
 * (or an error). WooCommerce sync is also executed after a successful Apps Script update.
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

    const targetStatus = (status || 'SOLD').toUpperCase() as 'SOLD' | 'READY'; // 'SOLD' | 'READY'

    // Build payload for Apps Script webhook
    const payload = {
      sku,
      product_id: productId,
      status: targetStatus,
    };

    // Apps Script Web App URL – should be defined in env variables
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

    // Sync status ke WooCommerce jika Apps Script berhasil update
    if (scriptJson.success && productId) {
      try {
        await updateWooCommerceProductStatus(productId, targetStatus);
        
        // Revalidate the product pages so the status updates immediately
        revalidatePath('/shop/[slug]', 'page');
        revalidatePath('/product/[slug]', 'page');
        revalidatePath('/katalog');
        revalidatePath('/catalog');
        revalidatePath('/');
      } catch (wooError) {
        console.error('WooCommerce Sync Error:', wooError);
        // Tetap kembalikan sukses dari Apps Script tetapi beri catatan error WooCommerce
        return NextResponse.json({
          ...scriptJson,
          warning: 'Google Sheet updated, but WooCommerce sync failed.'
        });
      }
    }

    return NextResponse.json(scriptJson, { status: scriptResponse.status });
  } catch (error) {
    console.error('Error toggling status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update unit status' },
      { status: 500 }
    );
  }
}
