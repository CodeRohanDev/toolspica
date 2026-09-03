import type { ToolContent } from "./types";

export const jsonToYamlContent: ToolContent = {
  heroSubtitle: "Convert JSON Into Clean, Readable YAML",
  overview: [
    "JSON is great for APIs and code, but YAML is often preferred for human-edited files — configs, CI/CD workflows, Kubernetes manifests — because its indentation-based structure without brackets and quotes everywhere reads more naturally. This tool converts any JSON into properly formatted YAML using `js-yaml`, the same parser/serializer library many JavaScript tools rely on.",
    "Because it's a genuine parse-and-serialize conversion, nested JSON objects become properly indented YAML mappings, arrays become YAML sequences with the standard dash notation, and string values are quoted only when actually necessary — producing output that reads the way a human would naturally write YAML, not an over-quoted literal transcription.",
    "This is useful for turning an API response or JSON config into a more human-editable YAML file, converting a package.json-style structure into a YAML equivalent for a tool that expects it, or just generating clean YAML output from JSON data you already have.",
  ],
  howItWorks: [
    { title: "Paste your JSON", description: "Any valid JSON object or array." },
    { title: "Conversion runs automatically", description: "Uses a real YAML serializer." },
    { title: "Copy the YAML output", description: "Clean, human-readable formatting." },
  ],
  examples: [
    { label: "Converting a config object", input: '{"name":"Toolspica","free":true,"tools":["pdf","image"]}', output: "name: Toolspica\\nfree: true\\ntools:\\n  - pdf\\n  - image" },
  ],
  faqs: [
    { question: "Does the output follow YAML best practices for readability?", answer: "Yes — the js-yaml serializer only quotes strings when necessary and uses standard block-style formatting for a clean, human-readable result." },
    { question: "What happens with deeply nested JSON?", answer: "It converts correctly to properly indented nested YAML mappings and sequences, regardless of depth." },
    { question: "Is my JSON data uploaded anywhere?", answer: "No — conversion runs entirely in your browser." },
    { question: "Can I convert YAML back to JSON?", answer: "Yes — use our YAML to JSON tool for the reverse conversion." },
    { question: "Does this work for arrays of objects?", answer: "Yes — arrays convert to YAML sequences, with each object in the array becoming a properly indented mapping." },
  ],
};
