import type { ToolContent } from "./types";

export const socialMediaImageSizeGuideContent: ToolContent = {
  heroSubtitle: "Every Platform's Image Dimensions in One Reference",
  overview: [
    "Facebook, X, LinkedIn, YouTube, and Pinterest each expect different image dimensions for profile pictures, cover images, and shared posts — and they change often enough that a bookmark from a year ago is frequently out of date. Rather than searching platform-by-platform, this tool lists the current recommended sizes for all five in one scrollable reference.",
    "Getting these dimensions right matters more than it might seem: upload an image sized for the wrong aspect ratio and the platform will crop it automatically, sometimes cutting off a logo, face, or key piece of text you carefully positioned. Designing to the correct dimensions from the start avoids that entirely and ensures your image displays exactly as intended.",
    "Whether you're preparing a batch of assets for a client's social accounts, updating your own brand's cover photos across platforms, or just double-checking a size before an upload, having every platform's specs in one place removes the guesswork and repeated searching.",
  ],
  howItWorks: [
    { title: "Pick your platform", description: "Facebook, X, LinkedIn, YouTube, or Pinterest." },
    { title: "Find your image type", description: "Profile picture, cover image, or post image." },
    { title: "Design to the exact size", description: "Avoid unwanted cropping by matching the spec." },
  ],
  examples: [
    { label: "Checking a LinkedIn cover image size", input: "LinkedIn cover image", output: "1584 × 396px" },
  ],
  faqs: [
    { question: "Why do platforms keep changing these dimensions?", answer: "Platforms periodically redesign their interfaces, which changes how much space is allotted for profile and cover images." },
    { question: "What happens if I upload the wrong size?", answer: "Most platforms will automatically crop or scale your image to fit, which can cut off important content near the edges." },
    { question: "Does this tool resize images for me?", answer: "No — it's a dimension reference. Use our dedicated image resizer tools to actually resize your files to these dimensions." },
    { question: "Are these sizes the same on mobile and desktop?", answer: "Generally yes for upload dimensions, though how much of the image is visible without cropping can differ between mobile and desktop layouts." },
    { question: "Is this list kept up to date?", answer: "It reflects the currently documented platform specifications; always double-check against the platform's official help center for the latest changes before a major campaign." },
  ],
};
