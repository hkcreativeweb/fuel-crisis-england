import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { WhatDid20Buy } from "@/components/cost-of-living/WhatDid20Buy";

export function TwentyPoundsSection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p aria-hidden="true" className="text-[7rem] font-extrabold leading-none tracking-tighter text-petrol-500 sm:text-[9rem]">
              £20
            </p>
            <SectionHeading
              className="mt-4"
              eyebrow="Then. Now. What changed?"
              title="What does £20 actually buy you?"
              description="Prices change. Wages change. The same amount of money can tell a very different story over time."
            />
            <div className="mt-8">
              <LinkButton href="/fuel-prices-through-time" variant="secondary">
                Compare the past
              </LinkButton>
            </div>
          </div>
          <div className="rounded border border-slate-200 bg-white p-6 sm:p-8">
            <WhatDid20Buy />
          </div>
        </div>
      </Container>
    </section>
  );
}
