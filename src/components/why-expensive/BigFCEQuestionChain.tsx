const chain = [
  { label: "Global markets", detail: "Oil and refined fuel prices" },
  { label: "Currency", detail: "£/$ exchange rates" },
  { label: "Refining", detail: "Processing and refining markets" },
  { label: "Wholesale", detail: "Fuel supply and distribution" },
  { label: "Retail", detail: "Forecourt costs and margins" },
  { label: "Government", detail: "Fuel Duty + VAT" },
  { label: "Motorist", detail: "The price at the pump" },
];

export function BigFCEQuestionChain() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
      <div className="flex flex-col items-stretch gap-2">
        {chain.map((step, i) => (
          <div key={step.label}>
            <div className="flex items-center justify-between rounded-xl border border-petrol-500/30 bg-navy-900/60 px-5 py-3">
              <span className="text-sm font-bold text-white">{step.label}</span>
              <span className="text-xs text-slate-400">{step.detail}</span>
            </div>
            {i < chain.length - 1 ? (
              <div className="flex justify-center py-1">
                <span aria-hidden="true" className="text-lg font-bold text-petrol-400">
                  &darr;
                </span>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-8 max-w-2xl space-y-3 text-sm leading-relaxed text-slate-300">
        <p>No single factor determines the price of fuel. But every part of the chain can be examined.</p>
        <p>
          And where Government has direct influence — particularly taxation — citizens can reasonably ask
          what policy choices are being made.
        </p>
        <p>
          Where companies operate within the market, citizens can also ask questions about competition,
          transparency, margins and profits.
        </p>
      </div>
    </div>
  );
}
