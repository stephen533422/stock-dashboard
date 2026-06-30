import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";

interface SparklineProps {
  data: number[];
  up: boolean;
}

export function Sparkline({ data, up }: Readonly<SparklineProps>) {
  const points = data.map((close, i) => ({ i, close }));
  const color = up ? "#16a34a" : "#dc2626";
  return (
    <ResponsiveContainer width="100%" height={40}>
      <AreaChart data={points} margin={{ top: 2, right: 0, bottom: 2, left: 0 }}>
        <YAxis hide domain={["dataMin", "dataMax"]} />
        <Area
          type="monotone"
          dataKey="close"
          stroke={color}
          fill={color}
          fillOpacity={0.15}
          strokeWidth={1.5}
          dot={false}
          activeDot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
