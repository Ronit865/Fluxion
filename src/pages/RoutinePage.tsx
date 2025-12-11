import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Clock, ChevronLeft, ChevronRight, Sparkles, GripVertical } from "lucide-react";
import { BubbleCard } from "@/components/ui/BubbleCard";
import { cn } from "@/lib/utils";

const scheduleBlocks = [
  { id: 1, title: "Morning Study", time: "08:00 - 10:00", type: "study", color: "lime" },
  { id: 2, title: "React Development", time: "10:30 - 12:30", type: "coding", color: "teal" },
  { id: 3, title: "Lunch Break", time: "12:30 - 13:30", type: "break", color: "yellow" },
  { id: 4, title: "Algorithm Practice", time: "14:00 - 16:00", type: "coding", color: "teal" },
  { id: 5, title: "Physics Review", time: "16:30 - 18:00", type: "study", color: "coral" },
  { id: 6, title: "Personal Project", time: "19:00 - 21:00", type: "coding", color: "lime" },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const colorClasses = {
  lime: { bg: "bg-neon-lime/20", border: "border-neon-lime", text: "text-neon-lime", pill: "bg-neon-lime text-charcoal" },
  teal: { bg: "bg-teal/20", border: "border-teal", text: "text-teal", pill: "bg-teal text-charcoal" },
  coral: { bg: "bg-coral/20", border: "border-coral", text: "text-coral", pill: "bg-coral text-charcoal" },
  yellow: { bg: "bg-yellow/20", border: "border-yellow", text: "text-yellow", pill: "bg-yellow text-charcoal" },
};

export default function RoutinePage() {
  const [selectedDay, setSelectedDay] = useState(2);
  const [view, setView] = useState<"day" | "week">("day");

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-1">Routine Manager</h1>
          <p className="text-muted-foreground">Plan your perfect day</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 pill bg-neon-lime text-charcoal font-semibold shadow-glow-lime"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Add Block</span>
        </motion.button>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
      >
        {/* View Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-card shadow-soft">
          {["day", "week"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v as "day" | "week")}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all capitalize",
                view === v
                  ? "bg-neon-lime text-charcoal shadow-glow-lime"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full bg-card shadow-soft hover:shadow-floating transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="px-4 font-medium">December 2024</span>
          <button className="p-2 rounded-full bg-card shadow-soft hover:shadow-floating transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Day Selector */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 mb-6 overflow-x-auto pb-2"
      >
        {days.map((day, index) => (
          <motion.button
            key={day}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedDay(index)}
            className={cn(
              "flex flex-col items-center min-w-[70px] p-3 rounded-2xl transition-all",
              selectedDay === index
                ? "bg-neon-lime text-charcoal shadow-glow-lime"
                : "bg-card shadow-soft hover:shadow-floating"
            )}
          >
            <span className="text-xs font-medium opacity-70">{day}</span>
            <span className="text-xl font-bold">{9 + index}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* AI Suggestion */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-4 p-4 rounded-[2rem] bg-teal/10 border border-teal/30 mb-6"
      >
        <div className="p-3 rounded-2xl bg-teal shadow-glow-teal">
          <Sparkles className="w-5 h-5 text-charcoal" />
        </div>
        <div className="flex-1">
          <p className="font-medium mb-0.5">AI Suggestion</p>
          <p className="text-sm text-muted-foreground">
            Your focus peaks at 9-11 AM. Consider scheduling deep work tasks during this time.
          </p>
        </div>
        <button className="pill-sm bg-teal text-charcoal font-medium">Apply</button>
      </motion.div>

      {/* Schedule Blocks */}
      <div className="space-y-3">
        {scheduleBlocks.map((block, index) => {
          const colors = colorClasses[block.color as keyof typeof colorClasses];
          return (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              className={cn(
                "flex items-center gap-4 p-4 rounded-[1.5rem] border-l-4 bg-card shadow-soft cursor-grab hover:shadow-floating transition-all",
                colors.border,
                colors.bg
              )}
            >
              <GripVertical className="w-5 h-5 text-muted-foreground/50" />
              <div className="flex-1">
                <h3 className="font-semibold mb-0.5">{block.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{block.time}</span>
                </div>
              </div>
              <span className={cn("pill-sm font-medium text-xs capitalize", colors.pill)}>
                {block.type}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        {[
          { label: "Total Hours", value: "8.5h", color: "lime" },
          { label: "Study Time", value: "4h", color: "coral" },
          { label: "Coding Time", value: "4.5h", color: "teal" },
        ].map((stat, index) => (
          <BubbleCard key={stat.label} delay={0.7 + index * 0.1} className="text-center p-4">
            <p className="text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </BubbleCard>
        ))}
      </div>
    </div>
  );
}
