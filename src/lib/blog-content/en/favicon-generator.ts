import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "favicon-generator",
  lang: "en",
  title: "Why Your Website's Icon Looks Wrong on Some Devices (and How to Fix It)",
  description:
    "A single favicon.ico isn't enough anymore — here's every icon size a modern site actually needs, and why each one exists.",
  sections: [
    {
      heading: "One favicon used to be enough — it isn't anymore",
      body: [
        "For a long time, dropping a single favicon.ico in your site's root folder was the whole job. That stopped being true once phones, tablets, and progressive web apps entered the picture — a browser tab icon, an iOS home screen bookmark, and an Android app shortcut are three different contexts that each expect their own specifically-sized image, and a site missing any of them either shows a blurry, wrongly-scaled version of your logo or falls back to something generic, like a screenshot of your page instead of your actual icon.",
        "This is why sites that only ever set up the classic favicon.ico often look slightly broken specifically on mobile — the desktop tab looks fine, but the home screen bookmark doesn't.",
      ],
    },
    {
      heading: "What each specific size is actually for",
      body: [
        "The 16×16 and 32×32 PNG sizes cover browser tabs and bookmark bars at different display densities. The 180×180 apple-touch-icon exists specifically because iOS doesn't use favicon.ico for home screen bookmarks at all — without that exact file at that exact size, iOS silently falls back to taking a screenshot of your page and using that as the bookmark icon instead of your logo, which looks unmistakably broken. The 192×192 and 512×512 sizes are for Android's Chrome and any progressive web app install prompt, referenced through a site.webmanifest file that tells the OS which icon to use at which size.",
        "None of these sizes are arbitrary — each maps to a specific real-world display context, which is why generating the full set at once, rather than guessing which ones you'll need, is the safer default.",
      ],
    },
    {
      heading: "The manifest file people forget to actually check",
      body: [
        "The site.webmanifest file is easy to treat as a black box you just drop in and forget, but it's worth actually opening after generating it — it typically ships with placeholder values for your app's name, theme color, and background color, and those show up visibly if a visitor installs your site as a home screen app or PWA. A generic placeholder name showing up on someone's home screen instead of your actual site name is a small but noticeable miss that's easy to fix in two minutes if you remember to check.",
      ],
    },
    {
      heading: "Where these files actually go",
      body: [
        "Generating the files is only half the job — they need to be referenced correctly to work. Most go in your site's public or root directory, with explicit <link> tags in your HTML's <head> pointing to each one (favicon.ico is often auto-detected by browsers if it sits at the root, but the others generally need an explicit tag). Skipping the link tags is a common reason a freshly generated icon set still doesn't show up correctly after deployment — the files exist, but nothing on the page points to them.",
      ],
    },
  ],
  faqs: [
    {
      question: "Why does my site's icon look wrong specifically on iPhone home screens?",
      answer:
        "iOS doesn't use favicon.ico for home screen bookmarks — without a properly sized 180×180 apple-touch-icon, iOS falls back to a screenshot of your page instead of your actual logo.",
    },
    {
      question: "Do I need to edit anything after generating the files?",
      answer:
        "Likely yes — the generated site.webmanifest includes placeholder values for your app name and theme colors that you'll usually want to update to match your actual site before deploying.",
    },
    {
      question: "Is my logo uploaded anywhere to generate these icons?",
      answer:
        "No — every icon size, the .ico file, and the ZIP packaging happen entirely in your browser. Your image is never uploaded to a server.",
    },
  ],
};
