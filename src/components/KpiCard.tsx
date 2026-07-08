import { memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { formatCurrency, formatPercent } from "../lib/format";
import { Sparkline } from "./Sparkline";
import { WatchButton } from "./WatchButton";
import type { Quote } from "../types/stock";

interface KpiCardProps {
  quote: Quote;
  name: string;
  spark: number[];
}

export const KpiCard = memo(function KpiCard({
  quote,
  name,
  spark,
}: Readonly<KpiCardProps>) {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage ?? "en";
  const up = quote.change >= 0;
  const [cardRef, inView] = useIntersectionObserver<HTMLElement>({
    rootMargin: "200px",
  });

  return (
    <article className="kpi-card" ref={cardRef}>
      <WatchButton symbol={quote.symbol} />
      <Link className="kpi-card-body" to={`/stock/${quote.symbol}`}>
        <strong className="kpi-symbol">{quote.symbol}</strong>
        <span className="kpi-name">{name}</span>
        <div className="kpi-price">{formatCurrency(quote.price, locale)}</div>
        <div
          className="kpi-change"
          style={{ color: up ? "var(--up)" : "var(--down)" }}
        >
          {up ? "▲" : "▼"} {formatCurrency(quote.change, locale)} (
          {formatPercent(quote.changePercent, locale)})
        </div>
        {inView ? (
          <Sparkline data={spark} up={up} />
        ) : (
          <div className="sparkline-placeholder" />
        )}
      </Link>
    </article>
  );
});
