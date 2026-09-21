import React from 'react';
import Link from 'next/link';
import { getTursoClient } from '../../../lib/turso';
import {
  Truck,
  CheckCircle2,
  Lock,
  Phone,
  AlertTriangle,
  ArrowLeft,
  MapPin,
  Calendar,
  ShieldCheck,
  FileText,
} from 'lucide-react';

interface Props {
  params: Promise<{ sjNumber: string }>;
}

export const dynamic = 'force-dynamic';

export default async function DeliveryDispatchSmartLinkPage({ params }: Props) {
  const resolvedParams = await params;
  const sjNumber = decodeURIComponent(resolvedParams.sjNumber).trim().toUpperCase();

  const client = getTursoClient();
  let dispatch: any = null;
  let invoice: any = null;
  let invoiceItems: any[] = [];

  try {
    const res = await client.execute({
      sql: 'SELECT * FROM delivery_dispatches WHERE UPPER(sj_number) = UPPER(?) LIMIT 1',
      args: [sjNumber],
    });

    if (res.rows.length > 0) {
      dispatch = res.rows[0];

      if (dispatch.invoice_number) {
        const invRes = await client.execute({
          sql: 'SELECT * FROM invoices WHERE UPPER(invoice_number) = UPPER(?) LIMIT 1',
          args: [dispatch.invoice_number],
        });
        if (invRes.rows.length > 0) {
          invoice = invRes.rows[0];
          try {
            invoiceItems = invoice.items_json ? JSON.parse(invoice.items_json) : [];
          } catch {
            invoiceItems = [];
          }
        }
      }
    }
  } catch (err) {
    console.error('Error querying dispatch in Turso:', err);
  }

  if (!dispatch) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center mx-auto border border-rose-500/20">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-black tracking-tight">Surat Jalan Tidak Ditemukan</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Nomor Surat Jalan <span className="font-mono text-amber-400 font-bold">{sjNumber}</span> tidak terdaftar
            dalam sistem logistik BBKitchen.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isDelivered = Boolean(dispatch.delivered_at);
  const isUnlocked = Boolean(dispatch.is_unlocked_for_acceptance);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-8 px-4 sm:px-6">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white font-mono">
                BB<span className="text-amber-500">KITCHEN</span>
              </span>
              <span className="text-[10px] font-bold bg-orange-500 text-slate-950 px-2 py-0.5 rounded tracking-widest uppercase">
                Smart Dispatch E-POD
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Protokol Logistik &amp; Serah Terima Lapangan</p>
          </div>
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-amber-400 transition-colors font-medium flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Katalog</span>
          </Link>
        </div>

        {/* Status Tracker Card */}
        {isDelivered ? (
          <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-3xl p-6 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-black text-emerald-300">PENGIRIMAN SELESAI &amp; DITERIMA</h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
              Unit telah diserahterimakan kepada{' '}
              <strong className="text-white">{dispatch.recipient_name || 'Penerima Kuasa'}</strong> pada{' '}
              {new Date(dispatch.delivered_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
              . Kartu Garansi resmi 14 hari telah aktif.
            </p>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center border border-amber-500/20">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-white">STATUS: DALAM PENGIRIMAN</h2>
                  <p className="text-[11px] text-slate-400">Armada sedang melaju menuju lokasi tujuan</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                IN TRANSIT
              </span>
            </div>

            {/* Gate 6: Remote Acceptance Status */}
            <div className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
              isUnlocked ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}>
              <div className="flex items-center gap-2 font-bold">
                {isUnlocked ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Gerbang Serah Terima: TERBUKA UNTUK DITANDATANGANI</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span className="text-slate-300">Gerbang Serah Terima: TERKUNCI (Menunggu Admin)</span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {isUnlocked
                  ? 'Admin BBKitchen telah mengonfirmasi armada tiba. Penerima di lokasi dipersilakan memeriksa fisik unit dan menandatangani serah terima.'
                  : 'Formulir tanda terima digital hanya dapat dibuka setelah supir tiba di gerbang gudang penerima dan admin BBKitchen menekan tombol verifikasi.'}
              </p>
            </div>
          </div>
        )}

        {/* Dispatch Sheet Details */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
          <div className="border-b border-slate-800 pb-4 flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                No. Surat Jalan:
              </span>
              <p className="text-base font-black font-mono text-orange-400">{dispatch.sj_number}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                No. Invoice Terkait:
              </span>
              <p className="text-xs font-mono font-bold text-slate-300">{dispatch.invoice_number}</p>
            </div>
          </div>

          {/* Armada Info (Gate 5: Plat Real) */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Supir / Kurir:</span>
              <p className="font-bold text-slate-200">{dispatch.driver_name || 'Driver Ekspedisi'}</p>
              {dispatch.driver_phone && (
                <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3 text-slate-500" />
                  <span>{dispatch.driver_phone}</span>
                </p>
              )}
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">No. Polisi Real Mobil:</span>
              <p className="font-bold font-mono text-amber-400 text-sm">{dispatch.vehicle_plate_real || '-'}</p>
            </div>
          </div>

          {/* Delivery Location */}
          {invoice?.customer_address && (
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-850 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Alamat Tujuan Bongkar:</span>
              <p className="text-slate-300 flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>{invoice.customer_address}</span>
              </p>
            </div>
          )}

          {/* Manifest Items List */}
          {invoiceItems.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Manifest Muatan Unit ({invoiceItems.length} Item):
              </span>
              <div className="divide-y divide-slate-850 border border-slate-850 rounded-xl overflow-hidden bg-slate-950/40 text-xs">
                {invoiceItems.map((it: any, idx: number) => (
                  <div key={idx} className="p-3 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-200">{it.description}</p>
                      <p className="text-[10px] font-mono text-slate-500">SKU: {it.sku}</p>
                    </div>
                    <span className="font-bold text-slate-300 text-xs font-mono">{it.quantity} Unit</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action button if delivered: Open E-Warranty */}
          {isDelivered && (
            <div className="pt-2">
              <Link
                href={`/garansi/${dispatch.invoice_number}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-950/40"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Buka Sertifikat E-Warranty Resmi (14 Hari)</span>
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-[11px] text-slate-600 space-y-1">
          <p>© PT BUKAN BARU KITCHEN INDONESIA • Pamulang 2, Tangerang Selatan</p>
          <p>Dispatched via Bukan Baru Kitchen Logistics Engine</p>
        </div>
      </div>
    </div>
  );
}
