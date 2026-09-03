import type { ToolContent } from "./types";

export const imageNoiseReducerContent: ToolContent = {
  heroSubtitle: "Reduce Speckle Noise in Photos with a Median Filter",
  overview: [
    "Photos taken in low light or with a high ISO setting often show visible speckle noise — random bright and dark pixel variations scattered across otherwise smooth areas. A median filter is a classic, effective technique for reducing this kind of noise while preserving edges far better than a simple blur would.",
    "This tool applies a median filter, which replaces each pixel with the median (middle) value from its surrounding neighborhood rather than an average. This distinction matters: averaging blends a noise spike into its surroundings (creating a softer but still visibly affected area), while taking the median tends to eliminate isolated outlier pixels entirely, since a single spike rarely wins the middle position in a sorted neighborhood.",
    "The filter strength is adjustable via neighborhood size — a 3×3 window for lighter noise reduction with more detail preserved, up to a 7×7 window for heavier noise at the cost of some fine detail softening.",
    "This is useful for cleaning up grainy low-light or high-ISO photos, reducing speckle noise from a low-quality camera or scan, smoothing out digitized old photographs, and general photo noise cleanup.",
  ],
  howItWorks: [
    {
      title: "Upload an image",
      description: "Any common image format.",
    },
    {
      title: "Choose filter strength",
      description: "A larger neighborhood removes more noise but softens more detail.",
    },
    {
      title: "Download the cleaned-up result",
      description: "Compare against the original to find the right balance.",
    },
  ],
  examples: [
    {
      label: "Reducing noise in a low-light photo",
      input: "A grainy high-ISO photo, 3×3 filter",
      output: "The same photo with visible speckle noise substantially reduced",
    },
  ],
  faqs: [
    {
      question: "Why use a median filter instead of a simple blur?",
      answer:
        "A blur averages every pixel with its neighbors, which spreads noise around rather than removing it and softens genuine detail along with the noise. A median filter tends to eliminate isolated noise spikes entirely while better preserving actual edges, since edges usually persist across most of a neighborhood while noise is randomly scattered.",
    },
    {
      question: "Is this the same as AI-based denoising tools?",
      answer:
        "No — this uses a classical median filter, a well-established signal-processing technique, not a machine-learning model trained to recognize and remove noise patterns intelligently. AI denoisers can sometimes achieve better results on complex noise, but a median filter is fast, predictable, and effective for typical speckle noise.",
    },
    {
      question: "Why does a larger filter size soften fine detail?",
      answer:
        "A larger neighborhood considers more surrounding pixels when computing the median, which more effectively smooths out noise but can also start blending genuinely fine detail (like hair or texture) that resembles noise at that scale — it's a real trade-off, not a flaw.",
    },
    {
      question: "What kind of noise does this work best on?",
      answer:
        "It's most effective on speckle or 'salt-and-pepper' style noise — isolated random bright/dark pixels — which is common in low-light and high-ISO photography. It's less effective on smooth gradient-style noise patterns, which respond better to different techniques.",
    },
    {
      question: "Is my image uploaded anywhere to reduce noise?",
      answer:
        "No — the filter runs entirely in your browser using pixel-level canvas processing. The image is never uploaded to a server.",
    },
  ],
};
