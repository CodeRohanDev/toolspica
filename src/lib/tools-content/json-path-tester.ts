import type { ToolContent } from "./types";

export const jsonPathTesterContent: ToolContent = {
  heroSubtitle: "Test a Dot/Bracket JSON Path and See the Result Live",
  overview: [
    "Digging a specific value out of a deeply nested JSON structure — especially one with arrays inside objects inside more arrays — is easy to get wrong by hand, with a typo in a key name or an off-by-one array index silently returning undefined. This tool lets you write a path expression against your JSON and see exactly what it resolves to, live, as you type.",
    "It supports the everyday path syntax most developers actually reach for: dot notation for object keys (`$.store.book`) and bracket notation for array indices (`[0]`), chained together freely. This covers the vast majority of real-world 'grab this one value out of a JSON blob' needs without requiring the full JSONPath specification's filter expressions or wildcards.",
    "This is useful for figuring out the correct path to extract a value in code (testing it here first before writing `data.store.book[0].title` in your actual script), debugging why a path expression isn't returning what you expect, or just exploring an unfamiliar JSON structure interactively.",
  ],
  howItWorks: [
    { title: "Paste your JSON", description: "Any valid, potentially deeply nested JSON document." },
    { title: "Write a path expression", description: "Dot notation for keys, brackets for array indices." },
    { title: "See the resolved value live", description: "Updates instantly as you edit the path." },
  ],
  examples: [
    { label: "Extracting a nested array value", input: "$.store.book[0].title", output: '"Book A"' },
  ],
  faqs: [
    { question: "Does this support the full JSONPath specification?", answer: "No — it supports basic dot notation and bracket array indexing, not filter expressions (?()), wildcards (*), or recursive descent (..) from the full spec." },
    { question: "What does it show if the path doesn't exist?", answer: "It shows \"undefined (path not found)\", making it clear the path didn't resolve to any value rather than silently showing nothing." },
    { question: "Can I start my path without the leading $.?", answer: "Yes — the leading $. is optional and stripped automatically if present." },
    { question: "Is my JSON data uploaded anywhere?", answer: "No — path evaluation happens entirely in your browser." },
    { question: "Can I use this to build a path for use in JavaScript code?", answer: "Yes — once you've confirmed the right path here, the equivalent JavaScript would use the same dot/bracket access pattern directly on your parsed object." },
  ],
};
