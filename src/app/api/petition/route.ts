import { NextResponse } from "next/server";
import { recordPetitionSubmission, getPetitionStats } from "@/lib/server/petition-store";
import type { DriverCategory } from "@/lib/types";

const VALID_CATEGORIES: DriverCategory[] = [
  "commuter",
  "delivery-driver",
  "taxi-driver",
  "tradesperson",
  "small-business-owner",
  "family-household",
  "rural-driver",
  "other",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_SHORT = 120;
const MAX_LONG = 1500;

function sanitize(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  // Strip any HTML tags and collapse excess whitespace to reduce injection / markup risk.
  return value.replace(/<[^>]*>/g, "").trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, errors: { form: "Invalid request body." } }, { status: 400 });
  }

  // Honeypot: a hidden field real users never fill in. If populated, silently
  // report success to the bot without recording anything.
  if (typeof body.companyWebsite === "string" && body.companyWebsite.trim() !== "") {
    const stats = getPetitionStats();
    return NextResponse.json({ success: true, signatureCount: stats.signatureCount });
  }

  const fullName = sanitize(body.fullName, MAX_SHORT);
  const email = sanitize(body.email, MAX_SHORT);
  const postcode = sanitize(body.postcode, 12);
  const areaOrCounty = sanitize(body.areaOrCounty, MAX_SHORT);
  const category = sanitize(body.category, 40) as DriverCategory;
  const impactSummary = sanitize(body.impactSummary, MAX_LONG);
  const desiredChanges = sanitize(body.desiredChanges, MAX_LONG);
  const displayPublicly = body.displayPublicly === true;
  const privacyConsent = body.privacyConsent === true;

  const errors: Record<string, string> = {};
  if (!fullName) errors.fullName = "Enter your full name.";
  if (!email || !EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  if (!areaOrCounty) errors.areaOrCounty = "Enter your general area or county.";
  if (!VALID_CATEGORIES.includes(category)) errors.category = "Select an option.";
  if (!impactSummary || impactSummary.length < 10) errors.impactSummary = "Tell us how fuel prices are affecting you (at least 10 characters).";
  if (!privacyConsent) errors.privacyConsent = "You must agree to the privacy policy to submit the form.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  recordPetitionSubmission({
    areaOrCounty,
    category,
    impactSummary,
    displayPublicly,
  });

  const stats = getPetitionStats();

  // In this preview build there is no email service or database connected,
  // so full name, email, postcode, and desired changes are validated but
  // intentionally not persisted anywhere beyond this request/response cycle.
  void fullName;
  void email;
  void postcode;
  void desiredChanges;

  return NextResponse.json({ success: true, signatureCount: stats.signatureCount });
}
