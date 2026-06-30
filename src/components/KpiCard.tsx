import { useTranslation } from "react-i18next";
import { useCandles } from "../hooks/useQuotes";
import { formatCurrency, formatPercent } from "../lib/format";
import { Sparkline } from "./Sparkline";
import type { Quote } from "../types/stock";

interface KpiCardProps {
  quote: Quote;
  name: string;
}

export function KpiCard({ quote, name }: Readonly<KpiCardProps>) {
  const { i18n } = useTranslation();
  const { data: candles } = useCandles(quote.symbol, "1M");
  const locale = i18n.resolvedLanguage ?? "en";
  const up = quote.change >= 0;

  return (
    <article className="kpi-card">
      <header className="kpi-head">
        <strong>{quote.symbol}</strong>
        <span className="kpi-name">{name}</span>
      </header>
      <div className="kpi-price">{formatCurrency(quote.price, locale)}</div>
      <div
        className="kpi-change"
        style={{ color: up ? "var(--up)" : "var(--down)" }}
      >
        {up ? "▲" : "▼"} {formatCurrency(quote.change, locale)} (
        {formatPercent(quote.changePercent, locale)})
      </div>
      <Sparkline data={candles.map((c) => c.close)} up={up} />
    </article>
  );
}
