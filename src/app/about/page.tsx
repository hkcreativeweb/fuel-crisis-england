import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

const CONTACT_EMAIL = "contact.fuelcrisisengland@gmail.com";

export const metadata: Metadata = pageMetadata("/about", {
  title: "About",
  description: `About ${siteConfig.fullBrand}: an independent information site explaining UK fuel prices, their wider impact and the policy debate around them, with clearly labelled ways to take part.`,
});

const purposes = [
  "Educate",
  "Inform",
  "Explain",
  "Provide accessible data",
  "Make complex economic information easier to understand",
  "Show how fuel prices are constructed",
  "Explain taxation and Fuel Duty",
  "Explore how fuel costs affect households and businesses",
  "Compare historical prices and wages",
  "Provide tools that allow people to explore the evidence themselves",
];

const impartialityPrinciples = [
  { title: "Source the numbers", description: "Where a figure comes from an external organisation, we identify the source." },
  { title: "Show uncertainty", description: "Where data is incomplete, estimated or subject to limitations, we say so." },
  { title: "Explain methodology", description: "Where different methodologies produce different results, we explain the difference." },
  { title: "Separate fact from interpretation", description: "We distinguish documented facts, calculations, analysis and campaign or policy proposals." },
  { title: "Don't present opinion as fact", description: "Political opinions and policy positions are not presented as established facts." },
  { title: "Let people examine the evidence", description: "The website provides information and tools so visitors can form their own views." },
];

const dataOrganisations = [
  "Office for National Statistics",
  "GOV.UK",
  "Department for Energy Security and Net Zero",
  "Bank of England",
  "HM Treasury",
  "HM Revenue & Customs",
  "Competition and Markets Authority",
  "European Commission",
  "Other clearly identified primary or reputable sources where necessary",
];

const tools = [
  { label: "Fuel Prices", href: "/live-fuel-prices", description: "See current and historical fuel prices." },
  { label: "Why Is Fuel So Expensive?", href: "/why-is-fuel-expensive", description: "Understand the components between crude oil and the pump." },
  { label: "Follow the Money", href: "/follow-the-money", description: "Explore Fuel Duty, VAT, industry economics and government revenue." },
  { label: "Cost of Living", href: "/cost-of-living", description: "Explore fuel alongside wages, inflation and household costs." },
  { label: "Europe", href: "/europe-compared", description: "Compare UK fuel prices with European data where methodologies are comparable." },
  { label: "Save Fuel", href: "/save-fuel-money", description: "Practical information about driving efficiency and vehicle maintenance." },
  { label: "Historical Explorer", href: "/fuel-prices-through-time", description: "Explore fuel prices, wages, tax and inflation across different years." },
  { label: "Sources & Evidence", href: "/sources", description: "See where the numbers come from." },
  { label: "Take Action", href: "/make-a-change", description: "Neutral information about lawful civic participation, contacting representatives and examining policy proposals." },
];

