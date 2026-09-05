import { execSync } from "node:child_process";
import path from "node:path";

// Real last-commit date per tool-content file, not a fabricated "changed
// every build" timestamp — Google and AI crawlers discount lastModified/
// dateModified signals that never vary. Falls back to the repo's latest
// commit date if git history for a specific file isn't available (e.g.
// shallow clone).
const cache = new Map<string, string>();
let repoFallback: string | null = null;

function getRepoFallbackDate(): string {
  if (repoFallback) return repoFallback;
  try {
    repoFallback = execSync("git log -1 --format=%aI", {
      cwd: process.cwd(),
    })
      .toString()
      .trim();
  } catch {
    repoFallback = new Date().toISOString();
  }
  return repoFallback;
}

export function getToolContentLastModified(slug: string): string {
  const cached = cache.get(slug);
  if (cached) return cached;

  let date: string;
  try {
    // Statically scoped to src/lib/tools-content/ so Next's file tracer
    // doesn't bundle the whole project into the serverless function.
    const absolutePath = path.join(
      process.cwd(),
      "src/lib/tools-content",
      `${slug}.ts`
    );
    const output = execSync(`git log -1 --format=%aI -- "${absolutePath}"`, {
      cwd: process.cwd(),
    })
      .toString()
      .trim();
    date = output || getRepoFallbackDate();
  } catch {
    date = getRepoFallbackDate();
  }

  cache.set(slug, date);
  return date;
}

export function getMostRecent(dates: string[]): string {
  if (dates.length === 0) return getRepoFallbackDate();
  return dates.reduce((latest, current) =>
    new Date(current) > new Date(latest) ? current : latest
  );
}
