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
    title: "Affordable & Predictable Fuel Duty",
    tagline: "Keep Fuel Duty Predictable Under Pressure",
    statement:
      "FCE is calling for a predictable and affordable Fuel Duty regime during periods of exceptional fuel-price pressure, with temporary reductions or freezes considered when pump prices rise sharply.",
    explanationPoints: [
      "Fuel Duty is a fixed government tax charged per litre. Because it is charged before VAT, a change in the rate mechanically changes the pre-tax price and, via VAT, the final pump price too.",
      "The current rate, previous rate, and any officially confirmed future changes are shown below, sourced directly to GOV.UK and legislation.gov.uk.",
      "A freeze or reduction would lower the mechanical floor under the pump price, but retailers are not obliged to pass through the full amount, and other cost components can move independently.",
      "We do not state that a reduction pays for itself. It has a direct cost to Fuel Duty revenue, shown in the simulator above, which would need to be weighed against public finances and other spending priorities.",
    ],
  },
  {
    id: "competition-margins",
    number: 2,
    title: "Stronger Competition & Margin Monitoring",
    tagline: "Strengthen Monitoring Where Margins Stay High",
    statement:
      "FCE is calling on Government to strengthen monitoring and enforcement where fuel margins remain persistently high, and to investigate evidence of anti-competitive behaviour or unjustified margin increases.",
    explanationPoints: [
      "A retailer margin is the difference between wholesale and pump price, covering real operating costs (staff, rent, card fees, business rates); it is not automatically profit.",
      "Wholesale costs, distribution costs, competition and margins can all move independently of one another, and a high margin in one period does not by itself prove unfair pricing.",
      "The CMA's own Enhanced Road Fuel Monitoring findings are shown below, not FCE's own claims.",
      "We are calling for stronger, ongoing scrutiny where the evidence shows a persistent pattern, not asserting wrongdoing without evidence.",
    ],
  },
  {
    id: "transparency",
    number: 3,
    title: "Better Fuel-Price Transparency",
    tagline: "Make Fuel Finder Work Well For Everyone",
    statement:
      "FCE is calling for comprehensive, timely and accessible reporting of forecourt prices so motorists can compare prices easily and identify significant local price differences.",
    explanationPoints: [
      "The Government's Fuel Finder open-data scheme, requiring forecourts to report price changes within 30 minutes, already exists and is a step in the right direction.",
      "Our demand is about effective implementation: accuracy, full coverage of forecourts, enforcement of reporting duties, and making the data genuinely accessible to ordinary motorists, not just developers.",
      "See our Live Fuel Prices page for more detail on how Fuel Finder currently works and where coverage gaps remain.",
    ],
  },
  {
    id: "crisis-oversight",
    number: 4,
    title: "Crisis Fuel-Market Oversight",
    tagline: "Track Prices Through the Whole Supply Chain",
    statement:
      "FCE is calling for stronger oversight during periods of exceptional fuel-price disruption, with transparent monitoring across the supply chain from crude oil to the pump.",
    explanationPoints: [
      "Fuel prices pass through several stages, each of which can move independently: crude oil, refining, wholesale, distribution, and the forecourt.",
      "During major disruption (for example a sharp oil-price spike), being able to see where in that chain a price change originates would help identify where further scrutiny may be warranted.",
      "This is a transparency and monitoring demand, not an accusation. We are not claiming any specific company has acted improperly.",
    ],
  },
  {
    id: "protect-essential-motorists",
    number: 5,
    title: "Protect Fuel-Dependent Households & Businesses",
    tagline: "Assess The Impact On People With No Alternative",
    statement:
      "FCE is calling on Government to assess the impact of fuel-price shocks and fuel taxation on households, workers and small businesses that depend heavily on road transport, particularly where practical alternatives are limited.",
    explanationPoints: [
      "Examples include small businesses, tradespeople, delivery drivers, taxi and private-hire drivers, care workers, rural workers, and small fleets.",
      "These groups are not affected identically. Mileage, vehicle running costs, and access to alternatives vary significantly, so any support would need proper targeting rather than a single blanket assumption.",
      "This is a call for an evidence-based assessment, not a specific costed scheme.",
    ],
  },
  {
    id: "transport-strategy",
    number: 6,
    title: "Long-Term Transport Affordability Strategy",
    tagline: "Plan Ahead As Vehicle Technology Changes",
    statement:
      "FCE is calling on Government to publish a long-term strategy for keeping transport affordable as the UK transitions towards lower-emission vehicles.",
    explanationPoints: [
      "As petrol and diesel consumption declines, Fuel Duty revenue (currently a multi-billion-pound annual receipt) will decline with it, raising a genuine long-term fiscal question.",
      "That question covers Fuel Duty, EV taxation, road taxation, and public charging costs, and how those pieces fit together for both government revenue and driver affordability.",
      "We are not proposing a specific replacement tax. We are asking for a published, predictable strategy so motorists and businesses can plan ahead, rather than piecemeal, short-notice changes.",
    ],
  },
];
