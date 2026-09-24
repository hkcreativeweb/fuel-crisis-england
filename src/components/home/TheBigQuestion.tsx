import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { FollowTheMoneyFlow } from "@/components/money-flow/FollowTheMoneyFlow";

export function TheBigQuestion() {
  return (
    <section className="relative overflow-hidden border-y-4 border-petrol-500 bg-navy-950 py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Follow the money"
              title="You pay for a litre. Where does the money go?"
              description="Oil. Refining. Distribution. Retail. Tax. One pump price, several moving parts."
            />
            <div className="mt-8 max-w-xl text-sm leading-relaxed text-slate-300">
              <strong className="text-white">Fuel Duty</strong> is a fixed amount per litre, whatever the pump
              price. <strong className="text-white">VAT</strong> is 20% of the price including duty, so it rises
              and falls with the price. Figures are drawn from GOV.UK and HMRC.
            </div>
            <div className="mt-8">
              <LinkButton href="/follow-the-money" size="lg">
                Break down the price &rarr;
              </LinkButton>
            </div>
          </div>
          <div className="rounded border border-white/10 bg-white/5 p-6 sm:p-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-petrol-300">Where does your £50 go?</p>
            <FollowTheMoneyFlow defaultAmount={50} />
          </div>
        </div>
      </Container>
    </section>
  );
}
