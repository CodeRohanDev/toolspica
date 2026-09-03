import type { ToolContent } from "./types";

export const anagramSolverContent: ToolContent = {
  overview: [
    "An anagram is a word or phrase formed by rearranging every letter of another word or phrase, using each letter exactly once — \"listen\" and \"silent\" are a classic example, both built from exactly the same six letters (e, i, l, n, s, t) in different orders. Anagrams have been a popular form of wordplay for thousands of years, showing up in ancient Greek and Hebrew texts, Renaissance-era pen names, crossword and puzzle culture, and modern word games like Scrabble and Words With Friends, where recognizing that your rack of letters can be rearranged into a valid word is a core skill.",
    "This tool checks whether two words or phrases are true anagrams of each other by comparing their letters directly: it strips out spaces and non-alphanumeric characters, converts everything to a common case, sorts each string's remaining letters alphabetically, and checks whether the two sorted results are identical. If they are, every letter in the first phrase has an exact match in the second, with none left over and none missing — the precise, unambiguous definition of an anagram, rather than just a general \"sounds similar\" or \"shares some letters\" comparison.",
    "The \"ignore spaces\" option matters most for multi-word phrases: comparing \"the eyes\" against \"they see\" only works correctly if spaces are excluded from the letter comparison, since anagram phrases very often rearrange letters across word boundaries in ways the original word breaks don't respect. With it on, both phrases correctly reduce to the same six letters (e, e, h, s, t, y) and register as a match.",
    "This is a focused, purpose-built anagram checker rather than a dictionary-based \"find all words I can make from these letters\" solver — it tells you definitively whether two specific inputs are anagrams of each other, which is the most common real use case: verifying a pen name, a puzzle answer, a wordplay riddle, or simply satisfying curiosity about whether two words or names happen to share the exact same letters.",
  ],
  howItWorks: [
    {
      title: "Enter two words or phrases",
      description: "Type the two words or phrases you want to compare.",
    },
    {
      title: "Toggle space handling",
      description:
        "Turn on \"Ignore spaces\" for multi-word phrases where letters may cross word boundaries.",
    },
    {
      title: "See the result",
      description: "An instant yes/no tells you whether the two inputs are true anagrams.",
    },
  ],
  examples: [
    {
      label: "Classic single-word anagram",
      input: "listen / silent",
      output: "Yes — these are anagrams of each other!",
    },
    {
      label: "Multi-word phrase anagram",
      input: "the eyes / they see",
      output: "Yes — these are anagrams of each other! (with Ignore spaces on)",
    },
  ],
  faqs: [
    {
      question: "Does word order matter for a phrase anagram?",
      answer:
        "No — this tool compares the full set of letters across the entire phrase, not word by word, so \"the eyes\" correctly matches \"they see\" even though the individual words don't correspond one-to-one.",
    },
    {
      question: "Do capital letters and punctuation affect the result?",
      answer:
        "No — both inputs are converted to a common case and stripped of punctuation before comparing, so \"Elvis\" and \"lives!\" are compared purely on their letters (e, i, l, s, v) regardless of capitalization or the exclamation point.",
    },
    {
      question: "Can this find all the words I can make from a set of letters?",
      answer:
        "Not currently — this tool checks whether two specific inputs you provide are anagrams of each other, rather than searching a dictionary for every valid word that can be built from a set of letters (a more complex, dictionary-dependent feature).",
    },
    {
      question: "Why do I need to turn on \"Ignore spaces\" for phrases?",
      answer:
        "Without it, a space is treated as a literal character that must also match in position count and placement between the two inputs, which almost never holds true for genuine phrase anagrams where letters get rearranged across word boundaries — turning the option on excludes spaces from the comparison entirely.",
    },
    {
      question: "What's the longest possible anagram?",
      answer:
        "There's no fixed limit — any two strings containing exactly the same multiset of letters qualify, no matter how long. Famous long anagram pairs exist in wordplay collections, some spanning entire sentences.",
    },
  ],
};
