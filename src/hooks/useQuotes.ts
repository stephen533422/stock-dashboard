import { useSuspenseQuery } from "@tanstack/react-query";
import { getQuote, getCandles, getSparks } from "../api/stocks";
import type { DashboardRow } from "../api/stocks";
import { STOCKS, mockQuote, mockCandles } from "../data/mockData";
import type { Range } from "../types/stock";

function mockRow(symbol: string): DashboardRow {
  return {
    quote: mockQuote(symbol),
    spark: mockCandles(symbol, "1M").map((c) => c.close),
  };
}

export function useQuotes() {
  return useSuspenseQuery({
    queryKey: ["dashboard"],
    queryFn: async (): Promise<DashboardRow[]> => {
      const map = await getSparks(STOCKS.map((s) => s.symbol)).catch(
        () => new Map<string, DashboardRow>(),
      );
      return STOCKS.map((s) => map.get(s.symbol) ?? mockRow(s.symbol));
    },
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
