import type { Quote, Candle, Range } from "../types/stock";
import { mockQuote, mockCandles } from "../data/mockData";
import { finnhub, hasFinnhubKey } from "../lib/finnhubClient";
import { twelveData, hasTwelveDataKey } from "../lib/twelveDataClient";

export { hasFinnhubKey as hasApiKey } from "../lib/finnhubClient";

export async function getQuote(symbol: string): Promise<Quote> {
  if (!hasFinnhubKey) return mockQuote(symbol);
  try {
    const { data } = await finnhub.get("/quote", { params: { symbol } });
    if (typeof data.c !== "number" || data.c === 0) {
      throw new Error("empty quote");
    }
    return {
      symbol,
      price: data.c,
      change: data.d,
      changePercent: data.dp,
      open: data.o,
      high: data.h,
      low: data.l,
      previousClose: data.pc,
    };
  } catch {
    return mockQuote(symbol);
  }
}

const RANGE_CFG: Record<Range, { interval: string; outputsize: number }> = {
  "1W": { interval: "1day", outputsize: 7 },
  "1M": { interval: "1day", outputsize: 30 },
  "3M": { interval: "1day", outputsize: 90 },
  "1Y": { interval: "1day", outputsize: 365 },
};

export async function getCandles(
  symbol: string,
  range: Range,
): Promise<Candle[]> {
  if (!hasTwelveDataKey) return mockCandles(symbol, range);
  try {
    const cfg = RANGE_CFG[range];
    const { data } = await twelveData.get("/time_series", {
      params: { symbol, interval: cfg.interval, outputsize: cfg.outputsize },
    });
    if (data.status === "error" || !Array.isArray(data.values)) {
      throw new Error(data.message ?? "candle error");
    }
    return data.values
      .map((v: { datetime: string; close: string }) => ({
        time: Math.floor(new Date(v.datetime).getTime() / 1000),
        close: Number(v.close),
      }))
      .reverse();
  } catch {
    return mockCandles(symbol, range);
  }
}
