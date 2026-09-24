import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { homeNavItem, navCategories, siteConfig } from "@/lib/site-config";

const moreLinks = [
  { label: "About FCE", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_2.4fr_1fr]">
          <div>
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Independent information and education about fuel prices, taxation, costs and the evidence
              behind them.
            </p>
            <p className="mt-2 max-w-sm text-sm font-semibold text-slate-300">
              Independent of political parties and government.
            </p>
            <Link href={homeNavItem.href} className="mt-4 inline-block text-sm font-semibold text-slate-400 hover:text-white">
              Home
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {navCategories.map((category) => (
              <div key={category.label}>
                <h3 className="text-sm font-bold uppercase tracking-wide text-white">{category.label}</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {category.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-slate-400 hover:text-white">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">More</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {moreLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {siteConfig.fullBrand}. An independent civic information campaign. Not affiliated with HM Government.</p>
          <p>Figures are labelled as live, historical, provisional or estimated. See our Sources page for citations.</p>
        </div>

        <div className="mt-6 border-t border-white/10 pt-6 text-xs text-slate-500">
          <p>
            Website created by{" "}
            <a href="https://www.hkcreativeweb.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-300 underline underline-offset-2 hover:text-white">
              HK Creative Web
            </a>
            . &copy; {new Date().getFullYear()} HK Creative Web. All rights reserved.
          </p>
          <p className="mt-2 max-w-3xl text-slate-500">
            Government statistics, third-party datasets, photographs and other third-party material remain
            the property of their respective owners and are used here under their stated licences, with
            attribution given throughout the site — see our{" "}
            <Link href="/sources" className="underline underline-offset-2 hover:text-slate-300">
              Sources &amp; Methodology
            </Link>{" "}
            page for full citations.
          </p>
        </div>
      </div>
    </footer>
  );
}
