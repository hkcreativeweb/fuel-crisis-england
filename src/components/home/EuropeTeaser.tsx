import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { europeFuelPrices, europeFuelPriceSource, eu27AveragePetrolEUR, eu27AverageDieselEUR } from "@/lib/data/europe-fuel-prices";
import { formatDate } from "@/lib/utils";

const uk = europeFuelPrices.find((c) => c.isUK)!;

const eur = (n: number) => `€${n.toFixed(2)}`;

/** A compact UK-versus-EU-27 comparison, linking to the full country-by-country page. */
export function EuropeTeaser() {
  const rows = [
    { fuel: "Petrol", uk: uk.petrol.totalEUR, eu: eu27AveragePetrolEUR },
    { fuel: "Diesel", uk: uk.diesel.totalEUR, eu: eu27AverageDieselEUR },
  ];
  return (
    <section id="europe" className="scroll-mt-24 border-b border-slate-200 bg-white py-10 sm:py-16">
      <Container>
        <SectionHeading eyebrow="Europe" title="How the UK compares" description="UK pump prices against the EU-27 average, both shown in euros per litre, taxes included." />
        <div className="mt-6 max-w-2xl overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">UK and EU-27 average petrol and diesel prices in euros per litre</caption>
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-charcoal-600">
              <tr>
                <th scope="col" className="px-4 py-3">Fuel</th>
                <th scope="col" className="px-4 py-3">UK</th>
                <th scope="col" className="px-4 py-3">EU-27 average</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={r.fuel}>
                  <th scope="row" className="px-4 py-3 font-semibold text-navy-900">{r.fuel}</th>
                  <td className="px-4 py-3 text-lg font-extrabold tabular-nums text-navy-900">{eur(r.uk)}</td>
                  <td className="px-4 py-3 text-lg font-extrabold tabular-nums text-charcoal-700">{eur(r.eu)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-charcoal-600">
          <StatusBadge status="latest-available" />
          <span>
            Week of {formatDate(europeFuelPriceSource.dataDate)}. Source: {europeFuelPriceSource.name}. Different taxes and currencies apply, so check the method before drawing conclusions.
          </span>
        </div>
        <div className="mt-6">
          <LinkButton href="/europe-compared" variant="secondary" className="min-h-12">
            Compare every country <span aria-hidden="true">→</span>
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
