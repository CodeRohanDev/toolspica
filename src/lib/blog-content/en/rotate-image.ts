import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "rotate-image",
  lang: "en",
  title: "Why a Photo Still Shows Sideways After You \"Fix\" the Rotation",
  description:
    "A quick explanation of why rotated photos sometimes revert, and how to permanently bake a rotation into the actual image file.",
  sections: [
    {
      heading: "The rotation that only exists on your screen",
      body: [
        "This happens to almost everyone at some point: you rotate a sideways photo in one app, it looks correct there, then you send it somewhere else and it's sideways again. The usual cause is that some apps only apply a visual rotation for display purposes — a CSS-style transform, or a metadata flag telling that specific app how to display the image — without actually changing the pixel data in the file itself. Open the same file in a different program that doesn't read that flag, and you're back to sideways.",
        "A real fix means the rotation is baked into the actual pixel data of the exported file, so it displays correctly everywhere, in every program, on every device — not just in the one app that happened to read the rotation flag correctly.",
      ],
    },
    {
      heading: "Why 90-degree rotation buttons cover almost every real case",
      body: [
        "Sideways and upside-down photos are overwhelmingly the two problems people actually run into — a phone held vertically when the camera expected horizontal, or a scan that fed through backwards. Both of these are fixed by a 90-degree or 180-degree rotation, which is why three simple buttons (left, right, 180°) cover the vast majority of real-world rotation needs without any fiddly angle input.",
        "A properly built rotation tool also swaps the image's width and height automatically on a 90-degree turn — a 1920×1080 landscape photo correctly becomes 1080×1920 after rotating, not a distorted image squeezed into the original landscape frame, which is a mistake some naive implementations make.",
      ],
    },
    {
      heading: "When 90-degree presets aren't the right tool",
      body: [
        "A photo that's tilted by a few degrees — a slightly crooked scan, a horizon line that isn't quite level — isn't a rotation problem in the 90/180-degree sense, and forcing it through those presets won't fix a small tilt. That's a job for a tool that accepts an arbitrary angle with a live preview, letting you dial in exactly 3 degrees or whatever small correction is actually needed, rather than only jumping in 90-degree increments.",
      ],
    },
    {
      heading: "Rotating repeatedly doesn't stack up quality loss the way you'd think",
      body: [
        "Rotation itself doesn't discard visual detail the way lossy compression does — it's a geometric rearrangement of pixels, not a quality trade-off. What can add up is repeated JPEG re-encoding each time you save, since JPEG is lossy on every save regardless of what edit you made. If you're only rotating (not making other edits), the visible difference after a few rotations is usually negligible, especially at a high export quality setting.",
        "A tool that falls back to PNG output when it can't safely re-encode your original format is protecting you here too, since PNG's lossless save means a rotation-only edit never introduces new compression loss even when the source format doesn't round-trip cleanly.",
      ],
    },
  ],
  faqs: [
    {
      question: "Why does my photo look correct in one app but sideways in another?",
      answer:
        "Some apps apply rotation as a display-only setting or metadata flag rather than changing the actual pixel data. A different app that doesn't read that same flag will show the original, unrotated orientation. A tool that bakes the rotation into the pixels fixes this everywhere.",
    },
    {
      question: "Will 90-degree rotation fix a slightly crooked photo?",
      answer:
        "No — 90 and 180-degree presets only handle exact quarter and half turns. A small tilt (a few degrees) needs a tool that accepts an arbitrary rotation angle with a live preview instead.",
    },
    {
      question: "Does rotating an image reduce its quality?",
      answer:
        "Rotation itself is just a geometric rearrangement and doesn't discard detail. Any quality change comes from re-encoding a lossy format like JPEG on each save, which is a separate, usually minor effect at a reasonable export quality.",
    },
  ],
};
