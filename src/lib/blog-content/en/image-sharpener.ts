import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-sharpener",
  lang: "en",
  title: "Can You Actually Fix a Blurry Photo? What Sharpening Really Does",
  description:
    "Sharpening can rescue a slightly soft photo but not a genuinely out-of-focus one — here's the difference and how to use it well.",
  sections: [
    {
      heading: "The one myth worth clearing up first",
      body: [
        "Sharpening tools get asked to do something they mathematically can't: recover detail from a photo that was genuinely out of focus when it was taken. If the camera never captured a sharp edge in the first place, no amount of processing can invent one — that detail simply doesn't exist in the pixel data to recover. What sharpening actually does is different, and still genuinely useful: it boosts the contrast right at existing edges, making the transition between light and dark areas crisper and more defined.",
        "This distinction matters because it sets the right expectation. A photo that's mildly soft — from a slight camera shake, a bit of resizing, or JPEG compression smoothing things over — responds well to sharpening. A photo that's genuinely blurry because the subject was out of focus generally won't improve enough to matter, no matter how far you push the slider.",
      ],
    },
    {
      heading: "How the effect is actually calculated",
      body: [
        "Underneath, this works using a standard 3x3 convolution kernel — a small, well-established image-processing technique that examines each pixel against its immediate neighbors. Where a pixel differs noticeably from what's around it (an edge), the difference gets amplified. Where the surrounding area is flat and uniform (open sky, a plain wall, smooth skin), nothing much changes, since there's no edge contrast there to boost in the first place.",
        "This is why sharpening tends to make an image feel more \"defined\" rather than uniformly different — it's selectively working on boundaries, not applying a blanket effect across every pixel.",
      ],
    },
    {
      heading: "The over-sharpening trap, and how to spot it",
      body: [
        "Push the strength too far and you start seeing halos — faint light or dark outlines hugging the edges of objects, along with an overall grainy, artificial harshness that reads as \"processed\" rather than genuinely crisp. This is the most common mistake with sharpening: treating more strength as always better, when really the goal is the smallest amount that noticeably helps.",
        "A practical way to judge it: zoom to 100% and compare the sharpened result against the original side by side. If edges look genuinely cleaner without visible halos or added noise, you've found a good setting. If the image starts looking gritty or the edges look like they have an outline, back the strength down.",
      ],
    },
    {
      heading: "When to sharpen in your workflow",
      body: [
        "If you're also resizing the image, sharpen after resizing, not before — resizing itself introduces a small amount of softness, and sharpening the final output dimensions gives a more predictable, appropriately-scaled result than sharpening at the original size and then shrinking it (which can undo some of the effect) or enlarging it (which can exaggerate artifacts). This ordering matters more than people expect and is a common reason a \"sharpened\" image still looks soft after being resized down for the web.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can sharpening fix a photo that's genuinely out of focus?",
      answer:
        "Not really — sharpening boosts contrast at existing edges, it doesn't recover detail the camera never captured due to real focus blur. It works well on mildly soft images, not significantly out-of-focus ones.",
    },
    {
      question: "How do I know if I've sharpened too much?",
      answer:
        "Watch for halos (faint light or dark outlines around edges) and an overall grainy, artificial look. If the image starts looking gritty or processed rather than genuinely crisper, dial the strength back down.",
    },
    {
      question: "Should I sharpen before or after resizing an image?",
      answer:
        "Sharpen after resizing. Resizing itself introduces a small amount of softness, so sharpening the final output size gives more predictable results than sharpening first and resizing afterward.",
    },
  ],
};
