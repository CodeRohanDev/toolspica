import type { ToolContent } from "./types";

export const apiResponseFormatterContent: ToolContent = {
  overview: [
    "When you're debugging an API integration, the raw response you get back from a browser's network tab, a curl command, or a logging statement is often a dense, minified wall of JSON — technically readable but practically exhausting to visually parse, especially for a deeply nested response with arrays of objects several levels deep. This tool is purpose-built for exactly that debugging moment: paste in a raw API response and get it back cleanly formatted, along with a few structural stats that summarize its shape at a glance.",
    "Beyond simple pretty-printing (which the JSON Formatter tool also does), this tool specifically reports metrics useful when you're trying to quickly understand an unfamiliar or complex API response: the total number of keys across the entire structure (a rough proxy for how much data the response actually contains), the maximum nesting depth (immediately telling you how deeply you'll need to drill down to reach the data you're after), and — when the top-level response is itself an array — the array's length, answering the common first question of \"how many items did this endpoint return?\" without needing to manually count or write a one-off script.",
    "This is aimed squarely at the specific, recurring task of API debugging and exploration: quickly sanity-checking a response's shape before writing code against it, understanding how deeply nested a field you need actually is, confirming a paginated endpoint returned the expected number of items, or just making an otherwise unreadable minified response legible enough to actually read through.",
    "As with every tool here, everything happens locally in your browser — pasting in a real API response, even one containing user data or internal fields you wouldn't want to send to a third-party service, never leaves your device.",
  ],
  howItWorks: [
    {
      title: "Paste the raw API response",
      description: "Copy the JSON response body from your network tab, terminal, or logs.",
    },
    {
      title: "Review the structural stats",
      description: "Total keys, max nesting depth, and array length (if applicable) are shown instantly.",
    },
    {
      title: "Read the formatted output",
      description: "A cleanly indented, readable version of the full response appears below.",
    },
  ],
  examples: [
    {
      label: "Formatting a list response",
      input: '{"status":"ok","data":[{"id":1,"name":"Item"}]}',
      output: '{\n  "status": "ok",\n  "data": [\n    {\n      "id": 1,\n      "name": "Item"\n    }\n  ]\n}\n\nTotal keys: 3 · Max depth: 2 · Array length: 1',
    },
  ],
  faqs: [
    {
      question: "How is this different from the JSON Formatter tool?",
      answer:
        "Both format JSON the same way underneath, but this tool is specifically framed around API debugging and adds structural stats (total keys, nesting depth, array length) that are most useful when you're trying to quickly understand the shape of an unfamiliar API response, rather than general-purpose JSON formatting.",
    },
    {
      question: "Does the 'total keys' count include keys inside nested arrays?",
      answer:
        "Yes — it recursively counts every object key throughout the entire structure, including keys inside objects nested within arrays, giving you a sense of the response's total data volume rather than just its top-level shape.",
    },
    {
      question: "What does 'max depth' actually measure?",
      answer:
        "It's the deepest level of nesting anywhere in the structure — a flat object with no nested objects or arrays has a depth of 0, an object containing an array of simple values has a depth of 1, and so on. It tells you how many levels you'd need to traverse to reach the most deeply nested data.",
    },
    {
      question: "Can I use this on a response that isn't JSON, like plain text or XML?",
      answer:
        "No — this tool specifically parses and formats JSON. For an API that returns XML or another format, you'd need a format-specific tool instead, since JSON's parsing rules don't apply to other data formats.",
    },
    {
      question: "Is it safe to paste a real production API response with user data into this tool?",
      answer:
        "Yes — parsing, formatting, and computing the stats all happen locally in your browser using JavaScript's built-in JSON parser. Nothing you paste is transmitted to any server, which matters when debugging with real response data that may include sensitive fields.",
    },
  ],
};
