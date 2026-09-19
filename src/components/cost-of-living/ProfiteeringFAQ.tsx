import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { profiteeringFaqs } from "@/lib/data/profiteering-faq";
import { DataStatusBadge } from "@/components/ui/DataStatusBadge";

const definitions = [
  { term: "Excessive profit", meaning: "No single legal or economic definition — often used loosely to mean profit that seems disproportionate to risk, investment, or market conditions." },
  { term: "Profiteering", meaning: "Generally implies deliberately exploiting a crisis or shortage to charge more than is fair — a stronger claim that typically requires specific evidence of conduct, not just a profit figure." },
  { term: "Windfall profit", meaning: "An unexpected profit arising from external circumstances (e.g. a price spike) rather than a company's own decisions — the basis some governments have used for one-off windfall taxes." },
];

const evidenceItems = [
  { label: "Global profit & revenue", available: true, note: "See the corporate profits section above." },
  { label: "Margins (where available)", available: false, note: "UK-specific retail fuel margins are covered separately via CMA monitoring data, not company-wide margins." },
  { label: "Taxes paid", available: false, note: "Not yet verified against company tax disclosures or country-by-country reporting." },
  { label: "Dividends", available: false, note: "Not yet verified against company annual reports." },
  { label: "Share buybacks", available: false, note: "Not yet verified against company annual reports." },
  { label: "Investment", available: false, note: "Not yet verified against company capital expenditure disclosures." },
  { label: "Production", available: false, note: "Not yet verified against company production data." },
  { label: "UK-specific information", available: false, note: "Most disclosures from these companies are global, not broken out by UK operations." },
];

export function ProfiteeringFAQ() {
  return (
    <div>
      <div className="rounded-2xl border border-slate-200 p-6">
        <h3 className="text-base font-bold text-navy-900">These words don&apos;t all mean the same thing</h3>
        <dl className="mt-4 space-y-3">
          {definitions.map((d) => (
            <div key={d.term}>
              <dt className="text-sm font-bold text-navy-900">{d.term}</dt>
              <dd className="mt-0.5 text-sm leading-relaxed text-charcoal-700">{d.meaning}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 p-6">
        <h3 className="text-base font-bold text-navy-900">The evidence, honestly labelled</h3>
        <ul className="mt-4 divide-y divide-slate-100">
          {evidenceItems.map((item) => (
            <li key={item.label} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
              <span className="text-sm font-medium text-navy-900">{item.label}</span>
              <span className="flex items-center gap-2">
                <DataStatusBadge status={item.available ? "live" : "unavailable"} />
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-charcoal-600">
          Where a figure isn&apos;t yet verified, we don&apos;t estimate it — we show that gap honestly so
          you know what evidence is and isn&apos;t behind a conclusion.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h3 className="text-base font-bold text-navy-900">The limits of comparing global companies to UK prices</h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
          Shell, BP, ExxonMobil, Chevron and TotalEnergies are global businesses whose profit reflects
          production, refining, trading and retail activity worldwide — not specifically what happens at
          a UK forecourt. A high global profit figure is not, by itself, evidence about UK pump pricing
          specifically; UK-specific evidence (like CMA retail margin monitoring) is a separate, narrower
          data source better suited to that question.
        </p>
      </div>

      <div className="mt-6">
        <FAQAccordion items={profiteeringFaqs} />
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-base font-bold text-navy-900">Relevant investigations and regulatory findings</h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
          The Competition and Markets Authority has carried out monitoring and studies of the UK road fuel
          market, including retailer margins and regional pricing. We link to the regulator directly rather
          than summarising specific findings we haven&apos;t independently verified.
        </p>
        <a
          href="https://www.gov.uk/government/organisations/competition-and-markets-authority"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-petrol-600 underline underline-offset-2"
        >
          Search CMA road fuel market findings <span aria-hidden="true">&rarr;</span>
        </a>
        <p className="mt-4 text-sm font-semibold text-navy-900">
          We deliberately don&apos;t draw a conclusion for you here — read the evidence and decide for
          yourself.
        </p>
      </div>
    </div>
  );
}
