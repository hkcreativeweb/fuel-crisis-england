export type ImageCredit = {
  id: string;
  src: string;
  alt: string;
  photographer: string;
  source: "Wikimedia Commons";
  sourceUrl: string;
  license: string;
  licenseUrl: string;
};

/**
 * Every real photograph used on the site, with full attribution. All
 * images are sourced from Wikimedia Commons (originally via Geograph.org.uk
 * or the photographer's own upload) under a Creative Commons licence that
 * permits reuse with attribution. No AI-generated or stock-agency imagery
 * is used.
 */
export const imageCredits: Record<string, ImageCredit> = {
  "forecourt-close": {
    id: "forecourt-close",
    src: "/images/forecourt-close.jpg",
    alt: "A Shell petrol station forecourt in Heddon-on-the-Wall, Northumberland, England, showing the price totem and fuel pumps under the canopy.",
    photographer: "Graham Robson",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Shell_filling_station,_Heddon-on-the-Wall_-_geograph.org.uk_-_5792090.jpg",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  },
  "hero-petrol-station": {
    id: "hero-petrol-station",
    src: "/images/hero-petrol-station.jpg",
    alt: "A Shell fuel price sign in England displaying 'Regular Unleaded 164.9' and 'Regular Diesel 182.9' pence per litre, photographed May 2026.",
    photographer: "Gerald England",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Petrol_up_but_diesel_down_-_geograph.org.uk_-_8342210.jpg",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  },
  refinery: {
    id: "refinery",
    src: "/images/refinery.jpg",
    alt: "INEOS Grangemouth oil refinery, Scotland, showing distillation towers, storage tanks and a flare stack against a daytime sky.",
    photographer: "kitmasterbloke",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:INEOS_Grangemouth_Refinery_(Formerly_BP).jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  "commute-traffic": {
    id: "commute-traffic",
    src: "/images/commute-traffic.jpg",
    alt: "Cars, a delivery van and a lorry queueing in traffic to leave the M25 motorway at Junction 20, Hertfordshire, England.",
    photographer: "Christopher Hilton",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Traffic_queueing_to_leave_the_anti-clockwise_M25_at_Junction_20_-_geograph.org.uk_-_7398525.jpg",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  },
  "vintage-pumps": {
    id: "vintage-pumps",
    src: "/images/vintage-pumps.jpg",
    alt: "Preserved vintage petrol pumps outside a village shop on Yapton Road, West Sussex, England.",
    photographer: "Simon Carey",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Old_Petrol_Pumps,_Yapton_-_geograph.org.uk_-_138591.jpg",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  },
  "garage-tyres": {
    id: "garage-tyres",
    src: "/images/garage-tyres.jpg",
    alt: "National Tyres and Autocare garage on Station Road, Strood, Kent, offering tyres, exhausts, batteries, brakes and suspension servicing.",
    photographer: "Stacey Harris",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:National_Tyres_and_Autocare,_Station_Road,_Strood_-_geograph.org.uk_-_1910150.jpg",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  },
  parliament: {
    id: "parliament",
    src: "/images/parliament.jpg",
    alt: "The Palace of Westminster (Houses of Parliament) viewed across the River Thames, London.",
    photographer: "Peter Broster",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Houses_of_Parliament_at_the_Palace_of_Westminster_(8062084328).jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
};
