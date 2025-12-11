import { Outlet } from "react-router-dom";
import { FloatingNav } from "./FloatingNav";

export function BubbleLayout() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pb-28">
        <Outlet />
      </main>
      <FloatingNav />
    </div>
  );
}
