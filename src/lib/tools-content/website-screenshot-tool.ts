import type { ToolContent } from "./types";

export const websiteScreenshotToolContent: ToolContent = {
  heroSubtitle: "Capture a Screenshot of Any Public Website",
  overview: [
    "Capturing a full screenshot of a live website is something a normal browser can't easily do on its own — it requires actually rendering the page in a headless browser and photographing the result, which is exactly what this tool does behind the scenes for any public URL you enter.",
    "This tool takes a screenshot capture request for any public website and renders back a current image of how that page looks, at a standard desktop viewport size, without you needing to open the site yourself, install anything, or use browser developer tools.",
    "Because the screenshot is generated fresh by an external rendering service rather than pulled from a static image library, the very first capture of a URL can take a few seconds to render — if you see a placeholder or loading image initially, clicking Refresh a few seconds later typically shows the fully rendered page.",
    "This is useful for quickly previewing what a website looks like before clicking an unfamiliar link, capturing a visual record of a page for documentation or a bug report, comparing how a site's design has changed over time, and building visual previews without manual screenshotting.",
  ],
  howItWorks: [
    {
      title: "Enter a website URL",
      description: "Any public website address.",
    },
    {
      title: "Click Capture",
      description: "A screenshot request is sent for that URL.",
    },
    {
      title: "View (or refresh) the result",
      description: "If the image looks like a placeholder, refresh after a few seconds.",
    },
  ],
  examples: [
    {
      label: "Previewing a website before visiting it",
      input: "example.com",
      output: "A rendered screenshot of the site's homepage as it currently appears",
    },
  ],
  faqs: [
    {
      question: "Why does the screenshot sometimes look like a placeholder image?",
      answer:
        "The very first time a specific URL is captured, the rendering service needs a few seconds to actually load and photograph the page — during that window it can show a generic placeholder. Clicking Refresh a few seconds later almost always returns the fully rendered screenshot.",
    },
    {
      question: "Can this capture a page that requires login?",
      answer:
        "No — the screenshot is taken without any login session or cookies, so it captures exactly what a logged-out visitor would see. Pages that redirect to a login screen for anonymous visitors will show that login screen instead of the content behind it.",
    },
    {
      question: "How current is the screenshot?",
      answer:
        "Screenshots reflect the page's content at the time it was rendered, which is cached briefly by the rendering service for performance. If a page has changed very recently, click Refresh to force a fresh capture rather than a cached one.",
    },
    {
      question: "Can I capture a specific section of a page, not the whole thing?",
      answer:
        "No — this captures the visible portion of the page at a standard desktop viewport size (the top of the page as it would first appear), not a scrolled-down section or a specific element. For full-page or element-specific capture, a browser extension or developer tool is a better fit.",
    },
    {
      question: "Does this work for password-protected or private sites?",
      answer:
        "No — it only works for publicly accessible pages that don't require authentication, since the capture happens without any credentials or session data.",
    },
  ],
};
