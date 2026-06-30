export const config = { runtime: "edge" };

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

export default async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api\/yahoo/, "");
  const target = `https://query1.finance.yahoo.com${path}${url.search}`;

  const upstream = await fetch(target, { headers: { "User-Agent": UA } });
  const body = await upstream.text();

  return new Response(body, {
    status: upstream.status,
    headers: {
      "content-type":
        upstream.headers.get("content-type") ?? "application/json",
      "cache-control": "public, max-age=60",
    },
  });
}
