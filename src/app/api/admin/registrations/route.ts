import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/server/admin-auth";
import { deleteRegistration, listRegistrations, registrationsToCsv } from "@/lib/server/registration-store";
import { getPetitionSignatureCount } from "@/lib/server/petition-store";

export async function GET(request: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });

  const rows = await listRegistrations();
  if (rows === null) return NextResponse.json({ success: false, error: "Storage temporarily unavailable." }, { status: 503 });

  if (new URL(request.url).searchParams.get("format") === "csv") {
    return new NextResponse(registrationsToCsv(rows), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="fce-registrations.csv"',
        "Cache-Control": "no-store",
      },
    });
  }
  return NextResponse.json({ success: true, registrations: rows, petitionSignatures: await getPetitionSignatureCount() });
}

export async function DELETE(request: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id") ?? "";
  const ok = await deleteRegistration(id);
  return NextResponse.json({ success: ok }, { status: ok ? 200 : 404 });
}
