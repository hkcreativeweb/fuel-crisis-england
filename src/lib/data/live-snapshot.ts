import type { DataStatusLabel, FuelType } from "@/lib/types";
import type { WeeklyFigure } from "@/lib/data/hero-fuel-snapshot";

export type LiveIndicator = {
  id: string;
  label: string;
  value: string | null;
  unit: string;
  status: DataStatusLabel;
  lastUpdated: string; // ISO date or date-time
  dataPeriod: string; // e.g. "Today", "This week", "Current month", "FY2025"
  geography: "England" | "UK" | "Great Britain" | "Global";
  source: string;
  sourceUrl: string | null;
};

/**
 * Every figure that could plausibly be read as "what's happening right
 * now". None of these are annual averages, each is either a genuine
 * live/current snapshot or explicitly the latest available published
 * figure, labelled accordingly. This is the ONLY place "now" data
 * lives. Historical annual data lives in yearly-snapshots.ts and must
 * never be merged with this file's figures without an explicit label.
 */
export const liveIndicators: LiveIndicator[] = [
  {
    id: "petrol-price",
    label: "Average petrol price",
    value: "172.0",
    unit: "pence/litre",
    status: "latest-available",
    lastUpdated: "2026-09-21",
    dataPeriod: "Week commencing 21 September 2026",
    geography: "UK",
    source: "GOV.UK / DESNZ: Weekly road fuel prices",
    sourceUrl: "https://www.gov.uk/government/statistics/weekly-road-fuel-prices",
  },
  {
    id: "diesel-price",
    label: "Average diesel price",
    value: "195.5",
    unit: "pence/litre",
    status: "latest-available",
    lastUpdated: "2026-09-21",
    dataPeriod: "Week commencing 21 September 2026",
    geography: "UK",
    source: "GOV.UK / DESNZ: Weekly road fuel prices",
    sourceUrl: "https://www.gov.uk/government/statistics/weekly-road-fuel-prices",
  },
  {
    id: "fuel-duty",
    label: "Fuel Duty rate",
    value: "52.95",
    unit: "pence/litre",
    status: "live",
    lastUpdated: "2026-06-15",
    dataPeriod: "Current rate, in force since 15 June 2026",
    geography: "UK",
    source: "GOV.UK, Amended Fuel Duty rates: 2026 to 2027",
    sourceUrl: "https://www.gov.uk/government/publications/amended-fuel-duty-rates-for-2026-to-2027/amended-fuel-duty-rates-2026-to-2027",
  },
  {
    id: "vat-rate",
    label: "VAT rate on fuel",
    value: "20",
    unit: "%",
    status: "live",
    lastUpdated: "2026-09-08",
    dataPeriod: "Current standard rate",
    geography: "UK",
    source: "GOV.UK: VAT rates",
    sourceUrl: "https://www.gov.uk/vat-rates",
  },
  {
    id: "crude-oil",
    label: "Crude oil price (Brent)",
    value: null,
    unit: "US$/barrel",
    status: "not-yet-available",
    lastUpdated: "",
    dataPeriod: "",
    geography: "Global",
    source: "Not yet verified against a primary source (e.g. EIA, ICE)",
    sourceUrl: null,
  },
  {
    id: "gbp-usd",
    label: "GBP/USD exchange rate",
    value: "1.3353",
    unit: "US$ per £1",
    status: "live",
    lastUpdated: "2026-09-17",
    dataPeriod: "Spot rate",
    geography: "Global",
    source: "Bank of England",
    sourceUrl: "https://www.bankofengland.co.uk/boeapps/database/Rates.asp",
  },
  {
    id: "bank-rate",
    label: "Bank of England Bank Rate",
    value: "3.75",
    unit: "%",
    status: "live",
    lastUpdated: "2025-12-18",
    dataPeriod: "Current rate, set 18 December 2025",
    geography: "UK",
    source: "Bank of England",
    sourceUrl: "https://www.bankofengland.co.uk/boeapps/database/Bank-Rate.asp",
  },
  {
    id: "inflation",
    label: "CPI inflation rate",
    value: "3.1",
    unit: "% per year",
    status: "latest-available",
    lastUpdated: "2026-09-16",
    dataPeriod: "12 months to August 2026",
    geography: "UK",
    source: "ONS: Consumer price inflation, UK",
    sourceUrl: "https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/consumerpriceinflation/august2026",
  },
  {
    id: "earnings",
    label: "Average weekly earnings (regular pay)",
    value: "705",
    unit: "£/week",
    status: "latest-available",
    lastUpdated: "2026-09-15",
    dataPeriod: "May–July 2026 (3-month average)",
    geography: "Great Britain",
    source: "ONS: Average Weekly Earnings in Great Britain",
    sourceUrl: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/averageweeklyearningsingreatbritain/september2026",
  },
  {
    id: "minimum-wage",
    label: "National Living Wage (21+)",
    value: "12.71",
    unit: "£/hour",
    status: "live",
    lastUpdated: "2026-04-01",
    dataPeriod: "Current rate, effective from 1 April 2026",
    geography: "UK",
    source: "GOV.UK: National Minimum Wage and National Living Wage rates",
    sourceUrl: "https://www.gov.uk/national-minimum-wage-rates",
  },
  {
    id: "fuel-duty-receipts",
    label: "Fuel Duty receipts",
    value: "8.4",
    unit: "£bn",
    status: "ytd",
    lastUpdated: "2026-08-21",
    dataPeriod: "April to July 2026 (year to date, provisional)",
    geography: "UK",
    source: "HMRC tax receipts and National Insurance contributions for the UK",
    sourceUrl:
      "https://www.gov.uk/government/statistics/hmrc-tax-and-nics-receipts-for-the-uk/hmrc-tax-receipts-and-national-insurance-contributions-for-the-uk-new-monthly-bulletin",
  },
  {
    id: "hundred-mile-journey",
    label: "Cost of a 100-mile journey (40mpg petrol car)",
    value: "19.55",
    unit: "£",
    status: "live",
    lastUpdated: "2026-09-21",
    dataPeriod: "Calculated from today's petrol price",
    geography: "UK",
    source: "Calculated: 100 miles ÷ 40mpg × 4.54609 litres/gallon × current petrol price",
    sourceUrl: null,
  },
];

