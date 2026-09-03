import type { ToolContent } from "./types";

export const base64DecodeContent: ToolContent = {
  overview: [
    "Base64 Decode reverses Base64 encoding, converting a Base64 string back into the original plain text it represents. You'll need this constantly alongside Base64 Encode: decoding a JWT's header and payload segments, reading the actual value hidden inside a Base64-encoded API response field, inspecting a Basic Authentication header to see what credentials it contains, or simply checking what a piece of Base64 text you found somewhere actually says.",
    "The decoding process reverses the encoding exactly: each group of four Base64 characters is mapped back into three raw bytes, and any padding (`=`) characters at the end are accounted for to get the exact original byte length. Those bytes are then decoded as UTF-8 text to reconstruct the original string, correctly handling accented characters, emoji, and non-Latin scripts that were originally encoded as multi-byte UTF-8 sequences.",
    "Not every string that looks like it could be Base64 actually is valid Base64, and this tool checks for that explicitly rather than producing garbled or silently wrong output. A string with invalid characters (anything outside A-Z, a-z, 0-9, +, /, and = padding), incorrect length, or malformed padding will trigger a clear error message telling you the input isn't valid Base64, rather than attempting a best-guess decode that produces meaningless mojibake.",
    "This tool also specifically validates that the decoded bytes form valid UTF-8 text — if you're trying to decode something that was actually binary data (like an image or a file) rather than encoded text, decoding it as UTF-8 will correctly fail rather than silently displaying corrupted, unreadable characters, since this tool is designed for decoding Base64-encoded text specifically.",
  ],
  howItWorks: [
    {
      title: "Paste the Base64 string",
      description: "Enter the Base64-encoded text you want to decode.",
    },
    {
      title: "Read the decoded text",
      description: "The original plain text appears instantly below.",
    },
    {
      title: "Copy it",
      description: "Copy the decoded result once it looks correct.",
    },
  ],
  examples: [
    {
      label: "Decoding a Base64 string",
      input: "SGVsbG8sIHdvcmxkIQ==",
      output: "Hello, world!",
    },
  ],
  faqs: [
    {
      question: "Why does it say my input isn't valid Base64?",
      answer:
        "Valid Base64 only contains the characters A-Z, a-z, 0-9, +, /, and = (only at the end, for padding). If your text contains spaces, line breaks in the wrong place, or other characters, or has an invalid length, it isn't standard Base64 and can't be decoded correctly.",
    },
    {
      question: "Can this decode Base64-encoded images or files?",
      answer:
        "This tool specifically decodes Base64 back into readable UTF-8 text. If the original data was binary (like an image), decoding it as text will fail or produce meaningless output, since binary data generally isn't valid UTF-8 text.",
    },
    {
      question: "What's the difference between Base64 and Base64 URL-safe encoding?",
      answer:
        "Standard Base64 uses `+` and `/` in its alphabet, both of which have special meaning in URLs. Base64 URL-safe encoding (used in JWTs, for example) replaces those with `-` and `_` instead. This tool decodes standard Base64 — for URL-safe Base64 (as used in JWT tokens), use the dedicated JWT Decoder tool instead.",
    },
    {
      question: "Why did decoding fail even though my string only has valid Base64 characters?",
      answer:
        "The characters might be valid Base64, but the resulting decoded bytes might not form valid UTF-8 text — this happens if the original encoded data was binary rather than text, or if characters were altered or truncated somewhere along the way.",
    },
    {
      question: "Is it safe to decode Base64 that might contain sensitive data here?",
      answer:
        "Yes — decoding happens entirely in your browser using built-in JavaScript functions. Nothing you paste is transmitted anywhere, which is important since Base64-encoded credentials or tokens are common things people need to decode.",
    },
  ],
};
