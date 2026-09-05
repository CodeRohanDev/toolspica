import { SITE } from "@/lib/site";
import { ALL_TOOLS, TOOL_CATEGORIES } from "@/lib/tools-data.generated";
import { TOOL_VARIANTS } from "@/lib/tool-variants";

// Machine-readable summary for LLMs and AI answer/search engines, following
// the llms.txt convention (https://llmstxt.org). Kept in sync automatically
// with the live tool catalog via tools-data.generated.ts.
export async function GET() {
  const liveTools = ALL_TOOLS.filter((tool) => tool.done);

  const lines: string[] = [];
  lines.push(`# ${SITE.name}`);
  lines.push("");
  lines.push(`> ${SITE.description}`);
  lines.push("");
  lines.push(
    `${SITE.name} is built by ${SITE.parentBrand} (${SITE.parentUrl}). It offers ${ALL_TOOLS.length}+ planned utilities across ${TOOL_CATEGORIES.length} categories; ${liveTools.length} are live today, with new ones shipping regularly. Every tool runs free, with no sign-up. Wherever technically possible, files are processed entirely in the visitor's browser and are never uploaded — see ${SITE.url}/data-processing-policy and ${SITE.url}/file-retention-policy for the small set of tools that use temporary, auto-deleting cloud processing instead.`
  );
  lines.push("");
  lines.push(
    `Full per-tool descriptions and FAQs: ${SITE.url}/llms-full.txt`
  );
  lines.push("");

  lines.push("## Categories");
  for (const category of TOOL_CATEGORIES) {
    lines.push(
      `- [${category.name}](${SITE.url}/${category.slug}): ${category.tools.length} tools`
    );
  }
  lines.push("");

  lines.push("## Live tools");
  for (const category of TOOL_CATEGORIES) {
    const liveInCategory = category.tools.filter((tool) => tool.done);
    if (liveInCategory.length === 0) continue;
    for (const tool of liveInCategory) {
      lines.push(
        `- [${tool.name}](${SITE.url}/tools/${tool.slug}) (${category.name})`
      );
    }
  }
  lines.push("");

  const liveVariants = TOOL_VARIANTS.filter((v) =>
    liveTools.some((tool) => tool.slug === v.toolSlug)
  );
  if (liveVariants.length > 0) {
    lines.push("## Task-specific landing pages");
    lines.push(
      "(Same underlying tool as above, tailored to a specific use case.)"
    );
    for (const variant of liveVariants) {
      lines.push(`- [${variant.h1}](${SITE.url}/${variant.slug})`);
    }
    lines.push("");
  }

  lines.push("## About & policies");
  lines.push(`- [About](${SITE.url}/about)`);
  lines.push(`- [Contact](${SITE.url}/contact)`);
  lines.push(`- [Privacy Policy](${SITE.url}/privacy-policy)`);
  lines.push(`- [Terms of Service](${SITE.url}/terms)`);
  lines.push(`- [Data Processing Policy](${SITE.url}/data-processing-policy)`);
  lines.push(`- [File Retention Policy](${SITE.url}/file-retention-policy)`);

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
