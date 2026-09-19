export type OfficialSource = {
  name: string;
  description: string;
  url: string;
  category: "Government" | "Statistics" | "Parliament" | "Regulator" | "Motoring organisation" | "Company";
};

/**
 * Links point to the official organisations' main websites rather than
 * specific articles, since no specific article or dataset URL has been
 * verified. Once a live news/data feed is connected, individual article
 * cards should link to the exact verified page.
 */
export const officialSources: OfficialSource[] = [
  {
    name: "GOV.UK",
    description:
      "Official UK Government website. Search GOV.UK for weekly road fuel price statistics and fuel duty policy publications.",
    url: "https://www.gov.uk/",
    category: "Government",
  },
  {
    name: "UK Parliament",
    description: "Debates, committee reports, and MP contact information relating to fuel costs and the cost of living.",
    url: "https://www.parliament.uk/",
    category: "Parliament",
  },
  {
    name: "Office for National Statistics (ONS)",
    description: "Independent statistics on inflation, transport costs, and household spending, including fuel.",
    url: "https://www.ons.gov.uk/",
    category: "Statistics",
  },
  {
    name: "Competition and Markets Authority (CMA)",
    description: "Monitors competition in the road fuel market and publishes reports on pump price fairness.",
    url: "https://www.gov.uk/government/organisations/competition-and-markets-authority",
    category: "Regulator",
  },
  {
    name: "Department for Energy Security and Net Zero (DESNZ)",
    description: "Government department responsible for UK energy policy, including oil and fuel markets.",
    url: "https://www.gov.uk/government/organisations/department-for-energy-security-and-net-zero",
    category: "Government",
  },
  {
    name: "RAC Fuel Watch",
    description: "Motoring organisation tracking average UK petrol and diesel prices.",
    url: "https://www.rac.co.uk/drive/advice/fuel-watch/",
    category: "Motoring organisation",
  },
  {
    name: "The AA — Fuel Price Reports",
    description: "Motoring organisation publishing regular fuel price data and analysis.",
    url: "https://www.theaa.com/driving-advice/driving-costs/fuel-prices",
    category: "Motoring organisation",
  },
];

export const findYourMPUrl = "https://members.parliament.uk/FindYourMP";
