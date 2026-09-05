import type { ToolContent } from "./types";

export const gifResizerContent: ToolContent = {
  heroSubtitle: "Resize a GIF to a Different Width, Keeping the Animation",
  overview: [
    "An animated GIF sized for one context — a full-width blog embed, a large messaging preview — often needs to be smaller for a forum signature, a smaller widget, or a size limit imposed by a platform. Resizing an animated GIF isn't as simple as resizing a static image, since every frame needs to be resized consistently while preserving smooth playback.",
    "This tool resizes every frame of an animated GIF to a target width you specify, automatically scaling the height to preserve the original aspect ratio, and rebuilds the animation using a freshly generated color palette so quality stays sharp even after resizing down.",
    "Processing runs through FFmpeg compiled to WebAssembly, running entirely in your browser — the resize happens locally, with no upload wait and no file size limit imposed by a server.",
  ],
  howItWorks: [
    { title: "Upload your GIF", description: "Choose the animated GIF you want to resize." },
    { title: "Set the target width", description: "Height scales automatically to match the original aspect ratio." },
    { title: "Download the resized GIF", description: "Get the same animation at the new size." },
  ],
  examples: [
    {
      label: "Shrinking for a forum signature",
      input: "480px wide GIF → target width 200px",
      output: "gif-resized.gif — the same animation at 200px wide, height scaled proportionally.",
    },
  ],
  faqs: [
    {
      question: "Does resizing distort the animation's proportions?",
      answer:
        "No — only the width is set directly; height is calculated automatically to preserve the original aspect ratio, so the animation isn't stretched or squashed.",
    },
    {
      question: "Does resizing reduce the file size too?",
      answer:
        "Yes, generally — fewer pixels per frame means a smaller file, though the exact reduction depends on the animation's content and how much the width actually shrinks.",
    },
    {
      question: "Can I make a GIF larger instead of smaller?",
      answer:
        "Yes — enter a target width larger than the original, though enlarging a GIF beyond its original resolution will look softer since no new detail is being added.",
    },
    {
      question: "Is my GIF uploaded to a server?",
      answer:
        "No — resizing happens entirely in your browser using WebAssembly. Nothing is uploaded anywhere.",
    },
  ],
};
