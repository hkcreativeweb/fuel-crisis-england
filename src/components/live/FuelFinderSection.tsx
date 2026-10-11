import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { ContentTag } from "@/components/ui/ContentTag";
import { DetourSavingsCalculator } from "@/components/calculator/DetourSavingsCalculator";
import { formatDate } from "@/lib/utils";

const PUBLISHED = "2026-10-08";

const sources = {
  gov: { label: "GOV.UK: Drivers set to save as petrol prices launch on Google Maps", url: "https://www.gov.uk/government/news/drivers-set-to-save-as-petrol-prices-launch-on-google-maps" },
  google: { label: "Google: fuel prices in Google Maps and Waze (UK)", url: "https://blog.google/company-news/inside-google/around-the-globe/google-europe/united-kingdom/google-maps-waze-fuel-prices-uk/" },
  scheme: { label: "GOV.UK: Fuel Finder", url: "https://www.gov.uk/government/collections/fuel-finder" },
};

const limits = [
  "Drivers may have to travel farther to reach a lower price.",
  "Extra mileage can reduce or cancel out the saving.",
  "People cannot always choose when, where or how far they travel.",
  "Rural drivers, and people with no practical public-transport alternative, may have fewer stations to choose between.",
  "Clear prices help people compare stations, but they do not directly reduce the underlying cost of fuel.",
];

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center font-semibold text-petrol-600 underline underline-offset-2">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/**
 * Explains the Google Maps / Waze fuel-price launch and FCE's view of it. Facts and government claims are
 * labelled as such and linked to their sources. FCE does not show individual station prices.
 */
export function FuelFinderSection({ compact = false, prices }: { compact?: boolean; prices?: { petrol: number; diesel: number; dataPeriod: string } }) {
  return (
    <section id="fuel-finder" className={`scroll-mt-24 border-b border-slate-200 bg-white ${compact ? "py-10 sm:py-14" : "py-12 sm:py-14"}`}>
      <Container>
        <SectionHeading
          eyebrow={`New · ${formatDate(PUBLISHED)}`}
          title="Fuel prices are now on Google Maps and Waze"
          description="Drivers in the UK can search for “petrol” or “fuel” in Google Maps or Waze to see nearby stations and the petrol and diesel prices they have reported."
        />

        {compact ? (
          <div className="mt-5 max-w-3xl">
            <p className="text-sm leading-relaxed text-charcoal-700">
              The prices come from the government&apos;s Fuel Finder scheme. The government says it now covers around 99% of the fuel sold on UK roads and could save a car-owning household about £40 a year on average. Those are government claims, not independently verified.
            </p>
            <p className="mt-2 text-xs text-charcoal-600">
              Sources: <ExtLink href={sources.gov.url}>GOV.UK, {formatDate(PUBLISHED)}</ExtLink> · <ExtLink href={sources.google.url}>Google</ExtLink>
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-5">
              <ContentTag type="official-fact" />
              <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                The prices come from the government&apos;s Fuel Finder scheme. Since February 2026, petrol stations must report price changes within 30 minutes. Google and the government announced the launch on {formatDate(PUBLISHED)}.
              </p>
              <p className="mt-3 text-xs text-charcoal-600">
                Sources: <ExtLink href={sources.gov.url}>GOV.UK</ExtLink> · <ExtLink href={sources.google.url}>Google</ExtLink> · <ExtLink href={sources.scheme.url}>Fuel Finder</ExtLink>
              </p>
            </div>
  
            <div className="rounded-lg border border-slate-200 p-5">
              <ContentTag type="government-claim" />
              <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                The government says Fuel Finder now reflects around 99% of the fuel sold on UK roads (a measure of fuel sold, not of the number of stations), and that comparing prices could save a household that owns a car about £40 a year on
                average. The page gives no method for the £40 estimate.
              </p>
              <p className="mt-3 text-xs text-charcoal-600">
                Source: <ExtLink href={sources.gov.url}>GOV.UK, {formatDate(PUBLISHED)}</ExtLink>
              </p>
            </div>
          </div>
        )}

        <blockquote className="mt-6 rounded-lg border-l-4 border-petrol-500 bg-slate-50 p-5">
          <ContentTag type="campaign-commentary" />
          <p className="mt-2 text-lg font-extrabold leading-snug text-navy-900 sm:text-xl">
            Finding cheaper fuel is useful, but finding a cheaper pump is not the same as making fuel affordable.
          </p>
        </blockquote>

        {compact ? null : (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-base font-bold text-navy-900">The limits of comparing prices</h3>
              <p className="mt-1 text-sm text-charcoal-600">Comparison tools help many drivers, and they depend on how many choices a driver really has. Our view:</p>
              <ul className="mt-3 space-y-2">
                {limits.map((l) => (
                  <li key={l} className="flex gap-3 text-sm leading-relaxed text-charcoal-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-petrol-500" aria-hidden="true" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-bold text-navy-900">What this site shows, and what it doesn&apos;t</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                The petrol and diesel figures on Fuel Crisis England are the UK weekly average pump prices from GOV.UK / DESNZ. They are national averages, not live prices and not the price at any one station. We do not display individual station prices. For those, use Google Maps, Waze or another comparison app.
              </p>
            </div>
          </div>
        )}

        {compact || !prices ? null : (
          <div className="mt-6">
            <DetourSavingsCalculator prices={prices} />
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <LinkButton href="https://www.google.com/maps" variant="secondary" className="min-h-12">
            Open Google Maps <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </LinkButton>
          <LinkButton href="https://www.waze.com/" variant="secondary" className="min-h-12">
            Open Waze <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </LinkButton>
          {compact ? (
            <LinkButton href="/live-fuel-prices#fuel-finder" className="min-h-12">
              Read the full explainer <span aria-hidden="true">→</span>
            </LinkButton>
          ) : (
            <LinkButton href="/our-demands" className="min-h-12">
              See our policy demands <span aria-hidden="true">→</span>
            </LinkButton>
          )}
        </div>
      </Container>
    </section>
  );
}
