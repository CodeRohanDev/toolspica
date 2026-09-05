import type { ToolContent } from "./types";

export const powerpointViewerContent: ToolContent = {
  heroSubtitle: "Preview a PowerPoint File's Slide Layout",
  overview: [
    "Opening a .pptx file to check its content without Microsoft PowerPoint or a compatible app installed usually isn't possible — and even just confirming what a presentation contains shouldn't require launching full presentation software.",
    "This tool reads a .pptx file's slides and shows each one as an approximate visual layout — every text box positioned and sized according to its actual coordinates in the file, with titles shown larger and bolder than body text, giving a genuine sense of each slide's structure and content placement.",
    "This is a structural layout preview built from each shape's real position and size data in the file, not a full rendering engine — fonts, colors, images, and precise visual styling won't match how PowerPoint itself renders the deck, but the relative layout and text content of each slide comes through accurately.",
  ],
  howItWorks: [
    { title: "Upload a .pptx file", description: "Choose a PowerPoint presentation from your device." },
    { title: "Browse slide by slide", description: "See each slide's text boxes positioned according to their actual layout." },
    { title: "Navigate with Previous/Next", description: "Page through the entire presentation." },
  ],
  examples: [
    {
      label: "Typical use",
      input: "A 10-slide business presentation",
      output: "Each slide shown with its title and body text boxes positioned approximately where they appear in the original.",
    },
  ],
  faqs: [
    {
      question: "Does this show images, colors, and exact fonts from the slides?",
      answer:
        "No — this shows a structural layout based on each text box's actual position and size in the file, not images, background colors, or exact font rendering. Text content and relative layout come through, but visual styling doesn't.",
    },
    {
      question: "How is this different from the Slide Text Extractor tool?",
      answer:
        "Slide Text Extractor pulls out all text as a flat list with no layout information. This tool shows each slide's text boxes positioned according to their actual coordinates, giving a sense of the visual structure rather than just a text dump.",
    },
    {
      question: "Will slide numbering and order match the original?",
      answer:
        "Yes — slides are read and displayed in their actual order from the presentation file.",
    },
    {
      question: "Is my presentation uploaded to a server?",
      answer:
        "No — the file is read and rendered entirely in your browser. Nothing is uploaded anywhere.",
    },
  ],
};
