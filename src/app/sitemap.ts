import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const routes = [
  "",
  "/save-fuel-money",
  "/live-fuel-prices",
  "/fuel-prices-through-time",
  "/fuel-prices",
  "/why-is-fuel-expensive",
  "/why-prices-rising",
  "/fuel-vs-electric",
  "/follow-the-money",
  "/fuel-duty-and-tax",
  "/cost-of-living",
  "/europe-compared",
  "/government-accountability",
  "/our-demands",
  "/make-a-change",
  "/ask-your-mp",
  "/petition",
  "/resources",
  "/sources",
  "/about",
  "/contact",
  "/accessibility",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/fuel-prices" || route === "/live-fuel-prices" ? "daily" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
