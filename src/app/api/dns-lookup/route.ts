import { lookupDnsRecords, type DnsRecords } from "@/lib/server/network-tools";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_TYPES: (keyof DnsRecords)[] = ["a", "aaaa", "mx", "txt", "ns", "cname", "soa"];
const DOMAIN_RE = /^[a-zA-Z0-9.-]+$/;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = (searchParams.get("domain") ?? "").trim().toLowerCase();
  const typeParam = (searchParams.get("type") ?? "ALL").toLowerCase();

  if (!domain || !DOMAIN_RE.test(domain) || !domain.includes(".")) {
    return Response.json({ error: "Enter a valid domain name, e.g. example.com." }, { status: 400 });
  }

  const types = typeParam === "all" ? VALID_TYPES : VALID_TYPES.filter((t) => t === typeParam);
  if (types.length === 0) {
    return Response.json({ error: "Unsupported record type." }, { status: 400 });
  }

  try {
    const records = await lookupDnsRecords(domain, types);
    if (Object.keys(records).length === 0) {
      return Response.json({ error: "No matching DNS records were found for this domain." }, { status: 404 });
    }
    return Response.json({ domain, records });
  } catch {
    return Response.json({ error: "DNS lookup failed for this domain." }, { status: 502 });
  }
}
