import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export function FinalMessage() {
  return (
    <section className="bg-navy-950 py-24 sm:py-32">
      <Container className="text-center">
        <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
          Follow the figures.
          <span className="block text-petrol-500">Understand the price.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-300">
          Fuel Crisis England brings together fuel prices, taxes, costs, history and public information in
          one place.
        </p>
        <p className="mx-auto mt-6 max-w-xl text-xl font-bold text-white">
          Explore the data. Check the sources. Make up your own mind.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <LinkButton href="/follow-the-money" size="lg">
            Explore the data
          </LinkButton>
          <LinkButton href="/sources" variant="outline-light" size="lg">
            Check the sources
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
