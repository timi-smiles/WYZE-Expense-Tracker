"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, UserRound, Wallet } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    match: (pathname: string) => pathname === "/dashboard",
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: UserRound,
    match: (pathname: string) => pathname.startsWith("/dashboard/profile"),
  },
];

/** Left navigation for authenticated dashboard pages. */
export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-border/70 bg-gradient-to-b from-white via-white to-accent/30 lg:flex">
        <div className="flex h-16 items-center gap-3 border-b border-border/70 px-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/20">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight">WYZE</p>
            <p className="text-xs text-muted-foreground">Expense Tracker</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5 p-4">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Menu
          </p>
          {navItems.map((item) => {
            const isActive = item.match(pathname);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isActive ? "text-primary-foreground" : "text-primary/70"
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border/70 p-4">
          <div className="rounded-xl border border-border/70 bg-white/80 px-3 py-3 text-xs leading-5 text-muted-foreground">
            Track spending, stay on budget, and keep your finances organized.
          </div>
        </div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-50 flex border-t border-border/70 bg-white/95 backdrop-blur-md lg:hidden">
        {navItems.map((item) => {
          const isActive = item.match(pathname);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-3 text-[11px] font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
