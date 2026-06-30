import { useDeferredValue, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuotes } from "../hooks/useQuotes";
import { STOCKS } from "../data/mockData";
import { KpiCard } from "../components/KpiCard";
import { SearchBar } from "../components/SearchBar";
import { ThemeToggle } from "../components/ThemeToggle";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export function Dashboard() {
  const { t } = useTranslation();
  const { data: quotes } = useQuotes();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const rows = useMemo(
    () => STOCKS.map((stock, i) => ({ stock, quote: quotes[i] })),
    [quotes],
  );

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      ({ stock }) =>
        stock.symbol.toLowerCase().includes(q) ||
        stock.name.toLowerCase().includes(q),
    );
  }, [rows, deferredQuery]);

  return (
    <div className="dashboard">
      <header className="dashboard-head">
        <h1>{t("app.title")}</h1>
        <div className="head-controls">
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
