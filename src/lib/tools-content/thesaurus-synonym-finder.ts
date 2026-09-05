import type { ToolContent } from "./types";

export const thesaurusSynonymFinderContent: ToolContent = {
  heroSubtitle: "Find Synonyms and Antonyms for Any Word",
  overview: [
    "Reusing the same word too many times in a piece of writing reads as repetitive, but finding a genuinely better alternative — not just any synonym, but one that actually fits the sentence's meaning and tone — is harder than a basic word-swap list usually helps with.",
    "This tool finds synonyms for any word, ranked by how closely related they actually are in meaning (not just alphabetically or randomly ordered), plus a list of antonyms for finding the opposite of a word when that's what you actually need.",
    "Results come from a word-relationship dataset built specifically for finding meaningfully related words — the same category of data source that powers several well-known writing and vocabulary tools, queried directly from your browser.",
  ],
  howItWorks: [
    { title: "Enter a word", description: "Type any word you want alternatives for." },
    { title: "Review ranked synonyms", description: "Results are ordered by how closely related they are in meaning." },
    { title: "Check antonyms too", description: "See opposite-meaning words in a separate section." },
  ],
  examples: [
    {
      label: "Finding alternatives for \"happy\"",
      input: "happy",
      output: "Synonyms: glad, joyful, pleased, content... — Antonyms: sad, unhappy, miserable",
    },
  ],
  faqs: [
    {
      question: "How are the synonyms ranked?",
      answer:
        "By how closely related they are in meaning to your search word, based on a word-relationship dataset — not alphabetically or randomly ordered.",
    },
    {
      question: "Why do some words return no results?",
      answer:
        "Very obscure words, proper nouns, or unusual spellings may not have strong matches in the underlying word-relationship dataset — try a more common form of the word.",
    },
    {
      question: "Can I copy all the synonyms at once?",
      answer:
        "Yes — the \"Copy all\" button copies every listed synonym as a single comma-separated list.",
    },
    {
      question: "Is my search sent to this site's own server?",
      answer:
        "No — your word is queried directly from your browser to a public word-relationship API. This site's own servers never see your search.",
    },
  ],
};
