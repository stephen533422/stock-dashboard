import { useSuspenseQuery } from "@tanstack/react-query";
import { getQuote, getCandles } from "../api/stocks";
import { STOCKS, mockQuote } from "../data/mockData";
import type { Quote, Range } from "../types/stock";

export function useQuotes() {
  return useSuspenseQuery({
    queryKey: ["quotes"],
    queryFn: (): Promise<Quote[]> =>
      Promise.resolve(STOCKS.map((s) => mockQuote(s.symbol))),
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
