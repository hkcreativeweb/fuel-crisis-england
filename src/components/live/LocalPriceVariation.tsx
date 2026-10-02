import { Alert } from "@/components/ui/Alert";

const link = "font-semibold text-petrol-600 underline underline-offset-2";

export function LocalPriceVariation() {
  return (
    <div className="space-y-6">
      <p className="max-w-3xl text-sm leading-relaxed text-charcoal-700">
        Two petrol stations, sometimes only a few miles apart, can charge noticeably different prices for the same fuel on the same day. No
        single factor explains every difference, and a higher price at one station does not automatically mean wrongdoing.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-bold text-navy-900">What the CMA has reported</h3>
          <ul className="mt-2 space-y-2 text-sm leading-relaxed text-charcoal-700">
            <li>Supermarkets have consistently lower average margins than non-supermarket retailers (see the margins data on the Why Is Fuel So Expensive? page).</li>
            <li>Individual retailers vary: two unnamed non-supermarket retailers raised prices well beyond the market average in June 2026.</li>
          </ul>
        </div>
        <div className="rounded border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-bold text-navy-900">Factors that can affect prices</h3>
          <ul className="mt-2 space-y-2 text-sm leading-relaxed text-charcoal-700">
            <li>Local competition: how many other stations are nearby.</li>
            <li>Site costs: motorway service areas and rural sites often have higher running costs.</li>
            <li>Purchasing scale: large chains can buy fuel more cheaply than independents.</li>
          </ul>
        </div>
      </div>

      <div className="rounded border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-sm font-bold text-navy-900">Fuel Finder</h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
          Fuel Finder is the UK&apos;s government-backed open-data scheme for reporting road-fuel prices. Retailers are required to report price
          changes, within 30 minutes, under the Motor Fuel Price (Open Data) Regulations 2025. The scheme has been operational since February 2026.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
          As of the CMA&apos;s August 2026 report, an estimated 97% of stations were registered, covering an estimated 99% of fuel sales volume. The
          CMA describes this as an indicative estimate, not an audited figure.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
          FCE links to the official scheme and guidance rather than presenting an unverified live station-price map of its own. Fuel Finder is not
          operated by Fuel Crisis England.
        </p>
        <p className="mt-3 text-xs text-charcoal-600">
          Sources:{" "}
          <a href="https://www.gov.uk/government/collections/fuel-finder" target="_blank" rel="noopener noreferrer" className={link}>
            GOV.UK: Fuel Finder
          </a>{" "}
          and{" "}
          <a href="https://www.gov.uk/government/publications/enhanced-road-fuel-monitoring-report-august-2026" target="_blank" rel="noopener noreferrer" className={link}>
            CMA Enhanced Road Fuel Monitoring report, August 2026
          </a>
        </p>
      </div>

      <Alert tone="info" title="A higher price is not automatically profiteering, and a lower price is not automatically better.">
        The CMA&apos;s own analysis of local and regional price variation, and how quickly it reflects fair competition versus other factors, is due in
        its next (Autumn 2026) report. We will update this page when it is published.
      </Alert>
    </div>
  );
}
