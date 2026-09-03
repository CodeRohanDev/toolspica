import type { ToolContent } from "./types";

export const urlEncoderContent: ToolContent = {
  overview: [
    "URLs can only safely contain a limited set of characters — letters, numbers, and a handful of punctuation marks like `-`, `.`, `_`, and `~`. Everything else (spaces, ampersands, question marks inside a value, non-Latin characters, emoji) has to be percent-encoded — replaced with a `%` followed by the character's hexadecimal byte value — or it risks being misinterpreted, truncated, or breaking the URL entirely when it's shared, clicked, or passed between systems. A space becomes `%20`, an ampersand becomes `%26`, and so on.",
    "This matters constantly in practical web work: building a query string parameter that contains user input, constructing a link to a search results page for a phrase with spaces in it, embedding a URL inside another URL (like a redirect parameter), or passing a piece of text through an API that expects it in URL-encoded form. Getting this wrong is a common source of broken links — an unencoded `&` inside what should be a single parameter value gets misread by the receiving server as the start of a brand new parameter, silently corrupting the data.",
    "This tool offers two encoding modes because JavaScript itself provides two different, deliberately-scoped functions for this. \"Component\" mode (the default, using `encodeURIComponent`) aggressively encodes almost everything, including characters like `/`, `?`, `&`, and `=` that have special meaning in a URL's structure — this is exactly what you want when encoding a single value that will be inserted into a query string or path segment, since it guarantees that value can't accidentally break the surrounding URL structure. \"Full URL mode\" (using `encodeURI`) is gentler: it assumes you're encoding an entire, already-structured URL, so it leaves characters like `:`, `/`, `?`, `&`, and `=` alone (since those are meant to keep their structural meaning) while still encoding spaces and other genuinely unsafe characters.",
    "Choosing the wrong mode is the most common mistake: using Component mode on a full URL will over-encode it, turning `https://example.com/search?q=cats` into an unusable `https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dcats`. Use Component mode when encoding one value that's going inside a URL; use Full URL mode when encoding an entire URL that already has its structure in place.",
  ],
  howItWorks: [
    {
      title: "Paste your text or URL",
      description: "Enter the value or full URL you need to encode.",
    },
    {
      title: "Pick the right mode",
      description:
        "Use the default for a single value, or switch to Full URL mode if you're encoding an entire, already-structured URL.",
    },
    {
      title: "Copy the encoded result",
      description: "The percent-encoded output updates instantly as you type.",
    },
  ],
  examples: [
    {
      label: "Encoding a single value (default mode)",
      input: "hello world & more",
      output: "hello%20world%20%26%20more",
    },
    {
      label: "Encoding a full URL (Full URL mode)",
      input: "https://example.com/search?q=hello world",
      output: "https://example.com/search?q=hello%20world",
    },
  ],
  faqs: [
    {
      question: "Why did Component mode turn my whole URL into a mess of %2F and %3A?",
      answer:
        "Component mode is designed to encode a single value, not a structured URL, so it aggressively encodes the `/` and `:` characters that give a URL its structure. Switch to \"Full URL mode\" when you're encoding an entire URL rather than one parameter value.",
    },
    {
      question: "Does encoding change the meaning of my text?",
      answer:
        "No — percent-encoding is fully reversible and represents exactly the same underlying text, just in a form that's safe to transmit inside a URL. Decoding it (with the URL Decoder tool) returns the exact original text.",
    },
    {
      question: "Why does a space become %20 and not a plus sign (+)?",
      answer:
        "Both are valid in different contexts: standard percent-encoding (what `encodeURIComponent` produces) uses `%20` for a space, while the older `application/x-www-form-urlencoded` format (used by HTML form submissions) traditionally uses `+`. This tool follows the standard percent-encoding convention.",
    },
    {
      question: "Are emoji and non-English characters handled correctly?",
      answer:
        "Yes — any character outside the basic safe set, including emoji and non-Latin scripts, gets encoded into its UTF-8 byte representation as a sequence of %XX values, which any standards-compliant system will decode back correctly.",
    },
    {
      question: "Do I need to encode a URL that only contains letters and numbers?",
      answer:
        "No — encoding is only necessary for characters outside the safe set. A URL or value containing only letters, numbers, and a few safe punctuation marks will come out completely unchanged.",
    },
  ],
};
