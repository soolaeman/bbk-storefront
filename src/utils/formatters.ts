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
  let message = '';
  const conditionLabel = getWhatsAppConditionLabel(product.condition);

  if (product.price === null || customAction === 'quote') {
    message =
      `Halo Tim BBKitchen, saya tertarik dan ingin menanyakan penawaran harga dan ketersediaan untuk unit:\n\n` +
      `Nama Unit: ${product.name}\n\n` +
      `SKU/ID: ${product.sku}\n\n` +
      `Lokasi Unit: ${product.location}\n\n` +
      `Kondisi: ${conditionLabel}\n\n` +
      `Apakah unit ini masih tersedia? Mohon info harga penawaran dan spesifikasi detailnya. Terima kasih.`;
  } else if (customAction === 'video') {
    message =
      `Halo Tim BBKitchen, saya ingin meminta Video Tes Fungsi / Detail Fisik untuk unit:\n\n` +
      `Nama Unit: ${product.name}\n\n` +
      `SKU/ID: ${product.sku}\n\n` +
      `Harga Katalog: ${formatRupiah(product.price)}\n\n` +
      `Lokasi: ${product.location}\n\n` +
      `Kondisi: ${conditionLabel}\n\n` +
      `Bisa dibantu kirimkan video kondisi unit dan tes nyalanya? Terima kasih.`;
  } else if (customAction === 'visit') {
    message =
      `Halo Tim BBKitchen, saya berminat cek fisik langsung ke lokasi untuk unit:\n\n` +
      `Nama Unit: ${product.name}\n\n` +
      `SKU/ID: ${product.sku}\n\n` +
      `Lokasi: ${product.location}\n\n` +
      `Kondisi: ${conditionLabel}\n\n` +
      `Kira-kira kapan jadwal yang memungkinkan untuk survei atau cek fisik unit ini? Terima kasih.`;
  } else if (customAction === 'shipping') {
    message =
      `Halo Tim BBKitchen, saya ingin konsultasi ongkos kirim dan pengantaran untuk unit:\n\n` +
      `Nama Unit: ${product.name}\n\n` +
      `SKU/ID: ${product.sku}\n\n` +
      `Lokasi Asal Unit: ${product.location}\n\n` +
      `Kondisi: ${conditionLabel}\n\n` +
      `Tujuan pengiriman saya ke kota: [Sebutkan Kota / Kecamatan Anda].\n` +
      `Bisa dibantu rekomendasi armada (Deliveree / Lalamove / Cargo)? Terima kasih.`;
  } else {
    message =
      `Halo Tim BBKitchen, saya tertarik dengan unit katalog:\n\n` +
      `Nama Unit: ${product.name}\n\n` +
      `SKU: ${product.sku}\n\n` +
      `Harga: ${product.price ? formatRupiah(product.price) : 'Tanyakan Harga'}\n\n` +
      `Lokasi: ${product.location}\n\n` +
      `Kondisi: ${conditionLabel}\n\n` +
      `Apakah unit ini masih READY dan siap kirim? Mohon info selengkapnya. Terima kasih.`;
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
