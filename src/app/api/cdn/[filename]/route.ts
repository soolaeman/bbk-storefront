import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Cloudflare R2 Public CDN Storage Base URL
const R2_PUBLIC_BASE = "https://pub-946d1fe1a1b1461eb2cca6be4462ba11.r2.dev";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  const { filename } = await context.params;

  // Strict sanitization: Only allow valid image filenames (e.g. BBK3135_1.webp)
  if (!filename || !/^[a-zA-Z0-9_\-\.]+$/.test(filename)) {
    return new NextResponse("Invalid filename", { status: 400 });
  }

  const r2Url = `${R2_PUBLIC_BASE}/${filename}`;

  try {
    const res = await fetch(r2Url, {
      next: { revalidate: 31536000 }, // 1 Year Immutable Edge Cache
    });

    if (!res.ok) {
      return new NextResponse("Asset Not Found", { status: 404 });
    }

    const contentType = res.headers.get("content-type") || "image/webp";
    const imageBuffer = await res.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
        "CDN-Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return new NextResponse("Error streaming asset from R2", { status: 502 });
  }
}
