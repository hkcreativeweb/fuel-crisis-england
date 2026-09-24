const LITRES_PER_UK_GALLON = 4.54609;

export type FuelCostInputs = {
  milesPerWeek: number;
  mpg: number;
  pencePerLitre: number;
  weeks: number;
};

export type FuelCostResult = {
  litresPerWeek: number;
  costPerMilePence: number;
  weeklyCost: number;
  monthlyCost: number;
  annualCost: number;
};

export function calculateFuelCost({
  milesPerWeek,
  mpg,
  pencePerLitre,
  weeks,
}: FuelCostInputs): FuelCostResult | null {
  if (
    !Number.isFinite(milesPerWeek) ||
    !Number.isFinite(mpg) ||
    !Number.isFinite(pencePerLitre) ||
    !Number.isFinite(weeks) ||
    milesPerWeek <= 0 ||
    mpg <= 0 ||
    pencePerLitre <= 0 ||
    weeks <= 0
  ) {
    return null;
  }

  const gallonsPerWeek = milesPerWeek / mpg;
  const litresPerWeek = gallonsPerWeek * LITRES_PER_UK_GALLON;
  const weeklyCost = (litresPerWeek * pencePerLitre) / 100;
  const monthlyCost = weeklyCost * (52 / 12);
  const annualCost = weeklyCost * weeks;

  const costPerMilePence = (LITRES_PER_UK_GALLON / mpg) * pencePerLitre;

  return {
    litresPerWeek,
    costPerMilePence,
    weeklyCost,
    monthlyCost,
    annualCost,
  };
}
