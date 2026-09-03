import type { ToolContent } from "./types";

export const fancyTextGeneratorContent: ToolContent = {
  heroSubtitle: "Turn Plain Text Into Bold, Italic, Script, and 8 More Unicode Styles",
  overview: [
    "Fancy text you see on Instagram bios, Discord usernames, or social media posts isn't a special font — it's regular text swapped for visually similar characters from other parts of the Unicode standard, like mathematical alphanumeric symbols or fullwidth characters. Because these are genuine Unicode characters rather than image files, they paste and display anywhere text can go: bios, usernames, captions, chat messages.",
    "Type your text once and instantly see it rendered in eleven different styles side by side — bold, italic, bold italic, script, double-struck, monospace, fullwidth, circled, bubble, strikethrough, and underline — each with its own copy button. No need to guess which style you want before generating; compare them all at a glance.",
    "Keep in mind these are stylistic Unicode substitutions, not real typographic formatting — search engines, screen readers, and some strict text fields may not treat them the same as plain text, so they're best used sparingly for a bio line or a single eye-catching phrase rather than entire paragraphs.",
  ],
  howItWorks: [
    { title: "Type your text", description: "Enter any word or short phrase." },
    { title: "Browse all 11 styles", description: "See bold, italic, script, and more, side by side." },
    { title: "Copy your favorite", description: "One click copies any styled version." },
  ],
  examples: [
    { label: "Styling a username", input: "Toolspica", output: "𝐓𝐨𝐨𝐥𝐬𝐩𝐢𝐜𝐚 (bold), 𝑇𝑜𝑜𝑙𝑠𝑝𝑖𝑐𝑎 (italic), and 9 more styles" },
  ],
  faqs: [
    { question: "Is this a real font?", answer: "No — it's genuine Unicode characters that visually resemble bold, italic, and other styles, not a custom font file." },
    { question: "Will fancy text work in usernames and bios?", answer: "Generally yes, since it's plain Unicode text — but some platforms filter or reject certain Unicode ranges, so test on your specific platform first." },
    { question: "Why don't lowercase letters work in every style?", answer: "Not every Unicode style block includes a full alphabet — some styles (like Circled) only have limited character coverage, so unsupported letters may fall back to plain text." },
    { question: "Does fancy text affect SEO or accessibility?", answer: "It can — screen readers may not announce styled Unicode characters correctly, and search engines may not match them to normal search queries. Use sparingly." },
    { question: "Can I combine two styles, like bold and underline?", answer: "Underline and strikethrough use combining characters that can stack with other styles; the other ten styles are mutually exclusive character substitutions." },
  ],
};
