import type { ToolContent } from "./types";

export const asciiTableContent: ToolContent = {
  overview: [
    "ASCII (American Standard Code for Information Interchange) is the foundational character encoding that assigns a specific number, from 0 to 127, to every basic English letter, digit, punctuation mark, and a handful of special control characters. Established in the 1960s, it predates Unicode by decades and remains the common foundation nearly every modern text encoding (including UTF-8) is built to be backward-compatible with — the first 128 characters of UTF-8 are identical to ASCII, which is exactly why plain English text looks the same whether it's interpreted as ASCII or as UTF-8.",
    "This reference table lists all 128 standard ASCII characters alongside their decimal and hexadecimal values, which is useful for a range of genuinely practical tasks: looking up the exact numeric code for a character needed in a low-level programming context, understanding what an unfamiliar control character code means when it shows up in a byte-level file inspection, converting between decimal and hexadecimal representations of a character for a specific protocol or file format, or just satisfying curiosity about a system that shows raw character codes.",
    "The first 32 codes (0-31), plus code 127, are control characters rather than printable symbols — historically used for controlling teletype and early computer terminal hardware (like carriage return, line feed, tab, and escape) rather than representing visible text. Codes 32 through 126 are the printable characters most people think of as \"ASCII\": the space character, digits 0-9, uppercase and lowercase letters, and standard punctuation.",
    "Use the search box to quickly find a specific character, decimal value, or hex value rather than scrolling through the full table — searching \"65\" finds the letter A, searching \"a\" finds both uppercase and lowercase entries containing that letter, and searching a hex value like \"41\" finds the same entry by its hexadecimal code.",
  ],
  howItWorks: [
    {
      title: "Search or scroll",
      description: "Look up a character, decimal code, or hex code directly, or scroll the full table.",
    },
    {
      title: "Read the values",
      description: "Each entry shows the character alongside its decimal and hexadecimal code.",
    },
  ],
  examples: [
    {
      label: "Looking up the letter A",
      input: "A",
      output: "A · 65 · 0x41",
    },
  ],
  faqs: [
    {
      question: "Why does ASCII only go up to 127 instead of 255?",
      answer:
        "Standard ASCII was originally designed as a 7-bit encoding (2^7 = 128 possible values), reflecting the hardware constraints and character needs of the era it was created in. Extended ASCII variants using the full 8 bits (up to 255) were developed later and vary by region and system, which is part of why Unicode was eventually created to standardize character encoding globally.",
    },
    {
      question: "What are control characters actually used for today?",
      answer:
        "A few remain genuinely important in modern computing — tab (9), line feed (10), and carriage return (13) are still fundamental to how text files represent whitespace and line breaks. Most of the others (originally for controlling physical teletype hardware) are rarely used directly today but remain reserved in the standard for backward compatibility.",
    },
    {
      question: "Is ASCII the same as UTF-8?",
      answer:
        "ASCII is a strict subset of UTF-8 — every valid ASCII character has the exact same numeric value and single-byte representation in UTF-8, which is precisely why UTF-8 was designed the way it was (for seamless backward compatibility). UTF-8 extends far beyond ASCII's 128 characters to represent virtually every character in every written language using additional bytes.",
    },
    {
      question: "Why does the space character show as 'SPACE' instead of a blank cell?",
      answer:
        "A literal blank space in the table would be easy to overlook or mistake for an empty/missing entry, so it's labeled explicitly to make clear that code 32 does represent a real, meaningful character (the space) rather than nothing at all.",
    },
    {
      question: "Can I use this table to convert a whole word into ASCII codes?",
      answer:
        "This reference table shows individual characters one at a time rather than converting a full string — for converting entire words or sentences into their character codes at once, the Text to Binary or Unicode Converter tools are better suited to bulk conversion.",
    },
  ],
};
