import type { ToolContent } from "./types";

export const titleCaseConverterContent: ToolContent = {
  overview: [
    "Title case is the capitalization style used for headlines, book titles, and article titles — major words are capitalized while a specific set of short, grammatically minor words stay lowercase, unless they happen to be the very first or last word of the title. It's the style behind titles like \"The Lord of the Rings\" (where \"of\" and \"the\" stay lowercase mid-title) and \"To Kill a Mockingbird\" (where \"to\" and \"a\" stay lowercase), and it's the convention most major style guides — including APA, Chicago, and AP style, with minor variations between them — converge on for headline-style text.",
    "This differs meaningfully from a naive \"capitalize every word\" approach, which is what many basic case converters actually do. A naive converter would turn \"the lord of the rings\" into \"The Lord Of The Rings\" — capitalizing \"of\" — which reads as noticeably incorrect to anyone familiar with standard title casing conventions. This tool instead maintains a list of common minor words (articles like \"a\", \"an\", \"the\"; short conjunctions like \"and\", \"but\", \"or\", \"nor\"; and short prepositions like \"in\", \"on\", \"at\", \"to\", \"of\", \"by\", \"with\") and specifically keeps those lowercase whenever they fall in the middle of a title — while still always capitalizing the very first and very last word of each line, regardless of whether it's on the minor-word list, since every style guide agrees the first and last words of a title are always capitalized no matter what.",
    "Style guides do differ on the exact list of words treated as \"minor\" and on edge cases like hyphenated words or words after a colon, so no automated title-case converter can perfectly match every specific style guide's rules in every situation — but this tool follows the common, widely-shared core of those rules that covers the overwhelming majority of everyday titles correctly, which is exactly what most people reaching for a quick title-case converter actually need.",
    "This is a genuinely different (and for headline-style text, more accurate) transformation than the plain \"Title Case\" option available in the general-purpose Case Converter tool, which simply capitalizes every word without checking against a minor-word list — use this tool specifically when you want proper headline-style capitalization for a blog post title, article headline, or book title.",
  ],
  howItWorks: [
    {
      title: "Enter your title or heading",
      description: "Type or paste the text you want converted to proper title case.",
    },
    {
      title: "Minor words are automatically lowercased",
      description:
        "Common short words like \"the\", \"of\", and \"and\" stay lowercase unless they're first or last.",
    },
    {
      title: "Copy the result",
      description: "The properly title-cased text updates instantly and is ready to copy.",
    },
  ],
  examples: [
    {
      label: "A book title",
      input: "the lord of the rings",
      output: "The Lord of the Rings",
    },
    {
      label: "Minor word at the very end stays capitalized",
      input: "what dreams are made of",
      output: "What Dreams Are Made Of",
    },
  ],
  faqs: [
    {
      question: "Why does \"of\" stay lowercase in the middle but get capitalized at the end?",
      answer:
        "Every major style guide capitalizes the first and last word of a title unconditionally, regardless of what the word is. \"Of\" is only treated as a minor, lowercase word when it falls somewhere in the middle of the title.",
    },
    {
      question: "How is this different from the Title Case option in the Case Converter tool?",
      answer:
        "The Case Converter's quick Title Case option simply capitalizes every single word with no exceptions, which technically isn't correct headline style. This tool specifically keeps common minor words (a, an, the, and, of, in, on, to, and similar short words) lowercase when they're not first or last, matching real title-case conventions.",
    },
    {
      question: "Does this match APA, Chicago, or AP style exactly?",
      answer:
        "It follows the common core shared across most major style guides, but each guide has its own specific, sometimes slightly different list of minor words and edge-case rules (like how to handle hyphenated compounds or words after a colon). For strict compliance with one specific style guide, double-check against that guide's exact rules.",
    },
    {
      question: "What happens to words already in all caps, like an acronym?",
      answer:
        "This tool lowercases every word before reapplying capitalization, so an acronym like \"NASA\" would be converted to \"Nasa\" rather than preserved — a known limitation of any general-purpose title-case converter, since it can't automatically distinguish an intentional acronym from a word that was just typed in caps.",
    },
    {
      question: "Does this handle multiple lines or just a single title at a time?",
      answer:
        "It processes each line independently, applying first-word and last-word capitalization rules separately to every line — so you can convert a whole list of titles or headlines at once, not just a single line.",
    },
  ],
};
