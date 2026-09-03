import type { ToolContent } from "./types";

export const xmlToJsonContent: ToolContent = {
  heroSubtitle: "Convert XML Into a Structured JSON Object",
  overview: [
    "Plenty of older APIs and enterprise systems still speak XML natively, but most modern frontend code and scripting works far more naturally with JSON. Converting between the two by hand means manually mapping every nested element to the right JSON structure — this tool does that conversion automatically, turning any XML document into a clean, nested JSON object.",
    "The converter walks your XML's element tree recursively: elements with only text content become string values, elements with child elements become nested objects, and repeated sibling tags with the same name are automatically collected into a JSON array rather than overwriting each other.",
    "This is useful for consuming a legacy XML API response in a modern JavaScript codebase, converting an XML configuration file into something easier to read and diff, or just quickly inspecting what an XML document's structure looks like in a more universally familiar format.",
  ],
  howItWorks: [
    { title: "Paste your XML", description: "Any well-formed XML document." },
    { title: "Review the JSON structure", description: "Nested elements become nested objects automatically." },
    { title: "Copy the result", description: "Ready to use in code or another JSON tool." },
  ],
  examples: [
    { label: "Converting a simple XML list", input: "<root><item>Hello</item><item>World</item></root>", output: '{"root":{"item":["Hello","World"]}}' },
  ],
  faqs: [
    { question: "How are repeated sibling elements handled?", answer: "They're automatically collected into a JSON array rather than overwriting each other, matching how most XML-to-JSON conventions work." },
    { question: "Are XML attributes included in the JSON output?", answer: "Currently only element text content and nested elements are converted — attributes aren't included in this version." },
    { question: "What happens with malformed XML?", answer: "It's flagged with a clear error before any conversion is attempted, using the browser's built-in XML parser to validate first." },
    { question: "Is my XML data uploaded anywhere?", answer: "No — the entire conversion runs locally in your browser." },
    { question: "Does this handle XML namespaces?", answer: "Namespace-prefixed tag names are preserved as-is in the resulting JSON keys." },
  ],
};
