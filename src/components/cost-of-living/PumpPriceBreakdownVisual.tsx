import { getPumpPriceBreakdowns } from "@/lib/data/current-fuel-prices";
import { PumpPriceBreakdownView } from "@/components/cost-of-living/PumpPriceBreakdownView";

/** Server wrapper: the split is calculated from the current central prices, never typed in. */
export async function PumpPriceBreakdownVisual() {
  const { petrol, diesel } = await getPumpPriceBreakdowns();
  return <PumpPriceBreakdownView petrolPumpPriceBreakdown={petrol} dieselPumpPriceBreakdown={diesel} />;
}
