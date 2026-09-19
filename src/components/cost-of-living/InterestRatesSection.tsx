import { ChartCard } from "@/components/charts/ChartCard";
import { bankRateSeries } from "@/lib/data/economic-series";
import { Alert } from "@/components/ui/Alert";

const explainers = [
  { title: "Bank Rate", body: "The interest rate set by the Bank of England, which influences most other interest rates in the UK economy." },
  { title: "Mortgage costs", body: "Many mortgages track or are influenced by Bank Rate, so changes can directly affect monthly mortgage payments, particularly for tracker and new fixed-rate deals." },
  { title: "Borrowing costs", body: "Loans, credit cards, and other borrowing tend to become more expensive when Bank Rate rises, and cheaper when it falls." },
  { title: "Credit costs", body: "The cost of using credit — including overdrafts and store finance — is influenced by the wider interest rate environment." },
  { title: "Savings rates", body: "Higher Bank Rate can mean better returns on savings accounts, though banks don't always pass on the full change immediately." },
  { title: "Business borrowing", body: "Businesses financing stock, equipment, or expansion face higher or lower borrowing costs as rates move, which can feed into prices they charge." },
];

export function InterestRatesSection() {
  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {explainers.map((item) => (
          <div key={item.title} className="rounded border border-slate-200 p-6">
            <h3 className="text-base font-bold text-navy-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{item.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Alert tone="info" title="Higher interest rates cut both ways.">
          Higher interest rates can increase costs for borrowers — including mortgage holders and
          businesses — even as they can benefit savers through better returns. The relationship between
          interest rates and inflation is a tool used by the Bank of England to try to keep inflation near
          its target; we do not make political claims about why any particular rate decision was made.
        </Alert>
      </div>

      <div className="mt-6">
        <ChartCard
          title="Bank of England Bank Rate over time"
          description="Historical Bank Rate, sourced from the Bank of England."
          series={[bankRateSeries]}
        />
      </div>
    </div>
  );
}
