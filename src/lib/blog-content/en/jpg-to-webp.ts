import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "jpg-to-webp",
  lang: "en",
  title: "The One Image Change That Actually Speeds Up a Slow Website",
  description:
    "Converting JPG images to WebP is one of the highest-payoff, lowest-effort fixes for a slow-loading website. Here's why it works.",
  sections: [
    {
      heading: "Why images are usually the real reason a page feels slow",
      body: [
        "Run almost any website through a speed test and the biggest chunk of load time is usually images — not JavaScript, not the server response, just the raw bytes of photos being downloaded before the page feels finished. It's an easy thing to overlook because the images themselves aren't broken; they just weren't optimized before being uploaded, so every visitor downloads a file two or three times larger than it needs to be.",
        "This matters beyond just feeling slow — page speed is a measurable input into Google's ranking systems through Core Web Vitals, and a heavy hero image is one of the most common causes of a poor Largest Contentful Paint score specifically.",
      ],
    },
    {
      heading: "Why WebP specifically, and not just \"compress the JPG more\"",
      body: [
        "You can always squeeze a JPG smaller by lowering its quality setting, but past a certain point that starts visibly degrading the image — blotchy skies, mushy text, blocky compression artifacts. WebP's advantage is that it achieves meaningfully smaller files at the *same* visual quality, using a more modern compression algorithm than JPEG's decades-old approach. Google's own published benchmarks put the typical savings at 25-35% smaller for comparable quality — a genuinely free size reduction, not a quality trade-off.",
        "Browser support used to be the objection to using WebP on a public site, but that concern is genuinely outdated now — every major browser has supported displaying WebP since 2020 or earlier, which covers effectively all real-world traffic today.",
      ],
    },
    {
      heading: "The safe way to roll this out without breaking anything",
      body: [
        "The common, low-risk pattern is to keep your original JPGs and add WebP alongside them using an HTML `<picture>` element — browsers that support WebP get the smaller file automatically, and anything that somehow doesn't falls back to the JPG with zero visible difference to the visitor. This means you don't have to fully commit to replacing your JPGs or risk breaking an edge case you haven't tested.",
        "For a smaller site or a one-off image, simply converting the specific images that matter most for load speed (typically the largest hero/banner images above the fold) delivers most of the benefit without touching your whole image library at once.",
      ],
    },
    {
      heading: "What to check after converting",
      body: [
        "Quality settings around 80% and above are where the WebP-vs-JPEG difference becomes genuinely hard to spot with the naked eye, while still capturing most of the file-size benefit — there's rarely a reason to go much lower unless you're specifically chasing an extreme size target and are willing to trade some visible quality for it.",
      ],
    },
  ],
  faqs: [
    {
      question: "Will converting to WebP actually improve my search ranking?",
      answer:
        "Indirectly — smaller images improve page load speed and Core Web Vitals metrics, which Google's ranking systems do factor in, but image format alone is one signal among many rather than a guaranteed ranking boost by itself.",
    },
    {
      question: "Do I need to replace all my JPGs, or can I just convert the important ones?",
      answer:
        "Converting just your largest, most load-time-critical images (hero banners, above-the-fold photos) delivers most of the practical benefit — you don't need to convert your entire image library in one pass to see a real difference.",
    },
    {
      question: "Is it safe to delete my original JPGs after converting to WebP?",
      answer:
        "It's generally safer to keep both and serve WebP with a JPG fallback via a `<picture>` element, rather than fully committing to WebP only — this protects against any edge case or older tool that still expects a JPG.",
    },
  ],
};
