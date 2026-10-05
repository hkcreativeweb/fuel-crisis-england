import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";
import { formatNumber } from "@/lib/utils";

const target = formatNumber(siteConfig.petitionTarget);

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is this an official UK Parliament petition?",
    a: (
      <>
        No. This is Fuel Crisis England&apos;s own campaign petition. {siteConfig.independence.full} Official petitions are run separately on the UK Parliament website; you can find some{" "}
        <a href="#uk-parliament-petitions" className="font-semibold text-petrol-600 underline underline-offset-2">
          further down this page
        </a>
        .
      </>
    ),
  },
  {
    q: "What happens to my details?",
    a: (
      <>
        Your name, email and postcode are checked but not stored. We keep only a scrambled (hashed) copy of your email so the same address can&apos;t sign twice, plus your area, category and message. Your
        message is saved privately and nothing is published without review. You can ask to see, correct or delete what we hold by emailing {siteConfig.contact.email}. See our{" "}
        <Link href="/privacy" className="font-semibold text-petrol-600 underline underline-offset-2">
          privacy policy
        </Link>
        .
      </>
    ),
  },
  {
    q: `What is the ${target} signature target?`,
    a: `${target} is the goal for this Fuel Crisis England campaign petition. It is not the threshold or process of an official UK Parliament petition, and reaching it does not automatically trigger a government response. The counter shows real signatures submitted through this site.`,
  },
  {
    q: "Can I sign more than once, and do I need an account?",
    a: "You can sign once per email address, and you do not need to create an account.",
  },
];

/** Short, factual answers using the site's existing wording. Native details/summary, so it needs no JavaScript. */
export function PetitionFaq() {
  return (
    <section aria-labelledby="petition-faq-title" className="border-t border-slate-200 bg-white py-12 sm:py-14">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h2 id="petition-faq-title" className="text-xl font-bold text-navy-900 sm:text-2xl">
            Before you sign: common questions
          </h2>
          <div className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((f) => (
              <details key={f.q} className="group py-1">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-semibold text-navy-900 sm:text-base [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="shrink-0 text-xl leading-none text-charcoal-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="pb-4 text-sm leading-relaxed text-charcoal-700">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
