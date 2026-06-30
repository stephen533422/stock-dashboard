import { useCandles } from "../hooks/useQuotes";
import { Sparkline } from "./Sparkline";
import type { Quote } from "../types/stock";

interface KpiCardProps {
  quote: Quote;
  name: string;
}

export function KpiCard({ quote, name }: Readonly<KpiCardProps>) {
  const { data: candles } = useCandles(quote.symbol, "1M");
  const up = quote.change >= 0;
  const color = up ? "#16a34a" : "#dc2626";

  return (
    <article className="kpi-card">
      <header className="kpi-head">
        <strong>{quote.symbol}</strong>
        <span className="kpi-name">{name}</span>
      </header>
      <div className="kpi-price">${quote.price.toFixed(2)}</div>
      <div className="kpi-change" style={{ color }}>
        {up ? "▲" : "▼"} {quote.change.toFixed(2)} ({quote.changePercent.toFixed(2)}%)
      </div>
      <Sparkline data={candles.map((c) => c.close)} up={up} />
    </article>
  );
}
