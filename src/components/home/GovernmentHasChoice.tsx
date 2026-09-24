import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PolicyTimeline } from "@/components/money-flow/PolicyTimeline";
import { Alert } from "@/components/ui/Alert";

export function GovernmentHasChoice() {
  return (
    <section className="bg-navy-950 py-16 sm:py-20">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Policy choices"
          title="What can policy change, and what are its limits?"
          description="Fuel Duty is not a fixed natural law. It is a tax rate determined by government policy — and that policy has changed repeatedly."
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
      </Container>
    </section>
  );
}
