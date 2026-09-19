const VERIFIED_RATE = 1.3353; // £1 = $X, Bank of England, 17 September 2026
const BASE_OIL_PRICE_USD = 75; // illustrative, round figure — not a real quoted price

const scenarios = [
  { label: "Weaker pound", rate: 1.2 },
  { label: "Current verified rate", rate: VERIFIED_RATE },
  { label: "Stronger pound", rate: 1.5 },
];

export function ExchangeRateExample() {
  return (
    <div className="rounded border border-slate-200 bg-white p-6 sm:p-8">
      <div className="rounded-md bg-amber-50 p-3 text-center text-xs font-bold uppercase tracking-wide text-amber-900 ring-1 ring-amber-600/20">
        Illustrative example — not a forecast
      </div>

      <p className="mt-4 text-sm leading-relaxed text-charcoal-700">
        Say a barrel of crude oil costs a round <strong>$75</strong> (a simplified illustrative figure, not
        a live quote). The table below shows how the sterling cost changes purely because of the exchange
        rate — even though the dollar price hasn&apos;t moved at all.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {scenarios.map((s) => (
          <div key={s.label} className={`rounded-md p-4 text-center ${s.rate === VERIFIED_RATE ? "bg-petrol-50" : "bg-slate-50"}`}>
            <p className={`text-xs font-semibold ${s.rate === VERIFIED_RATE ? "text-petrol-700" : "text-charcoal-600"}`}>{s.label}</p>
            <p className="mt-1 text-xs text-charcoal-600">£1 = ${s.rate.toFixed(4)}</p>
            <p className={`mt-2 text-2xl font-extrabold tabular-nums ${s.rate === VERIFIED_RATE ? "text-petrol-700" : "text-navy-900"}`}>
              £{(BASE_OIL_PRICE_USD / s.rate).toFixed(2)}
            </p>
            <p className="text-xs text-charcoal-600">for the same $75 barrel</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-charcoal-700">
        Current verified rate: £1 = ${VERIFIED_RATE} (Bank of England, spot rate, 17 September 2026).
        Because crude oil and many petroleum products are traded internationally in US dollars, a weaker
        pound makes the same dollar-priced oil more expensive in sterling terms, and a stronger pound
        makes it cheaper — independent of any change in the oil price itself.
      </p>
    </div>
  );
}
