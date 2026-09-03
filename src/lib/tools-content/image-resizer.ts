import type { ToolContent } from "./types";

export const imageResizerContent: ToolContent = {
  heroSubtitle: "Resize Any Image to Exact Pixel Dimensions",
  overview: [
    "Every platform has its own image size expectations — a profile picture, a blog header, a product thumbnail — and an image that's the wrong dimensions either gets stretched, cropped unexpectedly, or rejected outright. Resizing to exact pixel dimensions before uploading avoids all of that.",
    "This tool resizes any image to whatever width and height you specify, with an aspect-ratio lock that automatically calculates the matching height when you change the width (or vice versa), preventing accidental stretching or squashing. Turn the lock off for full manual control over both dimensions independently.",
    "Resizing uses the canvas's high-quality image smoothing, which produces noticeably better results than a naive nearest-neighbor resize, especially when scaling an image down significantly or up moderately.",
    "This is useful for meeting a platform's exact image dimension requirements, preparing images for a specific layout or design, reducing an oversized image's dimensions before further editing, and general everyday image resizing.",
  ],
  howItWorks: [
    {
      title: "Upload an image",
      description: "The original dimensions are shown automatically.",
    },
    {
      title: "Enter target width and/or height",
      description: "Locked aspect ratio keeps proportions correct automatically.",
    },
    {
      title: "Download the resized image",
      description: "Exported as PNG at the exact dimensions you specified.",
    },
  ],
  examples: [
    {
      label: "Resizing a photo for a specific layout",
      input: "Original: 3000×2000px → Target: 1200×800px (aspect locked)",
      output: "A 1200×800px image with proportions perfectly preserved",
    },
  ],
  faqs: [
    {
      question: "What happens if I turn off the aspect ratio lock?",
      answer:
        "Width and height become fully independent, letting you set any combination — but stretching or squashing the image if the new proportions don't match the original, which is sometimes exactly what's needed (matching a fixed banner size, for instance) and sometimes not.",
    },
    {
      question: "Can I make an image larger than its original size?",
      answer:
        "Yes, technically, but enlarging beyond the original resolution doesn't add real detail — it interpolates existing pixels to fill the larger canvas, which can look soft or blurry at significant enlargement. Resizing works best when reducing size or making modest increases.",
    },
    {
      question: "Why does the output always save as PNG?",
      answer:
        "PNG preserves the resized result without any additional lossy compression, keeping quality consistent regardless of your original file's format. If you specifically need a smaller JPEG or WebP file afterward, run the result through the Image Compressor tool.",
    },
    {
      question: "Does resizing affect image quality?",
      answer:
        "Reducing dimensions is generally lossless in terms of visible quality (you're simply representing the same image with fewer pixels). Enlarging can introduce softness since there's no new detail to add, only interpolation between existing pixels.",
    },
    {
      question: "Is the image uploaded to a server to resize it?",
      answer:
        "No — resizing happens entirely in your browser using the Canvas API. The image never leaves your device.",
    },
  ],
};
