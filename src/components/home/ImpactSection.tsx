import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { imageCredits } from "@/lib/data/image-credits";

const credit = imageCredits["commute-traffic"];

const chain = ["Higher fuel costs", "Transport costs", "Business costs", "Pressure on prices"];

const cards = [
  { title: "Families & households", summary: "School runs, shopping and family journeys can all be affected by higher fuel costs." },
  { title: "Commuters", summary: "People without practical public-transport alternatives may have fewer options when driving costs rise." },
  { title: "Delivery drivers", summary: "High mileage can make fuel a significant operating cost." },
  { title: "Taxi & private hire", summary: "High daily mileage can make drivers particularly exposed to fuel-price changes." },
];

export function ImpactSection() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-12 sm:py-16">
      <div className="absolute inset-0">
        <Image src={credit.src} alt={credit.alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-navy-950/85" />
      </div>
      <Container className="relative">
        <SectionHeading
          tone="dark"
          eyebrow="The same price doesn't affect everyone equally"
          title="The pump isn't where the cost ends"
          description="Fuel costs can affect households, workers and businesses differently depending on how much they drive and what alternatives they have."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((group) => (
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
            This is a general economic mechanism, not a fixed rule. The effect varies by industry and circumstances.
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
