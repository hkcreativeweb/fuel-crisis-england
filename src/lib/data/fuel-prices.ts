import type { FuelPricePoint, RegionalPrice } from "@/lib/types";

/**
 * Fuel price data that is safe to import from client components.
 *
 * Current and historical UK prices are fetched server-side from the
 * official GOV.UK / DESNZ weekly statistics: see
 * getCurrentFuelPriceSnapshot / getHistoricalFuelPrices in
 * desnz-weekly-prices.ts. DESNZ publishes no official regional
 * breakdown, so regional prices remain unconnected.
 */

export async function getRegionalFuelPrices(): Promise<RegionalPrice[]> {
  // No verified regional data source is connected yet.
  return [];
}

/**
 * Clearly labelled demo dataset, used only to preview how the fuel price
 * chart and regional comparison will look once real data is connected.
 * This is NEVER returned by the functions above — pages must opt in
 * explicitly and must render a persistent "demo data" label alongside it.
 */
export const demoHistoricalFuelPrices: FuelPricePoint[] = [
  { date: "2025-03-01", petrolPencePerLitre: 143.2, dieselPencePerLitre: 149.8 },
  { date: "2025-04-01", petrolPencePerLitre: 144.6, dieselPencePerLitre: 150.9 },
  { date: "2025-05-01", petrolPencePerLitre: 142.1, dieselPencePerLitre: 148.3 },
  { date: "2025-06-01", petrolPencePerLitre: 145.9, dieselPencePerLitre: 151.7 },
  { date: "2025-07-01", petrolPencePerLitre: 148.3, dieselPencePerLitre: 154.2 },
  { date: "2025-08-01", petrolPencePerLitre: 147.0, dieselPencePerLitre: 153.1 },
  { date: "2025-09-01", petrolPencePerLitre: 149.5, dieselPencePerLitre: 155.6 },
];

export const demoRegionalFuelPrices: RegionalPrice[] = [
  { region: "London", petrolPencePerLitre: 151.8, dieselPencePerLitre: 157.9 },
  { region: "South East", petrolPencePerLitre: 149.2, dieselPencePerLitre: 155.4 },
  { region: "South West", petrolPencePerLitre: 148.6, dieselPencePerLitre: 154.8 },
  { region: "Midlands", petrolPencePerLitre: 147.9, dieselPencePerLitre: 153.7 },
  { region: "North West", petrolPencePerLitre: 147.3, dieselPencePerLitre: 153.0 },
  { region: "North East", petrolPencePerLitre: 146.8, dieselPencePerLitre: 152.6 },
  { region: "Yorkshire and the Humber", petrolPencePerLitre: 147.1, dieselPencePerLitre: 152.9 },
  { region: "East of England", petrolPencePerLitre: 148.0, dieselPencePerLitre: 154.0 },
];
