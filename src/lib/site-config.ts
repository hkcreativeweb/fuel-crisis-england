export const siteConfig = {
  brandShort: "FCE",
  name: "Fuel Crisis England",
  fullBrand: "FCE — Fuel Crisis England",
  tagline: "Save Fuel. Save Money. Follow The Money. Demand Accountability.",
  description:
    "Fuel Crisis England provides practical ways to save fuel and money, explains fuel prices and taxation, follows energy-company profits and helps people make their voices heard lawfully.",
  supportingStatement:
    "Fuel Crisis England is an independent public-interest information and accountability platform focused on fuel prices, fuel taxation, energy-company profits, household costs and the wider impact of the fuel crisis.",
  url: "https://www.fuelcrisisengland.example",
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

export const homeNavItem: NavItem = { label: "Home", href: "/" };

/**
 * The main navbar's structure: a handful of short category labels, each
 * revealing a dropdown of the real pages and page sections underneath.
 * This is deliberately a taxonomy, not a flat list — every page that used
 * to be a top-level link now lives inside the category it belongs to, so
 * the navbar itself only ever shows six short words.
 */
export const navCategories: NavCategory[] = [
  {
    label: "Prices",
    href: "/live-fuel-prices",
    items: [
      { label: "Live Fuel Prices", href: "/live-fuel-prices", description: "Current, latest-available fuel-price information" },
      { label: "Fuel Prices Through Time", href: "/fuel-prices-through-time", description: "Historical fuel-price data, year by year" },
      { label: "Compare Prices", href: "/fuel-prices-through-time#compare", description: "Compare a historical year directly against today" },
      { label: "Fuel Price Data", href: "/fuel-prices", description: "A clean dashboard of current and historical prices" },
    ],
  },
  {
    label: "Why?",
    href: "/why-is-fuel-expensive",
    items: [
      { label: "Why Is Fuel So Expensive?", href: "/why-is-fuel-expensive", description: "The full investigation, from crude oil to the pump" },
      { label: "Crude Oil & Refining", href: "/why-is-fuel-expensive#refining", description: "Why crude oil isn't the same as petrol" },
      { label: "Wholesale vs Pump Prices", href: "/why-is-fuel-expensive#tools", description: "How closely pump prices track wholesale costs" },
      { label: "Tax & VAT", href: "/fuel-duty-and-tax", description: "Fuel Duty and VAT, explained" },
      { label: "Competition & Retail Margins", href: "/why-is-fuel-expensive#competition", description: "What the CMA's own monitoring shows" },
    ],
  },
  {
    label: "Money",
    href: "/follow-the-money",
    items: [
      { label: "Follow the Money", href: "/follow-the-money", description: "The full money-trail investigation" },
      { label: "Where Does Your Money Go?", href: "/follow-the-money#signature", description: "Follow a £50 fuel purchase through the system" },
      { label: "Company Data", href: "/follow-the-money#corporate-profits", description: "Verified financial results for major energy companies" },
      { label: "Government Fuel-Tax Revenue", href: "/follow-the-money#government-collects", description: "What government actually collects" },
      { label: "Fuel Duty & VAT", href: "/fuel-duty-and-tax", description: "The two taxes built into every litre" },
    ],
  },
  {
    label: "Impact",
    href: "/cost-of-living",
    items: [
      { label: "Cost-of-Living Impact", href: "/cost-of-living", description: "How fuel prices affect households and businesses" },
      { label: "What £20 Buys", href: "/follow-the-money#what-did-20-buy", description: "A historical comparison of purchasing power" },
      { label: "One Hour of Work", href: "/follow-the-money#wage-vs-pump", description: "Wages measured against the pump price" },
      { label: "100-Mile Journey", href: "/why-is-fuel-expensive#tools", description: "What a typical journey costs today" },
      { label: "Fuel Affordability", href: "/cost-of-living#calculator", description: "Work out your own fuel costs" },
    ],
  },
  {
    label: "Take Action",
    href: "/our-demands",
    items: [
      { label: "Our Demands", href: "/our-demands", description: "What we're asking Government to do" },
      { label: "Ask Your MP", href: "/ask-your-mp", description: "A copyable, evidence-based email template" },
      { label: "Government Accountability", href: "/government-accountability", description: "Ask for evidence, lawfully and respectfully" },
      { label: "Save Fuel & Money", href: "/save-fuel-money", description: "Practical ways to cut your own costs" },
      { label: "Make a Change", href: "/make-a-change", description: "Lawful, peaceful ways to make your voice heard" },
      { label: "Sources & Evidence", href: "/sources", description: "Where every figure on this site comes from" },
    ],
  },
];

/** The single primary call-to-action shown distinctly on the right of the navbar. */
export const primaryCtaHref = "/our-demands";
export const primaryCtaLabel = "Our Demands";

export const secondaryNav: NavItem[] = [
  { label: "Fuel Prices (dashboard)", href: "/fuel-prices" },
  { label: "Why Prices Are Rising", href: "/why-prices-rising" },
  { label: "Government Accountability", href: "/government-accountability" },
  { label: "Our Demands", href: "/our-demands" },
  { label: "Sources", href: "/sources" },
  { label: "Resources & FAQs", href: "/resources" },
  { label: "About FCE", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Fuel Duty & Tax", href: "/fuel-duty-and-tax" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms and Conditions", href: "/terms" },
];

export const petitionHref = "/petition";
