import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import { takeActionOptions } from "@/lib/data/take-action-options";

const haveYourSay = {
  title: "Have your say",
  description: "Leave a comment for others to read. Every comment is reviewed before it appears.",
  href: "/have-your-say",
  linkLabel: "Have your say",
};

const fromOptions = (href: string) => takeActionOptions.find((o) => o.href === href);

// A focused set of four for the homepage; the full list lives on /make-a-change.
const actions = [fromOptions("/ask-your-mp"), fromOptions("/petition"), haveYourSay, fromOptions("/make-a-change#peaceful-protest")].filter(
  (o) => o !== undefined
);

export function TakeActionSection() {

  return (
    <section className="bg-navy-950 py-16 sm:py-20">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Facts first. Questions next."
          title="You've seen the numbers. What can you do with them?"
          description="Explore the sources, ask questions, contact your representative and take part in the public discussion. Every option here is lawful and peaceful."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((option) => (
            <Link
              key={option.title}
              href={option.href}
              target={option.href.startsWith("http") ? "_blank" : undefined}
              rel={option.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex flex-col rounded border border-white/10 bg-white/5 p-4 transition-colors sm:p-6 hover:border-petrol-500/50 hover:bg-white/[0.08]"
            >
              <h3 className="text-base font-bold text-white">{option.title}</h3>
              <p className="mt-2 hidden flex-1 text-sm leading-relaxed text-slate-300 sm:block">{option.description}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-petrol-400 sm:mt-4 group-hover:text-petrol-300">
                {option.linkLabel}
                <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/make-a-change"
          className="mt-6 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-white underline underline-offset-4 hover:text-petrol-300"
        >
          See all ways to take part <span aria-hidden="true">&rarr;</span>
        </Link>
      </Container>
    </section>
  );
}
