/**
 * UK and EU-27 fuel prices, sourced directly from primary data:
 *
 * - EU-27 figures: European Commission, "Weekly Oil Bulletin", the
 *   official weekly consumer-price survey across all EU member states.
 *   Downloaded directly as spreadsheets ("prices with taxes", "prices
 *   without taxes", and VAT rates) for the week of 14 September 2026 —
 *   not a secondary aggregator.
 * - UK figures: the same verified GOV.UK/DESNZ weekly price and Fuel
 *   Duty data used throughout the rest of this site (14 September
 *   2026), converted to EUR using the Bank of England's GBP/EUR spot
 *   rate (17 September 2026) for cross-country comparison only.
 *
 * Every country's `vat` is an exact figure — VAT rates are published
 * percentages, and the VAT amount is calculated precisely from the
 * published total price and that rate. `dutyOther` is different: for
 * the UK it is the UK's own exact, published Fuel Duty rate, but for
 * every EU country it is a REMAINDER — the Oil Bulletin's "with tax"
 * figure minus the "without tax" figure minus the calculated VAT
 * amount, which necessarily also folds in any other minor indirect
 * taxes the Oil Bulletin's "Other Indirect Taxes" sheet records for a
 * handful of countries. We label these differently in the UI
 * (`dutyIsExact: true` only for the UK) rather than implying every
 * country's duty figure carries the same precision.
 */

export type FuelTaxBreakdown = {
  totalEUR: number;
  beforeTaxEUR: number;
  vatEUR: number;
  dutyOtherEUR: number;
  vatPercent: number;
};

export type CountryFuelPrice = {
  country: string;
  code: string;
  isUK?: boolean;
  dutyIsExact: boolean;
  petrol: FuelTaxBreakdown;
  diesel: FuelTaxBreakdown;
};

export const europeFuelPriceSource = {
  name: "European Commission — Weekly Oil Bulletin",
  url: "https://energy.ec.europa.eu/data-and-analysis/weekly-oil-bulletin_en",
  dataDate: "2026-09-14",
  publishedDate: "2026-09-16",
};

export const ukFuelPriceSourceNote = {
  name: "GOV.UK/DESNZ weekly road fuel prices and Fuel Duty rates",
  fxSource: "Bank of England GBP/EUR spot rate, 17 September 2026 (£1 = €1.1625)",
};

