"use client";

const SIZES = [
  { label: "Instagram Story / Reel", w: 1080, h: 1920, note: "9:16 — safe zone: keep text 250px from top/bottom" },
  { label: "Instagram Post (square)", w: 1080, h: 1080, note: "1:1" },
  { label: "Instagram Post (portrait)", w: 1080, h: 1350, note: "4:5" },
  { label: "Instagram Post (landscape)", w: 1080, h: 566, note: "1.91:1" },
  { label: "Instagram Profile Picture", w: 320, h: 320, note: "displayed as a circle" },
  { label: "Instagram Carousel", w: 1080, h: 1080, note: "1:1, up to 10 slides" },
];

export function InstagramStorySizeGuide() {
  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {SIZES.map((s) => (
          <div key={s.label} className="rounded-lg border p-4">
            <p className="font-semibold">{s.label}</p>
            <p className="mt-1 text-2xl font-bold tabular-nums">
              {s.w} × {s.h}
              <span className="ml-1 text-sm font-normal text-muted-foreground">px</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{s.note}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-center border-t pt-5">
        <div
          className="relative border-2 border-dashed"
          style={{ width: 180, height: 320 }}
        >
          <div className="absolute inset-x-0 top-[13%] h-px bg-primary/60" />
          <div className="absolute inset-x-0 bottom-[13%] h-px bg-primary/60" />
          <span className="absolute inset-x-0 top-[6%] text-center text-[10px] text-muted-foreground">
            unsafe (UI overlap)
          </span>
          <span className="absolute inset-x-0 bottom-[6%] text-center text-[10px] text-muted-foreground">
            unsafe (UI overlap)
          </span>
        </div>
      </div>
    </div>
  );
}
