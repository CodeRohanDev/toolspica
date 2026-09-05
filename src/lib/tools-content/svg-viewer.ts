import type { ToolContent } from "./types";

export const svgViewerContent: ToolContent = {
  heroSubtitle: "Preview and Inspect SVG Code Live",
  overview: [
    "SVG is genuinely readable markup, but confirming it actually renders correctly — and looks the way you expect — normally means saving it as a file and opening it in a browser or image viewer, a slow round-trip for a quick check while hand-editing SVG code.",
    "This tool renders SVG markup live as you type or paste it, side by side with the raw code, on a checkerboard background so transparency is clearly visible — plus basic stats on the SVG's element count and declared width and height.",
    "For safety, the preview renders inside a fully sandboxed frame that blocks any embedded scripts or event handlers from executing — so pasting SVG from an untrusted source previews safely without risk to your browser session, unlike directly injecting arbitrary markup into the page.",
  ],
  howItWorks: [
    { title: "Paste or upload SVG code", description: "Paste raw SVG markup, or upload an .svg file." },
    { title: "See the live preview", description: "The rendered SVG updates instantly as you edit the code." },
    { title: "Check the stats", description: "See element count and declared dimensions at a glance." },
  ],
  examples: [
    {
      label: "Simple circle",
      input: '<svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="blue"/></svg>',
      output: "A rendered blue circle shown in the preview pane.",
    },
  ],
  faqs: [
    {
      question: "Is it safe to preview SVG from an untrusted source?",
      answer:
        "Yes — the preview renders inside a fully sandboxed frame that blocks any embedded scripts or event handlers from executing, so untrusted SVG markup previews safely without risk to your browser session.",
    },
    {
      question: "Why does my SVG show as invalid?",
      answer:
        "The markup must be well-formed XML with an <svg> root element — check for unclosed tags or a missing root element if the preview shows an error.",
    },
    {
      question: "Does this show the SVG's file size?",
      answer:
        "Not directly, but the element count gives a rough sense of complexity — a very high element count is typically correlated with a larger file size.",
    },
    {
      question: "Is my SVG code sent anywhere?",
      answer:
        "No — rendering happens entirely in your browser. Nothing you paste or upload is sent to a server.",
    },
  ],
};
