import type { ToolContent } from "./types";

export const characterCounterContent: ToolContent = {
  overview: [
    "A character counter measures the exact length of a piece of text in characters — every letter, number, space, and punctuation mark — rather than in words. That distinction matters enormously in contexts where a platform or system enforces a strict character limit rather than a word limit: a tweet, an SMS message, a meta title tag that Google truncates past a certain pixel width, or a form field with a hard `maxlength` attribute.",
    "This tool tracks four numbers at once: total characters (including spaces), characters excluding spaces, word count for reference, and the size in bytes when the text is encoded as UTF-8. That last figure is easy to overlook but genuinely useful: a single emoji or an accented character (é, ñ, 中) can take up more than one byte, which matters if you're working against a byte-based limit in an API payload, a database column, or an SMS gateway that bills per byte rather than per character.",
    "Below the live counts, this tool shows your progress against several of the most common real-world character limits people run into: a Twitter/X post (280 characters), a single SMS segment (160 characters, after which messages typically split into multiple segments), a meta title tag (60 characters, a common rule-of-thumb before Google truncates it in search results), a meta description (160 characters, similarly a rough guideline for search snippets), and an Instagram caption (2,200 characters, the platform's hard cap before the rest is hidden behind \"more\"). Each one shows a live progress bar and how many characters you have left — or how far over you've gone.",
    "Like every text tool on Toolspica, this runs entirely in your browser. There's no upload, no character limit imposed by us, and no delay — the counts update on every single keystroke, so you can write directly against the limit that matters to you instead of drafting elsewhere and copy-pasting back and forth to check.",
  ],
  howItWorks: [
    {
      title: "Type or paste your text",
      description: "Everything is counted locally as you type — nothing is uploaded.",
    },
    {
      title: "Check the live counts",
      description:
        "Character count, character count without spaces, word count, and byte size all update instantly.",
    },
    {
      title: "Compare against real limits",
      description:
        "The progress bars below show exactly how much room you have left for common platforms like Twitter/X, SMS, and meta tags.",
    },
  ],
  examples: [
    {
      label: "Tweet-length draft",
      input:
        "Just shipped a new privacy-first tools platform. Everything runs in your browser — no uploads, no accounts, no ads tracking you across the web.",
      output: "146 characters · 134 without spaces · 21 words · 148 bytes",
    },
  ],
  faqs: [
    {
      question: "Why does the byte count sometimes differ from the character count?",
      answer:
        "Standard English letters, numbers, and punctuation each take up exactly 1 byte in UTF-8. But accented letters, non-Latin scripts, and emoji can take 2, 3, or even 4 bytes each. If your text uses any of those, the byte count will be higher than the character count — this matters for systems (like some SMS gateways and databases) that enforce limits in bytes rather than characters.",
    },
    {
      question: "Why does one emoji sometimes count as 2 characters?",
      answer:
        "Many emoji — especially ones with skin-tone modifiers or combined symbols (like a family emoji made of several people) — are represented internally as more than one Unicode code unit. JavaScript's string length counts code units, so a single visual emoji can register as 2 or more \"characters\" even though it looks like one glyph.",
    },
    {
      question: "Is 160 characters really the SMS limit?",
      answer:
        "160 characters is the classic limit for a single GSM-encoded SMS segment. Messages using non-GSM characters (many emoji, or non-Latin scripts) drop to a 70-character limit per segment, and longer messages are typically split into multiple linked segments by the carrier rather than rejected outright.",
    },
    {
      question: "Do spaces count toward Twitter/X's 280-character limit?",
      answer:
        "Yes — the 280-character limit counts every character including spaces and punctuation. URLs are a partial exception: X automatically shortens any link to a fixed 23-character t.co URL regardless of its original length, which this tool doesn't simulate since it only counts raw text.",
    },
    {
      question: "Why does Google sometimes truncate my title even though it's under 60 characters?",
      answer:
        "Google's search results truncate titles based on pixel width, not a strict character count — 60 characters is a widely used rule of thumb, but titles with wider characters (capital letters, certain punctuation) can get cut off sooner, while titles with narrower characters can run a bit longer.",
    },
  ],
};
