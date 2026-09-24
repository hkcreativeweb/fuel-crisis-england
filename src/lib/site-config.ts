export const siteConfig = {
  brandShort: "FCE",
  name: "Fuel Crisis England",
  fullBrand: "FCE: Fuel Crisis England",
  tagline: "Save Fuel. Save Money. Follow The Money. Demand Accountability.",
  description:
    "Fuel Crisis England provides practical ways to save fuel and money, explains fuel prices and taxation, follows energy-company profits and helps people make their voices heard lawfully.",
  supportingStatement:
    "Fuel Crisis England is an independent public-interest information and accountability platform focused on fuel prices, fuel taxation, energy-company profits, household costs and the wider impact of the fuel crisis.",
  url: "https://www.fuelcrisisengland.co.uk",
  locale: "en-GB",
  petitionTarget: 25000,
  hashtag: "#FuelCrisisEngland",
  shortHashtag: "#FCE",
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

/** A short top-level label ("Prices", "Why?") with a dropdown of the actual pages/sections it covers. */
export type NavCategory = {
  label: string;
  /** Where the top-level word itself links/navigates to (also used for active-state matching). */
  href: string;
  items: NavItem[];
};

/**
 * The main navigation: six topic categories, each opening a short list of
 * the pages and page sections underneath. Every destination appears once.
 * The FCE logo links to the homepage, so there is no separate "Home" item.
 * `align: "right"` opens a dropdown towards the left, for the last items in
 * the bar, so the panel never runs off the right edge of the screen.
 */
export const navCategories: (NavCategory & { align?: "left" | "right" })[] = [
  {
    label: "Prices",
    href: "/live-fuel-prices",
    items: [
      { label: "Live Fuel Prices", href: "/live-fuel-prices", description: "This week's UK prices, tax rates and what changed" },
      { label: "Fuel Prices", href: "/fuel-prices", description: "UK averages, a 12-month chart and a data download" },
      { label: "Fuel Prices Through Time", href: "/fuel-prices-through-time", description: "Prices, wages and tax compared year by year" },
      { label: "Europe Compared", href: "/europe-compared", description: "UK prices and taxes against the 27 EU countries" },
    ],
  },
  {
    label: "Why fuel costs so much",
    href: "/why-is-fuel-expensive",
    items: [
      { label: "Why Is Fuel So Expensive?", href: "/why-is-fuel-expensive", description: "Each part of the pump price, from crude oil to VAT" },
      { label: "Why Prices Are Rising", href: "/why-prices-rising", description: "The main factors behind recent price changes" },
      { label: "Follow One Litre", href: "/why-is-fuel-expensive#one-litre", description: "The journey of a litre, stage by stage" },
      { label: "Crude Oil & Refining", href: "/why-is-fuel-expensive#refining", description: "Why crude oil isn't the same as petrol" },
      { label: "Wholesale vs Pump Prices", href: "/why-is-fuel-expensive#falls-slower", description: "Do pump prices rise faster than they fall?" },
      { label: "Competition & Retail Margins", href: "/why-is-fuel-expensive#competition", description: "What the CMA's monitoring shows" },
    ],
  },
  {
    label: "Money",
    href: "/follow-the-money",
    items: [
      { label: "Follow the Money", href: "/follow-the-money", description: "Where the money from fuel sales goes" },
      { label: "Where Does Your £50 Go?", href: "/follow-the-money#signature", description: "One fuel purchase, split into its parts" },
      { label: "Company Data", href: "/follow-the-money#corporate-profits", description: "Reported results for major energy companies" },
      { label: "Government Fuel-Tax Revenue", href: "/follow-the-money#government-collects", description: "Fuel Duty and VAT receipts, from HMRC" },
      { label: "Fuel Duty & VAT", href: "/fuel-duty-and-tax", description: "The two taxes on every litre, and their history" },
    ],
  },
  {
    label: "Impact",
    href: "/cost-of-living",
    items: [
      { label: "Cost-of-Living Impact", href: "/cost-of-living", description: "How fuel costs affect different households and work" },
      { label: "What £20 Buys", href: "/fuel-prices-through-time#what-20-buys", description: "The same £20 at the pump in different years" },
      { label: "One Hour of Work", href: "/fuel-prices-through-time#wage-vs-pump", description: "Litres of fuel from an hour's minimum wage" },
      { label: "100-Mile Journey", href: "/why-is-fuel-expensive#tools", description: "What a 100-mile trip costs at today's price" },
    ],
  },
  {
    label: "Save money",
    href: "/save-fuel-money",
    align: "right",
    items: [
      { label: "Save Fuel & Money", href: "/save-fuel-money", description: "Driving, maintenance and buying tips, with the evidence" },
      { label: "Fuel Cost Calculator", href: "/cost-of-living#calculator", description: "Your weekly, monthly and yearly fuel cost" },
      { label: "Fuel vs Electric", href: "/fuel-vs-electric", description: "Compare running costs using your own numbers" },
    ],
  },
  {
    label: "Take part",
    href: "/have-your-say",
    align: "right",
    items: [
      { label: "Have Your Say", href: "/have-your-say", description: "Read and post moderated comments" },
      { label: "Petition", href: "/petition", description: "Sign FCE's petition and share your experience" },
      { label: "Ask Your MP", href: "/ask-your-mp", description: "Draft a message to your MP using official figures" },
      { label: "Our Demands (campaign)", href: "/our-demands", description: "FCE campaign proposals on fuel affordability and policy" },
      { label: "Government Accountability", href: "/government-accountability", description: "How to ask for evidence and follow up" },
      { label: "Make a Change", href: "/make-a-change", description: "Lawful, peaceful ways to take part" },
    ],
  },
];

/** Site-wide reference pages: shown in the mobile menu and the footer rather than the main bar. */
export const utilityNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Sources & methodology", href: "/sources" },
  { label: "Resources & claim checker", href: "/resources" },
  { label: "Contact", href: "/contact" },
];
