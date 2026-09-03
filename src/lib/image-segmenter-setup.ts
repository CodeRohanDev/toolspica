"use client";

let segmenterPromise: Promise<import("@mediapipe/tasks-vision").ImageSegmenter> | null = null;

export function getImageSegmenter() {
  if (!segmenterPromise) {
    segmenterPromise = (async () => {
      const { FilesetResolver, ImageSegmenter } = await import("@mediapipe/tasks-vision");
      const wasmFileset = await FilesetResolver.forVisionTasks("/mediapipe-wasm");
      return ImageSegmenter.createFromOptions(wasmFileset, {
        baseOptions: {
          modelAssetPath: "/models/deeplab_v3.tflite",
        },
        outputCategoryMask: true,
        outputConfidenceMasks: false,
      });
    })();
  }
  return segmenterPromise;
}
