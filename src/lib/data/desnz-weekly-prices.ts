import "server-only";

import { ukWeeklyAverage, type WeeklyFigure } from "@/lib/data/hero-fuel-snapshot";
import type { FuelPricePoint, FuelPriceSnapshot, FuelType } from "@/lib/types";

/**
 * Live connection to the official GOV.UK / DESNZ "Weekly road fuel prices"
 * statistics, the same primary source every hard-coded UK pump price on
 * this site is taken from.
 *
 * DESNZ republishes the CSV every week (usually Tuesday) under a NEW
 * asset URL, so we never hard-code the file link. Instead we ask the
 * GOV.UK Content API for the statistics page, pick out the current
 * "2018 to ..." CSV attachment, and parse that. Both requests are cached
 * and re-checked every few hours, so a new week appears on the site
 * automatically without a redeploy.
 *
 * If GOV.UK is unreachable or the file format changes, every function
 * here falls back to the last manually verified figures in
 * hero-fuel-snapshot.ts rather than showing nothing or a wrong number.
 */

const CONTENT_API_URL = "https://www.gov.uk/api/content/government/statistics/weekly-road-fuel-prices";
const REVALIDATE_SECONDS = 60 * 60 * 3;

export const desnzWeeklySource = {
  name: "GOV.UK / DESNZ: Weekly road fuel prices",
  url: "https://www.gov.uk/government/statistics/weekly-road-fuel-prices",
};

export type DesnzWeeklyRow = {
  date: string; // ISO date, week commencing (Monday)
  petrol: number; // ULSP pence/litre
  diesel: number; // ULSD pence/litre
};

type ContentApiAttachment = { title?: string; url?: string; content_type?: string };

async function findCurrentCsvUrl(): Promise<string> {
  const res = await fetch(CONTENT_API_URL, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) throw new Error(`GOV.UK Content API responded ${res.status}`);
  const body = (await res.json()) as { details?: { attachments?: ContentApiAttachment[] } };
  const csv = body.details?.attachments?.find(
    (a) => a.url?.toLowerCase().endsWith(".csv") && /2018 to/i.test(a.title ?? "")
  );
  if (!csv?.url) throw new Error("Weekly road fuel prices CSV (2018 onwards) not found on GOV.UK");
  return csv.url;
}

/** "21/09/2026" -> "2026-09-21" */
function ukDateToIso(value: string): string | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value.trim());
  return match ? `${match[3]}-${match[2]}-${match[1]}` : null;
}

export function parseDesnzCsv(text: string): DesnzWeeklyRow[] {
  // String.prototype.trim also strips the byte-order mark GOV.UK puts at the start of the file.
  const [header, ...lines] = text.trim().split(/\r?\n/);
  const columns = header.split(",");
  const petrolCol = columns.findIndex((c) => /^ULSP.*Pump price/i.test(c));
  const dieselCol = columns.findIndex((c) => /^ULSD.*Pump price/i.test(c));
  if (petrolCol < 0 || dieselCol < 0) throw new Error("Unexpected DESNZ CSV header");

  const rows: DesnzWeeklyRow[] = [];
  for (const line of lines) {
    const cells = line.split(",");
    const date = ukDateToIso(cells[0] ?? "");
    const petrol = Number(cells[petrolCol]);
    const diesel = Number(cells[dieselCol]);
    // Sanity bounds: reject blank or obviously malformed rows rather than publish them.
    if (!date || !(petrol > 50 && petrol < 400) || !(diesel > 50 && diesel < 400)) continue;
    rows.push({ date, petrol, diesel });
  }
  rows.sort((a, b) => a.date.localeCompare(b.date));
  if (rows.length < 2) throw new Error("DESNZ CSV contained no usable rows");
  return rows;
}

/** Every weekly UK average since 2018, newest last. Throws if GOV.UK cannot be read. */
export async function fetchDesnzWeeklyRows(): Promise<DesnzWeeklyRow[]> {
  const csvUrl = await findCurrentCsvUrl();
  const res = await fetch(csvUrl, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) throw new Error(`DESNZ CSV responded ${res.status}`);
  return parseDesnzCsv(await res.text());
}

function weekLabel(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return `Week commencing ${date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}`;
}

/**
 * The latest UK weekly average petrol/diesel price with the previous week
 * for comparison, in the same shape as the manually maintained
 * `ukWeeklyAverage`. Never throws: falls back to that static snapshot.
 */
export async function getLatestUkWeeklyAverage(): Promise<{
  figures: Record<FuelType, WeeklyFigure>;
  fromLiveSource: boolean;
}> {
  try {
    const rows = await fetchDesnzWeeklyRows();
    const latest = rows[rows.length - 1];
    const previous = rows[rows.length - 2];
    // Never let an automated fetch roll the site BACKWARDS behind a manually verified newer figure.
    if (latest.date < ukWeeklyAverage.petrol.lastUpdated) {
      return { figures: ukWeeklyAverage, fromLiveSource: false };
    }
    const build = (fuel: FuelType): WeeklyFigure => ({
      current: latest[fuel],
      previous: previous[fuel],
      dataPeriod: weekLabel(latest.date),
      previousDataPeriod: weekLabel(previous.date),
      lastUpdated: latest.date,
    });
    return { figures: { petrol: build("petrol"), diesel: build("diesel") }, fromLiveSource: true };
  } catch (error) {
    console.error("[fuel-prices] Falling back to static DESNZ snapshot:", error);
    return { figures: ukWeeklyAverage, fromLiveSource: false };
  }
}

/**
 * Current UK average for the price dashboards. Status is "live" only when
 * the figure came from GOV.UK on this request cycle; the static fallback
 * is labelled "historical" so a stale number is never presented as current.
 */
export async function getCurrentFuelPriceSnapshot(): Promise<FuelPriceSnapshot> {
  const { figures, fromLiveSource } = await getLatestUkWeeklyAverage();
  return {
    petrolPencePerLitre: figures.petrol.current,
    dieselPencePerLitre: figures.diesel.current,
    provenance: {
      status: fromLiveSource ? "live" : "historical",
      source: `${desnzWeeklySource.name} (UK weekly average: ${figures.petrol.dataPeriod})`,
      sourceUrl: desnzWeeklySource.url,
      asOf: figures.petrol.lastUpdated,
    },
  };
}

/**
 * The last 12 months of UK weekly averages, thinned to one point per
 * month (the latest published week in that month) so the chart stays
 * readable and always ends at the current figure.
 */
export async function getHistoricalFuelPrices(): Promise<FuelPricePoint[]> {
  try {
    const rows = await fetchDesnzWeeklyRows();
    const latestPerMonth = new Map<string, DesnzWeeklyRow>();
    for (const row of rows) latestPerMonth.set(row.date.slice(0, 7), row);
    return [...latestPerMonth.values()]
      .slice(-12)
      .map((r) => ({ date: r.date, petrolPencePerLitre: r.petrol, dieselPencePerLitre: r.diesel }));
  } catch (error) {
    console.error("[fuel-prices] Historical DESNZ prices unavailable:", error);
    return [];
  }
}
