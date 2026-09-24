/** Categories a Have Your Say comment can be filed under. Shared by the form, the API and the list filter. */
export const COMMENT_TOPICS = [
  "Fuel prices",
  "Fuel Duty",
  "VAT",
  "Retail pricing",
  "Cost of living",
  "Transport",
  "Electric vehicles",
  "Other",
] as const;

export type CommentTopic = (typeof COMMENT_TOPICS)[number];

export function isCommentTopic(value: unknown): value is CommentTopic {
  return typeof value === "string" && (COMMENT_TOPICS as readonly string[]).includes(value);
}
