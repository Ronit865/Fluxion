import { Outlet } from "react-router-dom";
import { FloatingNav } from "./FloatingNav";

export function BubbleLayout() {
  return (
    <div className="h-screen overflow-hidden bg-cream">
      <FloatingNav />
      <main className="h-full pt-20 pb-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}