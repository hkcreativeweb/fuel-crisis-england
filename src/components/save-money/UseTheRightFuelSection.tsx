const points = [
  "Use the fuel type specified for your vehicle — check the owner's manual or the sticker near the fuel filler cap.",
  "Follow the manufacturer's recommended fuel specification, including octane rating for petrol vehicles.",
  "Do not assume premium fuel automatically improves economy — in a vehicle not designed for it, a higher-octane fuel does not reliably improve fuel economy.",
  "Do not use unsuitable additives or fuels not specified for your vehicle.",
];

export function UseTheRightFuelSection() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <ul className="space-y-2.5">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm text-charcoal-700">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-petrol-500" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm leading-relaxed text-charcoal-700">
        For diesel vehicles, fuel specifications and additive compatibility matter — not every diesel fuel
        or additive is compatible with every diesel engine or emissions system, so check your handbook
        before using anything non-standard.
      </p>
    </div>
  );
}
