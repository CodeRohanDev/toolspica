import type { ToolContent } from "./types";

export const yamlToJsonContent: ToolContent = {
  heroSubtitle: "Convert YAML Into JSON Using a Real YAML Parser",
  overview: [
    "Config files, CI/CD workflows, and Kubernetes manifests are often written in YAML, but plenty of code and tooling expects JSON instead — converting between them by hand risks subtle mistakes since YAML's syntax (indentation-based nesting, unquoted strings, block scalars) doesn't map onto JSON in an obvious character-by-character way. This tool does a genuine parse-and-reserialize conversion using `js-yaml`, the same library many JavaScript tools rely on.",
    "Because it's a real parser rather than a text-substitution trick, it correctly handles YAML's full feature set: nested mappings become nested JSON objects, sequences become JSON arrays, and YAML's flexible scalar types (quoted, unquoted, multi-line) all resolve to their correct JSON equivalents.",
    "This is useful for feeding a YAML config into a JSON-only system, debugging what a YAML file actually parses to (useful when YAML's implicit typing surprises you — like `yes` becoming boolean `true`), or converting a Docker Compose or CI workflow file into JSON for programmatic processing.",
  ],
  howItWorks: [
    { title: "Paste your YAML", description: "Any standard YAML document." },
    { title: "Parsing runs automatically", description: "A real YAML parser handles the conversion." },
    { title: "Copy the JSON output", description: "Correctly nested objects and arrays." },
  ],
  examples: [
    { label: "Converting a config file", input: "name: Toolspica\\nfree: true\\ntools:\\n  - pdf\\n  - image", output: '{"name":"Toolspica","free":true,"tools":["pdf","image"]}' },
  ],
  faqs: [
    { question: "Does this handle nested YAML structures correctly?", answer: "Yes — nested mappings and sequences convert to correctly nested JSON objects and arrays, no matter how deep." },
    { question: "What happens with invalid YAML syntax?", answer: "You'll get a clear parse error instead of incorrect output, since conversion requires the input to be valid YAML first." },
    { question: "Does YAML's implicit typing carry over correctly?", answer: "Yes — values like true/false, numbers, and null are parsed to their correct JSON types rather than staying as strings." },
    { question: "Is my YAML data uploaded anywhere?", answer: "No — conversion runs entirely in your browser." },
    { question: "Can I convert JSON back to YAML?", answer: "Yes — use our JSON to YAML tool for the reverse conversion." },
  ],
};
