import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BubbleChartProps {
  data: Array<{ name: string; value: number; value2?: number }>;
  color?: "lime" | "teal" | "coral";
  showSecondary?: boolean;
}

export function BubbleAreaChart({ data, color = "lime", showSecondary = false }: BubbleChartProps) {
  const colorMap = {
    lime: { stroke: "#D8FF2A", fill: "rgba(216,255,42,0.2)" },
    teal: { stroke: "#8EE5D4", fill: "rgba(142,229,212,0.2)" },
    coral: { stroke: "#FF8A65", fill: "rgba(255,138,101,0.2)" },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="h-64 w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colorMap[color].stroke} stopOpacity={0.3} />
              <stop offset="95%" stopColor={colorMap[color].stroke} stopOpacity={0} />
            </linearGradient>
            {showSecondary && (
              <linearGradient id="gradient-secondary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8EE5D4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8EE5D4" stopOpacity={0} />
              </linearGradient>
            )}
          </defs>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "16px",
              boxShadow: "var(--shadow-soft)",
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={colorMap[color].stroke}
            strokeWidth={3}
            fillOpacity={1}
            fill={`url(#gradient-${color})`}
          />
          {showSecondary && (
            <Area
              type="monotone"
              dataKey="value2"
              stroke="#8EE5D4"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#gradient-secondary)"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
