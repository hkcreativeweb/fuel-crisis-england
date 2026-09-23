import type { PumpPriceBreakdown } from "@/lib/types";

const METHODOLOGY_PETROL =
  "Fuel duty (52.95 pence/litre) and the 20% VAT rate are exact, verified figures from GOV.UK, calculated against an average pump price of 172.0p/litre (GOV.UK/DESNZ weekly road fuel prices, week commencing 21 September 2026). The retailer margin (11.3 pence/litre) is the CMA's reported average market-wide petrol margin for April 2026 (Enhanced Road Fuel Monitoring report, published via GOV.UK). 'Wholesale, refining & distribution' is the remainder after duty, VAT, and margin are subtracted. It is a calculated figure, not a separately published one, and bundles crude oil cost, refining, and distribution together since no further verified split was available. Because the margin figure and the pump price are from slightly different dates, this breakdown is an approximation, not an exact same-day figure.";

const METHODOLOGY_DIESEL =
  "Fuel duty (52.95 pence/litre) and the 20% VAT rate are exact, verified figures from GOV.UK, calculated against an average pump price of 195.5p/litre (GOV.UK/DESNZ weekly road fuel prices, week commencing 21 September 2026). The retailer margin (10.7 pence/litre) is the CMA's reported average market-wide diesel margin for February–March 2026 (Enhanced Road Fuel Monitoring report, published via GOV.UK). 'Wholesale, refining & distribution' is the remainder after duty, VAT, and margin are subtracted. It is a calculated figure, not a separately published one. Because the margin figure and the pump price are from slightly different dates, this breakdown is an approximation, not an exact same-day figure.";

export const petrolPumpPriceBreakdown: PumpPriceBreakdown = {
  fuel: "petrol",
  components: [
    { label: "Wholesale fuel, refining & distribution", approxPencePerLitre: 79.05, approxPercent: 45.9, verified: true },
    { label: "Fuel duty", approxPencePerLitre: 52.95, approxPercent: 30.8, verified: true },
    { label: "VAT (20%)", approxPencePerLitre: 28.7, approxPercent: 16.7, verified: true },
    { label: "Retailer / forecourt margin", approxPencePerLitre: 11.3, approxPercent: 6.6, verified: true },
  ],
  totalPencePerLitre: 172.0,
  asOf: "2026-09-21",
  source: "GOV.UK (fuel duty, VAT) and CMA Enhanced Road Fuel Monitoring report (retailer margin), via GOV.UK",
  sourceUrl: "https://www.gov.uk/government/publications/enhanced-road-fuel-monitoring-report-august-2026",
  methodology: METHODOLOGY_PETROL,
  verified: true,
};

export const dieselPumpPriceBreakdown: PumpPriceBreakdown = {
  fuel: "diesel",
  components: [
    { label: "Wholesale fuel, refining & distribution", approxPencePerLitre: 99.25, approxPercent: 50.7, verified: true },
    { label: "Fuel duty", approxPencePerLitre: 52.95, approxPercent: 27.1, verified: true },
    { label: "VAT (20%)", approxPencePerLitre: 32.6, approxPercent: 16.7, verified: true },
    { label: "Retailer / forecourt margin", approxPencePerLitre: 10.7, approxPercent: 5.5, verified: true },
  ],
  totalPencePerLitre: 195.5,
  asOf: "2026-09-21",
  source: "GOV.UK (fuel duty, VAT) and CMA Enhanced Road Fuel Monitoring report (retailer margin), via GOV.UK",
  sourceUrl: "https://www.gov.uk/government/publications/enhanced-road-fuel-monitoring-report-august-2026",
  methodology: METHODOLOGY_DIESEL,
  verified: true,
};
