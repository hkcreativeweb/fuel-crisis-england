import { budget2026 } from "@/lib/data/fuel-duty-timeline";
import { formatDate, cn } from "@/lib/utils";

/** Says where Budget 2026 stands, so scheduled Fuel Duty rates are never read as final. Driven by the `budget2026` record. */
export function BudgetNote({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const link = tone === "dark" ? "text-white" : "text-petrol-600";
  return (
    <p className={cn("text-xs leading-relaxed", tone === "dark" ? "text-slate-300" : "text-charcoal-600", className)}>
      {budget2026.held
        ? `Budget 2026 took place on ${formatDate(budget2026.date)}. Check the published decision before relying on the rates above.`
        : `Budget 2026 is scheduled for ${formatDate(budget2026.date)}. It has not yet taken place, so the future rates shown are scheduled, not final.`}{" "}
      Sources:{" "}
      <a href={budget2026.sourceUrl} target="_blank" rel="noopener noreferrer" className={cn("inline-flex min-h-8 items-center font-semibold underline underline-offset-2", link)}>
        HM Treasury<span className="sr-only"> (opens in a new tab)</span>
      </a>
      ,{" "}
      <a href={budget2026.ratesSourceUrl} target="_blank" rel="noopener noreferrer" className={cn("inline-flex min-h-8 items-center font-semibold underline underline-offset-2", link)}>
        GOV.UK rates<span className="sr-only"> (opens in a new tab)</span>
      </a>
      . Checked {formatDate(budget2026.checked)}.
    </p>
  );
}
