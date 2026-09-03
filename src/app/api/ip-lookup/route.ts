import { headers } from "next/headers";
import { ipGeoLookup, isValidIp } from "@/lib/server/network-tools";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getRequestIp(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headerList.get("x-real-ip") ?? "8.8.8.8";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requested = searchParams.get("ip")?.trim();

  let ip: string;
  if (requested) {
    if (!isValidIp(requested)) {
      return Response.json({ error: "Enter a valid IPv4 or IPv6 address." }, { status: 400 });
    }
    ip = requested;
  } else {
    ip = getRequestIp(await headers());
  }

  try {
    const info = await ipGeoLookup(ip);
    return Response.json(info);
  } catch {
    return Response.json({ error: "IP lookup failed. Please try again." }, { status: 502 });
  }
}
