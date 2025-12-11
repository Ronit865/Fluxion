import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, BarChart3, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Calendar, label: "Routine", path: "/routine" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function FloatingNav() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-2 px-3 py-2 bg-card/90 backdrop-blur-xl rounded-full shadow-floating border border-border/50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300",
                isActive
                  ? "bg-neon-lime text-charcoal shadow-glow-lime"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavBubble"
                  className="absolute inset-0 rounded-full bg-neon-lime"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon className={cn("w-5 h-5 relative z-10", isActive && "text-charcoal")} />
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-sm font-semibold relative z-10 text-charcoal"
                >
                  {item.label}
                </motion.span>
              )}
            </NavLink>
          );
        })}
      </div>
    </motion.nav>
  );
}
