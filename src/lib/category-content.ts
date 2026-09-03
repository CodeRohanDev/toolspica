import { TOOL_CATEGORIES, type ToolCategory } from "@/lib/tools-data.generated";

export function getRelatedCategories(
  category: ToolCategory,
  count = 4
): ToolCategory[] {
  const index = TOOL_CATEGORIES.findIndex((c) => c.slug === category.slug);
  const related: ToolCategory[] = [];
  for (let i = 1; related.length < count && i < TOOL_CATEGORIES.length; i++) {
    const candidate =
      TOOL_CATEGORIES[(index + i) % TOOL_CATEGORIES.length];
    if (candidate.slug !== category.slug) related.push(candidate);
  }
  return related;
}

export function buildCategoryIntro(category: ToolCategory): string {
  const exampleNames = category.tools.slice(0, 3).map((t) => t.name);
  const examples =
    exampleNames.length > 1
      ? `${exampleNames.slice(0, -1).join(", ")} and ${exampleNames.at(-1)}`
      : exampleNames[0] ?? "";

  return `${category.name} on Toolspica is a collection of ${category.tools.length} free, fast utilities — including ${examples} — built to run in your browser wherever technically possible, so your files stay on your own device. No installs, no sign-up, and no cost.`;
}

export function buildCategoryFaqs(category: ToolCategory) {
  const firstTool = category.tools[0]?.name ?? "these tools";
  return [
    {
      question: `Are ${category.name} on Toolspica really free?`,
      answer: `Yes. Every tool in the ${category.name} category is free to use, with no sign-up and no hidden usage limits on core features.`,
    },
    {
      question: `Do I need to install any software to use ${category.name}?`,
      answer: `No. All tools in this category run directly in your web browser on any device — desktop, laptop, tablet, or phone. Nothing to download or install.`,
    },
    {
      question: `Is my data safe when I use ${category.name}?`,
      answer: `Whenever a tool in this category can process your file entirely in your browser, it does — your file is never uploaded anywhere. If a specific tool requires temporary cloud processing, it's clearly labeled, and any uploaded file is deleted automatically. See our Data Processing Policy and File Retention Policy for full detail.`,
    },
    {
      question: `Which tool should I start with?`,
      answer: `${firstTool} is one of the most commonly used tools in this category, but browse the full grid below to find the one that matches your exact task.`,
    },
  ];
}

export function buildCategorySeoParagraphs(category: ToolCategory): string[] {
  return [
    `${category.name} brings together every tool you're likely to need for this kind of task in one place, so you don't have to bounce between different websites — each with their own upload limits, ads, and account walls — to get a simple job done.`,
    `Wherever technically possible, tools in this category are built to run entirely in your browser using modern web technology such as WebAssembly and Web Workers. That means faster results (no upload wait) and stronger privacy (your file never leaves your device). For the rare tool that needs server-side processing, we clearly label it and apply strict automatic deletion — see our Data Processing Policy for details.`,
  ];
}
