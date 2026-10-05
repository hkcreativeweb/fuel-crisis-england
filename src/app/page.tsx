import type { Metadata } from "next";
import { PlannedProtestTeaser } from "@/components/home/PlannedProtestTeaser";
import { LatestNewsPreview } from "@/components/news/LatestNewsPreview";
import { LatestFuelPrices } from "@/components/home/LatestFuelPrices";
import { CartoonPanel } from "@/components/home/CartoonPanel";
import { HistoryTeaser } from "@/components/home/HistoryTeaser";
import { EuropeTeaser } from "@/components/home/EuropeTeaser";
import { PetitionBanner } from "@/components/petition/PetitionBanner";
import { PumpSign } from "@/components/home/PumpSign";
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
 * Homepage hierarchy: DATA -> EXPLANATION -> SOURCES -> EDITORIAL. Current prices, Fuel Duty and
 * VAT, key statistics, price history, Europe, then sources; the explainers, cartoons, tools,
 * news and calls to action follow. Every price comes from the same live GOV.UK weekly average
 * as the hero.
 */
export default async function HomePage() {
  const { figures } = await getLatestUkWeeklyAverage();
  const petrol = { petrolPence: figures.petrol.current, dataPeriod: figures.petrol.dataPeriod };
  const prices = { petrol: figures.petrol.current, diesel: figures.diesel.current, dataPeriod: figures.petrol.dataPeriod };

  return (
    <>
      <Hero />
      <LatestFuelPrices />
      <PumpSign />
      <TheBigQuestion />
      <GovernmentHasChoice />
      <TwentyPoundsSection {...petrol} />
      <HistoryTeaser />
      <EuropeTeaser />
      <SourcesTeaser />
      <PetitionBanner />
      <div className="cv-auto"><CartoonPanel n={2} tone="slate" /></div>
      <div className="cv-auto"><QuestionIsNotJustPrice /></div>
      <div className="cv-auto"><FollowOneLitreTeaser /></div>
      <div className="cv-auto"><ImpactSection /></div>
      <div className="cv-auto"><CalculatorSection prices={prices} /></div>
      <div className="cv-auto"><CartoonPanel n={4} tone="slate" /></div>
      <div className="cv-auto"><FuelQuiz {...petrol} /></div>
      <div className="cv-auto"><TheQuestionWeShouldAsk {...petrol} /></div>
      <div className="cv-auto"><PlannedProtestTeaser /></div>
      <div className="cv-auto"><LatestNewsPreview count={3} /></div>
      <div className="cv-auto"><TakeActionSection /></div>
      <div className="cv-auto"><FinalMessage /></div>
      <VisitCounter showCount={false} />
    </>
  );
}
