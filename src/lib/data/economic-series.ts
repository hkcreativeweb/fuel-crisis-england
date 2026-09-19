import type { EconomicSeries } from "@/lib/types";
import { pumpPriceHistoryMonthly, pumpPriceHistorySource } from "@/lib/data/pump-price-history";
import { brentCrudeHistoryMonthly, brentCrudeHistorySource } from "@/lib/data/brent-crude-history";

function monthKey(isoDate: string): string {
  return isoDate.slice(0, 7); // "YYYY-MM"
}

export const cpiInflationSeries: EconomicSeries = {
  id: "cpi",
  label: "CPI inflation rate",
  unit: "% per year",
  nominal: true,
  points: [
    { period: "Dec 2021", value: 5.4 },
    { period: "Oct 2022", value: 11.1 },
    { period: "Aug 2025", value: 3.8 },
    { period: "Aug 2026", value: 3.1 },
  ],
  source: "ONS — Consumer price inflation, UK (monthly bulletins)",
  sourceUrl: "https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/consumerpriceinflation/august2026",
  asOf: "2026-09-16",
  status: "historical",
};

export const cpihInflationSeries: EconomicSeries = {
  id: "cpih",
  label: "CPIH inflation rate",
  unit: "% per year",
  nominal: true,
  points: [
    { period: "Dec 2021", value: 4.8 },
    { period: "Oct 2022", value: 9.6 },
    { period: "Aug 2025", value: 4.1 },
    { period: "Aug 2026", value: 3.3 },
  ],
  source: "ONS — Consumer price inflation, UK (monthly bulletins)",
  sourceUrl: "https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/consumerpriceinflation/august2026",
  asOf: "2026-09-16",
  status: "historical",
};

/**
 * Key Bank Rate turning points (not every single change) verified
 * directly against the Bank of England's own Bank Rate database.
 */
export const bankRateSeries: EconomicSeries = {
  id: "bank-rate",
  label: "Bank of England Bank Rate",
  unit: "% per year",
  nominal: true,
  points: [
    { period: "Jul 2007", value: 5.75 },
    { period: "Oct 2008", value: 4.5 },
    { period: "Dec 2008", value: 2.0 },
    { period: "Mar 2009", value: 0.5 },
    { period: "Aug 2016", value: 0.25 },
    { period: "Nov 2017", value: 0.5 },
    { period: "Aug 2018", value: 0.75 },
    { period: "Mar 2020", value: 0.1 },
    { period: "Dec 2021", value: 0.25 },
    { period: "Aug 2022", value: 1.75 },
    { period: "Dec 2022", value: 3.5 },
    { period: "Aug 2023", value: 5.25 },
    { period: "Aug 2024", value: 5.0 },
    { period: "Dec 2025", value: 3.75 },
  ],
  source: "Bank of England — Official Bank Rate history database",
  sourceUrl: "https://www.bankofengland.co.uk/boeapps/database/Bank-Rate.asp",
  asOf: "2025-12-18",
  status: "historical",
};

/**
 * Real, monthly-resolution series built directly from the verified
 * primary-source datasets in pump-price-history.ts (GOV.UK/DESNZ) and
 * brent-crude-history.ts (EIA). Each point's `period` is a "YYYY-MM"
 * month key derived from that point's real published date, so series
 * from different primary sources (published on different weekdays) can
 * be aligned on a shared monthly axis without fabricating or
 * interpolating any value — each plotted point is still a genuine,
 * dated, single-week snapshot for that month, never an average.
 */
export const petrolPriceSeries: EconomicSeries = {
  id: "petrol-price",
  label: "UK average petrol price",
  unit: "pence/litre",
  nominal: true,
  points: pumpPriceHistoryMonthly.map((p) => ({ period: monthKey(p.date), value: p.petrol })),
  source: pumpPriceHistorySource.name,
  sourceUrl: pumpPriceHistorySource.url,
  asOf: "2026-09-14",
  status: "historical",
};

export const dieselPriceSeries: EconomicSeries = {
  id: "diesel-price",
  label: "UK average diesel price",
  unit: "pence/litre",
  nominal: true,
  points: pumpPriceHistoryMonthly.map((p) => ({ period: monthKey(p.date), value: p.diesel })),
  source: pumpPriceHistorySource.name,
  sourceUrl: pumpPriceHistorySource.url,
  asOf: "2026-09-14",
  status: "historical",
};

/**
 * Brent crude oil spot price, from the EIA (primary source) — see
 * brent-crude-history.ts. Units are US$/barrel, deliberately NOT
 * converted to GBP (that would introduce a present-day exchange-rate
 * approximation into a 20+ year historical series). Compare against
 * the pump-price series only in indexed form (see LineChartSVG
 * `indexed` prop), never on a shared raw-value axis.
 */
export const crudeOilSeries: EconomicSeries = {
  id: "crude-oil",
  label: "Brent crude oil price",
  unit: "US$/barrel",
  nominal: true,
  points: brentCrudeHistoryMonthly.map((p) => ({ period: monthKey(p.date), value: p.usdPerBarrel })),
  source: brentCrudeHistorySource.name,
  sourceUrl: brentCrudeHistorySource.url,
  asOf: "2026-09-11",
  status: "historical",
};

/**
 * Annual variants (one point per year — the first published price of
 * January that year, the same real snapshot used in yearly-snapshots.ts)
 * for charts that compare against year-keyed series like company annual
 * results (e.g. ProfitsVsFuelExplorer). Period labels are plain years
 * ("2015") to match `companyProfitSeries`'s period format — mixing
 * monthly and yearly period keys in the same chart would silently fail
 * to align (no shared labels), so callers must pick the matching
 * granularity rather than combining the monthly and annual variants.
 */
function isJanuary(isoDate: string): boolean {
  return isoDate.slice(5, 7) === "01";
}

export const petrolPriceSeriesAnnual: EconomicSeries = {
  ...petrolPriceSeries,
  id: "petrol-price-annual",
  points: pumpPriceHistoryMonthly.filter((p) => isJanuary(p.date)).map((p) => ({ period: p.date.slice(0, 4), value: p.petrol })),
};

export const crudeOilSeriesAnnual: EconomicSeries = {
  ...crudeOilSeries,
  id: "crude-oil-annual",
  points: brentCrudeHistoryMonthly.filter((p) => isJanuary(p.date)).map((p) => ({ period: p.date.slice(0, 4), value: p.usdPerBarrel })),
};
