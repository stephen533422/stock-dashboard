import type { Ref } from "react";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  ref?: Ref<HTMLInputElement>;
}

export function SearchBar({ value, onChange, ref }: Readonly<SearchBarProps>) {
  const { t } = useTranslation();
  return (
    <input
      ref={ref}
      type="search"
      className="search-bar"
      placeholder={t("search.placeholder")}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
