import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { FooterGroup } from "@/components/layout/FooterGroup";
import { ContactDetails } from "@/components/ui/ContactDetails";
import { siteConfig } from "@/lib/site-config";

// A compact sitemap: every main page once, in three groups. (The header menus carry the same pages plus the section anchors.)
const groups: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Fuel prices & data",
    links: [
      { label: "Live fuel prices", href: "/live-fuel-prices" },
      { label: "Price data & chart", href: "/fuel-prices" },
      { label: "Prices through time", href: "/fuel-prices-through-time" },
      { label: "Europe compared", href: "/europe-compared" },
      { label: "Why fuel costs so much", href: "/why-is-fuel-expensive" },
      { label: "Follow the money", href: "/follow-the-money" },
      { label: "Fuel Duty & VAT", href: "/fuel-duty-and-tax" },
      { label: "Cost of living", href: "/cost-of-living" },
      { label: "Save fuel & money", href: "/save-fuel-money" },
      { label: "Fuel vs electric", href: "/fuel-vs-electric" },
    ],
  },
  {
    title: "Take part",
    links: [
      { label: "Take Action", href: "/take-action" },
      { label: "Planned Protest", href: "/planned-protest" },
      { label: "Have your say", href: "/have-your-say" },
      { label: "FCE petition", href: "/petition" },
      { label: "Ask your MP", href: "/ask-your-mp" },
      { label: "Our demands", href: "/our-demands" },
      { label: "Government accountability", href: "/government-accountability" },
      { label: "Make a change", href: "/make-a-change" },
    ],
  },
  {
    title: "Site",
    links: [
      { label: "News", href: "/news" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Sources & methodology", href: "/sources" },
      { label: "Resources & claim checker", href: "/resources" },
      { label: "Privacy", href: "/privacy" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

const linkClass = "inline-flex min-h-9 sm:min-h-8 items-center text-slate-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-petrol-300";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-navy-950 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_2.6fr] lg:gap-12">
          <div>
            <Link href="/" aria-label="FCE Fuel Crisis England — Home" className="inline-block rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-petrol-300">
              <Logo />
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">{siteConfig.independence.short}</p>
            <ContactDetails tone="dark" className="mt-3 text-sm" />
          </div>

          <nav aria-label="Footer" className="grid gap-0 sm:grid-cols-3 sm:gap-6">
            {groups.map((group) => (
              <FooterGroup key={group.title} title={group.title}>
                <ul className="flex flex-wrap gap-x-4 pb-3 text-sm sm:mt-2 sm:flex-col sm:pb-0">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </FooterGroup>
            ))}
          </nav>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-4 text-xs text-slate-400">
          <p>
            &copy; {year} Fuel Crisis England. Website created by{" "}
            <a href="https://www.hkcreativeweb.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-300 underline underline-offset-2 hover:text-white">
              HK Creative Web
            </a>
            .
          </p>
          <p className="max-w-3xl text-[11px] leading-relaxed sm:text-xs">
            Figures are labelled as live, historical, provisional or estimated, and link to their sources. Government statistics, third-party datasets and photographs remain the
            property of their owners and are used under their stated licences; see{" "}
            <Link href="/sources" className="underline underline-offset-2 hover:text-slate-300">
              Sources &amp; Methodology
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
