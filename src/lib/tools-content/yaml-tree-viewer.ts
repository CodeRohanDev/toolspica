import type { ToolContent } from "./types";

export const yamlTreeViewerContent: ToolContent = {
  heroSubtitle: "Explore YAML Config Files as a Collapsible Tree",
  overview: [
    "YAML's indentation-based structure is compact to write but easy to misread at a glance — a deeply nested config file (Kubernetes manifests, GitHub Actions workflows, docker-compose files) can hide its real hierarchy behind whitespace that's hard to visually track past a few levels.",
    "This tool parses YAML and renders it as an interactive, collapsible tree — the same structure a JSON tree viewer shows, but built from YAML's syntax — so you can expand only the sections you're currently working on and collapse the rest, rather than scanning indentation levels by eye.",
    "Because YAML and JSON represent the same underlying data model (objects, arrays, and scalar values), the tree view looks and behaves identically regardless of which format the source file used, making this equally useful for exploring a converted JSON payload written in YAML syntax.",
  ],
  howItWorks: [
    { title: "Paste your YAML", description: "Paste any valid YAML document or config file content." },
    { title: "Explore the tree", description: "Click any object or list to expand or collapse it." },
    { title: "Scan by color", description: "Strings, numbers, and booleans are color-coded for quick scanning." },
  ],
  examples: [
    {
      label: "Simple config",
      input: "name: my-app\nports:\n  - 8080\n  - 443",
      output: "A tree showing \"name\" and an expandable \"ports\" list with two entries.",
    },
  ],
  faqs: [
    {
      question: "What happens if my YAML has a syntax error?",
      answer:
        "A clear parsing error is shown describing what's wrong — YAML is whitespace-sensitive, so inconsistent indentation is the most common cause of parsing failures.",
    },
    {
      question: "Does this support YAML anchors and references?",
      answer:
        "Yes — standard YAML anchors (&) and aliases (*) are resolved during parsing, so referenced values appear correctly in the tree just like their original definition.",
    },
    {
      question: "Can I view multi-document YAML files?",
      answer:
        "This displays the first document in the file — for files with multiple YAML documents separated by ---, only the first one is parsed and shown.",
    },
    {
      question: "Is my YAML content sent anywhere?",
      answer:
        "No — parsing and rendering happen entirely in your browser. Nothing you paste is uploaded or stored.",
    },
  ],
};
