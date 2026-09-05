import type { ToolContent } from "./types";

export const gifMakerFromImagesContent: ToolContent = {
  heroSubtitle: "Turn a Series of Images into an Animated GIF",
  overview: [
    "A sequence of images — screenshots showing steps in a process, frames of a hand-drawn animation, a burst of action shots — becomes far easier to share and understand as a single animated GIF than as separate files someone has to click through one at a time.",
    "This tool takes multiple images, in the order you select them, and combines them into an animated GIF at a frame rate you choose — from a slow one-frame-per-second slideshow feel up to a smoother ten-frames-per-second animation. It builds a custom color palette from your actual images first, then re-encodes using that palette, which produces noticeably better color quality than a generic fixed GIF palette.",
    "Processing runs through a real video-processing engine (FFmpeg) compiled to run entirely in your browser via WebAssembly — the same encoding technology used by professional tools, just running locally instead of on a server, so your images never leave your device.",
  ],
  howItWorks: [
    { title: "Select your images", description: "Choose multiple images in the order you want them to play." },
    { title: "Set the playback speed", description: "Choose how many frames play per second." },
    { title: "Download the GIF", description: "Get a single animated GIF file combining every image." },
  ],
  examples: [
    {
      label: "Four-step process",
      input: "4 screenshots, 2 frames/sec",
      output: "animation.gif — a 2-second looping animation cycling through all four images.",
    },
  ],
  faqs: [
    {
      question: "What order do the images play in?",
      answer:
        "The exact order you select or drop them in — reorder your file selection beforehand if you need the animation sequence to be different.",
    },
    {
      question: "Why does this produce better color quality than other GIF makers?",
      answer:
        "It generates a custom color palette from your specific images first, then encodes using that palette — rather than a fixed generic palette, which tends to produce banding and color shifts on images with subtle gradients.",
    },
    {
      question: "Is there a limit to how many images I can combine?",
      answer:
        "No hard limit is enforced, but more images (and higher resolution) make for a larger file and longer processing time, since everything runs locally in your browser.",
    },
    {
      question: "Are my images uploaded to a server?",
      answer:
        "No — the entire GIF is built locally in your browser using WebAssembly. Nothing is uploaded anywhere.",
    },
  ],
};
