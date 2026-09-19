export type ImpactGroup = {
  title: string;
  summary: string;
  example: string;
};

export const impactGroups: ImpactGroup[] = [
  {
    title: "Families and households",
    summary:
      "The school run, weekly shop, and family visits all rely on affordable fuel. Rising prices compete directly with other essential household costs.",
    example:
      "Example: a household running two cars for school and work journeys may need to budget significantly more per month than they did a year earlier.",
  },
  {
    title: "Commuters",
    summary:
      "Drivers without practical access to public transport have no choice but to absorb higher costs simply to get to work.",
    example:
      "Example: a commuter driving 40 miles a day has little flexibility to reduce fuel spending without changing jobs or moving house.",
  },
  {
    title: "Delivery drivers",
    summary:
      "Fuel is one of the largest single costs for delivery work, and price rises can erode already thin margins.",
    example:
      "Example: a self-employed courier covering 150 miles a day feels every price rise almost immediately in take-home pay.",
  },
  {
    title: "Taxi and private hire drivers",
    summary:
      "High daily mileage means taxi and private hire drivers are especially exposed to fuel price volatility.",
    example:
      "Example: a taxi driver working long shifts may need to raise fares or absorb the cost, affecting both driver income and passenger prices.",
  },
  {
    title: "Tradespeople",
    summary:
      "Vans and tools are the backbone of trades work. Fuel costs for travelling between jobs add up quickly across a working week.",
    example:
      "Example: an electrician travelling between multiple sites a day may see fuel become one of their largest weekly business expenses.",
  },
  {
    title: "Small businesses",
    summary:
      "Transport and logistics costs feed into the price of goods and services, putting pressure on small business margins and customers alike.",
    example:
      "Example: a small delivery business may face a choice between absorbing rising fuel costs or passing them on to customers.",
  },
  {
    title: "Rural communities",
    summary:
      "Where public transport is limited, a car is often not optional. Rural drivers frequently travel further for work, healthcare, and shopping.",
    example:
      "Example: a rural resident may need to drive 20 miles or more for a hospital appointment with no practical alternative to driving.",
  },
  {
    title: "People who depend on cars for work",
    summary:
      "For many jobs — care work, sales, mobile services — a car is a basic requirement of employment, not a lifestyle choice.",
    example:
      "Example: a home care worker visiting multiple clients a day relies entirely on their car to do their job.",
  },
];
