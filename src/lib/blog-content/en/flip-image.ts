import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "flip-image",
  lang: "en",
  title: "Why the Text in Your Selfie Reads Backwards (and How to Fix It)",
  description:
    "Front-camera photos often come out mirrored. Here's why that happens, and the real difference between flipping and rotating an image.",
  sections: [
    {
      heading: "The mirror effect nobody asked for",
      body: [
        "Take a selfie with text visible somewhere in frame — a t-shirt logo, a sign in the background, a book cover — and it's a coin flip whether that text reads correctly or backwards in the saved photo. This isn't a bug, exactly: many front-facing cameras display and sometimes save a horizontally mirrored version by default, because a mirror image feels natural while you're framing the shot (it moves the way a real mirror would). The trade-off is that anything with actual text or asymmetric detail comes out reversed.",
        "A horizontal flip corrects this back to how the scene actually looked in real life — the fix is fast, but only if you flip in the right direction, which is worth understanding rather than guessing.",
      ],
    },
    {
      heading: "Flipping and rotating look similar but aren't",
      body: [
        "It's easy to mix these two up since both change an image's orientation, but they do fundamentally different things. Rotating spins the image around its center point while keeping its left-to-right reading direction intact — rotate a page of text 90 degrees and it's sideways, but every letter is still correctly shaped, just tilted. Flipping mirrors the image across an axis, reversing that reading direction entirely — flip that same page of text and every letter becomes backwards, like reading it in a mirror.",
        "This is exactly why a mirrored selfie needs a flip, not a rotation — rotating it any amount would never fix backwards text, since rotation never reverses the underlying reading direction that's actually broken.",
      ],
    },
    {
      heading: "What happens when you flip both directions at once",
      body: [
        "Flipping horizontally and vertically at the same time produces the same result as rotating the image 180 degrees — every point in the image ends up diagonally opposite from where it started. This is a genuinely useful shortcut to know if you ever need a 180-degree turn and only have flip controls available, though a dedicated rotate tool is more direct when that's specifically what you're after.",
      ],
    },
    {
      heading: "One thing flipping won't fix",
      body: [
        "If your source is an animated GIF, flipping typically only affects a single frame rather than the whole animation, since flipping every frame correctly requires processing each one individually rather than treating the file as one static image. If you need a flipped animated GIF, look for a tool that specifically handles animated content frame-by-frame rather than a general-purpose static image flipper.",
        "The same caveat applies to any other multi-frame or layered image format — a static-image flip tool is built around the assumption that a file represents one visible frame, and anything with additional hidden frames or layers needs a format-aware tool instead.",
      ],
    },
  ],
  faqs: [
    {
      question: "Why does my front-camera photo look mirrored?",
      answer:
        "Many phone and webcam front cameras display and sometimes save a horizontally mirrored preview by default, since it feels natural like looking in a mirror while framing the shot — but that means any text or asymmetric detail in the photo reads backwards until corrected.",
    },
    {
      question: "What's actually different between flipping and rotating?",
      answer:
        "Rotating spins an image around its center while keeping its reading direction intact — rotated text still reads correctly, just sideways. Flipping mirrors the image across an axis, reversing that direction entirely, which is why flipped text reads backwards.",
    },
    {
      question: "Can I flip an animated GIF and keep it animated?",
      answer:
        "A general-purpose flip tool typically only processes a single static frame, not the full animation. Flipping an animated GIF correctly across every frame needs a tool built specifically for animated content.",
    },
  ],
};
