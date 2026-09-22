import { policyControlAreas } from "@/lib/data/policy-control-areas";

export function GovernmentCouldSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {policyControlAreas.map((area) => (
        <div key={area.title} className="rounded border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-navy-900">{area.title}</h3>
          <p className="mt-3 text-sm text-charcoal-700">{area.whatItIs}</p>
          <details className="group mt-4">
            <summary className="cursor-pointer list-none text-sm font-semibold text-petrol-600">
              <span className="group-open:hidden">Who controls it, history &amp; current policy →</span>
              <span className="hidden group-open:inline">Hide detail</span>
            </summary>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="font-semibold text-charcoal-600">Who controls it</dt>
                <dd className="mt-0.5 text-charcoal-700">{area.whoControlsIt}</dd>
              </div>
              <div>
                <dt className="font-semibold text-charcoal-600">What has happened historically</dt>
                <dd className="mt-0.5 text-charcoal-700">{area.whatHasHappened}</dd>
              </div>
              <div>
                <dt className="font-semibold text-charcoal-600">Current policy</dt>
                <dd className="mt-0.5 text-charcoal-700">{area.currentPolicy}</dd>
              </div>
            </dl>
          </details>
          {area.sourceUrl ? (
            <a
              href={area.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-xs font-semibold text-petrol-600 underline underline-offset-2"
            >
              Source: {area.source}
            </a>
          ) : (
            <p className="mt-4 text-xs text-charcoal-600">Source: {area.source}</p>
          )}
        </div>
      ))}
    </div>
  );
}
