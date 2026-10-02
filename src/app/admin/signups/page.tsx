import type { Metadata } from "next";
import { SignupsDashboard } from "@/components/admin/SignupsDashboard";

export const metadata: Metadata = {
  title: "Sign-ups",
  robots: { index: false, follow: false },
};

export default function AdminSignupsPage() {
  return <SignupsDashboard />;
}
