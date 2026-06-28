"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const MOBILE_MENU_DURATION_MS = 300;

/** Marketing site navigation bar. */
export function MarketingNav() {
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = useCallback(() => {
    setIsMenuMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsMenuOpen(true));
    });
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    window.setTimeout(() => setIsMenuMounted(false), MOBILE_MENU_DURATION_MS);
  }, []);

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
        setIsMenuMounted(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              <path
                d="M4 8.5C4 6.567 5.567 5 7.5 5H16.5C18.433 5 20 6.567 20 8.5V10H4V8.5Z"
                fill="currentColor"
                opacity="0.25"
              />
              <path
                d="M4 10H20V15.5C20 17.433 18.433 19 16.5 19H7.5C5.567 19 4 17.433 4 15.5V10Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M8 14H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-bold tracking-tight sm:text-sm">WYZE</p>
            <p className="truncate text-xs text-muted-foreground">Expense Manager</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-primary">
            Features
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-primary">
            How it Works
          </a>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Get started</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-foreground transition hover:bg-secondary md:hidden"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMenuMounted ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className={cn(
              "fixed inset-0 top-16 bg-foreground/20 backdrop-blur-[2px] transition-opacity duration-300 md:hidden",
              isMenuOpen ? "opacity-100" : "opacity-0"
            )}
          />

          <div
            className={cn(
              "fixed left-0 right-0 top-16 z-50 border-b border-border/70 bg-background/95 shadow-lg backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden",
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0"
            )}
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
              <a
                href="#features"
                onClick={closeMenu}
                className="rounded-xl px-3 py-3 text-sm font-medium text-foreground transition hover:bg-secondary"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={closeMenu}
                className="rounded-xl px-3 py-3 text-sm font-medium text-foreground transition hover:bg-secondary"
              >
                How it Works
              </a>

              <div className="my-2 h-px bg-border" />

              <Button variant="ghost" asChild className="h-11 justify-start px-3">
                <Link href="/login" onClick={closeMenu}>
                  Sign in
                </Link>
              </Button>
              <Button asChild className="h-11 justify-center">
                <Link href="/register" onClick={closeMenu}>
                  Get started
                </Link>
              </Button>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
