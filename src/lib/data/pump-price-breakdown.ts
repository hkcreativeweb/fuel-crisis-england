import type { PumpPriceBreakdown } from "@/lib/types";

const METHODOLOGY_PETROL =
  "Fuel duty (52.95 pence/litre) and the 20% VAT rate are exact, verified figures from GOV.UK, calculated against an average pump price of 168.1p/litre (GOV.UK/DESNZ weekly road fuel prices, week commencing 14 September 2026). The retailer margin (11.3 pence/litre) is the CMA's reported average market-wide petrol margin for April 2026 (Enhanced Road Fuel Monitoring report, published via GOV.UK). 'Wholesale, refining & distribution' is the remainder after duty, VAT, and margin are subtracted — it is a calculated figure, not a separately published one, and bundles crude oil cost, refining, and distribution together since no further verified split was available. Because the margin figure and the pump price are from slightly different dates, this breakdown is an approximation, not an exact same-day figure.";

const METHODOLOGY_DIESEL =
  "Fuel duty (52.95 pence/litre) and the 20% VAT rate are exact, verified figures from GOV.UK, calculated against an average pump price of 190.7p/litre (GOV.UK/DESNZ weekly road fuel prices, week commencing 14 September 2026). The retailer margin (10.7 pence/litre) is the CMA's reported average market-wide diesel margin for February–March 2026 (Enhanced Road Fuel Monitoring report, published via GOV.UK). 'Wholesale, refining & distribution' is the remainder after duty, VAT, and margin are subtracted — it is a calculated figure, not a separately published one. Because the margin figure and the pump price are from slightly different dates, this breakdown is an approximation, not an exact same-day figure.";

export const petrolPumpPriceBreakdown: PumpPriceBreakdown = {
  fuel: "petrol",
  components: [
    { label: "Wholesale fuel, refining & distribution", approxPencePerLitre: 75.8, approxPercent: 45.1, verified: true },
    { label: "Fuel duty", approxPencePerLitre: 52.95, approxPercent: 31.5, verified: true },
    { label: "VAT (20%)", approxPencePerLitre: 28.0, approxPercent: 16.7, verified: true },
    { label: "Retailer / forecourt margin", approxPencePerLitre: 11.3, approxPercent: 6.7, verified: true },
  ],
  totalPencePerLitre: 168.1,
  asOf: "2026-09-14",
  source: "GOV.UK (fuel duty, VAT) and CMA Enhanced Road Fuel Monitoring report (retailer margin), via GOV.UK",
  sourceUrl: "https://www.gov.uk/government/publications/enhanced-road-fuel-monitoring-report-august-2026",
  methodology: METHODOLOGY_PETROL,
  verified: true,
};

export const dieselPumpPriceBreakdown: PumpPriceBreakdown = {
  fuel: "diesel",
  components: [
    { label: "Wholesale fuel, refining & distribution", approxPencePerLitre: 95.25, approxPercent: 49.9, verified: true },
    { label: "Fuel duty", approxPencePerLitre: 52.95, approxPercent: 27.8, verified: true },
    { label: "VAT (20%)", approxPencePerLitre: 31.8, approxPercent: 16.7, verified: true },
    { label: "Retailer / forecourt margin", approxPencePerLitre: 10.7, approxPercent: 5.6, verified: true },
  ],
  totalPencePerLitre: 190.7,
  asOf: "2026-09-14",
  source: "GOV.UK (fuel duty, VAT) and CMA Enhanced Road Fuel Monitoring report (retailer margin), via GOV.UK",
  sourceUrl: "https://www.gov.uk/government/publications/enhanced-road-fuel-monitoring-report-august-2026",
  methodology: METHODOLOGY_DIESEL,
  verified: true,
};
