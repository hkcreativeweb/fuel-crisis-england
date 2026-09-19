import { getPetitionStats } from "@/lib/server/petition-store";
import { siteConfig } from "@/lib/site-config";
import { formatNumber } from "@/lib/utils";

export async function PetitionCounter({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const stats = getPetitionStats();
  const target = siteConfig.petitionTarget;
  const progress = Math.min(100, (stats.signatureCount / target) * 100);

  return (
    <div className={tone === "dark" ? "text-white" : "text-navy-900"}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-3xl font-extrabold tabular-nums sm:text-4xl">{formatNumber(stats.signatureCount)}</p>
        <p className={tone === "dark" ? "text-sm text-slate-400" : "text-sm text-charcoal-600"}>
          of {formatNumber(target)} target
        </p>
      </div>
      <div
        className={
          "mt-3 h-2.5 w-full overflow-hidden rounded-full " + (tone === "dark" ? "bg-white/10" : "bg-slate-200")
        }
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Petition progress toward target"
      >
        <div className="h-full rounded-full bg-petrol-500" style={{ width: `${progress}%` }} />
      </div>
      <p className={"mt-3 text-xs " + (tone === "dark" ? "text-slate-400" : "text-charcoal-600")}>
        Demo mode: this preview build has no persistent database. Figures reflect real submissions made
        during this server session only, reset on restart, and are labelled as examples until a production
        petition backend is connected.
      </p>
    </div>
  );
}
