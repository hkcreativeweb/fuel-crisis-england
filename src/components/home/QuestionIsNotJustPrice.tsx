import { Container } from "@/components/ui/Container";

/** The homepage hook: the first section after the hero. */
export function QuestionIsNotJustPrice() {
  return (
    <section id="explore-evidence" className="scroll-mt-24 border-b border-slate-200 bg-white py-14 sm:py-24">
      <Container className="text-center">
        <h2 className="mx-auto max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-navy-900 sm:text-6xl">
          What are you really paying for?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-xl font-semibold text-petrol-600 sm:text-2xl">
          The number on the pump is only the beginning.
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-charcoal-700 sm:text-lg">
          Part of what you pay is set by world markets. Part is set by government. This site shows
          which is which, using official figures, so you can decide for yourself what it means.
        </p>
        <a
          href="#one-litre"
          className="mt-6 inline-flex min-h-12 items-center gap-2 px-2 text-sm font-bold uppercase tracking-[0.14em] text-navy-900 underline decoration-petrol-500 decoration-2 underline-offset-8 hover:text-petrol-600"
        >
          Start with one litre <span aria-hidden="true">&darr;</span>
        </a>
      </Container>
    </section>
  );
}
