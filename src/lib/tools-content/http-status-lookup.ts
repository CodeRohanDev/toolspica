import type { ToolContent } from "./types";

export const httpStatusLookupContent: ToolContent = {
  overview: [
    "Every HTTP response includes a three-digit status code indicating what happened to the request — and while a handful of codes (200, 404, 500) are famous enough that most developers know them by heart, the full standard includes dozens of codes covering much more specific situations, each with a precise, standardized meaning defined by HTTP specifications maintained by the IETF. Knowing exactly what a less common code means, rather than guessing from context, is often the fastest way to understand why an API call failed or behaved unexpectedly.",
    "This reference organizes codes into their standard categories, each identifiable by its first digit: 2xx codes indicate success (the request was received, understood, and accepted); 3xx codes indicate redirection (further action is needed to complete the request, usually automatically by the browser or HTTP client); 4xx codes indicate a client error (something about the request itself was wrong — bad syntax, missing authentication, a resource that doesn't exist); and 5xx codes indicate a server error (the request was valid, but the server failed to fulfill it). Recognizing which category a code falls into, even before reading its specific meaning, immediately tells you whether to look at your request or suspect a problem on the server's end.",
    "Beyond the famous few, this reference covers status codes that come up constantly in real API work but are less universally memorized: 429 (Too Many Requests, for rate limiting), 422 (Unprocessable Entity, for a request that's syntactically valid JSON but fails business logic validation), 304 (Not Modified, for HTTP caching), and 502/503/504 (the distinct flavors of \"something's wrong upstream or the server's overloaded\" that often get lumped together as \"the API is down\" without understanding which specific failure occurred).",
    "Use the search box to jump straight to a code by number or by name — typing \"404\" or \"not found\" both find the same entry — which is faster than scanning a long static reference table when you already know roughly what you're looking for.",
  ],
  howItWorks: [
    {
      title: "Search by code or name",
      description: "Type a status code number or part of its name to filter instantly.",
    },
    {
      title: "Read the meaning",
      description: "Each entry shows its category color, official name, and a plain-language explanation.",
    },
  ],
  examples: [
    {
      label: "Looking up 429",
      input: "429",
      output: "429 Too Many Requests — The user has sent too many requests in a given time.",
    },
  ],
  faqs: [
    {
      question: "What's the difference between 401 and 403?",
      answer:
        "401 Unauthorized means authentication is missing or invalid — the server doesn't know who you are (despite the confusing name, it's really about authentication). 403 Forbidden means the server does know who you are, but you don't have permission to access that specific resource.",
    },
    {
      question: "What's the difference between 502, 503, and 504?",
      answer:
        "502 Bad Gateway means a server acting as a proxy or gateway got an invalid response from an upstream server. 503 Service Unavailable means the server itself is temporarily unable to handle requests (overloaded or under maintenance). 504 Gateway Timeout means an upstream server took too long to respond. All three often get generically described as \"the server is down,\" but they point to different specific failure points.",
    },
    {
      question: "Why does this matter if I'm just building a website, not an API?",
      answer:
        "Status codes affect more than APIs — they influence how search engines index your pages (a 404 tells Google a page is gone, while an incorrect 200 on an error page can cause indexing problems), how browsers cache your content (304 responses), and how load balancers and CDNs route traffic.",
    },
    {
      question: "Is 3xx always a redirect the browser handles automatically?",
      answer:
        "Usually yes for browser navigation, but the specific 3xx code matters for programmatic clients: some (like 301, permanent redirect) should be cached and followed for all future requests, while others (like 307, temporary redirect) explicitly indicate the redirect shouldn't be treated as permanent.",
    },
    {
      question: "Are there status codes outside the ones listed here?",
      answer:
        "Yes — the full HTTP standard includes more codes than are commonly used in everyday web development, plus some non-standard codes used by specific platforms (like Cloudflare's 522). This reference focuses on the codes developers encounter most frequently in real-world API and web work.",
    },
  ],
};
