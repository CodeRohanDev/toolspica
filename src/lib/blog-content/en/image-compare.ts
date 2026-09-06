import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-compare",
  lang: "en",
  title: "How to Actually Spot What Changed Between Two Nearly Identical Images",
  description:
    "Comparing two images by eye misses subtle changes constantly — a pixel-diff tool catches what a side-by-side glance won't.",
  sections: [
    {
      heading: "Why \"looks the same to me\" isn't good enough",
      body: [
        "A designer sends over \"just a small tweak\" to a layout, or a re-exported image from a build pipeline is supposed to be identical to the last one. Flicking your eyes back and forth between two images to spot the difference works for an obvious change — a moved button, a different headline — but fails constantly for subtle ones: a color shifted by a few shades, a single icon swapped, a one-pixel alignment change that throws off a whole row. Human eyes are bad at exact pixel comparison; they're good at gist, which is exactly the opposite of what this task needs.",
        "A pixel-diff tool removes the guessing entirely — it checks every single pixel position and tells you precisely where the two images differ, not roughly where they might.",
      ],
    },
    {
      heading: "Why the diff shows as red on dimmed grayscale",
      body: [
        "The visual design of a good diff output matters as much as the comparison logic itself. Showing changed pixels in bright red against a dimmed, grayscale version of the original gives you both pieces of information at once: where the change happened (the red) and the surrounding context of what it's part of (the muted original underneath). A diff that just shows red pixels on a black background tells you something changed, but not where that sits within the actual image — you lose the map.",
      ],
    },
    {
      heading: "The one requirement people forget: matching dimensions",
      body: [
        "A pixel-by-pixel comparison only makes sense when both images are the same size — the tool is checking position (0,0), then (0,1), and so on, against the corresponding position in the other file, and there's no meaningful way to do that if one image is a different resolution than the other. This trips people up most often when comparing a resized export against an original, or two screenshots taken at slightly different browser zoom levels. If your two images don't match in dimensions, resize one to match the other first — otherwise the comparison can't run at all, or will compare the wrong pixels against each other.",
      ],
    },
    {
      heading: "Reading the percentage, not just the picture",
      body: [
        "The diff percentage is often more useful than the visual output itself when you're checking many images at once — a build pipeline verification, or a batch of exported assets. A 0% result means genuinely identical; anything above a fraction of a percent is worth a look, and anything above a few percent almost certainly represents a real, visible change. Very small nonzero percentages (well under 1%) are frequently just re-encoding noise — a JPEG re-compressed at a slightly different quality setting will register tiny pixel differences everywhere even though nothing meaningful changed visually.",
      ],
    },
  ],
  faqs: [
    {
      question: "Why do my two images need to be exactly the same size?",
      answer:
        "The comparison checks each pixel position directly against the same position in the other image. Without matching dimensions, there's no consistent way to align the two images for a meaningful position-by-position comparison.",
    },
    {
      question: "Can I compare a PNG against a JPEG version of the same image?",
      answer:
        "Yes — the comparison works on decoded pixel data regardless of the source file format, though re-encoding to JPEG can itself introduce small compression artifacts that show up as minor flagged differences even when nothing was intentionally changed.",
    },
    {
      question: "Are my images uploaded anywhere to compare them?",
      answer:
        "No — the entire comparison runs locally in your browser using canvas pixel data. Neither image is ever uploaded to a server.",
    },
  ],
};
