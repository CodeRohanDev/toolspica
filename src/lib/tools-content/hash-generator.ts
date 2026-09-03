import type { ToolContent } from "./types";

export const hashGeneratorContent: ToolContent = {
  overview: [
    "A hash function takes any input — a word, a password, an entire file's contents — and produces a fixed-length string of characters (the hash, or digest) that acts as a kind of fingerprint for that exact input. Change even a single character of the input, and the resulting hash changes completely and unpredictably, which is exactly the property that makes hashes useful for verifying data integrity: if two files produce the same hash, they're virtually certain to be byte-for-byte identical.",
    "This tool computes five hashes simultaneously from the same input text — MD5, SHA-1, SHA-256, SHA-384, and SHA-512 — using the Web Crypto API's built-in, browser-native implementations for the SHA family (a real cryptographic library, not a JavaScript reimplementation), plus a compact pure-JavaScript MD5 implementation, since MD5 isn't included in the standard Web Crypto API. Each algorithm produces a different length of output: MD5 produces 128 bits (32 hex characters), SHA-1 produces 160 bits (40 hex characters), and the SHA-2 family produces 256, 384, or 512 bits respectively.",
    "It's essential to understand the security status of each algorithm before choosing one. MD5 and SHA-1 are both cryptographically broken — practical collision attacks exist for both, meaning an attacker can deliberately construct two different inputs that produce the same hash. Neither should ever be used for passwords, digital signatures, or any security-sensitive purpose. They're included here purely because many legacy systems, file checksums, and older APIs still expect them for non-security purposes like basic file integrity checks or checksums for de-duplication. SHA-256 and above remain cryptographically strong and are the standard choice for genuine security use cases (though even they should never be used alone for password storage — proper password hashing requires a dedicated algorithm like bcrypt or Argon2 with salting, which this general-purpose tool doesn't provide).",
    "Common legitimate uses include verifying a downloaded file matches its published checksum, generating a consistent, deterministic identifier from a piece of text for caching or deduplication purposes, or understanding how hash functions behave for educational purposes.",
  ],
  howItWorks: [
    {
      title: "Enter your text",
      description: "Type or paste the text you want to hash.",
    },
    {
      title: "View all five hashes",
      description: "MD5, SHA-1, SHA-256, SHA-384, and SHA-512 are computed simultaneously.",
    },
    {
      title: "Copy whichever you need",
      description: "Each hash has its own copy button for quick use.",
    },
  ],
  examples: [
    {
      label: "Hashing the word \"hello\"",
      input: "hello",
      output: "SHA-256: 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
    },
  ],
  faqs: [
    {
      question: "Which hash should I use?",
      answer:
        "For any security-relevant purpose, use SHA-256 or higher — it's the current standard for integrity checks, digital signatures, and general cryptographic use. Only use MD5 or SHA-1 when a specific legacy system or checksum format requires them; never rely on them for anything security-sensitive.",
    },
    {
      question: "Can I use these hashes to securely store passwords?",
      answer:
        "No — general-purpose hash functions like these (even SHA-256) are deliberately fast, which makes them unsuitable for password storage since an attacker can try billions of guesses per second against a stolen hash. Proper password storage requires a dedicated, deliberately slow algorithm like bcrypt, scrypt, or Argon2, combined with a unique salt per password.",
    },
    {
      question: "Why are MD5 and SHA-1 still included if they're broken?",
      answer:
        "They're included for legacy compatibility and non-security uses — some older file formats, legacy APIs, and checksum systems still expect MD5 or SHA-1 specifically. Their security weakness (collision attacks) only matters when an adversary is deliberately trying to forge a match; for basic accidental-corruption checks, they still function.",
    },
    {
      question: "Will hashing the same text always produce the same hash?",
      answer:
        "Yes — every hash function is deterministic, meaning identical input always produces identical output, on any device, at any time. This is precisely what makes hashes useful for verifying that two pieces of data are identical without comparing them byte by byte.",
    },
    {
      question: "Can someone reverse a hash back into my original text?",
      answer:
        "Not directly — hash functions are one-way by design, so there's no mathematical operation that reverses a hash back to its input. However, for short or predictable inputs (like common passwords), an attacker can precompute hashes of likely guesses and compare them, which is a real weakness for hashing short, guessable text — hashes provide integrity checking, not secrecy for the original input.",
    },
  ],
};
