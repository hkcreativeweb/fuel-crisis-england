import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ContentTag } from "@/components/ui/ContentTag";
import { PhotoFigure } from "@/components/ui/PhotoFigure";
import { PetitionCountLine } from "@/components/petition/PetitionCountLine";
import { ComparisonPanels } from "@/components/live/ComparisonPanels";
import { DetourSavingsCalculator } from "@/components/calculator/DetourSavingsCalculator";
import { formatDate } from "@/lib/utils";

const PUBLISHED = "2026-10-08";

const sources = {
  gov: { label: "GOV.UK: Drivers set to save as petrol prices launch on Google Maps", url: "https://www.gov.uk/government/news/drivers-set-to-save-as-petrol-prices-launch-on-google-maps" },
  google: { label: "Google: fuel prices in Google Maps and Waze (UK)", url: "https://blog.google/company-news/inside-google/around-the-globe/google-europe/united-kingdom/google-maps-waze-fuel-prices-uk/" },
  scheme: { label: "GOV.UK: Fuel Finder", url: "https://www.gov.uk/government/collections/fuel-finder" },
};

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center font-semibold text-petrol-600 underline underline-offset-2">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

type Prices = { petrol: number; diesel: number; dataPeriod: string };

/** The campaign's position on Google Maps and Waze fuel prices: the benefit, the limits, and the petition. FCE shows no station-level prices. */
export function FuelFinderSection({ compact = false, prices }: { compact?: boolean; prices?: Prices }) {
  return (
    <section id="fuel-finder" className={`scroll-mt-24 border-b border-slate-200 bg-white ${compact ? "py-10 sm:py-14" : "py-12 sm:py-16"}`}>
      <Container>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-petrol-600">New · {formatDate(PUBLISHED)}</p>
        <h2 className="mt-2 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-4xl">Cheaper fuel on the map. But what about the price at the pump?</h2>

        <div className="mt-5 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-10">
          <div className="space-y-3 text-base leading-relaxed text-charcoal-700">
            <p>Google Maps and Waze can help motorists compare fuel prices and find cheaper stations. That is useful information, and people should be able to make informed choices.</p>
            <p>
              But comparison tools do not, by themselves, reduce the underlying cost of fuel. A cheaper station may still be expensive, may be too far away to justify the journey, or may not solve the problem for people who have no realistic alternative to driving.
            </p>
            {compact ? null : (
              <>
                <p>Fuel affordability also depends on taxation, international oil prices, distribution costs and retailer pricing.</p>
                <p>
                  Fuel Crisis England believes that better price information should be part of the solution, not the whole solution. We want a serious discussion about fuel affordability, government taxation, transparency and practical measures to ease the burden on motorists.
                </p>
              </>
            )}
          </div>
          {compact ? null : (
            <PhotoFigure
              id="hero-petrol-station"
              aspect="aspect-[16/10]"
              sizes="(min-width: 1024px) 420px, 100vw"
              caption="A price sign at one station in May 2026: 164.9p unleaded and 182.9p diesel. Each station shows its own prices, which is why a national average is not a station price."
            />
          )}
        </div>

        {compact ? null : (
          <blockquote className="mt-6 rounded-lg border-l-4 border-petrol-400 bg-slate-50 p-5">
            <ContentTag type="campaign-commentary" />
            <p className="mt-2 text-xl font-extrabold leading-snug text-navy-900 sm:text-2xl">Finding cheaper fuel is useful. Making fuel affordable is the bigger challenge.</p>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
              Price comparison is one useful part of the picture. The wider challenge needs attention to government policy, including Fuel Duty and VAT, alongside the other costs that sit behind the pump price. Our criticism is not of Google Maps or Waze; it is of treating price comparison as an adequate answer to fuel affordability.
            </p>
          </blockquote>
        )}

        <div className="mt-6">
          <ComparisonPanels />
        </div>

        {compact ? null : (
          <>
            <div className="mt-8">
              <h3 className="text-lg font-bold text-navy-900">A weekly average is not a station price</h3>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border-2 border-navy-900 bg-white p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">What this site shows</p>
                  <p className="mt-1 text-base font-extrabold text-navy-900">UK weekly average pump prices</p>
                  {prices ? (
                    <p className="mt-2 text-2xl font-extrabold tabular-nums text-navy-900">
                      {prices.petrol.toFixed(1)}p <span className="text-sm font-semibold text-charcoal-600">petrol</span> · {prices.diesel.toFixed(1)}p <span className="text-sm font-semibold text-charcoal-600">diesel</span>
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                    One national figure per fuel per week, published by GOV.UK / DESNZ{prices ? ` for ${prices.dataPeriod.replace(/^Week commencing/, "the week of")}` : ""}. It is an average across the country, not the price at any one station, and not a live price.
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">What Google Maps and Waze show</p>
                  <p className="mt-1 text-base font-extrabold text-navy-900">Prices reported by individual stations</p>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                    Each station reports its own prices to the government&apos;s Fuel Finder scheme, which the apps draw on. These differ from station to station and can change during the day. Fuel Crisis England does not display station prices; use the apps for those.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-5">
                <ContentTag type="official-fact" />
                <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                  The prices come from the government&apos;s Fuel Finder scheme. Since February 2026, petrol stations must report price changes within 30 minutes. Google and the government announced the launch on {formatDate(PUBLISHED)}.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-5">
                <ContentTag type="government-claim" />
                <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                  The government says Fuel Finder now reflects around 99% of the fuel sold on UK roads (a measure of fuel sold, not of the number of stations), and that comparing prices could save a household that owns a car about £40 a year on average. The page gives no method for the £40 estimate. We have not verified either figure.
                </p>
              </div>
            </div>

            <div id="detour" className="mt-8 scroll-mt-24">
              {prices ? <DetourSavingsCalculator prices={prices} /> : null}
            </div>
          </>
        )}

        <p className="mt-5 text-xs leading-relaxed text-charcoal-600">
          Sources: <ExtLink href={sources.google.url}>{sources.google.label}</ExtLink> · <ExtLink href={sources.gov.url}>GOV.UK, {formatDate(PUBLISHED)}</ExtLink> · <ExtLink href={sources.scheme.url}>{sources.scheme.label}</ExtLink>
        </p>

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
            <LinkButton href="/live-fuel-prices#fuel-finder" variant="secondary" className="min-h-12">
              Read the full explainer <span aria-hidden="true">→</span>
            </LinkButton>
          ) : (
            <LinkButton href="/our-demands" variant="secondary" className="min-h-12">
              See our policy demands <span aria-hidden="true">→</span>
            </LinkButton>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-lg bg-navy-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-lg font-extrabold">Better price information should be part of the solution.</p>
            <p className="mt-1 text-sm text-slate-200">Add your voice on fuel affordability. This is an FCE campaign petition, not an official UK Parliament petition.</p>
            <PetitionCountLine tone="dark" className="mt-3 max-w-xs" />
          </div>
          <Link
            href="/petition#sign-petition"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-petrol-500 px-6 text-sm font-bold text-white hover:bg-petrol-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petrol-300"
          >
            Sign the petition
          </Link>
        </div>
      </Container>
    </section>
  );
}
