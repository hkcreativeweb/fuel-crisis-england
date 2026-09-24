import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function AboutHomeSection() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-petrol-600">About Fuel Crisis England</p>
          <div className="mt-3 h-px w-12 bg-navy-900/20" aria-hidden="true" />

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-charcoal-700 sm:text-base">
            <p>
              Fuel Crisis England is an independent information site explaining UK fuel prices, their wider
              impact and the policy debate around them. It also offers clearly labelled ways to take part in
              civic discussion.
            </p>
            <p>
              We are not a political party and are not affiliated with any government or political party.
              Campaign proposals are clearly identified as proposals, so you can tell them apart from the facts.
            </p>
          </div>

          <Link
            href="/about"
            className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-petrol-600 hover:text-petrol-700"
          >
            More about us
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
