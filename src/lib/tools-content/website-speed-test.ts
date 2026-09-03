import type { ToolContent } from "./types";

export const websiteSpeedTestContent: ToolContent = {
  heroSubtitle: "Measure Server Response Time for Any Website",
  overview: [
    "How fast a website's server responds is a foundational piece of overall page speed — before a browser can even start rendering a page, it has to resolve the domain's DNS, open a connection, complete a TLS handshake for HTTPS, and wait for the first byte of the response. Slow performance at this layer affects every visitor, regardless of their device or how well-optimized the page's own assets are.",
    "This tool measures each of those steps individually for the main HTML document: DNS lookup time, TCP connection time, TLS handshake time (for HTTPS sites), time to first byte (TTFB — how long until the server starts sending data), and total response time. Breaking the timing down this way pinpoints exactly where time is being spent, rather than just reporting one combined number.",
    "This is a server response timing test, not a full page-load or Lighthouse-style test — it doesn't load images, stylesheets, JavaScript, or render the page like a real browser would. For that level of analysis (render timing, Core Web Vitals, resource waterfalls), a dedicated tool like Google PageSpeed Insights or Lighthouse is the right choice. What this tool measures well is the server-side foundation those tools build on top of.",
    "This is useful for diagnosing whether slow-loading pages are a server problem or a front-end problem, checking hosting performance before and after a server migration, comparing response times across different hosting providers or CDN configurations, and quick server health checks.",
  ],
  howItWorks: [
    {
      title: "Enter a website URL",
      description: "Any public website address.",
    },
    {
      title: "Click Run test",
      description: "DNS, connection, TLS, and response timing are all measured from our server.",
    },
    {
      title: "Review the breakdown",
      description: "See exactly which stage of the connection is taking the most time.",
    },
  ],
  examples: [
    {
      label: "Testing a well-optimized site",
      input: "example.com",
      output: "DNS: 8ms, Connect: 12ms, TLS: 15ms, TTFB: 45ms, Total: 52ms",
    },
  ],
  faqs: [
    {
      question: "Why isn't this the same as a Google PageSpeed Insights score?",
      answer:
        "PageSpeed Insights and Lighthouse measure full page rendering — every image, script, stylesheet, and how a browser paints them. This tool measures only the server response for the initial HTML document, which is the foundation those tools build on but not the complete picture of page speed.",
    },
    {
      question: "What's a good time-to-first-byte (TTFB)?",
      answer:
        "Under 200ms is generally considered fast, 200-500ms is acceptable for most sites, and consistently over 600-800ms usually signals a server-side bottleneck worth investigating — slow database queries, an overloaded server, or a hosting plan that's undersized for the traffic.",
    },
    {
      question: "Why is my TLS handshake time high?",
      answer:
        "TLS handshake time depends on the server's distance from our testing location, the TLS version and cipher suite negotiated, and certificate chain complexity — a high number here isn't necessarily a misconfiguration, but consistently high times across multiple tests can indicate a server-side or network routing issue worth investigating.",
    },
    {
      question: "Does this test include CDN caching?",
      answer:
        "Yes, indirectly — if a site is served through a CDN, the response you're measuring reflects the CDN edge node's performance, which is exactly the real-world experience most visitors get, since CDNs are specifically designed to serve most requests without hitting the origin server.",
    },
    {
      question: "Why do repeated tests give slightly different results?",
      answer:
        "Network conditions vary moment to moment — server load, routing, and even minor internet congestion all cause natural variation. Run the test a few times and look at the typical range rather than treating any single result as definitive.",
    },
  ],
};
