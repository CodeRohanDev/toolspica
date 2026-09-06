import type { Metadata } from "next";
import { AdminExperience } from "@/components/admin-experience";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Admin",
  description: "Toolspica admin dashboard.",
  path: "/admin",
  noIndex: true,
});

export default function AdminPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <AdminExperience />
    </section>
  );
}
