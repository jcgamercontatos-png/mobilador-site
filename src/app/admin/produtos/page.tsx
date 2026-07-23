import { redirect } from "next/navigation";

export default function LegacyProductsAdminPage() {
  redirect("/painel-jcgamer?tab=products");
}
