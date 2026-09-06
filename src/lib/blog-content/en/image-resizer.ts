import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-resizer",
  lang: "en",
  title: "Why Your Upload Keeps Getting Rejected for \"Wrong Image Dimensions\"",
  description:
    "Most platform upload rejections come down to exact pixel dimensions, not file size. Here's how to resize an image correctly the first time.",
  sections: [
    {
      heading: "\"Image too large\" often means the wrong thing",
      body: [
        "A surprising number of upload errors that say something about size are actually about pixel dimensions, not file size in megabytes — a job portal wanting a 200×200px photo, a marketplace listing needing 1000×1000px, a print template requiring an exact width and height. Uploading a 4000×3000px phone photo to a field expecting 300×300px either gets rejected outright or gets auto-cropped in a way you didn't intend, cutting off exactly the part of the image you wanted visible.",
        "Resizing to the platform's exact expected dimensions before uploading avoids both outcomes — you control what stays in frame instead of leaving it to an automatic crop.",
      ],
    },
    {
      heading: "The aspect ratio lock is doing more work than it looks like",
      body: [
        "The single most common resizing mistake is typing a new width and a new height independently without realizing the original photo's proportions don't match — the result is a visibly stretched or squashed image, faces looking subtly wrong, straight lines no longer straight. An aspect-ratio lock prevents this by automatically calculating the matching dimension the moment you change one, so proportions stay correct without you doing the math yourself.",
        "Turning the lock off is occasionally the right call — a banner ad or a fixed-size template slot sometimes genuinely needs an exact width and height regardless of the source image's original proportions, and in that specific case, stretching is the intended outcome, not a mistake.",
      ],
    },
    {
      heading: "Making an image bigger doesn't work the way people expect",
      body: [
        "It's technically possible to resize an image up to a larger size, but it's worth understanding what actually happens: there's no new detail being added, only interpolation — the software estimates what the in-between pixels probably look like based on the ones around them. A modest increase (say, 10-20% larger) usually looks fine. Doubling or tripling the original size starts to look visibly soft or blurry, because you're asking software to invent detail that was never captured in the first place.",
        "If you consistently need much larger versions of small source images, that's a different problem — dedicated upscaling tools use more sophisticated techniques specifically for that case, rather than the straightforward resizing most everyday tasks need.",
      ],
    },
    {
      heading: "Resize first, compress second — the order actually matters",
      body: [
        "A common workflow mistake is compressing an image for file size and then resizing it afterward, or doing both in a way that compounds quality loss unnecessarily. The cleaner order is: resize to your exact target dimensions first (usually exported losslessly), then compress that correctly-sized result if you also need a smaller file size — this way you're only accepting one round of lossy compression instead of stacking multiple lossy steps on top of each other.",
        "This ordering matters more the smaller your final dimensions get, since resizing down after compression can occasionally make existing compression artifacts more visually obvious relative to the smaller canvas, whereas resizing first and compressing the already-correct size avoids that entirely.",
      ],
    },
  ],
  faqs: [
    {
      question: "Why did my resized image come out stretched?",
      answer:
        "This happens when width and height are set independently without an aspect-ratio lock, and the new proportions don't match the original image's shape. Turn on aspect-ratio lock so changing one dimension automatically adjusts the other correctly.",
    },
    {
      question: "Can I resize an image to be bigger than the original?",
      answer:
        "Yes, but there's no new detail added — the software interpolates between existing pixels to fill the larger size. Modest increases look fine; large increases (2x or more) tend to look soft, since there's no real detail to recover.",
    },
    {
      question: "Should I resize or compress an image first?",
      answer:
        "Resize to your target dimensions first, then compress the correctly-sized result afterward if you also need a smaller file size. This avoids stacking unnecessary rounds of lossy compression on top of each other.",
    },
  ],
};
