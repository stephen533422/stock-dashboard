import { useDeferredValue, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuotes } from "../hooks/useQuotes";
import { useWatchlist } from "../hooks/useWatchlist";
import { STOCKS } from "../data/mockData";
import { KpiCard } from "../components/KpiCard";
import { SearchBar } from "../components/SearchBar";
import { ThemeToggle } from "../components/ThemeToggle";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export function Dashboard() {
  const { t } = useTranslation();
  const { data: quotes } = useQuotes();
  const watched = useWatchlist();
  const [query, setQuery] = useState("");
  const [watchlistOnly, setWatchlistOnly] = useState(false);
  const deferredQuery = useDeferredValue(query);

  const rows = useMemo(
    () => STOCKS.map((stock, i) => ({ stock, quote: quotes[i] })),
    [quotes],
  );

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    let result = rows;
    if (watchlistOnly) {
      result = result.filter(({ stock }) => watched.has(stock.symbol));
    }
    if (q) {
      result = result.filter(
        ({ stock }) =>
          stock.symbol.toLowerCase().includes(q) ||
          stock.name.toLowerCase().includes(q),
      );
    }
    return result;
  }, [rows, deferredQuery, watchlistOnly, watched]);

  return (
    <div className="dashboard">
      <header className="dashboard-head">
        <h1>{t("app.title")}</h1>
        <div className="head-controls">
          <button
            type="button"
            className="watchlist-filter"
            data-active={watchlistOnly}
            onClick={() => setWatchlistOnly((on) => !on)}
          >
            ★ {t("filter.watchlist")}
            {watched.size > 0 ? ` (${watched.size})` : ""}
          </button>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </header>
      <SearchBar value={query} onChange={setQuery} />
      <div className="kpi-grid">
        {filtered.map(({ stock, quote }) => (
          <KpiCard key={stock.symbol} quote={quote} name={stock.name} />
        ))}
      </div>
    </div>
  );
}
