import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { FollowTheMoneyFlow } from "@/components/money-flow/FollowTheMoneyFlow";
import { fuelDutyReceiptsFullYear } from "@/lib/data/hmrc-receipts";

export function TheBigQuestion() {
  const receipts = fuelDutyReceiptsFullYear;
  return (
    <section id="follow-the-money" className="relative scroll-mt-24 overflow-hidden border-y-4 border-petrol-500 bg-navy-950 py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-12">
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Follow the money"
              title="You pay for a litre. Where does the money go?"
              description="Pick an amount and watch it split between the fuel, the forecourt and the Treasury."
            />
            <div className="mt-6 max-w-xl space-y-3 text-sm leading-relaxed text-slate-300">
              <p>
                Two taxes sit on every litre. <strong className="text-white">Fuel Duty</strong> is a fixed amount per
                litre, set by government. <strong className="text-white">VAT</strong> is 20% of the price including
                that duty, so it rises and falls with the pump price.
              </p>
              <p>
                Fuel Duty raised <strong className="text-white">£{receipts.amountGBP} {receipts.unit}</strong> in the{" "}
                {receipts.periodLabel.charAt(0).toLowerCase() + receipts.periodLabel.slice(1)}.{" "}
                <a href={receipts.sourceUrl ?? "/sources"} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold text-petrol-300 underline underline-offset-2">
                  Source: {receipts.source}
                </a>
              </p>
            </div>
            <div className="mt-6">
              <LinkButton href="/follow-the-money" size="lg" className="min-h-12">
                Break down the price &rarr;
              </LinkButton>
            </div>
          </div>
          <div className="rounded border border-white/10 bg-white/5 p-5 sm:p-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-petrol-300">Where does your £50 go?</p>
            <FollowTheMoneyFlow defaultAmount={50} />
          </div>
        </div>
      </Container>
    </section>
  );
}
