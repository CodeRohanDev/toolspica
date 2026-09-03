import type { ToolContent } from "./types";

export const urlDecoderContent: ToolContent = {
  overview: [
    "URL decoding reverses percent-encoding, turning sequences like `%20`, `%26`, and `%3F` back into their original characters — a space, an ampersand, a question mark. You'll run into encoded URLs constantly without necessarily meaning to look for them: copying a link from a browser's address bar after searching for something with spaces in it, inspecting a redirect or tracking parameter buried inside a longer URL, or debugging why an API request isn't matching the value you expected because it arrived still encoded.",
    "This tool takes any percent-encoded text and decodes it back to plain, readable text in one step, using the same decoding logic browsers and servers use internally. It correctly handles UTF-8 multi-byte sequences, so encoded non-English characters and emoji decode back to the exact original symbol rather than garbled text — a percent-encoded accented letter or a percent-encoded emoji comes back looking exactly as it did before encoding, not as a mangled substitute character.",
    "Not every percent-encoded-looking string is actually valid, though, and this matters in practice: a `%` sign that isn't followed by two valid hexadecimal digits (for example, a literal `%` used in ordinary text, like \"50% off\", followed by a space rather than a hex pair) isn't valid percent-encoding, and attempting to decode it as if it were will throw an error rather than silently producing wrong output. This tool catches that case and tells you clearly that the input contains an invalid escape sequence, rather than failing silently or showing corrupted text — which is exactly the kind of subtle bug that's easy to miss if a decoder just fails quietly.",
    "Decoding runs instantly in your browser as you type or paste, with no length limit — useful whether you're decoding a short tracking parameter or an entire encoded URL with a long query string attached.",
  ],
  howItWorks: [
    {
      title: "Paste the encoded text",
      description: "Enter the percent-encoded text or URL you want to decode.",
    },
    {
      title: "Read the decoded result",
      description: "The plain-text version appears instantly below as you type.",
    },
    {
      title: "Copy it",
      description: "Copy the decoded text once it looks correct.",
    },
  ],
  examples: [
    {
      label: "Decoding a search URL",
      input: "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world",
      output: "https://example.com/search?q=hello world",
    },
  ],
  faqs: [
    {
      question: "Why does it say my input contains an invalid % sequence?",
      answer:
        "A valid percent-encoded character is always a `%` followed by exactly two hexadecimal digits (0-9, A-F) — like `%20`. If your text contains a literal `%` that isn't followed by a valid hex pair (for example, plain text like \"50% off\"), it isn't valid percent-encoding, and decoding it would be ambiguous, so the tool flags it instead of guessing.",
    },
    {
      question: "Can I decode just part of a URL, like only the query string?",
      answer:
        "Yes — paste in just the portion you want decoded, whether that's the whole URL or a single parameter value. The tool decodes whatever text you give it without needing full URL context.",
    },
    {
      question: "Will decoding show me an emoji or accented character correctly?",
      answer:
        "Yes — the decoder correctly reassembles multi-byte UTF-8 sequences, so an encoded emoji or accented letter decodes back to the exact original character rather than a broken or partial symbol.",
    },
    {
      question: "Is a + sign decoded as a space?",
      answer:
        "No — standard percent-decoding (what this tool does) only converts `%XX` sequences; a literal `+` character is left as a plus sign. The convention of treating `+` as a space is specific to HTML form submissions (`application/x-www-form-urlencoded`), a related but different encoding scheme.",
    },
    {
      question: "What if I paste in text that isn't encoded at all?",
      answer:
        "Plain text with no percent-encoded sequences decodes to itself unchanged, since there's nothing to convert — it's safe to run any text through this tool even if you're not sure whether it's encoded.",
    },
  ],
};
