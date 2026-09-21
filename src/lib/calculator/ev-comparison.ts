const LITRES_PER_UK_GALLON = 4.54609;

export type OwnershipInputs = {
  years: number;
  annualMileage: number;
  icePurchasePrice: number;
  evPurchasePrice: number;
  mpg: number;
  fuelPricePerLitre: number; // pence
  iceMaintenancePerYear: number;
  iceInsurancePerYear: number;
  iceTaxPerYear: number;
  kwhPer100Miles: number;
  homeElecPricePerKwh: number; // pence
  publicElecPricePerKwh: number; // pence
  homeChargingPercent: number; // 0-100
  evMaintenancePerYear: number;
  evInsurancePerYear: number;
  evTaxPerYear: number;
};

export type VehicleYearlyCost = {
  energy: number;
  maintenance: number;
  insurance: number;
  tax: number;
  runningTotal: number;
};

export type OwnershipResult = {
  ice: VehicleYearlyCost & { purchasePrice: number; totalCost: number; costPerMile: number; cumulativeByYear: number[] };
  ev: VehicleYearlyCost & { purchasePrice: number; totalCost: number; costPerMile: number; cumulativeByYear: number[] };
  differenceTotal: number; // positive = EV costs more
  cheaper: "ice" | "ev" | "equal";
  breakEvenYears: number | null; // null = no break-even within reasonable horizon
  breakEvenWithinPeriod: boolean;
};

function safe(n: number, fallback = 0): number {
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

export function calculateOwnership(inputs: OwnershipInputs): OwnershipResult {
  const years = Math.max(1, safe(inputs.years, 1));
  const mileage = safe(inputs.annualMileage);

  const litresPerYear = inputs.mpg > 0 ? (mileage / inputs.mpg) * LITRES_PER_UK_GALLON : 0;
  const iceEnergy = (litresPerYear * safe(inputs.fuelPricePerLitre)) / 100;

  const homePct = Math.min(100, Math.max(0, safe(inputs.homeChargingPercent, 100))) / 100;
  const blendedPencePerKwh = homePct * safe(inputs.homeElecPricePerKwh) + (1 - homePct) * safe(inputs.publicElecPricePerKwh);
  const kwhPerYear = (mileage / 100) * safe(inputs.kwhPer100Miles);
  const evEnergy = (kwhPerYear * blendedPencePerKwh) / 100;

  const iceRunning = iceEnergy + safe(inputs.iceMaintenancePerYear) + safe(inputs.iceInsurancePerYear) + safe(inputs.iceTaxPerYear);
  const evRunning = evEnergy + safe(inputs.evMaintenancePerYear) + safe(inputs.evInsurancePerYear) + safe(inputs.evTaxPerYear);

  const iceCumulative: number[] = [];
  const evCumulative: number[] = [];
  for (let y = 1; y <= years; y++) {
    iceCumulative.push(safe(inputs.icePurchasePrice) + iceRunning * y);
    evCumulative.push(safe(inputs.evPurchasePrice) + evRunning * y);
  }

  const iceTotal = safe(inputs.icePurchasePrice) + iceRunning * years;
  const evTotal = safe(inputs.evPurchasePrice) + evRunning * years;
  const totalMiles = mileage * years;

  const differenceTotal = evTotal - iceTotal;
  const cheaper = Math.abs(differenceTotal) < 0.5 ? "equal" : differenceTotal < 0 ? "ev" : "ice";

  // Break-even: only meaningful if one vehicle costs more upfront but less to run.
  let breakEvenYears: number | null = null;
  const purchaseDiff = safe(inputs.evPurchasePrice) - safe(inputs.icePurchasePrice);
  const runningSavingPerYear = iceRunning - evRunning; // positive = EV cheaper to run
  if (purchaseDiff > 0 && runningSavingPerYear > 0) {
    breakEvenYears = purchaseDiff / runningSavingPerYear;
  } else if (purchaseDiff < 0 && runningSavingPerYear < 0) {
    breakEvenYears = -purchaseDiff / -runningSavingPerYear;
  }

  return {
    ice: {
      energy: iceEnergy,
      maintenance: safe(inputs.iceMaintenancePerYear),
      insurance: safe(inputs.iceInsurancePerYear),
      tax: safe(inputs.iceTaxPerYear),
      runningTotal: iceRunning,
      purchasePrice: safe(inputs.icePurchasePrice),
      totalCost: iceTotal,
      costPerMile: totalMiles > 0 ? iceTotal / totalMiles : 0,
      cumulativeByYear: iceCumulative,
    },
    ev: {
      energy: evEnergy,
      maintenance: safe(inputs.evMaintenancePerYear),
      insurance: safe(inputs.evInsurancePerYear),
      tax: safe(inputs.evTaxPerYear),
      runningTotal: evRunning,
      purchasePrice: safe(inputs.evPurchasePrice),
      totalCost: evTotal,
      costPerMile: totalMiles > 0 ? evTotal / totalMiles : 0,
      cumulativeByYear: evCumulative,
    },
    differenceTotal,
    cheaper,
    breakEvenYears,
    breakEvenWithinPeriod: breakEvenYears !== null && breakEvenYears <= years,
  };
}

/** Sensible UK defaults, clearly typical/estimated (not live) unless noted. */
export const evComparisonDefaults = {
  years: 5,
  annualMileage: 8000,
  icePurchasePrice: 22000,
  evPurchasePrice: 30000,
  mpg: 45,
  iceMaintenancePerYear: 500,
  iceInsurancePerYear: 650,
  iceTaxPerYear: 190,
  kwhPer100Miles: 30,
  homeElecPricePerKwh: 27,
  publicElecPricePerKwh: 60,
  homeChargingPercent: 80,
  evMaintenancePerYear: 300,
  evInsurancePerYear: 700,
  evTaxPerYear: 10,
};
