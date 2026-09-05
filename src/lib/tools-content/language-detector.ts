import type { ToolContent } from "./types";

export const languageDetectorContent: ToolContent = {
  heroSubtitle: "Detect the Language of a Text Sample",
  overview: [
    "Figuring out what language a piece of text is written in seems trivial for a fluent reader, but comes up as a genuine technical need surprisingly often — sorting incoming messages by language before translation, checking scraped or pasted text before processing it, or just confirming a guess about an unfamiliar snippet.",
    "This tool detects language using stopword-frequency analysis — comparing how many extremely common function words (like \"the,\" \"and,\" \"is\" in English, or \"le,\" \"de,\" \"et\" in French) appear in your text against a reference list for each supported language. It currently covers English, Spanish, French, German, Portuguese, Italian, Dutch, and Hindi, showing a confidence percentage for each match so you can see how clear-cut the detection is.",
    "This is a lightweight, transparent heuristic — not a trained machine-learning language model — so it works best on genuine sentences and paragraphs with real function words, and less reliably on very short snippets, proper nouns, or text mixing multiple languages. For a two-word input or a string of names, there may not be enough common words present to confidently detect anything.",
  ],
  howItWorks: [
    { title: "Paste your text", description: "Enter a sentence or paragraph you want to identify." },
    { title: "Review the results", description: "See each detected language with a confidence percentage, ranked highest first." },
    { title: "Check for ties or low confidence", description: "Very short or ambiguous text may show multiple close results or none at all." },
  ],
  examples: [
    {
      label: "French sentence",
      input: "Le chat est sur la table et il dort.",
      output: "French — 67% confidence",
    },
  ],
  faqs: [
    {
      question: "How does this detect language without an AI model?",
      answer:
        "It compares how often extremely common function words for each supported language (like \"the\" in English or \"le\" in French) appear in your text — a fast, transparent statistical method rather than a trained machine-learning model.",
    },
    {
      question: "Why didn't it detect anything for my short input?",
      answer:
        "Very short text, proper nouns, or single words often don't contain enough common function words to produce a confident match — try a full sentence or two for more reliable detection.",
    },
    {
      question: "Which languages does this support?",
      answer:
        "English, Spanish, French, German, Portuguese, Italian, Dutch, and Hindi — the eight languages with reference stopword lists built into this tool.",
    },
    {
      question: "Is my text sent to a server to detect the language?",
      answer:
        "No — detection runs entirely in your browser using JavaScript. Nothing you paste is uploaded or stored.",
    },
  ],
};
