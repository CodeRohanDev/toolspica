import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "passport-photo-maker",
  lang: "en",
  title: "Passport Photo Rejected? Here's How to Get the Size Right the First Time",
  description:
    "The exact dimensions passport and visa photos need, why size alone isn't the whole requirement, and how to print multiple copies from one sheet.",
  sections: [
    {
      heading: "Why a rejected passport photo is more common than it should be",
      body: [
        "A passport or visa application getting bounced back over the photo alone is a frustrating, avoidable delay — the photo is usually fine to the human eye, but wrong by a few millimeters against the exact standard the issuing authority requires. Photo studios get this right because they do it daily; doing it yourself from a regular photo means knowing the exact target size and cropping to it precisely, not just \"close enough.\"",
        "The two dimensions that cover most of the world: the US standard of 2×2 inches, and the 35×45mm size used across the UK, the Schengen area, India, and many other countries. Getting the crop locked to the correct ratio — not just the right final size — matters just as much, since a photo cropped to the wrong aspect ratio and then squeezed to fit will look visibly distorted.",
      ],
    },
    {
      heading: "Size is necessary, but it isn't sufficient",
      body: [
        "This is the part worth being upfront about: getting the pixel dimensions exactly right solves one part of a passport photo requirement, not all of it. Most countries also specify things a cropping tool can't enforce — a plain, usually white or light-gray background, a neutral facial expression with your mouth closed, no glasses reflecting light, specific head positioning within the frame (eyes at a certain height, head taking up a certain percentage of the frame). Getting the size right removes one common rejection reason; it doesn't replace checking your specific destination's current full photo guidelines.",
      ],
    },
    {
      heading: "Taking a usable source photo before you even crop",
      body: [
        "A crop tool can only work with what's in the original photo — if the source shot has a shadow across half the face or a busy background, no amount of correct cropping fixes that. A quick setup that works well with just a phone camera: stand a few feet in front of a plain wall (a white or light-colored one, since that's the safest default across most countries' requirements), face a window or other soft, even light source rather than shooting with a flash or strong overhead light, and have someone else take the photo rather than using the front camera at arm's length, which distorts facial proportions at close range.",
        "Once you have a reasonably well-lit, plain-background source photo, the crop step becomes simple — position the face within the guide, lock to the correct ratio, and the hard part is already done.",
      ],
    },
    {
      heading: "Getting the print sheet actually usable at a photo counter",
      body: [
        "The 4×6 print sheet exists specifically because that's the paper size nearly every photo counter and self-service kiosk stocks by default — asking for a custom print size at a typical pharmacy photo counter often means a longer wait or an extra fee, while a standard 4×6 print is usually the fastest, cheapest option available. Print at actual size (not \"fit to page,\" which can subtly rescale and throw off the exact millimeter dimensions) to keep every tiled copy at the correct final size.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does correct sizing guarantee my passport application will be accepted?",
      answer:
        "No — it gets the pixel dimensions right for your chosen standard, but official requirements also cover background, expression, lighting, and head positioning. Always check your specific country's current official requirements beyond just size.",
    },
    {
      question: "Why would I need a 4×6 inch print sheet instead of just the single photo?",
      answer:
        "Most photo labs and pharmacies print on standard 4×6 inch paper — tiling multiple copies of your passport photo onto one sheet lets you get several physical prints from a single order instead of paying for one photo per print.",
    },
    {
      question: "Is my photo uploaded anywhere during cropping?",
      answer:
        "No — cropping and print sheet generation both happen entirely in your browser using the Canvas API. Your photo is never uploaded to a server.",
    },
  ],
};
