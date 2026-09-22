import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { formatNumber, formatDate } from "@/lib/utils";
import type { UkPetition } from "@/lib/data/uk-petitions";

export function PetitionCard({ petition }: { petition: UkPetition }) {
  return (
    <Card className="flex flex-col">
      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-petrol-600">UK Parliament Petition</p>
      <h3 className="mt-2 text-lg font-extrabold leading-snug text-navy-900">{petition.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{petition.summary}</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-charcoal-500">
        <span className="tabular-nums">{formatNumber(petition.signatureCount)} signatures</span>
        <span aria-hidden="true">&middot;</span>
        <span>Closes {formatDate(petition.closingDateIso)}</span>
      </div>

      <div className="mt-5">
        <LinkButton href={petition.url} size="md">
          Sign Petition →
        </LinkButton>
      </div>

      <p className="mt-4 text-[11px] text-charcoal-400">Hosted by the UK Parliament</p>
    </Card>
  );
}
