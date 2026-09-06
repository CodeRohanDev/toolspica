import { Redis } from "@upstash/redis";

// Server-only — never import this from a client component. Upstash's REST
// client works over plain HTTPS, so it's safe inside Vercel Functions
// (including edge) without needing a persistent TCP connection.
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const OPERATIONS_COUNTER_KEY = "toolspica:operations:count";
