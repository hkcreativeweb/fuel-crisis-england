import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/server/admin-auth";
import { deleteComment, moderateComment, type CommentStatus } from "@/lib/server/comment-store";

const VALID_STATUSES: CommentStatus[] = ["pending", "approved", "rejected"];

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  const status = body.status;
  if (typeof status !== "string" || !VALID_STATUSES.includes(status as CommentStatus)) {
    return NextResponse.json({ success: false, error: "Invalid status." }, { status: 400 });
  }

  const ok = await moderateComment(id, status as CommentStatus);
  if (!ok) {
    return NextResponse.json({ success: false, error: "Comment not found or storage unavailable." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const ok = await deleteComment(id);
  if (!ok) {
    return NextResponse.json({ success: false, error: "Comment not found or storage unavailable." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
