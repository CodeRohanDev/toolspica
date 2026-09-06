import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "svg-to-png",
  lang: "en",
  title: "Why That Vector Logo Won't Upload Where a Regular Image Would",
  description:
    "SVG files scale to any size perfectly, but plenty of platforms only accept raster images. Here's how to convert one without losing transparency.",
  sections: [
    {
      heading: "Two completely different ways of describing an image",
      body: [
        "A PNG or JPG is a fixed grid of colored dots — however many pixels the file has, that's genuinely all the detail that exists. An SVG is nothing like that: it's a set of mathematical instructions describing shapes, curves, and fills, which is why a vector logo looks exactly as crisp printed on a business card as it does blown up across a billboard. Neither approach is objectively better; they're built for different jobs.",
        "The friction shows up the moment you try to upload an SVG somewhere that only understands the pixel-grid kind of image — a form that validates file types, an older platform, certain social media upload fields, or software that simply doesn't render vector graphics at all.",
      ],
    },
    {
      heading: "What actually happens during the conversion",
      body: [
        "Converting SVG to PNG means rendering those mathematical instructions into an actual grid of pixels at a specific size — essentially taking a snapshot of how the vector would look, then locking that snapshot in permanently. Once that happens, you've traded away the \"scales to any size perfectly\" property for good; the resulting PNG will get blurry if you enlarge it significantly beyond the size it was rendered at, the same as any other raster image.",
        "This is exactly why the conversion should happen as late as possible in your workflow — keep the original SVG as your source of truth, and only generate a PNG version for the specific place that actually requires one, at the size that place actually needs.",
      ],
    },
    {
      heading: "The transparency detail that trips people up",
      body: [
        "Most logos and icons are designed with a transparent background so they sit cleanly on top of whatever's behind them — a colored header, a photo, another design element. PNG is the correct output format for this specifically because it preserves that transparency; converting to JPG instead would force a solid background color behind your logo, which usually isn't what anyone actually wants for a logo asset.",
        "If your converted PNG comes out with an unexpected white or black background where you expected to see through to whatever's underneath, check that the tool you used actually outputs PNG rather than defaulting to a format that can't represent transparency.",
      ],
    },
    {
      heading: "What size PNG should you actually generate?",
      body: [
        "An SVG doesn't have an inherent \"real\" size the way a photo does — it renders at whatever dimensions its width/height or viewBox attributes specify, or whatever size you request. If the destination platform has a specific size requirement (a favicon, an app icon, a specific upload dimension), it's worth generating the PNG at roughly 2x that target size so it stays sharp on high-resolution screens, then letting the destination downscale if needed — upscaling a PNG after the fact never recovers detail that wasn't rendered in the first place.",
      ],
    },
  ],
  faqs: [
    {
      question: "Will my converted PNG stay sharp if I resize it afterward?",
      answer:
        "Enlarging it will introduce blur, since a PNG is a fixed grid of pixels with no more detail than what was rendered — shrinking it down is generally fine, but always convert at a size at least as large as the biggest place you'll use it, not the smallest.",
    },
    {
      question: "Should I keep using the SVG for some things and the PNG for others?",
      answer:
        "Yes — that's the recommended approach. Keep the SVG as your master file for anything that supports vector graphics (websites, most modern design tools), and only generate PNG versions for the specific platforms or forms that require a raster image.",
    },
    {
      question: "What happens to my logo's transparent background during conversion?",
      answer:
        "As long as you're converting to PNG (not JPG), transparency is preserved fully — any see-through areas in the SVG stay see-through in the resulting PNG, since PNG fully supports an alpha transparency channel.",
    },
  ],
};
