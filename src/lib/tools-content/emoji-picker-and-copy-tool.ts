import type { ToolContent } from "./types";

export const emojiPickerAndCopyToolContent: ToolContent = {
  heroSubtitle: "Browse, Search, and Copy Emoji Instantly",
  overview: [
    "Your operating system's built-in emoji picker works fine, but it's often buried behind a keyboard shortcut you can never quite remember, or it opens in a tiny window that's awkward to browse. This tool puts a clean, categorized grid of commonly used emoji directly in your browser — click any emoji and it's instantly copied to your clipboard, ready to paste wherever you need it.",
    "Emoji are grouped into intuitive categories — smileys, gestures, hearts, objects, nature, and food — so you can jump straight to the kind of emoji you're looking for instead of scrolling through an undifferentiated wall of icons. A search box filters by category name for quick access when you already know roughly what you want.",
    "This is handy for anyone writing on a device where the native emoji picker is inconvenient, for keeping a consistent set of emoji on hand while managing social media, or simply for finding an emoji faster than digging through your phone's keyboard on a desktop browser.",
  ],
  howItWorks: [
    { title: "Browse by category", description: "Emoji are organized into logical groups." },
    { title: "Search if needed", description: "Filter categories by name." },
    { title: "Click to copy", description: "One click copies the emoji to your clipboard." },
  ],
  examples: [
    { label: "Copying a heart emoji", input: "Click ❤️ in the Hearts category", output: "❤️ copied to clipboard, ready to paste" },
  ],
  faqs: [
    { question: "Does this cover every emoji that exists?", answer: "No — it includes a curated set of the most commonly used emoji across popular categories, not the full several-thousand-emoji Unicode set." },
    { question: "Will copied emoji look the same everywhere I paste them?", answer: "Emoji rendering varies slightly by platform (Apple, Google, Microsoft each have their own style), but the underlying character is the same everywhere." },
    { question: "Does this work on mobile browsers?", answer: "Yes — tapping an emoji copies it the same way as clicking on desktop." },
    { question: "Can I search for a specific emoji by name?", answer: "Search currently filters by category name (e.g. \"food\", \"hearts\") rather than individual emoji names." },
    { question: "Is anything sent to a server when I copy an emoji?", answer: "No — copying uses your browser's local clipboard API only." },
  ],
};
