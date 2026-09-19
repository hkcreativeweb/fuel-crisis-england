import type { MPResponseSubmission } from "@/lib/types";

/**
 * Example entries only, clearly marked as such — illustrating the card
 * format. Real submissions go through moderation and are never
 * auto-published.
 */
export const exampleMPResponses: MPResponseSubmission[] = [
  {
    id: "example-1",
    mpName: "Example MP",
    constituency: "Example Constituency",
    date: "2026-06-12",
    text: "Example editorial note: this is what a constituent's brief summary of an MP's reply might look like once shared and moderated — for instance, noting that the MP raised the matter with the Treasury and would follow up in writing.",
    quoteType: "editorial",
    sourceDocument: null,
    moderationStatus: "example",
  },
  {
    id: "example-2",
    mpName: "Example MP",
    constituency: "Example Constituency",
    date: "2026-07-03",
    text: "Example direct quote: \"Thank you for raising this important issue. I share your concerns about the impact of fuel costs on constituents and will continue to press the Treasury on this matter.\"",
    quoteType: "direct-quote",
    sourceDocument: "Example: reply letter, 3 July 2026",
    moderationStatus: "example",
  },
];
