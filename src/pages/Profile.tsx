import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Moon,
  Sun,
  Bell,
  Target,
  BookOpen,
  Code2,
  ChevronRight,
  Camera,
} from "lucide-react";
import { cn } from "@/lib/utils";

const subjects = [
  { name: "Mathematics", color: "bg-coral", active: true },
  { name: "Computer Science", color: "bg-primary", active: true },
  { name: "Physics", color: "bg-purple", active: true },
  { name: "Database", color: "bg-accent", active: false },
  { name: "Languages", color: "bg-amber", active: false },
];

const codingCategories = [
  { name: "Frontend", color: "bg-primary", active: true },
  { name: "Backend", color: "bg-accent", active: true },
  { name: "Mobile", color: "bg-purple", active: false },
  { name: "DevOps", color: "bg-coral", active: false },
];

export default function Profile() {
  const [isDark, setIsDark] = useState(true);
  const [notifications, setNotifications] = useState({
    tasks: true,
    reminders: true,
    weekly: false,
  });

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("light");
  };

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-bold mb-1">Profile</h1>
        <p className="text-muted-foreground">Manage your settings & preferences</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-6 border border-border mb-6"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-3xl font-bold text-primary-foreground">
              A
            </div>
            <button className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-secondary border border-border hover:bg-muted transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Alex Johnson</h2>
            <p className="text-muted-foreground">Computer Science Student</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <BookOpen className="w-3.5 h-3.5" />
                3rd Year
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Code2 className="w-3.5 h-3.5" />
                Full-Stack Dev
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Theme Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-4 border border-border mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isDark ? <Moon className="w-5 h-5 text-purple" /> : <Sun className="w-5 h-5 text-amber" />}
            <div>
              <h3 className="font-medium">Appearance</h3>
              <p className="text-sm text-muted-foreground">{isDark ? "Dark" : "Light"} mode</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={cn(
              "w-14 h-8 rounded-full p-1 transition-colors",
              isDark ? "bg-primary" : "bg-secondary"
            )}
          >
            <motion.div
              className="w-6 h-6 rounded-full bg-card shadow-md"
              animate={{ x: isDark ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl p-4 border border-border mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="font-medium">Notifications</h3>
        </div>
        <div className="space-y-3">
          {[
            { key: "tasks", label: "Task reminders" },
            { key: "reminders", label: "Study break reminders" },
            { key: "weekly", label: "Weekly progress report" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <button
                onClick={() =>
                  setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })
                }
                className={cn(
                  "w-11 h-6 rounded-full p-0.5 transition-colors",
                  notifications[item.key as keyof typeof notifications] ? "bg-accent" : "bg-secondary"
                )}
              >
                <motion.div
                  className="w-5 h-5 rounded-full bg-card shadow-sm"
                  animate={{ x: notifications[item.key as keyof typeof notifications] ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Study Subjects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl p-4 border border-border mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-coral" />
            <h3 className="font-medium">Study Subjects</h3>
          </div>
          <button className="text-sm text-primary hover:underline">Edit</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <span
              key={subject.name}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium",
                subject.active
                  ? `${subject.color}/20 text-foreground`
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {subject.name}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Coding Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card rounded-2xl p-4 border border-border mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Code2 className="w-5 h-5 text-primary" />
            <h3 className="font-medium">Coding Focus</h3>
          </div>
          <button className="text-sm text-primary hover:underline">Edit</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {codingCategories.map((category) => (
            <span
              key={category.name}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium",
                category.active
                  ? `${category.color}/20 text-foreground`
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {category.name}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-card rounded-2xl p-4 border border-border"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-accent" />
            <h3 className="font-medium">Weekly Goals</h3>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { label: "Study hours", current: 20, target: 25 },
            { label: "Coding hours", current: 15, target: 20 },
            { label: "Tasks completed", current: 18, target: 25 },
          ].map((goal) => (
            <div key={goal.label}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">{goal.label}</span>
                <span className="font-medium">
                  {goal.current}/{goal.target}
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full gradient-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                  transition={{ duration: 1, delay: 0.7 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
