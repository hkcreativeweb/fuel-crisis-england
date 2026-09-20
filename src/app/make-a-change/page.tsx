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
          <SectionHeading
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

      <section className="bg-white py-14 sm:py-16">
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
            <p className="mt-2 max-w-xl text-sm text-orange-50">Sign the petition and share your experience with fuel costs.</p>
          </div>
          <LinkButton href="/petition" variant="secondary" size="lg">
            Sign the Petition
          </LinkButton>
        </Container>
      </section>
    </>
  );
}
