import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { PhotoFigure } from "@/components/ui/PhotoFigure";
import { PetitionCountLine } from "@/components/petition/PetitionCountLine";
import { ShareButtons } from "@/components/take-action/TakeActionClient";

const actions = [
  { title: "Contact your MP", description: "Evidence-based template for raising questions about fuel costs and affordability.", href: "/ask-your-mp", linkLabel: "Write to your MP" },
  { title: "FCE petition", description: "FCE's own petition — not an official UK Parliament petition.", href: "/petition", linkLabel: "View the petition" },
  { title: "Have your say", description: "Leave a public comment, subject to moderation.", href: "/have-your-say", linkLabel: "Have your say" },
  { title: "Peaceful protest guidance", description: "Information about lawful and peaceful civic participation.", href: "/make-a-change#peaceful-protest", linkLabel: "Read the guidance" },
];

/** The "what can you do" section: the real petition count, the ways to take part, and share buttons. Photo is illustrative. */
export function TakeActionSection() {
  return (
    <section className="bg-navy-950 py-12 sm:py-16">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Facts first. Questions next."
          title="What can you do with the information?"
          description="Explore the evidence, contact your representative, share your views or learn about lawful civic participation."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div className="reveal space-y-5">
            <PhotoFigure
              id="community-notice-board"
              tone="dark"
              aspect="aspect-[16/9]"
              sizes="(min-width: 1024px) 480px, 100vw"
              caption="A community-hall notice board. An illustrative photo of local civic life, not a Fuel Crisis England event."
            />
            <div className="rounded-lg border border-white/15 bg-white/5 p-4">
              <p className="text-sm font-bold text-white">Petition progress</p>
              <PetitionCountLine tone="dark" className="mt-2" />
              <LinkButton href="/petition#sign-petition" size="lg" className="mt-3 min-h-12 w-full sm:w-auto">
                Sign the petition
              </LinkButton>
              <p className="mt-3 text-xs text-slate-300">Real signatures submitted through this site, one per email address. This is an FCE petition, not an official UK Parliament petition.</p>
            </div>
          </div>

          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {actions.map((option) => (
                <Link
                  key={option.title}
                  href={option.href}
                  className="reveal group flex flex-col rounded border border-white/10 bg-white/5 p-4 transition-colors sm:p-5 hover:border-petrol-500/50 hover:bg-white/[0.08]"
                >
                  <h3 className="text-base font-bold text-white">{option.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">{option.description}</p>
                  <span className="mt-3 inline-flex min-h-8 items-center gap-1 text-sm font-semibold text-petrol-300 group-hover:text-white">
                    {option.linkLabel}
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-6 rounded-lg border border-white/10 p-4">
              <p className="text-sm font-bold text-white">Share the campaign</p>
              <p className="mt-1 text-xs text-slate-300">Shares our Take Action page, which sets out the facts and how to take part.</p>
              <div className="mt-3">
                <ShareButtons />
              </div>
            </div>
            <Link href="/make-a-change" className="mt-6 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-white underline underline-offset-4 hover:text-petrol-300">
              See all ways to take part <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
