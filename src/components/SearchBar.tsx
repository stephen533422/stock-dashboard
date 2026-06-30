interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Readonly<SearchBarProps>) {
  return (
    <input
      type="search"
      className="search-bar"
      placeholder="搜尋代號或名稱…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
