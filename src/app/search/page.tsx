import type { Metadata } from "next";
import { SearchExperience } from "@/components/search-experience";
import { PageHeader } from "@/components/page-header";
import { TOTAL_TOOLS } from "@/lib/tools-data.generated";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Search Tools",
  description: `Search ${TOTAL_TOOLS}+ free browser-based tools on Toolspica.`,
  path: "/search",
  noIndex: true,
});

export default async function SearchPage(props: PageProps<"/search">) {
  const searchParams = await props.searchParams;
  const query =
    typeof searchParams.q === "string" ? searchParams.q.trim() : "";

  return (
    <>
      <PageHeader
        eyebrow="Search"
        title={query ? `Results for "${query}"` : "Search all tools"}
        description={`Instantly filter across ${TOTAL_TOOLS}+ tools by name, category, and availability.`}
      />

      <SearchExperience initialQuery={query} />
    </>
  );
}
