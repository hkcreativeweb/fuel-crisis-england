import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Per-page metadata with the page's own canonical URL and Open Graph /
 * Twitter tags. Next.js merges metadata shallowly, so without this every
 * page would inherit the root layout's openGraph (the homepage URL and
 * title), and a shared link to any page would preview as the homepage.
 * Paths are resolved against metadataBase (the real site domain).
 */
export function pageMetadata(path: string, { title, description }: { title: string; description: string }): Metadata {
  const fullTitle = `${title} | ${siteConfig.brandShort}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: siteConfig.fullBrand,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
