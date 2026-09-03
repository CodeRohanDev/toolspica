import type { ToolContent } from "./types";

export const fileHashCheckerContent: ToolContent = {
  heroSubtitle: "Verify File Integrity with MD5, SHA-1, SHA-256 & SHA-512",
  overview: [
    "Downloaded files sometimes arrive corrupted — an interrupted download, a flaky connection, or in rarer cases a tampered file. Software publishers commonly publish a checksum (a hash of the correct file) alongside their downloads specifically so anyone can verify their copy matches exactly, without having to trust the download process itself.",
    "This tool computes MD5, SHA-1, SHA-256, and SHA-512 hashes for any file you select, entirely inside your browser — the file's contents never leave your device or get uploaded anywhere. If you have a published checksum to compare against, paste it in and the tool tells you immediately whether it matches any of the computed hashes.",
    "A mismatched hash is a clear, unambiguous signal: something about the file differs from what the publisher intended, whether that's corruption during download or (in the more concerning case) tampering. A matching hash is strong assurance the file is byte-for-byte identical to the original, since any change at all — even a single bit — produces a completely different hash.",
    "This is useful for verifying software downloads against a publisher's published checksum, confirming a large file transferred without corruption, checking that a backup or archive matches its original, and any situation where you need certainty that a file is exactly what it claims to be.",
  ],
  howItWorks: [
    {
      title: "Choose a file",
      description: "Selected and hashed entirely in your browser — never uploaded.",
    },
    {
      title: "View all four hashes",
      description: "MD5, SHA-1, SHA-256, and SHA-512 are computed automatically.",
    },
    {
      title: "Compare against a published checksum",
      description: "Paste the expected hash to get an instant match or mismatch result.",
    },
  ],
  examples: [
    {
      label: "Verifying a downloaded file",
      input: "A downloaded installer file",
      output: "Computed SHA-256 matches the publisher's published checksum",
    },
  ],
  faqs: [
    {
      question: "Is my file uploaded anywhere to compute the hash?",
      answer:
        "No — the file is read and hashed entirely inside your browser using the File API and Web Crypto API. It never leaves your device, which matters if you're verifying a sensitive or private file.",
    },
    {
      question: "Which hash algorithm should I compare against?",
      answer:
        "Use whichever algorithm the publisher provided — most modern software distributions publish SHA-256, though older files or legacy systems sometimes only provide MD5 or SHA-1. This tool computes all four at once so you don't need to know in advance which one you'll need.",
    },
    {
      question: "What does it mean if the hash doesn't match?",
      answer:
        "It means the file you have is not byte-for-byte identical to the one the checksum was generated from — this could be an incomplete or corrupted download, a different version than expected, or in rare but serious cases, a tampered file. Re-downloading from the original source is the safest next step.",
    },
    {
      question: "Can two different files ever produce the same hash?",
      answer:
        "In theory, for any hash function, yes (a 'collision') — but for SHA-256 and SHA-512, finding one is computationally infeasible with current technology. MD5 and SHA-1 have known practical collision techniques, which is part of why they're considered weaker, though accidental collisions from random corruption remain astronomically unlikely regardless of algorithm.",
    },
    {
      question: "Why compute four different hashes instead of just one?",
      answer:
        "Different publishers and eras of software standardized on different algorithms, so computing all four at once means you're covered regardless of which one appears in the checksum you're trying to verify against, without needing to re-select the file and recompute.",
    },
  ],
};
