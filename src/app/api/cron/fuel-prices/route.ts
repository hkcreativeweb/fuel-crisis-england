import { NextResponse } from "next/server";
import { refreshFuelPrices } from "@/lib/data/desnz-weekly-prices";
import { refreshNews } from "@/lib/server/news-feeds";

/** Daily Vercel Cron: validates and stores the latest GOV.UK fuel prices (plus history) and the latest news articles as last-good copies. */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ ok: false, error: "CRON_SECRET not configured" }, { status: 503 });
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const [fuel, news] = await Promise.all([refreshFuelPrices(), refreshNews()]);
  return NextResponse.json({ ok: fuel.ok && news.ok, fuel, news }, { status: fuel.ok || news.ok ? 200 : 502 });
}
