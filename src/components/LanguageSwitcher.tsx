import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "zh-TW", label: "繁中" },
  { code: "en", label: "EN" },
  { code: "zh-CN", label: "简中" },
];

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  return (
    <select
      className="lang-switcher"
      value={i18n.resolvedLanguage}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      aria-label={t("language.aria")}
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
