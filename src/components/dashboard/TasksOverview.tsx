import { motion } from "framer-motion";
import { CheckCircle2, Circle, Code2, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const tasks = [
  { id: 1, title: "Complete React hooks chapter", type: "study", completed: true },
  { id: 2, title: "Build API integration", type: "coding", completed: true },
  { id: 3, title: "Review algorithms notes", type: "study", completed: false },
  { id: 4, title: "Debug authentication flow", type: "coding", completed: false },
  { id: 5, title: "Prepare for quiz", type: "study", completed: false },
];

export function TasksOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-card rounded-2xl p-5 border border-border shadow-card"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Today's Tasks</h3>
        <span className="text-xs text-muted-foreground">2/5 completed</span>
      </div>
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl transition-colors",
              task.completed ? "bg-secondary/50" : "bg-secondary hover:bg-muted"
            )}
          >
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            )}
            <span
              className={cn(
                "flex-1 text-sm",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </span>
            {task.type === "coding" ? (
              <Code2 className="w-4 h-4 text-primary" />
            ) : (
              <BookOpen className="w-4 h-4 text-coral" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
