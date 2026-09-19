import { Alert } from "@/components/ui/Alert";

export function FuelAdditivesSection() {
  return (
    <div className="rounded border border-slate-200 bg-white p-6 sm:p-8">
      <p className="text-sm leading-relaxed text-charcoal-700">
        Some motorists use petrol or diesel fuel-system cleaners, injector cleaners, or other deposit-cleaning
        fuel additives. These products are generally marketed to clean or maintain parts of the fuel system
        or injectors. Whether a particular product provides a measurable fuel-economy benefit depends on the
        vehicle, the condition of the fuel system, the specific product, and individual circumstances.
      </p>

      <p className="mt-4 text-sm font-semibold leading-relaxed text-navy-900">
        Some fuel-system cleaning products may be useful for specific maintenance purposes, but dramatic
        fuel-economy claims should be treated cautiously.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-md bg-slate-50 p-4">
          <p className="text-sm font-bold text-navy-900">For petrol vehicles</p>
          <p className="mt-1.5 text-xs leading-relaxed text-charcoal-700">
            Products marketed as petrol fuel-system cleaners, injector cleaners, or deposit-cleaning
            additives are widely available. Check compatibility with your specific engine before use.
          </p>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <p className="text-sm font-bold text-navy-900">For diesel vehicles</p>
          <p className="mt-1.5 text-xs leading-relaxed text-charcoal-700">
            You may encounter products marketed as diesel injector cleaner, diesel fuel-system cleaner, or
            diesel fuel additive. Diesel fuel-system components and additive compatibility vary by vehicle,
            so this matters more than for petrol.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-bold text-navy-900">If you use one, we&apos;d suggest you:</p>
        <ul className="mt-2 space-y-1.5">
          {[
            "Check the owner's manual first",
            "Use products compatible with your specific engine",
            "Follow the dosage instructions",
            "Avoid mixing incompatible products",
            "Seek professional advice if there is an actual engine or fuel-system problem",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-charcoal-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-petrol-500" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-5 text-xs text-charcoal-600">
        Fuel additives do not replace servicing or repair — if your vehicle has a genuine fault, a garage
        diagnosis is the appropriate next step, not an additive.
      </p>

      <div className="mt-6">
        <Alert tone="warning" title={'Don’t believe every "save 20% fuel" claim.'}>
          Dramatic fuel-saving claims from aftermarket additives and devices should be treated cautiously.
          UK and EU consumer-protection bodies have repeatedly taken action against unsupported fuel-saving
          claims for aftermarket products over the years. We do not advertise or endorse any specific
          additive here. If we ever recommend one, we will only describe benefits supported by reliable
          evidence or the manufacturer&apos;s own documented intended use — never an unsupported percentage
          saving.
        </Alert>
      </div>
    </div>
  );
}
