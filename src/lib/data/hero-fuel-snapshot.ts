import type { FuelType } from "@/lib/types";

/**
 * Data for the homepage hero's live-data strip. Two genuinely different
 * things live here, and they must never be blurred together:
 *
 * 1. `ukWeeklyAverage`: the UK Government/DESNZ weekly road fuel price
 *    statistics. This is a WEEKLY NATIONAL AVERAGE, not a real-time pump
 *    price, so it is deliberately never labelled "live" anywhere it is
 *    displayed. Source: GOV.UK "Weekly road fuel prices" CSV
 *    (https://www.gov.uk/government/statistics/weekly-road-fuel-prices),
 *    downloaded and verified directly. Week commencing 21 September 2026
 *    (petrol 172.01p/L, diesel 195.53p/L) vs the prior week commencing
 *    14 September 2026 (petrol 168.14p/L, diesel 190.72p/L).
 *
 * 2. `internationalBenchmark`: the US EIA's "Weekly Retail Gasoline and
 *    Diesel Prices" series (national average, retail, including taxes).
 *    This is a genuine RETAIL pump-price series (not wholesale/spot, not
 *    crude oil), which makes it a fair like-for-like comparison point.
 *    It is a US national average in US dollars per US gallon though, not
 *    a "world" or "global" price, and it is explicitly labelled as such.
 *    Source: U.S. Energy Information Administration
 *    (https://www.eia.gov/petroleum/gasdiesel/), series "Regular" for
 *    gasoline (EMM_EPMR_PTE_NUS_DPG) and "Diesel (On-Highway) - All
 *    Types" (EMD_EPD2D_PTE_NUS_DPG). Week of 21 September 2026
 *    (gasoline $4.478/gal, diesel $6.529/gal) vs the prior week of
 *    14 September 2026 (gasoline $4.319/gal, diesel $6.285/gal).
 *
 * Neither figure is hard-coded as a "permanent" truth. Both blocks are
 * shaped so the current/previous pair can be replaced wholesale the next
 * time each source publishes a new week, without touching any component.
 */

export type TrendDirection = "up" | "down" | "unchanged";

export type WeeklyFigure = {
  current: number;
  previous: number | null;
  dataPeriod: string;
  previousDataPeriod: string;
  lastUpdated: string; // ISO date
};

export function trendDirection(figure: WeeklyFigure): TrendDirection {
  if (figure.previous === null) return "unchanged";
  const delta = figure.current - figure.previous;
  if (Math.abs(delta) < 0.005) return "unchanged";
  return delta > 0 ? "up" : "down";
}

export function trendArrow(direction: TrendDirection): string {
  if (direction === "up") return "↑";
  if (direction === "down") return "↓";
  return "→";
}

export const ukWeeklyAverage: Record<FuelType, WeeklyFigure> = {
  petrol: {
    current: 172.01,
    previous: 168.14,
    dataPeriod: "Week commencing 21 September 2026",
    previousDataPeriod: "Week commencing 14 September 2026",
    lastUpdated: "2026-09-21",
  },
  diesel: {
    current: 195.53,
    previous: 190.72,
    dataPeriod: "Week commencing 21 September 2026",
    previousDataPeriod: "Week commencing 14 September 2026",
    lastUpdated: "2026-09-21",
  },
};

export const ukWeeklyAverageSource = {
  label: "GOV.UK / DESNZ: Weekly road fuel prices",
  url: "https://www.gov.uk/government/statistics/weekly-road-fuel-prices",
};

/** US EIA national-average RETAIL gasoline/diesel price, $/US gallon, including taxes. */
export const internationalBenchmark: Record<FuelType, WeeklyFigure> = {
  petrol: {
    current: 4.478,
    previous: 4.319,
    dataPeriod: "Week of 21 September 2026",
    previousDataPeriod: "Week of 14 September 2026",
    lastUpdated: "2026-09-22",
  },
  diesel: {
    current: 6.529,
    previous: 6.285,
    dataPeriod: "Week of 21 September 2026",
    previousDataPeriod: "Week of 14 September 2026",
    lastUpdated: "2026-09-22",
  },
};

export const internationalBenchmarkMeta: Record<FuelType, { label: string; geography: string }> = {
  petrol: { label: "US average retail gasoline", geography: "United States" },
  diesel: { label: "US average retail diesel", geography: "United States" },
};

export const internationalBenchmarkSource = {
  label: "U.S. Energy Information Administration: Weekly Retail Gasoline and Diesel Prices",
  url: "https://www.eia.gov/petroleum/gasdiesel/",
};
