import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "batch-image-resizer",
  lang: "en",
  title: "Resizing 50 Photos One at a Time Is a Waste of an Afternoon",
  description: "How to resize a whole folder of images at once to consistent dimensions, without stretching or distorting any of them.",
  sections: [
    {
      heading: "The moment a single-image tool stops being enough",
      body: [
        "Resizing one photo takes ten seconds in any basic tool. Resizing forty product photos, one at a time, before uploading them to an online store is a different kind of task entirely — the same ten seconds, repeated forty times, plus the tedium of re-uploading each result somewhere. That repetition is exactly what a batch resizer exists to remove: select the whole folder at once, apply one set of dimensions, get everything back in one download.",
        "This isn't a niche need — anyone managing a product catalog, a photo gallery for a website, or a folder of screenshots that all need the same maximum size runs into this constantly.",
      ],
    },
    {
      heading: "Why \"preserve aspect ratio\" is the setting that saves your batch",
      body: [
        "A folder of real-world photos is rarely uniform in shape — some are portrait, some landscape, some nearly square. Apply a fixed width and height to all of them without preserving aspect ratio, and anything that doesn't already match that ratio gets visibly squashed or stretched. With aspect ratio preservation on, each image is instead scaled down so both dimensions fit within your maximum, keeping its original proportions intact — a portrait photo and a landscape photo in the same batch both come out looking correct, just at different final sizes within the same bounds.",
        "This one setting is the difference between a batch of professional-looking resized images and a batch of obviously distorted ones, and it's worth double-checking it's on before running a large batch.",
      ],
    },
    {
      heading: "What happens to images already smaller than your target",
      body: [
        "A common assumption is that a batch resize forces every image to exactly the same size — it doesn't, and shouldn't. Resizing only ever scales down to fit within your maximum dimensions; an image that's already smaller than your target is left alone rather than artificially stretched up to fill the space, which would just make it blurry. This matters for mixed batches where some images already meet your requirements and others don't.",
      ],
    },
    {
      heading: "Getting the whole batch back in one file",
      body: [
        "Instead of forty separate downloads landing in your browser's download folder in whatever order they finish, a batch resizer packages every result into a single ZIP file. This keeps file names intact and organized, and it's the difference between a clean, one-click deliverable and forty individually-named files you have to hunt down and gather up yourself afterward.",
      ],
    },
  ],
  faqs: [
    {
      question: "Will every image in my batch end up exactly the same size?",
      answer: "Only if they all share the same aspect ratio already. With aspect ratio preserved, each image is scaled to fit within your maximum width and height, so a portrait and a landscape photo end up at different final dimensions within the same bounds — that's expected, not a bug.",
    },
    {
      question: "What happens if an image is already smaller than my target size?",
      answer: "It's left at its original size. Resizing only ever scales down, never up, so smaller images in your batch aren't artificially enlarged (which would just make them blurry).",
    },
    {
      question: "Is there a limit to how many images I can process in one batch?",
      answer: "No hard limit is enforced, though very large batches of high-resolution images take longer and use more of your browser's memory, since everything is processed locally rather than on a server.",
    },
  ],
};
