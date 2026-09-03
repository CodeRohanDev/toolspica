import type { ToolContent } from "./types";

export const numberBaseConverterContent: ToolContent = {
  overview: [
    "The number base (or radix) a value is written in determines what each digit position actually represents — decimal (base 10), the system almost everyone thinks in day to day, uses ten digits (0-9) and each position represents a power of ten. Computing relies heavily on two other bases: binary (base 2), using only 0 and 1, which directly mirrors the on/off electrical states at the hardware level, and hexadecimal (base 16), using 0-9 plus A-F, which packs four binary digits into a single hex digit, making it a compact, human-friendly way to represent binary data (which is why hex shows up constantly in color codes, memory addresses, and byte-level data inspection). Octal (base 8) is less common today but still appears in specific contexts like Unix file permission notation (`chmod 755`).",
    "This tool converts a number between all four bases simultaneously and live — type a value into any one field, and the other three update instantly to show the exact same numeric value expressed in their respective base. Each input field validates that you're only entering digits valid for that specific base (for example, the binary field only accepts 0 and 1, rejecting anything else), which prevents the confusing situation of accidentally typing an invalid digit for the base you're working in.",
    "This is genuinely useful across a range of programming and computer science contexts: converting a decimal byte value (0-255) to see its hex representation for a color code or memory address, understanding what a hexadecimal or octal literal in source code actually equals in ordinary decimal terms, or working through binary arithmetic and number system concepts while learning computer science fundamentals.",
    "The underlying conversion uses JavaScript's native number parsing and formatting (`parseInt` with a radix argument, and `toString` with a radix argument), the same reliable, standard base-conversion logic built into virtually every programming language, ensuring the results match exactly what you'd get computing the same conversion in code.",
  ],
  howItWorks: [
    {
      title: "Type a number in any field",
      description: "Enter a value in binary, octal, decimal, or hexadecimal.",
    },
    {
      title: "See all bases update live",
      description: "The other three fields instantly show the same value in their respective base.",
    },
  ],
  examples: [
    {
      label: "Converting decimal 255",
      input: "Decimal: 255",
      output: "Binary: 11111111 · Octal: 377 · Hex: FF",
    },
  ],
  faqs: [
    {
      question: "Why is 255 such a common number to see converted to hex (FF)?",
      answer:
        "255 is the maximum value a single byte (8 bits) can hold, and it happens to convert to exactly two hex digits (FF) — which is exactly why hex is used so pervasively for byte-level data like RGB color values (each channel ranges 0-255, or 00-FF in hex).",
    },
    {
      question: "Why does the binary field reject certain characters I type?",
      answer:
        "Each field validates its input against what's actually valid for that base — the binary field only accepts 0 and 1, since those are the only valid binary digits. This prevents you from accidentally entering an invalid value and getting a confusing or incorrect result.",
    },
    {
      question: "Is hexadecimal case-sensitive?",
      answer:
        "Functionally no — hex digits A-F represent the same values whether uppercase or lowercase, and this tool accepts either case as input, though it displays its own hex output in uppercase by convention, matching common usage in color codes and memory addresses.",
    },
    {
      question: "Where does octal actually get used today?",
      answer:
        "Its most common surviving use is Unix/Linux file permission notation, where a three-digit octal number (like 755) compactly represents read/write/execute permissions for owner, group, and others — each octal digit conveniently maps to exactly 3 binary permission bits.",
    },
    {
      question: "Can this convert very large numbers?",
      answer:
        "It's limited by JavaScript's standard number precision, which reliably handles integers up to 2^53 — more than enough for the overwhelming majority of everyday conversions, but extremely large numbers beyond that range may lose precision.",
    },
  ],
};
