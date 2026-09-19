import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { FollowTheMoneyFlow } from "@/components/money-flow/FollowTheMoneyFlow";

export function TheBigQuestion() {
  return (
    <section className="bg-navy-950 py-16 sm:py-20">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="The big question"
          title="If fuel costs so much, where does the money go?"
          description="Choose an amount and see the breakdown, built from official UK tax rates and verified pump price data."
        />

        <div className="mt-10 max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <FollowTheMoneyFlow defaultAmount={50} />
        </div>

        <div className="mt-8 max-w-2xl rounded-2xl bg-white/5 p-5 text-sm leading-relaxed text-slate-300">
          <strong className="text-white">Fuel Duty</strong> is a specific tax charged per litre, fixed
          regardless of the pump price. <strong className="text-white">VAT</strong> is charged at the
          standard rate (20%) on the fuel price including duty — so the amount of VAT you pay changes as
          the underlying fuel price changes. Figures are drawn from GOV.UK and HMRC.
        </div>

        <div className="mt-8">
          <LinkButton href="/why-is-fuel-expensive" variant="outline-light" size="lg">
            Why Is Fuel So Expensive? Full Investigation
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
