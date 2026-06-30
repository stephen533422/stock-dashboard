import type { Candle, Quote, Range, Stock } from "../types/stock";

export const STOCKS: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc.", sector: "Technology" },
  { symbol: "MSFT", name: "Microsoft", sector: "Technology" },
  { symbol: "NVDA", name: "NVIDIA", sector: "Technology" },
  { symbol: "AVGO", name: "Broadcom", sector: "Technology" },
  { symbol: "ORCL", name: "Oracle", sector: "Technology" },
  { symbol: "CRM", name: "Salesforce", sector: "Technology" },
  { symbol: "ADBE", name: "Adobe", sector: "Technology" },
  { symbol: "AMD", name: "Advanced Micro Devices", sector: "Technology" },
  { symbol: "INTC", name: "Intel", sector: "Technology" },
  { symbol: "CSCO", name: "Cisco Systems", sector: "Technology" },
  { symbol: "QCOM", name: "Qualcomm", sector: "Technology" },
  { symbol: "TXN", name: "Texas Instruments", sector: "Technology" },
  { symbol: "IBM", name: "IBM", sector: "Technology" },
  { symbol: "NOW", name: "ServiceNow", sector: "Technology" },
  { symbol: "INTU", name: "Intuit", sector: "Technology" },
  { symbol: "AMAT", name: "Applied Materials", sector: "Technology" },
  { symbol: "MU", name: "Micron Technology", sector: "Technology" },
  { symbol: "ADI", name: "Analog Devices", sector: "Technology" },
  { symbol: "LRCX", name: "Lam Research", sector: "Technology" },
  { symbol: "KLAC", name: "KLA Corporation", sector: "Technology" },
  { symbol: "PANW", name: "Palo Alto Networks", sector: "Technology" },
  { symbol: "SNPS", name: "Synopsys", sector: "Technology" },
  { symbol: "CDNS", name: "Cadence Design Systems", sector: "Technology" },
  { symbol: "ANET", name: "Arista Networks", sector: "Technology" },
  { symbol: "FTNT", name: "Fortinet", sector: "Technology" },
  { symbol: "GOOGL", name: "Alphabet", sector: "Communication" },
  { symbol: "META", name: "Meta Platforms", sector: "Communication" },
  { symbol: "NFLX", name: "Netflix", sector: "Communication" },
  { symbol: "DIS", name: "Walt Disney", sector: "Communication" },
  { symbol: "CMCSA", name: "Comcast", sector: "Communication" },
  { symbol: "T", name: "AT&T", sector: "Communication" },
  { symbol: "VZ", name: "Verizon", sector: "Communication" },
  { symbol: "TMUS", name: "T-Mobile US", sector: "Communication" },
  { symbol: "CHTR", name: "Charter Communications", sector: "Communication" },
  { symbol: "EA", name: "Electronic Arts", sector: "Communication" },
  { symbol: "AMZN", name: "Amazon", sector: "Consumer" },
  { symbol: "TSLA", name: "Tesla", sector: "Consumer" },
  { symbol: "HD", name: "Home Depot", sector: "Consumer" },
  { symbol: "MCD", name: "McDonald's", sector: "Consumer" },
  { symbol: "NKE", name: "Nike", sector: "Consumer" },
  { symbol: "LOW", name: "Lowe's", sector: "Consumer" },
  { symbol: "SBUX", name: "Starbucks", sector: "Consumer" },
  { symbol: "BKNG", name: "Booking Holdings", sector: "Consumer" },
  { symbol: "TJX", name: "TJX Companies", sector: "Consumer" },
  { symbol: "ABNB", name: "Airbnb", sector: "Consumer" },
  { symbol: "WMT", name: "Walmart", sector: "Consumer" },
  { symbol: "COST", name: "Costco Wholesale", sector: "Consumer" },
  { symbol: "PG", name: "Procter & Gamble", sector: "Consumer" },
  { symbol: "KO", name: "Coca-Cola", sector: "Consumer" },
  { symbol: "PEP", name: "PepsiCo", sector: "Consumer" },
  { symbol: "PM", name: "Philip Morris International", sector: "Consumer" },
  { symbol: "MDLZ", name: "Mondelez International", sector: "Consumer" },
  { symbol: "CL", name: "Colgate-Palmolive", sector: "Consumer" },
  { symbol: "MO", name: "Altria Group", sector: "Consumer" },
  { symbol: "TGT", name: "Target", sector: "Consumer" },
  { symbol: "JPM", name: "JPMorgan Chase", sector: "Financials" },
  { symbol: "V", name: "Visa", sector: "Financials" },
  { symbol: "MA", name: "Mastercard", sector: "Financials" },
  { symbol: "BAC", name: "Bank of America", sector: "Financials" },
  { symbol: "WFC", name: "Wells Fargo", sector: "Financials" },
  { symbol: "GS", name: "Goldman Sachs", sector: "Financials" },
  { symbol: "MS", name: "Morgan Stanley", sector: "Financials" },
  { symbol: "AXP", name: "American Express", sector: "Financials" },
  { symbol: "SCHW", name: "Charles Schwab", sector: "Financials" },
  { symbol: "BLK", name: "BlackRock", sector: "Financials" },
  { symbol: "C", name: "Citigroup", sector: "Financials" },
  { symbol: "SPGI", name: "S&P Global", sector: "Financials" },
  { symbol: "CB", name: "Chubb", sector: "Financials" },
  { symbol: "JNJ", name: "Johnson & Johnson", sector: "Healthcare" },
  { symbol: "UNH", name: "UnitedHealth Group", sector: "Healthcare" },
  { symbol: "LLY", name: "Eli Lilly", sector: "Healthcare" },
  { symbol: "ABBV", name: "AbbVie", sector: "Healthcare" },
  { symbol: "MRK", name: "Merck", sector: "Healthcare" },
  { symbol: "PFE", name: "Pfizer", sector: "Healthcare" },
  { symbol: "TMO", name: "Thermo Fisher Scientific", sector: "Healthcare" },
  { symbol: "ABT", name: "Abbott Laboratories", sector: "Healthcare" },
  { symbol: "DHR", name: "Danaher", sector: "Healthcare" },
  { symbol: "BMY", name: "Bristol-Myers Squibb", sector: "Healthcare" },
  { symbol: "AMGN", name: "Amgen", sector: "Healthcare" },
  { symbol: "CVS", name: "CVS Health", sector: "Healthcare" },
  { symbol: "MDT", name: "Medtronic", sector: "Healthcare" },
  { symbol: "GILD", name: "Gilead Sciences", sector: "Healthcare" },
  { symbol: "ISRG", name: "Intuitive Surgical", sector: "Healthcare" },
  { symbol: "XOM", name: "Exxon Mobil", sector: "Energy" },
  { symbol: "CVX", name: "Chevron", sector: "Energy" },
  { symbol: "COP", name: "ConocoPhillips", sector: "Energy" },
  { symbol: "SLB", name: "Schlumberger", sector: "Energy" },
  { symbol: "EOG", name: "EOG Resources", sector: "Energy" },
  { symbol: "MPC", name: "Marathon Petroleum", sector: "Energy" },
  { symbol: "PSX", name: "Phillips 66", sector: "Energy" },
  { symbol: "OXY", name: "Occidental Petroleum", sector: "Energy" },
  { symbol: "GE", name: "GE Aerospace", sector: "Industrials" },
  { symbol: "CAT", name: "Caterpillar", sector: "Industrials" },
  { symbol: "HON", name: "Honeywell", sector: "Industrials" },
  { symbol: "UNP", name: "Union Pacific", sector: "Industrials" },
  { symbol: "BA", name: "Boeing", sector: "Industrials" },
  { symbol: "RTX", name: "RTX", sector: "Industrials" },
  { symbol: "UPS", name: "United Parcel Service", sector: "Industrials" },
  { symbol: "DE", name: "Deere & Company", sector: "Industrials" },
  { symbol: "LMT", name: "Lockheed Martin", sector: "Industrials" },
  { symbol: "ADP", name: "Automatic Data Processing", sector: "Industrials" },
  { symbol: "LIN", name: "Linde", sector: "Materials" },
  { symbol: "SHW", name: "Sherwin-Williams", sector: "Materials" },
  { symbol: "APD", name: "Air Products and Chemicals", sector: "Materials" },
  { symbol: "FCX", name: "Freeport-McMoRan", sector: "Materials" },
  { symbol: "NEM", name: "Newmont", sector: "Materials" },
  { symbol: "NEE", name: "NextEra Energy", sector: "Utilities" },
  { symbol: "DUK", name: "Duke Energy", sector: "Utilities" },
  { symbol: "SO", name: "Southern Company", sector: "Utilities" },
  { symbol: "D", name: "Dominion Energy", sector: "Utilities" },
  { symbol: "PLD", name: "Prologis", sector: "Real Estate" },
  { symbol: "AMT", name: "American Tower", sector: "Real Estate" },
  { symbol: "EQIX", name: "Equinix", sector: "Real Estate" },
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
  const round = (value: number) => Number(value.toFixed(2));
  const open = round(prev * (1 + (rand(`${symbol}-o`) - 0.5) * 0.01));
  const high = round(Math.max(last, open, prev) * (1 + rand(`${symbol}-h`) * 0.01));
  const low = round(Math.min(last, open, prev) * (1 - rand(`${symbol}-l`) * 0.01));
  const change = round(last - prev);
  const changePercent = round((change / prev) * 100);
  return {
    symbol,
    price: last,
    change,
    changePercent,
    open,
    high,
    low,
    previousClose: prev,
  };
}
