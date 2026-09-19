import { fuelDutyReceiptsFullYear, fuelDutyReceiptsPartYear, fuelDutyReceiptsQuarter } from "@/lib/data/hmrc-receipts";
import { StatCard } from "@/components/ui/StatCard";
import { Alert } from "@/components/ui/Alert";
import { formatDate } from "@/lib/utils";

export function GovernmentCollectsDashboard() {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          tone="light"
          label="Fuel Duty — full financial year"
          value={`£${fuelDutyReceiptsFullYear.amountGBP}bn`}
          caption={`${fuelDutyReceiptsFullYear.periodLabel} · as of ${formatDate(fuelDutyReceiptsFullYear.asOf!)}`}
        />
        <StatCard
          tone="light"
          label="Fuel Duty — year to date"
          value={`£${fuelDutyReceiptsPartYear.amountGBP}bn`}
          caption={`${fuelDutyReceiptsPartYear.periodLabel} · as of ${formatDate(fuelDutyReceiptsPartYear.asOf!)}`}
        />
        <StatCard
          tone="light"
          label="Fuel Duty — latest quarter"
          value={`£${(fuelDutyReceiptsQuarter.totalGBPMillion / 1000).toFixed(2)}bn`}
          caption={`${fuelDutyReceiptsQuarter.periodLabel} · petrol £${(fuelDutyReceiptsQuarter.petrolGBPMillion / 1000).toFixed(2)}bn, diesel £${(fuelDutyReceiptsQuarter.dieselGBPMillion / 1000).toFixed(2)}bn`}
        />
        <StatCard tone="light" label="VAT on fuel" value="Not separately published" caption="HMRC does not publish a fuel-specific VAT receipts figure" />
        <StatCard tone="light" label="Total fuel-related tax" value="Not calculated" caption="Only shown once components are genuinely comparable — see note below" />
      </div>

      <div className="mt-6 space-y-4">
        <Alert tone="info" title="Where an amount is estimated rather than directly reported, it is labelled as an estimate.">
          Figures shown here are based on published government statistics. HMRC publishes Fuel Duty
          receipts directly, but does not separately break out how much VAT revenue comes specifically
          from fuel purchases (VAT is reported by sector/return type, not by product). We do not
          fabricate a fuel-specific VAT total, and we do not add Fuel Duty to an unverified VAT estimate
          to produce a combined &quot;total fuel tax&quot; figure.
        </Alert>
        <p className="text-xs text-charcoal-600">
          The full-year and year-to-date Fuel Duty figures come from two different HMRC publications with
          different cut-off dates — they are not directly comparable to each other and are shown
          separately for that reason.
        </p>
      </div>
    </div>
  );
}
