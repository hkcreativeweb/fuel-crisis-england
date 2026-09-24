import { Container } from "@/components/ui/Container";

/**
 * A short editorial introduction above the hero. The headline is styled
 * text rather than a heading element, so the hero's H1 stays the first
 * heading on the page and the heading outline starts correctly.
 */
export function IntroStatement() {
  return (
    <section aria-label="Introduction" className="border-b border-slate-200 bg-white">
      <Container className="grid gap-3 py-6 sm:py-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12">
        <p className="text-2xl font-extrabold leading-[1.1] tracking-tight text-navy-900 sm:text-3xl">
          Follow the figures.
          <span className="block text-petrol-500">Understand the price.</span>
        </p>
        <div className="lg:border-l lg:border-slate-200 lg:pl-12">
          <p className="max-w-xl text-sm leading-relaxed text-charcoal-700 sm:text-base">
            Fuel Crisis England brings together fuel prices, taxes, costs, history and public information in one
            place.
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-navy-900">
            Explore the data. Check the sources. Make up your own mind.
          </p>
        </div>
      </Container>
    </section>
  );
}
