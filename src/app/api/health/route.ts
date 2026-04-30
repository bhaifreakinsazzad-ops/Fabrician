import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    now: new Date().toISOString(),
    stripeConfigured: Boolean(process.env.STRIPE_SECRET_KEY),
    siteUrlConfigured: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
  });
}
