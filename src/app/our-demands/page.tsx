import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { PolicyDemands } from "@/components/cost-of-living/PolicyDemands";
import { CanGovernmentFreezeDuty } from "@/components/cost-of-living/CanGovernmentFreezeDuty";
import { CanGovernmentCapProfits } from "@/components/cost-of-living/CanGovernmentCapProfits";
import { GovernmentCouldSection } from "@/components/cost-of-living/GovernmentCouldSection";

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
            eyebrow="What we are asking for"
            title="Our Public Policy Demands"
            description="These are campaign demands: our position, not established fact or government policy. We've tried to be explicit about what each demand would actually require."
          />
          <div className="mt-6">
            <LinkButton href="/ask-your-mp" size="lg">
              Ask your MP about these demands
            </LinkButton>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <PolicyDemands />
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
          <SectionHeading eyebrow="Another explainer" title="Can Government Cap Profits During a Crisis?" description="Neutral, evidence-based options. We don't claim any one will definitely work." />
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
    </>
  );
}
