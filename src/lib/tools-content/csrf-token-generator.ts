import type { ToolContent } from "./types";

export const csrfTokenGeneratorContent: ToolContent = {
  heroSubtitle: "Generate Random CSRF Tokens for Testing",
  overview: [
    "Cross-Site Request Forgery (CSRF) is an attack where a malicious site tricks a logged-in user's browser into submitting a request to a different site without their knowledge. The standard defense is a CSRF token — a random, unpredictable value embedded in forms and verified server-side, which an attacker's site has no way to guess or include.",
    "This tool generates cryptographically random tokens suitable for use as CSRF tokens, session identifiers, or any other context needing an unpredictable random value — using your browser's secure random generator (`crypto.getRandomValues`), not a weaker pseudo-random source. Choose the byte length and output format (hex or URL-safe Base64) to match whatever your framework or system expects.",
    "A CSRF token's security depends entirely on being genuinely unpredictable and tied to a specific user session — a real production system generates a fresh token server-side per session (or per form) and validates it on submission. This tool is for generating sample tokens during development and testing, not for actually protecting a live application, which needs the token properly wired into your framework's session and validation logic.",
    "This is useful for testing how a form or API handles a CSRF token field, generating realistic sample tokens for development and debugging, understanding token length and format requirements, and general security testing and education around request forgery protection.",
  ],
  howItWorks: [
    {
      title: "Set the token length in bytes",
      description: "16-128 bytes; longer tokens are harder to guess.",
    },
    {
      title: "Choose a format",
      description: "Hex (readable, twice the character length) or Base64URL (more compact).",
    },
    {
      title: "Generate and copy",
      description: "A fresh, cryptographically random token appears instantly.",
    },
  ],
  examples: [
    {
      label: "Generating a 32-byte hex token",
      input: "Length: 32 bytes, Format: hex",
      output: "a3f5c891b2d4e6f7...(64 hex characters total)",
    },
  ],
  faqs: [
    {
      question: "Can I use a token from this tool to actually secure my website?",
      answer:
        "Not directly — real CSRF protection requires the token to be generated server-side, tied to the user's session, embedded in the form, and validated on submission by your backend framework. This tool generates a sample token to help you understand the format and test your handling logic, not a drop-in production security measure.",
    },
    {
      question: "Why does token length matter?",
      answer:
        "A longer random token has more possible values, making it harder for an attacker to guess through brute force. Most frameworks default to at least 16-32 bytes (128-256 bits) of randomness, which is far beyond what's practically guessable.",
    },
    {
      question: "What's the difference between hex and Base64URL format?",
      answer:
        "Hex represents each byte as two characters (0-9, a-f), producing a longer but very simple, universally readable string. Base64URL packs more information per character, producing a shorter token, and is safe to use directly in URLs without additional encoding — many frameworks default to one or the other.",
    },
    {
      question: "Is this the same as a session ID or an API key?",
      answer:
        "They're built the same way (random, unpredictable strings) but serve different purposes — a CSRF token protects against forged cross-site requests specifically, while a session ID identifies a logged-in session and an API key authenticates an API client. The generation technique overlaps; the use case doesn't.",
    },
    {
      question: "Why use crypto.getRandomValues() instead of Math.random()?",
      answer:
        "Math.random() isn't designed to resist prediction and shouldn't be used for anything security-related. crypto.getRandomValues() is the Web Crypto API's cryptographically secure random source, which is the correct choice whenever unpredictability actually matters, as it does for a CSRF token.",
    },
  ],
};
