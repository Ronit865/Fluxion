import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";

export function MainLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto pb-20 lg:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
