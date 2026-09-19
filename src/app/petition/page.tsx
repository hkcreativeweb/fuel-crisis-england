import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PetitionForm } from "@/components/petition/PetitionForm";
import { PetitionCounter } from "@/components/petition/PetitionCounter";
import { PublicExperiencesList } from "@/components/petition/PublicExperiencesList";

export const metadata: Metadata = {
  title: "Petition & Share Your Experience",
  description: "Sign the public petition on fuel affordability and share how rising petrol and diesel prices are affecting you.",
};

export default function PetitionPage() {
  return (
    <>
      <section className="bg-navy-950 py-14 sm:py-16">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="Add your voice"
            title="Sign the petition and share your experience"
            description="Every verified submission helps show the real scale of fuel affordability across England."
          />
          <div className="mt-8 max-w-md rounded bg-white/5 p-6">
            <PetitionCounter tone="dark" />
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-2xl">
            <PetitionForm />
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-14 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="In people's own words"
            title="Public experiences"
            description="Anonymised, moderated experiences shared by drivers across England. The cards below are clearly marked examples of the format."
          />
          <div className="mt-8">
            <PublicExperiencesList />
          </div>
        </Container>
      </section>
    </>
  );
}
