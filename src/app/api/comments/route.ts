import { NextResponse } from "next/server";
import { getApprovedComments, submitComment } from "@/lib/server/comment-store";

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 30;

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = Math.max(0, Number(searchParams.get("offset")) || 0);
  const limit = Math.min(MAX_LIMIT, Math.max(1, Number(searchParams.get("limit")) || DEFAULT_LIMIT));

  const result = await getApprovedComments(offset, limit);
  if (result === null) {
    return NextResponse.json({ comments: [], hasMore: false, available: false });
  }
  return NextResponse.json({ ...result, available: true });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, errors: { form: "Invalid request body." } }, { status: 400 });
  }

  // Honeypot: a hidden field real users never fill in. Silently report
  // success to bots without recording anything.
  if (typeof body.companyWebsite === "string" && body.companyWebsite.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const result = await submitComment({
    name: body.name,
    email: body.email,
    topic: body.topic,
    comment: body.comment,
    ip: clientIp(request),
  });

  if (!result.ok) {
    if (result.status === 400) {
      return NextResponse.json({ success: false, errors: result.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, errors: { form: result.error } }, { status: result.status });
  }

  return NextResponse.json({ success: true });
}
