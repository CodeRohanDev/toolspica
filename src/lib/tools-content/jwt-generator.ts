import type { ToolContent } from "./types";

export const jwtGeneratorContent: ToolContent = {
  heroSubtitle: "Build and Sign a Real HS256 JWT, Entirely in Your Browser",
  overview: [
    "Testing an API that expects a JWT often means you need a quick, correctly signed token without spinning up a whole auth server just to generate one. This tool builds a genuine JSON Web Token: you write the payload, provide a secret, and it produces a properly base64url-encoded, HMAC-SHA256-signed token using the browser's native Web Crypto API — not a fake-looking placeholder string.",
    "The token follows the standard three-part JWT structure (header.payload.signature), with the header fixed to the common HS256/JWT combination and your payload JSON encoded exactly as you write it. Signing uses `crypto.subtle.sign` with HMAC-SHA256, the same cryptographic primitive real JWT libraries use under the hood — the output is a token that any standard JWT verifier will accept as genuinely valid, given the matching secret.",
    "Because everything runs through the Web Crypto API locally, your signing secret is never transmitted anywhere — it's used in-memory for one signing operation and never leaves your browser tab. This makes it safe to use even with a real (non-production) secret while testing.",
  ],
  howItWorks: [
    { title: "Write your payload JSON", description: "The claims you want encoded in the token." },
    { title: "Enter your HMAC secret", description: "Used to sign the token with HS256." },
    { title: "Generate and copy", description: "A genuine, signed three-part JWT." },
  ],
  examples: [
    { label: "Generating a test token", input: '{"sub":"123","name":"Jane"}, secret: "test-secret"', output: "A valid HS256-signed JWT string" },
  ],
  faqs: [
    { question: "Is this a real, valid JWT?", answer: "Yes — it's genuinely signed using HMAC-SHA256 via the Web Crypto API, following the standard JWT structure. Any standard JWT library will verify it correctly given the matching secret." },
    { question: "Does it support algorithms other than HS256?", answer: "No — this generator specifically produces HS256 (HMAC-SHA256) tokens, the most common symmetric-key JWT algorithm." },
    { question: "Is my signing secret sent to a server?", answer: "No — signing happens entirely in your browser using the Web Crypto API; the secret never leaves your device." },
    { question: "Should I use this to generate production auth tokens?", answer: "It's built for testing and development — for production systems, generate tokens server-side where secrets can be properly managed and rotated." },
    { question: "What happens if my payload isn't valid JSON?", answer: "Generation is blocked with a clear error message until the payload is valid JSON." },
  ],
};
