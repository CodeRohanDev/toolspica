import { redis, OPERATIONS_COUNTER_KEY } from "@/lib/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_INCREMENT_PER_CALL = 50;

export async function GET() {
  const count = (await redis.get<number>(OPERATIONS_COUNTER_KEY)) ?? 0;
  // Read on every page load, so let the CDN edge-cache the response for a
  // short window — many concurrent visitors then share one Redis read
  // instead of one each. force-dynamic (above) only opts this route out of
  // Next's own data cache; the Cache-Control header still governs the CDN.
  return Response.json(
    { count },
    { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } }
  );
}

export async function POST(request: Request) {
  let amount = 1;
  try {
    const body = await request.json();
    if (typeof body?.amount === "number" && Number.isFinite(body.amount)) {
      amount = body.amount;
    }
  } catch {
    // No body, or invalid JSON — fall back to incrementing by 1.
  }

  // Batched client-side increments (several tool operations in one call),
  // clamped so a single malformed or malicious request can't skew the
  // count — this is a display stat, not billing, so "roughly right" is
  // the goal, not perfect precision.
  amount = Math.max(1, Math.min(MAX_INCREMENT_PER_CALL, Math.floor(amount)));

  const count = await redis.incrby(OPERATIONS_COUNTER_KEY, amount);
  return Response.json({ count });
}
