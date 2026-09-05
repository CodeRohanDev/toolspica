import type { ToolContent } from "./types";

export const fontPairingGeneratorContent: ToolContent = {
  heroSubtitle: "Find a Heading and Body Font That Work Well Together",
  overview: [
    "Picking one good font is easy; picking two that actually work together — enough contrast between heading and body to create hierarchy, but not so much they feel mismatched — is where most self-designed sites and documents go wrong. Professional designers rely on established, tested pairings rather than guessing at random combinations.",
    "This tool shows a curated set of heading-and-body font pairings, each with a described \"vibe\" (editorial, modern SaaS, corporate, tech) so you can pick a direction that fits your project, then see both fonts rendered live side by side using real Google Fonts loaded directly in your browser.",
    "Every pairing shown is a real, working combination — not randomly generated — chosen for genuine contrast and complementary character between the display font and the body text font. Once you find one you like, the exact Google Fonts family names are shown so you can use them directly in your own CSS or Google Fonts embed.",
  ],
  howItWorks: [
    { title: "Browse a pairing", description: "See a curated heading-and-body font combination rendered live." },
    { title: "Shuffle to see more", description: "Click through different pairings until one fits your project's vibe." },
    { title: "Use the font names", description: "Copy the exact Google Fonts family names into your own project." },
  ],
  examples: [
    {
      label: "Modern SaaS pairing",
      input: "Shuffle to \"Modern / SaaS\"",
      output: "Heading: Poppins — Body: Inter, rendered live in your browser.",
    },
  ],
  faqs: [
    {
      question: "Are these pairings randomly generated?",
      answer:
        "No — each pairing is a curated, real combination chosen for genuine visual contrast and complementary character, not randomly matched fonts.",
    },
    {
      question: "Do I need to install these fonts myself?",
      answer:
        "No — they're all freely available on Google Fonts. Use the exact family name shown to add them via a Google Fonts `<link>` tag or `@import` in your own CSS.",
    },
    {
      question: "Can I use these font pairings in a Word document or design tool?",
      answer:
        "Most Google Fonts are also available as downloadable font files (from fonts.google.com) that install like any other font, usable in Word, Canva, Figma, and similar design tools, not just on the web.",
    },
    {
      question: "Is my activity on this tool tracked or sent anywhere?",
      answer:
        "No — this tool only loads font files from Google's font CDN to display the preview. Nothing about your usage is sent to this site's servers.",
    },
  ],
};
