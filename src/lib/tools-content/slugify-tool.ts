import type { ToolContent } from "./types";

export const slugifyToolContent: ToolContent = {
  overview: [
    "\"Slugify\" is the common name developers give to the function that converts an arbitrary string into a clean, URL-safe, lowercase identifier — the exact transformation nearly every content management system, static site generator, and blogging platform runs automatically whenever you save a new page, post, or product with a human-readable title. Almost every popular web framework and CMS has its own slugify function or library (Rails' `parameterize`, WordPress's internal sanitization, countless npm packages), and they all converge on essentially the same core rules.",
    "This tool applies exactly that standard transformation: it normalizes Unicode accented characters down to their closest plain-ASCII equivalent (so \"café\" becomes \"cafe\"), converts everything to lowercase, strips out any character that isn't a letter, number, space, or hyphen, then collapses any run of spaces or hyphens into a single hyphen, and finally trims any leading or trailing hyphens left over from the process. The result is always a string safe to use directly as a URL path segment, a file name, an HTML `id` attribute, or a key in most systems that restrict what characters an identifier can contain.",
    "This is the developer-facing counterpart to the more configurable Slug Generator tool in the Text Tools category — that tool offers separator choice (hyphen vs underscore) and lowercase toggling for general content use, while this one applies the single, most common, framework-standard convention (hyphens, forced lowercase) with no configuration needed, matching what you'd get from calling a typical `slugify()` utility function in code.",
    "Typical developer uses include generating a URL slug for a new blog post or documentation page programmatically, creating a safe, collision-resistant HTML `id` from a heading's text (a common pattern for auto-generated table-of-contents anchor links), or sanitizing user-provided input before using it as part of a file name or database key.",
  ],
  howItWorks: [
    {
      title: "Enter your text",
      description: "Type or paste any string — a title, a heading, a product name.",
    },
    {
      title: "See the slug instantly",
      description: "A clean, lowercase, hyphenated, URL-safe slug is generated as you type.",
    },
    {
      title: "Copy it",
      description: "Copy the slug for use in a URL, file name, or HTML id attribute.",
    },
  ],
  examples: [
    {
      label: "Slugifying a title",
      input: "My Component's Display Name!",
      output: "my-components-display-name",
    },
  ],
  faqs: [
    {
      question: "How is this different from the Slug Generator tool?",
      answer:
        "They apply nearly the same core logic, but Slug Generator offers configuration (choice of hyphen or underscore separator, an optional lowercase toggle), aimed at general content use. This tool applies the single, fixed, framework-standard convention with no options, matching what a typical code-level slugify() function produces.",
    },
    {
      question: "Does this handle accented characters correctly?",
      answer:
        "Yes — accented letters are normalized to their closest plain-ASCII equivalent before slugifying, so \"café\" becomes \"cafe\" and \"naïve\" becomes \"naive\", matching how most real-world slugify implementations handle international text.",
    },
    {
      question: "Can I use the output as an HTML id attribute?",
      answer:
        "Yes — the output contains only lowercase letters, numbers, and hyphens, which is a valid, safe HTML id in every modern browser, and is exactly the kind of string commonly auto-generated for heading anchor links in documentation sites.",
    },
    {
      question: "What happens to apostrophes, like in \"Component's\"?",
      answer:
        "Apostrophes are stripped out entirely rather than being converted to a hyphen, so \"Component's\" becomes \"components\" (no separator where the apostrophe was) — matching the behavior of most standard slugify implementations.",
    },
    {
      question: "Will this ever produce an empty string?",
      answer:
        "Yes, if your input contains no letters or numbers at all (for example, only punctuation or symbols) — in that edge case, there's nothing valid left to build a slug from, and you'd need to provide fallback text in your own code for that scenario.",
    },
  ],
};
