import { motion } from "framer-motion";

interface BubbleProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: "lime" | "teal" | "coral";
  label?: string;
  showValue?: boolean;
}

export function BubbleProgress({
  value,
  size = 120,
  strokeWidth = 12,
  color = "lime",
  label,
  showValue = true,
}: BubbleProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const colorMap = {
    lime: "#D8FF2A",
    teal: "#8EE5D4",
    coral: "#FF8A65",
  };

  const glowMap = {
    lime: "drop-shadow(0 0 10px rgba(216,255,42,0.5))",
    teal: "drop-shadow(0 0 10px rgba(142,229,212,0.5))",
    coral: "drop-shadow(0 0 10px rgba(255,138,101,0.5))",
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colorMap[color]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ filter: glowMap[color] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showValue && (
          <span className="text-2xl font-bold">{Math.round(value)}%</span>
        )}
        {label && (
          <span className="text-xs text-muted-foreground">{label}</span>
        )}
      </div>
    </div>
  );
}

interface LinearBubbleProgressProps {
  value: number;
  color?: "lime" | "teal" | "coral";
  label?: string;
  showValue?: boolean;
}

export function LinearBubbleProgress({
  value,
  color = "lime",
  label,
  showValue = true,
}: LinearBubbleProgressProps) {
  const colorClasses = {
    lime: "bg-neon-lime",
    teal: "bg-teal",
    coral: "bg-coral",
  };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm text-muted-foreground">{label}</span>}
          {showValue && <span className="text-sm font-medium">{value}%</span>}
        </div>
      )}
      <div className="h-3 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${colorClasses[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
