import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { PolicyDemands } from "@/components/cost-of-living/PolicyDemands";
import { CanGovernmentFreezeDuty } from "@/components/cost-of-living/CanGovernmentFreezeDuty";
import { CanGovernmentCapProfits } from "@/components/cost-of-living/CanGovernmentCapProfits";
import { GovernmentCouldSection } from "@/components/cost-of-living/GovernmentCouldSection";
import { FuelPolicySimulator } from "@/components/our-demands/FuelPolicySimulator";
import { PageNav } from "@/components/our-demands/PageNav";
import { SourceCard } from "@/components/sources/SourceCard";
import { officialSources } from "@/lib/data/sources";

const sourceGroups = [
  { label: "Government", names: ["GOV.UK", "HM Revenue & Customs (HMRC)"] },
  { label: "Independent / regulatory", names: ["Competition and Markets Authority (CMA)", "Office for Budget Responsibility (OBR)"] },
  { label: "Parliament", names: ["UK Parliament"] },
].map((g) => ({ label: g.label, sources: officialSources.filter((s) => g.names.includes(s.name)) }));

export const metadata: Metadata = {
  title: "Our Demands",
  description: "Fuel Crisis England's public policy demands on Fuel Duty, fuel taxation, energy-company profits, and support for essential drivers, with clear explainers on what government can actually change.",
};

export default function OurDemandsPage() {
  return (
    <>
      <section className="bg-navy-950 py-16 sm:py-20">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="Campaign position"
            title="Our Demands"
            description="What FCE is calling for on fuel affordability, transparency and accountability. These are campaign proposals, linked to the evidence behind them, not established facts."
          />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Fuel Crisis England does not tell people how to vote or which political party to support. We
            set out specific policy questions and requests based on publicly available evidence. Governments
            and regulators can choose how to respond, and visitors can make up their own minds.
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-petrol-300">7 policy demands · Evidence-led · Illustrative modelling</p>
          <div className="mt-6">
            <LinkButton href="/ask-your-mp" size="lg">
              Ask your MP about these demands
            </LinkButton>
          </div>
        </Container>
      </section>

      <div className="bg-white py-4">
        <Container>
          <PageNav />
        </Container>
      </div>

      <section id="simulator" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Illustrative tool"
            title="What Could Different Tax Policies Mean at the Pump?"
            description="Explore illustrative scenarios by changing Fuel Duty and VAT. See the mechanical effect on fuel prices, motorists and government revenue."
          />
          <div className="mt-8">
            <FuelPolicySimulator />
          </div>
        </Container>
      </section>

      <section id="demands" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Our seven public policy demands" title="What We're Calling For" />
          <div className="mt-8">
            <PolicyDemands />
          </div>
        </Container>
      </section>

      <section id="freeze-duty" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="A clear explainer" title="Can the Government Freeze Fuel Duty?" />
          <div className="mt-10 max-w-3xl">
            <CanGovernmentFreezeDuty />
          </div>
        </Container>
      </section>

      <section id="cap-profits" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Another explainer" title="Can Government Cap Profits During a Crisis?" description="Different policy mechanisms have different legal, economic and practical implications. We don't claim any one is the obvious or guaranteed solution." />
          <div className="mt-10 max-w-3xl">
            <CanGovernmentCapProfits />
          </div>
        </Container>
      </section>

      <section id="government-could" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="A neutral policy-options guide" title="What Can Government Actually Change?" description="Documented areas where government has policy control, and the real constraints on changing them." />
          <div className="mt-10">
            <GovernmentCouldSection />
          </div>
        </Container>
      </section>

      <section id="sources" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Evidence Behind Our Demands" title="Where This Page's Figures Come From" description="Every figure above is sourced and dated inline, next to the figure itself. These are the primary organisations we draw from." />
          <div className="mt-8 space-y-8">
            {sourceGroups.map((group) =>
              group.sources.length > 0 ? (
                <div key={group.label}>
                  <p className="text-xs font-bold uppercase tracking-wide text-charcoal-500">{group.label}</p>
                  <div className="mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {group.sources.map((source) => (
                      <SourceCard key={source.name} source={source} />
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
