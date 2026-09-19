import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LegalPageHeader } from "@/components/ui/LegalPageHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: `How to get in touch with ${siteConfig.fullBrand}.`,
};

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
              This is a preview build, and a dedicated contact channel has not yet been connected.
            </p>
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
