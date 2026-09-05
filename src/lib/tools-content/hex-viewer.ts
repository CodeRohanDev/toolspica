import type { ToolContent } from "./types";

export const hexViewerContent: ToolContent = {
  heroSubtitle: "Inspect Any File's Raw Bytes as a Hex Dump",
  overview: [
    "Every file is ultimately just bytes — but figuring out what kind of file something actually is (when the extension is missing or wrong), or checking that a file's header matches what it's supposed to be, requires looking at those raw bytes directly, not just opening the file normally.",
    "This tool reads any uploaded file and displays it as a classic hex dump: each row shows 16 bytes as hexadecimal values on the left and their printable ASCII representation on the right, with the byte offset labeled at the start of each row — the same format used by developer hex editor tools.",
    "Many file formats identify themselves through a distinctive \"magic number\" in their first few bytes (PNG files always start with a specific 8-byte signature, for example), so a hex dump is a reliable way to identify a file's real type when its extension can't be trusted.",
  ],
  howItWorks: [
    { title: "Upload any file", description: "Choose any file from your device, regardless of type." },
    { title: "Read the hex dump", description: "Each row shows 16 bytes as hex on the left, ASCII on the right." },
    { title: "Check the byte offset", description: "The address at the start of each row shows exactly where those bytes sit in the file." },
  ],
  examples: [
    {
      label: "PNG file signature",
      input: "Any valid .png file",
      output: "First bytes read: 89 50 4e 47 0d 0a 1a 0a — the standard PNG file signature.",
    },
  ],
  faqs: [
    {
      question: "Is there a file size limit?",
      answer:
        "Files are read up to 64 KB for display — larger files are truncated to that amount, since a full hex dump of a large file would be impractical to scroll through and render in a browser.",
    },
    {
      question: "What do the dots in the ASCII column mean?",
      answer:
        "A dot represents a byte that isn't a printable ASCII character (control characters, high-byte values) — only bytes in the standard printable range are shown as their actual character.",
    },
    {
      question: "Can this identify what type of file I have?",
      answer:
        "Indirectly — many file formats have a recognizable byte signature at the very start (a \"magic number\"), which you can look up once you see the hex values, even if the file's extension is missing or wrong.",
    },
    {
      question: "Is my file uploaded to a server?",
      answer:
        "No — the file is read entirely in your browser using the File API. Nothing is uploaded anywhere.",
    },
  ],
};
