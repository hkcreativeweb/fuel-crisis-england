import type { RegionalPrice } from "@/lib/types";

/**
 * Current and historical UK prices are fetched server-side from the
 * official GOV.UK / DESNZ weekly statistics: see desnz-weekly-prices.ts.
 * DESNZ publishes no official regional breakdown, so regional prices
 * remain unconnected until a verified source (e.g. Fuel Finder open
 * data) is available.
 */
export async function getRegionalFuelPrices(): Promise<RegionalPrice[]> {
  return [];
}
