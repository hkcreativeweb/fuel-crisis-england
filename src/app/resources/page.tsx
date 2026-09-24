import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { faqs } from "@/lib/data/faqs";

export const metadata: Metadata = {
  title: "Resources & FAQs",
  description: "Frequently asked questions about fuel prices, fuel duty, saving on fuel costs, and how to take civic action.",
};

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-navy-950 py-14 sm:py-16">
        <Container>
          <SectionHeading as="h1"
            tone="dark"
            eyebrow="Resources"
            title="Frequently asked questions"
            description="Straightforward answers on fuel prices, tax, savings, and how to get involved."
          />
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FAQAccordion items={faqs} />
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-14 sm:py-16">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-navy-900">Looking for official sources?</h2>
            <p className="mt-2 max-w-xl text-sm text-charcoal-700">
              See our Sources page for links to GOV.UK, UK Parliament, ONS, the CMA, and more.
            </p>
          </div>
          <LinkButton href="/sources" size="lg">
            View Sources
          </LinkButton>
        </Container>
      </section>
    </>
  );
}
