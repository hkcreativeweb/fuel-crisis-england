import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { FollowTheMoneyFlow } from "@/components/money-flow/FollowTheMoneyFlow";
import { getPumpPriceBreakdowns } from "@/lib/data/current-fuel-prices";
import { fuelDutyReceiptsFullYear } from "@/lib/data/hmrc-receipts";

export async function TheBigQuestion() {
  const { petrol: petrolBreakdown } = await getPumpPriceBreakdowns();
  const receipts = fuelDutyReceiptsFullYear;
  return (
    <section id="follow-the-money" className="relative scroll-mt-24 overflow-hidden border-y-4 border-petrol-500 bg-navy-950 py-12 sm:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-12">
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Follow the money"
              title="You pay for a litre. Where does the money go?"
              description="Pick an amount and see an illustrative breakdown based on the latest verified petrol price and current tax rates."
            />
            <div className="mt-6 max-w-sm rounded border border-white/15 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-petrol-300">Fuel Duty receipts</p>
              <p className="mt-1 text-2xl font-extrabold tabular-nums text-white">£{receipts.amountGBP}{receipts.unit === "billion" ? "bn" : ""}</p>
              <p className="text-sm text-slate-300">{receipts.periodLabel}</p>
              <a href={receipts.sourceUrl ?? "/sources"} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-xs font-semibold text-petrol-300 underline underline-offset-2">
                Source: {receipts.source}
              </a>
            </div>
            <div className="mt-4">
              <LinkButton href="/follow-the-money" size="lg" className="min-h-12">
                See the full breakdown &rarr;
              </LinkButton>
            </div>
          </div>
          <div className="rounded border border-white/10 bg-white/5 p-5 sm:p-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-petrol-300">Where does your £50 go?</p>
            <FollowTheMoneyFlow defaultAmount={50} currentBreakdown={petrolBreakdown} />
          </div>
        </div>
      </Container>
    </section>
  );
}
