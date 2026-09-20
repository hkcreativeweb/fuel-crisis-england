import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { FuelSavingTipsGrid } from "@/components/save-money/FuelSavingTipsGrid";
import { BootChecklist } from "@/components/save-money/BootChecklist";
import { JourneyPlanningExample } from "@/components/save-money/JourneyPlanningExample";
import { PersonalSavingsCalculator } from "@/components/save-money/PersonalSavingsCalculator";
import { SevenDayChallenge } from "@/components/save-money/SevenDayChallenge";
import { ToolsSection } from "@/components/save-money/ToolsSection";
import { RegularServicingSection } from "@/components/save-money/RegularServicingSection";
import { FuelAdditivesSection } from "@/components/save-money/FuelAdditivesSection";
import { UseTheRightFuelSection } from "@/components/save-money/UseTheRightFuelSection";
import { DontPayMoreSection } from "@/components/save-money/DontPayMoreSection";
import { MaintenanceChecklist } from "@/components/save-money/MaintenanceChecklist";
import { imageCredits } from "@/lib/data/image-credits";

export const metadata: Metadata = {
  title: "Save Fuel. Save Money.",
  description: "Practical, honestly-explained fuel-saving tips, a personal savings calculator, a 7-day challenge, and tools to help you save money on petrol and diesel.",
};

const credit = imageCredits["hero-petrol-station"];

export default function SaveMoneyPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20">
        <div className="absolute inset-0">
          <Image src={credit.src} alt={credit.alt} fill priority sizes="100vw" className="object-cover object-[75%_60%]" />
          <div className="absolute inset-0 bg-navy-950/80" />
        </div>
        <Container className="relative">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-teal-300">Protect your household today</p>
          <div className="mb-5 h-px w-12 bg-white/20" aria-hidden="true" />
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">Save Fuel. Save Money.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">
            Genuinely useful, practical guidance, not generic tips. Every suggestion explains what to do,
            why it works, how much it may help, and what assumptions apply.
          </p>
          <PhotoCredit credit={credit} className="mt-10" />
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Fuel-saving driving tips" title="What actually helps, and why" className="mb-10" />
          <FuelSavingTipsGrid />
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <BootChecklist />
            <JourneyPlanningExample />
          </div>
        </Container>
      </section>

      <section id="maintenance" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="The single biggest thing most people skip" title="Regular servicing can save you money" className="mb-10" />
          <RegularServicingSection />
        </Container>
      </section>

      <section id="fuel-additives" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="A common question" title="What about fuel additives?" description="Petrol and diesel fuel-system cleaners, injector cleaners, and other additives: what they're for, honestly explained." className="mb-10" />
          <FuelAdditivesSection />
        </Container>
      </section>

      <section id="right-fuel" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="A simple one" title="Use the right fuel" className="mb-10" />
          <UseTheRightFuelSection />
        </Container>
      </section>

      <section id="shop-around" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Every penny counts" title="Don't pay more than you need to" className="mb-10" />
          <DontPayMoreSection />
        </Container>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="See it in numbers" title="How much could you save?" description="Compare your current driving against a more efficient scenario you choose." className="mb-10" />
          <PersonalSavingsCalculator />
        </Container>
      </section>

      <section id="checklist" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Put it into practice" title="Practical maintenance checklist" className="mb-10" />
          <MaintenanceChecklist />
        </Container>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="A fun way to start" title="The 7-Day Fuel-Saving Challenge" className="mb-10" />
          <div className="max-w-2xl">
            <SevenDayChallenge />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Tools that can help you save" title="Apps and tools worth knowing about" className="mb-10" />
          <ToolsSection />
        </Container>
      </section>
    </>
  );
}
