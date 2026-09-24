import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCard } from "@/components/ui/StatCard";
import { fuelDutyReceiptsFullYear } from "@/lib/data/hmrc-receipts";
import { yearlySnapshots } from "@/lib/data/yearly-snapshots";

export function TheQuestionWeShouldAsk() {
  const now = yearlySnapshots["2026"];

  return (
    <section className="bg-charcoal-900 py-16 sm:py-20">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Look at the evidence"
          title="So what should government do about fuel affordability?"
          description="We won't answer this for you. Here's the evidence, and you decide what it suggests."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Current Fuel Duty" value="52.95p" caption="per litre, since 23 March 2022" />
          <StatCard label="Previous Fuel Duty" value="57.95p" caption="per litre, before March 2022" />
          <StatCard label="Fuel Duty receipts" value={`£${fuelDutyReceiptsFullYear.amountGBP}bn`} caption={fuelDutyReceiptsFullYear.periodLabel} />
          <StatCard label="VAT on fuel" value="20%" caption="standard rate, on price + duty" />
          <StatCard label="Average petrol price" value={now.petrolPencePerLitre ? `${now.petrolPencePerLitre.toFixed(1)}p` : "—"} caption="per litre" />
          <StatCard label="Average diesel price" value={now.dieselPencePerLitre ? `${now.dieselPencePerLitre.toFixed(1)}p` : "—"} caption="per litre" />
          <StatCard label="National Living Wage" value={now.minimumWagePerHour ? `£${now.minimumWagePerHour.toFixed(2)}` : "—"} caption="per hour, 21+" />
          <StatCard label="Bank Rate" value={now.bankRatePercent ? `${now.bankRatePercent}%` : "—"} caption="affects mortgage & borrowing costs" />
        </div>

        <div className="mt-10 max-w-2xl rounded border border-white/10 bg-white/5 p-6">
          <p className="text-lg font-bold text-white">
            How much of the pressure at the pump is influenced by government taxation, and what policy
            choices could reduce that pressure?
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Explore the full evidence, including historical trends and every source, on the{" "}
            <a href="/follow-the-money" className="font-semibold text-petrol-400 underline underline-offset-2">
              Follow the Money page
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
