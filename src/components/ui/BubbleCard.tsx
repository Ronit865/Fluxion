import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface BubbleCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  glow?: "lime" | "teal" | "coral" | "none";
  hover?: boolean;
}

export function BubbleCard({
  children,
  className,
  delay = 0,
  glow = "none",
  hover = true,
}: BubbleCardProps) {
  const glowClasses = {
    lime: "hover:shadow-glow-lime",
    teal: "hover:shadow-glow-teal",
    coral: "hover:shadow-glow-coral",
    none: "",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }}
      className={cn(
        "bubble p-6",
        hover && "hover-float",
        glowClasses[glow],
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface StatBubbleProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subtext?: string;
  color?: "lime" | "teal" | "coral" | "yellow";
  delay?: number;
}

export function StatBubble({
  icon: Icon,
  label,
  value,
  subtext,
  color = "lime",
  delay = 0,
}: StatBubbleProps) {
  const colorClasses = {
    lime: "bg-neon-lime/20 text-neon-lime",
    teal: "bg-teal/20 text-teal",
    coral: "bg-coral/20 text-coral",
    yellow: "bg-yellow/20 text-yellow",
  };

  const iconBgClasses = {
    lime: "bg-neon-lime",
    teal: "bg-teal",
    coral: "bg-coral",
    yellow: "bg-yellow",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }}
      className="bubble-sm p-5 hover-float"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("p-2.5 rounded-2xl", iconBgClasses[color])}>
          <Icon className="w-5 h-5 text-charcoal" />
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      {subtext && (
        <p className={cn("text-xs mt-1 px-2 py-0.5 rounded-full inline-block", colorClasses[color])}>
          {subtext}
        </p>
      )}
    </motion.div>
  );
}
