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
  { name: "Math", hours: 12, fill: "#FF4F17" },
  { name: "CS", hours: 18, fill: "#2D8CFF" },
  { name: "Physics", hours: 8, fill: "#845CFF" },
  { name: "Database", hours: 10, fill: "#29E3C2" },
];

const skillsData = [
  { skill: "React", level: 85 },
  { skill: "Node.js", level: 70 },
  { skill: "Python", level: 75 },
  { skill: "SQL", level: 65 },
  { skill: "Git", level: 80 },
];

export default function AnalyticsPage() {
  const statColors = ["orange", "blue", "purple", "neon"] as const;
  
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
          { icon: TrendingUp, label: "Total Hours", value: "127h", color: "orange", trend: "+12%" },
          { icon: Target, label: "Goals Met", value: "8/10", color: "blue", trend: "+2" },
          { icon: Award, label: "Best Streak", value: "12 days", color: "purple", trend: "New!" },
          { icon: Brain, label: "Focus Score", value: "85%", color: "neon", trend: "+5%" },
        ].map((stat, index) => {
          const widgetClasses = {
            orange: "widget-orange",
            blue: "widget-blue",
            purple: "widget-purple",
            neon: "widget-neon",
          };
          const textClasses = {
            orange: "text-white",
            blue: "text-white",
            purple: "text-white",
            neon: "text-charcoal",
          };
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-[1.5rem] p-5 hover-float ${widgetClasses[stat.color as keyof typeof widgetClasses]}`}
            >
              <stat.icon className={`w-5 h-5 mb-3 ${textClasses[stat.color as keyof typeof textClasses]}`} />
              <p className={`text-sm opacity-80 ${textClasses[stat.color as keyof typeof textClasses]}`}>{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className={`text-xl font-bold ${textClasses[stat.color as keyof typeof textClasses]}`}>{stat.value}</span>
                <span className={`text-xs bg-white/20 px-2 py-0.5 rounded-full ${textClasses[stat.color as keyof typeof textClasses]}`}>{stat.trend}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly Activity */}
        <BubbleCard delay={0.2} glow="orange">
          <h3 className="font-semibold text-lg mb-4">Weekly Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="gradStudy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF4F17" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FF4F17" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradCoding" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D8CFF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2D8CFF" stopOpacity={0} />
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
                <Area type="monotone" dataKey="study" stroke="#FF4F17" strokeWidth={3} fill="url(#gradStudy)" />
                <Area type="monotone" dataKey="coding" stroke="#2D8CFF" strokeWidth={3} fill="url(#gradCoding)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </BubbleCard>

        {/* Subject Distribution */}
        <BubbleCard delay={0.3} glow="purple">
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
        <BubbleCard delay={0.4} glow="blue">
          <h3 className="font-semibold text-lg mb-4">Skills Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillsData}>
                <PolarGrid stroke="#D3D0CB" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "#6F6F6F", fontSize: 12 }} />
                <Radar
                  name="Skills"
                  dataKey="level"
                  stroke="#845CFF"
                  fill="#845CFF"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </BubbleCard>

        {/* Monthly Comparison */}
        <BubbleCard delay={0.5} glow="aqua">
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
                <Bar dataKey="study" fill="#FF4F17" radius={[8, 8, 0, 0]} />
                <Bar dataKey="coding" fill="#29E3C2" radius={[8, 8, 0, 0]} />
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
                    style={{ backgroundColor: `rgba(255, 79, 23, ${opacity})` }}
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
              style={{ backgroundColor: `rgba(255, 79, 23, ${opacity})` }}
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
        className="mt-6 p-6 rounded-[2rem] gradient-orange glow-orange"
      >
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
            <Flame className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1 text-white">12 Day Streak! 🔥</h3>
            <p className="text-white/80">
              You're on fire! Keep up the great work to reach your 30-day goal.
            </p>
          </div>
          <BubbleProgress value={40} size={80} color="yellow" showValue={false} />
        </div>
      </motion.div>
    </div>
  );
}