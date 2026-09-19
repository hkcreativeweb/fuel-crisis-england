import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { priceFactors } from "@/lib/data/price-factors";

export function WhyPricesChange() {
  const preview = priceFactors.slice(0, 6);

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Understand the issue" title="Why do fuel prices change?" description="Several factors move pump prices at the same time. Here's a plain-English guide to each one." />
          <LinkButton href="/why-prices-rising" variant="secondary">
            See the full breakdown
          </LinkButton>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((factor) => (
            <div key={factor.slug} className="rounded border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-navy-900">{factor.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{factor.summary}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
