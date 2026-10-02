import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export type NewsCardArticle = {
  publisher: string;
  title: string;
  date: string;
  summary: string;
  url: string;
};

/** One external-news card, shared by /news and the homepage and Take Action previews. */
export function NewsCard({ article: a }: { article: NewsCardArticle }) {
  return (
    <Card className="flex h-full flex-col">
      <p className="text-xs font-bold uppercase tracking-wide text-petrol-600">
        {a.publisher} · <time dateTime={a.date}>{formatDate(a.date)}</time>
      </p>
      <h3 className="mt-2 text-base font-extrabold leading-snug text-navy-900">{a.title}</h3>
      {a.summary ? <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-700">{a.summary}</p> : <div className="flex-1" />}
      <p className="mt-3 text-[11px] text-charcoal-500">External coverage from {a.publisher}</p>
      <div className="mt-2">
        <LinkButton href={a.url} variant="secondary" className="min-h-11">
          Read original article <span aria-hidden="true">→</span>
          <span className="sr-only"> (opens {a.publisher} in a new tab)</span>
        </LinkButton>
      </div>
    </Card>
  );
}
