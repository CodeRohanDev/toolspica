import type { ToolContent } from "./types";

export const websiteUptimeCheckerContent: ToolContent = {
  heroSubtitle: "Check if a Website is Up Right Now",
  overview: [
    "Before assuming your own internet connection is the problem, or spending time debugging code that might be fine, the fastest sanity check is confirming whether a website is actually reachable from outside your own network right now. A site can be down for everyone, or just unreachable from your specific location or network.",
    "This tool performs a live check from our server, attempting to load the URL and reporting whether it responded successfully, its HTTP status code, and how long the response took. A 2xx or 3xx status generally means the site is healthy; a 4xx or 5xx status, a timeout, or a connection failure indicates a real problem on the site's end.",
    "This is a single point-in-time check, not continuous monitoring — it tells you the site's status at the exact moment you click Check now, not a historical uptime percentage over days or weeks. For ongoing monitoring with alerts when a site goes down, a dedicated uptime-monitoring service that checks on a schedule is the right tool; this is built for the quick 'is it just me, or is the site actually down' question.",
    "This is useful for quickly confirming whether a site outage is real before escalating it, checking a competitor's or client's site status, verifying your own site recovered after a deploy or server restart, and settling the classic 'is it down for everyone or just me' question in seconds.",
  ],
  howItWorks: [
    {
      title: "Enter a website URL",
      description: "Any public website address.",
    },
    {
      title: "Click Check now",
      description: "A live request is made from our server to test reachability.",
    },
    {
      title: "See the result",
      description: "Up/down status, HTTP status code, and response time are shown instantly.",
    },
  ],
  examples: [
    {
      label: "Confirming a site is reachable",
      input: "example.com",
      output: "Site is UP — status 200, response time 45ms",
    },
  ],
  faqs: [
    {
      question: "Is this the same as a 24/7 uptime monitoring service?",
      answer:
        "No — this performs one check at the moment you request it. A dedicated uptime monitor checks on a recurring schedule (every few minutes) and alerts you the instant a site goes down, building a historical uptime percentage over time. This tool answers the immediate question instead.",
    },
    {
      question: "The site loads fine in my browser but shows DOWN here — why?",
      answer:
        "This usually means the issue is specific to your network or location (a local DNS cache, an ISP routing problem, or a regional CDN issue) rather than the site being down everywhere — since this check runs from a completely different server location than your own browser.",
    },
    {
      question: "What status codes count as 'up'?",
      answer:
        "Any response under 500 is treated as up, including redirects (3xx) and even client error codes like 404 (since a 404 still means the server itself is responding, just that the specific page wasn't found). 500-range server errors and connection failures or timeouts are treated as down.",
    },
    {
      question: "Why did the check take several seconds?",
      answer:
        "A slow-but-successful response usually indicates the site itself is under load or experiencing performance issues rather than being fully down — worth investigating separately with the Website Speed Test tool if this happens consistently.",
    },
    {
      question: "Can I use this to monitor my own site automatically?",
      answer:
        "Not for automated recurring checks — this tool is built for on-demand, single checks triggered manually. For automated monitoring with alerts, a dedicated scheduled uptime-monitoring service is the right fit.",
    },
  ],
};
