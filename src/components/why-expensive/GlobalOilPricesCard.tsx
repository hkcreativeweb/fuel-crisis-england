const influences = [
  "Worldwide supply and demand",
  "OPEC+ production decisions",
  "Geopolitical events",
  "Wars and conflicts",
  "Sanctions",
  "Refinery disruptions",
  "Inventories",
  "Changes in global economic activity",
  "Expectations about future supply and demand",
];

export function GlobalOilPricesCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="text-base font-bold text-navy-900">Global oil prices</h3>
      <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
        The UK does not control the global price of crude oil. Global prices can be influenced by many
        factors at once — no single event explains every price movement.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {influences.map((item) => (
          <li key={item} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-charcoal-700">
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-charcoal-600">
        Sources on global oil markets: the International Energy Agency (IEA), the U.S. Energy Information
        Administration (EIA), and UK government sources.
      </p>
    </div>
  );
}
