"use client";

const PLATFORMS: { platform: string; items: { label: string; size: string }[] }[] = [
  { platform: "Facebook", items: [
    { label: "Profile picture", size: "170 × 170" },
    { label: "Cover photo", size: "820 × 312" },
    { label: "Shared post image", size: "1200 × 630" },
  ]},
  { platform: "Twitter / X", items: [
    { label: "Profile picture", size: "400 × 400" },
    { label: "Header image", size: "1500 × 500" },
    { label: "In-stream image", size: "1600 × 900" },
  ]},
  { platform: "LinkedIn", items: [
    { label: "Profile picture", size: "400 × 400" },
    { label: "Cover image", size: "1584 × 396" },
    { label: "Shared post image", size: "1200 × 627" },
  ]},
  { platform: "YouTube", items: [
    { label: "Channel banner", size: "2560 × 1440" },
    { label: "Video thumbnail", size: "1280 × 720" },
    { label: "Profile picture", size: "800 × 800" },
  ]},
  { platform: "Pinterest", items: [
    { label: "Standard pin", size: "1000 × 1500" },
    { label: "Profile picture", size: "165 × 165" },
  ]},
];

export function SocialMediaImageSizeGuide() {
  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PLATFORMS.map((p) => (
          <div key={p.platform} className="rounded-lg border p-4">
            <p className="mb-2 font-semibold">{p.platform}</p>
            <ul className="space-y-1.5 text-sm">
              {p.items.map((i) => (
                <li key={i.label} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{i.label}</span>
                  <span className="font-medium tabular-nums">{i.size}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