export const europeFuelPrices: CountryFuelPrice[] = [
  { country: "United Kingdom", code: "UK", isUK: true, dutyIsExact: true,
    petrol: { totalEUR: 1.954, beforeTaxEUR: 1.013, vatEUR: 0.326, dutyOtherEUR: 0.616, vatPercent: 20 },
    diesel: { totalEUR: 2.217, beforeTaxEUR: 1.232, vatEUR: 0.369, dutyOtherEUR: 0.616, vatPercent: 20 } },
  { country: "Austria", code: "AT", dutyIsExact: false,
    petrol: { totalEUR: 1.894, beforeTaxEUR: 0.983, vatEUR: 0.316, dutyOtherEUR: 0.595, vatPercent: 20 },
    diesel: { totalEUR: 2.197, beforeTaxEUR: 1.307, vatEUR: 0.366, dutyOtherEUR: 0.524, vatPercent: 20 } },
  { country: "Belgium", code: "BE", dutyIsExact: false,
    petrol: { totalEUR: 1.976, beforeTaxEUR: 1.033, vatEUR: 0.343, dutyOtherEUR: 0.6, vatPercent: 21 },
    diesel: { totalEUR: 2.29, beforeTaxEUR: 1.293, vatEUR: 0.398, dutyOtherEUR: 0.6, vatPercent: 21 } },
  { country: "Bulgaria", code: "BG", dutyIsExact: false,
    petrol: { totalEUR: 1.62, beforeTaxEUR: 0.987, vatEUR: 0.27, dutyOtherEUR: 0.363, vatPercent: 20 },
    diesel: { totalEUR: 1.856, beforeTaxEUR: 1.217, vatEUR: 0.309, dutyOtherEUR: 0.33, vatPercent: 20 } },
  { country: "Croatia", code: "HR", dutyIsExact: false,
    petrol: { totalEUR: 1.736, beforeTaxEUR: 0.991, vatEUR: 0.347, dutyOtherEUR: 0.397, vatPercent: 25 },
    diesel: { totalEUR: 1.92, beforeTaxEUR: 1.276, vatEUR: 0.384, dutyOtherEUR: 0.26, vatPercent: 25 } },
  { country: "Cyprus", code: "CY", dutyIsExact: false,
    petrol: { totalEUR: 1.65, beforeTaxEUR: 1.016, vatEUR: 0.263, dutyOtherEUR: 0.37, vatPercent: 19 },
    diesel: { totalEUR: 1.915, beforeTaxEUR: 1.269, vatEUR: 0.306, dutyOtherEUR: 0.341, vatPercent: 19 } },
  { country: "Czechia", code: "CZ", dutyIsExact: false,
    petrol: { totalEUR: 1.828, beforeTaxEUR: 0.982, vatEUR: 0.317, dutyOtherEUR: 0.529, vatPercent: 21 },
    diesel: { totalEUR: 1.991, beforeTaxEUR: 1.236, vatEUR: 0.346, dutyOtherEUR: 0.41, vatPercent: 21 } },
  { country: "Denmark", code: "DK", dutyIsExact: false,
    petrol: { totalEUR: 2.564, beforeTaxEUR: 1.334, vatEUR: 0.513, dutyOtherEUR: 0.717, vatPercent: 25 },
    diesel: { totalEUR: 2.502, beforeTaxEUR: 1.431, vatEUR: 0.5, dutyOtherEUR: 0.57, vatPercent: 25 } },
  { country: "Estonia", code: "EE", dutyIsExact: false,
    petrol: { totalEUR: 1.914, beforeTaxEUR: 0.951, vatEUR: 0.345, dutyOtherEUR: 0.618, vatPercent: 22 },
    diesel: { totalEUR: 2.065, beforeTaxEUR: 1.237, vatEUR: 0.372, dutyOtherEUR: 0.455, vatPercent: 22 } },
  { country: "Finland", code: "FI", dutyIsExact: false,
    petrol: { totalEUR: 2.317, beforeTaxEUR: 1.124, vatEUR: 0.471, dutyOtherEUR: 0.722, vatPercent: 25.5 },
    diesel: { totalEUR: 2.505, beforeTaxEUR: 1.486, vatEUR: 0.509, dutyOtherEUR: 0.511, vatPercent: 25.5 } },
  { country: "France", code: "FR", dutyIsExact: false,
    petrol: { totalEUR: 2.172, beforeTaxEUR: 1.12, vatEUR: 0.362, dutyOtherEUR: 0.69, vatPercent: 20 },
    diesel: { totalEUR: 2.291, beforeTaxEUR: 1.301, vatEUR: 0.382, dutyOtherEUR: 0.608, vatPercent: 20 } },
  { country: "Germany", code: "DE", dutyIsExact: false,
    petrol: { totalEUR: 2.357, beforeTaxEUR: 1.178, vatEUR: 0.376, dutyOtherEUR: 0.803, vatPercent: 19 },
    diesel: { totalEUR: 2.426, beforeTaxEUR: 1.406, vatEUR: 0.387, dutyOtherEUR: 0.632, vatPercent: 19 } },
  { country: "Greece", code: "GR", dutyIsExact: false,
    petrol: { totalEUR: 2.158, beforeTaxEUR: 1.025, vatEUR: 0.418, dutyOtherEUR: 0.715, vatPercent: 24 },
    diesel: { totalEUR: 2.122, beforeTaxEUR: 1.287, vatEUR: 0.411, dutyOtherEUR: 0.424, vatPercent: 24 } },
  { country: "Hungary", code: "HU", dutyIsExact: false,
    petrol: { totalEUR: 1.714, beforeTaxEUR: 0.959, vatEUR: 0.364, dutyOtherEUR: 0.39, vatPercent: 27 },
    diesel: { totalEUR: 1.919, beforeTaxEUR: 1.152, vatEUR: 0.408, dutyOtherEUR: 0.359, vatPercent: 27 } },
  { country: "Ireland", code: "IE", dutyIsExact: false,
    petrol: { totalEUR: 1.894, beforeTaxEUR: 1.036, vatEUR: 0.354, dutyOtherEUR: 0.504, vatPercent: 23 },
    diesel: { totalEUR: 1.989, beforeTaxEUR: 1.244, vatEUR: 0.372, dutyOtherEUR: 0.373, vatPercent: 23 } },
  { country: "Italy", code: "IT", dutyIsExact: false,
    petrol: { totalEUR: 2.084, beforeTaxEUR: 1.035, vatEUR: 0.376, dutyOtherEUR: 0.673, vatPercent: 22 },
    diesel: { totalEUR: 2.191, beforeTaxEUR: 1.263, vatEUR: 0.395, dutyOtherEUR: 0.533, vatPercent: 22 } },
  { country: "Latvia", code: "LV", dutyIsExact: false,
    petrol: { totalEUR: 1.976, beforeTaxEUR: 1.016, vatEUR: 0.343, dutyOtherEUR: 0.617, vatPercent: 21 },
    diesel: { totalEUR: 2.096, beforeTaxEUR: 1.269, vatEUR: 0.364, dutyOtherEUR: 0.464, vatPercent: 21 } },
  { country: "Lithuania", code: "LT", dutyIsExact: false,
    petrol: { totalEUR: 1.918, beforeTaxEUR: 1.023, vatEUR: 0.333, dutyOtherEUR: 0.562, vatPercent: 21 },
    diesel: { totalEUR: 2.184, beforeTaxEUR: 1.252, vatEUR: 0.379, dutyOtherEUR: 0.554, vatPercent: 21 } },
  { country: "Luxembourg", code: "LU", dutyIsExact: false,
    petrol: { totalEUR: 1.793, beforeTaxEUR: 1.006, vatEUR: 0.261, dutyOtherEUR: 0.526, vatPercent: 17 },
    diesel: { totalEUR: 2.123, beforeTaxEUR: 1.393, vatEUR: 0.308, dutyOtherEUR: 0.422, vatPercent: 17 } },
  { country: "Malta", code: "MT", dutyIsExact: false,
    petrol: { totalEUR: 1.34, beforeTaxEUR: 0.586, vatEUR: 0.204, dutyOtherEUR: 0.549, vatPercent: 18 },
    diesel: { totalEUR: 1.21, beforeTaxEUR: 0.553, vatEUR: 0.185, dutyOtherEUR: 0.472, vatPercent: 18 } },
  { country: "Netherlands", code: "NL", dutyIsExact: false,
    petrol: { totalEUR: 2.434, beforeTaxEUR: 1.163, vatEUR: 0.422, dutyOtherEUR: 0.848, vatPercent: 21 },
    diesel: { totalEUR: 2.494, beforeTaxEUR: 1.503, vatEUR: 0.433, dutyOtherEUR: 0.558, vatPercent: 21 } },
  { country: "Poland", code: "PL", dutyIsExact: false,
    petrol: { totalEUR: 1.822, beforeTaxEUR: 1.062, vatEUR: 0.135, dutyOtherEUR: 0.625, vatPercent: 8 },
    diesel: { totalEUR: 2.005, beforeTaxEUR: 1.24, vatEUR: 0.149, dutyOtherEUR: 0.616, vatPercent: 8 } },
  { country: "Portugal", code: "PT", dutyIsExact: false,
    petrol: { totalEUR: 2.072, beforeTaxEUR: 1.094, vatEUR: 0.387, dutyOtherEUR: 0.591, vatPercent: 23 },
    diesel: { totalEUR: 2.152, beforeTaxEUR: 1.312, vatEUR: 0.402, dutyOtherEUR: 0.437, vatPercent: 23 } },
  { country: "Romania", code: "RO", dutyIsExact: false,
    petrol: { totalEUR: 1.889, beforeTaxEUR: 0.979, vatEUR: 0.328, dutyOtherEUR: 0.582, vatPercent: 21 },
    diesel: { totalEUR: 2.0, beforeTaxEUR: 1.253, vatEUR: 0.347, dutyOtherEUR: 0.4, vatPercent: 21 } },
  { country: "Slovakia", code: "SK", dutyIsExact: false,
    petrol: { totalEUR: 1.808, beforeTaxEUR: 0.916, vatEUR: 0.338, dutyOtherEUR: 0.554, vatPercent: 23 },
    diesel: { totalEUR: 1.924, beforeTaxEUR: 1.157, vatEUR: 0.36, dutyOtherEUR: 0.408, vatPercent: 23 } },
  { country: "Slovenia", code: "SI", dutyIsExact: false,
    petrol: { totalEUR: 1.641, beforeTaxEUR: 0.905, vatEUR: 0.296, dutyOtherEUR: 0.44, vatPercent: 22 },
    diesel: { totalEUR: 1.854, beforeTaxEUR: 1.166, vatEUR: 0.334, dutyOtherEUR: 0.353, vatPercent: 22 } },
  { country: "Spain", code: "ES", dutyIsExact: false,
    petrol: { totalEUR: 1.867, beforeTaxEUR: 1.12, vatEUR: 0.324, dutyOtherEUR: 0.423, vatPercent: 21 },
    diesel: { totalEUR: 1.834, beforeTaxEUR: 1.337, vatEUR: 0.318, dutyOtherEUR: 0.179, vatPercent: 21 } },
  { country: "Sweden", code: "SE", dutyIsExact: false,
    petrol: { totalEUR: 1.514, beforeTaxEUR: 1.072, vatEUR: 0.303, dutyOtherEUR: 0.139, vatPercent: 25 },
    diesel: { totalEUR: 1.981, beforeTaxEUR: 1.475, vatEUR: 0.396, dutyOtherEUR: 0.11, vatPercent: 25 } },
];

export const eu27AveragePetrolEUR = 2.063;
export const eu27AverageDieselEUR = 2.159;
