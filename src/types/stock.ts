export interface Stock {
  symbol: string;
  name: string;
  sector: string;
}

export interface Quote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  live: boolean;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  volume?: number;
  exchange?: string;
  currency?: string;
}

export interface Candle {
  time: number; // unix 秒
  close: number;
}

export type Range = "1W" | "1M" | "3M" | "1Y";
