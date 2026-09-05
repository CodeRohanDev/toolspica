import type { ToolContent } from "./types";

export const slideTextExtractorContent: ToolContent = {
  heroSubtitle: "Extract All Text from a PowerPoint Presentation",
  overview: [
    "Pulling the text content out of a PowerPoint deck — for a transcript, to repurpose the content as an article, or to search across a slide deck's content — normally means opening PowerPoint and clicking through every slide manually, or using the outline view and hoping it captures everything.",
    "This tool reads an uploaded .pptx file directly in your browser, unpacks it as the ZIP archive it actually is, and extracts the text from every slide's text boxes and titles, clearly labeled by slide number, in original slide order.",
    "This extracts text from slide content directly — text within images, embedded charts' data labels, and speaker notes are not included, since those live in different parts of the file's internal structure beyond the main slide text this tool targets.",
  ],
  howItWorks: [
    { title: "Upload a .pptx file", description: "Choose a PowerPoint presentation from your device." },
    { title: "Review the extracted text", description: "See every slide's text, labeled by slide number, in order." },
    { title: "Copy the result", description: "Copy the full text for a transcript, repurposed content, or search." },
  ],
  examples: [
    {
      label: "Three-slide deck",
      input: "A .pptx file with a title slide and two content slides",
      output: "--- Slide 1 ---\nWelcome\n\n--- Slide 2 ---\nAgenda item one...",
    },
  ],
  faqs: [
    {
      question: "Does this extract speaker notes too?",
      answer:
        "No — this extracts the visible text on each slide (titles, text boxes, bullet content). Speaker notes are stored in a separate part of the file structure and aren't included.",
    },
    {
      question: "Does it extract text that's part of an image?",
      answer:
        "No — text embedded inside an image (a screenshot with text baked in, for example) isn't extractable this way, since it's pixel data, not actual text content in the file.",
    },
    {
      question: "Will this work on older .ppt files (not .pptx)?",
      answer:
        "No — .ppt (the older PowerPoint format) uses a completely different binary structure. This tool only supports the modern .pptx (ZIP/XML) format.",
    },
    {
      question: "Is my presentation uploaded to a server?",
      answer:
        "No — the file is unpacked and parsed entirely in your browser. Nothing is uploaded anywhere.",
    },
  ],
};
