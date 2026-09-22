import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/server/admin-auth";
import { getCommentsByStatus, type CommentStatus } from "@/lib/server/comment-store";

const VALID_STATUSES: CommentStatus[] = ["pending", "approved", "rejected"];

export async function GET(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get("status") || "pending";
  if (!VALID_STATUSES.includes(statusParam as CommentStatus)) {
    return NextResponse.json({ success: false, error: "Invalid status." }, { status: 400 });
  }

  const comments = await getCommentsByStatus(statusParam as CommentStatus);
  if (comments === null) {
    return NextResponse.json({ success: false, error: "Storage temporarily unavailable." }, { status: 503 });
  }

  return NextResponse.json({ success: true, comments });
}
