"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { LogOut, Wallet } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

/** Authenticated application header. */
export function AppHeader({
  showBrand = true,
}: {
  /** true = always show; "mobile" = show only below lg (when sidebar is hidden) */
  showBrand?: boolean | "mobile";
}) {
  const { data: session } = useSession();
  const initials =
    session?.user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {showBrand === true || showBrand === "mobile" ? (
          <Link
            href="/dashboard"
            className={cn(
              "flex min-w-0 items-center gap-3",
              showBrand === "mobile" && "lg:hidden"
            )}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/20">
              <Wallet className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-base font-bold tracking-tight lg:text-sm">WYZE</p>
              <p className="truncate text-xs text-muted-foreground">Expense Tracker</p>
            </div>
          </Link>
        ) : (
          <div className="hidden lg:block" />
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-xl border border-border bg-white px-3 py-2 transition hover:bg-secondary">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold">{session?.user?.name}</p>
                <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
