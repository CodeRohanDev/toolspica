import type { ToolContent } from "./types";

export const faviconGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a Complete Favicon Package for Any Website",
  overview: [
    "A modern website needs more than just a single favicon.ico — browsers, iOS home screen bookmarks, and Android app shortcuts each expect their own specific icon size and format, and missing any of them means a broken or missing icon in that specific context.",
    "This tool generates the complete standard set from a single source image: favicon.ico (bundling 16, 32, and 48px sizes), individual 16×16 and 32×32 PNG favicons, a 180×180 apple-touch-icon for iOS home screen bookmarks, 192×192 and 512×512 Android Chrome icons, and a site.webmanifest file referencing them correctly — all packaged into one downloadable ZIP.",
    "The generated favicon.ico uses the same independently-verified ICO writer as this site's dedicated ICO Converter tool, and the web manifest follows the standard format browsers expect for progressive web app icon references.",
    "This is useful for setting up complete favicon coverage for a new website, replacing an incomplete or outdated favicon setup, ensuring your site's icon displays correctly across every browser and device context, and general website launch preparation.",
  ],
  howItWorks: [
    {
      title: "Upload your logo or icon image",
      description: "Ideally square, for the cleanest results at every size.",
    },
    {
      title: "Every standard size renders automatically",
      description: "Previewed so you can see each size before downloading.",
    },
    {
      title: "Download the complete package as a ZIP",
      description: "Includes favicon.ico, every PNG size, apple-touch-icon, and site.webmanifest.",
    },
  ],
  examples: [
    {
      label: "Setting up favicons for a new website",
      input: "logo.png",
      output: "A ZIP with favicon.ico, 5 PNG sizes, apple-touch-icon.png, and site.webmanifest",
    },
  ],
  faqs: [
    {
      question: "Where do these files go on my website?",
      answer:
        "Typically in your site's root directory (or public folder, depending on your framework), referenced from your HTML's <head> with appropriate <link> tags for each file — favicon.ico is often picked up automatically, while the others usually need explicit link tags pointing to their paths.",
    },
    {
      question: "What is the site.webmanifest file for?",
      answer:
        "It's a JSON file that tells browsers (particularly on Android) which icons to use when a user adds your site to their home screen as a shortcut or installs it as a progressive web app — referencing the 192px and 512px icon sizes included in this package.",
    },
    {
      question: "Why do I need an apple-touch-icon specifically?",
      answer:
        "iOS uses a different convention than favicon.ico for home screen bookmarks — without a properly sized (180×180) apple-touch-icon, iOS falls back to taking a screenshot of your page as the bookmark icon instead of using your actual logo.",
    },
    {
      question: "Do I need to customize the webmanifest file after downloading?",
      answer:
        "Likely yes for the app name and theme colors — the generated manifest includes reasonable defaults, but you may want to edit the name, theme_color, and background_color fields to match your specific site before deploying it.",
    },
    {
      question: "Is my image uploaded anywhere to generate these files?",
      answer:
        "No — every icon size, the .ico file, and the ZIP packaging all happen entirely in your browser. Your image is never uploaded to a server.",
    },
  ],
};
