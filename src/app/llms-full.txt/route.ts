import { SITE } from "@/lib/site";
import { TOOL_CATEGORIES } from "@/lib/tools-data.generated";
import { getRegisteredTool } from "@/lib/tools-registry";

// Extended llms.txt (https://llmstxt.org) — includes a one-line description
// and top FAQ per live tool, so an AI answer engine can cite Toolspica
// without crawling further. Kept separate from /llms.txt, which stays a
// lightweight link index.
export async function GET() {
  const lines: string[] = [];
  lines.push(`# ${SITE.name} — full tool reference`);
  lines.push("");
  lines.push(`> ${SITE.description}`);
  lines.push("");

  for (const category of TOOL_CATEGORIES) {
    const liveInCategory = category.tools.filter((tool) => tool.done);
    if (liveInCategory.length === 0) continue;

    lines.push(`## ${category.name}`);
    lines.push("");

    for (const tool of liveInCategory) {
      const registered = getRegisteredTool(tool.slug);
      if (!registered) continue;

      lines.push(`### ${tool.name}`);
      lines.push(`${SITE.url}/tools/${tool.slug}`);
      lines.push(registered.content.overview[0]);
      const topFaq = registered.content.faqs[0];
      if (topFaq) {
        lines.push(`Q: ${topFaq.question}`);
        lines.push(`A: ${topFaq.answer}`);
      }
      lines.push("");
    }
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
