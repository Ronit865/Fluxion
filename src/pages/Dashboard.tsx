import { motion } from "framer-motion";
import { BookOpen, Code2, CheckSquare, Clock, Bell } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import { TasksOverview } from "@/components/dashboard/TasksOverview";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { FocusScore } from "@/components/dashboard/FocusScore";

export default function Dashboard() {
  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">
              Good morning, <span className="text-primary">Alex</span> 👋
            </h1>
            <p className="text-muted-foreground">
              Ready to crush your goals today? Let's make it count.
            </p>
          </div>
          <button className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary hover:bg-muted transition-colors">
            <Bell className="w-4 h-4" />
            <span className="text-sm">3 new</span>
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Study Hours"
          value="4.5h"
          subtitle="Today"
          icon={BookOpen}
          trend={{ value: 15, isPositive: true }}
          colorClass="text-coral"
          delay={0}
        />
        <StatCard
          title="Coding Hours"
          value="3.2h"
          subtitle="Today"
          icon={Code2}
          trend={{ value: 8, isPositive: true }}
          colorClass="text-primary"
          delay={0.1}
        />
        <StatCard
          title="Tasks Done"
          value="12/18"
          subtitle="This week"
          icon={CheckSquare}
          trend={{ value: 5, isPositive: false }}
          colorClass="text-accent"
          delay={0.2}
        />
        <StatCard
          title="Focus Time"
          value="5.8h"
          subtitle="Deep work"
          icon={Clock}
          trend={{ value: 22, isPositive: true }}
          colorClass="text-purple"
          delay={0.3}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyChart />
        </div>
        <div>
          <FocusScore />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <TasksOverview />
        <StreakCard />
      </div>
    </div>
  );
}
