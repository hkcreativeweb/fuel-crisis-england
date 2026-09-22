import { NextResponse } from "next/server";
import { createAdminSession, verifyPassword } from "@/lib/server/admin-auth";

export async function POST(request: Request) {
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
