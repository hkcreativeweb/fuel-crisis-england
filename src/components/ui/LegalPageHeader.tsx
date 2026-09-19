import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/utils";

export function LegalPageHeader({ title, lastUpdated }: { title: string; lastUpdated: string }) {
  return (
    <section className="bg-navy-950 py-14 sm:py-16">
      <Container>
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-slate-400">Last updated {formatDate(lastUpdated)}</p>
      </Container>
    </section>
  );
}
