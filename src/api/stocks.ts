import type { Quote, Candle, Range } from "../types/stock";
import { mockQuote, mockCandles } from "../data/mockData";
import { yahoo } from "../lib/yahooClient";

interface YahooQuoteBlock {
  open: (number | null)[];
  high: (number | null)[];
  low: (number | null)[];
  close: (number | null)[];
}

interface YahooResult {
  meta: {
    regularMarketPrice?: number;
    regularMarketDayHigh?: number;
    regularMarketDayLow?: number;
    regularMarketVolume?: number;
    fiftyTwoWeekHigh?: number;
    fiftyTwoWeekLow?: number;
    fullExchangeName?: string;
    currency?: string;
    longName?: string;
    shortName?: string;
  };
  timestamp?: number[];
  indicators: { quote: YahooQuoteBlock[] };
}

const RANGE_CFG: Record<Range, string> = {
  "1W": "5d",
  "1M": "1mo",
  "3M": "3mo",
  "1Y": "1y",
};

const round = (value: number) => Number(value.toFixed(2));

async function fetchChart(symbol: string, range: string): Promise<YahooResult> {
  const { data } = await yahoo.get(`/v8/finance/chart/${symbol}`, {
    params: { range, interval: "1d" },
  });
  const result = data?.chart?.result?.[0];
  if (!result) throw new Error("no chart result");
  return result;
}

export async function getQuote(symbol: string): Promise<Quote> {
  try {
    const result = await fetchChart(symbol, "5d");
    const { meta } = result;
    const block = result.indicators.quote[0];
    const closes = block.close.filter((c): c is number => c != null);
    const price = meta.regularMarketPrice ?? closes.at(-1);
    const prev = closes.at(-2);
    if (price == null || prev == null) throw new Error("no quote");
    const change = price - prev;
    return {
      symbol,
      price: round(price),
      change: round(change),
      changePercent: round((change / prev) * 100),
      open: round(block.open.at(-1) ?? prev),
      high: round(meta.regularMarketDayHigh ?? price),
      low: round(meta.regularMarketDayLow ?? price),
      previousClose: round(prev),
      live: true,
      name: meta.longName ?? meta.shortName,
      fiftyTwoWeekHigh:
        meta.fiftyTwoWeekHigh == null ? undefined : round(meta.fiftyTwoWeekHigh),
      fiftyTwoWeekLow:
        meta.fiftyTwoWeekLow == null ? undefined : round(meta.fiftyTwoWeekLow),
      volume: meta.regularMarketVolume,
      exchange: meta.fullExchangeName,
      currency: meta.currency,
    };
  } catch {
    return mockQuote(symbol);
  }
}

export async function getCandles(
  symbol: string,
  range: Range,
): Promise<Candle[]> {
  try {
    const result = await fetchChart(symbol, RANGE_CFG[range]);
    if (!result.timestamp) throw new Error("no candles");
    const closes = result.indicators.quote[0].close;
    return result.timestamp
      .map((time, i) => ({ time, close: closes[i] }))
      .filter((candle): candle is Candle => candle.close != null);
  } catch {
    return mockCandles(symbol, range);
  }
}

interface SparkEntry {
  close?: (number | null)[];
}

export interface DashboardRow {
  quote: Quote;
  spark: number[];
}

export interface ScreenerItem {
  symbol: string;
  name: string;
  quote: Quote;
}

interface ScreenerQuote {
  symbol: string;
  shortName?: string;
  longName?: string;
  regularMarketPrice?: number;
  regularMarketChange?: number;
  regularMarketChangePercent?: number;
  regularMarketOpen?: number;
  regularMarketDayHigh?: number;
  regularMarketDayLow?: number;
  regularMarketPreviousClose?: number;
  regularMarketVolume?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  fullExchangeName?: string;
  currency?: string;
}

export async function getScreener(
  scrId: string,
  start: number,
  count: number,
): Promise<{ items: ScreenerItem[]; total: number }> {
  const { data } = await yahoo.get("/v1/finance/screener/predefined/saved", {
    params: { scrIds: scrId, start, count },
  });
  const result = data?.finance?.result?.[0];
  const quotes: ScreenerQuote[] = result?.quotes ?? [];
  const items = quotes
    .filter((q) => q.regularMarketPrice != null)
    .map((q) => ({
      symbol: q.symbol,
      name: q.shortName ?? q.longName ?? q.symbol,
      quote: {
        symbol: q.symbol,
        price: round(q.regularMarketPrice ?? 0),
        change: round(q.regularMarketChange ?? 0),
        changePercent: round(q.regularMarketChangePercent ?? 0),
        open: round(q.regularMarketOpen ?? 0),
        high: round(q.regularMarketDayHigh ?? 0),
        low: round(q.regularMarketDayLow ?? 0),
        previousClose: round(q.regularMarketPreviousClose ?? 0),
        live: true,
        name: q.shortName ?? q.longName,
        fiftyTwoWeekHigh:
          q.fiftyTwoWeekHigh == null ? undefined : round(q.fiftyTwoWeekHigh),
        fiftyTwoWeekLow:
          q.fiftyTwoWeekLow == null ? undefined : round(q.fiftyTwoWeekLow),
        volume: q.regularMarketVolume,
        exchange: q.fullExchangeName,
        currency: q.currency,
      },
    }));
  return { items, total: result?.total ?? items.length };
}

const SPARK_CHUNK = 20;

export async function getSparks(
  symbols: string[],
): Promise<Map<string, DashboardRow>> {
  const map = new Map<string, DashboardRow>();
  for (let i = 0; i < symbols.length; i += SPARK_CHUNK) {
    const chunk = symbols.slice(i, i + SPARK_CHUNK);
    const { data } = await yahoo.get("/v8/finance/spark", {
      params: { symbols: chunk.join(","), range: "1mo", interval: "1d" },
    });
    for (const symbol of chunk) {
      const entry: SparkEntry | undefined = data?.[symbol];
      const closes = (entry?.close ?? []).filter(
        (c): c is number => c != null,
      );
      const price = closes.at(-1);
      const prev = closes.at(-2);
      if (price == null || prev == null) continue;
      const change = price - prev;
      map.set(symbol, {
        quote: {
          symbol,
          price: round(price),
          change: round(change),
          changePercent: round((change / prev) * 100),
          open: round(price),
          high: round(price),
          low: round(price),
          previousClose: round(prev),
          live: true,
        },
        spark: closes,
      });
    }
  }
  return map;
}
