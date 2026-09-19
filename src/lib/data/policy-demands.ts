export type PolicyDemand = {
  id: string;
  number: number;
  title: string;
  tagline: string;
  statement: string;
  explanationPoints: string[];
};

export const policyDemands: PolicyDemand[] = [
  {
    id: "fuel-duty",
    number: 1,
    title: "Fuel Duty",
    tagline: "Keep Fuel Duty Under Review",
    statement:
      "FCE calls on Government to keep Fuel Duty under review and consider whether further relief is appropriate while motorists and businesses face high transport costs.",
    explanationPoints: [
      "Fuel Duty is a government-set tax — Government can change the rate through policy and legislation.",
      "The current rate, previous rate, and any officially confirmed future changes are shown below, sourced directly to GOV.UK and legislation.gov.uk.",
      "We do not state that any future tax reduction is guaranteed — only officially confirmed changes are shown as such.",
      "Any further relief would need to be weighed against public finances and other spending priorities.",
    ],
  },
  {
    id: "transparency",
    number: 2,
    title: "Transparency",
    tagline: "Show Motorists Where The Money Goes",
    statement: "People should be able to understand why they are paying the price they see at the pump.",
    explanationPoints: [
      "Clearer public information about wholesale prices.",
      "Clearer public information about pump prices.",
      "Clearer public information about Fuel Duty and VAT.",
      "Clearer public information about retailer margins where available.",
      "Clearer public information about regional price differences.",
      "Clearer public information about competition and supply-chain costs.",
    ],
  },
  {
    id: "competition-margins",
    number: 3,
    title: "Competition & Margins",
    tagline: "Investigate The Evidence",
    statement:
      "We do not automatically accuse retailers of profiteering. We call for appropriate scrutiny where evidence indicates unusual margins, spreads or pricing behaviour — and we link directly to what the regulator has actually found.",
    explanationPoints: [
      "The CMA's own Enhanced Road Fuel Monitoring findings are shown below, not our own claims.",
      "Wholesale prices, pump prices, retailer margins and retail spreads all matter, and each can move independently.",
      "High margins in a single period do not, by themselves, prove unfair pricing.",
      "Let the evidence speak for itself — see the real data below.",
    ],
  },
  {
    id: "exceptional-profits",
    number: 4,
    title: "Exceptional Profits",
    tagline: "Examine The Options",
    statement:
      "Where evidence indicates exceptional profits during a cost-of-living crisis, we call on Government and relevant regulators to examine whether any policy response is appropriate.",
    explanationPoints: [
      "Policymakers can consider mechanisms such as windfall taxes, excess-profit taxation, temporary targeted measures, or additional transparency requirements.",
      "No single mechanism is automatically correct — each carries trade-offs for investment, energy security, consumer prices and legal design.",
      "Any measure would need to distinguish UK-specific activity from global company profits.",
      "We do not present one mechanism as the obvious answer — see the full explainer below.",
    ],
  },
  {
    id: "protect-essential-motorists",
    number: 5,
    title: "Protect Essential Motorists",
    tagline: "Support People Who Depend On Their Vehicles",
    statement:
      "We ask Government to assess the impact of fuel costs on people who have limited practical alternatives to driving.",
    explanationPoints: [
      "Commuters without practical access to public transport.",
      "Delivery drivers and logistics operators.",
      "Taxi and private-hire drivers.",
      "Tradespeople travelling between jobs.",
      "Carers and home-visiting workers.",
      "Rural motorists, small businesses, and people who depend on a vehicle for work.",
      "No single support scheme is automatically correct — this requires proper policy design and a fair definition of who qualifies.",
    ],
  },
  {
    id: "publish-the-data",
    number: 6,
    title: "Publish The Data",
    tagline: "Show The Public The Numbers",
    statement: "FOLLOW THE MONEY. SHOW THE EVIDENCE.",
    explanationPoints: [
      "Transparent publication of Fuel Duty receipts.",
      "Relevant VAT information.",
      "Fuel-price and wholesale-price trends.",
      "Retailer margins where available.",
      "Competition evidence and regional price differences.",
      "Policy impact assessments.",
    ],
  },
];
