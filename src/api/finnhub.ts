import { mockQuote, mockCandles } from "../data/mockData";
import { finnhub, hasApiKey } from "../lib/finnhubClient";
import type { Candle, Quote, Range } from "../types/stock";

export { hasApiKey }; // 讓 UI 仍能從這裡拿 live/mock 旗標

export async function getQuote(symbol: string): Promise<Quote> {
  if (!hasApiKey) return mockQuote(symbol);
  try {
    const { data } = await finnhub.get("/quote", { params: { symbol } });
    // Finnhub：c=現價 d=漲跌 dp=漲跌幅
    if (typeof data.c !== "number" || data.c === 0)
      throw new Error("empty quote");
    return { symbol, price: data.c, change: data.d, changePercent: data.dp };
  } catch {
    return mockQuote(symbol); // 失敗改用mockData
  }
}

const RANGE_CFG: Record<Range, { resolution: string; days: number }> = {
  "1W": { resolution: "D", days: 7 },
  "1M": { resolution: "D", days: 30 },
  "3M": { resolution: "D", days: 90 },
  "1Y": { resolution: "W", days: 365 },
};

export async function getCandles(
  symbol: string,
  range: Range,
): Promise<Candle[]> {
  if (!hasApiKey) return mockCandles(symbol, range);
  try {
    const cfg = RANGE_CFG[range];
    const now = Math.floor(Date.now() / 1000);
    const { data } = await finnhub.get("/stock/candle", {
      params: {
        symbol,
        resolution: cfg.resolution,
        from: now - cfg.days * 86400,
        to: now,
      },
    });
    if (data.s !== "ok" || !Array.isArray(data.c))
      throw new Error("no candle data");
    // data.t=時間戳[] data.c=收盤[]
    return data.t.map((t: number, i: number) => ({
      time: t,
      close: data.c[i],
    }));
  } catch {
    return mockCandles(symbol, range); // 失敗改用mockData
  }
}
