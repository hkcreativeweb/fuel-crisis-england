import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Alert } from "@/components/ui/Alert";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About FCE",
  description: `About ${siteConfig.fullBrand}: an independent civic information campaign on petrol and diesel affordability in England.`,
};

const principles = [
  {
    title: "No fabricated data",
    body: "We never invent fuel prices, statistics, government statements, or news articles. Where verified data isn't connected yet, we say so clearly instead of guessing.",
  },
  {
    title: "Clear sourcing",
    body: "Every figure we publish is labelled as live, historical, or demo data, with a source and date wherever possible.",
  },
  {
    title: "Lawful, peaceful action only",
    body: "We only encourage lawful, peaceful civic participation — contacting elected representatives, lawful protest, and public discussion.",
  },
  {
    title: "Privacy by default",
    body: "We collect only what's needed, never publish personal information without consent, and moderate all public submissions before they appear.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy-950 py-14 sm:py-16">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="About us"
            title={`About ${siteConfig.fullBrand}`}
            description={siteConfig.supportingStatement}
          />
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <Container>
          <div className="max-w-3xl space-y-5 text-sm leading-relaxed text-charcoal-700 sm:text-base">
            <p>
              Fuel Crisis England exists to make fuel economics easier to understand. We believe people
              should be able to see clearly how fuel prices are formed, how taxation affects what
              motorists pay, how the energy industry performs financially, and what policy choices are
              available to government.
            </p>
            <p>
              We do not ask visitors to accept claims without evidence. We publish the numbers, identify
              the sources, and explain the limitations. The purpose is simple:
            </p>
            <p className="text-lg font-bold text-navy-900">
              Ask questions. Follow the money. Check the evidence. Make your voice heard.
            </p>
            <p>
              This platform is independent. It is a civic information and campaigning website, not a
              government service, and is not affiliated with HM Government, any political party, or any
              fuel retailer.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle.title} className="rounded border border-slate-200 p-6">
                <h2 className="text-base font-bold text-navy-900">{principle.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{principle.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded bg-navy-950 p-8 sm:p-10">
            <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              <p>
                Fuel costs affect far more than the price displayed at a petrol station. They affect how
                people get to work, how businesses operate, how goods are delivered and how much families
                have left at the end of the month.
              </p>
              <p>
                At the same time, government receives significant revenue from fuel taxation and major
                energy companies report substantial profits. That does not automatically prove that every
                price increase is unlawful or that every profit is excessive. But it does create legitimate
                questions about transparency, fairness, taxation, competition and public policy.
              </p>
              <p>
                We believe the Government should explain what choices it has, why it makes those choices,
                and whether Fuel Duty can be frozen while people are under pressure. We also believe that
                regulators and policymakers should examine whether exceptional profits during an
                exceptional crisis require exceptional measures.
              </p>
              <p className="text-lg font-bold text-white">
                Save fuel. Save money. Follow the money. Ask questions. Demand accountability. Make your
                voice heard lawfully and peacefully.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Alert tone="info" title="This is a preview build.">
              Several features on this site — the live fuel price feed, the petition database, and public
              submission storage — are currently running in a clearly labelled demo mode while a
              production backend and verified data sources are connected. Nothing on this site claims to
              be more real or more official than it is.
            </Alert>
          </div>
        </Container>
      </section>
    </>
  );
}
