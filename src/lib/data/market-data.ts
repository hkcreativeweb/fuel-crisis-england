import "server-only";

import { brentCrudeHistoryMonthly, brentCrudeHistorySource } from "@/lib/data/brent-crude-history";
import { liveIndicators } from "@/lib/data/live-snapshot";

/**
 * Two market inputs to UK fuel costs, read from their official publishers
 * in the same way desnz-weekly-prices.ts reads GOV.UK:
 *
 * - Brent crude: the U.S. EIA's weekly Europe Brent spot price (FOB),
 *   published as an HTML table. Weeks end on a Friday.
 * - GBP/USD: the Bank of England's daily spot rate (series XUDLUSS),
 *   published as CSV through its Interactive Statistical Database.
 *
 * Both are cached and re-checked every few hours. If a source can't be
 * read or its format changes, we fall back to the last manually verified
 * figures and say so (fromLiveSource: false), never a guessed number.
 */

const REVALIDATE_SECONDS = 60 * 60 * 6;

export type MarketPoint = { date: string; value: number };
export type MarketSeries = {
  latest: MarketPoint;
  previous: MarketPoint | null;
  fromLiveSource: boolean;
  source: { name: string; url: string };
};

const MONTHS: Record<string, string> = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

const EIA_BRENT_WEEKLY_URL = "https://www.eia.gov/dnav/pet/hist/LeafHandler.ashx?n=PET&s=RBRTE&f=W";

/** Parses EIA's weekly history table: rows like "2026-Sep 09/04 99.09 09/11 111.83 ...". */
export function parseEiaWeeklyTable(html: string): MarketPoint[] {
  const text = html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");
  const points: MarketPoint[] = [];
  const rowRe = /(\d{4})-([A-Z][a-z]{2})((?:\s+\d{2}\/\d{2}\s+[\d.]+)+)/g;
  for (const row of text.matchAll(rowRe)) {
    const [, year, mon, cells] = row;
    if (!MONTHS[mon]) continue;
    for (const cell of cells.matchAll(/(\d{2})\/(\d{2})\s+([\d.]+)/g)) {
      const value = Number(cell[3]);
      // Sanity bounds for a barrel price; reject anything malformed.
      if (value > 5 && value < 500) points.push({ date: `${year}-${cell[1]}-${cell[2]}`, value });
    }
  }
  return points.sort((a, b) => a.date.localeCompare(b.date));
}

export async function getBrentWeekly(): Promise<MarketSeries> {
  const source = { name: brentCrudeHistorySource.name, url: brentCrudeHistorySource.url };
  try {
    const res = await fetch(EIA_BRENT_WEEKLY_URL, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) throw new Error(`EIA responded ${res.status}`);
    const points = parseEiaWeeklyTable(await res.text());
    if (points.length < 2) throw new Error("No usable rows in EIA Brent table");
    return { latest: points[points.length - 1], previous: points[points.length - 2], fromLiveSource: true, source };
  } catch (error) {
    console.error("[market-data] Falling back to stored Brent data:", error);
    const stored = brentCrudeHistoryMonthly.map((p) => ({ date: p.date, value: p.usdPerBarrel }));
    return { latest: stored[stored.length - 1], previous: stored[stored.length - 2] ?? null, fromLiveSource: false, source };
  }
}

const BOE_SERIES = "XUDLUSS";
const BOE_PAGE_URL = "https://www.bankofengland.co.uk/boeapps/database/Rates.asp";

/** Parses the Bank of England CSV: "DATE,XUDLUSS" then rows like "22 Sep 2026,1.3348". */
export function parseBoeCsv(csv: string): MarketPoint[] {
  const points: MarketPoint[] = [];
  for (const line of csv.trim().split(/\r?\n/).slice(1)) {
    const match = /^(\d{2}) ([A-Z][a-z]{2}) (\d{4}),([\d.]+)$/.exec(line.trim());
    if (!match || !MONTHS[match[2]]) continue;
    const value = Number(match[4]);
    if (value > 0.5 && value < 3) points.push({ date: `${match[3]}-${MONTHS[match[2]]}-${match[1]}`, value });
  }
  return points.sort((a, b) => a.date.localeCompare(b.date));
}

function boeCsvUrl(): string {
  // The last ~6 weeks is plenty to find the latest rate and the one a week earlier.
  const from = new Date(Date.now() - 42 * 24 * 60 * 60 * 1000);
  const dateFrom = `${String(from.getUTCDate()).padStart(2, "0")}/${Object.keys(MONTHS)[from.getUTCMonth()]}/${from.getUTCFullYear()}`;
  return `https://www.bankofengland.co.uk/boeapps/database/_iadb-fromshowcolumns.asp?csv.x=yes&Datefrom=${dateFrom}&Dateto=now&SeriesCodes=${BOE_SERIES}&CSVF=TN&UsingCodes=Y&VPD=Y&VFD=N`;
}

/** Latest daily rate, plus the rate on or before the same weekday a week earlier. */
export async function getGbpUsdDaily(): Promise<MarketSeries> {
  const source = { name: "Bank of England: daily spot exchange rate, US$ into sterling (XUDLUSS)", url: BOE_PAGE_URL };
  try {
    const res = await fetch(boeCsvUrl(), {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; FuelCrisisEngland/1.0; +https://www.fuelcrisisengland.co.uk)" },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) throw new Error(`Bank of England responded ${res.status}`);
    const points = parseBoeCsv(await res.text());
    if (points.length < 2) throw new Error("No usable rows in Bank of England CSV");
    const latest = points[points.length - 1];
    const weekEarlier = new Date(`${latest.date}T00:00:00Z`);
    weekEarlier.setUTCDate(weekEarlier.getUTCDate() - 7);
    const cutoff = weekEarlier.toISOString().slice(0, 10);
    const previous = [...points].reverse().find((p) => p.date <= cutoff) ?? null;
    return { latest, previous, fromLiveSource: true, source };
  } catch (error) {
    console.error("[market-data] Falling back to stored GBP/USD rate:", error);
    const stored = liveIndicators.find((i) => i.id === "gbp-usd");
    return {
      latest: { date: stored?.lastUpdated ?? "", value: Number(stored?.value ?? 0) },
      previous: null,
      fromLiveSource: false,
      source,
    };
  }
}
