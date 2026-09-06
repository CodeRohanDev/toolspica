import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "crop-image",
  lang: "en",
  title: "The Cropping Mistake That Makes Profile Pictures Look Off-Center",
  description:
    "A quick guide to cropping photos properly for square profile pictures and social posts, without the off-center or stretched look.",
  sections: [
    {
      heading: "Why a platform's own auto-crop rarely gets it right",
      body: [
        "Upload a rectangular photo somewhere that displays it square — a profile picture, a marketplace thumbnail, a grid post — and most platforms will auto-crop it for you. The problem is that automatic crop almost always centers on the geometric middle of the frame, not on the actual subject, which is why so many auto-cropped photos end up with a face cut off at the chin or shifted awkwardly to one side.",
        "Cropping the image yourself before uploading fixes this at the source: you decide exactly what stays in frame, instead of leaving it to an algorithm that has no idea what actually matters in your photo.",
      ],
    },
    {
      heading: "Fixed aspect ratios exist for a reason — use them",
      body: [
        "A freeform crop gives you full control over the rectangle's shape, which is exactly the wrong tool when the destination expects a specific ratio. A profile picture wants a perfect square (1:1); a video thumbnail usually wants 16:9; a phone wallpaper has its own set proportions. Locking to the correct fixed ratio while you drag the crop selection guarantees the output fits its destination exactly, instead of getting squished or letterboxed after upload because the shape was slightly off.",
        "When you're not sure what ratio a platform expects, a quick search for \"[platform name] image size\" almost always turns up the exact pixel dimensions and ratio to target.",
      ],
    },
    {
      heading: "Cropping small doesn't mean cropping blurry",
      body: [
        "A common worry is that cropping a small area out of a large photo will produce a low-quality result — but that's not automatically true. A good crop tool exports at the full resolution of the selected area from the original source image, not from whatever size the preview happened to display on screen. Cropping a small section from a high-resolution original photo can still produce a perfectly sharp result, as long as the cropped area itself contained enough real pixel detail to begin with.",
        "Where quality actually suffers is cropping a small area from an already low-resolution image — there, you're limited by how much detail existed in that region in the first place, and no crop tool can invent detail that was never captured.",
      ],
    },
    {
      heading: "One crop, then reuse it everywhere it fits",
      body: [
        "If you need the same photo in multiple square or standard-ratio slots across different platforms, crop it once to the right proportions and keep that cropped version as your new source for everything that shares the same ratio, rather than re-cropping from the original photo each time and risking a slightly different framing on each platform.",
        "This also makes it easy to keep a consistent look across a set of photos — a profile picture, a thumbnail, and a listing image that all use the same crop will visually match each other, instead of looking like three separately-framed shots of the same subject.",
      ],
    },
  ],
  faqs: [
    {
      question: "Why does my auto-cropped profile picture always look off?",
      answer:
        "Automatic cropping centers on the geometric middle of the photo, not the actual subject — which is why faces often end up cut off or shifted to one side. Cropping manually before uploading lets you choose exactly what stays in frame.",
    },
    {
      question: "Does cropping a small area reduce image quality?",
      answer:
        "Not inherently — a good crop tool exports the selected area at the original image's full resolution, not the preview's display size. Quality only suffers if the source region itself didn't have much detail to begin with, such as cropping tightly from an already low-resolution photo.",
    },
    {
      question: "Should I always use a fixed aspect ratio when cropping?",
      answer:
        "Use one whenever the destination expects a specific shape — a square profile picture, a 16:9 thumbnail — so the result fits exactly without being stretched or letterboxed later. Freeform cropping makes sense only when there's no specific ratio requirement to match.",
    },
  ],
};
