import type { ToolContent } from "./types";

export const envFileViewerContent: ToolContent = {
  heroSubtitle: "View .env File Contents as a Clean, Readable Table",
  overview: [
    "A raw .env file is a flat list of KEY=value lines that gets harder to scan the longer it grows — especially when values are long secrets or URLs that make the key names hard to line up visually against a plain text view.",
    "This tool parses a .env file's contents into a clean table, one row per variable, with values masked by default (shown as dots) so sensitive secrets aren't visible at a glance on screen — reveal all values with one click when you actually need to read them, or copy any single value directly without exposing the rest.",
    "Comment lines (starting with #) are preserved and shown in their original position, so the table still reflects the file's actual organization rather than silently dropping the context comments that explain what each section of variables is for.",
  ],
  howItWorks: [
    { title: "Paste or upload your .env file", description: "Paste the content directly, or upload a .env file." },
    { title: "Review the masked table", description: "Values are hidden by default, shown as dots for safety." },
    { title: "Reveal or copy individual values", description: "Toggle full visibility, or copy a specific value without revealing the rest." },
  ],
  examples: [
    {
      label: "Simple .env file",
      input: "API_KEY=sk_live_abc123\nDEBUG=true",
      output: "A two-row table: API_KEY (masked) and DEBUG=true, each with its own copy button.",
    },
  ],
  faqs: [
    {
      question: "Why are values masked by default?",
      answer:
        "Environment files commonly contain API keys, passwords, and other secrets — masking by default avoids accidentally exposing them on screen (like during a screen share) before you deliberately choose to reveal them.",
    },
    {
      question: "Can I copy a single value without revealing all of them?",
      answer:
        "Yes — each row has its own copy button that copies the real underlying value directly, regardless of whether values are currently masked or revealed on screen.",
    },
    {
      question: "Does this handle quoted values?",
      answer:
        "Yes — values wrapped in single or double quotes have the quotes stripped automatically, showing just the actual value content.",
    },
    {
      question: "Is my .env file content sent anywhere?",
      answer:
        "No — parsing happens entirely in your browser. Nothing you paste or upload, including secret values, is sent to a server.",
    },
  ],
};
