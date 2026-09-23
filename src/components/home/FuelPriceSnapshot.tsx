import { getCurrentFuelPriceSnapshot } from "@/lib/data/desnz-weekly-prices";
import { Container } from "@/components/ui/Container";
import { StatCard } from "@/components/ui/StatCard";
import { DataStatusBadge } from "@/components/ui/DataStatusBadge";
import { Alert } from "@/components/ui/Alert";
import { formatDate, formatPencePerLitre } from "@/lib/utils";
import { LinkButton } from "@/components/ui/Button";

export async function FuelPriceSnapshot() {
  const snapshot = await getCurrentFuelPriceSnapshot();

  return (
    <section className="bg-navy-900 py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-petrol-300">Fuel price snapshot</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">England average pump prices</h2>
          </div>
          <DataStatusBadge status={snapshot ? snapshot.provenance.status : "unavailable"} />
        </div>

        {snapshot ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Average petrol" value={formatPencePerLitre(snapshot.petrolPencePerLitre)} caption="Price per litre" />
            <StatCard label="Average diesel" value={formatPencePerLitre(snapshot.dieselPencePerLitre)} caption="Price per litre" />
            <StatCard label="Date updated" value={snapshot.provenance.asOf ? formatDate(snapshot.provenance.asOf) : "—"} />
            <StatCard label="Data source" value={snapshot.provenance.source} />
          </div>
        ) : (
          <div className="mt-8">
            <Alert tone="info" title="Fuel price data is currently being connected.">
              Prices will be displayed once verified against a live, official data source. We do not
              show estimated or fabricated prices here.
            </Alert>
            <div className="mt-6">
              <LinkButton href="/fuel-prices" variant="outline-light">
                See the full fuel prices page
              </LinkButton>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
