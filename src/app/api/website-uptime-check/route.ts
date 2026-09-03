import { assertPublicHostname, normalizeUrlInput, UnsafeTargetError } from "@/lib/server/ssrf-guard";
import { checkWebsiteUptime } from "@/lib/server/network-tools";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = (searchParams.get("url") ?? "").trim();

  if (!raw) {
    return Response.json({ error: "Enter a URL, e.g. https://example.com." }, { status: 400 });
  }

  try {
    const targetUrl = normalizeUrlInput(raw);
    await assertPublicHostname(targetUrl.hostname);
    const result = await checkWebsiteUptime(targetUrl);
    return Response.json({ url: targetUrl.toString(), ...result });
  } catch (err) {
    const status = err instanceof UnsafeTargetError ? 400 : 502;
    return Response.json(
      { error: err instanceof Error ? err.message : "Could not check this site." },
      { status }
    );
  }
}
