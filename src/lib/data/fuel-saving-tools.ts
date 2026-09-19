export type ToolCategory = "Fuel-price comparison" | "Route planning" | "EV charging comparison" | "Fuel tracking";

export type FuelSavingTool = {
  category: ToolCategory;
  name: string;
  whatItDoes: string;
  pricing: "Free" | "Free with paid options" | "Paid";
  platforms: string;
  url: string;
  privacyNote: string;
};

export const fuelSavingTools: FuelSavingTool[] = [
  {
    category: "Fuel-price comparison",
    name: "PetrolPrices",
    whatItDoes: "Crowd-sourced and aggregated UK fuel price comparison by postcode or location.",
    pricing: "Free with paid options",
    platforms: "Web, iOS, Android",
    url: "https://www.petrolprices.com/",
    privacyNote: "May request location access to find nearby stations — check the app's own privacy policy before granting permissions.",
  },
  {
    category: "Fuel-price comparison",
    name: "RAC Fuel Watch",
    whatItDoes: "Published average UK petrol and diesel prices and regional breakdowns.",
    pricing: "Free",
    platforms: "Web",
    url: "https://www.rac.co.uk/drive/advice/fuel-watch/",
    privacyNote: "A standard content website — no account required to view prices.",
  },
  {
    category: "Fuel-price comparison",
    name: "Supermarket fuel-price pages",
    whatItDoes: "Major supermarkets with forecourts (e.g. Tesco, Asda, Sainsbury's, Morrisons) often publish their own current fuel prices online.",
    pricing: "Free",
    platforms: "Web",
    url: "https://www.google.com/search?q=supermarket+fuel+prices+uk",
    privacyNote: "Check each retailer's own site directly for current information.",
  },
  {
    category: "Route planning",
    name: "Google Maps",
    whatItDoes: "Route planning and live traffic information, which can help you avoid congestion and unnecessary mileage.",
    pricing: "Free",
    platforms: "Web, iOS, Android",
    url: "https://maps.google.com/",
    privacyNote: "Uses location data for navigation — review Google's privacy settings for location history.",
  },
  {
    category: "Route planning",
    name: "Waze",
    whatItDoes: "Community-based live traffic and routing app, often used to avoid delays and roadworks.",
    pricing: "Free",
    platforms: "iOS, Android",
    url: "https://www.waze.com/",
    privacyNote: "Relies on continuous location sharing while in use — review the app's privacy settings.",
  },
  {
    category: "Route planning",
    name: "AA Route Planner",
    whatItDoes: "Route planning with distance and estimated journey time, published by the AA.",
    pricing: "Free",
    platforms: "Web",
    url: "https://www.theaa.com/route-planner/",
    privacyNote: "A standard web tool — check the AA's own privacy policy for details.",
  },
  {
    category: "EV charging comparison",
    name: "Zapmap",
    whatItDoes: "A map and directory of UK EV charging points, including live availability where reported.",
    pricing: "Free with paid options",
    platforms: "Web, iOS, Android",
    url: "https://www.zap-map.com/",
    privacyNote: "May request location access to find nearby chargers.",
  },
  {
    category: "Fuel tracking",
    name: "Fuelio",
    whatItDoes: "A personal app for logging fuel fill-ups, costs, and calculating your own real-world fuel economy over time.",
    pricing: "Free",
    platforms: "Android",
    url: "https://www.fuelio.net/",
    privacyNote: "Fuel and mileage data is typically stored on your device unless you enable cloud backup — check the app's settings.",
  },
  {
    category: "Fuel tracking",
    name: "Drivvo",
    whatItDoes: "A vehicle expense and fuel-tracking app covering fill-ups, running costs, and maintenance reminders.",
    pricing: "Free with paid options",
    platforms: "iOS, Android",
    url: "https://www.drivvo.com/",
    privacyNote: "Review the app's own privacy policy for what data is stored and whether it syncs to the cloud.",
  },
  {
    category: "Fuel tracking",
    name: "A simple spreadsheet or notebook",
    whatItDoes: "Manually logging your mileage, litres purchased, and cost at each fill-up lets you calculate your own real-world MPG without any app at all.",
    pricing: "Free",
    platforms: "Any device",
    url: "#",
    privacyNote: "Entirely under your own control — nothing is shared unless you choose to share it.",
  },
];
