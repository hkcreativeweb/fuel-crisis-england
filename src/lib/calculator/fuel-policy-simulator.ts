import { calculatePumpPriceModel } from "@/lib/calculator/pump-price-model";
import {
  currentDutyPencePerLitre,
  currentVatPercent,
  currentWholesalePencePerLitre,
  currentMarginPencePerLitre,
  impliedAnnualLitresTaxed,
} from "@/lib/data/fiscal-baseline";

export type ScenarioInputs = {
  dutyPencePerLitre: number;
  vatPercent: number;
};

export function calculateScenario({ dutyPencePerLitre, vatPercent }: ScenarioInputs) {
  const baseline = calculatePumpPriceModel({
    wholesalePence: currentWholesalePencePerLitre,
    dutyPence: currentDutyPencePerLitre,
    vatPercent: currentVatPercent,
    retailerMarginPence: currentMarginPencePerLitre,
  });

  const scenario = calculatePumpPriceModel({
    wholesalePence: currentWholesalePencePerLitre,
    dutyPence: dutyPencePerLitre,
    vatPercent,
    retailerMarginPence: currentMarginPencePerLitre,
  });

  const changePencePerLitre = scenario.total - baseline.total;
  const dutyDeltaPencePerLitre = dutyPencePerLitre - currentDutyPencePerLitre;
  const vatDeltaPence = scenario.vatPence - baseline.vatPence;

  // Mechanical illustration only: assumes the litre volume taxed at the
  // current rate stays the same under the scenario. It does not model any
  // change in driving behaviour, demand, or retailer pass-through.
  const dutyRevenueDeltaGBP = (dutyDeltaPencePerLitre / 100) * impliedAnnualLitresTaxed;
  const vatRevenueDeltaGBP = (vatDeltaPence / 100) * impliedAnnualLitresTaxed;

  return {
    baselinePencePerLitre: baseline.total,
    scenarioPencePerLitre: scenario.total,
    changePencePerLitre,
    fill20LSaving: (-changePencePerLitre * 20) / 100,
    fill50LSaving: (-changePencePerLitre * 50) / 100,
    yearly1000LSaving: (-changePencePerLitre * 1000) / 100,
    dutyRevenueDeltaGBPBillion: dutyRevenueDeltaGBP / 1_000_000_000,
    vatRevenueDeltaGBPBillion: vatRevenueDeltaGBP / 1_000_000_000,
  };
}
