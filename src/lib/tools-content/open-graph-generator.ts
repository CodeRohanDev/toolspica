import type { ToolContent } from "./types";

export const openGraphGeneratorContent: ToolContent = {
  heroSubtitle: "Build Open Graph Tags With a Live Link-Preview",
  overview: [
    "Open Graph tags control how your page looks when it's shared on Facebook, LinkedIn, Slack, iMessage, and most other platforms that generate a link preview card — the title, description, and image that show up automatically. Get these wrong or leave them out entirely, and shared links show an ugly blank card or pull the wrong content from your page.",
    "This tool builds a complete set of Open Graph meta tags from a simple form, and shows a live preview card as you type so you can see roughly how your link will actually look when shared, before you ever publish it. The recommended 1200×630 image size is called out directly, since undersized or oddly-cropped images are one of the most common Open Graph mistakes.",
    "It also includes the Twitter Card meta tag needed for large-image previews on X specifically, since Open Graph tags alone aren't always sufficient there. Whether you're launching a new landing page, sharing a blog post, or setting up social previews for a product page, this generator handles the full correctly-formatted tag set in one pass.",
  ],
  howItWorks: [
    { title: "Fill in your page details", description: "Title, description, image URL, and page URL." },
    { title: "Preview the share card", description: "See roughly how the link will look when shared." },
    { title: "Copy the meta tags", description: "Paste into your page's <head> section." },
  ],
  examples: [
    { label: "Setting up a blog post preview", input: "Title, description, 1200×630 image", output: "A complete og: meta tag set plus a live preview card" },
  ],
  faqs: [
    { question: "What image size should I use?", answer: "1200×630 pixels is the recommended standard — it displays correctly as a large preview image across Facebook, LinkedIn, and most other platforms." },
    { question: "Do I need separate tags for Twitter/X?", answer: "This generator includes the twitter:card tag needed for large-image previews there; Open Graph tags alone are read by most other platforms." },
    { question: "Why isn't my updated preview showing on Facebook?", answer: "Platforms cache link previews — use Facebook's Sharing Debugger or LinkedIn's Post Inspector to force a re-scrape after updating your tags." },
    { question: "Does og:type matter?", answer: "Yes, somewhat — it hints at the content type (article, product, website) to platforms that use it for slightly different card layouts." },
    { question: "Where do these tags go in my HTML?", answer: "Inside the <head> section of the specific page you want the preview to apply to." },
  ],
};
