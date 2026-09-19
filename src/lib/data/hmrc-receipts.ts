import type { HMRCReceipt } from "@/lib/types";

/**
 * HMRC Fuel Duty (Hydrocarbon Oils) receipts. These two figures come
 * from two DIFFERENT HMRC publications with different cut-off dates and
 * methodologies — they are not simply the same number at different
 * scales, so they are kept as separate, clearly labelled figures rather
 * than combined.
 */
export const fuelDutyReceiptsPartYear: HMRCReceipt = {
  label: "Fuel Duty receipts",
  amountGBP: 8.4,
  unit: "billion",
  periodLabel: "April to July 2026",
  periodType: "part-year",
  isProvisional: true,
  source: "HMRC tax receipts and National Insurance contributions for the UK (monthly bulletin)",
  sourceUrl:
    "https://www.gov.uk/government/statistics/hmrc-tax-and-nics-receipts-for-the-uk/hmrc-tax-receipts-and-national-insurance-contributions-for-the-uk-new-monthly-bulletin",
  asOf: "2026-08-21",
  verified: true,
};

export const fuelDutyReceiptsFullYear: HMRCReceipt = {
  label: "Fuel Duty receipts",
  amountGBP: 24.25,
  unit: "billion",
  periodLabel: "Financial year 2025 to 2026 (provisional)",
  periodType: "financial-year",
  isProvisional: true,
  source: "HMRC Hydrocarbon Oils Bulletin",
  sourceUrl: "https://www.gov.uk/government/statistics/hydrocarbon-oils-bulletin",
  asOf: "2026-07-31",
  verified: true,
};

/**
 * More granular quarterly breakdown from the same Hydrocarbon Oils
 * Bulletin, split between petrol and diesel — useful context but kept
 * separate from the two headline figures above since it covers a
 * different (shorter) period.
 */
export const fuelDutyReceiptsQuarter = {
  periodLabel: "April to June 2026 (provisional)",
  totalGBPMillion: 6366,
  petrolGBPMillion: 2580,
  dieselGBPMillion: 3721,
  yearOnYearChangePercent: 6.0,
  source: "HMRC Hydrocarbon Oils Bulletin",
  sourceUrl: "https://www.gov.uk/government/statistics/hydrocarbon-oils-bulletin",
  asOf: "2026-07-31",
  verified: true,
};
