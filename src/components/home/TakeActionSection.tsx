import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";

const actions = [
  { title: "Contact your MP", description: "Evidence-based template for raising questions about fuel costs and affordability.", href: "/ask-your-mp", linkLabel: "Write to your MP" },
  { title: "FCE petition", description: "FCE's own petition — not an official UK Parliament petition.", href: "/petition", linkLabel: "View the petition" },
  { title: "Have your say", description: "Leave a public comment, subject to moderation.", href: "/have-your-say", linkLabel: "Have your say" },
  { title: "Peaceful protest guidance", description: "Information about lawful and peaceful civic participation.", href: "/make-a-change#peaceful-protest", linkLabel: "Read the guidance" },
];

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
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((option) => (
            <Link
              key={option.title}
              href={option.href}
              className="group flex flex-col rounded border border-white/10 bg-white/5 p-4 transition-colors sm:p-5 hover:border-petrol-500/50 hover:bg-white/[0.08]"
            >
              <h3 className="text-base font-bold text-white">{option.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">{option.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-petrol-300 group-hover:text-white">
                {option.linkLabel}
                <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
        <Link href="/make-a-change" className="mt-6 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-white underline underline-offset-4 hover:text-petrol-300">
          See all ways to take part <span aria-hidden="true">&rarr;</span>
        </Link>
      </Container>
    </section>
  );
}
