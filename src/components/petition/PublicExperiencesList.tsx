import { PublicExperienceCard } from "@/components/petition/PublicExperienceCard";
import { examplePublicExperiences } from "@/lib/data/public-experiences";
import { getPetitionStats } from "@/lib/server/petition-store";

export function PublicExperiencesList() {
  const stats = getPetitionStats();

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {examplePublicExperiences.map((experience) => (
          <PublicExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>

      {stats.pendingModerationCount > 0 ? (
        <p className="mt-6 text-sm text-charcoal-600">
          {stats.pendingModerationCount} submission{stats.pendingModerationCount === 1 ? "" : "s"} from this
          session {stats.pendingModerationCount === 1 ? "is" : "are"} currently awaiting moderation and{" "}
          {stats.pendingModerationCount === 1 ? "is" : "are"} not yet shown publicly.
        </p>
      ) : null}
    </div>
  );
}
