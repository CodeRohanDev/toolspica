import type { ToolContent } from "./types";

export const powerpointToPdfContent: ToolContent = {
  heroSubtitle: "Extract Text From a .pptx Presentation Into a PDF, Slide by Slide",
  overview: [
    "Sharing a presentation's content as a PDF is common when the recipient needs to read through the material rather than run it as a slideshow — for review, archiving, or printing handouts. This tool reads a .pptx PowerPoint file directly and produces a PDF with the text content of each slide, one landscape page per slide, entirely in your browser.",
    "Since .pptx is a ZIP archive of XML documents, this tool includes a from-scratch ZIP reader that opens the archive and determines the presentation's actual slide order by following the same relationship structure PowerPoint itself uses internally (the presentation's slide ID list cross-referenced against its relationship file) — this ensures slides appear in the PDF in the same order they'd play in the actual presentation, not just alphabetically by filename.",
    "For each slide, all text runs from every shape are extracted and laid out on its own landscape PDF page, with the first text block on a slide (typically the title) rendered larger and bold to distinguish it from body content, and everything else word-wrapped to fit the page.",
    "This is a text-only conversion: images, background designs, shape positioning, colors, and exact slide layout are not reconstructed — only the text content extracted from each slide's shapes, in the order it appears in the file. For a document where the presentation's visual design matters, exporting directly from PowerPoint will produce a far more faithful result — but for quickly getting a presentation's talking points and text content into a readable, shareable PDF without opening PowerPoint, this handles it entirely on your device.",
  ],
  howItWorks: [
    { title: "Upload your .pptx file", description: "The presentation's internal XML is read directly." },
    { title: "Slide text is extracted in order", description: "Text runs from every slide are pulled out, following the actual presentation order." },
    { title: "Download the PDF", description: "One landscape PDF page per slide, with the title text emphasized." },
  ],
  examples: [
    { label: "Converting a talk into readable notes", input: "15-slide .pptx presentation", output: "a 15-page landscape PDF with each slide's text content" },
  ],
  faqs: [
    { question: "Will images and slide backgrounds appear in the PDF?", answer: "No — this is a text-only conversion. Images, backgrounds, shape positioning, and colors from the original slides aren't reconstructed; only the text content extracted from each slide is carried over." },
    { question: "Will slides appear in the PDF in the correct order?", answer: "Yes — the tool follows the presentation's actual internal slide ordering (via its relationship structure), the same order the slides would play in during the actual presentation, rather than an arbitrary file-based order." },
    { question: "Is my presentation uploaded to a server for this conversion?", answer: "No — the .pptx file's internal ZIP archive is read and parsed entirely in your browser using a built-in ZIP reader; nothing is uploaded anywhere." },
    { question: "How does the tool decide what text is the slide title?", answer: "The first text block found on each slide is rendered larger and bold, since slide titles are conventionally the first shape's text — this works well for typically-structured slides but is a simple heuristic rather than reading explicit title-placeholder metadata." },
    { question: "What's the reverse tool for turning a PDF into slides?", answer: "PDF to PowerPoint does the opposite — it renders each PDF page as a full-slide image, preserving visual layout exactly (unlike this text-extraction approach) at the cost of the slide content not being separately editable." },
  ],
};
