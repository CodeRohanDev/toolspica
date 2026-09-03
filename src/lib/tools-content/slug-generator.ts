import type { ToolContent } from "./types";

export const slugGeneratorContent: ToolContent = {
  overview: [
    "A slug is the part of a URL that identifies a specific page in a human-readable way — in a URL like example.com/blog/best-productivity-tools-2026, the slug is \"best-productivity-tools-2026\". Slugs need to follow a narrow set of rules: lowercase letters, numbers, and a single separator character (almost always a hyphen), with no spaces, punctuation, or special characters, since those either get URL-encoded into ugly percent-sequences or break the link entirely on some systems.",
    "This tool takes any string — a blog post title, a product name, a person's name — and converts it into a valid, clean slug automatically. It lowercases the text (optional, but the overwhelming convention for URLs), strips out apostrophes, colons, exclamation points, and other punctuation, collapses any run of spaces or existing hyphens/underscores into a single separator, and trims any leading or trailing separator so you don't end up with a slug that starts or ends with a stray hyphen. It also normalizes accented characters using Unicode NFKD decomposition, so a title like \"Café Résumé\" correctly becomes \"cafe-resume\" instead of dropping those words or leaving encoded accent marks in the URL.",
    "You can choose between a hyphen (-) or an underscore (_) as the separator. Hyphens are overwhelmingly the standard for URL slugs — Google's own SEO guidance recommends them, and virtually every CMS (WordPress, Shopify, Ghost) defaults to hyphens — because search engines and most systems treat a hyphen as a word boundary, while an underscore is sometimes treated as joining two words into one. Underscores remain common in other contexts though, like Python variable names, file names, and some legacy systems, which is why the option is here.",
    "This is the exact kind of transformation content management systems perform automatically behind the scenes when you save a new post or page, but having it as a standalone tool is useful whenever you need a slug outside of that context — for a custom redirect rule, a file name, an anchor ID for a page section, or a quick sanity check before manually typing a URL into a form field.",
  ],
  howItWorks: [
    {
      title: "Enter your title or phrase",
      description: "Type or paste the text you want turned into a URL slug.",
    },
    {
      title: "Choose separator and casing",
      description: "Pick hyphen or underscore, and whether to force lowercase.",
    },
    {
      title: "Copy the slug",
      description: "The clean, URL-safe slug updates instantly as you type.",
    },
  ],
  examples: [
    {
      label: "Blog post title",
      input: "10 Best Productivity Tools for 2026!",
      output: "10-best-productivity-tools-for-2026",
    },
    {
      label: "Title with accents",
      input: "Café Résumé & Portfolio",
      output: "cafe-resume-portfolio",
    },
  ],
  faqs: [
    {
      question: "Why does my slug lose the exclamation point and other punctuation?",
      answer:
        "URL slugs can only safely contain letters, numbers, and the separator character. Punctuation like !, ?, &, and : is either invalid in a clean URL or requires percent-encoding, which looks messy and hurts readability, so this tool strips it out rather than encoding it.",
    },
    {
      question: "What happens to numbers in my title?",
      answer:
        "Numbers are kept as-is — \"Top 10 Tips\" becomes \"top-10-tips\", since digits are fully valid in a URL slug and commonly used for lists, years, and version numbers.",
    },
    {
      question: "Should I use hyphens or underscores for SEO?",
      answer:
        "Hyphens. Google has stated that it treats a hyphen as a word separator but can treat an underscore as joining words together (so \"best_tools\" may be read closer to \"besttools\" than \"best tools\"), which can very slightly hurt how your page is understood for those keywords.",
    },
    {
      question: "Does this remove stopwords like \"a\", \"the\", or \"and\"?",
      answer:
        "No — it only handles formatting (casing, punctuation, separators), not word selection. Some sites choose to manually shorten slugs by dropping small words for brevity, but that's a content decision this tool leaves entirely up to you.",
    },
    {
      question: "Is there a maximum slug length I should stick to?",
      answer:
        "There's no hard technical limit, but most SEO guidance suggests keeping slugs reasonably short and descriptive — often cited as under roughly 60 characters — since very long slugs get truncated in search results and are harder to read and share.",
    },
  ],
};
