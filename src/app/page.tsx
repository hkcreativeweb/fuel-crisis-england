import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { QuestionIsNotJustPrice } from "@/components/home/QuestionIsNotJustPrice";
import { FollowOneLitreTeaser } from "@/components/home/FollowOneLitreTeaser";
import { TheBigQuestion } from "@/components/home/TheBigQuestion";
import { FuelQuiz } from "@/components/home/FuelQuiz";
import { TwentyPoundsSection } from "@/components/home/TwentyPoundsSection";
import { ImpactSection } from "@/components/home/ImpactSection";
import { CalculatorSection } from "@/components/home/CalculatorSection";
import { GovernmentHasChoice } from "@/components/home/GovernmentHasChoice";
import { TheQuestionWeShouldAsk } from "@/components/home/TheQuestionWeShouldAsk";
import { SourcesTeaser } from "@/components/home/SourcesTeaser";
import { TakeActionSection } from "@/components/home/TakeActionSection";
import { FinalMessage } from "@/components/home/FinalMessage";
import { VisitCounter } from "@/components/home/VisitCounter";
import { getLatestUkWeeklyAverage } from "@/lib/data/desnz-weekly-prices";
import { siteConfig } from "@/lib/site-config";

const description =
  "See what's in the price of a litre of fuel in the UK: official prices, Fuel Duty, VAT and where your money goes, with every figure sourced.";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.fullBrand} | Fuel Prices, Savings and Accountability`,
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.fullBrand,
    description,
    url: "/",
    siteName: siteConfig.fullBrand,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.fullBrand,
    description,
  },
};

/**
 * The homepage reads as one investigation: the hook, how a litre is priced,
 * where the money goes, a quick quiz, what £20 buys, who feels it, what a
 * 10p change means for you, the policy picture and its numbers, the
 * evidence, then what you can do, ending with who we are. Every price on the page comes from the
 * same live GOV.UK weekly average as the hero.
 */
export default async function HomePage() {
  const { figures } = await getLatestUkWeeklyAverage();
  const petrol = { petrolPence: figures.petrol.current, dataPeriod: figures.petrol.dataPeriod };

  return (
    <>
      <Hero />
      <QuestionIsNotJustPrice />
      <FollowOneLitreTeaser />
      <TheBigQuestion />
      <FuelQuiz {...petrol} />
      <TwentyPoundsSection {...petrol} />
      <ImpactSection />
      <CalculatorSection />
      <GovernmentHasChoice />
      <TheQuestionWeShouldAsk {...petrol} />
      <SourcesTeaser />
      <TakeActionSection />
      <FinalMessage />
      <VisitCounter showCount={false} />
    </>
  );
}
