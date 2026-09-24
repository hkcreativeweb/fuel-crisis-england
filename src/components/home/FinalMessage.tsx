import { Container } from "@/components/ui/Container";
import Link from "next/link";
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
          <LinkButton href="/follow-the-money" size="lg" className="min-h-12">
            Explore the data
          </LinkButton>
          <LinkButton href="/sources" variant="outline-light" size="lg" className="min-h-12">
            Check the sources
          </LinkButton>
        </div>
        <p className="mx-auto mt-10 max-w-xl text-sm leading-relaxed text-slate-400">
          An independent information site with clearly labelled ways to take part. We are not a political party
          and are not affiliated with any government or political party. Campaign proposals are marked as
          proposals.{" "}
          <Link href="/about" className="inline-flex min-h-11 items-center font-semibold text-white underline underline-offset-2">
            About us
          </Link>
        </p>
      </Container>
    </section>
  );
}
