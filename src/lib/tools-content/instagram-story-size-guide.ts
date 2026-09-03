import type { ToolContent } from "./types";

export const instagramStorySizeGuideContent: ToolContent = {
  heroSubtitle: "Every Instagram Image Dimension, Plus a Safe-Zone Preview",
  overview: [
    "Instagram supports a surprising number of different image dimensions depending on where content is being posted — stories, feed posts in three different aspect ratios, carousels, and profile pictures all expect different sizes, and using the wrong one means Instagram will crop or letterbox your image in ways you didn't intend. This reference tool lists every current dimension in one place so you don't have to hunt across outdated blog posts.",
    "Stories in particular have a hidden trap: the top and bottom roughly 250 pixels of a 1080×1920 story get covered by Instagram's own UI — your profile icon, caption box, and reply bar — so any text or important detail placed there risks getting hidden behind the app's own interface. The included safe-zone preview shows exactly where that unsafe margin sits, so you can plan your design layout before you ever open a design tool.",
    "Whether you're prepping assets for a client, designing your own templates, or just double-checking a size before uploading, having every current dimension and the story safe zone in one static reference saves the repeated searching that usually comes with keeping social image specs straight.",
  ],
  howItWorks: [
    { title: "Browse the dimension table", description: "Every current Instagram image size in one place." },
    { title: "Check the safe-zone preview", description: "See exactly where story UI elements cover your content." },
    { title: "Design with confidence", description: "Build your image at the right size from the start." },
  ],
  examples: [
    { label: "Checking story dimensions", input: "Instagram Story", output: "1080 × 1920px, 9:16, keep text 250px from top/bottom" },
  ],
  faqs: [
    { question: "What happens if my story image isn't 1080×1920?", answer: "Instagram will crop or add letterboxing to fit the 9:16 frame, which can cut off parts of your design." },
    { question: "Why does content near the top and bottom of a story get hidden?", answer: "Instagram overlays its own UI — profile info, caption box, reply field — in those margins, so important content there gets visually covered." },
    { question: "Does this apply to Reels as well?", answer: "Yes — Reels use the same 1080×1920, 9:16 vertical format as Stories." },
    { question: "What's the difference between the three post aspect ratios?", answer: "Square (1:1) shows the most consistent crop in the feed, portrait (4:5) uses more vertical screen space, and landscape (1.91:1) is best for wide photos." },
    { question: "Does this tool resize my images for me?", answer: "No — it's a dimension reference. Use our other image tools to actually crop or resize an image to these sizes." },
  ],
};
