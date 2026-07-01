import { useTranslation } from "react-i18next";
import { useDataSource } from "../hooks/useDataSource";

export function DataSourceBadge() {
  const { mode, toggle } = useDataSource();
  const { t } = useTranslation();
  const live = mode === "live";
  return (
    <button
      type="button"
      className="data-badge"
      data-live={live}
      onClick={toggle}
      aria-label={t("data.toggle")}
    >
      {live ? "LIVE" : "DEMO"}
    </button>
  );
}
