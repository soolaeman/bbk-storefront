import { Product } from '../types';

export const WHATSAPP_NUMBER = '6285122001051'; // BBKitchen WhatsApp Hotline

export function formatRupiah(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return 'Hubungi Admin untuk Harga';
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

function getWhatsAppConditionLabel(condition: string | null | undefined): 'Baru' | 'Bekas' {
  const normalized = String(condition ?? '').trim().toUpperCase();
  return normalized.includes('BARU') ? 'Baru' : 'Bekas';
}

export function generateWhatsAppProductLink(
  product: Product,
  customAction?: 'video' | 'visit' | 'shipping' | 'quote',
): string {
  const slug = product.slug || product.sku.toLowerCase();
  const productUrl = `https://www.bukanbarukitchen.com/shop/${slug}/`;

  let message = '';
  if (customAction === 'video') {
    message = `Halo BBKitchen, saya ingin meminta Video Tes Fungsi untuk unit ${product.name} (${product.sku}).\n\n${productUrl}\n\nBisa dibantu kirimkan video kondisi unit dan tes nyalanya? Terima kasih.`;
  } else if (customAction === 'visit') {
    message = `Halo BBKitchen, saya berminat cek fisik langsung ke lokasi untuk unit ${product.name} (${product.sku}).\n\n${productUrl}\n\nKapan jadwal yang memungkinkan untuk survei lokasi (${product.location || 'Gudang'})? Terima kasih.`;
  } else if (customAction === 'shipping') {
    message = `Halo BBKitchen, saya ingin konsultasi ongkos kirim untuk unit ${product.name} (${product.sku}).\n\n${productUrl}\n\nTujuan pengiriman ke: [Sebutkan Kota/Kecamatan]. Bisa dibantu rekomendasi armada? Terima kasih.`;
  } else {
    message = `Halo BBKitchen, saya tertarik dengan unit ${product.name} (${product.sku}).\n\n${productUrl}\n\nApakah unit masih ready?`;
  }

  return generateWhatsAppCustomLink(message);
}

export function generateWhatsAppCustomLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message.trim())}`;
}

export function generateWhatsAppConsultationLink(topic?: string): string {
  const defaultText =
    `Halo Tim BBKitchen, saya ingin konsultasi kebutuhan peralatan dapur komersial untuk usaha saya (Restoran/Cafe/Katering/Bakery/MBG Kitchen).\n\n` +
    `Bisa dibantu rekomendasi alat yang sesuai menu dan estimasi budget modal kami? Terima kasih.`;

  if (!topic) {
    return generateWhatsAppCustomLink(defaultText);
  }

  const normalizedTopic = topic
    .trim()
    .replace(/^saya\s+ingin\s+/i, '')
    .replace(/^saya\s+mau\s+/i, '')
    .replace(/^saya\s+berminat\s+/i, '');

  const message = `Halo Tim BBKitchen, saya ingin bertanya perihal ${normalizedTopic}`;

  return generateWhatsAppCustomLink(message);
}

export function generateWhatsAppSourcingLink(itemDetails: {
  category: string;
  nameOrSpec: string;
  budgetRange?: string;
  targetCity?: string;
  notes?: string;
}): string {
  const message =
    `Halo Tim Sourcing BBKitchen, saya ingin menitip pencarian unit peralatan dapur komersial:\n\n` +
    `Kategori: ${itemDetails.category}\n` +
    `Nama Alat / Spek yang Dicari: ${itemDetails.nameOrSpec}\n` +
    `Estimasi Budget: ${itemDetails.budgetRange || 'Fleksibel sesuai kondisi'}\n` +
    `Lokasi Dapur Saya: ${itemDetails.targetCity || 'Jabodetabek'}\n` +
    (itemDetails.notes ? `Catatan Tambahan: ${itemDetails.notes}\n` : '') +
    `\nJika ada unit yang cocok atau masuk ke radar sourcing BBKitchen, mohon dikabari ya. Terima kasih!`;

  return generateWhatsAppCustomLink(message);
}
