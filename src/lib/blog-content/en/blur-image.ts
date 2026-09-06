import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "blur-image",
  lang: "en",
  title: "Blurring an Image for Privacy? Here's What Actually Keeps It Hidden",
  description:
    "Not all blur is equally private. What actually happens when you blur an image, and why a light blur isn't always enough to hide something for good.",
  sections: [
    {
      heading: "The most common reason people reach for a blur tool",
      body: [
        "Screenshots get shared constantly — a bug report, a receipt for an expense claim, a chat conversation posted for advice — and almost every one of them has something in it that shouldn't go public: a license plate in the background, a full name, an account number, fine print that wasn't meant to be read. Blurring that one detail before sharing is faster than cropping the whole image or editing it in a design tool, and it lets the rest of the screenshot stay intact and useful.",
        "A blur tool exists for exactly that quick, targeted job, plus a few other common uses — softening a busy background so a subject stands out, or creating a soft placeholder version of an image for a page that's still loading.",
      ],
    },
    {
      heading: "What blur actually does to the pixels",
      body: [
        "A real blur effect averages each pixel with its neighboring pixels, spreading sharp edges and fine detail into a smooth, soft gradient. The strength setting controls the radius of that averaging in pixels — a small radius gives a subtle softening, while a large radius can make fine text or detail almost completely unreadable, which is the point when you're using blur specifically to hide something rather than just to soften it.",
        "This is a genuine, permanent pixel transformation baked into the exported file, not a filter effect that only shows in one app — the blur will look the same whether the image is opened in a browser, a photo viewer, or printed out.",
      ],
    },
    {
      heading: "Where a light blur can actually fail as privacy protection",
      body: [
        "This is the part that catches people off guard: a light-to-moderate blur doesn't destroy the underlying information as completely as it looks like it does. Deconvolution techniques and modern AI-based sharpening tools can partially reverse a mild blur, especially on predictable content like text with a limited character set or simple geometric shapes — the blur spreads the signal, but for simple enough content, some of that signal can be mathematically recovered.",
        "For anything genuinely sensitive — a document number, a face that must stay anonymous, a password visible on a screen — the safer choice is a strong blur radius that pushes well past \"softened\" into \"unrecognizable,\" or better yet, a solid opaque box covering the area entirely. A solid box has zero information to recover; a light blur has some, even if it doesn't look like it to the naked eye.",
      ],
    },
    {
      heading: "One limit worth knowing before you rely on it",
      body: [
        "A standard blur tool applies the effect uniformly across the entire image — it doesn't let you select just a face or a license plate and leave everything else sharp. If you need the rest of the image to stay crisp while hiding one specific region, that's a different, region-based redaction tool, not a whole-image blur. Applying full-image blur when you only meant to hide one corner will soften the whole screenshot, which usually isn't what you actually want.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can someone un-blur what I've hidden?",
      answer:
        "For a light or moderate blur, sometimes partially — deconvolution and AI-sharpening techniques can recover some of the original signal, especially for predictable content like text. For anything genuinely sensitive, use a strong blur or a solid opaque box instead.",
    },
    {
      question: "Can I blur just one part of an image, like a face, and leave the rest sharp?",
      answer:
        "Not with a whole-image blur tool — it applies the effect uniformly across the entire image. Selective, region-based blurring (blurring just a face or license plate) needs a different kind of tool built for that specific task.",
    },
    {
      question: "Does blurring reduce the file size of my image?",
      answer:
        "Often yes, particularly for JPEG output — a blurred image has less fine detail, which compresses more efficiently, so the result can end up noticeably smaller than the sharp original at the same quality setting.",
    },
  ],
};
