import { useState, useTransition } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuote, useCandles } from "../hooks/useQuotes";
import { STOCKS } from "../data/mockData";
import { PriceChart } from "../components/PriceChart";
import { RangeTabs } from "../components/RangeTabs";
import { formatCurrency, formatPercent } from "../lib/format";
import type { Range } from "../types/stock";

export function StockDetail() {
  const { symbol = "" } = useParams();
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage ?? "en";
  const [range, setRange] = useState<Range>("1M");
  const [isPending, startTransition] = useTransition();
  const { data: quote } = useQuote(symbol);
  const { data: candles } = useCandles(symbol, range);
  const meta = STOCKS.find((stock) => stock.symbol === symbol);
  const up = quote.change >= 0;

  return (
    <div className="detail">
      <title>{`${symbol} · ${t("app.title")}`}</title>
      <Link to="/" className="back-link">
        ← {t("action.back")}
      </Link>
      <header className="detail-head">
        <h1>{symbol}</h1>
        {meta ? <span className="detail-name">{meta.name}</span> : null}
        <span className="data-badge" data-live={quote.live}>
          {quote.live ? "LIVE" : "DEMO"}
        </span>
      </header>
      <div className="detail-price">{formatCurrency(quote.price, locale)}</div>
      <div
        className="detail-change"
        style={{ color: up ? "var(--up)" : "var(--down)" }}
      >
        {up ? "▲" : "▼"} {formatCurrency(quote.change, locale)} (
        {formatPercent(quote.changePercent, locale)})
      </div>
      <dl className="detail-stats">
        <div>
          <dt>{t("stat.open")}</dt>
          <dd>{formatCurrency(quote.open, locale)}</dd>
        </div>
        <div>
          <dt>{t("stat.high")}</dt>
          <dd>{formatCurrency(quote.high, locale)}</dd>
        </div>
        <div>
          <dt>{t("stat.low")}</dt>
          <dd>{formatCurrency(quote.low, locale)}</dd>
        </div>
        <div>
          <dt>{t("stat.prevClose")}</dt>
          <dd>{formatCurrency(quote.previousClose, locale)}</dd>
        </div>
      </dl>
      <RangeTabs
        value={range}
        onChange={(next) => startTransition(() => setRange(next))}
        isPending={isPending}
      />
      <PriceChart data={candles} up={up} />
    </div>
  );
}
