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
              Fuel Crisis England is an independent information and education website. We are not a
              political party and are not affiliated with any government or political organisation.
            </p>
            <p>
              Our aim is to help people understand fuel prices, taxation, household costs and the
              evidence behind them, so they can make informed decisions and ask better questions.
            </p>
            <p>
              By making information accessible and encouraging informed public discussion, we want to
              support lawful civic engagement and help people hold governments accountable for their
              decisions.
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
