import type { YearlySnapshot } from "@/lib/types";
import { pumpPriceHistorySource } from "@/lib/data/pump-price-history";

const CURRENT_YEAR = 2026;

function unverified(year: string): YearlySnapshot {
  return {
    year,
    petrolPencePerLitre: null,
    dieselPencePerLitre: null,
    pricesPeriodType: "not-available",
    pricesAsOf: null,
    fuelDutyPencePerLitre: null,
    vatRatePercent: null,
    minimumWagePerHour: null,
    minimumWageVerified: false,
    cpiIndex: null,
    averageWeeklyEarnings: null,
    bankRatePercent: null,
    verified: false,
    source: "Not yet verified",
    sourceUrl: null,
    isCompletedYear: Number(year) < CURRENT_YEAR,
  };
}

/**
 * Year-by-year data used by the historical ("THEN") tools and the
 * "Then vs Now" comparison. Every fuel-price figure here is a
 * point-in-time snapshot on a specific date — we do NOT have a
 * verified annual average for any year, so we never present one as if
 * we did. `pricesAsOf` always names the exact date(s) behind the
 * number. The current year (2026) is explicitly marked
 * `isCompletedYear: false` — its figures describe current/live
 * conditions, not a finished year, and must never be labelled as a
 * "2026 average".
 */
/**
 * Fuel price + duty + VAT figures for these years are the first
 * weekly price GOV.UK/DESNZ published on or after 1 January that year
 * — a genuine, dated, single-week snapshot from the primary source
 * (see pump-price-history.ts), NOT an annual average. Minimum wage/CPI/
 * average earnings/Bank Rate are left null unless separately verified
 * for that specific year — we do not infer them from a nearby year.
 */
function fromDesnzFirstOfYear(year: string, date: string, petrol: number, diesel: number, duty: number, vat: number): YearlySnapshot {
  return {
    ...unverified(year),
    petrolPencePerLitre: petrol,
    dieselPencePerLitre: diesel,
    pricesPeriodType: "point-in-time",
    pricesAsOf: `Week commencing ${date} (first published DESNZ price of the year) — not an annual average`,
    fuelDutyPencePerLitre: duty,
    vatRatePercent: vat,
    verified: true,
    source: pumpPriceHistorySource.name,
    sourceUrl: pumpPriceHistorySource.url,
  };
}

export const yearlySnapshots: Record<string, YearlySnapshot> = {
  "1995": unverified("1995"),
  "2000": unverified("2000"),
  "2005": fromDesnzFirstOfYear("2005", "3 January 2005", 81.17, 85.12, 47.1, 17.5),
  "2010": fromDesnzFirstOfYear("2010", "4 January 2010", 109.34, 111.08, 56.19, 17.5),
  "2015": fromDesnzFirstOfYear("2015", "5 January 2015", 111.06, 117.93, 57.95, 20),
  "2020": fromDesnzFirstOfYear("2020", "6 January 2020", 126.09, 131.56, 57.95, 20),
  "2021": fromDesnzFirstOfYear("2021", "4 January 2021", 115.39, 119.97, 57.95, 20),
  "2022": {
    ...unverified("2022"),
    petrolPencePerLitre: 191.55,
    dieselPencePerLitre: 199.22,
    pricesPeriodType: "point-in-time",
    pricesAsOf: "Week commencing 4 July 2022 (record high for both petrol and diesel) — not an annual average",
    fuelDutyPencePerLitre: 52.95,
    vatRatePercent: 20,
    verified: true,
    source: pumpPriceHistorySource.name,
    sourceUrl: pumpPriceHistorySource.url,
  },
  "2024": fromDesnzFirstOfYear("2024", "1 January 2024", 140.78, 148.66, 52.95, 20),
  "2025": {
    ...fromDesnzFirstOfYear("2025", "6 January 2025", 136.6, 143.3, 52.95, 20),
    minimumWagePerHour: 12.21,
    minimumWageVerified: true,
    averageWeeklyEarnings: 766.6,
    source: `${pumpPriceHistorySource.name} (prices) / GOV.UK (minimum wage) / ONS ASHE (earnings)`,
  },
  "2026": {
    ...unverified("2026"),
    petrolPencePerLitre: 168.14,
    dieselPencePerLitre: 190.72,
    pricesPeriodType: "point-in-time",
    pricesAsOf: "Week commencing 14 September 2026 — a live snapshot, not a 2026 annual average (2026 is still in progress)",
    fuelDutyPencePerLitre: 52.95,
    vatRatePercent: 20,
    minimumWagePerHour: 12.71,
    minimumWageVerified: true,
    bankRatePercent: 3.75,
    verified: true,
    source: `${pumpPriceHistorySource.name} / GOV.UK / Bank of England (see individual figures)`,
    sourceUrl: pumpPriceHistorySource.url,
  },
};

export const availableYears = Object.keys(yearlySnapshots);

/** The year currently in progress — never treat this as a completed historical year. */
export const currentYear = String(CURRENT_YEAR);
