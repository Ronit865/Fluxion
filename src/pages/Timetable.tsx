import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const scheduleBlocks = [
  { id: 1, title: "Data Structures", time: "08:00 - 10:00", type: "study", color: "bg-coral/20 border-coral text-coral" },
  { id: 2, title: "React Project", time: "10:30 - 12:30", type: "coding", color: "bg-primary/20 border-primary text-primary" },
  { id: 3, title: "Lunch Break", time: "12:30 - 13:30", type: "break", color: "bg-amber/20 border-amber text-amber" },
  { id: 4, title: "Algorithm Practice", time: "14:00 - 16:00", type: "coding", color: "bg-accent/20 border-accent text-accent" },
  { id: 5, title: "Physics Lecture", time: "16:30 - 18:00", type: "study", color: "bg-purple/20 border-purple text-purple" },
  { id: 6, title: "Side Project", time: "19:00 - 21:00", type: "coding", color: "bg-cyan/20 border-cyan text-cyan" },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Timetable() {
  const [selectedDay, setSelectedDay] = useState(2); // Wednesday
  const [view, setView] = useState<"day" | "week">("day");

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-1">Timetable</h1>
          <p className="text-muted-foreground">Plan your day, week, or month</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground font-medium hover-lift">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Block</span>
        </button>
      </motion.div>

      {/* View Switcher & Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
      >
        <div className="flex items-center gap-2 p-1 rounded-xl bg-secondary">
          {["day", "week"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v as "day" | "week")}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                view === v
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl bg-secondary hover:bg-muted transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="px-4 font-medium">December 2024</span>
          <button className="p-2 rounded-xl bg-secondary hover:bg-muted transition-colors">
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
          <button
            key={day}
            onClick={() => setSelectedDay(index)}
            className={cn(
              "flex flex-col items-center min-w-[60px] p-3 rounded-xl transition-all",
              selectedDay === index
                ? "gradient-primary text-primary-foreground shadow-glow"
                : "bg-card border border-border hover:border-primary/50"
            )}
          >
            <span className="text-xs font-medium">{day}</span>
            <span className="text-lg font-bold">{9 + index}</span>
          </button>
        ))}
      </motion.div>

      {/* AI Suggestion */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="flex items-center gap-3 p-4 rounded-2xl bg-purple/10 border border-purple/30 mb-6"
      >
        <div className="p-2 rounded-xl bg-purple/20">
          <Sparkles className="w-5 h-5 text-purple" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">AI Suggestion</p>
          <p className="text-xs text-muted-foreground">
            Consider moving your coding session earlier. Your focus peaks between 9-11 AM.
          </p>
        </div>
        <button className="text-xs font-medium text-purple hover:underline">Apply</button>
      </motion.div>

      {/* Schedule Blocks */}
      <div className="space-y-3">
        {scheduleBlocks.map((block, index) => (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            className={cn(
              "flex items-center gap-4 p-4 rounded-2xl border-l-4 bg-card border border-border hover-lift cursor-grab",
              block.color
            )}
          >
            <div className="flex-1">
              <h3 className="font-semibold mb-0.5">{block.title}</h3>
              <p className="text-sm text-muted-foreground">{block.time}</p>
            </div>
            <span className={cn("px-3 py-1 rounded-full text-xs font-medium capitalize", block.color)}>
              {block.type}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