/** Litres in an imperial gallon, used for the 100-mile journey figure. */
const LITRES_PER_GALLON = 4.54609;

/**
 * Returns a copy of `indicators` with the petrol, diesel and 100-mile
 * journey figures replaced by a newer DESNZ weekly average fetched from
 * GOV.UK (see desnz-weekly-prices.ts). Every other indicator is unchanged.
 */
export function withLatestFuelPrices(
  indicators: LiveIndicator[],
  figures: Record<FuelType, WeeklyFigure>
): LiveIndicator[] {
  return indicators.map((indicator) => {
    const fuel: FuelType | null =
      indicator.id === "petrol-price" ? "petrol" : indicator.id === "diesel-price" ? "diesel" : null;
    if (fuel) {
      const figure = figures[fuel];
      return { ...indicator, value: figure.current.toFixed(1), lastUpdated: figure.lastUpdated, dataPeriod: figure.dataPeriod };
    }
    if (indicator.id === "hundred-mile-journey") {
      const pounds = (100 / 40) * LITRES_PER_GALLON * (figures.petrol.current / 100);
      return { ...indicator, value: pounds.toFixed(2), lastUpdated: figures.petrol.lastUpdated };
    }
    return indicator;
  });
}

/**
 * Latest available major company financial results: the most recent
 * full fiscal year reported (see company-financials.ts for the full
 * verified detail). Flagged here to make explicit these are "latest
 * available", not "live". Corporate results are published
 * periodically, not continuously.
 */
export const latestCompanyResultsNote = {
  status: "latest-available" as DataStatusLabel,
  detail: "Most recent full fiscal year (FY2025) reported by each company, published Jan–Feb 2026. Not real-time.",
};
