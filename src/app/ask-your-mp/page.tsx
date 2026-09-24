import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { MPEmailGenerator } from "@/components/mp/MPEmailGenerator";

export const metadata: Metadata = pageMetadata("/ask-your-mp", {
  title: "Ask Your MP",
  description: "Contact your MP about fuel prices, Fuel Duty and energy-company profits with an evidence-based, editable email template.",
});

export default function AskYourMPPage() {
  return (
    <>
      <section className="bg-navy-950 py-16 sm:py-20">
        <Container>
          <SectionHeading as="h1"
            tone="dark"
            eyebrow="Make your voice heard"
            title="Your MP Can Hear From You"
            description="Constituents can write to their MP about fuel affordability, Fuel Duty policy, energy-company profits, and the cost of living. Below is an evidence-based template you can edit and send yourself. Nothing is ever sent automatically."
          />
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Ask your MP" title="Choose your topics and generate your email" className="mb-10" />
          <MPEmailGenerator />
        </Container>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-navy-900">Want to track responses or ask for evidence?</h2>
            <p className="mt-2 max-w-xl text-sm text-charcoal-700">
              Our Government Accountability page has a private response tracker, guidance on what evidence
              to ask for, and a public wall of shared MP responses.
            </p>
          </div>
          <LinkButton href="/government-accountability" variant="secondary">
            Government Accountability
          </LinkButton>
        </Container>
      </section>
    </>
  );
}
