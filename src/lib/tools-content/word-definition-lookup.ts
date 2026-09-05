import type { ToolContent } from "./types";

export const wordDefinitionLookupContent: ToolContent = {
  heroSubtitle: "Get a Word's Definition, Fast — No Extra Clutter",
  overview: [
    "Sometimes you just need one quick answer — what does this word actually mean — without scrolling through every part of speech, every alternate meaning, and a list of examples you didn't ask for.",
    "This tool looks up a word and shows just its single most relevant definition immediately, with a copy button to grab it directly, for the times a quick answer beats a full dictionary entry.",
    "For a word with multiple meanings, this shows the primary, most commonly used sense — for the complete picture including every part of speech and alternate meaning, use this site's Dictionary Lookup tool instead.",
  ],
  howItWorks: [
    { title: "Type a word", description: "Enter any English word." },
    { title: "Get the definition instantly", description: "See the single most relevant meaning right away." },
    { title: "Copy it", description: "Copy the definition directly with one click." },
  ],
  examples: [
    {
      label: "Quick lookup",
      input: "ubiquitous",
      output: "Adjective: present, appearing, or found everywhere.",
    },
  ],
  faqs: [
    {
      question: "Why does this only show one definition?",
      answer:
        "This is built for a fast answer rather than a comprehensive reference — for every meaning and part of speech a word can have, use the Dictionary Lookup tool instead.",
    },
    {
      question: "What if the word has multiple very different meanings?",
      answer:
        "This shows the primary, most commonly listed sense of the word. If you need the full range of meanings, the Dictionary Lookup tool breaks down every part of speech separately.",
    },
    {
      question: "What if my word isn't found?",
      answer:
        "A message tells you clearly rather than showing an empty or wrong result — check spelling or try a more common form of the word.",
    },
    {
      question: "Is my search sent to this site's own server?",
      answer:
        "No — the lookup is queried directly from your browser to a dictionary API. This site's own servers never see your search.",
    },
  ],
};
