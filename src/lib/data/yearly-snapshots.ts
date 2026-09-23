import type { YearlySnapshot, DataSourceEntry } from "@/lib/types";
import { pumpPriceHistorySource } from "@/lib/data/pump-price-history";

const CURRENT_YEAR = 2026;

/**
 * Canonical source citations, reused by the yearly snapshots below and
 * by the site-wide "Data sources" panel. Every figure in this file
 * traces back to exactly one of these.
 */
export const dataSources: Record<string, DataSourceEntry> = {
  fuelPrices: { category: "Fuel prices", name: "GOV.UK / DESNZ: Weekly road fuel prices", url: "https://www.gov.uk/government/statistics/weekly-road-fuel-prices" },
  minimumWage: { category: "Minimum wage", name: "GOV.UK: National Minimum Wage and National Living Wage rates", url: "https://www.gov.uk/national-minimum-wage-rates" },
  cpi: { category: "Consumer prices", name: "ONS: Consumer Prices Index (D7BT), 2015=100", url: "https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/d7bt/mm23" },
  earnings: { category: "Average earnings", name: "ONS: Average Weekly Earnings, regular pay, whole economy (KAI7)", url: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/timeseries/kai7/emp" },
  bankRate: { category: "Bank Rate", name: "Bank of England: Official Bank Rate history", url: "https://www.bankofengland.co.uk/boeapps/database/Bank-Rate.asp" },
  householdIncome: { category: "Household income", name: "ONS: Real households' disposable income per head (CRXX, UKEA)", url: "https://www.ons.gov.uk/economy/grossdomesticproductgdp/timeseries/crxx/ukea" },
};

/**
 * Year-by-year data used by the historical explorer and the "Then vs
 * Now" comparison. Every fuel-price figure here is a point-in-time
 * snapshot on a specific date. We do NOT have a verified annual
 * average for any year, so we never present one as if we did.
 * `pricesAsOf` always names the exact date(s) behind the number.
 *
 * Minimum wage, CPI, average earnings, Bank Rate and household
 * disposable income are each independently verified against their own
 * primary source and carry their own effective period. They are not
 * assumed to share the fuel-price date's exact methodology, only its
 * approximate reference point. Where a figure cannot be verified for a
 * given year, it is left `null` rather than estimated (see each
 * field's comment for exactly what was checked and what wasn't).
 *
 * The current year (2026) is explicitly marked `isCompletedYear:
 * false`. Its figures describe current/live conditions, not a
 * finished year, and must never be labelled as a "2026 average".
 */
function base(year: string): YearlySnapshot {
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
    minimumWageLabel: null,
    minimumWagePeriod: null,
    minimumWageNote: null,
    cpiIndex: null,
    cpiPeriod: null,
    averageWeeklyEarnings: null,
    averageWeeklyEarningsPeriod: null,
    bankRatePercent: null,
    bankRatePeriod: null,
    realHouseholdDisposableIncomePerHead: null,
    realHouseholdDisposableIncomePeriod: null,
    verified: false,
    source: "Not yet verified",
    sourceUrl: null,
    isCompletedYear: Number(year) < CURRENT_YEAR,
  };
}

/**
 * Fuel price + duty + VAT figures for these years are the first
 * weekly price GOV.UK/DESNZ published on or after 1 January that year:
 * a genuine, dated, single-week snapshot from the primary source
 * (see pump-price-history.ts), NOT an annual average.
 */
function withFuel(year: string, date: string, petrol: number, diesel: number, duty: number, vat: number): YearlySnapshot {
  return {
    ...base(year),
    petrolPencePerLitre: petrol,
    dieselPencePerLitre: diesel,
    pricesPeriodType: "point-in-time",
    pricesAsOf: `Week commencing ${date}, not an annual average`,
    fuelDutyPencePerLitre: duty,
    vatRatePercent: vat,
    verified: true,
    source: pumpPriceHistorySource.name,
    sourceUrl: pumpPriceHistorySource.url,
  };
}

