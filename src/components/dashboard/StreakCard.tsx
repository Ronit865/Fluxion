import { motion } from "framer-motion";
import { Flame, Trophy, Target } from "lucide-react";

export function StreakCard() {
  const streakDays = [true, true, true, true, true, false, false];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-card rounded-2xl p-5 border border-border shadow-card"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-coral/20">
          <Flame className="w-5 h-5 text-coral" />
        </div>
        <div>
          <h3 className="font-semibold">Current Streak</h3>
          <p className="text-xs text-muted-foreground">Keep the momentum!</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-5xl font-bold text-primary">5</span>
        <span className="text-muted-foreground">days</span>
      </div>

      <div className="flex justify-between gap-1 mb-4">
        {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium",
                streakDays[i]
                  ? "gradient-warm text-amber-foreground"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {streakDays[i] ? "✓" : ""}
            </div>
            <span className="text-[10px] text-muted-foreground">{day}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-amber" />
          <span className="text-muted-foreground">Best: 12 days</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Target className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Goal: 30 days</span>
        </div>
      </div>
    </motion.div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
