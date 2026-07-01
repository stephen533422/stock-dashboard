import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuotes } from "../hooks/useQuotes";
import { useWatchlist } from "../hooks/useWatchlist";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { KpiCard } from "../components/KpiCard";
import { SearchBar } from "../components/SearchBar";
import { ThemeToggle } from "../components/ThemeToggle";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { Logo } from "../components/Logo";

export function Dashboard() {
  const { t } = useTranslation();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useQuotes();
  const watched = useWatchlist();
  const [query, setQuery] = useState("");
  const [watchlistOnly, setWatchlistOnly] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "/") return;
      const el = document.activeElement;
      const typing =
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el instanceof HTMLElement && el.isContentEditable);
      if (typing) return;
      e.preventDefault();
      searchRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const rows = useMemo(() => data.pages.flatMap((p) => p.items), [data.pages]);

  const [sentinelRef, sentinelInView] = useIntersectionObserver<HTMLDivElement>({
    threshold: 1,
    once: false,
  });

  useEffect(() => {
    if (sentinelInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [sentinelInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
        <h1 className="dashboard-title">
          <Logo className="dashboard-logo" size={28} />
          <span className="title-text">{t("app.title")}</span>
        </h1>
        <div className="head-controls">
          <button
            type="button"
            className="watchlist-filter"
            data-active={watchlistOnly}
            aria-label={t("filter.watchlist")}
            onClick={() => setWatchlistOnly((on) => !on)}
          >
            <span aria-hidden="true">★</span>
            <span className="watchlist-label">{t("filter.watchlist")}</span>
            {watched.size > 0 ? (
              <span className="watchlist-count">{watched.size}</span>
            ) : null}
          </button>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </header>
      <SearchBar value={query} onChange={setQuery} ref={searchRef} />
      <div className="kpi-grid">
        {filtered.map(({ stock, quote, spark }) => (
          <KpiCard
            key={stock.symbol}
            quote={quote}
            name={stock.name}
            spark={spark}
          />
        ))}
      </div>
      {hasNextPage ? (
        <div ref={sentinelRef} className="scroll-sentinel">
          {isFetchingNextPage ? (
            <Logo className="brand-loader" size={28} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
