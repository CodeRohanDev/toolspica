import type { ToolContent } from "./types";

export const metaTagGeneratorContent: ToolContent = {
  heroSubtitle: "Generate Title, Description, and Robots Meta Tags in Seconds",
  overview: [
    "Every page needs a handful of meta tags in its `<head>` — a title, a description, a robots directive, a viewport tag for mobile — but hand-writing them correctly (right attribute names, right quoting, right order) is easy to get slightly wrong when you're doing it from memory. This generator gives you a simple form: fill in your page details, and get back clean, correctly formatted HTML ready to paste.",
    "The title and description fields map directly to what search engines usually display in results, so getting the wording and length right here has a real SEO impact — search engines commonly truncate titles beyond about 60 characters and descriptions beyond about 160. The robots dropdown handles the four standard index/follow combinations without needing to remember the exact directive syntax.",
    "This is aimed at anyone maintaining a site without a full SEO plugin doing this automatically — static site builders, custom HTML pages, or quick landing pages where you want correct meta tags without digging through documentation each time.",
  ],
  howItWorks: [
    { title: "Fill in page details", description: "Title, description, keywords, author, and robots directive." },
    { title: "Preview the generated tags", description: "See the exact HTML update live as you type." },
    { title: "Copy into your page's <head>", description: "Paste the block directly into your HTML." },
  ],
  examples: [
    { label: "Generating tags for a landing page", input: "Title, 155-character description, robots: index, follow", output: "A complete, correctly formatted <head> meta tag block" },
  ],
  faqs: [
    { question: "How long should my meta description be?", answer: "Aim for around 150-160 characters — search engines typically truncate longer descriptions in results." },
    { question: "Does the keywords meta tag still matter for SEO?", answer: "No — major search engines have ignored the keywords meta tag for ranking purposes for years, but it's included here for completeness since some tools/CMSs still read it." },
    { question: "What does the robots tag actually control?", answer: "It tells search engines whether to index the page and whether to follow its links — useful for keeping draft or duplicate pages out of search results." },
    { question: "Do I need the viewport meta tag?", answer: "Yes, for any modern responsive site — it tells mobile browsers to render the page at device width instead of a zoomed-out desktop layout." },
    { question: "Where exactly do these tags go?", answer: "Paste the entire block inside your HTML document's <head> section, before the closing </head> tag." },
  ],
};
