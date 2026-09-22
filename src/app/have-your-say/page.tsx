import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { HaveYourSaySection } from "@/components/have-your-say/HaveYourSaySection";
import { PetitionsSection } from "@/components/have-your-say/PetitionsSection";

const CONTACT_EMAIL = "contact.fuelcrisisengland@gmail.com";

export const metadata: Metadata = {
  title: "Have Your Say",
  description: "Share your view on fuel prices and affordability in England.",
};

export default function HaveYourSayPage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Have Your Say"
          title="Have Your Say"
          description="Share your thoughts on fuel prices, motoring costs, electric vehicles and the future of transport."
        />

        <div className="mt-10 max-w-2xl">
          <HaveYourSaySection />
        </div>

        <div className="mt-14 max-w-3xl border-t border-slate-200 pt-10">
          <PetitionsSection />
        </div>
      </Container>

      <div className="mt-16 border-t border-slate-200 bg-slate-50 py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">Have an idea? Get in touch.</h2>
            <p className="mt-4 text-sm leading-relaxed text-charcoal-700 sm:text-base">
              Fuel Crisis England is built to give people a place to understand fuel prices, share
              information and discuss practical policy ideas.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-charcoal-700 sm:text-base">
              If you have a suggestion, idea, question, correction, or topic you think we should
              investigate, we&apos;d like to hear from you. Your feedback can help us improve the website
              and make sure we&apos;re covering the issues that matter to motorists, households and
              businesses.
            </p>
            <p className="mt-5 break-words text-sm font-semibold text-petrol-600 sm:text-base">{CONTACT_EMAIL}</p>
            <div className="mt-6">
              <LinkButton href={`mailto:${CONTACT_EMAIL}`} size="lg">
                Email Us
              </LinkButton>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
