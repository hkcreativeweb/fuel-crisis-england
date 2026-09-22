import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { StopAndThink } from "@/components/ui/StopAndThink";
import { FuelIsNotJustAFuelProblem } from "@/components/home/FuelIsNotJustAFuelProblem";
import { TheBigQuestion } from "@/components/home/TheBigQuestion";
import { GovernmentMakesMoneyToo } from "@/components/home/GovernmentMakesMoneyToo";
import { GovernmentHasChoice } from "@/components/home/GovernmentHasChoice";
import { TheQuestionWeShouldAsk } from "@/components/home/TheQuestionWeShouldAsk";
import { QuestionIsNotJustPrice } from "@/components/home/QuestionIsNotJustPrice";
import { TwoPathways } from "@/components/home/TwoPathways";
import { ImpactSection } from "@/components/home/ImpactSection";
import { TakeActionSection } from "@/components/home/TakeActionSection";
import { AboutHomeSection } from "@/components/home/AboutHomeSection";
import { FinalMessage } from "@/components/home/FinalMessage";
import { VisitCounter } from "@/components/home/VisitCounter";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.fullBrand} | Fuel Prices, Savings and Accountability`,
  },
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StopAndThink id="explore-evidence">A current price isn&apos;t an annual average.</StopAndThink>
      <FuelIsNotJustAFuelProblem />
      <TheBigQuestion />
      <GovernmentMakesMoneyToo />
      <GovernmentHasChoice />
      <TheQuestionWeShouldAsk />
      <QuestionIsNotJustPrice />
      <TwoPathways />
      <ImpactSection />
      <TakeActionSection />
      <AboutHomeSection />
      <FinalMessage />
      <VisitCounter />
    </>
  );
}
