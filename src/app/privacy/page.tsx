import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { LegalPageHeader } from "@/components/ui/LegalPageHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata("/privacy", {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}: what data we collect, how it is used, and your rights.`,
});

const LAST_UPDATED = "2026-09-24";
const CONTACT_EMAIL = "contact.fuelcrisisengland@gmail.com";

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
              <p className="mt-2">When you sign the petition, we ask for:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Your full name, email address and an optional postcode. These are checked but <strong>not stored</strong>. We keep only a one-way scrambled (hashed) copy of your email, so the same address cannot sign twice.</li>
                <li>Your general area or county, driver/business category, your written experience, the changes you would like to see, and your public-display choice. These are stored.</li>
              </ul>
              <p className="mt-2">When you post a comment on Have Your Say, we store your name, topic, comment and, if you give it, your email address. Your email is never shown publicly. Comments are held for review and only published once approved.</p>
              <p className="mt-2">To prevent spam, we briefly keep a scrambled (hashed) form of your connection&apos;s IP address, which expires automatically within an hour.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy-900">Where your data is kept</h2>
              <p className="mt-2">
                Stored petition and comment data is kept in a secure hosted database (Upstash Redis, via
                our hosting provider Vercel). When a comment is submitted, the site owner receives an email
                alert containing the comment, sent through Resend. We do not sell or share your data with
                anyone else.
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
                We don&apos;t currently publish submitted experiences on the site. If we do in future, we
                will only display a submitted experience publicly if you explicitly consent to this, and
                only after moderation. Public experience cards never show your name, email address, or
                postcode. Only your general area and county, category, and message.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy-900">Cookies and tracking</h2>
              <p className="mt-2">
                We do not use advertising or tracking cookies. We use one short-lived cookie (30 minutes)
                so a single visit is not counted twice by our homepage visitor counter; it does not
                identify you. Site administrators also get a login cookie.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy-900">Your rights</h2>
              <p className="mt-2">
                You can ask us what information we hold about you, ask us to correct it, or ask us to
                delete it. Email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-petrol-600 underline underline-offset-2">
                  {CONTACT_EMAIL}
                </a>
                . Because we do not store petition signers&apos; names or emails, we may need details
                such as your area and when you signed to find your entry.
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
