import type { OfficialSource } from "@/lib/data/sources";

export const costOfLivingSources: OfficialSource[] = [
  {
    name: "GOV.UK",
    description: "National Minimum Wage and National Living Wage rates, and fuel duty and VAT policy.",
    url: "https://www.gov.uk/",
    category: "Government",
  },
  {
    name: "Low Pay Commission",
    description: "The independent body that recommends National Minimum Wage and National Living Wage rates to government.",
    url: "https://www.gov.uk/government/organisations/low-pay-commission",
    category: "Government",
  },
  {
    name: "Office for National Statistics (ONS)",
    description: "Median and average earnings, CPI/CPIH inflation, and household income distribution statistics.",
    url: "https://www.ons.gov.uk/",
    category: "Statistics",
  },
  {
    name: "Bank of England",
    description: "Bank Rate decisions and historical data, and analysis of borrowing and inflation.",
    url: "https://www.bankofengland.co.uk/",
    category: "Government",
  },
  {
    name: "Competition and Markets Authority (CMA)",
    description: "Road fuel market studies, including analysis of retailer margins and pump price components.",
    url: "https://www.gov.uk/government/organisations/competition-and-markets-authority",
    category: "Regulator",
  },
  {
    name: "UK Parliament",
    description: "Committee inquiries and reports on fuel prices, energy company profits, and the cost of living.",
    url: "https://www.parliament.uk/",
    category: "Parliament",
  },
  {
    name: "Shell plc — Investor Relations",
    description: "Official annual reports and financial results.",
    url: "https://www.shell.com/investors.html",
    category: "Company",
  },
  {
    name: "BP plc — Investor Relations",
    description: "Official annual reports and financial results.",
    url: "https://www.bp.com/en/global/corporate/investors.html",
    category: "Company",
  },
  {
    name: "RAC Fuel Watch",
    description: "Independent analysis of UK pump prices and their components.",
    url: "https://www.rac.co.uk/drive/advice/fuel-watch/",
    category: "Motoring organisation",
  },
  {
    name: "The AA — Fuel Price Reports",
    description: "Independent analysis of UK pump prices.",
    url: "https://www.theaa.com/driving-advice/driving-costs/fuel-prices",
    category: "Motoring organisation",
  },
];
