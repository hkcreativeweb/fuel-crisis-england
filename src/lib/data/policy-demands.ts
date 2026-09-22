export type DemandStatusTagType = "current-policy" | "fce-proposal" | "future-announced" | "evidence";

export type PolicyDemand = {
  id: string;
  number: number;
  title: string;
  description: string;
  supportingPoints: string[];
  /** A small status tag shown directly on the card, only when factually relevant (e.g. flagging a genuine policy proposal). */
  statusTag?: DemandStatusTagType;
  evidenceHref?: string;
  evidenceLabel?: string;
};

export const policyDemands: PolicyDemand[] = [
  {
    id: "fuel-duty",
    number: 1,
    title: "Keep Fuel Duty Affordable",
    description:
      "Maintain Fuel Duty at a level that recognises the financial pressure placed on motorists, households and businesses, particularly during periods of exceptionally high fuel prices.",
    supportingPoints: [
      "The current rate is 52.95 pence per litre, in force since 15 June 2026 and confirmed to run to 31 December 2026.",
      "Two future rate changes are already confirmed in legislation: 55.95p from 1 January 2027, then 57.95p from 1 March 2027 — these are officially confirmed, not FCE estimates.",
      "Fuel Duty is a fixed tax set by government, charged per litre before VAT is applied, so a rate change also has a knock-on effect via VAT.",
      "This does not claim Fuel Duty is the only reason fuel is expensive — wholesale costs, VAT and retailer margins also affect the pump price.",
    ],
    evidenceHref: "/fuel-duty-and-tax",
    evidenceLabel: "Fuel Duty history & evidence",
  },
  {
    id: "vat",
    number: 2,
    title: "Review VAT on Petrol & Diesel",
    description:
      "Assess whether VAT on road fuel could be reduced during periods of exceptional fuel-price pressure, and publish the estimated effect on motorists, households and businesses.",
    supportingPoints: [
      "VAT on road fuel is currently charged at the standard rate of 20%.",
      "VAT is charged on the fuel price including Fuel Duty, not on the pre-tax price alone — so a change to Fuel Duty also changes the amount of VAT charged.",
      "Illustrative example only: on a petrol pump price of 168.1p/litre, the 20% VAT charge is approximately 28.0p/litre (GOV.UK/CMA-sourced breakdown). A lower VAT rate would reduce this proportionally, but we are not publishing our own estimate of the exact pump-price effect.",
      "Reducing VAT is a policy choice with a direct cost to government revenue — this is a question for government to assess and answer, not a claim that it should definitely happen.",
    ],
    evidenceHref: "/follow-the-money#signature",
    evidenceLabel: "How VAT and Fuel Duty stack up",
  },
  {
    id: "competition-margins",
    number: 3,
    title: "Strengthen Competition",
    description: "Ensure that the fuel market remains competitive and that motorists can benefit when wholesale costs fall.",
    supportingPoints: [
      "The CMA already monitors UK road fuel margins through its Enhanced Road Fuel Monitoring programme — this is existing, independent regulatory oversight, not something FCE is proposing from scratch.",
      "Competition between fuel retailers is one of the mechanisms that can pass falling wholesale costs on to motorists at the pump.",
      "Monitoring margins and price movements over time helps show whether that pass-through is happening, without assuming the answer in advance.",
      "We do not accuse any individual company or the industry generally of wrongdoing — the CMA's own published findings are the evidence base, not FCE's opinion.",
    ],
    evidenceHref: "/why-is-fuel-expensive#competition",
    evidenceLabel: "CMA margin monitoring data",
  },
  {
    id: "transparency",
    number: 4,
    title: "Make Fuel Pricing Transparent",
    description: "Give motorists clearer information about how changes in wholesale costs, taxes and retailer margins affect the price they pay at the pump.",
    supportingPoints: ["Wholesale costs", "Fuel Duty", "VAT", "Retailer margins", "Regional and local price differences", "Pump-price movements over time"],
    evidenceHref: "/why-is-fuel-expensive",
    evidenceLabel: "Why is fuel so expensive?",
  },
  {
    id: "crisis-oversight",
    number: 5,
    title: "Protect Against Extreme Fuel-Price Shocks",
    description: "Establish a clear mechanism for reviewing fuel taxation and other government measures when pump prices rise exceptionally quickly or reach an objectively defined level.",
    supportingPoints: [
      "This is a policy proposal from FCE. No such review mechanism currently exists in government policy — we are not claiming otherwise.",
      "The mechanism could use predefined criteria, for example: a significant percentage price increase over a defined period, or pump prices reaching a defined threshold.",
      "Any specific percentage or price threshold shown on this site is an illustrative example only, not a proposed official figure.",
      "The aim is a transparent, predictable trigger for review, rather than ad-hoc decisions made without published criteria.",
    ],
    statusTag: "fce-proposal",
    evidenceHref: "/why-is-fuel-expensive#refining",
    evidenceLabel: "How prices move through the supply chain",
  },
  {
    id: "protect-essential-motorists",
    number: 6,
    title: "Recognise High Fuel Costs for Working Drivers",
    description: "Review the impact of fuel costs on people and businesses that depend heavily on road travel for their work.",
    supportingPoints: [
      "Delivery drivers",
      "Taxi and private-hire drivers",
      "Tradespeople",
      "Small businesses",
      "Carers and other mobile workers",
      "Commuters, where practical alternatives are limited",
    ],
    evidenceHref: "/cost-of-living",
    evidenceLabel: "Cost-of-living impact by group",
  },
  {
    id: "transport-strategy",
    number: 7,
    title: "Publish the Evidence",
    description: "Require clear, accessible impact assessments before major changes to Fuel Duty, VAT or other policies affecting road-fuel costs.",
    supportingPoints: [
      "Any such assessment should, where appropriate, explain potential effects on motorists, households, businesses, transport costs and government revenue.",
      "This reflects FCE's existing principle across the whole site: check the evidence, ask the questions.",
      "We are asking for published methodology and figures, not for a specific policy outcome.",
    ],
    evidenceHref: "/sources",
    evidenceLabel: "Sources & methodology",
  },
];
