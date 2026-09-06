import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "ico-viewer",
  lang: "en",
  title: "A .ico File Isn't One Icon — It's Several, Bundled Together",
  description: "Opening a favicon.ico shows one size in most viewers. Here's what's actually packed inside, and why it matters for web development.",
  sections: [
    {
      heading: "Why your icon viewer only ever shows one size",
      body: [
        "Open a .ico file in a typical image viewer and you'll see a single icon. That's misleading about what the file actually contains: an .ico is a container format that bundles multiple resolutions of the same icon into one file — commonly 16×16, 32×32, and 48×48, sometimes larger — so that whatever's displaying it (a browser tab, a bookmark bar, a desktop shortcut) can pick the size that actually fits, rather than scaling one image up or down and losing sharpness.",
        "Most viewers just show you the first or largest entry and quietly hide the rest, which is exactly why a dedicated .ico inspector is useful the moment you actually need to know what's packed inside — checking a favicon before deploying it, verifying a client-provided icon file has enough size variants, or debugging why a site's tab icon looks blurry at one specific size.",
      ],
    },
    {
      heading: "Two icon encodings living inside the same file format",
      body: [
        "Here's a detail that trips people up: not every entry inside an .ico file is stored the same way. Larger, more modern icon sizes are typically PNG-encoded — modern compression, previews cleanly in any tool that understands the format. Smaller, legacy sizes are frequently stored using the original ICO specification's raw bitmap format instead, a decades-old encoding that predates PNG entirely and needs more specialized decoding to render visually.",
        "This is why a good .ico inspection tool shows a live preview for the PNG-encoded entries but lists size and bit-depth metadata (without a visual render) for the raw-bitmap ones — it's not a limitation of the tool so much as an accurate reflection of how mixed the format actually is internally.",
      ],
    },
    {
      heading: "Why this matters for building a proper favicon",
      body: [
        "A well-built favicon.ico bundling 3-5 sizes covers every context it needs to: a small size for a crowded browser tab bar, a mid-size for bookmarks, a larger size for a desktop shortcut or high-DPI display. Ship an .ico with only one embedded size, and you'll get a blurry, upscaled or downscaled icon in at least some of those contexts, even though the file technically \"has a favicon.\" Checking what's actually bundled before deploying catches this before a user ever notices.",
      ],
    },
    {
      heading: "Pulling out just the one size you actually need",
      body: [
        "Sometimes you don't want the whole bundle — you just need one specific resolution as a standalone file, say for a design mockup or a different platform's icon requirement. For any PNG-encoded entry, once you can see it rendered as a live preview, saving that single image directly gives you exactly that one size on its own, without needing separate software to unpack the full .ico container.",
      ],
    },
  ],
  faqs: [
    {
      question: "Why don't some entries in my .ico file show a preview?",
      answer: "Smaller, legacy icon sizes are often stored in the original ICO specification's raw bitmap format rather than PNG. PNG-encoded entries (common for larger sizes) preview reliably; raw-bitmap entries show their size and bit-depth metadata instead of a rendered image.",
    },
    {
      question: "How many resolutions can one .ico file actually contain?",
      answer: "There's no fixed limit in the format itself — a well-built favicon.ico commonly bundles 3-5 sizes, like 16×16, 32×32, and 48×48, so different display contexts each get an appropriately sized icon.",
    },
    {
      question: "Can I extract just one size as a separate file?",
      answer: "For PNG-encoded entries, yes — once it's rendered as a preview, right-click and save it directly to get that one resolution as a standalone PNG.",
    },
  ],
};
