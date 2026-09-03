import type { ToolContent } from "./types";

export const unicodeConverterContent: ToolContent = {
  overview: [
    "Unicode is the modern standard that assigns a unique number — called a code point, conventionally written as `U+` followed by a hexadecimal value, like `U+0041` for the letter A — to essentially every character used in every written language on Earth, plus symbols, emoji, and technical characters, unifying what used to be a fragmented mess of incompatible regional encodings into a single, universal system with room for over a million distinct characters.",
    "This tool converts in both directions. \"Text → Unicode\" takes any text you type — including emoji, accented letters, and non-Latin scripts — and shows the exact Unicode code point for every individual character, which is genuinely useful for understanding exactly what characters make up a piece of text at the code-point level, especially for characters that look similar but are actually different Unicode characters (a common source of subtle bugs, like a smart quote versus a straight quote, or visually identical characters from different scripts used in spoofing attempts).",
    "\"Unicode → Text\" reverses the process, taking a list of code points (accepting both the standard `U+XXXX` notation and the `\\uXXXX` escape sequence format used in many programming languages) and reconstructing the actual characters they represent — useful for decoding a Unicode escape sequence you've found in source code or a data file back into readable text.",
    "This tool correctly handles characters beyond the Basic Multilingual Plane (Unicode's first 65,536 code points), including most emoji, which require what's called a \"surrogate pair\" to represent in JavaScript's native string encoding (UTF-16) — using `codePointAt()` and `String.fromCodePoint()` rather than the more naive `charCodeAt()`/`fromCharCode()` ensures these characters are read and reconstructed as single, complete code points rather than being incorrectly split into two separate, meaningless values.",
  ],
  howItWorks: [
    {
      title: "Choose a direction",
      description: "Pick Text → Unicode or Unicode → Text.",
    },
    {
      title: "Enter your input",
      description: "Type text (including emoji), or a list of Unicode code points.",
    },
    {
      title: "Copy the result",
      description: "The converted output updates instantly below.",
    },
  ],
  examples: [
    {
      label: "Converting text to Unicode code points",
      input: "Hi!",
      output: "U+0048 U+0069 U+0021",
    },
  ],
  faqs: [
    {
      question: "Does this correctly handle emoji, which can look like one character but aren't?",
      answer:
        "Most single emoji are correctly read and converted as one complete code point, since this tool uses code-point-aware methods rather than naive character-code methods. Complex combined emoji (like a family emoji built from multiple people joined together) consist of several separate code points joined by a special connector character, and each of those individual code points is shown separately.",
    },
    {
      question: "What's the difference between U+0041 notation and \\u0041 notation?",
      answer:
        "They represent the exact same code point using two different conventions — `U+XXXX` is the standard Unicode notation used in documentation and this tool's output, while `\\uXXXX` is the escape sequence syntax used inside string literals in many programming languages, including JavaScript. This tool accepts either format as input when converting Unicode back to text.",
    },
    {
      question: "How many possible Unicode characters are there?",
      answer:
        "Unicode's total range spans over 1.1 million possible code points (from U+0000 to U+10FFFF), though only a fraction are currently assigned to actual characters — new characters (including new emoji) are added in periodic Unicode standard updates.",
    },
    {
      question: "Is a Unicode code point the same as a UTF-8 byte?",
      answer:
        "No — a code point is an abstract number identifying a character, while UTF-8 is one specific way of encoding that number into actual bytes for storage or transmission. A single code point can take anywhere from 1 to 4 bytes when encoded in UTF-8, depending on its value.",
    },
    {
      question: "Why would I need to convert text to Unicode code points?",
      answer:
        "Common reasons include debugging text that displays incorrectly (to see the exact underlying characters rather than trusting how they render visually), understanding which specific character is causing an encoding issue, or working with systems and protocols that require characters to be specified by code point rather than as literal text.",
    },
  ],
};
