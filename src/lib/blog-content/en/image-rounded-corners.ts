import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-rounded-corners",
  lang: "en",
  title: "Rounded Corners on an Image File, Not Just on a Webpage",
  description:
    "CSS border-radius only works on a live webpage — here's how to bake rounded corners into the actual image file for anywhere else it needs to go.",
  sections: [
    {
      heading: "The CSS trick that only works in one specific place",
      body: [
        "If you're a developer, the instinct is to reach for CSS `border-radius` the moment an image needs rounded corners — and that's the right call when the image is displayed on a webpage you control. The problem shows up the moment that same image needs to go somewhere CSS can't follow: a PDF, a slide deck, an app icon submission, a printed flyer, or any platform where you upload a raw image file and it gets displayed by someone else's styling, not yours.",
        "In all of those cases, the underlying image file is still a plain rectangle no matter what CSS says about it in one specific browser context. What's actually needed is a tool that changes the image file itself.",
      ],
    },
    {
      heading: "How baking it into the file actually works",
      body: [
        "This works by clipping the image using a rounded-rectangle path drawn on canvas, cutting away everything outside that shape. Since a rounded rectangle's corners are, by definition, no longer covered by the image once clipped, those four corner areas become transparent — which is exactly why the output always comes out as PNG, the format that actually supports transparency, regardless of whether you uploaded a JPG.",
        "This is a genuinely different mechanism from a CSS-only rounded corner, which just visually clips the display without touching the underlying file at all — you can tell the difference immediately by opening the exported file directly: a CSS-rounded image opens as a plain rectangle in an image viewer, while this tool's output shows the actual rounded, transparent-cornered shape.",
      ],
    },
    {
      heading: "Getting a perfect circle instead of just rounded corners",
      body: [
        "On a square image, there's a specific radius value — exactly half the image's width — that turns rounded corners into a full circle, the classic look for a profile picture or avatar. Push the radius any further than that and you'd get an invalid, distorted shape, so the tool caps the maximum radius at exactly that mathematical limit, meaning you can slide all the way to \"fully rounded\" without ever landing on a broken result.",
        "For a non-square image, the same slider produces an oval rather than a perfect circle at maximum radius, since the cap is based on the shorter of the two dimensions — worth knowing if a perfect circle specifically is the goal, in which case starting from a square crop first gets you there.",
      ],
    },
    {
      heading: "When this matters more than it seems",
      body: [
        "Profile pictures and avatars are the obvious case, but this shows up constantly in less obvious places too: a product thumbnail going into a PDF catalog, an app icon being submitted to a store that expects a specific rounded shape baked into the file, or a set of images going into a presentation deck where you want consistent, softened corners across every slide without manually configuring shape effects in the slide software itself.",
      ],
    },
  ],
  faqs: [
    {
      question: "Why does my rounded image always come out as a PNG, even if I uploaded a JPG?",
      answer:
        "Rounding the corners cuts away the image's original corner areas, and those cut-away areas become transparent. JPG can't represent transparency at all, so the result is always exported as PNG, which properly supports it.",
    },
    {
      question: "Can I make a perfectly circular profile picture with this?",
      answer:
        "Yes, on a square image — setting the radius to exactly half the image's width produces a perfect circle, and the tool automatically caps the radius at that point so you can't push it into a distorted shape.",
    },
    {
      question: "Does adding rounded corners crop or resize the image?",
      answer:
        "No — the overall dimensions stay exactly the same. Only the four corner areas outside the rounded shape become transparent; nothing in the center is cropped or resized.",
    },
  ],
};
