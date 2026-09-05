import type { ToolContent } from "./types";

export const gifSplitterContent: ToolContent = {
  heroSubtitle: "Extract Every Frame from a GIF as Separate Images",
  overview: [
    "An animated GIF is really just a sequence of individual images shown quickly one after another — but that sequence is locked inside the GIF format, not accessible as separate files unless something actually decodes and extracts each frame. Needing one specific frame, or every frame for editing, means splitting the animation apart first.",
    "This tool decodes an animated GIF and saves every single frame as its own numbered PNG image, then bundles all of them into one ZIP file for download — so a 20-frame animation becomes 20 individually numbered PNG files in a single download, ready to open, edit, or use individually.",
    "Frame extraction runs through FFmpeg compiled to WebAssembly directly in your browser — the same reliable decoding used by professional video tools, just running locally instead of through a server upload.",
  ],
  howItWorks: [
    { title: "Upload your GIF", description: "Choose the animated GIF you want to split into frames." },
    { title: "Extract the frames", description: "Every frame is decoded and numbered in playback order." },
    { title: "Download the ZIP", description: "Get all frames as individual PNG files in one ZIP archive." },
  ],
  examples: [
    {
      label: "A 12-frame animation",
      input: "loading-spinner.gif",
      output: "loading-spinner-frames.zip containing frame0001.png through frame0012.png.",
    },
  ],
  faqs: [
    {
      question: "What format are the extracted frames saved in?",
      answer:
        "Each frame is saved as a PNG image, numbered sequentially in the order it appears in the original animation, bundled together in a single ZIP file.",
    },
    {
      question: "Does this work on GIFs with a lot of frames?",
      answer:
        "Yes, though a GIF with many frames or a large resolution takes longer to process and produces a larger ZIP file, since every frame is decoded individually.",
    },
    {
      question: "Can I turn the extracted frames back into a GIF later?",
      answer:
        "Yes — use the GIF Maker from Images tool with the extracted frames to rebuild an animation, useful if you want to edit, reorder, or remove specific frames first.",
    },
    {
      question: "Is my GIF uploaded to a server?",
      answer:
        "No — frame extraction happens entirely in your browser using WebAssembly. Nothing is uploaded anywhere.",
    },
  ],
};
