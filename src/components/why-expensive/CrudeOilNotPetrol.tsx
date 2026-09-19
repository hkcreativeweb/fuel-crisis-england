const steps = ["Crude oil", "Refinery", "Petrol / Diesel", "Wholesale market", "Forecourt"];

export function CrudeOilNotPetrol() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-xl border border-petrol-200 bg-petrol-50 px-5 py-3 text-center text-sm font-bold text-navy-900 sm:w-40">
              {step}
            </div>
            {i < steps.length - 1 ? (
              <span aria-hidden="true" className="rotate-90 text-xl font-bold text-petrol-500 sm:rotate-0">
                &rarr;
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm leading-relaxed text-charcoal-700">
        The price of crude oil and the price of refined petrol or diesel are related but are{" "}
        <strong>not identical</strong>. Refining turns crude oil into usable fuels, and refining margins
        — the cost and profit associated with that conversion — can change independently of the crude
        oil price, depending on global refinery capacity, maintenance schedules, and demand for specific
        fuel types. This is one reason why a fall in crude oil prices does not necessarily mean pump
        prices fall immediately, or by the same amount.
      </p>
    </div>
  );
}
