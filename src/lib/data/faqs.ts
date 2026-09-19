export type FaqCategory = "Prices" | "Tax" | "Savings" | "Civic Action" | "Petition" | "Corporate Profits";

export type Faq = {
  question: string;
  answer: string;
  category: FaqCategory;
};

export const faqs: Faq[] = [
  {
    category: "Prices",
    question: "Why are petrol prices rising?",
    answer:
      "Pump prices are shaped by several factors moving together: the global wholesale price of crude oil, refining costs, exchange rates (fuel is traded in US dollars), fuel duty, VAT, and distribution and retailer margins. See our Why Are Prices Rising? page for a full breakdown of each factor.",
  },
  {
    category: "Prices",
    question: "Why is diesel sometimes more expensive than petrol?",
    answer:
      "Diesel and petrol are refined differently and are traded as separate wholesale products, so their prices don't always move together. Diesel demand, refinery output, and international supply conditions can push diesel prices above or below petrol at different times. We do not publish a specific figure for the current petrol–diesel gap unless it has been verified against an official source.",
  },
  {
    category: "Tax",
    question: "How much tax is included in fuel prices?",
    answer:
      "UK fuel prices include fuel duty, a fixed amount charged per litre, plus VAT, which is charged as a percentage of the fuel price including duty. We only publish the current rates on our Fuel Duty & Tax page once we have verified them against an official source such as GOV.UK or HM Treasury.",
  },
  {
    category: "Prices",
    question: "Why do prices vary between fuel stations?",
    answer:
      "Individual fuel stations set their own retail prices based on their wholesale buying costs, location, local competition, operating costs, brand, and site-specific margins. This is why prices can differ noticeably between two stations only a short distance apart.",
  },
  {
    category: "Tax",
    question: "What is fuel duty?",
    answer:
      "Fuel duty is a tax charged by the UK Government on every litre of petrol and diesel sold, regardless of the fuel's price. Because it is fixed per litre rather than a percentage, its share of the total pump price changes as the underlying fuel price rises or falls.",
  },
  {
    category: "Savings",
    question: "How can I reduce my fuel costs?",
    answer:
      "Practical steps include maintaining correct tyre pressure, removing unnecessary weight, driving smoothly, combining short journeys, comparing prices at nearby stations, and using our fuel cost calculator to understand where your money goes. These are general, common-sense suggestions, not a substitute for professional financial advice.",
  },
  {
    category: "Civic Action",
    question: "How can I contact my MP?",
    answer:
      "Use the official UK Parliament 'Find your MP' tool to identify and contact your local Member of Parliament. Our Take Action page includes an editable message template you can adapt and send yourself — we never send messages on your behalf.",
  },
  {
    category: "Civic Action",
    question: "How can I join a lawful peaceful protest?",
    answer:
      "Any protest activity must be lawful and peaceful, and organisers and participants are responsible for checking current UK laws, informing the police where required, keeping emergency routes clear, and following all safety instructions. See our Take Action page for detailed guidance. We do not organise or promote unlawful activity of any kind.",
  },
  {
    category: "Petition",
    question: "How do I submit my fuel cost experience?",
    answer:
      "Visit the Petition / Share Your Experience page and complete the short form. You choose whether your experience can be displayed publicly, and all public submissions are anonymised and reviewed before appearing on the site.",
  },
];
