import { yearlySnapshots } from "@/lib/data/yearly-snapshots";

const now = yearlySnapshots["2026"];

export function TaxTransparentCalc() {
  const pumpPrice = now.petrolPencePerLitre!;
  const duty = now.fuelDutyPencePerLitre!;
  const vatRate = now.vatRatePercent! / 100;
  const vatPence = pumpPrice - pumpPrice / (1 + vatRate);
  const remaining = pumpPrice - duty - vatPence;

  const rows = [
    { label: "Pump price", value: pumpPrice, op: null },
    { label: "Fuel Duty", value: duty, op: "−" },
    { label: "VAT", value: vatPence, op: "−" },
    { label: "Remaining pre-tax amount", value: remaining, op: "=" },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">Fuel Duty</p>
          <p className="mt-1 text-2xl font-extrabold tabular-nums text-navy-900">{duty.toFixed(2)}p per litre</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">VAT</p>
          <p className="mt-1 text-2xl font-extrabold tabular-nums text-navy-900">{(vatRate * 100).toFixed(0)}%</p>
        </div>
      </div>

      <div className="mt-6 divide-y divide-slate-100 rounded-2xl border border-slate-200">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between px-5 py-3">
            <span className="flex items-center gap-2 text-sm font-medium text-charcoal-700">
              {row.op ? <span className="font-extrabold text-petrol-500">{row.op}</span> : null}
              {row.label}
            </span>
            <span className="font-extrabold tabular-nums text-navy-900">{row.value.toFixed(1)}p</span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-charcoal-700">
        That remaining <strong>{remaining.toFixed(1)}p</strong> is not automatically &quot;oil company
        profit&quot;. It covers wholesale fuel costs, refining, distribution, and the retailer&apos;s
        operating costs and margin, combined — we do not have a further verified split of that remainder,
        so we don&apos;t pretend otherwise.
      </p>
    </div>
  );
}
