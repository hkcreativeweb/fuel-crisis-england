export type PriceFactor = {
  slug: string;
  title: string;
  summary: string;
  detail: string;
};

export const priceFactors: PriceFactor[] = [
  {
    slug: "crude-oil",
    title: "Global crude oil prices",
    summary: "Crude oil is the raw material for petrol and diesel, so its price is the starting point for what you pay at the pump.",
    detail:
      "Petrol and diesel are refined from crude oil, which is bought and sold on global markets in US dollars. When the global price of crude oil rises — because of production decisions, geopolitical tension, or changes in demand — the wholesale cost of the fuel refined from it tends to rise too, and that cost eventually feeds through to pump prices. This is a well-established, verified mechanism in energy markets, though the exact scale and timing of the pass-through can vary.",
  },
  {
    slug: "supply-and-demand",
    title: "Supply and demand",
    summary: "When global supply is tight relative to demand, prices tend to rise. When supply is plentiful, prices tend to ease.",
    detail:
      "Oil-producing nations and alliances can adjust production levels, which affects how much crude is available on the world market. At the same time, global demand for fuel changes with economic activity, travel patterns, and the season. When demand outpaces supply, prices generally rise; when supply outpaces demand, prices generally fall. This is standard economic behaviour in commodity markets, not specific to fuel.",
  },
  {
    slug: "refining-costs",
    title: "Refining costs",
    summary: "Turning crude oil into usable petrol and diesel costs money, and that cost is passed through to the price you pay.",
    detail:
      "Refineries convert crude oil into different fuel products through processes that require energy, specialist equipment, and maintenance. Refining capacity, plant outages, and the cost of running refineries all influence the wholesale price of the finished fuel, separately from the underlying crude oil price.",
  },
  {
    slug: "wholesale-prices",
    title: "Wholesale fuel prices",
    summary: "The price a fuel retailer pays before it reaches the forecourt is different from — and usually lower than — the price you pay at the pump.",
    detail:
      "Wholesale fuel prices reflect the cost of crude oil, refining, and initial distribution before a litre of fuel reaches a filling station. Retail pump prices are built on top of the wholesale price, with duty, VAT, transport, and retailer margin added. Wholesale and retail prices don't always move in lockstep, and there can be a delay before wholesale changes are reflected at the pump.",
  },
  {
    slug: "exchange-rates",
    title: "Exchange rates",
    summary: "Oil is traded in US dollars, so movements in the pound-to-dollar exchange rate affect what UK importers pay.",
    detail:
      "Because crude oil is priced internationally in US dollars, a weaker pound makes imported oil and refined fuel more expensive for UK buyers, even if the dollar price of oil hasn't changed. A stronger pound has the opposite effect. Exchange rate movements are an additional, independent factor layered on top of the underlying oil price.",
  },
  {
    slug: "fuel-duty",
    title: "Fuel duty",
    summary: "A fixed tax charged by the UK Government on every litre of fuel sold, regardless of the fuel's price.",
    detail:
      "Fuel duty is set by the UK Government as a flat rate per litre. Because it's fixed rather than a percentage, its proportion of the total pump price shrinks when fuel prices are high and grows when fuel prices are low. See our Fuel Duty & Tax page for the current verified rate once it has been confirmed against an official source.",
  },
  {
    slug: "vat",
    title: "VAT",
    summary: "Value Added Tax is charged as a percentage of the total fuel price, including duty.",
    detail:
      "Unlike fuel duty, VAT is a percentage-based tax, so the amount of VAT you pay rises and falls in line with the underlying price of the fuel plus duty. This means VAT is charged on top of fuel duty, not the other way around. See our Fuel Duty & Tax page for the current verified rate.",
  },
  {
    slug: "distribution-and-retail",
    title: "Distribution and retail costs",
    summary: "Transporting, storing, and selling fuel all cost money, and forecourt operators need to cover their own running costs.",
    detail:
      "After fuel leaves the refinery, it must be transported and stored before reaching a filling station. Retailers also have their own operating costs — staff, business rates, card processing fees, site maintenance — which are reflected in their margin on each litre sold.",
  },
  {
    slug: "competition",
    title: "Competition",
    summary: "Prices can differ noticeably between fuel stations depending on local competition and brand.",
    detail:
      "Fuel retailers set their own prices, influenced by nearby competitors, local demand, brand positioning, and site running costs. This is why you can sometimes see a meaningful price difference between two stations only a short drive apart. The Competition and Markets Authority monitors the road fuel market for signs of unfair pricing practices.",
  },
  {
    slug: "global-events",
    title: "Global events",
    summary: "Conflicts, sanctions, natural disasters, and major policy decisions can all disrupt oil supply and shift prices quickly.",
    detail:
      "Because oil is a globally traded commodity, events anywhere in the world that affect supply — armed conflict, sanctions on producing nations, extreme weather affecting infrastructure, or coordinated production changes — can move prices for everyone, including UK drivers, often within days.",
  },
];
