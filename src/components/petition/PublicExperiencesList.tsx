import { PublicExperienceCard } from "@/components/petition/PublicExperienceCard";
import { examplePublicExperiences } from "@/lib/data/public-experiences";

export function PublicExperiencesList() {
  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {examplePublicExperiences.map((experience) => (
          <PublicExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
      <p className="mt-6 text-sm text-charcoal-600">
        Real experiences submitted with the petition are held privately and are not published yet. Only
        experiences whose authors agreed to public display will be shown, after review.
      </p>
    </div>
  );
}
