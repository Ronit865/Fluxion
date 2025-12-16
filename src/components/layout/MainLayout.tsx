import { ReactNode } from 'react';
import { TopNav } from './TopNav';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-background overflow-x-hidden">
      <TopNav />
      <main className="min-h-[calc(100vh-4rem)] w-full">
        <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
