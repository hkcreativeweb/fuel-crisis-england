import { fuelDutyTimeline } from "@/lib/data/fuel-duty-timeline";
import { fuelDutyReceiptsFullYear } from "@/lib/data/hmrc-receipts";
import { petrolPumpPriceBreakdown } from "@/lib/data/pump-price-breakdown";

const currentDutyEvent = fuelDutyTimeline.find((e) => e.status === "current");

const wholesaleComponent = petrolPumpPriceBreakdown.components.find((c) => c.label.startsWith("Wholesale"));
const marginComponent = petrolPumpPriceBreakdown.components.find((c) => c.label.startsWith("Retailer"));

export const currentDutyPencePerLitre = currentDutyEvent?.ratePencePerLitre ?? 52.95;
export const currentVatPercent = 20;
export const currentWholesalePencePerLitre = wholesaleComponent?.approxPencePerLitre ?? 0;
export const currentMarginPencePerLitre = marginComponent?.approxPencePerLitre ?? 0;
export const currentPumpPricePencePerLitre = petrolPumpPriceBreakdown.totalPencePerLitre;

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
  pumpPriceAsOf: petrolPumpPriceBreakdown.asOf ?? "",
};
