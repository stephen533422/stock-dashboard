import { useDeferredValue, useMemo, useState } from "react";
import { useQuotes } from "../hooks/useQuotes";
import { STOCKS } from "../data/mockData";
import { KpiCard } from "../components/KpiCard";
import { SearchBar } from "../components/SearchBar";

export function Dashboard() {
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
      <h1>Stock Dashboard</h1>
      <SearchBar value={query} onChange={setQuery} />
      <div className="kpi-grid">
        {filtered.map(({ stock, quote }) => (
          <KpiCard key={stock.symbol} quote={quote} name={stock.name} />
        ))}
      </div>
    </div>
  );
}
