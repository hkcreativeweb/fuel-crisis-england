import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import { takeActionOptions } from "@/lib/data/take-action-options";

// A focused set for the homepage; the full list lives on /make-a-change.
const HOMEPAGE_ACTIONS = ["/ask-your-mp", "/petition", "/have-your-say#uk-petitions", "/make-a-change#peaceful-protest"];

const extraActions = [
  {
    title: "Have your say",
    description: "Leave a comment for others to read. Every comment is reviewed before it appears.",
    href: "/have-your-say",
    linkLabel: "Have your say",
  },
  {
    title: "Ask for evidence",
    description: "How to request information and hold decision-makers to account through official channels.",
    href: "/government-accountability",
    linkLabel: "See how accountability works",
  },
];

export function TakeActionSection() {
  const actions = [
    ...HOMEPAGE_ACTIONS.map((href) => takeActionOptions.find((o) => o.href === href)).filter((o) => o !== undefined),
    ...extraActions,
  ];

  return (
    <section className="bg-navy-950 py-16 sm:py-20">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Facts first. Questions next."
          title="You've seen the numbers. What can you do with them?"
          description="Explore the sources, ask questions, contact your representative and take part in the public discussion. Every option here is lawful and peaceful."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map((option) => (
            <Link
              key={option.title}
              href={option.href}
              target={option.href.startsWith("http") ? "_blank" : undefined}
              rel={option.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex flex-col rounded border border-white/10 bg-white/5 p-6 transition-colors hover:border-petrol-500/50 hover:bg-white/[0.08]"
            >
              <h3 className="text-base font-bold text-white">{option.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">{option.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-petrol-400 group-hover:text-petrol-300">
                {option.linkLabel}
                <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
