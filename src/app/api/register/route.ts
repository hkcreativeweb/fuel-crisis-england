import { NextResponse } from "next/server";
import { registerForUpdates } from "@/lib/server/registration-store";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, errors: { form: "Invalid request." } }, { status: 400 });
  }

  // Honeypot: real visitors never fill this in. Report success to bots without storing anything.
  if (typeof body.companyWebsite === "string" && body.companyWebsite.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const forwarded = request.headers.get("x-forwarded-for");
  const result = await registerForUpdates({
    name: body.name,
    email: body.email,
    postcode: body.postcode,
    interests: body.interests,
    consent: body.consent,
    ip: forwarded ? forwarded.split(",")[0].trim() : "unknown",
  });

  if (!result.ok) {
    if (result.status === 400) return NextResponse.json({ success: false, errors: result.errors }, { status: 400 });
    return NextResponse.json({ success: false, errors: { form: result.error } }, { status: result.status });
  }
  return NextResponse.json({ success: true });
}
