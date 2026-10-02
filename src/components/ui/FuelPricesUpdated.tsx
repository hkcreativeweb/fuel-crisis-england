import { getCurrentFuelPrices } from "@/lib/data/current-fuel-prices";
import { cn, formatDate } from "@/lib/utils";

function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" }).format(new Date(iso));
}

/**
 * "Fuel prices updated" line used on every page that shows a current price.
 * Reads the single central price record, so the timestamp is identical
 * everywhere. Flags failed checks and figures older than one weekly cycle.
 */
export async function FuelPricesUpdated({ className }: { className?: string }) {
  const prices = await getCurrentFuelPrices();
  const checked = prices.lastSuccessfulUpdate ? formatDateTime(prices.lastSuccessfulUpdate) : null;
  const warn = prices.awaitingUpdate || prices.stale;

  return (
    <p className={cn("text-xs leading-relaxed", warn ? "text-amber-800" : "text-charcoal-600", className)}>
      <span className="font-semibold">Fuel prices updated:</span> {prices.weekLabel.replace(/^Week/, "week")}
      {checked ? ` · last successfully checked ${checked}` : ""}
      {" · "}
      <a href={prices.petrol.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
        {prices.petrol.source}
      </a>
      {prices.awaitingUpdate ? (
        <>
          {" "}
          <span className="font-semibold">Automatic update temporarily unavailable.</span> Showing the last verified figures{checked ? "" : ` (week of ${formatDate(prices.petrol.updatedAt)})`}.
        </>
      ) : prices.stale ? (
        <> These figures may be out of date.</>
      ) : null}
    </p>
  );
}
