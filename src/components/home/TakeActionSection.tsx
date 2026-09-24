import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import { takeActionOptions } from "@/lib/data/take-action-options";

export function TakeActionSection() {
  return (
    <section className="bg-navy-950 py-16 sm:py-20">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Take part"
          title="Understand the issue. Ask questions. Take part."
          description="Every option below is lawful, peaceful, and focused on getting real answers on fuel affordability."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {takeActionOptions.map((option) => (
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
