import type { ToolContent } from "./types";

export const dictionaryLookupContent: ToolContent = {
  heroSubtitle: "Look Up Any Word's Full Dictionary Entry",
  overview: [
    "Looking up a word usually means opening a separate dictionary site, waiting for it to load with ads and unrelated content, just to see one definition. A fast, clean lookup that shows everything relevant — every meaning, part of speech, and example — in one place is genuinely useful for writers, students, and anyone reading something unfamiliar.",
    "This tool looks up a word and shows its complete dictionary entry: phonetic spelling with an audio pronunciation button when available, every part of speech the word can take (noun, verb, adjective, and so on), each meaning's full definition, real usage examples where provided, and related synonyms.",
    "Results come from a free, open dictionary API queried directly from your browser — the same underlying data source used by many dictionary apps, covering standard English vocabulary with genuine definitions and examples rather than a stripped-down or AI-generated approximation.",
  ],
  howItWorks: [
    { title: "Type a word", description: "Enter any English word you want to look up." },
    { title: "Review the full entry", description: "See every part of speech, definition, and example." },
    { title: "Play the pronunciation", description: "Click the audio icon to hear the word spoken, when available." },
  ],
  examples: [
    {
      label: "Looking up \"serendipity\"",
      input: "serendipity",
      output: "Noun: the occurrence of events by chance in a happy or beneficial way. Example: \"a fortunate stroke of serendipity\"",
    },
  ],
  faqs: [
    {
      question: "Where does the definition data come from?",
      answer:
        "A free, open dictionary API queried directly from your browser — the same category of data source used by many dictionary apps, covering standard English vocabulary.",
    },
    {
      question: "What if a word isn't found?",
      answer:
        "A clear message tells you no entry was found — this can happen for very obscure terms, proper nouns, or misspellings not in the dictionary's dataset.",
    },
    {
      question: "How is this different from the Word Definition Lookup tool?",
      answer:
        "This shows the complete entry — every part of speech, all definitions, and examples. Word Definition Lookup shows just the single most relevant definition for a faster, simpler answer.",
    },
    {
      question: "Is my search query sent to this site's own server?",
      answer:
        "No — your browser queries the dictionary API directly. This site's own servers never see what you searched for.",
    },
  ],
};
