export type LitreJourneyStep = {
  number: number;
  title: string;
  category: "market" | "tax";
  detail: string;
};

export const litreJourneySteps: LitreJourneyStep[] = [
  {
    number: 1,
    title: "Crude oil",
    category: "market",
    detail: "The underlying commodity cost. Crude oil is traded internationally, and its price can change significantly based on global supply and demand.",
  },
  {
    number: 2,
    title: "Exchange rates",
    category: "market",
    detail: "Oil is generally traded internationally in US dollars. Changes in the pound-to-dollar exchange rate can affect the UK's cost of imported crude and refined products, independent of the dollar price itself.",
  },
  {
    number: 3,
    title: "Refining",
    category: "market",
    detail: "Crude oil has to be processed into usable fuels. Refining costs and margins can change depending on global supply and demand, refinery capacity, maintenance, and other market conditions.",
  },
  {
    number: 4,
    title: "Wholesale fuel",
    category: "market",
    detail: "Fuel is bought and sold through wholesale markets before reaching individual forecourts. Wholesale prices can move independently of the retail price and may change at different speeds.",
  },
  {
    number: 5,
    title: "Distribution",
    category: "market",
    detail: "Transportation, storage, terminals, logistics, and distribution infrastructure all add cost between the refinery and the forecourt.",
  },
  {
    number: 6,
    title: "Retailer / forecourt",
    category: "market",
    detail: "Filling stations have operating costs including staff, electricity, rent or property costs, maintenance, card-payment costs, business rates, insurance, and equipment. Where reliable data exists, we show estimated retailer margins — the difference between wholesale and pump price is not automatically pure profit.",
  },
  {
    number: 7,
    title: "Fuel Duty",
    category: "tax",
    detail: "A fixed government tax per litre, set by policy — distinct from any company cost in the chain above.",
  },
  {
    number: 8,
    title: "VAT",
    category: "tax",
    detail: "Charged on the fuel transaction, including the duty already added. The amount of VAT paid changes as the underlying taxable price changes.",
  },
];
