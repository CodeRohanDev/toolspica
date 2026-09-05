import type { ToolContent } from "./types";

export const xmlTreeViewerContent: ToolContent = {
  heroSubtitle: "Explore XML as a Collapsible Element Tree",
  overview: [
    "XML's nested tags carry real structure, but reading that structure from raw indented text means manually tracking which closing tag matches which opening tag as documents get deeper — genuinely tedious for a config file or API response with more than a few levels of nesting.",
    "This tool parses your XML and renders it as an interactive tree — each element shown with its attributes and text content inline, and any element with children collapsible with a click, so you can navigate a complex document by structure rather than by scrolling through raw markup.",
    "Attributes are shown directly on each element's line, color-coded separately from the tag name and text content, making it easy to distinguish structural markup from the actual data values at a glance.",
  ],
  howItWorks: [
    { title: "Paste your XML", description: "Paste any well-formed XML document." },
    { title: "Explore the tree", description: "Click any element with children to expand or collapse it." },
    { title: "Read attributes inline", description: "Attributes and text content are shown directly alongside each element." },
  ],
  examples: [
    {
      label: "Simple document",
      input: '<user id="1"><name>Alice</name></user>',
      output: "A collapsible tree showing <user id=\"1\"> expandable to reveal the <name> element.",
    },
  ],
  faqs: [
    {
      question: "What happens if my XML isn't well-formed?",
      answer:
        "A clear error message is shown instead of a tree — check for unclosed tags or mismatched nesting, the most common causes of malformed XML.",
    },
    {
      question: "Does this validate against a schema (XSD/DTD)?",
      answer:
        "No — this only checks that the XML is well-formed (correctly nested and closed), not that it conforms to a specific schema's rules.",
    },
    {
      question: "Can I view very large XML documents?",
      answer:
        "Yes, though very large documents may take a moment to parse and render as a tree, since the whole structure is built before you start collapsing sections.",
    },
    {
      question: "Is my XML data sent anywhere?",
      answer:
        "No — parsing and rendering happen entirely in your browser using the built-in DOM parser. Nothing you paste is uploaded or stored.",
    },
  ],
};
