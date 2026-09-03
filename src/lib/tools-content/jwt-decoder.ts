import type { ToolContent } from "./types";

export const jwtDecoderContent: ToolContent = {
  overview: [
    "A JSON Web Token (JWT) is a compact, URL-safe way to represent a set of claims — typically information about an authenticated user and their permissions — and it's the backbone of authentication in a huge share of modern web APIs and single sign-on systems. A JWT is made of three Base64URL-encoded segments joined by periods: a header (describing the token's type and signing algorithm), a payload (the actual claims — things like user ID, expiration time, and roles), and a signature (used to verify the token hasn't been tampered with).",
    "This tool decodes the header and payload of any JWT you paste in, converting their Base64URL-encoded segments back into readable JSON. This is genuinely useful for debugging authentication issues without needing to write code: checking what claims a token actually contains, verifying an expiration timestamp (the `exp` claim) to see whether a token has expired, confirming which signing algorithm a token declares in its header, or simply inspecting a token you received from a third-party API to understand its structure.",
    "It's critical to understand exactly what this tool does and doesn't do: decoding a JWT's header and payload requires no secret key at all, because Base64URL is an encoding, not encryption — anyone with the token text can read its contents, which is a normal, expected property of JWTs (they're not meant to be confidential without additional encryption, only tamper-evident). This tool explicitly does not, and cannot, verify the signature, since that requires the server's secret key or public key, which is intentionally never shared and never should be pasted into a third-party tool.",
    "That distinction matters for security: never assume a JWT's claims are trustworthy just because you can read them — trust in a JWT's contents comes entirely from a verified signature check performed server-side with the correct key, not from the mere ability to decode it. This tool is a debugging aid for inspecting token contents, not a substitute for proper server-side signature verification.",
  ],
  howItWorks: [
    {
      title: "Paste your JWT",
      description: "Enter the full token — three Base64URL segments separated by periods.",
    },
    {
      title: "View the decoded parts",
      description: "The header and payload are decoded into readable JSON instantly.",
    },
    {
      title: "Copy what you need",
      description: "Copy the header or payload JSON individually for further use.",
    },
  ],
  examples: [
    {
      label: "Decoding a JWT payload",
      input: "...eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0...",
      output: '{\n  "sub": "1234567890",\n  "name": "John Doe"\n}',
    },
  ],
  faqs: [
    {
      question: "Can this verify whether the JWT's signature is valid?",
      answer:
        "No — verifying a signature requires the secret or public key used to sign the token, which is intentionally kept private and should never be entered into a third-party tool. This tool only decodes the readable header and payload; it never checks or claims anything about signature validity.",
    },
    {
      question: "Is it safe to paste a real production JWT into this tool?",
      answer:
        "Decoding happens entirely in your browser and nothing is transmitted anywhere, so technically nothing leaves your device. That said, since anyone who has the token text can read its full contents (that's inherent to how JWTs work, not specific to this tool), treat tokens with the same care you'd give any credential and avoid sharing them unnecessarily.",
    },
    {
      question: "Why do I see an error saying the JWT must have 3 parts?",
      answer:
        "A valid JWT always has exactly three Base64URL segments separated by two periods (header.payload.signature). If what you pasted has more or fewer parts, it isn't a complete, valid JWT — check for missing or extra characters, or make sure you copied the entire token.",
    },
    {
      question: "What does the 'exp' claim in the payload mean?",
      answer:
        "`exp` is a standard JWT claim representing the token's expiration time as a Unix timestamp (seconds since January 1, 1970). If that timestamp is in the past, the token is expired and should be rejected by any properly-implemented server, regardless of whether its signature is otherwise valid.",
    },
    {
      question: "Why is the signature shown as a raw string instead of decoded?",
      answer:
        "The signature isn't Base64-encoded JSON like the header and payload — it's a cryptographic byte sequence produced by the signing algorithm, and decoding it as text wouldn't produce anything meaningful. It's shown as-is for reference, matching the raw segment from the token.",
    },
  ],
};
