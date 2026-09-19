import type { FuelType } from "@/lib/types";
import { formatPencePerLitre } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function FuelPriceCard({
  fuel,
  pencePerLitre,
}: {
  fuel: FuelType;
  pencePerLitre: number | null;
}) {
  return (
    <div className="rounded border border-slate-200 bg-white p-6">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "h-2.5 w-2.5 rounded-full",
            fuel === "petrol" ? "bg-petrol-500" : "bg-navy-900"
          )}
        />
        <p className="text-sm font-semibold uppercase tracking-wide text-charcoal-600">
          {fuel === "petrol" ? "Petrol (unleaded)" : "Diesel"}
        </p>
      </div>
      <p className="mt-3 text-4xl font-extrabold tabular-nums text-navy-900">
        {pencePerLitre !== null ? formatPencePerLitre(pencePerLitre) : "—"}
      </p>
      <p className="mt-1 text-sm text-charcoal-600">per litre</p>
    </div>
  );
}
