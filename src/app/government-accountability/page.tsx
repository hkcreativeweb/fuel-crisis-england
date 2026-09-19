import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { AskForEvidenceSection } from "@/components/mp/AskForEvidenceSection";
import { ShareVerifiedInfoSection } from "@/components/mp/ShareVerifiedInfoSection";
import { PublicResponseWall } from "@/components/mp/PublicResponseWall";
import { imageCredits } from "@/lib/data/image-credits";

const credit = imageCredits.parliament;

export const metadata: Metadata = {
  title: "Hold Government Accountable",
  description: "Ask for evidence and share verified information about fuel affordability, Fuel Duty and energy-company profits — lawfully and respectfully.",
};

export default function GovernmentAccountabilityPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20">
        <div className="absolute inset-0">
          <Image src={credit.src} alt={credit.alt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-navy-950/80" />
        </div>
        <Container className="relative">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-red-300">Hold government accountable</p>
          <div className="mb-5 h-px w-12 bg-white/20" aria-hidden="true" />
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">Government Accountability</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">
            Beyond a single email: ask for evidence, and share verified information lawfully and
            respectfully. We don&apos;t log who you contact — see our{" "}
            <a href="/privacy" className="font-semibold underline underline-offset-2">
              privacy approach
            </a>
            .
          </p>
          <div className="mt-6">
            <LinkButton href="/ask-your-mp" size="lg">
              Write to your MP
            </LinkButton>
          </div>
          <PhotoCredit credit={credit} className="mt-10" />
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="What to ask for" title="Ask For Answers, Ask For Evidence" className="mb-10" />
          <AskForEvidenceSection />
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <ShareVerifiedInfoSection />
        </Container>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Shared publicly, only if you choose" title="What Are MPs Saying?" className="mb-10" />
          <PublicResponseWall />
        </Container>
      </section>
    </>
  );
}
