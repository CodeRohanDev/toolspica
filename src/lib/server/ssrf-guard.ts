// Blocks server-side network tools from being used to probe private/internal
// infrastructure (localhost, RFC1918 ranges, link-local, cloud metadata
// endpoints, etc). Every route that connects to a user-supplied host MUST
// resolve and validate through this module before making the connection.

import dns from "node:dns/promises";

export class UnsafeTargetError extends Error {}

function ipv4ToInt(ip: string): number | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let n = 0;
  for (const part of parts) {
    const octet = Number(part);
    if (!Number.isInteger(octet) || octet < 0 || octet > 255) return null;
    n = (n << 8) + octet;
  }
  return n >>> 0;
}

function isPrivateIPv4(ip: string): boolean {
  const n = ipv4ToInt(ip);
  if (n === null) return true; // unparsable — treat as unsafe
  const inRange = (base: string, bits: number) => {
    const baseInt = ipv4ToInt(base)!;
    const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
    return (n & mask) === (baseInt & mask);
  };
  return (
    inRange("0.0.0.0", 8) ||
    inRange("10.0.0.0", 8) ||
    inRange("100.64.0.0", 10) ||
    inRange("127.0.0.0", 8) ||
    inRange("169.254.0.0", 16) ||
    inRange("172.16.0.0", 12) ||
    inRange("192.0.0.0", 24) ||
    inRange("192.0.2.0", 24) ||
    inRange("192.88.99.0", 24) ||
    inRange("192.168.0.0", 16) ||
    inRange("198.18.0.0", 15) ||
    inRange("198.51.100.0", 24) ||
    inRange("203.0.113.0", 24) ||
    inRange("224.0.0.0", 4) ||
    inRange("240.0.0.0", 4) ||
    n === 0xffffffff
  );
}

function isPrivateIPv6(ip: string): boolean {
  const lower = ip.toLowerCase();
  // IPv4-mapped / IPv4-compatible addresses — validate the embedded IPv4.
  const mapped = lower.match(/^::ffff:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/);
  if (mapped) return isPrivateIPv4(mapped[1]);
  if (lower === "::1" || lower === "::") return true;
  if (lower.startsWith("fe8") || lower.startsWith("fe9") || lower.startsWith("fea") || lower.startsWith("feb")) {
    return true; // fe80::/10 link-local
  }
  if (/^f[cd][0-9a-f]{2}:/.test(lower)) return true; // fc00::/7 unique local
  if (lower.startsWith("ff")) return true; // ff00::/8 multicast
  return false;
}

function isPrivateIp(ip: string): boolean {
  return ip.includes(":") ? isPrivateIPv6(ip) : isPrivateIPv4(ip);
}

export interface SafeTarget {
  hostname: string;
  addresses: string[];
}

/**
 * Resolves `hostname` and throws UnsafeTargetError if it (or any of its
 * resolved addresses) points at private, loopback, link-local, or other
 * non-public network space. Callers should still connect using the original
 * hostname (for correct SNI/Host headers) after this check passes.
 */
export async function assertPublicHostname(hostname: string): Promise<SafeTarget> {
  const clean = hostname.trim().toLowerCase().replace(/\.$/, "");
  if (!clean || clean === "localhost" || clean.endsWith(".local") || clean.endsWith(".internal")) {
    throw new UnsafeTargetError("This host is not a public internet address.");
  }
  // Reject a bare IP literal that is itself private.
  if (/^[\d.]+$/.test(clean) || clean.includes(":")) {
    if (isPrivateIp(clean)) {
      throw new UnsafeTargetError("This host is not a public internet address.");
    }
  }

  let records;
  try {
    records = await dns.lookup(clean, { all: true, verbatim: true });
  } catch {
    throw new UnsafeTargetError("Could not resolve this hostname.");
  }
  if (records.length === 0) {
    throw new UnsafeTargetError("Could not resolve this hostname.");
  }
  for (const record of records) {
    if (isPrivateIp(record.address)) {
      throw new UnsafeTargetError("This host resolves to a private or internal address.");
    }
  }
  return { hostname: clean, addresses: records.map((r) => r.address) };
}

/** Parses a user-supplied URL or bare hostname into a normalized https(s) URL. */
export function normalizeUrlInput(input: string, defaultProtocol: "http" | "https" = "https"): URL {
  const trimmed = input.trim();
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `${defaultProtocol}://${trimmed}`;
  const url = new URL(withProtocol);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new UnsafeTargetError("Only http and https URLs are supported.");
  }
  return url;
}
