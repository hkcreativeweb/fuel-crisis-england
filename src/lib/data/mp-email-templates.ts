import type { MPDemandTopicId, MPEmailTopic } from "@/lib/types";

export type MPEmailTemplate = {
  topic: MPEmailTopic;
  label: string;
  subject: string;
  body: string;
};

const coreTemplate = `Dear [MP NAME],

I am writing as a constituent because the cost of petrol and diesel is having a significant impact on motorists, families, commuters and businesses.

I am asking you to consider the pressure that fuel costs place on household and business budgets, particularly when people depend on a vehicle to get to work, run a business, care for family members or carry out essential journeys.

I also want to understand what action the Government is prepared to take. Fuel Duty is a government-set tax, and the Government has previously demonstrated that it can change the rate, including through temporary reductions and subsequent extensions or adjustments.

Given the continuing pressure on household finances, I would like to ask:

1. What is the Government's current position on Fuel Duty?
2. Will the Government consider maintaining, freezing or reducing Fuel Duty if fuel prices place significant additional pressure on households and businesses?
3. What assessment has been made of the effect of Fuel Duty and VAT on motorists and businesses?
4. What steps is the Government taking to ensure that motorists receive fair value at the pump?
5. What discussions are taking place with the fuel and energy industry regarding competition, pricing and consumer protection?
6. What further measures could be taken to reduce fuel-cost pressures without creating unsustainable public finances?

I recognise that fuel prices are affected by many factors, including global crude oil prices, exchange rates, refining costs, distribution, competition, taxation and market conditions. However, because the Government has direct influence over taxation policy, I believe it is reasonable for constituents to ask what choices are available and what evidence is being used to make those decisions.

I would therefore appreciate a clear response setting out:

* the Government's current Fuel Duty policy;
* whether any further changes are being considered;
* what assessment has been made of the impact on motorists and businesses;
* and what action the Government believes is appropriate if fuel affordability deteriorates further.

I would also appreciate your response as my elected representative on what you believe should be done to address fuel affordability in our area.

Kind regards,
[NAME]
[POSTCODE]`;

const competitionTemplate = `Dear [MP NAME],

I am writing as a constituent about fuel prices and competition in the road fuel retail market.

Fuel is a necessity for many people in our area, whether for commuting, running a business, or essential travel. I would like to understand what oversight exists to ensure fair pricing and healthy competition between fuel retailers.

I would be grateful if you could help me understand:

1. What role does the Competition and Markets Authority (CMA) play in monitoring the road fuel market, and what has its most recent monitoring found?
2. Are there any known competition concerns specific to our constituency or region?
3. What powers do regulators have if a lack of competition is found to be keeping prices higher than they should be?
4. What is the Government's assessment of retailer margins on fuel, and how does this compare with previous years?
5. What action, if any, is being taken in response to CMA findings on the road fuel market?

I understand that fuel prices are shaped by many factors beyond any single retailer's control, including global oil prices, wholesale costs, and taxation. My question is specifically about whether competition in the retail market is working as it should for consumers in our area.

I would appreciate your response, including any relevant information from the CMA or Government on this issue.

Kind regards,
[NAME]
[POSTCODE]`;

const costOfLivingTemplate = `Dear [MP NAME],

I am writing as a constituent about the combined pressure of fuel costs and the wider cost of living on households and businesses in our area.

Fuel costs do not exist in isolation — they interact with wages, inflation, housing costs, and interest rates to shape what people can actually afford. I would like to understand the Government's overall approach to these combined pressures.

I would be grateful for your views on:

1. How does the Government assess the combined impact of fuel costs, inflation, and housing costs on household budgets?
2. What cost-of-living support is currently available to people struggling with these combined pressures?
3. How does the Government view the relationship between wage growth and the cost of living, including fuel costs?
4. What role, if any, does Fuel Duty and VAT policy play in the Government's wider cost-of-living strategy?
5. What further support or policy changes are being considered given continuing pressure on household finances?

I recognise these are complex, interconnected issues without simple answers. I am asking so that I can better understand the evidence behind current policy and what further action may be under consideration.

I would appreciate a considered response setting out the Government's current position and any planned next steps.

Kind regards,
[NAME]
[POSTCODE]`;

export type MPDemandQuestion = {
  id: MPDemandTopicId;
  label: string;
  questions: string[];
};

