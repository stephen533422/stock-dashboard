import { useTranslation } from "react-i18next";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Readonly<SearchBarProps>) {
  const { t } = useTranslation();
  return (
    <input
      type="search"
      className="search-bar"
      placeholder={t("search.placeholder")}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
