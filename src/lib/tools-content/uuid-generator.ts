import type { ToolContent } from "./types";

export const uuidGeneratorContent: ToolContent = {
  overview: [
    "A UUID (Universally Unique Identifier) is a 128-bit value, conventionally written as 32 hexadecimal digits grouped into five sections separated by hyphens (like `f47ac10b-58cc-4372-a567-0e02b2c3d479`), designed to be unique across systems, databases, and time without needing a central authority to hand out IDs. That property makes UUIDs the default choice for primary keys in distributed databases, unique identifiers for API resources, session tokens, and file names that need to be collision-free without coordinating with any other system.",
    "This tool generates version 4 UUIDs, the most common variant, which are generated using cryptographically strong random numbers rather than being derived from a timestamp or hardware identifier (as older UUID versions were). Specifically, it uses `crypto.randomUUID()`, a built-in browser API backed by the same cryptographically secure random number generator used for security-sensitive operations — not `Math.random()`, which is not suitable for generating identifiers that need genuine unpredictability and uniqueness guarantees.",
    "The odds of a collision are worth understanding concretely: a version 4 UUID has 122 random bits (6 bits are fixed to identify the version and variant), giving roughly 5.3 x 10^36 possible values. To have even a 50% chance of generating two identical UUIDs, you'd need to generate around 2.71 quintillion of them — a number so large that UUID collisions are treated as effectively impossible in practice for any realistic application.",
    "You can generate up to 100 UUIDs at once, useful for seeding test data, pre-generating a batch of IDs for a bulk import, or quickly grabbing several unique identifiers for a script or configuration file without calling a generation function repeatedly in code.",
  ],
  howItWorks: [
    {
      title: "Choose how many you need",
      description: "Enter a count from 1 to 100.",
    },
    {
      title: "Click Generate",
      description: "Cryptographically random UUID v4 values are generated instantly.",
    },
    {
      title: "Copy them",
      description: "Copy all generated UUIDs, one per line, ready to paste anywhere.",
    },
  ],
  examples: [
    {
      label: "A generated UUID v4",
      input: "Click Generate",
      output: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    },
  ],
  faqs: [
    {
      question: "What does the '4' in the UUID mean?",
      answer:
        "It indicates the UUID version — the character in that fixed position of every version 4 UUID is always '4', identifying it as a randomly-generated UUID (as opposed to version 1, which is timestamp-based, or other less common versions).",
    },
    {
      question: "Can two generated UUIDs ever be the same?",
      answer:
        "Mathematically possible but practically negligible — with 122 bits of randomness, the chance of any collision across realistic usage volumes is astronomically small, which is why UUIDs are trusted as unique identifiers across huge distributed systems without central coordination.",
    },
    {
      question: "Is this using a secure random number generator?",
      answer:
        "Yes — it uses the browser's built-in `crypto.randomUUID()`, backed by a cryptographically secure random number source, not `Math.random()` (which is not cryptographically secure and shouldn't be used to generate identifiers that need genuine unpredictability).",
    },
    {
      question: "Can I use a UUID as a database primary key?",
      answer:
        "Yes, this is one of the most common uses — UUIDs work well as primary keys in distributed systems since they can be generated independently on different machines without any risk of collision, unlike auto-incrementing integers which require central coordination.",
    },
    {
      question: "Are UUIDs case-sensitive?",
      answer:
        "By convention, UUIDs are usually written in lowercase, and this tool generates them that way, but most systems treat UUID comparison as case-insensitive, so `A567` and `a567` in the same position are generally considered equivalent.",
    },
  ],
};
