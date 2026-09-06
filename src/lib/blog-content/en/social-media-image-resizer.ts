import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "social-media-image-resizer",
  lang: "en",
  title: "Why Instagram, Facebook, and X Keep Cropping Your Photos Wrong",
  description:
    "Every platform expects a different exact pixel size — here's why letting the platform auto-crop your image almost never goes the way you want.",
  sections: [
    {
      heading: "The auto-crop nobody actually chose",
      body: [
        "Upload a landscape photo to Instagram Stories and watch the top and bottom of your subject vanish, cropped off automatically to force the image into a tall 9:16 frame you didn't design for. This isn't a bug — every platform expects a specific, fixed pixel size for each post type, and if your upload doesn't match, the platform crops it to fit whether you like the result or not. The frustrating part is that the platform's automatic crop has no idea what actually matters in your photo — it just centers and cuts, which works fine when your subject happens to already be centered and fails badly when it isn't.",
      ],
    },
    {
      heading: "The six sizes that actually matter",
      body: [
        "Instagram Post wants a square 1080×1080. Instagram Story wants a tall, full-screen 1080×1920. Facebook Post prefers a wide 1200×630 that displays well in a scrolling feed. X (formerly Twitter) uses a 16:9 widescreen 1600×900. LinkedIn Post is close to Facebook's ratio but sized specifically at 1200×627 for its own feed rendering. YouTube Thumbnail is the standard HD 1280×720. None of these match each other, which is exactly why a single photo taken on your phone rarely fits more than one of these platforms cleanly without some kind of crop.",
      ],
    },
    {
      heading: "\"Cover\" fit vs. stretching — the difference that saves your photo",
      body: [
        "There are two completely different ways to force an image into a target size: stretch it to fill the box exactly (which distorts faces and straight lines the moment the aspect ratio doesn't match), or scale it proportionally so it completely fills the box with no empty space, then crop the overflow to hit the exact dimensions — known as a \"cover\" fit. A resizer using cover fit keeps everything in your photo looking normal, at the cost of cropping some content from whichever edge doesn't match; a resizer that stretches keeps all the content but makes it look warped. For almost every real use case, cover fit is the one you actually want.",
      ],
    },
    {
      heading: "Preparing one photo for several platforms at once",
      body: [
        "A common workflow mistake is resizing an image for Instagram first, then trying to resize that already-cropped square version again for a widescreen platform like YouTube — you're now cropping a crop, and whatever got cut the first time is gone for good. When you know a photo needs to go out across multiple platforms, always start from the original, uncropped source image for each new target size, rather than resizing sequentially from the previous result.",
      ],
    },
  ],
  faqs: [
    {
      question: "Will resizing to a preset stretch or distort my photo?",
      answer:
        "No — a correctly built resizer scales your image proportionally without distorting it, then crops any excess to exactly fill the target dimensions, the same technique professional design tools use rather than a naive stretch-to-fit.",
    },
    {
      question: "What if my subject isn't centered in the original photo?",
      answer:
        "Since a standard resize crop is centered by default, an off-center subject can get partially cut off when converting to a very different aspect ratio. Crop your source photo to roughly center the subject first if the automatic centered crop doesn't work for your composition.",
    },
    {
      question: "Do these exact pixel dimensions ever change?",
      answer:
        "Occasionally, yes — platforms do adjust their recommended sizes over time. These reflect commonly used, currently accurate dimensions, but for a critical campaign asset, it's worth a quick check against the platform's current official specs.",
    },
  ],
};
