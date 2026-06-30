import type { VercelRequest, VercelResponse } from "@vercel/node";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { path, ...rest } = req.query;
  const segments = Array.isArray(path) ? path.join("/") : (path ?? "");

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(rest)) {
    if (value == null) continue;
    for (const v of Array.isArray(value) ? value : [value]) params.append(key, v);
  }

  const target = `https://query1.finance.yahoo.com/${segments}?${params.toString()}`;
  const upstream = await fetch(target, { headers: { "User-Agent": UA } });
  const body = await upstream.text();

  res.setHeader(
    "content-type",
    upstream.headers.get("content-type") ?? "application/json",
  );
  res.setHeader("cache-control", "public, max-age=60");
  res.status(upstream.status).send(body);
}
