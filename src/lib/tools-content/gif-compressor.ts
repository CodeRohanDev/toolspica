import type { ToolContent } from "./types";

export const gifCompressorContent: ToolContent = {
  heroSubtitle: "Shrink a GIF's File Size Without Losing the Animation",
  overview: [
    "Animated GIFs are notoriously large for what they show — the format doesn't compress nearly as efficiently as modern video codecs, so a GIF that looks simple can still be several megabytes, which matters when a platform imposes an upload size limit or a page needs to load fast.",
    "This tool shrinks a GIF's file size along two levers you control independently: reducing the frame rate (fewer frames stored means a smaller file, often with little visible difference for simple animations) and reducing the overall scale, alongside a reduced color palette that further cuts size, since GIF's compression is closely tied to how many distinct colors it needs to store.",
    "Processing runs through FFmpeg compiled to WebAssembly, running entirely in your browser — the compression happens locally, with a before/after file size shown so you can see exactly how much was saved.",
  ],
  howItWorks: [
    { title: "Upload your GIF", description: "Choose the animated GIF you want to shrink." },
    { title: "Adjust scale and frame rate", description: "Lower values produce a smaller file at some quality tradeoff." },
    { title: "Download the compressed GIF", description: "See the before/after file size and get the smaller result." },
  ],
  examples: [
    {
      label: "Reducing size for an upload limit",
      input: "8 MB GIF, scale 60%, 12 fps",
      output: "gif-compressed.gif — often 3-5x smaller depending on the original animation's complexity.",
    },
  ],
  faqs: [
    {
      question: "Which setting has the biggest impact on file size — scale or frame rate?",
      answer:
        "Both matter, but scale (overall pixel dimensions) usually has the larger impact, since each frame's data scales with its pixel count. Frame rate reduction helps most for animations with a lot of motion.",
    },
    {
      question: "Will compressing reduce visual quality?",
      answer:
        "Yes, to some degree — that's the tradeoff for a smaller file. Simple animations (icons, UI demos) tolerate compression well; detailed photographic content shows more visible quality loss.",
    },
    {
      question: "What's a reasonable frame rate to compress down to?",
      answer:
        "10-15 fps looks smooth for most everyday GIF content, well below typical video frame rates (24-60 fps) which are unnecessary for GIF's simpler animation style.",
    },
    {
      question: "Is my GIF uploaded to a server?",
      answer:
        "No — compression happens entirely in your browser using WebAssembly. Nothing is uploaded anywhere.",
    },
  ],
};
