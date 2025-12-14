import { Outlet } from "react-router-dom";
import { FloatingNav } from "./FloatingNav";

export function BubbleLayout() {
  return (
    <div className="h-screen w-full min-w-[100vw] overflow-hidden bg-cream">
      <FloatingNav />
      <main className="h-full w-full pt-20 pb-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}