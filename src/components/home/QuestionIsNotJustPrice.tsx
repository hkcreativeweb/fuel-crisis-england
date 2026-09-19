import { Container } from "@/components/ui/Container";

const flow = ["Motorist", "Fuel price", "Wholesale / energy market", "Retailer", "Fuel Duty", "VAT", "Government"];

export function QuestionIsNotJustPrice() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="text-center">
        <p className="mx-auto max-w-2xl text-2xl font-extrabold leading-snug text-navy-900 sm:text-3xl">
          The question isn&apos;t only &ldquo;Why is petrol expensive?&rdquo;
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-2xl font-extrabold leading-snug text-petrol-600 sm:text-3xl">
          It&apos;s where does the money go, who receives it, and what choices can be made?
        </p>

        <div className="mt-12 flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
          {flow.map((step, i) => (
            <div key={step} className="flex items-center gap-2 sm:gap-3">
              <div className="rounded-full border-2 border-navy-900 bg-white px-5 py-2.5 text-sm font-bold text-navy-900">
                {step}
              </div>
              {i < flow.length - 1 ? (
                <span aria-hidden="true" className="rotate-90 text-xl font-bold text-petrol-500 sm:rotate-0">
                  &rarr;
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
