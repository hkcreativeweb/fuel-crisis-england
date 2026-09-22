import type { Metadata } from "next";
import { AdminCommentsDashboard } from "@/components/admin/AdminCommentsDashboard";

export const metadata: Metadata = {
  title: "Comment Moderation",
  robots: { index: false, follow: false },
};

export default function AdminCommentsPage() {
  return <AdminCommentsDashboard />;
}
