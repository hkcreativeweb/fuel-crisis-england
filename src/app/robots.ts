import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The admin screens and the JSON endpoints are not pages for search engines.
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
