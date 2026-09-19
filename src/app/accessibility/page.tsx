import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LegalPageHeader } from "@/components/ui/LegalPageHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Accessibility",
  description: `Accessibility commitment for ${siteConfig.fullBrand}.`,
};

const LAST_UPDATED = "2026-09-18";

const commitments = [
  "Keyboard navigation throughout, including all interactive calculators, forms, and accordions.",
  "Visible focus states on every interactive element.",
  "Colour contrast chosen with accessibility in mind across dark and light sections.",
  "Semantic headings and landmarks so screen readers can navigate the page structure.",
  "Support for reduced-motion preferences — animations are shortened automatically if your device requests it.",
  "A mobile-first, responsive layout that works from small phone screens up to large desktop displays.",
];

export default function AccessibilityPage() {
  return (
    <>
      <LegalPageHeader title="Accessibility" lastUpdated={LAST_UPDATED} />
      <section className="bg-white py-14 sm:py-16">
        <Container>
          <div className="max-w-2xl space-y-5 text-sm leading-relaxed text-charcoal-700 sm:text-base">
            <p>
              {siteConfig.fullBrand} is built to be usable by as many people as possible, including people
              using screen readers, keyboard-only navigation, or browsers with reduced-motion settings
              enabled.
            </p>
            <ul className="space-y-2">
              {commitments.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-petrol-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p>
              This is a preview build, and we haven&apos;t yet run a full independent accessibility audit.
              If you encounter a genuine barrier using this site, we want to know — see our{" "}
              <a href="/contact" className="font-semibold text-petrol-600 underline underline-offset-2">
                Contact page
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
