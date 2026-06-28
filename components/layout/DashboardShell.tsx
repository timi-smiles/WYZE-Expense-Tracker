"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

interface DashboardShellProps {
  children: React.ReactNode;
}

/** Authenticated app shell with sidebar navigation and top header. */
export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex min-h-screen flex-col lg:pl-64">
        <AppHeader showBrand="mobile" />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 pb-24 sm:px-6 lg:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
