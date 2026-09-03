import type { ToolContent } from "./types";

export const yamlFormatterContent: ToolContent = {
  heroSubtitle: "Validate and Reformat YAML With Consistent Indentation",
  overview: [
    "YAML's readability depends entirely on correct, consistent indentation — a single misaligned space can silently change a value's nesting or break parsing altogether, and these mistakes are notoriously hard to spot by eye. This tool parses your YAML with a real YAML parser and re-serializes it with clean, consistent two-space indentation, catching syntax errors along the way.",
    "Because it uses `js-yaml`, the same battle-tested library many JavaScript and Node.js tools rely on for YAML parsing, it correctly handles YAML's full feature set — nested mappings, sequences, multi-line strings, anchors, and the various scalar styles — rather than a simplified approximation that only works on basic key-value files.",
    "This is useful for cleaning up a YAML config file (Docker Compose, GitHub Actions workflow, Kubernetes manifest) that's been edited inconsistently across a team, validating that a YAML file is actually syntactically correct before deploying it, or just reformatting YAML pasted from somewhere with inconsistent spacing.",
  ],
  howItWorks: [
    { title: "Paste your YAML", description: "Any YAML document — config files, workflows, data." },
    { title: "Parsing and validation run automatically", description: "Syntax errors are flagged clearly." },
    { title: "Copy the reformatted result", description: "Clean, consistent two-space indentation." },
  ],
  examples: [
    { label: "Reformatting an inconsistently indented file", input: "name: Toolspica\\nfree: true", output: "Cleanly reformatted YAML with consistent indentation" },
  ],
  faqs: [
    { question: "Does this validate my YAML is syntactically correct?", answer: "Yes — it uses the js-yaml parser, so malformed YAML is caught and reported with a clear error message before any formatting is attempted." },
    { question: "Does it support YAML anchors and references (&, *)?", answer: "Yes — js-yaml fully supports the YAML specification including anchors, aliases, and multi-document files." },
    { question: "Will this work on a Kubernetes manifest or GitHub Actions workflow file?", answer: "Yes — both are standard YAML, so they parse and reformat correctly through this tool." },
    { question: "Is my YAML uploaded anywhere?", answer: "No — parsing and formatting run entirely in your browser." },
    { question: "Can I convert YAML to JSON instead?", answer: "Yes — use our dedicated YAML to JSON tool for that conversion." },
  ],
};
