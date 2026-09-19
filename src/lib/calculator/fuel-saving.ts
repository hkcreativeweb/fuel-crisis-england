import { calculateFuelCost, type FuelCostResult } from "@/lib/calculator/fuel-cost";

export type FuelSavingInputs = {
  milesPerWeek: number;
  mpg: number;
  pencePerLitre: number;
  weeks: number;
  reductionPercent: number;
};

export type FuelSavingResult = {
  current: FuelCostResult;
  efficient: FuelCostResult;
  weeklySaving: number;
  annualSaving: number;
  costPerMile: number;
  costPer100Miles: number;
};

export function calculateFuelSaving({
  milesPerWeek,
  mpg,
  pencePerLitre,
  weeks,
  reductionPercent,
}: FuelSavingInputs): FuelSavingResult | null {
  const current = calculateFuelCost({ milesPerWeek, mpg, pencePerLitre, weeks });
  if (!current) return null;

  const clampedReduction = Math.min(100, Math.max(0, reductionPercent));
  const efficientMpg = mpg / (1 - clampedReduction / 100);
  const efficient = calculateFuelCost({ milesPerWeek, mpg: efficientMpg, pencePerLitre, weeks });
  if (!efficient) return null;

  return {
    current,
    efficient,
    weeklySaving: current.weeklyCost - efficient.weeklyCost,
    annualSaving: current.annualCost - efficient.annualCost,
    costPerMile: current.weeklyCost / milesPerWeek,
    costPer100Miles: (current.weeklyCost / milesPerWeek) * 100,
  };
}
