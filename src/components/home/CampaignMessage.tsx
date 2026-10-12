import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ContentTag } from "@/components/ui/ContentTag";
import { PetitionCountLine } from "@/components/petition/PetitionCountLine";

const positions: { text: string; href: string; link: string }[] = [
  { text: "The government has a responsibility to consider what fuel costs mean for households, workers and businesses.", href: "/our-demands", link: "Our demands" },
  { text: "Fuel Duty and VAT are government policy, and both are part of the price motorists pay.", href: "/fuel-duty-and-tax", link: "Fuel Duty and VAT" },
  { text: "International oil prices, refining and distribution costs and retailer pricing also affect the pump price.", href: "/why-is-fuel-expensive", link: "Why fuel costs what it does" },
  { text: "Better price information is useful, but transparency alone does not make fuel affordable.", href: "/live-fuel-prices#fuel-finder", link: "Google Maps and Waze" },
  { text: "We are calling for further practical action, not less attention to the problem.", href: "/our-demands", link: "What we are asking for" },
];

/** FCE's central campaign message, placed straight after the hero. Campaign opinion, labelled as such, with links to the facts behind it. */
export function CampaignMessage() {
  return (
    <section aria-labelledby="campaign-message" className="border-b border-slate-200 bg-white py-12 sm:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <div>
            <ContentTag type="campaign-commentary" />
            <h2 id="campaign-message" className="mt-3 border-l-[6px] border-petrol-400 pl-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-navy-900 sm:pl-6 sm:text-5xl">
              Finding cheaper fuel is useful. <span className="text-[#c62828]">Making fuel affordable is the bigger challenge.</span>
            </h2>
            <div className="mt-6 max-w-2xl space-y-3 text-base leading-relaxed text-charcoal-700 sm:text-lg">
              <p>Finding a cheaper petrol station can help motorists save money. But it does not solve the wider fuel affordability problem.</p>
              <p>
                Fuel Crisis England believes the government must do more to address the costs facing motorists, commuters, delivery drivers, tradespeople, families and small businesses. Price-comparison tools can help people make informed choices, but they cannot replace decisions on taxation, policy and practical support.
              </p>
              <p>
                We welcome useful tools that improve price transparency. However, making motorists search harder for an affordable pump price is not a substitute for meaningful action to make fuel more affordable.
              </p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <LinkButton href="/petition#sign-petition" size="lg" className="min-h-12">
                Sign the petition
              </LinkButton>
              <LinkButton href="/our-demands" variant="secondary" size="lg" className="min-h-12">
                Read our demands <span aria-hidden="true">→</span>
              </LinkButton>
            </div>
            <PetitionCountLine className="mt-5 max-w-xs" />
          </div>

          <aside aria-labelledby="where-we-stand" className="self-start rounded-lg border border-petrol-100 bg-petrol-50 p-5 sm:p-6">
            <h3 id="where-we-stand" className="text-lg font-extrabold text-navy-900">Where we stand</h3>
            <ul className="mt-3 divide-y divide-petrol-100">
              {positions.map((p) => (
                <li key={p.text} className="py-3 first:pt-0 last:pb-0">
                  <p className="text-sm leading-relaxed text-charcoal-700">{p.text}</p>
                  <Link href={p.href} className="mt-1 inline-flex min-h-8 items-center text-sm font-semibold text-petrol-600 underline underline-offset-2">
                    {p.link}
                    <span aria-hidden="true" className="ml-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-charcoal-600">Campaign position. Weekly price figures on this site are national averages from GOV.UK, not station prices.</p>
          </aside>
        </div>
      </Container>
    </section>
  );
}
