import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { ProtestGuidance } from "@/components/action/ProtestGuidance";
import { takeActionOptions } from "@/lib/data/take-action-options";

export const metadata: Metadata = {
  title: "We Can Make A Change",
  description: "Lawful, peaceful ways to take civic action on fuel affordability: sign the petition, contact your MP, and learn about peaceful protest.",
};

export default function TakeActionPage() {
  return (
    <>
      <section className="bg-navy-950 py-14 sm:py-16">
        <Container>
          <SectionHeading as="h1"
            tone="dark"
            eyebrow="We can make a change"
            title="People deserve a voice on fuel affordability."
            description="Every option here is lawful and peaceful. Choose the ones that work for you."
          />
          <p className="mt-6 max-w-2xl text-base font-semibold text-petrol-300">
            Change can happen when people organise, ask informed questions, present evidence and make
            their concerns visible through lawful democratic channels.
          </p>
        </Container>
      </section>

      <section className="bg-white py-8 sm:py-10">
        <Container>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold uppercase tracking-wide text-charcoal-500 sm:text-sm">
            <a href="/our-demands" className="text-petrol-600 hover:underline">
              Our Demands
            </a>
            <span aria-hidden="true" className="text-slate-300">
              →
            </span>
            <a href="/sources" className="text-petrol-600 hover:underline">
              The Evidence
            </a>
            <span aria-hidden="true" className="text-slate-300">
              →
            </span>
            <span className="text-navy-900">Ways to Engage</span>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal-700">
            The options below are lawful, peaceful ways to engage on the evidence and demands set out
            elsewhere on this site. FCE provides information and civic-engagement options — it does not
            direct people towards any political party or candidate.
          </p>
        </Container>
      </section>

      <section className="bg-white py-6 sm:py-8">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {takeActionOptions.map((option) => (
              <div key={option.title} className="flex flex-col rounded border border-slate-200 p-6">
                <h3 className="text-base font-bold text-navy-900">{option.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-700">{option.description}</p>
                <LinkButton href={option.href} variant="secondary" className="mt-4 self-start">
                  {option.linkLabel}
                </LinkButton>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="peaceful-protest" className="scroll-mt-24 bg-slate-50 py-14 sm:py-16">
        <Container>
          <SectionHeading eyebrow="Stay lawful and safe" title="Peaceful protest and civic action" className="mb-8" />
          <ProtestGuidance />
        </Container>
      </section>

      <section id="public-meetings" className="scroll-mt-24 bg-white py-14 sm:py-16">
        <Container>
          <SectionHeading eyebrow="Get involved locally" title="Public meetings and community discussions" className="mb-6" />
          <p className="max-w-2xl text-sm leading-relaxed text-charcoal-700">
            Lawfully organised public meetings and community discussions are a valuable way to raise fuel
            affordability with local representatives and neighbours. We do not currently have specific
            meetings to list. Check with your local council, community groups, or MP&apos;s office for
            upcoming events in your area.
          </p>
        </Container>
      </section>

      <section className="bg-petrol-500 py-14 sm:py-16">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Ready to add your name?</h2>
            <p className="mt-2 max-w-xl text-sm text-orange-50">
              Sign FCE&apos;s own public petition and share your experience with fuel costs. This is an FCE
              resource, not an official UK Parliament petition.
            </p>
          </div>
          <LinkButton href="/petition" variant="secondary" size="lg">
            Sign FCE&apos;s Petition
          </LinkButton>
        </Container>
      </section>
    </>
  );
}
