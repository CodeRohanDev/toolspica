import type { ToolContent } from "./types";

export const sentenceCaseConverterContent: ToolContent = {
  overview: [
    "Sentence case is the normal, everyday capitalization style used in standard prose: only the first letter of each sentence is capitalized (along with proper nouns, which no automated tool can fully detect), and everything else stays lowercase. It's the style your writing should almost always be in outside of headlines and titles, which makes fixing text that's drifted out of sentence case — usually because it got typed entirely in caps, entirely in lowercase, or pasted from a source with inconsistent capitalization — a surprisingly common cleanup task.",
    "This tool detects sentence boundaries the same way a basic grammar checker does: it looks for a period, exclamation point, or question mark followed by whitespace, and capitalizes the very next letter after that boundary, along with the first letter of the entire text and the first letter following any line break. Everything else is lowercased first, so text that arrived in ALL CAPS or aLtErNaTiNg CaSe gets fully normalized rather than just partially cleaned up.",
    "This is a dedicated, standalone version of the same transformation available as one option inside the general Case Converter tool — useful when sentence casing is specifically the one thing you need fixed, without the extra buttons for camelCase, kebab-case, and the other developer-oriented conversions bundled into that broader tool. It's especially handy for cleaning up text pasted from a source that used all-caps for emphasis (an email, an old document, a scanned OCR result) back into normal, readable sentence structure.",
    "As with any purely punctuation-based sentence detector, it has the same honest limitation every automated sentence-case tool shares: abbreviations that end in a period (like \"Dr.\", \"e.g.\", or \"U.S.\") can be mistaken for the end of a sentence, which may cause the next word to be capitalized when it shouldn't be. For text with a lot of such abbreviations, a quick manual pass after conversion is worth doing.",
  ],
  howItWorks: [
    {
      title: "Paste your text",
      description: "Enter text that's in the wrong case — all caps, all lowercase, or inconsistent.",
    },
    {
      title: "Sentence boundaries are detected",
      description: "The tool finds the start of each sentence and capitalizes just that first letter.",
    },
    {
      title: "Copy the result",
      description: "Properly cased, normal-reading text is ready to copy instantly.",
    },
  ],
  examples: [
    {
      label: "Fixing all-caps text",
      input: "THIS EMAIL WAS TYPED IN ALL CAPS. IT LOOKS LIKE SHOUTING.",
      output: "This email was typed in all caps. It looks like shouting.",
    },
  ],
  faqs: [
    {
      question: "Will this correctly capitalize proper nouns like names or cities?",
      answer:
        "No — proper nouns require understanding meaning, not just punctuation position, which a simple sentence-case converter can't do. Names, cities, and other proper nouns will need to be manually re-capitalized after conversion.",
    },
    {
      question: "Why did it capitalize a word after \"Dr.\" or \"e.g.\"?",
      answer:
        "The tool treats any period followed by a space as a sentence boundary, since it has no way to distinguish an abbreviation's period from a true sentence-ending period. Text with many abbreviations may need a quick manual review after conversion.",
    },
    {
      question: "Does it work on multiple paragraphs at once?",
      answer:
        "Yes — it processes the entire text you paste in, including multiple lines and paragraphs, capitalizing the first letter of every sentence throughout, not just the very first one.",
    },
    {
      question: "How is this different from the Sentence case option in Case Converter?",
      answer:
        "It's the same underlying transformation, offered here as a focused standalone tool rather than one of nine buttons in the broader Case Converter — useful when sentence casing is the only conversion you need.",
    },
    {
      question: "What happens to numbers or punctuation at the start of a sentence?",
      answer:
        "They're left unchanged, since capitalization only applies to letters — a sentence starting with a number or symbol will have that character untouched, with the next actual letter in the sentence capitalized instead.",
    },
  ],
};
