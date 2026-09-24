import { getPetitionSignatureCount } from "@/lib/server/petition-store";
import { siteConfig } from "@/lib/site-config";
import { formatNumber } from "@/lib/utils";

export async function PetitionCounter({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const count = await getPetitionSignatureCount();
  const target = siteConfig.petitionTarget;
  const muted = tone === "dark" ? "text-slate-400" : "text-charcoal-600";

  if (count === null) {
    return (
      <p className={"text-sm " + muted}>
        The signature count is temporarily unavailable. We never show an estimated figure in its place.
      </p>
    );
  }

  const progress = Math.min(100, (count / target) * 100);

  return (
    <div className={tone === "dark" ? "text-white" : "text-navy-900"}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-3xl font-extrabold tabular-nums sm:text-4xl">
          {formatNumber(count)} <span className={"text-base font-semibold " + muted}>{count === 1 ? "signature" : "signatures"}</span>
        </p>
        <p className={"text-sm " + muted}>of {formatNumber(target)} target</p>
      </div>
      <div
        className={"mt-3 h-2.5 w-full overflow-hidden rounded-full " + (tone === "dark" ? "bg-white/10" : "bg-slate-200")}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Petition progress toward target"
      >
        <div className="h-full rounded-full bg-petrol-500" style={{ width: `${progress}%` }} />
      </div>
      <p className={"mt-3 text-xs " + muted}>
        Real signatures submitted through this site, one per email address. This is an FCE campaign
        petition, not an official UK Parliament petition.
      </p>
    </div>
  );
}
