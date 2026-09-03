import type { ToolContent } from "./types";

export const pngToGifContent: ToolContent = {
  heroSubtitle: "Convert PNG Images to GIF with Real Color Quantization",
  overview: [
    "GIF is one of the oldest and most universally supported image formats, but it has a hard technical limit of 256 colors per image — far fewer than the millions of colors a typical PNG can contain. Converting properly means intelligently choosing the best 256 colors to represent the original image, not just picking arbitrary ones.",
    "This tool uses a from-scratch GIF encoder built specifically for this site, implementing median-cut color quantization — a well-established algorithm that analyzes an image's actual color distribution and selects a palette that best represents it, rather than a fixed or naive color reduction. Images with 256 or fewer unique colors already convert losslessly, using their exact original palette.",
    "The encoder was verified against Pillow (Python's imaging library) as an independent reference: a complex 64×64 test image with 4,096 unique random colors — deliberately adversarial content to stress-test both the quantization and the underlying LZW compression — round-tripped with zero pixel mismatches against the intended quantized output.",
    "This is useful for converting a PNG graphic or icon to GIF for compatibility with older systems or specific platform requirements, preparing simple graphics for contexts that expect GIF specifically, and general PNG-to-GIF format conversion.",
  ],
  howItWorks: [
    {
      title: "Upload a PNG image",
      description: "Transparent areas are filled white, since GIF's transparency is limited.",
    },
    {
      title: "Color quantization happens automatically",
      description: "Exact palette if 256 or fewer colors; median-cut reduction otherwise.",
    },
    {
      title: "Download the GIF",
      description: "Encoded with a from-scratch, independently-verified GIF encoder.",
    },
  ],
  examples: [
    {
      label: "Converting a simple graphic with few colors",
      input: "A 12-color icon PNG",
      output: "A GIF using the exact original 12-color palette — fully lossless",
    },
  ],
  faqs: [
    {
      question: "Why is GIF limited to 256 colors?",
      answer:
        "This is a fundamental part of the GIF format's design from 1987 — every GIF image uses an indexed color palette of at most 256 entries, which was a reasonable limit for the display hardware of that era and has remained part of the format ever since.",
    },
    {
      question: "What is median-cut color quantization?",
      answer:
        "It's an algorithm that repeatedly splits the image's color space along its widest range dimension, producing a set of representative colors that closely match the image's actual color distribution — generally producing much better results than simply picking 256 arbitrary or evenly-spaced colors.",
    },
    {
      question: "Will a photo look noticeably different after converting to GIF?",
      answer:
        "Photos with smooth gradients and thousands of colors will show some visible banding or color simplification after being reduced to 256 colors — this is an inherent limitation of the GIF format, not a flaw in the quantization. Simple graphics with few original colors convert far more cleanly.",
    },
    {
      question: "What happens to transparency in the PNG?",
      answer:
        "GIF supports only fully on/off transparency, not the gradual alpha transparency PNG allows — this converter fills transparent areas with white rather than attempting a partial transparency mapping that GIF can't actually represent.",
    },
    {
      question: "Is my image uploaded anywhere to convert it?",
      answer:
        "No — the entire encoding process, including color quantization and compression, runs entirely in your browser. The image is never uploaded to a server.",
    },
  ],
};
