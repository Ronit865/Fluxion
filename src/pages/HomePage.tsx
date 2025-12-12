import { motion } from "framer-motion";
import { Zap, Clock, Target, Sparkles, ChevronRight, Sun, Moon } from "lucide-react";
import { BubbleCard, StatBubble } from "@/components/ui/BubbleCard";
import { BubbleProgress, LinearBubbleProgress } from "@/components/ui/BubbleProgress";
import { BubbleAreaChart } from "@/components/ui/BubbleChart";

const chartData = [
  { name: "Mon", value: 4, value2: 3 },
  { name: "Tue", value: 3, value2: 5 },
  { name: "Wed", value: 5, value2: 4 },
  { name: "Thu", value: 6, value2: 6 },
  { name: "Fri", value: 4, value2: 5 },
  { name: "Sat", value: 7, value2: 7 },
  { name: "Sun", value: 5, value2: 4 },
];

const tasks = [
  { id: 1, title: "Complete React module", time: "2h", completed: true, color: "orange" },
  { id: 2, title: "Review algorithms", time: "1.5h", completed: true, color: "blue" },
  { id: 3, title: "Build API integration", time: "3h", completed: false, color: "purple" },
  { id: 4, title: "Practice coding", time: "1h", completed: false, color: "aqua" },
];

export default function HomePage() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      {/* Curved Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-8"
      >
        {/* Decorative Blobs */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange/20 blob animate-float-slow blur-3xl" />
        <div className="absolute -top-10 right-20 w-24 h-24 bg-blue/20 blob-alt animate-float blur-2xl" />

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {hour < 18 ? (
                <Sun className="w-5 h-5 text-yellow" />
              ) : (
                <Moon className="w-5 h-5 text-purple" />
              )}
              <span className="text-sm text-muted-foreground">{greeting}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-1">
              Welcome back, <span className="text-gradient-orange">Alex</span>
            </h1>
            <p className="text-muted-foreground">
              Ready to crush your goals today?
            </p>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="hidden lg:flex items-center gap-3 pill bg-card shadow-soft"
          >
            <div className="w-12 h-12 rounded-full gradient-orange flex items-center justify-center glow-orange">
              <span className="text-xl font-bold text-white">A</span>
            </div>
            <div>
              <p className="font-semibold">Alex Johnson</p>
              <p className="text-xs text-muted-foreground">Student + Developer</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatBubble
          icon={Clock}
          label="Study Hours"
          value="4.5h"
          subtext="+15%"
          color="orange"
          delay={0}
        />
        <StatBubble
          icon={Zap}
          label="Coding Hours"
          value="3.2h"
          subtext="+8%"
          color="blue"
          delay={0.1}
        />
        <StatBubble
          icon={Target}
          label="Tasks Done"
          value="12/18"
          subtext="66%"
          color="purple"
          delay={0.2}
        />
        <StatBubble
          icon={Sparkles}
          label="Focus Score"
          value="85%"
          subtext="Great!"
          color="neon"
          delay={0.3}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Weekly Activity */}
        <BubbleCard className="lg:col-span-2" delay={0.3} glow="orange">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg">Weekly Activity</h3>
              <p className="text-sm text-muted-foreground">Study & Coding hours</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange" />
                <span className="text-muted-foreground">Study</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue" />
                <span className="text-muted-foreground">Coding</span>
              </div>
            </div>
          </div>
          <BubbleAreaChart data={chartData} color="orange" showSecondary />
        </BubbleCard>

        {/* Focus Score */}
        <BubbleCard delay={0.4} glow="aqua">
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-1">Focus Score</h3>
            <p className="text-sm text-muted-foreground mb-6">Today's performance</p>
            <div className="flex justify-center mb-4">
              <BubbleProgress value={85} size={140} color="aqua" label="Focus" />
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="text-orange font-medium">+12%</span> from yesterday
            </p>
          </div>
        </BubbleCard>
      </div>

      {/* Tasks & Progress */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <BubbleCard delay={0.5}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Today's Tasks</h3>
            <span className="pill-sm bg-orange/10 text-orange text-sm font-medium">2/4 done</span>
          </div>
          <div className="space-y-3">
            {tasks.map((task, index) => {
              const colorClasses = {
                orange: "border-orange/50 hover:border-orange",
                blue: "border-blue/50 hover:border-blue",
                purple: "border-purple/50 hover:border-purple",
                aqua: "border-aqua/50 hover:border-aqua",
              };
              const checkClasses = {
                orange: "bg-orange border-orange",
                blue: "bg-blue border-blue",
                purple: "bg-purple border-purple",
                aqua: "bg-aqua border-aqua",
              };
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className={`flex items-center gap-3 p-3 rounded-2xl transition-all border-2 ${
                    task.completed 
                      ? "bg-secondary/50 border-transparent" 
                      : `bg-card ${colorClasses[task.color as keyof typeof colorClasses]}`
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      task.completed
                        ? checkClasses[task.color as keyof typeof checkClasses]
                        : "border-muted-foreground"
                    }`}
                  >
                    {task.completed && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${task.completed && "line-through text-muted-foreground"}`}>
                      {task.title}
                    </p>
                  </div>
                  <span className="pill-sm bg-secondary text-xs text-muted-foreground">
                    {task.time}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </BubbleCard>

        {/* Weekly Progress */}
        <BubbleCard delay={0.6}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg">Weekly Progress</h3>
            <button className="flex items-center gap-1 text-sm text-orange hover:underline">
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-5">
            <LinearBubbleProgress value={80} color="orange" label="Study Goals" />
            <LinearBubbleProgress value={65} color="blue" label="Coding Goals" />
            <LinearBubbleProgress value={90} color="purple" label="Exercise Goals" />
          </div>

          <motion.div 
            className="mt-6 p-4 rounded-2xl gradient-orange glow-orange"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Weekly Insight</span>
            </div>
            <p className="text-xs text-white/80">
              You're on track! Coding hours increased by 20% this week.
            </p>
          </motion.div>
        </BubbleCard>
      </div>
    </div>
  );
}