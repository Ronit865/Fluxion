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
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, Target, Lightbulb, Award } from "lucide-react";

const weeklyData = [
  { day: "Mon", study: 4, coding: 3, exercise: 1 },
  { day: "Tue", study: 3, coding: 5, exercise: 0.5 },
  { day: "Wed", study: 5, coding: 4, exercise: 1 },
  { day: "Thu", study: 4, coding: 6, exercise: 1.5 },
  { day: "Fri", study: 6, coding: 5, exercise: 1 },
  { day: "Sat", study: 3, coding: 7, exercise: 2 },
  { day: "Sun", study: 2, coding: 4, exercise: 1.5 },
];

const subjectData = [
  { name: "Math", hours: 12, fill: "hsl(var(--coral))" },
  { name: "CS", hours: 18, fill: "hsl(var(--primary))" },
  { name: "Physics", hours: 8, fill: "hsl(var(--purple))" },
  { name: "Database", hours: 10, fill: "hsl(var(--accent))" },
  { name: "Languages", hours: 6, fill: "hsl(var(--amber))" },
];

const skillsData = [
  { subject: "React", A: 85 },
  { subject: "Node.js", A: 70 },
  { subject: "Python", A: 75 },
  { subject: "SQL", A: 65 },
  { subject: "Git", A: 80 },
  { subject: "Design", A: 55 },
];

const heatmapData = Array.from({ length: 52 }, () =>
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
);

export default function Analytics() {
  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl lg:text-3xl font-bold mb-1">Analytics</h1>
        <p className="text-muted-foreground">Track your progress and insights</p>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: TrendingUp, label: "Total Hours", value: "127h", change: "+12%" },
          { icon: Target, label: "Goals Met", value: "8/10", change: "+2" },
          { icon: Award, label: "Best Streak", value: "12 days", change: "New!" },
          { icon: Lightbulb, label: "Focus Score", value: "85%", change: "+5%" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-2xl p-4 border border-border"
          >
            <stat.icon className="w-5 h-5 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">{stat.value}</span>
              <span className="text-xs text-accent">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-5 border border-border"
        >
          <h3 className="font-semibold mb-4">Weekly Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorStudyA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--coral))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--coral))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCodingA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                  }}
                />
                <Area type="monotone" dataKey="study" stroke="hsl(var(--coral))" fill="url(#colorStudyA)" />
                <Area type="monotone" dataKey="coding" stroke="hsl(var(--primary))" fill="url(#colorCodingA)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Subject Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-5 border border-border"
        >
          <h3 className="font-semibold mb-4">Subject Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="hours"
                >
                  {subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Skills Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl p-5 border border-border"
        >
          <h3 className="font-semibold mb-4">Skills Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillsData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Monthly Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl p-5 border border-border"
        >
          <h3 className="font-semibold mb-4">Monthly Comparison</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                  }}
                />
                <Bar dataKey="study" fill="hsl(var(--coral))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="coding" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Activity Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-card rounded-2xl p-5 border border-border"
      >
        <h3 className="font-semibold mb-4">Contribution Heatmap</h3>
        <div className="overflow-x-auto">
          <div className="flex gap-1 min-w-[700px]">
            {heatmapData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((value, dayIndex) => (
                  <div
                    key={dayIndex}
                    className="w-3 h-3 rounded-sm"
                    style={{
                      backgroundColor:
                        value === 0
                          ? "hsl(var(--secondary))"
                          : `hsl(var(--accent) / ${0.2 + value * 0.2})`,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="w-3 h-3 rounded-sm"
              style={{
                backgroundColor:
                  level === 0
                    ? "hsl(var(--secondary))"
                    : `hsl(var(--accent) / ${0.2 + level * 0.2})`,
              }}
            />
          ))}
          <span>More</span>
        </div>
      </motion.div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-6 bg-gradient-to-r from-primary/10 to-purple/10 rounded-2xl p-6 border border-primary/30"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/20">
            <Lightbulb className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Weekly Insight</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Great progress this week! Your coding hours increased by 20% compared to last week. 
              Consider balancing with more study time for Mathematics to prepare for upcoming exams.
            </p>
            <button className="text-sm font-medium text-primary hover:underline">
              View detailed recommendations →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