/** CPI index (D7BT, 2015=100), verified annual average, ONS. Not available for the year still in progress. */
function withCpi(s: YearlySnapshot, index: number): YearlySnapshot {
  return { ...s, cpiIndex: index, cpiPeriod: "Annual average, 2015=100 (ONS D7BT)" };
}

/** ONS AWE regular pay, whole economy, seasonally adjusted (series KAI7), verified annual average, £/week. Series begins in 2000. */
function withEarnings(s: YearlySnapshot, gbpPerWeek: number): YearlySnapshot {
  return { ...s, averageWeeklyEarnings: gbpPerWeek, averageWeeklyEarningsPeriod: "Annual average, regular pay, whole economy, seasonally adjusted (ONS KAI7)" };
}

/** Bank of England Bank Rate in force on the snapshot's reference date, verified against the Bank's own published rate-change history. */
function withBankRate(s: YearlySnapshot, percent: number, effectiveFrom: string): YearlySnapshot {
  return { ...s, bankRatePercent: percent, bankRatePeriod: `In force from ${effectiveFrom}` };
}

/** ONS real households' disposable income per head (series CRXX, UKEA), chained volume measure, reference year 2023, £, annual. */
function withHouseholdIncome(s: YearlySnapshot, gbp: number): YearlySnapshot {
  return { ...s, realHouseholdDisposableIncomePerHead: gbp, realHouseholdDisposableIncomePeriod: "Annual, chained volume measure (reference year 2023), per head (ONS CRXX)" };
}

/** National Minimum / Living Wage rate applicable on the snapshot's reference date, verified against GOV.UK's published rate history. */
function withMinimumWage(s: YearlySnapshot, rate: number, label: string, period: string): YearlySnapshot {
  return {
    ...s,
    minimumWagePerHour: rate,
    minimumWageVerified: true,
    minimumWageLabel: label,
    minimumWagePeriod: period,
  };
}

const NMW_NOTE_1995 = "The UK statutory National Minimum Wage was introduced on 1 April 1999. In 1995 there was no single national minimum rate.";
const NMW_THRESHOLD_NOTE = "The age threshold for the top National Minimum/Living Wage rate has changed several times: 22+ until 2010, 21+ from 2010, 25+ (\"National Living Wage\") from 2016, 23+ from 2021, and 21+ again from 2024. Figures here always show the top-band rate in force on this snapshot's date, labelled with its age band.";

