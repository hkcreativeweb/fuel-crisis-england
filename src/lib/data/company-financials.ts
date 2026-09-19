import type { Company, CompanyFinancialYear } from "@/lib/types";

/**
 * Corporate financial data.
 *
 * Every figure below was checked against the company's own SEC filing
 * (6-K/8-K exhibit) or official press release / annual report. Figures
 * are shown exactly as reported, with the company's own name for each
 * accounting measure preserved. Net income ("income attributable to
 * shareholders" or equivalent) is never conflated with an adjusted or
 * underlying earnings measure.
 *
 * All five companies report in US dollars. Values here have been
 * converted to pounds sterling at a single fixed rate, £1 = $1.3353
 * (Bank of England, spot rate, 17 September 2026), applied uniformly
 * to every figure, including the historical timeline. This is an
 * approximate, present-day GBP equivalent, not the exchange rate on
 * each historical reporting date. See the conversion note rendered
 * alongside the corporate profits sections for this disclosure.
 */

export const companies: Company[] = [
  {
    slug: "shell",
    name: "Shell plc",
    segments: ["Oil production", "Natural gas", "LNG", "Refining", "Chemicals", "Trading", "Retail", "Renewables & energy solutions"],
  },
  {
    slug: "bp",
    name: "BP plc",
    segments: ["Oil production", "Natural gas", "Refining", "Trading & shipping", "Retail (fuel & convenience)", "Low carbon energy"],
  },
  {
    slug: "exxonmobil",
    name: "ExxonMobil",
    segments: ["Upstream (oil & gas production)", "Product Solutions (refining, chemicals, fuels)", "Low Carbon Solutions"],
  },
  {
    slug: "totalenergies",
    name: "TotalEnergies",
    segments: ["Exploration & production", "Integrated LNG", "Refining & chemicals", "Marketing & services", "Integrated power (renewables & electricity)"],
  },
  {
    slug: "chevron",
    name: "Chevron",
    segments: ["Upstream (oil & gas production)", "Downstream (refining, marketing, retail)", "Chemicals", "New energies"],
  },
];

export const latestCompanyFinancials: Record<string, CompanyFinancialYear> = {
  shell: {
    fiscalYear: "FY2025",
    revenue: { measureName: "Revenue and other income", value: 204996, currency: "GBP", unit: "million", verified: true },
    netIncome: { measureName: "Income attributable to Shell plc shareholders", value: 13359, currency: "GBP", unit: "million", verified: true },
    adjustedEarnings: { measureName: "Adjusted Earnings (non-GAAP)", value: 13876, currency: "GBP", unit: "million", verified: true },
    priorYearNetIncome: { measureName: "Income attributable to Shell plc shareholders (FY2024)", value: 12053, currency: "GBP", unit: "million", verified: true },
    percentChangeNetIncome: 10.8,
    contextNote: "Adjusted Earnings fell year-on-year even as statutory net income rose, illustrating why the two measures should not be read as interchangeable.",
    source: "Shell plc Q4 2025 and Full Year Results (SEC Form 6-K exhibit); originally reported in US dollars",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/1306965/000162828026005600/q42025exhibit992.htm",
    verified: true,
    asOf: "2026-02-05",
  },
  bp: {
    fiscalYear: "FY2025",
    revenue: { measureName: "Total revenues and other income", value: 144199, currency: "GBP", unit: "million", verified: true },
    netIncome: { measureName: "Profit for the year attributable to bp shareholders", value: 41, currency: "GBP", unit: "million", verified: true },
    adjustedEarnings: { measureName: "Underlying replacement cost (RC) profit (non-GAAP)", value: 5605, currency: "GBP", unit: "million", verified: true },
    priorYearNetIncome: { measureName: "Profit attributable to bp shareholders (FY2024)", value: 285, currency: "GBP", unit: "million", verified: true },
    percentChangeNetIncome: -85.6,
    contextNote: "Statutory profit was close to zero even though underlying replacement cost profit, BP's preferred non-GAAP measure, was several billion dollars, showing how different these two figures can be in the same year.",
    source: "BP plc Fourth Quarter and Full Year 2025 Results (SEC Form 6-K), originally reported in US dollars",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/313807/000031380726000002/a31122025bp6kq4.htm",
    verified: true,
    asOf: "2026-02-09",
  },
  exxonmobil: {
    fiscalYear: "FY2025",
    revenue: { measureName: "Total revenues and other income", value: 248812, currency: "GBP", unit: "million", verified: true },
    netIncome: { measureName: "Net income attributable to ExxonMobil", value: 21601, currency: "GBP", unit: "million", verified: true },
    adjustedEarnings: { measureName: "Earnings excluding identified items (non-GAAP)", value: 22548, currency: "GBP", unit: "million", verified: true },
    priorYearNetIncome: { measureName: "Net income attributable to ExxonMobil (FY2024)", value: 25223, currency: "GBP", unit: "million", verified: true },
    percentChangeNetIncome: -14.35,
    contextNote: null,
    source: "ExxonMobil Fourth Quarter and Full Year 2025 Earnings (SEC Form 8-K exhibit); originally reported in US dollars",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/34088/000003408826000033/livef8k4q25991.htm",
    verified: true,
    asOf: "2026-01-30",
  },
  totalenergies: {
    fiscalYear: "FY2025",
    revenue: { measureName: "Revenues from sales", value: 136557, currency: "GBP", unit: "million", verified: true },
    netIncome: { measureName: "Net income (TotalEnergies share, IFRS)", value: 9831, currency: "GBP", unit: "million", verified: true },
    adjustedEarnings: { measureName: "Adjusted net income (TotalEnergies share, non-GAAP)", value: 11673, currency: "GBP", unit: "million", verified: true },
    priorYearNetIncome: { measureName: "Net income (TotalEnergies share, FY2024)", value: 11801, currency: "GBP", unit: "million", verified: true },
    percentChangeNetIncome: -17,
    contextNote: null,
    source: "TotalEnergies Fourth Quarter and Full Year 2025 Results press release; originally reported in US dollars",
    sourceUrl: "https://totalenergies.com/system/files/documents/totalenergies_pr-results-q4-2025_2026_en.pdf",
    verified: true,
    asOf: "2026-02-11",
  },
  chevron: {
    fiscalYear: "FY2025",
    revenue: { measureName: "Total revenues and other income", value: 141564, currency: "GBP", unit: "million", verified: true },
    netIncome: { measureName: "Net income attributable to Chevron Corporation", value: 9211, currency: "GBP", unit: "million", verified: true },
    adjustedEarnings: { measureName: "Adjusted earnings (non-GAAP)", value: 10126, currency: "GBP", unit: "million", verified: true },
    priorYearNetIncome: { measureName: "Net income attributable to Chevron (FY2024)", value: 13226, currency: "GBP", unit: "million", verified: true },
    percentChangeNetIncome: -30.4,
    contextNote: null,
    source: "Chevron Fourth Quarter and Full Year 2025 Results (SEC Form 8-K exhibit); originally reported in US dollars",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/93410/000009341026000019/a12312025ex9918-k.htm",
    verified: true,
    asOf: "2026-01-30",
  },
};

