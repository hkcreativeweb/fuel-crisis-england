import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { fuelDutyTimeline } from "@/lib/data/fuel-duty-timeline";
import { formatDate } from "@/lib/utils";

/**
 * A short policy snapshot built from the same timeline data as the full
 * Fuel Duty timeline on /fuel-duty-and-tax. Government policy (current,
 * confirmed, stated intention) is kept visibly separate from FCE's own
 * campaign proposals.
 */
export function GovernmentHasChoice() {
  const current = fuelDutyTimeline.find((e) => e.status === "current");
  const confirmed = fuelDutyTimeline.filter((e) => e.status === "announced");
  const intention = fuelDutyTimeline.find((e) => e.status === "proposed");

  const columns = [
    current && {
      label: "Current policy",
      body: (
        <>
          <p className="text-3xl font-extrabold tabular-nums text-white">
            {current.ratePencePerLitre}p <span className="text-sm font-semibold text-slate-300">per litre</span>
          </p>
          <p className="mt-2 text-sm text-slate-300">{current.title}.</p>
        </>
      ),
      source: current,
    },
    confirmed.length > 0 && {
      label: "Confirmed change",
      body: (
        <ul className="space-y-1">
          {confirmed.map((e) => (
            <li key={e.id} className="text-white">
              <strong className="text-xl tabular-nums">{e.ratePencePerLitre}p</strong>{" "}
              <span className="text-sm text-slate-300">from {formatDate(e.date)}</span>
            </li>
          ))}
        </ul>
      ),
      source: confirmed[0],
    },
    intention && {
      label: "Stated intention, not yet law",
      body: <p className="text-sm leading-relaxed text-slate-300">{intention.title}. No confirmed rate exists yet.</p>,
      source: intention,
    },
  ].filter((c) => !!c);

  return (
    <section className="bg-navy-950 py-16 sm:py-20">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Policy choices"
          title="What could change?"
          description="Fuel Duty is a fixed tax per litre, set by government. It has been changed many times, and further changes are already confirmed in law."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {columns.map((col) => (
            <div key={col.label} className="flex flex-col rounded border border-white/15 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-petrol-300">{col.label}</p>
              <div className="mt-3 flex-1">{col.body}</div>
              {col.source.sourceUrl ? (
                <a
                  href={col.source.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center text-xs font-semibold text-slate-300 underline underline-offset-2 hover:text-white"
                >
                  Source: {col.source.source}
                </a>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="/fuel-duty-and-tax#timeline" variant="outline-light" className="min-h-12">
            See the full Fuel Duty timeline
          </LinkButton>
          <LinkButton href="/our-demands#simulator" variant="outline-light" className="min-h-12">
            Try the policy scenarios
          </LinkButton>
        </div>
        <p className="mt-4 max-w-2xl text-xs leading-relaxed text-slate-300">
          The scenarios are illustrations based on the numbers you choose, not predictions. FCE&apos;s own campaign
          proposals are listed separately on{" "}
          <a href="/our-demands" className="-my-3 inline-block py-3 font-semibold text-white underline underline-offset-2">
            Our Demands
          </a>{" "}
          and are labelled as proposals.
        </p>
      </Container>
    </section>
  );
}
