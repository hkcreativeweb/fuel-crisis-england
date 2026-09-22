import { ukFuelPetitions } from "@/lib/data/uk-petitions";
import { PetitionCard } from "@/components/have-your-say/PetitionCard";
import { formatDate } from "@/lib/utils";

/**
 * Signature counts and closing dates are a manually-verified snapshot (see
 * uk-petitions.ts), not a live feed — Fuel Crisis England has no
 * affiliation with, and does not collect signatures on behalf of,
 * Parliament. Signing always happens on the official site.
 */
export function PetitionsSection() {
  if (ukFuelPetitions.length === 0) return null;

  const mostRecentCheck = ukFuelPetitions.reduce((latest, p) => (p.verifiedOnIso > latest ? p.verifiedOnIso : latest), ukFuelPetitions[0].verifiedOnIso);

  return (
    <div>
      <h3 className="text-xl font-extrabold text-navy-900 sm:text-2xl">UK Parliament Petitions</h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-charcoal-700 sm:text-base">
        Support or view current petitions relating to fuel prices and taxation. Signing takes place directly on the
        official UK Parliament website.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {ukFuelPetitions.map((petition) => (
          <PetitionCard key={petition.id} petition={petition} />
        ))}
      </div>

      <p className="mt-4 text-xs text-charcoal-400">
        Signature counts and closing dates checked against petition.parliament.uk as of {formatDate(mostRecentCheck)}{" "}
        and may have changed since. Fuel Crisis England is not affiliated with or endorsed by the UK Parliament.
      </p>
    </div>
  );
}
