import { dataSources } from "@/lib/data/yearly-snapshots";

export function DataSourcePanel() {
  const entries = Object.values(dataSources);
  return (
    <div className="divide-y divide-slate-200 border-t border-slate-200">
      {entries.map((entry) => (
        <div key={entry.category} className="grid gap-1 py-5 sm:grid-cols-[1fr_2fr] sm:items-baseline sm:gap-6">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-charcoal-500">{entry.category}</p>
          <div>
            <p className="text-sm font-semibold text-navy-900">{entry.name}</p>
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-1 inline-flex items-center gap-1 text-xs font-semibold text-petrol-600 hover:text-petrol-700"
            >
              View original source
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      ))}
      <p className="pt-5 text-xs leading-relaxed text-charcoal-500">
        Every important figure on this page has a source, an effective period or date, and a unit shown
        alongside it. Where a figure could not be verified against one of these sources, we show
        &quot;DATA NOT AVAILABLE&quot; rather than an estimate.
      </p>
    </div>
  );
}
