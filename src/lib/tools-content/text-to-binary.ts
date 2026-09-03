import type { ToolContent } from "./types";

export const textToBinaryContent: ToolContent = {
  overview: [
    "Computers don't store letters directly — every character you type is internally represented as a number, and that number is what actually gets stored and processed, ultimately as a sequence of binary digits (0s and 1s) at the hardware level. This tool makes that normally invisible step visible: it takes any text you type and shows exactly what its binary representation looks like, one 8-bit byte per character.",
    "Each character is first converted to its underlying numeric code point (using UTF-8 encoding, the dominant standard across the modern web and most software), and that number is then written out in base-2 (binary) notation, padded to a full 8 digits per byte. The capital letter \"A\", for instance, has the numeric value 65, which in binary is 1000001 — padded to 8 digits, that's 01000001. Standard English letters, numbers, and common punctuation each take up exactly one byte (8 bits) in UTF-8, while characters outside that basic set — accented letters, non-Latin scripts, emoji — take up two, three, or even four bytes each, and this tool correctly shows all of those bytes in sequence.",
    "This is a genuinely useful way to understand how text encoding works under the hood, especially for anyone learning computer science fundamentals, working with low-level data formats, or just curious what their name or a favorite phrase looks like when reduced to its most basic digital form. It also produces output that pairs directly with the Binary to Text tool — encode a message here, then decode it there (or hand it to someone else to decode) as a simple, transparent \"cipher\" for puzzles or educational demonstrations.",
    "Every byte in the output is separated by a space, making the boundaries between characters clear and the result easy to read, copy, or paste into another tool without needing to manually count out groups of 8 digits yourself.",
  ],
  howItWorks: [
    {
      title: "Type or paste your text",
      description: "Enter any text — letters, numbers, punctuation, even emoji.",
    },
    {
      title: "Each character is encoded",
      description:
        "Every character is converted to its UTF-8 byte value, then written in 8-bit binary.",
    },
    {
      title: "Copy the binary output",
      description: "Bytes are space-separated and ready to copy or decode elsewhere.",
    },
  ],
  examples: [
    {
      label: "Encoding \"Hi\"",
      input: "Hi",
      output: "01001000 01101001",
    },
  ],
  faqs: [
    {
      question: "Why is each byte padded to exactly 8 digits?",
      answer:
        "A byte is, by definition, 8 bits. The letter \"A\" (value 65) in raw binary is just 1000001 — 7 digits — but padding it to 01000001 makes every byte a consistent, unambiguous 8-digit length, which is essential for correctly splitting the output back into individual characters when decoding.",
    },
    {
      question: "Why does an emoji produce more than one group of 8 digits?",
      answer:
        "Most emoji fall outside the basic 128-character ASCII range and require multiple bytes to represent in UTF-8 — commonly 4 bytes for a single emoji — so you'll see 4 separate 8-digit binary groups for what looks like one character on screen.",
    },
    {
      question: "Is this the same binary a computer actually stores in memory?",
      answer:
        "Conceptually yes — this shows the same UTF-8 byte values a computer would use to store or transmit that text. The tool displays them as readable 0s and 1s rather than raw hardware voltage states, but the underlying numeric representation is accurate.",
    },
    {
      question: "Can I convert the binary back to text?",
      answer:
        "Yes — paste the space-separated binary output into the Binary to Text tool to decode it back into the original characters.",
    },
    {
      question: "Does spacing or line breaks in my input text get encoded too?",
      answer:
        "Yes — a space character has its own binary representation (00100000) just like any other character, and is encoded and included in the output the same way as letters and punctuation.",
    },
  ],
};
