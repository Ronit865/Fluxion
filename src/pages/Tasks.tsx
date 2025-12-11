import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Plus,
  Code2,
  BookOpen,
  Timer,
  Flame,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

const studyTasks = [
  { id: 1, title: "Complete calculus homework", subject: "Mathematics", completed: true, priority: "high" },
  { id: 2, title: "Read chapter 5 - Operating Systems", subject: "CS", completed: true, priority: "medium" },
  { id: 3, title: "Review physics formulas", subject: "Physics", completed: false, priority: "high" },
  { id: 4, title: "Prepare presentation slides", subject: "Communication", completed: false, priority: "low" },
  { id: 5, title: "Practice SQL queries", subject: "Database", completed: false, priority: "medium" },
];

const codingTasks = [
  { id: 1, title: "Implement user authentication", project: "Portfolio", completed: true, difficulty: "hard" },
  { id: 2, title: "Fix responsive navbar", project: "Client Site", completed: true, difficulty: "easy" },
  { id: 3, title: "Add dark mode toggle", project: "Dashboard", completed: false, difficulty: "medium" },
  { id: 4, title: "Write unit tests", project: "API", completed: false, difficulty: "hard" },
  { id: 5, title: "Optimize database queries", project: "Backend", completed: false, difficulty: "hard" },
];

const priorityColors = {
  high: "bg-destructive/20 text-destructive",
  medium: "bg-amber/20 text-amber",
  low: "bg-accent/20 text-accent",
};

const difficultyColors = {
  easy: "bg-accent/20 text-accent",
  medium: "bg-amber/20 text-amber",
  hard: "bg-destructive/20 text-destructive",
};

export default function Tasks() {
  const [activeTab, setActiveTab] = useState<"study" | "coding">("study");
  const [timerRunning, setTimerRunning] = useState(false);
  const [time, setTime] = useState(25 * 60);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-1">Tasks</h1>
          <p className="text-muted-foreground">Study & Coding to-do list</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground font-medium hover-lift">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Task</span>
        </button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tasks List */}
        <div className="lg:col-span-2">
          {/* Tab Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-2 p-1 rounded-xl bg-secondary mb-6"
          >
            <button
              onClick={() => setActiveTab("study")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all",
                activeTab === "study"
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <BookOpen className="w-4 h-4" />
              Study Tasks
            </button>
            <button
              onClick={() => setActiveTab("coding")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all",
                activeTab === "coding"
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Code2 className="w-4 h-4" />
              Coding Tasks
            </button>
          </motion.div>

          {/* Tasks */}
          <div className="space-y-3">
            {(activeTab === "study" ? studyTasks : codingTasks).map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover-lift",
                  task.completed && "opacity-60"
                )}
              >
                <button className="flex-shrink-0">
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className={cn("font-medium truncate", task.completed && "line-through")}>
                    {task.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {activeTab === "study" ? (task as typeof studyTasks[0]).subject : (task as typeof codingTasks[0]).project}
                  </p>
                </div>
                <span
                  className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-medium capitalize",
                    activeTab === "study"
                      ? priorityColors[(task as typeof studyTasks[0]).priority as keyof typeof priorityColors]
                      : difficultyColors[(task as typeof codingTasks[0]).difficulty as keyof typeof difficultyColors]
                  )}
                >
                  {activeTab === "study" ? (task as typeof studyTasks[0]).priority : (task as typeof codingTasks[0]).difficulty}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pomodoro Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl p-5 border border-border shadow-card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-primary/20">
                <Timer className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Focus Timer</h3>
                <p className="text-xs text-muted-foreground">Pomodoro technique</p>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-5xl font-bold font-mono text-gradient mb-2">
                {formatTime(time)}
              </div>
              <p className="text-sm text-muted-foreground">Focus Session</p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="p-4 rounded-full gradient-primary shadow-glow hover-lift"
              >
                {timerRunning ? (
                  <Pause className="w-6 h-6 text-primary-foreground" />
                ) : (
                  <Play className="w-6 h-6 text-primary-foreground" />
                )}
              </button>
              <button
                onClick={() => setTime(25 * 60)}
                className="p-3 rounded-full bg-secondary hover:bg-muted transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl p-5 border border-border shadow-card"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-coral/20">
                <Flame className="w-5 h-5 text-coral" />
              </div>
              <div>
                <h3 className="font-semibold">Task Streak</h3>
                <p className="text-xs text-muted-foreground">Complete daily tasks</p>
              </div>
            </div>

            <div className="text-center mb-4">
              <span className="text-4xl font-bold text-gradient">7</span>
              <span className="text-muted-foreground ml-2">day streak</span>
            </div>

            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div
                  key={day}
                  className="w-8 h-8 rounded-lg gradient-warm flex items-center justify-center text-xs font-bold text-amber-foreground"
                >
                  ✓
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
