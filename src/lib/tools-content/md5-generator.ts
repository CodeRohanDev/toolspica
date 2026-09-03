import type { ToolContent } from "./types";

export const md5GeneratorContent: ToolContent = {
  heroSubtitle: "Generate MD5 Hashes Instantly",
  overview: [
    "MD5 was once the standard general-purpose hash function, and despite being cryptographically broken for security purposes since the mid-2000s, it's still widely used for legacy checksum verification — comparing file integrity against an old published MD5 checksum, or working with older systems and file formats that were built around it.",
    "This tool computes the MD5 hash of any text you enter, implemented from scratch in JavaScript following the original RFC 1321 specification, since the Web Crypto API deliberately doesn't expose MD5 (it's excluded specifically because of its known security weaknesses). The implementation has been verified against the standard published test vectors to confirm correctness.",
    "MD5's core weakness is that different inputs can be deliberately crafted to produce the same hash (a 'collision'), which completely undermines its use for security purposes like verifying a file hasn't been tampered with by an adversary. It remains fine for detecting accidental corruption (a bad download, a disk error) where nobody is trying to engineer a collision on purpose.",
    "This is useful for verifying legacy checksums published as MD5, working with older APIs or file formats built around MD5 hashing, general compatibility testing, and any non-security context where MD5 is still the expected format.",
  ],
  howItWorks: [
    {
      title: "Type or paste your text",
      description: "The MD5 hash computes automatically as you type.",
    },
    {
      title: "Copy the result",
      description: "The 32-character hex hash is ready to copy with one click.",
    },
    {
      title: "For security-sensitive hashing, use SHA-256 instead",
      description: "MD5 should never be used for passwords or tamper-resistant verification.",
    },
  ],
  examples: [
    {
      label: "Hashing a short string",
      input: '"hello"',
      output: "5d41402abc4b2a76b9719d911017c592",
    },
  ],
  faqs: [
    {
      question: "Is MD5 safe to use for password storage?",
      answer:
        "No, absolutely not — MD5 is fast to compute, which makes brute-force password guessing against it fast too, and it has no built-in protection against precomputed lookup tables (rainbow tables). Modern password storage should use a purpose-built algorithm like bcrypt, scrypt, or Argon2, never a general-purpose hash like MD5 or even SHA-256 alone.",
    },
    {
      question: "Then why does this tool exist at all?",
      answer:
        "MD5 checksums are still published and expected by plenty of legacy software, older file distribution systems, and compatibility-focused APIs — this tool exists for those non-security use cases, like confirming a downloaded file matches an old published MD5 checksum, not for anything where security actually matters.",
    },
    {
      question: "Why doesn't the browser's built-in crypto API support MD5?",
      answer:
        "The Web Crypto API's designers deliberately excluded MD5 (and SHA-1) from `crypto.subtle.digest` specifically because both are considered broken for security use — a way of nudging developers toward safer algorithms by default. This tool implements MD5 separately from scratch specifically to cover the legitimate legacy-compatibility use case.",
    },
    {
      question: "What does an MD5 'collision' actually mean?",
      answer:
        "It means two different pieces of input data produce the identical MD5 hash. Since a hash is supposed to uniquely fingerprint its input, a practical, deliberately-creatable collision (which researchers demonstrated for MD5 years ago) means an attacker could substitute a malicious file for a legitimate one while keeping the same MD5 checksum.",
    },
    {
      question: "Is this implementation correct and trustworthy?",
      answer:
        "Yes — it follows the original RFC 1321 MD5 specification exactly and has been verified against the standard published test vectors (including the well-known test cases for empty string, \"abc\", and longer reference strings), all of which match the expected official results precisely.",
    },
  ],
};
