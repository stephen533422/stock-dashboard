import {
  useSuspenseQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { getQuote, getCandles, getSparks, getScreener } from "../api/stocks";
import type { DashboardRow } from "../api/stocks";
import { STOCKS, mockQuote, mockCandles } from "../data/mockData";
import { useDataSource } from "./useDataSource";
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

function mockAllPage(): DashboardPage {
  return {
    items: STOCKS.map((stock) => ({ stock, ...mockRow(stock.symbol) })),
    total: STOCKS.length,
  };
}

export function useQuotes() {
  const { mode } = useDataSource();
  return useSuspenseInfiniteQuery({
    queryKey: ["dashboard", mode],
    initialPageParam: 0,
    queryFn: async ({ pageParam }): Promise<DashboardPage> => {
      const start = pageParam * PAGE_SIZE;
      if (mode === "mock") return mockAllPage();
      const page = await getScreener(SCREENER, start, PAGE_SIZE);
      const sparks = await getSparks(page.items.map((i) => i.symbol)).catch(
        () => new Map<string, DashboardRow>(),
      );
      return {
        items: page.items.map((i) => ({
          stock: { symbol: i.symbol, name: i.name, sector: "" },
          quote: i.quote,
          spark: sparks.get(i.symbol)?.spark ?? [],
        })),
        total: page.total,
      };
    },
    getNextPageParam: (lastPage, pages) => {
      const loaded = pages.reduce((sum, p) => sum + p.items.length, 0);
      return loaded < lastPage.total ? pages.length : undefined;
    },
    staleTime: 1000 * 60,
  });
}

export function useQuote(symbol: string) {
  const { mode } = useDataSource();
  return useSuspenseQuery({
    queryKey: ["quote", symbol, mode],
    queryFn: () =>
      mode === "mock" ? Promise.resolve(mockQuote(symbol)) : getQuote(symbol),
  });
}

export function useCandles(symbol: string, range: Range) {
  const { mode } = useDataSource();
  return useSuspenseQuery({
    queryKey: ["candles", symbol, range, mode],
    queryFn: () =>
      mode === "mock"
        ? Promise.resolve(mockCandles(symbol, range))
        : getCandles(symbol, range),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
}
