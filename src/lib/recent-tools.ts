const STORAGE_KEY = "toolspica:recent-tools";
const MAX_RECENT = 8;

export function getRecentToolSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
  } catch {
    return [];
  }
}

export function addRecentToolSlug(slug: string) {
  if (typeof window === "undefined") return;
  try {
    const current = getRecentToolSlugs().filter((s) => s !== slug);
    current.unshift(slug);
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(current.slice(0, MAX_RECENT))
    );
  } catch {
    // localStorage unavailable (private mode, quota) — ignore silently
  }
}
