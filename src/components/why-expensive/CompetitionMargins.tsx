import { cmaMarginPoints, cmaMarginSource, cmaPassThroughFindings } from "@/lib/data/cma-margins";
import { Alert } from "@/components/ui/Alert";

export function CompetitionMargins() {
  return (
    <div className="rounded border border-slate-200 bg-white p-6 sm:p-8">
      <p className="text-sm leading-relaxed text-charcoal-700">
        The difference between the wholesale price and the retail price is{" "}
        <strong>not automatically the retailer&apos;s profit</strong>. It covers running costs including
        staff, business rates, card processing fees, and site maintenance, as well as any profit margin.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-charcoal-600">
              <th scope="col" className="py-2 pr-4">Period</th>
              <th scope="col" className="py-2 pr-4">All retailers</th>
              <th scope="col" className="py-2 pr-4">Supermarkets</th>
              <th scope="col" className="py-2">Non-supermarkets</th>
            </tr>
          </thead>
          <tbody>
            {cmaMarginPoints.map((p) => (
              <tr key={p.period} className="border-b border-slate-100 last:border-0 align-top">
                <td className="py-2.5 pr-4 font-semibold text-navy-900">{p.period}</td>
                <td className="py-2.5 pr-4 tabular-nums text-charcoal-700">{p.allRetailersPencePerLitre !== null ? `${p.allRetailersPencePerLitre}p` : "Data not available"}</td>
                <td className="py-2.5 pr-4 tabular-nums text-charcoal-700">{p.supermarketsPencePerLitre !== null ? `${p.supermarketsPencePerLitre}p` : "Data not available"}</td>
                <td className="py-2.5 tabular-nums text-charcoal-700">{p.nonSupermarketsPencePerLitre !== null ? `${p.nonSupermarketsPencePerLitre}p` : "Data not available"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-charcoal-600">
        Margins are averaged across 11 retailers covering roughly 40% of UK stations and 60% of fuel sales
        volume, and are not split by fuel type in the source report.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-md bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">Petrol: May to June 2026</p>
          <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{cmaPassThroughFindings.petrol}</p>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">Diesel: May to June 2026</p>
          <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{cmaPassThroughFindings.diesel}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-charcoal-700">{cmaPassThroughFindings.cmaConcern}</p>
      <p className="mt-2 text-xs italic text-charcoal-600">{cmaPassThroughFindings.nextReport}</p>

      <p className="mt-4 text-xs text-charcoal-600">
        Source:{" "}
        <a href={cmaMarginSource.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-600 underline underline-offset-2">
          {cmaMarginSource.name}
        </a>
        , published {cmaMarginSource.publicationDate}, data to {cmaMarginSource.dataAsOf}.
      </p>

      <div className="mt-6">
        <Alert tone="info" title="Where the CMA has investigated, we link directly to its findings.">
          The Competition and Markets Authority carries out ongoing monitoring of the UK road fuel market,
          including retailer margins and regional pricing. We link to the regulator directly and quote its
          own wording rather than characterising findings beyond what it has published. A more detailed
          assessment of local price variation is due in the CMA&apos;s next (Autumn 2026) report.
        </Alert>
      </div>
    </div>
  );
}
