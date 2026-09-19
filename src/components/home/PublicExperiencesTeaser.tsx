import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { PublicExperienceCard } from "@/components/petition/PublicExperienceCard";
import { examplePublicExperiences } from "@/lib/data/public-experiences";

export function PublicExperiencesTeaser() {
  const preview = examplePublicExperiences.slice(0, 3);

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="In people's own words"
            title="Public experiences"
            description="Anonymised, moderated experiences shared by drivers across England. Examples below show the format."
          />
          <LinkButton href="/petition" variant="secondary">
            Share your experience
          </LinkButton>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {preview.map((experience) => (
            <PublicExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </Container>
    </section>
  );
}
