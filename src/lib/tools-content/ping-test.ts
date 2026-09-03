import type { ToolContent } from "./types";

export const pingTestContent: ToolContent = {
  heroSubtitle: "Test Network Latency to Any Host",
  overview: [
    "A ping test measures how quickly your connection can reach a remote server — useful for diagnosing a slow website, checking whether a game server is responsive, or confirming a host is even reachable before digging into a bigger problem.",
    "Traditional ping uses the ICMP protocol, which most web browsers and standard servers can't send directly — ICMP requires low-level network privileges that a normal web application doesn't have. This tool works around that by measuring TCP connection latency instead: how long it takes to open a real TCP connection to the host on a chosen port (443 for HTTPS by default). This is a well-established, browser-safe stand-in for ICMP ping, and for most practical purposes — 'is this host responsive, and how fast?' — it answers the same question.",
    "Each test runs four connection attempts and reports the minimum, average, and maximum latency, along with any packet loss (failed connection attempts). Consistent low latency with zero loss indicates a healthy, responsive connection; high or wildly varying latency points to network congestion or an overloaded server; a high loss percentage suggests the host is unreachable or actively blocking connections on that port.",
    "This is useful for diagnosing slow-loading websites, checking whether a server or API endpoint is currently reachable, comparing latency across different hosts before choosing infrastructure, and quick network troubleshooting when something feels slow but you're not sure why.",
  ],
  howItWorks: [
    {
      title: "Enter a hostname",
      description: "Any domain name or public server address.",
    },
    {
      title: "Choose a port",
      description: "443 (HTTPS) works for most websites; pick another for specific services.",
    },
    {
      title: "Click Ping",
      description: "Four connection attempts run, reporting latency and any packet loss.",
    },
  ],
  examples: [
    {
      label: "Checking latency to a website",
      input: "Host: example.com, Port: 443",
      output: "Min: 12ms, Avg: 15ms, Max: 19ms, Loss: 0%",
    },
  ],
  faqs: [
    {
      question: "Why doesn't this use real ICMP ping?",
      answer:
        "ICMP ping requires raw socket privileges that a normal web server doesn't have, so it can't be run from a browser-based tool. This tool measures TCP connection latency instead, which answers the same practical question — how fast and reliable is the connection — without needing special network permissions.",
    },
    {
      question: "Is TCP latency the same as ICMP ping latency?",
      answer:
        "They're usually very close, since both measure round-trip network time, but not identical — TCP connection setup involves a few extra steps (the TCP handshake) that ICMP doesn't, so TCP latency can run slightly higher. For comparing responsiveness or spotting a network problem, the difference rarely matters.",
    },
    {
      question: "What does 'packet loss' mean here?",
      answer:
        "It's the percentage of the four connection attempts that failed to connect or timed out. Occasional single failures can be normal network noise, but consistent loss across multiple attempts usually means the host is unreachable, overloaded, or blocking connections on that port.",
    },
    {
      question: "Why would a ping fail even though the website loads fine in my browser?",
      answer:
        "If the host blocks connections on the specific port you tested (say, port 22 when the site only serves HTTPS on 443), the ping will fail even though the website itself works perfectly on port 443. Try the default HTTPS port if you're just checking general reachability.",
    },
    {
      question: "Which port should I test?",
      answer:
        "443 (HTTPS) is the right default for checking a website's general reachability and latency, since nearly every modern site serves traffic there. Only pick a different port if you're specifically checking that service (like 22 for SSH or 25 for SMTP).",
    },
  ],
};
