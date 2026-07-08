import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "app.title": "Stock Dashboard",
      "search.placeholder": "Search symbol or name…",
      "state.loading": "Loading…",
      "error.loadFailed": "Failed to load data",
      "action.retry": "Retry",
      "action.back": "Back",
      "theme.toggle": "Toggle theme",
      "language.aria": "Select language",
      "data.toggle": "Toggle data source (live / demo)",
      "filter.watchlist": "Watchlist",
      "watch.add": "Add to watchlist",
      "watch.remove": "Remove from watchlist",
      "stat.open": "Open",
      "stat.high": "High",
      "stat.low": "Low",
      "stat.prevClose": "Prev Close",
      "stat.week52High": "52W High",
      "stat.week52Low": "52W Low",
      "stat.volume": "Volume",
    },
  },
  "zh-TW": {
    translation: {
      "app.title": "股票儀表板",
      "search.placeholder": "搜尋代號或名稱…",
      "state.loading": "載入中…",
      "error.loadFailed": "資料載入失敗",
      "action.retry": "重試",
      "action.back": "返回",
      "theme.toggle": "切換深淺色",
      "language.aria": "選擇語言",
      "data.toggle": "切換資料來源(即時 / 示範)",
      "filter.watchlist": "觀察列表",
      "watch.add": "加入觀察列表",
      "watch.remove": "移除觀察列表",
      "stat.open": "開盤",
      "stat.high": "最高",
      "stat.low": "最低",
      "stat.prevClose": "昨收",
      "stat.week52High": "52週高",
      "stat.week52Low": "52週低",
      "stat.volume": "成交量",
    },
  },
  "zh-CN": {
    translation: {
      "app.title": "股票仪表板",
      "search.placeholder": "搜索代码或名称…",
      "state.loading": "加载中…",
      "error.loadFailed": "数据加载失败",
      "action.retry": "重试",
      "action.back": "返回",
      "theme.toggle": "切换深浅色",
      "language.aria": "选择语言",
      "data.toggle": "切换数据源(实时 / 演示)",
      "filter.watchlist": "观察列表",
      "watch.add": "加入观察列表",
      "watch.remove": "移除观察列表",
      "stat.open": "开盘",
      "stat.high": "最高",
      "stat.low": "最低",
      "stat.prevClose": "昨收",
      "stat.week52High": "52周高",
      "stat.week52Low": "52周低",
      "stat.volume": "成交量",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "zh-TW", "zh-CN"],
    interpolation: { escapeValue: false },
    detection: { order: ["localStorage", "navigator"], caches: ["localStorage"] },
    react: { useSuspense: false },
  });

export default i18n;
