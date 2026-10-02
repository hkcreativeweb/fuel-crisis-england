import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { NewsCard } from "@/components/news/NewsCard";
import { getNews } from "@/lib/server/news-feeds";

/** Small "Latest News" teaser fed by the same central news source as /news. Renders nothing if no news is available. */
export async function LatestNewsPreview({ count = 4 }: { count?: number }) {
  const { articles, ok } = await getNews();
  if (!ok || articles.length === 0) return null;
  // Fuel stories lead (this is a fuel site); the rest follow, each group newest first.
  const picks = [...articles.filter((a) => a.section === "Fuel"), ...articles.filter((a) => a.section !== "Fuel")].slice(0, count);

  return (
    <section className="bg-white py-12 sm:py-14">
      <Container>
        <SectionHeading eyebrow="News" title="Latest News" description="Recent coverage from external publishers." />
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((a) => (
            <li key={a.url}>
              <NewsCard article={a} />
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <LinkButton href="/news" size="lg" className="min-h-12">
            View all news <span aria-hidden="true">→</span>
          </LinkButton>
        </div>
        <p className="mt-3 text-xs text-charcoal-500">External coverage. Fuel Crisis England does not own or endorse these articles.</p>
      </Container>
    </section>
  );
}
