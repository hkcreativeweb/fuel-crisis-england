import { StatusBadge } from "@/components/ui/StatusBadge";
import { Alert } from "@/components/ui/Alert";

export function LocalPriceVariation() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status="live" showDetail />
        <p className="text-xs font-semibold text-charcoal-600">Fuel Finder scheme operational since February 2026</p>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-charcoal-700">
        Two petrol stations, sometimes only a few miles apart, can charge noticeably different prices for
        the same fuel on the same day. The CMA has confirmed one clear factor:{" "}
        <strong>non-supermarket retailers are consistently more expensive than supermarket retailers</strong>{" "}
        — but that is not the whole picture, and a higher price at one station does not automatically mean
        wrongdoing.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-navy-900">What the CMA has confirmed</p>
          <ul className="mt-2 space-y-2 text-sm text-charcoal-700">
            <li>Supermarkets have consistently lower average margins than non-supermarkets (see margins table above).</li>
            <li>Individual retailers vary — two unnamed non-supermarket retailers raised prices well beyond the market average in June 2026.</li>
          </ul>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-navy-900">Factors regulators say can matter</p>
          <ul className="mt-2 space-y-2 text-sm text-charcoal-700">
            <li>Local competition — how many other stations are nearby.</li>
            <li>Site costs — motorway service areas and rural sites often have higher running costs.</li>
            <li>Purchasing scale — large chains can buy fuel more cheaply than independents.</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-navy-900">Fuel Finder — the official open data scheme</p>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
          Under the Motor Fuel Price (Open Data) Regulations 2025, UK fuel retailers must report price
          changes within 30 minutes to <strong>Fuel Finder</strong>, a government open-data scheme (policy
          set by the Department for Energy Security and Net Zero; data aggregated by an appointed operator;
          enforced by the CMA). As of the CMA&apos;s August 2026 report, an estimated 97% of stations were
          registered, covering an estimated 99% of fuel sales volume — the CMA describes this as an
          indicative estimate, not an audited figure.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
          Fuel Finder is an open-data feed, not a public map of its own — the government&apos;s own guidance
          says drivers can find the information &ldquo;on participating third party apps and websites.&rdquo;
          We link to the official scheme rather than building our own live price map, since we do not have
          a verified live data feed to draw on.
        </p>
        <p className="mt-3 text-xs text-charcoal-600">
          Source:{" "}
          <a href="https://www.gov.uk/government/collections/fuel-finder" target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-600 underline underline-offset-2">
            GOV.UK — Fuel Finder
          </a>
          {" "}and{" "}
          <a href="https://www.gov.uk/government/publications/enhanced-road-fuel-monitoring-report-august-2026" target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-600 underline underline-offset-2">
            CMA Enhanced Road Fuel Monitoring report, August 2026
          </a>
        </p>
      </div>

      <div className="mt-6">
        <Alert tone="info" title="A higher price is not automatically profiteering — and a lower price is not automatically better.">
          The CMA&apos;s own analysis of local and regional price variation, and how quickly it reflects fair
          competition versus other factors, is due in its next (Autumn 2026) report. We will update this
          page when it is published.
        </Alert>
      </div>
    </div>
  );
}
