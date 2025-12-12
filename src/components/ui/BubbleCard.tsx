import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface BubbleCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  variant?: "default" | "dark";
}

export function BubbleCard({
  children,
  className,
  delay = 0,
  hover = true,
  variant = "default",
}: BubbleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay, type: "spring", stiffness: 200 }}
      className={cn(
        "bubble p-5",
        hover && "hover:shadow-floating transition-shadow",
        variant === "dark" && "bg-charcoal text-white border-charcoal",
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
}

export function StatBubble({
  icon: Icon,
  label,
  value,
  subtext,
  color = "orange",
  delay = 0,
}: StatBubbleProps) {
  // Dark card style like reference images
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay, type: "spring", stiffness: 200 }}
      className="rounded-2xl p-4 bg-charcoal text-white border border-charcoal hover:shadow-floating transition-shadow"
    >
      <div className="flex items-start justify-between mb-2">
        <div className={cn(
          "p-2 rounded-xl",
          color === "orange" && "bg-orange/20",
          color === "blue" && "bg-blue/20",
          color === "aqua" && "bg-aqua/20",
          color === "purple" && "bg-purple/20",
          color === "neon" && "bg-neon-green/20",
          color === "yellow" && "bg-yellow/20",
          color === "red" && "bg-red/20",
        )}>
          <Icon className={cn(
            "w-4 h-4",
            color === "orange" && "text-orange",
            color === "blue" && "text-blue",
            color === "aqua" && "text-aqua",
            color === "purple" && "text-purple",
            color === "neon" && "text-neon-green",
            color === "yellow" && "text-yellow",
            color === "red" && "text-red",
          )} />
        </div>
      </div>
      <p className="text-xs text-white/60 mb-0.5">{label}</p>
      <p className="text-xl font-bold">{value}</p>
      {subtext && (
        <p className={cn(
          "text-xs mt-1 px-2 py-0.5 rounded-full inline-block",
          color === "orange" && "bg-orange/20 text-orange",
          color === "blue" && "bg-blue/20 text-blue",
          color === "aqua" && "bg-aqua/20 text-aqua",
          color === "purple" && "bg-purple/20 text-purple",
          color === "neon" && "bg-neon-green/20 text-neon-green",
          color === "yellow" && "bg-yellow/20 text-yellow",
          color === "red" && "bg-red/20 text-red",
        )}>
          {subtext}
        </p>
      )}
    </motion.div>
  );
}