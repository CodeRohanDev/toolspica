import type { ToolContent } from "./types";

export const palindromeCheckerContent: ToolContent = {
  overview: [
    "A palindrome is a word, phrase, or sequence that reads identically forwards and backwards — \"racecar\", \"level\", and \"madam\" are single-word examples, while longer phrases like \"A man, a plan, a canal: Panama\" and \"Never odd or even\" show that the pattern can extend across full sentences once spacing, punctuation, and capitalization are set aside. Palindromes have fascinated writers, puzzle-makers, and mathematicians for centuries precisely because constructing a long one that still reads as coherent language is genuinely difficult — the constraint gets exponentially harder to satisfy as the phrase grows longer.",
    "Checking a short word like \"level\" for the palindrome property is trivial by eye, but it gets unreliable fast once you're dealing with a full sentence that includes spaces, commas, and mixed capitalization — a human reader has to mentally strip all of that out before comparing forwards and backwards, and it's easy to make a mistake partway through a long phrase. This tool does that stripping and comparison automatically and instantly, so you get a definitive yes-or-no answer along with a clear view of exactly what text was actually compared.",
    "Two independent toggles control how strict the check is. \"Ignore spaces\" removes all whitespace before comparing, which is essential for checking multi-word phrases at all — without it, \"race car\" would never match itself reversed, since reversing the whole string turns the space's position around too. \"Ignore punctuation & capitalization\" additionally strips out commas, periods, apostrophes, and normalizes case, which is necessary for classic literary palindromes like \"A man, a plan, a canal: Panama\" to be correctly recognized despite their punctuation and capital letters. With both options off, the check becomes maximally strict — comparing the raw text exactly as typed, which only trivial single-word, single-case, unpunctuated palindromes will pass.",
    "The tool also shows you the exact \"compared as\" string after cleaning, so if a phrase you expected to be a palindrome doesn't match, you can immediately see why — often a stray character or an unexpected space reveals the discrepancy at a glance rather than requiring manual re-checking.",
  ],
  howItWorks: [
    {
      title: "Type a word or phrase",
      description: "Enter the text you want to check.",
    },
    {
      title: "Adjust strictness if needed",
      description: "Toggle whether to ignore spaces, punctuation, and capitalization.",
    },
    {
      title: "See the instant result",
      description: "A clear yes/no answer appears, along with the exact cleaned text that was compared.",
    },
  ],
  examples: [
    {
      label: "Classic sentence palindrome",
      input: "A man, a plan, a canal: Panama",
      output: "Yes — that's a palindrome! (compared as: amanaplanacanalpanama)",
    },
    {
      label: "Not a palindrome",
      input: "Hello World",
      output: "No, that's not a palindrome.",
    },
  ],
  faqs: [
    {
      question: "Why doesn't \"race car\" register as a palindrome with both toggles off?",
      answer:
        "With \"Ignore spaces\" turned off, the space in \"race car\" is compared literally — and reversing the full string \"race car\" gives \"rac ecar\", which doesn't match because the space ends up in a different position. Turn on \"Ignore spaces\" to correctly recognize multi-word palindromic phrases.",
    },
    {
      question: "Does a single letter or empty input count as a palindrome?",
      answer:
        "A single character trivially reads the same forwards and backwards, so it would technically qualify, but this tool requires at least one character after cleaning and shows a neutral prompt for genuinely empty input rather than a true/false result.",
    },
    {
      question: "Are numbers treated the same way as letters?",
      answer:
        "Yes — a numeric palindrome like \"12321\" is checked the same way as a text palindrome, since digits are compared character by character just like letters.",
    },
    {
      question: "Can this check for palindromes in languages other than English?",
      answer:
        "The cleaning logic is built around the Latin alphabet and standard Western punctuation, so it works correctly for English and similar languages, but may not correctly strip punctuation or handle capitalization rules specific to other scripts.",
    },
    {
      question: "Is there a longest known palindrome?",
      answer:
        "Constructed and dictionary-based palindromes can be extremely long — entire palindromic poems and even palindromic novels have been written as literary exercises — but there's no single \"longest\" in any formal sense, since new ones can always be constructed following the same rule.",
    },
  ],
};
