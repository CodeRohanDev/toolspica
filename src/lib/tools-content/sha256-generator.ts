import type { ToolContent } from "./types";

export const sha256GeneratorContent: ToolContent = {
  heroSubtitle: "Generate SHA-1, SHA-256, SHA-384 & SHA-512 Hashes",
  overview: [
    "A cryptographic hash function takes any input — a password, a file, a block of text — and produces a fixed-length fingerprint of it. The same input always produces the same hash, but even a single-character change in the input produces a completely different, unpredictable hash, which is exactly what makes hashes useful for verifying data integrity.",
    "This tool computes SHA-1, SHA-256, SHA-384, and SHA-512 hashes for any text you enter, using your browser's native Web Crypto API (`crypto.subtle.digest`) — the same battle-tested cryptographic implementation browsers rely on for HTTPS and other security features, not a reimplementation.",
    "SHA-256 is the current practical standard for most integrity and security use cases (it's what Bitcoin and Git both build on), while SHA-1 is now considered cryptographically broken for security-critical purposes (collisions have been demonstrated) and is included mainly for legacy compatibility checks. SHA-384 and SHA-512 offer a larger output size for applications wanting extra margin.",
    "This is useful for verifying that a piece of text matches an expected checksum, generating a fingerprint for storing password hashes in application development, checking data integrity, computing hash-based identifiers, and general cryptography learning and testing.",
  ],
  howItWorks: [
    {
      title: "Choose an algorithm",
      description: "SHA-1, SHA-256, SHA-384, or SHA-512.",
    },
    {
      title: "Type or paste your text",
      description: "The hash computes automatically as you type.",
    },
    {
      title: "Copy the result",
      description: "The hex-encoded hash is ready to copy with one click.",
    },
  ],
  examples: [
    {
      label: "Hashing a short string with SHA-256",
      input: '"hello"',
      output: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
    },
  ],
  faqs: [
    {
      question: "Why does the same text always produce the exact same hash?",
      answer:
        "Hash functions are deterministic by design — this is exactly what makes them useful for verification. If you hash a file today and hash the same file again tomorrow, matching hashes confirm the file hasn't changed, which would be impossible if the function produced different output each time.",
    },
    {
      question: "Is SHA-1 still safe to use?",
      answer:
        "Not for security-critical purposes — SHA-1 collisions (two different inputs producing the same hash) have been publicly demonstrated, which breaks its core security guarantee. It's included here mainly for compatibility with legacy systems that still check against SHA-1 checksums, not recommended for new security work.",
    },
    {
      question: "Can a hash be reversed to recover the original text?",
      answer:
        "No — hash functions are one-way by design; there's no mathematical operation that reverses SHA-256 back to its input. The only way to 'crack' a hash is to guess inputs and check if they produce the matching hash, which is why hashing alone (without a technique like salting) isn't sufficient for password storage.",
    },
    {
      question: "Why do different algorithms produce different-length hashes?",
      answer:
        "Each algorithm is designed to output a fixed size regardless of input length — SHA-1 always outputs 160 bits (40 hex characters), SHA-256 always outputs 256 bits (64 hex characters), and so on. The algorithm name reflects this output size.",
    },
    {
      question: "Does my text get sent to a server to compute the hash?",
      answer:
        "No — hashing happens entirely in your browser using the Web Crypto API. Nothing you type is ever transmitted anywhere, which matters if you're hashing anything sensitive.",
    },
  ],
};
