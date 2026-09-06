import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-compressor",
  lang: "en",
  title: "Why Your Website Feels Slow (and How Image Compression Fixes It)",
  description:
    "Uncompressed photos are usually the single biggest reason a website or upload feels slow. Here's how to fix that without losing visible quality.",
  sections: [
    {
      heading: "The file size nobody notices until it's a problem",
      body: [
        "A photo straight off a modern phone camera routinely lands between 3MB and 8MB. That's fine sitting in your camera roll, but the moment it becomes a website hero image, an email attachment, or a form upload with a size cap, that same file becomes the bottleneck — a page with five uncompressed photos can easily ship 20-30MB down to a visitor's phone before they've read a single word.",
        "The frustrating part is that almost none of that extra size buys you anything visible. A compressed version at a fraction of the size looks identical on a phone or laptop screen in a normal side-by-side comparison — the difference only shows up in a file browser's size column, not in your eyes.",
      ],
    },
    {
      heading: "Why compression can cut 80-90% off a photo with no visible loss",
      body: [
        "Photos are full of visual information your eye can't actually resolve — subtle gradients between similar colors, fine texture noise, detail below the threshold of what a screen or your vision can distinguish at normal viewing size. Compression algorithms are specifically built to identify and discard exactly that invisible information first, which is why the size drop is so dramatic before quality loss becomes noticeable.",
        "This is why the same photo compressed at 70-80% quality can go from 4MB to 400KB and still look essentially the same on screen — you're not losing detail you'd have actually seen, you're losing detail nobody was ever going to look at closely enough to notice.",
      ],
    },
    {
      heading: "WebP vs JPEG isn't just a format preference anymore",
      body: [
        "For years JPEG was the only realistic choice for photos on the web. WebP has changed that: at equivalent visual quality, WebP files typically end up smaller than JPEG, and every modern browser supports it now, which wasn't true even a few years ago. If your only reason for sticking with JPEG is habit rather than a specific compatibility requirement, WebP is worth trying first — you'll usually get a meaningfully smaller file for the same look.",
        "JPEG still earns its place when you need maximum compatibility with older software, specific print workflows, or systems that haven't caught up to WebP support yet.",
      ],
    },
    {
      heading: "One mistake that quietly undoes all of this",
      body: [
        "JPEG and WebP are both lossy formats, meaning every time you save through them, a little more information gets discarded — permanently. Compressing an image, editing it, and re-compressing the result repeatedly causes real, cumulative quality loss that becomes visible eventually, even though each individual pass looked fine.",
        "The fix is a simple habit: always compress from your original, highest-quality source file, not from a previously compressed copy. Keep the original somewhere safe if you think you'll need to re-process it differently later — a slightly larger backup folder is a small price compared to permanently losing quality you can't get back once it's discarded.",
      ],
    },
  ],
  faqs: [
    {
      question: "What quality percentage should I actually use?",
      answer:
        "70-80% is a strong default for photos — it usually cuts file size dramatically with essentially no visible difference. Go lower for thumbnails and background images where quality matters less, and higher when fine detail genuinely needs to survive close inspection.",
    },
    {
      question: "Does compressing an image more than once keep making it worse?",
      answer:
        "Yes — since JPEG and WebP are lossy, each re-compression discards additional information permanently. Always work from your original file rather than re-compressing an already-compressed copy repeatedly.",
    },
    {
      question: "Is WebP always better than JPEG?",
      answer:
        "For file size at equivalent visual quality, usually yes, and browser support is no longer a practical concern. Stick with JPEG only if you have a specific compatibility requirement with older software that doesn't support WebP.",
    },
  ],
};
