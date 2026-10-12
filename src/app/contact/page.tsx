import type { Metadata } from "next";
import Link from "next/link";
import { IndependenceNotice } from "@/components/ui/IndependenceNotice";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { LegalPageHeader } from "@/components/ui/LegalPageHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata("/contact", {
  title: "Contact",
  description: `How to get in touch with ${siteConfig.fullBrand}: report a correction, ask about the campaign, or send a media enquiry.`,
});

const LAST_UPDATED = "2026-10-12";

const card = "flex min-h-16 min-w-0 flex-col justify-center rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-petrol-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petrol-500";

const reasons = [
  { title: "Report a correction", detail: "A wrong figure, an out-of-date rate or a broken source link. Tell us the page and what you found, and a link to the source if you have one.", subject: "Correction: " },
  { title: "Ask about the campaign", detail: "Questions about what Fuel Crisis England is asking for, or how the petition works.", subject: "Campaign question" },
  { title: "Media and organisations", detail: "Press, community groups and others who want to talk about fuel affordability.", subject: "Media or organisation enquiry" },
  { title: "Suggest a source or idea", detail: "A published dataset, report or official announcement we should be looking at.", subject: "Suggestion" },
];

export default function ContactPage() {
  const email = siteConfig.contact.email;
  return (
    <>
      <LegalPageHeader title="Contact FCE" lastUpdated={LAST_UPDATED} />
      <section className="bg-white py-12 sm:py-16">
        <Container>
          <div className="max-w-3xl">
            <p className="text-base leading-relaxed text-charcoal-700 sm:text-lg">
              {siteConfig.fullBrand} is an independent public-interest information and campaign platform. Email is the best way to reach us; you can also phone.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a href={`mailto:${email}`} className={`${card} sm:col-span-2`}>
                <span className="text-xs font-bold uppercase tracking-wide text-charcoal-600">Email</span>
                <span className="text-sm font-extrabold text-navy-900 [overflow-wrap:anywhere] min-[360px]:text-base sm:text-xl">{email}</span>
              </a>
              <a href={siteConfig.contact.phoneHref} className={card}>
                <span className="text-xs font-bold uppercase tracking-wide text-charcoal-600">Phone</span>
                <span className="text-xl font-extrabold text-navy-900">{siteConfig.contact.phoneDisplay}</span>
              </a>
              <div className="flex min-h-16 flex-col justify-center rounded-lg border border-slate-200 bg-slate-50 p-4">
                <span className="text-xs font-bold uppercase tracking-wide text-charcoal-600">Postal address</span>
                <span className="text-sm text-charcoal-700">We do not publish one. Please use email.</span>
              </div>
            </div>

            <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-navy-900">What would you like to tell us?</h2>
            <p className="mt-2 text-sm text-charcoal-700">Choose a topic and your email app will open with the subject filled in. Nothing is sent until you press send.</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {reasons.map((r) => (
                <li key={r.title}>
                  <a href={`mailto:${email}?subject=${encodeURIComponent(r.subject)}`} className={`${card} h-full justify-start`}>
                    <span className="text-base font-extrabold text-navy-900">
                      {r.title} <span aria-hidden="true" className="text-petrol-600">→</span>
                    </span>
                    <span className="mt-1 text-sm leading-relaxed text-charcoal-700">{r.detail}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-lg border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-extrabold text-navy-900">Looking for something else?</h2>
              <ul className="mt-3 space-y-1 text-sm text-charcoal-700 sm:text-base">
                <li><Link href="/petition#sign-petition" className="inline-flex min-h-11 items-center font-semibold text-petrol-600 underline underline-offset-2">Sign the petition</Link> to add your voice.</li>
                <li><Link href="/have-your-say" className="inline-flex min-h-11 items-center font-semibold text-petrol-600 underline underline-offset-2">Have your say</Link> to leave a public comment.</li>
                <li><Link href="/ask-your-mp" className="inline-flex min-h-11 items-center font-semibold text-petrol-600 underline underline-offset-2">Contact your MP</Link>, who represents you in Parliament on fuel affordability policy.</li>
                <li><Link href="/planned-protest" className="inline-flex min-h-11 items-center font-semibold text-petrol-600 underline underline-offset-2">Planned protest</Link>: date, time and venue are still to be announced.</li>
                <li><Link href="/sources" className="inline-flex min-h-11 items-center font-semibold text-petrol-600 underline underline-offset-2">Sources and methodology</Link>, and our <Link href="/privacy" className="font-semibold text-petrol-600 underline underline-offset-2">privacy policy</Link>.</li>
              </ul>
            </div>

            <div className="mt-8 space-y-4 text-sm leading-relaxed text-charcoal-700 sm:text-base">
              <p>We want every statistic on this site to be right. If you spot an inaccuracy, tell us and we will check it against the source.</p>
              <IndependenceNotice variant="text" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