function yr(
  fiscalYear: string,
  revenueGBP: number,
  netIncomeGBP: number,
  isLoss: boolean,
  contextNote: string,
  sourceUrl: string,
  asOf: string
): CompanyFinancialYear {
  return {
    fiscalYear,
    revenue: { measureName: "Revenue", value: revenueGBP, currency: "GBP", unit: "million", verified: true },
    netIncome: {
      measureName: isLoss ? "Net loss attributable to shareholders" : "Net income attributable to shareholders",
      value: netIncomeGBP,
      currency: "GBP",
      unit: "million",
      verified: true,
    },
    adjustedEarnings: null,
    priorYearNetIncome: null,
    percentChangeNetIncome: null,
    contextNote,
    source: "Company SEC filing (6-K exhibit) for the relevant fiscal year; originally reported in US dollars",
    sourceUrl,
    verified: true,
    asOf,
  };
}

/**
 * Multi-year timeline for Shell and BP, 2015-2025. Deliberately includes
 * loss-making and low-profit years (2015, 2016, 2020, and BP's 2022 and
 * 2025 statutory results) alongside stronger years, rather than only
 * showing high-profit years. Revenue and net income figures are converted
 * to GBP from the original US-dollar figures (see file header note).
 */
export const companyProfitTimelines: Record<"shell" | "bp", CompanyFinancialYear[]> = {
  shell: [
    yr("FY2015", 198427, 1452, false, "Global oil price crash: OPEC did not cut production amid a US shale oversupply, and prices fell sharply through the year.", "https://www.sec.gov/Archives/edgar/data/1306965/000119312517028501/d341242dex992.htm", "2017-02-02"),
    yr("FY2016", 174935, 3426, false, "Oil prices remained depressed for most of the year before OPEC agreed output cuts in November 2016.", "https://www.sec.gov/Archives/edgar/data/1306965/000119312517028501/d341242dex992.htm", "2017-02-02"),
    yr("FY2017", 228547, 9718, false, "Gradual price recovery as OPEC+ production cuts took hold.", "https://www.sec.gov/Archives/edgar/data/1306965/000119312519023413/d674800dex992.htm", "2019-01-31"),
    yr("FY2018", 290855, 17488, false, "Prices strengthened through most of the year before a sharp Q4 2018 sell-off.", "https://www.sec.gov/Archives/edgar/data/1306965/000119312519023413/d674800dex992.htm", "2019-01-31"),
    yr("FY2019", 258277, 11864, false, "Relatively stable prices; weaker refining and trading conditions than 2018.", "https://www.sec.gov/Archives/edgar/data/1306965/000130696521000004/q42020exhibit992.htm", "2021-02-04"),
    yr("FY2020", 135208, -16236, true, "COVID-19 demand collapse. Oil prices fell sharply, and Shell recorded a net loss with large impairments.", "https://www.sec.gov/Archives/edgar/data/1306965/000130696521000004/q42020exhibit992.htm", "2021-02-04"),
    yr("FY2021", 195839, 15054, false, "Demand and prices recovered as COVID-19 restrictions eased through the year.", "https://www.sec.gov/Archives/edgar/data/1306965/000130696523000003/q42022exhibit992.htm", "2023-02-02"),
    yr("FY2022", 285564, 31685, false, "Russia's invasion of Ukraine in February 2022 drove a sharp rise in global energy prices; Shell's highest annual profit in this timeline.", "https://www.sec.gov/Archives/edgar/data/1306965/000130696523000003/q42022exhibit992.htm", "2023-02-02"),
    yr("FY2023", 237115, 14499, false, "Prices normalised down from the 2022 peak.", "https://www.sec.gov/Archives/edgar/data/1306965/000130696524000006/q42023exhibit992.htm", "2024-02-01"),
    yr("FY2024", 212920, 12053, false, "Continued softening of oil and gas prices through the year.", "https://www.sec.gov/Archives/edgar/data/1306965/000162828026005600/q42025exhibit992.htm", "2026-02-05"),
    yr("FY2025", 199870, 13359, false, "Shell's own reporting shows average Brent crude prices falling further year-on-year.", "https://www.sec.gov/Archives/edgar/data/1306965/000162828026005600/q42025exhibit992.htm", "2026-02-05"),
  ],
  bp: [
    yr("FY2015", 169268, -4854, true, "Global oil price crash weighed heavily on BP's results.", "https://www.sec.gov/Archives/edgar/data/0000313807/000119312517032625/d344237d6k.htm", "2017-02-07"),
    yr("FY2016", 139748, 86, false, "Oil prices remained near the bottom of the downturn for most of the year.", "https://www.sec.gov/Archives/edgar/data/0000313807/000119312517032625/d344237d6k.htm", "2017-02-07"),
    yr("FY2017", 183166, 2538, false, "Gradual recovery as OPEC+ cuts took hold.", "https://www.sec.gov/Archives/edgar/data/313807/000162828019000923/a31122018bp6kq4.htm", "2019-02-05"),
    yr("FY2018", 227468, 7027, false, "Stronger prices through most of the year.", "https://www.sec.gov/Archives/edgar/data/313807/000162828019000923/a31122018bp6kq4.htm", "2019-02-05"),
    yr("FY2019", 211650, 3015, false, "Relatively stable prices.", "https://www.sec.gov/Archives/edgar/data/313807/000162828021001266/a31122020bp6kq4.htm", "2021-02-02"),
    yr("FY2020", 137422, -15206, true, "COVID-19 demand collapse. BP recorded a large net loss with significant impairments.", "https://www.sec.gov/Archives/edgar/data/313807/000162828021001266/a31122020bp6kq4.htm", "2021-02-02"),
    yr("FY2021", 122965, 5665, false, "Demand and prices recovered through the year.", "https://www.sec.gov/Archives/edgar/data/313807/000031380723000002/a31122022bp6kq4.htm", "2023-02-07"),
    yr("FY2022", 186393, -1863, true, "Statutory loss driven by a ~£18bn charge for exiting BP's stake in Rosneft following Russia's invasion of Ukraine, even though underlying replacement cost profit was a record £20,712m the same year.", "https://www.sec.gov/Archives/edgar/data/313807/000031380723000002/a31122022bp6kq4.htm", "2023-02-07"),
    yr("FY2023", 159539, 11412, false, "Prices normalised down from the 2022 peak.", "https://www.sec.gov/Archives/edgar/data/313807/000031380724000003/a31122023bp6kq4.htm", "2024-02-05"),
    yr("FY2024", 145757, 285, false, "Weaker refining margins and lower prices reduced statutory profit close to zero.", "https://www.sec.gov/Archives/edgar/data/313807/000031380726000002/a31122025bp6kq4.htm", "2026-02-09"),
    yr("FY2025", 144199, 41, false, "Statutory profit remained close to zero despite underlying replacement cost profit of £5,606m, again showing the gap between the two measures.", "https://www.sec.gov/Archives/edgar/data/313807/000031380726000002/a31122025bp6kq4.htm", "2026-02-09"),
  ],
};
