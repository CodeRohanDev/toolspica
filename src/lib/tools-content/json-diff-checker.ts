import type { ToolContent } from "./types";

export const jsonDiffCheckerContent: ToolContent = {
  heroSubtitle: "Compare Two JSON Documents, Ignoring Formatting Differences",
  overview: [
    "Comparing two JSON payloads by eye is hard even when they're functionally identical, because whitespace, key order, and indentation differences create visual noise that has nothing to do with actual data changes. This tool parses both inputs, re-serializes them with consistent formatting, and then runs a line-based diff — so what you see highlighted is genuine data differences, not formatting noise.",
    "Because both sides are normalized (parsed and pretty-printed identically) before comparison, two JSON documents that are semantically identical but formatted differently — different indentation, different key ordering in the source — will correctly show as having no differences, which a naive text diff would get wrong.",
    "This is useful for comparing two versions of an API response to spot what actually changed, diffing a config file before and after an edit, or verifying that a data transformation produced the expected output structure.",
  ],
  howItWorks: [
    { title: "Paste your original JSON", description: "Any valid JSON document." },
    { title: "Paste the changed JSON", description: "The version you want to compare against." },
    { title: "Review the normalized diff", description: "Only genuine data differences are highlighted." },
  ],
  examples: [
    { label: "Comparing two API responses", input: '{"status":"ok"} vs {"status":"error","code":500}', output: "Highlighted diff showing the changed and added fields" },
  ],
  faqs: [
    { question: "Does key order affect the comparison?", answer: "No — both inputs are re-serialized with consistent key ordering from JSON.parse before comparing, so differing key order alone won't show as a change." },
    { question: "What happens if my JSON is invalid?", answer: "You'll get a clear parse error message instead of a diff, since comparison requires both inputs to be valid JSON first." },
    { question: "Does this show a structural diff or a text diff?", answer: "It's a line-based text diff run against normalized (pretty-printed) JSON, which in practice highlights structural differences clearly for most everyday JSON documents." },
    { question: "Is my JSON data uploaded anywhere?", answer: "No — comparison runs entirely in your browser." },
    { question: "Can I use this for very large JSON documents?", answer: "It works for reasonably sized documents; extremely large JSON payloads may render a very long diff that's harder to scan visually." },
  ],
};
