export type TakeActionOption = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

export const takeActionOptions: TakeActionOption[] = [
  {
    title: "Contact your MP",
    description: "Ask your MP about Fuel Duty, VAT, energy-company profits, and fuel affordability with an evidence-based email template.",
    href: "/ask-your-mp",
    linkLabel: "Write to your MP",
  },
  {
    title: "Sign FCE's public petition",
    description: "Add your name to call for transparency and answers on fuel affordability. This is FCE's own petition, not an official UK Parliament petition.",
    href: "/petition",
    linkLabel: "Sign FCE's petition",
  },
  {
    title: "Sign an official UK Parliament petition",
    description: "View and sign currently open, official UK Parliament petitions relating to fuel duty and VAT. Signing happens directly on the official Parliament website.",
    href: "/have-your-say#uk-petitions",
    linkLabel: "View UK Parliament petitions",
  },
  {
    title: "Share your fuel cost experience",
    description: "Tell us how fuel prices are affecting you. Anonymised, moderated experiences help build a fuller picture.",
    href: "/petition",
    linkLabel: "Share your experience",
  },
  {
    title: "Learn about peaceful protest",
    description: "Understand how to take part in lawful, peaceful civic action safely and responsibly.",
    href: "/make-a-change#peaceful-protest",
    linkLabel: "Read the guidance",
  },
  {
    title: "Join a public meeting",
    description: "Look out for local, lawfully organised public meetings and community discussions on fuel affordability.",
    href: "/make-a-change#public-meetings",
    linkLabel: "Learn more",
  },
  {
    title: "Share verified information",
    description: "Help others by sharing verified facts and official sources rather than speculation.",
    href: "/sources",
    linkLabel: "Browse verified sources",
  },
  {
    title: "Contact consumer organisations",
    description: "Consumer bodies such as Citizens Advice and Which? can advise on consumer rights and escalate patterns of concern.",
    href: "https://www.citizensadvice.org.uk/",
    linkLabel: "Visit Citizens Advice",
  },
  {
    title: "Respond to government consultations",
    description: "When government or regulators open public consultations relevant to fuel or energy policy, submitting a response is a direct, lawful way to be heard.",
    href: "https://www.gov.uk/government/publications?publication_filter_option=consultations",
    linkLabel: "Browse GOV.UK consultations",
  },
  {
    title: "Support community fuel-saving initiatives",
    description: "Car-sharing schemes, local lift-shares, and community transport groups can reduce costs for everyone involved.",
    href: "/save-fuel-money",
    linkLabel: "See fuel-saving ideas",
  },
  {
    title: "Discuss fuel affordability with local representatives",
    description: "Local councillors and representatives can also raise fuel affordability concerns, alongside your MP.",
    href: "/ask-your-mp",
    linkLabel: "Start with your MP",
  },
];
