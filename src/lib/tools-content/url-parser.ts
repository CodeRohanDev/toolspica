import type { ToolContent } from "./types";

export const urlParserContent: ToolContent = {
  overview: [
    "A URL is a compact string that actually encodes several distinct pieces of information: which protocol to use, which server to connect to, which specific resource on that server to request, and any additional parameters or page-section reference — all packed together in a format most people read as a single opaque blob rather than a structured piece of data. A URL parser breaks that string apart into its named components, making each piece individually visible and usable.",
    "This tool uses the browser's built-in, standards-compliant URL parser (the same one used internally by `fetch()`, `window.location`, and every other URL-handling API in JavaScript) to break a URL into its protocol (like `https:`), host and hostname (the server address, with and without the port), port (explicit or the protocol's default), pathname (the specific resource path being requested), and hash (the fragment identifier after a `#`, often used for in-page navigation or, in older single-page apps, for client-side routing).",
    "Query parameters get special treatment: rather than showing the raw query string as one block of text, this tool parses it into individual key-value pairs, making it immediately clear what parameters a URL is actually passing and what their values are — genuinely useful for understanding a long, parameter-heavy URL (like one with UTM tracking parameters, a search query, pagination, and filters all combined) at a glance, rather than manually splitting the query string by `&` and `=` yourself.",
    "This is useful across a range of everyday development and debugging tasks: understanding exactly what a long, unfamiliar URL from a log file or bug report is actually requesting, checking whether tracking or campaign parameters are present and what they say, verifying a redirect URL's structure before using it in code, or just satisfying curiosity about a particularly long or cryptic-looking URL you've encountered.",
  ],
  howItWorks: [
    {
      title: "Paste a full URL",
      description: "Enter any complete URL, including its protocol (https://).",
    },
    {
      title: "See it broken down",
      description: "Protocol, host, port, path, and hash are shown as separate, labeled fields.",
    },
    {
      title: "Review query parameters",
      description: "Every query parameter is listed individually as a key and value.",
    },
  ],
  examples: [
    {
      label: "Parsing a URL with query parameters",
      input: "https://example.com:8080/search?q=hello&lang=en#results",
      output:
        "Protocol: https: · Host: example.com:8080 · Path: /search · Params: q=hello, lang=en · Hash: #results",
    },
  ],
  faqs: [
    {
      question: "Why do I need to include the protocol (https://) for this to work?",
      answer:
        "The browser's URL parser this tool relies on requires a complete, absolute URL to parse correctly — without a protocol, a string like \"example.com/page\" is ambiguous (it could be a relative path rather than a full URL), so the parser can't reliably determine its structure.",
    },
    {
      question: "What's the difference between 'Host' and 'Hostname'?",
      answer:
        "Hostname is just the server address (like `example.com`). Host includes the port number too, if one is explicitly specified in the URL (like `example.com:8080`) — for URLs using the default port for their protocol, Host and Hostname will look identical.",
    },
    {
      question: "What does the '(default)' port mean?",
      answer:
        "It means no port was explicitly specified in the URL, so the browser uses the protocol's standard default — port 443 for HTTPS or port 80 for HTTP — without it needing to appear in the URL itself.",
    },
    {
      question: "Can this parse relative URLs, like \"/page?id=5\"?",
      answer:
        "No — this tool requires a complete, absolute URL with a protocol and host. Relative URLs only make sense in the context of a base URL they're relative to, which this standalone tool doesn't have.",
    },
    {
      question: "Does this decode percent-encoded characters in the query parameters?",
      answer:
        "Yes — query parameter values are automatically decoded from their percent-encoded form, so a value like `hello%20world` in the raw URL is shown as \"hello world\" in the parsed parameter list.",
    },
  ],
};
