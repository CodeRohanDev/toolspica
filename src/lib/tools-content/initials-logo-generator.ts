import type { ToolContent } from "./types";

export const initialsLogoGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a Simple Initials-Based Logo",
  overview: [
    "Not every project needs a professionally designed logo on day one — a personal brand, a side project, a placeholder avatar, or a quick internal tool often just needs something better than a blank gray circle. An initials-based mark (like the monogram logos used by countless real companies and personal brands) is a simple, legitimate design pattern that looks intentional rather than unfinished.",
    "This tool takes one or two initials, a background shape (circle, square, or rounded square), and a color, and renders a clean, centered initials mark as a downloadable PNG — the same basic visual pattern used by avatar placeholders across most major apps and by plenty of real small-business logos.",
    "This produces a simple, solid-color monogram mark, not a fully custom, illustrated logo — it's best suited for avatars, placeholder branding, or a genuinely minimalist visual identity, not a replacement for a designed logo once a brand needs a more distinctive visual identity as it grows.",
  ],
  howItWorks: [
    { title: "Enter your initials", description: "Type one or two letters." },
    { title: "Pick a color and shape", description: "Choose from several colors and circle, square, or rounded-square shapes." },
    { title: "Download the PNG", description: "Save the result to use as an avatar or placeholder logo." },
  ],
  examples: [
    {
      label: "Two-letter mark",
      input: "Initials: JD, Shape: Circle, Color: Blue",
      output: "logo.png — a blue circle with white \"JD\" centered.",
    },
  ],
  faqs: [
    {
      question: "Is this suitable as a permanent company logo?",
      answer:
        "It works well as a placeholder, an avatar, or a genuinely minimalist visual identity for a small or personal project, but a growing brand typically benefits from a custom-designed logo with more distinctive visual identity down the line.",
    },
    {
      question: "Can I use more than two initials?",
      answer:
        "The tool is limited to two characters, since three or more letters generally become harder to read clearly at small avatar sizes — stick to your first and last initial for the clearest result.",
    },
    {
      question: "What image format does this download as?",
      answer:
        "A PNG file with a solid background (not transparent), sized appropriately for use as a profile picture, favicon source, or placeholder logo.",
    },
    {
      question: "Is my information sent anywhere?",
      answer:
        "No — the logo is rendered entirely in your browser using canvas. Nothing is uploaded or stored.",
    },
  ],
};
