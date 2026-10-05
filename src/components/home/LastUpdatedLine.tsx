import { getCurrentFuelPrices } from "@/lib/data/current-fuel-prices";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const londonDate = (iso: string) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/London" }).format(new Date(iso));

/**
 * A quiet "Last updated" line for the top of the homepage. It reads the same central price record as the
 * "Fuel prices updated" line further down (the last successful automatic check), so the two never disagree.
 */
export async function LastUpdatedLine({ className }: { className?: string }) {
  const prices = await getCurrentFuelPrices();
  const date = prices.lastSuccessfulUpdate ? londonDate(prices.lastSuccessfulUpdate) : formatDate(prices.petrol.updatedAt);
  return (
    <p className={cn("text-xs text-charcoal-600", className)}>
      Last updated: <time dateTime={(prices.lastSuccessfulUpdate ?? prices.petrol.updatedAt).slice(0, 10)}>{date}</time>
    </p>
  );
}
