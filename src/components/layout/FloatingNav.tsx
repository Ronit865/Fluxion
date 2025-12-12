import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Analytics", path: "/analytics" },
  { label: "Routine", path: "/routine" },
  { label: "Profile", path: "/profile" },
];

export function FloatingNav() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-1 px-2 py-2 bg-charcoal rounded-full shadow-floating">
        {/* Logo */}
        <div className="px-4 py-2">
          <span className="text-white font-bold text-sm">routine</span>
          <span className="text-orange text-xs ml-0.5">•</span>
        </div>

        {/* Nav Links */}
        <div className="flex items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="relative"
              >
                <motion.div
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors rounded-full",
                    isActive
                      ? "text-white"
                      : "text-white/60 hover:text-white/90"
                  )}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </motion.div>
              </NavLink>
            );
          })}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="ml-2 px-5 py-2 bg-cream text-charcoal text-sm font-semibold rounded-full hover:bg-cream/90 transition-colors"
        >
          Get Started
        </motion.button>
      </div>
    </motion.nav>
  );
}