export const yearlySnapshots: Record<string, YearlySnapshot> = {
  "1995": (() => {
    let s = base("1995");
    s.minimumWageVerified = false;
    s.minimumWageLabel = "No statutory National Minimum Wage";
    s.minimumWageNote = NMW_NOTE_1995;
    s = withCpi(s, 67.2);
    s = withBankRate(s, 6.13, "7 December 1994");
    s = withHouseholdIncome(s, 16945);
    s.verified = true;
    s.source = `${dataSources.cpi.name} / ${dataSources.bankRate.name} / ${dataSources.householdIncome.name}`;
    s.sourceUrl = dataSources.cpi.url;
    return s;
  })(),
  "2000": {
    ...withMinimumWage(base("2000"), 3.6, "22 and over", "1 April 1999 – 30 September 2000"),
    minimumWageNote: NMW_THRESHOLD_NOTE,
    cpiIndex: 72.7,
    cpiPeriod: "Annual average, 2015=100 (ONS D7BT)",
    averageWeeklyEarnings: 296,
    averageWeeklyEarningsPeriod: "Annual average, regular pay, whole economy, seasonally adjusted (ONS KAI7)",
    bankRatePercent: 5.5,
    bankRatePeriod: "In force from 4 November 1999",
    realHouseholdDisposableIncomePerHead: 19429,
    realHouseholdDisposableIncomePeriod: "Annual, chained volume measure (reference year 2023), per head (ONS CRXX)",
    verified: true,
    source: `${dataSources.minimumWage.name} / ${dataSources.cpi.name} / ${dataSources.earnings.name}`,
    sourceUrl: dataSources.minimumWage.url,
  },
  "2005": (() => {
    let s = withFuel("2005", "3 January 2005", 81.17, 85.12, 47.1, 17.5);
    s = withMinimumWage(s, 4.85, "22 and over", "1 October 2004 – 30 September 2005");
    s.minimumWageNote = NMW_THRESHOLD_NOTE;
    s = withCpi(s, 78.1);
    s = withEarnings(s, 360);
    s = withBankRate(s, 4.75, "5 August 2004");
    s = withHouseholdIncome(s, 21538);
    s.source = `${pumpPriceHistorySource.name} / ${dataSources.minimumWage.name} / ${dataSources.cpi.name} / ${dataSources.earnings.name} / ${dataSources.bankRate.name} / ${dataSources.householdIncome.name}`;
    return s;
  })(),
  "2010": (() => {
    let s = withFuel("2010", "4 January 2010", 109.34, 111.08, 56.19, 17.5);
    s = withMinimumWage(s, 5.8, "22 and over", "1 October 2009 – 30 September 2010");
    s.minimumWageNote = NMW_THRESHOLD_NOTE;
    s = withCpi(s, 89.4);
    s = withEarnings(s, 420);
    s = withBankRate(s, 0.5, "5 March 2009");
    s = withHouseholdIncome(s, 22437);
    s.source = `${pumpPriceHistorySource.name} / ${dataSources.minimumWage.name} / ${dataSources.cpi.name} / ${dataSources.earnings.name} / ${dataSources.bankRate.name} / ${dataSources.householdIncome.name}`;
    return s;
  })(),
  "2015": (() => {
    let s = withFuel("2015", "5 January 2015", 111.06, 117.93, 57.95, 20);
    s = withMinimumWage(s, 6.5, "21 and over", "1 October 2014 – 30 September 2015");
    s.minimumWageNote = NMW_THRESHOLD_NOTE;
    s = withCpi(s, 100.0);
    s = withEarnings(s, 453);
    s = withBankRate(s, 0.5, "5 March 2009");
    s = withHouseholdIncome(s, 24298);
    s.source = `${pumpPriceHistorySource.name} / ${dataSources.minimumWage.name} / ${dataSources.cpi.name} / ${dataSources.earnings.name} / ${dataSources.bankRate.name} / ${dataSources.householdIncome.name}`;
    return s;
  })(),
  "2020": (() => {
    let s = withFuel("2020", "6 January 2020", 126.09, 131.56, 57.95, 20);
    s = withMinimumWage(s, 8.21, "25 and over (National Living Wage)", "1 April 2019 – 31 March 2020");
    s.minimumWageNote = NMW_THRESHOLD_NOTE;
    s = withCpi(s, 108.7);
    s = withEarnings(s, 516);
    s = withBankRate(s, 0.75, "2 August 2018");
    s = withHouseholdIncome(s, 25145);
    s.source = `${pumpPriceHistorySource.name} / ${dataSources.minimumWage.name} / ${dataSources.cpi.name} / ${dataSources.earnings.name} / ${dataSources.bankRate.name} / ${dataSources.householdIncome.name}`;
    return s;
  })(),
  "2021": (() => {
    let s = withFuel("2021", "4 January 2021", 115.39, 119.97, 57.95, 20);
    s = withMinimumWage(s, 8.72, "25 and over (National Living Wage)", "1 April 2020 – 31 March 2021");
    s.minimumWageNote = NMW_THRESHOLD_NOTE;
    s = withCpi(s, 111.6);
    s = withEarnings(s, 543);
    s = withBankRate(s, 0.1, "19 March 2020");
    s = withHouseholdIncome(s, 25418);
    s.source = `${pumpPriceHistorySource.name} / ${dataSources.minimumWage.name} / ${dataSources.cpi.name} / ${dataSources.earnings.name} / ${dataSources.bankRate.name} / ${dataSources.householdIncome.name}`;
    return s;
  })(),
  "2022": (() => {
    let s: YearlySnapshot = {
      ...base("2022"),
      petrolPencePerLitre: 191.55,
      dieselPencePerLitre: 199.22,
      pricesPeriodType: "point-in-time",
      pricesAsOf: "Week commencing 4 July 2022, a record high for both petrol and diesel, not an annual average",
      fuelDutyPencePerLitre: 52.95,
      vatRatePercent: 20,
      verified: true,
      source: pumpPriceHistorySource.name,
      sourceUrl: pumpPriceHistorySource.url,
    };
    s = withMinimumWage(s, 9.5, "23 and over (National Living Wage)", "1 April 2022 – 31 March 2023");
    s.minimumWageNote = NMW_THRESHOLD_NOTE;
    s = withCpi(s, 121.7);
    s = withEarnings(s, 573);
    s = withBankRate(s, 1.25, "16 June 2022");
    s = withHouseholdIncome(s, 24564);
    s.source = `${pumpPriceHistorySource.name} / ${dataSources.minimumWage.name} / ${dataSources.cpi.name} / ${dataSources.earnings.name} / ${dataSources.bankRate.name} / ${dataSources.householdIncome.name}`;
    return s;
  })(),
  "2024": (() => {
    let s = withFuel("2024", "1 January 2024", 140.78, 148.66, 52.95, 20);
    s = withMinimumWage(s, 10.42, "23 and over (National Living Wage)", "1 April 2023 – 31 March 2024");
    s.minimumWageNote = NMW_THRESHOLD_NOTE;
    s = withCpi(s, 133.9);
    s = withEarnings(s, 648);
    s = withBankRate(s, 5.25, "3 August 2023");
    s = withHouseholdIncome(s, 25202);
    s.source = `${pumpPriceHistorySource.name} / ${dataSources.minimumWage.name} / ${dataSources.cpi.name} / ${dataSources.earnings.name} / ${dataSources.bankRate.name} / ${dataSources.householdIncome.name}`;
    return s;
  })(),
  "2025": (() => {
    let s = withFuel("2025", "6 January 2025", 136.6, 143.3, 52.95, 20);
    s = withMinimumWage(s, 11.44, "21 and over (National Living Wage)", "1 April 2024 – 31 March 2025");
    s.minimumWageNote = NMW_THRESHOLD_NOTE;
    s = withCpi(s, 138.4);
    s = withEarnings(s, 679);
    s = withBankRate(s, 4.75, "7 November 2024");
    s = withHouseholdIncome(s, 25320);
    s.source = `${pumpPriceHistorySource.name} / ${dataSources.minimumWage.name} / ${dataSources.cpi.name} / ${dataSources.earnings.name} / ${dataSources.bankRate.name} / ${dataSources.householdIncome.name}`;
    return s;
  })(),
  "2026": (() => {
    let s = withFuel("2026", "21 September 2026", 172.01, 195.53, 52.95, 20);
    s.pricesAsOf = "Week commencing 21 September 2026, a live snapshot rather than a 2026 annual average, since 2026 is still in progress";
    s = withMinimumWage(s, 12.71, "21 and over (National Living Wage)", "From 1 April 2026");
    s.minimumWageNote = NMW_THRESHOLD_NOTE;
    s = withBankRate(s, 3.75, "18 December 2025");
    // CPI, average earnings and household disposable income are deliberately left unset for
    // 2026: the year is still in progress, so no verified ANNUAL figure exists yet. Showing
    // a partial-year number as if it were comparable to a completed year's average would be
    // exactly the kind of period-mixing this dataset is designed to avoid.
    s.source = `${pumpPriceHistorySource.name} / ${dataSources.minimumWage.name} / ${dataSources.bankRate.name}`;
    return s;
  })(),
};

export const availableYears = Object.keys(yearlySnapshots);

/** The year currently in progress. Never treat this as a completed historical year. */
export const currentYear = String(CURRENT_YEAR);
