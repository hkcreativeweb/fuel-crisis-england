export type CMAMarginPoint = {
  period: string;
  allRetailersPencePerLitre: number | null;
  supermarketsPencePerLitre: number | null;
  nonSupermarketsPencePerLitre: number | null;
  note: string;
};

const SOURCE_URL = "https://www.gov.uk/government/publications/enhanced-road-fuel-monitoring-report-august-2026";

/**
 * Average UK road fuel retailer margins (pence per litre, all fuels), from
 * the CMA's Enhanced Road Fuel Monitoring report published 18 August 2026
 * ("Enhanced monitoring report in response to the Middle East conflict"),
 * covering data up to the end of June 2026. These are estimated,
 * market-wide averages drawn from 11 retailers (covering roughly 40% of
 * stations / 60% of sales volume) — not individual retailer figures, and
 * not split by fuel type in the source report.
 */
export const cmaMarginPoints: CMAMarginPoint[] = [
  {
    period: "2025 average",
    allRetailersPencePerLitre: 10.7,
    supermarketsPencePerLitre: 9.8,
    nonSupermarketsPencePerLitre: 11.3,
    note: "Full calendar-year 2025 average, market-wide.",
  },
  {
    period: "May 2026",
    allRetailersPencePerLitre: 11.0,
    supermarketsPencePerLitre: 10.7,
    nonSupermarketsPencePerLitre: 11.3,
    note: "Down 0.3p from April 2026; 0.3ppl above the 2025 average.",
  },
  {
    period: "June 2026",
    allRetailersPencePerLitre: 11.2,
    supermarketsPencePerLitre: 10.4,
    nonSupermarketsPencePerLitre: 12.0,
    note: "0.5ppl above the 2025 average for all retailers. Two unnamed non-supermarket retailers had outsized increases of +4ppl and +4.3ppl over their own 2025 averages.",
  },
];

export const cmaMarginSource = {
  name: "CMA Enhanced Road Fuel Monitoring report, August 2026, via GOV.UK",
  url: SOURCE_URL,
  publicationDate: "18 August 2026",
  dataAsOf: "End of June 2026",
};

/**
 * The CMA's own findings on how quickly retail prices responded to
 * wholesale price changes, quoted directly from the August 2026 report.
 * Kept as direct quotes/close paraphrase to avoid overstating what the
 * regulator actually found.
 */
export const cmaPassThroughFindings = {
  petrol:
    "Petrol pump prices fell 6ppl over May–June 2026, while crude oil costs fell 10ppl over the same period. Using a two-week lag as a proxy for the time it takes retailers to sell through purchased stock, petrol margins generally remained below their pre-conflict level — the CMA's evidence suggests petrol consumers benefited overall from the wholesale price falls.",
  diesel:
    "Diesel pump prices fell 23ppl over May–June 2026, while crude oil costs fell 10ppl and refining spreads fell 11ppl over the same period. Diesel margins \"tended to remain above their pre-conflict level over the same period, falling to pre-conflict levels only at the end of June\" — the CMA says this \"suggests that retailer responses to reductions in wholesale diesel costs may have been more delayed.\"",
  cmaConcern:
    "The CMA noted that \"some retailers gained a competitive advantage when wholesale diesel costs fell...but did not pass on these cost reductions to drivers more quickly in an attempt to gain market share\", attributing this partly to passive pricing strategies. It found no evidence that retailers actively changed strategy to exploit the conflict, but margins \"continued to be at or above the historically high level observed in 2025.\"",
  nextReport: "A more detailed assessment of pass-through timeliness, and of local/regional price variation, is due in the CMA's Autumn 2026 report (not yet published as of 19 September 2026).",
};
