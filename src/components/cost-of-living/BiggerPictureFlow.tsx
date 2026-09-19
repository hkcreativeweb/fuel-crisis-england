const steps = [
  "Fuel prices",
  "Commuting & transport costs",
  "Household disposable income",
  "Food & everyday spending",
  "Housing / mortgage costs",
  "Interest rates",
  "Business costs",
  "Prices paid by consumers",
];

export function BiggerPictureFlow() {
  return (
    <div className="rounded border border-white/10 bg-white/5 p-6 sm:p-8">
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2 sm:flex-col sm:gap-2">
            <div className="flex-1 rounded-md border border-petrol-500/40 bg-navy-900/60 px-4 py-3 text-center text-sm font-semibold text-white sm:w-40">
              {step}
            </div>
            {i < steps.length - 1 ? (
              <span aria-hidden="true" className="shrink-0 text-petrol-400 sm:rotate-90">
                &rarr;
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm leading-relaxed text-slate-300">
        These relationships are complex, run in more than one direction, and interact with many other
        factors beyond fuel prices. We present the evidence and the connections between these costs rather
        than claiming any single cause explains everything.
      </p>
    </div>
  );
}
