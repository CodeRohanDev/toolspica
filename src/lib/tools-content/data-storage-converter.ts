import type { ToolContent } from "./types";

export const dataStorageConverterContent: ToolContent = {
  heroSubtitle: "Convert Between Bits, Bytes, MB, GB, TB & More",
  overview: [
    "Digital storage units follow a binary (base-1024) progression in most everyday operating system and consumer usage — each unit is 1,024 times the previous one, not a clean 1,000, because computer memory and storage are fundamentally organized in powers of 2 rather than powers of 10. This tool converts between seven units following that traditional binary convention.",
    "This matters practically: a file manager reporting \"1 GB\" using the binary convention (1,024³ bytes = 1,073,741,824 bytes) is a genuinely different, larger number than a storage manufacturer's \"1 GB\" using a strict decimal convention (1,000,000,000 bytes) — a well-known source of the \"missing storage space\" confusion when a new drive shows less capacity than the box advertised.",
    "The unit range spans from individual bits (the smallest unit, either a 0 or 1) up through petabytes (1,024 terabytes) — covering everything from a single data value up to enterprise-scale storage capacity, with the always-useful bit-to-byte relationship (8 bits per byte) at the foundation.",
    "This is useful for understanding file sizes, comparing storage device capacities, estimating download times or bandwidth usage, or making sense of the difference between what an operating system reports and what a manufacturer advertises for the same physical storage device.",
  ],
  howItWorks: [
    {
      title: "Enter a data value and select its unit",
      description: "From bits up through petabytes.",
    },
    {
      title: "Select the target unit",
      description: "Or use the swap button to reverse direction.",
    },
    {
      title: "View the exact converted result",
      description: "Plus the value in every other supported unit at once.",
    },
  ],
  examples: [
    {
      label: "Gigabytes to megabytes",
      input: "1 gigabyte",
      output: "1,024 megabytes",
    },
    {
      label: "Terabytes to gigabytes",
      input: "2 terabytes",
      output: "2,048 gigabytes",
    },
  ],
  faqs: [
    {
      question: "Why does 1 GB equal 1,024 MB here instead of 1,000 MB?",
      answer:
        "This tool uses the traditional binary convention (each unit is 1,024 times the previous), which matches how most operating systems (Windows, macOS file managers) have historically reported file and storage sizes, since computer memory is organized in powers of 2. Storage device manufacturers, by contrast, typically advertise capacity using a strict decimal (1,000-based) convention, which is why a new drive often shows less capacity in your OS than the box states.",
    },
    {
      question: "Why is there a difference between advertised and displayed storage capacity?",
      answer:
        "A drive advertised as \"1 TB\" using the decimal convention (1,000,000,000,000 bytes) shows as roughly 931 GB when an operating system reports it using the binary convention (dividing by 1,024 at each step) — the physical storage is identical, but the two different counting conventions produce different displayed numbers for the same actual capacity.",
    },
    {
      question: "How many bits are in a byte?",
      answer:
        "Exactly 8 bits make up 1 byte — this relationship is fixed and universal across both binary and decimal storage conventions, since it's a fundamental definition of how bytes are constructed from individual bits, not a matter of convention like the larger unit multipliers.",
    },
    {
      question: "When would I need to convert to petabytes?",
      answer:
        "Petabyte-scale storage shows up in enterprise data centers, large-scale cloud storage systems, and big data contexts — well beyond typical personal computer or phone storage, but a real unit worth having available for that scale of conversion.",
    },
    {
      question: "Does internet speed use the same bit/byte convention as storage?",
      answer:
        "Internet and network speeds are conventionally measured in bits per second (Mbps, Gbps) using decimal multipliers, while file sizes are conventionally measured in bytes using binary multipliers — two different conventions layered together, which is why a \"100 Mbps\" connection downloads at roughly 12.5 MB/s, not 100 MB/s, a common point of confusion.",
    },
  ],
};
