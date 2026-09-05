import type { ToolContent } from "./types";

export const jsonTreeViewerContent: ToolContent = {
  heroSubtitle: "Explore JSON as a Collapsible, Color-Coded Tree",
  overview: [
    "A large JSON object pretty-printed as flat, indented text is still hard to navigate — deeply nested structures and long arrays force endless scrolling just to find one field, with no way to hide the parts you're not currently looking at.",
    "This tool parses your JSON and renders it as an interactive, collapsible tree — click any object or array to expand or collapse it, so you can drill into exactly the branch you care about while keeping everything else tucked away. Strings, numbers, and booleans are color-coded by type, making the actual data easier to scan at a glance.",
    "Objects and arrays that start collapsed at deeper nesting levels keep the initial view manageable even for large JSON payloads, while everything at the top two levels starts expanded so you see the overall shape immediately.",
  ],
  howItWorks: [
    { title: "Paste your JSON", description: "Paste any valid JSON object or array." },
    { title: "Explore the tree", description: "Click any object or array to expand or collapse it." },
    { title: "Scan by color", description: "Strings, numbers, and booleans are color-coded for quick scanning." },
  ],
  examples: [
    {
      label: "Nested object",
      input: '{"user": {"name": "Alice", "roles": ["admin", "user"]}}',
      output: "A collapsible tree with \"user\" expandable to reveal name and roles.",
    },
  ],
  faqs: [
    {
      question: "What happens if my JSON is invalid?",
      answer:
        "The exact parsing error is shown directly below the input, describing what's wrong (a missing comma, an unmatched bracket) so you can fix it and see the tree render correctly.",
    },
    {
      question: "How is this different from a JSON formatter?",
      answer:
        "A formatter re-indents JSON as flat text you still scroll through top to bottom. This renders it as an interactive tree you can collapse and expand section by section, better suited to exploring large or deeply nested data.",
    },
    {
      question: "Is there a size limit on the JSON I can view?",
      answer:
        "No hard limit is enforced, though very large JSON documents may take a moment to render as the full tree, since collapsing happens after the initial parse.",
    },
    {
      question: "Is my JSON data sent anywhere?",
      answer:
        "No — parsing and rendering happen entirely in your browser. Nothing you paste is uploaded or stored.",
    },
  ],
};
