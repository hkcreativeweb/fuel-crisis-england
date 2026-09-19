import type { MinimumWageSnapshot, EconomicSeries } from "@/lib/types";

const GOV_UK_RATES_URL = "https://www.gov.uk/national-minimum-wage-rates";

export const currentMinimumWage: MinimumWageSnapshot = {
  effectiveFrom: "2026-04-01",
  rates: [
    { band: "21 and over (National Living Wage)", ratePerHour: 12.71, verified: true },
    { band: "18 to 20", ratePerHour: 10.85, verified: true },
    { band: "Under 18", ratePerHour: 8.0, verified: true },
    { band: "Apprentice", ratePerHour: 8.0, verified: true },
  ],
  source: "GOV.UK — National Minimum Wage and National Living Wage rates",
  sourceUrl: GOV_UK_RATES_URL,
  verified: true,
};

export const previousMinimumWage: MinimumWageSnapshot = {
  effectiveFrom: "2025-04-01",
  rates: [
    { band: "21 and over (National Living Wage)", ratePerHour: 12.21, verified: true },
    { band: "18 to 20", ratePerHour: 10.0, verified: true },
    { band: "Under 18", ratePerHour: 7.55, verified: true },
    { band: "Apprentice", ratePerHour: 7.55, verified: true },
  ],
  source: "GOV.UK — National Minimum Wage and National Living Wage rates",
  sourceUrl: GOV_UK_RATES_URL,
  verified: true,
};

export const minimumWageSeries: EconomicSeries = {
  id: "min-wage",
  label: "National Living Wage (21+ rate)",
  unit: "£/hour",
  nominal: true,
  points: [
    { period: "2025", value: 12.21 },
    { period: "2026", value: 12.71 },
  ],
  source: "GOV.UK — National Minimum Wage and National Living Wage rates",
  sourceUrl: GOV_UK_RATES_URL,
  asOf: "2026-04-01",
  status: "historical",
};

export const medianEarningsSeries: EconomicSeries = {
  id: "median-earnings",
  label: "Median full-time weekly earnings",
  unit: "£/week",
  nominal: true,
  points: [
    { period: "2024", value: 728.27 },
    { period: "2025", value: 766.6 },
  ],
  source: "ONS — Annual Survey of Hours and Earnings (ASHE), Employee earnings in the UK: 2025",
  sourceUrl: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/annualsurveyofhoursandearnings/2025",
  asOf: "2025-04-01",
  status: "historical",
};

export const averageEarningsSeries: EconomicSeries = {
  id: "average-earnings",
  label: "Average weekly earnings (regular pay, GB)",
  unit: "£/week",
  nominal: true,
  points: [{ period: "2026 (May–Jul)", value: 705 }],
  source: "ONS — Average Weekly Earnings in Great Britain: September 2026",
  sourceUrl: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/averageweeklyearningsingreatbritain/september2026",
  asOf: "2026-09-15",
  status: "historical",
};
