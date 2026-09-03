import type { ToolContent } from "./types";

export const hmacGeneratorContent: ToolContent = {
  heroSubtitle: "Generate HMAC-SHA1, SHA256, SHA384 & SHA512 Signatures",
  overview: [
    "HMAC (Hash-based Message Authentication Code) combines a secret key with a hash function to prove both that a message hasn't been altered and that it came from someone who knows the shared secret — a plain hash alone only proves integrity, not authenticity, since anyone could recompute a plain hash without knowing any secret.",
    "This tool computes HMAC signatures using your browser's native Web Crypto API across SHA-1, SHA-256, SHA-384, and SHA-512, verified against the standard RFC 4231 test vectors for correctness. Enter a secret key and a message, and the signature updates automatically.",
    "HMAC is the backbone of a huge amount of real infrastructure: webhook payload verification (confirming a webhook actually came from the service that claims to have sent it), API request signing, JWT signing (the 'HS256' algorithm is literally HMAC-SHA256), and OAuth 1.0a request signing — anywhere two parties share a secret and need to verify message authenticity without exchanging the secret itself.",
    "This is useful for testing webhook signature verification during development, debugging API signing implementations by comparing computed signatures against expected values, understanding how JWT HS256 signatures are actually computed, and learning HMAC mechanics hands-on.",
  ],
  howItWorks: [
    {
      title: "Enter a secret key",
      description: "The shared secret both parties would use to sign and verify.",
    },
    {
      title: "Choose a hash algorithm",
      description: "SHA-1, SHA-256, SHA-384, or SHA-512.",
    },
    {
      title: "Enter the message",
      description: "The HMAC signature computes automatically as you type.",
    },
  ],
  examples: [
    {
      label: "Computing HMAC-SHA256 for a test message",
      input: 'Secret: "secret", Message: "message"',
      output: "8b5f48702995c1598c573db1e21866a9b825d4a794d169d7060a03605796360",
    },
  ],
  faqs: [
    {
      question: "What's the difference between a plain hash and an HMAC?",
      answer:
        "A plain hash of a message can be recomputed by anyone, since it requires no secret — it only proves the message wasn't altered from some known original. HMAC mixes in a secret key, so only someone who knows that secret can produce a matching signature, proving both integrity and that the message came from a legitimate source.",
    },
    {
      question: "Why is this the same mechanism JWTs use for HS256?",
      answer:
        "JWT's HS256 algorithm literally is HMAC-SHA256 applied to the token's header and payload, signed with a shared secret. This tool computes the exact same HMAC operation, which is why it can be used to manually verify or debug a JWT's signature by comparing the computed value against the token's signature segment.",
    },
    {
      question: "How do I use this to verify a webhook signature?",
      answer:
        "Take the exact raw request body the webhook sender signed, along with the shared secret both sides agreed on, and compute the HMAC with the same algorithm the sender used — if it matches the signature header included in the webhook request, the payload is verified as authentic and untampered.",
    },
    {
      question: "Does the length of the secret key matter?",
      answer:
        "Yes — a short, guessable secret undermines HMAC's security guarantee regardless of which hash algorithm is used, since an attacker could brute-force the key itself. Secrets should be long, random strings, ideally generated the same way this site's Password Generator or CSRF Token Generator produce randomness.",
    },
    {
      question: "Is this implementation verified as correct?",
      answer:
        "Yes — it uses the browser's native Web Crypto API (not a custom reimplementation) and has been checked against the standard published RFC 4231 test vectors, which are the official reference values used to validate HMAC implementations.",
    },
  ],
};
