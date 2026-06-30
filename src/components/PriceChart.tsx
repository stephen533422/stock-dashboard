import { useId } from "react";
import { useTranslation } from "react-i18next";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "../lib/format";
import type { Candle } from "../types/stock";

interface PriceChartProps {
  data: Candle[];
  up: boolean;
}

export function PriceChart({ data, up }: Readonly<PriceChartProps>) {
  const gradientId = useId();
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage ?? "en";
  const color = up ? "#16a34a" : "#dc2626";
  const points = data.map((candle) => ({
    time: candle.time * 1000,
    close: candle.close,
  }));
  const dateFmt = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
  });

  return (
    <ResponsiveContainer width="100%" height={360}>
      <AreaChart data={points} margin={{ top: 10, right: 12, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis
          dataKey="time"
          type="number"
          scale="time"
          domain={["dataMin", "dataMax"]}
          tickFormatter={(value) => dateFmt.format(value)}
          tick={{ fontSize: 12, fill: "var(--text-muted)" }}
          minTickGap={40}
        />
        <YAxis
          domain={["auto", "auto"]}
          tickFormatter={(value) => formatCurrency(value, locale)}
          tick={{ fontSize: 12, fill: "var(--text-muted)" }}
          width={88}
        />
        <Tooltip
          formatter={(value) => formatCurrency(Number(value), locale)}
          labelFormatter={(label) => dateFmt.format(Number(label))}
          contentStyle={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            color: "var(--text)",
          }}
          labelStyle={{ color: "var(--text-muted)" }}
        />
        <Area
          type="monotone"
          dataKey="close"
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          isAnimationActive
          animationDuration={400}
          animationEasing="ease-out"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
