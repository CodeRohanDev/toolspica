import type { ToolContent } from "./types";

export const rot13EncoderContent: ToolContent = {
  overview: [
    "ROT13 (\"rotate by 13\") is one of the oldest and simplest text ciphers still in everyday use, and it earns its lasting popularity from one elegant property: applying it twice returns the original text exactly. It works by shifting every letter 13 places through the alphabet — A becomes N, B becomes O, and so on, wrapping back around to the start after Z — while leaving numbers, punctuation, and spacing completely untouched. Because the English alphabet has 26 letters and 13 is exactly half of that, shifting by 13 twice brings every letter back to where it started, which is why encoding and decoding are literally the same operation.",
    "ROT13 has never been intended as real security — anyone who knows it's ROT13 can decode it instantly, and even someone who doesn't recognize it can usually crack it in seconds with basic frequency analysis, since it doesn't change the shape or length of words at all. Its actual purpose has always been to hide text from casual, accidental viewing rather than from any real attacker: the classic use case, dating back to early Usenet newsgroups in the 1980s, is obscuring spoilers, punchlines, or puzzle solutions so a reader has to make a deliberate choice to decode and reveal them, rather than seeing them accidentally while scrolling past.",
    "That exact use case is still alive today — programming forums and puzzle communities use ROT13 to hide solutions and hints, some developer tools use it to lightly obfuscate example data in documentation, and it occasionally shows up as a deliberately trivial \"cipher\" in beginner cryptography exercises specifically because it's simple enough to implement by hand as a learning exercise. It's also a genuinely useful sanity check when learning how substitution ciphers work in general, since the fixed 13-position shift makes the underlying logic easy to trace letter by letter.",
    "This tool applies ROT13 instantly to whatever you type or paste, leaving digits, punctuation, and whitespace exactly as they are, and only shifting the 26 letters of the Latin alphabet (both uppercase and lowercase are handled correctly, each shifted within its own case).",
  ],
  howItWorks: [
    {
      title: "Enter your text",
      description: "Type or paste plain text, or already-ROT13-encoded text — it works identically either way.",
    },
    {
      title: "Read the result",
      description: "The ROT13 transformation is applied instantly and shown below.",
    },
    {
      title: "Apply it again to reverse it",
      description:
        "Paste the output back into the input (or use the Swap button) to get your original text back.",
    },
  ],
  examples: [
    {
      label: "Encoding a phrase",
      input: "Hello World",
      output: "Uryyb Jbeyq",
    },
    {
      label: "Decoding is the same operation",
      input: "Uryyb Jbeyq",
      output: "Hello World",
    },
  ],
  faqs: [
    {
      question: "Is ROT13 secure enough to protect sensitive information?",
      answer:
        "No — ROT13 provides no real security at all. It's trivially reversible by anyone, with or without a computer, and is only meant to prevent accidental reading, not to protect anything genuinely sensitive. For real encryption, use a proper cryptographic tool.",
    },
    {
      question: "Why do numbers and punctuation stay the same?",
      answer:
        "ROT13 is defined as a shift specifically within the 26-letter alphabet, so by convention it only affects letters. Digits and punctuation aren't part of that 26-character rotation and are left untouched.",
    },
    {
      question: "Why does encoding and decoding use the exact same process?",
      answer:
        "Because 13 is exactly half of 26 (the alphabet's length), shifting forward by 13 twice adds up to a full 26-letter rotation, which lands every letter back on itself — mathematically, ROT13 is its own inverse.",
    },
    {
      question: "Does ROT13 work on non-English alphabets?",
      answer:
        "No — this implementation only shifts the standard A-Z Latin letters. Accented letters, non-Latin scripts (Cyrillic, Greek, Chinese, etc.), and symbols are passed through completely unchanged, since ROT13 is specifically defined for the 26-letter English alphabet.",
    },
    {
      question: "What's the difference between ROT13 and a general Caesar cipher?",
      answer:
        "ROT13 is a Caesar cipher with the shift amount fixed at exactly 13. A general Caesar cipher can use any shift from 1 to 25, and unlike ROT13, most shift amounts require a different, separate step to decode (subtracting the shift rather than reapplying it).",
    },
  ],
};
