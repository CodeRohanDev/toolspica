import type { ToolContent } from "./types";

export const binaryToTextContent: ToolContent = {
  overview: [
    "Every piece of text a computer stores or transmits is, underneath, a sequence of numbers — and binary is simply how those numbers are written using only two digits, 0 and 1, matching the two-state (on/off) nature of digital electronics. Text characters are conventionally represented in groups of 8 binary digits called a byte, where each byte encodes one character's numeric code point — for example, the capital letter \"H\" has the numeric value 72, which is written as 01001000 in 8-bit binary.",
    "This tool reverses that process: it takes binary digits, grouped into 8-bit bytes and separated by spaces (or line breaks), and decodes each byte back into the character it represents, reassembling your original text. It correctly handles standard ASCII text (the first 128 character codes, covering the basic English letters, digits, and common punctuation) as well as multi-byte UTF-8 sequences, which is how modern computers represent characters beyond that basic set — accented letters, non-Latin scripts, and emoji, all of which take up more than one byte per character in UTF-8.",
    "Decoding binary by hand is exactly the kind of mechanical, error-prone task that benefits from a tool rather than manual counting: getting a single bit wrong shifts the entire byte's value, and a byte that isn't exactly a multiple of 8 bits, or that contains anything other than 0s and 1s, isn't valid at all. This tool checks for both problems explicitly and tells you clearly what's wrong — an invalid character in your input, or a group whose length isn't a clean multiple of 8 — rather than silently producing garbled output or failing without explanation.",
    "Common uses include verifying homework or coursework in an intro computer science class, decoding binary shared as a puzzle or riddle, checking the output of a Text to Binary converter (this tool's natural counterpart), or simply satisfying curiosity about what a particular binary string actually spells out.",
  ],
  howItWorks: [
    {
      title: "Paste your binary",
      description:
        "Enter binary digits grouped into 8-bit bytes, separated by spaces — for example, 01001000 01101001.",
    },
    {
      title: "The tool validates and decodes",
      description:
        "Each 8-bit group is checked and converted back into its corresponding character.",
    },
    {
      title: "Read or copy the result",
      description: "The decoded text appears instantly, or a clear error message if something's invalid.",
    },
  ],
  examples: [
    {
      label: "Decoding \"Hi\"",
      input: "01001000 01101001",
      output: "Hi",
    },
  ],
  faqs: [
    {
      question: "Why does it say my binary isn't a multiple of 8 bits?",
      answer:
        "Standard text encoding represents each character using exactly 8 binary digits (one byte). If a group of digits you entered has, say, 7 or 9 bits instead of 8, it can't be cleanly mapped to a single character, so the tool flags it rather than guessing at what you meant.",
    },
    {
      question: "Can this decode binary with no spaces between bytes?",
      answer:
        "No — spaces (or line breaks) between each 8-bit byte are required so the tool knows exactly where one character's binary ends and the next begins. A continuous, unspaced run of digits is ambiguous to split correctly without that separator.",
    },
    {
      question: "Does this handle emoji or accented characters?",
      answer:
        "Yes — those characters are represented in UTF-8 using multiple bytes (typically 2 to 4 bytes per character rather than 1), and this tool correctly reassembles those multi-byte sequences back into the original character, as long as all the bytes for that character are present and valid.",
    },
    {
      question: "What happens if I paste in something that isn't valid binary at all?",
      answer:
        "The tool checks that every character in each group is a 0 or a 1, and immediately reports which group is invalid if it finds anything else — it won't attempt a partial or best-guess decode of malformed input.",
    },
    {
      question: "Is this the same as ASCII binary?",
      answer:
        "For standard English text and common punctuation, yes — those characters have the same numeric values in both ASCII and UTF-8, so the binary looks identical. The difference only shows up with characters outside the basic ASCII range, which UTF-8 handles using multiple bytes.",
    },
  ],
};
