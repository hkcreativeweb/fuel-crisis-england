export type ProfitCapOption = {
  name: string;
  meaning: string;
  whoCouldBeAffected: string;
  legalProcess: string;
  possibleBenefits: string;
  possibleRisks: string;
  evidenceNeeded: string;
};

export const profitCapOptions: ProfitCapOption[] = [
  {
    name: "Windfall tax",
    meaning: "A one-off or temporary additional tax on profits considered unexpectedly high due to external circumstances, rather than a company's own decisions.",
    whoCouldBeAffected: "Typically targeted at a specific sector (e.g. energy companies) rather than the whole economy.",
    legalProcess: "Requires new tax legislation, usually introduced at a Budget or Finance Bill and passed by Parliament.",
    possibleBenefits: "Can raise revenue specifically tied to a period of unusually high sector profit, which government could direct toward support measures.",
    possibleRisks: "Could affect investment decisions, including in future energy supply; companies may adjust pricing or investment plans in response.",
    evidenceNeeded: "Clear definition of what counts as a 'windfall' versus ordinary profit, and evidence the profit arose from external circumstances rather than normal business performance.",
  },
  {
    name: "Excess-profit tax",
    meaning: "An ongoing (not one-off) tax applied specifically to profit above a defined benchmark, rather than the whole profit.",
    whoCouldBeAffected: "Companies whose profits exceed the defined threshold in a given period.",
    legalProcess: "Requires legislation defining the benchmark, the affected sector, and the rate, subject to parliamentary approval.",
    possibleBenefits: "Targets only the portion of profit considered 'excess,' potentially reducing the impact on normal business activity.",
    possibleRisks: "Defining a fair 'normal profit' benchmark is genuinely difficult and contested; could still affect investment incentives.",
    evidenceNeeded: "A defensible, evidence-based benchmark for what counts as normal versus excess profit in that industry.",
  },
  {
    name: "Temporary levy",
    meaning: "A time-limited additional charge, separate from a company's standard tax obligations, applied for a defined period.",
    whoCouldBeAffected: "Depends on how the levy is designed. Could be sector-wide or targeted.",
    legalProcess: "Requires legislation specifying the levy's scope, rate, and expiry.",
    possibleBenefits: "Time-limited nature may reduce long-term distortion to investment decisions compared with a permanent measure.",
    possibleRisks: "Companies may adjust behaviour around the levy's known end date; revenue is inherently temporary.",
    evidenceNeeded: "A clear justification for both the levy's introduction and its planned end date.",
  },
  {
    name: "Price controls",
    meaning: "Direct government limits on the price that can be charged for a product, rather than taxing profit.",
    whoCouldBeAffected: "Retailers and/or wholesalers, depending on where the control is applied.",
    legalProcess: "Would likely require new regulatory powers and primary legislation, and is a significantly more interventionist measure than a tax.",
    possibleBenefits: "Directly caps what consumers pay, rather than relying on tax revenue being redistributed.",
    possibleRisks: "Price controls can cause supply shortages or reduced investment if set below the cost of supply; historically contested as a policy tool in competitive markets.",
    evidenceNeeded: "Strong evidence that the market is not functioning competitively, since price controls in a competitive market can distort supply.",
  },
  {
    name: "Margin transparency requirements",
    meaning: "Requiring companies to publish more detailed information about their costs and margins, without directly capping profit or price.",
    whoCouldBeAffected: "Fuel retailers and/or wholesalers, depending on scope.",
    legalProcess: "Could be introduced through regulation or as a condition on relevant licences, potentially with a lighter legislative process than a new tax.",
    possibleBenefits: "Increases public and regulatory visibility without directly intervening in pricing.",
    possibleRisks: "Transparency alone does not guarantee lower prices; commercially sensitive information disclosure could raise objections from companies.",
    evidenceNeeded: "A clear specification of what needs to be disclosed and to what standard, to be genuinely useful.",
  },
  {
    name: "Competition investigation",
    meaning: "A formal regulatory investigation (e.g. by the CMA) into whether a market is functioning competitively.",
    whoCouldBeAffected: "Companies operating in the specific market under investigation.",
    legalProcess: "Carried out under existing competition law powers already held by the CMA. Does not require new primary legislation to initiate.",
    possibleBenefits: "Can identify specific anti-competitive practices with evidence, and lead to targeted remedies.",
    possibleRisks: "Investigations take time and may not find evidence of anti-competitive conduct even where prices are high for other reasons.",
    evidenceNeeded: "Indicators of potential competition problems, such as those the CMA already monitors in the road fuel market.",
  },
  {
    name: "Consumer-protection action",
    meaning: "Enforcement action under existing consumer protection law against specific unfair practices.",
    whoCouldBeAffected: "Any business found to have breached consumer protection law.",
    legalProcess: "Carried out under existing consumer protection law and regulatory powers.",
    possibleBenefits: "Targets specific unfair conduct directly, where it can be evidenced.",
    possibleRisks: "Does not address broadly high prices that arise from lawful market conditions rather than unfair practices.",
    evidenceNeeded: "Specific evidence of conduct that breaches consumer protection law, not just a high price or profit level.",
  },
  {
    name: "Targeted subsidies for essential drivers",
    meaning: "Financial support directed at people who depend on driving for work, care, disability, or rural necessity, rather than intervening in the market itself.",
    whoCouldBeAffected: "Does not directly affect energy companies. Instead supports specific groups of drivers.",
    legalProcess: "Would typically be delivered through existing welfare, tax credit, or grant mechanisms, subject to Budget decisions.",
    possibleBenefits: "Can be targeted precisely at those most affected, without intervening in market pricing.",
    possibleRisks: "Requires public funding; defining eligibility fairly and practically is a genuine design challenge.",
    evidenceNeeded: "Evidence of which groups are most affected and a workable way to identify and support them.",
  },
];
