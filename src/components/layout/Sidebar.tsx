import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  BarChart3,
  User,
  Code2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Calendar, label: "Timetable", path: "/timetable" },
  { icon: CheckSquare, label: "Tasks", path: "/tasks" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-card border-r border-border p-4">
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
          <Code2 className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-bold text-lg">DevRoutine</h1>
          <p className="text-xs text-muted-foreground">Student + Coder</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative group",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-xl bg-primary/10"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <item.icon className="w-5 h-5 relative z-10" />
              <span className="font-medium relative z-10">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 rounded-2xl gradient-card border border-border">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-amber" />
          <span className="text-sm font-semibold">Pro Tip</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Consistent daily coding builds mastery. Track your streaks!
        </p>
      </div>
    </aside>
  );
}