/**
 * The main, comprehensive MP email. Selectable question blocks let the
 * user include only the topics they care about — the intro and closing
 * are fixed, but the numbered questions are built from whichever topics
 * are selected.
 */
export const masterEmailSubject = "Request for action on Fuel Duty, fuel affordability and energy-company profits";

export const masterEmailIntro = `Dear [MP NAME],

I am writing as your constituent because the cost of petrol and diesel is placing increasing pressure on motorists, families, commuters, essential drivers and businesses.

Fuel is not an isolated expense. Higher fuel costs can affect deliveries, transport, food prices, tradespeople, taxi drivers, logistics, household budgets and the wider cost of living.

I recognise that fuel prices are affected by several factors, including global crude oil prices, exchange rates, refining costs, distribution, competition, retailer costs and taxation.

However, the Government has direct influence over Fuel Duty policy and has previously demonstrated that it can change fuel-tax rates.

I would therefore like to ask what action the Government is prepared to take to reduce fuel-cost pressures.

Specifically, I would appreciate your response to the following questions:`;

export const masterEmailQuestionBlocks: MPDemandQuestion[] = [
  {
    id: "freeze-duty",
    label: "Freeze Fuel Duty",
    questions: ["Will the Government commit to freezing Fuel Duty while fuel prices and wider living costs remain under serious pressure?"],
  },
  {
    id: "review-duty-vat",
    label: "Review Fuel Duty and VAT",
    questions: [
      "What assessment has been made of the effect of Fuel Duty and VAT on motorists, commuters, families and small businesses?",
      "Will the Government publish a clear explanation of how much revenue it receives from Fuel Duty and fuel-related VAT?",
    ],
  },
  {
    id: "support-essential-drivers",
    label: "Support essential drivers",
    questions: [
      "Will the Government consider targeted support for people who depend on vehicles for work, caring responsibilities, disability-related travel, rural journeys and essential services?",
    ],
  },
  {
    id: "improve-transparency",
    label: "Improve fuel-price transparency",
    questions: ["What steps are being taken to ensure that motorists receive fair value at the pump?"],
  },
  {
    id: "investigate-profits",
    label: "Investigate energy-company profits",
    questions: ["What discussions are taking place with major fuel and energy companies about pricing, competition, transparency and consumer protection?"],
  },
  {
    id: "windfall-measures",
    label: "Consider windfall or excess-profit measures",
    questions: [
      "Will the Government examine whether temporary windfall taxes, excess-profit measures, profit-limit mechanisms or other appropriate measures should be considered where companies make unusually high profits during a serious cost-of-living crisis?",
      "If such measures are not being considered, what is the Government's reasoning?",
    ],
  },
  {
    id: "cost-of-living-knock-on",
    label: "Address the wider cost-of-living knock-on effect",
    questions: ["What safeguards are being considered to prevent fuel-cost pressures from creating further knock-on effects on food, deliveries, transport and household bills?"],
  },
];

export const masterEmailClosing = `I understand that any tax or profit-related measure must consider public finances, investment, employment, energy security, legal requirements and possible unintended consequences.

Nevertheless, I believe constituents are entitled to ask why motorists are facing such pressure while government receives substantial fuel-tax revenue and major energy companies report billions in profits.

I am not asking for unsupported claims or political slogans. I am asking for transparent figures, clear explanations and a detailed account of the policy choices available.

Please could you explain:

* the Government's current Fuel Duty policy;
* whether a Fuel Duty freeze is being considered;
* what impact assessment has been made;
* whether excess-profit or windfall measures are being examined;
* and what practical steps will be taken to support people affected by fuel costs?

I would appreciate a clear written response.

Kind regards,
[NAME]
[POSTCODE]`;

export const mpEmailTemplates: MPEmailTemplate[] = [
  {
    topic: "fuel-duty",
    label: "Fuel Duty",
    subject: "Fuel prices, Fuel Duty and the cost of living — request for action",
    body: coreTemplate,
  },
  {
    topic: "fuel-prices-competition",
    label: "Fuel Prices & Competition",
    subject: "Fuel prices and competition in the road fuel market — request for information",
    body: competitionTemplate,
  },
  {
    topic: "cost-of-living",
    label: "Cost of Living",
    subject: "Fuel costs and the wider cost of living — request for the Government's position",
    body: costOfLivingTemplate,
  },
];
