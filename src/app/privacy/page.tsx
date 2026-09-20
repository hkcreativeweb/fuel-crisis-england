import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LegalPageHeader } from "@/components/ui/LegalPageHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}: what data we collect, how it is used, and your rights.`,
};

const LAST_UPDATED = "2026-09-19";

export default function PrivacyPage() {
  return (
    <>
      <LegalPageHeader title="Privacy Policy" lastUpdated={LAST_UPDATED} />
      <section className="bg-white py-14 sm:py-16">
        <Container>
          <div className="max-w-3xl space-y-8 text-sm leading-relaxed text-charcoal-700 sm:text-base">
            <div>
              <h2 className="text-lg font-bold text-navy-900">Who we are</h2>
              <p className="mt-2">
                {siteConfig.name} is an independent civic information and campaign platform. This policy
                explains what information we collect through this website, why, and how it is handled.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy-900">What we collect</h2>
              <p className="mt-2">When you use the petition and public experience form, we ask for:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Full name and email address, used only to validate your submission.</li>
                <li>An optional postcode and your general area or county.</li>
                <li>Your driver/business category and your written experience of fuel prices.</li>
                <li>Your consent choices for public display and for this privacy policy.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy-900">Demo mode notice</h2>
              <p className="mt-2">
                This site currently runs in demo mode: there is no persistent database connected. Your
                full name and email address are validated on our server but are never stored beyond
                processing your request. Only an anonymised summary (general area, category, and your
                written experience) may be held temporarily in server memory for the current session, and
                is cleared when the server restarts. Once a production backend is connected, this notice
                will be updated to describe exactly what is stored and for how long.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy-900">Ask Your MP</h2>
              <p className="mt-2">
                Our Ask Your MP tool builds an editable email template entirely in your browser. It does
                not submit anything to our servers, does not require an account or sign-in, and we do not
                log which MP you contact, what you wrote, or whether you sent anything. Nothing you type
                there, your name, postcode, occupation, or personal experience, is stored or transmitted
                anywhere. It exists only in your browser tab until you copy it or close the page.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy-900">Public display of experiences</h2>
              <p className="mt-2">
                We only display a submitted experience publicly if you explicitly consent to this, and
                only after moderation. Public experience cards never show your name, email address, or
                postcode. Only your general area and county, category, and message.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy-900">Cookies and tracking</h2>
              <p className="mt-2">
                We do not use advertising or unnecessary tracking cookies. Any cookies strictly required
                for the site to function are used only for that purpose.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy-900">Your rights</h2>
              <p className="mt-2">
                You can ask us what information we hold about you, ask us to correct it, or ask us to
                delete it. Because this preview build does not persistently store personal data, most
                requests will already be satisfied by design. Contact details for the production version
                of this site will be added here once available.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy-900">Changes to this policy</h2>
              <p className="mt-2">
                We may update this policy as the site develops, particularly once a live data source and
                production backend are connected. The &quot;last updated&quot; date at the top of this
                page will always reflect the most recent change.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
