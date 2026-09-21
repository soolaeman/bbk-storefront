import React from 'react';
import Link from 'next/link';
import { getTursoClient } from '../../../lib/turso';
import { ShieldCheck, AlertTriangle, Clock, Phone, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ warrantyNumber: string }>;
}

export const dynamic = 'force-dynamic';

export default async function WarrantyVerificationPage({ params }: Props) {
  const resolvedParams = await params;
  const warrantyNumber = decodeURIComponent(resolvedParams.warrantyNumber).trim().toUpperCase();

  const client = getTursoClient();
  let warranty: any = null;
  let warrantyItems: any[] = [];

  try {
    const res = await client.execute({
      sql: 'SELECT * FROM warranties WHERE UPPER(warranty_number) = UPPER(?) LIMIT 1',
      args: [warrantyNumber],
    });

    if (res.rows.length > 0) {
      warranty = res.rows[0];
      const itemsRes = await client.execute({
        sql: 'SELECT * FROM warranty_items WHERE warranty_id = ?',
        args: [warranty.id],
      });
      warrantyItems = itemsRes.rows;
    }
  } catch (err) {
    console.error('Error querying warranty in Turso:', err);
  }

  if (!warranty) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center mx-auto border border-rose-500/20">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-black tracking-tight">Sertifikat Garansi Tidak Ditemukan</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Nomor registrasi <span className="font-mono text-amber-400 font-bold">{warrantyNumber}</span> tidak
            terdaftar dalam basis data resmi BBKitchen. Pastikan tautan atau kode QR yang Anda pindai benar.
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

  // Dynamic Lifecycle Calculation (Gate 3: Day-0 & H+14 / H+21)
  const now = new Date();
  const receivedDate = warranty.received_at ? new Date(warranty.received_at) : new Date(warranty.created_at);
  const expiresAt = warranty.warranty_expires_at
    ? new Date(warranty.warranty_expires_at)
    : new Date(receivedDate.getTime() + 14 * 24 * 60 * 60 * 1000);
  const publicExpiresAt = warranty.public_expires_at
    ? new Date(warranty.public_expires_at)
    : new Date(receivedDate.getTime() + 21 * 24 * 60 * 60 * 1000);

  const diffMs = expiresAt.getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

  const isPublicClosed = now.getTime() > publicExpiresAt.getTime();
  const isExpired = now.getTime() > expiresAt.getTime();

  // WhatsApp claim link
  const waClaimUrl = `https://wa.me/6285122001051?text=${encodeURIComponent(
    `Halo Service Desk BBKitchen, saya ingin klaim / konsultasi teknis terkait E-Warranty No: ${warranty.warranty_number} (Invoice: ${warranty.invoice_number}) atas nama ${warranty.customer_name}.`
  )}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-8 px-4 sm:px-6">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Top Branding */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white font-mono">
                BB<span className="text-amber-500">KITCHEN</span>
              </span>
              <span className="text-[10px] font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded tracking-widest uppercase">
                Public Warranty
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Sistem Verifikasi Garansi Digital Resmi</p>
          </div>
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-amber-400 transition-colors font-medium flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Katalog</span>
          </Link>
        </div>

        {/* Lifecycle Status Banner */}
        {isPublicClosed ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center space-y-2">
            <div className="w-12 h-12 bg-slate-800 text-slate-400 rounded-xl flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-base font-black text-slate-300">Akses Verifikasi Publik Telah Ditutup</h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
              Masa tayang publik garansi ini telah melewati batas arsip (H+21). Catatan legalitas transaksi tetap
              tersimpan abadi di sistem internal BBKitchen.
            </p>
          </div>
        ) : isExpired ? (
          <div className="bg-amber-950/40 border border-amber-800/60 rounded-2xl p-5 text-center space-y-2">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center mx-auto border border-amber-500/20">
              <Clock className="w-6 h-6" />
            </div>
            <span className="inline-block px-3 py-1 bg-amber-900/60 text-amber-300 border border-amber-700/50 rounded-full text-xs font-black tracking-wider uppercase">
              Garansi Telah Berakhir
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Masa perlindungan 14 hari telah selesai pada tanggal{' '}
              <strong className="text-slate-200">
                {expiresAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </strong>
              . Layanan perbaikan berbayar tetap dapat dipesan via hotline teknisi kami.
            </p>
          </div>
        ) : (
          <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-2xl p-5 text-center space-y-2.5">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mx-auto border border-emerald-500/20">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <span className="inline-block px-3 py-1 bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 rounded-full text-xs font-black tracking-wider uppercase">
              GARANSI AKTIF • {daysRemaining} HARI LAGI
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unit komersial Anda terlindungi garansi fungsi mesin &amp; kelistrikan hingga{' '}
              <strong className="text-emerald-400">
                {expiresAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </strong>
              .
            </p>
          </div>
        )}

        {/* Certificate Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
          <div className="border-b border-slate-800 pb-4 flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Nomor Registrasi Garansi:
              </span>
              <p className="text-lg font-black font-mono text-amber-400">{warranty.warranty_number}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Rujukan Invoice:
              </span>
              <p className="text-xs font-mono font-bold text-slate-300">{warranty.invoice_number}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Pemegang Garansi:</span>
              <p className="font-bold text-slate-200">{warranty.customer_name}</p>
              {warranty.customer_company && (
                <p className="text-[11px] text-slate-400 font-medium">{warranty.customer_company}</p>
              )}
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Tanggal Serah Terima (Day 0):</span>
              <p className="font-bold text-slate-200">
                {receivedDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Unit Pendingin Warning Box */}
          <div className="p-4 bg-amber-950/30 border border-amber-800/50 rounded-2xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200/90 space-y-1">
              <p className="font-bold text-amber-300 uppercase tracking-wide text-[11px]">
                SOP Pengoperasian Chiller / Freezer Baru Tiba:
              </p>
              <p className="text-[11px] leading-relaxed">
                Unit pendingin <strong>wajib didiamkan minimal 3-4 jam</strong> setelah diturunkan dari mobil
                sebelum dicolok ke sumber listrik PLN, agar oli kompresor stabil pasca perjalanan.
              </p>
            </div>
          </div>

          {/* Action Button: WA Service Desk */}
          <div className="pt-2">
            <a
              href={waClaimUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-950/40"
            >
              <Phone className="w-4 h-4 fill-slate-950" />
              <span>Hubungi Service Desk WhatsApp BBKitchen</span>
            </a>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-slate-600 space-y-1">
          <p>© PT BUKAN BARU KITCHEN INDONESIA • Pamulang 2, Tangerang Selatan</p>
          <p>Hotline Teknis &amp; Garansi: 0851-2200-1051</p>
        </div>
      </div>
    </div>
  );
}
