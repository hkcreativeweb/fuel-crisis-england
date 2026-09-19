import { companies, latestCompanyFinancials } from "@/lib/data/company-financials";
import { CorporateProfitCard } from "@/components/cost-of-living/CorporateProfitCard";
import { Alert } from "@/components/ui/Alert";
import { ContentTag } from "@/components/ui/ContentTag";

export function CorporateProfitsGrid() {
  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <CorporateProfitCard key={company.slug} company={company} year={latestCompanyFinancials[company.slug]} />
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <Alert tone="success" title="Every figure above is verified and sourced.">
          Each card cites the company&apos;s own SEC filing or press release directly. Any company or year
          we cannot verify shows &quot;Not yet verified&quot; rather than a guessed number.
        </Alert>
        <div className="flex items-start gap-3 rounded-md bg-slate-50 p-4">
          <ContentTag type="economic-analysis" className="mt-0.5 shrink-0" />
          <p className="text-xs leading-relaxed text-charcoal-600">
            All five companies report in US dollars. Figures above are converted to pounds sterling at
            £1&nbsp;=&nbsp;$1.3353 (Bank of England, spot rate, 17 September 2026), a single current
            exchange rate applied to each company&apos;s most recent full-year results, so these are
            approximate GBP equivalents rather than a rate fixed by the companies themselves.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded border border-amber-200 bg-amber-50 p-6">
        <ContentTag type="economic-analysis" />
        <h3 className="mt-3 text-base font-bold text-navy-900">Corporate profit is not the same as UK forecourt profit</h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
          These companies report <strong>global</strong>, group-wide results across oil production, natural
          gas, LNG, refining, chemicals, trading, retail, and renewable energy businesses, most of which
          has nothing to do with what a UK driver pays at a specific forecourt. A large global profit figure
          does not tell you how much profit was made on a single litre of fuel sold in England, and should
          not be read as if it does.
        </p>
      </div>

      <div className="mt-6 rounded border-2 border-navy-900 bg-navy-950 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-petrol-300">The question this data can&apos;t answer</p>
        <h3 className="mt-3 text-lg font-bold text-white">How much of that is UK petrol?</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          None of these companies separately publish how much profit they make specifically from selling
          petrol and diesel at UK forecourts. Fuel retail is a small part of a much larger global business,
          often reported (if at all) only as part of a combined &quot;marketing&quot; or &quot;retail&quot;
          segment covering many countries and products.
        </p>
        <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-white">
          DATA NOT AVAILABLE
        </p>
        <p className="mt-3 text-xs text-slate-400">
          We do not estimate or invent this figure. If a company publishes a genuine UK-specific fuel-retail
          profit figure in the future, we will add it here with a direct source.
        </p>
      </div>
    </div>
  );
}
