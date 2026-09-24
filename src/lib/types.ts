export type DataStatus = "live" | "historical" | "demo" | "unavailable";

export type DataProvenance = {
  status: DataStatus;
  source: string;
  sourceUrl?: string;
  asOf: string | null;
};

export type FuelType = "petrol" | "diesel";

export type FuelPricePoint = {
  date: string;
  petrolPencePerLitre: number;
  dieselPencePerLitre: number;
};

export type FuelPriceSnapshot = {
  petrolPencePerLitre: number;
  dieselPencePerLitre: number;
  provenance: DataProvenance;
};

export type RegionalPrice = {
  region: string;
  petrolPencePerLitre: number;
  dieselPencePerLitre: number;
};

export type DriverCategory =
  | "commuter"
  | "delivery-driver"
  | "taxi-driver"
  | "tradesperson"
  | "small-business-owner"
  | "family-household"
  | "rural-driver"
  | "other";

export type PublicExperience = {
  id: string;
  areaOrCounty: string;
  category: DriverCategory;
  impactSummary: string;
  submittedOn: string;
  moderationStatus: "example" | "approved" | "pending";
};

// --- Corporate profits & cost of living -------------------------------

/**
 * A single reported financial figure with the exact accounting measure
 * named explicitly (e.g. "Income attributable to shareholders" vs
 * "Adjusted earnings" are NOT the same thing and must never be conflated).
 */
export type FinancialFigure = {
  measureName: string;
  value: number | null;
  currency: "USD" | "GBP" | "EUR";
  unit: "billion" | "million";
  verified: boolean;
};

export type CompanyFinancialYear = {
  fiscalYear: string;
  revenue: FinancialFigure | null;
  netIncome: FinancialFigure | null;
  adjustedEarnings: FinancialFigure | null;
  priorYearNetIncome: FinancialFigure | null;
  percentChangeNetIncome: number | null;
  contextNote: string | null;
  source: string;
  sourceUrl: string | null;
  verified: boolean;
  asOf: string | null;
};

export type Company = {
  slug: string;
  name: string;
  segments: string[];
};

export type SeriesPoint = {
  period: string; // e.g. "2025" or "2025-Q1" or "2025-03"
  value: number | null;
};

export type EconomicSeries = {
  id: string;
  label: string;
  unit: string;
  nominal: boolean; // true = not inflation-adjusted
  points: SeriesPoint[];
  source: string;
  sourceUrl: string | null;
  asOf: string | null;
  status: DataStatus;
};

export type MinimumWageRate = {
  band: string;
  ratePerHour: number | null;
  verified: boolean;
};

export type MinimumWageSnapshot = {
  effectiveFrom: string;
  rates: MinimumWageRate[];
  source: string;
  sourceUrl: string | null;
  verified: boolean;
};

export type PumpPriceComponent = {
  label: string;
  approxPencePerLitre: number | null;
  approxPercent: number | null;
  verified: boolean;
};

export type PumpPriceBreakdown = {
  components: PumpPriceComponent[];
  totalPencePerLitre: number | null;
  fuel: FuelType;
  asOf: string | null;
  source: string;
  sourceUrl: string | null;
  methodology: string;
  verified: boolean;
};

export type WageGapMeasureId =
  | "min-vs-median"
  | "low-vs-high-paid"
  | "average-vs-executive"
  | "pay-growth-vs-inflation"
  | "income-distribution";

export type WageGapMeasure = {
  id: WageGapMeasureId;
  title: string;
  explanation: string;
  series: EconomicSeries[];
};

// --- Follow the Money redesign -----------------------------------------

export type PolicyStatus = "current" | "previous" | "announced" | "proposed";

export type FuelDutyPolicyEvent = {
  id: string;
  date: string;
  status: PolicyStatus;
  title: string;
  description: string;
  ratePencePerLitre: number | null;
  source: string;
  sourceUrl: string;
  verified: boolean;
};

export type HMRCReceipt = {
  label: string;
  amountGBP: number | null;
  unit: "billion" | "million";
  periodLabel: string;
  periodType: "financial-year" | "calendar-year" | "part-year";
  isProvisional: boolean;
  source: string;
  sourceUrl: string | null;
  asOf: string | null;
  verified: boolean;
};

