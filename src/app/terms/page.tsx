import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { LegalPageHeader } from "@/components/ui/LegalPageHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata("/terms", {
  title: "Terms and Conditions",
  description: `Terms and Conditions for using ${siteConfig.name}.`,
});

const LAST_UPDATED = "2026-09-24";

export default function TermsPage() {
  return (
    <>
      <LegalPageHeader title="Terms and Conditions" lastUpdated={LAST_UPDATED} />
      <section className="bg-white py-14 sm:py-16">
        <Container>
          <div className="max-w-3xl space-y-8 text-sm leading-relaxed text-charcoal-700 sm:text-base">
            <div>
              <h2 className="text-lg font-bold text-navy-900">Purpose of this site</h2>
              <p className="mt-2">
                {siteConfig.name} is an independent public information and civic campaign website about
                petrol and diesel affordability in England. It is provided for general information and
                civic engagement purposes only.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy-900">No professional advice</h2>
              <p className="mt-2">
                Nothing on this site constitutes financial, legal, or professional advice. Fuel cost
                calculator results are estimates only. Always seek independent advice for decisions about
                your personal or business finances.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy-900">Accuracy of information</h2>
              <p className="mt-2">
                We take care to label figures as live, current official rates, latest published, historical,
                our own calculations or illustrative scenarios, and to only present verified figures as fact.
                Where no verified figure is available, we say so rather than showing a guess. We do not guarantee the
                site is free of errors and encourage you to check the linked official sources directly.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy-900">User submissions</h2>
              <p className="mt-2">
                By submitting the petition or public experience form, you confirm the information you
                provide is accurate and your own. We reserve the right to moderate, decline to publish, or
                remove any submission, including content that is abusive, unlawful, spam, or contains
                personal information about someone else.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy-900">Civic action and protest</h2>
              <p className="mt-2">
                Any guidance about protest or civic action on this site is general awareness information
                only, not legal advice, and does not constitute organisation or endorsement of any
                specific event. You are responsible for ensuring your own actions comply with the law.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy-900">Acceptable use</h2>
              <p className="mt-2">
                You agree not to misuse this site, including attempting to submit false information,
                interfere with its operation, or use it to harass or threaten others.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy-900">Changes to these terms</h2>
              <p className="mt-2">
                We may update these terms as the site develops. Continued use of the site after changes
                are published means you accept the updated terms.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
