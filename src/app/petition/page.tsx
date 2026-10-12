import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PetitionForm } from "@/components/petition/PetitionForm";
import { PetitionBanner } from "@/components/petition/PetitionBanner";
import { PetitionFaq } from "@/components/petition/PetitionFaq";
import { PetitionCounter } from "@/components/petition/PetitionCounter";
import { PetitionsSection } from "@/components/have-your-say/PetitionsSection";

export const metadata: Metadata = pageMetadata("/petition", {
  title: "Petition & Share Your Experience",
  description: "Sign FCE's own petition on fuel affordability (not an official UK Parliament petition) and share how rising petrol and diesel prices are affecting you.",
  image: {
    url: "/share/petition-card.jpg",
    width: 1200,
    height: 630,
    alt: "Fuel Crisis England: Finding cheaper fuel is useful. Making fuel affordable is the bigger challenge. Sign the petition.",
  },
});

export default function PetitionPage() {
  return (
    <>
      <section className="bg-navy-950 py-14 sm:py-16">
        <Container>
          <SectionHeading as="h1"
            tone="dark"
            eyebrow="FCE information/resource — not an official Parliament petition"
            title="Sign FCE's petition and share your experience"
            description="Every verified submission helps show the real scale of fuel affordability across England."
          />
          <p className="mt-4 max-w-2xl text-sm text-slate-300">
            This petition is operated by Fuel Crisis England, an independent initiative. It is not a government petition and is not run by any other organisation, and it is not an official UK
            Parliament petition.{" "}
            <a href="#uk-parliament-petitions" className="font-semibold text-petrol-300 underline underline-offset-2">
              See official UK Parliament petitions on fuel duty and VAT below
            </a>
            .
          </p>
          <p className="mt-5 max-w-2xl border-l-4 border-petrol-400 pl-4 text-base font-bold leading-snug text-white sm:text-lg">
            Finding cheaper fuel is useful. Making fuel affordable is the bigger challenge. Add your name to ask for further practical action.
          </p>
          <div className="mt-8 max-w-md rounded bg-white/5 p-6">
            <PetitionCounter tone="dark" />
          </div>
        </Container>
      </section>

      <PetitionBanner showCount={false} />

      <section id="sign-petition" className="scroll-mt-24 bg-white py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-petrol-600">FCE petition</p>
            <p className="mt-1 mb-6 text-sm text-charcoal-700">This is the petition hosted by Fuel Crisis England.</p>
            <aside aria-labelledby="what-happens-next" className="mb-6 rounded-lg border border-petrol-100 border-l-4 border-l-petrol-400 bg-petrol-50 p-4 sm:p-5">
              <h2 id="what-happens-next" className="text-base font-extrabold text-navy-900 sm:text-lg">What happens next?</h2>
              <div className="mt-2 space-y-2 text-sm leading-relaxed text-charcoal-700">
                <p>Your signature helps demonstrate public concern about the cost of fuel in England.</p>
                <p>
                  Fuel Crisis England is an independent, community-led campaign. We have not yet finalised the arrangements for submitting the petition to the relevant decision-makers. We will communicate any confirmed next steps transparently rather than make promises we cannot yet guarantee.
                </p>
                <p>Our aim is to encourage meaningful action on fuel affordability and keep the concerns of motorists, families, workers and small businesses visible.</p>
              </div>
            </aside>
            <PetitionForm />
          </div>
        </Container>
      </section>

      <PetitionFaq />

      <section id="uk-parliament-petitions" className="scroll-mt-24 border-t border-slate-200 bg-slate-50 py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-charcoal-500">UK Parliament petitions</p>
            <PetitionsSection
              headingLevel="h2"
              title="Other UK Parliament petitions"
              intro="These are separate petitions hosted by the official UK Parliament petitions system. They are not run by Fuel Crisis England. Signing takes place on the UK Parliament website."
            />
          </div>
        </Container>
      </section>
    </>
  );
}
