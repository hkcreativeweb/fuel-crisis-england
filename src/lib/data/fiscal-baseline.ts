import { fuelDutyTimeline } from "@/lib/data/fuel-duty-timeline";
import { fuelDutyReceiptsFullYear } from "@/lib/data/hmrc-receipts";
import type { PumpPriceBreakdown } from "@/lib/types";

const currentDutyEvent = fuelDutyTimeline.find((e) => e.status === "current");

export const currentDutyPencePerLitre = currentDutyEvent?.ratePencePerLitre ?? 52.95;
export const currentVatPercent = 20;

/** The petrol split behind the simulator, calculated from the live central price (never typed in). */
export type PumpBaseline = { wholesalePence: number; marginPence: number; totalPence: number; asOf: string };

export function buildPumpBaseline(breakdown: PumpPriceBreakdown): PumpBaseline {
  const pence = (label: string) => breakdown.components.find((c) => c.label.startsWith(label))?.approxPencePerLitre ?? 0;
  return { wholesalePence: pence("Wholesale"), marginPence: pence("Retailer"), totalPence: breakdown.totalPencePerLitre ?? 0, asOf: breakdown.asOf ?? "" };
}

/**
 * UK annual road-fuel litres taxed at the current Fuel Duty rate, implied
 * by dividing the published full-year Fuel Duty receipts by the published
 * per-litre rate. This is a transparent arithmetic derivation from two
 * verified HMRC/GOV.UK figures, not a separately published statistic —
 * shown as such wherever it is used.
 */
const receiptsAmountGBPBillion = fuelDutyReceiptsFullYear.amountGBP ?? 0;

export const impliedAnnualLitresTaxed = (receiptsAmountGBPBillion * 1_000_000_000) / (currentDutyPencePerLitre / 100);

export const fiscalBaselineMeta = {
  dutyAsOf: currentDutyEvent?.date ?? null,
  dutySource: currentDutyEvent?.sourceUrl ?? null,
  receiptsPeriodLabel: fuelDutyReceiptsFullYear.periodLabel,
  receiptsAmountGBPBillion,
  receiptsSourceUrl: fuelDutyReceiptsFullYear.sourceUrl,
};
