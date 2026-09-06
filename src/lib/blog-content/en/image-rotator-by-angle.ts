import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-rotator-by-angle",
  lang: "en",
  title: "Fixing a Tilted Horizon Needs More Than a 90° Rotate Button",
  description: "A slightly crooked photo needs a precise angle correction, not a quarter-turn — here's what actually happens when you rotate by an exact angle.",
  sections: [
    {
      heading: "Not every crooked photo is a 90° problem",
      body: [
        "A photo held sideways needs a clean 90° or 180° turn — any basic rotate button handles that instantly. A different, more common problem is the photo that's almost right: a horizon that's tilted two or three degrees off level, a scanned document that wasn't quite square on the scanner bed, a landscape shot where the camera wasn't perfectly level. A quarter-turn does nothing for this — you need an exact, arbitrary angle, and a way to see the result as you dial it in.",
        "This is exactly the gap a live-angle-slider tool fills: drag from -180° to 180°, watch the image rotate in real time, and stop the moment your reference line (the horizon, a table edge, a door frame) sits level.",
      ],
    },
    {
      heading: "The corner problem nobody thinks about until it happens",
      body: [
        "Here's a detail that trips up simpler rotation tools: rotate a rectangular photo by anything other than a clean 90° multiple, and the rotated content's corners no longer fit inside the original rectangle — they poke out past the original edges. A naive implementation just clips those corners off, silently losing part of your image. A properly built tool instead calculates the exact larger bounding box needed to contain the whole rotated image without cropping anything, expanding the canvas so nothing at the edges gets lost.",
        "That's also why the output is always a PNG: the new, larger canvas has empty corner areas outside your tilted image's actual boundary, and those need real transparency, not a fill color pretending to belong there.",
      ],
    },
    {
      heading: "Why the result is bigger than what you started with",
      body: [
        "The first time this happens, the larger output dimensions can look like a mistake — it isn't. A photo rotated even a few degrees has its corners extending beyond its original rectangle purely as a matter of geometry, and the alternative (keeping the original canvas size) would mean silently cropping content you didn't ask to lose. The transparent corners in the result are simply the parts of the new bounding box that fall outside your actual rotated photo — there's no image content missing from them, because there was never supposed to be any there.",
      ],
    },
    {
      heading: "A small, deliberate rotation vs. a full quarter-turn tool",
      body: [
        "It's worth knowing when to reach for which tool: a dedicated 90°/180°/270° rotate tool is faster and lossless for a photo that's simply sideways or upside down. This angle-slider tool is for the specific case of fine, corrective rotation — a few degrees to level a horizon, not a full turn. Using the wrong one either wastes time (fiddling with an angle slider to approximate a clean 90°) or doesn't solve the actual problem (a quarter-turn button can't fix a 3° tilt).",
      ],
    },
  ],
  faqs: [
    {
      question: "Why is my rotated image bigger than the original?",
      answer: "Rotating by an angle that isn't a multiple of 90° means the image's corners extend past the original rectangle's boundaries. The tool expands the canvas to the exact size needed to contain the whole rotated image without cropping anything, which is why the result is larger.",
    },
    {
      question: "What's in the transparent corners of the result?",
      answer: "Those are parts of the new, larger canvas that fall outside your actual rotated image — there's no content there, so they're left transparent rather than filled with an unwanted background color.",
    },
    {
      question: "Does rotating at an arbitrary angle reduce image quality?",
      answer: "There's some unavoidable resampling when redrawing pixels at a non-90° angle, which is normal for any rotation software. For typical small corrective rotations of a few degrees, the visual difference is minimal.",
    },
  ],
};
