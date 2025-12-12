import { useState } from "react";
import { motion } from "framer-motion";
import { User, Moon, Sun, Bell, Target, Settings, ChevronRight, Camera, Award, Flame, BookOpen, Code2, Palette, Sparkles } from "lucide-react";
import { BubbleCard } from "@/components/ui/BubbleCard";
import { LinearBubbleProgress } from "@/components/ui/BubbleProgress";
import { cn } from "@/lib/utils";

const achievements = [
  { icon: Flame, title: "12 Day Streak", desc: "Consistency master", color: "orange" },
  { icon: Award, title: "Top 10%", desc: "Weekly rankings", color: "purple" },
  { icon: BookOpen, title: "100h Study", desc: "Study milestone", color: "blue" },
];

const subjects = ["Mathematics", "Computer Science", "Physics", "Database", "Languages"];
const codingFocus = ["Frontend", "Backend", "Mobile", "DevOps"];

const primaryColors = [
  { name: "Orange", value: "#FF4F17", class: "bg-orange" },
  { name: "Blue", value: "#2D8CFF", class: "bg-blue" },
  { name: "Purple", value: "#845CFF", class: "bg-purple" },
  { name: "Aqua", value: "#29E3C2", class: "bg-aqua" },
  { name: "Neon", value: "#B6FF2A", class: "bg-neon-green" },
  { name: "Red", value: "#FF2E35", class: "bg-red" },
];

const cardStyles = [
  { name: "Flat", value: "flat" },
  { name: "Gradient", value: "gradient" },
  { name: "Glow", value: "glow" },
];

export default function ProfilePage() {
  const [isDark, setIsDark] = useState(false);
  const [selectedPrimary, setSelectedPrimary] = useState(0);
  const [selectedCardStyle, setSelectedCardStyle] = useState(1);
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
            <div className="w-20 h-20 rounded-[1.5rem] gradient-orange flex items-center justify-center text-3xl font-bold text-white glow-orange">
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
              <span className="pill-sm bg-orange/10 text-orange text-xs flex items-center gap-1 font-medium">
                <BookOpen className="w-3 h-3" />
                3rd Year
              </span>
              <span className="pill-sm bg-blue/10 text-blue text-xs flex items-center gap-1 font-medium">
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
        {achievements.map((achievement) => {
          const widgetClasses = {
            orange: "widget-orange",
            purple: "widget-purple",
            blue: "widget-blue",
          };
          const textClasses = {
            orange: "text-white",
            purple: "text-white",
            blue: "text-white",
          };
          return (
            <div
              key={achievement.title}
              className={cn("rounded-[1.5rem] p-4 text-center hover-float", widgetClasses[achievement.color as keyof typeof widgetClasses])}
            >
              <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center bg-white/20">
                <achievement.icon className={cn("w-5 h-5", textClasses[achievement.color as keyof typeof textClasses])} />
              </div>
              <p className={cn("text-sm font-medium", textClasses[achievement.color as keyof typeof textClasses])}>{achievement.title}</p>
              <p className={cn("text-xs opacity-80", textClasses[achievement.color as keyof typeof textClasses])}>{achievement.desc}</p>
            </div>
          );
        })}
      </motion.div>

      {/* Theme Customization */}
      <BubbleCard delay={0.25} className="mb-4" glow="purple">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl widget-purple">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-medium">Theme Customization</h3>
        </div>
        
        {/* Primary Color */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-3">Primary Color</p>
          <div className="flex gap-2">
            {primaryColors.map((color, index) => (
              <button
                key={color.name}
                onClick={() => setSelectedPrimary(index)}
                className={cn(
                  "w-10 h-10 rounded-xl transition-all",
                  color.class,
                  selectedPrimary === index 
                    ? "ring-2 ring-offset-2 ring-foreground scale-110" 
                    : "hover:scale-105"
                )}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Card Style */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-3">Card Style</p>
          <div className="flex gap-2">
            {cardStyles.map((style, index) => (
              <button
                key={style.name}
                onClick={() => setSelectedCardStyle(index)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                  selectedCardStyle === index
                    ? "widget-orange text-white"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                )}
              >
                {style.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dark/Light Mode */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-3">
            {isDark ? (
              <Moon className="w-5 h-5 text-purple" />
            ) : (
              <Sun className="w-5 h-5 text-yellow" />
            )}
            <div>
              <p className="font-medium text-sm">{isDark ? "Dark" : "Light"} Mode</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={cn(
              "w-14 h-8 rounded-full p-1 transition-all",
              isDark ? "widget-purple" : "bg-secondary"
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
          <div className="p-2 rounded-xl widget-blue">
            <Bell className="w-5 h-5 text-white" />
          </div>
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
                    ? "widget-orange"
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
            <div className="p-2 rounded-xl widget-aqua">
              <BookOpen className="w-5 h-5 text-charcoal" />
            </div>
            <h3 className="font-medium">Study Subjects</h3>
          </div>
          <button className="text-sm text-orange hover:underline font-medium">Edit</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject, index) => (
            <span
              key={subject}
              className={cn(
                "pill-sm text-sm font-medium",
                index < 3 ? "bg-orange/10 text-orange" : "bg-secondary text-muted-foreground"
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
            <div className="p-2 rounded-xl widget-neon">
              <Code2 className="w-5 h-5 text-charcoal" />
            </div>
            <h3 className="font-medium">Coding Focus</h3>
          </div>
          <button className="text-sm text-orange hover:underline font-medium">Edit</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {codingFocus.map((focus, index) => (
            <span
              key={focus}
              className={cn(
                "pill-sm text-sm font-medium",
                index < 2 ? "bg-blue/10 text-blue" : "bg-secondary text-muted-foreground"
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
            <div className="p-2 rounded-xl widget-yellow">
              <Target className="w-5 h-5 text-charcoal" />
            </div>
            <h3 className="font-medium">Weekly Goals</h3>
          </div>
        </div>
        <div className="space-y-4">
          <LinearBubbleProgress value={80} color="orange" label="Study hours" />
          <LinearBubbleProgress value={75} color="blue" label="Coding hours" />
          <LinearBubbleProgress value={72} color="purple" label="Tasks completed" />
        </div>
      </BubbleCard>
    </div>
  );
}