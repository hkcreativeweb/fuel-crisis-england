import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Alert } from "@/components/ui/Alert";
import { NewsHub } from "@/components/news/NewsHub";
import { feedPublishers, getNews } from "@/lib/server/news-feeds";
import { PetitionBanner } from "@/components/petition/PetitionBanner";

export const metadata: Metadata = pageMetadata("/news", {
  title: "News",
  description:
    "UK fuel and cost-of-living news in one place: petrol and diesel prices, fuel duty, food prices, supermarket prices, food inflation, household costs and the wider economy, linked from external publishers.",
});

// Feeds are re-read at most every 30 minutes.
export const revalidate = 1800;

export default async function NewsPage() {
  const { articles, ok, awaitingUpdate, retrievedAt } = await getNews();

  return (
    <>
      <section className="bg-navy-950 py-14 sm:py-16">
        <Container>
          <SectionHeading
            as="h1"
            tone="dark"
            eyebrow="News"
            title="Fuel, Food & Cost of Living News"
            description="Fuel prices, food and grocery prices, household costs and the wider economy, gathered from external publishers and organisations."
          />
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-14">
        <Container>
          <p className="max-w-3xl text-sm leading-relaxed text-charcoal-600">
            Fuel Crisis England aggregates links to external news coverage for informational purposes. Articles remain the
            property of their respective publishers. We do not own or endorse the articles shown. The publishers named are independent sources: Fuel Crisis England
            is not affiliated with them and does not represent or speak for them, and linking to an article does not imply any endorsement either way. Newest first; every date is the publisher&apos;s own.
          </p>

          {ok && retrievedAt ? (
            <p className={awaitingUpdate ? "mt-3 text-xs font-semibold text-amber-800" : "mt-3 text-xs text-charcoal-500"}>
              {awaitingUpdate ? "News feed awaiting update. Showing the last articles successfully retrieved" : "News feeds last checked"}{" "}
              {new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" }).format(new Date(retrievedAt))}.
            </p>
          ) : null}

          <div className="mt-8">
            {ok && articles.length > 0 ? (
              <NewsHub articles={articles} />
            ) : ok ? (
              <p className="text-sm text-charcoal-600">No recent relevant articles were found just now. Please check back shortly.</p>
            ) : (
              <Alert tone="warning">News updates are temporarily unavailable. Please check back shortly.</Alert>
            )}
          </div>

          <p className="mt-10 max-w-3xl text-xs leading-relaxed text-charcoal-500">
            Read automatically from their public feeds: {feedPublishers.join(", ")}. A small number of articles from other reputable publishers are added by hand and labelled with their publisher. For each story we show only the publisher&apos;s headline, date and a short summary, then link to the original article; we do not copy or republish article text, and we only list publishers whose feeds we can read legitimately. For official figures see our{" "}
            <a href="/sources" className="font-semibold text-petrol-600 underline underline-offset-2">
              Sources &amp; Methodology
            </a>{" "}
            page.
          </p>
        </Container>
      </section>
      <PetitionBanner />
    </>
  );
}
