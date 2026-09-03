import type { ToolContent } from "./types";

export const base64EncodeContent: ToolContent = {
  overview: [
    "Base64 is an encoding scheme that represents binary data using only 64 printable ASCII characters (A-Z, a-z, 0-9, +, and /), making it safe to embed in contexts that only reliably support plain text — email bodies (where Base64 was originally designed to let attachments survive being passed through old text-only mail systems), JSON payloads, URLs, and HTML/CSS (as a way to inline small images directly in a data: URI without a separate file request).",
    "This tool encodes plain text into its Base64 representation. Under the hood, it first converts your text into its raw UTF-8 bytes, then groups those bytes into sets of three and maps each group into four Base64 characters — which is exactly why Base64-encoded output is always roughly 33% longer than the original: it trades some size for the guarantee that the result contains only safe, universally-supported characters.",
    "Common real-world uses include encoding an API key or credentials pair for a Basic Authentication header (which requires the `username:password` string to be Base64-encoded), embedding a small icon or image directly into CSS or HTML as a data URI to avoid an extra network request, or preparing binary-adjacent data to be safely included in a JSON field or URL parameter where raw binary or special characters would break the format.",
    "It's important to be clear about what Base64 is and isn't: it's an encoding, not encryption. Base64-encoded text provides zero confidentiality — anyone can decode it back to the original instantly using this tool's counterpart (Base64 Decode) or a single line of code in any programming language. Never use Base64 encoding as a substitute for real encryption if you need to actually protect sensitive data.",
  ],
  howItWorks: [
    {
      title: "Enter your text",
      description: "Type or paste the text you want to Base64-encode.",
    },
    {
      title: "Read the result",
      description: "The Base64-encoded string is generated instantly below.",
    },
    {
      title: "Copy and use it",
      description: "Paste the encoded string wherever a Base64 value is needed.",
    },
  ],
  examples: [
    {
      label: "Encoding a short string",
      input: "Hello, world!",
      output: "SGVsbG8sIHdvcmxkIQ==",
    },
  ],
  faqs: [
    {
      question: "Is Base64 encoding the same as encryption?",
      answer:
        "No — Base64 is a reversible encoding with no secret key, meant purely to make binary-safe data representable as plain text. Anyone can decode it instantly; it provides no security or confidentiality whatsoever.",
    },
    {
      question: "Why is my encoded output longer than the original text?",
      answer:
        "Base64 encodes every 3 bytes of input as 4 output characters, which mathematically increases the size by about 33%. This overhead is the trade-off for guaranteeing the output only uses safe, universally supported characters.",
    },
    {
      question: "What do the equals signs (=) at the end sometimes mean?",
      answer:
        "They're padding characters, added when the input length isn't a clean multiple of 3 bytes, to keep the output length a multiple of 4 characters as the standard requires. You'll see zero, one, or two padding characters depending on the input length.",
    },
    {
      question: "Does this handle emoji and non-English text correctly?",
      answer:
        "Yes — the text is first converted to its UTF-8 byte representation before Base64 encoding, so emoji, accented characters, and non-Latin scripts are all encoded correctly and will decode back to the exact original text.",
    },
    {
      question: "Can I use this for encoding a username:password pair for Basic Auth?",
      answer:
        "Yes — type the credentials in the format `username:password` and encode it; the resulting string is exactly what an HTTP `Authorization: Basic <encoded>` header expects.",
    },
  ],
};
