import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, Target, Award, Brain, Flame, Calendar } from "lucide-react";
import { BubbleCard } from "@/components/ui/BubbleCard";
import { BubbleProgress } from "@/components/ui/BubbleProgress";

const weeklyData = [
  { name: "Mon", study: 4, coding: 3 },
  { name: "Tue", study: 3, coding: 5 },
  { name: "Wed", study: 5, coding: 4 },
  { name: "Thu", study: 6, coding: 6 },
  { name: "Fri", study: 4, coding: 5 },
  { name: "Sat", study: 7, coding: 7 },
  { name: "Sun", study: 5, coding: 4 },
];

const subjectData = [
  { name: "Math", hours: 12, fill: "#D8FF2A" },
  { name: "CS", hours: 18, fill: "#8EE5D4" },
  { name: "Physics", hours: 8, fill: "#FF8A65" },
  { name: "Database", hours: 10, fill: "#FFEB3B" },
];

const skillsData = [
  { skill: "React", level: 85 },
  { skill: "Node.js", level: 70 },
  { skill: "Python", level: 75 },
  { skill: "SQL", level: 65 },
  { skill: "Git", level: 80 },
];

const heatmapData = Array.from({ length: 7 }, (_, weekday) =>
  Array.from({ length: 12 }, (_, week) => ({
    weekday,
    week,
    value: Math.floor(Math.random() * 5),
  }))
).flat();

export default function AnalyticsPage() {
  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold mb-1">Analytics</h1>
        <p className="text-muted-foreground">Track your progress and insights</p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: TrendingUp, label: "Total Hours", value: "127h", color: "lime", trend: "+12%" },
          { icon: Target, label: "Goals Met", value: "8/10", color: "teal", trend: "+2" },
          { icon: Award, label: "Best Streak", value: "12 days", color: "coral", trend: "New!" },
          { icon: Brain, label: "Focus Score", value: "85%", color: "yellow", trend: "+5%" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bubble-sm p-5"
          >
            <stat.icon className={`w-5 h-5 mb-3 text-${stat.color === "lime" ? "neon-lime" : stat.color}`} />
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">{stat.value}</span>
              <span className="text-xs text-neon-lime">{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly Activity */}
        <BubbleCard delay={0.2}>
          <h3 className="font-semibold text-lg mb-4">Weekly Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="gradStudy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D8FF2A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#D8FF2A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradCoding" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8EE5D4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8EE5D4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6F6F6F", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6F6F6F", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #D3D0CB",
                    borderRadius: "16px",
                  }}
                />
                <Area type="monotone" dataKey="study" stroke="#D8FF2A" strokeWidth={3} fill="url(#gradStudy)" />
                <Area type="monotone" dataKey="coding" stroke="#8EE5D4" strokeWidth={3} fill="url(#gradCoding)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </BubbleCard>

        {/* Subject Distribution */}
        <BubbleCard delay={0.3}>
          <h3 className="font-semibold text-lg mb-4">Subject Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="hours"
                  cornerRadius={8}
                >
                  {subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #D3D0CB",
                    borderRadius: "16px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </BubbleCard>

        {/* Skills Radar */}
        <BubbleCard delay={0.4}>
          <h3 className="font-semibold text-lg mb-4">Skills Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillsData}>
                <PolarGrid stroke="#D3D0CB" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "#6F6F6F", fontSize: 12 }} />
                <Radar
                  name="Skills"
                  dataKey="level"
                  stroke="#D8FF2A"
                  fill="#D8FF2A"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </BubbleCard>

        {/* Monthly Comparison */}
        <BubbleCard delay={0.5}>
          <h3 className="font-semibold text-lg mb-4">Monthly Comparison</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6F6F6F", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6F6F6F", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #D3D0CB",
                    borderRadius: "16px",
                  }}
                />
                <Bar dataKey="study" fill="#D8FF2A" radius={[8, 8, 0, 0]} />
                <Bar dataKey="coding" fill="#8EE5D4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </BubbleCard>
      </div>

      {/* Activity Heatmap */}
      <BubbleCard delay={0.6}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Activity Heatmap</h3>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Last 12 weeks</span>
          </div>
        </div>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {Array.from({ length: 12 }, (_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const value = Math.floor(Math.random() * 5);
                const opacity = value === 0 ? 0.1 : 0.2 + value * 0.2;
                return (
                  <div
                    key={dayIndex}
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: `rgba(216, 255, 42, ${opacity})` }}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
          <span>Less</span>
          {[0.1, 0.3, 0.5, 0.7, 0.9].map((opacity) => (
            <div
              key={opacity}
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: `rgba(216, 255, 42, ${opacity})` }}
            />
          ))}
          <span>More</span>
        </div>
      </BubbleCard>

      {/* Streak Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-6 p-6 rounded-[2rem] bg-gradient-to-r from-neon-lime/20 to-teal/20 border border-neon-lime/30"
      >
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-neon-lime shadow-glow-lime">
            <Flame className="w-8 h-8 text-charcoal" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">12 Day Streak! 🔥</h3>
            <p className="text-muted-foreground">
              You're on fire! Keep up the great work to reach your 30-day goal.
            </p>
          </div>
          <BubbleProgress value={40} size={80} color="lime" showValue={false} />
        </div>
      </motion.div>
    </div>
  );
}
