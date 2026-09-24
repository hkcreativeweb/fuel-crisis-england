import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PolicyTimeline } from "@/components/money-flow/PolicyTimeline";
import { Alert } from "@/components/ui/Alert";
import { LinkButton } from "@/components/ui/Button";

export function GovernmentHasChoice() {
  return (
    <section className="bg-navy-950 py-16 sm:py-20">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Policy choices"
          title="What could change?"
          description="Fuel prices are shaped by more than the pump. Fuel Duty, for example, is set by government and has changed many times. Explore the policy choices, trade-offs and possible scenarios."
        />

        <div className="mt-10 max-w-3xl">
          <PolicyTimeline />
        </div>

        <div className="mt-10 max-w-2xl">
          <Alert tone="warning" title="We distinguish what has actually happened from what might happen.">
            Every entry above is labelled current, previous, an officially announced future rate, or a
            proposed policy intention that is not yet confirmed in legislation. We never present a
            proposal as if it has already happened.
          </Alert>
        </div>
        <div className="mt-8 max-w-2xl">
          <LinkButton href="/our-demands#simulator" variant="outline-light">
            See the policy scenarios
          </LinkButton>
          <p className="mt-3 text-xs text-slate-400">
            The simulator shows illustrative scenarios based on the numbers you choose. They are not
            predictions, and FCE does not tell you which policy to support.
          </p>
        </div>
      </Container>
    </section>
  );
}
