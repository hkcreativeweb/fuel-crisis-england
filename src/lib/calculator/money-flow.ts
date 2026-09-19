import { petrolPumpPriceBreakdown } from "@/lib/data/pump-price-breakdown";
import { yearlySnapshots } from "@/lib/data/yearly-snapshots";

export type MoneyFlowCategory = {
  key: "duty" | "vat" | "industry" | "retail";
  label: string;
  group: "Government" | "Oil & energy industry" | "Retail";
  amount: number;
  percent: number;
  confidence: "known" | "estimated";
};

export type MoneyFlowResult = {
  year: string;
  amount: number;
  totalPencePerLitre: number;
  detailLevel: "full" | "simple";
  categories: MoneyFlowCategory[];
};

/**
 * Years with a full, verified wholesale/duty/VAT/margin breakdown. Only
 * "current" data has this level of detail verified today; more years
 * are added here only once independently sourced.
 */
const FULL_BREAKDOWN_YEARS = new Set(["2026"]);

export function getAvailableMoneyFlowYears(): string[] {
  return Object.values(yearlySnapshots)
    .filter((s) => s.verified && s.petrolPencePerLitre !== null && s.fuelDutyPencePerLitre !== null && s.vatRatePercent !== null)
    .map((s) => s.year)
    .sort();
}

export function calculateMoneyFlow(year: string, amount: number): MoneyFlowResult | null {
  const snapshot = yearlySnapshots[year];
  if (!snapshot || !snapshot.verified || snapshot.petrolPencePerLitre === null) return null;

  const totalPencePerLitre = snapshot.petrolPencePerLitre;

  if (FULL_BREAKDOWN_YEARS.has(year)) {
    const categories: MoneyFlowCategory[] = petrolPumpPriceBreakdown.components.map((c) => {
      const percent = c.approxPercent ?? 0;
      const key =
        c.label.startsWith("Fuel duty") ? "duty" : c.label.startsWith("VAT") ? "vat" : c.label.startsWith("Retailer") ? "retail" : "industry";
      const group: MoneyFlowCategory["group"] = key === "duty" || key === "vat" ? "Government" : key === "retail" ? "Retail" : "Oil & energy industry";
      const confidence: MoneyFlowCategory["confidence"] = key === "duty" || key === "vat" ? "known" : "estimated";
      return {
        key,
        label: c.label,
        group,
        amount: (amount * percent) / 100,
        percent,
        confidence,
      };
    });
    return { year, amount, totalPencePerLitre, detailLevel: "full", categories };
  }

  if (snapshot.fuelDutyPencePerLitre === null || snapshot.vatRatePercent === null) return null;

  const duty = snapshot.fuelDutyPencePerLitre;
  const vatRate = snapshot.vatRatePercent / 100;
  // VAT is charged on the price including duty: price = exVAT * (1 + vatRate)
  const vatPence = totalPencePerLitre - totalPencePerLitre / (1 + vatRate);

  const dutyPercent = (duty / totalPencePerLitre) * 100;
  const vatPercent = (vatPence / totalPencePerLitre) * 100;
  const industryPercent = 100 - dutyPercent - vatPercent;

  const categories: MoneyFlowCategory[] = [
    { key: "duty", label: "Fuel duty", group: "Government", amount: (amount * dutyPercent) / 100, percent: dutyPercent, confidence: "known" },
    { key: "vat", label: "VAT", group: "Government", amount: (amount * vatPercent) / 100, percent: vatPercent, confidence: "known" },
    {
      key: "industry",
      label: "Wholesale fuel, refining, distribution & retail",
      group: "Oil & energy industry",
      amount: (amount * industryPercent) / 100,
      percent: industryPercent,
      confidence: "estimated",
    },
  ];

  return { year, amount, totalPencePerLitre, detailLevel: "simple", categories };
}
