import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { RequestToolExperience } from "@/components/request-tool-experience";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Request a Tool",
  description:
    "Don't see the tool you need? Request it, or upvote an existing request to help us prioritize what to build next.",
  path: "/request-a-tool",
});

export default function RequestToolPage() {
  return (
    <>
      <PageHeader
        eyebrow="Roadmap"
        title="Request a tool"
        description="Don't see what you need? Ask for it — or upvote a request someone else already made."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Request a Tool" }]}
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <RequestToolExperience />
      </section>

      <JsonLd
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Request a Tool", path: "/request-a-tool" }])}
      />
    </>
  );
}
