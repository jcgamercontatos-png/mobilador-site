import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

export default function SecureDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isAdminAuthenticated()) redirect("/painel-jcgamer/login");
  return children;
}

