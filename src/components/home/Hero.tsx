import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { LinkButton } from "@/components/ui/Button";
import { imageCredits } from "@/lib/data/image-credits";

const credit = imageCredits["forecourt-close"];

export function Hero() {
  return (
    <section className="border-b border-slate-200 bg-background">
      <Container className="grid gap-8 py-8 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-petrol-600">FCE: Fuel Crisis England</p>
          <div className="mt-3 h-px w-12 bg-navy-900/20" aria-hidden="true" />
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-navy-900 sm:text-5xl lg:text-[3.1rem]">
            Follow the figures.
            <span className="block text-petrol-500">Understand the price.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-charcoal-700">
            Fuel Crisis England brings together fuel prices, taxes, costs, history and public information in one place.
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-navy-900">Explore the data. Check the sources. Make up your own mind.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/live-fuel-prices" size="lg" className="min-h-12">
              Explore the data
            </LinkButton>
            <LinkButton href="/sources" variant="secondary" size="lg" className="min-h-12">
              Check the sources
            </LinkButton>
          </div>
        </div>

        <div className="hidden sm:block">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image src={credit.src} alt={credit.alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <PhotoCredit credit={credit} tone="light" className="mt-2" />
        </div>
      </Container>
    </section>
  );
}
