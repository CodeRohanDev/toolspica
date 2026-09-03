import type { ToolContent } from "./types";

export const httpHeaderCheckerContent: ToolContent = {
  heroSubtitle: "Inspect Any Website's HTTP Response Headers",
  overview: [
    "Every time a browser requests a web page, the server responds with a set of HTTP headers alongside the actual content — metadata describing the response's content type, caching rules, security policies, server software, and more. These headers are invisible in normal browsing but drive a lot of important behavior behind the scenes.",
    "This tool fetches a URL server-side and shows the complete set of response headers exactly as the server sent them — things like `content-type`, `cache-control`, `server`, `strict-transport-security`, `content-security-policy`, `set-cookie` (if any), and redirect information if the URL forwards elsewhere.",
    "Reading response headers is one of the fastest ways to check whether important security headers are actually configured (HSTS, CSP, X-Frame-Options), diagnose unexpected caching behavior, confirm what server software or CDN is handling requests, and see the full redirect chain when a URL doesn't resolve where you expect.",
    "This is useful for web development and debugging, auditing a site's security header configuration, checking whether caching headers are set the way you intended, verifying CDN or reverse proxy configuration, and general HTTP protocol troubleshooting.",
  ],
  howItWorks: [
    {
      title: "Enter a website URL",
      description: "Any public website or API endpoint address.",
    },
    {
      title: "Click Check headers",
      description: "A GET request is made server-side and the response headers are captured.",
    },
    {
      title: "Review the full header list",
      description: "Every header the server returned, plus the status code and any redirect.",
    },
  ],
  examples: [
    {
      label: "Checking a site's caching configuration",
      input: "example.com",
      output: "200 OK with headers including cache-control, content-type, and server",
    },
  ],
  faqs: [
    {
      question: "What does the 'Redirected to' note mean?",
      answer:
        "It means the URL you entered forwarded to a different final URL before the response was captured — common for http-to-https redirects, www-to-non-www normalization, or a page that's moved. The headers shown are from the final destination after following all redirects.",
    },
    {
      question: "Why don't I see any Set-Cookie header?",
      answer:
        "Not every response sets a cookie — many static pages or API responses simply don't need one. If a site does use cookies for sessions or tracking, you'd typically see the Set-Cookie header on the initial page load, though some cookies are only set after user interaction (like login).",
    },
    {
      question: "What are the important security headers to look for?",
      answer:
        "Strict-Transport-Security (forces HTTPS), Content-Security-Policy (restricts what scripts/resources can load), X-Frame-Options or frame-ancestors (prevents clickjacking), and X-Content-Type-Options (prevents MIME-sniffing attacks) are the most commonly checked security-relevant response headers.",
    },
    {
      question: "Can I use this to check an API endpoint, not just a webpage?",
      answer:
        "Yes — any public HTTP or HTTPS URL works, including API endpoints. Just keep in mind this sends a plain GET request, so an endpoint that requires authentication or a different HTTP method may return an error or unauthorized response rather than its normal payload headers.",
    },
    {
      question: "Why do the headers differ slightly each time I check the same site?",
      answer:
        "Some headers are dynamic by design — a `date` header updates every request, and CDN-served sites often include a unique request ID or cache-status header (like `cf-cache-status`) that varies based on whether that specific request hit the cache.",
    },
  ],
};
