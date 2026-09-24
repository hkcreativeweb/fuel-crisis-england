import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { createAdminSession, verifyPassword } from "@/lib/server/admin-auth";
import { redis } from "@/lib/server/redis";

const MAX_ATTEMPTS = 10;
const WINDOW_SECONDS = 15 * 60;

/** Counts login attempts per connection. Returns false once the limit is exceeded. */
async function withinAttemptLimit(request: Request): Promise<boolean> {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const key = `fce:admin:login-attempts:${createHash("sha256").update(ip).digest("hex")}`;
  const attempts = await redis<number>(["INCR", key]);
  // If storage is down, don't lock the owner out; the password check still applies.
  if (attempts === null) return true;
  if (attempts === 1) await redis(["EXPIRE", key, WINDOW_SECONDS]);
  return attempts <= MAX_ATTEMPTS;
}

export async function POST(request: Request) {
  if (!(await withinAttemptLimit(request))) {
    return NextResponse.json(
      { success: false, error: "Too many login attempts. Please wait 15 minutes and try again." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";
  if (!password || !verifyPassword(password)) {
    return NextResponse.json({ success: false, error: "Incorrect password." }, { status: 401 });
  }

  const session = await createAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Admin login is not configured." }, { status: 503 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(session.name, session.value, {
    maxAge: session.maxAge,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
  });
  return response;
}
