/**
 * "Build the Pump Price" — an illustrative model, not a live pricing
 * prediction. Starts from the verified current breakdown and lets a
 * user explore how shifting each component would change a hypothetical
 * pump price. This is explicitly a what-if model: it does not simulate
 * real market mechanics (e.g. how a change in crude oil actually flows
 * through refining margins), it just recomputes the arithmetic total.
 */
export type PumpPriceModelInputs = {
  wholesalePence: number;
  dutyPence: number;
  vatPercent: number;
  retailerMarginPence: number;
};

export function calculatePumpPriceModel(inputs: PumpPriceModelInputs) {
  const preVat = inputs.wholesalePence + inputs.dutyPence + inputs.retailerMarginPence;
  const vatPence = preVat * (inputs.vatPercent / 100);
  const total = preVat + vatPence;
  return { preVat, vatPence, total };
}
