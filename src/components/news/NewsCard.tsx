import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatDate } from "@/lib/utils";

export type NewsCardArticle = {
  publisher: string;
  title: string;
  date: string;
  summary: string;
  url: string;
  /** Optional topic label shown on the card, e.g. "Fuel". */
  category?: string;
};

/**
 * One external-news card, shared by /news and the homepage and Take Action previews. `image` is an illustrative photo
 * for the topic (decorative: it is not a picture of the story). A `lead` card gets a larger picture and a bigger headline.
 */
export function NewsCard({ article: a, image, lead = false }: { article: NewsCardArticle; image?: { src: string }; lead?: boolean }) {
  return (
    <Card className="reveal flex h-full flex-col overflow-hidden">
      {image ? (
        <div className={"relative -mx-6 -mt-6 mb-4 bg-navy-900/10 " + (lead ? "aspect-[16/8]" : "aspect-[16/6]")}>
          <SafeImage src={image.src} alt="" fill sizes={lead ? "(min-width: 1024px) 700px, 100vw" : "(min-width: 640px) 50vw, 100vw"} loading="lazy" className="object-cover" />
        </div>
      ) : null}
      <p className="text-xs font-bold uppercase tracking-wide text-petrol-600">
        {a.publisher} · <time dateTime={a.date}>{formatDate(a.date)}</time>
      </p>
      {a.category ? <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-charcoal-600">{a.category}</p> : null}
      <h3 className={"mt-2 font-extrabold leading-snug text-navy-900 " + (lead ? "text-xl sm:text-2xl" : "text-base")}>{a.title}</h3>
      {a.summary ? <p className={"mt-2 flex-1 text-sm leading-relaxed text-charcoal-700 " + (lead ? "line-clamp-4" : "line-clamp-3")}>{a.summary}</p> : <div className="flex-1" />}
      <div className="mt-3">
        <LinkButton href={a.url} variant="secondary" className="min-h-11">
          Read original article <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens {a.publisher} in a new tab)</span>
        </LinkButton>
      </div>
    </Card>
  );
}
