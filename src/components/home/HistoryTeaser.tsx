import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { FuelPriceChart } from "@/components/fuel-prices/FuelPriceChart";
import { getHistoricalFuelPrices } from "@/lib/data/desnz-weekly-prices";

/** Historical price data: the 12-month official weekly series, linking through to the full price dashboard. */
export async function HistoryTeaser() {
  const historical = await getHistoricalFuelPrices();
  return (
    <section id="price-history" className="scroll-mt-24 border-b border-slate-200 bg-slate-50 py-10 sm:py-16">
      <Container>
        <SectionHeading eyebrow="History" title="How prices have moved" description="Weekly UK average petrol and diesel prices from GOV.UK / DESNZ over the last year." />
        <div className="mt-6">
          <FuelPriceChart realData={historical} />
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/fuel-prices" variant="secondary" className="min-h-12">
            Price data &amp; chart <span aria-hidden="true">→</span>
          </LinkButton>
          <LinkButton href="/fuel-prices-through-time" variant="secondary" className="min-h-12">
            Prices through time <span aria-hidden="true">→</span>
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
