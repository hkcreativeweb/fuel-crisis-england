import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
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

/** One external-news card, shared by /news and the homepage and Take Action previews. */
export function NewsCard({ article: a }: { article: NewsCardArticle }) {
  return (
    <Card className="flex h-full flex-col">
      <p className="text-xs font-bold uppercase tracking-wide text-petrol-600">
        {a.publisher} · <time dateTime={a.date}>{formatDate(a.date)}</time>
      </p>
      {a.category ? <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-charcoal-500">{a.category}</p> : null}
      <h3 className="mt-2 text-base font-extrabold leading-snug text-navy-900">{a.title}</h3>
      {a.summary ? <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-charcoal-700">{a.summary}</p> : <div className="flex-1" />}
      <div className="mt-3">
        <LinkButton href={a.url} variant="secondary" className="min-h-11">
          Read original article <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens {a.publisher} in a new tab)</span>
        </LinkButton>
      </div>
    </Card>
  );
}
