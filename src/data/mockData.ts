import type { Candle, Quote, Range, Stock } from "../types/stock";

export const STOCKS: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc.", sector: "Technology" },
  { symbol: "MSFT", name: "Microsoft", sector: "Technology" },
  { symbol: "NVDA", name: "NVIDIA", sector: "Technology" },
  { symbol: "GOOGL", name: "Alphabet", sector: "Communication" },
  { symbol: "META", name: "Meta Platforms", sector: "Communication" },
  { symbol: "AMZN", name: "Amazon", sector: "Consumer" },
  { symbol: "TSLA", name: "Tesla", sector: "Consumer" },
  { symbol: "WMT", name: "Walmart", sector: "Consumer" },
  { symbol: "JPM", name: "JPMorgan Chase", sector: "Financials" },
  { symbol: "V", name: "Visa", sector: "Financials" },
  { symbol: "JNJ", name: "Johnson & Johnson", sector: "Healthcare" },
  { symbol: "XOM", name: "Exxon Mobil", sector: "Energy" },
];

// 把任意字串雜湊成 32 位元整數（FNV-1a）。
// 0x811c9dc5(offset basis)與 0x01000193(prime)是 FNV-1a 規格明定的常數，
// 不用自己推導。用質數相乘是為了讓輸出分佈均勻(碰撞少)，
// rand 才會接近平均 0.5；換成隨便的數字分佈會偏掉，假資料會全部同方向漲跌。
function hash(key: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < key.length; i++) {
    h = Math.imul(h ^ key.charCodeAt(i), 0x01000193);
  }
  return h >>> 0;
}

// rand(任意字串) → 0~1
function rand(key: string): number {
  return hash(key) / 4294967296; // hash / 2^32
}

const RANGE_DAYS: Record<Range, number> = {
  "1W": 7,
  "1M": 30,
  "3M": 90,
  "1Y": 365,
};
const DAY = 86400;

export function mockCandles(symbol: string, range: Range): Candle[] {
  const days = RANGE_DAYS[range];
  const now = Math.floor(Date.now() / 1000);
  const candles: Candle[] = [];

  let price = 50 + rand(symbol) * 450; // 起始價：用 symbol 當 key
  for (let i = days - 1; i >= 0; i--) {
    const drift = (rand(`${symbol}-${i}`) - 0.5) * 0.04; // 第 i 天的亂數當 drift
    price = Math.max(1, price * (1 + drift)); // 累加成隨機漫步，才有趨勢
    candles.push({ time: now - i * DAY, close: Number(price.toFixed(2)) });
  }
  return candles;
}

// quote 由 candle 序列尾端推導，確保現價 = 走勢圖最後一點
export function mockQuote(symbol: string): Quote {
  const candles = mockCandles(symbol, "1M");
  const last = candles[candles.length - 1].close;
  const prev = candles[candles.length - 2].close;
  const change = Number((last - prev).toFixed(2));
  const changePercent = Number(((change / prev) * 100).toFixed(2));
  return { symbol, price: last, change, changePercent };
}
