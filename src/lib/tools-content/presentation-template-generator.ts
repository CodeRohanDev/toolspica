import type { ToolContent } from "./types";

export const presentationTemplateGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a Simple PowerPoint Template with a Few Slides",
  overview: [
    "Starting a presentation from PowerPoint's completely blank default template means picking colors, fonts, and layout before you've even started outlining content — a small but real form of friction that delays actually writing the presentation.",
    "This tool builds a ready-to-edit .pptx file from a title slide (with your presentation's title and an optional subtitle) plus as many content slides as you need, each with a title and a bulleted list — pick one of four color themes, and the whole deck is generated with consistent styling applied automatically.",
    "The output is a genuine, standard .pptx file that opens directly in PowerPoint, Google Slides, or Keynote for further editing — this generates the structural starting point and consistent visual theme, not a fully polished final deck, so treat it as a real head start rather than a finished presentation.",
  ],
  howItWorks: [
    { title: "Enter your title and slides", description: "Add a title slide and as many content slides with bullets as you need." },
    { title: "Pick a color theme", description: "Choose from four ready-made color schemes." },
    { title: "Download the .pptx", description: "Get a real PowerPoint file, ready to open and continue editing." },
  ],
  examples: [
    {
      label: "Three-slide deck",
      input: "Title: \"Q1 Review\", 2 content slides with bullets",
      output: "q1-review.pptx — a title slide plus two themed content slides.",
    },
  ],
  faqs: [
    {
      question: "Does the file open correctly in PowerPoint and Google Slides?",
      answer:
        "Yes — it's a genuine .pptx file, opening correctly in Microsoft PowerPoint, Google Slides, and Apple Keynote for further editing.",
    },
    {
      question: "Can I add images or charts to the generated slides?",
      answer:
        "Not through this tool — it generates text-based title and bullet-point slides. Add images, charts, or other media after opening the file in your presentation software.",
    },
    {
      question: "How many slides can I add?",
      answer:
        "No hard limit — add as many content slides as your presentation needs before downloading.",
    },
    {
      question: "Is my presentation content sent anywhere?",
      answer:
        "No — the .pptx file is generated entirely in your browser. Nothing you type is uploaded or stored.",
    },
  ],
};
