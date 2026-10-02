import { fuelDutyTimeline } from "@/lib/data/fuel-duty-timeline";
import type { FuelType, PumpPriceBreakdown } from "@/lib/types";

/**
 * The pump-price split is CALCULATED from the live weekly average price
 * (see current-fuel-prices.ts), never typed in. Only figures that are
 * genuinely fixed or separately published live here: the VAT rate, the
 * Fuel Duty rate (read from the dated timeline) and the CMA's reported
 * average retailer margins.
 */
const VAT_PERCENT = 20;

const CMA_MARGIN: Record<FuelType, { pence: number; period: string }> = {
  petrol: { pence: 11.3, period: "April 2026" },
  diesel: { pence: 10.7, period: "February–March 2026" },
};

const SOURCE_URL = "https://www.gov.uk/government/publications/enhanced-road-fuel-monitoring-report-august-2026";

/** The Fuel Duty rate in force on a given date, from the verified timeline. */
export function fuelDutyPenceOn(isoDate: string): number {
  const dated = fuelDutyTimeline.filter((e) => e.ratePencePerLitre !== null).sort((a, b) => a.date.localeCompare(b.date));
  const entry = [...dated].reverse().find((e) => e.date <= isoDate) ?? dated[0];
  return entry.ratePencePerLitre as number;
}

export function buildPumpPriceBreakdown(fuel: FuelType, totalPence: number, asOf: string): PumpPriceBreakdown {
  const duty = fuelDutyPenceOn(asOf);
  const vat = totalPence - totalPence / (1 + VAT_PERCENT / 100);
  const margin = CMA_MARGIN[fuel].pence;
  const wholesale = totalPence - duty - vat - margin;
  const pct = (p: number) => Math.round((p / totalPence) * 1000) / 10;
  const round = (p: number) => Math.round(p * 100) / 100;

  return {
    fuel,
    components: [
      { label: "Wholesale fuel, refining & distribution", approxPencePerLitre: round(wholesale), approxPercent: pct(wholesale), verified: true },
      { label: "Fuel duty", approxPencePerLitre: duty, approxPercent: pct(duty), verified: true },
      { label: `VAT (${VAT_PERCENT}%)`, approxPencePerLitre: round(vat), approxPercent: pct(vat), verified: true },
      { label: "Retailer / forecourt margin", approxPencePerLitre: margin, approxPercent: pct(margin), verified: true },
    ],
    totalPencePerLitre: round(totalPence),
    asOf,
    source: "GOV.UK (fuel prices, fuel duty, VAT) and CMA Enhanced Road Fuel Monitoring report (retailer margin), via GOV.UK",
    sourceUrl: SOURCE_URL,
    methodology: `Fuel duty (${duty} pence/litre) and the ${VAT_PERCENT}% VAT rate are exact figures from GOV.UK, applied to the latest GOV.UK/DESNZ weekly average ${fuel} price of ${totalPence.toFixed(1)}p/litre (week commencing ${asOf}). The retailer margin (${margin} pence/litre) is the CMA's reported average market-wide ${fuel} margin for ${CMA_MARGIN[fuel].period} (Enhanced Road Fuel Monitoring report, via GOV.UK). 'Wholesale, refining & distribution' is the remainder after duty, VAT and margin are subtracted. It is a calculated figure, not a separately published one. Because the margin and the pump price are from different dates, this breakdown is an approximation, not an exact same-day figure.`,
    verified: true,
  };
}
