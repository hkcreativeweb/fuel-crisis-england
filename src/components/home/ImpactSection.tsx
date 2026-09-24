import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { impactGroups } from "@/lib/data/impact-groups";
import { imageCredits } from "@/lib/data/image-credits";

const credit = imageCredits["commute-traffic"];

const chain = [
  "Higher fuel costs",
  "Higher transport and delivery costs",
  "Higher business running costs",
  "Pressure on prices and household budgets",
];

export function ImpactSection() {
  const preview = impactGroups.slice(0, 4);
  return (
    <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20">
      <div className="absolute inset-0">
        <Image src={credit.src} alt={credit.alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-navy-950/85" />
      </div>
      <Container className="relative">
        <SectionHeading
          tone="dark"
          eyebrow="The same price doesn't affect everyone equally"
          title="The pump isn't where the cost ends"
          description="Fuel affects the journeys people make, the work they do and the businesses that depend on driving. How much depends on each situation."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((group) => (
            <div key={group.title} className="rounded border border-white/15 bg-navy-950/70 p-5">
              <h3 className="text-base font-bold text-white">{group.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{group.summary}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-petrol-300">How it can spread</p>
          <ol className="mt-3 flex flex-col gap-2 text-sm font-semibold text-white sm:flex-row sm:flex-wrap sm:items-center">
            {chain.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span>{step}</span>
                {i < chain.length - 1 ? <span aria-hidden="true" className="text-petrol-300">&rarr;</span> : null}
              </li>
            ))}
          </ol>
          <p className="mt-3 max-w-2xl text-xs leading-relaxed text-slate-300">
            A general economic mechanism, not a fixed rule. The actual effect depends on the industry and the
            circumstances.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <LinkButton href="/cost-of-living" variant="outline-light" className="min-h-12">
            See who feels the impact
          </LinkButton>
          <PhotoCredit credit={credit} />
        </div>
      </Container>
    </section>
  );
}
