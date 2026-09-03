import type { ToolContent } from "./types";

export const base32EncodeDecodeContent: ToolContent = {
  overview: [
    "Base32 is an encoding scheme closely related to Base64, but built from a smaller alphabet of just 32 characters (A-Z and the digits 2-7) rather than 64. That smaller, carefully chosen alphabet deliberately avoids characters that are easily confused with each other visually (like 0/O or 1/I/l) and is entirely case-insensitive, which makes Base32-encoded strings noticeably more reliable when they need to be read aloud, typed by hand, or displayed in contexts where case might not be preserved.",
    "Base32's most common real-world application by far is two-factor authentication: the secret key used to generate time-based one-time codes (TOTP) — the six-digit codes from apps like Google Authenticator or Authy — is virtually always shared and stored as a Base32-encoded string, specifically because of its readability advantages when a user needs to manually type a setup key instead of scanning a QR code.",
    "This tool encodes plain text into Base32 and decodes Base32 back into text. Encoding works similarly to Base64: your text is first converted to raw bytes, then those bytes are regrouped and mapped through the 32-character alphabet, with `=` padding added at the end to bring the output to a length that's a clean multiple of 8 characters, matching the standard defined in RFC 4648. Decoding reverses this process exactly, validating that every character in your input actually belongs to the Base32 alphabet before attempting to reconstruct the original bytes.",
    "Beyond two-factor authentication, Base32 also shows up in some URL-shortening schemes and in a few network and file-naming contexts where case-insensitivity or avoiding visually ambiguous characters is specifically valuable — anywhere a human might need to read, transcribe, or communicate an encoded value verbally or by hand, Base32's design advantages over Base64 become genuinely useful rather than just a formatting curiosity.",
  ],
  howItWorks: [
    {
      title: "Choose encode or decode",
      description: "Pick the direction you need.",
    },
    {
      title: "Enter your text or Base32 string",
      description: "Type plain text to encode, or a Base32 string to decode.",
    },
    {
      title: "Copy the result",
      description: "The converted value appears instantly, or a clear error if the input is invalid.",
    },
  ],
  examples: [
    {
      label: "Encoding text",
      input: "Hello, world!",
      output: "JBSWY3DPFQQFO33SNRSCC===",
    },
  ],
  faqs: [
    {
      question: "Why does Base32 output look so much longer than Base64 for the same text?",
      answer:
        "Base32 packs less information per character (5 bits per character versus Base64's 6 bits), so encoding the same data produces roughly 60% more characters than Base64 would. That trade-off is intentional — it buys the smaller, less error-prone, case-insensitive alphabet.",
    },
    {
      question: "Is Base32 case-sensitive?",
      answer:
        "No — unlike Base64, Base32's alphabet is designed to be used consistently in a single case (this tool decodes case-insensitively, automatically uppercasing input before decoding), which is exactly why it's preferred for values a person might need to type manually.",
    },
    {
      question: "Why do 2FA setup keys use Base32 instead of Base64?",
      answer:
        "When a user has to manually type a secret key (instead of scanning a QR code), Base32's avoidance of visually similar characters like 0/O and 1/I/l, combined with its case-insensitivity, significantly reduces the chance of a transcription error compared to Base64's larger, case-sensitive, and more visually ambiguous character set.",
    },
    {
      question: "What do the equals signs at the end of Base32 output mean?",
      answer:
        "Like in Base64, they're padding characters added to bring the encoded output to a length that's a clean multiple of 8 characters, as required by the Base32 standard (RFC 4648) — the exact amount of padding depends on the original input's length.",
    },
    {
      question: "Is Base32 more secure than Base64?",
      answer:
        "No — like Base64, Base32 is purely an encoding, not encryption, and provides zero confidentiality. Both are equally and instantly reversible by anyone; the difference between them is purely about character set design, not security.",
    },
  ],
};
