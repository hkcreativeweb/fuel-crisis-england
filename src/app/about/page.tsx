import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Alert } from "@/components/ui/Alert";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.fullBrand}: an independent information and education website about fuel prices, taxation, household costs, wages and the wider economics behind what motorists pay at the pump.`,
};

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

const impartialityPoints = [
  "We aim to present information accurately and transparently, regardless of whether the evidence supports one interpretation, another interpretation, or shows that the answer is uncertain.",
  "Where a figure comes from an external organisation, we identify the source.",
  "Where data is incomplete, we say so.",
  "Where different methodologies produce different results, we explain the difference.",
  "We distinguish between documented facts, calculations, analysis and campaign or policy proposals.",
  "We do not present political opinions as facts.",
  "We do not ask visitors to adopt a particular political position.",
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
  "other clearly identified primary or reputable sources where necessary",
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

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy-950 py-16 sm:py-20">
        <Container>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-petrol-300">About Fuel Crisis England</p>
          <div className="mb-5 h-px w-12 bg-white/20" aria-hidden="true" />
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">Evidence before opinion.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            {siteConfig.name} is an independent information and education website created to help people
            understand fuel prices, taxation, household costs, wages, supply chains and the wider economics
            behind what motorists pay at the pump.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
            The website brings together data, explanations and interactive tools so visitors can explore
            the numbers for themselves.
          </p>
        </Container>
      </section>

      {/* 01: OUR PURPOSE */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading number="01" eyebrow="Our purpose" title="What this website is for" rule />
          <div className="mt-8 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {purposes.map((p) => (
              <div key={p} className="flex items-start gap-2.5 py-1.5">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-petrol-500" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-charcoal-700">{p}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-charcoal-700">
            The website is designed to help visitors ask informed questions and understand the evidence
            behind the numbers.
          </p>
        </Container>
      </section>

      {/* 02: INDEPENDENCE */}
      <section className="bg-navy-950 py-16 sm:py-20">
        <Container>
          <SectionHeading tone="dark" number="02" eyebrow="Independence" title="Independent of political parties and government" rule />
          <div className="mt-8 max-w-2xl space-y-4 text-sm leading-relaxed text-slate-300 sm:text-base">
            <p className="text-lg font-bold text-white">
              {siteConfig.name} is not affiliated with, owned by, operated by, or controlled by any
              political party, political campaign, government department, elected representative or
              government body.
            </p>
            <p>The website does not represent the views of any political party or government.</p>
            <p>
              Our aim is to provide information, data, explanations and tools that allow visitors to
              examine the evidence for themselves.
            </p>
          </div>
        </Container>
      </section>

      {/* 03: IMPARTIALITY */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading number="03" eyebrow="Impartiality" title="Our approach to impartiality" rule />
          <ul className="mt-8 max-w-2xl divide-y divide-slate-200 border-t border-slate-200">
            {impartialityPoints.map((point) => (
              <li key={point} className="py-4 text-sm leading-relaxed text-charcoal-700 sm:text-base">
                {point}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 04: OUR DATA */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading number="04" eyebrow="Our data" title="Where does the data come from?" rule />
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-charcoal-700 sm:text-base">
            The website uses publicly available information from sources such as:
          </p>
          <div className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {dataOrganisations.map((org) => (
              <div key={org} className="flex items-start gap-2.5 py-1.5">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-petrol-500" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-charcoal-700">{org}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 max-w-2xl border-l-2 border-petrol-500 py-1 pl-4">
            <p className="text-sm font-semibold leading-relaxed text-navy-900">
              Every important figure should have a source, date/period, unit and geographical scope where
              applicable.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/sources" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-petrol-600 hover:text-petrol-700">
              See our full Sources &amp; Methodology
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* 05: OUR TOOLS */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading number="05" eyebrow="Our tools" title="Explore the data" rule />
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
        </Container>
      </section>

      {/* Who we are */}
      <section className="bg-navy-950 py-16 sm:py-20">
        <Container>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-petrol-300">Who we are</p>
          <div className="mb-5 h-px w-12 bg-white/20" aria-hidden="true" />
          <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-slate-300 sm:text-base">
            <p className="text-lg font-bold text-white">
              {siteConfig.name} is an independent web project focused on fuel prices, economics, data and
              public information.
            </p>
            <p>
              Website created by{" "}
              <a href="https://www.hkcreativeweb.com/" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2 hover:text-white">
                HK Creative Web
              </a>
              .
            </p>
          </div>
          <div className="mt-8 max-w-2xl">
            <Alert tone="info" title="This is a preview build.">
              Several features on this site, including the live fuel price feed, the petition database, and
              public submission storage, are currently running in a clearly labelled demo mode while a
              production backend and further verified data sources are connected. Nothing on this site
              claims to be more real or more official than it is.
            </Alert>
          </div>
        </Container>
      </section>
    </>
  );
}
