import type { Metadata } from "next";

import { AdminOverview } from "@/components/admin-overview";

export const metadata: Metadata = {
  title: "Admin",
  description: "Fabrician admin operations and deployment readiness.",
};

export default function AdminPage() {
  return <AdminOverview />;
}
