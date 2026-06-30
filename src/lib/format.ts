const currencyCache = new Map<string, Intl.NumberFormat>();
const percentCache = new Map<string, Intl.NumberFormat>();
const compactCache = new Map<string, Intl.NumberFormat>();

function getCurrencyFormatter(locale: string): Intl.NumberFormat {
  let formatter = currencyCache.get(locale);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
    });
    currencyCache.set(locale, formatter);
  }
  return formatter;
}

function getPercentFormatter(locale: string): Intl.NumberFormat {
  let formatter = percentCache.get(locale);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      signDisplay: "exceptZero",
    });
    percentCache.set(locale, formatter);
  }
  return formatter;
}

function getCompactFormatter(locale: string): Intl.NumberFormat {
  let formatter = compactCache.get(locale);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      notation: "compact",
      maximumFractionDigits: 1,
    });
    compactCache.set(locale, formatter);
  }
  return formatter;
}

export function formatCurrency(value: number, locale: string): string {
  return getCurrencyFormatter(locale).format(value);
}

export function formatCompact(value: number, locale: string): string {
  return getCompactFormatter(locale).format(value);
}

export function formatPercent(value: number, locale: string): string {
  return getPercentFormatter(locale).format(value / 100);
}
