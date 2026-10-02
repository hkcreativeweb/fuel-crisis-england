import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export function FinalMessage() {
  return (
    <section className="bg-navy-950 py-16 sm:py-24">
      <Container className="text-center">
        <h2 className="text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl">
          Follow the figures.
          <span className="block text-petrol-500">Understand the price.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg font-bold text-white">Explore the data. Check the sources. Make up your own mind.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton href="/live-fuel-prices" size="lg" className="min-h-12">
            Explore the data
          </LinkButton>
          <LinkButton href="/sources" variant="outline-light" size="lg" className="min-h-12">
            Check the sources
          </LinkButton>
        </div>
        <p className="mx-auto mt-10 max-w-xl text-sm leading-relaxed text-slate-400">
          {siteConfig.independence.full}{" "}
          <Link href="/about" className="inline-flex min-h-11 items-center font-semibold text-white underline underline-offset-2">
            About us
          </Link>
        </p>
      </Container>
    </section>
  );
}
