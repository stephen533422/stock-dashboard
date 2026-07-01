import {
  useSuspenseQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { getQuote, getCandles, getSparks, getScreener } from "../api/stocks";
import type { DashboardRow } from "../api/stocks";
import { STOCKS, mockQuote, mockCandles } from "../data/mockData";
import type { Range, Stock } from "../types/stock";

const PAGE_SIZE = 20;
const SCREENER = "most_actives";

export interface DashboardItem extends DashboardRow {
  stock: Stock;
}

interface DashboardPage {
  items: DashboardItem[];
  total: number;
}

function mockRow(symbol: string): DashboardRow {
  return {
    quote: mockQuote(symbol),
    spark: mockCandles(symbol, "1M").map((c) => c.close),
  };
}

function mockPage(start: number): DashboardPage {
  const slice = STOCKS.slice(start, start + PAGE_SIZE);
  return {
    items: slice.map((stock) => ({ stock, ...mockRow(stock.symbol) })),
    total: STOCKS.length,
  };
}

export function useQuotes() {
  return useSuspenseInfiniteQuery({
    queryKey: ["dashboard"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }): Promise<DashboardPage> => {
      const start = pageParam * PAGE_SIZE;
      const page = await getScreener(SCREENER, start, PAGE_SIZE).catch(
        () => null,
      );
      if (!page || page.items.length === 0) return mockPage(start);
      const sparks = await getSparks(page.items.map((i) => i.symbol)).catch(
        () => new Map<string, DashboardRow>(),
      );
      return {
        items: page.items.map((i) => ({
          stock: { symbol: i.symbol, name: i.name, sector: "" },
          quote: i.quote,
          spark:
            sparks.get(i.symbol)?.spark ??
            mockCandles(i.symbol, "1M").map((c) => c.close),
        })),
        total: page.total,
      };
    },
    getNextPageParam: (lastPage, pages) =>
      pages.length * PAGE_SIZE < lastPage.total ? pages.length : undefined,
    staleTime: 1000 * 60,
  });
}

export function useQuote(symbol: string) {
  return useSuspenseQuery({
    queryKey: ["quote", symbol],
    queryFn: () => getQuote(symbol),
  });
}

export function useCandles(symbol: string, range: Range) {
  return useSuspenseQuery({
    queryKey: ["candles", symbol, range],
    queryFn: () => getCandles(symbol, range),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
}
