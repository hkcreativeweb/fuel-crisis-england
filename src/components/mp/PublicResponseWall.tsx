import { exampleMPResponses } from "@/lib/data/mp-response-examples";
import { MPResponseCard } from "@/components/mp/MPResponseCard";
import { Alert } from "@/components/ui/Alert";

export function PublicResponseWall() {
  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        {exampleMPResponses.map((r) => (
          <MPResponseCard key={r.id} response={r} />
        ))}
      </div>
      <div className="mt-6">
        <Alert tone="info" title="These are illustrative examples, not real submissions.">
          We do not collect, store, or publish visitor submissions of MP responses — doing so would mean
          holding a record of who contacted their MP and what was said, which we deliberately avoid. The
          cards above show the format a shared response would take; if we add a genuine way to contribute
          one in future, it will be described clearly here first.
        </Alert>
      </div>
    </div>
  );
}