export type PolicyControlArea = {
  title: string;
  whatItIs: string;
  whoControlsIt: string;
  whatHasHappened: string;
  currentPolicy: string;
  source: string;
  sourceUrl: string | null;
};

export type MPEmailTopic = "fuel-duty" | "fuel-prices-competition" | "cost-of-living";

export type MPDemandTopicId =
  | "freeze-duty"
  | "review-duty-vat"
  | "investigate-profits"
  | "windfall-measures"
  | "support-essential-drivers"
  | "improve-transparency"
  | "cost-of-living-knock-on";

export type MPContactRecord = {
  id: string;
  mpName: string;
  dateContacted: string;
  topic: MPEmailTopic;
  responseReceived: boolean;
  responseDate: string | null;
  summary: string;
};

export type ResponseQuoteType = "direct-quote" | "user-summary" | "editorial";

export type MPResponseSubmission = {
  id: string;
  mpName: string;
  constituency: string;
  date: string;
  text: string;
  quoteType: ResponseQuoteType;
  sourceDocument: string | null;
  moderationStatus: "example" | "pending" | "approved";
};

/**
 * The strict live-vs-historical vocabulary used across the site. Never
 * substitute one for another — a "live" single-day snapshot must never
 * be presented as if it were a "historical" full-year average, and vice
 * versa.
 */
export type DataStatusLabel = "live" | "current" | "latest-available" | "ytd" | "historical" | "estimate" | "projection" | "not-yet-available";

/**
 * A fully-specified figure: not just a value, but exactly what period
 * and geography it describes, so it can never be silently compared
 * against a figure from a different period without that being obvious.
 */
export type SourcedFigure = {
  value: number | null;
  unit: string;
  status: DataStatusLabel;
  periodLabel: string; // e.g. "14 September 2026", "2022 (year)", "April–June 2026"
  geography: "England" | "UK" | "Great Britain" | "Global";
  source: string;
  sourceUrl: string | null;
  lastUpdated: string | null; // ISO date/time this figure was checked
};

export type YearlySnapshot = {
  year: string;
  /**
   * Fuel prices in this dataset are point-in-time snapshots on a
   * specific date, NOT computed annual averages — we don't have a
   * verified annual average for any year, so we never present one as
   * if we did. `pricesAsOf` carries the exact date the snapshot below
   * reflects.
   */
  petrolPencePerLitre: number | null;
  dieselPencePerLitre: number | null;
  pricesPeriodType: "point-in-time" | "not-available";
  pricesAsOf: string | null;
  fuelDutyPencePerLitre: number | null;
  vatRatePercent: number | null;

  minimumWagePerHour: number | null;
  minimumWageVerified: boolean;
  /** Age band / rate label, e.g. "22 and over", "25 and over (National Living Wage)". Null when no rate applies (see minimumWageNote). */
  minimumWageLabel: string | null;
  /** The rate's effective period, e.g. "1 October 2004 – 30 September 2005". */
  minimumWagePeriod: string | null;
  /** Explanatory note — used for the pre-1999 "no statutory minimum wage" case and for age-threshold context. */
  minimumWageNote: string | null;

  /** ONS CPI index, D7BT, 2015 = 100, annual average. */
  cpiIndex: number | null;
  cpiPeriod: string | null;

  /** ONS AWE regular pay, whole economy, seasonally adjusted, £/week, annual average (series KAI7). */
  averageWeeklyEarnings: number | null;
  averageWeeklyEarningsPeriod: string | null;

  /** Bank of England Bank Rate in force on this snapshot's reference date. */
  bankRatePercent: number | null;
  bankRatePeriod: string | null;

  /** ONS real households' disposable income per head, £, chained volume measure, reference year 2023 (series CRXX). */
  realHouseholdDisposableIncomePerHead: number | null;
  realHouseholdDisposableIncomePeriod: string | null;

  verified: boolean;
  source: string;
  sourceUrl: string | null;
  /** True only for a completed calendar year; false for the year in progress. */
  isCompletedYear: boolean;
};

/** One line item in the site-wide "Data sources" panel. */
export type DataSourceEntry = {
  category: string;
  name: string;
  url: string;
};
