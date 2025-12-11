import { motion } from "framer-motion";
import { ProgressRing } from "./ProgressRing";
import { Brain, TrendingUp } from "lucide-react";

export function FocusScore() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card rounded-2xl p-5 border border-border shadow-card"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-purple/20">
          <Brain className="w-5 h-5 text-purple" />
        </div>
        <div>
          <h3 className="font-semibold">Focus Score</h3>
          <p className="text-xs text-muted-foreground">Today's performance</p>
        </div>
      </div>

      <div className="flex items-center justify-center my-4">
        <ProgressRing
          progress={78}
          size={140}
          strokeWidth={10}
          color="hsl(var(--purple))"
          value="78%"
          label="Focus"
        />
      </div>

      <div className="flex items-center justify-center gap-2 text-sm">
        <TrendingUp className="w-4 h-4 text-accent" />
        <span className="text-muted-foreground">+12% from yesterday</span>
      </div>
    </motion.div>
  );
}
