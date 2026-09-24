import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EuropeCompared } from "@/components/europe/EuropeCompared";
import { StatusBadge } from "@/components/ui/StatusBadge";

export const metadata: Metadata = pageMetadata("/europe-compared", {
  title: "Europe Compared",
  description: "How UK petrol and diesel prices compare with all 27 EU member states: price before tax, duty, VAT and total pump price, sourced from the European Commission's Weekly Oil Bulletin.",
});

export default function EuropeComparedPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-navy-950 py-16 sm:py-24">
        <Container>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-petrol-300">Europe Compared</p>
          <div className="h-px w-12 bg-white/30" aria-hidden="true" />
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
            The same fuel.
            <br />
            Different prices.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            Petrol and diesel cost different amounts across Europe, not because the fuel itself is
            different, but because tax policy, market structure and currency all vary by country. See how
            the UK compares, litre for litre.
          </p>
          <div className="mt-8">
            <StatusBadge status="latest-available" showDetail tone="dark" />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionHeading number="05" eyebrow="Europe" title="How the UK compares" description="Choose a country to see the full price breakdown, or scan the full ranking below." rule />
          <div className="mt-10">
            <EuropeCompared />
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-14">
        <Container>
          <p className="max-w-2xl text-sm leading-relaxed text-charcoal-700">
            This comparison does not imply any conclusion about which country&apos;s policy is &ldquo;right&rdquo;.
            Tax levels reflect different national choices about public spending, environmental policy and
            fiscal priorities. We show the evidence. What it should mean for UK policy is for readers, and
            for{" "}
            <a href="/our-demands" className="font-semibold text-petrol-600 underline underline-offset-2">
              the debate on Our Demands
            </a>
            , to decide.
          </p>
        </Container>
      </section>
    </>
  );
}
