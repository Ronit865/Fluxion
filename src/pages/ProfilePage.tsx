import { useState } from "react";
import { motion } from "framer-motion";
import { User, Moon, Sun, Bell, Target, Settings, ChevronRight, Camera, Award, Flame, BookOpen, Code2 } from "lucide-react";
import { BubbleCard } from "@/components/ui/BubbleCard";
import { LinearBubbleProgress } from "@/components/ui/BubbleProgress";
import { cn } from "@/lib/utils";

const achievements = [
  { icon: Flame, title: "12 Day Streak", desc: "Consistency master", color: "coral" },
  { icon: Award, title: "Top 10%", desc: "Weekly rankings", color: "lime" },
  { icon: BookOpen, title: "100h Study", desc: "Study milestone", color: "teal" },
];

const subjects = ["Mathematics", "Computer Science", "Physics", "Database", "Languages"];
const codingFocus = ["Frontend", "Backend", "Mobile", "DevOps"];

export default function ProfilePage() {
  const [isDark, setIsDark] = useState(false);
  const [notifications, setNotifications] = useState({
    tasks: true,
    breaks: true,
    weekly: false,
  });

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold mb-1">Profile</h1>
        <p className="text-muted-foreground">Manage your settings & preferences</p>
      </motion.div>

      {/* Profile Card */}
      <BubbleCard delay={0.1} className="mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-[1.5rem] gradient-lime flex items-center justify-center text-3xl font-bold text-charcoal shadow-glow-lime">
              A
            </div>
            <button className="absolute -bottom-1 -right-1 p-2 rounded-full bg-card shadow-soft border border-border hover:shadow-floating transition-all">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Alex Johnson</h2>
            <p className="text-muted-foreground mb-2">Computer Science Student</p>
            <div className="flex items-center gap-3">
              <span className="pill-sm bg-secondary text-xs flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                3rd Year
              </span>
              <span className="pill-sm bg-secondary text-xs flex items-center gap-1">
                <Code2 className="w-3 h-3" />
                Full-Stack
              </span>
            </div>
          </div>
        </div>
      </BubbleCard>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        {achievements.map((achievement, index) => {
          const colorClasses = {
            lime: "bg-neon-lime text-charcoal",
            teal: "bg-teal text-charcoal",
            coral: "bg-coral text-charcoal",
          };
          return (
            <div
              key={achievement.title}
              className="bubble-sm p-4 text-center hover-float"
            >
              <div className={cn("w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center", colorClasses[achievement.color as keyof typeof colorClasses])}>
                <achievement.icon className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium">{achievement.title}</p>
              <p className="text-xs text-muted-foreground">{achievement.desc}</p>
            </div>
          );
        })}
      </motion.div>

      {/* Theme Toggle */}
      <BubbleCard delay={0.3} className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isDark ? (
              <Moon className="w-5 h-5 text-teal" />
            ) : (
              <Sun className="w-5 h-5 text-yellow" />
            )}
            <div>
              <h3 className="font-medium">Appearance</h3>
              <p className="text-sm text-muted-foreground">{isDark ? "Dark" : "Light"} mode</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={cn(
              "w-14 h-8 rounded-full p-1 transition-all",
              isDark ? "bg-neon-lime shadow-glow-lime" : "bg-secondary"
            )}
          >
            <motion.div
              className="w-6 h-6 rounded-full bg-card shadow-sm"
              animate={{ x: isDark ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
      </BubbleCard>

      {/* Notifications */}
      <BubbleCard delay={0.4} className="mb-4">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-neon-lime" />
          <h3 className="font-medium">Notifications</h3>
        </div>
        <div className="space-y-3">
          {[
            { key: "tasks", label: "Task reminders" },
            { key: "breaks", label: "Break reminders" },
            { key: "weekly", label: "Weekly reports" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <button
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    [item.key]: !notifications[item.key as keyof typeof notifications],
                  })
                }
                className={cn(
                  "w-11 h-6 rounded-full p-0.5 transition-all",
                  notifications[item.key as keyof typeof notifications]
                    ? "bg-neon-lime shadow-glow-lime"
                    : "bg-secondary"
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
      </BubbleCard>

      {/* Subjects */}
      <BubbleCard delay={0.5} className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-coral" />
            <h3 className="font-medium">Study Subjects</h3>
          </div>
          <button className="text-sm text-neon-lime hover:underline">Edit</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject, index) => (
            <span
              key={subject}
              className={cn(
                "pill-sm text-sm",
                index < 3 ? "bg-neon-lime/20 text-foreground" : "bg-secondary text-muted-foreground"
              )}
            >
              {subject}
            </span>
          ))}
        </div>
      </BubbleCard>

      {/* Coding Focus */}
      <BubbleCard delay={0.6} className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Code2 className="w-5 h-5 text-teal" />
            <h3 className="font-medium">Coding Focus</h3>
          </div>
          <button className="text-sm text-neon-lime hover:underline">Edit</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {codingFocus.map((focus, index) => (
            <span
              key={focus}
              className={cn(
                "pill-sm text-sm",
                index < 2 ? "bg-teal/20 text-foreground" : "bg-secondary text-muted-foreground"
              )}
            >
              {focus}
            </span>
          ))}
        </div>
      </BubbleCard>

      {/* Weekly Goals */}
      <BubbleCard delay={0.7}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-neon-lime" />
            <h3 className="font-medium">Weekly Goals</h3>
          </div>
        </div>
        <div className="space-y-4">
          <LinearBubbleProgress value={80} color="lime" label="Study hours" />
          <LinearBubbleProgress value={75} color="teal" label="Coding hours" />
          <LinearBubbleProgress value={72} color="coral" label="Tasks completed" />
        </div>
      </BubbleCard>
    </div>
  );
}