const interpretationChain = ["Crude oil", "Exchange rates", "Refining", "Wholesale", "Distribution", "Retail", "Taxation"];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-950 py-16 sm:py-20">
        <Container>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-petrol-300">About Fuel Crisis England</p>
          <div className="mb-5 h-px w-12 bg-white/20" aria-hidden="true" />
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">Evidence before opinion.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            {siteConfig.name} is an independent information site explaining UK fuel prices, their wider
            impact and the policy debate around them. It also provides clearly labelled opportunities for
            civic participation. We are not a political party and are not affiliated with any government or
            political party. Campaign proposals are clearly identified as proposals.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
            The website brings together data, explanations and interactive tools so visitors can explore
            the numbers for themselves.
          </p>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Data &bull; Context &bull; Transparency &bull; Public information</p>
        </Container>
      </section>

      {/* 01: OUR PURPOSE */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading number="01" eyebrow="Our purpose" title="What this website is for" rule />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-charcoal-700 sm:text-base">
            Fuel prices can look like a single number on a forecourt sign, but that number is influenced by
            multiple parts of the economy. Our purpose is to make those parts easier to understand.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {purposes.map((p) => (
              <div key={p} className="rounded-md border border-slate-200 px-4 py-3">
                <p className="text-sm font-semibold text-navy-900">{p}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-charcoal-700">
            The website is designed to help visitors ask informed questions and understand the evidence
            behind the numbers.
          </p>
        </Container>
      </section>

      {/* 02: INDEPENDENCE, FUNDING & BACKING */}
      <section className="bg-navy-950 py-16 sm:py-20">
        <Container>
          <SectionHeading tone="dark" number="02" eyebrow="Independence" title="Independent of political parties and government" rule />
          <div className="mt-8 max-w-2xl rounded-md border border-white/15 bg-white/5 p-6">
            <p className="text-lg font-bold text-white">
              {siteConfig.name} is not affiliated with, owned by, operated by, or controlled by any
              political party, political campaign, government department, elected representative or
              government body.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">The website does not represent the views of any political party or government.</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              {siteConfig.name} is an independent web project focused on fuel prices, economics, data and
              public information.
            </p>
          </div>

          <div className="mt-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-petrol-300">Funding &amp; backing</p>
            <p className="mt-2 text-base font-bold text-white">No political or corporate backing</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              {siteConfig.name} currently has no external funders, corporate sponsors, political backers or
              financial sponsors. The project is independently operated and is not directed by an outside
              political organisation, company, campaign or government body.
            </p>
            <p className="mt-4 border-l-2 border-petrol-400 pl-4 text-xs leading-relaxed text-slate-400">
              This means there are no external funders or sponsors directing the site&apos;s editorial or
              policy content.
            </p>
          </div>
        </Container>
      </section>

      {/* 03: IMPARTIALITY */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading number="03" eyebrow="Impartiality" title="Our approach to impartiality" rule />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-charcoal-700 sm:text-base">
            {siteConfig.name} aims to separate evidence, calculation, analysis and opinion.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {impartialityPrinciples.map((principle) => (
              <div key={principle.title} className="rounded-md border border-slate-200 p-5">
                <p className="text-sm font-bold text-navy-900">{principle.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal-700">{principle.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-charcoal-700">
            Evidence can be complicated. Our aim is to make it clearer, not to make the answer look simpler
            than it is.
          </p>
        </Container>
      </section>

      {/* 04: OUR DATA */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading number="04" eyebrow="Our data" title="Where does the data come from?" rule />
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-charcoal-700 sm:text-base">
            The website uses publicly available information from sources such as:
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dataOrganisations.map((org) => (
              <div key={org} className="rounded-md border border-slate-200 bg-white px-4 py-3">
                <p className="text-sm text-charcoal-700">{org}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 max-w-2xl border-l-2 border-petrol-500 py-1 pl-4">
            <p className="text-sm font-semibold leading-relaxed text-navy-900">
              Every important figure should have a source, date or period, unit and geographical scope
              where applicable.
            </p>
          </div>
          <div className="mt-6">
            <LinkButton href="/sources" variant="secondary">
              Sources &amp; Methodology →
            </LinkButton>
          </div>
        </Container>
      </section>

      {/* 05: EXPLORE THE DATA */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading number="05" eyebrow="Explore the data" title="Explore the evidence for yourself" rule />
          <div className="mt-10 grid gap-0 divide-y divide-slate-200 border-t border-slate-200 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-3">
            {tools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="group flex flex-col justify-between gap-3 p-6 transition-colors hover:bg-slate-50">
                <div>
                  <p className="text-base font-bold text-navy-900 group-hover:text-petrol-600">{tool.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{tool.description}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-charcoal-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-petrol-500"
                >
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 06: A NOTE ON INTERPRETATION */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading number="06" eyebrow="A note on interpretation" title="Reading these figures carefully" rule />
          <div className="mt-8 max-w-2xl space-y-4 text-sm leading-relaxed text-charcoal-700 sm:text-base">
            <p>
              Fuel prices are influenced by multiple factors, including crude oil prices, exchange rates,
              refining, wholesale markets, distribution, retail costs and taxation.
            </p>
            <p>
              Government policy is one part of the overall system, and the website does not claim that any
              single organisation or factor determines the pump price.
            </p>
            <p>
              Historical comparisons should be interpreted carefully because economic conditions, vehicle
              efficiency, household composition, wages, taxes and statistical methodologies change over
              time.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-1.5 gap-y-2">
            {interpretationChain.map((step, i) => (
              <span key={step} className="flex items-center gap-1.5">
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy-900 ring-1 ring-slate-200">{step}</span>
                {i < interpretationChain.length - 1 ? (
                  <span className="text-slate-400" aria-hidden="true">
                    →
                  </span>
                ) : null}
              </span>
            ))}
          </div>
          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-charcoal-500">
            These factors interact with each other and can each change independently, so no single stage
            determines the price on its own.
          </p>
        </Container>
      </section>

      {/* 07: WHO WE ARE */}
      <section className="bg-navy-950 py-16 sm:py-20">
        <Container>
          <SectionHeading tone="dark" number="07" eyebrow="Who we are" title="An independent web project" rule />
          <div className="mt-8 max-w-2xl space-y-4 text-sm leading-relaxed text-slate-300 sm:text-base">
            <p className="text-lg font-bold text-white">
              {siteConfig.name} is an independent, non-profit web project focused on fuel prices,
              economics, data and public information.
            </p>
            <p>
              We aim to make complex information easier to understand, provide transparent sources and give
              visitors tools to explore the evidence themselves.
            </p>
            <p className="pt-2 text-xs font-bold uppercase tracking-[0.14em] text-petrol-300">Created by HK Creative Web</p>
            <p>
              Website created by{" "}
              <a href="https://www.hkcreativeweb.com/" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2 hover:text-white">
                HK Creative Web
              </a>
              .
            </p>
          </div>
        </Container>
      </section>

      {/* 08: CONTACT */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">Have an idea? Get in touch.</h2>
            <p className="mt-4 text-sm leading-relaxed text-charcoal-700 sm:text-base">
              {siteConfig.name} is built to give people a place to understand fuel prices, share
              information and discuss practical policy ideas.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-charcoal-700 sm:text-base">
              If you have a suggestion, idea, question, correction, or topic you think we should
              investigate, we&apos;d like to hear from you. Your feedback can help us improve the website
              and make sure we&apos;re covering the issues that matter to motorists, households and
              businesses.
            </p>
            <p className="mt-5 break-words text-sm font-semibold text-petrol-600 sm:text-base">{CONTACT_EMAIL}</p>
            <div className="mt-6">
              <LinkButton href={`mailto:${CONTACT_EMAIL}`} size="lg">
                Email Us
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
