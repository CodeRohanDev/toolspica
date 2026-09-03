import dns from "node:dns/promises";
import { isValidIp } from "@/lib/server/network-tools";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Public DNSBL zones that correctly distinguish listed vs. clean IPs when
// queried from a shared/cloud resolver. zen.spamhaus.org is deliberately
// excluded — Spamhaus blocks free/public-resolver queries and returns a
// fixed "rejected" sentinel for every lookup, which would make every IP
// look listed. Verified against RFC 5782's documented test address
// (127.0.0.2, which every compliant DNSBL lists) before shipping.
const DNSBL_ZONES = [
  { zone: "bl.spamcop.net", name: "SpamCop" },
  { zone: "b.barracudacentral.org", name: "Barracuda Reputation Block List" },
  { zone: "dnsbl-1.uceprotect.net", name: "UCEPROTECT Level 1" },
];

const IPV4_RE = /^(\d{1,3}\.){3}\d{1,3}$/;

async function checkZone(reversedIp: string, zone: string): Promise<boolean> {
  try {
    await dns.resolve4(`${reversedIp}.${zone}`);
    return true;
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ip = (searchParams.get("ip") ?? "").trim();

  if (!ip || !IPV4_RE.test(ip) || !isValidIp(ip)) {
    return Response.json({ error: "Enter a valid IPv4 address." }, { status: 400 });
  }

  const reversedIp = ip.split(".").reverse().join(".");
  const results = await Promise.all(
    DNSBL_ZONES.map(async ({ zone, name }) => ({
      zone,
      name,
      listed: await checkZone(reversedIp, zone),
    }))
  );

  return Response.json({
    ip,
    listedCount: results.filter((r) => r.listed).length,
    results,
  });
}
