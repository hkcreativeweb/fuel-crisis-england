import "server-only";

import { ukWeeklyAverage, type WeeklyFigure } from "@/lib/data/hero-fuel-snapshot";
import { appendHistory, readLastGoodPrices, saveLastGoodPrices } from "@/lib/server/fuel-price-store";
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

/** `fresh` bypasses the cache (used by the scheduled refresh); page renders use the cached copy. */
type FetchOptions = RequestInit & { next?: { revalidate: number } };
const cacheOptions = (fresh: boolean): FetchOptions => (fresh ? { cache: "no-store" } : { next: { revalidate: REVALIDATE_SECONDS } });

async function findCurrentCsvUrl(fresh: boolean): Promise<string> {
  const res = await fetch(CONTENT_API_URL, cacheOptions(fresh));
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
export async function fetchDesnzWeeklyRows(fresh = false): Promise<DesnzWeeklyRow[]> {
  const csvUrl = await findCurrentCsvUrl(fresh);
  const res = await fetch(csvUrl, cacheOptions(fresh));
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
export type LatestUkWeeklyAverage = {
  figures: Record<FuelType, WeeklyFigure>;
  /** True only when the figures were just read and validated from GOV.UK. */
  fromLiveSource: boolean;
  /** True when GOV.UK could not be read/validated and the last verified figures are shown instead. */
  awaitingUpdate: boolean;
  /** ISO timestamp of the last successful, validated check (null if unknown). */
  lastSuccessfulUpdate: string | null;
};

/** Plausible UK pump-price range in pence per litre, and the largest believable week-on-week move. */
const MIN_PENCE = 80;
const MAX_PENCE = 400;
const MAX_WEEKLY_MOVE = 0.25;

function validDate(iso: string): boolean {
  const t = Date.parse(`${iso}T00:00:00Z`);
  return Number.isFinite(t) && t <= Date.now() + 2 * 86_400_000;
}

/**
 * Rejects anything suspicious rather than displaying it: non-numeric or
 * out-of-range prices, invalid/future dates, or an implausible jump from
 * the previous week (or from the last stored good value).
 */
export function validateWeeklyRows(rows: DesnzWeeklyRow[], lastGood?: { petrol: number; diesel: number } | null): string | null {
  const latest = rows[rows.length - 1];
  const previous = rows[rows.length - 2];
  if (!latest || !previous) return "fewer than two weekly rows";
  for (const row of [latest, previous]) {
    if (!validDate(row.date)) return `invalid date ${row.date}`;
    for (const fuel of ["petrol", "diesel"] as const) {
      const v = row[fuel];
      if (typeof v !== "number" || !Number.isFinite(v) || v < MIN_PENCE || v > MAX_PENCE) return `${fuel} ${v} outside ${MIN_PENCE}–${MAX_PENCE}p`;
    }
  }
  for (const fuel of ["petrol", "diesel"] as const) {
    for (const ref of [previous[fuel], lastGood?.[fuel]]) {
      if (ref && Math.abs(latest[fuel] - ref) / ref > MAX_WEEKLY_MOVE) return `${fuel} moved more than ${MAX_WEEKLY_MOVE * 100}%`;
    }
  }
  return null;
}

function figuresFrom(latest: { date: string; petrol: number; diesel: number }, previous: { date: string; petrol: number | null; diesel: number | null } | null): Record<FuelType, WeeklyFigure> {
  const build = (fuel: FuelType): WeeklyFigure => ({
    current: latest[fuel],
    previous: previous ? previous[fuel] : null,
    dataPeriod: weekLabel(latest.date),
    previousDataPeriod: previous ? weekLabel(previous.date) : "",
    lastUpdated: latest.date,
  });
  return { petrol: build("petrol"), diesel: build("diesel") };
}

export async function getLatestUkWeeklyAverage(): Promise<LatestUkWeeklyAverage> {
  try {
    const rows = await fetchDesnzWeeklyRows();
    const problem = validateWeeklyRows(rows);
    if (problem) throw new Error(`Rejected GOV.UK data: ${problem}`);
    const latest = rows[rows.length - 1];
    const previous = rows[rows.length - 2];
    return { figures: figuresFrom(latest, previous), fromLiveSource: true, awaitingUpdate: false, lastSuccessfulUpdate: new Date().toISOString() };
  } catch (error) {
    console.error("[fuel-prices] Live GOV.UK read failed, using last verified figures:", error);
  }

  const stored = await readLastGoodPrices();
  if (stored) {
    const previous = stored.previousDate ? { date: stored.previousDate, petrol: stored.previousPetrol, diesel: stored.previousDiesel } : null;
    return { figures: figuresFrom(stored, previous), fromLiveSource: false, awaitingUpdate: true, lastSuccessfulUpdate: stored.checkedAt };
  }
  // Last resort (nothing stored yet): the manually verified snapshot, always flagged as awaiting an update.
  return { figures: ukWeeklyAverage, fromLiveSource: false, awaitingUpdate: true, lastSuccessfulUpdate: null };
}

/**
 * Scheduled refresh (called by the daily cron). Fetches uncached, validates,
 * then stores the latest price as the "last good" value and appends weekly
 * history without ever overwriting an existing record. On any failure the
 * stored last-good value is left untouched.
 */
export async function refreshFuelPrices(): Promise<{ ok: boolean; reason?: string; date?: string; petrol?: number; diesel?: number }> {
  try {
    const rows = await fetchDesnzWeeklyRows(true);
    const lastGood = await readLastGoodPrices();
    const problem = validateWeeklyRows(rows, lastGood);
    if (problem) return { ok: false, reason: problem };

    const latest = rows[rows.length - 1];
    const previous = rows[rows.length - 2];
    const now = new Date().toISOString();
    const saved = await saveLastGoodPrices({
      date: latest.date,
      petrol: latest.petrol,
      diesel: latest.diesel,
      previousDate: previous.date,
      previousPetrol: previous.petrol,
      previousDiesel: previous.diesel,
      checkedAt: now,
      source: desnzWeeklySource.name,
    });
    if (!saved) return { ok: false, reason: "storage unavailable" };

    await appendHistory(
      rows.slice(-52).map((r) => ({ date: r.date, petrol: r.petrol, diesel: r.diesel, source: desnzWeeklySource.name, recordedAt: now }))
    );
    return { ok: true, date: latest.date, petrol: latest.petrol, diesel: latest.diesel };
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : "fetch failed" };
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
