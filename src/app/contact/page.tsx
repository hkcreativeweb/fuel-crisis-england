import type { Metadata } from "next";
import { IndependenceNotice } from "@/components/ui/IndependenceNotice";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { LegalPageHeader } from "@/components/ui/LegalPageHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata("/contact", {
  title: "Contact",
  description: `How to get in touch with ${siteConfig.fullBrand}.`,
});

const LAST_UPDATED = "2026-09-18";

export default function ContactPage() {
  return (
    <>
      <LegalPageHeader title="Contact FCE" lastUpdated={LAST_UPDATED} />
      <section className="bg-white py-14 sm:py-16">
        <Container>
          <div className="max-w-2xl space-y-5 text-sm leading-relaxed text-charcoal-700 sm:text-base">
            <p>
              {siteConfig.fullBrand} is an independent public-interest information and campaign platform.
              You can contact us directly by phone or email:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <a href={siteConfig.contact.phoneHref} className="flex min-h-16 min-w-0 flex-col justify-center rounded border border-slate-200 bg-white p-4 transition-colors hover:border-petrol-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-petrol-500">
                <span className="text-xs font-bold uppercase tracking-wide text-charcoal-500">Phone</span>
                <span className="text-xl font-extrabold text-navy-900">{siteConfig.contact.phoneDisplay}</span>
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="flex min-h-16 min-w-0 flex-col sm:col-span-2 justify-center rounded border border-slate-200 bg-white p-4 transition-colors hover:border-petrol-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-petrol-500">
                <span className="text-xs font-bold uppercase tracking-wide text-charcoal-500">Email</span>
                <span className="text-sm font-extrabold text-navy-900 [overflow-wrap:anywhere] min-[360px]:text-base sm:text-lg">{siteConfig.contact.email}</span>
              </a>
            </div>
            <IndependenceNotice variant="text" />
            <p>
              If you&apos;ve spotted an inaccuracy, an outdated figure, or a broken source link, please
              treat every statistic on this site as something we want to get right. See our{" "}
              <a href="/sources" className="font-semibold text-petrol-600 underline underline-offset-2">
                Sources page
              </a>{" "}
              for how we cite figures, and our{" "}
              <a href="/about" className="font-semibold text-petrol-600 underline underline-offset-2">
                About page
              </a>{" "}
              for our accuracy principles.
            </p>
            <p>
              For anything related to fuel affordability policy itself, the most direct lawful channel is
              to{" "}
              <a href="/ask-your-mp" className="font-semibold text-petrol-600 underline underline-offset-2">
                contact your MP
              </a>
              , who represents you in Parliament.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
