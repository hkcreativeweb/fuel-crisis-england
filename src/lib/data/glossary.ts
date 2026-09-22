/** Short, plain-English explanations for technical terms used around the site. */
export const glossary: Record<string, string> = {
  "fuel duty": "A fixed government tax charged on every litre of petrol or diesel, regardless of the fuel's price.",
  vat: "Value Added Tax, a 20% tax charged on the fuel price including Fuel Duty.",
  wholesale: "The price fuel is bought and sold at before it reaches a forecourt, set by international and UK wholesale markets.",
  "retailer margin": "The difference between the wholesale price and the pump price. It helps cover operating costs and may also include profit; it is not automatically the retailer's profit.",
  "crude oil": "The raw, unrefined oil that is later processed into petrol and diesel. Its price is set on international markets.",
  refining: "The industrial process that turns crude oil into usable fuels like petrol and diesel.",
  cpi: "Consumer Prices Index, the UK's main measure of inflation, tracking how the average cost of goods and services changes over time.",
  mpg: "Miles per gallon, a measure of how far a vehicle travels per UK gallon of fuel.",
};

/** Find a glossary entry whose key appears in a given label, case-insensitively. */
export function findGlossaryTerm(label: string): { term: string; definition: string } | null {
  const lower = label.toLowerCase();
  for (const [term, definition] of Object.entries(glossary)) {
    if (lower.includes(term)) return { term, definition };
  }
  return null;
}
