import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { MPEmailGenerator } from "@/components/mp/MPEmailGenerator";
import { getMPTopics } from "@/lib/data/mp-topics";

export const metadata: Metadata = pageMetadata("/ask-your-mp", {
  title: "Ask Your MP",
  description: "Contact your MP about fuel prices, Fuel Duty and energy-company profits with an evidence-based, editable email template.",
});

export default async function AskYourMPPage() {
  const topics = await getMPTopics();
  return (
    <>
      <section className="bg-navy-950 py-16 sm:py-20">
        <Container>
          <SectionHeading as="h1"
            tone="dark"
            eyebrow="Make your voice heard"
            title="Your MP Can Hear From You"
            description="Write to your MP about Fuel Duty, VAT, fuel prices and the cost of driving. Pick your topics and we'll draft a neutral message using official figures, which you can edit and send yourself. Nothing is ever sent automatically."
          />
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Ask your MP" title="Draft your message" className="mb-10" />
          <MPEmailGenerator topics={topics} />
        </Container>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-navy-900">Want to ask for evidence?</h2>
            <p className="mt-2 max-w-xl text-sm text-charcoal-700">
              Our Government Accountability page explains what evidence to ask for and how to follow up if
              you don&apos;t get a clear answer.
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
