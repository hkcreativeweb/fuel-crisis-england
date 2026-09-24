import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { QuestionIsNotJustPrice } from "@/components/home/QuestionIsNotJustPrice";
import { FollowOneLitreTeaser } from "@/components/home/FollowOneLitreTeaser";
import { TheBigQuestion } from "@/components/home/TheBigQuestion";
import { GovernmentMakesMoneyToo } from "@/components/home/GovernmentMakesMoneyToo";
import { FuelQuiz } from "@/components/home/FuelQuiz";
import { TwentyPoundsSection } from "@/components/home/TwentyPoundsSection";
import { ImpactSection } from "@/components/home/ImpactSection";
import { FuelIsNotJustAFuelProblem } from "@/components/home/FuelIsNotJustAFuelProblem";
import { CalculatorSection } from "@/components/home/CalculatorSection";
import { GovernmentHasChoice } from "@/components/home/GovernmentHasChoice";
import { TheQuestionWeShouldAsk } from "@/components/home/TheQuestionWeShouldAsk";
import { SourcesTeaser } from "@/components/home/SourcesTeaser";
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

/**
 * The homepage reads as one investigation: the hook, how a litre is priced,
 * where the money goes, a quick quiz, what £20 buys, who feels it, what a price change
 * means for you, what policy could change, the evidence, then what you can do.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <QuestionIsNotJustPrice />
      <FollowOneLitreTeaser />
      <TheBigQuestion />
      <GovernmentMakesMoneyToo />
      <FuelQuiz />
      <TwentyPoundsSection />
      <ImpactSection />
      <FuelIsNotJustAFuelProblem />
      <CalculatorSection />
      <GovernmentHasChoice />
      <TheQuestionWeShouldAsk />
      <SourcesTeaser />
      <TakeActionSection />
      <AboutHomeSection />
      <FinalMessage />
      <VisitCounter />
    </>
  );
}
