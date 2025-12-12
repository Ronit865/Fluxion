import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface BubbleCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  glow?: "orange" | "blue" | "aqua" | "purple" | "neon" | "yellow" | "none";
  hover?: boolean;
  variant?: "default" | "gradient";
  gradientColor?: "orange" | "blue" | "aqua" | "purple" | "neon" | "yellow";
}

export function BubbleCard({
  children,
  className,
  delay = 0,
  glow = "none",
  hover = true,
  variant = "default",
  gradientColor,
}: BubbleCardProps) {
  const glowClasses = {
    orange: "hover:shadow-glow-orange",
    blue: "hover:shadow-glow-blue",
    aqua: "hover:shadow-glow-aqua",
    purple: "hover:shadow-glow-purple",
    neon: "hover:shadow-glow-neon",
    yellow: "hover:shadow-glow-yellow",
    none: "",
  };

  const gradientClasses = {
    orange: "widget-orange text-white",
    blue: "widget-blue text-white",
    aqua: "widget-aqua text-charcoal",
    purple: "widget-purple text-white",
    neon: "widget-neon text-charcoal",
    yellow: "widget-yellow text-charcoal",
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
        variant === "gradient" && gradientColor && gradientClasses[gradientColor],
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
  color?: "orange" | "blue" | "aqua" | "purple" | "neon" | "yellow" | "red";
  delay?: number;
  variant?: "default" | "widget";
}

export function StatBubble({
  icon: Icon,
  label,
  value,
  subtext,
  color = "orange",
  delay = 0,
  variant = "widget",
}: StatBubbleProps) {
  const widgetClasses = {
    orange: "widget-orange",
    blue: "widget-blue",
    aqua: "widget-aqua",
    purple: "widget-purple",
    neon: "widget-neon",
    yellow: "widget-yellow",
    red: "widget-red",
  };

  const textColorClasses = {
    orange: "text-white",
    blue: "text-white",
    aqua: "text-charcoal",
    purple: "text-white",
    neon: "text-charcoal",
    yellow: "text-charcoal",
    red: "text-white",
  };

  const subtextClasses = {
    orange: "bg-white/20 text-white",
    blue: "bg-white/20 text-white",
    aqua: "bg-charcoal/10 text-charcoal",
    purple: "bg-white/20 text-white",
    neon: "bg-charcoal/10 text-charcoal",
    yellow: "bg-charcoal/10 text-charcoal",
    red: "bg-white/20 text-white",
  };

  if (variant === "widget") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }}
        className={cn(
          "rounded-[1.5rem] p-5 hover-float transition-all",
          widgetClasses[color]
        )}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-sm">
            <Icon className={cn("w-5 h-5", textColorClasses[color])} />
          </div>
        </div>
        <p className={cn("text-sm mb-1 opacity-80", textColorClasses[color])}>{label}</p>
        <p className={cn("text-2xl font-bold", textColorClasses[color])}>{value}</p>
        {subtext && (
          <p className={cn("text-xs mt-1 px-2 py-0.5 rounded-full inline-block", subtextClasses[color])}>
            {subtext}
          </p>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }}
      className="bubble-sm p-5 hover-float"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("p-2.5 rounded-2xl", widgetClasses[color])}>
          <Icon className={cn("w-5 h-5", textColorClasses[color])} />
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      {subtext && (
        <p className={cn("text-xs mt-1 px-2 py-0.5 rounded-full inline-block bg-primary/10 text-primary")}>
          {subtext}
        </p>
      )}
    </motion.div>
  );
}