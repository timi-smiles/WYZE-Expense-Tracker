"use client";

import { useEffect, useState } from "react";
import { Category } from "@prisma/client";
import { Check, ChevronDown } from "lucide-react";
import {
  CATEGORIES,
  CATEGORY_LABELS,
} from "@/lib/constants/categories";
import { cn } from "@/lib/utils";

const SHEET_ANIMATION_MS = 250;

interface CategoryPickerProps {
  id?: string;
  value: Category;
  onChange: (category: Category) => void;
}

/** Custom category picker using a bottom sheet on all screen sizes. */
export function CategoryPicker({ id, value, onChange }: CategoryPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  const openPicker = () => {
    setIsOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsSheetVisible(true));
    });
  };

  const closePicker = () => {
    setIsSheetVisible(false);
    window.setTimeout(() => setIsOpen(false), SHEET_ANIMATION_MS);
  };

  const togglePicker = () => {
    if (isOpen) {
      closePicker();
    } else {
      openPicker();
    }
  };

  const selectCategory = (category: Category) => {
    onChange(category);
    closePicker();
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <div className="relative min-w-0">
      <button
        id={id}
        type="button"
        onClick={togglePicker}
        className="flex h-11 w-full min-w-0 items-center justify-between gap-2 rounded-xl border border-input bg-white px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="truncate">{CATEGORY_LABELS[value]}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen ? (
        <>
          <button
            type="button"
            aria-label="Close category picker"
            onClick={closePicker}
            className={cn(
              "fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-[1px] transition-opacity duration-300",
              isSheetVisible ? "opacity-100" : "opacity-0"
            )}
          />

          <div
            className={cn(
              "fixed inset-x-0 bottom-0 z-[70] overflow-hidden rounded-t-2xl border border-border bg-card shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:inset-x-4 sm:bottom-4 sm:rounded-2xl",
              isSheetVisible ? "translate-y-0" : "translate-y-full"
            )}
          >
            <div className="mx-auto w-full max-w-lg border-b border-border px-4 py-3">
              <p className="text-sm font-semibold">Select category</p>
              <p className="text-xs text-muted-foreground">
                Choose where this expense belongs
              </p>
            </div>
            <ul
              role="listbox"
              aria-label="Category"
              className="mx-auto max-h-[min(60dvh,24rem)] w-full max-w-lg space-y-1 overflow-y-auto overscroll-contain p-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
            >
              {CATEGORIES.map((category) => {
                const isSelected = value === category;

                return (
                  <li key={category} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => selectCategory(category)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition-colors",
                        isSelected
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-foreground hover:bg-secondary"
                      )}
                    >
                      {CATEGORY_LABELS[category]}
                      {isSelected ? <Check className="h-4 w-4 shrink-0" /> : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
}
