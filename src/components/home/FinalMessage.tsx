import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

const headlineLines = ["SAVE FUEL.", "SAVE MONEY.", "FOLLOW THE MONEY.", "DEMAND ACCOUNTABILITY."];

const supportingLines = [
  "Understand the price.",
  "Understand the costs.",
  "Understand the tax.",
  "Understand the supply chain.",
  "Understand the impact on households and businesses.",
  "Check the evidence.",
  "Ask the questions.",
];

export function FinalMessage() {
  return (
    <section className="bg-navy-950 py-24 sm:py-32">
      <Container className="text-center">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-petrol-500 sm:text-5xl">
          {headlineLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div className="mx-auto mt-8 max-w-lg space-y-1.5 text-lg font-semibold text-slate-200">
          {supportingLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <LinkButton href="/follow-the-money" size="lg">
            Explore The Data
          </LinkButton>
          <LinkButton href="/why-is-fuel-expensive" variant="outline-light" size="lg">
            Why Is Fuel So Expensive?
          </LinkButton>
          <LinkButton href="/save-fuel-money" variant="outline-light" size="lg">
            Save Fuel &amp; Money
          </LinkButton>
          <LinkButton href="/sources" variant="outline-light" size="lg">
            Sources
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
